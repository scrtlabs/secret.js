/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosGroupV1Types from "./types.pb"
export type EventCreateGroup = {
  group_id?: string
}

export type EventUpdateGroup = {
  group_id?: string
}

export type EventCreateGroupPolicy = {
  address?: string
}

export type EventUpdateGroupPolicy = {
  address?: string
}

export type EventSubmitProposal = {
  proposal_id?: string
}

export type EventWithdrawProposal = {
  proposal_id?: string
}

export type EventVote = {
  proposal_id?: string
}

export type EventExec = {
  proposal_id?: string
  result?: CosmosGroupV1Types.ProposalExecutorResult
  logs?: string
}

export type EventLeaveGroup = {
  group_id?: string
  address?: string
}

export type EventProposalPruned = {
  proposal_id?: string
  status?: CosmosGroupV1Types.ProposalStatus
  tally_result?: CosmosGroupV1Types.TallyResult
}