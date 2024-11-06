/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
export type RaAuthenticate = {
  sender?: Uint8Array
  certificate?: Uint8Array
}

export type RaAuthenticateResponse = {
  data?: string
  events?: string
}

export type MasterKey = {
  bytes?: Uint8Array
}

export type Key = {
  key?: Uint8Array
}

export class Msg {
  static RegisterAuth(req: RaAuthenticate, initReq?: fm.InitReq): Promise<RaAuthenticateResponse> {
    return fm.fetchReq<RaAuthenticate, RaAuthenticateResponse>(`/secret.registration.v1beta1.Msg/RegisterAuth`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}