/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosMintV1beta1Mint from "./mint.pb"
export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: CosmosMintV1beta1Mint.Params
}

export type QueryInflationRequest = {
}

export type QueryInflationResponse = {
  inflation?: Uint8Array
}

export type QueryAnnualProvisionsRequest = {
}

export type QueryAnnualProvisionsResponse = {
  annual_provisions?: Uint8Array
}

export class Query {
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/cosmos/mint/v1beta1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static Inflation(req: QueryInflationRequest, initReq?: fm.InitReq): Promise<QueryInflationResponse> {
    return fm.fetchReq<QueryInflationRequest, QueryInflationResponse>(`/cosmos/mint/v1beta1/inflation?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static AnnualProvisions(req: QueryAnnualProvisionsRequest, initReq?: fm.InitReq): Promise<QueryAnnualProvisionsResponse> {
    return fm.fetchReq<QueryAnnualProvisionsRequest, QueryAnnualProvisionsResponse>(`/cosmos/mint/v1beta1/annual_provisions?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}