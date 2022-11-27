/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufAny from "../../../google/protobuf/any.pb"
export type MsgSubmitEvidence = {
  submitter?: string
  evidence?: GoogleProtobufAny.Any
}

export type MsgSubmitEvidenceResponse = {
  hash?: Uint8Array
}

export class Msg {
  static SubmitEvidence(req: MsgSubmitEvidence, initReq?: fm.InitReq): Promise<MsgSubmitEvidenceResponse> {
    return fm.fetchReq<MsgSubmitEvidence, MsgSubmitEvidenceResponse>(`/cosmos.evidence.v1beta1.Msg/SubmitEvidence`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}