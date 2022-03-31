import { fromBase64, fromHex, fromUtf8 } from "@cosmjs/encoding";
import { grpc } from "@improbable-eng/grpc-web";
import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";
import {
  Coin,
  MsgBeginRedelegate,
  MsgBeginRedelegateParams,
  MsgCreateValidator,
  MsgCreateValidatorParams,
  MsgDelegate,
  MsgDelegateParams,
  MsgDeposit,
  MsgDepositParams,
  MsgEditValidator,
  MsgEditValidatorParams,
  MsgExec,
  MsgExecParams,
  MsgExecuteContract,
  MsgExecuteContractParams,
  MsgFundCommunityPool,
  MsgFundCommunityPoolParams,
  MsgGrant,
  MsgGrantAllowance,
  MsgGrantAllowanceParams,
  MsgGrantParams,
  MsgInstantiateContract,
  MsgInstantiateContractParams,
  MsgMultiSend,
  MsgMultiSendParams,
  MsgRevoke,
  MsgRevokeAllowance,
  MsgRevokeAllowanceParams,
  MsgRevokeParams,
  MsgSend,
  MsgSendParams,
  MsgSetWithdrawAddress,
  MsgSetWithdrawAddressParams,
  MsgStoreCode,
  MsgStoreCodeParams,
  MsgSubmitEvidence,
  MsgSubmitEvidenceParams,
  MsgSubmitProposal,
  MsgSubmitProposalParams,
  MsgTransfer,
  MsgTransferParams,
  MsgUndelegate,
  MsgUndelegateParams,
  MsgUnjail,
  MsgUnjailParams,
  MsgVerifyInvariant,
  MsgVerifyInvariantParams,
  MsgVote,
  MsgVoteParams,
  MsgVoteWeighted,
  MsgVoteWeightedParams,
  MsgWithdrawDelegatorReward,
  MsgWithdrawDelegatorRewardParams,
  MsgWithdrawValidatorCommission,
  MsgWithdrawValidatorCommissionParams,
} from ".";
import { EncryptionUtils, EncryptionUtilsImpl } from "./encryption";
import { AuthQuerier } from "./query/auth";
import { ComputeQuerier } from "./query/compute";
import { AminoMsg, Msg, MsgParams, ProtoMsg } from "./tx/types";
import {
  AccountData,
  AminoSigner,
  AminoSignResponse,
  encodeSecp256k1Pubkey,
  isOfflineDirectSigner,
  Pubkey,
  Signer,
  StdFee,
  StdSignDoc,
} from "./wallet_amino";

export type CreateClientOptions = {
  /** A gRPC-web url, by default on port 9091 */
  grpcWebUrl: string;
  /** The chain-id is used in encryption code & when signing txs. */
  chainId: string;
  /** A wallet for signing transactions & permits. When `wallet` is supplied, `walletAddress` & `chainId` must be supplied too. */
  wallet?: Signer;
  /** walletAddress is the spesific account address in the wallet that is permitted to sign transactions & permits. */
  walletAddress?: string;
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
  Sync = "Sync",
  /**
   * Broadcast transaction to mempool and do not wait for CheckTx response.
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async
   */
  Async = "Async",
}

export type TxOptions = {
  /** Defaults to `25_000`. */
  gasLimit?: number;
  /** E.g. gasPriceInFeeDenom=0.25 & feeDenom="uscrt" => Total fee for tx is `0.25 * gasLimit`uscrt. Defaults to `0.25`. */
  gasPriceInFeeDenom?: number;
  /** Defaults to `"uscrt"`. */
  feeDenom?: string;
  /** Defaults to `""`. */
  memo?: string;
  /** If `false` returns immediately with only the `transactionHash` field set. Defaults to `true`. */
  waitForCommit?: boolean;
  /**
   * How much time (in milliseconds) to wait for tx to commit on-chain.
   *
   * Defaults to `60_000`. Ignored if `waitForCommit = false`.
   */
  broadcastTimeoutMs?: number;
  /**
   * When waiting for the tx to commit on-chain, how much time (in milliseconds) to wait between checks.
   *
   * Smaller intervals will cause more load on your node provider. Keep in mind that blocks on Secret Network take about 6 seconds to finilize.
   *
   * Defaults to `6_000`. Ignored if `waitForCommit = false`.
   */
  broadcastCheckIntervalMs?: number;
  /**
   * If `BroadcastMode.Sync` - Broadcast transaction to mempool and wait for CheckTx response.
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync
   *
   * If `BroadcastMode.Async` Broadcast transaction to mempool and do not wait for CheckTx response.
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async
   */
  broadcastMode?: BroadcastMode;
  /**
   * explicitSignerData can be used to override `chainId`, `accountNumber` & `accountSequence`.
   * This is usefull when using {@link BroadcastMode.Async} or when you don't want secretjs
   * to query for `accountNumber` & `accountSequence` from the chain. (smoother in UIs, less load on your node provider).
   */
  explicitSignerData?: SignerData;
};

/**
 * Signing information for a single signer that is not included in the transaction.
 *
 * @see https://github.com/cosmos/cosmos-sdk/blob/v0.42.2/x/auth/signing/sign_mode_handler.go#L23-L37
 */
export interface SignerData {
  readonly accountNumber: number;
  readonly sequence: number;
  readonly chainId: string;
}

export class ReadonlySigner implements AminoSigner {
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

export type Querier = {
  /** Returns a transaction with a txhash. Must be 64 character upper-case hex string */
  getTx: (hash: string) => Promise<Tx | null>;
  /**
   * To tell which events you want, you need to provide a query. query is a string, which has a form: "condition AND condition ..." (no OR at the moment).
   *
   * condition has a form: "key operation operand". key is a string with a restricted set of possible symbols (\t\n\r\()"'=>< are not allowed).
   *
   * operation can be "=", "<", "<=", ">", ">=", "CONTAINS" AND "EXISTS". operand can be a string (escaped with single quotes), number, date or time.
   *
   * Examples:
   * - `tx.hash = 'XYZ'` # single transaction
   * - `tx.height = 5` # all txs of the fifth block
   * - `create_validator.validator = 'ABC'` # tx where validator ABC was created
   *
   * Tendermint provides a few predefined keys: tm.event, tx.hash and tx.height. You can provide additional event keys that were emitted during the transaction.
   *
   * All events are indexed by a composite key of the form `{eventType}.{evenAttrKey}`.
   *
   * Multiple event types with duplicate keys are allowed and are meant to categorize unique and distinct events.
   *
   * To create a query for txs where AddrA transferred funds: `transfer.sender = 'AddrA'`.
   *
   */
  txsQuery: (query: string) => Promise<Tx[]>;
  auth: AuthQuerier;
  authz: import("./protobuf_stuff/cosmos/authz/v1beta1/query").Query;
  bank: import("./protobuf_stuff/cosmos/bank/v1beta1/query").Query;
  compute: ComputeQuerier;
  distribution: import("./protobuf_stuff/cosmos/distribution/v1beta1/query").Query;
  evidence: import("./protobuf_stuff/cosmos/evidence/v1beta1/query").Query;
  feegrant: import("./protobuf_stuff/cosmos/feegrant/v1beta1/query").Query;
  gov: import("./protobuf_stuff/cosmos/gov/v1beta1/query").Query;
  ibc_channel: import("./protobuf_stuff/ibc/core/channel/v1/query").Query;
  ibc_client: import("./protobuf_stuff/ibc/core/client/v1/query").Query;
  ibc_connection: import("./protobuf_stuff/ibc/core/connection/v1/query").Query;
  ibc_transfer: import("./protobuf_stuff/ibc/applications/transfer/v1/query").Query;
  mint: import("./protobuf_stuff/cosmos/mint/v1beta1/query").Query;
  params: import("./protobuf_stuff/cosmos/params/v1beta1/query").Query;
  registration: import("./protobuf_stuff/secret/registration/v1beta1/query").Query;
  slashing: import("./protobuf_stuff/cosmos/slashing/v1beta1/query").Query;
  staking: import("./protobuf_stuff/cosmos/staking/v1beta1/query").Query;
  tendermint: import("./protobuf_stuff/cosmos/base/tendermint/v1beta1/query").Service;
  upgrade: import("./protobuf_stuff/cosmos/upgrade/v1beta1/query").Query;
};

export type ArrayLog = Array<{
  msg: number;
  type: string;
  key: string;
  value: string;
}>;

export type JsonLog = Array<{
  msg_index: number;
  events: Array<{
    type: string;
    attributes: Array<{ key: string; value: string }>;
  }>;
}>;

/**
 * MsgData defines the data returned in a Result object during message
 * execution.
 */
export type MsgData = {
  msgType: string;
  data: Uint8Array;
};

/** A transaction that is indexed as part of the transaction history */
export interface Tx {
  readonly height: number;
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
  /** Transaction execution error code. 0 on success. See {@link TxResultCode}. */
  readonly code: TxResultCode;
  /**
   * If code != 0, rawLog contains the error.
   *
   * If code = 0 you'll probably want to use `jsonLog` or `arrayLog`. Values are not decrypted.
   */
  readonly rawLog: string;
  /** If code = 0, `jsonLog = JSON.parse(rawLow)`. Values are decrypted if possible. */
  readonly jsonLog?: JsonLog;
  /** If code = 0, `arrayLog` is a flattened `jsonLog`. Values are decrypted if possible. */
  readonly arrayLog?: ArrayLog;
  /** Return value (if there's any) for each input message */
  readonly data: Array<Uint8Array>;
  /**
   * Raw transaction bytes stored in Tendermint.
   *
   * If you hash this, you get the transaction hash (= transaction ID):
   *
   * ```js
   * import { sha256 } from "@noble/hashes/sha256";
   * import { toHex } from "@cosmjs/encoding";
   *
   * const transactionHash = toHex(sha256(indexTx.tx)).toUpperCase();
   * ```
   */
  readonly tx: Uint8Array;
  readonly gasUsed: number;
  readonly gasWanted: number;
}

export type TxSender = {
  /**
   * Sign and broadcast a transaction to Secret Network.
   *
   * @param {TxOptions} [options] Options for signing and broadcasting
   * @param {Number} [options.gasLimit=25_000]
   * @param {Number} [options.gasPriceInFeeDenom=0.25] E.g. gasPriceInFeeDenom=0.25 & feeDenom="uscrt" => Total fee for tx is `0.25 * gasLimit`uscrt.
   * @param {String} [options.feeDenom="uscrt"]
   * @param {String} [options.memo=""]
   * @param {boolean} [options.waitForCommit=true] If false returns immediately with `transactionHash`. Defaults to `true`.
   * @param {Number} [options.broadcastTimeoutMs=60_000] How much time (in milliseconds) to wait for tx to commit on-chain. Ignored if `waitForCommit = false`.
   * @param {Number} [options.broadcastCheckIntervalMs=6_000] When waiting for the tx to commit on-chain, how much time (in milliseconds) to wait between checks. Smaller intervals will cause more load on your node provider. Keep in mind that blocks on Secret Network take about 6 seconds to finilize. Ignored if `waitForCommit = false`.
   * @param {BroadcastMode} [options.broadcastMode=BroadcastMode.Sync] If {@link BroadcastMode.Sync} - Broadcast transaction to mempool and wait for CheckTx response. @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync. If {@link BroadcastMode.Async} Broadcast transaction to mempool and do not wait for CheckTx response. @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async.
   * @param {SignerData} [options.explicitSignerData] explicitSignerData  can be used to override `chainId`, `accountNumber` & `accountSequence`. This is usefull when using {@link BroadcastMode.Async} or when you don't want secretjs to query for `accountNumber` & `accountSequence` from the chain. (smoother in UIs, less load on your node provider).
   * @param {Number} [options.explicitSignerData.accountNumber]
   * @param {Number} [options.explicitSignerData.sequence]
   * @param {String} [options.explicitSignerData.chainId]
   * @param {Msg[]} messages A list of messages, executed sequentially. If all messages succeeds then the transaction succeed, and the resulting {@link Tx} object will have `code = 0`. If at lease one message fails, the entire transaction is reverted and {@link Tx} `code` field will not be `0`.
   *
   * List of possible Msgs:
   *   - authz           {@link MsgExec}
   *   - authz           {@link MsgGrant}
   *   - authz           {@link MsgRevoke}
   *   - bank            {@link MsgMultiSend}
   *   - bank            {@link MsgSend}
   *   - compute         {@link MsgExecuteContract}
   *   - compute         {@link MsgInstantiateContract}
   *   - compute         {@link MsgStoreCode}
   *   - crisis          {@link MsgVerifyInvariant}
   *   - distribution    {@link MsgFundCommunityPool}
   *   - distribution    {@link MsgSetWithdrawAddress}
   *   - distribution    {@link MsgWithdrawDelegatorReward}
   *   - distribution    {@link MsgWithdrawValidatorCommission}
   *   - evidence        {@link MsgSubmitEvidence}
   *   - feegrant        {@link MsgGrantAllowance}
   *   - feegrant        {@link MsgRevokeAllowance}
   *   - gov             {@link MsgDeposit}
   *   - gov             {@link MsgSubmitProposal}
   *   - gov             {@link MsgVote}
   *   - gov             {@link MsgVoteWeighted}
   *   - ibc_channel     {@link MsgAcknowledgement}
   *   - ibc_channel     {@link MsgChannelCloseConfirm}
   *   - ibc_channel     {@link MsgChannelCloseInit}
   *   - ibc_channel     {@link MsgChannelOpenAck}
   *   - ibc_channel     {@link MsgChannelOpenConfirm}
   *   - ibc_channel     {@link MsgChannelOpenInit}
   *   - ibc_channel     {@link MsgChannelOpenTry}
   *   - ibc_channel     {@link MsgRecvPacket}
   *   - ibc_channel     {@link MsgTimeout}
   *   - ibc_channel     {@link MsgTimeoutOnClose}
   *   - ibc_client      {@link MsgCreateClient}
   *   - ibc_client      {@link MsgSubmitMisbehaviour}
   *   - ibc_client      {@link MsgUpdateClient}
   *   - ibc_client      {@link MsgUpgradeClient}
   *   - ibc_connection  {@link MsgConnectionOpenAck}
   *   - ibc_connection  {@link MsgConnectionOpenConfirm}
   *   - ibc_connection  {@link MsgConnectionOpenInit}
   *   - ibc_connection  {@link MsgConnectionOpenTry}
   *   - ibc_transfer    {@link MsgTransfer}
   *   - slashing        {@link MsgUnjail}
   *   - staking         {@link MsgBeginRedelegate}
   *   - staking         {@link MsgCreateValidator}
   *   - staking         {@link MsgDelegate}
   *   - staking         {@link MsgEditValidator}
   *   - staking         {@link MsgUndelegate}
   *
   *
   */
  broadcast: (messages: Msg[], txOptions?: TxOptions) => Promise<Tx>;

  authz: {
    /**
     * MsgExec attempts to execute the provided messages using
     * authorizations granted to the grantee. Each message should have only
     * one signer corresponding to the granter of the authorization.
     */
    exec: (params: MsgExecParams, txOptions?: TxOptions) => Promise<Tx>;
    /**
     * MsgGrant is a request type for Grant method. It declares authorization to the grantee
     * on behalf of the granter with the provided expiration time.
     */
    grant: (params: MsgGrantParams, txOptions?: TxOptions) => Promise<Tx>;
    /**
     * MsgRevoke revokes any authorization with the provided sdk.Msg type on the
     * granter's account with that has been granted to the grantee.
     */
    revoke: (params: MsgRevokeParams, txOptions?: TxOptions) => Promise<Tx>;
  };
  bank: {
    /** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
    multiSend: (
      params: MsgMultiSendParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
    /** MsgSend represents a message to send coins from one account to another. */
    send: (params: MsgSendParams, txOptions?: TxOptions) => Promise<Tx>;
  };
  compute: {
    /** Execute a function on a contract */
    executeContract: (
      params: MsgExecuteContractParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
    /** Instantiate a contract from code id */
    instantiateContract: (
      params: MsgInstantiateContractParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
    /** Upload a compiled contract to Secret Network */
    storeCode: (
      params: MsgStoreCodeParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
  };
  crisis: {
    /** MsgVerifyInvariant represents a message to verify a particular invariance. */
    verifyInvariant: (
      params: MsgVerifyInvariantParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
  };
  distribution: {
    /**
     * MsgFundCommunityPool allows an account to directly
     * fund the community pool.
     */
    fundCommunityPool: (
      params: MsgFundCommunityPoolParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
    /**
     * MsgSetWithdrawAddress sets the withdraw address for
     * a delegator (or validator self-delegation).
     */
    setWithdrawAddress: (
      params: MsgSetWithdrawAddressParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
    /**
     * MsgWithdrawDelegatorReward represents delegation withdrawal to a delegator
     * from a single validator.
     */
    withdrawDelegatorReward: (
      params: MsgWithdrawDelegatorRewardParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
    /**
     * MsgWithdrawValidatorCommission withdraws the full commission to the validator
     * address.
     */
    withdrawValidatorCommission: (
      params: MsgWithdrawValidatorCommissionParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
  };
  evidence: {
    /**
     * MsgSubmitEvidence represents a message that supports submitting arbitrary
     * Evidence of misbehavior such as equivocation or counterfactual signing.
     */
    submitEvidence: (
      params: MsgSubmitEvidenceParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
  };
  feegrant: {
    /**
     * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
     * of fees from the account of Granter.
     */
    grantAllowance: (
      params: MsgGrantAllowanceParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
    /** MsgRevokeAllowance removes any existing Allowance from Granter to Grantee. */
    revokeAllowance: (
      params: MsgRevokeAllowanceParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
  };
  gov: {
    /** MsgDeposit defines a message to submit a deposit to an existing proposal. */
    deposit: (params: MsgDepositParams, txOptions?: TxOptions) => Promise<Tx>;
    /**
     * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
     * proposal Content.
     */
    submitProposal: (
      params: MsgSubmitProposalParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
    /** MsgVote defines a message to cast a vote. */
    vote: (params: MsgVoteParams, txOptions?: TxOptions) => Promise<Tx>;
    /** MsgVoteWeighted defines a message to cast a vote, with an option to split the vote. */
    voteWeighted: (
      params: MsgVoteWeightedParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
  };
  ibc: {
    /**
     * MsgTransfer defines a msg to transfer fungible tokens (i.e Coins) between
     * ICS20 enabled chains. See ICS Spec here:
     * https://github.com/cosmos/ics/tree/master/spec/ics-020-fungible-token-transfer#data-structures
     */
    transfer: (params: MsgTransferParams, txOptions?: TxOptions) => Promise<Tx>;
  };
  slashing: {
    /** MsgUnjail defines a message to release a validator from jail. */
    unjail: (params: MsgUnjailParams, txOptions?: TxOptions) => Promise<Tx>;
  };
  staking: {
    /** MsgBeginRedelegate defines an SDK message for performing a redelegation of coins from a delegator and source validator to a destination validator. */
    beginRedelegate: (
      params: MsgBeginRedelegateParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
    /** MsgCreateValidator defines an SDK message for creating a new validator. */
    createValidator: (
      params: MsgCreateValidatorParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
    /** MsgDelegate defines an SDK message for performing a delegation of coins from a delegator to a validator. */
    delegate: (params: MsgDelegateParams, txOptions?: TxOptions) => Promise<Tx>;
    /** MsgEditValidator defines an SDK message for editing an existing validator. */
    editValidator: (
      params: MsgEditValidatorParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
    /** MsgUndelegate defines an SDK message for performing an undelegation from a delegate and a validator */
    undelegate: (
      params: MsgUndelegateParams,
      txOptions?: TxOptions,
    ) => Promise<Tx>;
  };
};

type ComputeMsgToNonce = { [msgIndex: number]: Uint8Array };

export class SecretNetworkClient {
  public readonly query: Querier;
  public readonly tx: TxSender;
  public readonly address: string;
  private readonly txService: import("./protobuf_stuff/cosmos/tx/v1beta1/service").ServiceClientImpl;
  private readonly wallet: Signer;
  private readonly chainId: string;
  private encryptionUtils: EncryptionUtils;

  /** Creates a new SecretNetworkClient client. For a readonly client pass just the `grpcUrl` param. */
  public static async create(
    options: CreateClientOptions,
  ): Promise<SecretNetworkClient> {
    const { GrpcWebImpl } = await import(
      "./protobuf_stuff/secret/compute/v1beta1/query"
    );
    let grpcWeb: import("./protobuf_stuff/secret/compute/v1beta1/query").GrpcWebImpl;

    options.grpcWebUrl = options.grpcWebUrl.replace(/\/*$/, ""); // remove trailing slash

    if (typeof window === "undefined") {
      // node.js
      grpcWeb = new GrpcWebImpl(options.grpcWebUrl, {
        transport: NodeHttpTransport(),
        // debug: true,
      });
    } else {
      // browser
      grpcWeb = new GrpcWebImpl(options.grpcWebUrl, {
        transport: grpc.CrossBrowserHttpTransport({ withCredentials: false }),
        // debug: true,
      });
    }

    const { ServiceClientImpl } = await import(
      "./protobuf_stuff/cosmos/tx/v1beta1/service"
    );
    const txService = new ServiceClientImpl(grpcWeb);

    const query: Querier = {
      auth: new AuthQuerier(grpcWeb),
      authz: new (
        await import("./protobuf_stuff/cosmos/authz/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      bank: new (
        await import("./protobuf_stuff/cosmos/bank/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      compute: new ComputeQuerier(grpcWeb), // stub until we can set this in the constructor with a shared EncryptionUtils
      distribution: new (
        await import("./protobuf_stuff/cosmos/distribution/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      evidence: new (
        await import("./protobuf_stuff/cosmos/evidence/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      feegrant: new (
        await import("./protobuf_stuff/cosmos/feegrant/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      gov: new (
        await import("./protobuf_stuff/cosmos/gov/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      ibc_channel: new (
        await import("./protobuf_stuff/ibc/core/channel/v1/query")
      ).QueryClientImpl(grpcWeb),
      ibc_client: new (
        await import("./protobuf_stuff/ibc/core/client/v1/query")
      ).QueryClientImpl(grpcWeb),
      ibc_connection: new (
        await import("./protobuf_stuff/ibc/core/connection/v1/query")
      ).QueryClientImpl(grpcWeb),
      ibc_transfer: new (
        await import("./protobuf_stuff/ibc/applications/transfer/v1/query")
      ).QueryClientImpl(grpcWeb),
      mint: new (
        await import("./protobuf_stuff/cosmos/mint/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      params: new (
        await import("./protobuf_stuff/cosmos/params/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      registration: new (
        await import("./protobuf_stuff/secret/registration/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      slashing: new (
        await import("./protobuf_stuff/cosmos/slashing/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      staking: new (
        await import("./protobuf_stuff/cosmos/staking/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      tendermint: new (
        await import("./protobuf_stuff/cosmos/base/tendermint/v1beta1/query")
      ).ServiceClientImpl(grpcWeb),
      upgrade: new (
        await import("./protobuf_stuff/cosmos/upgrade/v1beta1/query")
      ).QueryClientImpl(grpcWeb),
      getTx: async () => null, // stub until we can set this in the constructor
      txsQuery: async () => [], // stub until we can set this in the constructor
    };

    return new SecretNetworkClient(grpcWeb, txService, query, options);
  }

  private constructor(
    grpc: import("./protobuf_stuff/secret/compute/v1beta1/query").GrpcWebImpl,
    txService: import("./protobuf_stuff/cosmos/tx/v1beta1/service").ServiceClientImpl,
    query: Querier,
    options: CreateClientOptions,
  ) {
    this.txService = txService;

    this.query = query;
    this.query.getTx = (hash) => this.getTx(hash);
    this.query.txsQuery = (query) => this.txsQuery(query);

    this.wallet = options.wallet ?? new ReadonlySigner();
    this.address = options.walletAddress ?? "";
    this.chainId = options.chainId;

    const doMsg = (msgClass: any) => {
      return (params: MsgParams, options?: TxOptions) => {
        return this.tx.broadcast([new msgClass(params)], options);
      };
    };

    this.tx = {
      broadcast: this.signAndBroadcast.bind(this),

      authz: {
        exec: doMsg(MsgExec),
        grant: doMsg(MsgGrant),
        revoke: doMsg(MsgRevoke),
      },
      bank: {
        multiSend: doMsg(MsgMultiSend),
        send: doMsg(MsgSend),
      },
      compute: {
        executeContract: doMsg(MsgExecuteContract),
        instantiateContract: doMsg(MsgInstantiateContract),
        storeCode: doMsg(MsgStoreCode),
      },
      crisis: {
        verifyInvariant: doMsg(MsgVerifyInvariant),
      },
      distribution: {
        fundCommunityPool: doMsg(MsgFundCommunityPool),
        setWithdrawAddress: doMsg(MsgSetWithdrawAddress),
        withdrawDelegatorReward: doMsg(MsgWithdrawDelegatorReward),
        withdrawValidatorCommission: doMsg(MsgWithdrawValidatorCommission),
      },
      evidence: {
        submitEvidence: doMsg(MsgSubmitEvidence),
      },
      feegrant: {
        grantAllowance: doMsg(MsgGrantAllowance),
        revokeAllowance: doMsg(MsgRevokeAllowance),
      },
      gov: {
        deposit: doMsg(MsgDeposit),
        submitProposal: doMsg(MsgSubmitProposal),
        vote: doMsg(MsgVote),
        voteWeighted: doMsg(MsgVoteWeighted),
      },
      ibc: {
        transfer: doMsg(MsgTransfer),
      },
      slashing: {
        unjail: doMsg(MsgUnjail),
      },
      staking: {
        beginRedelegate: doMsg(MsgBeginRedelegate),
        createValidator: doMsg(MsgCreateValidator),
        delegate: doMsg(MsgDelegate),
        editValidator: doMsg(MsgEditValidator),
        undelegate: doMsg(MsgUndelegate),
      },
    };

    if (options.encryptionUtils) {
      this.encryptionUtils = options.encryptionUtils;
    } else {
      this.encryptionUtils = new EncryptionUtilsImpl(
        this.query.registration,
        options.encryptionSeed,
        this.chainId,
      );
    }

    // Reinitialize ComputeQuerier with a shared EncryptionUtils (better caching, same seed)
    this.query.compute = new ComputeQuerier(grpc, this.encryptionUtils);
  }

  private async getTx(
    hash: string,
    nonces: ComputeMsgToNonce = {},
  ): Promise<Tx | null> {
    const results = await this.txsQuery(`tx.hash='${hash}'`, nonces);
    return results[0] ?? null;
  }

  private async txsQuery(
    query: string,
    nonces: ComputeMsgToNonce = {},
  ): Promise<Tx[]> {
    const { txResponses } = await this.txService.getTxsEvent({
      events: query.split(" AND ").map((q) => q.trim()),
    });

    return await Promise.all(
      txResponses.map(async (tx) => {
        let rawLog: string = tx.rawLog;
        let jsonLog: JsonLog | undefined;
        let arrayLog: ArrayLog | undefined;
        if (tx.code === 0 && rawLog !== "") {
          jsonLog = JSON.parse(rawLog) as JsonLog;

          arrayLog = [];
          for (let msgIndex = 0; msgIndex < jsonLog.length; msgIndex++) {
            if (jsonLog[msgIndex].msg_index === undefined) {
              jsonLog[msgIndex].msg_index = msgIndex;
              // See https://github.com/cosmos/cosmos-sdk/pull/11147
            }

            const log = jsonLog[msgIndex];
            for (const event of log.events) {
              for (const attr of event.attributes) {
                // Try to decrypt
                if (event.type === "wasm") {
                  const nonce = nonces[msgIndex];
                  if (nonce && nonce.length === 32) {
                    try {
                      attr.key = fromUtf8(
                        await this.encryptionUtils.decrypt(
                          fromBase64(attr.key),
                          nonce,
                        ),
                      ).trim();
                    } catch (e) {}
                    try {
                      attr.value = fromUtf8(
                        await this.encryptionUtils.decrypt(
                          fromBase64(attr.value),
                          nonce,
                        ),
                      ).trim();
                    } catch (e) {}
                  }
                }

                arrayLog.push({
                  msg: msgIndex,
                  type: event.type,
                  key: attr.key,
                  value: attr.value,
                });
              }
            }
          }
        } else if (tx.code !== 0 && rawLog !== "") {
          try {
            const errorMessageRgx =
              /; message index: (\d+): encrypted: (.+?): (?:instantiate|execute|query) contract failed/g;
            const rgxMatches = errorMessageRgx.exec(rawLog);
            if (rgxMatches?.length === 3) {
              const encryptedError = fromBase64(rgxMatches[2]);
              const msgIndex = Number(rgxMatches[1]);

              const decryptedBase64Error = await this.encryptionUtils.decrypt(
                encryptedError,
                nonces[msgIndex],
              );

              const decryptedError = fromUtf8(decryptedBase64Error);

              rawLog = rawLog.replace(
                `encrypted: ${rgxMatches[2]}`,
                decryptedError,
              );

              try {
                jsonLog = JSON.parse(decryptedError);
              } catch (e) {}
            }
          } catch (decryptionError) {}
        }

        const { TxMsgData } = await import(
          "./protobuf_stuff/cosmos/base/abci/v1beta1/abci"
        );

        const txMsgData = TxMsgData.decode(fromHex(tx.data));
        let data = new Array<Uint8Array>(txMsgData.data.length);

        for (let msgIndex = 0; msgIndex < txMsgData.data.length; msgIndex++) {
          const nonce = nonces[msgIndex];
          if (nonce && nonce.length === 32) {
            try {
              data[msgIndex] = fromBase64(
                fromUtf8(
                  await this.encryptionUtils.decrypt(
                    txMsgData.data[msgIndex].data,
                    nonce,
                  ),
                ),
              );
            } catch (decryptionError) {
              data[msgIndex] = txMsgData.data[msgIndex].data;
            }
          }
        }

        const { Any } = await import("./protobuf_stuff/google/protobuf/any");

        return {
          height: Number(tx.height),
          transactionHash: tx.txhash,
          code: tx.code,
          tx: Any.encode(tx.tx!).finish(),
          rawLog,
          jsonLog,
          arrayLog,
          data,
          gasUsed: Number(tx.gasUsed),
          gasWanted: Number(tx.gasWanted),
        };
      }),
    );
  }

  /**
   * Broadcasts a signed transaction to the network and monitors its inclusion in a block.
   *
   * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
   * an error is thrown.
   *
   * If the transaction is not included in a block before the provided timeout, this errors with a `TimeoutError`.
   *
   * If the transaction is included in a block, a {@link Tx} is returned. The caller then
   * usually needs to check for execution success or failure.
   */
  private async broadcastTx(
    tx: Uint8Array,
    timeoutMs: number,
    checkIntervalMs: number,
    mode: BroadcastMode,
    waitForCommit: boolean,
    nonces: ComputeMsgToNonce,
  ): Promise<Tx> {
    const start = Date.now();

    let txhash: string;

    if (mode === BroadcastMode.Sync) {
      const { BroadcastMode } = await import(
        "./protobuf_stuff/cosmos/tx/v1beta1/service"
      );
      const { txResponse } = await this.txService.broadcastTx({
        txBytes: tx,
        mode: BroadcastMode.BROADCAST_MODE_SYNC,
      });
      if (txResponse?.code) {
        throw new Error(
          `Broadcasting transaction failed with code ${txResponse?.code} (codespace: ${txResponse?.codespace}). Log: ${txResponse?.rawLog}`,
        );
      }
      txhash = txResponse!.txhash;
    } else if (mode === BroadcastMode.Async) {
      const { BroadcastMode } = await import(
        "./protobuf_stuff/cosmos/tx/v1beta1/service"
      );
      const { txResponse } = await this.txService.broadcastTx({
        txBytes: tx,
        mode: BroadcastMode.BROADCAST_MODE_ASYNC,
      });
      txhash = txResponse!.txhash;
    } else {
      throw new Error(
        `Unknown broadcast mode "${String(mode)}", must be either "${String(
          BroadcastMode.Sync,
        )}" or "${String(BroadcastMode.Async)}".`,
      );
    }

    if (!waitForCommit) {
      //@ts-ignore
      return { transactionHash: txhash };
    }

    while (true) {
      // sleep first because there's no point in checking right after broadcasting
      await sleep(checkIntervalMs);

      const result = await this.getTx(txhash, nonces);

      if (result) {
        return result;
      }

      if (start + timeoutMs < Date.now()) {
        throw new Error(
          `Transaction ID ${txhash} was submitted but was not yet found on the chain. You might want to check later.`,
        );
      }
    }
  }

  private async signAndBroadcast(
    messages: Msg[],
    txOptions?: TxOptions,
  ): Promise<Tx> {
    const gasLimit = txOptions?.gasLimit ?? 25_000;
    const gasPriceInFeeDenom = txOptions?.gasPriceInFeeDenom ?? 0.25;
    const feeDenom = txOptions?.feeDenom ?? "uscrt";
    const memo = txOptions?.memo ?? "";
    const waitForCommit = txOptions?.waitForCommit ?? true;
    const broadcastTimeoutMs = txOptions?.broadcastTimeoutMs ?? 60_000;
    const broadcastCheckIntervalMs =
      txOptions?.broadcastCheckIntervalMs ?? 6_000;
    const broadcastMode = txOptions?.broadcastMode ?? BroadcastMode.Sync;
    const explicitSignerData = txOptions?.explicitSignerData;

    const [txRaw, nonces] = await this.sign(
      messages,
      {
        gas: String(gasLimit),
        amount: [
          {
            amount: String(gasToFee(gasLimit, gasPriceInFeeDenom)),
            denom: feeDenom,
          },
        ],
      },
      memo,
      explicitSignerData,
    );
    const txBytes = (
      await import("./protobuf_stuff/cosmos/tx/v1beta1/tx")
    ).TxRaw.encode(txRaw).finish();

    return this.broadcastTx(
      txBytes,
      broadcastTimeoutMs,
      broadcastCheckIntervalMs,
      broadcastMode,
      waitForCommit,
      nonces,
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
  private async sign(
    messages: Msg[],
    fee: StdFee,
    memo: string,
    explicitSignerData?: SignerData,
  ): Promise<
    [import("./protobuf_stuff/cosmos/tx/v1beta1/tx").TxRaw, ComputeMsgToNonce]
  > {
    const accountFromSigner = (await this.wallet.getAccounts()).find(
      (account) => account.address === this.address,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }

    let signerData: SignerData;
    if (explicitSignerData) {
      signerData = explicitSignerData;
    } else {
      const account = await this.query.auth.account({
        address: this.address,
      });

      if (!account) {
        throw new Error(
          `Cannot find account "${this.address}", make sure it has a balance.`,
        );
      }

      if (account.type !== "BaseAccount") {
        throw new Error(
          `Cannot sign with account of type "${account.type}", can only sign with "BaseAccount".`,
        );
      }

      const chainId = this.chainId;
      const baseAccount =
        account.account as import("./protobuf_stuff/cosmos/auth/v1beta1/auth").BaseAccount;
      signerData = {
        accountNumber: Number(baseAccount.accountNumber),
        sequence: Number(baseAccount.sequence),
        chainId: chainId,
      };
    }

    return isOfflineDirectSigner(this.wallet)
      ? this.signDirect(accountFromSigner, messages, fee, memo, signerData)
      : this.signAmino(accountFromSigner, messages, fee, memo, signerData);
  }

  private async signAmino(
    account: AccountData,
    messages: Msg[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<
    [import("./protobuf_stuff/cosmos/tx/v1beta1/tx").TxRaw, ComputeMsgToNonce]
  > {
    if (isOfflineDirectSigner(this.wallet)) {
      throw new Error("Wrong signer type! Expected AminoSigner.");
    }

    const signMode = (
      await import("./protobuf_stuff/cosmos/tx/signing/v1beta1/signing")
    ).SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    const msgs = await Promise.all(
      messages.map(async (msg) => {
        await this.populateCodeHash(msg);
        return msg.toAmino(this.encryptionUtils);
      }),
    );
    const signDoc = makeSignDocAmino(
      msgs,
      fee,
      chainId,
      memo,
      accountNumber,
      sequence,
    );
    const { signature, signed } = await this.wallet.signAmino(
      account.address,
      signDoc,
    );
    const encryptionNonces: ComputeMsgToNonce = {};
    const txBody = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: await Promise.all(
          messages.map(async (msg, index) => {
            await this.populateCodeHash(msg);
            const asProto = await msg.toProto(this.encryptionUtils);
            encryptionNonces[index] = extractNonce(asProto);

            return asProto;
          }),
        ),
        memo: memo,
      },
    };
    const txBodyBytes = await this.encodeTx(txBody);
    const signedGasLimit = Number(signed.fee.gas);
    const signedSequence = Number(signed.sequence);
    const pubkey = await encodePubkey(encodeSecp256k1Pubkey(account.pubkey));
    const signedAuthInfoBytes = await makeAuthInfoBytes(
      [{ pubkey, sequence: signedSequence }],
      signed.fee.amount,
      signedGasLimit,
      signMode,
    );
    return [
      (await import("./protobuf_stuff/cosmos/tx/v1beta1/tx")).TxRaw.fromPartial(
        {
          bodyBytes: txBodyBytes,
          authInfoBytes: signedAuthInfoBytes,
          signatures: [fromBase64(signature.signature)],
        },
      ),
      encryptionNonces,
    ];
  }

  private async populateCodeHash(msg: Msg) {
    if (msg instanceof MsgExecuteContract) {
      if (!msg.codeHash) {
        msg.codeHash = await this.query.compute.contractCodeHash(msg.contract);
      }
    } else if (msg instanceof MsgInstantiateContract) {
      if (!msg.codeHash) {
        msg.codeHash = await this.query.compute.codeHash(Number(msg.codeId));
      }
    }
  }

  private async encodeTx(txBody: {
    typeUrl: string;
    value: {
      messages: ProtoMsg[];
      memo: string;
    };
  }): Promise<Uint8Array> {
    const { Any } = await import("./protobuf_stuff/google/protobuf/any");

    const wrappedMessages = await Promise.all(
      txBody.value.messages.map(async (message) => {
        const binaryValue = await message.encode();
        return Any.fromPartial({
          typeUrl: message.typeUrl,
          value: binaryValue,
        });
      }),
    );

    const { TxBody } = await import("./protobuf_stuff/cosmos/tx/v1beta1/tx");

    const txBodyEncoded = TxBody.fromPartial({
      ...txBody.value,
      messages: wrappedMessages,
    });
    return TxBody.encode(txBodyEncoded).finish();
  }

  private async signDirect(
    account: AccountData,
    messages: Msg[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<
    [import("./protobuf_stuff/cosmos/tx/v1beta1/tx").TxRaw, ComputeMsgToNonce]
  > {
    if (!isOfflineDirectSigner(this.wallet)) {
      throw new Error("Wrong signer type! Expected DirectSigner.");
    }

    const encryptionNonces: ComputeMsgToNonce = {};
    const txBody = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: await Promise.all(
          messages.map(async (msg, index) => {
            await this.populateCodeHash(msg);
            const asProto = await msg.toProto(this.encryptionUtils);
            encryptionNonces[index] = extractNonce(asProto);

            return asProto;
          }),
        ),
        memo: memo,
      },
    };
    const txBodyBytes = await this.encodeTx(txBody);
    const pubkey = await encodePubkey(encodeSecp256k1Pubkey(account.pubkey));
    const gasLimit = Number(fee.gas);
    const authInfoBytes = await makeAuthInfoBytes(
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
    const { signature, signed } = await this.wallet.signDirect(
      account.address,
      signDoc,
    );
    return [
      (await import("./protobuf_stuff/cosmos/tx/v1beta1/tx")).TxRaw.fromPartial(
        {
          bodyBytes: signed.bodyBytes,
          authInfoBytes: signed.authInfoBytes,
          signatures: [fromBase64(signature.signature)],
        },
      ),
      encryptionNonces,
    ];
  }
}

function sleep(ms: number) {
  return new Promise((accept) => setTimeout(accept, ms));
}

export function gasToFee(gasLimit: number, gasPrice: number): number {
  return Math.ceil(gasLimit * gasPrice);
}

function extractNonce(msg: ProtoMsg): Uint8Array {
  if (msg.typeUrl === "/secret.compute.v1beta1.MsgInstantiateContract") {
    return msg.value.initMsg.slice(0, 32);
  }
  if (msg.typeUrl === "/secret.compute.v1beta1.MsgExecuteContract") {
    return msg.value.msg.slice(0, 32);
  }
  return new Uint8Array();
}

/**
 * Creates and serializes an AuthInfo document.
 *
 * This implementation does not support different signing modes for the different signers.
 */
async function makeAuthInfoBytes(
  signers: ReadonlyArray<{
    readonly pubkey: import("./protobuf_stuff/google/protobuf/any").Any;
    readonly sequence: number;
  }>,
  feeAmount: readonly Coin[],
  gasLimit: number,
  signMode?: import("./protobuf_stuff/cosmos/tx/signing/v1beta1/signing").SignMode,
): Promise<Uint8Array> {
  if (!signMode) {
    signMode = (
      await import("./protobuf_stuff/cosmos/tx/signing/v1beta1/signing")
    ).SignMode.SIGN_MODE_DIRECT;
  }

  const authInfo = {
    signerInfos: makeSignerInfos(signers, signMode),
    fee: {
      amount: [...feeAmount],
      gasLimit: String(gasLimit),
    },
  };

  const { AuthInfo } = await import("./protobuf_stuff/cosmos/tx/v1beta1/tx");
  return AuthInfo.encode(AuthInfo.fromPartial(authInfo)).finish();
}

/**
 * Create signer infos from the provided signers.
 *
 * This implementation does not support different signing modes for the different signers.
 */
function makeSignerInfos(
  signers: ReadonlyArray<{
    readonly pubkey: import("./protobuf_stuff/google/protobuf/any").Any;
    readonly sequence: number;
  }>,
  signMode: import("./protobuf_stuff/cosmos/tx/signing/v1beta1/signing").SignMode,
): import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignerInfo[] {
  return signers.map(
    ({
      pubkey,
      sequence,
    }): import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignerInfo => ({
      publicKey: pubkey,
      modeInfo: {
        single: { mode: signMode },
      },
      sequence: String(sequence),
    }),
  );
}

function makeSignDocProto(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  chainId: string,
  accountNumber: number,
): import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignDoc {
  return {
    bodyBytes: bodyBytes,
    authInfoBytes: authInfoBytes,
    chainId: chainId,
    accountNumber: String(accountNumber),
  };
}

async function encodePubkey(
  pubkey: Pubkey,
): Promise<import("./protobuf_stuff/google/protobuf/any").Any> {
  const { Any } = await import("./protobuf_stuff/google/protobuf/any");

  if (isSecp256k1Pubkey(pubkey)) {
    const { PubKey } = await import(
      "./protobuf_stuff/cosmos/crypto/secp256k1/keys"
    );

    const pubkeyProto = PubKey.fromPartial({
      key: fromBase64(pubkey.value),
    });
    return Any.fromPartial({
      typeUrl: "/cosmos.crypto.secp256k1.PubKey",
      value: Uint8Array.from(PubKey.encode(pubkeyProto).finish()),
    });
  } else if (isMultisigThresholdPubkey(pubkey)) {
    const { LegacyAminoPubKey } = await import(
      "./protobuf_stuff/cosmos/crypto/multisig/keys"
    );

    const pubkeyProto = LegacyAminoPubKey.fromPartial({
      threshold: Number(pubkey.value.threshold),
      publicKeys: pubkey.value.pubkeys.map(encodePubkey),
    });
    return Any.fromPartial({
      typeUrl: "/cosmos.crypto.multisig.LegacyAminoPubKey",
      value: Uint8Array.from(LegacyAminoPubKey.encode(pubkeyProto).finish()),
    });
  } else {
    throw new Error(`Pubkey type ${pubkey.type} not recognized`);
  }
}

function isSecp256k1Pubkey(pubkey: Pubkey): boolean {
  return pubkey.type === "tendermint/PubKeySecp256k1";
}

function isMultisigThresholdPubkey(pubkey: Pubkey): boolean {
  return pubkey.type === "tendermint/PubKeyMultisigThreshold";
}

function makeSignDocAmino(
  msgs: readonly AminoMsg[],
  fee: StdFee,
  chainId: string,
  memo: string | undefined,
  accountNumber: number | string,
  sequence: number | string,
): StdSignDoc {
  return {
    chain_id: chainId,
    account_number: String(accountNumber),
    sequence: String(sequence),
    fee: fee,
    msgs: msgs,
    memo: memo || "",
  };
}

export enum TxResultCode {
  /** Success is returned if the transaction executed successfuly */
  Success = 0,

  /** ErrInternal should never be exposed, but we reserve this code for non-specified errors */
  ErrInternal = 1,

  /** ErrTxDecode is returned if we cannot parse a transaction */
  ErrTxDecode = 2,

  /** ErrInvalidSequence is used the sequence number (nonce) is incorrect for the signature */
  ErrInvalidSequence = 3,

  /** ErrUnauthorized is used whenever a request without sufficient authorization is handled. */
  ErrUnauthorized = 4,

  /** ErrInsufficientFunds is used when the account cannot pay requested amount. */
  ErrInsufficientFunds = 5,

  /** ErrUnknownRequest to doc */
  ErrUnknownRequest = 6,

  /** ErrInvalidAddress to doc */
  ErrInvalidAddress = 7,

  /** ErrInvalidPubKey to doc */
  ErrInvalidPubKey = 8,

  /** ErrUnknownAddress to doc */
  ErrUnknownAddress = 9,

  /** ErrInvalidCoins to doc */
  ErrInvalidCoins = 10,

  /** ErrOutOfGas to doc */
  ErrOutOfGas = 11,

  /** ErrMemoTooLarge to doc */
  ErrMemoTooLarge = 12,

  /** ErrInsufficientFee to doc */
  ErrInsufficientFee = 13,

  /** ErrTooManySignatures to doc */
  ErrTooManySignatures = 14,

  /** ErrNoSignatures to doc */
  ErrNoSignatures = 15,

  /** ErrJSONMarshal defines an ABCI typed JSON marshalling error */
  ErrJSONMarshal = 16,

  /** ErrJSONUnmarshal defines an ABCI typed JSON unmarshalling error */
  ErrJSONUnmarshal = 17,

  /** ErrInvalidRequest defines an ABCI typed error where the request contains invalid data. */
  ErrInvalidRequest = 18,

  /** ErrTxInMempoolCache defines an ABCI typed error where a tx already exists in the mempool. */
  ErrTxInMempoolCache = 19,

  /** ErrMempoolIsFull defines an ABCI typed error where the mempool is full. */
  ErrMempoolIsFull = 20,

  /** ErrTxTooLarge defines an ABCI typed error where tx is too large. */
  ErrTxTooLarge = 21,

  /** ErrKeyNotFound defines an error when the key doesn't exist */
  ErrKeyNotFound = 22,

  /** ErrWrongPassword defines an error when the key password is invalid. */
  ErrWrongPassword = 23,

  /** ErrorInvalidSigner defines an error when the tx intended signer does not match the given signer. */
  ErrorInvalidSigner = 24,

  /** ErrorInvalidGasAdjustment defines an error for an invalid gas adjustment */
  ErrorInvalidGasAdjustment = 25,

  /** ErrInvalidHeight defines an error for an invalid height */
  ErrInvalidHeight = 26,

  /** ErrInvalidVersion defines a general error for an invalid version */
  ErrInvalidVersion = 27,

  /** ErrInvalidChainID defines an error when the chain-id is invalid. */
  ErrInvalidChainID = 28,

  /** ErrInvalidType defines an error an invalid type. */
  ErrInvalidType = 29,

  /** ErrTxTimeoutHeight defines an error for when a tx is rejected out due to an explicitly set timeout height. */
  ErrTxTimeoutHeight = 30,

  /** ErrUnknownExtensionOptions defines an error for unknown extension options. */
  ErrUnknownExtensionOptions = 31,

  /** ErrWrongSequence defines an error where the account sequence defined in the signer info doesn't match the account's actual sequence number. */
  ErrWrongSequence = 32,

  /** ErrPackAny defines an error when packing a protobuf message to Any fails. */
  ErrPackAny = 33,

  /** ErrUnpackAny defines an error when unpacking a protobuf message from Any fails. */
  ErrUnpackAny = 34,

  /** ErrLogic defines an internal logic error, e.g. an invariant or assertion that is violated. It is a programmer error, not a user-facing error. */
  ErrLogic = 35,

  /** ErrConflict defines a conflict error, e.g. when two goroutines try to access the same resource and one of them fails. */
  ErrConflict = 36,

  /** ErrNotSupported is returned when we call a branch of a code which is currently not supported. */
  ErrNotSupported = 37,

  /** ErrNotFound defines an error when requested entity doesn't exist in the state. */
  ErrNotFound = 38,

  /** ErrIO should be used to wrap internal errors caused by external operation. Examples: not DB domain error, file writing etc... */
  ErrIO = 39,

  /** ErrAppConfig defines an error occurred if min-gas-prices field in BaseConfig is empty. */
  ErrAppConfig = 40,

  /** ErrPanic is only set when we recover from a panic, so we know to redact potentially sensitive system info. */
  ErrPanic = 111222,
}

const typeUrlToImportData: {
  [typeUrl: string]: { name: string; path: string };
} = {
  "/cosmos.authz.v1beta1.MsgGrant": {
    path: "./protobuf_stuff/cosmos/authz/v1beta1/tx",
    name: "MsgGrant",
  },
  "/cosmos.authz.v1beta1.MsgExec": {
    path: "./protobuf_stuff/cosmos/authz/v1beta1/tx",
    name: "MsgExec",
  },
  "/cosmos.authz.v1beta1.MsgRevoke": {
    path: "./protobuf_stuff/cosmos/authz/v1beta1/tx",
    name: "MsgRevoke",
  },
  "/cosmos.bank.v1beta1.MsgSend": {
    path: "./protobuf_stuff/cosmos/bank/v1beta1/tx",
    name: "MsgSend",
  },
  "/cosmos.bank.v1beta1.MsgMultiSend": {
    path: "./protobuf_stuff/cosmos/bank/v1beta1/tx",
    name: "MsgMultiSend",
  },
  "/cosmos.crisis.v1beta1.MsgVerifyInvariant": {
    path: "./protobuf_stuff/cosmos/crisis/v1beta1/tx",
    name: "MsgVerifyInvariant",
  },
  "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": {
    path: "./protobuf_stuff/cosmos/distribution/v1beta1/tx",
    name: "MsgSetWithdrawAddress",
  },
  "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
    path: "./protobuf_stuff/cosmos/distribution/v1beta1/tx",
    name: "MsgWithdrawDelegatorReward",
  },
  "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission": {
    path: "./protobuf_stuff/cosmos/distribution/v1beta1/tx",
    name: "MsgWithdrawValidatorCommission",
  },
  "/cosmos.distribution.v1beta1.MsgFundCommunityPool": {
    path: "./protobuf_stuff/cosmos/distribution/v1beta1/tx",
    name: "MsgFundCommunityPool",
  },
  "/cosmos.evidence.v1beta1.MsgSubmitEvidence": {
    path: "./protobuf_stuff/cosmos/evidence/v1beta1/tx",
    name: "MsgSubmitEvidence",
  },
  "/cosmos.feegrant.v1beta1.MsgGrantAllowance": {
    path: "./protobuf_stuff/cosmos/feegrant/v1beta1/tx",
    name: "MsgGrantAllowance",
  },
  "/cosmos.feegrant.v1beta1.MsgRevokeAllowance": {
    path: "./protobuf_stuff/cosmos/feegrant/v1beta1/tx",
    name: "MsgRevokeAllowance",
  },
  "/cosmos.gov.v1beta1.MsgSubmitProposal": {
    path: "./protobuf_stuff/cosmos/gov/v1beta1/tx",
    name: "MsgSubmitProposal",
  },
  "/cosmos.gov.v1beta1.MsgVote": {
    path: "./protobuf_stuff/cosmos/gov/v1beta1/tx",
    name: "MsgVote",
  },
  "/cosmos.gov.v1beta1.MsgVoteWeighted": {
    path: "./protobuf_stuff/cosmos/gov/v1beta1/tx",
    name: "MsgVoteWeighted",
  },
  "/cosmos.gov.v1beta1.MsgDeposit": {
    path: "./protobuf_stuff/cosmos/gov/v1beta1/tx",
    name: "MsgDeposit",
  },
  "/cosmos.slashing.v1beta1.MsgUnjail": {
    path: "./protobuf_stuff/cosmos/slashing/v1beta1/tx",
    name: "MsgUnjail",
  },
  "/cosmos.staking.v1beta1.MsgCreateValidator": {
    path: "./protobuf_stuff/cosmos/staking/v1beta1/tx",
    name: "MsgCreateValidator",
  },
  "/cosmos.staking.v1beta1.MsgEditValidator": {
    path: "./protobuf_stuff/cosmos/staking/v1beta1/tx",
    name: "MsgEditValidator",
  },
  "/cosmos.staking.v1beta1.MsgDelegate": {
    path: "./protobuf_stuff/cosmos/staking/v1beta1/tx",
    name: "MsgDelegate",
  },
  "/cosmos.staking.v1beta1.MsgBeginRedelegate": {
    path: "./protobuf_stuff/cosmos/staking/v1beta1/tx",
    name: "MsgBeginRedelegate",
  },
  "/cosmos.staking.v1beta1.MsgUndelegate": {
    path: "./protobuf_stuff/cosmos/staking/v1beta1/tx",
    name: "MsgUndelegate",
  },
  "/ibc.applications.transfer.v1.MsgTransfer": {
    path: "./protobuf_stuff/ibc/applications/transfer/v1/tx",
    name: "MsgTransfer",
  },
  "/ibc.core.channel.v1.MsgChannelOpenInit": {
    path: "./protobuf_stuff/ibc/core/channel/v1/tx",
    name: "MsgChannelOpenInit",
  },
  "/ibc.core.channel.v1.MsgChannelOpenTry": {
    path: "./protobuf_stuff/ibc/core/channel/v1/tx",
    name: "MsgChannelOpenTry",
  },
  "/ibc.core.channel.v1.MsgChannelOpenAck": {
    path: "./protobuf_stuff/ibc/core/channel/v1/tx",
    name: "MsgChannelOpenAck",
  },
  "/ibc.core.channel.v1.MsgChannelOpenConfirm": {
    path: "./protobuf_stuff/ibc/core/channel/v1/tx",
    name: "MsgChannelOpenConfirm",
  },
  "/ibc.core.channel.v1.MsgChannelCloseInit": {
    path: "./protobuf_stuff/ibc/core/channel/v1/tx",
    name: "MsgChannelCloseInit",
  },
  "/ibc.core.channel.v1.MsgChannelCloseConfirm": {
    path: "./protobuf_stuff/ibc/core/channel/v1/tx",
    name: "MsgChannelCloseConfirm",
  },
  "/ibc.core.channel.v1.MsgRecvPacket": {
    path: "./protobuf_stuff/ibc/core/channel/v1/tx",
    name: "MsgRecvPacket",
  },
  "/ibc.core.channel.v1.MsgTimeout": {
    path: "./protobuf_stuff/ibc/core/channel/v1/tx",
    name: "MsgTimeout",
  },
  "/ibc.core.channel.v1.MsgTimeoutOnClose": {
    path: "./protobuf_stuff/ibc/core/channel/v1/tx",
    name: "MsgTimeoutOnClose",
  },
  "/ibc.core.channel.v1.MsgAcknowledgement": {
    path: "./protobuf_stuff/ibc/core/channel/v1/tx",
    name: "MsgAcknowledgement",
  },
  "/ibc.core.client.v1.MsgCreateClient": {
    path: "./protobuf_stuff/ibc/core/client/v1/tx",
    name: "MsgCreateClient",
  },
  "/ibc.core.client.v1.MsgUpdateClient": {
    path: "./protobuf_stuff/ibc/core/client/v1/tx",
    name: "MsgUpdateClient",
  },
  "/ibc.core.client.v1.MsgUpgradeClient": {
    path: "./protobuf_stuff/ibc/core/client/v1/tx",
    name: "MsgUpgradeClient",
  },
  "/ibc.core.client.v1.MsgSubmitMisbehaviour": {
    path: "./protobuf_stuff/ibc/core/client/v1/tx",
    name: "MsgSubmitMisbehaviour",
  },
  "/ibc.core.connection.v1.MsgConnectionOpenInit": {
    path: "./protobuf_stuff/ibc/core/connection/v1/tx",
    name: "MsgConnectionOpenInit",
  },
  "/ibc.core.connection.v1.MsgConnectionOpenTry": {
    path: "./protobuf_stuff/ibc/core/connection/v1/tx",
    name: "MsgConnectionOpenTry",
  },
  "/ibc.core.connection.v1.MsgConnectionOpenAck": {
    path: "./protobuf_stuff/ibc/core/connection/v1/tx",
    name: "MsgConnectionOpenAck",
  },
  "/ibc.core.connection.v1.MsgConnectionOpenConfirm": {
    path: "./protobuf_stuff/ibc/core/connection/v1/tx",
    name: "MsgConnectionOpenConfirm",
  },
  "/secret.compute.v1beta1.MsgStoreCode": {
    path: "./protobuf_stuff/secret/compute/v1beta1/msg",
    name: "MsgStoreCode",
  },
  "/secret.compute.v1beta1.MsgInstantiateContract": {
    path: "./protobuf_stuff/secret/compute/v1beta1/msg",
    name: "MsgInstantiateContract",
  },
  "/secret.compute.v1beta1.MsgExecuteContract": {
    path: "./protobuf_stuff/secret/compute/v1beta1/msg",
    name: "MsgExecuteContract",
  },
  "/secret.registration.v1beta1.RaAuthenticate": {
    path: "./protobuf_stuff/secret/registration/v1beta1/msg",
    name: "RaAuthenticate",
  },
};
