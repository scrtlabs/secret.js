/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type GenesisState = {
  params?: Params
  in_flight_packets?: {[key: string]: InFlightPacket}
}

export type Params = {
  fee_percentage?: string
}

export type InFlightPacket = {
  original_sender_address?: string
  refund_channel_id?: string
  refund_port_id?: string
  packet_src_channel_id?: string
  packet_src_port_id?: string
  packet_timeout_timestamp?: string
  packet_timeout_height?: string
  packet_data?: Uint8Array
  refund_sequence?: string
  retries_remaining?: number
  timeout?: string
  nonrefundable?: boolean
}