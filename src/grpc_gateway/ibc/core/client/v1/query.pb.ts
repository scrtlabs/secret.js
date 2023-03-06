/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseQueryV1beta1Pagination from "../../../../cosmos/base/query/v1beta1/pagination.pb"
import * as fm from "../../../../fetch.pb"
import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
import * as IbcCoreClientV1Client from "./client.pb"
export type QueryClientStateRequest = {
  client_id?: string
}

export type QueryClientStateResponse = {
  client_state?: GoogleProtobufAny.Any
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryClientStatesRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryClientStatesResponse = {
  client_states?: IbcCoreClientV1Client.IdentifiedClientState[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryConsensusStateRequest = {
  client_id?: string
  revision_number?: string
  revision_height?: string
  latest_height?: boolean
}

export type QueryConsensusStateResponse = {
  consensus_state?: GoogleProtobufAny.Any
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryConsensusStatesRequest = {
  client_id?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryConsensusStatesResponse = {
  consensus_states?: IbcCoreClientV1Client.ConsensusStateWithHeight[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryConsensusStateHeightsRequest = {
  client_id?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryConsensusStateHeightsResponse = {
  consensus_state_heights?: IbcCoreClientV1Client.Height[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryClientStatusRequest = {
  client_id?: string
}

export type QueryClientStatusResponse = {
  status?: string
}

export type QueryClientParamsRequest = {
}

export type QueryClientParamsResponse = {
  params?: IbcCoreClientV1Client.Params
}

export type QueryUpgradedClientStateRequest = {
}

export type QueryUpgradedClientStateResponse = {
  upgraded_client_state?: GoogleProtobufAny.Any
}

export type QueryUpgradedConsensusStateRequest = {
}

export type QueryUpgradedConsensusStateResponse = {
  upgraded_consensus_state?: GoogleProtobufAny.Any
}

export class Query {
  static ClientState(req: QueryClientStateRequest, initReq?: fm.InitReq): Promise<QueryClientStateResponse> {
    return fm.fetchReq<QueryClientStateRequest, QueryClientStateResponse>(`/ibc/core/client/v1/client_states/${req["client_id"]}?${fm.renderURLSearchParams(req, ["client_id"])}`, {...initReq, method: "GET"})
  }
  static ClientStates(req: QueryClientStatesRequest, initReq?: fm.InitReq): Promise<QueryClientStatesResponse> {
    return fm.fetchReq<QueryClientStatesRequest, QueryClientStatesResponse>(`/ibc/core/client/v1/client_states?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static ConsensusState(req: QueryConsensusStateRequest, initReq?: fm.InitReq): Promise<QueryConsensusStateResponse> {
    return fm.fetchReq<QueryConsensusStateRequest, QueryConsensusStateResponse>(`/ibc/core/client/v1/consensus_states/${req["client_id"]}/revision/${req["revision_number"]}/height/${req["revision_height"]}?${fm.renderURLSearchParams(req, ["client_id", "revision_number", "revision_height"])}`, {...initReq, method: "GET"})
  }
  static ConsensusStates(req: QueryConsensusStatesRequest, initReq?: fm.InitReq): Promise<QueryConsensusStatesResponse> {
    return fm.fetchReq<QueryConsensusStatesRequest, QueryConsensusStatesResponse>(`/ibc/core/client/v1/consensus_states/${req["client_id"]}?${fm.renderURLSearchParams(req, ["client_id"])}`, {...initReq, method: "GET"})
  }
  static ConsensusStateHeights(req: QueryConsensusStateHeightsRequest, initReq?: fm.InitReq): Promise<QueryConsensusStateHeightsResponse> {
    return fm.fetchReq<QueryConsensusStateHeightsRequest, QueryConsensusStateHeightsResponse>(`/ibc/core/client/v1/consensus_states/${req["client_id"]}/heights?${fm.renderURLSearchParams(req, ["client_id"])}`, {...initReq, method: "GET"})
  }
  static ClientStatus(req: QueryClientStatusRequest, initReq?: fm.InitReq): Promise<QueryClientStatusResponse> {
    return fm.fetchReq<QueryClientStatusRequest, QueryClientStatusResponse>(`/ibc/core/client/v1/client_status/${req["client_id"]}?${fm.renderURLSearchParams(req, ["client_id"])}`, {...initReq, method: "GET"})
  }
  static ClientParams(req: QueryClientParamsRequest, initReq?: fm.InitReq): Promise<QueryClientParamsResponse> {
    return fm.fetchReq<QueryClientParamsRequest, QueryClientParamsResponse>(`/ibc/client/v1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static UpgradedClientState(req: QueryUpgradedClientStateRequest, initReq?: fm.InitReq): Promise<QueryUpgradedClientStateResponse> {
    return fm.fetchReq<QueryUpgradedClientStateRequest, QueryUpgradedClientStateResponse>(`/ibc/core/client/v1/upgraded_client_states?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static UpgradedConsensusState(req: QueryUpgradedConsensusStateRequest, initReq?: fm.InitReq): Promise<QueryUpgradedConsensusStateResponse> {
    return fm.fetchReq<QueryUpgradedConsensusStateRequest, QueryUpgradedConsensusStateResponse>(`/ibc/core/client/v1/upgraded_consensus_states?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}