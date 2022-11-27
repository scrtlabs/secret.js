/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosGovV1beta1Gov from "./gov.pb"
export type GenesisState = {
  starting_proposal_id?: string
  deposits?: CosmosGovV1beta1Gov.Deposit[]
  votes?: CosmosGovV1beta1Gov.Vote[]
  proposals?: CosmosGovV1beta1Gov.Proposal[]
  deposit_params?: CosmosGovV1beta1Gov.DepositParams
  voting_params?: CosmosGovV1beta1Gov.VotingParams
  tally_params?: CosmosGovV1beta1Gov.TallyParams
}