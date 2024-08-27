import { AminoMsg, Msg, ProtoMsg } from "./types";

import { MsgUnjail as MsgUnjailParams } from "../protobuf/cosmos/slashing/v1beta1/tx";

export { MsgUnjail as MsgUnjailParams } from "../protobuf/cosmos/slashing/v1beta1/tx";

/** MsgUnjail defines a message to release a validator from jail. */
export class MsgUnjail implements Msg {
  constructor(public params: MsgUnjailParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.slashing.v1beta1.MsgUnjail",
      value: this.params,
      encode: () => MsgUnjailParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgUnjail",
      value: this.params,
    };
  }
}
