/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseV1beta1Coin from "../../../cosmos/base/v1beta1/coin.pb"
import * as fm from "../../../fetch.pb"
import * as SecretComputeV1beta1Params from "./params.pb"
export type MsgStoreCode = {
  sender?: Uint8Array
  wasm_byte_code?: Uint8Array
  source?: string
  builder?: string
}

export type MsgStoreCodeResponse = {
  code_id?: string
}

export type MsgInstantiateContract = {
  sender?: Uint8Array
  callback_code_hash?: string
  code_id?: string
  label?: string
  init_msg?: Uint8Array
  init_funds?: CosmosBaseV1beta1Coin.Coin[]
  callback_sig?: Uint8Array
  admin?: string
}

export type MsgInstantiateContractResponse = {
  address?: string
  data?: Uint8Array
}

export type MsgExecuteContract = {
  sender?: Uint8Array
  contract?: Uint8Array
  msg?: Uint8Array
  callback_code_hash?: string
  sent_funds?: CosmosBaseV1beta1Coin.Coin[]
  callback_sig?: Uint8Array
}

export type MsgExecuteContractResponse = {
  data?: Uint8Array
}

export type MsgMigrateContract = {
  sender?: string
  contract?: string
  code_id?: string
  msg?: Uint8Array
  callback_sig?: Uint8Array
  callback_code_hash?: string
}

export type MsgMigrateContractResponse = {
  data?: Uint8Array
}

export type MsgUpdateAdmin = {
  sender?: string
  new_admin?: string
  contract?: string
  callback_sig?: Uint8Array
}

export type MsgUpdateAdminResponse = {
}

export type MsgClearAdmin = {
  sender?: string
  contract?: string
  callback_sig?: Uint8Array
}

export type MsgClearAdminResponse = {
}

export type MsgUpdateParams = {
  authority?: string
  params?: SecretComputeV1beta1Params.Params
}

export type MsgUpdateParamsResponse = {
}

export type MsgUpgradeProposalPassed = {
  sender_address?: string
  mr_enclave_hash?: Uint8Array
}

export type MsgUpgradeProposalPassedResponse = {
}

export type MigrateContractInfo = {
  address?: string
  new_code_id?: string
}

export type MsgMigrateContractProposal = {
  authority?: string
  title?: string
  description?: string
  contracts?: MigrateContractInfo[]
}

export type MsgMigrateContractProposalResponse = {
}

export type MsgSetContractGovernance = {
  sender?: string
  contract_address?: string
}

export type MsgSetContractGovernanceResponse = {
}

export class Msg {
  static StoreCode(req: MsgStoreCode, initReq?: fm.InitReq): Promise<MsgStoreCodeResponse> {
    return fm.fetchReq<MsgStoreCode, MsgStoreCodeResponse>(`/secret.compute.v1beta1.Msg/StoreCode`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static InstantiateContract(req: MsgInstantiateContract, initReq?: fm.InitReq): Promise<MsgInstantiateContractResponse> {
    return fm.fetchReq<MsgInstantiateContract, MsgInstantiateContractResponse>(`/secret.compute.v1beta1.Msg/InstantiateContract`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ExecuteContract(req: MsgExecuteContract, initReq?: fm.InitReq): Promise<MsgExecuteContractResponse> {
    return fm.fetchReq<MsgExecuteContract, MsgExecuteContractResponse>(`/secret.compute.v1beta1.Msg/ExecuteContract`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static MigrateContract(req: MsgMigrateContract, initReq?: fm.InitReq): Promise<MsgMigrateContractResponse> {
    return fm.fetchReq<MsgMigrateContract, MsgMigrateContractResponse>(`/secret.compute.v1beta1.Msg/MigrateContract`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateAdmin(req: MsgUpdateAdmin, initReq?: fm.InitReq): Promise<MsgUpdateAdminResponse> {
    return fm.fetchReq<MsgUpdateAdmin, MsgUpdateAdminResponse>(`/secret.compute.v1beta1.Msg/UpdateAdmin`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ClearAdmin(req: MsgClearAdmin, initReq?: fm.InitReq): Promise<MsgClearAdminResponse> {
    return fm.fetchReq<MsgClearAdmin, MsgClearAdminResponse>(`/secret.compute.v1beta1.Msg/ClearAdmin`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/secret.compute.v1beta1.Msg/UpdateParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpgradeProposalPassed(req: MsgUpgradeProposalPassed, initReq?: fm.InitReq): Promise<MsgUpgradeProposalPassedResponse> {
    return fm.fetchReq<MsgUpgradeProposalPassed, MsgUpgradeProposalPassedResponse>(`/secret.compute.v1beta1.Msg/UpgradeProposalPassed`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static MigrateContractProposal(req: MsgMigrateContractProposal, initReq?: fm.InitReq): Promise<MsgMigrateContractProposalResponse> {
    return fm.fetchReq<MsgMigrateContractProposal, MsgMigrateContractProposalResponse>(`/secret.compute.v1beta1.Msg/MigrateContractProposal`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static SetContractGovernance(req: MsgSetContractGovernance, initReq?: fm.InitReq): Promise<MsgSetContractGovernanceResponse> {
    return fm.fetchReq<MsgSetContractGovernance, MsgSetContractGovernanceResponse>(`/secret.compute.v1beta1.Msg/SetContractGovernance`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}