import { MsgSubmitEvidence as MsgSubmitEvidenceProto } from "../protobuf_stuff/cosmos/evidence/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgSubmitEvidence implements Msg {
  constructor(msg: MsgSubmitEvidenceProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}
