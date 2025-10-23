/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum ExecutionStage {
  EXECUTION_STAGE_END_BLOCKER = "EXECUTION_STAGE_END_BLOCKER",
  EXECUTION_STAGE_BEGIN_BLOCKER = "EXECUTION_STAGE_BEGIN_BLOCKER",
}

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