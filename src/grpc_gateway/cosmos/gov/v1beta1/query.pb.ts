/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosGovV1beta1Gov from "./gov.pb"
export type QueryProposalRequest = {
  proposal_id?: string
}

export type QueryProposalResponse = {
  proposal?: CosmosGovV1beta1Gov.Proposal
}

export type QueryProposalsRequest = {
  proposal_status?: CosmosGovV1beta1Gov.ProposalStatus
  voter?: string
  depositor?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryProposalsResponse = {
  proposals?: CosmosGovV1beta1Gov.Proposal[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryVoteRequest = {
  proposal_id?: string
  voter?: string
}

export type QueryVoteResponse = {
  vote?: CosmosGovV1beta1Gov.Vote
}

export type QueryVotesRequest = {
  proposal_id?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryVotesResponse = {
  votes?: CosmosGovV1beta1Gov.Vote[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryParamsRequest = {
  params_type?: string
}

export type QueryParamsResponse = {
  voting_params?: CosmosGovV1beta1Gov.VotingParams
  deposit_params?: CosmosGovV1beta1Gov.DepositParams
  tally_params?: CosmosGovV1beta1Gov.TallyParams
}

export type QueryDepositRequest = {
  proposal_id?: string
  depositor?: string
}

export type QueryDepositResponse = {
  deposit?: CosmosGovV1beta1Gov.Deposit
}

export type QueryDepositsRequest = {
  proposal_id?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryDepositsResponse = {
  deposits?: CosmosGovV1beta1Gov.Deposit[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryTallyResultRequest = {
  proposal_id?: string
}

export type QueryTallyResultResponse = {
  tally?: CosmosGovV1beta1Gov.TallyResult
}

export class Query {
  static Proposal(req: QueryProposalRequest, initReq?: fm.InitReq): Promise<QueryProposalResponse> {
    return fm.fetchReq<QueryProposalRequest, QueryProposalResponse>(`/cosmos/gov/v1beta1/proposals/${req["proposal_id"]}?${fm.renderURLSearchParams(req, ["proposal_id"])}`, {...initReq, method: "GET"})
  }
  static Proposals(req: QueryProposalsRequest, initReq?: fm.InitReq): Promise<QueryProposalsResponse> {
    return fm.fetchReq<QueryProposalsRequest, QueryProposalsResponse>(`/cosmos/gov/v1beta1/proposals?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static Vote(req: QueryVoteRequest, initReq?: fm.InitReq): Promise<QueryVoteResponse> {
    return fm.fetchReq<QueryVoteRequest, QueryVoteResponse>(`/cosmos/gov/v1beta1/proposals/${req["proposal_id"]}/votes/${req["voter"]}?${fm.renderURLSearchParams(req, ["proposal_id", "voter"])}`, {...initReq, method: "GET"})
  }
  static Votes(req: QueryVotesRequest, initReq?: fm.InitReq): Promise<QueryVotesResponse> {
    return fm.fetchReq<QueryVotesRequest, QueryVotesResponse>(`/cosmos/gov/v1beta1/proposals/${req["proposal_id"]}/votes?${fm.renderURLSearchParams(req, ["proposal_id"])}`, {...initReq, method: "GET"})
  }
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/cosmos/gov/v1beta1/params/${req["params_type"]}?${fm.renderURLSearchParams(req, ["params_type"])}`, {...initReq, method: "GET"})
  }
  static Deposit(req: QueryDepositRequest, initReq?: fm.InitReq): Promise<QueryDepositResponse> {
    return fm.fetchReq<QueryDepositRequest, QueryDepositResponse>(`/cosmos/gov/v1beta1/proposals/${req["proposal_id"]}/deposits/${req["depositor"]}?${fm.renderURLSearchParams(req, ["proposal_id", "depositor"])}`, {...initReq, method: "GET"})
  }
  static Deposits(req: QueryDepositsRequest, initReq?: fm.InitReq): Promise<QueryDepositsResponse> {
    return fm.fetchReq<QueryDepositsRequest, QueryDepositsResponse>(`/cosmos/gov/v1beta1/proposals/${req["proposal_id"]}/deposits?${fm.renderURLSearchParams(req, ["proposal_id"])}`, {...initReq, method: "GET"})
  }
  static TallyResult(req: QueryTallyResultRequest, initReq?: fm.InitReq): Promise<QueryTallyResultResponse> {
    return fm.fetchReq<QueryTallyResultRequest, QueryTallyResultResponse>(`/cosmos/gov/v1beta1/proposals/${req["proposal_id"]}/tally?${fm.renderURLSearchParams(req, ["proposal_id"])}`, {...initReq, method: "GET"})
  }
}