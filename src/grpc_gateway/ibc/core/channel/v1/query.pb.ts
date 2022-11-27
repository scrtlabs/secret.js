/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseQueryV1beta1Pagination from "../../../../cosmos/base/query/v1beta1/pagination.pb"
import * as fm from "../../../../fetch.pb"
import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
import * as IbcCoreClientV1Client from "../../client/v1/client.pb"
import * as IbcCoreChannelV1Channel from "./channel.pb"
export type QueryChannelRequest = {
  port_id?: string
  channel_id?: string
}

export type QueryChannelResponse = {
  channel?: IbcCoreChannelV1Channel.Channel
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryChannelsRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryChannelsResponse = {
  channels?: IbcCoreChannelV1Channel.IdentifiedChannel[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
  height?: IbcCoreClientV1Client.Height
}

export type QueryConnectionChannelsRequest = {
  connection?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryConnectionChannelsResponse = {
  channels?: IbcCoreChannelV1Channel.IdentifiedChannel[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
  height?: IbcCoreClientV1Client.Height
}

export type QueryChannelClientStateRequest = {
  port_id?: string
  channel_id?: string
}

export type QueryChannelClientStateResponse = {
  identified_client_state?: IbcCoreClientV1Client.IdentifiedClientState
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryChannelConsensusStateRequest = {
  port_id?: string
  channel_id?: string
  revision_number?: string
  revision_height?: string
}

export type QueryChannelConsensusStateResponse = {
  consensus_state?: GoogleProtobufAny.Any
  client_id?: string
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryPacketCommitmentRequest = {
  port_id?: string
  channel_id?: string
  sequence?: string
}

export type QueryPacketCommitmentResponse = {
  commitment?: Uint8Array
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryPacketCommitmentsRequest = {
  port_id?: string
  channel_id?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryPacketCommitmentsResponse = {
  commitments?: IbcCoreChannelV1Channel.PacketState[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
  height?: IbcCoreClientV1Client.Height
}

export type QueryPacketReceiptRequest = {
  port_id?: string
  channel_id?: string
  sequence?: string
}

export type QueryPacketReceiptResponse = {
  received?: boolean
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryPacketAcknowledgementRequest = {
  port_id?: string
  channel_id?: string
  sequence?: string
}

export type QueryPacketAcknowledgementResponse = {
  acknowledgement?: Uint8Array
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export type QueryPacketAcknowledgementsRequest = {
  port_id?: string
  channel_id?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
  packet_commitment_sequences?: string[]
}

export type QueryPacketAcknowledgementsResponse = {
  acknowledgements?: IbcCoreChannelV1Channel.PacketState[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
  height?: IbcCoreClientV1Client.Height
}

export type QueryUnreceivedPacketsRequest = {
  port_id?: string
  channel_id?: string
  packet_commitment_sequences?: string[]
}

export type QueryUnreceivedPacketsResponse = {
  sequences?: string[]
  height?: IbcCoreClientV1Client.Height
}

export type QueryUnreceivedAcksRequest = {
  port_id?: string
  channel_id?: string
  packet_ack_sequences?: string[]
}

export type QueryUnreceivedAcksResponse = {
  sequences?: string[]
  height?: IbcCoreClientV1Client.Height
}

export type QueryNextSequenceReceiveRequest = {
  port_id?: string
  channel_id?: string
}

export type QueryNextSequenceReceiveResponse = {
  next_sequence_receive?: string
  proof?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
}

export class Query {
  static Channel(req: QueryChannelRequest, initReq?: fm.InitReq): Promise<QueryChannelResponse> {
    return fm.fetchReq<QueryChannelRequest, QueryChannelResponse>(`/ibc/core/channel/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}?${fm.renderURLSearchParams(req, ["channel_id", "port_id"])}`, {...initReq, method: "GET"})
  }
  static Channels(req: QueryChannelsRequest, initReq?: fm.InitReq): Promise<QueryChannelsResponse> {
    return fm.fetchReq<QueryChannelsRequest, QueryChannelsResponse>(`/ibc/core/channel/v1/channels?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static ConnectionChannels(req: QueryConnectionChannelsRequest, initReq?: fm.InitReq): Promise<QueryConnectionChannelsResponse> {
    return fm.fetchReq<QueryConnectionChannelsRequest, QueryConnectionChannelsResponse>(`/ibc/core/channel/v1/connections/${req["connection"]}/channels?${fm.renderURLSearchParams(req, ["connection"])}`, {...initReq, method: "GET"})
  }
  static ChannelClientState(req: QueryChannelClientStateRequest, initReq?: fm.InitReq): Promise<QueryChannelClientStateResponse> {
    return fm.fetchReq<QueryChannelClientStateRequest, QueryChannelClientStateResponse>(`/ibc/core/channel/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/client_state?${fm.renderURLSearchParams(req, ["channel_id", "port_id"])}`, {...initReq, method: "GET"})
  }
  static ChannelConsensusState(req: QueryChannelConsensusStateRequest, initReq?: fm.InitReq): Promise<QueryChannelConsensusStateResponse> {
    return fm.fetchReq<QueryChannelConsensusStateRequest, QueryChannelConsensusStateResponse>(`/ibc/core/channel/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/consensus_state/revision/${req["revision_number"]}/height/${req["revision_height"]}?${fm.renderURLSearchParams(req, ["channel_id", "port_id", "revision_number", "revision_height"])}`, {...initReq, method: "GET"})
  }
  static PacketCommitment(req: QueryPacketCommitmentRequest, initReq?: fm.InitReq): Promise<QueryPacketCommitmentResponse> {
    return fm.fetchReq<QueryPacketCommitmentRequest, QueryPacketCommitmentResponse>(`/ibc/core/channel/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/packet_commitments/${req["sequence"]}?${fm.renderURLSearchParams(req, ["channel_id", "port_id", "sequence"])}`, {...initReq, method: "GET"})
  }
  static PacketCommitments(req: QueryPacketCommitmentsRequest, initReq?: fm.InitReq): Promise<QueryPacketCommitmentsResponse> {
    return fm.fetchReq<QueryPacketCommitmentsRequest, QueryPacketCommitmentsResponse>(`/ibc/core/channel/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/packet_commitments?${fm.renderURLSearchParams(req, ["channel_id", "port_id"])}`, {...initReq, method: "GET"})
  }
  static PacketReceipt(req: QueryPacketReceiptRequest, initReq?: fm.InitReq): Promise<QueryPacketReceiptResponse> {
    return fm.fetchReq<QueryPacketReceiptRequest, QueryPacketReceiptResponse>(`/ibc/core/channel/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/packet_receipts/${req["sequence"]}?${fm.renderURLSearchParams(req, ["channel_id", "port_id", "sequence"])}`, {...initReq, method: "GET"})
  }
  static PacketAcknowledgement(req: QueryPacketAcknowledgementRequest, initReq?: fm.InitReq): Promise<QueryPacketAcknowledgementResponse> {
    return fm.fetchReq<QueryPacketAcknowledgementRequest, QueryPacketAcknowledgementResponse>(`/ibc/core/channel/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/packet_acks/${req["sequence"]}?${fm.renderURLSearchParams(req, ["channel_id", "port_id", "sequence"])}`, {...initReq, method: "GET"})
  }
  static PacketAcknowledgements(req: QueryPacketAcknowledgementsRequest, initReq?: fm.InitReq): Promise<QueryPacketAcknowledgementsResponse> {
    return fm.fetchReq<QueryPacketAcknowledgementsRequest, QueryPacketAcknowledgementsResponse>(`/ibc/core/channel/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/packet_acknowledgements?${fm.renderURLSearchParams(req, ["channel_id", "port_id"])}`, {...initReq, method: "GET"})
  }
  static UnreceivedPackets(req: QueryUnreceivedPacketsRequest, initReq?: fm.InitReq): Promise<QueryUnreceivedPacketsResponse> {
    return fm.fetchReq<QueryUnreceivedPacketsRequest, QueryUnreceivedPacketsResponse>(`/ibc/core/channel/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/packet_commitments/${req["packet_commitment_sequences"]}/unreceived_packets?${fm.renderURLSearchParams(req, ["channel_id", "port_id", "packet_commitment_sequences"])}`, {...initReq, method: "GET"})
  }
  static UnreceivedAcks(req: QueryUnreceivedAcksRequest, initReq?: fm.InitReq): Promise<QueryUnreceivedAcksResponse> {
    return fm.fetchReq<QueryUnreceivedAcksRequest, QueryUnreceivedAcksResponse>(`/ibc/core/channel/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/packet_commitments/${req["packet_ack_sequences"]}/unreceived_acks?${fm.renderURLSearchParams(req, ["channel_id", "port_id", "packet_ack_sequences"])}`, {...initReq, method: "GET"})
  }
  static NextSequenceReceive(req: QueryNextSequenceReceiveRequest, initReq?: fm.InitReq): Promise<QueryNextSequenceReceiveResponse> {
    return fm.fetchReq<QueryNextSequenceReceiveRequest, QueryNextSequenceReceiveResponse>(`/ibc/core/channel/v1/channels/${req["channel_id"]}/ports/${req["port_id"]}/next_sequence?${fm.renderURLSearchParams(req, ["channel_id", "port_id"])}`, {...initReq, method: "GET"})
  }
}