/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
import * as CosmosGovV1beta1Gov from "./gov.pb"
export type MsgSubmitProposal = {
  content?: GoogleProtobufAny.Any
  initial_deposit?: CosmosBaseV1beta1Coin.Coin[]
  proposer?: string
}

export type MsgSubmitProposalResponse = {
  proposal_id?: string
}

export type MsgVote = {
  proposal_id?: string
  voter?: string
  option?: CosmosGovV1beta1Gov.VoteOption
}

export type MsgVoteResponse = {
}

export type MsgVoteWeighted = {
  proposal_id?: string
  voter?: string
  options?: CosmosGovV1beta1Gov.WeightedVoteOption[]
}

export type MsgVoteWeightedResponse = {
}

export type MsgDeposit = {
  proposal_id?: string
  depositor?: string
  amount?: CosmosBaseV1beta1Coin.Coin[]
}

export type MsgDepositResponse = {
}

export class Msg {
  static SubmitProposal(req: MsgSubmitProposal, initReq?: fm.InitReq): Promise<MsgSubmitProposalResponse> {
    return fm.fetchReq<MsgSubmitProposal, MsgSubmitProposalResponse>(`/cosmos.gov.v1beta1.Msg/SubmitProposal`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Vote(req: MsgVote, initReq?: fm.InitReq): Promise<MsgVoteResponse> {
    return fm.fetchReq<MsgVote, MsgVoteResponse>(`/cosmos.gov.v1beta1.Msg/Vote`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static VoteWeighted(req: MsgVoteWeighted, initReq?: fm.InitReq): Promise<MsgVoteWeightedResponse> {
    return fm.fetchReq<MsgVoteWeighted, MsgVoteWeightedResponse>(`/cosmos.gov.v1beta1.Msg/VoteWeighted`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Deposit(req: MsgDeposit, initReq?: fm.InitReq): Promise<MsgDepositResponse> {
    return fm.fetchReq<MsgDeposit, MsgDepositResponse>(`/cosmos.gov.v1beta1.Msg/Deposit`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}