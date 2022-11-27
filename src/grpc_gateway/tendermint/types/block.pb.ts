/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as TendermintTypesEvidence from "./evidence.pb"
import * as TendermintTypesTypes from "./types.pb"
export type Block = {
  header?: TendermintTypesTypes.Header
  data?: TendermintTypesTypes.Data
  evidence?: TendermintTypesEvidence.EvidenceList
  last_commit?: TendermintTypesTypes.Commit
}