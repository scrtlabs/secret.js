/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
export type Params = {
  send_enabled?: SendEnabled[]
  default_send_enabled?: boolean
}

export type SendEnabled = {
  denom?: string
  enabled?: boolean
}

export type Input = {
  address?: string
  coins?: CosmosBaseV1beta1Coin.Coin[]
}

export type Output = {
  address?: string
  coins?: CosmosBaseV1beta1Coin.Coin[]
}

export type Supply = {
  total?: CosmosBaseV1beta1Coin.Coin[]
}

export type DenomUnit = {
  denom?: string
  exponent?: number
  aliases?: string[]
}

export type Metadata = {
  description?: string
  denom_units?: DenomUnit[]
  base?: string
  display?: string
  name?: string
  symbol?: string
  uri?: string
  uri_hash?: string
}