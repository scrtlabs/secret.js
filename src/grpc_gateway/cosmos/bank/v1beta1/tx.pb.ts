/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
import * as CosmosBankV1beta1Bank from "./bank.pb"
export type MsgSend = {
  from_address?: string
  to_address?: string
  amount?: CosmosBaseV1beta1Coin.Coin[]
}

export type MsgSendResponse = {
}

export type MsgMultiSend = {
  inputs?: CosmosBankV1beta1Bank.Input[]
  outputs?: CosmosBankV1beta1Bank.Output[]
}

export type MsgMultiSendResponse = {
}

export class Msg {
  static Send(req: MsgSend, initReq?: fm.InitReq): Promise<MsgSendResponse> {
    return fm.fetchReq<MsgSend, MsgSendResponse>(`/cosmos.bank.v1beta1.Msg/Send`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static MultiSend(req: MsgMultiSend, initReq?: fm.InitReq): Promise<MsgMultiSendResponse> {
    return fm.fetchReq<MsgMultiSend, MsgMultiSendResponse>(`/cosmos.bank.v1beta1.Msg/MultiSend`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}