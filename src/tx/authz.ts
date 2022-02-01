import {
  MsgExec as MsgExecProto,
  MsgGrant as MsgGrantProto,
  MsgRevoke as MsgRevokeProto,
} from "../protobuf_stuff/cosmos/authz/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgGrant implements Msg {
  constructor(msg: MsgGrantProto) {}

  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgExec implements Msg {
  constructor(msg: MsgExecProto) {}

  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgRevoke implements Msg {
  constructor(msg: MsgRevokeProto) {}

  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}
