import {
  AccountData,
  AminoSignResponse,
  OfflineAminoSigner,
  StdSignDoc,
} from "@cosmjs/amino";
import {
  SigningCosmWasmClient,
  SigningCosmWasmClientOptions,
} from "@cosmjs/cosmwasm-stargate";
import { EncodeObject as Msg, OfflineSigner } from "@cosmjs/proto-signing";
import { BroadcastTxResponse, StdFee } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { TxRaw } from "./protobuf_stuff/cosmos/tx/v1beta1/tx";
import {
  AuthQuerier,
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

export interface SecretJsSigningOptions {
  broadcastTimeoutMs?: number;
  broadcastPollIntervalMs?: number;
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

export class SecretNetworkClient extends SigningCosmWasmClient {
  public readonly query: Querier;

  /**
   * Creates a readonly client.
   */
  public static async connect(rpcUrl: string): Promise<SecretNetworkClient> {
    const tmClient = await Tendermint34Client.connect(rpcUrl);
    return new SecretNetworkClient(tmClient, new ReadonlySigner());
  }

  /**
   * Creates a signer client.
   */
  public static async connectWithSigner(
    rpcUrl: string,
    signer: OfflineSigner,
    options?: SecretJsSigningOptions,
  ): Promise<SecretNetworkClient> {
    const tmClient = await Tendermint34Client.connect(rpcUrl);

    return new SecretNetworkClient(tmClient, signer, options);
  }

  protected constructor(
    tmClient: Tendermint34Client,
    signer: OfflineSigner,
    options: SigningCosmWasmClientOptions = {},
  ) {
    super(tmClient, signer, {
      prefix: "secret",
      ...options,
    });

    const rpc: SecretRpcClient = {
      request: async (
        service: string,
        method: string,
        data: Uint8Array,
      ): Promise<Uint8Array> => {
        const path = `/${service}/${method}`;

        const response = await tmClient.abciQuery({
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

  /**
   * Creates a transaction with the given messages, fee and memo. Then signs and broadcasts the transaction.
   *
   * @param signerAddress The address that will sign transactions using this instance. The signer must be able to sign with this address.
   * @param messages
   * @param fee
   * @param memo
   */
  public async signAndBroadcast(
    signerAddress: string,
    messages: readonly Msg[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const txRaw = await this.sign(signerAddress, messages, fee, memo);
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.broadcastTx(
      txBytes,
      this.broadcastTimeoutMs,
      this.broadcastPollIntervalMs,
    );
  }
}
