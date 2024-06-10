/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufTimestamp from "../../../google/protobuf/timestamp.pb"
export type CommitInfo = {
  version?: string
  store_infos?: StoreInfo[]
  timestamp?: GoogleProtobufTimestamp.Timestamp
}

export type StoreInfo = {
  name?: string
  commit_id?: CommitID
}

export type CommitID = {
  version?: string
  hash?: Uint8Array
}