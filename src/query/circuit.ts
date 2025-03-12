import {
  Query,
  QueryAccountRequest,
  AccountResponse,
  QueryAccountsRequest,
  AccountsResponse,
  QueryDisabledListRequest,
  DisabledListResponse,
} from "../grpc_gateway/cosmos/circuit/v1/query.pb";

export class CircuitQuerier {
  constructor(private url: string) {}

  account(
    req: QueryAccountRequest,
    headers?: HeadersInit,
  ): Promise<AccountResponse> {
    return Query.Account(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  accounts(
    req: QueryAccountsRequest,
    headers?: HeadersInit,
  ): Promise<AccountsResponse> {
    return Query.Accounts(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  disabledList(
    req: QueryDisabledListRequest,
    headers?: HeadersInit,
  ): Promise<DisabledListResponse> {
    return Query.DisabledList(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
