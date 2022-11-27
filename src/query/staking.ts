import {
  Query,
  QueryDelegationRequest,
  QueryDelegationResponse,
  QueryDelegatorDelegationsRequest,
  QueryDelegatorDelegationsResponse,
  QueryDelegatorUnbondingDelegationsRequest,
  QueryDelegatorUnbondingDelegationsResponse,
  QueryDelegatorValidatorRequest,
  QueryDelegatorValidatorResponse,
  QueryDelegatorValidatorsRequest,
  QueryDelegatorValidatorsResponse,
  QueryHistoricalInfoRequest,
  QueryHistoricalInfoResponse,
  QueryParamsRequest,
  QueryParamsResponse,
  QueryPoolRequest,
  QueryPoolResponse,
  QueryRedelegationsRequest,
  QueryRedelegationsResponse,
  QueryUnbondingDelegationRequest,
  QueryUnbondingDelegationResponse,
  QueryValidatorDelegationsRequest,
  QueryValidatorDelegationsResponse,
  QueryValidatorRequest,
  QueryValidatorResponse,
  QueryValidatorsRequest,
  QueryValidatorsResponse,
  QueryValidatorUnbondingDelegationsRequest,
  QueryValidatorUnbondingDelegationsResponse,
} from "../grpc_gateway/cosmos/staking/v1beta1/query.pb";

export class StakingQuerier {
  constructor(private url: string) {}

  validators(
    req: QueryValidatorsRequest,
    headers?: HeadersInit,
  ): Promise<QueryValidatorsResponse> {
    return Query.Validators(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  validator(
    req: QueryValidatorRequest,
    headers?: HeadersInit,
  ): Promise<QueryValidatorResponse> {
    return Query.Validator(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  validatorDelegations(
    req: QueryValidatorDelegationsRequest,
    headers?: HeadersInit,
  ): Promise<QueryValidatorDelegationsResponse> {
    return Query.ValidatorDelegations(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  validatorUnbondingDelegations(
    req: QueryValidatorUnbondingDelegationsRequest,
    headers?: HeadersInit,
  ): Promise<QueryValidatorUnbondingDelegationsResponse> {
    return Query.ValidatorUnbondingDelegations(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  delegation(
    req: QueryDelegationRequest,
    headers?: HeadersInit,
  ): Promise<QueryDelegationResponse> {
    return Query.Delegation(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  unbondingDelegation(
    req: QueryUnbondingDelegationRequest,
    headers?: HeadersInit,
  ): Promise<QueryUnbondingDelegationResponse> {
    return Query.UnbondingDelegation(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  delegatorDelegations(
    req: QueryDelegatorDelegationsRequest,
    headers?: HeadersInit,
  ): Promise<QueryDelegatorDelegationsResponse> {
    return Query.DelegatorDelegations(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  delegatorUnbondingDelegations(
    req: QueryDelegatorUnbondingDelegationsRequest,
    headers?: HeadersInit,
  ): Promise<QueryDelegatorUnbondingDelegationsResponse> {
    return Query.DelegatorUnbondingDelegations(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  redelegations(
    req: QueryRedelegationsRequest,
    headers?: HeadersInit,
  ): Promise<QueryRedelegationsResponse> {
    return Query.Redelegations(req, {
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

  delegatorValidator(
    req: QueryDelegatorValidatorRequest,
    headers?: HeadersInit,
  ): Promise<QueryDelegatorValidatorResponse> {
    return Query.DelegatorValidator(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  historicalInfo(
    req: QueryHistoricalInfoRequest,
    headers?: HeadersInit,
  ): Promise<QueryHistoricalInfoResponse> {
    return Query.HistoricalInfo(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  pool(
    req: QueryPoolRequest,
    headers?: HeadersInit,
  ): Promise<QueryPoolResponse> {
    return Query.Pool(req, {
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
}
