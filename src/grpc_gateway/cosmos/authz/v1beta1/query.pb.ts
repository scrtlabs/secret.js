/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosAuthzV1beta1Authz from "./authz.pb"
export type QueryGrantsRequest = {
  granter?: string
  grantee?: string
  msg_type_url?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryGrantsResponse = {
  grants?: CosmosAuthzV1beta1Authz.Grant[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryGranterGrantsRequest = {
  granter?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryGranterGrantsResponse = {
  grants?: CosmosAuthzV1beta1Authz.GrantAuthorization[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryGranteeGrantsRequest = {
  grantee?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryGranteeGrantsResponse = {
  grants?: CosmosAuthzV1beta1Authz.GrantAuthorization[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export class Query {
  static Grants(req: QueryGrantsRequest, initReq?: fm.InitReq): Promise<QueryGrantsResponse> {
    return fm.fetchReq<QueryGrantsRequest, QueryGrantsResponse>(`/cosmos/authz/v1beta1/grants?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GranterGrants(req: QueryGranterGrantsRequest, initReq?: fm.InitReq): Promise<QueryGranterGrantsResponse> {
    return fm.fetchReq<QueryGranterGrantsRequest, QueryGranterGrantsResponse>(`/cosmos/authz/v1beta1/grants/granter/${req["granter"]}?${fm.renderURLSearchParams(req, ["granter"])}`, {...initReq, method: "GET"})
  }
  static GranteeGrants(req: QueryGranteeGrantsRequest, initReq?: fm.InitReq): Promise<QueryGranteeGrantsResponse> {
    return fm.fetchReq<QueryGranteeGrantsRequest, QueryGranteeGrantsResponse>(`/cosmos/authz/v1beta1/grants/grantee/${req["grantee"]}?${fm.renderURLSearchParams(req, ["grantee"])}`, {...initReq, method: "GET"})
  }
}