/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as SecretIbcswitchV1beta1Params from "./params.pb"
export type ParamsRequest = {
}

export type ParamsResponse = {
  params?: SecretIbcswitchV1beta1Params.Params
}

export class Query {
  static Params(req: ParamsRequest, initReq?: fm.InitReq): Promise<ParamsResponse> {
    return fm.fetchReq<ParamsRequest, ParamsResponse>(`/ibc-switch/v1beta1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}