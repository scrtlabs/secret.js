/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosAuthV1beta1Auth from "../../auth/v1beta1/auth.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
export type BaseVestingAccount = {
  base_account?: CosmosAuthV1beta1Auth.BaseAccount
  original_vesting?: CosmosBaseV1beta1Coin.Coin[]
  delegated_free?: CosmosBaseV1beta1Coin.Coin[]
  delegated_vesting?: CosmosBaseV1beta1Coin.Coin[]
  end_time?: string
}

export type ContinuousVestingAccount = {
  base_vesting_account?: BaseVestingAccount
  start_time?: string
}

export type DelayedVestingAccount = {
  base_vesting_account?: BaseVestingAccount
}

export type Period = {
  length?: string
  amount?: CosmosBaseV1beta1Coin.Coin[]
}

export type PeriodicVestingAccount = {
  base_vesting_account?: BaseVestingAccount
  start_time?: string
  vesting_periods?: Period[]
}

export type PermanentLockedAccount = {
  base_vesting_account?: BaseVestingAccount
}