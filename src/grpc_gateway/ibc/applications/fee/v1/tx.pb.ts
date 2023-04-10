/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
import * as IbcCoreChannelV1Channel from "../../../core/channel/v1/channel.pb"
import * as IbcApplicationsFeeV1Fee from "./fee.pb"
export type MsgRegisterPayee = {
  port_id?: string
  channel_id?: string
  relayer?: string
  payee?: string
}

export type MsgRegisterPayeeResponse = {
}

export type MsgRegisterCounterpartyPayee = {
  port_id?: string
  channel_id?: string
  relayer?: string
  counterparty_payee?: string
}

export type MsgRegisterCounterpartyPayeeResponse = {
}

export type MsgPayPacketFee = {
  fee?: IbcApplicationsFeeV1Fee.Fee
  source_port_id?: string
  source_channel_id?: string
  signer?: string
  relayers?: string[]
}

export type MsgPayPacketFeeResponse = {
}

export type MsgPayPacketFeeAsync = {
  packet_id?: IbcCoreChannelV1Channel.PacketId
  packet_fee?: IbcApplicationsFeeV1Fee.PacketFee
}

export type MsgPayPacketFeeAsyncResponse = {
}

export class Msg {
  static RegisterPayee(req: MsgRegisterPayee, initReq?: fm.InitReq): Promise<MsgRegisterPayeeResponse> {
    return fm.fetchReq<MsgRegisterPayee, MsgRegisterPayeeResponse>(`/ibc.applications.fee.v1.Msg/RegisterPayee`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static RegisterCounterpartyPayee(req: MsgRegisterCounterpartyPayee, initReq?: fm.InitReq): Promise<MsgRegisterCounterpartyPayeeResponse> {
    return fm.fetchReq<MsgRegisterCounterpartyPayee, MsgRegisterCounterpartyPayeeResponse>(`/ibc.applications.fee.v1.Msg/RegisterCounterpartyPayee`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static PayPacketFee(req: MsgPayPacketFee, initReq?: fm.InitReq): Promise<MsgPayPacketFeeResponse> {
    return fm.fetchReq<MsgPayPacketFee, MsgPayPacketFeeResponse>(`/ibc.applications.fee.v1.Msg/PayPacketFee`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static PayPacketFeeAsync(req: MsgPayPacketFeeAsync, initReq?: fm.InitReq): Promise<MsgPayPacketFeeAsyncResponse> {
    return fm.fetchReq<MsgPayPacketFeeAsync, MsgPayPacketFeeAsyncResponse>(`/ibc.applications.fee.v1.Msg/PayPacketFeeAsync`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}