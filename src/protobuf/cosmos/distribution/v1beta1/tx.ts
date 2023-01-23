/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.distribution.v1beta1";

/**
 * MsgSetWithdrawAddress sets the withdraw address for
 * a delegator (or validator self-delegation).
 */
export interface MsgSetWithdrawAddress {
  delegator_address: string;
  withdraw_address: string;
}

/**
 * MsgEnableAutoRestake enables auto-restaking for a
 * a delegator-validator pair.
 */
export interface MsgSetAutoRestake {
  delegator_address: string;
  validator_address: string;
  enabled: boolean;
}

/** MsgAutoRestakeResponse defines the Msg/AutoRestakeResponse response type. */
export interface MsgSetAutoRestakeResponse {}

/** MsgSetWithdrawAddressResponse defines the Msg/SetWithdrawAddress response type. */
export interface MsgSetWithdrawAddressResponse {}

/**
 * MsgWithdrawDelegatorReward represents delegation withdrawal to a delegator
 * from a single validator.
 */
export interface MsgWithdrawDelegatorReward {
  delegator_address: string;
  validator_address: string;
}

/** MsgWithdrawDelegatorRewardResponse defines the Msg/WithdrawDelegatorReward response type. */
export interface MsgWithdrawDelegatorRewardResponse {}

/**
 * MsgWithdrawValidatorCommission withdraws the full commission to the validator
 * address.
 */
export interface MsgWithdrawValidatorCommission {
  validator_address: string;
}

/** MsgWithdrawValidatorCommissionResponse defines the Msg/WithdrawValidatorCommission response type. */
export interface MsgWithdrawValidatorCommissionResponse {}

/**
 * MsgFundCommunityPool allows an account to directly
 * fund the community pool.
 */
export interface MsgFundCommunityPool {
  amount: Coin[];
  depositor: string;
}

/** MsgFundCommunityPoolResponse defines the Msg/FundCommunityPool response type. */
export interface MsgFundCommunityPoolResponse {}

function createBaseMsgSetWithdrawAddress(): MsgSetWithdrawAddress {
  return { delegator_address: "", withdraw_address: "" };
}

export const MsgSetWithdrawAddress = {
  encode(
    message: MsgSetWithdrawAddress,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.withdraw_address !== "") {
      writer.uint32(18).string(message.withdraw_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgSetWithdrawAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetWithdrawAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.withdraw_address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetWithdrawAddress {
    return {
      delegator_address: isSet(object.delegator_address)
        ? String(object.delegator_address)
        : "",
      withdraw_address: isSet(object.withdraw_address)
        ? String(object.withdraw_address)
        : "",
    };
  },

  toJSON(message: MsgSetWithdrawAddress): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.withdraw_address !== undefined &&
      (obj.withdraw_address = message.withdraw_address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetWithdrawAddress>, I>>(
    object: I,
  ): MsgSetWithdrawAddress {
    const message = createBaseMsgSetWithdrawAddress();
    message.delegator_address = object.delegator_address ?? "";
    message.withdraw_address = object.withdraw_address ?? "";
    return message;
  },
};

function createBaseMsgSetAutoRestake(): MsgSetAutoRestake {
  return { delegator_address: "", validator_address: "", enabled: false };
}

export const MsgSetAutoRestake = {
  encode(
    message: MsgSetAutoRestake,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.validator_address !== "") {
      writer.uint32(18).string(message.validator_address);
    }
    if (message.enabled === true) {
      writer.uint32(24).bool(message.enabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetAutoRestake {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetAutoRestake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.validator_address = reader.string();
          break;
        case 3:
          message.enabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetAutoRestake {
    return {
      delegator_address: isSet(object.delegator_address)
        ? String(object.delegator_address)
        : "",
      validator_address: isSet(object.validator_address)
        ? String(object.validator_address)
        : "",
      enabled: isSet(object.enabled) ? Boolean(object.enabled) : false,
    };
  },

  toJSON(message: MsgSetAutoRestake): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    message.enabled !== undefined && (obj.enabled = message.enabled);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetAutoRestake>, I>>(
    object: I,
  ): MsgSetAutoRestake {
    const message = createBaseMsgSetAutoRestake();
    message.delegator_address = object.delegator_address ?? "";
    message.validator_address = object.validator_address ?? "";
    message.enabled = object.enabled ?? false;
    return message;
  },
};

function createBaseMsgSetAutoRestakeResponse(): MsgSetAutoRestakeResponse {
  return {};
}

export const MsgSetAutoRestakeResponse = {
  encode(
    _: MsgSetAutoRestakeResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgSetAutoRestakeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetAutoRestakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSetAutoRestakeResponse {
    return {};
  },

  toJSON(_: MsgSetAutoRestakeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetAutoRestakeResponse>, I>>(
    _: I,
  ): MsgSetAutoRestakeResponse {
    const message = createBaseMsgSetAutoRestakeResponse();
    return message;
  },
};

function createBaseMsgSetWithdrawAddressResponse(): MsgSetWithdrawAddressResponse {
  return {};
}

export const MsgSetWithdrawAddressResponse = {
  encode(
    _: MsgSetWithdrawAddressResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgSetWithdrawAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetWithdrawAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSetWithdrawAddressResponse {
    return {};
  },

  toJSON(_: MsgSetWithdrawAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetWithdrawAddressResponse>, I>>(
    _: I,
  ): MsgSetWithdrawAddressResponse {
    const message = createBaseMsgSetWithdrawAddressResponse();
    return message;
  },
};

function createBaseMsgWithdrawDelegatorReward(): MsgWithdrawDelegatorReward {
  return { delegator_address: "", validator_address: "" };
}

export const MsgWithdrawDelegatorReward = {
  encode(
    message: MsgWithdrawDelegatorReward,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.validator_address !== "") {
      writer.uint32(18).string(message.validator_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgWithdrawDelegatorReward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawDelegatorReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.validator_address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawDelegatorReward {
    return {
      delegator_address: isSet(object.delegator_address)
        ? String(object.delegator_address)
        : "",
      validator_address: isSet(object.validator_address)
        ? String(object.validator_address)
        : "",
    };
  },

  toJSON(message: MsgWithdrawDelegatorReward): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdrawDelegatorReward>, I>>(
    object: I,
  ): MsgWithdrawDelegatorReward {
    const message = createBaseMsgWithdrawDelegatorReward();
    message.delegator_address = object.delegator_address ?? "";
    message.validator_address = object.validator_address ?? "";
    return message;
  },
};

function createBaseMsgWithdrawDelegatorRewardResponse(): MsgWithdrawDelegatorRewardResponse {
  return {};
}

export const MsgWithdrawDelegatorRewardResponse = {
  encode(
    _: MsgWithdrawDelegatorRewardResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgWithdrawDelegatorRewardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawDelegatorRewardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgWithdrawDelegatorRewardResponse {
    return {};
  },

  toJSON(_: MsgWithdrawDelegatorRewardResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgWithdrawDelegatorRewardResponse>, I>,
  >(_: I): MsgWithdrawDelegatorRewardResponse {
    const message = createBaseMsgWithdrawDelegatorRewardResponse();
    return message;
  },
};

function createBaseMsgWithdrawValidatorCommission(): MsgWithdrawValidatorCommission {
  return { validator_address: "" };
}

export const MsgWithdrawValidatorCommission = {
  encode(
    message: MsgWithdrawValidatorCommission,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.validator_address !== "") {
      writer.uint32(10).string(message.validator_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgWithdrawValidatorCommission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawValidatorCommission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator_address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawValidatorCommission {
    return {
      validator_address: isSet(object.validator_address)
        ? String(object.validator_address)
        : "",
    };
  },

  toJSON(message: MsgWithdrawValidatorCommission): unknown {
    const obj: any = {};
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdrawValidatorCommission>, I>>(
    object: I,
  ): MsgWithdrawValidatorCommission {
    const message = createBaseMsgWithdrawValidatorCommission();
    message.validator_address = object.validator_address ?? "";
    return message;
  },
};

function createBaseMsgWithdrawValidatorCommissionResponse(): MsgWithdrawValidatorCommissionResponse {
  return {};
}

export const MsgWithdrawValidatorCommissionResponse = {
  encode(
    _: MsgWithdrawValidatorCommissionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgWithdrawValidatorCommissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawValidatorCommissionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgWithdrawValidatorCommissionResponse {
    return {};
  },

  toJSON(_: MsgWithdrawValidatorCommissionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgWithdrawValidatorCommissionResponse>, I>,
  >(_: I): MsgWithdrawValidatorCommissionResponse {
    const message = createBaseMsgWithdrawValidatorCommissionResponse();
    return message;
  },
};

function createBaseMsgFundCommunityPool(): MsgFundCommunityPool {
  return { amount: [], depositor: "" };
}

export const MsgFundCommunityPool = {
  encode(
    message: MsgFundCommunityPool,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.depositor !== "") {
      writer.uint32(18).string(message.depositor);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgFundCommunityPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundCommunityPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.depositor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgFundCommunityPool {
    return {
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
      depositor: isSet(object.depositor) ? String(object.depositor) : "",
    };
  },

  toJSON(message: MsgFundCommunityPool): unknown {
    const obj: any = {};
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    message.depositor !== undefined && (obj.depositor = message.depositor);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFundCommunityPool>, I>>(
    object: I,
  ): MsgFundCommunityPool {
    const message = createBaseMsgFundCommunityPool();
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.depositor = object.depositor ?? "";
    return message;
  },
};

function createBaseMsgFundCommunityPoolResponse(): MsgFundCommunityPoolResponse {
  return {};
}

export const MsgFundCommunityPoolResponse = {
  encode(
    _: MsgFundCommunityPoolResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgFundCommunityPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundCommunityPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgFundCommunityPoolResponse {
    return {};
  },

  toJSON(_: MsgFundCommunityPoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFundCommunityPoolResponse>, I>>(
    _: I,
  ): MsgFundCommunityPoolResponse {
    const message = createBaseMsgFundCommunityPoolResponse();
    return message;
  },
};

/** Msg defines the distribution Msg service. */
export interface Msg {
  /**
   * SetWithdrawAddress defines a method to change the withdraw address
   * for a delegator (or validator self-delegation).
   */
  SetWithdrawAddress(
    request: MsgSetWithdrawAddress,
  ): Promise<MsgSetWithdrawAddressResponse>;
  /**
   * WithdrawDelegatorReward defines a method to withdraw rewards of delegator
   * from a single validator.
   */
  WithdrawDelegatorReward(
    request: MsgWithdrawDelegatorReward,
  ): Promise<MsgWithdrawDelegatorRewardResponse>;
  /**
   * WithdrawValidatorCommission defines a method to withdraw the
   * full commission to the validator address.
   */
  WithdrawValidatorCommission(
    request: MsgWithdrawValidatorCommission,
  ): Promise<MsgWithdrawValidatorCommissionResponse>;
  /**
   * FundCommunityPool defines a method to allow an account to directly
   * fund the community pool.
   */
  FundCommunityPool(
    request: MsgFundCommunityPool,
  ): Promise<MsgFundCommunityPoolResponse>;
  /**
   * SetAutoRestake enables or disables automatic restaking for a delegator
   * validator pair
   */
  SetAutoRestake(
    request: MsgSetAutoRestake,
  ): Promise<MsgSetAutoRestakeResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SetWithdrawAddress = this.SetWithdrawAddress.bind(this);
    this.WithdrawDelegatorReward = this.WithdrawDelegatorReward.bind(this);
    this.WithdrawValidatorCommission =
      this.WithdrawValidatorCommission.bind(this);
    this.FundCommunityPool = this.FundCommunityPool.bind(this);
    this.SetAutoRestake = this.SetAutoRestake.bind(this);
  }
  SetWithdrawAddress(
    request: MsgSetWithdrawAddress,
  ): Promise<MsgSetWithdrawAddressResponse> {
    const data = MsgSetWithdrawAddress.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.distribution.v1beta1.Msg",
      "SetWithdrawAddress",
      data,
    );
    return promise.then((data) =>
      MsgSetWithdrawAddressResponse.decode(new _m0.Reader(data)),
    );
  }

  WithdrawDelegatorReward(
    request: MsgWithdrawDelegatorReward,
  ): Promise<MsgWithdrawDelegatorRewardResponse> {
    const data = MsgWithdrawDelegatorReward.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.distribution.v1beta1.Msg",
      "WithdrawDelegatorReward",
      data,
    );
    return promise.then((data) =>
      MsgWithdrawDelegatorRewardResponse.decode(new _m0.Reader(data)),
    );
  }

  WithdrawValidatorCommission(
    request: MsgWithdrawValidatorCommission,
  ): Promise<MsgWithdrawValidatorCommissionResponse> {
    const data = MsgWithdrawValidatorCommission.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.distribution.v1beta1.Msg",
      "WithdrawValidatorCommission",
      data,
    );
    return promise.then((data) =>
      MsgWithdrawValidatorCommissionResponse.decode(new _m0.Reader(data)),
    );
  }

  FundCommunityPool(
    request: MsgFundCommunityPool,
  ): Promise<MsgFundCommunityPoolResponse> {
    const data = MsgFundCommunityPool.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.distribution.v1beta1.Msg",
      "FundCommunityPool",
      data,
    );
    return promise.then((data) =>
      MsgFundCommunityPoolResponse.decode(new _m0.Reader(data)),
    );
  }

  SetAutoRestake(
    request: MsgSetAutoRestake,
  ): Promise<MsgSetAutoRestakeResponse> {
    const data = MsgSetAutoRestake.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.distribution.v1beta1.Msg",
      "SetAutoRestake",
      data,
    );
    return promise.then((data) =>
      MsgSetAutoRestakeResponse.decode(new _m0.Reader(data)),
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
