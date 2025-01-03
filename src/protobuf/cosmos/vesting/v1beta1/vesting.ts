// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               v3.21.3
// source: cosmos/vesting/v1beta1/vesting.proto

/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { BaseAccount } from "../../auth/v1beta1/auth";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.vesting.v1beta1";

/**
 * BaseVestingAccount implements the VestingAccount interface. It contains all
 * the necessary fields needed for any vesting account implementation.
 */
export interface BaseVestingAccount {
  base_account?: BaseAccount | undefined;
  original_vesting: Coin[];
  delegated_free: Coin[];
  delegated_vesting: Coin[];
  /** Vesting end time, as unix timestamp (in seconds). */
  end_time: string;
}

/**
 * ContinuousVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
export interface ContinuousVestingAccount {
  base_vesting_account?:
    | BaseVestingAccount
    | undefined;
  /** Vesting start time, as unix timestamp (in seconds). */
  start_time: string;
}

/**
 * DelayedVestingAccount implements the VestingAccount interface. It vests all
 * coins after a specific time, but non prior. In other words, it keeps them
 * locked until a specified time.
 */
export interface DelayedVestingAccount {
  base_vesting_account?: BaseVestingAccount | undefined;
}

/** Period defines a length of time and amount of coins that will vest. */
export interface Period {
  /** Period duration in seconds. */
  length: string;
  amount: Coin[];
}

/**
 * PeriodicVestingAccount implements the VestingAccount interface. It
 * periodically vests by unlocking coins during each specified period.
 */
export interface PeriodicVestingAccount {
  base_vesting_account?: BaseVestingAccount | undefined;
  start_time: string;
  vesting_periods: Period[];
}

/**
 * PermanentLockedAccount implements the VestingAccount interface. It does
 * not ever release coins, locking them indefinitely. Coins in this account can
 * still be used for delegating and for governance votes even while locked.
 *
 * Since: cosmos-sdk 0.43
 */
export interface PermanentLockedAccount {
  base_vesting_account?: BaseVestingAccount | undefined;
}

function createBaseBaseVestingAccount(): BaseVestingAccount {
  return { base_account: undefined, original_vesting: [], delegated_free: [], delegated_vesting: [], end_time: "0" };
}

export const BaseVestingAccount = {
  encode(message: BaseVestingAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.base_account !== undefined) {
      BaseAccount.encode(message.base_account, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.original_vesting) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.delegated_free) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.delegated_vesting) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.end_time !== "0") {
      writer.uint32(40).int64(message.end_time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseVestingAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.base_account = BaseAccount.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.original_vesting.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.delegated_free.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.delegated_vesting.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.end_time = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BaseVestingAccount {
    return {
      base_account: isSet(object.base_account) ? BaseAccount.fromJSON(object.base_account) : undefined,
      original_vesting: globalThis.Array.isArray(object?.original_vesting)
        ? object.original_vesting.map((e: any) => Coin.fromJSON(e))
        : [],
      delegated_free: globalThis.Array.isArray(object?.delegated_free)
        ? object.delegated_free.map((e: any) => Coin.fromJSON(e))
        : [],
      delegated_vesting: globalThis.Array.isArray(object?.delegated_vesting)
        ? object.delegated_vesting.map((e: any) => Coin.fromJSON(e))
        : [],
      end_time: isSet(object.end_time) ? globalThis.String(object.end_time) : "0",
    };
  },

  toJSON(message: BaseVestingAccount): unknown {
    const obj: any = {};
    if (message.base_account !== undefined) {
      obj.base_account = BaseAccount.toJSON(message.base_account);
    }
    if (message.original_vesting?.length) {
      obj.original_vesting = message.original_vesting.map((e) => Coin.toJSON(e));
    }
    if (message.delegated_free?.length) {
      obj.delegated_free = message.delegated_free.map((e) => Coin.toJSON(e));
    }
    if (message.delegated_vesting?.length) {
      obj.delegated_vesting = message.delegated_vesting.map((e) => Coin.toJSON(e));
    }
    if (message.end_time !== "0") {
      obj.end_time = message.end_time;
    }
    return obj;
  },

  create(base?: DeepPartial<BaseVestingAccount>): BaseVestingAccount {
    return BaseVestingAccount.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BaseVestingAccount>): BaseVestingAccount {
    const message = createBaseBaseVestingAccount();
    message.base_account = (object.base_account !== undefined && object.base_account !== null)
      ? BaseAccount.fromPartial(object.base_account)
      : undefined;
    message.original_vesting = object.original_vesting?.map((e) => Coin.fromPartial(e)) || [];
    message.delegated_free = object.delegated_free?.map((e) => Coin.fromPartial(e)) || [];
    message.delegated_vesting = object.delegated_vesting?.map((e) => Coin.fromPartial(e)) || [];
    message.end_time = object.end_time ?? "0";
    return message;
  },
};

function createBaseContinuousVestingAccount(): ContinuousVestingAccount {
  return { base_vesting_account: undefined, start_time: "0" };
}

export const ContinuousVestingAccount = {
  encode(message: ContinuousVestingAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.base_vesting_account !== undefined) {
      BaseVestingAccount.encode(message.base_vesting_account, writer.uint32(10).fork()).ldelim();
    }
    if (message.start_time !== "0") {
      writer.uint32(16).int64(message.start_time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContinuousVestingAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContinuousVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.base_vesting_account = BaseVestingAccount.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.start_time = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ContinuousVestingAccount {
    return {
      base_vesting_account: isSet(object.base_vesting_account)
        ? BaseVestingAccount.fromJSON(object.base_vesting_account)
        : undefined,
      start_time: isSet(object.start_time) ? globalThis.String(object.start_time) : "0",
    };
  },

  toJSON(message: ContinuousVestingAccount): unknown {
    const obj: any = {};
    if (message.base_vesting_account !== undefined) {
      obj.base_vesting_account = BaseVestingAccount.toJSON(message.base_vesting_account);
    }
    if (message.start_time !== "0") {
      obj.start_time = message.start_time;
    }
    return obj;
  },

  create(base?: DeepPartial<ContinuousVestingAccount>): ContinuousVestingAccount {
    return ContinuousVestingAccount.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ContinuousVestingAccount>): ContinuousVestingAccount {
    const message = createBaseContinuousVestingAccount();
    message.base_vesting_account = (object.base_vesting_account !== undefined && object.base_vesting_account !== null)
      ? BaseVestingAccount.fromPartial(object.base_vesting_account)
      : undefined;
    message.start_time = object.start_time ?? "0";
    return message;
  },
};

function createBaseDelayedVestingAccount(): DelayedVestingAccount {
  return { base_vesting_account: undefined };
}

export const DelayedVestingAccount = {
  encode(message: DelayedVestingAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.base_vesting_account !== undefined) {
      BaseVestingAccount.encode(message.base_vesting_account, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelayedVestingAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelayedVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.base_vesting_account = BaseVestingAccount.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DelayedVestingAccount {
    return {
      base_vesting_account: isSet(object.base_vesting_account)
        ? BaseVestingAccount.fromJSON(object.base_vesting_account)
        : undefined,
    };
  },

  toJSON(message: DelayedVestingAccount): unknown {
    const obj: any = {};
    if (message.base_vesting_account !== undefined) {
      obj.base_vesting_account = BaseVestingAccount.toJSON(message.base_vesting_account);
    }
    return obj;
  },

  create(base?: DeepPartial<DelayedVestingAccount>): DelayedVestingAccount {
    return DelayedVestingAccount.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DelayedVestingAccount>): DelayedVestingAccount {
    const message = createBaseDelayedVestingAccount();
    message.base_vesting_account = (object.base_vesting_account !== undefined && object.base_vesting_account !== null)
      ? BaseVestingAccount.fromPartial(object.base_vesting_account)
      : undefined;
    return message;
  },
};

function createBasePeriod(): Period {
  return { length: "0", amount: [] };
}

export const Period = {
  encode(message: Period, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.length !== "0") {
      writer.uint32(8).int64(message.length);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Period {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeriod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.length = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amount.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Period {
    return {
      length: isSet(object.length) ? globalThis.String(object.length) : "0",
      amount: globalThis.Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: Period): unknown {
    const obj: any = {};
    if (message.length !== "0") {
      obj.length = message.length;
    }
    if (message.amount?.length) {
      obj.amount = message.amount.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<Period>): Period {
    return Period.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Period>): Period {
    const message = createBasePeriod();
    message.length = object.length ?? "0";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePeriodicVestingAccount(): PeriodicVestingAccount {
  return { base_vesting_account: undefined, start_time: "0", vesting_periods: [] };
}

export const PeriodicVestingAccount = {
  encode(message: PeriodicVestingAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.base_vesting_account !== undefined) {
      BaseVestingAccount.encode(message.base_vesting_account, writer.uint32(10).fork()).ldelim();
    }
    if (message.start_time !== "0") {
      writer.uint32(16).int64(message.start_time);
    }
    for (const v of message.vesting_periods) {
      Period.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PeriodicVestingAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeriodicVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.base_vesting_account = BaseVestingAccount.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.start_time = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.vesting_periods.push(Period.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PeriodicVestingAccount {
    return {
      base_vesting_account: isSet(object.base_vesting_account)
        ? BaseVestingAccount.fromJSON(object.base_vesting_account)
        : undefined,
      start_time: isSet(object.start_time) ? globalThis.String(object.start_time) : "0",
      vesting_periods: globalThis.Array.isArray(object?.vesting_periods)
        ? object.vesting_periods.map((e: any) => Period.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PeriodicVestingAccount): unknown {
    const obj: any = {};
    if (message.base_vesting_account !== undefined) {
      obj.base_vesting_account = BaseVestingAccount.toJSON(message.base_vesting_account);
    }
    if (message.start_time !== "0") {
      obj.start_time = message.start_time;
    }
    if (message.vesting_periods?.length) {
      obj.vesting_periods = message.vesting_periods.map((e) => Period.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<PeriodicVestingAccount>): PeriodicVestingAccount {
    return PeriodicVestingAccount.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PeriodicVestingAccount>): PeriodicVestingAccount {
    const message = createBasePeriodicVestingAccount();
    message.base_vesting_account = (object.base_vesting_account !== undefined && object.base_vesting_account !== null)
      ? BaseVestingAccount.fromPartial(object.base_vesting_account)
      : undefined;
    message.start_time = object.start_time ?? "0";
    message.vesting_periods = object.vesting_periods?.map((e) => Period.fromPartial(e)) || [];
    return message;
  },
};

function createBasePermanentLockedAccount(): PermanentLockedAccount {
  return { base_vesting_account: undefined };
}

export const PermanentLockedAccount = {
  encode(message: PermanentLockedAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.base_vesting_account !== undefined) {
      BaseVestingAccount.encode(message.base_vesting_account, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PermanentLockedAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePermanentLockedAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.base_vesting_account = BaseVestingAccount.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PermanentLockedAccount {
    return {
      base_vesting_account: isSet(object.base_vesting_account)
        ? BaseVestingAccount.fromJSON(object.base_vesting_account)
        : undefined,
    };
  },

  toJSON(message: PermanentLockedAccount): unknown {
    const obj: any = {};
    if (message.base_vesting_account !== undefined) {
      obj.base_vesting_account = BaseVestingAccount.toJSON(message.base_vesting_account);
    }
    return obj;
  },

  create(base?: DeepPartial<PermanentLockedAccount>): PermanentLockedAccount {
    return PermanentLockedAccount.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PermanentLockedAccount>): PermanentLockedAccount {
    const message = createBasePermanentLockedAccount();
    message.base_vesting_account = (object.base_vesting_account !== undefined && object.base_vesting_account !== null)
      ? BaseVestingAccount.fromPartial(object.base_vesting_account)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
