/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosUpgradeV1beta1Upgrade from "../../../../cosmos/upgrade/v1beta1/upgrade.pb"
import * as fm from "../../../../fetch.pb"
import * as GoogleProtobufAny from "../../../../google/protobuf/any.pb"
import * as IbcCoreClientV1Client from "./client.pb"
export type MsgCreateClient = {
  client_state?: GoogleProtobufAny.Any
  consensus_state?: GoogleProtobufAny.Any
  signer?: string
}

export type MsgCreateClientResponse = {
}

export type MsgUpdateClient = {
  client_id?: string
  client_message?: GoogleProtobufAny.Any
  signer?: string
}

export type MsgUpdateClientResponse = {
}

export type MsgUpgradeClient = {
  client_id?: string
  client_state?: GoogleProtobufAny.Any
  consensus_state?: GoogleProtobufAny.Any
  proof_upgrade_client?: Uint8Array
  proof_upgrade_consensus_state?: Uint8Array
  signer?: string
}

export type MsgUpgradeClientResponse = {
}

export type MsgSubmitMisbehaviour = {
  client_id?: string
  misbehaviour?: GoogleProtobufAny.Any
  signer?: string
}

export type MsgSubmitMisbehaviourResponse = {
}

export type MsgRecoverClient = {
  subject_client_id?: string
  substitute_client_id?: string
  signer?: string
}

export type MsgRecoverClientResponse = {
}

export type MsgIBCSoftwareUpgrade = {
  plan?: CosmosUpgradeV1beta1Upgrade.Plan
  upgraded_client_state?: GoogleProtobufAny.Any
  signer?: string
}

export type MsgIBCSoftwareUpgradeResponse = {
}

export type MsgUpdateParams = {
  signer?: string
  params?: IbcCoreClientV1Client.Params
}

export type MsgUpdateParamsResponse = {
}

export class Msg {
  static CreateClient(req: MsgCreateClient, initReq?: fm.InitReq): Promise<MsgCreateClientResponse> {
    return fm.fetchReq<MsgCreateClient, MsgCreateClientResponse>(`/ibc.core.client.v1.Msg/CreateClient`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateClient(req: MsgUpdateClient, initReq?: fm.InitReq): Promise<MsgUpdateClientResponse> {
    return fm.fetchReq<MsgUpdateClient, MsgUpdateClientResponse>(`/ibc.core.client.v1.Msg/UpdateClient`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpgradeClient(req: MsgUpgradeClient, initReq?: fm.InitReq): Promise<MsgUpgradeClientResponse> {
    return fm.fetchReq<MsgUpgradeClient, MsgUpgradeClientResponse>(`/ibc.core.client.v1.Msg/UpgradeClient`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static SubmitMisbehaviour(req: MsgSubmitMisbehaviour, initReq?: fm.InitReq): Promise<MsgSubmitMisbehaviourResponse> {
    return fm.fetchReq<MsgSubmitMisbehaviour, MsgSubmitMisbehaviourResponse>(`/ibc.core.client.v1.Msg/SubmitMisbehaviour`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static RecoverClient(req: MsgRecoverClient, initReq?: fm.InitReq): Promise<MsgRecoverClientResponse> {
    return fm.fetchReq<MsgRecoverClient, MsgRecoverClientResponse>(`/ibc.core.client.v1.Msg/RecoverClient`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static IBCSoftwareUpgrade(req: MsgIBCSoftwareUpgrade, initReq?: fm.InitReq): Promise<MsgIBCSoftwareUpgradeResponse> {
    return fm.fetchReq<MsgIBCSoftwareUpgrade, MsgIBCSoftwareUpgradeResponse>(`/ibc.core.client.v1.Msg/IBCSoftwareUpgrade`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static UpdateClientParams(req: MsgUpdateParams, initReq?: fm.InitReq): Promise<MsgUpdateParamsResponse> {
    return fm.fetchReq<MsgUpdateParams, MsgUpdateParamsResponse>(`/ibc.core.client.v1.Msg/UpdateClientParams`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
}