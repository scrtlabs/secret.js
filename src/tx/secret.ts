import {
  MsgExecuteContract as MsgExecuteContractProto,
  MsgInstantiateContract as MsgInstantiateContractProto,
  MsgStoreCode as MsgStoreCodeProto,
} from "../protobuf_stuff/secret/compute/v1beta1/msg";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgInstantiateContract implements Msg {
  constructor(msg: MsgInstantiateContractProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgExecuteContract implements Msg {
  constructor(msg: MsgExecuteContractProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgStoreCode implements Msg {
  constructor(msg: MsgStoreCodeProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}
