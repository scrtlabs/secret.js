/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
import * as CosmosVestingV1beta1Vesting from "./vesting.pb"
export type MsgCreateVestingAccount = {
  from_address?: string
  to_address?: string
  amount?: CosmosBaseV1beta1Coin.Coin[]
  end_time?: string
  delayed?: boolean
}

export type MsgCreateVestingAccountResponse = {
}

export type MsgCreatePermanentLockedAccount = {
  from_address?: string
  to_address?: string
  amount?: CosmosBaseV1beta1Coin.Coin[]
}

export type MsgCreatePermanentLockedAccountResponse = {
}

export type MsgCreatePeriodicVestingAccount = {
  from_address?: string
  to_address?: string
  start_time?: string
  vesting_periods?: CosmosVestingV1beta1Vesting.Period[]
}

export type MsgCreatePeriodicVestingAccountResponse = {
}

export class Msg {
  static CreateVestingAccount(req: MsgCreateVestingAccount, initReq?: fm.InitReq): Promise<MsgCreateVestingAccountResponse> {
    return fm.fetchReq<MsgCreateVestingAccount, MsgCreateVestingAccountResponse>(`/cosmos.vesting.v1beta1.Msg/CreateVestingAccount`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static CreatePermanentLockedAccount(req: MsgCreatePermanentLockedAccount, initReq?: fm.InitReq): Promise<MsgCreatePermanentLockedAccountResponse> {
    return fm.fetchReq<MsgCreatePermanentLockedAccount, MsgCreatePermanentLockedAccountResponse>(`/cosmos.vesting.v1beta1.Msg/CreatePermanentLockedAccount`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static CreatePeriodicVestingAccount(req: MsgCreatePeriodicVestingAccount, initReq?: fm.InitReq): Promise<MsgCreatePeriodicVestingAccountResponse> {
    return fm.fetchReq<MsgCreatePeriodicVestingAccount, MsgCreatePeriodicVestingAccountResponse>(`/cosmos.vesting.v1beta1.Msg/CreatePeriodicVestingAccount`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}