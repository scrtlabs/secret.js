/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { MasterKey } from "./msg";
import { RegistrationNodeInfo } from "./types";

export const protobufPackage = "secret.registration.v1beta1";

export interface GenesisState {
  registration: RegistrationNodeInfo[];
  node_exch_master_key?: MasterKey;
  io_master_key?: MasterKey;
}

function createBaseGenesisState(): GenesisState {
  return {
    registration: [],
    node_exch_master_key: undefined,
    io_master_key: undefined,
  };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.registration) {
      RegistrationNodeInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.node_exch_master_key !== undefined) {
      MasterKey.encode(
        message.node_exch_master_key,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.io_master_key !== undefined) {
      MasterKey.encode(
        message.io_master_key,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.registration.push(
            RegistrationNodeInfo.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.node_exch_master_key = MasterKey.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 3:
          message.io_master_key = MasterKey.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      registration: Array.isArray(object?.registration)
        ? object.registration.map((e: any) => RegistrationNodeInfo.fromJSON(e))
        : [],
      node_exch_master_key: isSet(object.node_exch_master_key)
        ? MasterKey.fromJSON(object.node_exch_master_key)
        : undefined,
      io_master_key: isSet(object.io_master_key)
        ? MasterKey.fromJSON(object.io_master_key)
        : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.registration) {
      obj.registration = message.registration.map((e) =>
        e ? RegistrationNodeInfo.toJSON(e) : undefined,
      );
    } else {
      obj.registration = [];
    }
    message.node_exch_master_key !== undefined &&
      (obj.node_exch_master_key = message.node_exch_master_key
        ? MasterKey.toJSON(message.node_exch_master_key)
        : undefined);
    message.io_master_key !== undefined &&
      (obj.io_master_key = message.io_master_key
        ? MasterKey.toJSON(message.io_master_key)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I,
  ): GenesisState {
    const message = createBaseGenesisState();
    message.registration =
      object.registration?.map((e) => RegistrationNodeInfo.fromPartial(e)) ||
      [];
    message.node_exch_master_key =
      object.node_exch_master_key !== undefined &&
      object.node_exch_master_key !== null
        ? MasterKey.fromPartial(object.node_exch_master_key)
        : undefined;
    message.io_master_key =
      object.io_master_key !== undefined && object.io_master_key !== null
        ? MasterKey.fromPartial(object.io_master_key)
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
