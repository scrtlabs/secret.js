// For future wanderers:
// This file is written manually with a few goals in mind:
// 1. Proxy the auto-generated QueryClientImpl from "src/protobuf/cosmos/auth/v1beta1/query.tx" (See the "scripts/generate_protobuf.sh" script)
// 2. Convert the "account: Any" in the underlying types to the acctual account type

import {
  BaseAccount,
  ModuleAccount,
} from "../grpc_gateway/cosmos/auth/v1beta1/auth.pb";
import {
  Query,
  QueryAccountRequest,
  QueryAccountsRequest,
  QueryParamsRequest,
  QueryParamsResponse,
} from "../grpc_gateway/cosmos/auth/v1beta1/query.pb";
import { PageResponse } from "../grpc_gateway/cosmos/base/query/v1beta1/pagination.pb";
import {
  ContinuousVestingAccount,
  DelayedVestingAccount,
} from "../grpc_gateway/cosmos/vesting/v1beta1/vesting.pb";
import { QueryModuleAccountByNameRequest } from "../protobuf/cosmos/auth/v1beta1/query";

export type Account = {
  "@type":
    | "/cosmos.auth.v1beta1.BaseAccount"
    | "/cosmos.auth.v1beta1.ModuleAccount"
    | "/cosmos.vesting.v1beta1.ContinuousVestingAccount"
    | "/cosmos.vesting.v1beta1.DelayedVestingAccount";
} & (
  | BaseAccount
  | ModuleAccount
  | ContinuousVestingAccount
  | DelayedVestingAccount
);

/** AuthQuerier is the query interface for the x/auth module */
export class AuthQuerier {
  constructor(private url: string) {}

  async accounts(
    req: QueryAccountsRequest,
    headers?: HeadersInit,
  ): Promise<{
    accounts?: Account[];
    pagination?: PageResponse;
  }> {
    //@ts-ignore
    return Query.Accounts(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  async account(
    req: QueryAccountRequest,
    headers?: HeadersInit,
  ): Promise<{ account?: Account }> {
    //@ts-ignore
    return Query.Account(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  async params(
    req: QueryParamsRequest,
    headers?: HeadersInit,
  ): Promise<QueryParamsResponse> {
    return Query.Params(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  async moduleAccountByName(
    req: QueryModuleAccountByNameRequest,
    headers?: HeadersInit,
  ): Promise<{ account?: Account }> {
    //@ts-ignore
    return Query.ModuleAccountByName(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
