/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosCircuitV1Types from "./types.pb"
export type MsgAuthorizeCircuitBreaker = {
  granter?: string
  grantee?: string
  permissions?: CosmosCircuitV1Types.Permissions
}

export type MsgAuthorizeCircuitBreakerResponse = {
  success?: boolean
}

export type MsgTripCircuitBreaker = {
  authority?: string
  msg_type_urls?: string[]
}

export type MsgTripCircuitBreakerResponse = {
  success?: boolean
}

export type MsgResetCircuitBreaker = {
  authority?: string
  msg_type_urls?: string[]
}

export type MsgResetCircuitBreakerResponse = {
  success?: boolean
}

export class Msg {
  static AuthorizeCircuitBreaker(req: MsgAuthorizeCircuitBreaker, initReq?: fm.InitReq): Promise<MsgAuthorizeCircuitBreakerResponse> {
    return fm.fetchReq<MsgAuthorizeCircuitBreaker, MsgAuthorizeCircuitBreakerResponse>(`/cosmos.circuit.v1.Msg/AuthorizeCircuitBreaker`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static TripCircuitBreaker(req: MsgTripCircuitBreaker, initReq?: fm.InitReq): Promise<MsgTripCircuitBreakerResponse> {
    return fm.fetchReq<MsgTripCircuitBreaker, MsgTripCircuitBreakerResponse>(`/cosmos.circuit.v1.Msg/TripCircuitBreaker`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ResetCircuitBreaker(req: MsgResetCircuitBreaker, initReq?: fm.InitReq): Promise<MsgResetCircuitBreakerResponse> {
    return fm.fetchReq<MsgResetCircuitBreaker, MsgResetCircuitBreakerResponse>(`/cosmos.circuit.v1.Msg/ResetCircuitBreaker`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}