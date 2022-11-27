/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

type BaseMessage = {
}

export type Message = BaseMessage
  & OneOf<{ snapshots_request: SnapshotsRequest; snapshots_response: SnapshotsResponse; chunk_request: ChunkRequest; chunk_response: ChunkResponse }>

export type SnapshotsRequest = {
}

export type SnapshotsResponse = {
  height?: string
  format?: number
  chunks?: number
  hash?: Uint8Array
  metadata?: Uint8Array
}

export type ChunkRequest = {
  height?: string
  format?: number
  index?: number
}

export type ChunkResponse = {
  height?: string
  format?: number
  index?: number
  chunk?: Uint8Array
  missing?: boolean
}