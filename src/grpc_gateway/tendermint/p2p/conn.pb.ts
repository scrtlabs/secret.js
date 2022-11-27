/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as TendermintCryptoKeys from "../crypto/keys.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type PacketPing = {
}

export type PacketPong = {
}

export type PacketMsg = {
  channel_id?: number
  eof?: boolean
  data?: Uint8Array
}


type BasePacket = {
}

export type Packet = BasePacket
  & OneOf<{ packet_ping: PacketPing; packet_pong: PacketPong; packet_msg: PacketMsg }>

export type AuthSigMessage = {
  pub_key?: TendermintCryptoKeys.PublicKey
  sig?: Uint8Array
}