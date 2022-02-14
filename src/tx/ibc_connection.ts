import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgConnectionOpenInit implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/connection/v1/tx").MsgConnectionOpenInit,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgConnectionOpenInit not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenInit not implemented.");
  }
}

export class MsgConnectionOpenTry implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/connection/v1/tx").MsgConnectionOpenTry,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgConnectionOpenTry not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenTry not implemented.");
  }
}

export class MsgConnectionOpenAck implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/connection/v1/tx").MsgConnectionOpenAck,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgConnectionOpenAck not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenAck not implemented.");
  }
}

export class MsgConnectionOpenConfirm implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/connection/v1/tx").MsgConnectionOpenConfirm,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgConnectionOpenConfirm not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenConfirm not implemented.");
  }
}
