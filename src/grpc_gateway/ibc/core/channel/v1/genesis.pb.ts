/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as IbcCoreChannelV1Channel from "./channel.pb"
export type GenesisState = {
  channels?: IbcCoreChannelV1Channel.IdentifiedChannel[]
  acknowledgements?: IbcCoreChannelV1Channel.PacketState[]
  commitments?: IbcCoreChannelV1Channel.PacketState[]
  receipts?: IbcCoreChannelV1Channel.PacketState[]
  send_sequences?: PacketSequence[]
  recv_sequences?: PacketSequence[]
  ack_sequences?: PacketSequence[]
  next_channel_sequence?: string
}

export type PacketSequence = {
  port_id?: string
  channel_id?: string
  sequence?: string
}