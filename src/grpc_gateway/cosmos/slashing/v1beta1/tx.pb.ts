/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosSlashingV1beta1Slashing from "./slashing.pb"
export type MsgUnjail = {
  validator_addr?: string
}

export type MsgUnjailResponse = {
}

export type MsgUpdateParams = {
  authority?: string
  params?: CosmosSlashingV1beta1Slashing.Params
}

export type MsgUpdateParamsResponse = {
}

export class Msg {
  static Unjail(req: MsgUnjail, initReq?: fm.InitReq): Promise<MsgUnjailResponse> {
    return fm.fetchReq<MsgUnjail, MsgUnjailResponse>(`/cosmos.slashing.v1beta1.Msg/Unjail`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/cosmos.slashing.v1beta1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}