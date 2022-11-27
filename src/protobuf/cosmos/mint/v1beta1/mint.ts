/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.mint.v1beta1";

/** Minter represents the minting state. */
export interface Minter {
  /** current annual inflation rate */
  inflation: string;
  /** current annual expected provisions */
  annual_provisions: string;
}

/** Params holds parameters for the mint module. */
export interface Params {
  /** type of coin to mint */
  mint_denom: string;
  /** maximum annual change in inflation rate */
  inflation_rate_change: string;
  /** maximum inflation rate */
  inflation_max: string;
  /** minimum inflation rate */
  inflation_min: string;
  /** goal of percent bonded atoms */
  goal_bonded: string;
  /** expected blocks per year */
  blocks_per_year: string;
}

function createBaseMinter(): Minter {
  return { inflation: "", annual_provisions: "" };
}

export const Minter = {
  encode(
    message: Minter,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.inflation !== "") {
      writer.uint32(10).string(message.inflation);
    }
    if (message.annual_provisions !== "") {
      writer.uint32(18).string(message.annual_provisions);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Minter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMinter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inflation = reader.string();
          break;
        case 2:
          message.annual_provisions = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Minter {
    return {
      inflation: isSet(object.inflation) ? String(object.inflation) : "",
      annual_provisions: isSet(object.annual_provisions)
        ? String(object.annual_provisions)
        : "",
    };
  },

  toJSON(message: Minter): unknown {
    const obj: any = {};
    message.inflation !== undefined && (obj.inflation = message.inflation);
    message.annual_provisions !== undefined &&
      (obj.annual_provisions = message.annual_provisions);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Minter>, I>>(object: I): Minter {
    const message = createBaseMinter();
    message.inflation = object.inflation ?? "";
    message.annual_provisions = object.annual_provisions ?? "";
    return message;
  },
};

function createBaseParams(): Params {
  return {
    mint_denom: "",
    inflation_rate_change: "",
    inflation_max: "",
    inflation_min: "",
    goal_bonded: "",
    blocks_per_year: "0",
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.mint_denom !== "") {
      writer.uint32(10).string(message.mint_denom);
    }
    if (message.inflation_rate_change !== "") {
      writer.uint32(18).string(message.inflation_rate_change);
    }
    if (message.inflation_max !== "") {
      writer.uint32(26).string(message.inflation_max);
    }
    if (message.inflation_min !== "") {
      writer.uint32(34).string(message.inflation_min);
    }
    if (message.goal_bonded !== "") {
      writer.uint32(42).string(message.goal_bonded);
    }
    if (message.blocks_per_year !== "0") {
      writer.uint32(48).uint64(message.blocks_per_year);
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
          message.mint_denom = reader.string();
          break;
        case 2:
          message.inflation_rate_change = reader.string();
          break;
        case 3:
          message.inflation_max = reader.string();
          break;
        case 4:
          message.inflation_min = reader.string();
          break;
        case 5:
          message.goal_bonded = reader.string();
          break;
        case 6:
          message.blocks_per_year = longToString(reader.uint64() as Long);
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
      mint_denom: isSet(object.mint_denom) ? String(object.mint_denom) : "",
      inflation_rate_change: isSet(object.inflation_rate_change)
        ? String(object.inflation_rate_change)
        : "",
      inflation_max: isSet(object.inflation_max)
        ? String(object.inflation_max)
        : "",
      inflation_min: isSet(object.inflation_min)
        ? String(object.inflation_min)
        : "",
      goal_bonded: isSet(object.goal_bonded) ? String(object.goal_bonded) : "",
      blocks_per_year: isSet(object.blocks_per_year)
        ? String(object.blocks_per_year)
        : "0",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.mint_denom !== undefined && (obj.mint_denom = message.mint_denom);
    message.inflation_rate_change !== undefined &&
      (obj.inflation_rate_change = message.inflation_rate_change);
    message.inflation_max !== undefined &&
      (obj.inflation_max = message.inflation_max);
    message.inflation_min !== undefined &&
      (obj.inflation_min = message.inflation_min);
    message.goal_bonded !== undefined &&
      (obj.goal_bonded = message.goal_bonded);
    message.blocks_per_year !== undefined &&
      (obj.blocks_per_year = message.blocks_per_year);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.mint_denom = object.mint_denom ?? "";
    message.inflation_rate_change = object.inflation_rate_change ?? "";
    message.inflation_max = object.inflation_max ?? "";
    message.inflation_min = object.inflation_min ?? "";
    message.goal_bonded = object.goal_bonded ?? "";
    message.blocks_per_year = object.blocks_per_year ?? "0";
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
