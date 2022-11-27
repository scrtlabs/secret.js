/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type NetAddress = {
  id?: string
  ip?: string
  port?: number
}

export type ProtocolVersion = {
  p2p?: string
  block?: string
  app?: string
}

export type DefaultNodeInfo = {
  protocol_version?: ProtocolVersion
  default_node_id?: string
  listen_addr?: string
  network?: string
  version?: string
  channels?: Uint8Array
  moniker?: string
  other?: DefaultNodeInfoOther
}

export type DefaultNodeInfoOther = {
  tx_index?: string
  rpc_address?: string
}