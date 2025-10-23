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

export enum ContractCodeHistoryOperationType {
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED",
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT",
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE",
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS",
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

export type ContractKey = {
  og_contract_key?: Uint8Array
  current_contract_key?: Uint8Array
  current_contract_key_proof?: Uint8Array
}

export type ContractCustomInfo = {
  enclave_key?: ContractKey
  label?: string
}

export type ContractInfo = {
  code_id?: string
  creator?: Uint8Array
  label?: string
  created?: AbsoluteTxPosition
  ibc_port_id?: string
  admin?: string
  admin_proof?: Uint8Array
  require_governance?: boolean
}

export type AbsoluteTxPosition = {
  block_height?: string
  tx_index?: string
}

export type Model = {
  Key?: Uint8Array
  Value?: Uint8Array
}

export type ContractCodeHistoryEntry = {
  operation?: ContractCodeHistoryOperationType
  code_id?: string
  updated?: AbsoluteTxPosition
  msg?: Uint8Array
}