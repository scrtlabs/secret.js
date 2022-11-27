/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../../fetch.pb"
import * as IbcApplicationsInterchain_accountsHostV1Host from "./host.pb"
export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: IbcApplicationsInterchain_accountsHostV1Host.Params
}

export class Query {
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/ibc/apps/interchain_accounts/host/v1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}