/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
export type MsgCreateVestingAccount = {
  from_address?: string
  to_address?: string
  amount?: CosmosBaseV1beta1Coin.Coin[]
  end_time?: string
  delayed?: boolean
}

export type MsgCreateVestingAccountResponse = {
}

export class Msg {
  static CreateVestingAccount(req: MsgCreateVestingAccount, initReq?: fm.InitReq): Promise<MsgCreateVestingAccountResponse> {
    return fm.fetchReq<MsgCreateVestingAccount, MsgCreateVestingAccountResponse>(`/cosmos.vesting.v1beta1.Msg/CreateVestingAccount`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}