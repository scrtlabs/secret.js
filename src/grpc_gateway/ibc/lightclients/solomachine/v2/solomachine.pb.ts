/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
import * as IbcCoreChannelV1Channel from "../../../core/channel/v1/channel.pb"
import * as IbcCoreConnectionV1Connection from "../../../core/connection/v1/connection.pb"

export enum DataType {
  DATA_TYPE_UNINITIALIZED_UNSPECIFIED = "DATA_TYPE_UNINITIALIZED_UNSPECIFIED",
  DATA_TYPE_CLIENT_STATE = "DATA_TYPE_CLIENT_STATE",
  DATA_TYPE_CONSENSUS_STATE = "DATA_TYPE_CONSENSUS_STATE",
  DATA_TYPE_CONNECTION_STATE = "DATA_TYPE_CONNECTION_STATE",
  DATA_TYPE_CHANNEL_STATE = "DATA_TYPE_CHANNEL_STATE",
  DATA_TYPE_PACKET_COMMITMENT = "DATA_TYPE_PACKET_COMMITMENT",
  DATA_TYPE_PACKET_ACKNOWLEDGEMENT = "DATA_TYPE_PACKET_ACKNOWLEDGEMENT",
  DATA_TYPE_PACKET_RECEIPT_ABSENCE = "DATA_TYPE_PACKET_RECEIPT_ABSENCE",
  DATA_TYPE_NEXT_SEQUENCE_RECV = "DATA_TYPE_NEXT_SEQUENCE_RECV",
  DATA_TYPE_HEADER = "DATA_TYPE_HEADER",
}

export type ClientState = {
  sequence?: string
  is_frozen?: boolean
  consensus_state?: ConsensusState
  allow_update_after_proposal?: boolean
}

export type ConsensusState = {
  public_key?: GoogleProtobufAny.Any
  diversifier?: string
  timestamp?: string
}

export type Header = {
  sequence?: string
  timestamp?: string
  signature?: Uint8Array
  new_public_key?: GoogleProtobufAny.Any
  new_diversifier?: string
}

export type Misbehaviour = {
  client_id?: string
  sequence?: string
  signature_one?: SignatureAndData
  signature_two?: SignatureAndData
}

export type SignatureAndData = {
  signature?: Uint8Array
  data_type?: DataType
  data?: Uint8Array
  timestamp?: string
}

export type TimestampedSignatureData = {
  signature_data?: Uint8Array
  timestamp?: string
}

export type SignBytes = {
  sequence?: string
  timestamp?: string
  diversifier?: string
  data_type?: DataType
  data?: Uint8Array
}

export type HeaderData = {
  new_pub_key?: GoogleProtobufAny.Any
  new_diversifier?: string
}

export type ClientStateData = {
  path?: Uint8Array
  client_state?: GoogleProtobufAny.Any
}

export type ConsensusStateData = {
  path?: Uint8Array
  consensus_state?: GoogleProtobufAny.Any
}

export type ConnectionStateData = {
  path?: Uint8Array
  connection?: IbcCoreConnectionV1Connection.ConnectionEnd
}

export type ChannelStateData = {
  path?: Uint8Array
  channel?: IbcCoreChannelV1Channel.Channel
}

export type PacketCommitmentData = {
  path?: Uint8Array
  commitment?: Uint8Array
}

export type PacketAcknowledgementData = {
  path?: Uint8Array
  acknowledgement?: Uint8Array
}

export type PacketReceiptAbsenceData = {
  path?: Uint8Array
}

export type NextSequenceRecvData = {
  path?: Uint8Array
  next_seq_recv?: string
}