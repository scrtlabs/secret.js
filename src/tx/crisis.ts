import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgVerifyInvariant implements Msg {
  constructor(
    msg: import("../protobuf_stuff/cosmos/crisis/v1beta1/tx").MsgVerifyInvariant,
  ) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgVerifyInvariant not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgVerifyInvariant not implemented.");
  }
}
