import { Msg, AminoMsg, ProtoMsg } from "./types";
import { MsgToggleIbcSwitch as MsgToggleIbcSwitchParams } from "../protobuf/secret/emergencybutton/v1beta1/tx";

export { MsgToggleIbcSwitch as MsgToggleIbcSwitchParams } from "../protobuf/secret/emergencybutton/v1beta1/tx";

/** MsgSend represents a message to send coins from one account to another. */
export class MsgToggleIbcSwitch implements Msg {
  constructor(private params: MsgToggleIbcSwitchParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/secret.emergencybutton.v1beta1.MsgToggleIbcSwitch",
      value: this.params,
      encode: () => MsgToggleIbcSwitchParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "emergencybutton/MsgToggleIbcSwitch",
      value: this.params,
    };
  }
}
