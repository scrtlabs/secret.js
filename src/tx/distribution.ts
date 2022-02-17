import { Coin, MsgParams } from ".";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export interface MsgSetWithdrawAddressParams extends MsgParams {
  delegatorAddress: string;
  withdrawAddress: string;
}

/**
 * MsgSetWithdrawAddress sets the withdraw address for
 * a delegator (or validator self-delegation).
 */
export class MsgSetWithdrawAddress implements Msg {
  public delegatorAddress: string;
  public withdrawAddress: string;

  constructor({
    delegatorAddress,
    withdrawAddress,
  }: MsgSetWithdrawAddressParams) {
    this.delegatorAddress = delegatorAddress;
    this.withdrawAddress = withdrawAddress;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      delegatorAddress: this.delegatorAddress,
      withdrawAddress: this.withdrawAddress,
    };

    return {
      typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/distribution/v1beta1/tx")
        ).MsgSetWithdrawAddress.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgModifyWithdrawAddress", // wtf
      value: {
        delegator_address: this.delegatorAddress,
        withdraw_address: this.withdrawAddress,
      },
    };
  }
}

// proto and amino names are different, so export both names
export { MsgSetWithdrawAddress as MsgModifyWithdrawAddress };
// proto and amino names are different, so export both names
export { MsgWithdrawDelegatorReward as MsgWithdrawDelegationReward };

export interface MsgWithdrawDelegatorRewardParams extends MsgParams {
  delegatorAddress: string;
  validatorAddress: string;
}

/**
 * MsgWithdrawDelegatorReward represents delegation withdrawal to a delegator
 * from a single validator.
 */
export class MsgWithdrawDelegatorReward implements Msg {
  public delegatorAddress: string;
  public validatorAddress: string;

  constructor({
    delegatorAddress,
    validatorAddress,
  }: MsgWithdrawDelegatorRewardParams) {
    this.delegatorAddress = delegatorAddress;
    this.validatorAddress = validatorAddress;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      delegatorAddress: this.delegatorAddress,
      validatorAddress: this.validatorAddress,
    };

    return {
      typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/distribution/v1beta1/tx")
        ).MsgWithdrawDelegatorReward.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgWithdrawDelegationReward", // wtf
      value: {
        delegator_address: this.delegatorAddress,
        validator_address: this.validatorAddress,
      },
    };
  }
}

export interface MsgWithdrawValidatorCommissionParams extends MsgParams {
  validatorAddress: string;
}

/**
 * MsgWithdrawValidatorCommission withdraws the full commission to the validator
 * address.
 */
export class MsgWithdrawValidatorCommission implements Msg {
  public validatorAddress: string;

  constructor({ validatorAddress }: MsgWithdrawValidatorCommissionParams) {
    this.validatorAddress = validatorAddress;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      validatorAddress: this.validatorAddress,
    };

    return {
      typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/distribution/v1beta1/tx")
        ).MsgWithdrawValidatorCommission.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgWithdrawValidatorCommission",
      value: {
        validator_address: this.validatorAddress,
      },
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
  public depositor: string;
  public amount: Coin[];

  constructor({ depositor, amount }: MsgFundCommunityPoolParams) {
    this.depositor = depositor;
    this.amount = amount;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      depositor: this.depositor,
      amount: this.amount,
    };

    return {
      typeUrl: "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/distribution/v1beta1/tx")
        ).MsgFundCommunityPool.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgFundCommunityPool",
      value: {
        depositor: this.depositor,
        amount: this.amount,
      },
    };
  }
}
