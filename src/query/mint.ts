import {
  Query,
  QueryAnnualProvisionsRequest,
  QueryAnnualProvisionsResponse,
  QueryInflationRequest,
  QueryInflationResponse,
  QueryParamsRequest,
  QueryParamsResponse,
} from "../grpc_gateway/cosmos/mint/v1beta1/query.pb";

export class MintQuerier {
  constructor(private url: string) {}

  Params(
    req: QueryParamsRequest,
    headers?: HeadersInit,
  ): Promise<QueryParamsResponse> {
    return Query.Params(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  Inflation(
    req: QueryInflationRequest,
    headers?: HeadersInit,
  ): Promise<QueryInflationResponse> {
    return Query.Inflation(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  AnnualProvisions(
    req: QueryAnnualProvisionsRequest,
    headers?: HeadersInit,
  ): Promise<QueryAnnualProvisionsResponse> {
    return Query.AnnualProvisions(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
