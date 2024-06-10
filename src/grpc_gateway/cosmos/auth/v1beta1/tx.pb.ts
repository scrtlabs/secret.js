/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosAuthV1beta1Auth from "./auth.pb"
export type MsgUpdateParams = {
  authority?: string
  params?: CosmosAuthV1beta1Auth.Params
}

export type MsgUpdateParamsResponse = {
}

export class Msg {
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/cosmos.auth.v1beta1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}