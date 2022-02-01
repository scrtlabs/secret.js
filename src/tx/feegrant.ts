import {
  MsgGrantAllowance as MsgGrantAllowanceProto,
  MsgRevokeAllowance as MsgRevokeAllowanceProto,
} from "../protobuf_stuff/cosmos/feegrant/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgGrantAllowance implements Msg {
  constructor(msg: MsgGrantAllowanceProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}

export class MsgRevokeAllowance implements Msg {
  constructor(msg: MsgRevokeAllowanceProto) {}
  toProto(): ProtoMsg {
    throw new Error("Method not implemented.");
  }
  toAmino(): AminoMsg {
    throw new Error("Method not implemented.");
  }
}
