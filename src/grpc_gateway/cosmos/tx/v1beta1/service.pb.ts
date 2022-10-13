/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as TendermintTypesBlock from "../../../tendermint/types/block.pb"
import * as TendermintTypesTypes from "../../../tendermint/types/types.pb"
import * as CosmosBaseAbciV1beta1Abci from "../../base/abci/v1beta1/abci.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosTxV1beta1Tx from "./tx.pb"

export enum OrderBy {
  ORDER_BY_UNSPECIFIED = "ORDER_BY_UNSPECIFIED",
  ORDER_BY_ASC = "ORDER_BY_ASC",
  ORDER_BY_DESC = "ORDER_BY_DESC",
}

export enum BroadcastMode {
  BROADCAST_MODE_UNSPECIFIED = "BROADCAST_MODE_UNSPECIFIED",
  BROADCAST_MODE_BLOCK = "BROADCAST_MODE_BLOCK",
  BROADCAST_MODE_SYNC = "BROADCAST_MODE_SYNC",
  BROADCAST_MODE_ASYNC = "BROADCAST_MODE_ASYNC",
}

export type GetTxsEventRequest = {
  events?: string[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
  order_by?: OrderBy
}

export type GetTxsEventResponse = {
  txs?: CosmosTxV1beta1Tx.Tx[]
  tx_responses?: CosmosBaseAbciV1beta1Abci.TxResponse[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type BroadcastTxRequest = {
  tx_bytes?: Uint8Array
  mode?: BroadcastMode
}

export type BroadcastTxResponse = {
  tx_response?: CosmosBaseAbciV1beta1Abci.TxResponse
}

export type SimulateRequest = {
  tx?: CosmosTxV1beta1Tx.Tx
  tx_bytes?: Uint8Array
}

export type SimulateResponse = {
  gas_info?: CosmosBaseAbciV1beta1Abci.GasInfo
  result?: CosmosBaseAbciV1beta1Abci.Result
}

export type GetTxRequest = {
  hash?: string
}

export type GetTxResponse = {
  tx?: CosmosTxV1beta1Tx.Tx
  tx_response?: CosmosBaseAbciV1beta1Abci.TxResponse
}

export type GetBlockWithTxsRequest = {
  height?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type GetBlockWithTxsResponse = {
  txs?: CosmosTxV1beta1Tx.Tx[]
  block_id?: TendermintTypesTypes.BlockID
  block?: TendermintTypesBlock.Block
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export class Service {
  static Simulate(req: SimulateRequest, initReq?: fm.InitReq): Promise<SimulateResponse> {
    return fm.fetchReq<SimulateRequest, SimulateResponse>(`/cosmos/tx/v1beta1/simulate`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static GetTx(req: GetTxRequest, initReq?: fm.InitReq): Promise<GetTxResponse> {
    return fm.fetchReq<GetTxRequest, GetTxResponse>(`/cosmos/tx/v1beta1/txs/${req["hash"]}?${fm.renderURLSearchParams(req, ["hash"])}`, {...initReq, method: "GET"})
  }
  static BroadcastTx(req: BroadcastTxRequest, initReq?: fm.InitReq): Promise<BroadcastTxResponse> {
    return fm.fetchReq<BroadcastTxRequest, BroadcastTxResponse>(`/cosmos/tx/v1beta1/txs`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static GetTxsEvent(req: GetTxsEventRequest, initReq?: fm.InitReq): Promise<GetTxsEventResponse> {
    return fm.fetchReq<GetTxsEventRequest, GetTxsEventResponse>(`/cosmos/tx/v1beta1/txs?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetBlockWithTxs(req: GetBlockWithTxsRequest, initReq?: fm.InitReq): Promise<GetBlockWithTxsResponse> {
    return fm.fetchReq<GetBlockWithTxsRequest, GetBlockWithTxsResponse>(`/cosmos/tx/v1beta1/txs/block/${req["height"]}?${fm.renderURLSearchParams(req, ["height"])}`, {...initReq, method: "GET"})
  }
}