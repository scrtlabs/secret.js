/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as GoogleProtobufDuration from "../../../google/protobuf/duration.pb"
import * as GoogleProtobufTimestamp from "../../../google/protobuf/timestamp.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
export type BasicAllowance = {
  spend_limit?: CosmosBaseV1beta1Coin.Coin[]
  expiration?: GoogleProtobufTimestamp.Timestamp
}

export type PeriodicAllowance = {
  basic?: BasicAllowance
  period?: GoogleProtobufDuration.Duration
  period_spend_limit?: CosmosBaseV1beta1Coin.Coin[]
  period_can_spend?: CosmosBaseV1beta1Coin.Coin[]
  period_reset?: GoogleProtobufTimestamp.Timestamp
}

export type AllowedMsgAllowance = {
  allowance?: GoogleProtobufAny.Any
  allowed_messages?: string[]
}

export type Grant = {
  granter?: string
  grantee?: string
  allowance?: GoogleProtobufAny.Any
}