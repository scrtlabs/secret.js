/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../fetch.pb"
import * as SecretCronParams from "./params.pb"
import * as SecretCronSchedule from "./schedule.pb"
export type MsgAddSchedule = {
  authority?: string
  name?: string
  period?: string
  msgs?: SecretCronSchedule.MsgExecuteContract[]
}

export type MsgAddScheduleResponse = {
}

export type MsgRemoveSchedule = {
  authority?: string
  name?: string
}

export type MsgRemoveScheduleResponse = {
}

export type MsgUpdateParams = {
  authority?: string
  params?: SecretCronParams.Params
}

export type MsgUpdateParamsResponse = {
}

export class Msg {
  static AddSchedule(req: MsgAddSchedule, initReq?: fm.InitReq): Promise<MsgAddScheduleResponse> {
    return fm.fetchReq<MsgAddSchedule, MsgAddScheduleResponse>(`/secret.cron.Msg/AddSchedule`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static RemoveSchedule(req: MsgRemoveSchedule, initReq?: fm.InitReq): Promise<MsgRemoveScheduleResponse> {
    return fm.fetchReq<MsgRemoveSchedule, MsgRemoveScheduleResponse>(`/secret.cron.Msg/RemoveSchedule`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/secret.cron.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}