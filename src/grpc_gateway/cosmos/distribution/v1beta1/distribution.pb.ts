/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
export type Params = {
  community_tax?: string
  base_proposer_reward?: string
  bonus_proposer_reward?: string
  withdraw_addr_enabled?: boolean
  secret_foundation_tax?: string
  secret_foundation_address?: string
  minimum_restake_threshold?: string
  restake_period?: string
}

export type ValidatorHistoricalRewards = {
  cumulative_reward_ratio?: CosmosBaseV1beta1Coin.DecCoin[]
  reference_count?: number
}

export type ValidatorCurrentRewards = {
  rewards?: CosmosBaseV1beta1Coin.DecCoin[]
  period?: string
}

export type ValidatorAccumulatedCommission = {
  commission?: CosmosBaseV1beta1Coin.DecCoin[]
}

export type ValidatorOutstandingRewards = {
  rewards?: CosmosBaseV1beta1Coin.DecCoin[]
}

export type ValidatorSlashEvent = {
  validator_period?: string
  fraction?: string
}

export type ValidatorSlashEvents = {
  validator_slash_events?: ValidatorSlashEvent[]
}

export type FeePool = {
  community_pool?: CosmosBaseV1beta1Coin.DecCoin[]
}

export type CommunityPoolSpendProposal = {
  title?: string
  description?: string
  recipient?: string
  amount?: CosmosBaseV1beta1Coin.Coin[]
}

export type DelegatorStartingInfo = {
  previous_period?: string
  stake?: string
  height?: string
}

export type DelegationDelegatorReward = {
  validator_address?: string
  reward?: CosmosBaseV1beta1Coin.DecCoin[]
}

export type CommunityPoolSpendProposalWithDeposit = {
  title?: string
  description?: string
  recipient?: string
  amount?: string
  deposit?: string
}