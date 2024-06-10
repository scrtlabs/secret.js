/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
export type ClientState = {
  sequence?: string
  is_frozen?: boolean
  consensus_state?: ConsensusState
}

export type ConsensusState = {
  public_key?: GoogleProtobufAny.Any
  diversifier?: string
  timestamp?: string
}

export type Header = {
  timestamp?: string
  signature?: Uint8Array
  new_public_key?: GoogleProtobufAny.Any
  new_diversifier?: string
}

export type Misbehaviour = {
  sequence?: string
  signature_one?: SignatureAndData
  signature_two?: SignatureAndData
}

export type SignatureAndData = {
  signature?: Uint8Array
  path?: Uint8Array
  data?: Uint8Array
  timestamp?: string
}

export type TimestampedSignatureData = {
  signature_data?: Uint8Array
  timestamp?: string
}

export type SignBytes = {
  sequence?: string
  timestamp?: string
  diversifier?: string
  path?: Uint8Array
  data?: Uint8Array
}

export type HeaderData = {
  new_pub_key?: GoogleProtobufAny.Any
  new_diversifier?: string
}