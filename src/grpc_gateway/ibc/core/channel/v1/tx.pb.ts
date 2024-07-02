/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
import * as IbcCoreClientV1Client from "../../client/v1/client.pb"
import * as IbcCoreChannelV1Channel from "./channel.pb"
import * as IbcCoreChannelV1Channel_upgrade from "./channel_upgrade.pb"

export enum ResponseResultType {
  RESPONSE_RESULT_TYPE_UNSPECIFIED = "RESPONSE_RESULT_TYPE_UNSPECIFIED",
  RESPONSE_RESULT_TYPE_NOOP = "RESPONSE_RESULT_TYPE_NOOP",
  RESPONSE_RESULT_TYPE_SUCCESS = "RESPONSE_RESULT_TYPE_SUCCESS",
  RESPONSE_RESULT_TYPE_FAILURE = "RESPONSE_RESULT_TYPE_FAILURE",
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
  channel_id?: string
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
  counterparty_upgrade_sequence?: string
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
  counterparty_upgrade_sequence?: string
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

export type MsgChannelUpgradeInit = {
  port_id?: string
  channel_id?: string
  fields?: IbcCoreChannelV1Channel_upgrade.UpgradeFields
  signer?: string
}

export type MsgChannelUpgradeInitResponse = {
  upgrade?: IbcCoreChannelV1Channel_upgrade.Upgrade
  upgrade_sequence?: string
}

export type MsgChannelUpgradeTry = {
  port_id?: string
  channel_id?: string
  proposed_upgrade_connection_hops?: string[]
  counterparty_upgrade_fields?: IbcCoreChannelV1Channel_upgrade.UpgradeFields
  counterparty_upgrade_sequence?: string
  proof_channel?: Uint8Array
  proof_upgrade?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgChannelUpgradeTryResponse = {
  upgrade?: IbcCoreChannelV1Channel_upgrade.Upgrade
  upgrade_sequence?: string
  result?: ResponseResultType
}

export type MsgChannelUpgradeAck = {
  port_id?: string
  channel_id?: string
  counterparty_upgrade?: IbcCoreChannelV1Channel_upgrade.Upgrade
  proof_channel?: Uint8Array
  proof_upgrade?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgChannelUpgradeAckResponse = {
  result?: ResponseResultType
}

export type MsgChannelUpgradeConfirm = {
  port_id?: string
  channel_id?: string
  counterparty_channel_state?: IbcCoreChannelV1Channel.State
  counterparty_upgrade?: IbcCoreChannelV1Channel_upgrade.Upgrade
  proof_channel?: Uint8Array
  proof_upgrade?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgChannelUpgradeConfirmResponse = {
  result?: ResponseResultType
}

export type MsgChannelUpgradeOpen = {
  port_id?: string
  channel_id?: string
  counterparty_channel_state?: IbcCoreChannelV1Channel.State
  counterparty_upgrade_sequence?: string
  proof_channel?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgChannelUpgradeOpenResponse = {
}

export type MsgChannelUpgradeTimeout = {
  port_id?: string
  channel_id?: string
  counterparty_channel?: IbcCoreChannelV1Channel.Channel
  proof_channel?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgChannelUpgradeTimeoutResponse = {
}

export type MsgChannelUpgradeCancel = {
  port_id?: string
  channel_id?: string
  error_receipt?: IbcCoreChannelV1Channel_upgrade.ErrorReceipt
  proof_error_receipt?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgChannelUpgradeCancelResponse = {
}

export type MsgUpdateParams = {
  authority?: string
  params?: IbcCoreChannelV1Channel.Params
}

export type MsgUpdateParamsResponse = {
}

export type MsgPruneAcknowledgements = {
  port_id?: string
  channel_id?: string
  limit?: string
  signer?: string
}

export type MsgPruneAcknowledgementsResponse = {
  total_pruned_sequences?: string
  total_remaining_sequences?: string
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
  static ChannelUpgradeInit(req: MsgChannelUpgradeInit, initReq?: fm.InitReq): Promise<MsgChannelUpgradeInitResponse> {
    return fm.fetchReq<MsgChannelUpgradeInit, MsgChannelUpgradeInitResponse>(`/ibc.core.channel.v1.Msg/ChannelUpgradeInit`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ChannelUpgradeTry(req: MsgChannelUpgradeTry, initReq?: fm.InitReq): Promise<MsgChannelUpgradeTryResponse> {
    return fm.fetchReq<MsgChannelUpgradeTry, MsgChannelUpgradeTryResponse>(`/ibc.core.channel.v1.Msg/ChannelUpgradeTry`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ChannelUpgradeAck(req: MsgChannelUpgradeAck, initReq?: fm.InitReq): Promise<MsgChannelUpgradeAckResponse> {
    return fm.fetchReq<MsgChannelUpgradeAck, MsgChannelUpgradeAckResponse>(`/ibc.core.channel.v1.Msg/ChannelUpgradeAck`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ChannelUpgradeConfirm(req: MsgChannelUpgradeConfirm, initReq?: fm.InitReq): Promise<MsgChannelUpgradeConfirmResponse> {
    return fm.fetchReq<MsgChannelUpgradeConfirm, MsgChannelUpgradeConfirmResponse>(`/ibc.core.channel.v1.Msg/ChannelUpgradeConfirm`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ChannelUpgradeOpen(req: MsgChannelUpgradeOpen, initReq?: fm.InitReq): Promise<MsgChannelUpgradeOpenResponse> {
    return fm.fetchReq<MsgChannelUpgradeOpen, MsgChannelUpgradeOpenResponse>(`/ibc.core.channel.v1.Msg/ChannelUpgradeOpen`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ChannelUpgradeTimeout(req: MsgChannelUpgradeTimeout, initReq?: fm.InitReq): Promise<MsgChannelUpgradeTimeoutResponse> {
    return fm.fetchReq<MsgChannelUpgradeTimeout, MsgChannelUpgradeTimeoutResponse>(`/ibc.core.channel.v1.Msg/ChannelUpgradeTimeout`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ChannelUpgradeCancel(req: MsgChannelUpgradeCancel, initReq?: fm.InitReq): Promise<MsgChannelUpgradeCancelResponse> {
    return fm.fetchReq<MsgChannelUpgradeCancel, MsgChannelUpgradeCancelResponse>(`/ibc.core.channel.v1.Msg/ChannelUpgradeCancel`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateChannelParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/ibc.core.channel.v1.Msg/UpdateChannelParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static PruneAcknowledgements(req: MsgPruneAcknowledgements, initReq?: fm.InitReq): Promise<MsgPruneAcknowledgementsResponse> {
    return fm.fetchReq<MsgPruneAcknowledgements, MsgPruneAcknowledgementsResponse>(`/ibc.core.channel.v1.Msg/PruneAcknowledgements`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}