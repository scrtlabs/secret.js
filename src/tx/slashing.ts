import { MsgParams } from ".";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export interface MsgUnjailParams extends MsgParams {
  validator_addr: string;
}

/** MsgUnjail defines a message to release a validator from jail. */
export class MsgUnjail implements Msg {
  constructor(public params: MsgUnjailParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.slashing.v1beta1.MsgUnjail",
      value: this.params,
      encode: async () =>
        (
          await import("../protobuf/cosmos/slashing/v1beta1/tx")
        ).MsgUnjail.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgUnjail",
      value: {
        address: this.params.validator_addr,
      },
    };
  }
}
