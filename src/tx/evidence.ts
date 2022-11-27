import { MsgParams } from ".";
import { Any } from "../protobuf/google/protobuf/any";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export interface MsgSubmitEvidenceParams extends MsgParams {
  submitter: string;
  evidence: Any;
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
