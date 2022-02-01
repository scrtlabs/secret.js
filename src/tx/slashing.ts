import { MsgUnjail as MsgUnjailProto } from "../protobuf_stuff/cosmos/slashing/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgUnjail implements Msg {
  constructor(msg: MsgUnjailProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}
