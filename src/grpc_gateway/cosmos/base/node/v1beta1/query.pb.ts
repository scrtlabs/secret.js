/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
import * as GoogleProtobufTimestamp from "../../../../google/protobuf/timestamp.pb"
export type ConfigRequest = {
}

export type ConfigResponse = {
  minimum_gas_price?: string
  pruning_keep_recent?: string
  pruning_interval?: string
  halt_height?: string
}

export type StatusRequest = {
}

export type StatusResponse = {
  earliest_store_height?: string
  height?: string
  timestamp?: GoogleProtobufTimestamp.Timestamp
  app_hash?: Uint8Array
  validator_hash?: Uint8Array
}

export class Service {
  static Config(req: ConfigRequest, initReq?: fm.InitReq): Promise<ConfigResponse> {
    return fm.fetchReq<ConfigRequest, ConfigResponse>(`/cosmos/base/node/v1beta1/config?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static Status(req: StatusRequest, initReq?: fm.InitReq): Promise<StatusResponse> {
    return fm.fetchReq<StatusRequest, StatusResponse>(`/cosmos/base/node/v1beta1/status?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}