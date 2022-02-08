import {
  MsgUnjail as MsgUnjailProto,
  protobufPackage,
} from "../protobuf_stuff/cosmos/slashing/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export type MsgUnjailParams = MsgUnjailProto;

export class MsgUnjail implements Msg {
  public validatorAddr: string;

  constructor({ validatorAddr }: MsgUnjailParams) {
    this.validatorAddr = validatorAddr;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent: MsgUnjailProto = {
      validatorAddr: this.validatorAddr,
    };

    return {
      typeUrl: `/${protobufPackage}.MsgUnjail`,
      value: msgContent,
      encode: function (): Uint8Array {
        return MsgUnjailProto.encode(msgContent).finish();
      },
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgUnjail",
      value: {
        address: this.validatorAddr,
      },
    };
  }
}
