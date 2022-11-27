import { MsgParams } from ".";
import {
  AllowedMsgAllowance as AllowedMsgAllowanceProto,
  BasicAllowance,
  PeriodicAllowance,
} from "../protobuf/cosmos/feegrant/v1beta1/feegrant";
import {
  MsgGrantAllowance as MsgGrantAllowanceProto,
  MsgRevokeAllowance as MsgRevokeAllowanceProto,
} from "../protobuf/cosmos/feegrant/v1beta1/tx";
import { Any } from "../protobuf/google/protobuf/any";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export interface MsgGrantAllowanceParams extends MsgParams {
  /** granter is the address of the user granting an allowance of their funds. */
  granter: string;
  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee: string;
  /** allowance can be any of basic and filtered fee allowance. */
  allowance: BasicAllowance | PeriodicAllowance | AllowedMsgAllowance;
}

export interface AllowedMsgAllowance {
  /** allowance can be any of basic and filtered fee allowance. */
  allowance: BasicAllowance | PeriodicAllowance;
  /** allowed_messages are the messages for which the grantee has the access. */
  allowed_messages: string[];
}

function isBasicAllowance(obj: any): obj is BasicAllowance {
  return "spend_limit" in obj;
}

function isPeriodicAllowance(obj: any): obj is PeriodicAllowance {
  return "period_spend_limit" in obj;
}

function isAllowedMsgAllowance(obj: any): obj is AllowedMsgAllowanceProto {
  return "allowed_messages" in obj;
}

/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export class MsgGrantAllowance implements Msg {
  constructor(public params: MsgGrantAllowanceParams) {}

  async toProto(): Promise<ProtoMsg> {
    let allowance: Any;
    if (isBasicAllowance(this.params.allowance)) {
      allowance = {
        type_url: "/cosmos.feegrant.v1beta1.BasicAllowance",
        value: BasicAllowance.encode(this.params.allowance).finish(),
      };
    } else if (isPeriodicAllowance(this.params.allowance)) {
      allowance = {
        type_url: "/cosmos.feegrant.v1beta1.PeriodicAllowance",
        value: PeriodicAllowance.encode(this.params.allowance).finish(),
      };
    } else if (isAllowedMsgAllowance(this.params.allowance)) {
      let internalAllowance: Any;
      if (isBasicAllowance(this.params.allowance.allowance)) {
        internalAllowance = {
          type_url: "/cosmos.feegrant.v1beta1.BasicAllowance",
          value: BasicAllowance.encode(
            this.params.allowance.allowance,
          ).finish(),
        };
      } else if (isPeriodicAllowance(this.params.allowance.allowance)) {
        internalAllowance = {
          type_url: "/cosmos.feegrant.v1beta1.PeriodicAllowance",
          value: PeriodicAllowance.encode(
            this.params.allowance.allowance,
          ).finish(),
        };
      } else {
        throw new Error(
          `PeriodicAllowance: Cannot cast allowance into 'BasicAllowance' or 'PeriodicAllowance': ${JSON.stringify(
            this.params.allowance.allowance,
          )}`,
        );
      }

      allowance = {
        type_url: "/cosmos.feegrant.v1beta1.AllowedMsgAllowance",
        value: AllowedMsgAllowanceProto.encode({
          allowed_messages: this.params.allowance.allowed_messages,
          allowance: internalAllowance,
        }).finish(),
      };
    } else {
      throw new Error(
        `Cannot cast allowance into 'BasicAllowance', 'PeriodicAllowance' or 'AllowedMsgAllowance': ${JSON.stringify(
          this.params.allowance,
        )}`,
      );
    }

    return {
      type_url: "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
      value: this.params,
      encode: async () =>
        MsgGrantAllowanceProto.encode({
          grantee: this.params.grantee,
          granter: this.params.granter,
          allowance,
        }).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    let allowance: { type: string; value: object };
    if (isBasicAllowance(this.params.allowance)) {
      allowance = {
        type: "cosmos-sdk/BasicAllowance",
        value: {
          spend_limit: this.params.allowance.spend_limit,
          expiration: this.params.allowance.expiration,
        },
      };
    } else if (isPeriodicAllowance(this.params.allowance)) {
      allowance = {
        type: "cosmos-sdk/PeriodicAllowance",
        value: {
          basic: this.params.allowance.basic,
          period: this.params.allowance.period,
          period_spend_limit: this.params.allowance.period_spend_limit,
          period_can_spend: this.params.allowance.period_can_spend,
          period_reset: this.params.allowance.period_reset,
        },
      };
    } else if (isAllowedMsgAllowance(this.params.allowance)) {
      let internalAllowance: { type: string; value: object };
      if (isBasicAllowance(this.params.allowance.allowance)) {
        internalAllowance = {
          type: "cosmos-sdk/BasicAllowance",
          value: {
            spend_limit: this.params.allowance.allowance.spend_limit,
            expiration: this.params.allowance.allowance.expiration,
          },
        };
      } else if (isPeriodicAllowance(this.params.allowance.allowance)) {
        internalAllowance = {
          type: "cosmos-sdk/PeriodicAllowance",
          value: {
            basic: this.params.allowance.allowance.basic,
            period: this.params.allowance.allowance.period,
            period_spend_limit:
              this.params.allowance.allowance.period_spend_limit,
            period_can_spend: this.params.allowance.allowance.period_can_spend,
            period_reset: this.params.allowance.allowance.period_reset,
          },
        };
      } else {
        throw new Error(
          `PeriodicAllowance: Cannot cast allowance into 'BasicAllowance' or 'PeriodicAllowance': ${JSON.stringify(
            this.params.allowance.allowance,
          )}`,
        );
      }

      allowance = {
        type: "cosmos-sdk/AllowedMsgAllowance",
        value: {
          allowed_messages: this.params.allowance.allowed_messages,
          allowance: internalAllowance,
        },
      };
    } else {
      throw new Error(
        `Cannot cast allowance into 'BasicAllowance', 'PeriodicAllowance' or 'AllowedMsgAllowance': ${JSON.stringify(
          this.params.allowance,
        )}`,
      );
    }

    return {
      type: "cosmos-sdk/MsgGrantAllowance",
      value: {
        granter: this.params.granter,
        grantee: this.params.grantee,
        allowance: allowance,
      },
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
      type_url: "/cosmos.feegrant.v1beta1.MsgRevokeAllowance",
      value: this.params,
      encode: async () => MsgRevokeAllowanceProto.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgRevokeAllowance",
      value: this.params,
    };
  }
}
