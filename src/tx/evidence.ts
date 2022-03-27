import { MsgParams } from ".";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export interface MsgSubmitEvidenceParams extends MsgParams {
  submitter: string;
  evidence: import("../protobuf_stuff/google/protobuf/any").Any;
}

/**
 * MsgSubmitEvidence represents a message that supports submitting arbitrary
 * Evidence of misbehavior such as equivocation or counterfactual signing.
 */
export class MsgSubmitEvidence implements Msg {
  constructor(public params: MsgSubmitEvidenceParams) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgSubmitEvidence not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgSubmitEvidence not implemented.");
  }
}
