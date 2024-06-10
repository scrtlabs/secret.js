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
export type Snapshot = {
  height?: string
  format?: number
  chunks?: number
  hash?: Uint8Array
  metadata?: Metadata
}

export type Metadata = {
  chunk_hashes?: Uint8Array[]
}


type BaseSnapshotItem = {
}

export type SnapshotItem = BaseSnapshotItem
  & OneOf<{ store: SnapshotStoreItem; iavl: SnapshotIAVLItem; extension: SnapshotExtensionMeta; extension_payload: SnapshotExtensionPayload }>

export type SnapshotStoreItem = {
  name?: string
}

export type SnapshotIAVLItem = {
  key?: Uint8Array
  value?: Uint8Array
  version?: string
  height?: number
}

export type SnapshotExtensionMeta = {
  name?: string
  format?: number
}

export type SnapshotExtensionPayload = {
  payload?: Uint8Array
}