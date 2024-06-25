/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { ConsensusParams } from "../types/params";
import { ProofOps } from "../crypto/proof";
import { PublicKey } from "../crypto/keys";
import {
  BlockIDFlag,
  blockIDFlagFromJSON,
  blockIDFlagToJSON,
} from "../types/validator";

export const protobufPackage = "tendermint.abci";

export enum CheckTxType {
  NEW = 0,
  RECHECK = 1,
  UNRECOGNIZED = -1,
}

export function checkTxTypeFromJSON(object: any): CheckTxType {
  switch (object) {
    case 0:
    case "NEW":
      return CheckTxType.NEW;
    case 1:
    case "RECHECK":
      return CheckTxType.RECHECK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CheckTxType.UNRECOGNIZED;
  }
}

export function checkTxTypeToJSON(object: CheckTxType): string {
  switch (object) {
    case CheckTxType.NEW:
      return "NEW";
    case CheckTxType.RECHECK:
      return "RECHECK";
    default:
      return "UNKNOWN";
  }
}

export enum MisbehaviorType {
  UNKNOWN = 0,
  DUPLICATE_VOTE = 1,
  LIGHT_CLIENT_ATTACK = 2,
  UNRECOGNIZED = -1,
}

export function misbehaviorTypeFromJSON(object: any): MisbehaviorType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return MisbehaviorType.UNKNOWN;
    case 1:
    case "DUPLICATE_VOTE":
      return MisbehaviorType.DUPLICATE_VOTE;
    case 2:
    case "LIGHT_CLIENT_ATTACK":
      return MisbehaviorType.LIGHT_CLIENT_ATTACK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MisbehaviorType.UNRECOGNIZED;
  }
}

export function misbehaviorTypeToJSON(object: MisbehaviorType): string {
  switch (object) {
    case MisbehaviorType.UNKNOWN:
      return "UNKNOWN";
    case MisbehaviorType.DUPLICATE_VOTE:
      return "DUPLICATE_VOTE";
    case MisbehaviorType.LIGHT_CLIENT_ATTACK:
      return "LIGHT_CLIENT_ATTACK";
    default:
      return "UNKNOWN";
  }
}

export interface Request {
  echo?: RequestEcho | undefined;
  flush?: RequestFlush | undefined;
  info?: RequestInfo | undefined;
  init_chain?: RequestInitChain | undefined;
  query?: RequestQuery | undefined;
  check_tx?: RequestCheckTx | undefined;
  commit?: RequestCommit | undefined;
  list_snapshots?: RequestListSnapshots | undefined;
  offer_snapshot?: RequestOfferSnapshot | undefined;
  load_snapshot_chunk?: RequestLoadSnapshotChunk | undefined;
  apply_snapshot_chunk?: RequestApplySnapshotChunk | undefined;
  prepare_proposal?: RequestPrepareProposal | undefined;
  process_proposal?: RequestProcessProposal | undefined;
  extend_vote?: RequestExtendVote | undefined;
  verify_vote_extension?: RequestVerifyVoteExtension | undefined;
  finalize_block?: RequestFinalizeBlock | undefined;
}

export interface RequestEcho {
  message: string;
}

export interface RequestFlush {}

export interface RequestInfo {
  version: string;
  block_version: string;
  p2p_version: string;
  abci_version: string;
}

export interface RequestInitChain {
  time?: Timestamp;
  chain_id: string;
  consensus_params?: ConsensusParams;
  validators: ValidatorUpdate[];
  app_state_bytes: Uint8Array;
  initial_height: string;
}

export interface RequestQuery {
  data: Uint8Array;
  path: string;
  height: string;
  prove: boolean;
}

export interface RequestCheckTx {
  tx: Uint8Array;
  type: CheckTxType;
}

export interface RequestCommit {}

/** lists available snapshots */
export interface RequestListSnapshots {}

/** offers a snapshot to the application */
export interface RequestOfferSnapshot {
  /** snapshot offered by peers */
  snapshot?: Snapshot;
  /** light client-verified app hash for snapshot height */
  app_hash: Uint8Array;
}

/** loads a snapshot chunk */
export interface RequestLoadSnapshotChunk {
  height: string;
  format: number;
  chunk: number;
}

/** Applies a snapshot chunk */
export interface RequestApplySnapshotChunk {
  index: number;
  chunk: Uint8Array;
  sender: string;
}

export interface RequestPrepareProposal {
  /** the modified transactions cannot exceed this size. */
  max_tx_bytes: string;
  /**
   * txs is an array of transactions that will be included in a block,
   * sent to the app for possible modifications.
   */
  txs: Uint8Array[];
  local_last_commit?: ExtendedCommitInfo;
  misbehavior: Misbehavior[];
  height: string;
  time?: Timestamp;
  next_validators_hash: Uint8Array;
  /** address of the public key of the validator proposing the block. */
  proposer_address: Uint8Array;
}

export interface RequestProcessProposal {
  txs: Uint8Array[];
  proposed_last_commit?: CommitInfo;
  misbehavior: Misbehavior[];
  /** hash is the merkle root hash of the fields of the proposed block. */
  hash: Uint8Array;
  height: string;
  time?: Timestamp;
  next_validators_hash: Uint8Array;
  /** address of the public key of the original proposer of the block. */
  proposer_address: Uint8Array;
}

/** Extends a vote with application-injected data */
export interface RequestExtendVote {
  /** the hash of the block that this vote may be referring to */
  hash: Uint8Array;
  /** the height of the extended vote */
  height: string;
  /** info of the block that this vote may be referring to */
  time?: Timestamp;
  txs: Uint8Array[];
  proposed_last_commit?: CommitInfo;
  misbehavior: Misbehavior[];
  next_validators_hash: Uint8Array;
  /** address of the public key of the original proposer of the block. */
  proposer_address: Uint8Array;
}

/** Verify the vote extension */
export interface RequestVerifyVoteExtension {
  /** the hash of the block that this received vote corresponds to */
  hash: Uint8Array;
  /** the validator that signed the vote extension */
  validator_address: Uint8Array;
  height: string;
  vote_extension: Uint8Array;
}

export interface RequestFinalizeBlock {
  txs: Uint8Array[];
  decided_last_commit?: CommitInfo;
  misbehavior: Misbehavior[];
  /** hash is the merkle root hash of the fields of the decided block. */
  hash: Uint8Array;
  height: string;
  time?: Timestamp;
  next_validators_hash: Uint8Array;
  /** proposer_address is the address of the public key of the original proposer of the block. */
  proposer_address: Uint8Array;
}

export interface Response {
  exception?: ResponseException | undefined;
  echo?: ResponseEcho | undefined;
  flush?: ResponseFlush | undefined;
  info?: ResponseInfo | undefined;
  init_chain?: ResponseInitChain | undefined;
  query?: ResponseQuery | undefined;
  check_tx?: ResponseCheckTx | undefined;
  commit?: ResponseCommit | undefined;
  list_snapshots?: ResponseListSnapshots | undefined;
  offer_snapshot?: ResponseOfferSnapshot | undefined;
  load_snapshot_chunk?: ResponseLoadSnapshotChunk | undefined;
  apply_snapshot_chunk?: ResponseApplySnapshotChunk | undefined;
  prepare_proposal?: ResponsePrepareProposal | undefined;
  process_proposal?: ResponseProcessProposal | undefined;
  extend_vote?: ResponseExtendVote | undefined;
  verify_vote_extension?: ResponseVerifyVoteExtension | undefined;
  finalize_block?: ResponseFinalizeBlock | undefined;
}

/** nondeterministic */
export interface ResponseException {
  error: string;
}

export interface ResponseEcho {
  message: string;
}

export interface ResponseFlush {}

export interface ResponseInfo {
  data: string;
  version: string;
  app_version: string;
  last_block_height: string;
  last_block_app_hash: Uint8Array;
}

export interface ResponseInitChain {
  consensus_params?: ConsensusParams;
  validators: ValidatorUpdate[];
  app_hash: Uint8Array;
}

export interface ResponseQuery {
  code: number;
  /** bytes data = 2; // use "value" instead. */
  log: string;
  /** nondeterministic */
  info: string;
  index: string;
  key: Uint8Array;
  value: Uint8Array;
  proof_ops?: ProofOps;
  height: string;
  codespace: string;
}

export interface ResponseCheckTx {
  code: number;
  data: Uint8Array;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  gas_wanted: string;
  gas_used: string;
  events: Event[];
  codespace: string;
}

export interface ResponseCommit {
  retain_height: string;
}

export interface ResponseListSnapshots {
  snapshots: Snapshot[];
}

export interface ResponseOfferSnapshot {
  result: ResponseOfferSnapshot_Result;
}

export enum ResponseOfferSnapshot_Result {
  /** UNKNOWN - Unknown result, abort all snapshot restoration */
  UNKNOWN = 0,
  /** ACCEPT - Snapshot accepted, apply chunks */
  ACCEPT = 1,
  /** ABORT - Abort all snapshot restoration */
  ABORT = 2,
  /** REJECT - Reject this specific snapshot, try others */
  REJECT = 3,
  /** REJECT_FORMAT - Reject all snapshots of this format, try others */
  REJECT_FORMAT = 4,
  /** REJECT_SENDER - Reject all snapshots from the sender(s), try others */
  REJECT_SENDER = 5,
  UNRECOGNIZED = -1,
}

export function responseOfferSnapshot_ResultFromJSON(
  object: any,
): ResponseOfferSnapshot_Result {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseOfferSnapshot_Result.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseOfferSnapshot_Result.ACCEPT;
    case 2:
    case "ABORT":
      return ResponseOfferSnapshot_Result.ABORT;
    case 3:
    case "REJECT":
      return ResponseOfferSnapshot_Result.REJECT;
    case 4:
    case "REJECT_FORMAT":
      return ResponseOfferSnapshot_Result.REJECT_FORMAT;
    case 5:
    case "REJECT_SENDER":
      return ResponseOfferSnapshot_Result.REJECT_SENDER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseOfferSnapshot_Result.UNRECOGNIZED;
  }
}

export function responseOfferSnapshot_ResultToJSON(
  object: ResponseOfferSnapshot_Result,
): string {
  switch (object) {
    case ResponseOfferSnapshot_Result.UNKNOWN:
      return "UNKNOWN";
    case ResponseOfferSnapshot_Result.ACCEPT:
      return "ACCEPT";
    case ResponseOfferSnapshot_Result.ABORT:
      return "ABORT";
    case ResponseOfferSnapshot_Result.REJECT:
      return "REJECT";
    case ResponseOfferSnapshot_Result.REJECT_FORMAT:
      return "REJECT_FORMAT";
    case ResponseOfferSnapshot_Result.REJECT_SENDER:
      return "REJECT_SENDER";
    default:
      return "UNKNOWN";
  }
}

export interface ResponseLoadSnapshotChunk {
  chunk: Uint8Array;
}

export interface ResponseApplySnapshotChunk {
  result: ResponseApplySnapshotChunk_Result;
  /** Chunks to refetch and reapply */
  refetch_chunks: number[];
  /** Chunk senders to reject and ban */
  reject_senders: string[];
}

export enum ResponseApplySnapshotChunk_Result {
  /** UNKNOWN - Unknown result, abort all snapshot restoration */
  UNKNOWN = 0,
  /** ACCEPT - Chunk successfully accepted */
  ACCEPT = 1,
  /** ABORT - Abort all snapshot restoration */
  ABORT = 2,
  /** RETRY - Retry chunk (combine with refetch and reject) */
  RETRY = 3,
  /** RETRY_SNAPSHOT - Retry snapshot (combine with refetch and reject) */
  RETRY_SNAPSHOT = 4,
  /** REJECT_SNAPSHOT - Reject this snapshot, try others */
  REJECT_SNAPSHOT = 5,
  UNRECOGNIZED = -1,
}

export function responseApplySnapshotChunk_ResultFromJSON(
  object: any,
): ResponseApplySnapshotChunk_Result {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseApplySnapshotChunk_Result.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseApplySnapshotChunk_Result.ACCEPT;
    case 2:
    case "ABORT":
      return ResponseApplySnapshotChunk_Result.ABORT;
    case 3:
    case "RETRY":
      return ResponseApplySnapshotChunk_Result.RETRY;
    case 4:
    case "RETRY_SNAPSHOT":
      return ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT;
    case 5:
    case "REJECT_SNAPSHOT":
      return ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseApplySnapshotChunk_Result.UNRECOGNIZED;
  }
}

export function responseApplySnapshotChunk_ResultToJSON(
  object: ResponseApplySnapshotChunk_Result,
): string {
  switch (object) {
    case ResponseApplySnapshotChunk_Result.UNKNOWN:
      return "UNKNOWN";
    case ResponseApplySnapshotChunk_Result.ACCEPT:
      return "ACCEPT";
    case ResponseApplySnapshotChunk_Result.ABORT:
      return "ABORT";
    case ResponseApplySnapshotChunk_Result.RETRY:
      return "RETRY";
    case ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT:
      return "RETRY_SNAPSHOT";
    case ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT:
      return "REJECT_SNAPSHOT";
    default:
      return "UNKNOWN";
  }
}

export interface ResponsePrepareProposal {
  txs: Uint8Array[];
}

export interface ResponseProcessProposal {
  status: ResponseProcessProposal_ProposalStatus;
}

export enum ResponseProcessProposal_ProposalStatus {
  UNKNOWN = 0,
  ACCEPT = 1,
  REJECT = 2,
  UNRECOGNIZED = -1,
}

export function responseProcessProposal_ProposalStatusFromJSON(
  object: any,
): ResponseProcessProposal_ProposalStatus {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseProcessProposal_ProposalStatus.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseProcessProposal_ProposalStatus.ACCEPT;
    case 2:
    case "REJECT":
      return ResponseProcessProposal_ProposalStatus.REJECT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseProcessProposal_ProposalStatus.UNRECOGNIZED;
  }
}

export function responseProcessProposal_ProposalStatusToJSON(
  object: ResponseProcessProposal_ProposalStatus,
): string {
  switch (object) {
    case ResponseProcessProposal_ProposalStatus.UNKNOWN:
      return "UNKNOWN";
    case ResponseProcessProposal_ProposalStatus.ACCEPT:
      return "ACCEPT";
    case ResponseProcessProposal_ProposalStatus.REJECT:
      return "REJECT";
    default:
      return "UNKNOWN";
  }
}

export interface ResponseExtendVote {
  vote_extension: Uint8Array;
}

export interface ResponseVerifyVoteExtension {
  status: ResponseVerifyVoteExtension_VerifyStatus;
}

export enum ResponseVerifyVoteExtension_VerifyStatus {
  UNKNOWN = 0,
  ACCEPT = 1,
  /**
   * REJECT - Rejecting the vote extension will reject the entire precommit by the sender.
   * Incorrectly implementing this thus has liveness implications as it may affect
   * CometBFT's ability to receive 2/3+ valid votes to finalize the block.
   * Honest nodes should never be rejected.
   */
  REJECT = 2,
  UNRECOGNIZED = -1,
}

export function responseVerifyVoteExtension_VerifyStatusFromJSON(
  object: any,
): ResponseVerifyVoteExtension_VerifyStatus {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseVerifyVoteExtension_VerifyStatus.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseVerifyVoteExtension_VerifyStatus.ACCEPT;
    case 2:
    case "REJECT":
      return ResponseVerifyVoteExtension_VerifyStatus.REJECT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseVerifyVoteExtension_VerifyStatus.UNRECOGNIZED;
  }
}

export function responseVerifyVoteExtension_VerifyStatusToJSON(
  object: ResponseVerifyVoteExtension_VerifyStatus,
): string {
  switch (object) {
    case ResponseVerifyVoteExtension_VerifyStatus.UNKNOWN:
      return "UNKNOWN";
    case ResponseVerifyVoteExtension_VerifyStatus.ACCEPT:
      return "ACCEPT";
    case ResponseVerifyVoteExtension_VerifyStatus.REJECT:
      return "REJECT";
    default:
      return "UNKNOWN";
  }
}

export interface ResponseFinalizeBlock {
  /** set of block events emmitted as part of executing the block */
  events: Event[];
  /**
   * the result of executing each transaction including the events
   * the particular transction emitted. This should match the order
   * of the transactions delivered in the block itself
   */
  tx_results: ExecTxResult[];
  /** a list of updates to the validator set. These will reflect the validator set at current height + 2. */
  validator_updates: ValidatorUpdate[];
  /** updates to the consensus params, if any. */
  consensus_param_updates?: ConsensusParams;
  /** app_hash is the hash of the applications' state which is used to confirm that execution of the transactions was deterministic. It is up to the application to decide which algorithm to use. */
  app_hash: Uint8Array;
}

export interface CommitInfo {
  round: number;
  votes: VoteInfo[];
}

/**
 * ExtendedCommitInfo is similar to CommitInfo except that it is only used in
 * the PrepareProposal request such that CometBFT can provide vote extensions
 * to the application.
 */
export interface ExtendedCommitInfo {
  /** The round at which the block proposer decided in the previous height. */
  round: number;
  /**
   * List of validators' addresses in the last validator set with their voting
   * information, including vote extensions.
   */
  votes: ExtendedVoteInfo[];
}

/**
 * Event allows application developers to attach additional information to
 * ResponseFinalizeBlock and ResponseCheckTx.
 * Later, transactions may be queried using these events.
 */
export interface Event {
  type: string;
  attributes: EventAttribute[];
}

/** EventAttribute is a single key-value pair, associated with an event. */
export interface EventAttribute {
  key: string;
  value: string;
  /** nondeterministic */
  index: boolean;
}

/**
 * ExecTxResult contains results of executing one individual transaction.
 *
 * * Its structure is equivalent to #ResponseDeliverTx which will be deprecated/deleted
 */
export interface ExecTxResult {
  code: number;
  data: Uint8Array;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  gas_wanted: string;
  gas_used: string;
  /** nondeterministic */
  events: Event[];
  codespace: string;
}

/**
 * TxResult contains results of executing the transaction.
 *
 * One usage is indexing transaction results.
 */
export interface TxResult {
  height: string;
  index: number;
  tx: Uint8Array;
  result?: ExecTxResult;
}

export interface Validator {
  /** The first 20 bytes of SHA256(public key) */
  address: Uint8Array;
  /** PubKey pub_key = 2 [(gogoproto.nullable)=false]; */
  power: string;
}

export interface ValidatorUpdate {
  pub_key?: PublicKey;
  power: string;
}

export interface VoteInfo {
  validator?: Validator;
  block_id_flag: BlockIDFlag;
}

export interface ExtendedVoteInfo {
  /** The validator that sent the vote. */
  validator?: Validator;
  /** Non-deterministic extension provided by the sending validator's application. */
  vote_extension: Uint8Array;
  /** Vote extension signature created by CometBFT */
  extension_signature: Uint8Array;
  /** block_id_flag indicates whether the validator voted for a block, nil, or did not vote at all */
  block_id_flag: BlockIDFlag;
}

export interface Misbehavior {
  type: MisbehaviorType;
  /** The offending validator */
  validator?: Validator;
  /** The height when the offense occurred */
  height: string;
  /** The corresponding time where the offense occurred */
  time?: Timestamp;
  /**
   * Total voting power of the validator set in case the ABCI application does
   * not store historical validators.
   * https://github.com/tendermint/tendermint/issues/4581
   */
  total_voting_power: string;
}

export interface Snapshot {
  /** The height at which the snapshot was taken */
  height: string;
  /** The application-specific snapshot format */
  format: number;
  /** Number of chunks in the snapshot */
  chunks: number;
  /** Arbitrary snapshot hash, equal only if identical */
  hash: Uint8Array;
  /** Arbitrary application metadata */
  metadata: Uint8Array;
}

function createBaseRequest(): Request {
  return {
    echo: undefined,
    flush: undefined,
    info: undefined,
    init_chain: undefined,
    query: undefined,
    check_tx: undefined,
    commit: undefined,
    list_snapshots: undefined,
    offer_snapshot: undefined,
    load_snapshot_chunk: undefined,
    apply_snapshot_chunk: undefined,
    prepare_proposal: undefined,
    process_proposal: undefined,
    extend_vote: undefined,
    verify_vote_extension: undefined,
    finalize_block: undefined,
  };
}

export const Request = {
  encode(
    message: Request,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.echo !== undefined) {
      RequestEcho.encode(message.echo, writer.uint32(10).fork()).ldelim();
    }
    if (message.flush !== undefined) {
      RequestFlush.encode(message.flush, writer.uint32(18).fork()).ldelim();
    }
    if (message.info !== undefined) {
      RequestInfo.encode(message.info, writer.uint32(26).fork()).ldelim();
    }
    if (message.init_chain !== undefined) {
      RequestInitChain.encode(
        message.init_chain,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.query !== undefined) {
      RequestQuery.encode(message.query, writer.uint32(50).fork()).ldelim();
    }
    if (message.check_tx !== undefined) {
      RequestCheckTx.encode(
        message.check_tx,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.commit !== undefined) {
      RequestCommit.encode(message.commit, writer.uint32(90).fork()).ldelim();
    }
    if (message.list_snapshots !== undefined) {
      RequestListSnapshots.encode(
        message.list_snapshots,
        writer.uint32(98).fork(),
      ).ldelim();
    }
    if (message.offer_snapshot !== undefined) {
      RequestOfferSnapshot.encode(
        message.offer_snapshot,
        writer.uint32(106).fork(),
      ).ldelim();
    }
    if (message.load_snapshot_chunk !== undefined) {
      RequestLoadSnapshotChunk.encode(
        message.load_snapshot_chunk,
        writer.uint32(114).fork(),
      ).ldelim();
    }
    if (message.apply_snapshot_chunk !== undefined) {
      RequestApplySnapshotChunk.encode(
        message.apply_snapshot_chunk,
        writer.uint32(122).fork(),
      ).ldelim();
    }
    if (message.prepare_proposal !== undefined) {
      RequestPrepareProposal.encode(
        message.prepare_proposal,
        writer.uint32(130).fork(),
      ).ldelim();
    }
    if (message.process_proposal !== undefined) {
      RequestProcessProposal.encode(
        message.process_proposal,
        writer.uint32(138).fork(),
      ).ldelim();
    }
    if (message.extend_vote !== undefined) {
      RequestExtendVote.encode(
        message.extend_vote,
        writer.uint32(146).fork(),
      ).ldelim();
    }
    if (message.verify_vote_extension !== undefined) {
      RequestVerifyVoteExtension.encode(
        message.verify_vote_extension,
        writer.uint32(154).fork(),
      ).ldelim();
    }
    if (message.finalize_block !== undefined) {
      RequestFinalizeBlock.encode(
        message.finalize_block,
        writer.uint32(162).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.echo = RequestEcho.decode(reader, reader.uint32());
          break;
        case 2:
          message.flush = RequestFlush.decode(reader, reader.uint32());
          break;
        case 3:
          message.info = RequestInfo.decode(reader, reader.uint32());
          break;
        case 5:
          message.init_chain = RequestInitChain.decode(reader, reader.uint32());
          break;
        case 6:
          message.query = RequestQuery.decode(reader, reader.uint32());
          break;
        case 8:
          message.check_tx = RequestCheckTx.decode(reader, reader.uint32());
          break;
        case 11:
          message.commit = RequestCommit.decode(reader, reader.uint32());
          break;
        case 12:
          message.list_snapshots = RequestListSnapshots.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 13:
          message.offer_snapshot = RequestOfferSnapshot.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 14:
          message.load_snapshot_chunk = RequestLoadSnapshotChunk.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 15:
          message.apply_snapshot_chunk = RequestApplySnapshotChunk.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 16:
          message.prepare_proposal = RequestPrepareProposal.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 17:
          message.process_proposal = RequestProcessProposal.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 18:
          message.extend_vote = RequestExtendVote.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 19:
          message.verify_vote_extension = RequestVerifyVoteExtension.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 20:
          message.finalize_block = RequestFinalizeBlock.decode(
            reader,
            reader.uint32(),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Request {
    return {
      echo: isSet(object.echo) ? RequestEcho.fromJSON(object.echo) : undefined,
      flush: isSet(object.flush)
        ? RequestFlush.fromJSON(object.flush)
        : undefined,
      info: isSet(object.info) ? RequestInfo.fromJSON(object.info) : undefined,
      init_chain: isSet(object.init_chain)
        ? RequestInitChain.fromJSON(object.init_chain)
        : undefined,
      query: isSet(object.query)
        ? RequestQuery.fromJSON(object.query)
        : undefined,
      check_tx: isSet(object.check_tx)
        ? RequestCheckTx.fromJSON(object.check_tx)
        : undefined,
      commit: isSet(object.commit)
        ? RequestCommit.fromJSON(object.commit)
        : undefined,
      list_snapshots: isSet(object.list_snapshots)
        ? RequestListSnapshots.fromJSON(object.list_snapshots)
        : undefined,
      offer_snapshot: isSet(object.offer_snapshot)
        ? RequestOfferSnapshot.fromJSON(object.offer_snapshot)
        : undefined,
      load_snapshot_chunk: isSet(object.load_snapshot_chunk)
        ? RequestLoadSnapshotChunk.fromJSON(object.load_snapshot_chunk)
        : undefined,
      apply_snapshot_chunk: isSet(object.apply_snapshot_chunk)
        ? RequestApplySnapshotChunk.fromJSON(object.apply_snapshot_chunk)
        : undefined,
      prepare_proposal: isSet(object.prepare_proposal)
        ? RequestPrepareProposal.fromJSON(object.prepare_proposal)
        : undefined,
      process_proposal: isSet(object.process_proposal)
        ? RequestProcessProposal.fromJSON(object.process_proposal)
        : undefined,
      extend_vote: isSet(object.extend_vote)
        ? RequestExtendVote.fromJSON(object.extend_vote)
        : undefined,
      verify_vote_extension: isSet(object.verify_vote_extension)
        ? RequestVerifyVoteExtension.fromJSON(object.verify_vote_extension)
        : undefined,
      finalize_block: isSet(object.finalize_block)
        ? RequestFinalizeBlock.fromJSON(object.finalize_block)
        : undefined,
    };
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    message.echo !== undefined &&
      (obj.echo = message.echo ? RequestEcho.toJSON(message.echo) : undefined);
    message.flush !== undefined &&
      (obj.flush = message.flush
        ? RequestFlush.toJSON(message.flush)
        : undefined);
    message.info !== undefined &&
      (obj.info = message.info ? RequestInfo.toJSON(message.info) : undefined);
    message.init_chain !== undefined &&
      (obj.init_chain = message.init_chain
        ? RequestInitChain.toJSON(message.init_chain)
        : undefined);
    message.query !== undefined &&
      (obj.query = message.query
        ? RequestQuery.toJSON(message.query)
        : undefined);
    message.check_tx !== undefined &&
      (obj.check_tx = message.check_tx
        ? RequestCheckTx.toJSON(message.check_tx)
        : undefined);
    message.commit !== undefined &&
      (obj.commit = message.commit
        ? RequestCommit.toJSON(message.commit)
        : undefined);
    message.list_snapshots !== undefined &&
      (obj.list_snapshots = message.list_snapshots
        ? RequestListSnapshots.toJSON(message.list_snapshots)
        : undefined);
    message.offer_snapshot !== undefined &&
      (obj.offer_snapshot = message.offer_snapshot
        ? RequestOfferSnapshot.toJSON(message.offer_snapshot)
        : undefined);
    message.load_snapshot_chunk !== undefined &&
      (obj.load_snapshot_chunk = message.load_snapshot_chunk
        ? RequestLoadSnapshotChunk.toJSON(message.load_snapshot_chunk)
        : undefined);
    message.apply_snapshot_chunk !== undefined &&
      (obj.apply_snapshot_chunk = message.apply_snapshot_chunk
        ? RequestApplySnapshotChunk.toJSON(message.apply_snapshot_chunk)
        : undefined);
    message.prepare_proposal !== undefined &&
      (obj.prepare_proposal = message.prepare_proposal
        ? RequestPrepareProposal.toJSON(message.prepare_proposal)
        : undefined);
    message.process_proposal !== undefined &&
      (obj.process_proposal = message.process_proposal
        ? RequestProcessProposal.toJSON(message.process_proposal)
        : undefined);
    message.extend_vote !== undefined &&
      (obj.extend_vote = message.extend_vote
        ? RequestExtendVote.toJSON(message.extend_vote)
        : undefined);
    message.verify_vote_extension !== undefined &&
      (obj.verify_vote_extension = message.verify_vote_extension
        ? RequestVerifyVoteExtension.toJSON(message.verify_vote_extension)
        : undefined);
    message.finalize_block !== undefined &&
      (obj.finalize_block = message.finalize_block
        ? RequestFinalizeBlock.toJSON(message.finalize_block)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Request>): Request {
    const message = createBaseRequest();
    message.echo =
      object.echo !== undefined && object.echo !== null
        ? RequestEcho.fromPartial(object.echo)
        : undefined;
    message.flush =
      object.flush !== undefined && object.flush !== null
        ? RequestFlush.fromPartial(object.flush)
        : undefined;
    message.info =
      object.info !== undefined && object.info !== null
        ? RequestInfo.fromPartial(object.info)
        : undefined;
    message.init_chain =
      object.init_chain !== undefined && object.init_chain !== null
        ? RequestInitChain.fromPartial(object.init_chain)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? RequestQuery.fromPartial(object.query)
        : undefined;
    message.check_tx =
      object.check_tx !== undefined && object.check_tx !== null
        ? RequestCheckTx.fromPartial(object.check_tx)
        : undefined;
    message.commit =
      object.commit !== undefined && object.commit !== null
        ? RequestCommit.fromPartial(object.commit)
        : undefined;
    message.list_snapshots =
      object.list_snapshots !== undefined && object.list_snapshots !== null
        ? RequestListSnapshots.fromPartial(object.list_snapshots)
        : undefined;
    message.offer_snapshot =
      object.offer_snapshot !== undefined && object.offer_snapshot !== null
        ? RequestOfferSnapshot.fromPartial(object.offer_snapshot)
        : undefined;
    message.load_snapshot_chunk =
      object.load_snapshot_chunk !== undefined &&
      object.load_snapshot_chunk !== null
        ? RequestLoadSnapshotChunk.fromPartial(object.load_snapshot_chunk)
        : undefined;
    message.apply_snapshot_chunk =
      object.apply_snapshot_chunk !== undefined &&
      object.apply_snapshot_chunk !== null
        ? RequestApplySnapshotChunk.fromPartial(object.apply_snapshot_chunk)
        : undefined;
    message.prepare_proposal =
      object.prepare_proposal !== undefined && object.prepare_proposal !== null
        ? RequestPrepareProposal.fromPartial(object.prepare_proposal)
        : undefined;
    message.process_proposal =
      object.process_proposal !== undefined && object.process_proposal !== null
        ? RequestProcessProposal.fromPartial(object.process_proposal)
        : undefined;
    message.extend_vote =
      object.extend_vote !== undefined && object.extend_vote !== null
        ? RequestExtendVote.fromPartial(object.extend_vote)
        : undefined;
    message.verify_vote_extension =
      object.verify_vote_extension !== undefined &&
      object.verify_vote_extension !== null
        ? RequestVerifyVoteExtension.fromPartial(object.verify_vote_extension)
        : undefined;
    message.finalize_block =
      object.finalize_block !== undefined && object.finalize_block !== null
        ? RequestFinalizeBlock.fromPartial(object.finalize_block)
        : undefined;
    return message;
  },
};

function createBaseRequestEcho(): RequestEcho {
  return { message: "" };
}

export const RequestEcho = {
  encode(
    message: RequestEcho,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestEcho {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestEcho();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestEcho {
    return {
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: RequestEcho): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial(object: DeepPartial<RequestEcho>): RequestEcho {
    const message = createBaseRequestEcho();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseRequestFlush(): RequestFlush {
  return {};
}

export const RequestFlush = {
  encode(
    _: RequestFlush,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestFlush {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestFlush();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): RequestFlush {
    return {};
  },

  toJSON(_: RequestFlush): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<RequestFlush>): RequestFlush {
    const message = createBaseRequestFlush();
    return message;
  },
};

function createBaseRequestInfo(): RequestInfo {
  return {
    version: "",
    block_version: "0",
    p2p_version: "0",
    abci_version: "",
  };
}

export const RequestInfo = {
  encode(
    message: RequestInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.block_version !== "0") {
      writer.uint32(16).uint64(message.block_version);
    }
    if (message.p2p_version !== "0") {
      writer.uint32(24).uint64(message.p2p_version);
    }
    if (message.abci_version !== "") {
      writer.uint32(34).string(message.abci_version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        case 2:
          message.block_version = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.p2p_version = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.abci_version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestInfo {
    return {
      version: isSet(object.version) ? String(object.version) : "",
      block_version: isSet(object.block_version)
        ? String(object.block_version)
        : "0",
      p2p_version: isSet(object.p2p_version) ? String(object.p2p_version) : "0",
      abci_version: isSet(object.abci_version)
        ? String(object.abci_version)
        : "",
    };
  },

  toJSON(message: RequestInfo): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.block_version !== undefined &&
      (obj.block_version = message.block_version);
    message.p2p_version !== undefined &&
      (obj.p2p_version = message.p2p_version);
    message.abci_version !== undefined &&
      (obj.abci_version = message.abci_version);
    return obj;
  },

  fromPartial(object: DeepPartial<RequestInfo>): RequestInfo {
    const message = createBaseRequestInfo();
    message.version = object.version ?? "";
    message.block_version = object.block_version ?? "0";
    message.p2p_version = object.p2p_version ?? "0";
    message.abci_version = object.abci_version ?? "";
    return message;
  },
};

function createBaseRequestInitChain(): RequestInitChain {
  return {
    time: undefined,
    chain_id: "",
    consensus_params: undefined,
    validators: [],
    app_state_bytes: new Uint8Array(),
    initial_height: "0",
  };
}

export const RequestInitChain = {
  encode(
    message: RequestInitChain,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.time !== undefined) {
      Timestamp.encode(message.time, writer.uint32(10).fork()).ldelim();
    }
    if (message.chain_id !== "") {
      writer.uint32(18).string(message.chain_id);
    }
    if (message.consensus_params !== undefined) {
      ConsensusParams.encode(
        message.consensus_params,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    for (const v of message.validators) {
      ValidatorUpdate.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.app_state_bytes.length !== 0) {
      writer.uint32(42).bytes(message.app_state_bytes);
    }
    if (message.initial_height !== "0") {
      writer.uint32(48).int64(message.initial_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestInitChain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestInitChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.time = Timestamp.decode(reader, reader.uint32());
          break;
        case 2:
          message.chain_id = reader.string();
          break;
        case 3:
          message.consensus_params = ConsensusParams.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.validators.push(
            ValidatorUpdate.decode(reader, reader.uint32()),
          );
          break;
        case 5:
          message.app_state_bytes = reader.bytes();
          break;
        case 6:
          message.initial_height = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestInitChain {
    return {
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      chain_id: isSet(object.chain_id) ? String(object.chain_id) : "",
      consensus_params: isSet(object.consensus_params)
        ? ConsensusParams.fromJSON(object.consensus_params)
        : undefined,
      validators: Array.isArray(object?.validators)
        ? object.validators.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      app_state_bytes: isSet(object.app_state_bytes)
        ? bytesFromBase64(object.app_state_bytes)
        : new Uint8Array(),
      initial_height: isSet(object.initial_height)
        ? String(object.initial_height)
        : "0",
    };
  },

  toJSON(message: RequestInitChain): unknown {
    const obj: any = {};
    message.time !== undefined &&
      (obj.time = fromTimestamp(message.time).toISOString());
    message.chain_id !== undefined && (obj.chain_id = message.chain_id);
    message.consensus_params !== undefined &&
      (obj.consensus_params = message.consensus_params
        ? ConsensusParams.toJSON(message.consensus_params)
        : undefined);
    if (message.validators) {
      obj.validators = message.validators.map((e) =>
        e ? ValidatorUpdate.toJSON(e) : undefined,
      );
    } else {
      obj.validators = [];
    }
    message.app_state_bytes !== undefined &&
      (obj.app_state_bytes = base64FromBytes(
        message.app_state_bytes !== undefined
          ? message.app_state_bytes
          : new Uint8Array(),
      ));
    message.initial_height !== undefined &&
      (obj.initial_height = message.initial_height);
    return obj;
  },

  fromPartial(object: DeepPartial<RequestInitChain>): RequestInitChain {
    const message = createBaseRequestInitChain();
    message.time =
      object.time !== undefined && object.time !== null
        ? Timestamp.fromPartial(object.time)
        : undefined;
    message.chain_id = object.chain_id ?? "";
    message.consensus_params =
      object.consensus_params !== undefined && object.consensus_params !== null
        ? ConsensusParams.fromPartial(object.consensus_params)
        : undefined;
    message.validators =
      object.validators?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.app_state_bytes = object.app_state_bytes ?? new Uint8Array();
    message.initial_height = object.initial_height ?? "0";
    return message;
  },
};

function createBaseRequestQuery(): RequestQuery {
  return { data: new Uint8Array(), path: "", height: "0", prove: false };
}

export const RequestQuery = {
  encode(
    message: RequestQuery,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.height !== "0") {
      writer.uint32(24).int64(message.height);
    }
    if (message.prove === true) {
      writer.uint32(32).bool(message.prove);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        case 2:
          message.path = reader.string();
          break;
        case 3:
          message.height = longToString(reader.int64() as Long);
          break;
        case 4:
          message.prove = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestQuery {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      path: isSet(object.path) ? String(object.path) : "",
      height: isSet(object.height) ? String(object.height) : "0",
      prove: isSet(object.prove) ? Boolean(object.prove) : false,
    };
  },

  toJSON(message: RequestQuery): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    message.path !== undefined && (obj.path = message.path);
    message.height !== undefined && (obj.height = message.height);
    message.prove !== undefined && (obj.prove = message.prove);
    return obj;
  },

  fromPartial(object: DeepPartial<RequestQuery>): RequestQuery {
    const message = createBaseRequestQuery();
    message.data = object.data ?? new Uint8Array();
    message.path = object.path ?? "";
    message.height = object.height ?? "0";
    message.prove = object.prove ?? false;
    return message;
  },
};

function createBaseRequestCheckTx(): RequestCheckTx {
  return { tx: new Uint8Array(), type: 0 };
}

export const RequestCheckTx = {
  encode(
    message: RequestCheckTx,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.tx.length !== 0) {
      writer.uint32(10).bytes(message.tx);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestCheckTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestCheckTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = reader.bytes();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestCheckTx {
    return {
      tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(),
      type: isSet(object.type) ? checkTxTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: RequestCheckTx): unknown {
    const obj: any = {};
    message.tx !== undefined &&
      (obj.tx = base64FromBytes(
        message.tx !== undefined ? message.tx : new Uint8Array(),
      ));
    message.type !== undefined && (obj.type = checkTxTypeToJSON(message.type));
    return obj;
  },

  fromPartial(object: DeepPartial<RequestCheckTx>): RequestCheckTx {
    const message = createBaseRequestCheckTx();
    message.tx = object.tx ?? new Uint8Array();
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseRequestCommit(): RequestCommit {
  return {};
}

export const RequestCommit = {
  encode(
    _: RequestCommit,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestCommit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestCommit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): RequestCommit {
    return {};
  },

  toJSON(_: RequestCommit): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<RequestCommit>): RequestCommit {
    const message = createBaseRequestCommit();
    return message;
  },
};

function createBaseRequestListSnapshots(): RequestListSnapshots {
  return {};
}

export const RequestListSnapshots = {
  encode(
    _: RequestListSnapshots,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RequestListSnapshots {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestListSnapshots();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): RequestListSnapshots {
    return {};
  },

  toJSON(_: RequestListSnapshots): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<RequestListSnapshots>): RequestListSnapshots {
    const message = createBaseRequestListSnapshots();
    return message;
  },
};

function createBaseRequestOfferSnapshot(): RequestOfferSnapshot {
  return { snapshot: undefined, app_hash: new Uint8Array() };
}

export const RequestOfferSnapshot = {
  encode(
    message: RequestOfferSnapshot,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.snapshot !== undefined) {
      Snapshot.encode(message.snapshot, writer.uint32(10).fork()).ldelim();
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(18).bytes(message.app_hash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RequestOfferSnapshot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestOfferSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.snapshot = Snapshot.decode(reader, reader.uint32());
          break;
        case 2:
          message.app_hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestOfferSnapshot {
    return {
      snapshot: isSet(object.snapshot)
        ? Snapshot.fromJSON(object.snapshot)
        : undefined,
      app_hash: isSet(object.app_hash)
        ? bytesFromBase64(object.app_hash)
        : new Uint8Array(),
    };
  },

  toJSON(message: RequestOfferSnapshot): unknown {
    const obj: any = {};
    message.snapshot !== undefined &&
      (obj.snapshot = message.snapshot
        ? Snapshot.toJSON(message.snapshot)
        : undefined);
    message.app_hash !== undefined &&
      (obj.app_hash = base64FromBytes(
        message.app_hash !== undefined ? message.app_hash : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<RequestOfferSnapshot>): RequestOfferSnapshot {
    const message = createBaseRequestOfferSnapshot();
    message.snapshot =
      object.snapshot !== undefined && object.snapshot !== null
        ? Snapshot.fromPartial(object.snapshot)
        : undefined;
    message.app_hash = object.app_hash ?? new Uint8Array();
    return message;
  },
};

function createBaseRequestLoadSnapshotChunk(): RequestLoadSnapshotChunk {
  return { height: "0", format: 0, chunk: 0 };
}

export const RequestLoadSnapshotChunk = {
  encode(
    message: RequestLoadSnapshotChunk,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.chunk !== 0) {
      writer.uint32(24).uint32(message.chunk);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RequestLoadSnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestLoadSnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.format = reader.uint32();
          break;
        case 3:
          message.chunk = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestLoadSnapshotChunk {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      format: isSet(object.format) ? Number(object.format) : 0,
      chunk: isSet(object.chunk) ? Number(object.chunk) : 0,
    };
  },

  toJSON(message: RequestLoadSnapshotChunk): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.format !== undefined && (obj.format = Math.round(message.format));
    message.chunk !== undefined && (obj.chunk = Math.round(message.chunk));
    return obj;
  },

  fromPartial(
    object: DeepPartial<RequestLoadSnapshotChunk>,
  ): RequestLoadSnapshotChunk {
    const message = createBaseRequestLoadSnapshotChunk();
    message.height = object.height ?? "0";
    message.format = object.format ?? 0;
    message.chunk = object.chunk ?? 0;
    return message;
  },
};

function createBaseRequestApplySnapshotChunk(): RequestApplySnapshotChunk {
  return { index: 0, chunk: new Uint8Array(), sender: "" };
}

export const RequestApplySnapshotChunk = {
  encode(
    message: RequestApplySnapshotChunk,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint32(message.index);
    }
    if (message.chunk.length !== 0) {
      writer.uint32(18).bytes(message.chunk);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RequestApplySnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestApplySnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        case 2:
          message.chunk = reader.bytes();
          break;
        case 3:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestApplySnapshotChunk {
    return {
      index: isSet(object.index) ? Number(object.index) : 0,
      chunk: isSet(object.chunk)
        ? bytesFromBase64(object.chunk)
        : new Uint8Array(),
      sender: isSet(object.sender) ? String(object.sender) : "",
    };
  },

  toJSON(message: RequestApplySnapshotChunk): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = Math.round(message.index));
    message.chunk !== undefined &&
      (obj.chunk = base64FromBytes(
        message.chunk !== undefined ? message.chunk : new Uint8Array(),
      ));
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial(
    object: DeepPartial<RequestApplySnapshotChunk>,
  ): RequestApplySnapshotChunk {
    const message = createBaseRequestApplySnapshotChunk();
    message.index = object.index ?? 0;
    message.chunk = object.chunk ?? new Uint8Array();
    message.sender = object.sender ?? "";
    return message;
  },
};

function createBaseRequestPrepareProposal(): RequestPrepareProposal {
  return {
    max_tx_bytes: "0",
    txs: [],
    local_last_commit: undefined,
    misbehavior: [],
    height: "0",
    time: undefined,
    next_validators_hash: new Uint8Array(),
    proposer_address: new Uint8Array(),
  };
}

export const RequestPrepareProposal = {
  encode(
    message: RequestPrepareProposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.max_tx_bytes !== "0") {
      writer.uint32(8).int64(message.max_tx_bytes);
    }
    for (const v of message.txs) {
      writer.uint32(18).bytes(v!);
    }
    if (message.local_last_commit !== undefined) {
      ExtendedCommitInfo.encode(
        message.local_last_commit,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.height !== "0") {
      writer.uint32(40).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(message.time, writer.uint32(50).fork()).ldelim();
    }
    if (message.next_validators_hash.length !== 0) {
      writer.uint32(58).bytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      writer.uint32(66).bytes(message.proposer_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RequestPrepareProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestPrepareProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.max_tx_bytes = longToString(reader.int64() as Long);
          break;
        case 2:
          message.txs.push(reader.bytes());
          break;
        case 3:
          message.local_last_commit = ExtendedCommitInfo.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          break;
        case 5:
          message.height = longToString(reader.int64() as Long);
          break;
        case 6:
          message.time = Timestamp.decode(reader, reader.uint32());
          break;
        case 7:
          message.next_validators_hash = reader.bytes();
          break;
        case 8:
          message.proposer_address = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestPrepareProposal {
    return {
      max_tx_bytes: isSet(object.max_tx_bytes)
        ? String(object.max_tx_bytes)
        : "0",
      txs: Array.isArray(object?.txs)
        ? object.txs.map((e: any) => bytesFromBase64(e))
        : [],
      local_last_commit: isSet(object.local_last_commit)
        ? ExtendedCommitInfo.fromJSON(object.local_last_commit)
        : undefined,
      misbehavior: Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      height: isSet(object.height) ? String(object.height) : "0",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      next_validators_hash: isSet(object.next_validators_hash)
        ? bytesFromBase64(object.next_validators_hash)
        : new Uint8Array(),
      proposer_address: isSet(object.proposer_address)
        ? bytesFromBase64(object.proposer_address)
        : new Uint8Array(),
    };
  },

  toJSON(message: RequestPrepareProposal): unknown {
    const obj: any = {};
    message.max_tx_bytes !== undefined &&
      (obj.max_tx_bytes = message.max_tx_bytes);
    if (message.txs) {
      obj.txs = message.txs.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.txs = [];
    }
    message.local_last_commit !== undefined &&
      (obj.local_last_commit = message.local_last_commit
        ? ExtendedCommitInfo.toJSON(message.local_last_commit)
        : undefined);
    if (message.misbehavior) {
      obj.misbehavior = message.misbehavior.map((e) =>
        e ? Misbehavior.toJSON(e) : undefined,
      );
    } else {
      obj.misbehavior = [];
    }
    message.height !== undefined && (obj.height = message.height);
    message.time !== undefined &&
      (obj.time = fromTimestamp(message.time).toISOString());
    message.next_validators_hash !== undefined &&
      (obj.next_validators_hash = base64FromBytes(
        message.next_validators_hash !== undefined
          ? message.next_validators_hash
          : new Uint8Array(),
      ));
    message.proposer_address !== undefined &&
      (obj.proposer_address = base64FromBytes(
        message.proposer_address !== undefined
          ? message.proposer_address
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<RequestPrepareProposal>,
  ): RequestPrepareProposal {
    const message = createBaseRequestPrepareProposal();
    message.max_tx_bytes = object.max_tx_bytes ?? "0";
    message.txs = object.txs?.map((e) => e) || [];
    message.local_last_commit =
      object.local_last_commit !== undefined &&
      object.local_last_commit !== null
        ? ExtendedCommitInfo.fromPartial(object.local_last_commit)
        : undefined;
    message.misbehavior =
      object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.height = object.height ?? "0";
    message.time =
      object.time !== undefined && object.time !== null
        ? Timestamp.fromPartial(object.time)
        : undefined;
    message.next_validators_hash =
      object.next_validators_hash ?? new Uint8Array();
    message.proposer_address = object.proposer_address ?? new Uint8Array();
    return message;
  },
};

function createBaseRequestProcessProposal(): RequestProcessProposal {
  return {
    txs: [],
    proposed_last_commit: undefined,
    misbehavior: [],
    hash: new Uint8Array(),
    height: "0",
    time: undefined,
    next_validators_hash: new Uint8Array(),
    proposer_address: new Uint8Array(),
  };
}

export const RequestProcessProposal = {
  encode(
    message: RequestProcessProposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    if (message.proposed_last_commit !== undefined) {
      CommitInfo.encode(
        message.proposed_last_commit,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.height !== "0") {
      writer.uint32(40).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(message.time, writer.uint32(50).fork()).ldelim();
    }
    if (message.next_validators_hash.length !== 0) {
      writer.uint32(58).bytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      writer.uint32(66).bytes(message.proposer_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RequestProcessProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestProcessProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(reader.bytes());
          break;
        case 2:
          message.proposed_last_commit = CommitInfo.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 3:
          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          break;
        case 4:
          message.hash = reader.bytes();
          break;
        case 5:
          message.height = longToString(reader.int64() as Long);
          break;
        case 6:
          message.time = Timestamp.decode(reader, reader.uint32());
          break;
        case 7:
          message.next_validators_hash = reader.bytes();
          break;
        case 8:
          message.proposer_address = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestProcessProposal {
    return {
      txs: Array.isArray(object?.txs)
        ? object.txs.map((e: any) => bytesFromBase64(e))
        : [],
      proposed_last_commit: isSet(object.proposed_last_commit)
        ? CommitInfo.fromJSON(object.proposed_last_commit)
        : undefined,
      misbehavior: Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
      height: isSet(object.height) ? String(object.height) : "0",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      next_validators_hash: isSet(object.next_validators_hash)
        ? bytesFromBase64(object.next_validators_hash)
        : new Uint8Array(),
      proposer_address: isSet(object.proposer_address)
        ? bytesFromBase64(object.proposer_address)
        : new Uint8Array(),
    };
  },

  toJSON(message: RequestProcessProposal): unknown {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.txs = [];
    }
    message.proposed_last_commit !== undefined &&
      (obj.proposed_last_commit = message.proposed_last_commit
        ? CommitInfo.toJSON(message.proposed_last_commit)
        : undefined);
    if (message.misbehavior) {
      obj.misbehavior = message.misbehavior.map((e) =>
        e ? Misbehavior.toJSON(e) : undefined,
      );
    } else {
      obj.misbehavior = [];
    }
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array(),
      ));
    message.height !== undefined && (obj.height = message.height);
    message.time !== undefined &&
      (obj.time = fromTimestamp(message.time).toISOString());
    message.next_validators_hash !== undefined &&
      (obj.next_validators_hash = base64FromBytes(
        message.next_validators_hash !== undefined
          ? message.next_validators_hash
          : new Uint8Array(),
      ));
    message.proposer_address !== undefined &&
      (obj.proposer_address = base64FromBytes(
        message.proposer_address !== undefined
          ? message.proposer_address
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<RequestProcessProposal>,
  ): RequestProcessProposal {
    const message = createBaseRequestProcessProposal();
    message.txs = object.txs?.map((e) => e) || [];
    message.proposed_last_commit =
      object.proposed_last_commit !== undefined &&
      object.proposed_last_commit !== null
        ? CommitInfo.fromPartial(object.proposed_last_commit)
        : undefined;
    message.misbehavior =
      object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.hash = object.hash ?? new Uint8Array();
    message.height = object.height ?? "0";
    message.time =
      object.time !== undefined && object.time !== null
        ? Timestamp.fromPartial(object.time)
        : undefined;
    message.next_validators_hash =
      object.next_validators_hash ?? new Uint8Array();
    message.proposer_address = object.proposer_address ?? new Uint8Array();
    return message;
  },
};

function createBaseRequestExtendVote(): RequestExtendVote {
  return {
    hash: new Uint8Array(),
    height: "0",
    time: undefined,
    txs: [],
    proposed_last_commit: undefined,
    misbehavior: [],
    next_validators_hash: new Uint8Array(),
    proposer_address: new Uint8Array(),
  };
}

export const RequestExtendVote = {
  encode(
    message: RequestExtendVote,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.height !== "0") {
      writer.uint32(16).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(message.time, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.txs) {
      writer.uint32(34).bytes(v!);
    }
    if (message.proposed_last_commit !== undefined) {
      CommitInfo.encode(
        message.proposed_last_commit,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.next_validators_hash.length !== 0) {
      writer.uint32(58).bytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      writer.uint32(66).bytes(message.proposer_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestExtendVote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestExtendVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes();
          break;
        case 2:
          message.height = longToString(reader.int64() as Long);
          break;
        case 3:
          message.time = Timestamp.decode(reader, reader.uint32());
          break;
        case 4:
          message.txs.push(reader.bytes());
          break;
        case 5:
          message.proposed_last_commit = CommitInfo.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 6:
          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          break;
        case 7:
          message.next_validators_hash = reader.bytes();
          break;
        case 8:
          message.proposer_address = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestExtendVote {
    return {
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
      height: isSet(object.height) ? String(object.height) : "0",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      txs: Array.isArray(object?.txs)
        ? object.txs.map((e: any) => bytesFromBase64(e))
        : [],
      proposed_last_commit: isSet(object.proposed_last_commit)
        ? CommitInfo.fromJSON(object.proposed_last_commit)
        : undefined,
      misbehavior: Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      next_validators_hash: isSet(object.next_validators_hash)
        ? bytesFromBase64(object.next_validators_hash)
        : new Uint8Array(),
      proposer_address: isSet(object.proposer_address)
        ? bytesFromBase64(object.proposer_address)
        : new Uint8Array(),
    };
  },

  toJSON(message: RequestExtendVote): unknown {
    const obj: any = {};
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array(),
      ));
    message.height !== undefined && (obj.height = message.height);
    message.time !== undefined &&
      (obj.time = fromTimestamp(message.time).toISOString());
    if (message.txs) {
      obj.txs = message.txs.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.txs = [];
    }
    message.proposed_last_commit !== undefined &&
      (obj.proposed_last_commit = message.proposed_last_commit
        ? CommitInfo.toJSON(message.proposed_last_commit)
        : undefined);
    if (message.misbehavior) {
      obj.misbehavior = message.misbehavior.map((e) =>
        e ? Misbehavior.toJSON(e) : undefined,
      );
    } else {
      obj.misbehavior = [];
    }
    message.next_validators_hash !== undefined &&
      (obj.next_validators_hash = base64FromBytes(
        message.next_validators_hash !== undefined
          ? message.next_validators_hash
          : new Uint8Array(),
      ));
    message.proposer_address !== undefined &&
      (obj.proposer_address = base64FromBytes(
        message.proposer_address !== undefined
          ? message.proposer_address
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<RequestExtendVote>): RequestExtendVote {
    const message = createBaseRequestExtendVote();
    message.hash = object.hash ?? new Uint8Array();
    message.height = object.height ?? "0";
    message.time =
      object.time !== undefined && object.time !== null
        ? Timestamp.fromPartial(object.time)
        : undefined;
    message.txs = object.txs?.map((e) => e) || [];
    message.proposed_last_commit =
      object.proposed_last_commit !== undefined &&
      object.proposed_last_commit !== null
        ? CommitInfo.fromPartial(object.proposed_last_commit)
        : undefined;
    message.misbehavior =
      object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.next_validators_hash =
      object.next_validators_hash ?? new Uint8Array();
    message.proposer_address = object.proposer_address ?? new Uint8Array();
    return message;
  },
};

function createBaseRequestVerifyVoteExtension(): RequestVerifyVoteExtension {
  return {
    hash: new Uint8Array(),
    validator_address: new Uint8Array(),
    height: "0",
    vote_extension: new Uint8Array(),
  };
}

export const RequestVerifyVoteExtension = {
  encode(
    message: RequestVerifyVoteExtension,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.validator_address.length !== 0) {
      writer.uint32(18).bytes(message.validator_address);
    }
    if (message.height !== "0") {
      writer.uint32(24).int64(message.height);
    }
    if (message.vote_extension.length !== 0) {
      writer.uint32(34).bytes(message.vote_extension);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RequestVerifyVoteExtension {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestVerifyVoteExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes();
          break;
        case 2:
          message.validator_address = reader.bytes();
          break;
        case 3:
          message.height = longToString(reader.int64() as Long);
          break;
        case 4:
          message.vote_extension = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestVerifyVoteExtension {
    return {
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
      validator_address: isSet(object.validator_address)
        ? bytesFromBase64(object.validator_address)
        : new Uint8Array(),
      height: isSet(object.height) ? String(object.height) : "0",
      vote_extension: isSet(object.vote_extension)
        ? bytesFromBase64(object.vote_extension)
        : new Uint8Array(),
    };
  },

  toJSON(message: RequestVerifyVoteExtension): unknown {
    const obj: any = {};
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array(),
      ));
    message.validator_address !== undefined &&
      (obj.validator_address = base64FromBytes(
        message.validator_address !== undefined
          ? message.validator_address
          : new Uint8Array(),
      ));
    message.height !== undefined && (obj.height = message.height);
    message.vote_extension !== undefined &&
      (obj.vote_extension = base64FromBytes(
        message.vote_extension !== undefined
          ? message.vote_extension
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<RequestVerifyVoteExtension>,
  ): RequestVerifyVoteExtension {
    const message = createBaseRequestVerifyVoteExtension();
    message.hash = object.hash ?? new Uint8Array();
    message.validator_address = object.validator_address ?? new Uint8Array();
    message.height = object.height ?? "0";
    message.vote_extension = object.vote_extension ?? new Uint8Array();
    return message;
  },
};

function createBaseRequestFinalizeBlock(): RequestFinalizeBlock {
  return {
    txs: [],
    decided_last_commit: undefined,
    misbehavior: [],
    hash: new Uint8Array(),
    height: "0",
    time: undefined,
    next_validators_hash: new Uint8Array(),
    proposer_address: new Uint8Array(),
  };
}

export const RequestFinalizeBlock = {
  encode(
    message: RequestFinalizeBlock,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    if (message.decided_last_commit !== undefined) {
      CommitInfo.encode(
        message.decided_last_commit,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.height !== "0") {
      writer.uint32(40).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(message.time, writer.uint32(50).fork()).ldelim();
    }
    if (message.next_validators_hash.length !== 0) {
      writer.uint32(58).bytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      writer.uint32(66).bytes(message.proposer_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RequestFinalizeBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestFinalizeBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(reader.bytes());
          break;
        case 2:
          message.decided_last_commit = CommitInfo.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 3:
          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          break;
        case 4:
          message.hash = reader.bytes();
          break;
        case 5:
          message.height = longToString(reader.int64() as Long);
          break;
        case 6:
          message.time = Timestamp.decode(reader, reader.uint32());
          break;
        case 7:
          message.next_validators_hash = reader.bytes();
          break;
        case 8:
          message.proposer_address = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestFinalizeBlock {
    return {
      txs: Array.isArray(object?.txs)
        ? object.txs.map((e: any) => bytesFromBase64(e))
        : [],
      decided_last_commit: isSet(object.decided_last_commit)
        ? CommitInfo.fromJSON(object.decided_last_commit)
        : undefined,
      misbehavior: Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
      height: isSet(object.height) ? String(object.height) : "0",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      next_validators_hash: isSet(object.next_validators_hash)
        ? bytesFromBase64(object.next_validators_hash)
        : new Uint8Array(),
      proposer_address: isSet(object.proposer_address)
        ? bytesFromBase64(object.proposer_address)
        : new Uint8Array(),
    };
  },

  toJSON(message: RequestFinalizeBlock): unknown {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.txs = [];
    }
    message.decided_last_commit !== undefined &&
      (obj.decided_last_commit = message.decided_last_commit
        ? CommitInfo.toJSON(message.decided_last_commit)
        : undefined);
    if (message.misbehavior) {
      obj.misbehavior = message.misbehavior.map((e) =>
        e ? Misbehavior.toJSON(e) : undefined,
      );
    } else {
      obj.misbehavior = [];
    }
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array(),
      ));
    message.height !== undefined && (obj.height = message.height);
    message.time !== undefined &&
      (obj.time = fromTimestamp(message.time).toISOString());
    message.next_validators_hash !== undefined &&
      (obj.next_validators_hash = base64FromBytes(
        message.next_validators_hash !== undefined
          ? message.next_validators_hash
          : new Uint8Array(),
      ));
    message.proposer_address !== undefined &&
      (obj.proposer_address = base64FromBytes(
        message.proposer_address !== undefined
          ? message.proposer_address
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<RequestFinalizeBlock>): RequestFinalizeBlock {
    const message = createBaseRequestFinalizeBlock();
    message.txs = object.txs?.map((e) => e) || [];
    message.decided_last_commit =
      object.decided_last_commit !== undefined &&
      object.decided_last_commit !== null
        ? CommitInfo.fromPartial(object.decided_last_commit)
        : undefined;
    message.misbehavior =
      object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.hash = object.hash ?? new Uint8Array();
    message.height = object.height ?? "0";
    message.time =
      object.time !== undefined && object.time !== null
        ? Timestamp.fromPartial(object.time)
        : undefined;
    message.next_validators_hash =
      object.next_validators_hash ?? new Uint8Array();
    message.proposer_address = object.proposer_address ?? new Uint8Array();
    return message;
  },
};

function createBaseResponse(): Response {
  return {
    exception: undefined,
    echo: undefined,
    flush: undefined,
    info: undefined,
    init_chain: undefined,
    query: undefined,
    check_tx: undefined,
    commit: undefined,
    list_snapshots: undefined,
    offer_snapshot: undefined,
    load_snapshot_chunk: undefined,
    apply_snapshot_chunk: undefined,
    prepare_proposal: undefined,
    process_proposal: undefined,
    extend_vote: undefined,
    verify_vote_extension: undefined,
    finalize_block: undefined,
  };
}

export const Response = {
  encode(
    message: Response,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.exception !== undefined) {
      ResponseException.encode(
        message.exception,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.echo !== undefined) {
      ResponseEcho.encode(message.echo, writer.uint32(18).fork()).ldelim();
    }
    if (message.flush !== undefined) {
      ResponseFlush.encode(message.flush, writer.uint32(26).fork()).ldelim();
    }
    if (message.info !== undefined) {
      ResponseInfo.encode(message.info, writer.uint32(34).fork()).ldelim();
    }
    if (message.init_chain !== undefined) {
      ResponseInitChain.encode(
        message.init_chain,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.query !== undefined) {
      ResponseQuery.encode(message.query, writer.uint32(58).fork()).ldelim();
    }
    if (message.check_tx !== undefined) {
      ResponseCheckTx.encode(
        message.check_tx,
        writer.uint32(74).fork(),
      ).ldelim();
    }
    if (message.commit !== undefined) {
      ResponseCommit.encode(message.commit, writer.uint32(98).fork()).ldelim();
    }
    if (message.list_snapshots !== undefined) {
      ResponseListSnapshots.encode(
        message.list_snapshots,
        writer.uint32(106).fork(),
      ).ldelim();
    }
    if (message.offer_snapshot !== undefined) {
      ResponseOfferSnapshot.encode(
        message.offer_snapshot,
        writer.uint32(114).fork(),
      ).ldelim();
    }
    if (message.load_snapshot_chunk !== undefined) {
      ResponseLoadSnapshotChunk.encode(
        message.load_snapshot_chunk,
        writer.uint32(122).fork(),
      ).ldelim();
    }
    if (message.apply_snapshot_chunk !== undefined) {
      ResponseApplySnapshotChunk.encode(
        message.apply_snapshot_chunk,
        writer.uint32(130).fork(),
      ).ldelim();
    }
    if (message.prepare_proposal !== undefined) {
      ResponsePrepareProposal.encode(
        message.prepare_proposal,
        writer.uint32(138).fork(),
      ).ldelim();
    }
    if (message.process_proposal !== undefined) {
      ResponseProcessProposal.encode(
        message.process_proposal,
        writer.uint32(146).fork(),
      ).ldelim();
    }
    if (message.extend_vote !== undefined) {
      ResponseExtendVote.encode(
        message.extend_vote,
        writer.uint32(154).fork(),
      ).ldelim();
    }
    if (message.verify_vote_extension !== undefined) {
      ResponseVerifyVoteExtension.encode(
        message.verify_vote_extension,
        writer.uint32(162).fork(),
      ).ldelim();
    }
    if (message.finalize_block !== undefined) {
      ResponseFinalizeBlock.encode(
        message.finalize_block,
        writer.uint32(170).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exception = ResponseException.decode(reader, reader.uint32());
          break;
        case 2:
          message.echo = ResponseEcho.decode(reader, reader.uint32());
          break;
        case 3:
          message.flush = ResponseFlush.decode(reader, reader.uint32());
          break;
        case 4:
          message.info = ResponseInfo.decode(reader, reader.uint32());
          break;
        case 6:
          message.init_chain = ResponseInitChain.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 7:
          message.query = ResponseQuery.decode(reader, reader.uint32());
          break;
        case 9:
          message.check_tx = ResponseCheckTx.decode(reader, reader.uint32());
          break;
        case 12:
          message.commit = ResponseCommit.decode(reader, reader.uint32());
          break;
        case 13:
          message.list_snapshots = ResponseListSnapshots.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 14:
          message.offer_snapshot = ResponseOfferSnapshot.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 15:
          message.load_snapshot_chunk = ResponseLoadSnapshotChunk.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 16:
          message.apply_snapshot_chunk = ResponseApplySnapshotChunk.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 17:
          message.prepare_proposal = ResponsePrepareProposal.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 18:
          message.process_proposal = ResponseProcessProposal.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 19:
          message.extend_vote = ResponseExtendVote.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 20:
          message.verify_vote_extension = ResponseVerifyVoteExtension.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 21:
          message.finalize_block = ResponseFinalizeBlock.decode(
            reader,
            reader.uint32(),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response {
    return {
      exception: isSet(object.exception)
        ? ResponseException.fromJSON(object.exception)
        : undefined,
      echo: isSet(object.echo) ? ResponseEcho.fromJSON(object.echo) : undefined,
      flush: isSet(object.flush)
        ? ResponseFlush.fromJSON(object.flush)
        : undefined,
      info: isSet(object.info) ? ResponseInfo.fromJSON(object.info) : undefined,
      init_chain: isSet(object.init_chain)
        ? ResponseInitChain.fromJSON(object.init_chain)
        : undefined,
      query: isSet(object.query)
        ? ResponseQuery.fromJSON(object.query)
        : undefined,
      check_tx: isSet(object.check_tx)
        ? ResponseCheckTx.fromJSON(object.check_tx)
        : undefined,
      commit: isSet(object.commit)
        ? ResponseCommit.fromJSON(object.commit)
        : undefined,
      list_snapshots: isSet(object.list_snapshots)
        ? ResponseListSnapshots.fromJSON(object.list_snapshots)
        : undefined,
      offer_snapshot: isSet(object.offer_snapshot)
        ? ResponseOfferSnapshot.fromJSON(object.offer_snapshot)
        : undefined,
      load_snapshot_chunk: isSet(object.load_snapshot_chunk)
        ? ResponseLoadSnapshotChunk.fromJSON(object.load_snapshot_chunk)
        : undefined,
      apply_snapshot_chunk: isSet(object.apply_snapshot_chunk)
        ? ResponseApplySnapshotChunk.fromJSON(object.apply_snapshot_chunk)
        : undefined,
      prepare_proposal: isSet(object.prepare_proposal)
        ? ResponsePrepareProposal.fromJSON(object.prepare_proposal)
        : undefined,
      process_proposal: isSet(object.process_proposal)
        ? ResponseProcessProposal.fromJSON(object.process_proposal)
        : undefined,
      extend_vote: isSet(object.extend_vote)
        ? ResponseExtendVote.fromJSON(object.extend_vote)
        : undefined,
      verify_vote_extension: isSet(object.verify_vote_extension)
        ? ResponseVerifyVoteExtension.fromJSON(object.verify_vote_extension)
        : undefined,
      finalize_block: isSet(object.finalize_block)
        ? ResponseFinalizeBlock.fromJSON(object.finalize_block)
        : undefined,
    };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    message.exception !== undefined &&
      (obj.exception = message.exception
        ? ResponseException.toJSON(message.exception)
        : undefined);
    message.echo !== undefined &&
      (obj.echo = message.echo ? ResponseEcho.toJSON(message.echo) : undefined);
    message.flush !== undefined &&
      (obj.flush = message.flush
        ? ResponseFlush.toJSON(message.flush)
        : undefined);
    message.info !== undefined &&
      (obj.info = message.info ? ResponseInfo.toJSON(message.info) : undefined);
    message.init_chain !== undefined &&
      (obj.init_chain = message.init_chain
        ? ResponseInitChain.toJSON(message.init_chain)
        : undefined);
    message.query !== undefined &&
      (obj.query = message.query
        ? ResponseQuery.toJSON(message.query)
        : undefined);
    message.check_tx !== undefined &&
      (obj.check_tx = message.check_tx
        ? ResponseCheckTx.toJSON(message.check_tx)
        : undefined);
    message.commit !== undefined &&
      (obj.commit = message.commit
        ? ResponseCommit.toJSON(message.commit)
        : undefined);
    message.list_snapshots !== undefined &&
      (obj.list_snapshots = message.list_snapshots
        ? ResponseListSnapshots.toJSON(message.list_snapshots)
        : undefined);
    message.offer_snapshot !== undefined &&
      (obj.offer_snapshot = message.offer_snapshot
        ? ResponseOfferSnapshot.toJSON(message.offer_snapshot)
        : undefined);
    message.load_snapshot_chunk !== undefined &&
      (obj.load_snapshot_chunk = message.load_snapshot_chunk
        ? ResponseLoadSnapshotChunk.toJSON(message.load_snapshot_chunk)
        : undefined);
    message.apply_snapshot_chunk !== undefined &&
      (obj.apply_snapshot_chunk = message.apply_snapshot_chunk
        ? ResponseApplySnapshotChunk.toJSON(message.apply_snapshot_chunk)
        : undefined);
    message.prepare_proposal !== undefined &&
      (obj.prepare_proposal = message.prepare_proposal
        ? ResponsePrepareProposal.toJSON(message.prepare_proposal)
        : undefined);
    message.process_proposal !== undefined &&
      (obj.process_proposal = message.process_proposal
        ? ResponseProcessProposal.toJSON(message.process_proposal)
        : undefined);
    message.extend_vote !== undefined &&
      (obj.extend_vote = message.extend_vote
        ? ResponseExtendVote.toJSON(message.extend_vote)
        : undefined);
    message.verify_vote_extension !== undefined &&
      (obj.verify_vote_extension = message.verify_vote_extension
        ? ResponseVerifyVoteExtension.toJSON(message.verify_vote_extension)
        : undefined);
    message.finalize_block !== undefined &&
      (obj.finalize_block = message.finalize_block
        ? ResponseFinalizeBlock.toJSON(message.finalize_block)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Response>): Response {
    const message = createBaseResponse();
    message.exception =
      object.exception !== undefined && object.exception !== null
        ? ResponseException.fromPartial(object.exception)
        : undefined;
    message.echo =
      object.echo !== undefined && object.echo !== null
        ? ResponseEcho.fromPartial(object.echo)
        : undefined;
    message.flush =
      object.flush !== undefined && object.flush !== null
        ? ResponseFlush.fromPartial(object.flush)
        : undefined;
    message.info =
      object.info !== undefined && object.info !== null
        ? ResponseInfo.fromPartial(object.info)
        : undefined;
    message.init_chain =
      object.init_chain !== undefined && object.init_chain !== null
        ? ResponseInitChain.fromPartial(object.init_chain)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? ResponseQuery.fromPartial(object.query)
        : undefined;
    message.check_tx =
      object.check_tx !== undefined && object.check_tx !== null
        ? ResponseCheckTx.fromPartial(object.check_tx)
        : undefined;
    message.commit =
      object.commit !== undefined && object.commit !== null
        ? ResponseCommit.fromPartial(object.commit)
        : undefined;
    message.list_snapshots =
      object.list_snapshots !== undefined && object.list_snapshots !== null
        ? ResponseListSnapshots.fromPartial(object.list_snapshots)
        : undefined;
    message.offer_snapshot =
      object.offer_snapshot !== undefined && object.offer_snapshot !== null
        ? ResponseOfferSnapshot.fromPartial(object.offer_snapshot)
        : undefined;
    message.load_snapshot_chunk =
      object.load_snapshot_chunk !== undefined &&
      object.load_snapshot_chunk !== null
        ? ResponseLoadSnapshotChunk.fromPartial(object.load_snapshot_chunk)
        : undefined;
    message.apply_snapshot_chunk =
      object.apply_snapshot_chunk !== undefined &&
      object.apply_snapshot_chunk !== null
        ? ResponseApplySnapshotChunk.fromPartial(object.apply_snapshot_chunk)
        : undefined;
    message.prepare_proposal =
      object.prepare_proposal !== undefined && object.prepare_proposal !== null
        ? ResponsePrepareProposal.fromPartial(object.prepare_proposal)
        : undefined;
    message.process_proposal =
      object.process_proposal !== undefined && object.process_proposal !== null
        ? ResponseProcessProposal.fromPartial(object.process_proposal)
        : undefined;
    message.extend_vote =
      object.extend_vote !== undefined && object.extend_vote !== null
        ? ResponseExtendVote.fromPartial(object.extend_vote)
        : undefined;
    message.verify_vote_extension =
      object.verify_vote_extension !== undefined &&
      object.verify_vote_extension !== null
        ? ResponseVerifyVoteExtension.fromPartial(object.verify_vote_extension)
        : undefined;
    message.finalize_block =
      object.finalize_block !== undefined && object.finalize_block !== null
        ? ResponseFinalizeBlock.fromPartial(object.finalize_block)
        : undefined;
    return message;
  },
};

function createBaseResponseException(): ResponseException {
  return { error: "" };
}

export const ResponseException = {
  encode(
    message: ResponseException,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.error !== "") {
      writer.uint32(10).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseException {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseException();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseException {
    return {
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: ResponseException): unknown {
    const obj: any = {};
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  fromPartial(object: DeepPartial<ResponseException>): ResponseException {
    const message = createBaseResponseException();
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseResponseEcho(): ResponseEcho {
  return { message: "" };
}

export const ResponseEcho = {
  encode(
    message: ResponseEcho,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseEcho {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseEcho();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseEcho {
    return {
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: ResponseEcho): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial(object: DeepPartial<ResponseEcho>): ResponseEcho {
    const message = createBaseResponseEcho();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseFlush(): ResponseFlush {
  return {};
}

export const ResponseFlush = {
  encode(
    _: ResponseFlush,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseFlush {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseFlush();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ResponseFlush {
    return {};
  },

  toJSON(_: ResponseFlush): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<ResponseFlush>): ResponseFlush {
    const message = createBaseResponseFlush();
    return message;
  },
};

function createBaseResponseInfo(): ResponseInfo {
  return {
    data: "",
    version: "",
    app_version: "0",
    last_block_height: "0",
    last_block_app_hash: new Uint8Array(),
  };
}

export const ResponseInfo = {
  encode(
    message: ResponseInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.app_version !== "0") {
      writer.uint32(24).uint64(message.app_version);
    }
    if (message.last_block_height !== "0") {
      writer.uint32(32).int64(message.last_block_height);
    }
    if (message.last_block_app_hash.length !== 0) {
      writer.uint32(42).bytes(message.last_block_app_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        case 3:
          message.app_version = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.last_block_height = longToString(reader.int64() as Long);
          break;
        case 5:
          message.last_block_app_hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseInfo {
    return {
      data: isSet(object.data) ? String(object.data) : "",
      version: isSet(object.version) ? String(object.version) : "",
      app_version: isSet(object.app_version) ? String(object.app_version) : "0",
      last_block_height: isSet(object.last_block_height)
        ? String(object.last_block_height)
        : "0",
      last_block_app_hash: isSet(object.last_block_app_hash)
        ? bytesFromBase64(object.last_block_app_hash)
        : new Uint8Array(),
    };
  },

  toJSON(message: ResponseInfo): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data);
    message.version !== undefined && (obj.version = message.version);
    message.app_version !== undefined &&
      (obj.app_version = message.app_version);
    message.last_block_height !== undefined &&
      (obj.last_block_height = message.last_block_height);
    message.last_block_app_hash !== undefined &&
      (obj.last_block_app_hash = base64FromBytes(
        message.last_block_app_hash !== undefined
          ? message.last_block_app_hash
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<ResponseInfo>): ResponseInfo {
    const message = createBaseResponseInfo();
    message.data = object.data ?? "";
    message.version = object.version ?? "";
    message.app_version = object.app_version ?? "0";
    message.last_block_height = object.last_block_height ?? "0";
    message.last_block_app_hash =
      object.last_block_app_hash ?? new Uint8Array();
    return message;
  },
};

function createBaseResponseInitChain(): ResponseInitChain {
  return {
    consensus_params: undefined,
    validators: [],
    app_hash: new Uint8Array(),
  };
}

export const ResponseInitChain = {
  encode(
    message: ResponseInitChain,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consensus_params !== undefined) {
      ConsensusParams.encode(
        message.consensus_params,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    for (const v of message.validators) {
      ValidatorUpdate.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(26).bytes(message.app_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInitChain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseInitChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensus_params = ConsensusParams.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.validators.push(
            ValidatorUpdate.decode(reader, reader.uint32()),
          );
          break;
        case 3:
          message.app_hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseInitChain {
    return {
      consensus_params: isSet(object.consensus_params)
        ? ConsensusParams.fromJSON(object.consensus_params)
        : undefined,
      validators: Array.isArray(object?.validators)
        ? object.validators.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      app_hash: isSet(object.app_hash)
        ? bytesFromBase64(object.app_hash)
        : new Uint8Array(),
    };
  },

  toJSON(message: ResponseInitChain): unknown {
    const obj: any = {};
    message.consensus_params !== undefined &&
      (obj.consensus_params = message.consensus_params
        ? ConsensusParams.toJSON(message.consensus_params)
        : undefined);
    if (message.validators) {
      obj.validators = message.validators.map((e) =>
        e ? ValidatorUpdate.toJSON(e) : undefined,
      );
    } else {
      obj.validators = [];
    }
    message.app_hash !== undefined &&
      (obj.app_hash = base64FromBytes(
        message.app_hash !== undefined ? message.app_hash : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<ResponseInitChain>): ResponseInitChain {
    const message = createBaseResponseInitChain();
    message.consensus_params =
      object.consensus_params !== undefined && object.consensus_params !== null
        ? ConsensusParams.fromPartial(object.consensus_params)
        : undefined;
    message.validators =
      object.validators?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.app_hash = object.app_hash ?? new Uint8Array();
    return message;
  },
};

function createBaseResponseQuery(): ResponseQuery {
  return {
    code: 0,
    log: "",
    info: "",
    index: "0",
    key: new Uint8Array(),
    value: new Uint8Array(),
    proof_ops: undefined,
    height: "0",
    codespace: "",
  };
}

export const ResponseQuery = {
  encode(
    message: ResponseQuery,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.index !== "0") {
      writer.uint32(40).int64(message.index);
    }
    if (message.key.length !== 0) {
      writer.uint32(50).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(58).bytes(message.value);
    }
    if (message.proof_ops !== undefined) {
      ProofOps.encode(message.proof_ops, writer.uint32(66).fork()).ldelim();
    }
    if (message.height !== "0") {
      writer.uint32(72).int64(message.height);
    }
    if (message.codespace !== "") {
      writer.uint32(82).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.uint32();
          break;
        case 3:
          message.log = reader.string();
          break;
        case 4:
          message.info = reader.string();
          break;
        case 5:
          message.index = longToString(reader.int64() as Long);
          break;
        case 6:
          message.key = reader.bytes();
          break;
        case 7:
          message.value = reader.bytes();
          break;
        case 8:
          message.proof_ops = ProofOps.decode(reader, reader.uint32());
          break;
        case 9:
          message.height = longToString(reader.int64() as Long);
          break;
        case 10:
          message.codespace = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseQuery {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
      log: isSet(object.log) ? String(object.log) : "",
      info: isSet(object.info) ? String(object.info) : "",
      index: isSet(object.index) ? String(object.index) : "0",
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
      value: isSet(object.value)
        ? bytesFromBase64(object.value)
        : new Uint8Array(),
      proof_ops: isSet(object.proof_ops)
        ? ProofOps.fromJSON(object.proof_ops)
        : undefined,
      height: isSet(object.height) ? String(object.height) : "0",
      codespace: isSet(object.codespace) ? String(object.codespace) : "",
    };
  },

  toJSON(message: ResponseQuery): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.log !== undefined && (obj.log = message.log);
    message.info !== undefined && (obj.info = message.info);
    message.index !== undefined && (obj.index = message.index);
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array(),
      ));
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array(),
      ));
    message.proof_ops !== undefined &&
      (obj.proof_ops = message.proof_ops
        ? ProofOps.toJSON(message.proof_ops)
        : undefined);
    message.height !== undefined && (obj.height = message.height);
    message.codespace !== undefined && (obj.codespace = message.codespace);
    return obj;
  },

  fromPartial(object: DeepPartial<ResponseQuery>): ResponseQuery {
    const message = createBaseResponseQuery();
    message.code = object.code ?? 0;
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.index = object.index ?? "0";
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    message.proof_ops =
      object.proof_ops !== undefined && object.proof_ops !== null
        ? ProofOps.fromPartial(object.proof_ops)
        : undefined;
    message.height = object.height ?? "0";
    message.codespace = object.codespace ?? "";
    return message;
  },
};

function createBaseResponseCheckTx(): ResponseCheckTx {
  return {
    code: 0,
    data: new Uint8Array(),
    log: "",
    info: "",
    gas_wanted: "0",
    gas_used: "0",
    events: [],
    codespace: "",
  };
}

export const ResponseCheckTx = {
  encode(
    message: ResponseCheckTx,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.gas_wanted !== "0") {
      writer.uint32(40).int64(message.gas_wanted);
    }
    if (message.gas_used !== "0") {
      writer.uint32(48).int64(message.gas_used);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.codespace !== "") {
      writer.uint32(66).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCheckTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseCheckTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.uint32();
          break;
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.log = reader.string();
          break;
        case 4:
          message.info = reader.string();
          break;
        case 5:
          message.gas_wanted = longToString(reader.int64() as Long);
          break;
        case 6:
          message.gas_used = longToString(reader.int64() as Long);
          break;
        case 7:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        case 8:
          message.codespace = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseCheckTx {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      log: isSet(object.log) ? String(object.log) : "",
      info: isSet(object.info) ? String(object.info) : "",
      gas_wanted: isSet(object.gas_wanted) ? String(object.gas_wanted) : "0",
      gas_used: isSet(object.gas_used) ? String(object.gas_used) : "0",
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => Event.fromJSON(e))
        : [],
      codespace: isSet(object.codespace) ? String(object.codespace) : "",
    };
  },

  toJSON(message: ResponseCheckTx): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    message.log !== undefined && (obj.log = message.log);
    message.info !== undefined && (obj.info = message.info);
    message.gas_wanted !== undefined && (obj.gas_wanted = message.gas_wanted);
    message.gas_used !== undefined && (obj.gas_used = message.gas_used);
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    message.codespace !== undefined && (obj.codespace = message.codespace);
    return obj;
  },

  fromPartial(object: DeepPartial<ResponseCheckTx>): ResponseCheckTx {
    const message = createBaseResponseCheckTx();
    message.code = object.code ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.gas_wanted = object.gas_wanted ?? "0";
    message.gas_used = object.gas_used ?? "0";
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.codespace = object.codespace ?? "";
    return message;
  },
};

function createBaseResponseCommit(): ResponseCommit {
  return { retain_height: "0" };
}

export const ResponseCommit = {
  encode(
    message: ResponseCommit,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.retain_height !== "0") {
      writer.uint32(24).int64(message.retain_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCommit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseCommit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.retain_height = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseCommit {
    return {
      retain_height: isSet(object.retain_height)
        ? String(object.retain_height)
        : "0",
    };
  },

  toJSON(message: ResponseCommit): unknown {
    const obj: any = {};
    message.retain_height !== undefined &&
      (obj.retain_height = message.retain_height);
    return obj;
  },

  fromPartial(object: DeepPartial<ResponseCommit>): ResponseCommit {
    const message = createBaseResponseCommit();
    message.retain_height = object.retain_height ?? "0";
    return message;
  },
};

function createBaseResponseListSnapshots(): ResponseListSnapshots {
  return { snapshots: [] };
}

export const ResponseListSnapshots = {
  encode(
    message: ResponseListSnapshots,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.snapshots) {
      Snapshot.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ResponseListSnapshots {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseListSnapshots();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.snapshots.push(Snapshot.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseListSnapshots {
    return {
      snapshots: Array.isArray(object?.snapshots)
        ? object.snapshots.map((e: any) => Snapshot.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ResponseListSnapshots): unknown {
    const obj: any = {};
    if (message.snapshots) {
      obj.snapshots = message.snapshots.map((e) =>
        e ? Snapshot.toJSON(e) : undefined,
      );
    } else {
      obj.snapshots = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ResponseListSnapshots>,
  ): ResponseListSnapshots {
    const message = createBaseResponseListSnapshots();
    message.snapshots =
      object.snapshots?.map((e) => Snapshot.fromPartial(e)) || [];
    return message;
  },
};

function createBaseResponseOfferSnapshot(): ResponseOfferSnapshot {
  return { result: 0 };
}

export const ResponseOfferSnapshot = {
  encode(
    message: ResponseOfferSnapshot,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ResponseOfferSnapshot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseOfferSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseOfferSnapshot {
    return {
      result: isSet(object.result)
        ? responseOfferSnapshot_ResultFromJSON(object.result)
        : 0,
    };
  },

  toJSON(message: ResponseOfferSnapshot): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = responseOfferSnapshot_ResultToJSON(message.result));
    return obj;
  },

  fromPartial(
    object: DeepPartial<ResponseOfferSnapshot>,
  ): ResponseOfferSnapshot {
    const message = createBaseResponseOfferSnapshot();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseResponseLoadSnapshotChunk(): ResponseLoadSnapshotChunk {
  return { chunk: new Uint8Array() };
}

export const ResponseLoadSnapshotChunk = {
  encode(
    message: ResponseLoadSnapshotChunk,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.chunk.length !== 0) {
      writer.uint32(10).bytes(message.chunk);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ResponseLoadSnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseLoadSnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chunk = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseLoadSnapshotChunk {
    return {
      chunk: isSet(object.chunk)
        ? bytesFromBase64(object.chunk)
        : new Uint8Array(),
    };
  },

  toJSON(message: ResponseLoadSnapshotChunk): unknown {
    const obj: any = {};
    message.chunk !== undefined &&
      (obj.chunk = base64FromBytes(
        message.chunk !== undefined ? message.chunk : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<ResponseLoadSnapshotChunk>,
  ): ResponseLoadSnapshotChunk {
    const message = createBaseResponseLoadSnapshotChunk();
    message.chunk = object.chunk ?? new Uint8Array();
    return message;
  },
};

function createBaseResponseApplySnapshotChunk(): ResponseApplySnapshotChunk {
  return { result: 0, refetch_chunks: [], reject_senders: [] };
}

export const ResponseApplySnapshotChunk = {
  encode(
    message: ResponseApplySnapshotChunk,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    writer.uint32(18).fork();
    for (const v of message.refetch_chunks) {
      writer.uint32(v);
    }
    writer.ldelim();
    for (const v of message.reject_senders) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ResponseApplySnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseApplySnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32() as any;
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.refetch_chunks.push(reader.uint32());
            }
          } else {
            message.refetch_chunks.push(reader.uint32());
          }
          break;
        case 3:
          message.reject_senders.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseApplySnapshotChunk {
    return {
      result: isSet(object.result)
        ? responseApplySnapshotChunk_ResultFromJSON(object.result)
        : 0,
      refetch_chunks: Array.isArray(object?.refetch_chunks)
        ? object.refetch_chunks.map((e: any) => Number(e))
        : [],
      reject_senders: Array.isArray(object?.reject_senders)
        ? object.reject_senders.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ResponseApplySnapshotChunk): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = responseApplySnapshotChunk_ResultToJSON(message.result));
    if (message.refetch_chunks) {
      obj.refetch_chunks = message.refetch_chunks.map((e) => Math.round(e));
    } else {
      obj.refetch_chunks = [];
    }
    if (message.reject_senders) {
      obj.reject_senders = message.reject_senders.map((e) => e);
    } else {
      obj.reject_senders = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ResponseApplySnapshotChunk>,
  ): ResponseApplySnapshotChunk {
    const message = createBaseResponseApplySnapshotChunk();
    message.result = object.result ?? 0;
    message.refetch_chunks = object.refetch_chunks?.map((e) => e) || [];
    message.reject_senders = object.reject_senders?.map((e) => e) || [];
    return message;
  },
};

function createBaseResponsePrepareProposal(): ResponsePrepareProposal {
  return { txs: [] };
}

export const ResponsePrepareProposal = {
  encode(
    message: ResponsePrepareProposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ResponsePrepareProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponsePrepareProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponsePrepareProposal {
    return {
      txs: Array.isArray(object?.txs)
        ? object.txs.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: ResponsePrepareProposal): unknown {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.txs = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ResponsePrepareProposal>,
  ): ResponsePrepareProposal {
    const message = createBaseResponsePrepareProposal();
    message.txs = object.txs?.map((e) => e) || [];
    return message;
  },
};

function createBaseResponseProcessProposal(): ResponseProcessProposal {
  return { status: 0 };
}

export const ResponseProcessProposal = {
  encode(
    message: ResponseProcessProposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ResponseProcessProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseProcessProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseProcessProposal {
    return {
      status: isSet(object.status)
        ? responseProcessProposal_ProposalStatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: ResponseProcessProposal): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = responseProcessProposal_ProposalStatusToJSON(
        message.status,
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<ResponseProcessProposal>,
  ): ResponseProcessProposal {
    const message = createBaseResponseProcessProposal();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseResponseExtendVote(): ResponseExtendVote {
  return { vote_extension: new Uint8Array() };
}

export const ResponseExtendVote = {
  encode(
    message: ResponseExtendVote,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.vote_extension.length !== 0) {
      writer.uint32(10).bytes(message.vote_extension);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseExtendVote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseExtendVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vote_extension = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseExtendVote {
    return {
      vote_extension: isSet(object.vote_extension)
        ? bytesFromBase64(object.vote_extension)
        : new Uint8Array(),
    };
  },

  toJSON(message: ResponseExtendVote): unknown {
    const obj: any = {};
    message.vote_extension !== undefined &&
      (obj.vote_extension = base64FromBytes(
        message.vote_extension !== undefined
          ? message.vote_extension
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<ResponseExtendVote>): ResponseExtendVote {
    const message = createBaseResponseExtendVote();
    message.vote_extension = object.vote_extension ?? new Uint8Array();
    return message;
  },
};

function createBaseResponseVerifyVoteExtension(): ResponseVerifyVoteExtension {
  return { status: 0 };
}

export const ResponseVerifyVoteExtension = {
  encode(
    message: ResponseVerifyVoteExtension,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ResponseVerifyVoteExtension {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseVerifyVoteExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseVerifyVoteExtension {
    return {
      status: isSet(object.status)
        ? responseVerifyVoteExtension_VerifyStatusFromJSON(object.status)
        : 0,
    };
  },

  toJSON(message: ResponseVerifyVoteExtension): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = responseVerifyVoteExtension_VerifyStatusToJSON(
        message.status,
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<ResponseVerifyVoteExtension>,
  ): ResponseVerifyVoteExtension {
    const message = createBaseResponseVerifyVoteExtension();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseResponseFinalizeBlock(): ResponseFinalizeBlock {
  return {
    events: [],
    tx_results: [],
    validator_updates: [],
    consensus_param_updates: undefined,
    app_hash: new Uint8Array(),
  };
}

export const ResponseFinalizeBlock = {
  encode(
    message: ResponseFinalizeBlock,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tx_results) {
      ExecTxResult.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.validator_updates) {
      ValidatorUpdate.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.consensus_param_updates !== undefined) {
      ConsensusParams.encode(
        message.consensus_param_updates,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(42).bytes(message.app_hash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ResponseFinalizeBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseFinalizeBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        case 2:
          message.tx_results.push(ExecTxResult.decode(reader, reader.uint32()));
          break;
        case 3:
          message.validator_updates.push(
            ValidatorUpdate.decode(reader, reader.uint32()),
          );
          break;
        case 4:
          message.consensus_param_updates = ConsensusParams.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 5:
          message.app_hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseFinalizeBlock {
    return {
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => Event.fromJSON(e))
        : [],
      tx_results: Array.isArray(object?.tx_results)
        ? object.tx_results.map((e: any) => ExecTxResult.fromJSON(e))
        : [],
      validator_updates: Array.isArray(object?.validator_updates)
        ? object.validator_updates.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      consensus_param_updates: isSet(object.consensus_param_updates)
        ? ConsensusParams.fromJSON(object.consensus_param_updates)
        : undefined,
      app_hash: isSet(object.app_hash)
        ? bytesFromBase64(object.app_hash)
        : new Uint8Array(),
    };
  },

  toJSON(message: ResponseFinalizeBlock): unknown {
    const obj: any = {};
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    if (message.tx_results) {
      obj.tx_results = message.tx_results.map((e) =>
        e ? ExecTxResult.toJSON(e) : undefined,
      );
    } else {
      obj.tx_results = [];
    }
    if (message.validator_updates) {
      obj.validator_updates = message.validator_updates.map((e) =>
        e ? ValidatorUpdate.toJSON(e) : undefined,
      );
    } else {
      obj.validator_updates = [];
    }
    message.consensus_param_updates !== undefined &&
      (obj.consensus_param_updates = message.consensus_param_updates
        ? ConsensusParams.toJSON(message.consensus_param_updates)
        : undefined);
    message.app_hash !== undefined &&
      (obj.app_hash = base64FromBytes(
        message.app_hash !== undefined ? message.app_hash : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<ResponseFinalizeBlock>,
  ): ResponseFinalizeBlock {
    const message = createBaseResponseFinalizeBlock();
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.tx_results =
      object.tx_results?.map((e) => ExecTxResult.fromPartial(e)) || [];
    message.validator_updates =
      object.validator_updates?.map((e) => ValidatorUpdate.fromPartial(e)) ||
      [];
    message.consensus_param_updates =
      object.consensus_param_updates !== undefined &&
      object.consensus_param_updates !== null
        ? ConsensusParams.fromPartial(object.consensus_param_updates)
        : undefined;
    message.app_hash = object.app_hash ?? new Uint8Array();
    return message;
  },
};

function createBaseCommitInfo(): CommitInfo {
  return { round: 0, votes: [] };
}

export const CommitInfo = {
  encode(
    message: CommitInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.round !== 0) {
      writer.uint32(8).int32(message.round);
    }
    for (const v of message.votes) {
      VoteInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.round = reader.int32();
          break;
        case 2:
          message.votes.push(VoteInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommitInfo {
    return {
      round: isSet(object.round) ? Number(object.round) : 0,
      votes: Array.isArray(object?.votes)
        ? object.votes.map((e: any) => VoteInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CommitInfo): unknown {
    const obj: any = {};
    message.round !== undefined && (obj.round = Math.round(message.round));
    if (message.votes) {
      obj.votes = message.votes.map((e) =>
        e ? VoteInfo.toJSON(e) : undefined,
      );
    } else {
      obj.votes = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<CommitInfo>): CommitInfo {
    const message = createBaseCommitInfo();
    message.round = object.round ?? 0;
    message.votes = object.votes?.map((e) => VoteInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseExtendedCommitInfo(): ExtendedCommitInfo {
  return { round: 0, votes: [] };
}

export const ExtendedCommitInfo = {
  encode(
    message: ExtendedCommitInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.round !== 0) {
      writer.uint32(8).int32(message.round);
    }
    for (const v of message.votes) {
      ExtendedVoteInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtendedCommitInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtendedCommitInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.round = reader.int32();
          break;
        case 2:
          message.votes.push(ExtendedVoteInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ExtendedCommitInfo {
    return {
      round: isSet(object.round) ? Number(object.round) : 0,
      votes: Array.isArray(object?.votes)
        ? object.votes.map((e: any) => ExtendedVoteInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ExtendedCommitInfo): unknown {
    const obj: any = {};
    message.round !== undefined && (obj.round = Math.round(message.round));
    if (message.votes) {
      obj.votes = message.votes.map((e) =>
        e ? ExtendedVoteInfo.toJSON(e) : undefined,
      );
    } else {
      obj.votes = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ExtendedCommitInfo>): ExtendedCommitInfo {
    const message = createBaseExtendedCommitInfo();
    message.round = object.round ?? 0;
    message.votes =
      object.votes?.map((e) => ExtendedVoteInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEvent(): Event {
  return { type: "", attributes: [] };
}

export const Event = {
  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    for (const v of message.attributes) {
      EventAttribute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.attributes.push(
            EventAttribute.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      attributes: Array.isArray(object?.attributes)
        ? object.attributes.map((e: any) => EventAttribute.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    if (message.attributes) {
      obj.attributes = message.attributes.map((e) =>
        e ? EventAttribute.toJSON(e) : undefined,
      );
    } else {
      obj.attributes = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Event>): Event {
    const message = createBaseEvent();
    message.type = object.type ?? "";
    message.attributes =
      object.attributes?.map((e) => EventAttribute.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEventAttribute(): EventAttribute {
  return { key: "", value: "", index: false };
}

export const EventAttribute = {
  encode(
    message: EventAttribute,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    if (message.index === true) {
      writer.uint32(24).bool(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventAttribute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        case 3:
          message.index = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventAttribute {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
      index: isSet(object.index) ? Boolean(object.index) : false,
    };
  },

  toJSON(message: EventAttribute): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial(object: DeepPartial<EventAttribute>): EventAttribute {
    const message = createBaseEventAttribute();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    message.index = object.index ?? false;
    return message;
  },
};

function createBaseExecTxResult(): ExecTxResult {
  return {
    code: 0,
    data: new Uint8Array(),
    log: "",
    info: "",
    gas_wanted: "0",
    gas_used: "0",
    events: [],
    codespace: "",
  };
}

export const ExecTxResult = {
  encode(
    message: ExecTxResult,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.gas_wanted !== "0") {
      writer.uint32(40).int64(message.gas_wanted);
    }
    if (message.gas_used !== "0") {
      writer.uint32(48).int64(message.gas_used);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.codespace !== "") {
      writer.uint32(66).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecTxResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecTxResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.uint32();
          break;
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.log = reader.string();
          break;
        case 4:
          message.info = reader.string();
          break;
        case 5:
          message.gas_wanted = longToString(reader.int64() as Long);
          break;
        case 6:
          message.gas_used = longToString(reader.int64() as Long);
          break;
        case 7:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        case 8:
          message.codespace = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ExecTxResult {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      log: isSet(object.log) ? String(object.log) : "",
      info: isSet(object.info) ? String(object.info) : "",
      gas_wanted: isSet(object.gas_wanted) ? String(object.gas_wanted) : "0",
      gas_used: isSet(object.gas_used) ? String(object.gas_used) : "0",
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => Event.fromJSON(e))
        : [],
      codespace: isSet(object.codespace) ? String(object.codespace) : "",
    };
  },

  toJSON(message: ExecTxResult): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    message.log !== undefined && (obj.log = message.log);
    message.info !== undefined && (obj.info = message.info);
    message.gas_wanted !== undefined && (obj.gas_wanted = message.gas_wanted);
    message.gas_used !== undefined && (obj.gas_used = message.gas_used);
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    message.codespace !== undefined && (obj.codespace = message.codespace);
    return obj;
  },

  fromPartial(object: DeepPartial<ExecTxResult>): ExecTxResult {
    const message = createBaseExecTxResult();
    message.code = object.code ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.gas_wanted = object.gas_wanted ?? "0";
    message.gas_used = object.gas_used ?? "0";
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.codespace = object.codespace ?? "";
    return message;
  },
};

function createBaseTxResult(): TxResult {
  return { height: "0", index: 0, tx: new Uint8Array(), result: undefined };
}

export const TxResult = {
  encode(
    message: TxResult,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.index !== 0) {
      writer.uint32(16).uint32(message.index);
    }
    if (message.tx.length !== 0) {
      writer.uint32(26).bytes(message.tx);
    }
    if (message.result !== undefined) {
      ExecTxResult.encode(message.result, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.index = reader.uint32();
          break;
        case 3:
          message.tx = reader.bytes();
          break;
        case 4:
          message.result = ExecTxResult.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxResult {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      index: isSet(object.index) ? Number(object.index) : 0,
      tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(),
      result: isSet(object.result)
        ? ExecTxResult.fromJSON(object.result)
        : undefined,
    };
  },

  toJSON(message: TxResult): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.index !== undefined && (obj.index = Math.round(message.index));
    message.tx !== undefined &&
      (obj.tx = base64FromBytes(
        message.tx !== undefined ? message.tx : new Uint8Array(),
      ));
    message.result !== undefined &&
      (obj.result = message.result
        ? ExecTxResult.toJSON(message.result)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<TxResult>): TxResult {
    const message = createBaseTxResult();
    message.height = object.height ?? "0";
    message.index = object.index ?? 0;
    message.tx = object.tx ?? new Uint8Array();
    message.result =
      object.result !== undefined && object.result !== null
        ? ExecTxResult.fromPartial(object.result)
        : undefined;
    return message;
  },
};

function createBaseValidator(): Validator {
  return { address: new Uint8Array(), power: "0" };
}

export const Validator = {
  encode(
    message: Validator,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    if (message.power !== "0") {
      writer.uint32(24).int64(message.power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        case 3:
          message.power = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Validator {
    return {
      address: isSet(object.address)
        ? bytesFromBase64(object.address)
        : new Uint8Array(),
      power: isSet(object.power) ? String(object.power) : "0",
    };
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    message.address !== undefined &&
      (obj.address = base64FromBytes(
        message.address !== undefined ? message.address : new Uint8Array(),
      ));
    message.power !== undefined && (obj.power = message.power);
    return obj;
  },

  fromPartial(object: DeepPartial<Validator>): Validator {
    const message = createBaseValidator();
    message.address = object.address ?? new Uint8Array();
    message.power = object.power ?? "0";
    return message;
  },
};

function createBaseValidatorUpdate(): ValidatorUpdate {
  return { pub_key: undefined, power: "0" };
}

export const ValidatorUpdate = {
  encode(
    message: ValidatorUpdate,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pub_key !== undefined) {
      PublicKey.encode(message.pub_key, writer.uint32(10).fork()).ldelim();
    }
    if (message.power !== "0") {
      writer.uint32(16).int64(message.power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pub_key = PublicKey.decode(reader, reader.uint32());
          break;
        case 2:
          message.power = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorUpdate {
    return {
      pub_key: isSet(object.pub_key)
        ? PublicKey.fromJSON(object.pub_key)
        : undefined,
      power: isSet(object.power) ? String(object.power) : "0",
    };
  },

  toJSON(message: ValidatorUpdate): unknown {
    const obj: any = {};
    message.pub_key !== undefined &&
      (obj.pub_key = message.pub_key
        ? PublicKey.toJSON(message.pub_key)
        : undefined);
    message.power !== undefined && (obj.power = message.power);
    return obj;
  },

  fromPartial(object: DeepPartial<ValidatorUpdate>): ValidatorUpdate {
    const message = createBaseValidatorUpdate();
    message.pub_key =
      object.pub_key !== undefined && object.pub_key !== null
        ? PublicKey.fromPartial(object.pub_key)
        : undefined;
    message.power = object.power ?? "0";
    return message;
  },
};

function createBaseVoteInfo(): VoteInfo {
  return { validator: undefined, block_id_flag: 0 };
}

export const VoteInfo = {
  encode(
    message: VoteInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    if (message.block_id_flag !== 0) {
      writer.uint32(24).int32(message.block_id_flag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoteInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoteInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = Validator.decode(reader, reader.uint32());
          break;
        case 3:
          message.block_id_flag = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoteInfo {
    return {
      validator: isSet(object.validator)
        ? Validator.fromJSON(object.validator)
        : undefined,
      block_id_flag: isSet(object.block_id_flag)
        ? blockIDFlagFromJSON(object.block_id_flag)
        : 0,
    };
  },

  toJSON(message: VoteInfo): unknown {
    const obj: any = {};
    message.validator !== undefined &&
      (obj.validator = message.validator
        ? Validator.toJSON(message.validator)
        : undefined);
    message.block_id_flag !== undefined &&
      (obj.block_id_flag = blockIDFlagToJSON(message.block_id_flag));
    return obj;
  },

  fromPartial(object: DeepPartial<VoteInfo>): VoteInfo {
    const message = createBaseVoteInfo();
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromPartial(object.validator)
        : undefined;
    message.block_id_flag = object.block_id_flag ?? 0;
    return message;
  },
};

function createBaseExtendedVoteInfo(): ExtendedVoteInfo {
  return {
    validator: undefined,
    vote_extension: new Uint8Array(),
    extension_signature: new Uint8Array(),
    block_id_flag: 0,
  };
}

export const ExtendedVoteInfo = {
  encode(
    message: ExtendedVoteInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    if (message.vote_extension.length !== 0) {
      writer.uint32(26).bytes(message.vote_extension);
    }
    if (message.extension_signature.length !== 0) {
      writer.uint32(34).bytes(message.extension_signature);
    }
    if (message.block_id_flag !== 0) {
      writer.uint32(40).int32(message.block_id_flag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtendedVoteInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtendedVoteInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = Validator.decode(reader, reader.uint32());
          break;
        case 3:
          message.vote_extension = reader.bytes();
          break;
        case 4:
          message.extension_signature = reader.bytes();
          break;
        case 5:
          message.block_id_flag = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ExtendedVoteInfo {
    return {
      validator: isSet(object.validator)
        ? Validator.fromJSON(object.validator)
        : undefined,
      vote_extension: isSet(object.vote_extension)
        ? bytesFromBase64(object.vote_extension)
        : new Uint8Array(),
      extension_signature: isSet(object.extension_signature)
        ? bytesFromBase64(object.extension_signature)
        : new Uint8Array(),
      block_id_flag: isSet(object.block_id_flag)
        ? blockIDFlagFromJSON(object.block_id_flag)
        : 0,
    };
  },

  toJSON(message: ExtendedVoteInfo): unknown {
    const obj: any = {};
    message.validator !== undefined &&
      (obj.validator = message.validator
        ? Validator.toJSON(message.validator)
        : undefined);
    message.vote_extension !== undefined &&
      (obj.vote_extension = base64FromBytes(
        message.vote_extension !== undefined
          ? message.vote_extension
          : new Uint8Array(),
      ));
    message.extension_signature !== undefined &&
      (obj.extension_signature = base64FromBytes(
        message.extension_signature !== undefined
          ? message.extension_signature
          : new Uint8Array(),
      ));
    message.block_id_flag !== undefined &&
      (obj.block_id_flag = blockIDFlagToJSON(message.block_id_flag));
    return obj;
  },

  fromPartial(object: DeepPartial<ExtendedVoteInfo>): ExtendedVoteInfo {
    const message = createBaseExtendedVoteInfo();
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromPartial(object.validator)
        : undefined;
    message.vote_extension = object.vote_extension ?? new Uint8Array();
    message.extension_signature =
      object.extension_signature ?? new Uint8Array();
    message.block_id_flag = object.block_id_flag ?? 0;
    return message;
  },
};

function createBaseMisbehavior(): Misbehavior {
  return {
    type: 0,
    validator: undefined,
    height: "0",
    time: undefined,
    total_voting_power: "0",
  };
}

export const Misbehavior = {
  encode(
    message: Misbehavior,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== "0") {
      writer.uint32(24).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(message.time, writer.uint32(34).fork()).ldelim();
    }
    if (message.total_voting_power !== "0") {
      writer.uint32(40).int64(message.total_voting_power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Misbehavior {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMisbehavior();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.validator = Validator.decode(reader, reader.uint32());
          break;
        case 3:
          message.height = longToString(reader.int64() as Long);
          break;
        case 4:
          message.time = Timestamp.decode(reader, reader.uint32());
          break;
        case 5:
          message.total_voting_power = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Misbehavior {
    return {
      type: isSet(object.type) ? misbehaviorTypeFromJSON(object.type) : 0,
      validator: isSet(object.validator)
        ? Validator.fromJSON(object.validator)
        : undefined,
      height: isSet(object.height) ? String(object.height) : "0",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      total_voting_power: isSet(object.total_voting_power)
        ? String(object.total_voting_power)
        : "0",
    };
  },

  toJSON(message: Misbehavior): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = misbehaviorTypeToJSON(message.type));
    message.validator !== undefined &&
      (obj.validator = message.validator
        ? Validator.toJSON(message.validator)
        : undefined);
    message.height !== undefined && (obj.height = message.height);
    message.time !== undefined &&
      (obj.time = fromTimestamp(message.time).toISOString());
    message.total_voting_power !== undefined &&
      (obj.total_voting_power = message.total_voting_power);
    return obj;
  },

  fromPartial(object: DeepPartial<Misbehavior>): Misbehavior {
    const message = createBaseMisbehavior();
    message.type = object.type ?? 0;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromPartial(object.validator)
        : undefined;
    message.height = object.height ?? "0";
    message.time =
      object.time !== undefined && object.time !== null
        ? Timestamp.fromPartial(object.time)
        : undefined;
    message.total_voting_power = object.total_voting_power ?? "0";
    return message;
  },
};

function createBaseSnapshot(): Snapshot {
  return {
    height: "0",
    format: 0,
    chunks: 0,
    hash: new Uint8Array(),
    metadata: new Uint8Array(),
  };
}

export const Snapshot = {
  encode(
    message: Snapshot,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.chunks !== 0) {
      writer.uint32(24).uint32(message.chunks);
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(42).bytes(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Snapshot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.format = reader.uint32();
          break;
        case 3:
          message.chunks = reader.uint32();
          break;
        case 4:
          message.hash = reader.bytes();
          break;
        case 5:
          message.metadata = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Snapshot {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      format: isSet(object.format) ? Number(object.format) : 0,
      chunks: isSet(object.chunks) ? Number(object.chunks) : 0,
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
      metadata: isSet(object.metadata)
        ? bytesFromBase64(object.metadata)
        : new Uint8Array(),
    };
  },

  toJSON(message: Snapshot): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.format !== undefined && (obj.format = Math.round(message.format));
    message.chunks !== undefined && (obj.chunks = Math.round(message.chunks));
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array(),
      ));
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<Snapshot>): Snapshot {
    const message = createBaseSnapshot();
    message.height = object.height ?? "0";
    message.format = object.format ?? 0;
    message.chunks = object.chunks ?? 0;
    message.hash = object.hash ?? new Uint8Array();
    message.metadata = object.metadata ?? new Uint8Array();
    return message;
  },
};

export interface ABCI {
  Echo(request: RequestEcho): Promise<ResponseEcho>;
  Flush(request: RequestFlush): Promise<ResponseFlush>;
  Info(request: RequestInfo): Promise<ResponseInfo>;
  CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx>;
  Query(request: RequestQuery): Promise<ResponseQuery>;
  Commit(request: RequestCommit): Promise<ResponseCommit>;
  InitChain(request: RequestInitChain): Promise<ResponseInitChain>;
  ListSnapshots(request: RequestListSnapshots): Promise<ResponseListSnapshots>;
  OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot>;
  LoadSnapshotChunk(
    request: RequestLoadSnapshotChunk,
  ): Promise<ResponseLoadSnapshotChunk>;
  ApplySnapshotChunk(
    request: RequestApplySnapshotChunk,
  ): Promise<ResponseApplySnapshotChunk>;
  PrepareProposal(
    request: RequestPrepareProposal,
  ): Promise<ResponsePrepareProposal>;
  ProcessProposal(
    request: RequestProcessProposal,
  ): Promise<ResponseProcessProposal>;
  ExtendVote(request: RequestExtendVote): Promise<ResponseExtendVote>;
  VerifyVoteExtension(
    request: RequestVerifyVoteExtension,
  ): Promise<ResponseVerifyVoteExtension>;
  FinalizeBlock(request: RequestFinalizeBlock): Promise<ResponseFinalizeBlock>;
}

export class ABCIClientImpl implements ABCI {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Echo = this.Echo.bind(this);
    this.Flush = this.Flush.bind(this);
    this.Info = this.Info.bind(this);
    this.CheckTx = this.CheckTx.bind(this);
    this.Query = this.Query.bind(this);
    this.Commit = this.Commit.bind(this);
    this.InitChain = this.InitChain.bind(this);
    this.ListSnapshots = this.ListSnapshots.bind(this);
    this.OfferSnapshot = this.OfferSnapshot.bind(this);
    this.LoadSnapshotChunk = this.LoadSnapshotChunk.bind(this);
    this.ApplySnapshotChunk = this.ApplySnapshotChunk.bind(this);
    this.PrepareProposal = this.PrepareProposal.bind(this);
    this.ProcessProposal = this.ProcessProposal.bind(this);
    this.ExtendVote = this.ExtendVote.bind(this);
    this.VerifyVoteExtension = this.VerifyVoteExtension.bind(this);
    this.FinalizeBlock = this.FinalizeBlock.bind(this);
  }
  Echo(request: RequestEcho): Promise<ResponseEcho> {
    const data = RequestEcho.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCI", "Echo", data);
    return promise.then((data) => ResponseEcho.decode(new _m0.Reader(data)));
  }

  Flush(request: RequestFlush): Promise<ResponseFlush> {
    const data = RequestFlush.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCI", "Flush", data);
    return promise.then((data) => ResponseFlush.decode(new _m0.Reader(data)));
  }

  Info(request: RequestInfo): Promise<ResponseInfo> {
    const data = RequestInfo.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCI", "Info", data);
    return promise.then((data) => ResponseInfo.decode(new _m0.Reader(data)));
  }

  CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx> {
    const data = RequestCheckTx.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCI", "CheckTx", data);
    return promise.then((data) => ResponseCheckTx.decode(new _m0.Reader(data)));
  }

  Query(request: RequestQuery): Promise<ResponseQuery> {
    const data = RequestQuery.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCI", "Query", data);
    return promise.then((data) => ResponseQuery.decode(new _m0.Reader(data)));
  }

  Commit(request: RequestCommit): Promise<ResponseCommit> {
    const data = RequestCommit.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCI", "Commit", data);
    return promise.then((data) => ResponseCommit.decode(new _m0.Reader(data)));
  }

  InitChain(request: RequestInitChain): Promise<ResponseInitChain> {
    const data = RequestInitChain.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCI", "InitChain", data);
    return promise.then((data) =>
      ResponseInitChain.decode(new _m0.Reader(data)),
    );
  }

  ListSnapshots(request: RequestListSnapshots): Promise<ResponseListSnapshots> {
    const data = RequestListSnapshots.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCI",
      "ListSnapshots",
      data,
    );
    return promise.then((data) =>
      ResponseListSnapshots.decode(new _m0.Reader(data)),
    );
  }

  OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot> {
    const data = RequestOfferSnapshot.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCI",
      "OfferSnapshot",
      data,
    );
    return promise.then((data) =>
      ResponseOfferSnapshot.decode(new _m0.Reader(data)),
    );
  }

  LoadSnapshotChunk(
    request: RequestLoadSnapshotChunk,
  ): Promise<ResponseLoadSnapshotChunk> {
    const data = RequestLoadSnapshotChunk.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCI",
      "LoadSnapshotChunk",
      data,
    );
    return promise.then((data) =>
      ResponseLoadSnapshotChunk.decode(new _m0.Reader(data)),
    );
  }

  ApplySnapshotChunk(
    request: RequestApplySnapshotChunk,
  ): Promise<ResponseApplySnapshotChunk> {
    const data = RequestApplySnapshotChunk.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCI",
      "ApplySnapshotChunk",
      data,
    );
    return promise.then((data) =>
      ResponseApplySnapshotChunk.decode(new _m0.Reader(data)),
    );
  }

  PrepareProposal(
    request: RequestPrepareProposal,
  ): Promise<ResponsePrepareProposal> {
    const data = RequestPrepareProposal.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCI",
      "PrepareProposal",
      data,
    );
    return promise.then((data) =>
      ResponsePrepareProposal.decode(new _m0.Reader(data)),
    );
  }

  ProcessProposal(
    request: RequestProcessProposal,
  ): Promise<ResponseProcessProposal> {
    const data = RequestProcessProposal.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCI",
      "ProcessProposal",
      data,
    );
    return promise.then((data) =>
      ResponseProcessProposal.decode(new _m0.Reader(data)),
    );
  }

  ExtendVote(request: RequestExtendVote): Promise<ResponseExtendVote> {
    const data = RequestExtendVote.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCI",
      "ExtendVote",
      data,
    );
    return promise.then((data) =>
      ResponseExtendVote.decode(new _m0.Reader(data)),
    );
  }

  VerifyVoteExtension(
    request: RequestVerifyVoteExtension,
  ): Promise<ResponseVerifyVoteExtension> {
    const data = RequestVerifyVoteExtension.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCI",
      "VerifyVoteExtension",
      data,
    );
    return promise.then((data) =>
      ResponseVerifyVoteExtension.decode(new _m0.Reader(data)),
    );
  }

  FinalizeBlock(request: RequestFinalizeBlock): Promise<ResponseFinalizeBlock> {
    const data = RequestFinalizeBlock.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCI",
      "FinalizeBlock",
      data,
    );
    return promise.then((data) =>
      ResponseFinalizeBlock.decode(new _m0.Reader(data)),
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000).toString();
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = Number(t.seconds) * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Timestamp {
  if (o instanceof Date) {
    return toTimestamp(o);
  } else if (typeof o === "string") {
    return toTimestamp(new Date(o));
  } else {
    return Timestamp.fromJSON(o);
  }
}

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
