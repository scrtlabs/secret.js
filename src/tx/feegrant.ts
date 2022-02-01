import {
  MsgGrantAllowance as MsgGrantAllowanceProto,
  MsgRevokeAllowance as MsgRevokeAllowanceProto,
} from "../protobuf_stuff/cosmos/feegrant/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgGrantAllowance implements Msg {
  constructor(msg: MsgGrantAllowanceProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgRevokeAllowance implements Msg {
  constructor(msg: MsgRevokeAllowanceProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}
