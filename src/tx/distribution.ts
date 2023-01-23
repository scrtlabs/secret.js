import { Coin, MsgParams } from ".";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export interface MsgSetWithdrawAddressParams extends MsgParams {
  delegator_address: string;
  withdraw_address: string;
}

/**
 * MsgSetWithdrawAddress sets the withdraw address for
 * a delegator (or validator self-delegation).
 */
export class MsgSetWithdrawAddress implements Msg {
  constructor(public params: MsgSetWithdrawAddressParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
      value: this.params,
      encode: async () =>
        (
          await import("../protobuf/cosmos/distribution/v1beta1/tx")
        ).MsgSetWithdrawAddress.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgModifyWithdrawAddress", // wtf
      value: this.params,
    };
  }
}

// proto and amino names are different, so export both names
export { MsgSetWithdrawAddress as MsgModifyWithdrawAddress };
// proto and amino names are different, so export both names
export { MsgWithdrawDelegatorReward as MsgWithdrawDelegationReward };

export interface MsgWithdrawDelegatorRewardParams extends MsgParams {
  delegator_address: string;
  validator_address: string;
}

/**
 * MsgWithdrawDelegatorReward represents delegation withdrawal to a delegator
 * from a single validator.
 */
export class MsgWithdrawDelegatorReward implements Msg {
  constructor(public params: MsgWithdrawDelegatorRewardParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      value: this.params,
      encode: async () =>
        (
          await import("../protobuf/cosmos/distribution/v1beta1/tx")
        ).MsgWithdrawDelegatorReward.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgWithdrawDelegationReward", // wtf
      value: this.params,
    };
  }
}

export interface MsgWithdrawValidatorCommissionParams extends MsgParams {
  validator_address: string;
}

/**
 * MsgWithdrawValidatorCommission withdraws the full commission to the validator
 * address.
 */
export class MsgWithdrawValidatorCommission implements Msg {
  constructor(public params: MsgWithdrawValidatorCommissionParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
      value: this.params,
      encode: async () =>
        (
          await import("../protobuf/cosmos/distribution/v1beta1/tx")
        ).MsgWithdrawValidatorCommission.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgWithdrawValidatorCommission",
      value: this.params,
    };
  }
}

export interface MsgFundCommunityPoolParams extends MsgParams {
  amount: Coin[];
  depositor: string;
}

/**
 * MsgFundCommunityPool allows an account to directly
 * fund the community pool.
 */
export class MsgFundCommunityPool implements Msg {
  constructor(public params: MsgFundCommunityPoolParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
      value: this.params,
      encode: async () =>
        (
          await import("../protobuf/cosmos/distribution/v1beta1/tx")
        ).MsgFundCommunityPool.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgFundCommunityPool",
      value: this.params,
    };
  }
}

export interface MsgSetAutoRestakeParams extends MsgParams {
  delegator_address: string;
  validator_address: string;
  enabled: boolean;
}

/**
 * MsgSetAutoRestake enables or disables auto-restaking for
 * a delegator-validator pair.
 */
export class MsgSetAutoRestake implements Msg {
  constructor(public params: MsgSetAutoRestakeParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgSetAutoRestake",
      value: this.params,
      encode: async () =>
        (
          await import("../protobuf/cosmos/distribution/v1beta1/tx")
        ).MsgSetAutoRestake.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgSetAutoRestake",
      value: Object.assign({}, this.params, {
        enabled: this.params.enabled ? true : undefined,
      }),
    };
  }
}
