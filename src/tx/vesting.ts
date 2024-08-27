import { AminoMsg, Msg, ProtoMsg } from "./types";
import {
  MsgCreateVestingAccount as MsgCreateVestingAccountParams,
  MsgCreatePermanentLockedAccount as MsgCreatePermanentLockedAccountParams,
  MsgCreatePeriodicVestingAccount as MsgCreatePeriodicVestingAccountParams,
} from "../protobuf/cosmos/vesting/v1beta1/tx";

export {
  MsgCreateVestingAccount as MsgCreateVestingAccountParams,
  MsgCreatePermanentLockedAccount as MsgCreatePermanentLockedAccountParams,
  MsgCreatePeriodicVestingAccount as MsgCreatePeriodicVestingAccountParams,
} from "../protobuf/cosmos/vesting/v1beta1/tx";

/** MsgCreateVestingAccount defines a message that enables creating a vesting account. */
export class MsgCreateVestingAccount implements Msg {
  constructor(public params: MsgCreateVestingAccountParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
      value: this.params,
      encode: () => MsgCreateVestingAccountParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgCreateVestingAccount not implemented.");
  }
}

export class MsgCreatePermanentLockedAccount implements Msg {
  constructor(public params: MsgCreateVestingAccountParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount",
      value: this.params,
      encode: () =>
        MsgCreatePermanentLockedAccountParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgCreatePermanentLockedAccount not implemented.");
  }
}

export class MsgCreatePeriodicVestingAccount implements Msg {
  constructor(public params: MsgCreatePeriodicVestingAccountParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount",
      value: this.params,
      encode: () =>
        MsgCreatePeriodicVestingAccountParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgCreatePeriodicVestingAccount not implemented.");
  }
}
