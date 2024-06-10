/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
import * as CosmosDistributionV1beta1Distribution from "./distribution.pb"
export type MsgSetWithdrawAddress = {
  delegator_address?: string
  withdraw_address?: string
}

export type MsgSetAutoRestake = {
  delegator_address?: string
  validator_address?: string
  enabled?: boolean
}

export type MsgSetAutoRestakeResponse = {
}

export type MsgSetWithdrawAddressResponse = {
}

export type MsgWithdrawDelegatorReward = {
  delegator_address?: string
  validator_address?: string
}

export type MsgWithdrawDelegatorRewardResponse = {
  amount?: CosmosBaseV1beta1Coin.Coin[]
}

export type MsgWithdrawValidatorCommission = {
  validator_address?: string
}

export type MsgWithdrawValidatorCommissionResponse = {
  amount?: CosmosBaseV1beta1Coin.Coin[]
}

export type MsgFundCommunityPool = {
  amount?: CosmosBaseV1beta1Coin.Coin[]
  depositor?: string
}

export type MsgFundCommunityPoolResponse = {
}

export type MsgUpdateParams = {
  authority?: string
  params?: CosmosDistributionV1beta1Distribution.Params
}

export type MsgUpdateParamsResponse = {
}

export type MsgCommunityPoolSpend = {
  authority?: string
  recipient?: string
  amount?: CosmosBaseV1beta1Coin.Coin[]
}

export type MsgCommunityPoolSpendResponse = {
}

export type MsgDepositValidatorRewardsPool = {
  depositor?: string
  validator_address?: string
  amount?: CosmosBaseV1beta1Coin.Coin[]
}

export type MsgDepositValidatorRewardsPoolResponse = {
}

export class Msg {
  static SetWithdrawAddress(req: MsgSetWithdrawAddress, initReq?: fm.InitReq): Promise<MsgSetWithdrawAddressResponse> {
    return fm.fetchReq<MsgSetWithdrawAddress, MsgSetWithdrawAddressResponse>(`/cosmos.distribution.v1beta1.Msg/SetWithdrawAddress`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static WithdrawDelegatorReward(req: MsgWithdrawDelegatorReward, initReq?: fm.InitReq): Promise<MsgWithdrawDelegatorRewardResponse> {
    return fm.fetchReq<MsgWithdrawDelegatorReward, MsgWithdrawDelegatorRewardResponse>(`/cosmos.distribution.v1beta1.Msg/WithdrawDelegatorReward`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static WithdrawValidatorCommission(req: MsgWithdrawValidatorCommission, initReq?: fm.InitReq): Promise<MsgWithdrawValidatorCommissionResponse> {
    return fm.fetchReq<MsgWithdrawValidatorCommission, MsgWithdrawValidatorCommissionResponse>(`/cosmos.distribution.v1beta1.Msg/WithdrawValidatorCommission`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static FundCommunityPool(req: MsgFundCommunityPool, initReq?: fm.InitReq): Promise<MsgFundCommunityPoolResponse> {
    return fm.fetchReq<MsgFundCommunityPool, MsgFundCommunityPoolResponse>(`/cosmos.distribution.v1beta1.Msg/FundCommunityPool`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static SetAutoRestake(req: MsgSetAutoRestake, initReq?: fm.InitReq): Promise<MsgSetAutoRestakeResponse> {
    return fm.fetchReq<MsgSetAutoRestake, MsgSetAutoRestakeResponse>(`/cosmos.distribution.v1beta1.Msg/SetAutoRestake`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/cosmos.distribution.v1beta1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static CommunityPoolSpend(req: MsgCommunityPoolSpend, initReq?: fm.InitReq): Promise<MsgCommunityPoolSpendResponse> {
    return fm.fetchReq<MsgCommunityPoolSpend, MsgCommunityPoolSpendResponse>(`/cosmos.distribution.v1beta1.Msg/CommunityPoolSpend`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static DepositValidatorRewardsPool(req: MsgDepositValidatorRewardsPool, initReq?: fm.InitReq): Promise<MsgDepositValidatorRewardsPoolResponse> {
    return fm.fetchReq<MsgDepositValidatorRewardsPool, MsgDepositValidatorRewardsPoolResponse>(`/cosmos.distribution.v1beta1.Msg/DepositValidatorRewardsPool`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}