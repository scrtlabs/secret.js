/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as Ics23Proofs from "../../../../confio/proofs.pb"
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
  proofs?: Ics23Proofs.CommitmentProof[]
}