/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
export type MsgStoreCode = {
  signer?: string
  wasm_byte_code?: Uint8Array
}

export type MsgStoreCodeResponse = {
  checksum?: Uint8Array
}

export type MsgRemoveChecksum = {
  signer?: string
  checksum?: Uint8Array
}

export type MsgRemoveChecksumResponse = {
}

export type MsgMigrateContract = {
  signer?: string
  client_id?: string
  checksum?: Uint8Array
  msg?: Uint8Array
}

export type MsgMigrateContractResponse = {
}

export class Msg {
  static StoreCode(req: MsgStoreCode, initReq?: fm.InitReq): Promise<MsgStoreCodeResponse> {
    return fm.fetchReq<MsgStoreCode, MsgStoreCodeResponse>(`/ibc.lightclients.wasm.v1.Msg/StoreCode`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static RemoveChecksum(req: MsgRemoveChecksum, initReq?: fm.InitReq): Promise<MsgRemoveChecksumResponse> {
    return fm.fetchReq<MsgRemoveChecksum, MsgRemoveChecksumResponse>(`/ibc.lightclients.wasm.v1.Msg/RemoveChecksum`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static MigrateContract(req: MsgMigrateContract, initReq?: fm.InitReq): Promise<MsgMigrateContractResponse> {
    return fm.fetchReq<MsgMigrateContract, MsgMigrateContractResponse>(`/ibc.lightclients.wasm.v1.Msg/MigrateContract`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}