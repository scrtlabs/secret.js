// conditinally load cross-fetch for nodejs and react-native
if (typeof window === "undefined" || typeof window.fetch === "undefined") {
  const fetch = require("cross-fetch");
  global.fetch = fetch;
}

import {
  fromBase64,
  fromHex,
  fromUtf8,
  toBase64,
  toHex,
} from "@cosmjs/encoding";
import { sha256 } from "@noble/hashes/sha256";
import {
  Coin,
  MauthQuerier,
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
  MsgSnip721AddMinter,
  MsgSnip721Mint,
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
  MsgUpdateAdminParams,
  MsgVerifyInvariant,
  MsgVote,
  MsgVoteParams,
  MsgVoteWeighted,
  MsgVoteWeightedParams,
  MsgWithdrawDelegatorReward,
  MsgWithdrawDelegatorRewardParams,
  MsgWithdrawValidatorCommission,
  MsgWithdrawValidatorCommissionParams,
  NodeQuerier,
  StdSignature,
  bytesToAddress,
} from ".";
import { EncryptionUtils, EncryptionUtilsImpl } from "./encryption";
import { PermitSigner } from "./extensions/access_control/permit/permit_signer";
import {
  MsgCreateViewingKey,
  MsgSetViewingKey,
} from "./extensions/access_control/viewing_key/msgs";
import {
  CreateViewingKeyContractParams,
  SetViewingKeyContractParams,
} from "./extensions/access_control/viewing_key/params";
import { Snip1155Querier } from "./extensions/snip1155/query";
import {
  MsgSnip1155AddCurator,
  MsgSnip1155BatchSend,
  MsgSnip1155BatchTransfer,
  MsgSnip1155Burn,
  MsgSnip1155ChangeAdmin,
  MsgSnip1155ChangeMetadata,
  MsgSnip1155CurateTokens,
  MsgSnip1155Mint,
  MsgSnip1155RemoveAdmin,
  MsgSnip1155RemoveCurator,
  MsgSnip1155RemoveMinter,
  MsgSnip1155Send,
  MsgSnip1155Transfer,
  MsgSnipAddMinter,
} from "./extensions/snip1155/tx";
import {
  Snip1155AddCuratorOptions,
  Snip1155AddMinterOptions,
  Snip1155BatchSendOptions,
  Snip1155BatchTransferOptions,
  Snip1155BurnTokensOptions,
  Snip1155ChangeAdminOptions,
  Snip1155ChangeMetaDataOptions,
  Snip1155CurateTokensOptions,
  Snip1155MintTokensOptions,
  Snip1155RemoveAdminOptions,
  Snip1155RemoveCuratorOptions,
  Snip1155RemoveMinterOptions,
  Snip1155SendOptions,
  Snip1155TransferOptions,
} from "./extensions/snip1155/types";
import {
  MsgSnip20DecreaseAllowance,
  MsgSnip20IncreaseAllowance,
  MsgSnip20Send,
  MsgSnip20Transfer,
  Snip20Querier,
} from "./extensions/snip20";
import {
  Snip20DecreaseAllowanceOptions,
  Snip20IncreaseAllowanceOptions,
  Snip20SendOptions,
  Snip20TransferOptions,
} from "./extensions/snip20/types";
import { MsgSnip721Send, Snip721Querier } from "./extensions/snip721";
import {
  Snip721AddMinterOptions,
  Snip721MintOptions,
  Snip721SendOptions,
} from "./extensions/snip721/types";
import {
  BaseAccount,
  ModuleAccount,
} from "./grpc_gateway/cosmos/auth/v1beta1/auth.pb";
import { TxResponse as TxResponsePb } from "./grpc_gateway/cosmos/base/abci/v1beta1/abci.pb";
import { PageRequest } from "./grpc_gateway/cosmos/base/query/v1beta1/pagination.pb";
import {
  OrderBy,
  SimulateResponse,
  Service as TxService,
} from "./grpc_gateway/cosmos/tx/v1beta1/service.pb";
import { Tx as TxPb } from "./grpc_gateway/cosmos/tx/v1beta1/tx.pb";
import {
  ContinuousVestingAccount,
  DelayedVestingAccount,
} from "./grpc_gateway/cosmos/vesting/v1beta1/vesting.pb";
import { TxMsgData } from "./protobuf/cosmos/base/abci/v1beta1/abci";
import { LegacyAminoPubKey } from "./protobuf/cosmos/crypto/multisig/keys";
import { PubKey } from "./protobuf/cosmos/crypto/secp256k1/keys";
import {
  AuthInfo,
  SignDoc,
  TxBody as TxBodyPb,
  TxRaw,
} from "./protobuf/cosmos/tx/v1beta1/tx";
import { Any } from "./protobuf/google/protobuf/any";
import {
  MsgExecuteContractResponse,
  MsgInstantiateContractResponse,
  MsgMigrateContractResponse,
} from "./protobuf/secret/compute/v1beta1/msg";
import { AuthQuerier } from "./query/auth";
import { AuthzQuerier } from "./query/authz";
import { BankQuerier } from "./query/bank";
import { ComputeQuerier } from "./query/compute";
import { DistributionQuerier } from "./query/distribution";
import { EmergencyButtonQuerier } from "./query/emergency_button";
import { EvidenceQuerier } from "./query/evidence";
import { FeegrantQuerier } from "./query/feegrant";
import { GovQuerier } from "./query/gov";
import { IbcChannelQuerier } from "./query/ibc_channel";
import { IbcClientQuerier } from "./query/ibc_client";
import { IbcConnectionQuerier } from "./query/ibc_connection";
import { IbcFeeQuerier } from "./query/ibc_fee";
import { IbcInterchainAccountsControllerQuerier } from "./query/ibc_interchain_accounts_controller";
import { IbcInterchainAccountsHostQuerier } from "./query/ibc_interchain_accounts_host";
import { IbcPacketForwardQuerier } from "./query/ibc_packet_forward";
import { IbcTransferQuerier } from "./query/ibc_transfer";
import { MintQuerier } from "./query/mint";
import { ParamsQuerier } from "./query/params";
import { RegistrationQuerier } from "./query/registration";
import { SlashingQuerier } from "./query/slashing";
import { StakingQuerier } from "./query/staking";
import { TendermintQuerier } from "./query/tendermint";
import { UpgradeQuerier } from "./query/upgrade";
import {
  AminoMsg,
  Msg,
  MsgClearAdmin,
  MsgClearAdminParams,
  MsgMigrateContract,
  MsgMigrateContractParams,
  MsgParams,
  MsgPayPacketFee,
  MsgPayPacketFeeAsync,
  MsgPayPacketFeeAsyncParams,
  MsgPayPacketFeeParams,
  MsgRegisterCounterpartyPayee,
  MsgRegisterCounterpartyPayeeParams,
  MsgRegisterPayee,
  MsgRegisterPayeeParams,
  MsgRegistry,
  MsgSetAutoRestake,
  MsgSetAutoRestakeParams,
  MsgUpdateAdmin,
  ProtoMsg,
} from "./tx";
import {
  MsgToggleIbcSwitch,
  MsgToggleIbcSwitchParams,
} from "./tx/emergency_button";
import { RaAuthenticate, RaAuthenticateParams } from "./tx/registration";
import {
  MsgCreateVestingAccount,
  MsgCreateVestingAccountParams,
} from "./tx/vesting";
import {
  AccountData,
  AminoSignResponse,
  AminoSigner,
  Pubkey,
  Signer,
  StdFee,
  StdSignDoc,
  encodeSecp256k1Pubkey,
  isDirectSigner,
  isSignDoc,
  isSignDocCamelCase,
} from "./wallet_amino";

export type CreateClientOptions = {
  /** A URL to the API service, also known as LCD, REST API or gRPC-gateway, by default on port 1317 */
  url: string;
  /** The chain-id is used in encryption code & when signing txs. */
  chainId: string;
  /** A wallet for signing transactions & permits. When `wallet` is supplied, `walletAddress` & `chainId` must be supplied too. */
  wallet?: Signer;
  /** walletAddress is the specific account address in the wallet that is permitted to sign transactions & permits. */
  walletAddress?: string;
  /** Passing `encryptionSeed` will allow tx decryption at a later time. Ignored if `encryptionUtils` is supplied. Must be 32 bytes. */
  encryptionSeed?: Uint8Array;
  /** `encryptionUtils` overrides the default {@link EncryptionUtilsImpl}. */
  encryptionUtils?: EncryptionUtils;
};

/**
 * SingleMsgTx is a function that broadcasts a single message transaction.
 * It also has a `simulate()` method to execute the transaction without
 * committing it on-chain. This is helpful for gas estimation.
 *
 * WARNING: `tx.compute.instantiateContract()` & `tx.compute.executeContract()` simulation is not supported for security reasons!
 */
export type SingleMsgTx<T> = {
  (params: T, txOptions?: TxOptions): Promise<TxResponse>;
  simulate(params: T, txOptions?: TxOptions): Promise<SimulateResponse>;
};

export enum BroadcastMode {
  /**
   * Broadcast transaction to mempool and wait for DeliverTx response.
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_commit
   */
  Block = "Block",
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

export type IbcTxOptions = {
  /** If `false` skip resolving the IBC response txs (acknowledge/timeout).
   *
   * Defaults to `true` when broadcasting a tx or using `getTx()`.
   * Defaults to `false` when using `txsQuery()`.
   *
   */
  resolveResponses?: boolean;
  /**
   * How much time (in milliseconds) to wait for IBC response txs (acknowledge/timeout).
   *
   * Defaults to `120_000` (2 minutes).
   *
   */
  resolveResponsesTimeoutMs?: number;
  /**
   * When waiting for the IBC response txs (acknowledge/timeout) to commit on-chain, how much time (in milliseconds) to wait between checks.
   *
   * Smaller intervals will cause more load on your node provider. Keep in mind that blocks on Secret Network take about 6 seconds to finalize.
   *
   * Defaults to `15_000` (15 seconds).
   */
  resolveResponsesCheckIntervalMs?: number;
};

type ExplicitIbcTxOptions = {
  resolveResponses: boolean;
  resolveResponsesTimeoutMs: number;
  resolveResponsesCheckIntervalMs: number;
};

export type TxOptions = {
  /** Defaults to `25_000`. */
  gasLimit?: number;
  /** E.g. gasPriceInFeeDenom=0.1 & feeDenom="uscrt" => Total fee for tx is `0.1 * gasLimit`uscrt. Defaults to `0.1`. */
  gasPriceInFeeDenom?: number;
  /** Defaults to `"uscrt"`. */
  feeDenom?: string;
  /** Address of the fee granter from which to charge gas fees. */
  feeGranter?: string;
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
   * Smaller intervals will cause more load on your node provider. Keep in mind that blocks on Secret Network take about 6 seconds to finalize.
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
   * This is useful when using {@link BroadcastMode.Async} or when you don't want secretjs
   * to query for `accountNumber` & `accountSequence` from the chain. (smoother in UIs, less load on your node provider).
   */
  explicitSignerData?: SignerData;
  /**
   * Options for resolving IBC ack/timeout txs that resulted from this tx.
   */
  ibcTxsOptions?: IbcTxOptions;
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
  getTx: (
    hash: string,
    ibcTxOptions?: IbcTxOptions,
  ) => Promise<TxResponse | null>;
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
  txsQuery: (
    query: string,
    ibcTxOptions?: IbcTxOptions,
    pagination?: PageRequest,
    order_by?: OrderBy,
  ) => Promise<TxResponse[]>;
  auth: AuthQuerier;
  authz: AuthzQuerier;
  bank: BankQuerier;
  compute: ComputeQuerier;
  snip20: Snip20Querier;
  snip721: Snip721Querier;
  snip1155: Snip1155Querier;
  distribution: DistributionQuerier;
  evidence: EvidenceQuerier;
  feegrant: FeegrantQuerier;
  gov: GovQuerier;
  ibc_channel: IbcChannelQuerier;
  ibc_client: IbcClientQuerier;
  ibc_connection: IbcConnectionQuerier;
  ibc_transfer: IbcTransferQuerier;
  ibc_iterchain_accounts_host: IbcInterchainAccountsHostQuerier;
  ibc_iterchain_accounts_controller: IbcInterchainAccountsControllerQuerier;
  ibc_fee: IbcFeeQuerier;
  ibc_packet_forward: IbcPacketForwardQuerier;
  emergency_button: EmergencyButtonQuerier;
  mauth: MauthQuerier;
  mint: MintQuerier;
  node: NodeQuerier;
  params: ParamsQuerier;
  registration: RegistrationQuerier;
  slashing: SlashingQuerier;
  staking: StakingQuerier;
  tendermint: TendermintQuerier;
  upgrade: UpgradeQuerier;
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

export type AnyJson = { "@type": string } & any;

/** A transaction that is indexed as part of the transaction history */
export type TxResponse = {
  /** Block height in which the tx was committed on-chain */
  readonly height: number;
  /** An RFC 3339 timestamp of when the tx was committed on-chain.
   * The format is `{year}-{month}-{day}T{hour}:{min}:{sec}[.{frac_sec}]Z`.
   */
  readonly timestamp: string;
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
  /** Transaction execution error code. 0 on success. See {@link TxResultCode}. */
  readonly code: TxResultCode;
  /** Namespace for the Code */
  readonly codespace: string;
  /** Additional information. May be non-deterministic. */
  readonly info: string;
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

  /**
   * Events defines all the events emitted by processing a transaction. Note,
   * these events include those emitted by processing all the messages and those
   * emitted from the ante handler. Whereas Logs contains the events, with
   * additional metadata, emitted only by processing the messages.
   *
   * Note: events are not decrypted.
   */
  readonly events: Array<
    import("./grpc_gateway/tendermint/abci/types.pb").Event
  >;
  /** Return value (if there's any) for each input message */
  readonly data: Array<Uint8Array>;
  /**
   * Decoded transaction input.
   */
  readonly tx: TxPb;
  /**
   * Amount of gas that was actually used by the transaction.
   */
  readonly gasUsed: number;
  /**
   * Gas limit that was originaly set by the transaction.
   */
  readonly gasWanted: number;
  /** If code = 0 and the tx resulted in sending IBC packets, `ibcAckTxs` is a list of IBC acknowledgement or timeout transactions which signal whether the original IBC packet was accepted, rejected or timed-out on the receiving chain. */
  readonly ibcResponses: Array<Promise<IbcResponse>>;
};

export type IbcResponse = {
  type: "ack" | "timeout";
  tx: TxResponse;
};

export type TxSender = {
  /**
   * Sign and broadcast a transaction to Secret Network.
   *
   * @param {TxOptions} [options] Options for signing and broadcasting
   * @param {Number} [options.gasLimit=25_000]
   * @param {Number} [options.gasPriceInFeeDenom=0.1] E.g. gasPriceInFeeDenom=0.1 & feeDenom="uscrt" => Total fee for tx is `0.1 * gasLimit`uscrt.
   * @param {String} [options.feeDenom="uscrt"]
   * @param {String} [options.memo=""]
   * @param {boolean} [options.waitForCommit=true] If false returns immediately with `transactionHash`. Defaults to `true`.
   * @param {Number} [options.broadcastTimeoutMs=60_000] How much time (in milliseconds) to wait for tx to commit on-chain. Ignored if `waitForCommit = false`.
   * @param {Number} [options.broadcastCheckIntervalMs=6_000] When waiting for the tx to commit on-chain, how much time (in milliseconds) to wait between checks. Smaller intervals will cause more load on your node provider. Keep in mind that blocks on Secret Network take about 6 seconds to finalize. Ignored if `waitForCommit = false`.
   * @param {BroadcastMode} [options.broadcastMode=BroadcastMode.Sync] If {@link BroadcastMode.Sync} - Broadcast transaction to mempool and wait for CheckTx response. @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync. If {@link BroadcastMode.Async} Broadcast transaction to mempool and do not wait for CheckTx response. @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async.
   * @param {SignerData} [options.explicitSignerData] explicitSignerData  can be used to override `chainId`, `accountNumber` & `accountSequence`. This is useful when using {@link BroadcastMode.Async} or when you don't want secretjs to query for `accountNumber` & `accountSequence` from the chain. (smoother in UIs, less load on your node provider).
   * @param {Number} [options.explicitSignerData.accountNumber]
   * @param {Number} [options.explicitSignerData.sequence]
   * @param {String} [options.explicitSignerData.chainId]
   * @param {Msg[]} messages A list of messages, executed sequentially. If all messages succeeds then the transaction succeed, and the resulting {@link TxResponse} object will have `code = 0`. If at lease one message fails, the entire transaction is reverted and {@link TxResponse} `code` field will not be `0`.
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
   */
  broadcast: (messages: Msg[], txOptions?: TxOptions) => Promise<TxResponse>;

  /**
   * Prepare and sign an array of messages as a transaction
   * @async
   * @param {Msg[]} messages - Array of messages to prepare and sign
   * @param {TxOptions} [txOptions] - An optional object of transaction options
   * @returns {Promise<Uint8Array>} Returns a Promise that resolves txBytes, which can be passed into broadcastSignedTx().
   */
  signTx: (messages: Msg[], txOptions?: TxOptions) => Promise<Uint8Array>;

  /**
   * Broadcast a signed transactions
   * @async
   * @param {Uint8Array} txBytes - Signed transaction bytes, can be the output of signTx()
   * @param {TxOptions} [txOptions] - An optional object of transaction options
   * @returns {Promise<TxResponse>}
   */
  broadcastSignedTx: (
    txBytes: Uint8Array,
    txOptions?: TxOptions,
  ) => Promise<TxResponse>;

  /**
   * Simulates a transaction on the node without broadcasting it to the chain.
   * Can be used to get a gas estimation or to see the output without actually committing a transaction on-chain.
   * The input should be exactly how you'd use it in `broadcast`.
   *
   * WARNING: `MsgInstantiateContract` & `MsgExecuteContract` simulation is not supported for security reasons!
   */
  simulate: (
    messages: Msg[],
    txOptions?: TxOptions,
  ) => Promise<SimulateResponse>;

  snip721: {
    send: SingleMsgTx<MsgExecuteContractParams<Snip721SendOptions>>;
    mint: SingleMsgTx<MsgExecuteContractParams<Snip721MintOptions>>;
    addMinter: SingleMsgTx<MsgExecuteContractParams<Snip721AddMinterOptions>>;
    setViewingKey: SingleMsgTx<SetViewingKeyContractParams>;
    createViewingKey: SingleMsgTx<CreateViewingKeyContractParams>;
  };

  snip20: {
    send: SingleMsgTx<MsgExecuteContractParams<Snip20SendOptions>>;
    transfer: SingleMsgTx<MsgExecuteContractParams<Snip20TransferOptions>>;
    increaseAllowance: SingleMsgTx<
      MsgExecuteContractParams<Snip20IncreaseAllowanceOptions>
    >;
    decreaseAllowance: SingleMsgTx<
      MsgExecuteContractParams<Snip20DecreaseAllowanceOptions>
    >;
    setViewingKey: SingleMsgTx<SetViewingKeyContractParams>;
    createViewingKey: SingleMsgTx<CreateViewingKeyContractParams>;
  };

  snip1155: {
    changeAdmin: SingleMsgTx<
      MsgExecuteContractParams<Snip1155ChangeAdminOptions>
    >;
    removeAdmin: SingleMsgTx<
      MsgExecuteContractParams<Snip1155RemoveAdminOptions>
    >;
    addCurator: SingleMsgTx<
      MsgExecuteContractParams<Snip1155AddCuratorOptions>
    >;
    removeCurator: SingleMsgTx<
      MsgExecuteContractParams<Snip1155RemoveCuratorOptions>
    >;
    addMinter: SingleMsgTx<MsgExecuteContractParams<Snip1155AddMinterOptions>>;
    removeMinter: SingleMsgTx<
      MsgExecuteContractParams<Snip1155RemoveMinterOptions>
    >;
    send: SingleMsgTx<MsgExecuteContractParams<Snip1155SendOptions>>;
    batchSend: SingleMsgTx<MsgExecuteContractParams<Snip1155BatchSendOptions>>;
    transfer: SingleMsgTx<MsgExecuteContractParams<Snip1155TransferOptions>>;
    batchTransfer: SingleMsgTx<
      MsgExecuteContractParams<Snip1155BatchTransferOptions>
    >;
    curate: SingleMsgTx<MsgExecuteContractParams<Snip1155CurateTokensOptions>>;
    mint: SingleMsgTx<MsgExecuteContractParams<Snip1155MintTokensOptions>>;
    burn: SingleMsgTx<MsgExecuteContractParams<Snip1155BurnTokensOptions>>;
    changeMetaData: SingleMsgTx<
      MsgExecuteContractParams<Snip1155ChangeMetaDataOptions>
    >;
    setViewingKey: SingleMsgTx<SetViewingKeyContractParams>;
    createViewingKey: SingleMsgTx<CreateViewingKeyContractParams>;
  };

  authz: {
    /**
     * MsgExec attempts to execute the provided messages using
     * authorizations granted to the grantee. Each message should have only
     * one signer corresponding to the granter of the authorization.
     */
    exec: SingleMsgTx<MsgExecParams>;
    /**
     * MsgGrant is a request type for Grant method. It declares authorization to the grantee
     * on behalf of the granter with the provided expiration time.
     */
    grant: SingleMsgTx<MsgGrantParams>;
    /**
     * MsgRevoke revokes any authorization with the provided sdk.Msg type on the
     * granter's account with that has been granted to the grantee.
     */
    revoke: SingleMsgTx<MsgRevokeParams>;
  };
  bank: {
    /** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
    multiSend: SingleMsgTx<MsgMultiSendParams>;
    /** MsgSend represents a message to send coins from one account to another. */
    send: SingleMsgTx<MsgSendParams>;
  };
  compute: {
    /** Upload a compiled contract */
    storeCode: SingleMsgTx<MsgStoreCodeParams>;
    /** Instantiate a contract from code id */
    instantiateContract: SingleMsgTx<MsgInstantiateContractParams>;
    /** Execute a function on a contract */
    executeContract: SingleMsgTx<MsgExecuteContractParams<object>>;
    /** Runs a code upgrade/downgrade for a contract */
    migrateContract: SingleMsgTx<MsgMigrateContractParams<object>>;
    /** Update the admin of a contract */
    updateAdmin: SingleMsgTx<MsgUpdateAdminParams>;
    /** Clear the admin of a contract */
    clearAdmin: SingleMsgTx<MsgClearAdminParams>;
  };
  emergency_button: {
    toggleIbcSwitch: SingleMsgTx<MsgToggleIbcSwitchParams>;
  };
  crisis: {
    /** MsgVerifyInvariant represents a message to verify a particular invariance. */
    verifyInvariant: SingleMsgTx<MsgUpdateAdminParams>;
  };
  distribution: {
    /**
     * MsgFundCommunityPool allows an account to directly
     * fund the community pool.
     */
    fundCommunityPool: SingleMsgTx<MsgFundCommunityPoolParams>;
    /**
     * MsgSetWithdrawAddress sets the withdraw address for
     * a delegator (or validator self-delegation).
     */
    setWithdrawAddress: SingleMsgTx<MsgSetWithdrawAddressParams>;
    /**
     * MsgWithdrawDelegatorReward represents delegation withdrawal to a delegator
     * from a single validator.
     */
    withdrawDelegatorReward: SingleMsgTx<MsgWithdrawDelegatorRewardParams>;
    /**
     * MsgWithdrawValidatorCommission withdraws the full commission to the validator
     * address.
     */
    withdrawValidatorCommission: SingleMsgTx<MsgWithdrawValidatorCommissionParams>;
    /**
     * MsgWithdrawValidatorCommission withdraws the full commission to the validator
     * address.
     */
    setAutoRestake: SingleMsgTx<MsgSetAutoRestakeParams>;
  };
  evidence: {
    /**
     * MsgSubmitEvidence represents a message that supports submitting arbitrary
     * Evidence of misbehavior such as equivocation or counterfactual signing.
     */
    submitEvidence: SingleMsgTx<MsgSubmitEvidenceParams>;
  };
  feegrant: {
    /**
     * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
     * of fees from the account of Granter.
     */
    grantAllowance: SingleMsgTx<MsgGrantAllowanceParams>;
    /** MsgRevokeAllowance removes any existing Allowance from Granter to Grantee. */
    revokeAllowance: SingleMsgTx<MsgRevokeAllowanceParams>;
  };
  gov: {
    /** MsgDeposit defines a message to submit a deposit to an existing proposal. */
    deposit: SingleMsgTx<MsgDepositParams>;
    /**
     * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
     * proposal Content.
     */
    submitProposal: SingleMsgTx<MsgSubmitProposalParams>;
    /** MsgVote defines a message to cast a vote. */
    vote: SingleMsgTx<MsgVoteParams>;
    /** MsgVoteWeighted defines a message to cast a vote, with an option to split the vote. */
    voteWeighted: SingleMsgTx<MsgVoteWeightedParams>;
  };
  ibc: {
    /**
     * MsgTransfer defines a msg to transfer fungible tokens (i.e Coins) between
     * ICS20 enabled chains. See ICS Spec here:
     * https://github.com/cosmos/ics/tree/master/spec/ics-020-fungible-token-transfer#data-structures
     */
    transfer: SingleMsgTx<MsgTransferParams>;
  };
  ibc_fee: {
    payPacketFee: SingleMsgTx<MsgPayPacketFeeParams>;
    payPacketFeeAsync: SingleMsgTx<MsgPayPacketFeeAsyncParams>;
    registerPayee: SingleMsgTx<MsgRegisterPayeeParams>;
    registerCounterpartyPayee: SingleMsgTx<MsgRegisterCounterpartyPayeeParams>;
  };
  registration: {
    register: SingleMsgTx<RaAuthenticateParams>;
  };
  slashing: {
    /** MsgUnjail defines a message to release a validator from jail. */
    unjail: SingleMsgTx<MsgUnjailParams>;
  };
  staking: {
    /** MsgBeginRedelegate defines an SDK message for performing a redelegation of coins from a delegator and source validator to a destination validator. */
    beginRedelegate: SingleMsgTx<MsgBeginRedelegateParams>;
    /** MsgCreateValidator defines an SDK message for creating a new validator. */
    createValidator: SingleMsgTx<MsgCreateValidatorParams>;
    /** MsgDelegate defines an SDK message for performing a delegation of coins from a delegator to a validator. */
    delegate: SingleMsgTx<MsgDelegateParams>;
    /** MsgEditValidator defines an SDK message for editing an existing validator. */
    editValidator: SingleMsgTx<MsgEditValidatorParams>;
    /** MsgUndelegate defines an SDK message for performing an undelegation from a delegate and a validator */
    undelegate: SingleMsgTx<MsgUndelegateParams>;
  };
  vesting: {
    /** MsgCreateVestingAccount defines a message that enables creating a vesting account. */
    createVestingAccount: SingleMsgTx<MsgCreateVestingAccountParams>;
  };
};

type ComputeMsgToNonce = { [msgIndex: number]: Uint8Array };

export class SecretNetworkClient {
  public readonly query: Querier;
  public readonly tx: TxSender;
  public readonly address: string;
  private readonly url: string;
  private readonly wallet: Signer;
  private readonly chainId: string;

  private encryptionUtils: EncryptionUtils;

  public utils: { accessControl: { permit: PermitSigner } };

  /** Creates a new SecretNetworkClient client. For a readonly client pass just the `url` param. */
  constructor(options: CreateClientOptions) {
    this.url = options.url.replace(/\/*$/g, ""); // remove trailing slashes

    this.query = {
      auth: new AuthQuerier(options.url),
      authz: new AuthzQuerier(options.url),
      bank: new BankQuerier(options.url),
      compute: new ComputeQuerier(options.url),
      snip20: new Snip20Querier(options.url),
      snip721: new Snip721Querier(options.url),
      snip1155: new Snip1155Querier(options.url),
      distribution: new DistributionQuerier(options.url),
      evidence: new EvidenceQuerier(options.url),
      feegrant: new FeegrantQuerier(options.url),
      gov: new GovQuerier(options.url),
      ibc_channel: new IbcChannelQuerier(options.url),
      ibc_client: new IbcClientQuerier(options.url),
      ibc_connection: new IbcConnectionQuerier(options.url),
      ibc_transfer: new IbcTransferQuerier(options.url),
      ibc_iterchain_accounts_host: new IbcInterchainAccountsHostQuerier(
        options.url,
      ),
      ibc_iterchain_accounts_controller:
        new IbcInterchainAccountsControllerQuerier(options.url),
      ibc_fee: new IbcFeeQuerier(options.url),
      ibc_packet_forward: new IbcPacketForwardQuerier(options.url),
      emergency_button: new EmergencyButtonQuerier(options.url),
      mauth: new MauthQuerier(options.url),
      mint: new MintQuerier(options.url),
      node: new NodeQuerier(options.url),
      params: new ParamsQuerier(options.url),
      registration: new RegistrationQuerier(options.url),
      slashing: new SlashingQuerier(options.url),
      staking: new StakingQuerier(options.url),
      tendermint: new TendermintQuerier(options.url),
      upgrade: new UpgradeQuerier(options.url),
      getTx: (hash, ibcTxOptions) => this.getTx(hash, ibcTxOptions),
      txsQuery: (query, ibcTxOptions, pagination, order_by) =>
        this.txsQuery(query, ibcTxOptions, pagination, order_by),
    };

    if (options.wallet && options.walletAddress === undefined) {
      throw new Error("Must also pass 'walletAddress' when passing 'wallet'");
    }

    this.wallet = options.wallet ?? new ReadonlySigner();
    this.address = options.walletAddress ?? "";
    this.chainId = options.chainId;

    this.utils = { accessControl: { permit: new PermitSigner(this.wallet) } };

    // TODO fix this "any"
    const doMsg = (msgClass: any): SingleMsgTx<any> => {
      const func = (params: MsgParams, options?: TxOptions) => {
        return this.tx.broadcast([new msgClass(params)], options);
      };
      func.simulate = (params: MsgParams, options?: TxOptions) => {
        return this.tx.simulate([new msgClass(params)], options);
      };

      return func;
    };

    this.tx = {
      signTx: this.signTx.bind(this),
      broadcastSignedTx: this.broadcastSignedTx.bind(this),

      broadcast: this.signAndBroadcast.bind(this),
      simulate: this.simulate.bind(this),

      snip20: {
        send: doMsg(MsgSnip20Send),
        transfer: doMsg(MsgSnip20Transfer),
        increaseAllowance: doMsg(MsgSnip20IncreaseAllowance),
        decreaseAllowance: doMsg(MsgSnip20DecreaseAllowance),
        setViewingKey: doMsg(MsgSetViewingKey),
        createViewingKey: doMsg(MsgCreateViewingKey),
      },

      snip721: {
        send: doMsg(MsgSnip721Send),
        mint: doMsg(MsgSnip721Mint),
        addMinter: doMsg(MsgSnip721AddMinter),
        setViewingKey: doMsg(MsgSetViewingKey),
        createViewingKey: doMsg(MsgCreateViewingKey),
      },

      snip1155: {
        changeAdmin: doMsg(MsgSnip1155ChangeAdmin),
        removeAdmin: doMsg(MsgSnip1155RemoveAdmin),
        addCurator: doMsg(MsgSnip1155AddCurator),
        removeCurator: doMsg(MsgSnip1155RemoveCurator),
        addMinter: doMsg(MsgSnipAddMinter),
        removeMinter: doMsg(MsgSnip1155RemoveMinter),
        send: doMsg(MsgSnip1155Send),
        batchSend: doMsg(MsgSnip1155BatchSend),
        transfer: doMsg(MsgSnip1155Transfer),
        batchTransfer: doMsg(MsgSnip1155BatchTransfer),
        curate: doMsg(MsgSnip1155CurateTokens),
        mint: doMsg(MsgSnip1155Mint),
        burn: doMsg(MsgSnip1155Burn),
        changeMetaData: doMsg(MsgSnip1155ChangeMetadata),
        setViewingKey: doMsg(MsgSetViewingKey),
        createViewingKey: doMsg(MsgCreateViewingKey),
      },

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
        storeCode: doMsg(MsgStoreCode),
        instantiateContract: doMsg(MsgInstantiateContract),
        executeContract: doMsg(MsgExecuteContract),
        migrateContract: doMsg(MsgMigrateContract),
        updateAdmin: doMsg(MsgUpdateAdmin),
        clearAdmin: doMsg(MsgClearAdmin),
      },
      emergency_button: {
        toggleIbcSwitch: doMsg(MsgToggleIbcSwitch),
      },
      crisis: {
        verifyInvariant: doMsg(MsgVerifyInvariant),
      },
      distribution: {
        fundCommunityPool: doMsg(MsgFundCommunityPool),
        setWithdrawAddress: doMsg(MsgSetWithdrawAddress),
        withdrawDelegatorReward: doMsg(MsgWithdrawDelegatorReward),
        withdrawValidatorCommission: doMsg(MsgWithdrawValidatorCommission),
        setAutoRestake: doMsg(MsgSetAutoRestake),
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
      ibc_fee: {
        payPacketFee: doMsg(MsgPayPacketFee),
        payPacketFeeAsync: doMsg(MsgPayPacketFeeAsync),
        registerPayee: doMsg(MsgRegisterPayee),
        registerCounterpartyPayee: doMsg(MsgRegisterCounterpartyPayee),
      },
      registration: {
        register: doMsg(RaAuthenticate),
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
      vesting: {
        createVestingAccount: doMsg(MsgCreateVestingAccount),
      },
    };

    if (options.encryptionUtils) {
      this.encryptionUtils = options.encryptionUtils;
    } else {
      this.encryptionUtils = new EncryptionUtilsImpl(
        this.url,
        options.encryptionSeed,
        this.chainId,
      );
    }

    // Reinitialize ComputeQuerier with a shared EncryptionUtils (better caching, same seed)
    this.query.compute = new ComputeQuerier(this.url, this.encryptionUtils);
  }

  private async getTx(
    hash: string,
    ibcTxOptions?: IbcTxOptions,
  ): Promise<TxResponse | null> {
    try {
      const { tx_response } = await TxService.GetTx(
        { hash },
        { pathPrefix: this.url },
      );

      return tx_response
        ? this.decodeTxResponse(tx_response, ibcTxOptions)
        : null;
    } catch (error) {
      const txNotFoundRegex = new RegExp(
        `tx not found: ${hash}|tx \\(${hash}\\) not found`,
        "i",
      );

      if (
        typeof error?.message == "string" &&
        error?.message?.match(txNotFoundRegex) !== null
      ) {
        return null;
      } else {
        throw error;
      }
    }
  }

  private async txsQuery(
    query: string,
    ibcTxOptions: IbcTxOptions = {
      resolveResponses: false,
    },
    pagination: PageRequest = {
      key: undefined,
      offset: undefined,
      limit: undefined,
      count_total: undefined,
      reverse: undefined,
    },
    order_by?: OrderBy,
  ): Promise<TxResponse[]> {
    const { tx_responses } = await TxService.GetTxsEvent(
      {
        events: query.split(" AND ").map((q) => q.trim()),
        pagination,
        order_by,
      },
      { pathPrefix: this.url },
    );

    return this.decodeTxResponses(tx_responses ?? [], ibcTxOptions);
  }

  private async waitForIbcResponse(
    packetSequence: string,
    packetSrcChannel: string,
    type: "ack" | "timeout",
    ibcTxOptions: ExplicitIbcTxOptions,
    isDoneObject: { isDone: boolean },
  ): Promise<IbcResponse> {
    return new Promise(async (resolve, reject) => {
      let tries =
        ibcTxOptions.resolveResponsesTimeoutMs /
        ibcTxOptions.resolveResponsesCheckIntervalMs;

      let txType: string = type;
      if (type === "ack") {
        txType = "acknowledge";
      }

      const query = [
        `${txType}_packet.packet_src_channel = '${packetSrcChannel}'`,
        `${txType}_packet.packet_sequence = '${packetSequence}'`,
      ].join(" AND ");

      while (tries > 0 && !isDoneObject.isDone) {
        const txs = await this.txsQuery(query);

        const ibcRespTx = txs.find((tx) => tx.code === 0);

        if (ibcRespTx) {
          isDoneObject.isDone = true;
          resolve({
            type,
            tx: ibcRespTx,
          });
        }

        tries--;
        await sleep(ibcTxOptions.resolveResponsesCheckIntervalMs);
      }

      reject(
        `timed-out while trying to resolve IBC ${type} tx for packet_src_channel='${packetSrcChannel}' and packet_sequence='${packetSequence}'`,
      );
    });
  }

  private async decodeTxResponses(
    txResponses: TxResponsePb[],
    ibcTxOptions?: IbcTxOptions,
  ): Promise<TxResponse[]> {
    return await Promise.all(
      txResponses.map((x) => this.decodeTxResponse(x, ibcTxOptions)),
    );
  }

  private async decodeTxResponse(
    txResp: TxResponsePb,
    ibcTxOptions?: IbcTxOptions,
  ): Promise<TxResponse> {
    let explicitIbcTxOptions: ExplicitIbcTxOptions;

    if (!ibcTxOptions) {
      explicitIbcTxOptions = {
        resolveResponses: true,
        resolveResponsesTimeoutMs: 120_000,
        resolveResponsesCheckIntervalMs: 15_000,
      };
    } else {
      explicitIbcTxOptions = {
        resolveResponses:
          typeof ibcTxOptions.resolveResponses === "boolean"
            ? ibcTxOptions.resolveResponses
            : true,
        resolveResponsesTimeoutMs:
          typeof ibcTxOptions.resolveResponsesTimeoutMs === "number"
            ? ibcTxOptions.resolveResponsesTimeoutMs
            : 120_000,
        resolveResponsesCheckIntervalMs:
          typeof ibcTxOptions.resolveResponsesCheckIntervalMs === "number"
            ? ibcTxOptions.resolveResponsesCheckIntervalMs
            : 15_000,
      };
    }

    const nonces: ComputeMsgToNonce = [];

    const tx = txResp.tx as TxPb;

    // Decoded input tx messages
    for (
      let i = 0;
      !isNaN(Number(tx?.body?.messages?.length)) &&
      i < Number(tx?.body?.messages?.length);
      i++
    ) {
      const msg: AnyJson = tx.body!.messages![i];

      // Check if the message needs decryption
      let contractInputMsgFieldName = "";
      if (msg["@type"] === "/secret.compute.v1beta1.MsgInstantiateContract") {
        contractInputMsgFieldName = "init_msg";
      } else if (
        msg["@type"] === "/secret.compute.v1beta1.MsgExecuteContract" ||
        msg["@type"] === "/secret.compute.v1beta1.MsgMigrateContract"
      ) {
        contractInputMsgFieldName = "msg";
      }

      if (contractInputMsgFieldName !== "") {
        // Encrypted, try to decrypt
        try {
          const contractInputMsgBytes = fromBase64(
            msg[contractInputMsgFieldName],
          );

          const nonce = contractInputMsgBytes.slice(0, 32);
          const ciphertext = contractInputMsgBytes.slice(64);

          const plaintext = await this.encryptionUtils.decrypt(
            ciphertext,
            nonce,
          );
          msg[contractInputMsgFieldName] = JSON.parse(
            fromUtf8(plaintext).slice(64), // first 64 chars is the codeHash as a hex string
          );

          nonces[i] = nonce; // Fill nonces array to later use it in output decryption
        } catch (decryptionError) {
          // Not encrypted or can't decrypt because not original sender
        }
      }

      tx.body!.messages![i] = msg;
    }

    let rawLog: string = txResp.raw_log!;
    let jsonLog: JsonLog | undefined;
    let arrayLog: ArrayLog | undefined;
    let ibcResponses: Array<Promise<IbcResponse>> = [];
    if (txResp.code === 0 && rawLog !== "") {
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
    } else if (txResp.code !== 0 && rawLog !== "") {
      try {
        const errorMessageRgx =
          /; message index: (\d+):(?: dispatch: submessages:)* encrypted: (.+?): (?:instantiate|execute|query|reply to|migrate) contract failed/g;
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
      } catch (decryptionError) {
        // Not encrypted or can't decrypt because not original sender
      }
    }

    const txMsgData = TxMsgData.decode(fromHex(txResp.data!));
    const data = new Array<Uint8Array>(txMsgData.data.length);

    for (let msgIndex = 0; msgIndex < txMsgData.data.length; msgIndex++) {
      data[msgIndex] = txMsgData.data[msgIndex].data;

      const nonce = nonces[msgIndex];
      if (nonce && nonce.length === 32) {
        // Check if the output data needs decryption

        try {
          const { "@type": type_url } = tx.body!.messages![msgIndex] as AnyJson;

          if (type_url === "/secret.compute.v1beta1.MsgInstantiateContract") {
            const decoded = MsgInstantiateContractResponse.decode(
              txMsgData.data[msgIndex].data,
            );
            const decrypted = fromBase64(
              fromUtf8(await this.encryptionUtils.decrypt(decoded.data, nonce)),
            );
            data[msgIndex] = MsgInstantiateContractResponse.encode({
              address: decoded.address,
              data: decrypted,
            }).finish();
          } else if (
            type_url === "/secret.compute.v1beta1.MsgExecuteContract"
          ) {
            const decoded = MsgExecuteContractResponse.decode(
              txMsgData.data[msgIndex].data,
            );
            const decrypted = fromBase64(
              fromUtf8(await this.encryptionUtils.decrypt(decoded.data, nonce)),
            );
            data[msgIndex] = MsgExecuteContractResponse.encode({
              data: decrypted,
            }).finish();
          } else if (
            type_url === "/secret.compute.v1beta1.MsgMigrateContract"
          ) {
            const decoded = MsgMigrateContractResponse.decode(
              txMsgData.data[msgIndex].data,
            );
            const decrypted = fromBase64(
              fromUtf8(await this.encryptionUtils.decrypt(decoded.data, nonce)),
            );
            data[msgIndex] = MsgMigrateContractResponse.encode({
              data: decrypted,
            }).finish();
          }
        } catch (decryptionError) {
          // Not encrypted or can't decrypt because not original sender
        }
      }
    }

    // IBC ACKs:
    if (txResp.code === TxResultCode.Success) {
      const packetSequences =
        arrayLog?.filter(
          (x) => x.type === "send_packet" && x.key === "packet_sequence",
        ) || [];

      const packetSrcChannels =
        arrayLog?.filter(
          (x) => x.type === "send_packet" && x.key === "packet_src_channel",
        ) || [];

      if (explicitIbcTxOptions.resolveResponses) {
        for (let msgIndex = 0; msgIndex < packetSequences?.length; msgIndex++) {
          // isDoneObject is used to cancel the second promise if the first one is resolved
          const isDoneObject = {
            isDone: false,
          };

          ibcResponses.push(
            Promise.race([
              this.waitForIbcResponse(
                packetSequences[msgIndex].value,
                packetSrcChannels[msgIndex].value,
                "ack",
                explicitIbcTxOptions,
                isDoneObject,
              ),
              this.waitForIbcResponse(
                packetSequences[msgIndex].value,
                packetSrcChannels[msgIndex].value,
                "timeout",
                explicitIbcTxOptions,
                isDoneObject,
              ),
            ]),
          );
        }
      }
    }

    return {
      height: Number(txResp.height),
      timestamp: txResp.timestamp!,
      transactionHash: txResp.txhash!,
      code: txResp.code!,
      codespace: txResp.codespace!,
      info: txResp.info!,
      tx,
      rawLog,
      jsonLog,
      arrayLog,
      events: txResp.events!,
      data,
      gasUsed: Number(txResp.gas_used),
      gasWanted: Number(txResp.gas_wanted),
      ibcResponses,
    };
  }

  /**
   * Broadcasts a signed transaction to the network and monitors its inclusion in a block.
   *
   * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
   * an error is thrown.
   *
   * If the transaction is not included in a block before the provided timeout, this errors with a `TimeoutError`.
   *
   * If the transaction is included in a block, a {@link TxResponse} is returned. The caller then
   * usually needs to check for execution success or failure.
   */
  private async broadcastTx(
    txBytes: Uint8Array,
    timeoutMs: number,
    checkIntervalMs: number,
    mode: BroadcastMode,
    waitForCommit: boolean,
    ibcTxOptions?: IbcTxOptions,
  ): Promise<TxResponse> {
    const start = Date.now();

    const txhash = toHex(sha256(txBytes)).toUpperCase();

    if (!waitForCommit && mode == BroadcastMode.Block) {
      mode = BroadcastMode.Sync;
    }

    let tx_response: TxResponsePb | undefined;

    if (mode === BroadcastMode.Block) {
      waitForCommit = true;

      const { BroadcastMode } = await import(
        "./grpc_gateway/cosmos/tx/v1beta1/service.pb"
      );

      let isBroadcastTimedOut = false;
      try {
        ({ tx_response } = await TxService.BroadcastTx(
          {
            //@ts-ignore for some reason the type is tx_bytes but only works as txBytes
            txBytes: toBase64(txBytes),
            mode: BroadcastMode.BROADCAST_MODE_BLOCK,
          },
          { pathPrefix: this.url },
        ));
      } catch (e) {
        if (
          JSON.stringify(e)
            .toLowerCase()
            .includes("timed out waiting for tx to be included in a block")
        ) {
          isBroadcastTimedOut = true;
        } else {
          throw new Error(
            `Failed to broadcast transaction ID ${txhash}: '${JSON.stringify(
              e,
            )}'.`,
          );
        }
      }

      if (!isBroadcastTimedOut) {
        tx_response!.tx = (
          await import("./protobuf/cosmos/tx/v1beta1/tx")
        ).Tx.toJSON(
          (await import("./protobuf/cosmos/tx/v1beta1/tx")).Tx.decode(txBytes),
        ) as AnyJson;

        const tx = tx_response!.tx as TxPb;

        const resolvePubkey = (pubkey: Any) => {
          if (pubkey.type_url === "/cosmos.crypto.multisig.LegacyAminoPubKey") {
            const multisig = LegacyAminoPubKey.decode(
              // @ts-expect-error
              fromBase64(pubkey.value),
            );
            for (let i = 0; i < multisig.public_keys.length; i++) {
              // @ts-expect-error
              multisig.public_keys[i] = resolvePubkey(multisig.public_keys[i]);
            }

            return LegacyAminoPubKey.toJSON(multisig);
          } else {
            return {
              type_url: pubkey.type_url,
              // assuming all single pubkeys have the same protobuf type
              // this works for secp256k1, secp256r1 & ethermint pubkeys
              value: PubKey.toJSON(
                PubKey.decode(
                  // @ts-expect-error
                  // pubkey.value is actually a base64 string but it's Any
                  // so TypeScript thinks it's a Uint8Array
                  fromBase64(pubkey.value),
                ),
              ),
            };
          }
        };

        //@ts-ignore
        tx.auth_info!.signer_infos! = tx.auth_info?.signer_infos?.map((si) => {
          //@ts-ignore
          si.public_key = resolvePubkey(si.public_key);
          return si;
        });

        for (
          let i = 0;
          !isNaN(Number(tx.body?.messages?.length)) &&
          i < Number(tx.body?.messages?.length);
          i++
        ) {
          //@ts-ignore
          let msg: { type_url: string; value: any } = tx.body!.messages![i];

          const { type_url: msgType, value: msgBytes } = msg;

          const msgDecoder = MsgRegistry.get(msgType);
          if (!msgDecoder) {
            continue;
          }

          msg = {
            type_url: msgType,
            value: msgDecoder.decode(fromBase64(msgBytes)),
          };

          if (
            msg.type_url === "/secret.compute.v1beta1.MsgInstantiateContract"
          ) {
            msg.value.sender = bytesToAddress(msg.value.sender);
            msg.value.init_msg = toBase64(msg.value.init_msg);
            msg.value.callback_sig = null;
          } else if (
            msg.type_url === "/secret.compute.v1beta1.MsgExecuteContract"
          ) {
            msg.value.sender = bytesToAddress(msg.value.sender);
            msg.value.contract = bytesToAddress(msg.value.contract);
            msg.value.msg = toBase64(msg.value.msg);
            msg.value.callback_sig = null;
          } else if (msg.type_url === "/secret.compute.v1beta1.MsgStoreCode") {
            msg.value.sender = bytesToAddress(msg.value.sender);
            msg.value.wasm_byte_code = toBase64(msg.value.wasm_byte_code);
          } else if (
            msg.type_url === "/secret.compute.v1beta1.MsgMigrateContract"
          ) {
            msg.value.msg = toBase64(msg.value.msg);
          }

          tx.body!.messages![i] = msg;
        }

        tx_response!.tx = {
          "@type": "/cosmos.tx.v1beta1.Tx",
          ...protobufJsonToGrpcGatewayJson(tx_response!.tx),
        };

        return await this.decodeTxResponse(tx_response!, ibcTxOptions);
      }
    } else if (mode === BroadcastMode.Sync) {
      const { BroadcastMode } = await import(
        "./grpc_gateway/cosmos/tx/v1beta1/service.pb"
      );

      ({ tx_response } = await TxService.BroadcastTx(
        {
          //@ts-ignore for some reason the type is tx_bytes but only works as txBytes
          txBytes: toBase64(txBytes),
          mode: BroadcastMode.BROADCAST_MODE_SYNC,
        },
        { pathPrefix: this.url },
      ));

      if (tx_response?.code !== 0) {
        throw new Error(
          `Broadcasting transaction failed with code ${tx_response?.code} (codespace: ${tx_response?.codespace}). Log: ${tx_response?.raw_log}`,
        );
      }
    } else if (mode === BroadcastMode.Async) {
      const { BroadcastMode } = await import(
        "./grpc_gateway/cosmos/tx/v1beta1/service.pb"
      );

      TxService.BroadcastTx(
        {
          //@ts-ignore for some reason the type is tx_bytes but only works as txBytes
          txBytes: toBase64(txBytes),
          mode: BroadcastMode.BROADCAST_MODE_ASYNC,
        },
        { pathPrefix: this.url },
      );
    } else {
      throw new Error(
        `Unknown broadcast mode "${String(mode)}", must be either "${String(
          BroadcastMode.Block,
        )}", "${String(BroadcastMode.Sync)}" or "${String(
          BroadcastMode.Async,
        )}".`,
      );
    }

    if (!waitForCommit) {
      //@ts-ignore
      return { transactionHash: txhash };
    }

    // sleep first because there's no point in checking right after broadcasting
    await sleep(checkIntervalMs / 2);

    while (true) {
      const result = await this.getTx(txhash, ibcTxOptions);

      if (result) {
        return result;
      }

      if (start + timeoutMs < Date.now()) {
        throw new Error(
          `Transaction ID ${txhash} was submitted but was not yet found on the chain. You might want to check later or increase broadcastTimeoutMs from '${timeoutMs}'.`,
        );
      }

      await sleep(checkIntervalMs);
    }
  }

  /**
   * Prepare and sign an array of messages as a transaction
   * @async
   * @private
   * @param {Msg[]} messages - Array of messages to prepare and sign
   * @param {TxOptions} [txOptions] - An optional object of transaction options
   * @returns {Promise<Uint8Array>} Returns a Promise that resolves txBytes, which can be passed into broadcastSignedTx().
   */
  private async signTx(
    messages: Msg[],
    txOptions?: TxOptions,
  ): Promise<Uint8Array> {
    return this.prepareAndSign(messages, txOptions);
  }

  /**
   * Broadcast a signed transactions
   * @async
   * @private
   * @param {Uint8Array} txBytes - Signed transaction bytes, can be the output of signTx()
   * @param {TxOptions} [txOptions] - An optional object of transaction options
   * @returns {Promise<TxResponse>}
   */
  private async broadcastSignedTx(
    txBytes: Uint8Array,
    txOptions?: TxOptions,
  ): Promise<TxResponse> {
    return this.broadcastTx(
      txBytes,
      txOptions?.broadcastTimeoutMs ?? 60_000,
      txOptions?.broadcastCheckIntervalMs ?? 6_000,
      txOptions?.broadcastMode ?? BroadcastMode.Block,
      txOptions?.waitForCommit ?? true,
    );
  }

  public async prepareAndSign(
    messages: Msg[],
    txOptions?: TxOptions,
    simulate: boolean = false,
  ): Promise<Uint8Array> {
    const gasLimit = txOptions?.gasLimit ?? 25_000;
    const gasPriceInFeeDenom = txOptions?.gasPriceInFeeDenom ?? 0.1;
    const feeDenom = txOptions?.feeDenom ?? "uscrt";
    const memo = txOptions?.memo ?? "";
    const feeGranter = txOptions?.feeGranter;

    const explicitSignerData = txOptions?.explicitSignerData;

    const txRaw = await this.sign(
      messages,
      {
        gas: String(gasLimit),
        amount: [
          {
            amount: String(gasToFee(gasLimit, gasPriceInFeeDenom)),
            denom: feeDenom,
          },
        ],
        granter: feeGranter,
      },
      memo,
      explicitSignerData,
      simulate,
    );

    return TxRaw.encode(txRaw).finish();
  }

  private async signAndBroadcast(
    messages: Msg[],
    txOptions?: TxOptions,
  ): Promise<TxResponse> {
    const txBytes = await this.prepareAndSign(messages, txOptions);

    return this.broadcastTx(
      txBytes,
      txOptions?.broadcastTimeoutMs ?? 60_000,
      txOptions?.broadcastCheckIntervalMs ?? 6_000,
      txOptions?.broadcastMode ?? BroadcastMode.Block,
      txOptions?.waitForCommit ?? true,
      txOptions?.ibcTxsOptions,
    );
  }

  private async simulate(
    messages: Msg[],
    txOptions?: TxOptions,
  ): Promise<SimulateResponse> {
    const txBytes = await this.prepareAndSign(messages, txOptions, true);
    return TxService.Simulate(
      //@ts-ignore for some reason the type is tx_bytes but only works as txBytes
      { txBytes: toBase64(txBytes) },
      { pathPrefix: this.url },
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
    simulate: boolean = false,
  ): Promise<TxRaw> {
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
      const { account } = await this.query.auth.account({
        address: this.address,
      });

      if (!account) {
        throw new Error(
          `Cannot find account "${this.address}", make sure it has a balance.`,
        );
      }

      let baseAccount: BaseAccount | undefined;
      if (account["@type"] === "/cosmos.auth.v1beta1.BaseAccount") {
        baseAccount = account as BaseAccount;
      } else if (
        account["@type"] === "/cosmos.vesting.v1beta1.ContinuousVestingAccount"
      ) {
        baseAccount = (account as ContinuousVestingAccount).base_vesting_account
          ?.base_account;
      } else if (
        account["@type"] === "/cosmos.vesting.v1beta1.DelayedVestingAccount"
      ) {
        baseAccount = (account as DelayedVestingAccount).base_vesting_account
          ?.base_account;
      } else if (account["@type"] === "/cosmos.auth.v1beta1.ModuleAccount") {
        // wat?
        baseAccount = (account as ModuleAccount).base_account;
      } else {
        throw new Error(
          `Cannot sign with account of type "${account["@type"]}".`,
        );
      }

      if (!baseAccount) {
        throw new Error(
          `Cannot extract BaseAccount from "${JSON.stringify(account)}".`,
        );
      }

      signerData = {
        accountNumber: Number(baseAccount.account_number),
        sequence: Number(baseAccount.sequence),
        chainId: this.chainId,
      };
    }

    if (isDirectSigner(this.wallet)) {
      return this.signDirect(
        accountFromSigner,
        messages,
        fee,
        memo,
        signerData,
        simulate,
      );
    } else {
      return this.signAmino(
        accountFromSigner,
        messages,
        fee,
        memo,
        signerData,
        simulate,
      );
    }
  }

  private async signAmino(
    account: AccountData,
    messages: Msg[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
    simulate: boolean = false,
  ): Promise<TxRaw> {
    if (isDirectSigner(this.wallet)) {
      throw new Error(
        "Wrong signer type! Expected AminoSigner or AminoEip191Signer.",
      );
    }

    let signMode = (
      await import("./protobuf/cosmos/tx/signing/v1beta1/signing")
    ).SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    if (typeof this.wallet.getSignMode === "function") {
      signMode = await this.wallet.getSignMode();
    }

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

    let signed: StdSignDoc;
    let signature: StdSignature;

    if (!simulate) {
      ({ signature, signed } = await this.wallet.signAmino(
        account.address,
        signDoc,
      ));
    } else {
      signed = signDoc;
      signature = getSimulateSignature();
    }

    const txBody = {
      type_url: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: await Promise.all(
          messages.map(async (msg, index) => {
            await this.populateCodeHash(msg);
            const asProto: ProtoMsg = await msg.toProto(this.encryptionUtils);

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
      signed.fee.granter,
      signMode,
    );
    return TxRaw.fromPartial({
      body_bytes: txBodyBytes,
      auth_info_bytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }

  private async populateCodeHash(msg: Msg) {
    if (msg instanceof MsgExecuteContract) {
      if (!msg.codeHash) {
        msg.codeHash = (
          await this.query.compute.codeHashByContractAddress({
            contract_address: msg.contractAddress,
          })
        ).code_hash!;
      }
    } else if (msg instanceof MsgInstantiateContract) {
      if (!msg.codeHash) {
        msg.codeHash = (
          await this.query.compute.codeHashByCodeId({
            code_id: msg.codeId,
          })
        ).code_hash!;
      }
    } else if (msg instanceof MsgMigrateContract) {
      if (!msg.codeHash) {
        msg.codeHash = (
          await this.query.compute.codeHashByCodeId({
            code_id: msg.codeId,
          })
        ).code_hash!;
      }
    }
  }

  private async encodeTx(txBody: {
    type_url: string;
    value: {
      messages: ProtoMsg[];
      memo: string;
    };
  }): Promise<Uint8Array> {
    const wrappedMessages = await Promise.all(
      txBody.value.messages.map(async (message) => {
        const binaryValue = await message.encode();
        return Any.fromPartial({
          type_url: message.type_url,
          value: binaryValue,
        });
      }),
    );

    const txBodyEncoded = TxBodyPb.fromPartial({
      ...txBody.value,
      messages: wrappedMessages,
    });
    return TxBodyPb.encode(txBodyEncoded).finish();
  }

  private async signDirect(
    account: AccountData,
    messages: Msg[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
    simulate: boolean = false,
  ): Promise<TxRaw> {
    if (!isDirectSigner(this.wallet)) {
      throw new Error("Wrong signer type! Expected DirectSigner.");
    }

    const txBody = {
      type_url: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: await Promise.all(
          messages.map(async (msg, index) => {
            await this.populateCodeHash(msg);
            const asProto = await msg.toProto(this.encryptionUtils);

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
      fee.granter,
    );

    const signDoc = makeSignDocProto(
      txBodyBytes,
      authInfoBytes,
      chainId,
      accountNumber,
    );

    let signed: SignDoc | SignDocCamelCase;
    let signature: StdSignature;

    if (!simulate) {
      ({ signature, signed } = await this.wallet.signDirect(
        account.address,
        signDoc,
      ));
    } else {
      signed = signDoc;
      signature = getSimulateSignature();
    }

    if (isSignDoc(signed)) {
      // Wallet
      return TxRaw.fromPartial({
        body_bytes: signed.body_bytes,
        auth_info_bytes: signed.auth_info_bytes,
        signatures: [fromBase64(signature.signature)],
      });
    } else if (isSignDocCamelCase(signed)) {
      // cosmjs/Keplr
      return TxRaw.fromPartial({
        body_bytes: signed.bodyBytes,
        auth_info_bytes: signed.authInfoBytes,
        signatures: [fromBase64(signature.signature)],
      });
    } else {
      throw new Error(`unknown SignDoc instance: ${JSON.stringify(signed)}`);
    }
  }
}

function sleep(ms: number) {
  return new Promise((accept) => setTimeout(accept, ms));
}

export function gasToFee(gasLimit: number, gasPrice: number): number {
  return Math.ceil(gasLimit * gasPrice);
}

/**
 * Creates and serializes an AuthInfo document.
 *
 * This implementation does not support different signing modes for the different signers.
 */
async function makeAuthInfoBytes(
  signers: ReadonlyArray<{
    readonly pubkey: import("./protobuf/google/protobuf/any").Any;
    readonly sequence: number;
  }>,
  feeAmount: readonly Coin[],
  gasLimit: number,
  feeGranter?: string,
  signMode?: import("./protobuf/cosmos/tx/signing/v1beta1/signing").SignMode,
): Promise<Uint8Array> {
  if (!signMode) {
    signMode = (await import("./protobuf/cosmos/tx/signing/v1beta1/signing"))
      .SignMode.SIGN_MODE_DIRECT;
  }

  const authInfo: AuthInfo = {
    signer_infos: makeSignerInfos(signers, signMode),
    fee: {
      amount: [...feeAmount],
      gas_limit: String(gasLimit),
      granter: feeGranter ?? "",
      payer: "",
    },
  };

  const { AuthInfo } = await import("./protobuf/cosmos/tx/v1beta1/tx");
  return AuthInfo.encode(AuthInfo.fromPartial(authInfo)).finish();
}

/**
 * Create signer infos from the provided signers.
 *
 * This implementation does not support different signing modes for the different signers.
 */
function makeSignerInfos(
  signers: ReadonlyArray<{
    readonly pubkey: import("./protobuf/google/protobuf/any").Any;
    readonly sequence: number;
  }>,
  signMode: import("./protobuf/cosmos/tx/signing/v1beta1/signing").SignMode,
): import("./protobuf/cosmos/tx/v1beta1/tx").SignerInfo[] {
  return signers.map(
    ({
      pubkey,
      sequence,
    }): import("./protobuf/cosmos/tx/v1beta1/tx").SignerInfo => ({
      public_key: pubkey,
      mode_info: {
        single: { mode: signMode },
      },
      sequence: String(sequence),
    }),
  );
}

/** SignDoc is the type used for generating sign bytes for SIGN_MODE_DIRECT. */
export interface SignDocCamelCase {
  /**
   * bodyBytes is protobuf serialization of a TxBody that matches the
   * representation in TxRaw.
   */
  bodyBytes: Uint8Array;
  /**
   * authInfoBytes is a protobuf serialization of an AuthInfo that matches the
   * representation in TxRaw.
   */
  authInfoBytes: Uint8Array;
  /**
   * chainId is the unique identifier of the chain this transaction targets.
   * It prevents signed transactions from being used on another chain by an
   * attacker
   */
  chainId: string;
  /** accountNumber is the account number of the account in state */
  accountNumber: string;
}

function makeSignDocProto(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  chainId: string,
  accountNumber: number,
): import("./protobuf/cosmos/tx/v1beta1/tx").SignDoc & SignDocCamelCase {
  return {
    body_bytes: bodyBytes,
    auth_info_bytes: authInfoBytes,
    chain_id: chainId,
    account_number: String(accountNumber),

    // cosmjs/Keplr
    bodyBytes,
    authInfoBytes,
    chainId,
    accountNumber: String(accountNumber),
  };
}

async function encodePubkey(
  pubkey: Pubkey,
): Promise<import("./protobuf/google/protobuf/any").Any> {
  const { Any } = await import("./protobuf/google/protobuf/any");

  if (isSecp256k1Pubkey(pubkey)) {
    const { PubKey } = await import("./protobuf/cosmos/crypto/secp256k1/keys");

    const pubkeyProto = PubKey.fromPartial({
      key: fromBase64(pubkey.value),
    });
    return Any.fromPartial({
      type_url: "/cosmos.crypto.secp256k1.PubKey",
      value: Uint8Array.from(PubKey.encode(pubkeyProto).finish()),
    });
  } else if (isMultisigThresholdPubkey(pubkey)) {
    const { LegacyAminoPubKey } = await import(
      "./protobuf/cosmos/crypto/multisig/keys"
    );

    const pubkeyProto = LegacyAminoPubKey.fromPartial({
      threshold: Number(pubkey.value.threshold),
      public_keys: pubkey.value.pubkeys.map(encodePubkey),
    });
    return Any.fromPartial({
      type_url: "/cosmos.crypto.multisig.LegacyAminoPubKey",
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
  /** Success is returned if the transaction executed successfully */
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

/**
 * Recursively converts an object of type `{ type_url: string; value: any; }`
 * to type `{ "@type": string; ...values }`
 */
function protobufJsonToGrpcGatewayJson(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(protobufJsonToGrpcGatewayJson);
  }

  if (
    Object.keys(obj).length === 2 &&
    typeof obj["type_url"] === "string" &&
    typeof obj["value"] === "object"
  ) {
    return Object.assign(
      { "@type": obj["type_url"] },
      protobufJsonToGrpcGatewayJson(obj["value"]),
    );
  }

  const result: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    result[key] = protobufJsonToGrpcGatewayJson(obj[key]);
  });

  return result;
}

function getSimulateSignature(): StdSignature {
  return {
    pub_key: {
      type: "tendermint/PubKeySecp256k1",
      value: toBase64(new Uint8Array(33).fill(0)),
    },
    signature: toBase64(new Uint8Array(64).fill(0)),
  };
}
