/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufDuration from "../../../google/protobuf/duration.pb"
import * as GoogleProtobufTimestamp from "../../../google/protobuf/timestamp.pb"
export type ValidatorSigningInfo = {
  address?: string
  start_height?: string
  index_offset?: string
  jailed_until?: GoogleProtobufTimestamp.Timestamp
  tombstoned?: boolean
  missed_blocks_counter?: string
}

export type Params = {
  signed_blocks_window?: string
  min_signed_per_window?: Uint8Array
  downtime_jail_duration?: GoogleProtobufDuration.Duration
  slash_fraction_double_sign?: Uint8Array
  slash_fraction_downtime?: Uint8Array
}