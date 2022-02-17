import { MsgParams } from ".";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export interface MsgVerifyInvariantParams extends MsgParams {
  sender: string;
  invariantModuleName: string;
  invariantRoute: string;
}

/** MsgVerifyInvariant represents a message to verify a particular invariance. */
export class MsgVerifyInvariant implements Msg {
  constructor(public params: MsgVerifyInvariantParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      typeUrl: "/cosmos.crisis.v1beta1.MsgVerifyInvariant",
      value: this.params,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/crisis/v1beta1/tx")
        ).MsgVerifyInvariant.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgVerifyInvariant",
      value: {
        sender: this.params.sender || undefined,
        invariant_module_name: this.params.invariantModuleName || undefined,
        invariant_route: this.params.invariantRoute || undefined,
      },
    };
  }
}
