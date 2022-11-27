/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
export type BaseAccount = {
  address?: string
  pub_key?: GoogleProtobufAny.Any
  account_number?: string
  sequence?: string
}

export type ModuleAccount = {
  base_account?: BaseAccount
  name?: string
  permissions?: string[]
}

export type Params = {
  max_memo_characters?: string
  tx_sig_limit?: string
  tx_size_cost_per_byte?: string
  sig_verify_cost_ed25519?: string
  sig_verify_cost_secp256k1?: string
}