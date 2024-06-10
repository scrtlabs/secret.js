/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as TendermintTypesParams from "../../../tendermint/types/params.pb"
export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: TendermintTypesParams.ConsensusParams
}

export class Query {
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/cosmos/consensus/v1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}