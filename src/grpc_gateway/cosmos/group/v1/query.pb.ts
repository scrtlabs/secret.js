/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosGroupV1Types from "./types.pb"
export type QueryGroupInfoRequest = {
  group_id?: string
}

export type QueryGroupInfoResponse = {
  info?: CosmosGroupV1Types.GroupInfo
}

export type QueryGroupPolicyInfoRequest = {
  address?: string
}

export type QueryGroupPolicyInfoResponse = {
  info?: CosmosGroupV1Types.GroupPolicyInfo
}

export type QueryGroupMembersRequest = {
  group_id?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryGroupMembersResponse = {
  members?: CosmosGroupV1Types.GroupMember[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryGroupsByAdminRequest = {
  admin?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryGroupsByAdminResponse = {
  groups?: CosmosGroupV1Types.GroupInfo[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryGroupPoliciesByGroupRequest = {
  group_id?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryGroupPoliciesByGroupResponse = {
  group_policies?: CosmosGroupV1Types.GroupPolicyInfo[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryGroupPoliciesByAdminRequest = {
  admin?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryGroupPoliciesByAdminResponse = {
  group_policies?: CosmosGroupV1Types.GroupPolicyInfo[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryProposalRequest = {
  proposal_id?: string
}

export type QueryProposalResponse = {
  proposal?: CosmosGroupV1Types.Proposal
}

export type QueryProposalsByGroupPolicyRequest = {
  address?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryProposalsByGroupPolicyResponse = {
  proposals?: CosmosGroupV1Types.Proposal[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryVoteByProposalVoterRequest = {
  proposal_id?: string
  voter?: string
}

export type QueryVoteByProposalVoterResponse = {
  vote?: CosmosGroupV1Types.Vote
}

export type QueryVotesByProposalRequest = {
  proposal_id?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryVotesByProposalResponse = {
  votes?: CosmosGroupV1Types.Vote[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryVotesByVoterRequest = {
  voter?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryVotesByVoterResponse = {
  votes?: CosmosGroupV1Types.Vote[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryGroupsByMemberRequest = {
  address?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryGroupsByMemberResponse = {
  groups?: CosmosGroupV1Types.GroupInfo[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryTallyResultRequest = {
  proposal_id?: string
}

export type QueryTallyResultResponse = {
  tally?: CosmosGroupV1Types.TallyResult
}

export type QueryGroupsRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryGroupsResponse = {
  groups?: CosmosGroupV1Types.GroupInfo[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export class Query {
  static GroupInfo(req: QueryGroupInfoRequest, initReq?: fm.InitReq): Promise<QueryGroupInfoResponse> {
    return fm.fetchReq<QueryGroupInfoRequest, QueryGroupInfoResponse>(`/cosmos/group/v1/group_info/${req["group_id"]}?${fm.renderURLSearchParams(req, ["group_id"])}`, {...initReq, method: "GET"})
  }
  static GroupPolicyInfo(req: QueryGroupPolicyInfoRequest, initReq?: fm.InitReq): Promise<QueryGroupPolicyInfoResponse> {
    return fm.fetchReq<QueryGroupPolicyInfoRequest, QueryGroupPolicyInfoResponse>(`/cosmos/group/v1/group_policy_info/${req["address"]}?${fm.renderURLSearchParams(req, ["address"])}`, {...initReq, method: "GET"})
  }
  static GroupMembers(req: QueryGroupMembersRequest, initReq?: fm.InitReq): Promise<QueryGroupMembersResponse> {
    return fm.fetchReq<QueryGroupMembersRequest, QueryGroupMembersResponse>(`/cosmos/group/v1/group_members/${req["group_id"]}?${fm.renderURLSearchParams(req, ["group_id"])}`, {...initReq, method: "GET"})
  }
  static GroupsByAdmin(req: QueryGroupsByAdminRequest, initReq?: fm.InitReq): Promise<QueryGroupsByAdminResponse> {
    return fm.fetchReq<QueryGroupsByAdminRequest, QueryGroupsByAdminResponse>(`/cosmos/group/v1/groups_by_admin/${req["admin"]}?${fm.renderURLSearchParams(req, ["admin"])}`, {...initReq, method: "GET"})
  }
  static GroupPoliciesByGroup(req: QueryGroupPoliciesByGroupRequest, initReq?: fm.InitReq): Promise<QueryGroupPoliciesByGroupResponse> {
    return fm.fetchReq<QueryGroupPoliciesByGroupRequest, QueryGroupPoliciesByGroupResponse>(`/cosmos/group/v1/group_policies_by_group/${req["group_id"]}?${fm.renderURLSearchParams(req, ["group_id"])}`, {...initReq, method: "GET"})
  }
  static GroupPoliciesByAdmin(req: QueryGroupPoliciesByAdminRequest, initReq?: fm.InitReq): Promise<QueryGroupPoliciesByAdminResponse> {
    return fm.fetchReq<QueryGroupPoliciesByAdminRequest, QueryGroupPoliciesByAdminResponse>(`/cosmos/group/v1/group_policies_by_admin/${req["admin"]}?${fm.renderURLSearchParams(req, ["admin"])}`, {...initReq, method: "GET"})
  }
  static Proposal(req: QueryProposalRequest, initReq?: fm.InitReq): Promise<QueryProposalResponse> {
    return fm.fetchReq<QueryProposalRequest, QueryProposalResponse>(`/cosmos/group/v1/proposal/${req["proposal_id"]}?${fm.renderURLSearchParams(req, ["proposal_id"])}`, {...initReq, method: "GET"})
  }
  static ProposalsByGroupPolicy(req: QueryProposalsByGroupPolicyRequest, initReq?: fm.InitReq): Promise<QueryProposalsByGroupPolicyResponse> {
    return fm.fetchReq<QueryProposalsByGroupPolicyRequest, QueryProposalsByGroupPolicyResponse>(`/cosmos/group/v1/proposals_by_group_policy/${req["address"]}?${fm.renderURLSearchParams(req, ["address"])}`, {...initReq, method: "GET"})
  }
  static VoteByProposalVoter(req: QueryVoteByProposalVoterRequest, initReq?: fm.InitReq): Promise<QueryVoteByProposalVoterResponse> {
    return fm.fetchReq<QueryVoteByProposalVoterRequest, QueryVoteByProposalVoterResponse>(`/cosmos/group/v1/vote_by_proposal_voter/${req["proposal_id"]}/${req["voter"]}?${fm.renderURLSearchParams(req, ["proposal_id", "voter"])}`, {...initReq, method: "GET"})
  }
  static VotesByProposal(req: QueryVotesByProposalRequest, initReq?: fm.InitReq): Promise<QueryVotesByProposalResponse> {
    return fm.fetchReq<QueryVotesByProposalRequest, QueryVotesByProposalResponse>(`/cosmos/group/v1/votes_by_proposal/${req["proposal_id"]}?${fm.renderURLSearchParams(req, ["proposal_id"])}`, {...initReq, method: "GET"})
  }
  static VotesByVoter(req: QueryVotesByVoterRequest, initReq?: fm.InitReq): Promise<QueryVotesByVoterResponse> {
    return fm.fetchReq<QueryVotesByVoterRequest, QueryVotesByVoterResponse>(`/cosmos/group/v1/votes_by_voter/${req["voter"]}?${fm.renderURLSearchParams(req, ["voter"])}`, {...initReq, method: "GET"})
  }
  static GroupsByMember(req: QueryGroupsByMemberRequest, initReq?: fm.InitReq): Promise<QueryGroupsByMemberResponse> {
    return fm.fetchReq<QueryGroupsByMemberRequest, QueryGroupsByMemberResponse>(`/cosmos/group/v1/groups_by_member/${req["address"]}?${fm.renderURLSearchParams(req, ["address"])}`, {...initReq, method: "GET"})
  }
  static TallyResult(req: QueryTallyResultRequest, initReq?: fm.InitReq): Promise<QueryTallyResultResponse> {
    return fm.fetchReq<QueryTallyResultRequest, QueryTallyResultResponse>(`/cosmos/group/v1/proposals/${req["proposal_id"]}/tally?${fm.renderURLSearchParams(req, ["proposal_id"])}`, {...initReq, method: "GET"})
  }
  static Groups(req: QueryGroupsRequest, initReq?: fm.InitReq): Promise<QueryGroupsResponse> {
    return fm.fetchReq<QueryGroupsRequest, QueryGroupsResponse>(`/cosmos/group/v1/groups?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}