/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Height } from "../../../core/client/v1/client";

export const protobufPackage = "ibc.lightclients.localhost.v2";

/** ClientState defines the 09-localhost client state */
export interface ClientState {
  /** the latest block height */
  latest_height?: Height;
}

function createBaseClientState(): ClientState {
  return { latest_height: undefined };
}

export const ClientState = {
  encode(
    message: ClientState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.latest_height !== undefined) {
      Height.encode(message.latest_height, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.latest_height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClientState {
    return {
      latest_height: isSet(object.latest_height)
        ? Height.fromJSON(object.latest_height)
        : undefined,
    };
  },

  toJSON(message: ClientState): unknown {
    const obj: any = {};
    message.latest_height !== undefined &&
      (obj.latest_height = message.latest_height
        ? Height.toJSON(message.latest_height)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ClientState>): ClientState {
    const message = createBaseClientState();
    message.latest_height =
      object.latest_height !== undefined && object.latest_height !== null
        ? Height.fromPartial(object.latest_height)
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
