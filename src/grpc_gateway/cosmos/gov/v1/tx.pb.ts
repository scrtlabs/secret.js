/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as GoogleProtobufTimestamp from "../../../google/protobuf/timestamp.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
import * as CosmosGovV1Gov from "./gov.pb"
export type MsgSubmitProposal = {
  messages?: GoogleProtobufAny.Any[]
  initial_deposit?: CosmosBaseV1beta1Coin.Coin[]
  proposer?: string
  metadata?: string
  title?: string
  summary?: string
  expedited?: boolean
}

export type MsgSubmitProposalResponse = {
  proposal_id?: string
}

export type MsgExecLegacyContent = {
  content?: GoogleProtobufAny.Any
  authority?: string
}

export type MsgExecLegacyContentResponse = {
}

export type MsgVote = {
  proposal_id?: string
  voter?: string
  option?: CosmosGovV1Gov.VoteOption
  metadata?: string
}

export type MsgVoteResponse = {
}

export type MsgVoteWeighted = {
  proposal_id?: string
  voter?: string
  options?: CosmosGovV1Gov.WeightedVoteOption[]
  metadata?: string
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

export type MsgUpdateParams = {
  authority?: string
  params?: CosmosGovV1Gov.Params
}

export type MsgUpdateParamsResponse = {
}

export type MsgCancelProposal = {
  proposal_id?: string
  proposer?: string
}

export type MsgCancelProposalResponse = {
  proposal_id?: string
  canceled_time?: GoogleProtobufTimestamp.Timestamp
  canceled_height?: string
}

export class Msg {
  static SubmitProposal(req: MsgSubmitProposal, initReq?: fm.InitReq): Promise<MsgSubmitProposalResponse> {
    return fm.fetchReq<MsgSubmitProposal, MsgSubmitProposalResponse>(`/cosmos.gov.v1.Msg/SubmitProposal`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ExecLegacyContent(req: MsgExecLegacyContent, initReq?: fm.InitReq): Promise<MsgExecLegacyContentResponse> {
    return fm.fetchReq<MsgExecLegacyContent, MsgExecLegacyContentResponse>(`/cosmos.gov.v1.Msg/ExecLegacyContent`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Vote(req: MsgVote, initReq?: fm.InitReq): Promise<MsgVoteResponse> {
    return fm.fetchReq<MsgVote, MsgVoteResponse>(`/cosmos.gov.v1.Msg/Vote`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static VoteWeighted(req: MsgVoteWeighted, initReq?: fm.InitReq): Promise<MsgVoteWeightedResponse> {
    return fm.fetchReq<MsgVoteWeighted, MsgVoteWeightedResponse>(`/cosmos.gov.v1.Msg/VoteWeighted`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Deposit(req: MsgDeposit, initReq?: fm.InitReq): Promise<MsgDepositResponse> {
    return fm.fetchReq<MsgDeposit, MsgDepositResponse>(`/cosmos.gov.v1.Msg/Deposit`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/cosmos.gov.v1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static CancelProposal(req: MsgCancelProposal, initReq?: fm.InitReq): Promise<MsgCancelProposalResponse> {
    return fm.fetchReq<MsgCancelProposal, MsgCancelProposalResponse>(`/cosmos.gov.v1.Msg/CancelProposal`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}