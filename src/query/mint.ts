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

  params(
    req: QueryParamsRequest,
    headers?: HeadersInit,
  ): Promise<QueryParamsResponse> {
    return Query.Params(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  inflation(
    req: QueryInflationRequest,
    headers?: HeadersInit,
  ): Promise<QueryInflationResponse> {
    return Query.Inflation(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  annualProvisions(
    req: QueryAnnualProvisionsRequest,
    headers?: HeadersInit,
  ): Promise<QueryAnnualProvisionsResponse> {
    return Query.AnnualProvisions(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
