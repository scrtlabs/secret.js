/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
import * as TendermintP2pTypes from "../../../../tendermint/p2p/types.pb"
import * as TendermintTypesBlock from "../../../../tendermint/types/block.pb"
import * as TendermintTypesTypes from "../../../../tendermint/types/types.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../query/v1beta1/pagination.pb"
import * as CosmosBaseTendermintV1beta1Types from "./types.pb"
export type GetValidatorSetByHeightRequest = {
  height?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type GetValidatorSetByHeightResponse = {
  block_height?: string
  validators?: Validator[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type GetLatestValidatorSetRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type GetLatestValidatorSetResponse = {
  block_height?: string
  validators?: Validator[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type Validator = {
  address?: string
  pub_key?: GoogleProtobufAny.Any
  voting_power?: string
  proposer_priority?: string
}

export type GetBlockByHeightRequest = {
  height?: string
}

export type GetBlockByHeightResponse = {
  block_id?: TendermintTypesTypes.BlockID
  block?: TendermintTypesBlock.Block
  sdk_block?: CosmosBaseTendermintV1beta1Types.Block
}

export type GetLatestBlockRequest = {
}

export type GetLatestBlockResponse = {
  block_id?: TendermintTypesTypes.BlockID
  block?: TendermintTypesBlock.Block
  sdk_block?: CosmosBaseTendermintV1beta1Types.Block
}

export type GetSyncingRequest = {
}

export type GetSyncingResponse = {
  syncing?: boolean
}

export type GetNodeInfoRequest = {
}

export type GetNodeInfoResponse = {
  default_node_info?: TendermintP2pTypes.DefaultNodeInfo
  application_version?: VersionInfo
}

export type VersionInfo = {
  name?: string
  app_name?: string
  version?: string
  git_commit?: string
  build_tags?: string
  go_version?: string
  build_deps?: Module[]
  cosmos_sdk_version?: string
}

export type Module = {
  path?: string
  version?: string
  sum?: string
}

export type ABCIQueryRequest = {
  data?: Uint8Array
  path?: string
  height?: string
  prove?: boolean
}

export type ABCIQueryResponse = {
  code?: number
  log?: string
  info?: string
  index?: string
  key?: Uint8Array
  value?: Uint8Array
  proof_ops?: ProofOps
  height?: string
  codespace?: string
}

export type ProofOp = {
  type?: string
  key?: Uint8Array
  data?: Uint8Array
}

export type ProofOps = {
  ops?: ProofOp[]
}

export class Service {
  static GetNodeInfo(req: GetNodeInfoRequest, initReq?: fm.InitReq): Promise<GetNodeInfoResponse> {
    return fm.fetchReq<GetNodeInfoRequest, GetNodeInfoResponse>(`/cosmos/base/tendermint/v1beta1/node_info?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetSyncing(req: GetSyncingRequest, initReq?: fm.InitReq): Promise<GetSyncingResponse> {
    return fm.fetchReq<GetSyncingRequest, GetSyncingResponse>(`/cosmos/base/tendermint/v1beta1/syncing?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetLatestBlock(req: GetLatestBlockRequest, initReq?: fm.InitReq): Promise<GetLatestBlockResponse> {
    return fm.fetchReq<GetLatestBlockRequest, GetLatestBlockResponse>(`/cosmos/base/tendermint/v1beta1/blocks/latest?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetBlockByHeight(req: GetBlockByHeightRequest, initReq?: fm.InitReq): Promise<GetBlockByHeightResponse> {
    return fm.fetchReq<GetBlockByHeightRequest, GetBlockByHeightResponse>(`/cosmos/base/tendermint/v1beta1/blocks/${req["height"]}?${fm.renderURLSearchParams(req, ["height"])}`, {...initReq, method: "GET"})
  }
  static GetLatestValidatorSet(req: GetLatestValidatorSetRequest, initReq?: fm.InitReq): Promise<GetLatestValidatorSetResponse> {
    return fm.fetchReq<GetLatestValidatorSetRequest, GetLatestValidatorSetResponse>(`/cosmos/base/tendermint/v1beta1/validatorsets/latest?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetValidatorSetByHeight(req: GetValidatorSetByHeightRequest, initReq?: fm.InitReq): Promise<GetValidatorSetByHeightResponse> {
    return fm.fetchReq<GetValidatorSetByHeightRequest, GetValidatorSetByHeightResponse>(`/cosmos/base/tendermint/v1beta1/validatorsets/${req["height"]}?${fm.renderURLSearchParams(req, ["height"])}`, {...initReq, method: "GET"})
  }
  static ABCIQuery(req: ABCIQueryRequest, initReq?: fm.InitReq): Promise<ABCIQueryResponse> {
    return fm.fetchReq<ABCIQueryRequest, ABCIQueryResponse>(`/cosmos/base/tendermint/v1beta1/abci_query?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}