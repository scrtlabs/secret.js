/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
export type MsgUnjail = {
  validator_addr?: string
}

export type MsgUnjailResponse = {
}

export class Msg {
  static Unjail(req: MsgUnjail, initReq?: fm.InitReq): Promise<MsgUnjailResponse> {
    return fm.fetchReq<MsgUnjail, MsgUnjailResponse>(`/cosmos.slashing.v1beta1.Msg/Unjail`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}