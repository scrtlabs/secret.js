import { MsgParams } from ".";
import { AminoMsg, Coin, Msg, ProtoMsg } from "./types";

export interface MsgCreateVestingAccountParams extends MsgParams {
  fromAddress: string;
  toAddress: string;
  amount: Coin[];
  endTime: string;
  delayed: boolean;
}

/** MsgCreateVestingAccount defines a message that enables creating a vesting account. */
export class MsgCreateVestingAccount implements Msg {
  constructor(public params: MsgCreateVestingAccountParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
      value: this.params,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/vesting/v1beta1/tx")
        ).MsgCreateVestingAccount.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgCreateVestingAccount not implemented.");
  }
}
