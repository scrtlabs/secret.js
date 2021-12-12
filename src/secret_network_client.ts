import {
  ChangeAdminResult,
  ContractCodeHistoryEntry,
  ExecuteResult,
  InstantiateOptions,
  InstantiateResult,
  JsonObject,
  MigrateResult,
  SigningCosmWasmClient,
  SigningCosmWasmClientOptions,
  UploadResult,
  Contract as CosmWasmContract,
} from "@cosmjs/cosmwasm-stargate";
import {
  Coin,
  EncodeObject as Msg,
  OfflineSigner,
} from "@cosmjs/proto-signing";
import { assert, sleep } from "@cosmjs/utils";
import { toHex } from "@cosmjs/encoding";
import {
  AuthExtension,
  BankExtension,
  BroadcastTxResponse,
  QueryClient,
  setupAuthExtension,
  setupBankExtension,
  StdFee,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Code, CodeDetails, Contract } from "./types_compute";
import { ComputeExtension, setupComputeExtension } from "./queries_compute";
import {
  AccountData,
  AminoSignResponse,
  OfflineAminoSigner,
  StdSignDoc,
} from "@cosmjs/amino";

export interface SecretJsSigningOptions {
  broadcastTimeoutMs?: number;
  broadcastPollIntervalMs?: number;
}

export class ReadonlySigner implements OfflineAminoSigner {
  getAccounts(): Promise<readonly AccountData[]> {
    throw new Error("getAccounts() is not supported in readonly mode.");
  }
  signAmino(
    signerAddress: string,
    signDoc: StdSignDoc
  ): Promise<AminoSignResponse> {
    throw new Error("signAmino() is not supported in readonly mode.");
  }
}

export class SecretNetworkClient extends SigningCosmWasmClient {
  private readonly codeDeatilsCache = new Map<number, CodeDetails>();
  private readonly secretQueryClient:
    | (QueryClient & AuthExtension & BankExtension & ComputeExtension)
    | undefined;

  /**
   * Creates a readonly client.
   */
  public static async connect(endpoint: string): Promise<SecretNetworkClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new SecretNetworkClient(tmClient, new ReadonlySigner());
  }

  /**
   * Creates a signer client.
   */
  public static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    options?: SecretJsSigningOptions
  ): Promise<SecretNetworkClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);

    return new SecretNetworkClient(tmClient, signer, options);
  }

  /**
   * Creates a client in offline mode.
   *
   * This should only be used in niche cases where you know exactly what you're doing,
   * e.g. when building an offline signing application.
   *
   * When you try to use online functionality with such a signer, an
   * exception will be raised.
   */
  public static async offline(
    signer: OfflineSigner,
    options: SecretJsSigningOptions = {}
  ): Promise<SecretNetworkClient> {
    return new SecretNetworkClient(undefined, signer, options);
  }

  protected constructor(
    tmClient: Tendermint34Client | undefined,
    signer: OfflineSigner,
    options: SigningCosmWasmClientOptions = {}
  ) {
    super(tmClient, signer, {
      prefix: "secret",
      ...options,
    });
    if (tmClient) {
      this.secretQueryClient = QueryClient.withExtensions(
        tmClient,
        setupAuthExtension,
        setupBankExtension,
        setupComputeExtension
      );
    }
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
    memo = ""
  ): Promise<BroadcastTxResponse> {
    const txRaw = await this.sign(signerAddress, messages, fee, memo);
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.broadcastTx(
      txBytes,
      this.broadcastTimeoutMs,
      this.broadcastPollIntervalMs
    );
  }

  protected mustGetQueryClient(): QueryClient &
    AuthExtension &
    BankExtension &
    ComputeExtension {
    if (!this.secretQueryClient) {
      throw new Error(
        "Query client not available. You cannot use online functionality in offline mode."
      );
    }
    return this.secretQueryClient;
  }

  public async getCodes(): Promise<readonly Code[]> {
    const { codeInfos } =
      await this.mustGetQueryClient().compute.listCodeInfo();
    return (codeInfos || []).map((entry): Code => {
      assert(
        entry.creator && entry.codeId && entry.dataHash,
        "entry incomplete"
      );
      return {
        id: entry.codeId.toNumber(),
        creator: entry.creator,
        checksum: toHex(entry.dataHash),
      };
    });
  }

  public async getCodeDetails(codeId: number): Promise<CodeDetails> {
    const cached = this.codeDeatilsCache.get(codeId);
    if (cached) return cached;

    const { codeInfo, data } = await this.mustGetQueryClient().compute.getCode(
      codeId
    );
    assert(
      codeInfo &&
        codeInfo.codeId &&
        codeInfo.creator &&
        codeInfo.dataHash &&
        data,
      "codeInfo missing or incomplete"
    );
    const codeDetails: CodeDetails = {
      id: codeInfo.codeId.toNumber(),
      creator: codeInfo.creator,
      checksum: toHex(codeInfo.dataHash),
      data: data,
    };
    this.codeDeatilsCache.set(codeId, codeDetails);
    return codeDetails;
  }

  public async getContracts(codeId: number): Promise<readonly string[]> {
    const { contracts } =
      await this.mustGetQueryClient().compute.listContractsByCodeId(codeId);
    return contracts;
  }

  /**
   * Throws an error if no contract was found at the address
   */
  public async getContractInfo(address: string): Promise<Contract> {
    const { address: retrievedAddress, contractInfo } =
      await this.mustGetQueryClient().compute.getContractInfo(address);
    if (!contractInfo)
      throw new Error(`No contract found at address "${address}"`);
    assert(retrievedAddress, "address missing");
    assert(
      contractInfo.codeId && contractInfo.creator && contractInfo.label,
      "contractInfo incomplete"
    );
    return {
      address: retrievedAddress,
      codeId: contractInfo.codeId.toNumber(),
      creator: contractInfo.creator,
      label: contractInfo.label,
    };
  }

  /**
   * @deprecated Please use getContractInfo() instead.
   */
  public async getContract(address: string): Promise<CosmWasmContract> {
    throw new Error(
      `getContract() is deprecated, please use getContractInfo() instead`
    );
  }

  /**
   * Makes a query to the contract, returns the parsed JSON document.
   *
   * Promise is rejected when contract does not exist.
   * Promise is rejected for invalid query format.
   * Promise is rejected for invalid response format.
   */
  public async queryContract(
    address: string,
    queryMsg: Record<string, unknown>
  ): Promise<JsonObject> {
    try {
      return await this.mustGetQueryClient().compute.queryContract(
        address,
        queryMsg
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.startsWith("not found: contract")) {
          throw new Error(`No contract found at address "${address}"`);
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  /**
   * @deprecated Contract code history is not supported on Secret Network.
   */
  public async getContractCodeHistory(
    address: string
  ): Promise<readonly ContractCodeHistoryEntry[]> {
    throw new Error(
      "getContractCodeHistory() is not supported on Secret Network"
    );
  }

  /**
   * @deprecated Not possible on Secret Network, everything is encrypted
   * and no one has the decryption key but the contract itself.
   */
  public async queryContractRaw(
    address: string,
    key: Uint8Array
  ): Promise<Uint8Array | null> {
    throw new Error(
      "queryContractRaw() is not supported on Secret Network becuase contracts' state is private"
    );
  }

  /**
   * @deprecated Use queryContract() instead
   */
  public async queryContractSmart(
    address: string,
    queryMsg: Record<string, unknown>
  ): Promise<JsonObject> {
    throw new Error(
      "queryContractSmart() is deprecated, use queryContract() instead"
    );
  }

  /**
   * @deprecated Use signAndBroadcast() to send transactions
   */
  public async upload(
    senderAddress: string,
    wasmCode: Uint8Array,
    fee: StdFee,
    memo = ""
  ): Promise<UploadResult> {
    throw new Error(
      "upload() is not supported, use signAndBroadcast() to send transactions"
    );
  }

  /**
   * @deprecated Use signAndBroadcast() to send transactions
   */
  public async instantiate(
    senderAddress: string,
    codeId: number,
    msg: Record<string, unknown>,
    label: string,
    fee: StdFee,
    options: InstantiateOptions = {}
  ): Promise<InstantiateResult> {
    throw new Error(
      "instantiate() is not supported, use signAndBroadcast() to send transactions"
    );
  }

  /**
   * @deprecated Use signAndBroadcast() to send transactions
   */
  public async updateAdmin(
    senderAddress: string,
    contractAddress: string,
    newAdmin: string,
    fee: StdFee,
    memo = ""
  ): Promise<ChangeAdminResult> {
    throw new Error(
      "updateAdmin() is not supported, use signAndBroadcast() to send transactions"
    );
  }

  /**
   * @deprecated Use signAndBroadcast() to send transactions
   */
  public async clearAdmin(
    senderAddress: string,
    contractAddress: string,
    fee: StdFee,
    memo = ""
  ): Promise<ChangeAdminResult> {
    throw new Error(
      "clearAdmin() is not supported, use signAndBroadcast() to send transactions"
    );
  }

  /**
   * @deprecated Use signAndBroadcast() to send transactions
   */
  public async migrate(
    senderAddress: string,
    contractAddress: string,
    codeId: number,
    migrateMsg: Record<string, unknown>,
    fee: StdFee,
    memo = ""
  ): Promise<MigrateResult> {
    throw new Error(
      "migrate() is not supported, use signAndBroadcast() to send transactions"
    );
  }

  /**
   * @deprecated Use signAndBroadcast() to send transactions
   */
  public async execute(
    senderAddress: string,
    contractAddress: string,
    msg: Record<string, unknown>,
    fee: StdFee,
    memo = "",
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> {
    throw new Error(
      "execute() is not supported, use signAndBroadcast() to send transactions"
    );
  }

  /**
   * @deprecated Use signAndBroadcast() to send transactions
   */
  public async sendTokens(
    senderAddress: string,
    recipientAddress: string,
    amount: readonly Coin[],
    fee: StdFee,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    throw new Error(
      "sendTokens() is not supported, use signAndBroadcast() to send transactions"
    );
  }

  /**
   * @deprecated Use signAndBroadcast() to send transactions
   */
  public async delegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    fee: StdFee,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    throw new Error(
      "delegateTokens() is not supported, use signAndBroadcast() to send transactions"
    );
  }

  /**
   * @deprecated Use signAndBroadcast() to send transactions
   */
  public async undelegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    fee: StdFee,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    throw new Error(
      "undelegateTokens() is not supported, use signAndBroadcast() to send transactions"
    );
  }

  /**
   * @deprecated Use signAndBroadcast() to send transactions
   */
  public async withdrawRewards(
    delegatorAddress: string,
    validatorAddress: string,
    fee: StdFee,
    memo = ""
  ): Promise<BroadcastTxResponse> {
    throw new Error(
      "withdrawRewards() is not supported, use signAndBroadcast() to send transactions"
    );
  }
}
