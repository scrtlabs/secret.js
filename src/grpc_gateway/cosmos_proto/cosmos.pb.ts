/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum ScalarType {
  SCALAR_TYPE_UNSPECIFIED = "SCALAR_TYPE_UNSPECIFIED",
  SCALAR_TYPE_STRING = "SCALAR_TYPE_STRING",
  SCALAR_TYPE_BYTES = "SCALAR_TYPE_BYTES",
}

export type InterfaceDescriptor = {
  name?: string
  description?: string
}

export type ScalarDescriptor = {
  name?: string
  description?: string
  field_type?: ScalarType[]
}