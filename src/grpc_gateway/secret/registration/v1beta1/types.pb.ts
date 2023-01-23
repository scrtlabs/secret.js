/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type SeedConfig = {
  master_key?: string
  encrypted_key?: string
  version?: number
}

export type LegacySeedConfig = {
  master_cert?: string
  encrypted_key?: string
}

export type RegistrationNodeInfo = {
  certificate?: Uint8Array
  encrypted_seed?: Uint8Array
}