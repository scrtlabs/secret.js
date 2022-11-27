/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
export type MsgRegisterAccount = {
  owner?: string
  connection_id?: string
}

export type MsgRegisterAccountResponse = {
}

export type MsgSubmitTx = {
  owner?: Uint8Array
  connection_id?: string
  msg?: GoogleProtobufAny.Any
}

export type MsgSubmitTxResponse = {
}

export class Msg {
  static RegisterAccount(req: MsgRegisterAccount, initReq?: fm.InitReq): Promise<MsgRegisterAccountResponse> {
    return fm.fetchReq<MsgRegisterAccount, MsgRegisterAccountResponse>(`/mauth/v1beta1/register-account`, {...initReq, method: "POST"})
  }
  static SubmitTx(req: MsgSubmitTx, initReq?: fm.InitReq): Promise<MsgSubmitTxResponse> {
    return fm.fetchReq<MsgSubmitTx, MsgSubmitTxResponse>(`/mauth/v1beta1/submit-tx`, {...initReq, method: "POST"})
  }
}