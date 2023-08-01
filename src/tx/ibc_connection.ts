import { AminoMsg, Msg, ProtoMsg } from "./types";

/** MsgConnectionOpenInit defines the msg sent by an account on Chain A to initialize a connection with Chain B. */
export class MsgConnectionOpenInit implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/connection/v1/tx").MsgConnectionOpenInit,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.connection.v1.MsgConnectionOpenInit",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/connection/v1/tx")
        ).MsgConnectionOpenInit.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenInit doesn't support Amino encoding.");
  }
}

/** MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a connection on Chain B. */
export class MsgConnectionOpenTry implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/connection/v1/tx").MsgConnectionOpenTry,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.connection.v1.MsgConnectionOpenTry",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/connection/v1/tx")
        ).MsgConnectionOpenTry.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenTry doesn't support Amino encoding.");
  }
}

/** MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to acknowledge the change of connection state to TRYOPEN on Chain B. */
export class MsgConnectionOpenAck implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/connection/v1/tx").MsgConnectionOpenAck,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.connection.v1.MsgConnectionOpenAck",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/connection/v1/tx")
        ).MsgConnectionOpenAck.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenAck doesn't support Amino encoding.");
  }
}

/** MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of connection state to OPEN on Chain A. */
export class MsgConnectionOpenConfirm implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/connection/v1/tx").MsgConnectionOpenConfirm,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.connection.v1.MsgConnectionOpenConfirm",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/connection/v1/tx")
        ).MsgConnectionOpenConfirm.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenConfirm doesn't support Amino encoding.");
  }
}
