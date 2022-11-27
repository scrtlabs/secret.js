/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as IbcApplicationsInterchain_accountsControllerV1Controller from "../controller/v1/controller.pb"
import * as IbcApplicationsInterchain_accountsHostV1Host from "../host/v1/host.pb"
export type GenesisState = {
  controller_genesis_state?: ControllerGenesisState
  host_genesis_state?: HostGenesisState
}

export type ControllerGenesisState = {
  active_channels?: ActiveChannel[]
  interchain_accounts?: RegisteredInterchainAccount[]
  ports?: string[]
  params?: IbcApplicationsInterchain_accountsControllerV1Controller.Params
}

export type HostGenesisState = {
  active_channels?: ActiveChannel[]
  interchain_accounts?: RegisteredInterchainAccount[]
  port?: string
  params?: IbcApplicationsInterchain_accountsHostV1Host.Params
}

export type ActiveChannel = {
  connection_id?: string
  port_id?: string
  channel_id?: string
}

export type RegisteredInterchainAccount = {
  connection_id?: string
  port_id?: string
  account_address?: string
}