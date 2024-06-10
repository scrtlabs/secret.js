/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as CosmosGroupV1Types from "./types.pb"

export enum Exec {
  EXEC_UNSPECIFIED = "EXEC_UNSPECIFIED",
  EXEC_TRY = "EXEC_TRY",
}

export type MsgCreateGroup = {
  admin?: string
  members?: CosmosGroupV1Types.MemberRequest[]
  metadata?: string
}

export type MsgCreateGroupResponse = {
  group_id?: string
}

export type MsgUpdateGroupMembers = {
  admin?: string
  group_id?: string
  member_updates?: CosmosGroupV1Types.MemberRequest[]
}

export type MsgUpdateGroupMembersResponse = {
}

export type MsgUpdateGroupAdmin = {
  admin?: string
  group_id?: string
  new_admin?: string
}

export type MsgUpdateGroupAdminResponse = {
}

export type MsgUpdateGroupMetadata = {
  admin?: string
  group_id?: string
  metadata?: string
}

export type MsgUpdateGroupMetadataResponse = {
}

export type MsgCreateGroupPolicy = {
  admin?: string
  group_id?: string
  metadata?: string
  decision_policy?: GoogleProtobufAny.Any
}

export type MsgCreateGroupPolicyResponse = {
  address?: string
}

export type MsgUpdateGroupPolicyAdmin = {
  admin?: string
  group_policy_address?: string
  new_admin?: string
}

export type MsgUpdateGroupPolicyAdminResponse = {
}

export type MsgCreateGroupWithPolicy = {
  admin?: string
  members?: CosmosGroupV1Types.MemberRequest[]
  group_metadata?: string
  group_policy_metadata?: string
  group_policy_as_admin?: boolean
  decision_policy?: GoogleProtobufAny.Any
}

export type MsgCreateGroupWithPolicyResponse = {
  group_id?: string
  group_policy_address?: string
}

export type MsgUpdateGroupPolicyDecisionPolicy = {
  admin?: string
  group_policy_address?: string
  decision_policy?: GoogleProtobufAny.Any
}

export type MsgUpdateGroupPolicyDecisionPolicyResponse = {
}

export type MsgUpdateGroupPolicyMetadata = {
  admin?: string
  group_policy_address?: string
  metadata?: string
}

export type MsgUpdateGroupPolicyMetadataResponse = {
}

export type MsgSubmitProposal = {
  group_policy_address?: string
  proposers?: string[]
  metadata?: string
  messages?: GoogleProtobufAny.Any[]
  exec?: Exec
  title?: string
  summary?: string
}

export type MsgSubmitProposalResponse = {
  proposal_id?: string
}

export type MsgWithdrawProposal = {
  proposal_id?: string
  address?: string
}

export type MsgWithdrawProposalResponse = {
}

export type MsgVote = {
  proposal_id?: string
  voter?: string
  option?: CosmosGroupV1Types.VoteOption
  metadata?: string
  exec?: Exec
}

export type MsgVoteResponse = {
}

export type MsgExec = {
  proposal_id?: string
  executor?: string
}

export type MsgExecResponse = {
  result?: CosmosGroupV1Types.ProposalExecutorResult
}

export type MsgLeaveGroup = {
  address?: string
  group_id?: string
}

export type MsgLeaveGroupResponse = {
}

export class Msg {
  static CreateGroup(req: MsgCreateGroup, initReq?: fm.InitReq): Promise<MsgCreateGroupResponse> {
    return fm.fetchReq<MsgCreateGroup, MsgCreateGroupResponse>(`/cosmos.group.v1.Msg/CreateGroup`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateGroupMembers(req: MsgUpdateGroupMembers, initReq?: fm.InitReq): Promise<MsgUpdateGroupMembersResponse> {
    return fm.fetchReq<MsgUpdateGroupMembers, MsgUpdateGroupMembersResponse>(`/cosmos.group.v1.Msg/UpdateGroupMembers`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateGroupAdmin(req: MsgUpdateGroupAdmin, initReq?: fm.InitReq): Promise<MsgUpdateGroupAdminResponse> {
    return fm.fetchReq<MsgUpdateGroupAdmin, MsgUpdateGroupAdminResponse>(`/cosmos.group.v1.Msg/UpdateGroupAdmin`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateGroupMetadata(req: MsgUpdateGroupMetadata, initReq?: fm.InitReq): Promise<MsgUpdateGroupMetadataResponse> {
    return fm.fetchReq<MsgUpdateGroupMetadata, MsgUpdateGroupMetadataResponse>(`/cosmos.group.v1.Msg/UpdateGroupMetadata`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static CreateGroupPolicy(req: MsgCreateGroupPolicy, initReq?: fm.InitReq): Promise<MsgCreateGroupPolicyResponse> {
    return fm.fetchReq<MsgCreateGroupPolicy, MsgCreateGroupPolicyResponse>(`/cosmos.group.v1.Msg/CreateGroupPolicy`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static CreateGroupWithPolicy(req: MsgCreateGroupWithPolicy, initReq?: fm.InitReq): Promise<MsgCreateGroupWithPolicyResponse> {
    return fm.fetchReq<MsgCreateGroupWithPolicy, MsgCreateGroupWithPolicyResponse>(`/cosmos.group.v1.Msg/CreateGroupWithPolicy`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateGroupPolicyAdmin(req: MsgUpdateGroupPolicyAdmin, initReq?: fm.InitReq): Promise<MsgUpdateGroupPolicyAdminResponse> {
    return fm.fetchReq<MsgUpdateGroupPolicyAdmin, MsgUpdateGroupPolicyAdminResponse>(`/cosmos.group.v1.Msg/UpdateGroupPolicyAdmin`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateGroupPolicyDecisionPolicy(req: MsgUpdateGroupPolicyDecisionPolicy, initReq?: fm.InitReq): Promise<MsgUpdateGroupPolicyDecisionPolicyResponse> {
    return fm.fetchReq<MsgUpdateGroupPolicyDecisionPolicy, MsgUpdateGroupPolicyDecisionPolicyResponse>(`/cosmos.group.v1.Msg/UpdateGroupPolicyDecisionPolicy`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateGroupPolicyMetadata(req: MsgUpdateGroupPolicyMetadata, initReq?: fm.InitReq): Promise<MsgUpdateGroupPolicyMetadataResponse> {
    return fm.fetchReq<MsgUpdateGroupPolicyMetadata, MsgUpdateGroupPolicyMetadataResponse>(`/cosmos.group.v1.Msg/UpdateGroupPolicyMetadata`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static SubmitProposal(req: MsgSubmitProposal, initReq?: fm.InitReq): Promise<MsgSubmitProposalResponse> {
    return fm.fetchReq<MsgSubmitProposal, MsgSubmitProposalResponse>(`/cosmos.group.v1.Msg/SubmitProposal`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static WithdrawProposal(req: MsgWithdrawProposal, initReq?: fm.InitReq): Promise<MsgWithdrawProposalResponse> {
    return fm.fetchReq<MsgWithdrawProposal, MsgWithdrawProposalResponse>(`/cosmos.group.v1.Msg/WithdrawProposal`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Vote(req: MsgVote, initReq?: fm.InitReq): Promise<MsgVoteResponse> {
    return fm.fetchReq<MsgVote, MsgVoteResponse>(`/cosmos.group.v1.Msg/Vote`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Exec(req: MsgExec, initReq?: fm.InitReq): Promise<MsgExecResponse> {
    return fm.fetchReq<MsgExec, MsgExecResponse>(`/cosmos.group.v1.Msg/Exec`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static LeaveGroup(req: MsgLeaveGroup, initReq?: fm.InitReq): Promise<MsgLeaveGroupResponse> {
    return fm.fetchReq<MsgLeaveGroup, MsgLeaveGroupResponse>(`/cosmos.group.v1.Msg/LeaveGroup`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}