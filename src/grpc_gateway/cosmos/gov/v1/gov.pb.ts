/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as GoogleProtobufDuration from "../../../google/protobuf/duration.pb"
import * as GoogleProtobufTimestamp from "../../../google/protobuf/timestamp.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"

export enum VoteOption {
  VOTE_OPTION_UNSPECIFIED = "VOTE_OPTION_UNSPECIFIED",
  VOTE_OPTION_YES = "VOTE_OPTION_YES",
  VOTE_OPTION_ABSTAIN = "VOTE_OPTION_ABSTAIN",
  VOTE_OPTION_NO = "VOTE_OPTION_NO",
  VOTE_OPTION_NO_WITH_VETO = "VOTE_OPTION_NO_WITH_VETO",
}

export enum ProposalStatus {
  PROPOSAL_STATUS_UNSPECIFIED = "PROPOSAL_STATUS_UNSPECIFIED",
  PROPOSAL_STATUS_DEPOSIT_PERIOD = "PROPOSAL_STATUS_DEPOSIT_PERIOD",
  PROPOSAL_STATUS_VOTING_PERIOD = "PROPOSAL_STATUS_VOTING_PERIOD",
  PROPOSAL_STATUS_PASSED = "PROPOSAL_STATUS_PASSED",
  PROPOSAL_STATUS_REJECTED = "PROPOSAL_STATUS_REJECTED",
  PROPOSAL_STATUS_FAILED = "PROPOSAL_STATUS_FAILED",
}

export type WeightedVoteOption = {
  option?: VoteOption
  weight?: string
}

export type Deposit = {
  proposal_id?: string
  depositor?: string
  amount?: CosmosBaseV1beta1Coin.Coin[]
}

export type Proposal = {
  id?: string
  messages?: GoogleProtobufAny.Any[]
  status?: ProposalStatus
  final_tally_result?: TallyResult
  submit_time?: GoogleProtobufTimestamp.Timestamp
  deposit_end_time?: GoogleProtobufTimestamp.Timestamp
  total_deposit?: CosmosBaseV1beta1Coin.Coin[]
  voting_start_time?: GoogleProtobufTimestamp.Timestamp
  voting_end_time?: GoogleProtobufTimestamp.Timestamp
  metadata?: string
  title?: string
  summary?: string
  proposer?: string
  expedited?: boolean
  failed_reason?: string
}

export type TallyResult = {
  yes_count?: string
  abstain_count?: string
  no_count?: string
  no_with_veto_count?: string
}

export type Vote = {
  proposal_id?: string
  voter?: string
  options?: WeightedVoteOption[]
  metadata?: string
}

export type DepositParams = {
  min_deposit?: CosmosBaseV1beta1Coin.Coin[]
  max_deposit_period?: GoogleProtobufDuration.Duration
}

export type VotingParams = {
  voting_period?: GoogleProtobufDuration.Duration
}

export type TallyParams = {
  quorum?: string
  threshold?: string
  veto_threshold?: string
}

export type Params = {
  min_deposit?: CosmosBaseV1beta1Coin.Coin[]
  max_deposit_period?: GoogleProtobufDuration.Duration
  voting_period?: GoogleProtobufDuration.Duration
  quorum?: string
  threshold?: string
  veto_threshold?: string
  min_initial_deposit_ratio?: string
  proposal_cancel_ratio?: string
  proposal_cancel_dest?: string
  expedited_voting_period?: GoogleProtobufDuration.Duration
  expedited_threshold?: string
  expedited_min_deposit?: CosmosBaseV1beta1Coin.Coin[]
  burn_vote_quorum?: boolean
  burn_proposal_deposit_prevote?: boolean
  burn_vote_veto?: boolean
  min_deposit_ratio?: string
}