import {
  MsgConnectionOpenAck as MsgConnectionOpenAckProto,
  MsgConnectionOpenConfirm as MsgConnectionOpenConfirmProto,
  MsgConnectionOpenInit as MsgConnectionOpenInitProto,
  MsgConnectionOpenTry as MsgConnectionOpenTryProto,
} from "../protobuf_stuff/ibc/core/connection/v1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgConnectionOpenInit implements Msg {
  constructor(msg: MsgConnectionOpenInitProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgConnectionOpenTry implements Msg {
  constructor(msg: MsgConnectionOpenTryProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgConnectionOpenAck implements Msg {
  constructor(msg: MsgConnectionOpenAckProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgConnectionOpenConfirm implements Msg {
  constructor(msg: MsgConnectionOpenConfirmProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}
