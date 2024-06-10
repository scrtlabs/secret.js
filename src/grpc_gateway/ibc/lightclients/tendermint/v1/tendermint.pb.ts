/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosIcs23V1Proofs from "../../../../cosmos/ics23/v1/proofs.pb"
import * as GoogleProtobufDuration from "../../../../google/protobuf/duration.pb"
import * as GoogleProtobufTimestamp from "../../../../google/protobuf/timestamp.pb"
import * as TendermintTypesTypes from "../../../../tendermint/types/types.pb"
import * as TendermintTypesValidator from "../../../../tendermint/types/validator.pb"
import * as IbcCoreClientV1Client from "../../../core/client/v1/client.pb"
import * as IbcCoreCommitmentV1Commitment from "../../../core/commitment/v1/commitment.pb"
export type ClientState = {
  chain_id?: string
  trust_level?: Fraction
  trusting_period?: GoogleProtobufDuration.Duration
  unbonding_period?: GoogleProtobufDuration.Duration
  max_clock_drift?: GoogleProtobufDuration.Duration
  frozen_height?: IbcCoreClientV1Client.Height
  latest_height?: IbcCoreClientV1Client.Height
  proof_specs?: CosmosIcs23V1Proofs.ProofSpec[]
  upgrade_path?: string[]
  allow_update_after_expiry?: boolean
  allow_update_after_misbehaviour?: boolean
}

export type ConsensusState = {
  timestamp?: GoogleProtobufTimestamp.Timestamp
  root?: IbcCoreCommitmentV1Commitment.MerkleRoot
  next_validators_hash?: Uint8Array
}

export type Misbehaviour = {
  client_id?: string
  header_1?: Header
  header_2?: Header
}

export type Header = {
  signed_header?: TendermintTypesTypes.SignedHeader
  validator_set?: TendermintTypesValidator.ValidatorSet
  trusted_height?: IbcCoreClientV1Client.Height
  trusted_validators?: TendermintTypesValidator.ValidatorSet
}

export type Fraction = {
  numerator?: string
  denominator?: string
}