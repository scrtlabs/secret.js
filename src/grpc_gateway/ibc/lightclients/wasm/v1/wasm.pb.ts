/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as IbcCoreClientV1Client from "../../../core/client/v1/client.pb"
export type ClientState = {
  data?: Uint8Array
  checksum?: Uint8Array
  latest_height?: IbcCoreClientV1Client.Height
}

export type ConsensusState = {
  data?: Uint8Array
}

export type ClientMessage = {
  data?: Uint8Array
}

export type Checksums = {
  checksums?: Uint8Array[]
}