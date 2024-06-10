/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseV1beta1Coin from "../../../../cosmos/base/v1beta1/coin.pb"
export type Allocation = {
  source_port?: string
  source_channel?: string
  spend_limit?: CosmosBaseV1beta1Coin.Coin[]
  allow_list?: string[]
  allowed_packet_data?: string[]
}

export type TransferAuthorization = {
  allocations?: Allocation[]
}