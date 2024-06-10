/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
import * as GoogleProtobufDuration from "../../../../google/protobuf/duration.pb"
import * as GoogleProtobufTimestamp from "../../../../google/protobuf/timestamp.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../../base/query/v1beta1/pagination.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type GetRequest = {
  message_name?: string
  index?: string
  values?: IndexValue[]
}

export type GetResponse = {
  result?: GoogleProtobufAny.Any
}

export type ListRequestPrefix = {
  values?: IndexValue[]
}

export type ListRequestRange = {
  start?: IndexValue[]
  end?: IndexValue[]
}


type BaseListRequest = {
  message_name?: string
  index?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type ListRequest = BaseListRequest
  & OneOf<{ prefix: ListRequestPrefix; range: ListRequestRange }>

export type ListResponse = {
  results?: GoogleProtobufAny.Any[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}


type BaseIndexValue = {
}

export type IndexValue = BaseIndexValue
  & OneOf<{ uint: string; int: string; str: string; bytes: Uint8Array; enum: string; bool: boolean; timestamp: GoogleProtobufTimestamp.Timestamp; duration: GoogleProtobufDuration.Duration }>

export class Query {
  static Get(req: GetRequest, initReq?: fm.InitReq): Promise<GetResponse> {
    return fm.fetchReq<GetRequest, GetResponse>(`/cosmos.orm.query.v1alpha1.Query/Get`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static List(req: ListRequest, initReq?: fm.InitReq): Promise<ListResponse> {
    return fm.fetchReq<ListRequest, ListResponse>(`/cosmos.orm.query.v1alpha1.Query/List`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}