/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosUpgradeV1beta1Upgrade from "./upgrade.pb"
export type MsgSoftwareUpgrade = {
  authority?: string
  plan?: CosmosUpgradeV1beta1Upgrade.Plan
}

export type MsgSoftwareUpgradeResponse = {
}

export type MsgCancelUpgrade = {
  authority?: string
}

export type MsgCancelUpgradeResponse = {
}

export class Msg {
  static SoftwareUpgrade(req: MsgSoftwareUpgrade, initReq?: fm.InitReq): Promise<MsgSoftwareUpgradeResponse> {
    return fm.fetchReq<MsgSoftwareUpgrade, MsgSoftwareUpgradeResponse>(`/cosmos.upgrade.v1beta1.Msg/SoftwareUpgrade`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static CancelUpgrade(req: MsgCancelUpgrade, initReq?: fm.InitReq): Promise<MsgCancelUpgradeResponse> {
    return fm.fetchReq<MsgCancelUpgrade, MsgCancelUpgradeResponse>(`/cosmos.upgrade.v1beta1.Msg/CancelUpgrade`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}