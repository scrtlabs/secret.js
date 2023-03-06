import {
  Query,
  QueryInterchainAccountRequest,
  QueryInterchainAccountResponse,
  QueryParamsRequest,
  QueryParamsResponse,
} from "../grpc_gateway/ibc/applications/interchain_accounts/controller/v1/query.pb";

export class IbcInterchainAccountsControllerQuerier {
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

  interchainAccount(
    req: QueryInterchainAccountRequest,
    headers?: HeadersInit,
  ): Promise<QueryInterchainAccountResponse> {
    return Query.InterchainAccount(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
