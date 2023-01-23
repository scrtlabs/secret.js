/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Duration } from "../../../google/protobuf/duration";
import { Any } from "../../../google/protobuf/any";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.feegrant.v1beta1";

/** Since: cosmos-sdk 0.43 */

/**
 * BasicAllowance implements Allowance with a one-time grant of tokens
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
export interface BasicAllowance {
  /**
   * spend_limit specifies the maximum amount of tokens that can be spent
   * by this allowance and will be updated as tokens are spent. If it is
   * empty, there is no spend limit and any amount of coins can be spent.
   */
  spend_limit: Coin[];
  /** expiration specifies an optional time when this allowance expires */
  expiration?: Timestamp;
}

/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
export interface PeriodicAllowance {
  /** basic specifies a struct of `BasicAllowance` */
  basic?: BasicAllowance;
  /**
   * period specifies the time duration in which period_spend_limit coins can
   * be spent before that allowance is reset
   */
  period?: Duration;
  /**
   * period_spend_limit specifies the maximum number of coins that can be spent
   * in the period
   */
  period_spend_limit: Coin[];
  /** period_can_spend is the number of coins left to be spent before the period_reset time */
  period_can_spend: Coin[];
  /**
   * period_reset is the time at which this period resets and a new one begins,
   * it is calculated from the start time of the first transaction after the
   * last period ended
   */
  period_reset?: Timestamp;
}

/** AllowedMsgAllowance creates allowance only for specified message types. */
export interface AllowedMsgAllowance {
  /** allowance can be any of basic and filtered fee allowance. */
  allowance?: Any;
  /** allowed_messages are the messages for which the grantee has the access. */
  allowed_messages: string[];
}

/** Grant is stored in the KVStore to record a grant with full context */
export interface Grant {
  /** granter is the address of the user granting an allowance of their funds. */
  granter: string;
  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee: string;
  /** allowance can be any of basic and filtered fee allowance. */
  allowance?: Any;
}

function createBaseBasicAllowance(): BasicAllowance {
  return { spend_limit: [], expiration: undefined };
}

export const BasicAllowance = {
  encode(
    message: BasicAllowance,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.spend_limit) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(message.expiration, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BasicAllowance {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasicAllowance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spend_limit.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.expiration = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BasicAllowance {
    return {
      spend_limit: Array.isArray(object?.spend_limit)
        ? object.spend_limit.map((e: any) => Coin.fromJSON(e))
        : [],
      expiration: isSet(object.expiration)
        ? fromJsonTimestamp(object.expiration)
        : undefined,
    };
  },

  toJSON(message: BasicAllowance): unknown {
    const obj: any = {};
    if (message.spend_limit) {
      obj.spend_limit = message.spend_limit.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.spend_limit = [];
    }
    message.expiration !== undefined &&
      (obj.expiration = fromTimestamp(message.expiration).toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BasicAllowance>, I>>(
    object: I,
  ): BasicAllowance {
    const message = createBaseBasicAllowance();
    message.spend_limit =
      object.spend_limit?.map((e) => Coin.fromPartial(e)) || [];
    message.expiration =
      object.expiration !== undefined && object.expiration !== null
        ? Timestamp.fromPartial(object.expiration)
        : undefined;
    return message;
  },
};

function createBasePeriodicAllowance(): PeriodicAllowance {
  return {
    basic: undefined,
    period: undefined,
    period_spend_limit: [],
    period_can_spend: [],
    period_reset: undefined,
  };
}

export const PeriodicAllowance = {
  encode(
    message: PeriodicAllowance,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.basic !== undefined) {
      BasicAllowance.encode(message.basic, writer.uint32(10).fork()).ldelim();
    }
    if (message.period !== undefined) {
      Duration.encode(message.period, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.period_spend_limit) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.period_can_spend) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.period_reset !== undefined) {
      Timestamp.encode(message.period_reset, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PeriodicAllowance {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeriodicAllowance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.basic = BasicAllowance.decode(reader, reader.uint32());
          break;
        case 2:
          message.period = Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.period_spend_limit.push(Coin.decode(reader, reader.uint32()));
          break;
        case 4:
          message.period_can_spend.push(Coin.decode(reader, reader.uint32()));
          break;
        case 5:
          message.period_reset = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PeriodicAllowance {
    return {
      basic: isSet(object.basic)
        ? BasicAllowance.fromJSON(object.basic)
        : undefined,
      period: isSet(object.period)
        ? Duration.fromJSON(object.period)
        : undefined,
      period_spend_limit: Array.isArray(object?.period_spend_limit)
        ? object.period_spend_limit.map((e: any) => Coin.fromJSON(e))
        : [],
      period_can_spend: Array.isArray(object?.period_can_spend)
        ? object.period_can_spend.map((e: any) => Coin.fromJSON(e))
        : [],
      period_reset: isSet(object.period_reset)
        ? fromJsonTimestamp(object.period_reset)
        : undefined,
    };
  },

  toJSON(message: PeriodicAllowance): unknown {
    const obj: any = {};
    message.basic !== undefined &&
      (obj.basic = message.basic
        ? BasicAllowance.toJSON(message.basic)
        : undefined);
    message.period !== undefined &&
      (obj.period = message.period
        ? Duration.toJSON(message.period)
        : undefined);
    if (message.period_spend_limit) {
      obj.period_spend_limit = message.period_spend_limit.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.period_spend_limit = [];
    }
    if (message.period_can_spend) {
      obj.period_can_spend = message.period_can_spend.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.period_can_spend = [];
    }
    message.period_reset !== undefined &&
      (obj.period_reset = fromTimestamp(message.period_reset).toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PeriodicAllowance>, I>>(
    object: I,
  ): PeriodicAllowance {
    const message = createBasePeriodicAllowance();
    message.basic =
      object.basic !== undefined && object.basic !== null
        ? BasicAllowance.fromPartial(object.basic)
        : undefined;
    message.period =
      object.period !== undefined && object.period !== null
        ? Duration.fromPartial(object.period)
        : undefined;
    message.period_spend_limit =
      object.period_spend_limit?.map((e) => Coin.fromPartial(e)) || [];
    message.period_can_spend =
      object.period_can_spend?.map((e) => Coin.fromPartial(e)) || [];
    message.period_reset =
      object.period_reset !== undefined && object.period_reset !== null
        ? Timestamp.fromPartial(object.period_reset)
        : undefined;
    return message;
  },
};

function createBaseAllowedMsgAllowance(): AllowedMsgAllowance {
  return { allowance: undefined, allowed_messages: [] };
}

export const AllowedMsgAllowance = {
  encode(
    message: AllowedMsgAllowance,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.allowance !== undefined) {
      Any.encode(message.allowance, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.allowed_messages) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllowedMsgAllowance {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowedMsgAllowance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allowance = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.allowed_messages.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AllowedMsgAllowance {
    return {
      allowance: isSet(object.allowance)
        ? Any.fromJSON(object.allowance)
        : undefined,
      allowed_messages: Array.isArray(object?.allowed_messages)
        ? object.allowed_messages.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: AllowedMsgAllowance): unknown {
    const obj: any = {};
    message.allowance !== undefined &&
      (obj.allowance = message.allowance
        ? Any.toJSON(message.allowance)
        : undefined);
    if (message.allowed_messages) {
      obj.allowed_messages = message.allowed_messages.map((e) => e);
    } else {
      obj.allowed_messages = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AllowedMsgAllowance>, I>>(
    object: I,
  ): AllowedMsgAllowance {
    const message = createBaseAllowedMsgAllowance();
    message.allowance =
      object.allowance !== undefined && object.allowance !== null
        ? Any.fromPartial(object.allowance)
        : undefined;
    message.allowed_messages = object.allowed_messages?.map((e) => e) || [];
    return message;
  },
};

function createBaseGrant(): Grant {
  return { granter: "", grantee: "", allowance: undefined };
}

export const Grant = {
  encode(message: Grant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.allowance !== undefined) {
      Any.encode(message.allowance, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Grant {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.granter = reader.string();
          break;
        case 2:
          message.grantee = reader.string();
          break;
        case 3:
          message.allowance = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Grant {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      allowance: isSet(object.allowance)
        ? Any.fromJSON(object.allowance)
        : undefined,
    };
  },

  toJSON(message: Grant): unknown {
    const obj: any = {};
    message.granter !== undefined && (obj.granter = message.granter);
    message.grantee !== undefined && (obj.grantee = message.grantee);
    message.allowance !== undefined &&
      (obj.allowance = message.allowance
        ? Any.toJSON(message.allowance)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Grant>, I>>(object: I): Grant {
    const message = createBaseGrant();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.allowance =
      object.allowance !== undefined && object.allowance !== null
        ? Any.fromPartial(object.allowance)
        : undefined;
    return message;
  },
};

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

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000).toString();
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = Number(t.seconds) * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Timestamp {
  if (o instanceof Date) {
    return toTimestamp(o);
  } else if (typeof o === "string") {
    return toTimestamp(new Date(o));
  } else {
    return Timestamp.fromJSON(o);
  }
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
