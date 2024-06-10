/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as CosmosAuthzV1beta1Authz from "./authz.pb"
export type MsgGrant = {
  granter?: string
  grantee?: string
  grant?: CosmosAuthzV1beta1Authz.Grant
}

export type MsgGrantResponse = {
}

export type MsgExec = {
  grantee?: string
  msgs?: GoogleProtobufAny.Any[]
}

export type MsgExecResponse = {
  results?: Uint8Array[]
}

export type MsgRevoke = {
  granter?: string
  grantee?: string
  msg_type_url?: string
}

export type MsgRevokeResponse = {
}

export class Msg {
  static Grant(req: MsgGrant, initReq?: fm.InitReq): Promise<MsgGrantResponse> {
    return fm.fetchReq<MsgGrant, MsgGrantResponse>(`/cosmos.authz.v1beta1.Msg/Grant`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Exec(req: MsgExec, initReq?: fm.InitReq): Promise<MsgExecResponse> {
    return fm.fetchReq<MsgExec, MsgExecResponse>(`/cosmos.authz.v1beta1.Msg/Exec`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static Revoke(req: MsgRevoke, initReq?: fm.InitReq): Promise<MsgRevokeResponse> {
    return fm.fetchReq<MsgRevoke, MsgRevokeResponse>(`/cosmos.authz.v1beta1.Msg/Revoke`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}