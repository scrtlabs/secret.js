/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
import * as CosmosDistributionV1beta1Distribution from "./distribution.pb"
export type QueryRestakeEntriesRequest = {
  delegator?: string
}

export type QueryRestakingEntriesResponse = {
  validators?: string[]
}

export type QueryRestakeThresholdRequest = {
}

export type QueryRestakeThresholdResponse = {
  threshold?: string
}

export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: CosmosDistributionV1beta1Distribution.Params
}

export type QueryValidatorDistributionInfoRequest = {
  validator_address?: string
}

export type QueryValidatorDistributionInfoResponse = {
  operator_address?: string
  self_bond_rewards?: CosmosBaseV1beta1Coin.DecCoin[]
  commission?: CosmosBaseV1beta1Coin.DecCoin[]
}

export type QueryValidatorOutstandingRewardsRequest = {
  validator_address?: string
}

export type QueryValidatorOutstandingRewardsResponse = {
  rewards?: CosmosDistributionV1beta1Distribution.ValidatorOutstandingRewards
}

export type QueryValidatorCommissionRequest = {
  validator_address?: string
}

export type QueryValidatorCommissionResponse = {
  commission?: CosmosDistributionV1beta1Distribution.ValidatorAccumulatedCommission
}

export type QueryValidatorSlashesRequest = {
  validator_address?: string
  starting_height?: string
  ending_height?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryValidatorSlashesResponse = {
  slashes?: CosmosDistributionV1beta1Distribution.ValidatorSlashEvent[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryDelegationRewardsRequest = {
  delegator_address?: string
  validator_address?: string
}

export type QueryDelegationRewardsResponse = {
  rewards?: CosmosBaseV1beta1Coin.DecCoin[]
}

export type QueryDelegationTotalRewardsRequest = {
  delegator_address?: string
}

export type QueryDelegationTotalRewardsResponse = {
  rewards?: CosmosDistributionV1beta1Distribution.DelegationDelegatorReward[]
  total?: CosmosBaseV1beta1Coin.DecCoin[]
}

export type QueryDelegatorValidatorsRequest = {
  delegator_address?: string
}

export type QueryDelegatorValidatorsResponse = {
  validators?: string[]
}

export type QueryDelegatorWithdrawAddressRequest = {
  delegator_address?: string
}

export type QueryDelegatorWithdrawAddressResponse = {
  withdraw_address?: string
}

export type QueryFoundationTaxRequest = {
}

export type QueryFoundationTaxResponse = {
  tax?: string
  foundation_address?: string
}

export type QueryCommunityPoolRequest = {
}

export type QueryCommunityPoolResponse = {
  pool?: CosmosBaseV1beta1Coin.DecCoin[]
}

export class Query {
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/cosmos/distribution/v1beta1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static ValidatorDistributionInfo(req: QueryValidatorDistributionInfoRequest, initReq?: fm.InitReq): Promise<QueryValidatorDistributionInfoResponse> {
    return fm.fetchReq<QueryValidatorDistributionInfoRequest, QueryValidatorDistributionInfoResponse>(`/cosmos/distribution/v1beta1/validators/${req["validator_address"]}?${fm.renderURLSearchParams(req, ["validator_address"])}`, {...initReq, method: "GET"})
  }
  static ValidatorOutstandingRewards(req: QueryValidatorOutstandingRewardsRequest, initReq?: fm.InitReq): Promise<QueryValidatorOutstandingRewardsResponse> {
    return fm.fetchReq<QueryValidatorOutstandingRewardsRequest, QueryValidatorOutstandingRewardsResponse>(`/cosmos/distribution/v1beta1/validators/${req["validator_address"]}/outstanding_rewards?${fm.renderURLSearchParams(req, ["validator_address"])}`, {...initReq, method: "GET"})
  }
  static ValidatorCommission(req: QueryValidatorCommissionRequest, initReq?: fm.InitReq): Promise<QueryValidatorCommissionResponse> {
    return fm.fetchReq<QueryValidatorCommissionRequest, QueryValidatorCommissionResponse>(`/cosmos/distribution/v1beta1/validators/${req["validator_address"]}/commission?${fm.renderURLSearchParams(req, ["validator_address"])}`, {...initReq, method: "GET"})
  }
  static ValidatorSlashes(req: QueryValidatorSlashesRequest, initReq?: fm.InitReq): Promise<QueryValidatorSlashesResponse> {
    return fm.fetchReq<QueryValidatorSlashesRequest, QueryValidatorSlashesResponse>(`/cosmos/distribution/v1beta1/validators/${req["validator_address"]}/slashes?${fm.renderURLSearchParams(req, ["validator_address"])}`, {...initReq, method: "GET"})
  }
  static DelegationRewards(req: QueryDelegationRewardsRequest, initReq?: fm.InitReq): Promise<QueryDelegationRewardsResponse> {
    return fm.fetchReq<QueryDelegationRewardsRequest, QueryDelegationRewardsResponse>(`/cosmos/distribution/v1beta1/delegators/${req["delegator_address"]}/rewards/${req["validator_address"]}?${fm.renderURLSearchParams(req, ["delegator_address", "validator_address"])}`, {...initReq, method: "GET"})
  }
  static DelegationTotalRewards(req: QueryDelegationTotalRewardsRequest, initReq?: fm.InitReq): Promise<QueryDelegationTotalRewardsResponse> {
    return fm.fetchReq<QueryDelegationTotalRewardsRequest, QueryDelegationTotalRewardsResponse>(`/cosmos/distribution/v1beta1/delegators/${req["delegator_address"]}/rewards?${fm.renderURLSearchParams(req, ["delegator_address"])}`, {...initReq, method: "GET"})
  }
  static DelegatorValidators(req: QueryDelegatorValidatorsRequest, initReq?: fm.InitReq): Promise<QueryDelegatorValidatorsResponse> {
    return fm.fetchReq<QueryDelegatorValidatorsRequest, QueryDelegatorValidatorsResponse>(`/cosmos/distribution/v1beta1/delegators/${req["delegator_address"]}/validators?${fm.renderURLSearchParams(req, ["delegator_address"])}`, {...initReq, method: "GET"})
  }
  static DelegatorWithdrawAddress(req: QueryDelegatorWithdrawAddressRequest, initReq?: fm.InitReq): Promise<QueryDelegatorWithdrawAddressResponse> {
    return fm.fetchReq<QueryDelegatorWithdrawAddressRequest, QueryDelegatorWithdrawAddressResponse>(`/cosmos/distribution/v1beta1/delegators/${req["delegator_address"]}/withdraw_address?${fm.renderURLSearchParams(req, ["delegator_address"])}`, {...initReq, method: "GET"})
  }
  static CommunityPool(req: QueryCommunityPoolRequest, initReq?: fm.InitReq): Promise<QueryCommunityPoolResponse> {
    return fm.fetchReq<QueryCommunityPoolRequest, QueryCommunityPoolResponse>(`/cosmos/distribution/v1beta1/community_pool?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static FoundationTax(req: QueryFoundationTaxRequest, initReq?: fm.InitReq): Promise<QueryFoundationTaxResponse> {
    return fm.fetchReq<QueryFoundationTaxRequest, QueryFoundationTaxResponse>(`/cosmos/distribution/v1beta1/foundation_tax?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static RestakeThreshold(req: QueryRestakeThresholdRequest, initReq?: fm.InitReq): Promise<QueryRestakeThresholdResponse> {
    return fm.fetchReq<QueryRestakeThresholdRequest, QueryRestakeThresholdResponse>(`/cosmos/distribution/v1beta1/restake_threshold?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static RestakingEntries(req: QueryRestakeEntriesRequest, initReq?: fm.InitReq): Promise<QueryRestakingEntriesResponse> {
    return fm.fetchReq<QueryRestakeEntriesRequest, QueryRestakingEntriesResponse>(`/cosmos/distribution/v1beta1/restake_entries?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}