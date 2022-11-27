/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as TendermintLibsBitsTypes from "../libs/bits/types.pb"
import * as TendermintTypesTypes from "../types/types.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type NewRoundStep = {
  height?: string
  round?: number
  step?: number
  seconds_since_start_time?: string
  last_commit_round?: number
}

export type NewValidBlock = {
  height?: string
  round?: number
  block_part_set_header?: TendermintTypesTypes.PartSetHeader
  block_parts?: TendermintLibsBitsTypes.BitArray
  is_commit?: boolean
}

export type Proposal = {
  proposal?: TendermintTypesTypes.Proposal
}

export type ProposalPOL = {
  height?: string
  proposal_pol_round?: number
  proposal_pol?: TendermintLibsBitsTypes.BitArray
}

export type BlockPart = {
  height?: string
  round?: number
  part?: TendermintTypesTypes.Part
}

export type Vote = {
  vote?: TendermintTypesTypes.Vote
}

export type HasVote = {
  height?: string
  round?: number
  type?: TendermintTypesTypes.SignedMsgType
  index?: number
}

export type VoteSetMaj23 = {
  height?: string
  round?: number
  type?: TendermintTypesTypes.SignedMsgType
  block_id?: TendermintTypesTypes.BlockID
}

export type VoteSetBits = {
  height?: string
  round?: number
  type?: TendermintTypesTypes.SignedMsgType
  block_id?: TendermintTypesTypes.BlockID
  votes?: TendermintLibsBitsTypes.BitArray
}


type BaseMessage = {
}

export type Message = BaseMessage
  & OneOf<{ new_round_step: NewRoundStep; new_valid_block: NewValidBlock; proposal: Proposal; proposal_pol: ProposalPOL; block_part: BlockPart; vote: Vote; has_vote: HasVote; vote_set_maj23: VoteSetMaj23; vote_set_bits: VoteSetBits }>