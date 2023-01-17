/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  SignedMsgType,
  signedMsgTypeFromJSON,
  signedMsgTypeToJSON,
} from "./types";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "tendermint.types";

export interface CanonicalBlockID {
  hash: Uint8Array;
  part_set_header?: CanonicalPartSetHeader;
}

export interface CanonicalPartSetHeader {
  total: number;
  hash: Uint8Array;
}

export interface CanonicalProposal {
  /** type alias for byte */
  type: SignedMsgType;
  /** canonicalization requires fixed size encoding here */
  height: string;
  /** canonicalization requires fixed size encoding here */
  round: string;
  pol_round: string;
  block_id?: CanonicalBlockID;
  timestamp?: Timestamp;
  chain_id: string;
}

export interface CanonicalVote {
  /** type alias for byte */
  type: SignedMsgType;
  /** canonicalization requires fixed size encoding here */
  height: string;
  /** canonicalization requires fixed size encoding here */
  round: string;
  block_id?: CanonicalBlockID;
  timestamp?: Timestamp;
  chain_id: string;
}

function createBaseCanonicalBlockID(): CanonicalBlockID {
  return { hash: new Uint8Array(), part_set_header: undefined };
}

export const CanonicalBlockID = {
  encode(
    message: CanonicalBlockID,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.part_set_header !== undefined) {
      CanonicalPartSetHeader.encode(
        message.part_set_header,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CanonicalBlockID {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalBlockID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes();
          break;
        case 2:
          message.part_set_header = CanonicalPartSetHeader.decode(
            reader,
            reader.uint32(),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CanonicalBlockID {
    return {
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
      part_set_header: isSet(object.part_set_header)
        ? CanonicalPartSetHeader.fromJSON(object.part_set_header)
        : undefined,
    };
  },

  toJSON(message: CanonicalBlockID): unknown {
    const obj: any = {};
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array(),
      ));
    message.part_set_header !== undefined &&
      (obj.part_set_header = message.part_set_header
        ? CanonicalPartSetHeader.toJSON(message.part_set_header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CanonicalBlockID>, I>>(
    object: I,
  ): CanonicalBlockID {
    const message = createBaseCanonicalBlockID();
    message.hash = object.hash ?? new Uint8Array();
    message.part_set_header =
      object.part_set_header !== undefined && object.part_set_header !== null
        ? CanonicalPartSetHeader.fromPartial(object.part_set_header)
        : undefined;
    return message;
  },
};

function createBaseCanonicalPartSetHeader(): CanonicalPartSetHeader {
  return { total: 0, hash: new Uint8Array() };
}

export const CanonicalPartSetHeader = {
  encode(
    message: CanonicalPartSetHeader,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).uint32(message.total);
    }
    if (message.hash.length !== 0) {
      writer.uint32(18).bytes(message.hash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): CanonicalPartSetHeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalPartSetHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.uint32();
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

  fromJSON(object: any): CanonicalPartSetHeader {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
    };
  },

  toJSON(message: CanonicalPartSetHeader): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = Math.round(message.total));
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CanonicalPartSetHeader>, I>>(
    object: I,
  ): CanonicalPartSetHeader {
    const message = createBaseCanonicalPartSetHeader();
    message.total = object.total ?? 0;
    message.hash = object.hash ?? new Uint8Array();
    return message;
  },
};

function createBaseCanonicalProposal(): CanonicalProposal {
  return {
    type: 0,
    height: "0",
    round: "0",
    pol_round: "0",
    block_id: undefined,
    timestamp: undefined,
    chain_id: "",
  };
}

export const CanonicalProposal = {
  encode(
    message: CanonicalProposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.height !== "0") {
      writer.uint32(17).sfixed64(message.height);
    }
    if (message.round !== "0") {
      writer.uint32(25).sfixed64(message.round);
    }
    if (message.pol_round !== "0") {
      writer.uint32(32).int64(message.pol_round);
    }
    if (message.block_id !== undefined) {
      CanonicalBlockID.encode(
        message.block_id,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(message.timestamp, writer.uint32(50).fork()).ldelim();
    }
    if (message.chain_id !== "") {
      writer.uint32(58).string(message.chain_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CanonicalProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.height = longToString(reader.sfixed64() as Long);
          break;
        case 3:
          message.round = longToString(reader.sfixed64() as Long);
          break;
        case 4:
          message.pol_round = longToString(reader.int64() as Long);
          break;
        case 5:
          message.block_id = CanonicalBlockID.decode(reader, reader.uint32());
          break;
        case 6:
          message.timestamp = Timestamp.decode(reader, reader.uint32());
          break;
        case 7:
          message.chain_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CanonicalProposal {
    return {
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? String(object.round) : "0",
      pol_round: isSet(object.pol_round) ? String(object.pol_round) : "0",
      block_id: isSet(object.block_id)
        ? CanonicalBlockID.fromJSON(object.block_id)
        : undefined,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      chain_id: isSet(object.chain_id) ? String(object.chain_id) : "",
    };
  },

  toJSON(message: CanonicalProposal): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = signedMsgTypeToJSON(message.type));
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = message.round);
    message.pol_round !== undefined && (obj.pol_round = message.pol_round);
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? CanonicalBlockID.toJSON(message.block_id)
        : undefined);
    message.timestamp !== undefined &&
      (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
    message.chain_id !== undefined && (obj.chain_id = message.chain_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CanonicalProposal>, I>>(
    object: I,
  ): CanonicalProposal {
    const message = createBaseCanonicalProposal();
    message.type = object.type ?? 0;
    message.height = object.height ?? "0";
    message.round = object.round ?? "0";
    message.pol_round = object.pol_round ?? "0";
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? CanonicalBlockID.fromPartial(object.block_id)
        : undefined;
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Timestamp.fromPartial(object.timestamp)
        : undefined;
    message.chain_id = object.chain_id ?? "";
    return message;
  },
};

function createBaseCanonicalVote(): CanonicalVote {
  return {
    type: 0,
    height: "0",
    round: "0",
    block_id: undefined,
    timestamp: undefined,
    chain_id: "",
  };
}

export const CanonicalVote = {
  encode(
    message: CanonicalVote,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.height !== "0") {
      writer.uint32(17).sfixed64(message.height);
    }
    if (message.round !== "0") {
      writer.uint32(25).sfixed64(message.round);
    }
    if (message.block_id !== undefined) {
      CanonicalBlockID.encode(
        message.block_id,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(message.timestamp, writer.uint32(42).fork()).ldelim();
    }
    if (message.chain_id !== "") {
      writer.uint32(50).string(message.chain_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CanonicalVote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.height = longToString(reader.sfixed64() as Long);
          break;
        case 3:
          message.round = longToString(reader.sfixed64() as Long);
          break;
        case 4:
          message.block_id = CanonicalBlockID.decode(reader, reader.uint32());
          break;
        case 5:
          message.timestamp = Timestamp.decode(reader, reader.uint32());
          break;
        case 6:
          message.chain_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CanonicalVote {
    return {
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? String(object.round) : "0",
      block_id: isSet(object.block_id)
        ? CanonicalBlockID.fromJSON(object.block_id)
        : undefined,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      chain_id: isSet(object.chain_id) ? String(object.chain_id) : "",
    };
  },

  toJSON(message: CanonicalVote): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = signedMsgTypeToJSON(message.type));
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = message.round);
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? CanonicalBlockID.toJSON(message.block_id)
        : undefined);
    message.timestamp !== undefined &&
      (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
    message.chain_id !== undefined && (obj.chain_id = message.chain_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CanonicalVote>, I>>(
    object: I,
  ): CanonicalVote {
    const message = createBaseCanonicalVote();
    message.type = object.type ?? 0;
    message.height = object.height ?? "0";
    message.round = object.round ?? "0";
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? CanonicalBlockID.fromPartial(object.block_id)
        : undefined;
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Timestamp.fromPartial(object.timestamp)
        : undefined;
    message.chain_id = object.chain_id ?? "";
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
