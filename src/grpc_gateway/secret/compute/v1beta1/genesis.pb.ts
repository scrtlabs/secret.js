/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as SecretComputeV1beta1Types from "./types.pb"
export type GenesisState = {
  codes?: Code[]
  contracts?: Contract[]
  sequences?: Sequence[]
}

export type Code = {
  code_id?: string
  code_info?: SecretComputeV1beta1Types.CodeInfo
  code_bytes?: Uint8Array
}

export type Contract = {
  contract_address?: Uint8Array
  contract_info?: SecretComputeV1beta1Types.ContractInfo
  contract_state?: SecretComputeV1beta1Types.Model[]
  contract_custom_info?: SecretComputeV1beta1Types.ContractCustomInfo
}

export type Sequence = {
  id_key?: Uint8Array
  value?: string
}