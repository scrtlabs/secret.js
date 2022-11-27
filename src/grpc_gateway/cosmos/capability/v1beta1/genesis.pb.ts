/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosCapabilityV1beta1Capability from "./capability.pb"
export type GenesisOwners = {
  index?: string
  index_owners?: CosmosCapabilityV1beta1Capability.CapabilityOwners
}

export type GenesisState = {
  index?: string
  owners?: GenesisOwners[]
}