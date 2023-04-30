import { MsgParams } from ".";
import { AminoMsg, Coin, Input, Msg, Output, ProtoMsg } from "./types";

export interface MsgToggleIbcSwitchParams extends MsgParams {
  sender: string;
}

/** MsgSend represents a message to send coins from one account to another. */
export class MsgToggleIbcSwitch implements Msg {
  constructor(private params: MsgToggleIbcSwitchParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/secret.emergencybutton.v1beta1.MsgToggleIbcSwitch",
      value: this.params,
      encode: async () =>
        (await import("../protobuf/secret/emergencybutton/v1beta1/tx")).MsgToggleIbcSwitch.encode(
          this.params,
        ).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "emergencybutton/MsgToggleIbcSwitch",
      value: this.params,
    };
  }
}