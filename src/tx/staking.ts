import { fromBase64, fromBech32, toBech32 } from "@cosmjs/encoding";
import BigNumber from "bignumber.js";
import { Coin } from "../protobuf/cosmos/base/v1beta1/coin";
import { PubKey } from "../protobuf/cosmos/crypto/ed25519/keys";
import { Any } from "../protobuf/google/protobuf/any";
import { AminoMsg, Msg, ProtoMsg, MsgParams } from "./types";
import { Description as ValidatorDescription } from "../protobuf/cosmos/staking/v1beta1/staking";
import {
  MsgDelegate as MsgDelegateParams,
  MsgCreateValidator as MsgCreateValidatorProto,
  MsgEditValidator as MsgEditValidatorProto,
  MsgBeginRedelegate as MsgBeginRedelegateParams,
  MsgUndelegate as MsgUndelegateParams,
  MsgCancelUnbondingDelegation as MsgCancelUnbondingDelegationParams,
} from "../protobuf/cosmos/staking/v1beta1/tx";

export { Description as ValidatorDescription } from "../protobuf/cosmos/staking/v1beta1/staking";
export {
  MsgDelegate as MsgDelegateParams,
  MsgBeginRedelegate as MsgBeginRedelegateParams,
  MsgUndelegate as MsgUndelegateParams,
  MsgCancelUnbondingDelegation as MsgCancelUnbondingDelegationParams,
} from "../protobuf/cosmos/staking/v1beta1/tx";

/**
 * CommissionRates defines the initial commission rates to be used for creating
 * a validator.
 */
export type CommissionRates = {
  /** rate is the commission rate charged to delegators, as a fraction. */
  rate: number;
  /** max_rate defines the maximum commission rate which validator can ever charge, as a fraction. */
  max_rate: number;
  /** max_change_rate defines the maximum daily increase of the validator commission, as a fraction. */
  max_change_rate: number;
};

export interface MsgCreateValidatorParams extends MsgParams {
  description: ValidatorDescription;
  commission: CommissionRates;
  /** minSelfDelegation is the minimum uscrt amount that
   * the self delegator must delegate to its validator. */
  min_self_delegation: string;
  /** selfDelegatorAddress is the self-delegator, which is the owner of the validator */
  delegator_address: string;
  /** pubkey is a base64 string representation of the validator's ed25519 pubkey (32 bytes).*/
  pubkey: string;
  /** initial delegation from the self-delegator to its validator */
  initial_delegation: Coin;
}

/** MsgCreateValidator defines an SDK message for creating a new validator. */
export class MsgCreateValidator implements Msg {
  constructor(public params: MsgCreateValidatorParams) {}

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      description: this.params.description,
      commission: {
        rate: new BigNumber(this.params.commission.rate)
          .toFixed(18)
          .replace(/0\.0*/, ""),
        max_rate: new BigNumber(this.params.commission.max_rate)
          .toFixed(18)
          .replace(/0\.0*/, ""),
        max_change_rate: new BigNumber(this.params.commission.max_change_rate)
          .toFixed(18)
          .replace(/0\.0*/, ""),
      },
      min_self_delegation: this.params.min_self_delegation,
      delegator_address: this.params.delegator_address,
      validator_address: toBech32(
        "secretvaloper",
        fromBech32(this.params.delegator_address).data,
      ),
      pubkey: Any.fromPartial({
        type_url: "/cosmos.crypto.ed25519.PubKey",
        value: PubKey.encode(
          PubKey.fromPartial({
            key: fromBase64(this.params.pubkey),
          }),
        ).finish(),
      }),
      value: this.params.initial_delegation,
    };

    return {
      type_url: `/cosmos.staking.v1beta1.MsgCreateValidator`,
      value: msgContent,
      encode: () => MsgCreateValidatorProto.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgCreateValidator",
      value: {
        description: {
          moniker: this.params.description.moniker,
          identity: this.params.description.identity,
          website: this.params.description.website,
          security_contact: this.params.description.security_contact,
          details: this.params.description.details,
        },
        commission: {
          rate: new BigNumber(this.params.commission.rate)
            .toFixed(18)
            .replace(/0\.0*/, ""),
          max_rate: new BigNumber(this.params.commission.max_rate)
            .toFixed(18)
            .replace(/0\.0*/, ""),
          max_change_rate: new BigNumber(this.params.commission.max_change_rate)
            .toFixed(18)
            .replace(/0\.0*/, ""),
        },
        min_self_delegation: this.params.min_self_delegation,
        delegator_address: this.params.delegator_address,
        validator_address: toBech32(
          "secretvaloper",
          fromBech32(this.params.delegator_address).data,
        ),
        pubkey: {
          type: "tendermint/PubKeyEd25519",
          value: this.params.pubkey,
        },
        value: this.params.initial_delegation,
      },
    };
  }
}

export interface MsgEditValidatorParams extends MsgParams {
  validator_address: string;
  /** if description is provided it updates all values */
  description?: ValidatorDescription;
  commission_rate?: number;
  min_self_delegation?: string;
}

/** MsgEditValidator defines an SDK message for editing an existing validator. */
export class MsgEditValidator implements Msg {
  constructor(public params: MsgEditValidatorParams) {}

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      validator_address: this.params.validator_address,
      description: ValidatorDescription.fromPartial(
        this.params.description || {},
      ),
      commission_rate: this.params.commission_rate
        ? new BigNumber(this.params.commission_rate)
            .toFixed(18)
            .replace(/0\.0*/, "")
        : "",
      min_self_delegation: this.params.min_self_delegation || "",
    };

    return {
      type_url: `/cosmos.staking.v1beta1.MsgEditValidator`,
      value: msgContent,
      encode: () => MsgEditValidatorProto.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    let description;
    if (this.params.description) {
      description = {
        moniker: this.params.description.moniker,
        identity: this.params.description.identity,
        website: this.params.description.website,
        security_contact: this.params.description.security_contact,
        details: this.params.description.details,
      };
    }

    let commission_rate;
    if (this.params.commission_rate) {
      commission_rate = new BigNumber(this.params.commission_rate).toFixed(18);
    }

    return {
      type: "cosmos-sdk/MsgEditValidator",
      value: {
        validator_address: this.params.validator_address,
        description,
        commission_rate,
        min_self_delegation: this.params.min_self_delegation,
      },
    };
  }
}

/** MsgDelegate defines an SDK message for performing a delegation of coins from a delegator to a validator. */
export class MsgDelegate implements Msg {
  constructor(public params: MsgDelegateParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/cosmos.staking.v1beta1.MsgDelegate`,
      value: this.params,
      encode: () => MsgDelegateParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgDelegate",
      value: this.params,
    };
  }
}

/** MsgBeginRedelegate defines an SDK message for performing a redelegation of coins from a delegator and source validator to a destination validator. */
export class MsgBeginRedelegate implements Msg {
  constructor(public params: MsgBeginRedelegateParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/cosmos.staking.v1beta1.MsgBeginRedelegate`,
      value: this.params,
      encode: () => MsgBeginRedelegateParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgBeginRedelegate",
      value: this.params,
    };
  }
}

/** MsgUndelegate defines an SDK message for performing an undelegation from a delegate and a validator */
export class MsgUndelegate implements Msg {
  constructor(public params: MsgUndelegateParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/cosmos.staking.v1beta1.MsgUndelegate`,
      value: this.params,
      encode: () => MsgUndelegateParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgUndelegate",
      value: this.params,
    };
  }
}

export class MsgCancelUnbondingDelegation implements Msg {
  constructor(public params: MsgCancelUnbondingDelegationParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation`,
      value: this.params,
      encode: () =>
        MsgCancelUnbondingDelegationParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgCancelUnbondingDelegation",
      value: this.params,
    };
  }
}
