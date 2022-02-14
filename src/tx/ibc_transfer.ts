import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgTransfer implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/applications/transfer/v1/tx").MsgTransfer,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgTransfer not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgTransfer not implemented.");
  }
}
