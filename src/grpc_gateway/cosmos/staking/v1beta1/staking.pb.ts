/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as GoogleProtobufDuration from "../../../google/protobuf/duration.pb"
import * as GoogleProtobufTimestamp from "../../../google/protobuf/timestamp.pb"
import * as TendermintAbciTypes from "../../../tendermint/abci/types.pb"
import * as TendermintTypesTypes from "../../../tendermint/types/types.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"

export enum BondStatus {
  BOND_STATUS_UNSPECIFIED = "BOND_STATUS_UNSPECIFIED",
  BOND_STATUS_UNBONDED = "BOND_STATUS_UNBONDED",
  BOND_STATUS_UNBONDING = "BOND_STATUS_UNBONDING",
  BOND_STATUS_BONDED = "BOND_STATUS_BONDED",
}

export enum Infraction {
  INFRACTION_UNSPECIFIED = "INFRACTION_UNSPECIFIED",
  INFRACTION_DOUBLE_SIGN = "INFRACTION_DOUBLE_SIGN",
  INFRACTION_DOWNTIME = "INFRACTION_DOWNTIME",
}

export type HistoricalInfo = {
  header?: TendermintTypesTypes.Header
  valset?: Validator[]
}

export type CommissionRates = {
  rate?: string
  max_rate?: string
  max_change_rate?: string
}

export type Commission = {
  commission_rates?: CommissionRates
  update_time?: GoogleProtobufTimestamp.Timestamp
}

export type Description = {
  moniker?: string
  identity?: string
  website?: string
  security_contact?: string
  details?: string
}

export type Validator = {
  operator_address?: string
  consensus_pubkey?: GoogleProtobufAny.Any
  jailed?: boolean
  status?: BondStatus
  tokens?: string
  delegator_shares?: string
  description?: Description
  unbonding_height?: string
  unbonding_time?: GoogleProtobufTimestamp.Timestamp
  commission?: Commission
  min_self_delegation?: string
  unbonding_on_hold_ref_count?: string
  unbonding_ids?: string[]
}

export type ValAddresses = {
  addresses?: string[]
}

export type DVPair = {
  delegator_address?: string
  validator_address?: string
}

export type DVPairs = {
  pairs?: DVPair[]
}

export type DVVTriplet = {
  delegator_address?: string
  validator_src_address?: string
  validator_dst_address?: string
}

export type DVVTriplets = {
  triplets?: DVVTriplet[]
}

export type Delegation = {
  delegator_address?: string
  validator_address?: string
  shares?: string
}

export type UnbondingDelegation = {
  delegator_address?: string
  validator_address?: string
  entries?: UnbondingDelegationEntry[]
}

export type UnbondingDelegationEntry = {
  creation_height?: string
  completion_time?: GoogleProtobufTimestamp.Timestamp
  initial_balance?: string
  balance?: string
  unbonding_id?: string
  unbonding_on_hold_ref_count?: string
}

export type RedelegationEntry = {
  creation_height?: string
  completion_time?: GoogleProtobufTimestamp.Timestamp
  initial_balance?: string
  shares_dst?: string
  unbonding_id?: string
  unbonding_on_hold_ref_count?: string
}

export type Redelegation = {
  delegator_address?: string
  validator_src_address?: string
  validator_dst_address?: string
  entries?: RedelegationEntry[]
}

export type Params = {
  unbonding_time?: GoogleProtobufDuration.Duration
  max_validators?: number
  max_entries?: number
  historical_entries?: number
  bond_denom?: string
  min_commission_rate?: string
}

export type DelegationResponse = {
  delegation?: Delegation
  balance?: CosmosBaseV1beta1Coin.Coin
}

export type RedelegationEntryResponse = {
  redelegation_entry?: RedelegationEntry
  balance?: string
}

export type RedelegationResponse = {
  redelegation?: Redelegation
  entries?: RedelegationEntryResponse[]
}

export type Pool = {
  not_bonded_tokens?: string
  bonded_tokens?: string
}

export type ValidatorUpdates = {
  updates?: TendermintAbciTypes.ValidatorUpdate[]
}