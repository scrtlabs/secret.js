/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "ibc.applications.interchain_accounts.v1";

/**
 * Metadata defines a set of protocol specific data encoded into the ICS27 channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
export interface Metadata {
  /** version defines the ICS27 protocol version */
  version: string;
  /** controller_connection_id is the connection identifier associated with the controller chain */
  controller_connection_id: string;
  /** host_connection_id is the connection identifier associated with the host chain */
  host_connection_id: string;
  /**
   * address defines the interchain account address to be fulfilled upon the OnChanOpenTry handshake step
   * NOTE: the address field is empty on the OnChanOpenInit handshake step
   */
  address: string;
  /** encoding defines the supported codec format */
  encoding: string;
  /** tx_type defines the type of transactions the interchain account can execute */
  tx_type: string;
}

function createBaseMetadata(): Metadata {
  return {
    version: "",
    controller_connection_id: "",
    host_connection_id: "",
    address: "",
    encoding: "",
    tx_type: "",
  };
}

export const Metadata = {
  encode(
    message: Metadata,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.controller_connection_id !== "") {
      writer.uint32(18).string(message.controller_connection_id);
    }
    if (message.host_connection_id !== "") {
      writer.uint32(26).string(message.host_connection_id);
    }
    if (message.address !== "") {
      writer.uint32(34).string(message.address);
    }
    if (message.encoding !== "") {
      writer.uint32(42).string(message.encoding);
    }
    if (message.tx_type !== "") {
      writer.uint32(50).string(message.tx_type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        case 2:
          message.controller_connection_id = reader.string();
          break;
        case 3:
          message.host_connection_id = reader.string();
          break;
        case 4:
          message.address = reader.string();
          break;
        case 5:
          message.encoding = reader.string();
          break;
        case 6:
          message.tx_type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    return {
      version: isSet(object.version) ? String(object.version) : "",
      controller_connection_id: isSet(object.controller_connection_id)
        ? String(object.controller_connection_id)
        : "",
      host_connection_id: isSet(object.host_connection_id)
        ? String(object.host_connection_id)
        : "",
      address: isSet(object.address) ? String(object.address) : "",
      encoding: isSet(object.encoding) ? String(object.encoding) : "",
      tx_type: isSet(object.tx_type) ? String(object.tx_type) : "",
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.controller_connection_id !== undefined &&
      (obj.controller_connection_id = message.controller_connection_id);
    message.host_connection_id !== undefined &&
      (obj.host_connection_id = message.host_connection_id);
    message.address !== undefined && (obj.address = message.address);
    message.encoding !== undefined && (obj.encoding = message.encoding);
    message.tx_type !== undefined && (obj.tx_type = message.tx_type);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.version = object.version ?? "";
    message.controller_connection_id = object.controller_connection_id ?? "";
    message.host_connection_id = object.host_connection_id ?? "";
    message.address = object.address ?? "";
    message.encoding = object.encoding ?? "";
    message.tx_type = object.tx_type ?? "";
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
