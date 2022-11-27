/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type PageRequest = {
  key?: Uint8Array
  offset?: string
  limit?: string
  count_total?: boolean
  reverse?: boolean
}

export type PageResponse = {
  next_key?: Uint8Array
  total?: string
}