import {
  Query,
  QueryParamsRequest,
  QueryParamsResponse,
  QuerySigningInfoRequest,
  QuerySigningInfoResponse,
  QuerySigningInfosRequest,
  QuerySigningInfosResponse,
} from "../grpc_gateway/cosmos/slashing/v1beta1/query.pb";

export class SlashingQuerier {
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

  signingInfo(
    req: QuerySigningInfoRequest,
    headers?: HeadersInit,
  ): Promise<QuerySigningInfoResponse> {
    return Query.SigningInfo(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  signingInfos(
    req: QuerySigningInfosRequest,
    headers?: HeadersInit,
  ): Promise<QuerySigningInfosResponse> {
    return Query.SigningInfos(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
