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
      type_url: "/secret.ibcswitch.v1beta1.MsgToggleIbcSwitch",
      value: this.params,
      encode: async () =>
        (await import("../protobuf/secret/ibc-switch/v1beta1/tx")).MsgToggleIbcSwitch.encode(
          this.params,
        ).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "ibc-switch/MsgToggleIbcSwitch",
      value: this.params,
    };
  }
}

export interface MsgMultiSendParams extends MsgParams {
  inputs: Input[];
  outputs: Output[];
}

/** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
export class MsgMultiSend implements Msg {
  public inputs: Input[];
  public outputs: Output[];

  constructor({ inputs, outputs }: MsgMultiSendParams) {
    this.inputs = inputs;
    this.outputs = outputs;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      inputs: this.inputs,
      outputs: this.outputs,
    };

    return {
      type_url: "/cosmos.bank.v1beta1.MsgMultiSend",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf/cosmos/bank/v1beta1/tx")
        ).MsgMultiSend.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgMultiSend",
      value: {
        inputs: this.inputs,
        outputs: this.outputs,
      },
    };
  }
}
