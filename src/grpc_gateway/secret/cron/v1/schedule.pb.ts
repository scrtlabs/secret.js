/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type Schedule = {
  name?: string
  period?: string
  msgs?: MsgExecuteContract[]
  last_execute_height?: string
}

export type MsgExecuteContract = {
  contract?: string
  msg?: string
}

export type ScheduleCount = {
  count?: number
}