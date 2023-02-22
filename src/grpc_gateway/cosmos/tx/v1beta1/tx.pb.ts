/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
import * as CosmosCryptoMultisigV1beta1Multisig from "../../crypto/multisig/v1beta1/multisig.pb"
import * as CosmosTxSigningV1beta1Signing from "../signing/v1beta1/signing.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type Txs = {
  tx?: Uint8Array[]
}

export type Tx = {
  body?: TxBody
  auth_info?: AuthInfo
  signatures?: Uint8Array[]
}

export type TxRaw = {
  body_bytes?: Uint8Array
  auth_info_bytes?: Uint8Array
  signatures?: Uint8Array[]
}

export type SignDoc = {
  body_bytes?: Uint8Array
  auth_info_bytes?: Uint8Array
  chain_id?: string
  account_number?: string
}

export type TxBody = {
  messages?: GoogleProtobufAny.Any[]
  memo?: string
  timeout_height?: string
  extension_options?: GoogleProtobufAny.Any[]
  non_critical_extension_options?: GoogleProtobufAny.Any[]
}

export type AuthInfo = {
  signer_infos?: SignerInfo[]
  fee?: Fee
}

export type SignerInfo = {
  public_key?: GoogleProtobufAny.Any
  mode_info?: ModeInfo
  sequence?: string
}

export type ModeInfoSingle = {
  mode?: CosmosTxSigningV1beta1Signing.SignMode
}

export type ModeInfoMulti = {
  bitarray?: CosmosCryptoMultisigV1beta1Multisig.CompactBitArray
  mode_infos?: ModeInfo[]
}


type BaseModeInfo = {
}

export type ModeInfo = BaseModeInfo
  & OneOf<{ single: ModeInfoSingle; multi: ModeInfoMulti }>

export type Fee = {
  amount?: CosmosBaseV1beta1Coin.Coin[]
  gas_limit?: string
  payer?: string
  granter?: string
}