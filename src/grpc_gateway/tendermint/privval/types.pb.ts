/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as TendermintCryptoKeys from "../crypto/keys.pb"
import * as TendermintTypesTypes from "../types/types.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum Errors {
  ERRORS_UNKNOWN = "ERRORS_UNKNOWN",
  ERRORS_UNEXPECTED_RESPONSE = "ERRORS_UNEXPECTED_RESPONSE",
  ERRORS_NO_CONNECTION = "ERRORS_NO_CONNECTION",
  ERRORS_CONNECTION_TIMEOUT = "ERRORS_CONNECTION_TIMEOUT",
  ERRORS_READ_TIMEOUT = "ERRORS_READ_TIMEOUT",
  ERRORS_WRITE_TIMEOUT = "ERRORS_WRITE_TIMEOUT",
}

export type RemoteSignerError = {
  code?: number
  description?: string
}

export type PubKeyRequest = {
  chain_id?: string
}

export type PubKeyResponse = {
  pub_key?: TendermintCryptoKeys.PublicKey
  error?: RemoteSignerError
}

export type SignVoteRequest = {
  vote?: TendermintTypesTypes.Vote
  chain_id?: string
}

export type SignedVoteResponse = {
  vote?: TendermintTypesTypes.Vote
  error?: RemoteSignerError
}

export type SignProposalRequest = {
  proposal?: TendermintTypesTypes.Proposal
  chain_id?: string
}

export type SignedProposalResponse = {
  proposal?: TendermintTypesTypes.Proposal
  error?: RemoteSignerError
}

export type PingRequest = {
}

export type PingResponse = {
}


type BaseMessage = {
}

export type Message = BaseMessage
  & OneOf<{ pub_key_request: PubKeyRequest; pub_key_response: PubKeyResponse; sign_vote_request: SignVoteRequest; signed_vote_response: SignedVoteResponse; sign_proposal_request: SignProposalRequest; signed_proposal_response: SignedProposalResponse; ping_request: PingRequest; ping_response: PingResponse }>