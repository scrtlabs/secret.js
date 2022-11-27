/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as TendermintCryptoKeys from "../crypto/keys.pb"
export type ValidatorSet = {
  validators?: Validator[]
  proposer?: Validator
  total_voting_power?: string
}

export type Validator = {
  address?: Uint8Array
  pub_key?: TendermintCryptoKeys.PublicKey
  voting_power?: string
  proposer_priority?: string
}

export type SimpleValidator = {
  pub_key?: TendermintCryptoKeys.PublicKey
  voting_power?: string
}