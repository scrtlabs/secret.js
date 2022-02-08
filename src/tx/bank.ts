import { AminoMsg, Msg, ProtoMsg } from "./types";
import { Input, Output } from "../protobuf_stuff/cosmos/bank/v1beta1/bank";
import {
  MsgMultiSend as MsgMultiSendProto,
  MsgSend as MsgSendProto,
  protobufPackage,
} from "../protobuf_stuff/cosmos/bank/v1beta1/tx";
import { Coin } from "../protobuf_stuff/cosmos/base/v1beta1/coin";
export { Coin, Input, Output };

export type MsgSendParams = MsgSendProto;

export class MsgSend implements Msg {
  public fromAddress: string;
  public toAddress: string;
  public amount: Coin[];

  constructor({ fromAddress, toAddress, amount }: MsgSendParams) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      amount: this.amount,
    };

    return {
      typeUrl: `/${protobufPackage}.MsgSend`,
      value: msgContent,
      encode: function (): Uint8Array {
        return MsgSendProto.encode(msgContent).finish();
      },
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgSend",
      value: {
        from_address: this.fromAddress,
        to_address: this.toAddress,
        amount: this.amount,
      },
    };
  }
}

export type MsgMultiSendParams = MsgMultiSendProto;

export class MsgMultiSend implements Msg {
  public inputs: Input[];
  public outputs: Output[];

  constructor({ inputs, outputs }: MsgMultiSendParams) {
    this.inputs = inputs;
    this.outputs = outputs;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent: MsgMultiSendProto = {
      inputs: this.inputs,
      outputs: this.outputs,
    };

    return {
      typeUrl: `/${protobufPackage}.MsgMultiSend`,
      value: msgContent,
      encode: function (): Uint8Array {
        return MsgMultiSendProto.encode(msgContent).finish();
      },
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
