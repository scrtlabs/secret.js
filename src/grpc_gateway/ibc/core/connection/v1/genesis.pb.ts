/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as IbcCoreConnectionV1Connection from "./connection.pb"
export type GenesisState = {
  connections?: IbcCoreConnectionV1Connection.IdentifiedConnection[]
  client_connection_paths?: IbcCoreConnectionV1Connection.ConnectionPaths[]
  next_connection_sequence?: string
  params?: IbcCoreConnectionV1Connection.Params
}