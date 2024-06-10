/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
import * as TendermintAbciTypes from "../../../../tendermint/abci/types.pb"
import * as CosmosStoreV1beta1Listening from "../../v1beta1/listening.pb"
export type ListenFinalizeBlockRequest = {
  req?: TendermintAbciTypes.RequestFinalizeBlock
  res?: TendermintAbciTypes.ResponseFinalizeBlock
}

export type ListenFinalizeBlockResponse = {
}

export type ListenCommitRequest = {
  block_height?: string
  res?: TendermintAbciTypes.ResponseCommit
  change_set?: CosmosStoreV1beta1Listening.StoreKVPair[]
}

export type ListenCommitResponse = {
}

export class ABCIListenerService {
  static ListenFinalizeBlock(req: ListenFinalizeBlockRequest, initReq?: fm.InitReq): Promise<ListenFinalizeBlockResponse> {
    return fm.fetchReq<ListenFinalizeBlockRequest, ListenFinalizeBlockResponse>(`/cosmos.store.streaming.abci.ABCIListenerService/ListenFinalizeBlock`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ListenCommit(req: ListenCommitRequest, initReq?: fm.InitReq): Promise<ListenCommitResponse> {
    return fm.fetchReq<ListenCommitRequest, ListenCommitResponse>(`/cosmos.store.streaming.abci.ABCIListenerService/ListenCommit`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}