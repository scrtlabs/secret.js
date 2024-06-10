/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../../fetch.pb"
import * as IbcApplicationsInterchain_accountsHostV1Host from "./host.pb"
export type MsgUpdateParams = {
  signer?: string
  params?: IbcApplicationsInterchain_accountsHostV1Host.Params
}

export type MsgUpdateParamsResponse = {
}

export class Msg {
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/ibc.applications.interchain_accounts.host.v1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}