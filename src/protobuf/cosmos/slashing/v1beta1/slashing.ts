// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               v3.21.3
// source: cosmos/slashing/v1beta1/slashing.proto

/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "cosmos.slashing.v1beta1";

/**
 * ValidatorSigningInfo defines a validator's signing info for monitoring their
 * liveness activity.
 */
export interface ValidatorSigningInfo {
  address: string;
  /** Height at which validator was first a candidate OR was un-jailed */
  start_height: string;
  /**
   * Index which is incremented every time a validator is bonded in a block and
   * _may_ have signed a pre-commit or not. This in conjunction with the
   * signed_blocks_window param determines the index in the missed block bitmap.
   */
  index_offset: string;
  /** Timestamp until which the validator is jailed due to liveness downtime. */
  jailed_until?:
    | Timestamp
    | undefined;
  /**
   * Whether or not a validator has been tombstoned (killed out of validator
   * set). It is set once the validator commits an equivocation or for any other
   * configured misbehavior.
   */
  tombstoned: boolean;
  /**
   * A counter of missed (unsigned) blocks. It is used to avoid unnecessary
   * reads in the missed block bitmap.
   */
  missed_blocks_counter: string;
}

/** Params represents the parameters used for by the slashing module. */
export interface Params {
  signed_blocks_window: string;
  min_signed_per_window: Uint8Array;
  downtime_jail_duration?: Duration | undefined;
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
  encode(message: ValidatorSigningInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.tombstoned !== false) {
      writer.uint32(40).bool(message.tombstoned);
    }
    if (message.missed_blocks_counter !== "0") {
      writer.uint32(48).int64(message.missed_blocks_counter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorSigningInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSigningInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.start_height = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.index_offset = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.jailed_until = Timestamp.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.tombstoned = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.missed_blocks_counter = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorSigningInfo {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      start_height: isSet(object.start_height) ? globalThis.String(object.start_height) : "0",
      index_offset: isSet(object.index_offset) ? globalThis.String(object.index_offset) : "0",
      jailed_until: isSet(object.jailed_until) ? fromJsonTimestamp(object.jailed_until) : undefined,
      tombstoned: isSet(object.tombstoned) ? globalThis.Boolean(object.tombstoned) : false,
      missed_blocks_counter: isSet(object.missed_blocks_counter)
        ? globalThis.String(object.missed_blocks_counter)
        : "0",
    };
  },

  toJSON(message: ValidatorSigningInfo): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.start_height !== "0") {
      obj.start_height = message.start_height;
    }
    if (message.index_offset !== "0") {
      obj.index_offset = message.index_offset;
    }
    if (message.jailed_until !== undefined) {
      obj.jailed_until = fromTimestamp(message.jailed_until).toISOString();
    }
    if (message.tombstoned !== false) {
      obj.tombstoned = message.tombstoned;
    }
    if (message.missed_blocks_counter !== "0") {
      obj.missed_blocks_counter = message.missed_blocks_counter;
    }
    return obj;
  },

  create(base?: DeepPartial<ValidatorSigningInfo>): ValidatorSigningInfo {
    return ValidatorSigningInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ValidatorSigningInfo>): ValidatorSigningInfo {
    const message = createBaseValidatorSigningInfo();
    message.address = object.address ?? "";
    message.start_height = object.start_height ?? "0";
    message.index_offset = object.index_offset ?? "0";
    message.jailed_until = (object.jailed_until !== undefined && object.jailed_until !== null)
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
    min_signed_per_window: new Uint8Array(0),
    downtime_jail_duration: undefined,
    slash_fraction_double_sign: new Uint8Array(0),
    slash_fraction_downtime: new Uint8Array(0),
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signed_blocks_window !== "0") {
      writer.uint32(8).int64(message.signed_blocks_window);
    }
    if (message.min_signed_per_window.length !== 0) {
      writer.uint32(18).bytes(message.min_signed_per_window);
    }
    if (message.downtime_jail_duration !== undefined) {
      Duration.encode(message.downtime_jail_duration, writer.uint32(26).fork()).ldelim();
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.signed_blocks_window = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.min_signed_per_window = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.downtime_jail_duration = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.slash_fraction_double_sign = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.slash_fraction_downtime = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      signed_blocks_window: isSet(object.signed_blocks_window) ? globalThis.String(object.signed_blocks_window) : "0",
      min_signed_per_window: isSet(object.min_signed_per_window)
        ? bytesFromBase64(object.min_signed_per_window)
        : new Uint8Array(0),
      downtime_jail_duration: isSet(object.downtime_jail_duration)
        ? Duration.fromJSON(object.downtime_jail_duration)
        : undefined,
      slash_fraction_double_sign: isSet(object.slash_fraction_double_sign)
        ? bytesFromBase64(object.slash_fraction_double_sign)
        : new Uint8Array(0),
      slash_fraction_downtime: isSet(object.slash_fraction_downtime)
        ? bytesFromBase64(object.slash_fraction_downtime)
        : new Uint8Array(0),
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.signed_blocks_window !== "0") {
      obj.signed_blocks_window = message.signed_blocks_window;
    }
    if (message.min_signed_per_window.length !== 0) {
      obj.min_signed_per_window = base64FromBytes(message.min_signed_per_window);
    }
    if (message.downtime_jail_duration !== undefined) {
      obj.downtime_jail_duration = Duration.toJSON(message.downtime_jail_duration);
    }
    if (message.slash_fraction_double_sign.length !== 0) {
      obj.slash_fraction_double_sign = base64FromBytes(message.slash_fraction_double_sign);
    }
    if (message.slash_fraction_downtime.length !== 0) {
      obj.slash_fraction_downtime = base64FromBytes(message.slash_fraction_downtime);
    }
    return obj;
  },

  create(base?: DeepPartial<Params>): Params {
    return Params.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Params>): Params {
    const message = createBaseParams();
    message.signed_blocks_window = object.signed_blocks_window ?? "0";
    message.min_signed_per_window = object.min_signed_per_window ?? new Uint8Array(0);
    message.downtime_jail_duration =
      (object.downtime_jail_duration !== undefined && object.downtime_jail_duration !== null)
        ? Duration.fromPartial(object.downtime_jail_duration)
        : undefined;
    message.slash_fraction_double_sign = object.slash_fraction_double_sign ?? new Uint8Array(0);
    message.slash_fraction_downtime = object.slash_fraction_downtime ?? new Uint8Array(0);
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000).toString();
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (globalThis.Number(t.seconds) || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Timestamp {
  if (o instanceof globalThis.Date) {
    return toTimestamp(o);
  } else if (typeof o === "string") {
    return toTimestamp(new globalThis.Date(o));
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
