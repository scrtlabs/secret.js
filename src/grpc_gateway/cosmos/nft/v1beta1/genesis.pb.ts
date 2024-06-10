/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosNftV1beta1Nft from "./nft.pb"
export type GenesisState = {
  classes?: CosmosNftV1beta1Nft.Class[]
  entries?: Entry[]
}

export type Entry = {
  owner?: string
  nfts?: CosmosNftV1beta1Nft.NFT[]
}