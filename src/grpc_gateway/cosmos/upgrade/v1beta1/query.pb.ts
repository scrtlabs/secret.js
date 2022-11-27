/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosUpgradeV1beta1Upgrade from "./upgrade.pb"
export type QueryCurrentPlanRequest = {
}

export type QueryCurrentPlanResponse = {
  plan?: CosmosUpgradeV1beta1Upgrade.Plan
}

export type QueryAppliedPlanRequest = {
  name?: string
}

export type QueryAppliedPlanResponse = {
  height?: string
}

export type QueryUpgradedConsensusStateRequest = {
  last_height?: string
}

export type QueryUpgradedConsensusStateResponse = {
  upgraded_consensus_state?: Uint8Array
}

export type QueryModuleVersionsRequest = {
  module_name?: string
}

export type QueryModuleVersionsResponse = {
  module_versions?: CosmosUpgradeV1beta1Upgrade.ModuleVersion[]
}

export class Query {
  static CurrentPlan(req: QueryCurrentPlanRequest, initReq?: fm.InitReq): Promise<QueryCurrentPlanResponse> {
    return fm.fetchReq<QueryCurrentPlanRequest, QueryCurrentPlanResponse>(`/cosmos/upgrade/v1beta1/current_plan?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static AppliedPlan(req: QueryAppliedPlanRequest, initReq?: fm.InitReq): Promise<QueryAppliedPlanResponse> {
    return fm.fetchReq<QueryAppliedPlanRequest, QueryAppliedPlanResponse>(`/cosmos/upgrade/v1beta1/applied_plan/${req["name"]}?${fm.renderURLSearchParams(req, ["name"])}`, {...initReq, method: "GET"})
  }
  static UpgradedConsensusState(req: QueryUpgradedConsensusStateRequest, initReq?: fm.InitReq): Promise<QueryUpgradedConsensusStateResponse> {
    return fm.fetchReq<QueryUpgradedConsensusStateRequest, QueryUpgradedConsensusStateResponse>(`/cosmos/upgrade/v1beta1/upgraded_consensus_state/${req["last_height"]}?${fm.renderURLSearchParams(req, ["last_height"])}`, {...initReq, method: "GET"})
  }
  static ModuleVersions(req: QueryModuleVersionsRequest, initReq?: fm.InitReq): Promise<QueryModuleVersionsResponse> {
    return fm.fetchReq<QueryModuleVersionsRequest, QueryModuleVersionsResponse>(`/cosmos/upgrade/v1beta1/module_versions?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}