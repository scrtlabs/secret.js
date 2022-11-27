/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseQueryV1beta1Pagination from "../../../../cosmos/base/query/v1beta1/pagination.pb"
import * as fm from "../../../../fetch.pb"
import * as IbcApplicationsTransferV1Transfer from "./transfer.pb"
export type QueryDenomTraceRequest = {
  hash?: string
}

export type QueryDenomTraceResponse = {
  denom_trace?: IbcApplicationsTransferV1Transfer.DenomTrace
}

export type QueryDenomTracesRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryDenomTracesResponse = {
  denom_traces?: IbcApplicationsTransferV1Transfer.DenomTrace[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: IbcApplicationsTransferV1Transfer.Params
}

export type QueryDenomHashRequest = {
  trace?: string
}

export type QueryDenomHashResponse = {
  hash?: string
}

export class Query {
  static DenomTrace(req: QueryDenomTraceRequest, initReq?: fm.InitReq): Promise<QueryDenomTraceResponse> {
    return fm.fetchReq<QueryDenomTraceRequest, QueryDenomTraceResponse>(`/ibc/apps/transfer/v1/denom_traces/${req["hash"]}?${fm.renderURLSearchParams(req, ["hash"])}`, {...initReq, method: "GET"})
  }
  static DenomTraces(req: QueryDenomTracesRequest, initReq?: fm.InitReq): Promise<QueryDenomTracesResponse> {
    return fm.fetchReq<QueryDenomTracesRequest, QueryDenomTracesResponse>(`/ibc/apps/transfer/v1/denom_traces?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/ibc/apps/transfer/v1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static DenomHash(req: QueryDenomHashRequest, initReq?: fm.InitReq): Promise<QueryDenomHashResponse> {
    return fm.fetchReq<QueryDenomHashRequest, QueryDenomHashResponse>(`/ibc/apps/transfer/v1/denom_hashes/${req["trace"]}?${fm.renderURLSearchParams(req, ["trace"])}`, {...initReq, method: "GET"})
  }
}