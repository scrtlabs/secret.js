/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosGovV1Gov from "./gov.pb"
export type GenesisState = {
  starting_proposal_id?: string
  deposits?: CosmosGovV1Gov.Deposit[]
  votes?: CosmosGovV1Gov.Vote[]
  proposals?: CosmosGovV1Gov.Proposal[]
  deposit_params?: CosmosGovV1Gov.DepositParams
  voting_params?: CosmosGovV1Gov.VotingParams
  tally_params?: CosmosGovV1Gov.TallyParams
  params?: CosmosGovV1Gov.Params
  constitution?: string
}