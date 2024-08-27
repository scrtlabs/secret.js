import { AminoMsg, Msg, ProtoMsg } from "./types";
import {
  MsgCreateClient as MsgCreateClientParams,
  MsgUpdateClient as MsgUpdateClientParams,
  MsgUpgradeClient as MsgUpgradeClientParams,
  MsgSubmitMisbehaviour as MsgSubmitMisbehaviourParams,
  MsgRecoverClient as MsgRecoverClientParams,
  MsgIBCSoftwareUpgrade as MsgIBCSoftwareUpgradeParams,
} from "../protobuf/ibc/core/client/v1/tx";

export {
  MsgCreateClient as MsgCreateClientParams,
  MsgUpdateClient as MsgUpdateClientParams,
  MsgUpgradeClient as MsgUpgradeClientParams,
  MsgSubmitMisbehaviour as MsgSubmitMisbehaviourParams,
  MsgRecoverClient as MsgRecoverClientParams,
  MsgIBCSoftwareUpgrade as MsgIBCSoftwareUpgradeParams,
} from "../protobuf/ibc/core/client/v1/tx";

/** MsgUpdateClient defines an sdk.Msg to update a IBC client state using the given header. */
export class MsgUpdateClient implements Msg {
  constructor(private msg: MsgUpdateClientParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.client.v1.MsgUpdateClient",
      value: this.msg,
      encode: () => MsgUpdateClientParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgUpdateClient doesn't support Amino encoding.");
  }
}

/** MsgUpdateClient defines an sdk.Msg to update a IBC client state using the given header. */
export class MsgUpgradeClient implements Msg {
  constructor(private msg: MsgUpgradeClientParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.client.v1.MsgUpgradeClient",
      value: this.msg,
      encode: () => MsgUpgradeClientParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgUpgradeClient doesn't support Amino encoding.");
  }
}

/** MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for light client misbehaviour. */
export class MsgSubmitMisbehaviour implements Msg {
  constructor(private msg: MsgSubmitMisbehaviourParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.client.v1.MsgSubmitMisbehaviour",
      value: this.msg,
      encode: () => MsgSubmitMisbehaviourParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgSubmitMisbehaviour doesn't support Amino encoding.");
  }
}

/** MsgCreateClient defines a message to create an IBC client */
export class MsgCreateClient implements Msg {
  constructor(private msg: MsgCreateClientParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.client.v1.MsgCreateClient",
      value: this.msg,
      encode: () => MsgCreateClientParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgCreateClient doesn't support Amino encoding.");
  }
}

export class MsgRecoverClient implements Msg {
  constructor(private msg: MsgRecoverClientParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.client.v1.MsgRecoverClient",
      value: this.msg,
      encode: () => MsgRecoverClientParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgRecoverClient doesn't support Amino encoding.");
  }
}

export class MsgIBCSoftwareUpgrade implements Msg {
  constructor(private msg: MsgIBCSoftwareUpgradeParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.client.v1.MsgIBCSoftwareUpgrade",
      value: this.msg,
      encode: () => MsgIBCSoftwareUpgradeParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgIBCSoftwareUpgrade doesn't support Amino encoding.");
  }
}
