/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb"
import * as TendermintTypesTypes from "./types.pb"
import * as TendermintTypesValidator from "./validator.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

type BaseEvidence = {
}

export type Evidence = BaseEvidence
  & OneOf<{ duplicate_vote_evidence: DuplicateVoteEvidence; light_client_attack_evidence: LightClientAttackEvidence }>

export type DuplicateVoteEvidence = {
  vote_a?: TendermintTypesTypes.Vote
  vote_b?: TendermintTypesTypes.Vote
  total_voting_power?: string
  validator_power?: string
  timestamp?: GoogleProtobufTimestamp.Timestamp
}

export type LightClientAttackEvidence = {
  conflicting_block?: TendermintTypesTypes.LightBlock
  common_height?: string
  byzantine_validators?: TendermintTypesValidator.Validator[]
  total_voting_power?: string
  timestamp?: GoogleProtobufTimestamp.Timestamp
}

export type EvidenceList = {
  evidence?: Evidence[]
}