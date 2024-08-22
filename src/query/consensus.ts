import {
    Query,
    QueryParamsRequest,
    QueryParamsResponse,
} from "../grpc_gateway/cosmos/consensus/v1/query.pb";

export class ConsensusQuerier {
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
