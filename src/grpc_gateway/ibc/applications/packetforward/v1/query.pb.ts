/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
import * as PacketforwardV1Genesis from "./genesis.pb"
export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: PacketforwardV1Genesis.Params
}

export class Query {
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/ibc/apps/router/v1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}