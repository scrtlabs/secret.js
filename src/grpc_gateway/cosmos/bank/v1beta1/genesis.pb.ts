/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
import * as CosmosBankV1beta1Bank from "./bank.pb"
export type GenesisState = {
  params?: CosmosBankV1beta1Bank.Params
  balances?: Balance[]
  supply?: CosmosBaseV1beta1Coin.Coin[]
  denom_metadata?: CosmosBankV1beta1Bank.Metadata[]
}

export type Balance = {
  address?: string
  coins?: CosmosBaseV1beta1Coin.Coin[]
}