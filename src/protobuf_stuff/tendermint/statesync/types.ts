/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "tendermint.statesync";

export interface Message {
  snapshotsRequest?: SnapshotsRequest | undefined;
  snapshotsResponse?: SnapshotsResponse | undefined;
  chunkRequest?: ChunkRequest | undefined;
  chunkResponse?: ChunkResponse | undefined;
}

export interface SnapshotsRequest {}

export interface SnapshotsResponse {
  height: string;
  format: number;
  chunks: number;
  hash: Uint8Array;
  metadata: Uint8Array;
}

export interface ChunkRequest {
  height: string;
  format: number;
  index: number;
}

export interface ChunkResponse {
  height: string;
  format: number;
  index: number;
  chunk: Uint8Array;
  missing: boolean;
}

function createBaseMessage(): Message {
  return {
    snapshotsRequest: undefined,
    snapshotsResponse: undefined,
    chunkRequest: undefined,
    chunkResponse: undefined,
  };
}

export const Message = {
  encode(
    message: Message,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.snapshotsRequest !== undefined) {
      SnapshotsRequest.encode(
        message.snapshotsRequest,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.snapshotsResponse !== undefined) {
      SnapshotsResponse.encode(
        message.snapshotsResponse,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.chunkRequest !== undefined) {
      ChunkRequest.encode(
        message.chunkRequest,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.chunkResponse !== undefined) {
      ChunkResponse.encode(
        message.chunkResponse,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.snapshotsRequest = SnapshotsRequest.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.snapshotsResponse = SnapshotsResponse.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 3:
          message.chunkRequest = ChunkRequest.decode(reader, reader.uint32());
          break;
        case 4:
          message.chunkResponse = ChunkResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      snapshotsRequest: isSet(object.snapshotsRequest)
        ? SnapshotsRequest.fromJSON(object.snapshotsRequest)
        : undefined,
      snapshotsResponse: isSet(object.snapshotsResponse)
        ? SnapshotsResponse.fromJSON(object.snapshotsResponse)
        : undefined,
      chunkRequest: isSet(object.chunkRequest)
        ? ChunkRequest.fromJSON(object.chunkRequest)
        : undefined,
      chunkResponse: isSet(object.chunkResponse)
        ? ChunkResponse.fromJSON(object.chunkResponse)
        : undefined,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.snapshotsRequest !== undefined &&
      (obj.snapshotsRequest = message.snapshotsRequest
        ? SnapshotsRequest.toJSON(message.snapshotsRequest)
        : undefined);
    message.snapshotsResponse !== undefined &&
      (obj.snapshotsResponse = message.snapshotsResponse
        ? SnapshotsResponse.toJSON(message.snapshotsResponse)
        : undefined);
    message.chunkRequest !== undefined &&
      (obj.chunkRequest = message.chunkRequest
        ? ChunkRequest.toJSON(message.chunkRequest)
        : undefined);
    message.chunkResponse !== undefined &&
      (obj.chunkResponse = message.chunkResponse
        ? ChunkResponse.toJSON(message.chunkResponse)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.snapshotsRequest =
      object.snapshotsRequest !== undefined && object.snapshotsRequest !== null
        ? SnapshotsRequest.fromPartial(object.snapshotsRequest)
        : undefined;
    message.snapshotsResponse =
      object.snapshotsResponse !== undefined &&
      object.snapshotsResponse !== null
        ? SnapshotsResponse.fromPartial(object.snapshotsResponse)
        : undefined;
    message.chunkRequest =
      object.chunkRequest !== undefined && object.chunkRequest !== null
        ? ChunkRequest.fromPartial(object.chunkRequest)
        : undefined;
    message.chunkResponse =
      object.chunkResponse !== undefined && object.chunkResponse !== null
        ? ChunkResponse.fromPartial(object.chunkResponse)
        : undefined;
    return message;
  },
};

function createBaseSnapshotsRequest(): SnapshotsRequest {
  return {};
}

export const SnapshotsRequest = {
  encode(
    _: SnapshotsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): SnapshotsRequest {
    return {};
  },

  toJSON(_: SnapshotsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SnapshotsRequest>, I>>(
    _: I,
  ): SnapshotsRequest {
    const message = createBaseSnapshotsRequest();
    return message;
  },
};

function createBaseSnapshotsResponse(): SnapshotsResponse {
  return {
    height: "0",
    format: 0,
    chunks: 0,
    hash: new Uint8Array(),
    metadata: new Uint8Array(),
  };
}

export const SnapshotsResponse = {
  encode(
    message: SnapshotsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.chunks !== 0) {
      writer.uint32(24).uint32(message.chunks);
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(42).bytes(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.format = reader.uint32();
          break;
        case 3:
          message.chunks = reader.uint32();
          break;
        case 4:
          message.hash = reader.bytes();
          break;
        case 5:
          message.metadata = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SnapshotsResponse {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      format: isSet(object.format) ? Number(object.format) : 0,
      chunks: isSet(object.chunks) ? Number(object.chunks) : 0,
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
      metadata: isSet(object.metadata)
        ? bytesFromBase64(object.metadata)
        : new Uint8Array(),
    };
  },

  toJSON(message: SnapshotsResponse): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.format !== undefined && (obj.format = Math.round(message.format));
    message.chunks !== undefined && (obj.chunks = Math.round(message.chunks));
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array(),
      ));
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SnapshotsResponse>, I>>(
    object: I,
  ): SnapshotsResponse {
    const message = createBaseSnapshotsResponse();
    message.height = object.height ?? "0";
    message.format = object.format ?? 0;
    message.chunks = object.chunks ?? 0;
    message.hash = object.hash ?? new Uint8Array();
    message.metadata = object.metadata ?? new Uint8Array();
    return message;
  },
};

function createBaseChunkRequest(): ChunkRequest {
  return { height: "0", format: 0, index: 0 };
}

export const ChunkRequest = {
  encode(
    message: ChunkRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.index !== 0) {
      writer.uint32(24).uint32(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChunkRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChunkRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.format = reader.uint32();
          break;
        case 3:
          message.index = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChunkRequest {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      format: isSet(object.format) ? Number(object.format) : 0,
      index: isSet(object.index) ? Number(object.index) : 0,
    };
  },

  toJSON(message: ChunkRequest): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.format !== undefined && (obj.format = Math.round(message.format));
    message.index !== undefined && (obj.index = Math.round(message.index));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChunkRequest>, I>>(
    object: I,
  ): ChunkRequest {
    const message = createBaseChunkRequest();
    message.height = object.height ?? "0";
    message.format = object.format ?? 0;
    message.index = object.index ?? 0;
    return message;
  },
};

function createBaseChunkResponse(): ChunkResponse {
  return {
    height: "0",
    format: 0,
    index: 0,
    chunk: new Uint8Array(),
    missing: false,
  };
}

export const ChunkResponse = {
  encode(
    message: ChunkResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.index !== 0) {
      writer.uint32(24).uint32(message.index);
    }
    if (message.chunk.length !== 0) {
      writer.uint32(34).bytes(message.chunk);
    }
    if (message.missing === true) {
      writer.uint32(40).bool(message.missing);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChunkResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChunkResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.format = reader.uint32();
          break;
        case 3:
          message.index = reader.uint32();
          break;
        case 4:
          message.chunk = reader.bytes();
          break;
        case 5:
          message.missing = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChunkResponse {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      format: isSet(object.format) ? Number(object.format) : 0,
      index: isSet(object.index) ? Number(object.index) : 0,
      chunk: isSet(object.chunk)
        ? bytesFromBase64(object.chunk)
        : new Uint8Array(),
      missing: isSet(object.missing) ? Boolean(object.missing) : false,
    };
  },

  toJSON(message: ChunkResponse): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.format !== undefined && (obj.format = Math.round(message.format));
    message.index !== undefined && (obj.index = Math.round(message.index));
    message.chunk !== undefined &&
      (obj.chunk = base64FromBytes(
        message.chunk !== undefined ? message.chunk : new Uint8Array(),
      ));
    message.missing !== undefined && (obj.missing = message.missing);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChunkResponse>, I>>(
    object: I,
  ): ChunkResponse {
    const message = createBaseChunkResponse();
    message.height = object.height ?? "0";
    message.format = object.format ?? 0;
    message.index = object.index ?? 0;
    message.chunk = object.chunk ?? new Uint8Array();
    message.missing = object.missing ?? false;
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
