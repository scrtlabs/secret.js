/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as GoogleProtobufTimestamp from "../../../google/protobuf/timestamp.pb"
export type Plan = {
  name?: string
  time?: GoogleProtobufTimestamp.Timestamp
  height?: string
  info?: string
  upgraded_client_state?: GoogleProtobufAny.Any
}

export type SoftwareUpgradeProposal = {
  title?: string
  description?: string
  plan?: Plan
}

export type CancelSoftwareUpgradeProposal = {
  title?: string
  description?: string
}

export type ModuleVersion = {
  name?: string
  version?: string
}