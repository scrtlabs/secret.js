/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as TendermintTypesParams from "../../../tendermint/types/params.pb"
export type MsgUpdateParams = {
  authority?: string
  block?: TendermintTypesParams.BlockParams
  evidence?: TendermintTypesParams.EvidenceParams
  validator?: TendermintTypesParams.ValidatorParams
  abci?: TendermintTypesParams.ABCIParams
}

export type MsgUpdateParamsResponse = {
}

export class Msg {
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/cosmos.consensus.v1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}