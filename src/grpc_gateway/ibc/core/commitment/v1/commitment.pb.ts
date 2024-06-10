/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosIcs23V1Proofs from "../../../../cosmos/ics23/v1/proofs.pb"
export type MerkleRoot = {
  hash?: Uint8Array
}

export type MerklePrefix = {
  key_prefix?: Uint8Array
}

export type MerklePath = {
  key_path?: string[]
}

export type MerkleProof = {
  proofs?: CosmosIcs23V1Proofs.CommitmentProof[]
}