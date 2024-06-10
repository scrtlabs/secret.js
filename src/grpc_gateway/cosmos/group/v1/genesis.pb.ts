/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosGroupV1Types from "./types.pb"
export type GenesisState = {
  group_seq?: string
  groups?: CosmosGroupV1Types.GroupInfo[]
  group_members?: CosmosGroupV1Types.GroupMember[]
  group_policy_seq?: string
  group_policies?: CosmosGroupV1Types.GroupPolicyInfo[]
  proposal_seq?: string
  proposals?: CosmosGroupV1Types.Proposal[]
  votes?: CosmosGroupV1Types.Vote[]
}