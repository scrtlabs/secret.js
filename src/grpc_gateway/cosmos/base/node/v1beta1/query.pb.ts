/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
export type ConfigRequest = {
}

export type ConfigResponse = {
  minimum_gas_price?: string
}

export class Service {
  static Config(req: ConfigRequest, initReq?: fm.InitReq): Promise<ConfigResponse> {
    return fm.fetchReq<ConfigRequest, ConfigResponse>(`/cosmos/base/node/v1beta1/config?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}