/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../fetch.pb"
import * as GoogleProtobufEmpty from "../../../google/protobuf/empty.pb"
import * as SecretRegistrationV1beta1Msg from "./msg.pb"
export type QueryEncryptedSeedRequest = {
  pub_key?: Uint8Array
}

export type QueryEncryptedSeedResponse = {
  encrypted_seed?: Uint8Array
}

export class Query {
  static TxKey(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<SecretRegistrationV1beta1Msg.Key> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, SecretRegistrationV1beta1Msg.Key>(`/registration/v1beta1/tx-key?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static RegistrationKey(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<SecretRegistrationV1beta1Msg.Key> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, SecretRegistrationV1beta1Msg.Key>(`/registration/v1beta1/registration-key?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static EncryptedSeed(req: QueryEncryptedSeedRequest, initReq?: fm.InitReq): Promise<QueryEncryptedSeedResponse> {
    return fm.fetchReq<QueryEncryptedSeedRequest, QueryEncryptedSeedResponse>(`/registration/v1beta1/encrypted-seed/${req["pub_key"]}?${fm.renderURLSearchParams(req, ["pub_key"])}`, {...initReq, method: "GET"})
  }
}