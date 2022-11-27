/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosSlashingV1beta1Slashing from "./slashing.pb"
export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: CosmosSlashingV1beta1Slashing.Params
}

export type QuerySigningInfoRequest = {
  cons_address?: string
}

export type QuerySigningInfoResponse = {
  val_signing_info?: CosmosSlashingV1beta1Slashing.ValidatorSigningInfo
}

export type QuerySigningInfosRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QuerySigningInfosResponse = {
  info?: CosmosSlashingV1beta1Slashing.ValidatorSigningInfo[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export class Query {
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/cosmos/slashing/v1beta1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static SigningInfo(req: QuerySigningInfoRequest, initReq?: fm.InitReq): Promise<QuerySigningInfoResponse> {
    return fm.fetchReq<QuerySigningInfoRequest, QuerySigningInfoResponse>(`/cosmos/slashing/v1beta1/signing_infos/${req["cons_address"]}?${fm.renderURLSearchParams(req, ["cons_address"])}`, {...initReq, method: "GET"})
  }
  static SigningInfos(req: QuerySigningInfosRequest, initReq?: fm.InitReq): Promise<QuerySigningInfosResponse> {
    return fm.fetchReq<QuerySigningInfosRequest, QuerySigningInfosResponse>(`/cosmos/slashing/v1beta1/signing_infos?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}