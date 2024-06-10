/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosParamsV1beta1Params from "./params.pb"
export type QueryParamsRequest = {
  subspace?: string
  key?: string
}

export type QueryParamsResponse = {
  param?: CosmosParamsV1beta1Params.ParamChange
}

export type QuerySubspacesRequest = {
}

export type QuerySubspacesResponse = {
  subspaces?: Subspace[]
}

export type Subspace = {
  subspace?: string
  keys?: string[]
}

export class Query {
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/cosmos/params/v1beta1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static Subspaces(req: QuerySubspacesRequest, initReq?: fm.InitReq): Promise<QuerySubspacesResponse> {
    return fm.fetchReq<QuerySubspacesRequest, QuerySubspacesResponse>(`/cosmos/params/v1beta1/subspaces?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}