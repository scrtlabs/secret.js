/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseQueryV1beta1Pagination from "../../../../cosmos/base/query/v1beta1/pagination.pb"
import * as fm from "../../../../fetch.pb"
import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
import * as IbcCoreClientV1Client from "../../client/v1/client.pb"
import * as IbcCoreConnectionV1Connection from "./connection.pb"
export type QueryConnectionRequest = {
  connection_id?: string
}

export type QueryConnectionResponse = {
  connection?: IbcCoreConnectionV1Connection.ConnectionEnd
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryConnectionsRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryConnectionsResponse = {
  connections?: IbcCoreConnectionV1Connection.IdentifiedConnection[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
  height?: IbcCoreClientV1Client.Height
}

export type QueryClientConnectionsRequest = {
  client_id?: string
}

export type QueryClientConnectionsResponse = {
  connection_paths?: string[]
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryConnectionClientStateRequest = {
  connection_id?: string
}

export type QueryConnectionClientStateResponse = {
  identified_client_state?: IbcCoreClientV1Client.IdentifiedClientState
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryConnectionConsensusStateRequest = {
  connection_id?: string
  revision_number?: string
  revision_height?: string
}

export type QueryConnectionConsensusStateResponse = {
  consensus_state?: GoogleProtobufAny.Any
  client_id?: string
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryConnectionParamsRequest = {
}

export type QueryConnectionParamsResponse = {
  params?: IbcCoreConnectionV1Connection.Params
}

export class Query {
  static Connection(req: QueryConnectionRequest, initReq?: fm.InitReq): Promise<QueryConnectionResponse> {
    return fm.fetchReq<QueryConnectionRequest, QueryConnectionResponse>(`/ibc/core/connection/v1/connections/${req["connection_id"]}?${fm.renderURLSearchParams(req, ["connection_id"])}`, {...initReq, method: "GET"})
  }
  static Connections(req: QueryConnectionsRequest, initReq?: fm.InitReq): Promise<QueryConnectionsResponse> {
    return fm.fetchReq<QueryConnectionsRequest, QueryConnectionsResponse>(`/ibc/core/connection/v1/connections?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static ClientConnections(req: QueryClientConnectionsRequest, initReq?: fm.InitReq): Promise<QueryClientConnectionsResponse> {
    return fm.fetchReq<QueryClientConnectionsRequest, QueryClientConnectionsResponse>(`/ibc/core/connection/v1/client_connections/${req["client_id"]}?${fm.renderURLSearchParams(req, ["client_id"])}`, {...initReq, method: "GET"})
  }
  static ConnectionClientState(req: QueryConnectionClientStateRequest, initReq?: fm.InitReq): Promise<QueryConnectionClientStateResponse> {
    return fm.fetchReq<QueryConnectionClientStateRequest, QueryConnectionClientStateResponse>(`/ibc/core/connection/v1/connections/${req["connection_id"]}/client_state?${fm.renderURLSearchParams(req, ["connection_id"])}`, {...initReq, method: "GET"})
  }
  static ConnectionConsensusState(req: QueryConnectionConsensusStateRequest, initReq?: fm.InitReq): Promise<QueryConnectionConsensusStateResponse> {
    return fm.fetchReq<QueryConnectionConsensusStateRequest, QueryConnectionConsensusStateResponse>(`/ibc/core/connection/v1/connections/${req["connection_id"]}/consensus_state/revision/${req["revision_number"]}/height/${req["revision_height"]}?${fm.renderURLSearchParams(req, ["connection_id", "revision_number", "revision_height"])}`, {...initReq, method: "GET"})
  }
  static ConnectionParams(req: QueryConnectionParamsRequest, initReq?: fm.InitReq): Promise<QueryConnectionParamsResponse> {
    return fm.fetchReq<QueryConnectionParamsRequest, QueryConnectionParamsResponse>(`/ibc/core/connection/v1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}