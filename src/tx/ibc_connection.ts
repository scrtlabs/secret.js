import {
  MsgConnectionOpenAck as MsgConnectionOpenAckProto,
  MsgConnectionOpenConfirm as MsgConnectionOpenConfirmProto,
  MsgConnectionOpenInit as MsgConnectionOpenInitProto,
  MsgConnectionOpenTry as MsgConnectionOpenTryProto,
} from "../protobuf_stuff/ibc/core/connection/v1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgConnectionOpenInit implements Msg {
  constructor(msg: MsgConnectionOpenInitProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgConnectionOpenTry implements Msg {
  constructor(msg: MsgConnectionOpenTryProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgConnectionOpenAck implements Msg {
  constructor(msg: MsgConnectionOpenAckProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgConnectionOpenConfirm implements Msg {
  constructor(msg: MsgConnectionOpenConfirmProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}
