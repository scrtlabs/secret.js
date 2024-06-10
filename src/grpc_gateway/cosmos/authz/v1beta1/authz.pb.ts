/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as GoogleProtobufTimestamp from "../../../google/protobuf/timestamp.pb"
export type GenericAuthorization = {
  msg?: string
}

export type Grant = {
  authorization?: GoogleProtobufAny.Any
  expiration?: GoogleProtobufTimestamp.Timestamp
}

export type GrantAuthorization = {
  granter?: string
  grantee?: string
  authorization?: GoogleProtobufAny.Any
  expiration?: GoogleProtobufTimestamp.Timestamp
}

export type GrantQueueItem = {
  msg_type_urls?: string[]
}