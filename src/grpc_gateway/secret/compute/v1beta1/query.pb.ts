/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseAbciV1beta1Abci from "../../../cosmos/base/abci/v1beta1/abci.pb"
import * as fm from "../../../fetch.pb"
import * as GoogleProtobufEmpty from "../../../google/protobuf/empty.pb"
import * as SecretComputeV1beta1Types from "./types.pb"
export type QuerySecretContractRequest = {
  contract_address?: string
  query?: Uint8Array
}

export type QueryByLabelRequest = {
  label?: string
}

export type QueryByContractAddressRequest = {
  contract_address?: string
}

export type QueryByCodeIdRequest = {
  code_id?: string
}

export type QuerySecretContractResponse = {
  data?: Uint8Array
}

export type QueryContractInfoResponse = {
  contract_address?: string
  contract_info?: SecretComputeV1beta1Types.ContractInfo
}

export type ContractInfoWithAddress = {
  contract_address?: string
  contract_info?: SecretComputeV1beta1Types.ContractInfo
}

export type QueryContractsByCodeIdResponse = {
  contract_infos?: ContractInfoWithAddress[]
}

export type CodeInfoResponse = {
  code_id?: string
  creator?: string
  code_hash?: string
  source?: string
  builder?: string
}

export type QueryCodeResponse = {
  code_info?: CodeInfoResponse
  wasm?: Uint8Array
}

export type QueryCodesResponse = {
  code_infos?: CodeInfoResponse[]
}

export type QueryContractAddressResponse = {
  contract_address?: string
}

export type QueryContractLabelResponse = {
  label?: string
}

export type QueryCodeHashResponse = {
  code_hash?: string
}

export type DecryptedAnswer = {
  type?: string
  input?: string
  output_data?: string
  output_data_as_string?: string
}

export type DecryptedAnswers = {
  answers?: DecryptedAnswer[]
  output_logs?: CosmosBaseAbciV1beta1Abci.StringEvent[]
  output_error?: string
  plaintext_error?: string
}

export type QueryContractHistoryRequest = {
  contract_address?: string
}

export type QueryContractHistoryResponse = {
  entries?: SecretComputeV1beta1Types.ContractCodeHistoryEntry[]
}

export class Query {
  static ContractInfo(req: QueryByContractAddressRequest, initReq?: fm.InitReq): Promise<QueryContractInfoResponse> {
    return fm.fetchReq<QueryByContractAddressRequest, QueryContractInfoResponse>(`/compute/v1beta1/info/${req["contract_address"]}?${fm.renderURLSearchParams(req, ["contract_address"])}`, {...initReq, method: "GET"})
  }
  static ContractsByCodeId(req: QueryByCodeIdRequest, initReq?: fm.InitReq): Promise<QueryContractsByCodeIdResponse> {
    return fm.fetchReq<QueryByCodeIdRequest, QueryContractsByCodeIdResponse>(`/compute/v1beta1/contracts/${req["code_id"]}?${fm.renderURLSearchParams(req, ["code_id"])}`, {...initReq, method: "GET"})
  }
  static QuerySecretContract(req: QuerySecretContractRequest, initReq?: fm.InitReq): Promise<QuerySecretContractResponse> {
    return fm.fetchReq<QuerySecretContractRequest, QuerySecretContractResponse>(`/compute/v1beta1/query/${req["contract_address"]}?${fm.renderURLSearchParams(req, ["contract_address"])}`, {...initReq, method: "GET"})
  }
  static Code(req: QueryByCodeIdRequest, initReq?: fm.InitReq): Promise<QueryCodeResponse> {
    return fm.fetchReq<QueryByCodeIdRequest, QueryCodeResponse>(`/compute/v1beta1/code/${req["code_id"]}?${fm.renderURLSearchParams(req, ["code_id"])}`, {...initReq, method: "GET"})
  }
  static Codes(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<QueryCodesResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, QueryCodesResponse>(`/compute/v1beta1/codes?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static CodeHashByContractAddress(req: QueryByContractAddressRequest, initReq?: fm.InitReq): Promise<QueryCodeHashResponse> {
    return fm.fetchReq<QueryByContractAddressRequest, QueryCodeHashResponse>(`/compute/v1beta1/code_hash/by_contract_address/${req["contract_address"]}?${fm.renderURLSearchParams(req, ["contract_address"])}`, {...initReq, method: "GET"})
  }
  static CodeHashByCodeId(req: QueryByCodeIdRequest, initReq?: fm.InitReq): Promise<QueryCodeHashResponse> {
    return fm.fetchReq<QueryByCodeIdRequest, QueryCodeHashResponse>(`/compute/v1beta1/code_hash/by_code_id/${req["code_id"]}?${fm.renderURLSearchParams(req, ["code_id"])}`, {...initReq, method: "GET"})
  }
  static LabelByAddress(req: QueryByContractAddressRequest, initReq?: fm.InitReq): Promise<QueryContractLabelResponse> {
    return fm.fetchReq<QueryByContractAddressRequest, QueryContractLabelResponse>(`/compute/v1beta1/label/${req["contract_address"]}?${fm.renderURLSearchParams(req, ["contract_address"])}`, {...initReq, method: "GET"})
  }
  static AddressByLabel(req: QueryByLabelRequest, initReq?: fm.InitReq): Promise<QueryContractAddressResponse> {
    return fm.fetchReq<QueryByLabelRequest, QueryContractAddressResponse>(`/compute/v1beta1/contract_address/${req["label"]}?${fm.renderURLSearchParams(req, ["label"])}`, {...initReq, method: "GET"})
  }
  static ContractHistory(req: QueryContractHistoryRequest, initReq?: fm.InitReq): Promise<QueryContractHistoryResponse> {
    return fm.fetchReq<QueryContractHistoryRequest, QueryContractHistoryResponse>(`/compute/v1beta1/contract_history/${req["contract_address"]}?${fm.renderURLSearchParams(req, ["contract_address"])}`, {...initReq, method: "GET"})
  }
}