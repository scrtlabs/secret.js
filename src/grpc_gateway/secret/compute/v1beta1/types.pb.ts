/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum AccessType {
  UNDEFINED = "UNDEFINED",
  NOBODY = "NOBODY",
  ONLY_ADDRESS = "ONLY_ADDRESS",
  EVERYBODY = "EVERYBODY",
}

export type AccessTypeParam = {
  value?: AccessType
}

export type CodeInfo = {
  code_hash?: Uint8Array
  creator?: Uint8Array
  source?: string
  builder?: string
}

export type ContractCustomInfo = {
  enclave_key?: Uint8Array
  label?: string
}

export type ContractInfo = {
  code_id?: string
  creator?: Uint8Array
  label?: string
  created?: AbsoluteTxPosition
  ibc_port_id?: string
}

export type AbsoluteTxPosition = {
  block_height?: string
  tx_index?: string
}

export type Model = {
  Key?: Uint8Array
  Value?: Uint8Array
}