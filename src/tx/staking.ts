import { fromBase64 } from "@cosmjs/encoding";
import { bech32 } from "bech32";
import BigNumber from "bignumber.js";
import { Coin } from ".";
import { PubKey } from "../protobuf_stuff/cosmos/crypto/ed25519/keys";
import { Description } from "../protobuf_stuff/cosmos/staking/v1beta1/staking";
import {
  MsgBeginRedelegate as MsgBeginRedelegateProto,
  MsgCreateValidator as MsgCreateValidatorProto,
  MsgDelegate as MsgDelegateProto,
  MsgEditValidator as MsgEditValidatorProto,
  MsgUndelegate as MsgUndelegateProto,
  protobufPackage,
} from "../protobuf_stuff/cosmos/staking/v1beta1/tx";
import { Any } from "../protobuf_stuff/google/protobuf/any";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export { Description };

/**
 * CommissionRates defines the initial commission rates to be used for creating
 * a validator.
 */
export type CommissionRates = {
  /** rate is the commission rate charged to delegators, as a fraction. */
  rate: number;
  /** max_rate defines the maximum commission rate which validator can ever charge, as a fraction. */
  maxRate: number;
  /** max_change_rate defines the maximum daily increase of the validator commission, as a fraction. */
  maxChangeRate: number;
};

export type MsgCreateValidatorParams = {
  description: Description;
  commission: CommissionRates;
  /** minSelfDelegation is the minimum uscrt amount that
   * the self delegator must delegate to its validator. */
  minSelfDelegation: string;
  /** selfDelegatorAddress is the self-delegator, which is the owner of the validator */
  selfDelegatorAddress: string;
  /** pubkey is a base64 string representation of the validator's ed25519 pubkey (32 bytes).*/
  pubkey: string;
  /** value is the initial delegation from the self-delegator to its validator */
  value: Coin;
};

export class MsgCreateValidator implements Msg {
  public description: Description;
  public commission: CommissionRates;
  public minSelfDelegation: string;
  public delegatorAddress: string;
  public validatorAddress: string;
  public pubkey: string;
  public value: Coin;

  constructor({
    description,
    commission,
    minSelfDelegation,
    selfDelegatorAddress,
    pubkey,
    value,
  }: MsgCreateValidatorParams) {
    this.description = description;
    this.commission = commission;
    this.minSelfDelegation = minSelfDelegation;
    this.delegatorAddress = selfDelegatorAddress;
    this.validatorAddress = bech32.encode(
      "secretvaloper",
      bech32.decode(selfDelegatorAddress).words,
    );
    this.pubkey = pubkey;
    this.value = value;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent: MsgCreateValidatorProto = {
      description: this.description,
      commission: {
        rate: new BigNumber(this.commission.rate)
          .toFixed(18)
          .replace(/0\.0*/, ""),
        maxRate: new BigNumber(this.commission.maxRate)
          .toFixed(18)
          .replace(/0\.0*/, ""),
        maxChangeRate: new BigNumber(this.commission.maxChangeRate)
          .toFixed(18)
          .replace(/0\.0*/, ""),
      },
      minSelfDelegation: this.minSelfDelegation,
      delegatorAddress: this.delegatorAddress,
      validatorAddress: this.validatorAddress,
      pubkey: Any.fromPartial({
        typeUrl: "/cosmos.crypto.ed25519.PubKey",
        value: PubKey.encode(
          PubKey.fromPartial({
            key: fromBase64(this.pubkey),
          }),
        ).finish(),
      }),
      value: this.value,
    };

    return {
      typeUrl: `/${protobufPackage}.MsgCreateValidator`,
      value: msgContent,
      encode: function (): Uint8Array {
        return MsgCreateValidatorProto.encode(msgContent).finish();
      },
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgCreateValidator",
      value: {
        description: {
          moniker: this.description.moniker,
          identity: this.description.identity,
          website: this.description.website,
          security_contact: this.description.securityContact,
          details: this.description.details,
        },
        commission: {
          rate: new BigNumber(this.commission.rate).toFixed(18),
          max_rate: new BigNumber(this.commission.maxRate).toFixed(18),
          max_change_rate: new BigNumber(this.commission.maxChangeRate).toFixed(
            18,
          ),
        },
        min_self_delegation: this.minSelfDelegation,
        delegator_address: this.delegatorAddress,
        validator_address: this.validatorAddress,
        pubkey: {
          type: "tendermint/PubKeyEd25519",
          value: this.pubkey,
        },
        value: this.value,
      },
    };
  }
}

export type MsgEditValidatorParams = {
  validatorAddress: string;
  /** if description is provided it updates all values */
  description?: Description;
  commissionRate?: number;
  minSelfDelegation?: string;
};

export class MsgEditValidator implements Msg {
  public validatorAddress: string;
  public description?: Description;
  public commissionRate?: number;
  public minSelfDelegation?: string;

  constructor({
    description,
    validatorAddress,
    commissionRate,
    minSelfDelegation,
  }: MsgEditValidatorParams) {
    this.validatorAddress = validatorAddress;
    this.description = description;
    this.commissionRate = commissionRate;
    this.minSelfDelegation = minSelfDelegation;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent: MsgEditValidatorProto = {
      validatorAddress: this.validatorAddress,
      description: Description.fromPartial(this.description || {}),
      commissionRate: this.commissionRate
        ? new BigNumber(this.commissionRate).toFixed(18).replace(/0\.0*/, "")
        : "",
      minSelfDelegation: this.minSelfDelegation || "",
    };

    return {
      typeUrl: `/${protobufPackage}.MsgEditValidator`,
      value: msgContent,
      encode: function (): Uint8Array {
        return MsgEditValidatorProto.encode(msgContent).finish();
      },
    };
  }

  async toAmino(): Promise<AminoMsg> {
    let description;
    if (this.description) {
      description = {
        moniker: this.description.moniker,
        identity: this.description.identity,
        website: this.description.website,
        security_contact: this.description.securityContact,
        details: this.description.details,
      };
    }

    let commission_rate;
    if (this.commissionRate) {
      commission_rate = new BigNumber(this.commissionRate).toFixed(18);
    }

    return {
      type: "cosmos-sdk/MsgEditValidator",
      value: {
        validator_address: this.validatorAddress,
        description,
        commission_rate,
        min_self_delegation: this.minSelfDelegation,
      },
    };
  }
}

export type MsgDelegateParams = {
  delegatorAddress: string;
  validatorAddress: string;
  amount: Coin;
};

export class MsgDelegate implements Msg {
  public delegatorAddress: string;
  public validatorAddress: string;
  public amount: Coin;

  constructor({
    delegatorAddress,
    validatorAddress,
    amount,
  }: MsgDelegateParams) {
    this.delegatorAddress = delegatorAddress;
    this.validatorAddress = validatorAddress;
    this.amount = amount;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      delegatorAddress: this.delegatorAddress,
      validatorAddress: this.validatorAddress,
      amount: this.amount,
    };

    return {
      typeUrl: `/${protobufPackage}.MsgDelegate`,
      value: msgContent,
      encode: function (): Uint8Array {
        return MsgDelegateProto.encode(msgContent).finish();
      },
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgDelegate",
      value: {
        delegator_address: this.delegatorAddress,
        validator_address: this.validatorAddress,
        amount: this.amount,
      },
    };
  }
}

export class MsgBeginRedelegate implements Msg {
  constructor(msg: MsgBeginRedelegateProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgBeginRedelegate not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgBeginRedelegate not implemented.");
  }
}

export interface MsgUndelegateParams {
  delegatorAddress: string;
  validatorAddress: string;
  amount: Coin;
}

export class MsgUndelegate implements Msg {
  public delegatorAddress: string;
  public validatorAddress: string;
  public amount: Coin;

  constructor({
    delegatorAddress,
    validatorAddress,
    amount,
  }: MsgUndelegateParams) {
    this.delegatorAddress = delegatorAddress;
    this.validatorAddress = validatorAddress;
    this.amount = amount;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      delegatorAddress: this.delegatorAddress,
      validatorAddress: this.validatorAddress,
      amount: this.amount,
    };

    return {
      typeUrl: `/${protobufPackage}.MsgUndelegate`,
      value: msgContent,
      encode: function (): Uint8Array {
        return MsgUndelegateProto.encode(msgContent).finish();
      },
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgUndelegate",
      value: {
        delegator_address: this.delegatorAddress,
        validator_address: this.validatorAddress,
        amount: this.amount,
      },
    };
  }
}
