import {
  Query,
  QueryParamsRequest,
  QueryParamsResponse,
  QuerySubspacesRequest,
  QuerySubspacesResponse,
} from "../grpc_gateway/cosmos/params/v1beta1/query.pb";

export class ParamsQuerier {
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

  subspaces(
    req: QuerySubspacesRequest,
    headers?: HeadersInit,
  ): Promise<QuerySubspacesResponse> {
    return Query.Subspaces(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
