/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
import * as CosmosCryptoMultisigV1beta1Multisig from "../../../crypto/multisig/v1beta1/multisig.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum SignMode {
  SIGN_MODE_UNSPECIFIED = "SIGN_MODE_UNSPECIFIED",
  SIGN_MODE_DIRECT = "SIGN_MODE_DIRECT",
  SIGN_MODE_TEXTUAL = "SIGN_MODE_TEXTUAL",
  SIGN_MODE_DIRECT_AUX = "SIGN_MODE_DIRECT_AUX",
  SIGN_MODE_LEGACY_AMINO_JSON = "SIGN_MODE_LEGACY_AMINO_JSON",
  SIGN_MODE_EIP_191 = "SIGN_MODE_EIP_191",
}

export type SignatureDescriptors = {
  signatures?: SignatureDescriptor[]
}

export type SignatureDescriptorDataSingle = {
  mode?: SignMode
  signature?: Uint8Array
}

export type SignatureDescriptorDataMulti = {
  bitarray?: CosmosCryptoMultisigV1beta1Multisig.CompactBitArray
  signatures?: SignatureDescriptorData[]
}


type BaseSignatureDescriptorData = {
}

export type SignatureDescriptorData = BaseSignatureDescriptorData
  & OneOf<{ single: SignatureDescriptorDataSingle; multi: SignatureDescriptorDataMulti }>

export type SignatureDescriptor = {
  public_key?: GoogleProtobufAny.Any
  data?: SignatureDescriptorData
  sequence?: string
}