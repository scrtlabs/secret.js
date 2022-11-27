/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as IbcCoreCommitmentV1Commitment from "../../commitment/v1/commitment.pb"

export enum State {
  STATE_UNINITIALIZED_UNSPECIFIED = "STATE_UNINITIALIZED_UNSPECIFIED",
  STATE_INIT = "STATE_INIT",
  STATE_TRYOPEN = "STATE_TRYOPEN",
  STATE_OPEN = "STATE_OPEN",
}

export type ConnectionEnd = {
  client_id?: string
  versions?: Version[]
  state?: State
  counterparty?: Counterparty
  delay_period?: string
}

export type IdentifiedConnection = {
  id?: string
  client_id?: string
  versions?: Version[]
  state?: State
  counterparty?: Counterparty
  delay_period?: string
}

export type Counterparty = {
  client_id?: string
  connection_id?: string
  prefix?: IbcCoreCommitmentV1Commitment.MerklePrefix
}

export type ClientPaths = {
  paths?: string[]
}

export type ConnectionPaths = {
  client_id?: string
  paths?: string[]
}

export type Version = {
  identifier?: string
  features?: string[]
}

export type Params = {
  max_expected_time_per_block?: string
}