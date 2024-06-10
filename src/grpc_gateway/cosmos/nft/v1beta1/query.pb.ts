/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosNftV1beta1Nft from "./nft.pb"
export type QueryBalanceRequest = {
  class_id?: string
  owner?: string
}

export type QueryBalanceResponse = {
  amount?: string
}

export type QueryOwnerRequest = {
  class_id?: string
  id?: string
}

export type QueryOwnerResponse = {
  owner?: string
}

export type QuerySupplyRequest = {
  class_id?: string
}

export type QuerySupplyResponse = {
  amount?: string
}

export type QueryNFTsRequest = {
  class_id?: string
  owner?: string
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryNFTsResponse = {
  nfts?: CosmosNftV1beta1Nft.NFT[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryNFTRequest = {
  class_id?: string
  id?: string
}

export type QueryNFTResponse = {
  nft?: CosmosNftV1beta1Nft.NFT
}

export type QueryClassRequest = {
  class_id?: string
}

export type QueryClassResponse = {
  class?: CosmosNftV1beta1Nft.Class
}

export type QueryClassesRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryClassesResponse = {
  classes?: CosmosNftV1beta1Nft.Class[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export class Query {
  static Balance(req: QueryBalanceRequest, initReq?: fm.InitReq): Promise<QueryBalanceResponse> {
    return fm.fetchReq<QueryBalanceRequest, QueryBalanceResponse>(`/cosmos/nft/v1beta1/balance/${req["owner"]}/${req["class_id"]}?${fm.renderURLSearchParams(req, ["owner", "class_id"])}`, {...initReq, method: "GET"})
  }
  static Owner(req: QueryOwnerRequest, initReq?: fm.InitReq): Promise<QueryOwnerResponse> {
    return fm.fetchReq<QueryOwnerRequest, QueryOwnerResponse>(`/cosmos/nft/v1beta1/owner/${req["class_id"]}/${req["id"]}?${fm.renderURLSearchParams(req, ["class_id", "id"])}`, {...initReq, method: "GET"})
  }
  static Supply(req: QuerySupplyRequest, initReq?: fm.InitReq): Promise<QuerySupplyResponse> {
    return fm.fetchReq<QuerySupplyRequest, QuerySupplyResponse>(`/cosmos/nft/v1beta1/supply/${req["class_id"]}?${fm.renderURLSearchParams(req, ["class_id"])}`, {...initReq, method: "GET"})
  }
  static NFTs(req: QueryNFTsRequest, initReq?: fm.InitReq): Promise<QueryNFTsResponse> {
    return fm.fetchReq<QueryNFTsRequest, QueryNFTsResponse>(`/cosmos/nft/v1beta1/nfts?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static NFT(req: QueryNFTRequest, initReq?: fm.InitReq): Promise<QueryNFTResponse> {
    return fm.fetchReq<QueryNFTRequest, QueryNFTResponse>(`/cosmos/nft/v1beta1/nfts/${req["class_id"]}/${req["id"]}?${fm.renderURLSearchParams(req, ["class_id", "id"])}`, {...initReq, method: "GET"})
  }
  static Class(req: QueryClassRequest, initReq?: fm.InitReq): Promise<QueryClassResponse> {
    return fm.fetchReq<QueryClassRequest, QueryClassResponse>(`/cosmos/nft/v1beta1/classes/${req["class_id"]}?${fm.renderURLSearchParams(req, ["class_id"])}`, {...initReq, method: "GET"})
  }
  static Classes(req: QueryClassesRequest, initReq?: fm.InitReq): Promise<QueryClassesResponse> {
    return fm.fetchReq<QueryClassesRequest, QueryClassesResponse>(`/cosmos/nft/v1beta1/classes?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}