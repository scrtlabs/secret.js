/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
export type Config = {
  modules?: ModuleConfig[]
  golang_bindings?: GolangBinding[]
}

export type ModuleConfig = {
  name?: string
  config?: GoogleProtobufAny.Any
  golang_bindings?: GolangBinding[]
}

export type GolangBinding = {
  interface_type?: string
  implementation?: string
}