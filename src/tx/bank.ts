import { MsgParams } from ".";
import { AminoMsg, Coin, Input, Msg, Output, ProtoMsg } from "./types";

export interface MsgSendParams extends MsgParams {
  from_address: string;
  to_address: string;
  amount: Coin[];
}

/** MsgSend represents a message to send coins from one account to another. */
export class MsgSend implements Msg {
  public from_address: string;
  public to_address: string;
  public amount: Coin[];

  constructor({ from_address, to_address, amount }: MsgSendParams) {
    this.from_address = from_address;
    this.to_address = to_address;
    this.amount = amount;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      from_address: this.from_address,
      to_address: this.to_address,
      amount: this.amount,
    };

    return {
      type_url: "/cosmos.bank.v1beta1.MsgSend",
      value: msgContent,
      encode: async () =>
        (await import("../protobuf/cosmos/bank/v1beta1/tx")).MsgSend.encode(
          msgContent,
        ).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgSend",
      value: {
        from_address: this.from_address,
        to_address: this.to_address,
        amount: this.amount,
      },
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
