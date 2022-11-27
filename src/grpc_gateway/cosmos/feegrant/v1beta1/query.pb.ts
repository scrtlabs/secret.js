/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosFeegrantV1beta1Feegrant from "./feegrant.pb"
export type QueryAllowanceRequest = {
  granter?: string
  grantee?: string
}

export type QueryAllowanceResponse = {
  allowance?: CosmosFeegrantV1beta1Feegrant.Grant
}

export type QueryAllowancesRequest = {
  grantee?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryAllowancesResponse = {
  allowances?: CosmosFeegrantV1beta1Feegrant.Grant[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryAllowancesByGranterRequest = {
  granter?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryAllowancesByGranterResponse = {
  allowances?: CosmosFeegrantV1beta1Feegrant.Grant[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export class Query {
  static Allowance(req: QueryAllowanceRequest, initReq?: fm.InitReq): Promise<QueryAllowanceResponse> {
    return fm.fetchReq<QueryAllowanceRequest, QueryAllowanceResponse>(`/cosmos/feegrant/v1beta1/allowance/${req["granter"]}/${req["grantee"]}?${fm.renderURLSearchParams(req, ["granter", "grantee"])}`, {...initReq, method: "GET"})
  }
  static Allowances(req: QueryAllowancesRequest, initReq?: fm.InitReq): Promise<QueryAllowancesResponse> {
    return fm.fetchReq<QueryAllowancesRequest, QueryAllowancesResponse>(`/cosmos/feegrant/v1beta1/allowances/${req["grantee"]}?${fm.renderURLSearchParams(req, ["grantee"])}`, {...initReq, method: "GET"})
  }
  static AllowancesByGranter(req: QueryAllowancesByGranterRequest, initReq?: fm.InitReq): Promise<QueryAllowancesByGranterResponse> {
    return fm.fetchReq<QueryAllowancesByGranterRequest, QueryAllowancesByGranterResponse>(`/cosmos/feegrant/v1beta1/issued/${req["granter"]}?${fm.renderURLSearchParams(req, ["granter"])}`, {...initReq, method: "GET"})
  }
}