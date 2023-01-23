import {
  Query,
  QueryCommunityPoolRequest,
  QueryCommunityPoolResponse,
  QueryDelegationRewardsRequest,
  QueryDelegationRewardsResponse,
  QueryDelegationTotalRewardsRequest,
  QueryDelegationTotalRewardsResponse,
  QueryDelegatorValidatorsRequest,
  QueryDelegatorValidatorsResponse,
  QueryDelegatorWithdrawAddressRequest,
  QueryDelegatorWithdrawAddressResponse,
  QueryFoundationTaxRequest,
  QueryFoundationTaxResponse,
  QueryParamsRequest,
  QueryParamsResponse,
  QueryRestakeEntriesRequest,
  QueryRestakingEntriesResponse,
  QueryRestakeThresholdRequest,
  QueryRestakeThresholdResponse,
  QueryValidatorCommissionRequest,
  QueryValidatorCommissionResponse,
  QueryValidatorOutstandingRewardsRequest,
  QueryValidatorOutstandingRewardsResponse,
  QueryValidatorSlashesRequest,
  QueryValidatorSlashesResponse,
} from "../grpc_gateway/cosmos/distribution/v1beta1/query.pb";

export class DistributionQuerier {
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

  validatorOutstandingRewards(
    req: QueryValidatorOutstandingRewardsRequest,
    headers?: HeadersInit,
  ): Promise<QueryValidatorOutstandingRewardsResponse> {
    return Query.ValidatorOutstandingRewards(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  validatorCommission(
    req: QueryValidatorCommissionRequest,
    headers?: HeadersInit,
  ): Promise<QueryValidatorCommissionResponse> {
    return Query.ValidatorCommission(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  validatorSlashes(
    req: QueryValidatorSlashesRequest,
    headers?: HeadersInit,
  ): Promise<QueryValidatorSlashesResponse> {
    return Query.ValidatorSlashes(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  delegationRewards(
    req: QueryDelegationRewardsRequest,
    headers?: HeadersInit,
  ): Promise<QueryDelegationRewardsResponse> {
    return Query.DelegationRewards(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  delegationTotalRewards(
    req: QueryDelegationTotalRewardsRequest,
    headers?: HeadersInit,
  ): Promise<QueryDelegationTotalRewardsResponse> {
    return Query.DelegationTotalRewards(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  delegatorValidators(
    req: QueryDelegatorValidatorsRequest,
    headers?: HeadersInit,
  ): Promise<QueryDelegatorValidatorsResponse> {
    return Query.DelegatorValidators(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  delegatorWithdrawAddress(
    req: QueryDelegatorWithdrawAddressRequest,
    headers?: HeadersInit,
  ): Promise<QueryDelegatorWithdrawAddressResponse> {
    return Query.DelegatorWithdrawAddress(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  communityPool(
    req: QueryCommunityPoolRequest,
    headers?: HeadersInit,
  ): Promise<QueryCommunityPoolResponse> {
    return Query.CommunityPool(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  foundationTax(
    req: QueryFoundationTaxRequest,
    headers?: HeadersInit,
  ): Promise<QueryFoundationTaxResponse> {
    return Query.FoundationTax(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  restakeThreshold(
    req: QueryRestakeThresholdRequest,
    headers?: HeadersInit,
  ): Promise<QueryRestakeThresholdResponse> {
    return Query.RestakeThreshold(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  restakingEntries(
    req: QueryRestakeEntriesRequest,
    headers?: HeadersInit,
  ): Promise<QueryRestakingEntriesResponse> {
    return Query.RestakingEntries(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
