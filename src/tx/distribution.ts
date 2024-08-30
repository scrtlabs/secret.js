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
 * MsgSetWithdrawAddress sets the withdraw address for
 * a delegator (or validator self-delegation).
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
      type: "cosmos-sdk/MsgModifyWithdrawAddress", // wtf
      value: this.params,
    };
  }
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
      encode: () =>
        MsgWithdrawDelegatorRewardParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgWithdrawDelegationReward", // wtf
      value: this.params,
    };
  }
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
 * MsgFundCommunityPool allows an account to directly
 * fund the community pool.
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
 * MsgSetAutoRestake enables or disables auto-restaking for
 * a delegator-validator pair.
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
