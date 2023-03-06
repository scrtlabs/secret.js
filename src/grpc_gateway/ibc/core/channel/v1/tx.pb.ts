/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
import * as IbcCoreClientV1Client from "../../client/v1/client.pb"
import * as IbcCoreChannelV1Channel from "./channel.pb"

export enum ResponseResultType {
  RESPONSE_RESULT_TYPE_UNSPECIFIED = "RESPONSE_RESULT_TYPE_UNSPECIFIED",
  RESPONSE_RESULT_TYPE_NOOP = "RESPONSE_RESULT_TYPE_NOOP",
  RESPONSE_RESULT_TYPE_SUCCESS = "RESPONSE_RESULT_TYPE_SUCCESS",
}

export type MsgChannelOpenInit = {
  port_id?: string
  channel?: IbcCoreChannelV1Channel.Channel
  signer?: string
}

export type MsgChannelOpenInitResponse = {
  channel_id?: string
  version?: string
}

export type MsgChannelOpenTry = {
  port_id?: string
  previous_channel_id?: string
  channel?: IbcCoreChannelV1Channel.Channel
  counterparty_version?: string
  proof_init?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgChannelOpenTryResponse = {
  version?: string
}

export type MsgChannelOpenAck = {
  port_id?: string
  channel_id?: string
  counterparty_channel_id?: string
  counterparty_version?: string
  proof_try?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgChannelOpenAckResponse = {
}

export type MsgChannelOpenConfirm = {
  port_id?: string
  channel_id?: string
  proof_ack?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgChannelOpenConfirmResponse = {
}

export type MsgChannelCloseInit = {
  port_id?: string
  channel_id?: string
  signer?: string
}

export type MsgChannelCloseInitResponse = {
}

export type MsgChannelCloseConfirm = {
  port_id?: string
  channel_id?: string
  proof_init?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgChannelCloseConfirmResponse = {
}

export type MsgRecvPacket = {
  packet?: IbcCoreChannelV1Channel.Packet
  proof_commitment?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgRecvPacketResponse = {
  result?: ResponseResultType
}

export type MsgTimeout = {
  packet?: IbcCoreChannelV1Channel.Packet
  proof_unreceived?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  next_sequence_recv?: string
  signer?: string
}

export type MsgTimeoutResponse = {
  result?: ResponseResultType
}

export type MsgTimeoutOnClose = {
  packet?: IbcCoreChannelV1Channel.Packet
  proof_unreceived?: Uint8Array
  proof_close?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  next_sequence_recv?: string
  signer?: string
}

export type MsgTimeoutOnCloseResponse = {
  result?: ResponseResultType
}

export type MsgAcknowledgement = {
  packet?: IbcCoreChannelV1Channel.Packet
  acknowledgement?: Uint8Array
  proof_acked?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgAcknowledgementResponse = {
  result?: ResponseResultType
}

export class Msg {
  static ChannelOpenInit(req: MsgChannelOpenInit, initReq?: fm.InitReq): Promise<MsgChannelOpenInitResponse> {
    return fm.fetchReq<MsgChannelOpenInit, MsgChannelOpenInitResponse>(`/ibc.core.channel.v1.Msg/ChannelOpenInit`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ChannelOpenTry(req: MsgChannelOpenTry, initReq?: fm.InitReq): Promise<MsgChannelOpenTryResponse> {
    return fm.fetchReq<MsgChannelOpenTry, MsgChannelOpenTryResponse>(`/ibc.core.channel.v1.Msg/ChannelOpenTry`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ChannelOpenAck(req: MsgChannelOpenAck, initReq?: fm.InitReq): Promise<MsgChannelOpenAckResponse> {
    return fm.fetchReq<MsgChannelOpenAck, MsgChannelOpenAckResponse>(`/ibc.core.channel.v1.Msg/ChannelOpenAck`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ChannelOpenConfirm(req: MsgChannelOpenConfirm, initReq?: fm.InitReq): Promise<MsgChannelOpenConfirmResponse> {
    return fm.fetchReq<MsgChannelOpenConfirm, MsgChannelOpenConfirmResponse>(`/ibc.core.channel.v1.Msg/ChannelOpenConfirm`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ChannelCloseInit(req: MsgChannelCloseInit, initReq?: fm.InitReq): Promise<MsgChannelCloseInitResponse> {
    return fm.fetchReq<MsgChannelCloseInit, MsgChannelCloseInitResponse>(`/ibc.core.channel.v1.Msg/ChannelCloseInit`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ChannelCloseConfirm(req: MsgChannelCloseConfirm, initReq?: fm.InitReq): Promise<MsgChannelCloseConfirmResponse> {
    return fm.fetchReq<MsgChannelCloseConfirm, MsgChannelCloseConfirmResponse>(`/ibc.core.channel.v1.Msg/ChannelCloseConfirm`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static RecvPacket(req: MsgRecvPacket, initReq?: fm.InitReq): Promise<MsgRecvPacketResponse> {
    return fm.fetchReq<MsgRecvPacket, MsgRecvPacketResponse>(`/ibc.core.channel.v1.Msg/RecvPacket`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Timeout(req: MsgTimeout, initReq?: fm.InitReq): Promise<MsgTimeoutResponse> {
    return fm.fetchReq<MsgTimeout, MsgTimeoutResponse>(`/ibc.core.channel.v1.Msg/Timeout`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static TimeoutOnClose(req: MsgTimeoutOnClose, initReq?: fm.InitReq): Promise<MsgTimeoutOnCloseResponse> {
    return fm.fetchReq<MsgTimeoutOnClose, MsgTimeoutOnCloseResponse>(`/ibc.core.channel.v1.Msg/TimeoutOnClose`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Acknowledgement(req: MsgAcknowledgement, initReq?: fm.InitReq): Promise<MsgAcknowledgementResponse> {
    return fm.fetchReq<MsgAcknowledgement, MsgAcknowledgementResponse>(`/ibc.core.channel.v1.Msg/Acknowledgement`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}