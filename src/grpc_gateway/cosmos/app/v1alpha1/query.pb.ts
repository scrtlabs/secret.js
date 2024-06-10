/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosAppV1alpha1Config from "./config.pb"
export type QueryConfigRequest = {
}

export type QueryConfigResponse = {
  config?: CosmosAppV1alpha1Config.Config
}

export class Query {
  static Config(req: QueryConfigRequest, initReq?: fm.InitReq): Promise<QueryConfigResponse> {
    return fm.fetchReq<QueryConfigRequest, QueryConfigResponse>(`/cosmos.app.v1alpha1.Query/Config`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}