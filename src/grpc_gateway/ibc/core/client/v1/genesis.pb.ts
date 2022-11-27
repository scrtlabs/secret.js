/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as IbcCoreClientV1Client from "./client.pb"
export type GenesisState = {
  clients?: IbcCoreClientV1Client.IdentifiedClientState[]
  clients_consensus?: IbcCoreClientV1Client.ClientConsensusStates[]
  clients_metadata?: IdentifiedGenesisMetadata[]
  params?: IbcCoreClientV1Client.Params
  create_localhost?: boolean
  next_client_sequence?: string
}

export type GenesisMetadata = {
  key?: Uint8Array
  value?: Uint8Array
}

export type IdentifiedGenesisMetadata = {
  client_id?: string
  client_metadata?: GenesisMetadata[]
}