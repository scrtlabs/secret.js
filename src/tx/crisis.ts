import { MsgVerifyInvariant as MsgVerifyInvariantProto } from "../protobuf_stuff/cosmos/crisis/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgVerifyInvariant implements Msg {
  constructor(msg: MsgVerifyInvariantProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}
