/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { ResponseCheckTx, ResponseDeliverTx } from "../../abci/types";

export const protobufPackage = "tendermint.rpc.grpc";

export interface RequestPing {}

export interface RequestBroadcastTx {
  tx: Uint8Array;
}

export interface ResponsePing {}

export interface ResponseBroadcastTx {
  check_tx?: ResponseCheckTx;
  deliver_tx?: ResponseDeliverTx;
}

function createBaseRequestPing(): RequestPing {
  return {};
}

export const RequestPing = {
  encode(_: RequestPing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestPing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestPing();
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

  fromJSON(_: any): RequestPing {
    return {};
  },

  toJSON(_: RequestPing): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestPing>, I>>(_: I): RequestPing {
    const message = createBaseRequestPing();
    return message;
  },
};

function createBaseRequestBroadcastTx(): RequestBroadcastTx {
  return { tx: new Uint8Array() };
}

export const RequestBroadcastTx = {
  encode(
    message: RequestBroadcastTx,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.tx.length !== 0) {
      writer.uint32(10).bytes(message.tx);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestBroadcastTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestBroadcastTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestBroadcastTx {
    return {
      tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(),
    };
  },

  toJSON(message: RequestBroadcastTx): unknown {
    const obj: any = {};
    message.tx !== undefined &&
      (obj.tx = base64FromBytes(
        message.tx !== undefined ? message.tx : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestBroadcastTx>, I>>(
    object: I,
  ): RequestBroadcastTx {
    const message = createBaseRequestBroadcastTx();
    message.tx = object.tx ?? new Uint8Array();
    return message;
  },
};

function createBaseResponsePing(): ResponsePing {
  return {};
}

export const ResponsePing = {
  encode(
    _: ResponsePing,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponsePing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponsePing();
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

  fromJSON(_: any): ResponsePing {
    return {};
  },

  toJSON(_: ResponsePing): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponsePing>, I>>(
    _: I,
  ): ResponsePing {
    const message = createBaseResponsePing();
    return message;
  },
};

function createBaseResponseBroadcastTx(): ResponseBroadcastTx {
  return { check_tx: undefined, deliver_tx: undefined };
}

export const ResponseBroadcastTx = {
  encode(
    message: ResponseBroadcastTx,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.check_tx !== undefined) {
      ResponseCheckTx.encode(
        message.check_tx,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.deliver_tx !== undefined) {
      ResponseDeliverTx.encode(
        message.deliver_tx,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseBroadcastTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseBroadcastTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.check_tx = ResponseCheckTx.decode(reader, reader.uint32());
          break;
        case 2:
          message.deliver_tx = ResponseDeliverTx.decode(
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

  fromJSON(object: any): ResponseBroadcastTx {
    return {
      check_tx: isSet(object.check_tx)
        ? ResponseCheckTx.fromJSON(object.check_tx)
        : undefined,
      deliver_tx: isSet(object.deliver_tx)
        ? ResponseDeliverTx.fromJSON(object.deliver_tx)
        : undefined,
    };
  },

  toJSON(message: ResponseBroadcastTx): unknown {
    const obj: any = {};
    message.check_tx !== undefined &&
      (obj.check_tx = message.check_tx
        ? ResponseCheckTx.toJSON(message.check_tx)
        : undefined);
    message.deliver_tx !== undefined &&
      (obj.deliver_tx = message.deliver_tx
        ? ResponseDeliverTx.toJSON(message.deliver_tx)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseBroadcastTx>, I>>(
    object: I,
  ): ResponseBroadcastTx {
    const message = createBaseResponseBroadcastTx();
    message.check_tx =
      object.check_tx !== undefined && object.check_tx !== null
        ? ResponseCheckTx.fromPartial(object.check_tx)
        : undefined;
    message.deliver_tx =
      object.deliver_tx !== undefined && object.deliver_tx !== null
        ? ResponseDeliverTx.fromPartial(object.deliver_tx)
        : undefined;
    return message;
  },
};

export interface BroadcastAPI {
  Ping(request: RequestPing): Promise<ResponsePing>;
  BroadcastTx(request: RequestBroadcastTx): Promise<ResponseBroadcastTx>;
}

export class BroadcastAPIClientImpl implements BroadcastAPI {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Ping = this.Ping.bind(this);
    this.BroadcastTx = this.BroadcastTx.bind(this);
  }
  Ping(request: RequestPing): Promise<ResponsePing> {
    const data = RequestPing.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.rpc.grpc.BroadcastAPI",
      "Ping",
      data,
    );
    return promise.then((data) => ResponsePing.decode(new _m0.Reader(data)));
  }

  BroadcastTx(request: RequestBroadcastTx): Promise<ResponseBroadcastTx> {
    const data = RequestBroadcastTx.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.rpc.grpc.BroadcastAPI",
      "BroadcastTx",
      data,
    );
    return promise.then((data) =>
      ResponseBroadcastTx.decode(new _m0.Reader(data)),
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

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
