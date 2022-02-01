import {
  MsgCreateClient as MsgCreateClientProto,
  MsgSubmitMisbehaviour as MsgSubmitMisbehaviourProto,
  MsgUpdateClient as MsgUpdateClientProto,
  MsgUpgradeClient as MsgUpgradeClientProto,
} from "../protobuf_stuff/ibc/core/client/v1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgUpdateClient implements Msg {
  constructor(msg: MsgUpdateClientProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgUpgradeClient implements Msg {
  constructor(msg: MsgUpgradeClientProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgSubmitMisbehaviour implements Msg {
  constructor(msg: MsgSubmitMisbehaviourProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgCreateClient implements Msg {
  constructor(msg: MsgCreateClientProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}
