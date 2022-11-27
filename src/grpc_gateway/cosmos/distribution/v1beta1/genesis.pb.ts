/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
import * as CosmosDistributionV1beta1Distribution from "./distribution.pb"
export type DelegatorWithdrawInfo = {
  delegator_address?: string
  withdraw_address?: string
}

export type ValidatorOutstandingRewardsRecord = {
  validator_address?: string
  outstanding_rewards?: CosmosBaseV1beta1Coin.DecCoin[]
}

export type ValidatorAccumulatedCommissionRecord = {
  validator_address?: string
  accumulated?: CosmosDistributionV1beta1Distribution.ValidatorAccumulatedCommission
}

export type ValidatorHistoricalRewardsRecord = {
  validator_address?: string
  period?: string
  rewards?: CosmosDistributionV1beta1Distribution.ValidatorHistoricalRewards
}

export type ValidatorCurrentRewardsRecord = {
  validator_address?: string
  rewards?: CosmosDistributionV1beta1Distribution.ValidatorCurrentRewards
}

export type DelegatorStartingInfoRecord = {
  delegator_address?: string
  validator_address?: string
  starting_info?: CosmosDistributionV1beta1Distribution.DelegatorStartingInfo
}

export type ValidatorSlashEventRecord = {
  validator_address?: string
  height?: string
  period?: string
  validator_slash_event?: CosmosDistributionV1beta1Distribution.ValidatorSlashEvent
}

export type GenesisState = {
  params?: CosmosDistributionV1beta1Distribution.Params
  fee_pool?: CosmosDistributionV1beta1Distribution.FeePool
  delegator_withdraw_infos?: DelegatorWithdrawInfo[]
  previous_proposer?: string
  outstanding_rewards?: ValidatorOutstandingRewardsRecord[]
  validator_accumulated_commissions?: ValidatorAccumulatedCommissionRecord[]
  validator_historical_rewards?: ValidatorHistoricalRewardsRecord[]
  validator_current_rewards?: ValidatorCurrentRewardsRecord[]
  delegator_starting_infos?: DelegatorStartingInfoRecord[]
  validator_slash_events?: ValidatorSlashEventRecord[]
}