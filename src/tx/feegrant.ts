import { MsgParams } from ".";
import { AllowedMsgAllowance, BasicAllowance, PeriodicAllowance } from "../protobuf_stuff/cosmos/feegrant/v1beta1/feegrant";
import { Any } from "../protobuf_stuff/google/protobuf/any";
import { AminoMsg, Msg, ProtoMsg } from "./types";

type AllowanceType = BasicAllowance | PeriodicAllowance | AllowedMsgAllowance;

export interface MsgGrantAllowanceParams extends MsgParams {
  /** granter is the address of the user granting an allowance of their funds. */
  granter: string;
  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee: string;
  /** allowance can be any of basic and filtered fee allowance. */
  allowance: AllowanceType;
}

function isBasicAllowance(allowanceParams: AllowanceType): allowanceParams is BasicAllowance {
  return "spendLimit" in allowanceParams;
}

function isPeriodicAllowance(allowanceParams: AllowanceType): allowanceParams is PeriodicAllowance {
  return "periodSpendLimit" in allowanceParams;
}

function isAllowedMsgAllowance(allowanceParams: AllowanceType): allowanceParams is AllowedMsgAllowance {
  return "allowedMessages" in allowanceParams;
}

function normalizeAllowance(allowanceParams: AllowanceType): [AllowanceType, Any] {
  let allowance: AllowanceType;
  let allowanceMsg: Any;

  if(isBasicAllowance(allowanceParams)) {
    allowance = BasicAllowance.fromPartial(allowanceParams);
    allowanceMsg = {
      typeUrl: "/cosmos.feegrant.v1beta1.BasicAllowance",
      value: BasicAllowance.encode(allowance).finish(),
    };
  }
  else if(isPeriodicAllowance(allowanceParams)) {
    allowance = PeriodicAllowance.fromPartial(allowanceParams);
    allowanceMsg = {
      typeUrl: "/cosmos.feegrant.v1beta1.PeriodicAllowance",
      value: PeriodicAllowance.encode(allowance).finish(),
    };
  }
  else if(isAllowedMsgAllowance(allowanceParams)) {
    allowance = AllowedMsgAllowance.fromPartial(allowanceParams);
    allowanceMsg = {
      typeUrl: "/cosmos.feegrant.v1beta1.AllowedMsgAllowance",
      value: AllowedMsgAllowance.encode(allowance).finish(),
    };
  }
  else {
    throw new Error("Invalid allowance type specific for MsgGrantAllowance");
  }

  return [allowance, allowanceMsg];
}

/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export class MsgGrantAllowance implements Msg {
  protected allowanceMsg?: Any;

  constructor(public params: MsgGrantAllowanceParams) {
    if(params.allowance) {
      [params.allowance, this.allowanceMsg] = normalizeAllowance(params.allowance);
    }
  }

  async toProto(): Promise<ProtoMsg> {
    return {
      typeUrl: "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
      value: this.params,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/feegrant/v1beta1/tx")
        ).MsgGrantAllowance.encode({
          grantee: this.params.grantee,
          granter: this.params.granter,
          allowance: this.allowanceMsg,
        }).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    // throw new Error("MsgGrantAllowance not implemented.");

    // // TODO
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
