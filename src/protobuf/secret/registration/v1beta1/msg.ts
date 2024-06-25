/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "secret.registration.v1beta1";

export interface RaAuthenticate {
  /**
   * bytes sender = 1 [ (gogoproto.casttype) =
   *                        "github.com/cosmos/cosmos-sdk/types.AccAddress" ];
   */
  sender: string;
  certificate: Uint8Array;
  /**
   * string sender_address = 3 [ (cosmos_proto.scalar) = "cosmos.AddressString"
   * ];
   */
  sender_addr: Uint8Array;
}

export interface RaAuthenticateResponse {
  data: string;
  events: string;
}

export interface MasterKey {
  bytes: Uint8Array;
}

export interface Key {
  key: Uint8Array;
}

function createBaseRaAuthenticate(): RaAuthenticate {
  return {
    sender: "",
    certificate: new Uint8Array(),
    sender_addr: new Uint8Array(),
  };
}

export const RaAuthenticate = {
  encode(
    message: RaAuthenticate,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.certificate.length !== 0) {
      writer.uint32(18).bytes(message.certificate);
    }
    if (message.sender_addr.length !== 0) {
      writer.uint32(26).bytes(message.sender_addr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RaAuthenticate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRaAuthenticate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.certificate = reader.bytes();
          break;
        case 3:
          message.sender_addr = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RaAuthenticate {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      certificate: isSet(object.certificate)
        ? bytesFromBase64(object.certificate)
        : new Uint8Array(),
      sender_addr: isSet(object.sender_addr)
        ? bytesFromBase64(object.sender_addr)
        : new Uint8Array(),
    };
  },

  toJSON(message: RaAuthenticate): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.certificate !== undefined &&
      (obj.certificate = base64FromBytes(
        message.certificate !== undefined
          ? message.certificate
          : new Uint8Array(),
      ));
    message.sender_addr !== undefined &&
      (obj.sender_addr = base64FromBytes(
        message.sender_addr !== undefined
          ? message.sender_addr
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<RaAuthenticate>): RaAuthenticate {
    const message = createBaseRaAuthenticate();
    message.sender = object.sender ?? "";
    message.certificate = object.certificate ?? new Uint8Array();
    message.sender_addr = object.sender_addr ?? new Uint8Array();
    return message;
  },
};

function createBaseRaAuthenticateResponse(): RaAuthenticateResponse {
  return { data: "", events: "" };
}

export const RaAuthenticateResponse = {
  encode(
    message: RaAuthenticateResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    if (message.events !== "") {
      writer.uint32(18).string(message.events);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RaAuthenticateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRaAuthenticateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.string();
          break;
        case 2:
          message.events = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RaAuthenticateResponse {
    return {
      data: isSet(object.data) ? String(object.data) : "",
      events: isSet(object.events) ? String(object.events) : "",
    };
  },

  toJSON(message: RaAuthenticateResponse): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data);
    message.events !== undefined && (obj.events = message.events);
    return obj;
  },

  fromPartial(
    object: DeepPartial<RaAuthenticateResponse>,
  ): RaAuthenticateResponse {
    const message = createBaseRaAuthenticateResponse();
    message.data = object.data ?? "";
    message.events = object.events ?? "";
    return message;
  },
};

function createBaseMasterKey(): MasterKey {
  return { bytes: new Uint8Array() };
}

export const MasterKey = {
  encode(
    message: MasterKey,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.bytes.length !== 0) {
      writer.uint32(10).bytes(message.bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MasterKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMasterKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bytes = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MasterKey {
    return {
      bytes: isSet(object.bytes)
        ? bytesFromBase64(object.bytes)
        : new Uint8Array(),
    };
  },

  toJSON(message: MasterKey): unknown {
    const obj: any = {};
    message.bytes !== undefined &&
      (obj.bytes = base64FromBytes(
        message.bytes !== undefined ? message.bytes : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MasterKey>): MasterKey {
    const message = createBaseMasterKey();
    message.bytes = object.bytes ?? new Uint8Array();
    return message;
  },
};

function createBaseKey(): Key {
  return { key: new Uint8Array() };
}

export const Key = {
  encode(message: Key, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Key {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Key {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
    };
  },

  toJSON(message: Key): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<Key>): Key {
    const message = createBaseKey();
    message.key = object.key ?? new Uint8Array();
    return message;
  },
};

/** Msg defines the wasm Msg service. */
export interface Msg {
  /** Register and authenticate new node */
  RegisterAuth(request: RaAuthenticate): Promise<RaAuthenticateResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RegisterAuth = this.RegisterAuth.bind(this);
  }
  RegisterAuth(request: RaAuthenticate): Promise<RaAuthenticateResponse> {
    const data = RaAuthenticate.encode(request).finish();
    const promise = this.rpc.request(
      "secret.registration.v1beta1.Msg",
      "RegisterAuth",
      data,
    );
    return promise.then((data) =>
      RaAuthenticateResponse.decode(new _m0.Reader(data)),
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
