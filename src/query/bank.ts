import {
  Query,
  QueryAllBalancesRequest,
  QueryAllBalancesResponse,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryDenomMetadataRequest,
  QueryDenomMetadataResponse,
  QueryDenomsMetadataRequest,
  QueryDenomsMetadataResponse,
  QueryParamsRequest,
  QueryParamsResponse,
  QuerySpendableBalancesRequest,
  QuerySpendableBalancesResponse,
  QuerySupplyOfRequest,
  QuerySupplyOfResponse,
  QueryTotalSupplyRequest,
  QueryTotalSupplyResponse,
  QuerySpendableBalanceByDenomRequest,
  QuerySpendableBalanceByDenomResponse,
  QueryDenomMetadataByQueryStringRequest,
  QueryDenomMetadataByQueryStringResponse,
  QueryDenomOwnersRequest,
  QueryDenomOwnersResponse,
  QueryDenomOwnersByQueryRequest,
  QueryDenomOwnersByQueryResponse,
  QuerySendEnabledRequest,
  QuerySendEnabledResponse,
} from "../grpc_gateway/cosmos/bank/v1beta1/query.pb";

export class BankQuerier {
  constructor(private url: string) {}

  spendableBalanceByDenom(
    req: QuerySpendableBalanceByDenomRequest,
    headers?: HeadersInit,
  ): Promise<QuerySpendableBalanceByDenomResponse> {
    return Query.SpendableBalanceByDenom(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  denomMetadataByQueryString(
    req: QueryDenomMetadataByQueryStringRequest,
    headers?: HeadersInit,
  ): Promise<QueryDenomMetadataByQueryStringResponse> {
    return Query.DenomMetadataByQueryString(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  denomOwners(
    req: QueryDenomOwnersRequest,
    headers?: HeadersInit,
  ): Promise<QueryDenomOwnersResponse> {
    return Query.DenomOwners(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  sendEnabled(
    req: QuerySendEnabledRequest,
    headers?: HeadersInit,
  ): Promise<QuerySendEnabledResponse> {
    return Query.SendEnabled(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  denomOwnersByQuery(
    req: QueryDenomOwnersByQueryRequest,
    headers?: HeadersInit,
  ): Promise<QueryDenomOwnersByQueryResponse> {
    return Query.DenomOwnersByQuery(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  balance(
    req: QueryBalanceRequest,
    headers?: HeadersInit,
  ): Promise<QueryBalanceResponse> {
    return Query.Balance(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  allBalances(
    req: QueryAllBalancesRequest,
    headers?: HeadersInit,
  ): Promise<QueryAllBalancesResponse> {
    return Query.AllBalances(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  spendableBalances(
    req: QuerySpendableBalancesRequest,
    headers?: HeadersInit,
  ): Promise<QuerySpendableBalancesResponse> {
    return Query.SpendableBalances(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  totalSupply(
    req: QueryTotalSupplyRequest,
    headers?: HeadersInit,
  ): Promise<QueryTotalSupplyResponse> {
    return Query.TotalSupply(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  supplyOf(
    req: QuerySupplyOfRequest,
    headers?: HeadersInit,
  ): Promise<QuerySupplyOfResponse> {
    return Query.SupplyOf(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  params(
    req: QueryParamsRequest,
    headers?: HeadersInit,
  ): Promise<QueryParamsResponse> {
    return Query.Params(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  denomMetadata(
    req: QueryDenomMetadataRequest,
    headers?: HeadersInit,
  ): Promise<QueryDenomMetadataResponse> {
    return Query.DenomMetadata(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  denomsMetadata(
    req: QueryDenomsMetadataRequest,
    headers?: HeadersInit,
  ): Promise<QueryDenomsMetadataResponse> {
    return Query.DenomsMetadata(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
