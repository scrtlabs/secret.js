/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
export type MsgSend = {
  class_id?: string
  id?: string
  sender?: string
  receiver?: string
}

export type MsgSendResponse = {
}

export class Msg {
  static Send(req: MsgSend, initReq?: fm.InitReq): Promise<MsgSendResponse> {
    return fm.fetchReq<MsgSend, MsgSendResponse>(`/cosmos.nft.v1beta1.Msg/Send`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}