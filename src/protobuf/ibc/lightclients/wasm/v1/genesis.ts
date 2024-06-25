/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "ibc.lightclients.wasm.v1";

/** GenesisState defines 08-wasm's keeper genesis state */
export interface GenesisState {
  /** uploaded light client wasm contracts */
  contracts: Contract[];
}

/** Contract stores contract code */
export interface Contract {
  /** contract byte code */
  code_bytes: Uint8Array;
}

function createBaseGenesisState(): GenesisState {
  return { contracts: [] };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.contracts) {
      Contract.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contracts.push(Contract.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      contracts: Array.isArray(object?.contracts)
        ? object.contracts.map((e: any) => Contract.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.contracts) {
      obj.contracts = message.contracts.map((e) =>
        e ? Contract.toJSON(e) : undefined,
      );
    } else {
      obj.contracts = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.contracts =
      object.contracts?.map((e) => Contract.fromPartial(e)) || [];
    return message;
  },
};

function createBaseContract(): Contract {
  return { code_bytes: new Uint8Array() };
}

export const Contract = {
  encode(
    message: Contract,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.code_bytes.length !== 0) {
      writer.uint32(10).bytes(message.code_bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Contract {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code_bytes = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Contract {
    return {
      code_bytes: isSet(object.code_bytes)
        ? bytesFromBase64(object.code_bytes)
        : new Uint8Array(),
    };
  },

  toJSON(message: Contract): unknown {
    const obj: any = {};
    message.code_bytes !== undefined &&
      (obj.code_bytes = base64FromBytes(
        message.code_bytes !== undefined
          ? message.code_bytes
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<Contract>): Contract {
    const message = createBaseContract();
    message.code_bytes = object.code_bytes ?? new Uint8Array();
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
