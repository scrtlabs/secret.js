/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
export type QueryInterchainAccountFromAddressRequest = {
  owner?: string
  connection_id?: string
}

export type QueryInterchainAccountFromAddressResponse = {
  interchain_account_address?: string
}

export class Query {
  static InterchainAccountFromAddress(req: QueryInterchainAccountFromAddressRequest, initReq?: fm.InitReq): Promise<QueryInterchainAccountFromAddressResponse> {
    return fm.fetchReq<QueryInterchainAccountFromAddressRequest, QueryInterchainAccountFromAddressResponse>(`/mauth/v1beta1/address-to-ica?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}