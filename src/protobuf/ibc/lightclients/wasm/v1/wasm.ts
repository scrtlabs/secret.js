/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Height } from "../../../core/client/v1/client";

export const protobufPackage = "ibc.lightclients.wasm.v1";

/** Wasm light client's Client state */
export interface ClientState {
  /**
   * bytes encoding the client state of the underlying light client
   * implemented as a Wasm contract.
   */
  data: Uint8Array;
  checksum: Uint8Array;
  latest_height?: Height;
}

/** Wasm light client's ConsensusState */
export interface ConsensusState {
  /**
   * bytes encoding the consensus state of the underlying light client
   * implemented as a Wasm contract.
   */
  data: Uint8Array;
}

/** Wasm light client message (either header(s) or misbehaviour) */
export interface ClientMessage {
  data: Uint8Array;
}

/**
 * Checksums defines a list of all checksums that are stored
 *
 * Deprecated: This message is deprecated in favor of storing the checksums
 * using a Collections.KeySet.
 *
 * @deprecated
 */
export interface Checksums {
  checksums: Uint8Array[];
}

function createBaseClientState(): ClientState {
  return {
    data: new Uint8Array(),
    checksum: new Uint8Array(),
    latest_height: undefined,
  };
}

export const ClientState = {
  encode(
    message: ClientState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.checksum.length !== 0) {
      writer.uint32(18).bytes(message.checksum);
    }
    if (message.latest_height !== undefined) {
      Height.encode(message.latest_height, writer.uint32(26).fork()).ldelim();
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
          message.data = reader.bytes();
          break;
        case 2:
          message.checksum = reader.bytes();
          break;
        case 3:
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
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      checksum: isSet(object.checksum)
        ? bytesFromBase64(object.checksum)
        : new Uint8Array(),
      latest_height: isSet(object.latest_height)
        ? Height.fromJSON(object.latest_height)
        : undefined,
    };
  },

  toJSON(message: ClientState): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    message.checksum !== undefined &&
      (obj.checksum = base64FromBytes(
        message.checksum !== undefined ? message.checksum : new Uint8Array(),
      ));
    message.latest_height !== undefined &&
      (obj.latest_height = message.latest_height
        ? Height.toJSON(message.latest_height)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ClientState>): ClientState {
    const message = createBaseClientState();
    message.data = object.data ?? new Uint8Array();
    message.checksum = object.checksum ?? new Uint8Array();
    message.latest_height =
      object.latest_height !== undefined && object.latest_height !== null
        ? Height.fromPartial(object.latest_height)
        : undefined;
    return message;
  },
};

function createBaseConsensusState(): ConsensusState {
  return { data: new Uint8Array() };
}

export const ConsensusState = {
  encode(
    message: ConsensusState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensusState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsensusState {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: ConsensusState): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<ConsensusState>): ConsensusState {
    const message = createBaseConsensusState();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseClientMessage(): ClientMessage {
  return { data: new Uint8Array() };
}

export const ClientMessage = {
  encode(
    message: ClientMessage,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClientMessage {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: ClientMessage): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<ClientMessage>): ClientMessage {
    const message = createBaseClientMessage();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseChecksums(): Checksums {
  return { checksums: [] };
}

export const Checksums = {
  encode(
    message: Checksums,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.checksums) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Checksums {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChecksums();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.checksums.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Checksums {
    return {
      checksums: Array.isArray(object?.checksums)
        ? object.checksums.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: Checksums): unknown {
    const obj: any = {};
    if (message.checksums) {
      obj.checksums = message.checksums.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.checksums = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Checksums>): Checksums {
    const message = createBaseChecksums();
    message.checksums = object.checksums?.map((e) => e) || [];
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
