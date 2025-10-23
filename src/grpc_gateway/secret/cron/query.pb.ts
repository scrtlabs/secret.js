/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseQueryV1beta1Pagination from "../../cosmos/base/query/v1beta1/pagination.pb"
import * as fm from "../../fetch.pb"
import * as SecretCronParams from "./params.pb"
import * as SecretCronSchedule from "./schedule.pb"
export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: SecretCronParams.Params
}

export type QueryGetScheduleRequest = {
  name?: string
}

export type QueryGetScheduleResponse = {
  schedule?: SecretCronSchedule.Schedule
}

export type QuerySchedulesRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QuerySchedulesResponse = {
  schedules?: SecretCronSchedule.Schedule[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export class Query {
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/secret/cron/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static Schedule(req: QueryGetScheduleRequest, initReq?: fm.InitReq): Promise<QueryGetScheduleResponse> {
    return fm.fetchReq<QueryGetScheduleRequest, QueryGetScheduleResponse>(`/secret/cron/schedule/${req["name"]}?${fm.renderURLSearchParams(req, ["name"])}`, {...initReq, method: "GET"})
  }
  static Schedules(req: QuerySchedulesRequest, initReq?: fm.InitReq): Promise<QuerySchedulesResponse> {
    return fm.fetchReq<QuerySchedulesRequest, QuerySchedulesResponse>(`/secret/cron/schedule?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}