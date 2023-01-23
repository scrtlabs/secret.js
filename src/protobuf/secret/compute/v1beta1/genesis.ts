/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { CodeInfo, ContractInfo, ContractCustomInfo, Model } from "./types";

export const protobufPackage = "secret.compute.v1beta1";

/** GenesisState - genesis state of x/wasm */
export interface GenesisState {
  /** Params params = 1 [(gogoproto.nullable) = false]; */
  codes: Code[];
  contracts: Contract[];
  sequences: Sequence[];
}

/** Code struct encompasses CodeInfo and CodeBytes */
export interface Code {
  code_id: string;
  code_info?: CodeInfo;
  code_bytes: Uint8Array;
}

/** Contract struct encompasses ContractAddress, ContractInfo, and ContractState */
export interface Contract {
  contract_address: Uint8Array;
  contract_info?: ContractInfo;
  contract_state: Model[];
  contract_custom_info?: ContractCustomInfo;
}

/** Sequence id and value of a counter */
export interface Sequence {
  id_key: Uint8Array;
  value: string;
}

function createBaseGenesisState(): GenesisState {
  return { codes: [], contracts: [], sequences: [] };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.codes) {
      Code.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.contracts) {
      Contract.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.sequences) {
      Sequence.encode(v!, writer.uint32(34).fork()).ldelim();
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
        case 2:
          message.codes.push(Code.decode(reader, reader.uint32()));
          break;
        case 3:
          message.contracts.push(Contract.decode(reader, reader.uint32()));
          break;
        case 4:
          message.sequences.push(Sequence.decode(reader, reader.uint32()));
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
      codes: Array.isArray(object?.codes)
        ? object.codes.map((e: any) => Code.fromJSON(e))
        : [],
      contracts: Array.isArray(object?.contracts)
        ? object.contracts.map((e: any) => Contract.fromJSON(e))
        : [],
      sequences: Array.isArray(object?.sequences)
        ? object.sequences.map((e: any) => Sequence.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.codes) {
      obj.codes = message.codes.map((e) => (e ? Code.toJSON(e) : undefined));
    } else {
      obj.codes = [];
    }
    if (message.contracts) {
      obj.contracts = message.contracts.map((e) =>
        e ? Contract.toJSON(e) : undefined,
      );
    } else {
      obj.contracts = [];
    }
    if (message.sequences) {
      obj.sequences = message.sequences.map((e) =>
        e ? Sequence.toJSON(e) : undefined,
      );
    } else {
      obj.sequences = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I,
  ): GenesisState {
    const message = createBaseGenesisState();
    message.codes = object.codes?.map((e) => Code.fromPartial(e)) || [];
    message.contracts =
      object.contracts?.map((e) => Contract.fromPartial(e)) || [];
    message.sequences =
      object.sequences?.map((e) => Sequence.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCode(): Code {
  return { code_id: "0", code_info: undefined, code_bytes: new Uint8Array() };
}

export const Code = {
  encode(message: Code, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code_id !== "0") {
      writer.uint32(8).uint64(message.code_id);
    }
    if (message.code_info !== undefined) {
      CodeInfo.encode(message.code_info, writer.uint32(18).fork()).ldelim();
    }
    if (message.code_bytes.length !== 0) {
      writer.uint32(26).bytes(message.code_bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Code {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.code_info = CodeInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.code_bytes = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Code {
    return {
      code_id: isSet(object.code_id) ? String(object.code_id) : "0",
      code_info: isSet(object.code_info)
        ? CodeInfo.fromJSON(object.code_info)
        : undefined,
      code_bytes: isSet(object.code_bytes)
        ? bytesFromBase64(object.code_bytes)
        : new Uint8Array(),
    };
  },

  toJSON(message: Code): unknown {
    const obj: any = {};
    message.code_id !== undefined && (obj.code_id = message.code_id);
    message.code_info !== undefined &&
      (obj.code_info = message.code_info
        ? CodeInfo.toJSON(message.code_info)
        : undefined);
    message.code_bytes !== undefined &&
      (obj.code_bytes = base64FromBytes(
        message.code_bytes !== undefined
          ? message.code_bytes
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Code>, I>>(object: I): Code {
    const message = createBaseCode();
    message.code_id = object.code_id ?? "0";
    message.code_info =
      object.code_info !== undefined && object.code_info !== null
        ? CodeInfo.fromPartial(object.code_info)
        : undefined;
    message.code_bytes = object.code_bytes ?? new Uint8Array();
    return message;
  },
};

function createBaseContract(): Contract {
  return {
    contract_address: new Uint8Array(),
    contract_info: undefined,
    contract_state: [],
    contract_custom_info: undefined,
  };
}

export const Contract = {
  encode(
    message: Contract,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contract_address.length !== 0) {
      writer.uint32(10).bytes(message.contract_address);
    }
    if (message.contract_info !== undefined) {
      ContractInfo.encode(
        message.contract_info,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    for (const v of message.contract_state) {
      Model.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.contract_custom_info !== undefined) {
      ContractCustomInfo.encode(
        message.contract_custom_info,
        writer.uint32(34).fork(),
      ).ldelim();
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
          message.contract_address = reader.bytes();
          break;
        case 2:
          message.contract_info = ContractInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.contract_state.push(Model.decode(reader, reader.uint32()));
          break;
        case 4:
          message.contract_custom_info = ContractCustomInfo.decode(
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

  fromJSON(object: any): Contract {
    return {
      contract_address: isSet(object.contract_address)
        ? bytesFromBase64(object.contract_address)
        : new Uint8Array(),
      contract_info: isSet(object.contract_info)
        ? ContractInfo.fromJSON(object.contract_info)
        : undefined,
      contract_state: Array.isArray(object?.contract_state)
        ? object.contract_state.map((e: any) => Model.fromJSON(e))
        : [],
      contract_custom_info: isSet(object.contract_custom_info)
        ? ContractCustomInfo.fromJSON(object.contract_custom_info)
        : undefined,
    };
  },

  toJSON(message: Contract): unknown {
    const obj: any = {};
    message.contract_address !== undefined &&
      (obj.contract_address = base64FromBytes(
        message.contract_address !== undefined
          ? message.contract_address
          : new Uint8Array(),
      ));
    message.contract_info !== undefined &&
      (obj.contract_info = message.contract_info
        ? ContractInfo.toJSON(message.contract_info)
        : undefined);
    if (message.contract_state) {
      obj.contract_state = message.contract_state.map((e) =>
        e ? Model.toJSON(e) : undefined,
      );
    } else {
      obj.contract_state = [];
    }
    message.contract_custom_info !== undefined &&
      (obj.contract_custom_info = message.contract_custom_info
        ? ContractCustomInfo.toJSON(message.contract_custom_info)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Contract>, I>>(object: I): Contract {
    const message = createBaseContract();
    message.contract_address = object.contract_address ?? new Uint8Array();
    message.contract_info =
      object.contract_info !== undefined && object.contract_info !== null
        ? ContractInfo.fromPartial(object.contract_info)
        : undefined;
    message.contract_state =
      object.contract_state?.map((e) => Model.fromPartial(e)) || [];
    message.contract_custom_info =
      object.contract_custom_info !== undefined &&
      object.contract_custom_info !== null
        ? ContractCustomInfo.fromPartial(object.contract_custom_info)
        : undefined;
    return message;
  },
};

function createBaseSequence(): Sequence {
  return { id_key: new Uint8Array(), value: "0" };
}

export const Sequence = {
  encode(
    message: Sequence,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id_key.length !== 0) {
      writer.uint32(10).bytes(message.id_key);
    }
    if (message.value !== "0") {
      writer.uint32(16).uint64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sequence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSequence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id_key = reader.bytes();
          break;
        case 2:
          message.value = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Sequence {
    return {
      id_key: isSet(object.id_key)
        ? bytesFromBase64(object.id_key)
        : new Uint8Array(),
      value: isSet(object.value) ? String(object.value) : "0",
    };
  },

  toJSON(message: Sequence): unknown {
    const obj: any = {};
    message.id_key !== undefined &&
      (obj.id_key = base64FromBytes(
        message.id_key !== undefined ? message.id_key : new Uint8Array(),
      ));
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Sequence>, I>>(object: I): Sequence {
    const message = createBaseSequence();
    message.id_key = object.id_key ?? new Uint8Array();
    message.value = object.value ?? "0";
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
