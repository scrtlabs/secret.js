import {
  Query,
  QueryGranteeGrantsRequest,
  QueryGranteeGrantsResponse,
  QueryGranterGrantsRequest,
  QueryGranterGrantsResponse,
  QueryGrantsRequest,
  QueryGrantsResponse,
} from "../grpc_gateway/cosmos/authz/v1beta1/query.pb";

export class AuthzQuerier {
  constructor(private url: string) {}

  grants(
    req: QueryGrantsRequest,
    headers?: HeadersInit,
  ): Promise<QueryGrantsResponse> {
    return Query.Grants(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  granterGrants(
    req: QueryGranterGrantsRequest,
    headers?: HeadersInit,
  ): Promise<QueryGranterGrantsResponse> {
    return Query.GranterGrants(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  granteeGrants(
    req: QueryGranteeGrantsRequest,
    headers?: HeadersInit,
  ): Promise<QueryGranteeGrantsResponse> {
    return Query.GranteeGrants(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
