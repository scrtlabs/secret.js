/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type CommitInfo = {
  version?: string
  store_infos?: StoreInfo[]
}

export type StoreInfo = {
  name?: string
  commit_id?: CommitID
}

export type CommitID = {
  version?: string
  hash?: Uint8Array
}