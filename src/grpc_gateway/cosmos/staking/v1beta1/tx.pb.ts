/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as GoogleProtobufTimestamp from "../../../google/protobuf/timestamp.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
import * as CosmosStakingV1beta1Staking from "./staking.pb"
export type MsgCreateValidator = {
  description?: CosmosStakingV1beta1Staking.Description
  commission?: CosmosStakingV1beta1Staking.CommissionRates
  min_self_delegation?: string
  delegator_address?: string
  validator_address?: string
  pubkey?: GoogleProtobufAny.Any
  value?: CosmosBaseV1beta1Coin.Coin
}

export type MsgCreateValidatorResponse = {
}

export type MsgEditValidator = {
  description?: CosmosStakingV1beta1Staking.Description
  validator_address?: string
  commission_rate?: string
  min_self_delegation?: string
}

export type MsgEditValidatorResponse = {
}

export type MsgDelegate = {
  delegator_address?: string
  validator_address?: string
  amount?: CosmosBaseV1beta1Coin.Coin
}

export type MsgDelegateResponse = {
}

export type MsgBeginRedelegate = {
  delegator_address?: string
  validator_src_address?: string
  validator_dst_address?: string
  amount?: CosmosBaseV1beta1Coin.Coin
}

export type MsgBeginRedelegateResponse = {
  completion_time?: GoogleProtobufTimestamp.Timestamp
}

export type MsgUndelegate = {
  delegator_address?: string
  validator_address?: string
  amount?: CosmosBaseV1beta1Coin.Coin
}

export type MsgUndelegateResponse = {
  completion_time?: GoogleProtobufTimestamp.Timestamp
}

export class Msg {
  static CreateValidator(req: MsgCreateValidator, initReq?: fm.InitReq): Promise<MsgCreateValidatorResponse> {
    return fm.fetchReq<MsgCreateValidator, MsgCreateValidatorResponse>(`/cosmos.staking.v1beta1.Msg/CreateValidator`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static EditValidator(req: MsgEditValidator, initReq?: fm.InitReq): Promise<MsgEditValidatorResponse> {
    return fm.fetchReq<MsgEditValidator, MsgEditValidatorResponse>(`/cosmos.staking.v1beta1.Msg/EditValidator`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Delegate(req: MsgDelegate, initReq?: fm.InitReq): Promise<MsgDelegateResponse> {
    return fm.fetchReq<MsgDelegate, MsgDelegateResponse>(`/cosmos.staking.v1beta1.Msg/Delegate`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static BeginRedelegate(req: MsgBeginRedelegate, initReq?: fm.InitReq): Promise<MsgBeginRedelegateResponse> {
    return fm.fetchReq<MsgBeginRedelegate, MsgBeginRedelegateResponse>(`/cosmos.staking.v1beta1.Msg/BeginRedelegate`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Undelegate(req: MsgUndelegate, initReq?: fm.InitReq): Promise<MsgUndelegateResponse> {
    return fm.fetchReq<MsgUndelegate, MsgUndelegateResponse>(`/cosmos.staking.v1beta1.Msg/Undelegate`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}