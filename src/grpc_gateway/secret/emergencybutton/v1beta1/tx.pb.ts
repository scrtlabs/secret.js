/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as SecretEmergencybuttonV1beta1Params from "./params.pb"
export type MsgToggleIbcSwitch = {
  sender?: string
}

export type MsgToggleIbcSwitchResponse = {
}

export type MsgUpdateParams = {
  authority?: string
  params?: SecretEmergencybuttonV1beta1Params.Params
}

export type MsgUpdateParamsResponse = {
}

export class Msg {
  static ToggleIbcSwitch(req: MsgToggleIbcSwitch, initReq?: fm.InitReq): Promise<MsgToggleIbcSwitchResponse> {
    return fm.fetchReq<MsgToggleIbcSwitch, MsgToggleIbcSwitchResponse>(`/secret.emergencybutton.v1beta1.Msg/ToggleIbcSwitch`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/secret.emergencybutton.v1beta1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}