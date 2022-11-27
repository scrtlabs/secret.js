/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as TendermintTypesBlock from "../types/block.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type BlockRequest = {
  height?: string
}

export type NoBlockResponse = {
  height?: string
}

export type BlockResponse = {
  block?: TendermintTypesBlock.Block
}

export type StatusRequest = {
}

export type StatusResponse = {
  height?: string
  base?: string
}


type BaseMessage = {
}

export type Message = BaseMessage
  & OneOf<{ block_request: BlockRequest; no_block_response: NoBlockResponse; block_response: BlockResponse; status_request: StatusRequest; status_response: StatusResponse }>