/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"

export enum Type {
  TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
  TYPE_EXECUTE_TX = "TYPE_EXECUTE_TX",
}

export type InterchainAccountPacketData = {
  type?: Type
  data?: Uint8Array
  memo?: string
}

export type CosmosTx = {
  messages?: GoogleProtobufAny.Any[]
}