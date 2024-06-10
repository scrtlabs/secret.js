/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseV1beta1Coin from "../../../../cosmos/base/v1beta1/coin.pb"
import * as IbcApplicationsTransferV1Transfer from "./transfer.pb"
export type GenesisState = {
  port_id?: string
  denom_traces?: IbcApplicationsTransferV1Transfer.DenomTrace[]
  params?: IbcApplicationsTransferV1Transfer.Params
  total_escrowed?: CosmosBaseV1beta1Coin.Coin[]
}