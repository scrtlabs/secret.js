import {
  Query,
  QueryClientConnectionsRequest,
  QueryClientConnectionsResponse,
  QueryConnectionClientStateRequest,
  QueryConnectionClientStateResponse,
  QueryConnectionConsensusStateRequest,
  QueryConnectionConsensusStateResponse,
  QueryConnectionRequest,
  QueryConnectionResponse,
  QueryConnectionsRequest,
  QueryConnectionsResponse,
} from "../grpc_gateway/ibc/core/connection/v1/query.pb";

export class IbcConnectionQuerier {
  constructor(private url: string) {}

  connection(
    req: QueryConnectionRequest,
    headers?: HeadersInit,
  ): Promise<QueryConnectionResponse> {
    return Query.Connection(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  connections(
    req: QueryConnectionsRequest,
    headers?: HeadersInit,
  ): Promise<QueryConnectionsResponse> {
    return Query.Connections(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  clientConnections(
    req: QueryClientConnectionsRequest,
    headers?: HeadersInit,
  ): Promise<QueryClientConnectionsResponse> {
    return Query.ClientConnections(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  connectionClientState(
    req: QueryConnectionClientStateRequest,
    headers?: HeadersInit,
  ): Promise<QueryConnectionClientStateResponse> {
    return Query.ConnectionClientState(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  connectionConsensusState(
    req: QueryConnectionConsensusStateRequest,
    headers?: HeadersInit,
  ): Promise<QueryConnectionConsensusStateResponse> {
    return Query.ConnectionConsensusState(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
