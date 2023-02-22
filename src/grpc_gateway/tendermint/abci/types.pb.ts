/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../fetch.pb"
import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb"
import * as TendermintCryptoKeys from "../crypto/keys.pb"
import * as TendermintCryptoProof from "../crypto/proof.pb"
import * as TendermintTypesParams from "../types/params.pb"
import * as TendermintTypesTypes from "../types/types.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum CheckTxType {
  NEW = "NEW",
  RECHECK = "RECHECK",
}

export enum EvidenceType {
  UNKNOWN = "UNKNOWN",
  DUPLICATE_VOTE = "DUPLICATE_VOTE",
  LIGHT_CLIENT_ATTACK = "LIGHT_CLIENT_ATTACK",
}

export enum ResponseOfferSnapshotResult {
  UNKNOWN = "UNKNOWN",
  ACCEPT = "ACCEPT",
  ABORT = "ABORT",
  REJECT = "REJECT",
  REJECT_FORMAT = "REJECT_FORMAT",
  REJECT_SENDER = "REJECT_SENDER",
}

export enum ResponseApplySnapshotChunkResult {
  UNKNOWN = "UNKNOWN",
  ACCEPT = "ACCEPT",
  ABORT = "ABORT",
  RETRY = "RETRY",
  RETRY_SNAPSHOT = "RETRY_SNAPSHOT",
  REJECT_SNAPSHOT = "REJECT_SNAPSHOT",
}


type BaseRequest = {
}

export type Request = BaseRequest
  & OneOf<{ echo: RequestEcho; flush: RequestFlush; info: RequestInfo; set_option: RequestSetOption; init_chain: RequestInitChain; query: RequestQuery; begin_block: RequestBeginBlock; check_tx: RequestCheckTx; deliver_tx: RequestDeliverTx; end_block: RequestEndBlock; commit: RequestCommit; list_snapshots: RequestListSnapshots; offer_snapshot: RequestOfferSnapshot; load_snapshot_chunk: RequestLoadSnapshotChunk; apply_snapshot_chunk: RequestApplySnapshotChunk }>

export type RequestEcho = {
  message?: string
}

export type RequestFlush = {
}

export type RequestInfo = {
  version?: string
  block_version?: string
  p2p_version?: string
}

export type RequestSetOption = {
  key?: string
  value?: string
}

export type RequestInitChain = {
  time?: GoogleProtobufTimestamp.Timestamp
  chain_id?: string
  consensus_params?: ConsensusParams
  validators?: ValidatorUpdate[]
  app_state_bytes?: Uint8Array
  initial_height?: string
}

export type RequestQuery = {
  data?: Uint8Array
  path?: string
  height?: string
  prove?: boolean
}

export type RequestBeginBlock = {
  hash?: Uint8Array
  header?: TendermintTypesTypes.Header
  last_commit_info?: LastCommitInfo
  byzantine_validators?: Evidence[]
  commit?: TendermintTypesTypes.Commit
  txs?: Uint8Array[]
}

export type RequestCheckTx = {
  tx?: Uint8Array
  type?: CheckTxType
}

export type RequestDeliverTx = {
  tx?: Uint8Array
}

export type RequestEndBlock = {
  height?: string
}

export type RequestCommit = {
}

export type RequestListSnapshots = {
}

export type RequestOfferSnapshot = {
  snapshot?: Snapshot
  app_hash?: Uint8Array
}

export type RequestLoadSnapshotChunk = {
  height?: string
  format?: number
  chunk?: number
}

export type RequestApplySnapshotChunk = {
  index?: number
  chunk?: Uint8Array
  sender?: string
}


type BaseResponse = {
}

export type Response = BaseResponse
  & OneOf<{ exception: ResponseException; echo: ResponseEcho; flush: ResponseFlush; info: ResponseInfo; set_option: ResponseSetOption; init_chain: ResponseInitChain; query: ResponseQuery; begin_block: ResponseBeginBlock; check_tx: ResponseCheckTx; deliver_tx: ResponseDeliverTx; end_block: ResponseEndBlock; commit: ResponseCommit; list_snapshots: ResponseListSnapshots; offer_snapshot: ResponseOfferSnapshot; load_snapshot_chunk: ResponseLoadSnapshotChunk; apply_snapshot_chunk: ResponseApplySnapshotChunk }>

export type ResponseException = {
  error?: string
}

export type ResponseEcho = {
  message?: string
}

export type ResponseFlush = {
}

export type ResponseInfo = {
  data?: string
  version?: string
  app_version?: string
  last_block_height?: string
  last_block_app_hash?: Uint8Array
}

export type ResponseSetOption = {
  code?: number
  log?: string
  info?: string
}

export type ResponseInitChain = {
  consensus_params?: ConsensusParams
  validators?: ValidatorUpdate[]
  app_hash?: Uint8Array
}

export type ResponseQuery = {
  code?: number
  log?: string
  info?: string
  index?: string
  key?: Uint8Array
  value?: Uint8Array
  proof_ops?: TendermintCryptoProof.ProofOps
  height?: string
  codespace?: string
}

export type ResponseBeginBlock = {
  events?: Event[]
}

export type ResponseCheckTx = {
  code?: number
  data?: Uint8Array
  log?: string
  info?: string
  gas_wanted?: string
  gas_used?: string
  events?: Event[]
  codespace?: string
  sender?: string
  priority?: string
  mempool_error?: string
}

export type ResponseDeliverTx = {
  code?: number
  data?: Uint8Array
  log?: string
  info?: string
  gas_wanted?: string
  gas_used?: string
  events?: Event[]
  codespace?: string
}

export type ResponseEndBlock = {
  validator_updates?: ValidatorUpdate[]
  consensus_param_updates?: ConsensusParams
  events?: Event[]
}

export type ResponseCommit = {
  data?: Uint8Array
  retain_height?: string
}

export type ResponseListSnapshots = {
  snapshots?: Snapshot[]
}

export type ResponseOfferSnapshot = {
  result?: ResponseOfferSnapshotResult
}

export type ResponseLoadSnapshotChunk = {
  chunk?: Uint8Array
}

export type ResponseApplySnapshotChunk = {
  result?: ResponseApplySnapshotChunkResult
  refetch_chunks?: number[]
  reject_senders?: string[]
}

export type ConsensusParams = {
  block?: BlockParams
  evidence?: TendermintTypesParams.EvidenceParams
  validator?: TendermintTypesParams.ValidatorParams
  version?: TendermintTypesParams.VersionParams
}

export type BlockParams = {
  max_bytes?: string
  max_gas?: string
}

export type LastCommitInfo = {
  round?: number
  votes?: VoteInfo[]
}

export type Event = {
  type?: string
  attributes?: EventAttribute[]
}

export type EventAttribute = {
  key?: Uint8Array
  value?: Uint8Array
  index?: boolean
}

export type TxResult = {
  height?: string
  index?: number
  tx?: Uint8Array
  result?: ResponseDeliverTx
}

export type Validator = {
  address?: Uint8Array
  power?: string
}

export type ValidatorUpdate = {
  pub_key?: TendermintCryptoKeys.PublicKey
  power?: string
}

export type VoteInfo = {
  validator?: Validator
  signed_last_block?: boolean
}

export type Evidence = {
  type?: EvidenceType
  validator?: Validator
  height?: string
  time?: GoogleProtobufTimestamp.Timestamp
  total_voting_power?: string
}

export type Snapshot = {
  height?: string
  format?: number
  chunks?: number
  hash?: Uint8Array
  metadata?: Uint8Array
}

export class ABCIApplication {
  static Echo(req: RequestEcho, initReq?: fm.InitReq): Promise<ResponseEcho> {
    return fm.fetchReq<RequestEcho, ResponseEcho>(`/tendermint.abci.ABCIApplication/Echo`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Flush(req: RequestFlush, initReq?: fm.InitReq): Promise<ResponseFlush> {
    return fm.fetchReq<RequestFlush, ResponseFlush>(`/tendermint.abci.ABCIApplication/Flush`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Info(req: RequestInfo, initReq?: fm.InitReq): Promise<ResponseInfo> {
    return fm.fetchReq<RequestInfo, ResponseInfo>(`/tendermint.abci.ABCIApplication/Info`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static SetOption(req: RequestSetOption, initReq?: fm.InitReq): Promise<ResponseSetOption> {
    return fm.fetchReq<RequestSetOption, ResponseSetOption>(`/tendermint.abci.ABCIApplication/SetOption`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static DeliverTx(req: RequestDeliverTx, initReq?: fm.InitReq): Promise<ResponseDeliverTx> {
    return fm.fetchReq<RequestDeliverTx, ResponseDeliverTx>(`/tendermint.abci.ABCIApplication/DeliverTx`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static CheckTx(req: RequestCheckTx, initReq?: fm.InitReq): Promise<ResponseCheckTx> {
    return fm.fetchReq<RequestCheckTx, ResponseCheckTx>(`/tendermint.abci.ABCIApplication/CheckTx`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Query(req: RequestQuery, initReq?: fm.InitReq): Promise<ResponseQuery> {
    return fm.fetchReq<RequestQuery, ResponseQuery>(`/tendermint.abci.ABCIApplication/Query`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Commit(req: RequestCommit, initReq?: fm.InitReq): Promise<ResponseCommit> {
    return fm.fetchReq<RequestCommit, ResponseCommit>(`/tendermint.abci.ABCIApplication/Commit`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static InitChain(req: RequestInitChain, initReq?: fm.InitReq): Promise<ResponseInitChain> {
    return fm.fetchReq<RequestInitChain, ResponseInitChain>(`/tendermint.abci.ABCIApplication/InitChain`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static BeginBlock(req: RequestBeginBlock, initReq?: fm.InitReq): Promise<ResponseBeginBlock> {
    return fm.fetchReq<RequestBeginBlock, ResponseBeginBlock>(`/tendermint.abci.ABCIApplication/BeginBlock`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static EndBlock(req: RequestEndBlock, initReq?: fm.InitReq): Promise<ResponseEndBlock> {
    return fm.fetchReq<RequestEndBlock, ResponseEndBlock>(`/tendermint.abci.ABCIApplication/EndBlock`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ListSnapshots(req: RequestListSnapshots, initReq?: fm.InitReq): Promise<ResponseListSnapshots> {
    return fm.fetchReq<RequestListSnapshots, ResponseListSnapshots>(`/tendermint.abci.ABCIApplication/ListSnapshots`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static OfferSnapshot(req: RequestOfferSnapshot, initReq?: fm.InitReq): Promise<ResponseOfferSnapshot> {
    return fm.fetchReq<RequestOfferSnapshot, ResponseOfferSnapshot>(`/tendermint.abci.ABCIApplication/OfferSnapshot`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static LoadSnapshotChunk(req: RequestLoadSnapshotChunk, initReq?: fm.InitReq): Promise<ResponseLoadSnapshotChunk> {
    return fm.fetchReq<RequestLoadSnapshotChunk, ResponseLoadSnapshotChunk>(`/tendermint.abci.ABCIApplication/LoadSnapshotChunk`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ApplySnapshotChunk(req: RequestApplySnapshotChunk, initReq?: fm.InitReq): Promise<ResponseApplySnapshotChunk> {
    return fm.fetchReq<RequestApplySnapshotChunk, ResponseApplySnapshotChunk>(`/tendermint.abci.ABCIApplication/ApplySnapshotChunk`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}