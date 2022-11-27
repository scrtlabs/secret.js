/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
export type AppDescriptor = {
  authn?: AuthnDescriptor
  chain?: ChainDescriptor
  codec?: CodecDescriptor
  configuration?: ConfigurationDescriptor
  query_services?: QueryServicesDescriptor
  tx?: TxDescriptor
}

export type TxDescriptor = {
  fullname?: string
  msgs?: MsgDescriptor[]
}

export type AuthnDescriptor = {
  sign_modes?: SigningModeDescriptor[]
}

export type SigningModeDescriptor = {
  name?: string
  number?: number
  authn_info_provider_method_fullname?: string
}

export type ChainDescriptor = {
  id?: string
}

export type CodecDescriptor = {
  interfaces?: InterfaceDescriptor[]
}

export type InterfaceDescriptor = {
  fullname?: string
  interface_accepting_messages?: InterfaceAcceptingMessageDescriptor[]
  interface_implementers?: InterfaceImplementerDescriptor[]
}

export type InterfaceImplementerDescriptor = {
  fullname?: string
  type_url?: string
}

export type InterfaceAcceptingMessageDescriptor = {
  fullname?: string
  field_descriptor_names?: string[]
}

export type ConfigurationDescriptor = {
  bech32_account_address_prefix?: string
}

export type MsgDescriptor = {
  msg_type_url?: string
}

export type GetAuthnDescriptorRequest = {
}

export type GetAuthnDescriptorResponse = {
  authn?: AuthnDescriptor
}

export type GetChainDescriptorRequest = {
}

export type GetChainDescriptorResponse = {
  chain?: ChainDescriptor
}

export type GetCodecDescriptorRequest = {
}

export type GetCodecDescriptorResponse = {
  codec?: CodecDescriptor
}

export type GetConfigurationDescriptorRequest = {
}

export type GetConfigurationDescriptorResponse = {
  config?: ConfigurationDescriptor
}

export type GetQueryServicesDescriptorRequest = {
}

export type GetQueryServicesDescriptorResponse = {
  queries?: QueryServicesDescriptor
}

export type GetTxDescriptorRequest = {
}

export type GetTxDescriptorResponse = {
  tx?: TxDescriptor
}

export type QueryServicesDescriptor = {
  query_services?: QueryServiceDescriptor[]
}

export type QueryServiceDescriptor = {
  fullname?: string
  is_module?: boolean
  methods?: QueryMethodDescriptor[]
}

export type QueryMethodDescriptor = {
  name?: string
  full_query_path?: string
}

export class ReflectionService {
  static GetAuthnDescriptor(req: GetAuthnDescriptorRequest, initReq?: fm.InitReq): Promise<GetAuthnDescriptorResponse> {
    return fm.fetchReq<GetAuthnDescriptorRequest, GetAuthnDescriptorResponse>(`/cosmos/base/reflection/v1beta1/app_descriptor/authn?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetChainDescriptor(req: GetChainDescriptorRequest, initReq?: fm.InitReq): Promise<GetChainDescriptorResponse> {
    return fm.fetchReq<GetChainDescriptorRequest, GetChainDescriptorResponse>(`/cosmos/base/reflection/v1beta1/app_descriptor/chain?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetCodecDescriptor(req: GetCodecDescriptorRequest, initReq?: fm.InitReq): Promise<GetCodecDescriptorResponse> {
    return fm.fetchReq<GetCodecDescriptorRequest, GetCodecDescriptorResponse>(`/cosmos/base/reflection/v1beta1/app_descriptor/codec?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetConfigurationDescriptor(req: GetConfigurationDescriptorRequest, initReq?: fm.InitReq): Promise<GetConfigurationDescriptorResponse> {
    return fm.fetchReq<GetConfigurationDescriptorRequest, GetConfigurationDescriptorResponse>(`/cosmos/base/reflection/v1beta1/app_descriptor/configuration?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetQueryServicesDescriptor(req: GetQueryServicesDescriptorRequest, initReq?: fm.InitReq): Promise<GetQueryServicesDescriptorResponse> {
    return fm.fetchReq<GetQueryServicesDescriptorRequest, GetQueryServicesDescriptorResponse>(`/cosmos/base/reflection/v1beta1/app_descriptor/query_services?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetTxDescriptor(req: GetTxDescriptorRequest, initReq?: fm.InitReq): Promise<GetTxDescriptorResponse> {
    return fm.fetchReq<GetTxDescriptorRequest, GetTxDescriptorResponse>(`/cosmos/base/reflection/v1beta1/app_descriptor/tx_descriptor?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}