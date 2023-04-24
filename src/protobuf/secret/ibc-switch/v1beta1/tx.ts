/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "secret.ibcswitch.v1beta1";

/** MsgToggleSwitch represents a message to toggle the ibc-switch status by the defined pauser. */
export interface MsgToggleSwitch {
  sender: Uint8Array;
}

/** MsgSendResponse defines the response type for the toggle. */
export interface MsgToggleSwitchResponse {}

function createBaseMsgToggleSwitch(): MsgToggleSwitch {
  return { sender: new Uint8Array() };
}

export const MsgToggleSwitch = {
  encode(
    message: MsgToggleSwitch,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender.length !== 0) {
      writer.uint32(10).bytes(message.sender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgToggleSwitch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleSwitch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgToggleSwitch {
    return {
      sender: isSet(object.sender)
        ? bytesFromBase64(object.sender)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgToggleSwitch): unknown {
    const obj: any = {};
    message.sender !== undefined &&
      (obj.sender = base64FromBytes(
        message.sender !== undefined ? message.sender : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleSwitch>, I>>(
    object: I,
  ): MsgToggleSwitch {
    const message = createBaseMsgToggleSwitch();
    message.sender = object.sender ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgToggleSwitchResponse(): MsgToggleSwitchResponse {
  return {};
}

export const MsgToggleSwitchResponse = {
  encode(
    _: MsgToggleSwitchResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgToggleSwitchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleSwitchResponse();
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

  fromJSON(_: any): MsgToggleSwitchResponse {
    return {};
  },

  toJSON(_: MsgToggleSwitchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleSwitchResponse>, I>>(
    _: I,
  ): MsgToggleSwitchResponse {
    const message = createBaseMsgToggleSwitchResponse();
    return message;
  },
};

/** Msg defines the bank Msg service. */
export interface Msg {
  /** ToggleSwitch defines a method for toggling the status of the ibc-switch. */
  ToggleSwitch(request: MsgToggleSwitch): Promise<MsgToggleSwitchResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ToggleSwitch = this.ToggleSwitch.bind(this);
  }
  ToggleSwitch(request: MsgToggleSwitch): Promise<MsgToggleSwitchResponse> {
    const data = MsgToggleSwitch.encode(request).finish();
    const promise = this.rpc.request(
      "secret.ibcswitch.v1beta1.Msg",
      "ToggleSwitch",
      data,
    );
    return promise.then((data) =>
      MsgToggleSwitchResponse.decode(new _m0.Reader(data)),
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
