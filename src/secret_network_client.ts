import {
  AccountData,
  AminoSignResponse,
  encodeSecp256k1Pubkey,
  makeSignDoc as makeSignDocAmino,
  OfflineAminoSigner,
  StdSignDoc,
} from "@cosmjs/amino";
import { fromBase64, toHex } from "@cosmjs/encoding";
import {
  encodePubkey,
  isOfflineDirectSigner,
  makeAuthInfoBytes,
  makeSignDoc as makeSignDocProto,
  OfflineSigner,
} from "@cosmjs/proto-signing";
import { DeliverTxResponse, IndexedTx, SignerData } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { StdFee } from ".";
import { EncryptionUtils, EncryptionUtilsImpl } from "./encryption";
import { GetSyncingRequest } from "./protobuf_stuff/cosmos/base/tendermint/v1beta1/query";
import { SignMode } from "./protobuf_stuff/cosmos/tx/signing/v1beta1/signing";
import { TxBody, TxRaw } from "./protobuf_stuff/cosmos/tx/v1beta1/tx";
import { Any } from "./protobuf_stuff/google/protobuf/any";
import { AuthQuerier, BaseAccount } from "./query/auth";
import {
  AuthzQuerier,
  BankQuerier,
  DistributionQuerier,
  EvidenceQuerier,
  FeegrantQuerier,
  GovQuerier,
  IbcChannelQuerier,
  IbcClientQuerier,
  IbcConnectionQuerier,
  IbcTransferQuerier,
  MintQuerier,
  ParamsQuerier,
  SlashingQuerier,
  StakingQuerier,
  TendermintQuerier,
  UpgradeQuerier,
} from "./query/cosmos";
import { ComputeQuerier, RegistrationQuerier } from "./query/secret";
import { Msg, ProtoMsg } from "./tx";

export type SigningOptions = {
  broadcastTimeoutMs?: number;
  broadcastPollIntervalMs?: number;
};

export type SigningParams = {
  signerAddress: string;
  signer: OfflineSigner;
  chainId: string;
  /** Passing `encryptionSeed` will allow tx decryption at a later time. Ignored if `encryptionUtils` is supplied. */
  encryptionSeed?: Uint8Array;
  /** `encryptionUtils` overrides the default {@link EncryptionUtilsImpl}. */
  encryptionUtils?: EncryptionUtils;
};

export enum BroadcastMode {
  /**
   * Broadcast transaction to mempool and wait for CheckTx response.
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync
   */
  SYNC,
  /**
   * Broadcast transaction to mempool and do not wait for CheckTx response.
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async
   */
  ASYNC,
}

export type SignAndBroadcastParams = {
  gasLimit: number;
  /** E.g. gasPriceInFeeDenom=0.25 & feeDenom="uscrt" => Total fee for tx is `0.25 * gasLimit`uscrt  */
  gasPriceInFeeDenom: number;
  /** E.g. "uscrt" */
  feeDenom: string;
  memo?: string;
  broadcastTimeoutMs?: number;
  broadcastPollIntervalMs?: number;
  broadcastMode?: BroadcastMode;
  /**
   * explicitSignerData can be used to override chain-id, accountNumber & accountSequence.
   * This is usefull when using {@link BroadcastMode.ASYNC} or when you don't want secretjs
   * to query the accountNumber & accountSequence from the chain (for performance).
   * */
  explicitSignerData?: SignerData;
};

export class ReadonlySigner implements OfflineAminoSigner {
  getAccounts(): Promise<readonly AccountData[]> {
    throw new Error("getAccounts() is not supported in readonly mode.");
  }
  signAmino(
    _signerAddress: string,
    _signDoc: StdSignDoc,
  ): Promise<AminoSignResponse> {
    throw new Error("signAmino() is not supported in readonly mode.");
  }
}

type Querier = {
  auth: AuthQuerier;
  authz: AuthzQuerier;
  bank: BankQuerier;
  compute: ComputeQuerier;
  distribution: DistributionQuerier;
  evidence: EvidenceQuerier;
  feegrant: FeegrantQuerier;
  gov: GovQuerier;
  ibc_channel: IbcChannelQuerier;
  ibc_client: IbcClientQuerier;
  ibc_connection: IbcConnectionQuerier;
  ibc_transfer: IbcTransferQuerier;
  mint: MintQuerier;
  params: ParamsQuerier;
  registration: RegistrationQuerier;
  slashing: SlashingQuerier;
  staking: StakingQuerier;
  tendermint: TendermintQuerier;
  upgrade: UpgradeQuerier;
};

interface SecretRpcClient {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

export class SecretNetworkClient {
  public query: Querier;
  public tendermint: Tendermint34Client;
  private signerAddress: string;
  private signer: OfflineSigner;
  private chainId: string;
  private encryptionUtils: EncryptionUtils;

  /** Creates a new SecretNetworkClient client. For a readonly client pass only the `rpcUrl` param. */
  public static async create(
    rpcUrl: string,
    signingParams: SigningParams = {
      signer: new ReadonlySigner(),
      chainId: "",
      signerAddress: "",
    },
  ): Promise<SecretNetworkClient> {
    const tendermint = await Tendermint34Client.connect(rpcUrl);
    return new SecretNetworkClient(tendermint, signingParams);
  }

  private constructor(
    tendermint: Tendermint34Client,
    signingParams: SigningParams,
  ) {
    this.tendermint = tendermint;

    this.signer = signingParams.signer;
    this.chainId = signingParams.chainId;
    this.signerAddress = signingParams.signerAddress;

    const rpc: SecretRpcClient = {
      request: async (
        service: string,
        method: string,
        data: Uint8Array,
      ): Promise<Uint8Array> => {
        const path = `/${service}/${method}`;

        const response = await tendermint.abciQuery({
          path,
          data,
          prove: false,
        });

        if (response.code) {
          throw new Error(
            `Query failed with (${response.code}): ${response.log}`,
          );
        }

        return response.value;
      },
    };

    this.query = {
      auth: new AuthQuerier(rpc),
      authz: new AuthzQuerier(rpc),
      bank: new BankQuerier(rpc),
      compute: new ComputeQuerier(rpc),
      distribution: new DistributionQuerier(rpc),
      evidence: new EvidenceQuerier(rpc),
      feegrant: new FeegrantQuerier(rpc),
      gov: new GovQuerier(rpc),
      ibc_channel: new IbcChannelQuerier(rpc),
      ibc_client: new IbcClientQuerier(rpc),
      ibc_connection: new IbcConnectionQuerier(rpc),
      ibc_transfer: new IbcTransferQuerier(rpc),
      mint: new MintQuerier(rpc),
      params: new ParamsQuerier(rpc),
      registration: new RegistrationQuerier(rpc),
      slashing: new SlashingQuerier(rpc),
      staking: new StakingQuerier(rpc),
      tendermint: new TendermintQuerier(rpc),
      upgrade: new UpgradeQuerier(rpc),
    };

    if (signingParams.encryptionUtils) {
      this.encryptionUtils = signingParams.encryptionUtils;
    } else {
      this.encryptionUtils = new EncryptionUtilsImpl(
        this.query.registration,
        signingParams.encryptionSeed,
        this.chainId,
      );
    }
  }

  public async getTx(id: string): Promise<IndexedTx | null> {
    const results = await this.txsQuery(`tx.hash='${id}'`);
    return results[0] ?? null;
  }

  public async txsQuery(query: string): Promise<readonly IndexedTx[]> {
    const results = await this.tendermint.txSearchAll({ query: query });
    return results.txs.map((tx) => {
      return {
        height: tx.height,
        hash: toHex(tx.hash).toUpperCase(),
        code: tx.result.code,
        rawLog: tx.result.log || "",
        tx: tx.tx,
        gasUsed: tx.result.gasUsed,
        gasWanted: tx.result.gasWanted,
      };
    });
  }

  /**
   * Broadcasts a signed transaction to the network and monitors its inclusion in a block.
   *
   * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
   * an error is thrown.
   *
   * If the transaction is not included in a block before the provided timeout, this errors with a `TimeoutError`.
   *
   * If the transaction is included in a block, a `DeliverTxResponse` is returned. The caller then
   * usually needs to check for execution success or failure.
   */
  private async broadcastTx(
    tx: Uint8Array,
    timeoutMs: number,
    pollIntervalMs: number,
    mode: BroadcastMode,
  ): Promise<DeliverTxResponse> {
    let timedOut = false;
    const txPollTimeout = setTimeout(() => {
      timedOut = true;
    }, timeoutMs);

    const pollForTx = async (txId: string): Promise<DeliverTxResponse> => {
      if (timedOut) {
        throw new Error(
          `Transaction with ID ${txId} was submitted but was not yet found on the chain. You might want to check later.`,
        );
      }
      await sleep(pollIntervalMs);
      const result = await this.getTx(txId);
      return result
        ? {
            code: result.code,
            height: result.height,
            rawLog: result.rawLog,
            transactionHash: txId,
            gasUsed: result.gasUsed,
            gasWanted: result.gasWanted,
          }
        : pollForTx(txId);
    };

    let transactionId: string;
    if (mode === BroadcastMode.SYNC) {
      const broadcasted = await this.tendermint.broadcastTxSync({ tx });
      if (broadcasted.code) {
        throw new Error(
          `Broadcasting transaction failed with code ${broadcasted.code} (codespace: ${broadcasted.codeSpace}). Log: ${broadcasted.log}`,
        );
      }
      transactionId = toHex(broadcasted.hash).toUpperCase();
    } else {
      const broadcasted = await this.tendermint.broadcastTxAsync({ tx });
      transactionId = toHex(broadcasted.hash).toUpperCase();
    }

    return new Promise((resolve, reject) =>
      pollForTx(transactionId).then(
        (value) => {
          clearTimeout(txPollTimeout);
          resolve(value);
        },
        (error) => {
          clearTimeout(txPollTimeout);
          reject(error);
        },
      ),
    );
  }

  public async signAndBroadcast(
    messages: Msg[],
    {
      gasLimit,
      gasPriceInFeeDenom: gasPrice,
      feeDenom,
      memo = "",
      broadcastTimeoutMs = 60_000,
      broadcastPollIntervalMs = 5_000,
      broadcastMode = BroadcastMode.SYNC,
      explicitSignerData,
    }: SignAndBroadcastParams,
  ): Promise<DeliverTxResponse> {
    const txRaw = await this.sign(
      this.signerAddress,
      messages,
      {
        gas: String(gasLimit),
        amount: [
          {
            amount: String(Math.floor(gasLimit * gasPrice) + 1),
            denom: feeDenom,
          },
        ],
      },
      memo,
      explicitSignerData,
    );
    const txBytes = TxRaw.encode(txRaw).finish();

    return this.broadcastTx(
      txBytes,
      broadcastTimeoutMs,
      broadcastPollIntervalMs,
      broadcastMode,
    );
  }

  /**
   * Gets account number and sequence from the API, creates a sign doc,
   * creates a single signature and assembles the signed transaction.
   *
   * The sign mode (SIGN_MODE_DIRECT or SIGN_MODE_LEGACY_AMINO_JSON) is determined by this client's signer.
   *
   * You can pass signer data (account number, sequence and chain ID) explicitly instead of querying them
   * from the chain. This is needed when signing for a multisig account, but it also allows for offline signing
   * (See the SigningStargateClient.offline constructor).
   */
  public async sign(
    signerAddress: string,
    messages: Msg[],
    fee: StdFee,
    memo: string,
    explicitSignerData?: SignerData,
  ): Promise<TxRaw> {
    let signerData: SignerData;
    if (explicitSignerData) {
      signerData = explicitSignerData;
    } else {
      const account = await this.query.auth.account({
        address: signerAddress,
      });

      if (!account) {
        throw new Error(
          `Cannot find account "${signerAddress}", make sure it has a balance.`,
        );
      }

      if (account.type !== "BaseAccount") {
        throw new Error(
          `Cannot sign with account of type "${account.type}", can only sign with "BaseAccount".`,
        );
      }

      const chainId = this.chainId;
      signerData = {
        accountNumber: Number((account.account as BaseAccount).accountNumber),
        accountSequence: Number((account.account as BaseAccount).sequence),
        chainId: chainId,
      };
    }

    return isOfflineDirectSigner(this.signer)
      ? this.signDirect(signerAddress, messages, fee, memo, signerData)
      : this.signAmino(signerAddress, messages, fee, memo, signerData);
  }

  private async signAmino(
    signerAddress: string,
    messages: Msg[],
    fee: StdFee,
    memo: string,
    { accountNumber, accountSequence: sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    if (isOfflineDirectSigner(this.signer)) {
      throw new Error(`Wrong signer type! Expected AminoSigner.`);
    }

    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey(
      encodeSecp256k1Pubkey(accountFromSigner.pubkey),
    );
    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    const msgs = messages.map((msg) => msg.toAmino());
    const signDoc = makeSignDocAmino(
      msgs,
      fee,
      chainId,
      memo,
      accountNumber,
      sequence,
    );
    const { signature, signed } = await this.signer.signAmino(
      signerAddress,
      signDoc,
    );
    const signedTxBody = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: messages.map((msg) => msg.toProto()),
        memo: signed.memo,
      },
    };
    const signedTxBodyBytes = this.encodeTx(signedTxBody);
    const signedGasLimit = Number(signed.fee.gas);
    const signedSequence = Number(signed.sequence);
    const signedAuthInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence: signedSequence }],
      signed.fee.amount,
      signedGasLimit,
      signMode,
    );
    return TxRaw.fromPartial({
      bodyBytes: signedTxBodyBytes,
      authInfoBytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }

  private encodeTx(txBody: {
    typeUrl: string;
    value: {
      messages: ProtoMsg[];
      memo: string;
    };
  }): Uint8Array {
    const wrappedMessages = txBody.value.messages.map((message) => {
      const binaryValue = message.encode();
      return Any.fromPartial({
        typeUrl: message.typeUrl,
        value: binaryValue,
      });
    });

    const txBodyEncoded = TxBody.fromPartial({
      ...txBody.value,
      messages: wrappedMessages,
    });
    return TxBody.encode(txBodyEncoded).finish();
  }

  private async signDirect(
    signerAddress: string,
    messages: Msg[],
    fee: StdFee,
    memo: string,
    { accountNumber, accountSequence: sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    if (!isOfflineDirectSigner(this.signer)) {
      throw new Error(`Wrong signer type! Expected DirectSigner.`);
    }

    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey(
      encodeSecp256k1Pubkey(accountFromSigner.pubkey),
    );
    const txBody = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: messages.map((msg) => msg.toProto()),
        memo: memo,
      },
    };
    const txBodyBytes = this.encodeTx(txBody);
    const gasLimit = Number(fee.gas);
    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence }],
      fee.amount,
      gasLimit,
    );
    const signDoc = makeSignDocProto(
      txBodyBytes,
      authInfoBytes,
      chainId,
      accountNumber,
    );
    const { signature, signed } = await this.signer.signDirect(
      signerAddress,
      signDoc,
    );
    return TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }
}

function sleep(ms: number) {
  return new Promise((accept, reject) => setTimeout(accept, ms));
}
