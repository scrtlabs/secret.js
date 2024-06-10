/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufTimestamp from "../../../../google/protobuf/timestamp.pb"
import * as TendermintTypesEvidence from "../../../../tendermint/types/evidence.pb"
import * as TendermintTypesTypes from "../../../../tendermint/types/types.pb"
import * as TendermintVersionTypes from "../../../../tendermint/version/types.pb"
export type Block = {
  header?: Header
  data?: TendermintTypesTypes.Data
  evidence?: TendermintTypesEvidence.EvidenceList
  last_commit?: TendermintTypesTypes.Commit
}

export type Header = {
  version?: TendermintVersionTypes.Consensus
  chain_id?: string
  height?: string
  time?: GoogleProtobufTimestamp.Timestamp
  last_block_id?: TendermintTypesTypes.BlockID
  last_commit_hash?: Uint8Array
  data_hash?: Uint8Array
  validators_hash?: Uint8Array
  next_validators_hash?: Uint8Array
  consensus_hash?: Uint8Array
  app_hash?: Uint8Array
  last_results_hash?: Uint8Array
  evidence_hash?: Uint8Array
  proposer_address?: string
}