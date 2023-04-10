import {
  Query,
  QueryParamsRequest,
  QueryParamsResponse,
} from "../grpc_gateway/ibc/applications/packetforward/v1/query.pb";

export class IbcPacketForwardQuerier {
  constructor(private url: string) {}

  params(
    req: QueryParamsRequest,
    headers?: HeadersInit,
  ): Promise<QueryParamsResponse> {
    return Query.Params(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
