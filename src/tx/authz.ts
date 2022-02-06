import {
  MsgExec as MsgExecProto,
  MsgGrant as MsgGrantProto,
  MsgRevoke as MsgRevokeProto,
} from "../protobuf_stuff/cosmos/authz/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgGrant implements Msg {
  constructor(msg: MsgGrantProto) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgGrant not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgGrant not implemented.");
  }
}

export class MsgExec implements Msg {
  constructor(msg: MsgExecProto) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgExec not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgExec not implemented.");
  }
}

export class MsgRevoke implements Msg {
  constructor(msg: MsgRevokeProto) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgRevoke not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgRevoke not implemented.");
  }
}
