/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as TendermintAbciTypes from "../../abci/types.pb"
export type RequestPing = {
}

export type RequestBroadcastTx = {
  tx?: Uint8Array
}

export type ResponsePing = {
}

export type ResponseBroadcastTx = {
  check_tx?: TendermintAbciTypes.ResponseCheckTx
  tx_result?: TendermintAbciTypes.ExecTxResult
}

export class BroadcastAPI {
  static Ping(req: RequestPing, initReq?: fm.InitReq): Promise<ResponsePing> {
    return fm.fetchReq<RequestPing, ResponsePing>(`/tendermint.rpc.grpc.BroadcastAPI/Ping`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static BroadcastTx(req: RequestBroadcastTx, initReq?: fm.InitReq): Promise<ResponseBroadcastTx> {
    return fm.fetchReq<RequestBroadcastTx, ResponseBroadcastTx>(`/tendermint.rpc.grpc.BroadcastAPI/BroadcastTx`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}