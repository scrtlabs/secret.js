import { AminoMsg, Msg, ProtoMsg } from "./types";
import { MsgVerifyInvariant as MsgVerifyInvariantParams } from "../protobuf/cosmos/crisis/v1beta1/tx";

export { MsgVerifyInvariant as MsgVerifyInvariantParams } from "../protobuf/cosmos/crisis/v1beta1/tx";

/** MsgVerifyInvariant represents a message to verify a particular invariance. */
export class MsgVerifyInvariant implements Msg {
  constructor(public params: MsgVerifyInvariantParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.crisis.v1beta1.MsgVerifyInvariant",
      value: this.params,
      encode: () => MsgVerifyInvariantParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgVerifyInvariant",
      value: this.params,
    };
  }
}
