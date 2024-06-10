/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as IbcCoreChannelV1Channel from "./channel.pb"
export type Upgrade = {
  fields?: UpgradeFields
  timeout?: IbcCoreChannelV1Channel.Timeout
  next_sequence_send?: string
}

export type UpgradeFields = {
  ordering?: IbcCoreChannelV1Channel.Order
  connection_hops?: string[]
  version?: string
}

export type ErrorReceipt = {
  sequence?: string
  message?: string
}