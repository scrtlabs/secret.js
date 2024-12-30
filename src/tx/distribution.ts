import { AminoMsg, Msg, ProtoMsg } from "./types";
import { fromBech32, toBech32 } from "@cosmjs/encoding";

import {
  MsgSetWithdrawAddress as MsgSetWithdrawAddressParams,
  MsgWithdrawDelegatorReward as MsgWithdrawDelegatorRewardParams,
  MsgWithdrawValidatorCommission as MsgWithdrawValidatorCommissionParams,
  MsgFundCommunityPool as MsgFundCommunityPoolParams,
  MsgSetAutoRestake as MsgSetAutoRestakeParams,
  MsgCommunityPoolSpend as MsgCommunityPoolSpendParams,
  MsgDepositValidatorRewardsPool as MsgDepositValidatorRewardsPoolParams,
} from "../protobuf/cosmos/distribution/v1beta1/tx";

export {
  MsgSetWithdrawAddress as MsgSetWithdrawAddressParams,
  MsgWithdrawDelegatorReward as MsgWithdrawDelegatorRewardParams,
  MsgWithdrawValidatorCommission as MsgWithdrawValidatorCommissionParams,
  MsgFundCommunityPool as MsgFundCommunityPoolParams,
  MsgSetAutoRestake as MsgSetAutoRestakeParams,
  MsgCommunityPoolSpend as MsgCommunityPoolSpendParams,
  MsgDepositValidatorRewardsPool as MsgDepositValidatorRewardsPoolParams,
} from "../protobuf/cosmos/distribution/v1beta1/tx";

/**
 * MsgSetWithdrawAddress implements a message to change the withdraw address
 * for receiving rewards.
 * 
 * @param params - Parameters containing delegator_address and withdraw_address
 */
export class MsgSetWithdrawAddress implements Msg {
  constructor(public params: MsgSetWithdrawAddressParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
      value: this.params,
      encode: () => MsgSetWithdrawAddressParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgModifyWithdrawAddress",
      value: this.params,
    };
  }
}

/**
 * MsgWithdrawDelegatorReward implements a message to withdraw rewards
 * from a specific validator.
 * 
 * @param params - Parameters containing delegator_address and validator_address
 */
export class MsgWithdrawDelegatorReward implements Msg {
  constructor(public params: MsgWithdrawDelegatorRewardParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      value: this.params,
      encode: () =>
        MsgWithdrawDelegatorRewardParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgWithdrawDelegationReward",
      value: this.params,
    };
  }
}

/**
 * MsgWithdrawValidatorCommission implements a message to withdraw
 * the accumulated commission for a validator.
 * 
 * @param params - Parameters containing validator_address
 */
export class MsgWithdrawValidatorCommission implements Msg {
  constructor(public params: MsgWithdrawValidatorCommissionParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
      value: this.params,
      encode: () =>
        MsgWithdrawValidatorCommissionParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgWithdrawValidatorCommission",
      value: this.params,
    };
  }
}

/**
 * MsgFundCommunityPool implements a message that allows direct funding
 * of the community pool from any account.
 * 
 * @param params - Parameters containing amount and depositor
 */
export class MsgFundCommunityPool implements Msg {
  constructor(public params: MsgFundCommunityPoolParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
      value: this.params,
      encode: () => MsgFundCommunityPoolParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgFundCommunityPool",
      value: this.params,
    };
  }
}

/**
 * MsgSetAutoRestake implements a message to configure automatic
 * restaking of rewards for a delegator-validator pair.
 * 
 * @param params - Parameters containing delegator_address, validator_address and enabled flag
 */
export class MsgSetAutoRestake implements Msg {
  constructor(public params: MsgSetAutoRestakeParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgSetAutoRestake",
      value: this.params,
      encode: () => MsgSetAutoRestakeParams.encode(this.params).finish(),
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

/**
 * MsgCommunityPoolSpend implements a message for spending from
 * the community pool (requires governance approval).
 * 
 * @param params - Parameters containing authority, recipient and amount
 */
export class MsgCommunityPoolSpend implements Msg {
  constructor(public params: MsgCommunityPoolSpendParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgCommunityPoolSpend",
      value: this.params,
      encode: () => MsgCommunityPoolSpendParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgCommunityPoolSpend",
      value: this.params,
    };
  }
}

/**
 * MsgDepositValidatorRewardsPool implements a message for depositing
 * tokens into a validator's reward pool.
 * 
 * @param params - Parameters containing validator_address and amount
 * @note This message handles Bech32 address conversion for validator addresses
 */
export class MsgDepositValidatorRewardsPool implements Msg {
  constructor(public params: MsgDepositValidatorRewardsPoolParams) {}

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      ...this.params,
      validator_address: toBech32(
        "secretvaloper",
        fromBech32(this.params.validator_address).data,
      ),
    };
    return {
      type_url: "/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool",
      value: msgContent,
      encode: () =>
        MsgDepositValidatorRewardsPoolParams.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgDepositValidatorRewardsPool",
      value: this.params,
    };
  }
}
