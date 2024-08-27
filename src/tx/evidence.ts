import { AminoMsg, Msg, ProtoMsg } from "./types";
import { MsgSubmitEvidence as MsgSubmitEvidenceParams } from "../protobuf/cosmos/evidence/v1beta1/tx";

export { MsgSubmitEvidence as MsgSubmitEvidenceParams } from "../protobuf/cosmos/evidence/v1beta1/tx";

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
