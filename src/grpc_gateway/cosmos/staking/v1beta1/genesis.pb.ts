/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosStakingV1beta1Staking from "./staking.pb"
export type GenesisState = {
  params?: CosmosStakingV1beta1Staking.Params
  last_total_power?: Uint8Array
  last_validator_powers?: LastValidatorPower[]
  validators?: CosmosStakingV1beta1Staking.Validator[]
  delegations?: CosmosStakingV1beta1Staking.Delegation[]
  unbonding_delegations?: CosmosStakingV1beta1Staking.UnbondingDelegation[]
  redelegations?: CosmosStakingV1beta1Staking.Redelegation[]
  exported?: boolean
}

export type LastValidatorPower = {
  address?: string
  power?: string
}