/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
export type MsgGrantAllowance = {
  granter?: string
  grantee?: string
  allowance?: GoogleProtobufAny.Any
}

export type MsgGrantAllowanceResponse = {
}

export type MsgRevokeAllowance = {
  granter?: string
  grantee?: string
}

export type MsgRevokeAllowanceResponse = {
}

export type MsgPruneAllowances = {
  pruner?: string
}

export type MsgPruneAllowancesResponse = {
}

export class Msg {
  static GrantAllowance(req: MsgGrantAllowance, initReq?: fm.InitReq): Promise<MsgGrantAllowanceResponse> {
    return fm.fetchReq<MsgGrantAllowance, MsgGrantAllowanceResponse>(`/cosmos.feegrant.v1beta1.Msg/GrantAllowance`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static RevokeAllowance(req: MsgRevokeAllowance, initReq?: fm.InitReq): Promise<MsgRevokeAllowanceResponse> {
    return fm.fetchReq<MsgRevokeAllowance, MsgRevokeAllowanceResponse>(`/cosmos.feegrant.v1beta1.Msg/RevokeAllowance`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static PruneAllowances(req: MsgPruneAllowances, initReq?: fm.InitReq): Promise<MsgPruneAllowancesResponse> {
    return fm.fetchReq<MsgPruneAllowances, MsgPruneAllowancesResponse>(`/cosmos.feegrant.v1beta1.Msg/PruneAllowances`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}