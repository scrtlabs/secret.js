/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as PacketforwardV1Genesis from "./genesis.pb"
export type MsgUpdateParams = {
  authority?: string
  params?: PacketforwardV1Genesis.Params
}

export type MsgUpdateParamsResponse = {
}

export class Msg {
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/packetforward.v1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}