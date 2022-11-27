import { AminoMsg, Msg, ProtoMsg } from "./types";

/** MsgConnectionOpenInit defines the msg sent by an account on Chain A to initialize a connection with Chain B. */
export class MsgConnectionOpenInit implements Msg {
  constructor(
    msg: import("../protobuf/ibc/core/connection/v1/tx").MsgConnectionOpenInit,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgConnectionOpenInit not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenInit not implemented.");
  }
}

/** MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a connection on Chain B. */
export class MsgConnectionOpenTry implements Msg {
  constructor(
    msg: import("../protobuf/ibc/core/connection/v1/tx").MsgConnectionOpenTry,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgConnectionOpenTry not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenTry not implemented.");
  }
}

/** MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to acknowledge the change of connection state to TRYOPEN on Chain B. */
export class MsgConnectionOpenAck implements Msg {
  constructor(
    msg: import("../protobuf/ibc/core/connection/v1/tx").MsgConnectionOpenAck,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgConnectionOpenAck not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenAck not implemented.");
  }
}

/** MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of connection state to OPEN on Chain A. */
export class MsgConnectionOpenConfirm implements Msg {
  constructor(
    msg: import("../protobuf/ibc/core/connection/v1/tx").MsgConnectionOpenConfirm,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgConnectionOpenConfirm not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenConfirm not implemented.");
  }
}
