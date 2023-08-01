import { AminoMsg, Msg, ProtoMsg } from "./types";

/** MsgUpdateClient defines an sdk.Msg to update a IBC client state using the given header. */
export class MsgUpdateClient implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/client/v1/tx").MsgUpdateClient,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.client.v1.MsgUpdateClient",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/client/v1/tx")
        ).MsgUpdateClient.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgUpdateClient doesn't support Amino encoding.");
  }
}

/** MsgUpdateClient defines an sdk.Msg to update a IBC client state using the given header. */
export class MsgUpgradeClient implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/client/v1/tx").MsgUpgradeClient,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.client.v1.MsgUpgradeClient",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/client/v1/tx")
        ).MsgUpgradeClient.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgUpgradeClient doesn't support Amino encoding.");
  }
}

/** MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for light client misbehaviour. */
export class MsgSubmitMisbehaviour implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/client/v1/tx").MsgSubmitMisbehaviour,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.client.v1.MsgSubmitMisbehaviour",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/client/v1/tx")
        ).MsgSubmitMisbehaviour.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgSubmitMisbehaviour doesn't support Amino encoding.");
  }
}

/** MsgCreateClient defines a message to create an IBC client */
export class MsgCreateClient implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/client/v1/tx").MsgCreateClient,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.client.v1.MsgCreateClient",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/client/v1/tx")
        ).MsgCreateClient.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgCreateClient doesn't support Amino encoding.");
  }
}
