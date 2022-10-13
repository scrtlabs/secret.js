/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum HashOp {
  NO_HASH = "NO_HASH",
  SHA256 = "SHA256",
  SHA512 = "SHA512",
  KECCAK = "KECCAK",
  RIPEMD160 = "RIPEMD160",
  BITCOIN = "BITCOIN",
}

export enum LengthOp {
  NO_PREFIX = "NO_PREFIX",
  VAR_PROTO = "VAR_PROTO",
  VAR_RLP = "VAR_RLP",
  FIXED32_BIG = "FIXED32_BIG",
  FIXED32_LITTLE = "FIXED32_LITTLE",
  FIXED64_BIG = "FIXED64_BIG",
  FIXED64_LITTLE = "FIXED64_LITTLE",
  REQUIRE_32_BYTES = "REQUIRE_32_BYTES",
  REQUIRE_64_BYTES = "REQUIRE_64_BYTES",
}

export type ExistenceProof = {
  key?: Uint8Array
  value?: Uint8Array
  leaf?: LeafOp
  path?: InnerOp[]
}

export type NonExistenceProof = {
  key?: Uint8Array
  left?: ExistenceProof
  right?: ExistenceProof
}


type BaseCommitmentProof = {
}

export type CommitmentProof = BaseCommitmentProof
  & OneOf<{ exist: ExistenceProof; nonexist: NonExistenceProof; batch: BatchProof; compressed: CompressedBatchProof }>

export type LeafOp = {
  hash?: HashOp
  prehash_key?: HashOp
  prehash_value?: HashOp
  length?: LengthOp
  prefix?: Uint8Array
}

export type InnerOp = {
  hash?: HashOp
  prefix?: Uint8Array
  suffix?: Uint8Array
}

export type ProofSpec = {
  leaf_spec?: LeafOp
  inner_spec?: InnerSpec
  max_depth?: number
  min_depth?: number
}

export type InnerSpec = {
  child_order?: number[]
  child_size?: number
  min_prefix_length?: number
  max_prefix_length?: number
  empty_child?: Uint8Array
  hash?: HashOp
}

export type BatchProof = {
  entries?: BatchEntry[]
}


type BaseBatchEntry = {
}

export type BatchEntry = BaseBatchEntry
  & OneOf<{ exist: ExistenceProof; nonexist: NonExistenceProof }>

export type CompressedBatchProof = {
  entries?: CompressedBatchEntry[]
  lookup_inners?: InnerOp[]
}


type BaseCompressedBatchEntry = {
}

export type CompressedBatchEntry = BaseCompressedBatchEntry
  & OneOf<{ exist: CompressedExistenceProof; nonexist: CompressedNonExistenceProof }>

export type CompressedExistenceProof = {
  key?: Uint8Array
  value?: Uint8Array
  leaf?: LeafOp
  path?: number[]
}

export type CompressedNonExistenceProof = {
  key?: Uint8Array
  left?: CompressedExistenceProof
  right?: CompressedExistenceProof
}