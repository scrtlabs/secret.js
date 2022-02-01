import {
  MsgBeginRedelegate as MsgBeginRedelegateProto,
  MsgCreateValidator as MsgCreateValidatorProto,
  MsgDelegate as MsgDelegateProto,
  MsgEditValidator as MsgEditValidatorProto,
  MsgUndelegate as MsgUndelegateProto,
} from "../protobuf_stuff/cosmos/staking/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgCreateValidator implements Msg {
  constructor(msg: MsgCreateValidatorProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgEditValidator implements Msg {
  constructor(msg: MsgEditValidatorProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgDelegate implements Msg {
  constructor(msg: MsgDelegateProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgBeginRedelegate implements Msg {
  constructor(msg: MsgBeginRedelegateProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgUndelegate implements Msg {
  constructor(msg: MsgUndelegateProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}
