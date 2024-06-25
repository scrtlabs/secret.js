/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "cosmos.store.v1beta1";

/**
 * CommitInfo defines commit information used by the multi-store when committing
 * a version/height.
 */
export interface CommitInfo {
  version: string;
  store_infos: StoreInfo[];
  timestamp?: Timestamp;
}

/**
 * StoreInfo defines store-specific commit information. It contains a reference
 * between a store name and the commit ID.
 */
export interface StoreInfo {
  name: string;
  commit_id?: CommitID;
}

/**
 * CommitID defines the commitment information when a specific store is
 * committed.
 */
export interface CommitID {
  version: string;
  hash: Uint8Array;
}

function createBaseCommitInfo(): CommitInfo {
  return { version: "0", store_infos: [], timestamp: undefined };
}

export const CommitInfo = {
  encode(
    message: CommitInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.version !== "0") {
      writer.uint32(8).int64(message.version);
    }
    for (const v of message.store_infos) {
      StoreInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(message.timestamp, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = longToString(reader.int64() as Long);
          break;
        case 2:
          message.store_infos.push(StoreInfo.decode(reader, reader.uint32()));
          break;
        case 3:
          message.timestamp = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommitInfo {
    return {
      version: isSet(object.version) ? String(object.version) : "0",
      store_infos: Array.isArray(object?.store_infos)
        ? object.store_infos.map((e: any) => StoreInfo.fromJSON(e))
        : [],
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
    };
  },

  toJSON(message: CommitInfo): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    if (message.store_infos) {
      obj.store_infos = message.store_infos.map((e) =>
        e ? StoreInfo.toJSON(e) : undefined,
      );
    } else {
      obj.store_infos = [];
    }
    message.timestamp !== undefined &&
      (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<CommitInfo>): CommitInfo {
    const message = createBaseCommitInfo();
    message.version = object.version ?? "0";
    message.store_infos =
      object.store_infos?.map((e) => StoreInfo.fromPartial(e)) || [];
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Timestamp.fromPartial(object.timestamp)
        : undefined;
    return message;
  },
};

function createBaseStoreInfo(): StoreInfo {
  return { name: "", commit_id: undefined };
}

export const StoreInfo = {
  encode(
    message: StoreInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.commit_id !== undefined) {
      CommitID.encode(message.commit_id, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.commit_id = CommitID.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoreInfo {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      commit_id: isSet(object.commit_id)
        ? CommitID.fromJSON(object.commit_id)
        : undefined,
    };
  },

  toJSON(message: StoreInfo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.commit_id !== undefined &&
      (obj.commit_id = message.commit_id
        ? CommitID.toJSON(message.commit_id)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<StoreInfo>): StoreInfo {
    const message = createBaseStoreInfo();
    message.name = object.name ?? "";
    message.commit_id =
      object.commit_id !== undefined && object.commit_id !== null
        ? CommitID.fromPartial(object.commit_id)
        : undefined;
    return message;
  },
};

function createBaseCommitID(): CommitID {
  return { version: "0", hash: new Uint8Array() };
}

export const CommitID = {
  encode(
    message: CommitID,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.version !== "0") {
      writer.uint32(8).int64(message.version);
    }
    if (message.hash.length !== 0) {
      writer.uint32(18).bytes(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitID {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = longToString(reader.int64() as Long);
          break;
        case 2:
          message.hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommitID {
    return {
      version: isSet(object.version) ? String(object.version) : "0",
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
    };
  },

  toJSON(message: CommitID): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<CommitID>): CommitID {
    const message = createBaseCommitID();
    message.version = object.version ?? "0";
    message.hash = object.hash ?? new Uint8Array();
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

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000).toString();
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = Number(t.seconds) * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Timestamp {
  if (o instanceof Date) {
    return toTimestamp(o);
  } else if (typeof o === "string") {
    return toTimestamp(new Date(o));
  } else {
    return Timestamp.fromJSON(o);
  }
}

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
