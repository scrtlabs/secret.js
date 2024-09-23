import { Msg, AminoMsg, ProtoMsg } from "./types";
import {
  MsgToggleIbcSwitch as MsgToggleIbcSwitchParams,
  MsgUpdateParams as MsgUpdateParamsParams,
} from "../protobuf/secret/emergencybutton/v1beta1/tx";

export {
  MsgToggleIbcSwitch as MsgToggleIbcSwitchParams,
  MsgUpdateParams as MsgUpdateParamsParams,
} from "../protobuf/secret/emergencybutton/v1beta1/tx";
export { Params as EmergencyButtonParams } from "../protobuf/secret/emergencybutton/v1beta1/params";

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

export class MsgUpdateParams implements Msg {
  constructor(private params: MsgUpdateParamsParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/secret.emergencybutton.v1beta1.MsgUpdateParams",
      value: this.params,
      encode: () => MsgUpdateParamsParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "emergencybutton/MsgUpdateParams",
      value: this.params,
    };
  }
}
