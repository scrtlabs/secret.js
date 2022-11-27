/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
import * as TendermintAbciTypes from "../../../../tendermint/abci/types.pb"
export type TxResponse = {
  height?: string
  txhash?: string
  codespace?: string
  code?: number
  data?: string
  raw_log?: string
  logs?: ABCIMessageLog[]
  info?: string
  gas_wanted?: string
  gas_used?: string
  tx?: GoogleProtobufAny.Any
  timestamp?: string
  events?: TendermintAbciTypes.Event[]
}

export type ABCIMessageLog = {
  msg_index?: number
  log?: string
  events?: StringEvent[]
}

export type StringEvent = {
  type?: string
  attributes?: Attribute[]
}

export type Attribute = {
  key?: string
  value?: string
}

export type GasInfo = {
  gas_wanted?: string
  gas_used?: string
}

export type Result = {
  data?: Uint8Array
  log?: string
  events?: TendermintAbciTypes.Event[]
}

export type SimulationResponse = {
  gas_info?: GasInfo
  result?: Result
}

export type MsgData = {
  msg_type?: string
  data?: Uint8Array
}

export type TxMsgData = {
  data?: MsgData[]
}

export type SearchTxsResult = {
  total_count?: string
  count?: string
  page_number?: string
  page_total?: string
  limit?: string
  txs?: TxResponse[]
}