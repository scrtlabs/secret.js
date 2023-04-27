/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
export type MsgToggleIbcSwitch = {
  sender?: string
}

export type MsgToggleIbcSwitchResponse = {
}

export class Msg {
  static ToggleIbcSwitch(req: MsgToggleIbcSwitch, initReq?: fm.InitReq): Promise<MsgToggleIbcSwitchResponse> {
    return fm.fetchReq<MsgToggleIbcSwitch, MsgToggleIbcSwitchResponse>(`/secret.emergencybutton.v1beta1.Msg/ToggleIbcSwitch`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}