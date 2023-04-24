/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb"
import * as TendermintCryptoProof from "../crypto/proof.pb"
import * as TendermintVersionTypes from "../version/types.pb"
import * as TendermintTypesValidator from "./validator.pb"

export enum BlockIDFlag {
  BLOCK_ID_FLAG_UNKNOWN = "BLOCK_ID_FLAG_UNKNOWN",
  BLOCK_ID_FLAG_ABSENT = "BLOCK_ID_FLAG_ABSENT",
  BLOCK_ID_FLAG_COMMIT = "BLOCK_ID_FLAG_COMMIT",
  BLOCK_ID_FLAG_NIL = "BLOCK_ID_FLAG_NIL",
}

export enum SignedMsgType {
  SIGNED_MSG_TYPE_UNKNOWN = "SIGNED_MSG_TYPE_UNKNOWN",
  SIGNED_MSG_TYPE_PREVOTE = "SIGNED_MSG_TYPE_PREVOTE",
  SIGNED_MSG_TYPE_PRECOMMIT = "SIGNED_MSG_TYPE_PRECOMMIT",
  SIGNED_MSG_TYPE_PROPOSAL = "SIGNED_MSG_TYPE_PROPOSAL",
}

export type PartSetHeader = {
  total?: number
  hash?: Uint8Array
}

export type Part = {
  index?: number
  bytes?: Uint8Array
  proof?: TendermintCryptoProof.Proof
}

export type BlockID = {
  hash?: Uint8Array
  part_set_header?: PartSetHeader
}

export type Header = {
  version?: TendermintVersionTypes.Consensus
  chain_id?: string
  height?: string
  time?: GoogleProtobufTimestamp.Timestamp
  last_block_id?: BlockID
  last_commit_hash?: Uint8Array
  data_hash?: Uint8Array
  validators_hash?: Uint8Array
  next_validators_hash?: Uint8Array
  consensus_hash?: Uint8Array
  app_hash?: Uint8Array
  last_results_hash?: Uint8Array
  evidence_hash?: Uint8Array
  proposer_address?: Uint8Array
  encrypted_random?: EncryptedRandom
}

export type EncryptedRandom = {
  random?: Uint8Array
  proof?: Uint8Array
}

export type Data = {
  txs?: Uint8Array[]
}

export type Vote = {
  type?: SignedMsgType
  height?: string
  round?: number
  block_id?: BlockID
  timestamp?: GoogleProtobufTimestamp.Timestamp
  validator_address?: Uint8Array
  validator_index?: number
  signature?: Uint8Array
}

export type Commit = {
  height?: string
  round?: number
  block_id?: BlockID
  signatures?: CommitSig[]
}

export type CommitSig = {
  block_id_flag?: BlockIDFlag
  validator_address?: Uint8Array
  timestamp?: GoogleProtobufTimestamp.Timestamp
  signature?: Uint8Array
}

export type Proposal = {
  type?: SignedMsgType
  height?: string
  round?: number
  pol_round?: number
  block_id?: BlockID
  timestamp?: GoogleProtobufTimestamp.Timestamp
  signature?: Uint8Array
}

export type SignedHeader = {
  header?: Header
  commit?: Commit
}

export type LightBlock = {
  signed_header?: SignedHeader
  validator_set?: TendermintTypesValidator.ValidatorSet
}

export type BlockMeta = {
  block_id?: BlockID
  block_size?: string
  header?: Header
  num_txs?: string
}

export type TxProof = {
  root_hash?: Uint8Array
  data?: Uint8Array
  proof?: TendermintCryptoProof.Proof
}