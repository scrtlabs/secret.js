import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgGrantAllowance implements Msg {
  constructor(
    msg: import("../protobuf_stuff/cosmos/feegrant/v1beta1/tx").MsgGrantAllowance,
  ) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgGrantAllowance not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgGrantAllowance not implemented.");
  }
}

export class MsgRevokeAllowance implements Msg {
  constructor(
    msg: import("../protobuf_stuff/cosmos/feegrant/v1beta1/tx").MsgRevokeAllowance,
  ) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgRevokeAllowance not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgRevokeAllowance not implemented.");
  }
}
