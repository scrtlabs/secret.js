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
} from "../grpc_gateway/cosmos/bank/v1beta1/query.pb";

export class BankQuerier {
  constructor(private url: string) {}

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
