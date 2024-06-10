/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
import * as CosmosCryptoHdV1Hd from "../../hd/v1/hd.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type RecordLocal = {
  priv_key?: GoogleProtobufAny.Any
}

export type RecordLedger = {
  path?: CosmosCryptoHdV1Hd.BIP44Params
}

export type RecordMulti = {
}

export type RecordOffline = {
}


type BaseRecord = {
  name?: string
  pub_key?: GoogleProtobufAny.Any
}

export type Record = BaseRecord
  & OneOf<{ local: RecordLocal; ledger: RecordLedger; multi: RecordMulti; offline: RecordOffline }>