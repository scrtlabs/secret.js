/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.tx.config.v1";

/** Config is the config object of the x/auth/tx package. */
export interface Config {
  /**
   * skip_ante_handler defines whether the ante handler registration should be skipped in case an app wants to override
   * this functionality.
   */
  skip_ante_handler: boolean;
  /**
   * skip_post_handler defines whether the post handler registration should be skipped in case an app wants to override
   * this functionality.
   */
  skip_post_handler: boolean;
}

function createBaseConfig(): Config {
  return { skip_ante_handler: false, skip_post_handler: false };
}

export const Config = {
  encode(
    message: Config,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.skip_ante_handler === true) {
      writer.uint32(8).bool(message.skip_ante_handler);
    }
    if (message.skip_post_handler === true) {
      writer.uint32(16).bool(message.skip_post_handler);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Config {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.skip_ante_handler = reader.bool();
          break;
        case 2:
          message.skip_post_handler = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Config {
    return {
      skip_ante_handler: isSet(object.skip_ante_handler)
        ? Boolean(object.skip_ante_handler)
        : false,
      skip_post_handler: isSet(object.skip_post_handler)
        ? Boolean(object.skip_post_handler)
        : false,
    };
  },

  toJSON(message: Config): unknown {
    const obj: any = {};
    message.skip_ante_handler !== undefined &&
      (obj.skip_ante_handler = message.skip_ante_handler);
    message.skip_post_handler !== undefined &&
      (obj.skip_post_handler = message.skip_post_handler);
    return obj;
  },

  fromPartial(object: DeepPartial<Config>): Config {
    const message = createBaseConfig();
    message.skip_ante_handler = object.skip_ante_handler ?? false;
    message.skip_post_handler = object.skip_post_handler ?? false;
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
