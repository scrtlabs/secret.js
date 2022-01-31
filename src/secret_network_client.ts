import {
  AccountData,
  AminoSignResponse,
  OfflineAminoSigner,
  StdSignDoc,
} from "@cosmjs/amino";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { AuthQuerier } from "./query/auth";
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

export interface SigningOptions {
  broadcastTimeoutMs?: number;
  broadcastPollIntervalMs?: number;
}

export interface SigningParams {
  signer: OfflineSigner;
  chainId: string;
}

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
  public signer: OfflineSigner;
  public chainId: string;

  public static async init(
    rpcUrl: string,
    signingParams: SigningParams = {
      signer: new ReadonlySigner(),
      chainId: "",
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
  }

  // /**
  //  * Creates a transaction with the given messages, fee and memo. Then signs and broadcasts the transaction.
  //  *
  //  * @param signerAddress The address that will sign transactions using this instance. The signer must be able to sign with this address.
  //  * @param messages
  //  * @param fee
  //  * @param memo
  //  */
  // public async signAndBroadcast(
  //   signerAddress: string,
  //   messages: readonly Msg[],
  //   fee: StdFee,
  //   memo = "",
  // ): Promise<BroadcastTxResponse> {
  //   const txRaw = await this.sign(signerAddress, messages, fee, memo);
  //   const txBytes = TxRaw.encode(txRaw).finish();
  //   return this.broadcastTx(
  //     txBytes,
  //     this.broadcastTimeoutMs,
  //     this.broadcastPollIntervalMs,
  //   );
  // }

  // public async sign(
  //   signerAddress: string,
  //   messages: readonly EncodeObject[],
  //   fee: StdFee,
  //   memo: string,
  //   explicitSignerData?: SignerData,
  // ): Promise<TxRaw> {
  //   let signerData: SignerData;
  //   if (explicitSignerData) {
  //     signerData = explicitSignerData;
  //   } else {
  //     const { accountNumber, sequence } = await this.getSequence(signerAddress);

  //     const x = this.query.auth.account({
  //       address: (await this.signer.getAccounts())[0].address,
  //     });
  //     signerData = {
  //       accountNumber: accountNumber,
  //       sequence: sequence,
  //       chainId: this.chainId,
  //     };
  //   }

  //   return isOfflineDirectSigner(this.signer)
  //     ? this.signDirect(signerAddress, messages, fee, memo, signerData)
  //     : this.signAmino(signerAddress, messages, fee, memo, signerData);
  // }

  // private async signAmino(
  //   signerAddress: string,
  //   messages: readonly EncodeObject[],
  //   fee: StdFee,
  //   memo: string,
  //   { accountNumber, sequence, chainId }: SignerData,
  // ): Promise<TxRaw> {
  //   assert(!isOfflineDirectSigner(this.signer));
  //   const accountFromSigner = (await this.signer.getAccounts()).find(
  //     (account) => account.address === signerAddress,
  //   );
  //   if (!accountFromSigner) {
  //     throw new Error("Failed to retrieve account from signer");
  //   }
  //   const pubkey = encodePubkey(
  //     encodeSecp256k1Pubkey(accountFromSigner.pubkey),
  //   );
  //   const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
  //   const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
  //   const signDoc = makeSignDocAmino(
  //     msgs,
  //     fee,
  //     chainId,
  //     memo,
  //     accountNumber,
  //     sequence,
  //   );
  //   const { signature, signed } = await this.signer.signAmino(
  //     signerAddress,
  //     signDoc,
  //   );
  //   const signedTxBody: TxBodyEncodeObject = {
  //     typeUrl: "/cosmos.tx.v1beta1.TxBody",
  //     value: {
  //       messages: signed.msgs.map((msg) => this.aminoTypes.fromAmino(msg)),
  //       memo: signed.memo,
  //     },
  //   };
  //   const signedTxBodyBytes = this.registry.encode(signedTxBody);
  //   const signedGasLimit = Int53.fromString(signed.fee.gas).toNumber();
  //   const signedSequence = Int53.fromString(signed.sequence).toNumber();
  //   const signedAuthInfoBytes = makeAuthInfoBytes(
  //     [{ pubkey, sequence: signedSequence }],
  //     signed.fee.amount,
  //     signedGasLimit,
  //     signMode,
  //   );
  //   return TxRaw.fromPartial({
  //     bodyBytes: signedTxBodyBytes,
  //     authInfoBytes: signedAuthInfoBytes,
  //     signatures: [fromBase64(signature.signature)],
  //   });
  // }

  // private async signDirect(
  //   signerAddress: string,
  //   messages: readonly EncodeObject[],
  //   fee: StdFee,
  //   memo: string,
  //   { accountNumber, sequence, chainId }: SignerData,
  // ): Promise<TxRaw> {
  //   assert(isOfflineDirectSigner(this.signer));
  //   const accountFromSigner = (await this.signer.getAccounts()).find(
  //     (account) => account.address === signerAddress,
  //   );
  //   if (!accountFromSigner) {
  //     throw new Error("Failed to retrieve account from signer");
  //   }
  //   const pubkey = encodePubkey(
  //     encodeSecp256k1Pubkey(accountFromSigner.pubkey),
  //   );
  //   const txBody: TxBodyEncodeObject = {
  //     typeUrl: "/cosmos.tx.v1beta1.TxBody",
  //     value: {
  //       messages: messages,
  //       memo: memo,
  //     },
  //   };
  //   const txBodyBytes = this.registry.encode(txBody);
  //   const gasLimit = Int53.fromString(fee.gas).toNumber();
  //   const authInfoBytes = makeAuthInfoBytes(
  //     [{ pubkey, sequence }],
  //     fee.amount,
  //     gasLimit,
  //   );
  //   const signDoc = makeSignDoc(
  //     txBodyBytes,
  //     authInfoBytes,
  //     chainId,
  //     accountNumber,
  //   );
  //   const { signature, signed } = await this.signer.signDirect(
  //     signerAddress,
  //     signDoc,
  //   );
  //   return TxRaw.fromPartial({
  //     bodyBytes: signed.bodyBytes,
  //     authInfoBytes: signed.authInfoBytes,
  //     signatures: [fromBase64(signature.signature)],
  //   });
  // }
}
