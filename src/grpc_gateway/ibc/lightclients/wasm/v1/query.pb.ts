/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseQueryV1beta1Pagination from "../../../../cosmos/base/query/v1beta1/pagination.pb"
import * as fm from "../../../../fetch.pb"
export type QueryChecksumsRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryChecksumsResponse = {
  checksums?: string[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryCodeRequest = {
  checksum?: string
}

export type QueryCodeResponse = {
  data?: Uint8Array
}

export class Query {
  static Checksums(req: QueryChecksumsRequest, initReq?: fm.InitReq): Promise<QueryChecksumsResponse> {
    return fm.fetchReq<QueryChecksumsRequest, QueryChecksumsResponse>(`/ibc/lightclients/wasm/v1/checksums?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static Code(req: QueryCodeRequest, initReq?: fm.InitReq): Promise<QueryCodeResponse> {
    return fm.fetchReq<QueryCodeRequest, QueryCodeResponse>(`/ibc/lightclients/wasm/v1/checksums/${req["checksum"]}/code?${fm.renderURLSearchParams(req, ["checksum"])}`, {...initReq, method: "GET"})
  }
}