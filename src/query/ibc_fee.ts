import {
  Query,
  QueryIncentivizedPacketsRequest,
  QueryIncentivizedPacketsResponse,
  QueryIncentivizedPacketRequest,
  QueryIncentivizedPacketResponse,
  QueryIncentivizedPacketsForChannelRequest,
  QueryIncentivizedPacketsForChannelResponse,
  QueryTotalRecvFeesRequest,
  QueryTotalRecvFeesResponse,
  QueryTotalAckFeesRequest,
  QueryTotalAckFeesResponse,
  QueryTotalTimeoutFeesRequest,
  QueryTotalTimeoutFeesResponse,
  QueryPayeeRequest,
  QueryPayeeResponse,
  QueryCounterpartyPayeeRequest,
  QueryCounterpartyPayeeResponse,
  QueryFeeEnabledChannelsRequest,
  QueryFeeEnabledChannelsResponse,
  QueryFeeEnabledChannelRequest,
  QueryFeeEnabledChannelResponse,
} from "../grpc_gateway/ibc/applications/fee/v1/query.pb";

export class IbcFeeQuerier {
  constructor(private url: string) {}

  incentivizedPackets(
    req: QueryIncentivizedPacketsRequest,
    headers?: HeadersInit,
  ): Promise<QueryIncentivizedPacketsResponse> {
    return Query.IncentivizedPackets(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  incentivizedPacket(
    req: QueryIncentivizedPacketRequest,
    headers?: HeadersInit,
  ): Promise<QueryIncentivizedPacketResponse> {
    return Query.IncentivizedPacket(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  incentivizedPacketsForChannel(
    req: QueryIncentivizedPacketsForChannelRequest,
    headers?: HeadersInit,
  ): Promise<QueryIncentivizedPacketsForChannelResponse> {
    return Query.IncentivizedPacketsForChannel(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  totalRecvFees(
    req: QueryTotalRecvFeesRequest,
    headers?: HeadersInit,
  ): Promise<QueryTotalRecvFeesResponse> {
    return Query.TotalRecvFees(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  totalAckFees(
    req: QueryTotalAckFeesRequest,
    headers?: HeadersInit,
  ): Promise<QueryTotalAckFeesResponse> {
    return Query.TotalAckFees(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  totalTimeoutFees(
    req: QueryTotalTimeoutFeesRequest,
    headers?: HeadersInit,
  ): Promise<QueryTotalTimeoutFeesResponse> {
    return Query.TotalTimeoutFees(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  payee(
    req: QueryPayeeRequest,
    headers?: HeadersInit,
  ): Promise<QueryPayeeResponse> {
    return Query.Payee(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  counterpartyPayee(
    req: QueryCounterpartyPayeeRequest,
    headers?: HeadersInit,
  ): Promise<QueryCounterpartyPayeeResponse> {
    return Query.CounterpartyPayee(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  feeEnabledChannels(
    req: QueryFeeEnabledChannelsRequest,
    headers?: HeadersInit,
  ): Promise<QueryFeeEnabledChannelsResponse> {
    return Query.FeeEnabledChannels(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  feeEnabledChannel(
    req: QueryFeeEnabledChannelRequest,
    headers?: HeadersInit,
  ): Promise<QueryFeeEnabledChannelResponse> {
    return Query.FeeEnabledChannel(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
