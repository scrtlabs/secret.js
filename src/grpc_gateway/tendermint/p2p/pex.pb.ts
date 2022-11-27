/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as TendermintP2pTypes from "./types.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type PexRequest = {
}

export type PexAddrs = {
  addrs?: TendermintP2pTypes.NetAddress[]
}


type BaseMessage = {
}

export type Message = BaseMessage
  & OneOf<{ pex_request: PexRequest; pex_addrs: PexAddrs }>