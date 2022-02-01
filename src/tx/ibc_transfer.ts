import { MsgTransfer as MsgTransferProto } from "../protobuf_stuff/ibc/applications/transfer/v1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgTransfer implements Msg {
  constructor(msg: MsgTransferProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}
