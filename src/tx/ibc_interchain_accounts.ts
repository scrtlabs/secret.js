import { AminoMsg, Msg, ProtoMsg } from "./types";
import {
  MsgRegisterInterchainAccount as MsgRegisterInterchainAccountParams,
  MsgSendTx as MsgSendTxParams,
} from "../protobuf/ibc/applications/interchain_accounts/controller/v1/tx";

export {
  MsgRegisterInterchainAccount as MsgRegisterInterchainAccountParams,
  MsgSendTx as MsgSendTxParams,
} from "../protobuf/ibc/applications/interchain_accounts/controller/v1/tx";

export class MsgRegisterInterchainAccount implements Msg {
  constructor(public params: MsgRegisterInterchainAccountParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount`,
      value: this.params,
      encode: () =>
        MsgRegisterInterchainAccountParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("Not implemented. Please use WalletProto");
  }
}

export class MsgSendTx implements Msg {
  constructor(public params: MsgSendTxParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/ibc.applications.interchain_accounts.controller.v1.MsgSendTx`,
      value: this.params,
      encode: () => MsgSendTxParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("Not implemented. Please use WalletProto");
  }
}
