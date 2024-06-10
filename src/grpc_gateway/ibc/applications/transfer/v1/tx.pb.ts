/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseV1beta1Coin from "../../../../cosmos/base/v1beta1/coin.pb"
import * as fm from "../../../../fetch.pb"
import * as IbcCoreClientV1Client from "../../../core/client/v1/client.pb"
import * as IbcApplicationsTransferV1Transfer from "./transfer.pb"
export type MsgTransfer = {
  source_port?: string
  source_channel?: string
  token?: CosmosBaseV1beta1Coin.Coin
  sender?: string
  receiver?: string
  timeout_height?: IbcCoreClientV1Client.Height
  timeout_timestamp?: string
  memo?: string
}

export type MsgTransferResponse = {
  sequence?: string
}

export type MsgUpdateParams = {
  signer?: string
  params?: IbcApplicationsTransferV1Transfer.Params
}

export type MsgUpdateParamsResponse = {
}

export class Msg {
  static Transfer(req: MsgTransfer, initReq?: fm.InitReq): Promise<MsgTransferResponse> {
    return fm.fetchReq<MsgTransfer, MsgTransferResponse>(`/ibc.applications.transfer.v1.Msg/Transfer`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/ibc.applications.transfer.v1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}