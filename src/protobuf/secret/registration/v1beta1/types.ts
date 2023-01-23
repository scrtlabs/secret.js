/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "secret.registration.v1beta1";

export interface SeedConfig {
  master_key: string;
  encrypted_key: string;
  version: number;
}

export interface LegacySeedConfig {
  master_cert: string;
  encrypted_key: string;
}

export interface RegistrationNodeInfo {
  certificate: Uint8Array;
  encrypted_seed: Uint8Array;
}

function createBaseSeedConfig(): SeedConfig {
  return { master_key: "", encrypted_key: "", version: 0 };
}

export const SeedConfig = {
  encode(
    message: SeedConfig,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.master_key !== "") {
      writer.uint32(10).string(message.master_key);
    }
    if (message.encrypted_key !== "") {
      writer.uint32(18).string(message.encrypted_key);
    }
    if (message.version !== 0) {
      writer.uint32(24).uint32(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SeedConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSeedConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.master_key = reader.string();
          break;
        case 2:
          message.encrypted_key = reader.string();
          break;
        case 3:
          message.version = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SeedConfig {
    return {
      master_key: isSet(object.master_key) ? String(object.master_key) : "",
      encrypted_key: isSet(object.encrypted_key)
        ? String(object.encrypted_key)
        : "",
      version: isSet(object.version) ? Number(object.version) : 0,
    };
  },

  toJSON(message: SeedConfig): unknown {
    const obj: any = {};
    message.master_key !== undefined && (obj.master_key = message.master_key);
    message.encrypted_key !== undefined &&
      (obj.encrypted_key = message.encrypted_key);
    message.version !== undefined &&
      (obj.version = Math.round(message.version));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SeedConfig>, I>>(
    object: I,
  ): SeedConfig {
    const message = createBaseSeedConfig();
    message.master_key = object.master_key ?? "";
    message.encrypted_key = object.encrypted_key ?? "";
    message.version = object.version ?? 0;
    return message;
  },
};

function createBaseLegacySeedConfig(): LegacySeedConfig {
  return { master_cert: "", encrypted_key: "" };
}

export const LegacySeedConfig = {
  encode(
    message: LegacySeedConfig,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.master_cert !== "") {
      writer.uint32(10).string(message.master_cert);
    }
    if (message.encrypted_key !== "") {
      writer.uint32(18).string(message.encrypted_key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacySeedConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacySeedConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.master_cert = reader.string();
          break;
        case 2:
          message.encrypted_key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LegacySeedConfig {
    return {
      master_cert: isSet(object.master_cert) ? String(object.master_cert) : "",
      encrypted_key: isSet(object.encrypted_key)
        ? String(object.encrypted_key)
        : "",
    };
  },

  toJSON(message: LegacySeedConfig): unknown {
    const obj: any = {};
    message.master_cert !== undefined &&
      (obj.master_cert = message.master_cert);
    message.encrypted_key !== undefined &&
      (obj.encrypted_key = message.encrypted_key);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LegacySeedConfig>, I>>(
    object: I,
  ): LegacySeedConfig {
    const message = createBaseLegacySeedConfig();
    message.master_cert = object.master_cert ?? "";
    message.encrypted_key = object.encrypted_key ?? "";
    return message;
  },
};

function createBaseRegistrationNodeInfo(): RegistrationNodeInfo {
  return { certificate: new Uint8Array(), encrypted_seed: new Uint8Array() };
}

export const RegistrationNodeInfo = {
  encode(
    message: RegistrationNodeInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.certificate.length !== 0) {
      writer.uint32(10).bytes(message.certificate);
    }
    if (message.encrypted_seed.length !== 0) {
      writer.uint32(18).bytes(message.encrypted_seed);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RegistrationNodeInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegistrationNodeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.certificate = reader.bytes();
          break;
        case 2:
          message.encrypted_seed = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegistrationNodeInfo {
    return {
      certificate: isSet(object.certificate)
        ? bytesFromBase64(object.certificate)
        : new Uint8Array(),
      encrypted_seed: isSet(object.encrypted_seed)
        ? bytesFromBase64(object.encrypted_seed)
        : new Uint8Array(),
    };
  },

  toJSON(message: RegistrationNodeInfo): unknown {
    const obj: any = {};
    message.certificate !== undefined &&
      (obj.certificate = base64FromBytes(
        message.certificate !== undefined
          ? message.certificate
          : new Uint8Array(),
      ));
    message.encrypted_seed !== undefined &&
      (obj.encrypted_seed = base64FromBytes(
        message.encrypted_seed !== undefined
          ? message.encrypted_seed
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegistrationNodeInfo>, I>>(
    object: I,
  ): RegistrationNodeInfo {
    const message = createBaseRegistrationNodeInfo();
    message.certificate = object.certificate ?? new Uint8Array();
    message.encrypted_seed = object.encrypted_seed ?? new Uint8Array();
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
