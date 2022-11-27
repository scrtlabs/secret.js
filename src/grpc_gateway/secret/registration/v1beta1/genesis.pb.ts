/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as SecretRegistrationV1beta1Msg from "./msg.pb"
import * as SecretRegistrationV1beta1Types from "./types.pb"
export type GenesisState = {
  registration?: SecretRegistrationV1beta1Types.RegistrationNodeInfo[]
  node_exch_master_certificate?: SecretRegistrationV1beta1Msg.MasterCertificate
  io_master_certificate?: SecretRegistrationV1beta1Msg.MasterCertificate
}