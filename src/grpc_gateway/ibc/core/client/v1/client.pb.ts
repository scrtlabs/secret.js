/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosUpgradeV1beta1Upgrade from "../../../../cosmos/upgrade/v1beta1/upgrade.pb"
import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
export type IdentifiedClientState = {
  client_id?: string
  client_state?: GoogleProtobufAny.Any
}

export type ConsensusStateWithHeight = {
  height?: Height
  consensus_state?: GoogleProtobufAny.Any
}

export type ClientConsensusStates = {
  client_id?: string
  consensus_states?: ConsensusStateWithHeight[]
}

export type Height = {
  revision_number?: string
  revision_height?: string
}

export type Params = {
  allowed_clients?: string[]
}

export type ClientUpdateProposal = {
  title?: string
  description?: string
  subject_client_id?: string
  substitute_client_id?: string
}

export type UpgradeProposal = {
  title?: string
  description?: string
  plan?: CosmosUpgradeV1beta1Upgrade.Plan
  upgraded_client_state?: GoogleProtobufAny.Any
}