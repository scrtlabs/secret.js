/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
export type ListAllInterfacesRequest = {
}

export type ListAllInterfacesResponse = {
  interface_names?: string[]
}

export type ListImplementationsRequest = {
  interface_name?: string
}

export type ListImplementationsResponse = {
  implementation_message_names?: string[]
}

export class ReflectionService {
  static ListAllInterfaces(req: ListAllInterfacesRequest, initReq?: fm.InitReq): Promise<ListAllInterfacesResponse> {
    return fm.fetchReq<ListAllInterfacesRequest, ListAllInterfacesResponse>(`/cosmos/base/reflection/v1beta1/interfaces?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static ListImplementations(req: ListImplementationsRequest, initReq?: fm.InitReq): Promise<ListImplementationsResponse> {
    return fm.fetchReq<ListImplementationsRequest, ListImplementationsResponse>(`/cosmos/base/reflection/v1beta1/interfaces/${req["interface_name"]}/implementations?${fm.renderURLSearchParams(req, ["interface_name"])}`, {...initReq, method: "GET"})
  }
}