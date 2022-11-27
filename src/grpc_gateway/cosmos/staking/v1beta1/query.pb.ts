/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosStakingV1beta1Staking from "./staking.pb"
export type QueryValidatorsRequest = {
  status?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryValidatorsResponse = {
  validators?: CosmosStakingV1beta1Staking.Validator[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryValidatorRequest = {
  validator_addr?: string
}

export type QueryValidatorResponse = {
  validator?: CosmosStakingV1beta1Staking.Validator
}

export type QueryValidatorDelegationsRequest = {
  validator_addr?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryValidatorDelegationsResponse = {
  delegation_responses?: CosmosStakingV1beta1Staking.DelegationResponse[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryValidatorUnbondingDelegationsRequest = {
  validator_addr?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryValidatorUnbondingDelegationsResponse = {
  unbonding_responses?: CosmosStakingV1beta1Staking.UnbondingDelegation[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryDelegationRequest = {
  delegator_addr?: string
  validator_addr?: string
}

export type QueryDelegationResponse = {
  delegation_response?: CosmosStakingV1beta1Staking.DelegationResponse
}

export type QueryUnbondingDelegationRequest = {
  delegator_addr?: string
  validator_addr?: string
}

export type QueryUnbondingDelegationResponse = {
  unbond?: CosmosStakingV1beta1Staking.UnbondingDelegation
}

export type QueryDelegatorDelegationsRequest = {
  delegator_addr?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryDelegatorDelegationsResponse = {
  delegation_responses?: CosmosStakingV1beta1Staking.DelegationResponse[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryDelegatorUnbondingDelegationsRequest = {
  delegator_addr?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryDelegatorUnbondingDelegationsResponse = {
  unbonding_responses?: CosmosStakingV1beta1Staking.UnbondingDelegation[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryRedelegationsRequest = {
  delegator_addr?: string
  src_validator_addr?: string
  dst_validator_addr?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryRedelegationsResponse = {
  redelegation_responses?: CosmosStakingV1beta1Staking.RedelegationResponse[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryDelegatorValidatorsRequest = {
  delegator_addr?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryDelegatorValidatorsResponse = {
  validators?: CosmosStakingV1beta1Staking.Validator[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryDelegatorValidatorRequest = {
  delegator_addr?: string
  validator_addr?: string
}

export type QueryDelegatorValidatorResponse = {
  validator?: CosmosStakingV1beta1Staking.Validator
}

export type QueryHistoricalInfoRequest = {
  height?: string
}

export type QueryHistoricalInfoResponse = {
  hist?: CosmosStakingV1beta1Staking.HistoricalInfo
}

export type QueryPoolRequest = {
}

export type QueryPoolResponse = {
  pool?: CosmosStakingV1beta1Staking.Pool
}

export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: CosmosStakingV1beta1Staking.Params
}

export class Query {
  static Validators(req: QueryValidatorsRequest, initReq?: fm.InitReq): Promise<QueryValidatorsResponse> {
    return fm.fetchReq<QueryValidatorsRequest, QueryValidatorsResponse>(`/cosmos/staking/v1beta1/validators?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static Validator(req: QueryValidatorRequest, initReq?: fm.InitReq): Promise<QueryValidatorResponse> {
    return fm.fetchReq<QueryValidatorRequest, QueryValidatorResponse>(`/cosmos/staking/v1beta1/validators/${req["validator_addr"]}?${fm.renderURLSearchParams(req, ["validator_addr"])}`, {...initReq, method: "GET"})
  }
  static ValidatorDelegations(req: QueryValidatorDelegationsRequest, initReq?: fm.InitReq): Promise<QueryValidatorDelegationsResponse> {
    return fm.fetchReq<QueryValidatorDelegationsRequest, QueryValidatorDelegationsResponse>(`/cosmos/staking/v1beta1/validators/${req["validator_addr"]}/delegations?${fm.renderURLSearchParams(req, ["validator_addr"])}`, {...initReq, method: "GET"})
  }
  static ValidatorUnbondingDelegations(req: QueryValidatorUnbondingDelegationsRequest, initReq?: fm.InitReq): Promise<QueryValidatorUnbondingDelegationsResponse> {
    return fm.fetchReq<QueryValidatorUnbondingDelegationsRequest, QueryValidatorUnbondingDelegationsResponse>(`/cosmos/staking/v1beta1/validators/${req["validator_addr"]}/unbonding_delegations?${fm.renderURLSearchParams(req, ["validator_addr"])}`, {...initReq, method: "GET"})
  }
  static Delegation(req: QueryDelegationRequest, initReq?: fm.InitReq): Promise<QueryDelegationResponse> {
    return fm.fetchReq<QueryDelegationRequest, QueryDelegationResponse>(`/cosmos/staking/v1beta1/validators/${req["validator_addr"]}/delegations/${req["delegator_addr"]}?${fm.renderURLSearchParams(req, ["validator_addr", "delegator_addr"])}`, {...initReq, method: "GET"})
  }
  static UnbondingDelegation(req: QueryUnbondingDelegationRequest, initReq?: fm.InitReq): Promise<QueryUnbondingDelegationResponse> {
    return fm.fetchReq<QueryUnbondingDelegationRequest, QueryUnbondingDelegationResponse>(`/cosmos/staking/v1beta1/validators/${req["validator_addr"]}/delegations/${req["delegator_addr"]}/unbonding_delegation?${fm.renderURLSearchParams(req, ["validator_addr", "delegator_addr"])}`, {...initReq, method: "GET"})
  }
  static DelegatorDelegations(req: QueryDelegatorDelegationsRequest, initReq?: fm.InitReq): Promise<QueryDelegatorDelegationsResponse> {
    return fm.fetchReq<QueryDelegatorDelegationsRequest, QueryDelegatorDelegationsResponse>(`/cosmos/staking/v1beta1/delegations/${req["delegator_addr"]}?${fm.renderURLSearchParams(req, ["delegator_addr"])}`, {...initReq, method: "GET"})
  }
  static DelegatorUnbondingDelegations(req: QueryDelegatorUnbondingDelegationsRequest, initReq?: fm.InitReq): Promise<QueryDelegatorUnbondingDelegationsResponse> {
    return fm.fetchReq<QueryDelegatorUnbondingDelegationsRequest, QueryDelegatorUnbondingDelegationsResponse>(`/cosmos/staking/v1beta1/delegators/${req["delegator_addr"]}/unbonding_delegations?${fm.renderURLSearchParams(req, ["delegator_addr"])}`, {...initReq, method: "GET"})
  }
  static Redelegations(req: QueryRedelegationsRequest, initReq?: fm.InitReq): Promise<QueryRedelegationsResponse> {
    return fm.fetchReq<QueryRedelegationsRequest, QueryRedelegationsResponse>(`/cosmos/staking/v1beta1/delegators/${req["delegator_addr"]}/redelegations?${fm.renderURLSearchParams(req, ["delegator_addr"])}`, {...initReq, method: "GET"})
  }
  static DelegatorValidators(req: QueryDelegatorValidatorsRequest, initReq?: fm.InitReq): Promise<QueryDelegatorValidatorsResponse> {
    return fm.fetchReq<QueryDelegatorValidatorsRequest, QueryDelegatorValidatorsResponse>(`/cosmos/staking/v1beta1/delegators/${req["delegator_addr"]}/validators?${fm.renderURLSearchParams(req, ["delegator_addr"])}`, {...initReq, method: "GET"})
  }
  static DelegatorValidator(req: QueryDelegatorValidatorRequest, initReq?: fm.InitReq): Promise<QueryDelegatorValidatorResponse> {
    return fm.fetchReq<QueryDelegatorValidatorRequest, QueryDelegatorValidatorResponse>(`/cosmos/staking/v1beta1/delegators/${req["delegator_addr"]}/validators/${req["validator_addr"]}?${fm.renderURLSearchParams(req, ["delegator_addr", "validator_addr"])}`, {...initReq, method: "GET"})
  }
  static HistoricalInfo(req: QueryHistoricalInfoRequest, initReq?: fm.InitReq): Promise<QueryHistoricalInfoResponse> {
    return fm.fetchReq<QueryHistoricalInfoRequest, QueryHistoricalInfoResponse>(`/cosmos/staking/v1beta1/historical_info/${req["height"]}?${fm.renderURLSearchParams(req, ["height"])}`, {...initReq, method: "GET"})
  }
  static Pool(req: QueryPoolRequest, initReq?: fm.InitReq): Promise<QueryPoolResponse> {
    return fm.fetchReq<QueryPoolRequest, QueryPoolResponse>(`/cosmos/staking/v1beta1/pool?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/cosmos/staking/v1beta1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}