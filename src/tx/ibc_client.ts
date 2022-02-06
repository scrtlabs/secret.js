import {
  MsgCreateClient as MsgCreateClientProto,
  MsgSubmitMisbehaviour as MsgSubmitMisbehaviourProto,
  MsgUpdateClient as MsgUpdateClientProto,
  MsgUpgradeClient as MsgUpgradeClientProto,
} from "../protobuf_stuff/ibc/core/client/v1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgUpdateClient implements Msg {
  constructor(msg: MsgUpdateClientProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgUpdateClient not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgUpdateClient not implemented.");
  }
}

export class MsgUpgradeClient implements Msg {
  constructor(msg: MsgUpgradeClientProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgUpgradeClient not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgUpgradeClient not implemented.");
  }
}

export class MsgSubmitMisbehaviour implements Msg {
  constructor(msg: MsgSubmitMisbehaviourProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgSubmitMisbehaviour not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgSubmitMisbehaviour not implemented.");
  }
}

export class MsgCreateClient implements Msg {
  constructor(msg: MsgCreateClientProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgCreateClient not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgCreateClient not implemented.");
  }
}
