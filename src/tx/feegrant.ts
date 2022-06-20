import { MsgParams } from ".";
import { AllowedMsgAllowance, BasicAllowance, PeriodicAllowance } from "../protobuf_stuff/cosmos/feegrant/v1beta1/feegrant";
import { Any } from "../protobuf_stuff/google/protobuf/any";
import { AminoMsg, Msg, ProtoMsg } from "./types";

type BasicAllowanceParams = BasicAllowance;

type PeriodicAllowanceParams = PeriodicAllowance;

type AllowedMsgAllowanceParams = {
  [K in keyof AllowedMsgAllowance]: K extends 'allowance'
    ? BasicAllowance | PeriodicAllowance
    : AllowedMsgAllowance[K];
};

type AllowanceType = BasicAllowance | PeriodicAllowance | AllowedMsgAllowance;

type AllowanceParams = BasicAllowanceParams | PeriodicAllowanceParams | AllowedMsgAllowanceParams;

export interface MsgGrantAllowanceParams extends MsgParams {
  /** granter is the address of the user granting an allowance of their funds. */
  granter: string;
  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee: string;
  /** allowance can be any of basic and filtered fee allowance. */
  allowance: AllowanceParams;
}

function isBasicAllowance(allowance: AllowanceParams | AllowanceType): allowance is (BasicAllowance | BasicAllowanceParams) {
  return "spendLimit" in allowance;
}

function isPeriodicAllowance(allowance: AllowanceParams | AllowanceType): allowance is PeriodicAllowance | PeriodicAllowanceParams {
  return "periodSpendLimit" in allowance;
}

function isAllowedMsgAllowance(allowance: AllowanceParams | AllowanceType): allowance is AllowedMsgAllowance | AllowedMsgAllowanceParams {
  return "allowedMessages" in allowance;
}

function normalizeAllowance(allowanceParams: AllowanceParams, blockAllowedType=false): AllowanceType {
  if(isBasicAllowance(allowanceParams)) {
    return BasicAllowance.fromPartial(allowanceParams);
  }
  else if(isPeriodicAllowance(allowanceParams)) {
    return PeriodicAllowance.fromPartial(allowanceParams);
  }
  else if(isAllowedMsgAllowance(allowanceParams)) {
    if(blockAllowedType) {
      throw new Error("Refusing to accept nested AllowedMsgAllowance");
    }

    return AllowedMsgAllowance.fromPartial({
      ...allowanceParams,
      allowance: allowanceParams.allowance && normalizeAllowance(allowanceParams.allowance, true),
    });
  }
  else {
    throw new Error("Invalid allowance type specific for MsgGrantAllowance");
  }
}

function encodeAllowance(allowanceParams: AllowanceParams, blockAllowedType=false): Any {
  if(isBasicAllowance(allowanceParams)) {
    return {
      typeUrl: "/cosmos.feegrant.v1beta1.BasicAllowance",
      value: BasicAllowance.encode(BasicAllowance.fromPartial(allowanceParams)).finish(),
    };
  }
  else if(isPeriodicAllowance(allowanceParams)) {
    return {
      typeUrl: "/cosmos.feegrant.v1beta1.PeriodicAllowance",
      value: PeriodicAllowance.encode(PeriodicAllowance.fromPartial(allowanceParams)).finish(),
    };
  }
  else if(isAllowedMsgAllowance(allowanceParams)) {
    if(blockAllowedType) {
      throw new Error("Refusing to accept nested AllowedMsgAllowance");
    }

    return {
      typeUrl: "/cosmos.feegrant.v1beta1.AllowedMsgAllowance",
      value: AllowedMsgAllowance.encode({
        ...AllowedMsgAllowance.fromPartial(allowanceParams),
        allowance: allowanceParams.allowance && encodeAllowance(allowanceParams.allowance, true),
      }).finish(),
    };
  }
  else {
    throw new Error("Invalid allowance type specific for MsgGrantAllowance");
  }
}

/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export class MsgGrantAllowance implements Msg {
  constructor(public params: MsgGrantAllowanceParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      typeUrl: "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
      value: {
        ...this.params,
        allowance: normalizeAllowance(this.params.allowance),
      },
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/feegrant/v1beta1/tx")
        ).MsgGrantAllowance.encode({
          ...this.params,
          allowance: encodeAllowance(this.params.allowance),
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
