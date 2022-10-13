/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosBaseV1beta1Coin from "../../base/v1beta1/coin.pb"
import * as CosmosBankV1beta1Bank from "./bank.pb"
export type QueryBalanceRequest = {
  address?: string
  denom?: string
}

export type QueryBalanceResponse = {
  balance?: CosmosBaseV1beta1Coin.Coin
}

export type QueryAllBalancesRequest = {
  address?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryAllBalancesResponse = {
  balances?: CosmosBaseV1beta1Coin.Coin[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QuerySpendableBalancesRequest = {
  address?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QuerySpendableBalancesResponse = {
  balances?: CosmosBaseV1beta1Coin.Coin[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryTotalSupplyRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryTotalSupplyResponse = {
  supply?: CosmosBaseV1beta1Coin.Coin[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QuerySupplyOfRequest = {
  denom?: string
}

export type QuerySupplyOfResponse = {
  amount?: CosmosBaseV1beta1Coin.Coin
}

export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: CosmosBankV1beta1Bank.Params
}

export type QueryDenomsMetadataRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryDenomsMetadataResponse = {
  metadatas?: CosmosBankV1beta1Bank.Metadata[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryDenomMetadataRequest = {
  denom?: string
}

export type QueryDenomMetadataResponse = {
  metadata?: CosmosBankV1beta1Bank.Metadata
}

export class Query {
  static Balance(req: QueryBalanceRequest, initReq?: fm.InitReq): Promise<QueryBalanceResponse> {
    return fm.fetchReq<QueryBalanceRequest, QueryBalanceResponse>(`/cosmos/bank/v1beta1/balances/${req["address"]}/by_denom?${fm.renderURLSearchParams(req, ["address"])}`, {...initReq, method: "GET"})
  }
  static AllBalances(req: QueryAllBalancesRequest, initReq?: fm.InitReq): Promise<QueryAllBalancesResponse> {
    return fm.fetchReq<QueryAllBalancesRequest, QueryAllBalancesResponse>(`/cosmos/bank/v1beta1/balances/${req["address"]}?${fm.renderURLSearchParams(req, ["address"])}`, {...initReq, method: "GET"})
  }
  static SpendableBalances(req: QuerySpendableBalancesRequest, initReq?: fm.InitReq): Promise<QuerySpendableBalancesResponse> {
    return fm.fetchReq<QuerySpendableBalancesRequest, QuerySpendableBalancesResponse>(`/cosmos/bank/v1beta1/spendable_balances/${req["address"]}?${fm.renderURLSearchParams(req, ["address"])}`, {...initReq, method: "GET"})
  }
  static TotalSupply(req: QueryTotalSupplyRequest, initReq?: fm.InitReq): Promise<QueryTotalSupplyResponse> {
    return fm.fetchReq<QueryTotalSupplyRequest, QueryTotalSupplyResponse>(`/cosmos/bank/v1beta1/supply?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static SupplyOf(req: QuerySupplyOfRequest, initReq?: fm.InitReq): Promise<QuerySupplyOfResponse> {
    return fm.fetchReq<QuerySupplyOfRequest, QuerySupplyOfResponse>(`/cosmos/bank/v1beta1/supply/${req["denom"]}?${fm.renderURLSearchParams(req, ["denom"])}`, {...initReq, method: "GET"})
  }
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/cosmos/bank/v1beta1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static DenomMetadata(req: QueryDenomMetadataRequest, initReq?: fm.InitReq): Promise<QueryDenomMetadataResponse> {
    return fm.fetchReq<QueryDenomMetadataRequest, QueryDenomMetadataResponse>(`/cosmos/bank/v1beta1/denoms_metadata/${req["denom"]}?${fm.renderURLSearchParams(req, ["denom"])}`, {...initReq, method: "GET"})
  }
  static DenomsMetadata(req: QueryDenomsMetadataRequest, initReq?: fm.InitReq): Promise<QueryDenomsMetadataResponse> {
    return fm.fetchReq<QueryDenomsMetadataRequest, QueryDenomsMetadataResponse>(`/cosmos/bank/v1beta1/denoms_metadata?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}