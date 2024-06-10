/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as TendermintAbciTypes from "../../../tendermint/abci/types.pb"
export type StoreKVPair = {
  store_key?: string
  delete?: boolean
  key?: Uint8Array
  value?: Uint8Array
}

export type BlockMetadata = {
  response_commit?: TendermintAbciTypes.ResponseCommit
  request_finalize_block?: TendermintAbciTypes.RequestFinalizeBlock
  response_finalize_block?: TendermintAbciTypes.ResponseFinalizeBlock
}