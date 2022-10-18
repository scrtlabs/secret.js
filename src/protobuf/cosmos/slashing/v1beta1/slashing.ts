/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Duration } from "../../../google/protobuf/duration";

export const protobufPackage = "cosmos.slashing.v1beta1";

/**
 * ValidatorSigningInfo defines a validator's signing info for monitoring their
 * liveness activity.
 */
export interface ValidatorSigningInfo {
  address: string;
  /** Height at which validator was first a candidate OR was unjailed */
  start_height: string;
  /**
   * Index which is incremented each time the validator was a bonded
   * in a block and may have signed a precommit or not. This in conjunction with the
   * `SignedBlocksWindow` param determines the index in the `MissedBlocksBitArray`.
   */
  index_offset: string;
  /** Timestamp until which the validator is jailed due to liveness downtime. */
  jailed_until?: Timestamp;
  /**
   * Whether or not a validator has been tombstoned (killed out of validator set). It is set
   * once the validator commits an equivocation or for any other configured misbehiavor.
   */
  tombstoned: boolean;
  /**
   * A counter kept to avoid unnecessary array reads.
   * Note that `Sum(MissedBlocksBitArray)` always equals `MissedBlocksCounter`.
   */
  missed_blocks_counter: string;
}

/** Params represents the parameters used for by the slashing module. */
export interface Params {
  signed_blocks_window: string;
  min_signed_per_window: Uint8Array;
  downtime_jail_duration?: Duration;
  slash_fraction_double_sign: Uint8Array;
  slash_fraction_downtime: Uint8Array;
}

function createBaseValidatorSigningInfo(): ValidatorSigningInfo {
  return {
    address: "",
    start_height: "0",
    index_offset: "0",
    jailed_until: undefined,
    tombstoned: false,
    missed_blocks_counter: "0",
  };
}

export const ValidatorSigningInfo = {
  encode(
    message: ValidatorSigningInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.start_height !== "0") {
      writer.uint32(16).int64(message.start_height);
    }
    if (message.index_offset !== "0") {
      writer.uint32(24).int64(message.index_offset);
    }
    if (message.jailed_until !== undefined) {
      Timestamp.encode(message.jailed_until, writer.uint32(34).fork()).ldelim();
    }
    if (message.tombstoned === true) {
      writer.uint32(40).bool(message.tombstoned);
    }
    if (message.missed_blocks_counter !== "0") {
      writer.uint32(48).int64(message.missed_blocks_counter);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ValidatorSigningInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSigningInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.start_height = longToString(reader.int64() as Long);
          break;
        case 3:
          message.index_offset = longToString(reader.int64() as Long);
          break;
        case 4:
          message.jailed_until = Timestamp.decode(reader, reader.uint32());
          break;
        case 5:
          message.tombstoned = reader.bool();
          break;
        case 6:
          message.missed_blocks_counter = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorSigningInfo {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      start_height: isSet(object.start_height)
        ? String(object.start_height)
        : "0",
      index_offset: isSet(object.index_offset)
        ? String(object.index_offset)
        : "0",
      jailed_until: isSet(object.jailed_until)
        ? fromJsonTimestamp(object.jailed_until)
        : undefined,
      tombstoned: isSet(object.tombstoned) ? Boolean(object.tombstoned) : false,
      missed_blocks_counter: isSet(object.missed_blocks_counter)
        ? String(object.missed_blocks_counter)
        : "0",
    };
  },

  toJSON(message: ValidatorSigningInfo): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.start_height !== undefined &&
      (obj.start_height = message.start_height);
    message.index_offset !== undefined &&
      (obj.index_offset = message.index_offset);
    message.jailed_until !== undefined &&
      (obj.jailed_until = fromTimestamp(message.jailed_until).toISOString());
    message.tombstoned !== undefined && (obj.tombstoned = message.tombstoned);
    message.missed_blocks_counter !== undefined &&
      (obj.missed_blocks_counter = message.missed_blocks_counter);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidatorSigningInfo>, I>>(
    object: I,
  ): ValidatorSigningInfo {
    const message = createBaseValidatorSigningInfo();
    message.address = object.address ?? "";
    message.start_height = object.start_height ?? "0";
    message.index_offset = object.index_offset ?? "0";
    message.jailed_until =
      object.jailed_until !== undefined && object.jailed_until !== null
        ? Timestamp.fromPartial(object.jailed_until)
        : undefined;
    message.tombstoned = object.tombstoned ?? false;
    message.missed_blocks_counter = object.missed_blocks_counter ?? "0";
    return message;
  },
};

function createBaseParams(): Params {
  return {
    signed_blocks_window: "0",
    min_signed_per_window: new Uint8Array(),
    downtime_jail_duration: undefined,
    slash_fraction_double_sign: new Uint8Array(),
    slash_fraction_downtime: new Uint8Array(),
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.signed_blocks_window !== "0") {
      writer.uint32(8).int64(message.signed_blocks_window);
    }
    if (message.min_signed_per_window.length !== 0) {
      writer.uint32(18).bytes(message.min_signed_per_window);
    }
    if (message.downtime_jail_duration !== undefined) {
      Duration.encode(
        message.downtime_jail_duration,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.slash_fraction_double_sign.length !== 0) {
      writer.uint32(34).bytes(message.slash_fraction_double_sign);
    }
    if (message.slash_fraction_downtime.length !== 0) {
      writer.uint32(42).bytes(message.slash_fraction_downtime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signed_blocks_window = longToString(reader.int64() as Long);
          break;
        case 2:
          message.min_signed_per_window = reader.bytes();
          break;
        case 3:
          message.downtime_jail_duration = Duration.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.slash_fraction_double_sign = reader.bytes();
          break;
        case 5:
          message.slash_fraction_downtime = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      signed_blocks_window: isSet(object.signed_blocks_window)
        ? String(object.signed_blocks_window)
        : "0",
      min_signed_per_window: isSet(object.min_signed_per_window)
        ? bytesFromBase64(object.min_signed_per_window)
        : new Uint8Array(),
      downtime_jail_duration: isSet(object.downtime_jail_duration)
        ? Duration.fromJSON(object.downtime_jail_duration)
        : undefined,
      slash_fraction_double_sign: isSet(object.slash_fraction_double_sign)
        ? bytesFromBase64(object.slash_fraction_double_sign)
        : new Uint8Array(),
      slash_fraction_downtime: isSet(object.slash_fraction_downtime)
        ? bytesFromBase64(object.slash_fraction_downtime)
        : new Uint8Array(),
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.signed_blocks_window !== undefined &&
      (obj.signed_blocks_window = message.signed_blocks_window);
    message.min_signed_per_window !== undefined &&
      (obj.min_signed_per_window = base64FromBytes(
        message.min_signed_per_window !== undefined
          ? message.min_signed_per_window
          : new Uint8Array(),
      ));
    message.downtime_jail_duration !== undefined &&
      (obj.downtime_jail_duration = message.downtime_jail_duration
        ? Duration.toJSON(message.downtime_jail_duration)
        : undefined);
    message.slash_fraction_double_sign !== undefined &&
      (obj.slash_fraction_double_sign = base64FromBytes(
        message.slash_fraction_double_sign !== undefined
          ? message.slash_fraction_double_sign
          : new Uint8Array(),
      ));
    message.slash_fraction_downtime !== undefined &&
      (obj.slash_fraction_downtime = base64FromBytes(
        message.slash_fraction_downtime !== undefined
          ? message.slash_fraction_downtime
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.signed_blocks_window = object.signed_blocks_window ?? "0";
    message.min_signed_per_window =
      object.min_signed_per_window ?? new Uint8Array();
    message.downtime_jail_duration =
      object.downtime_jail_duration !== undefined &&
      object.downtime_jail_duration !== null
        ? Duration.fromPartial(object.downtime_jail_duration)
        : undefined;
    message.slash_fraction_double_sign =
      object.slash_fraction_double_sign ?? new Uint8Array();
    message.slash_fraction_downtime =
      object.slash_fraction_downtime ?? new Uint8Array();
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
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
