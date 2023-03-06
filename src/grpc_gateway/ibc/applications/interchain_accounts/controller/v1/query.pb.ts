/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../../fetch.pb"
import * as IbcApplicationsInterchain_accountsControllerV1Controller from "./controller.pb"
export type QueryInterchainAccountRequest = {
  owner?: string
  connection_id?: string
}

export type QueryInterchainAccountResponse = {
  address?: string
}

export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: IbcApplicationsInterchain_accountsControllerV1Controller.Params
}

export class Query {
  static InterchainAccount(req: QueryInterchainAccountRequest, initReq?: fm.InitReq): Promise<QueryInterchainAccountResponse> {
    return fm.fetchReq<QueryInterchainAccountRequest, QueryInterchainAccountResponse>(`/ibc/apps/interchain_accounts/controller/v1/owners/${req["owner"]}/connections/${req["connection_id"]}?${fm.renderURLSearchParams(req, ["owner", "connection_id"])}`, {...initReq, method: "GET"})
  }
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/ibc/apps/interchain_accounts/controller/v1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}