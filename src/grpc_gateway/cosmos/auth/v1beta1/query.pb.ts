/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
import * as CosmosAuthV1beta1Auth from "./auth.pb"
export type QueryAccountsRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryAccountsResponse = {
  accounts?: GoogleProtobufAny.Any[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export type QueryAccountRequest = {
  address?: string
}

export type QueryAccountResponse = {
  account?: GoogleProtobufAny.Any
}

export type QueryParamsRequest = {
}

export type QueryParamsResponse = {
  params?: CosmosAuthV1beta1Auth.Params
}

export type QueryModuleAccountsRequest = {
}

export type QueryModuleAccountsResponse = {
  accounts?: GoogleProtobufAny.Any[]
}

export type QueryModuleAccountByNameRequest = {
  name?: string
}

export type QueryModuleAccountByNameResponse = {
  account?: GoogleProtobufAny.Any
}

export type Bech32PrefixRequest = {
}

export type Bech32PrefixResponse = {
  bech32_prefix?: string
}

export type AddressBytesToStringRequest = {
  address_bytes?: Uint8Array
}

export type AddressBytesToStringResponse = {
  address_string?: string
}

export type AddressStringToBytesRequest = {
  address_string?: string
}

export type AddressStringToBytesResponse = {
  address_bytes?: Uint8Array
}

export type QueryAccountAddressByIDRequest = {
  id?: string
  account_id?: string
}

export type QueryAccountAddressByIDResponse = {
  account_address?: string
}

export type QueryAccountInfoRequest = {
  address?: string
}

export type QueryAccountInfoResponse = {
  info?: CosmosAuthV1beta1Auth.BaseAccount
}

export class Query {
  static Accounts(req: QueryAccountsRequest, initReq?: fm.InitReq): Promise<QueryAccountsResponse> {
    return fm.fetchReq<QueryAccountsRequest, QueryAccountsResponse>(`/cosmos/auth/v1beta1/accounts?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static Account(req: QueryAccountRequest, initReq?: fm.InitReq): Promise<QueryAccountResponse> {
    return fm.fetchReq<QueryAccountRequest, QueryAccountResponse>(`/cosmos/auth/v1beta1/accounts/${req["address"]}?${fm.renderURLSearchParams(req, ["address"])}`, {...initReq, method: "GET"})
  }
  static AccountAddressByID(req: QueryAccountAddressByIDRequest, initReq?: fm.InitReq): Promise<QueryAccountAddressByIDResponse> {
    return fm.fetchReq<QueryAccountAddressByIDRequest, QueryAccountAddressByIDResponse>(`/cosmos/auth/v1beta1/address_by_id/${req["id"]}?${fm.renderURLSearchParams(req, ["id"])}`, {...initReq, method: "GET"})
  }
  static Params(req: QueryParamsRequest, initReq?: fm.InitReq): Promise<QueryParamsResponse> {
    return fm.fetchReq<QueryParamsRequest, QueryParamsResponse>(`/cosmos/auth/v1beta1/params?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static ModuleAccounts(req: QueryModuleAccountsRequest, initReq?: fm.InitReq): Promise<QueryModuleAccountsResponse> {
    return fm.fetchReq<QueryModuleAccountsRequest, QueryModuleAccountsResponse>(`/cosmos/auth/v1beta1/module_accounts?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static ModuleAccountByName(req: QueryModuleAccountByNameRequest, initReq?: fm.InitReq): Promise<QueryModuleAccountByNameResponse> {
    return fm.fetchReq<QueryModuleAccountByNameRequest, QueryModuleAccountByNameResponse>(`/cosmos/auth/v1beta1/module_accounts/${req["name"]}?${fm.renderURLSearchParams(req, ["name"])}`, {...initReq, method: "GET"})
  }
  static Bech32Prefix(req: Bech32PrefixRequest, initReq?: fm.InitReq): Promise<Bech32PrefixResponse> {
    return fm.fetchReq<Bech32PrefixRequest, Bech32PrefixResponse>(`/cosmos/auth/v1beta1/bech32?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static AddressBytesToString(req: AddressBytesToStringRequest, initReq?: fm.InitReq): Promise<AddressBytesToStringResponse> {
    return fm.fetchReq<AddressBytesToStringRequest, AddressBytesToStringResponse>(`/cosmos/auth/v1beta1/bech32/${req["address_bytes"]}?${fm.renderURLSearchParams(req, ["address_bytes"])}`, {...initReq, method: "GET"})
  }
  static AddressStringToBytes(req: AddressStringToBytesRequest, initReq?: fm.InitReq): Promise<AddressStringToBytesResponse> {
    return fm.fetchReq<AddressStringToBytesRequest, AddressStringToBytesResponse>(`/cosmos/auth/v1beta1/bech32/${req["address_string"]}?${fm.renderURLSearchParams(req, ["address_string"])}`, {...initReq, method: "GET"})
  }
  static AccountInfo(req: QueryAccountInfoRequest, initReq?: fm.InitReq): Promise<QueryAccountInfoResponse> {
    return fm.fetchReq<QueryAccountInfoRequest, QueryAccountInfoResponse>(`/cosmos/auth/v1beta1/account_info/${req["address"]}?${fm.renderURLSearchParams(req, ["address"])}`, {...initReq, method: "GET"})
  }
}