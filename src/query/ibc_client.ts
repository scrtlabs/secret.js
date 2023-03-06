import {
  Query,
  QueryClientParamsRequest,
  QueryClientParamsResponse,
  QueryClientStateRequest,
  QueryClientStateResponse,
  QueryClientStatesRequest,
  QueryClientStatesResponse,
  QueryClientStatusRequest,
  QueryClientStatusResponse,
  QueryConsensusStateHeightsRequest,
  QueryConsensusStateHeightsResponse,
  QueryConsensusStateRequest,
  QueryConsensusStateResponse,
  QueryConsensusStatesRequest,
  QueryConsensusStatesResponse,
  QueryUpgradedClientStateRequest,
  QueryUpgradedClientStateResponse,
  QueryUpgradedConsensusStateRequest,
  QueryUpgradedConsensusStateResponse,
} from "../grpc_gateway/ibc/core/client/v1/query.pb";

export class IbcClientQuerier {
  constructor(private url: string) {}

  clientState(
    req: QueryClientStateRequest,
    headers?: HeadersInit,
  ): Promise<QueryClientStateResponse> {
    return Query.ClientState(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  clientStates(
    req: QueryClientStatesRequest,
    headers?: HeadersInit,
  ): Promise<QueryClientStatesResponse> {
    return Query.ClientStates(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  consensusState(
    req: QueryConsensusStateRequest,
    headers?: HeadersInit,
  ): Promise<QueryConsensusStateResponse> {
    return Query.ConsensusState(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  consensusStates(
    req: QueryConsensusStatesRequest,
    headers?: HeadersInit,
  ): Promise<QueryConsensusStatesResponse> {
    return Query.ConsensusStates(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  clientStatus(
    req: QueryClientStatusRequest,
    headers?: HeadersInit,
  ): Promise<QueryClientStatusResponse> {
    return Query.ClientStatus(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  clientParams(
    req: QueryClientParamsRequest,
    headers?: HeadersInit,
  ): Promise<QueryClientParamsResponse> {
    return Query.ClientParams(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  upgradedClientState(
    req: QueryUpgradedClientStateRequest,
    headers?: HeadersInit,
  ): Promise<QueryUpgradedClientStateResponse> {
    return Query.UpgradedClientState(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  upgradedConsensusState(
    req: QueryUpgradedConsensusStateRequest,
    headers?: HeadersInit,
  ): Promise<QueryUpgradedConsensusStateResponse> {
    return Query.UpgradedConsensusState(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  consensusStateHeights(
    req: QueryConsensusStateHeightsRequest,
    headers?: HeadersInit,
  ): Promise<QueryConsensusStateHeightsResponse> {
    return Query.ConsensusStateHeights(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
