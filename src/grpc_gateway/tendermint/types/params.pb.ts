/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufDuration from "../../google/protobuf/duration.pb"
export type ConsensusParams = {
  block?: BlockParams
  evidence?: EvidenceParams
  validator?: ValidatorParams
  version?: VersionParams
  abci?: ABCIParams
}

export type BlockParams = {
  max_bytes?: string
  max_gas?: string
}

export type EvidenceParams = {
  max_age_num_blocks?: string
  max_age_duration?: GoogleProtobufDuration.Duration
  max_bytes?: string
}

export type ValidatorParams = {
  pub_key_types?: string[]
}

export type VersionParams = {
  app?: string
}

export type HashedParams = {
  block_max_bytes?: string
  block_max_gas?: string
}

export type ABCIParams = {
  vote_extensions_enable_height?: string
}