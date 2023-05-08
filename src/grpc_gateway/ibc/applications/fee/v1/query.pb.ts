/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseQueryV1beta1Pagination from "../../../../cosmos/base/query/v1beta1/pagination.pb"
import * as CosmosBaseV1beta1Coin from "../../../../cosmos/base/v1beta1/coin.pb"
import * as fm from "../../../../fetch.pb"
import * as IbcCoreChannelV1Channel from "../../../core/channel/v1/channel.pb"
import * as IbcApplicationsFeeV1Fee from "./fee.pb"
import * as IbcApplicationsFeeV1Genesis from "./genesis.pb"
export type QueryIncentivizedPacketsRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
  query_height?: string
}

export type QueryIncentivizedPacketsResponse = {
  incentivized_packets?: IbcApplicationsFeeV1Fee.IdentifiedPacketFees[]
}

export type QueryIncentivizedPacketRequest = {
  packet_id?: IbcCoreChannelV1Channel.PacketId
  query_height?: string
}

export type QueryIncentivizedPacketResponse = {
  incentivized_packet?: IbcApplicationsFeeV1Fee.IdentifiedPacketFees
}

export type QueryIncentivizedPacketsForChannelRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
  port_id?: string
  channel_id?: string
  query_height?: string
}

export type QueryIncentivizedPacketsForChannelResponse = {
  incentivized_packets?: IbcApplicationsFeeV1Fee.IdentifiedPacketFees[]
}

export type QueryTotalRecvFeesRequest = {
  packet_id?: IbcCoreChannelV1Channel.PacketId
}

export type QueryTotalRecvFeesResponse = {
  recv_fees?: CosmosBaseV1beta1Coin.Coin[]
}

export type QueryTotalAckFeesRequest = {
  packet_id?: IbcCoreChannelV1Channel.PacketId
}

export type QueryTotalAckFeesResponse = {
  ack_fees?: CosmosBaseV1beta1Coin.Coin[]
}

export type QueryTotalTimeoutFeesRequest = {
  packet_id?: IbcCoreChannelV1Channel.PacketId
}

export type QueryTotalTimeoutFeesResponse = {
  timeout_fees?: CosmosBaseV1beta1Coin.Coin[]
}

export type QueryPayeeRequest = {
  channel_id?: string
  relayer?: string
}

export type QueryPayeeResponse = {
  payee_address?: string
}

export type QueryCounterpartyPayeeRequest = {
  channel_id?: string
  relayer?: string
}

export type QueryCounterpartyPayeeResponse = {
  counterparty_payee?: string
}

export type QueryFeeEnabledChannelsRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
  query_height?: string
}

export type QueryFeeEnabledChannelsResponse = {
  fee_enabled_channels?: IbcApplicationsFeeV1Genesis.FeeEnabledChannel[]
}

export type QueryFeeEnabledChannelRequest = {
  port_id?: string
  channel_id?: string
}

export type QueryFeeEnabledChannelResponse = {
  fee_enabled?: boolean
}

export class Query {
  static IncentivizedPackets(req: QueryIncentivizedPacketsRequest, initReq?: fm.InitReq): Promise<QueryIncentivizedPacketsResponse> {
    return fm.fetchReq<QueryIncentivizedPacketsRequest, QueryIncentivizedPacketsResponse>(`/ibc/apps/fee/v1/incentivized_packets?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static IncentivizedPacket(req: QueryIncentivizedPacketRequest, initReq?: fm.InitReq): Promise<QueryIncentivizedPacketResponse> {
    return fm.fetchReq<QueryIncentivizedPacketRequest, QueryIncentivizedPacketResponse>(`/ibc/apps/fee/v1/channels/${req["packet_id.channel_id"]}/ports/${req["packet_id.port_id"]}/sequences/${req["packet_id.sequence"]}/incentivized_packet?${fm.renderURLSearchParams(req, ["packet_id.channel_id", "packet_id.port_id", "packet_id.sequence"])}`, {...initReq, method: "GET"})
  }
  static IncentivizedPacketsForChannel(req: QueryIncentivizedPacketsForChannelRequest, initReq?: fm.InitReq): Promise<QueryIncentivizedPacketsForChannelResponse> {
    return fm.fetchReq<QueryIncentivizedPacketsForChannelRequest, QueryIncentivizedPacketsForChannelResponse>(`/ibc/apps/fee/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/incentivized_packets?${fm.renderURLSearchParams(req, ["channel_id", "port_id"])}`, {...initReq, method: "GET"})
  }
  static TotalRecvFees(req: QueryTotalRecvFeesRequest, initReq?: fm.InitReq): Promise<QueryTotalRecvFeesResponse> {
    return fm.fetchReq<QueryTotalRecvFeesRequest, QueryTotalRecvFeesResponse>(`/ibc/apps/fee/v1/channels/${req["packet_id.channel_id"]}/ports/${req["packet_id.port_id"]}/sequences/${req["packet_id.sequence"]}/total_recv_fees?${fm.renderURLSearchParams(req, ["packet_id.channel_id", "packet_id.port_id", "packet_id.sequence"])}`, {...initReq, method: "GET"})
  }
  static TotalAckFees(req: QueryTotalAckFeesRequest, initReq?: fm.InitReq): Promise<QueryTotalAckFeesResponse> {
    return fm.fetchReq<QueryTotalAckFeesRequest, QueryTotalAckFeesResponse>(`/ibc/apps/fee/v1/channels/${req["packet_id.channel_id"]}/ports/${req["packet_id.port_id"]}/sequences/${req["packet_id.sequence"]}/total_ack_fees?${fm.renderURLSearchParams(req, ["packet_id.channel_id", "packet_id.port_id", "packet_id.sequence"])}`, {...initReq, method: "GET"})
  }
  static TotalTimeoutFees(req: QueryTotalTimeoutFeesRequest, initReq?: fm.InitReq): Promise<QueryTotalTimeoutFeesResponse> {
    return fm.fetchReq<QueryTotalTimeoutFeesRequest, QueryTotalTimeoutFeesResponse>(`/ibc/apps/fee/v1/channels/${req["packet_id.channel_id"]}/ports/${req["packet_id.port_id"]}/sequences/${req["packet_id.sequence"]}/total_timeout_fees?${fm.renderURLSearchParams(req, ["packet_id.channel_id", "packet_id.port_id", "packet_id.sequence"])}`, {...initReq, method: "GET"})
  }
  static Payee(req: QueryPayeeRequest, initReq?: fm.InitReq): Promise<QueryPayeeResponse> {
    return fm.fetchReq<QueryPayeeRequest, QueryPayeeResponse>(`/ibc/apps/fee/v1/channels/${req["channel_id"]}/relayers/${req["relayer"]}/payee?${fm.renderURLSearchParams(req, ["channel_id", "relayer"])}`, {...initReq, method: "GET"})
  }
  static CounterpartyPayee(req: QueryCounterpartyPayeeRequest, initReq?: fm.InitReq): Promise<QueryCounterpartyPayeeResponse> {
    return fm.fetchReq<QueryCounterpartyPayeeRequest, QueryCounterpartyPayeeResponse>(`/ibc/apps/fee/v1/channels/${req["channel_id"]}/relayers/${req["relayer"]}/counterparty_payee?${fm.renderURLSearchParams(req, ["channel_id", "relayer"])}`, {...initReq, method: "GET"})
  }
  static FeeEnabledChannels(req: QueryFeeEnabledChannelsRequest, initReq?: fm.InitReq): Promise<QueryFeeEnabledChannelsResponse> {
    return fm.fetchReq<QueryFeeEnabledChannelsRequest, QueryFeeEnabledChannelsResponse>(`/ibc/apps/fee/v1/fee_enabled?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static FeeEnabledChannel(req: QueryFeeEnabledChannelRequest, initReq?: fm.InitReq): Promise<QueryFeeEnabledChannelResponse> {
    return fm.fetchReq<QueryFeeEnabledChannelRequest, QueryFeeEnabledChannelResponse>(`/ibc/apps/fee/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/fee_enabled?${fm.renderURLSearchParams(req, ["channel_id", "port_id"])}`, {...initReq, method: "GET"})
  }
}