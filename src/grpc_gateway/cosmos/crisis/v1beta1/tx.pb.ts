/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
export type MsgVerifyInvariant = {
  sender?: string
  invariant_module_name?: string
  invariant_route?: string
}

export type MsgVerifyInvariantResponse = {
}

export type MsgUpdateParams = {
  authority?: string
  constant_fee?: CosmosBaseV1beta1Coin.Coin
}

export type MsgUpdateParamsResponse = {
}

export class Msg {
  static VerifyInvariant(req: MsgVerifyInvariant, initReq?: fm.InitReq): Promise<MsgVerifyInvariantResponse> {
    return fm.fetchReq<MsgVerifyInvariant, MsgVerifyInvariantResponse>(`/cosmos.crisis.v1beta1.Msg/VerifyInvariant`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/cosmos.crisis.v1beta1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}