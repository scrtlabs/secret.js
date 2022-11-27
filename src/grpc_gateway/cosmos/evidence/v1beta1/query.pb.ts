/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
import * as CosmosBaseQueryV1beta1Pagination from "../../base/query/v1beta1/pagination.pb"
export type QueryEvidenceRequest = {
  evidence_hash?: Uint8Array
}

export type QueryEvidenceResponse = {
  evidence?: GoogleProtobufAny.Any
}

export type QueryAllEvidenceRequest = {
  pagination?: CosmosBaseQueryV1beta1Pagination.PageRequest
}

export type QueryAllEvidenceResponse = {
  evidence?: GoogleProtobufAny.Any[]
  pagination?: CosmosBaseQueryV1beta1Pagination.PageResponse
}

export class Query {
  static Evidence(req: QueryEvidenceRequest, initReq?: fm.InitReq): Promise<QueryEvidenceResponse> {
    return fm.fetchReq<QueryEvidenceRequest, QueryEvidenceResponse>(`/cosmos/evidence/v1beta1/evidence/${req["evidence_hash"]}?${fm.renderURLSearchParams(req, ["evidence_hash"])}`, {...initReq, method: "GET"})
  }
  static AllEvidence(req: QueryAllEvidenceRequest, initReq?: fm.InitReq): Promise<QueryAllEvidenceResponse> {
    return fm.fetchReq<QueryAllEvidenceRequest, QueryAllEvidenceResponse>(`/cosmos/evidence/v1beta1/evidence?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}