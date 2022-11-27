/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufDuration from "../../google/protobuf/duration.pb"
import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb"
import * as TendermintTypesEvents from "../types/events.pb"
import * as TendermintConsensusTypes from "./types.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type MsgInfo = {
  msg?: TendermintConsensusTypes.Message
  peer_id?: string
}

export type TimeoutInfo = {
  duration?: GoogleProtobufDuration.Duration
  height?: string
  round?: number
  step?: number
}

export type EndHeight = {
  height?: string
}


type BaseWALMessage = {
}

export type WALMessage = BaseWALMessage
  & OneOf<{ event_data_round_state: TendermintTypesEvents.EventDataRoundState; msg_info: MsgInfo; timeout_info: TimeoutInfo; end_height: EndHeight }>

export type TimedWALMessage = {
  time?: GoogleProtobufTimestamp.Timestamp
  msg?: WALMessage
}