/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "tendermint.mempool";

export interface Txs {
  txs: Uint8Array[];
}

export interface Message {
  txs?: Txs | undefined;
}

function createBaseTxs(): Txs {
  return { txs: [] };
}

export const Txs = {
  encode(message: Txs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Txs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Txs {
    return {
      txs: Array.isArray(object?.txs)
        ? object.txs.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: Txs): unknown {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.txs = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Txs>): Txs {
    const message = createBaseTxs();
    message.txs = object.txs?.map((e) => e) || [];
    return message;
  },
};

function createBaseMessage(): Message {
  return { txs: undefined };
}

export const Message = {
  encode(
    message: Message,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.txs !== undefined) {
      Txs.encode(message.txs, writer.uint32(10).fork()).ldelim();
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
          message.txs = Txs.decode(reader, reader.uint32());
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
      txs: isSet(object.txs) ? Txs.fromJSON(object.txs) : undefined,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.txs !== undefined &&
      (obj.txs = message.txs ? Txs.toJSON(message.txs) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Message>): Message {
    const message = createBaseMessage();
    message.txs =
      object.txs !== undefined && object.txs !== null
        ? Txs.fromPartial(object.txs)
        : undefined;
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
