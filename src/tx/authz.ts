import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgGrant implements Msg {
  constructor(
    msg: import("../protobuf_stuff/cosmos/authz/v1beta1/tx").MsgGrant,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgGrant not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgGrant not implemented.");
  }
}

export class MsgExec implements Msg {
  constructor(
    msg: import("../protobuf_stuff/cosmos/authz/v1beta1/tx").MsgExec,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgExec not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgExec not implemented.");
  }
}

export class MsgRevoke implements Msg {
  constructor(
    msg: import("../protobuf_stuff/cosmos/authz/v1beta1/tx").MsgRevoke,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgRevoke not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgRevoke not implemented.");
  }
}
