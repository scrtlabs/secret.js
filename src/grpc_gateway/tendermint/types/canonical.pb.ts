/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb"
import * as TendermintTypesTypes from "./types.pb"
export type CanonicalBlockID = {
  hash?: Uint8Array
  part_set_header?: CanonicalPartSetHeader
}

export type CanonicalPartSetHeader = {
  total?: number
  hash?: Uint8Array
}

export type CanonicalProposal = {
  type?: TendermintTypesTypes.SignedMsgType
  height?: string
  round?: string
  pol_round?: string
  block_id?: CanonicalBlockID
  timestamp?: GoogleProtobufTimestamp.Timestamp
  chain_id?: string
}

export type CanonicalVote = {
  type?: TendermintTypesTypes.SignedMsgType
  height?: string
  round?: string
  block_id?: CanonicalBlockID
  timestamp?: GoogleProtobufTimestamp.Timestamp
  chain_id?: string
}