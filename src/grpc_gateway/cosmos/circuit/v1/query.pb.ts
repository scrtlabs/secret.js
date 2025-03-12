/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosCircuitV1Types from "./types.pb"
export type QueryAccountRequest = {
  address?: string
}

export type AccountResponse = {
  permission?: CosmosCircuitV1Types.Permissions
}

export type QueryAccountsRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type AccountsResponse = {
  accounts?: CosmosCircuitV1Types.GenesisAccountPermissions[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryDisabledListRequest = {
}

export type DisabledListResponse = {
  disabled_list?: string[]
}

export class Query {
  static Account(req: QueryAccountRequest, initReq?: fm.InitReq): Promise<AccountResponse> {
    return fm.fetchReq<QueryAccountRequest, AccountResponse>(`/cosmos/circuit/v1/accounts/${req["address"]}?${fm.renderURLSearchParams(req, ["address"])}`, {...initReq, method: "GET"})
  }
  static Accounts(req: QueryAccountsRequest, initReq?: fm.InitReq): Promise<AccountsResponse> {
    return fm.fetchReq<QueryAccountsRequest, AccountsResponse>(`/cosmos/circuit/v1/accounts?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static DisabledList(req: QueryDisabledListRequest, initReq?: fm.InitReq): Promise<DisabledListResponse> {
    return fm.fetchReq<QueryDisabledListRequest, DisabledListResponse>(`/cosmos/circuit/v1/disable_list?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}