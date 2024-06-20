import {
  Query,
  QueryChannelClientStateRequest,
  QueryChannelClientStateResponse,
  QueryChannelConsensusStateRequest,
  QueryChannelConsensusStateResponse,
  QueryChannelRequest,
  QueryChannelResponse,
  QueryChannelsRequest,
  QueryChannelsResponse,
  QueryConnectionChannelsRequest,
  QueryConnectionChannelsResponse,
  QueryNextSequenceReceiveRequest,
  QueryNextSequenceReceiveResponse,
  QueryPacketAcknowledgementRequest,
  QueryPacketAcknowledgementResponse,
  QueryPacketAcknowledgementsRequest,
  QueryPacketAcknowledgementsResponse,
  QueryPacketCommitmentRequest,
  QueryPacketCommitmentResponse,
  QueryPacketCommitmentsRequest,
  QueryPacketCommitmentsResponse,
  QueryPacketReceiptRequest,
  QueryPacketReceiptResponse,
  QueryUnreceivedAcksRequest,
  QueryUnreceivedAcksResponse,
  QueryUnreceivedPacketsRequest,
  QueryUnreceivedPacketsResponse,
  QueryChannelParamsRequest,
  QueryChannelParamsResponse,
  QueryNextSequenceSendRequest,
  QueryNextSequenceSendResponse,
  QueryUpgradeErrorRequest,
  QueryUpgradeErrorResponse,
  QueryUpgradeRequest,
  QueryUpgradeResponse,
} from "../grpc_gateway/ibc/core/channel/v1/query.pb";

export class IbcChannelQuerier {
  constructor(private url: string) {}

  channelParams(
    req: QueryChannelParamsRequest,
    headers?: HeadersInit,
  ): Promise<QueryChannelParamsResponse> {
    return Query.ChannelParams(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  nextSequenceSend(
    req: QueryNextSequenceSendRequest,
    headers?: HeadersInit,
  ): Promise<QueryNextSequenceSendResponse> {
    return Query.NextSequenceSend(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  upgradeError(
    req: QueryUpgradeErrorRequest,
    headers?: HeadersInit,
  ): Promise<QueryUpgradeErrorResponse> {
    return Query.UpgradeError(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  upgrade(
    req: QueryUpgradeRequest,
    headers?: HeadersInit,
  ): Promise<QueryUpgradeResponse> {
    return Query.Channel(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  channel(
    req: QueryChannelRequest,
    headers?: HeadersInit,
  ): Promise<QueryChannelResponse> {
    return Query.Channel(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  channels(
    req: QueryChannelsRequest,
    headers?: HeadersInit,
  ): Promise<QueryChannelsResponse> {
    return Query.Channels(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  connectionChannels(
    req: QueryConnectionChannelsRequest,
    headers?: HeadersInit,
  ): Promise<QueryConnectionChannelsResponse> {
    return Query.ConnectionChannels(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  channelClientState(
    req: QueryChannelClientStateRequest,
    headers?: HeadersInit,
  ): Promise<QueryChannelClientStateResponse> {
    return Query.ChannelClientState(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  channelConsensusState(
    req: QueryChannelConsensusStateRequest,
    headers?: HeadersInit,
  ): Promise<QueryChannelConsensusStateResponse> {
    return Query.ChannelConsensusState(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  packetCommitment(
    req: QueryPacketCommitmentRequest,
    headers?: HeadersInit,
  ): Promise<QueryPacketCommitmentResponse> {
    return Query.PacketCommitment(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  packetCommitments(
    req: QueryPacketCommitmentsRequest,
    headers?: HeadersInit,
  ): Promise<QueryPacketCommitmentsResponse> {
    return Query.PacketCommitments(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  packetReceipt(
    req: QueryPacketReceiptRequest,
    headers?: HeadersInit,
  ): Promise<QueryPacketReceiptResponse> {
    return Query.PacketReceipt(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  packetAcknowledgement(
    req: QueryPacketAcknowledgementRequest,
    headers?: HeadersInit,
  ): Promise<QueryPacketAcknowledgementResponse> {
    return Query.PacketAcknowledgement(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  packetAcknowledgements(
    req: QueryPacketAcknowledgementsRequest,
    headers?: HeadersInit,
  ): Promise<QueryPacketAcknowledgementsResponse> {
    return Query.PacketAcknowledgements(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  unreceivedPackets(
    req: QueryUnreceivedPacketsRequest,
    headers?: HeadersInit,
  ): Promise<QueryUnreceivedPacketsResponse> {
    return Query.UnreceivedPackets(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  unreceivedAcks(
    req: QueryUnreceivedAcksRequest,
    headers?: HeadersInit,
  ): Promise<QueryUnreceivedAcksResponse> {
    return Query.UnreceivedAcks(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  nextSequenceReceive(
    req: QueryNextSequenceReceiveRequest,
    headers?: HeadersInit,
  ): Promise<QueryNextSequenceReceiveResponse> {
    return Query.NextSequenceReceive(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
