import { MsgTransfer as MsgTransferProto } from "../protobuf_stuff/ibc/applications/transfer/v1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgTransfer implements Msg {
  constructor(msg: MsgTransferProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}
