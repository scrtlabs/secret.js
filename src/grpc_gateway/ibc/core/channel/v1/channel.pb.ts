/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as IbcCoreClientV1Client from "../../client/v1/client.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum State {
  STATE_UNINITIALIZED_UNSPECIFIED = "STATE_UNINITIALIZED_UNSPECIFIED",
  STATE_INIT = "STATE_INIT",
  STATE_TRYOPEN = "STATE_TRYOPEN",
  STATE_OPEN = "STATE_OPEN",
  STATE_CLOSED = "STATE_CLOSED",
}

export enum Order {
  ORDER_NONE_UNSPECIFIED = "ORDER_NONE_UNSPECIFIED",
  ORDER_UNORDERED = "ORDER_UNORDERED",
  ORDER_ORDERED = "ORDER_ORDERED",
}

export type Channel = {
  state?: State
  ordering?: Order
  counterparty?: Counterparty
  connection_hops?: string[]
  version?: string
}

export type IdentifiedChannel = {
  state?: State
  ordering?: Order
  counterparty?: Counterparty
  connection_hops?: string[]
  version?: string
  port_id?: string
  channel_id?: string
}

export type Counterparty = {
  port_id?: string
  channel_id?: string
}

export type Packet = {
  sequence?: string
  source_port?: string
  source_channel?: string
  destination_port?: string
  destination_channel?: string
  data?: Uint8Array
  timeout_height?: IbcCoreClientV1Client.Height
  timeout_timestamp?: string
}

export type PacketState = {
  port_id?: string
  channel_id?: string
  sequence?: string
  data?: Uint8Array
}

export type PacketId = {
  port_id?: string
  channel_id?: string
  sequence?: string
}


type BaseAcknowledgement = {
}

export type Acknowledgement = BaseAcknowledgement
  & OneOf<{ result: Uint8Array; error: string }>