/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { PublicKey } from "../../tendermint/crypto/keys";

export const protobufPackage = "tendermint.p2p";

export interface PacketPing {}

export interface PacketPong {}

export interface PacketMsg {
  channelId: number;
  eof: boolean;
  data: Uint8Array;
}

export interface Packet {
  packetPing?: PacketPing | undefined;
  packetPong?: PacketPong | undefined;
  packetMsg?: PacketMsg | undefined;
}

export interface AuthSigMessage {
  pubKey?: PublicKey;
  sig: Uint8Array;
}

function createBasePacketPing(): PacketPing {
  return {};
}

export const PacketPing = {
  encode(_: PacketPing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PacketPing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketPing();
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

  fromJSON(_: any): PacketPing {
    return {};
  },

  toJSON(_: PacketPing): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PacketPing>, I>>(_: I): PacketPing {
    const message = createBasePacketPing();
    return message;
  },
};

function createBasePacketPong(): PacketPong {
  return {};
}

export const PacketPong = {
  encode(_: PacketPong, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PacketPong {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketPong();
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

  fromJSON(_: any): PacketPong {
    return {};
  },

  toJSON(_: PacketPong): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PacketPong>, I>>(_: I): PacketPong {
    const message = createBasePacketPong();
    return message;
  },
};

function createBasePacketMsg(): PacketMsg {
  return { channelId: 0, eof: false, data: new Uint8Array() };
}

export const PacketMsg = {
  encode(
    message: PacketMsg,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.channelId !== 0) {
      writer.uint32(8).int32(message.channelId);
    }
    if (message.eof === true) {
      writer.uint32(16).bool(message.eof);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PacketMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = reader.int32();
          break;
        case 2:
          message.eof = reader.bool();
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PacketMsg {
    return {
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      eof: isSet(object.eof) ? Boolean(object.eof) : false,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: PacketMsg): unknown {
    const obj: any = {};
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.eof !== undefined && (obj.eof = message.eof);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PacketMsg>, I>>(
    object: I,
  ): PacketMsg {
    const message = createBasePacketMsg();
    message.channelId = object.channelId ?? 0;
    message.eof = object.eof ?? false;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBasePacket(): Packet {
  return { packetPing: undefined, packetPong: undefined, packetMsg: undefined };
}

export const Packet = {
  encode(
    message: Packet,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.packetPing !== undefined) {
      PacketPing.encode(message.packetPing, writer.uint32(10).fork()).ldelim();
    }
    if (message.packetPong !== undefined) {
      PacketPong.encode(message.packetPong, writer.uint32(18).fork()).ldelim();
    }
    if (message.packetMsg !== undefined) {
      PacketMsg.encode(message.packetMsg, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Packet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packetPing = PacketPing.decode(reader, reader.uint32());
          break;
        case 2:
          message.packetPong = PacketPong.decode(reader, reader.uint32());
          break;
        case 3:
          message.packetMsg = PacketMsg.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Packet {
    return {
      packetPing: isSet(object.packetPing)
        ? PacketPing.fromJSON(object.packetPing)
        : undefined,
      packetPong: isSet(object.packetPong)
        ? PacketPong.fromJSON(object.packetPong)
        : undefined,
      packetMsg: isSet(object.packetMsg)
        ? PacketMsg.fromJSON(object.packetMsg)
        : undefined,
    };
  },

  toJSON(message: Packet): unknown {
    const obj: any = {};
    message.packetPing !== undefined &&
      (obj.packetPing = message.packetPing
        ? PacketPing.toJSON(message.packetPing)
        : undefined);
    message.packetPong !== undefined &&
      (obj.packetPong = message.packetPong
        ? PacketPong.toJSON(message.packetPong)
        : undefined);
    message.packetMsg !== undefined &&
      (obj.packetMsg = message.packetMsg
        ? PacketMsg.toJSON(message.packetMsg)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Packet>, I>>(object: I): Packet {
    const message = createBasePacket();
    message.packetPing =
      object.packetPing !== undefined && object.packetPing !== null
        ? PacketPing.fromPartial(object.packetPing)
        : undefined;
    message.packetPong =
      object.packetPong !== undefined && object.packetPong !== null
        ? PacketPong.fromPartial(object.packetPong)
        : undefined;
    message.packetMsg =
      object.packetMsg !== undefined && object.packetMsg !== null
        ? PacketMsg.fromPartial(object.packetMsg)
        : undefined;
    return message;
  },
};

function createBaseAuthSigMessage(): AuthSigMessage {
  return { pubKey: undefined, sig: new Uint8Array() };
}

export const AuthSigMessage = {
  encode(
    message: AuthSigMessage,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pubKey !== undefined) {
      PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.sig.length !== 0) {
      writer.uint32(18).bytes(message.sig);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthSigMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthSigMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pubKey = PublicKey.decode(reader, reader.uint32());
          break;
        case 2:
          message.sig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthSigMessage {
    return {
      pubKey: isSet(object.pubKey)
        ? PublicKey.fromJSON(object.pubKey)
        : undefined,
      sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(),
    };
  },

  toJSON(message: AuthSigMessage): unknown {
    const obj: any = {};
    message.pubKey !== undefined &&
      (obj.pubKey = message.pubKey
        ? PublicKey.toJSON(message.pubKey)
        : undefined);
    message.sig !== undefined &&
      (obj.sig = base64FromBytes(
        message.sig !== undefined ? message.sig : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthSigMessage>, I>>(
    object: I,
  ): AuthSigMessage {
    const message = createBaseAuthSigMessage();
    message.pubKey =
      object.pubKey !== undefined && object.pubKey !== null
        ? PublicKey.fromPartial(object.pubKey)
        : undefined;
    message.sig = object.sig ?? new Uint8Array();
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
