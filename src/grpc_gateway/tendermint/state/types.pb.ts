/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb"
import * as TendermintAbciTypes from "../abci/types.pb"
import * as TendermintTypesParams from "../types/params.pb"
import * as TendermintTypesTypes from "../types/types.pb"
import * as TendermintTypesValidator from "../types/validator.pb"
import * as TendermintVersionTypes from "../version/types.pb"
export type LegacyABCIResponses = {
  deliver_txs?: TendermintAbciTypes.ExecTxResult[]
  end_block?: ResponseEndBlock
  begin_block?: ResponseBeginBlock
}

export type ResponseBeginBlock = {
  events?: TendermintAbciTypes.Event[]
}

export type ResponseEndBlock = {
  validator_updates?: TendermintAbciTypes.ValidatorUpdate[]
  consensus_param_updates?: TendermintTypesParams.ConsensusParams
  events?: TendermintAbciTypes.Event[]
}

export type ValidatorsInfo = {
  validator_set?: TendermintTypesValidator.ValidatorSet
  last_height_changed?: string
}

export type ConsensusParamsInfo = {
  consensus_params?: TendermintTypesParams.ConsensusParams
  last_height_changed?: string
}

export type ABCIResponsesInfo = {
  legacy_abci_responses?: LegacyABCIResponses
  height?: string
  response_finalize_block?: TendermintAbciTypes.ResponseFinalizeBlock
}

export type Version = {
  consensus?: TendermintVersionTypes.Consensus
  software?: string
}

export type State = {
  version?: Version
  chain_id?: string
  initial_height?: string
  last_block_height?: string
  last_block_id?: TendermintTypesTypes.BlockID
  last_block_time?: GoogleProtobufTimestamp.Timestamp
  next_validators?: TendermintTypesValidator.ValidatorSet
  validators?: TendermintTypesValidator.ValidatorSet
  last_validators?: TendermintTypesValidator.ValidatorSet
  last_height_validators_changed?: string
  consensus_params?: TendermintTypesParams.ConsensusParams
  last_height_consensus_params_changed?: string
  last_results_hash?: Uint8Array
  app_hash?: Uint8Array
}