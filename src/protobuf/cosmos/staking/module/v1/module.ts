/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.staking.module.v1";

/** Module is the config object of the staking module. */
export interface Module {
  /**
   * hooks_order specifies the order of staking hooks and should be a list
   * of module names which provide a staking hooks instance. If no order is
   * provided, then hooks will be applied in alphabetical order of module names.
   */
  hooks_order: string[];
  /** authority defines the custom module authority. If not set, defaults to the governance module. */
  authority: string;
  /** bech32_prefix_validator is the bech32 validator prefix for the app. */
  bech32_prefix_validator: string;
  /** bech32_prefix_consensus is the bech32 consensus node prefix for the app. */
  bech32_prefix_consensus: string;
}

function createBaseModule(): Module {
  return {
    hooks_order: [],
    authority: "",
    bech32_prefix_validator: "",
    bech32_prefix_consensus: "",
  };
}

export const Module = {
  encode(
    message: Module,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.hooks_order) {
      writer.uint32(10).string(v!);
    }
    if (message.authority !== "") {
      writer.uint32(18).string(message.authority);
    }
    if (message.bech32_prefix_validator !== "") {
      writer.uint32(26).string(message.bech32_prefix_validator);
    }
    if (message.bech32_prefix_consensus !== "") {
      writer.uint32(34).string(message.bech32_prefix_consensus);
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
          message.hooks_order.push(reader.string());
          break;
        case 2:
          message.authority = reader.string();
          break;
        case 3:
          message.bech32_prefix_validator = reader.string();
          break;
        case 4:
          message.bech32_prefix_consensus = reader.string();
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
      hooks_order: Array.isArray(object?.hooks_order)
        ? object.hooks_order.map((e: any) => String(e))
        : [],
      authority: isSet(object.authority) ? String(object.authority) : "",
      bech32_prefix_validator: isSet(object.bech32_prefix_validator)
        ? String(object.bech32_prefix_validator)
        : "",
      bech32_prefix_consensus: isSet(object.bech32_prefix_consensus)
        ? String(object.bech32_prefix_consensus)
        : "",
    };
  },

  toJSON(message: Module): unknown {
    const obj: any = {};
    if (message.hooks_order) {
      obj.hooks_order = message.hooks_order.map((e) => e);
    } else {
      obj.hooks_order = [];
    }
    message.authority !== undefined && (obj.authority = message.authority);
    message.bech32_prefix_validator !== undefined &&
      (obj.bech32_prefix_validator = message.bech32_prefix_validator);
    message.bech32_prefix_consensus !== undefined &&
      (obj.bech32_prefix_consensus = message.bech32_prefix_consensus);
    return obj;
  },

  fromPartial(object: DeepPartial<Module>): Module {
    const message = createBaseModule();
    message.hooks_order = object.hooks_order?.map((e) => e) || [];
    message.authority = object.authority ?? "";
    message.bech32_prefix_validator = object.bech32_prefix_validator ?? "";
    message.bech32_prefix_consensus = object.bech32_prefix_consensus ?? "";
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
