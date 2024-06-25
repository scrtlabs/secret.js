/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Duration } from "../../../../google/protobuf/duration";

export const protobufPackage = "cosmos.group.module.v1";

/** Module is the config object of the group module. */
export interface Module {
  /**
   * max_execution_period defines the max duration after a proposal's voting period ends that members can send a MsgExec
   * to execute the proposal.
   */
  max_execution_period?: Duration;
  /**
   * max_metadata_len defines the max length of the metadata bytes field for various entities within the group module.
   * Defaults to 255 if not explicitly set.
   */
  max_metadata_len: string;
}

function createBaseModule(): Module {
  return { max_execution_period: undefined, max_metadata_len: "0" };
}

export const Module = {
  encode(
    message: Module,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.max_execution_period !== undefined) {
      Duration.encode(
        message.max_execution_period,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.max_metadata_len !== "0") {
      writer.uint32(16).uint64(message.max_metadata_len);
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
          message.max_execution_period = Duration.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.max_metadata_len = longToString(reader.uint64() as Long);
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
      max_execution_period: isSet(object.max_execution_period)
        ? Duration.fromJSON(object.max_execution_period)
        : undefined,
      max_metadata_len: isSet(object.max_metadata_len)
        ? String(object.max_metadata_len)
        : "0",
    };
  },

  toJSON(message: Module): unknown {
    const obj: any = {};
    message.max_execution_period !== undefined &&
      (obj.max_execution_period = message.max_execution_period
        ? Duration.toJSON(message.max_execution_period)
        : undefined);
    message.max_metadata_len !== undefined &&
      (obj.max_metadata_len = message.max_metadata_len);
    return obj;
  },

  fromPartial(object: DeepPartial<Module>): Module {
    const message = createBaseModule();
    message.max_execution_period =
      object.max_execution_period !== undefined &&
      object.max_execution_period !== null
        ? Duration.fromPartial(object.max_execution_period)
        : undefined;
    message.max_metadata_len = object.max_metadata_len ?? "0";
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
