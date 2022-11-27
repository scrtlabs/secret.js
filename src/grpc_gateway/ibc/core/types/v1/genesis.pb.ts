/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as IbcCoreChannelV1Genesis from "../../channel/v1/genesis.pb"
import * as IbcCoreClientV1Genesis from "../../client/v1/genesis.pb"
import * as IbcCoreConnectionV1Genesis from "../../connection/v1/genesis.pb"
export type GenesisState = {
  client_genesis?: IbcCoreClientV1Genesis.GenesisState
  connection_genesis?: IbcCoreConnectionV1Genesis.GenesisState
  channel_genesis?: IbcCoreChannelV1Genesis.GenesisState
}