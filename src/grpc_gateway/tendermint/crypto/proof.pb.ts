/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type Proof = {
  total?: string
  index?: string
  leaf_hash?: Uint8Array
  aunts?: Uint8Array[]
}

export type ValueOp = {
  key?: Uint8Array
  proof?: Proof
}

export type DominoOp = {
  key?: string
  input?: string
  output?: string
}

export type ProofOp = {
  type?: string
  key?: Uint8Array
  data?: Uint8Array
}

export type ProofOps = {
  ops?: ProofOp[]
}