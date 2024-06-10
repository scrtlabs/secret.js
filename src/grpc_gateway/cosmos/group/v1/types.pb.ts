/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as GoogleProtobufDuration from "../../../google/protobuf/duration.pb"
import * as GoogleProtobufTimestamp from "../../../google/protobuf/timestamp.pb"

export enum VoteOption {
  VOTE_OPTION_UNSPECIFIED = "VOTE_OPTION_UNSPECIFIED",
  VOTE_OPTION_YES = "VOTE_OPTION_YES",
  VOTE_OPTION_ABSTAIN = "VOTE_OPTION_ABSTAIN",
  VOTE_OPTION_NO = "VOTE_OPTION_NO",
  VOTE_OPTION_NO_WITH_VETO = "VOTE_OPTION_NO_WITH_VETO",
}

export enum ProposalStatus {
  PROPOSAL_STATUS_UNSPECIFIED = "PROPOSAL_STATUS_UNSPECIFIED",
  PROPOSAL_STATUS_SUBMITTED = "PROPOSAL_STATUS_SUBMITTED",
  PROPOSAL_STATUS_ACCEPTED = "PROPOSAL_STATUS_ACCEPTED",
  PROPOSAL_STATUS_REJECTED = "PROPOSAL_STATUS_REJECTED",
  PROPOSAL_STATUS_ABORTED = "PROPOSAL_STATUS_ABORTED",
  PROPOSAL_STATUS_WITHDRAWN = "PROPOSAL_STATUS_WITHDRAWN",
}

export enum ProposalExecutorResult {
  PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED = "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED",
  PROPOSAL_EXECUTOR_RESULT_NOT_RUN = "PROPOSAL_EXECUTOR_RESULT_NOT_RUN",
  PROPOSAL_EXECUTOR_RESULT_SUCCESS = "PROPOSAL_EXECUTOR_RESULT_SUCCESS",
  PROPOSAL_EXECUTOR_RESULT_FAILURE = "PROPOSAL_EXECUTOR_RESULT_FAILURE",
}

export type Member = {
  address?: string
  weight?: string
  metadata?: string
  added_at?: GoogleProtobufTimestamp.Timestamp
}

export type MemberRequest = {
  address?: string
  weight?: string
  metadata?: string
}

export type ThresholdDecisionPolicy = {
  threshold?: string
  windows?: DecisionPolicyWindows
}

export type PercentageDecisionPolicy = {
  percentage?: string
  windows?: DecisionPolicyWindows
}

export type DecisionPolicyWindows = {
  voting_period?: GoogleProtobufDuration.Duration
  min_execution_period?: GoogleProtobufDuration.Duration
}

export type GroupInfo = {
  id?: string
  admin?: string
  metadata?: string
  version?: string
  total_weight?: string
  created_at?: GoogleProtobufTimestamp.Timestamp
}

export type GroupMember = {
  group_id?: string
  member?: Member
}

export type GroupPolicyInfo = {
  address?: string
  group_id?: string
  admin?: string
  metadata?: string
  version?: string
  decision_policy?: GoogleProtobufAny.Any
  created_at?: GoogleProtobufTimestamp.Timestamp
}

export type Proposal = {
  id?: string
  group_policy_address?: string
  metadata?: string
  proposers?: string[]
  submit_time?: GoogleProtobufTimestamp.Timestamp
  group_version?: string
  group_policy_version?: string
  status?: ProposalStatus
  final_tally_result?: TallyResult
  voting_period_end?: GoogleProtobufTimestamp.Timestamp
  executor_result?: ProposalExecutorResult
  messages?: GoogleProtobufAny.Any[]
  title?: string
  summary?: string
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
  option?: VoteOption
  metadata?: string
  submit_time?: GoogleProtobufTimestamp.Timestamp
}