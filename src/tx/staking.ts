import { Coin } from ".";
import {
  MsgBeginRedelegate as MsgBeginRedelegateProto,
  MsgCreateValidator as MsgCreateValidatorProto,
  MsgDelegate as MsgDelegateProto,
  MsgEditValidator as MsgEditValidatorProto,
  MsgUndelegate as MsgUndelegateProto,
  protobufPackage,
} from "../protobuf_stuff/cosmos/staking/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgCreateValidator implements Msg {
  constructor(msg: MsgCreateValidatorProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgEditValidator implements Msg {
  constructor(msg: MsgEditValidatorProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
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
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
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
