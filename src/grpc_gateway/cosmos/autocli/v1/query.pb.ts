/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosAutocliV1Options from "./options.pb"
export type AppOptionsRequest = {
}

export type AppOptionsResponse = {
  module_options?: {[key: string]: CosmosAutocliV1Options.ModuleOptions}
}

export class Query {
  static AppOptions(req: AppOptionsRequest, initReq?: fm.InitReq): Promise<AppOptionsResponse> {
    return fm.fetchReq<AppOptionsRequest, AppOptionsResponse>(`/cosmos.autocli.v1.Query/AppOptions`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}