/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../../fetch.pb"
import * as IbcCoreChannelV1Channel from "../../../../core/channel/v1/channel.pb"
import * as IbcApplicationsInterchain_accountsV1Packet from "../../v1/packet.pb"
import * as IbcApplicationsInterchain_accountsControllerV1Controller from "./controller.pb"
export type MsgRegisterInterchainAccount = {
  owner?: string
  connection_id?: string
  version?: string
  ordering?: IbcCoreChannelV1Channel.Order
}

export type MsgRegisterInterchainAccountResponse = {
  channel_id?: string
  port_id?: string
}

export type MsgSendTx = {
  owner?: string
  connection_id?: string
  packet_data?: IbcApplicationsInterchain_accountsV1Packet.InterchainAccountPacketData
  relative_timeout?: string
}

export type MsgSendTxResponse = {
  sequence?: string
}

export type MsgUpdateParams = {
  signer?: string
  params?: IbcApplicationsInterchain_accountsControllerV1Controller.Params
}

export type MsgUpdateParamsResponse = {
}

export class Msg {
  static RegisterInterchainAccount(req: MsgRegisterInterchainAccount, initReq?: fm.InitReq): Promise<MsgRegisterInterchainAccountResponse> {
    return fm.fetchReq<MsgRegisterInterchainAccount, MsgRegisterInterchainAccountResponse>(`/ibc.applications.interchain_accounts.controller.v1.Msg/RegisterInterchainAccount`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static SendTx(req: MsgSendTx, initReq?: fm.InitReq): Promise<MsgSendTxResponse> {
    return fm.fetchReq<MsgSendTx, MsgSendTxResponse>(`/ibc.applications.interchain_accounts.controller.v1.Msg/SendTx`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/ibc.applications.interchain_accounts.controller.v1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}