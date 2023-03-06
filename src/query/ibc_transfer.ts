import {
  QueryDenomHashRequest,
  QueryDenomHashResponse,
  QueryDenomTraceRequest,
  QueryDenomTraceResponse,
  QueryDenomTracesRequest,
  QueryDenomTracesResponse,
  QueryParamsRequest,
  QueryParamsResponse,
  Query,
  QueryEscrowAddressRequest,
  QueryEscrowAddressResponse,
} from "../grpc_gateway/ibc/applications/transfer/v1/query.pb";

export class IbcTransferQuerier {
  constructor(private url: string) {}

  denomTrace(
    req: QueryDenomTraceRequest,
    headers?: HeadersInit,
  ): Promise<QueryDenomTraceResponse> {
    return Query.DenomTrace(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  denomTraces(
    req: QueryDenomTracesRequest,
    headers?: HeadersInit,
  ): Promise<QueryDenomTracesResponse> {
    return Query.DenomTraces(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  params(
    req: QueryParamsRequest,
    headers?: HeadersInit,
  ): Promise<QueryParamsResponse> {
    return Query.Params(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  denomHash(
    req: QueryDenomHashRequest,
    headers?: HeadersInit,
  ): Promise<QueryDenomHashResponse> {
    return Query.DenomHash(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  escrowAddress(
    req: QueryEscrowAddressRequest,
    headers?: HeadersInit,
  ): Promise<QueryEscrowAddressResponse> {
    return Query.EscrowAddress(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
