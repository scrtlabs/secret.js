import { AminoMsg, Msg, ProtoMsg } from "./types";

/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export class MsgGrantAllowance implements Msg {
  constructor(
    msg: import("../protobuf_stuff/cosmos/feegrant/v1beta1/tx").MsgGrantAllowance,
  ) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgGrantAllowance not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgGrantAllowance not implemented.");
  }
}

/** MsgRevokeAllowance removes any existing Allowance from Granter to Grantee. */
export class MsgRevokeAllowance implements Msg {
  constructor(
    msg: import("../protobuf_stuff/cosmos/feegrant/v1beta1/tx").MsgRevokeAllowance,
  ) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgRevokeAllowance not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgRevokeAllowance not implemented.");
  }
}
