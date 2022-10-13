/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
export type MsgVerifyInvariant = {
  sender?: string
  invariant_module_name?: string
  invariant_route?: string
}

export type MsgVerifyInvariantResponse = {
}

export class Msg {
  static VerifyInvariant(req: MsgVerifyInvariant, initReq?: fm.InitReq): Promise<MsgVerifyInvariantResponse> {
    return fm.fetchReq<MsgVerifyInvariant, MsgVerifyInvariantResponse>(`/cosmos.crisis.v1beta1.Msg/VerifyInvariant`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}