import {
  MsgFundCommunityPool as MsgFundCommunityPoolProto,
  MsgSetWithdrawAddress as MsgSetWithdrawAddressProto,
  MsgWithdrawDelegatorReward as MsgWithdrawDelegatorRewardProto,
  MsgWithdrawValidatorCommission as MsgWithdrawValidatorCommissionProto,
} from "../protobuf_stuff/cosmos/distribution/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgSetWithdrawAddress implements Msg {
  constructor(msg: MsgSetWithdrawAddressProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgWithdrawDelegatorReward implements Msg {
  constructor(msg: MsgWithdrawDelegatorRewardProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgWithdrawValidatorCommission implements Msg {
  constructor(msg: MsgWithdrawValidatorCommissionProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgFundCommunityPool implements Msg {
  constructor(msg: MsgFundCommunityPoolProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}
