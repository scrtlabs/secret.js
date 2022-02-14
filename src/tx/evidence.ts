import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgSubmitEvidence implements Msg {
  constructor(
    msg: import("../protobuf_stuff/cosmos/evidence/v1beta1/tx").MsgSubmitEvidence,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgSubmitEvidence not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgSubmitEvidence not implemented.");
  }
}
