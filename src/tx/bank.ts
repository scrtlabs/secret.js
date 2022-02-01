import { AminoMsg, Msg, ProtoMsg } from "./types";
import { Input, Output } from "../protobuf_stuff/cosmos/bank/v1beta1/bank";
import {
  MsgMultiSend as MsgMultiSendProto,
  MsgSend as MsgSendProto,
  protobufPackage,
} from "../protobuf_stuff/cosmos/bank/v1beta1/tx";
import { Coin } from "../protobuf_stuff/cosmos/base/v1beta1/coin";
export { Coin, Input, Output };

export class MsgSend implements Msg {
  public fromAddress: string;
  public toAddress: string;
  public amount: Coin[];

  constructor({ fromAddress, toAddress, amount }: MsgSendProto) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  toProto(): ProtoMsg {
    return {
      typeUrl: `/${protobufPackage}.MsgSend`,
      value: {
        fromAddress: this.fromAddress,
        toAddress: this.toAddress,
        amount: this.amount,
      },
      encode: (): Uint8Array => {
        return MsgSendProto.encode(this).finish();
      },
    };
  }

  toAmino(): AminoMsg {
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

export class MsgMultiSend implements Msg {
  public inputs: Input[];
  public outputs: Output[];

  constructor({ inputs, outputs }: MsgMultiSendProto) {
    this.inputs = inputs;
    this.outputs = outputs;
  }

  toProto(): ProtoMsg {
    return {
      typeUrl: `/${protobufPackage}.MsgMultiSend`,
      value: {
        inputs: this.inputs,
        outputs: this.outputs,
      },
      encode: (): Uint8Array => {
        return MsgMultiSendProto.encode(this).finish();
      },
    };
  }

  toAmino(): AminoMsg {
    return {
      type: "cosmos-sdk/MsgMultiSend",
      value: {
        inputs: this.inputs,
        outputs: this.outputs,
      },
    };
  }
}
