/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.gov.module.v1";

/** Module is the config object of the gov module. */
export interface Module {
  /**
   * max_metadata_len defines the maximum proposal metadata length.
   * Defaults to 255 if not explicitly set.
   */
  max_metadata_len: string;
  /** authority defines the custom module authority. If not set, defaults to the governance module. */
  authority: string;
}

function createBaseModule(): Module {
  return { max_metadata_len: "0", authority: "" };
}

export const Module = {
  encode(
    message: Module,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.max_metadata_len !== "0") {
      writer.uint32(8).uint64(message.max_metadata_len);
    }
    if (message.authority !== "") {
      writer.uint32(18).string(message.authority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Module {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.max_metadata_len = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.authority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Module {
    return {
      max_metadata_len: isSet(object.max_metadata_len)
        ? String(object.max_metadata_len)
        : "0",
      authority: isSet(object.authority) ? String(object.authority) : "",
    };
  },

  toJSON(message: Module): unknown {
    const obj: any = {};
    message.max_metadata_len !== undefined &&
      (obj.max_metadata_len = message.max_metadata_len);
    message.authority !== undefined && (obj.authority = message.authority);
    return obj;
  },

  fromPartial(object: DeepPartial<Module>): Module {
    const message = createBaseModule();
    message.max_metadata_len = object.max_metadata_len ?? "0";
    message.authority = object.authority ?? "";
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
