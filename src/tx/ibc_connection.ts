import { AminoMsg, Msg, ProtoMsg } from "./types";
import {
  MsgConnectionOpenInit as MsgConnectionOpenInitParams,
  MsgConnectionOpenTry as MsgConnectionOpenTryParams,
  MsgConnectionOpenAck as MsgConnectionOpenAckParams,
  MsgConnectionOpenConfirm as MsgConnectionOpenConfirmParams,
} from "../protobuf/ibc/core/connection/v1/tx";

export {
  MsgConnectionOpenInit as MsgConnectionOpenInitParams,
  MsgConnectionOpenTry as MsgConnectionOpenTryParams,
  MsgConnectionOpenAck as MsgConnectionOpenAckParams,
  MsgConnectionOpenConfirm as MsgConnectionOpenConfirmParams,
} from "../protobuf/ibc/core/connection/v1/tx";

/** MsgConnectionOpenInit defines the msg sent by an account on Chain A to initialize a connection with Chain B. */
export class MsgConnectionOpenInit implements Msg {
  constructor(private msg: MsgConnectionOpenInitParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.connection.v1.MsgConnectionOpenInit",
      value: this.msg,
      encode: () => MsgConnectionOpenInitParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenInit doesn't support Amino encoding.");
  }
}

/** MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a connection on Chain B. */
export class MsgConnectionOpenTry implements Msg {
  constructor(private msg: MsgConnectionOpenTryParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.connection.v1.MsgConnectionOpenTry",
      value: this.msg,
      encode: () => MsgConnectionOpenTryParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenTry doesn't support Amino encoding.");
  }
}

/** MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to acknowledge the change of connection state to TRYOPEN on Chain B. */
export class MsgConnectionOpenAck implements Msg {
  constructor(private msg: MsgConnectionOpenAckParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.connection.v1.MsgConnectionOpenAck",
      value: this.msg,
      encode: () => MsgConnectionOpenAckParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenAck doesn't support Amino encoding.");
  }
}

/** MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of connection state to OPEN on Chain A. */
export class MsgConnectionOpenConfirm implements Msg {
  constructor(private msg: MsgConnectionOpenConfirmParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.connection.v1.MsgConnectionOpenConfirm",
      value: this.msg,
      encode: () => MsgConnectionOpenConfirmParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgConnectionOpenConfirm doesn't support Amino encoding.");
  }
}
