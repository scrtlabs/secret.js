/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
import * as IbcCoreClientV1Client from "../../client/v1/client.pb"
import * as IbcCoreConnectionV1Connection from "./connection.pb"
export type MsgConnectionOpenInit = {
  client_id?: string
  counterparty?: IbcCoreConnectionV1Connection.Counterparty
  version?: IbcCoreConnectionV1Connection.Version
  delay_period?: string
  signer?: string
}

export type MsgConnectionOpenInitResponse = {
}

export type MsgConnectionOpenTry = {
  client_id?: string
  previous_connection_id?: string
  client_state?: GoogleProtobufAny.Any
  counterparty?: IbcCoreConnectionV1Connection.Counterparty
  delay_period?: string
  counterparty_versions?: IbcCoreConnectionV1Connection.Version[]
  proof_height?: IbcCoreClientV1Client.Height
  proof_init?: Uint8Array
  proof_client?: Uint8Array
  proof_consensus?: Uint8Array
  consensus_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgConnectionOpenTryResponse = {
}

export type MsgConnectionOpenAck = {
  connection_id?: string
  counterparty_connection_id?: string
  version?: IbcCoreConnectionV1Connection.Version
  client_state?: GoogleProtobufAny.Any
  proof_height?: IbcCoreClientV1Client.Height
  proof_try?: Uint8Array
  proof_client?: Uint8Array
  proof_consensus?: Uint8Array
  consensus_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgConnectionOpenAckResponse = {
}

export type MsgConnectionOpenConfirm = {
  connection_id?: string
  proof_ack?: Uint8Array
  proof_height?: IbcCoreClientV1Client.Height
  signer?: string
}

export type MsgConnectionOpenConfirmResponse = {
}

export class Msg {
  static ConnectionOpenInit(req: MsgConnectionOpenInit, initReq?: fm.InitReq): Promise<MsgConnectionOpenInitResponse> {
    return fm.fetchReq<MsgConnectionOpenInit, MsgConnectionOpenInitResponse>(`/ibc.core.connection.v1.Msg/ConnectionOpenInit`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ConnectionOpenTry(req: MsgConnectionOpenTry, initReq?: fm.InitReq): Promise<MsgConnectionOpenTryResponse> {
    return fm.fetchReq<MsgConnectionOpenTry, MsgConnectionOpenTryResponse>(`/ibc.core.connection.v1.Msg/ConnectionOpenTry`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ConnectionOpenAck(req: MsgConnectionOpenAck, initReq?: fm.InitReq): Promise<MsgConnectionOpenAckResponse> {
    return fm.fetchReq<MsgConnectionOpenAck, MsgConnectionOpenAckResponse>(`/ibc.core.connection.v1.Msg/ConnectionOpenAck`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ConnectionOpenConfirm(req: MsgConnectionOpenConfirm, initReq?: fm.InitReq): Promise<MsgConnectionOpenConfirmResponse> {
    return fm.fetchReq<MsgConnectionOpenConfirm, MsgConnectionOpenConfirmResponse>(`/ibc.core.connection.v1.Msg/ConnectionOpenConfirm`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}