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

export type TextProposal = {
  title?: string
  description?: string
}

export type Deposit = {
  proposal_id?: string
  depositor?: string
  amount?: CosmosBaseV1beta1Coin.Coin[]
}

export type Proposal = {
  proposal_id?: string
  content?: GoogleProtobufAny.Any
  status?: ProposalStatus
  final_tally_result?: TallyResult
  submit_time?: GoogleProtobufTimestamp.Timestamp
  deposit_end_time?: GoogleProtobufTimestamp.Timestamp
  total_deposit?: CosmosBaseV1beta1Coin.Coin[]
  voting_start_time?: GoogleProtobufTimestamp.Timestamp
  voting_end_time?: GoogleProtobufTimestamp.Timestamp
}

export type TallyResult = {
  yes?: string
  abstain?: string
  no?: string
  no_with_veto?: string
}

export type Vote = {
  proposal_id?: string
  voter?: string
  option?: VoteOption
  options?: WeightedVoteOption[]
}

export type DepositParams = {
  min_deposit?: CosmosBaseV1beta1Coin.Coin[]
  max_deposit_period?: GoogleProtobufDuration.Duration
}

export type VotingParams = {
  voting_period?: GoogleProtobufDuration.Duration
}

export type TallyParams = {
  quorum?: Uint8Array
  threshold?: Uint8Array
  veto_threshold?: Uint8Array
}