import {
  MsgFundCommunityPool as MsgFundCommunityPoolProto,
  MsgSetWithdrawAddress as MsgSetWithdrawAddressProto,
  MsgWithdrawDelegatorReward as MsgWithdrawDelegatorRewardProto,
  MsgWithdrawValidatorCommission as MsgWithdrawValidatorCommissionProto,
} from "../protobuf_stuff/cosmos/distribution/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgSetWithdrawAddress implements Msg {
  constructor(msg: MsgSetWithdrawAddressProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgWithdrawDelegatorReward implements Msg {
  constructor(msg: MsgWithdrawDelegatorRewardProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgWithdrawValidatorCommission implements Msg {
  constructor(msg: MsgWithdrawValidatorCommissionProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgFundCommunityPool implements Msg {
  constructor(msg: MsgFundCommunityPoolProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}
