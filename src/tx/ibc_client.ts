import { AminoMsg, Msg, ProtoMsg } from "./types";

/** MsgUpdateClient defines an sdk.Msg to update a IBC client state using the given header. */
export class MsgUpdateClient implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/client/v1/tx").MsgUpdateClient,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgUpdateClient not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgUpdateClient not implemented.");
  }
}

/** MsgUpdateClient defines an sdk.Msg to update a IBC client state using the given header. */
export class MsgUpgradeClient implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/client/v1/tx").MsgUpgradeClient,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgUpgradeClient not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgUpgradeClient not implemented.");
  }
}

/** MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for light client misbehaviour. */
export class MsgSubmitMisbehaviour implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/client/v1/tx").MsgSubmitMisbehaviour,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgSubmitMisbehaviour not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgSubmitMisbehaviour not implemented.");
  }
}

/** MsgCreateClient defines a message to create an IBC client */
export class MsgCreateClient implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/client/v1/tx").MsgCreateClient,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgCreateClient not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgCreateClient not implemented.");
  }
}
