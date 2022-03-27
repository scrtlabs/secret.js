import { MsgParams } from ".";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export interface MsgGrantAllowanceParams extends MsgParams {
  /** granter is the address of the user granting an allowance of their funds. */
  granter: string;
  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee: string;
  /** allowance can be any of basic and filtered fee allowance. */
  allowance: import("../protobuf_stuff/google/protobuf/any").Any; //TODO BasicAllowance | PeriodicAllowance;
}

/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export class MsgGrantAllowance implements Msg {
  constructor(public params: MsgGrantAllowanceParams) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgGrantAllowance not implemented.");

    // TODO
    return {
      typeUrl: "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
      value: this.params,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/feegrant/v1beta1/tx")
        ).MsgGrantAllowance.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgGrantAllowance not implemented.");

    // TODO
    return {
      type: "cosmos-sdk/MsgGrantAllowance",
      value: this.params,
    };
  }
}

export interface MsgRevokeAllowanceParams extends MsgParams {
  /** granter is the address of the user granting an allowance of their funds. */
  granter: string;
  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee: string;
}

/** MsgRevokeAllowance removes any existing Allowance from Granter to Grantee. */
export class MsgRevokeAllowance implements Msg {
  constructor(public params: MsgRevokeAllowanceParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      typeUrl: "/cosmos.feegrant.v1beta1.MsgRevokeAllowance",
      value: this.params,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/feegrant/v1beta1/tx")
        ).MsgRevokeAllowance.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgRevokeAllowance",
      value: this.params,
    };
  }
}
