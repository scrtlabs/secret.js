/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Params, IdentifiedClientState, ClientConsensusStates } from "./client";

export const protobufPackage = "ibc.core.client.v1";

/** GenesisState defines the ibc client submodule's genesis state. */
export interface GenesisState {
  /** client states with their corresponding identifiers */
  clients: IdentifiedClientState[];
  /** consensus states from each client */
  clients_consensus: ClientConsensusStates[];
  /** metadata from each client */
  clients_metadata: IdentifiedGenesisMetadata[];
  params?: Params;
  /** create localhost on initialization */
  create_localhost: boolean;
  /** the sequence for the next generated client identifier */
  next_client_sequence: string;
}

/**
 * GenesisMetadata defines the genesis type for metadata that clients may return
 * with ExportMetadata
 */
export interface GenesisMetadata {
  /** store key of metadata without clientID-prefix */
  key: Uint8Array;
  /** metadata value */
  value: Uint8Array;
}

/**
 * IdentifiedGenesisMetadata has the client metadata with the corresponding
 * client id.
 */
export interface IdentifiedGenesisMetadata {
  client_id: string;
  client_metadata: GenesisMetadata[];
}

function createBaseGenesisState(): GenesisState {
  return {
    clients: [],
    clients_consensus: [],
    clients_metadata: [],
    params: undefined,
    create_localhost: false,
    next_client_sequence: "0",
  };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.clients) {
      IdentifiedClientState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.clients_consensus) {
      ClientConsensusStates.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.clients_metadata) {
      IdentifiedGenesisMetadata.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    if (message.create_localhost === true) {
      writer.uint32(40).bool(message.create_localhost);
    }
    if (message.next_client_sequence !== "0") {
      writer.uint32(48).uint64(message.next_client_sequence);
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
          message.clients.push(
            IdentifiedClientState.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.clients_consensus.push(
            ClientConsensusStates.decode(reader, reader.uint32()),
          );
          break;
        case 3:
          message.clients_metadata.push(
            IdentifiedGenesisMetadata.decode(reader, reader.uint32()),
          );
          break;
        case 4:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 5:
          message.create_localhost = reader.bool();
          break;
        case 6:
          message.next_client_sequence = longToString(reader.uint64() as Long);
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
      clients: Array.isArray(object?.clients)
        ? object.clients.map((e: any) => IdentifiedClientState.fromJSON(e))
        : [],
      clients_consensus: Array.isArray(object?.clients_consensus)
        ? object.clients_consensus.map((e: any) =>
            ClientConsensusStates.fromJSON(e),
          )
        : [],
      clients_metadata: Array.isArray(object?.clients_metadata)
        ? object.clients_metadata.map((e: any) =>
            IdentifiedGenesisMetadata.fromJSON(e),
          )
        : [],
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      create_localhost: isSet(object.create_localhost)
        ? Boolean(object.create_localhost)
        : false,
      next_client_sequence: isSet(object.next_client_sequence)
        ? String(object.next_client_sequence)
        : "0",
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.clients) {
      obj.clients = message.clients.map((e) =>
        e ? IdentifiedClientState.toJSON(e) : undefined,
      );
    } else {
      obj.clients = [];
    }
    if (message.clients_consensus) {
      obj.clients_consensus = message.clients_consensus.map((e) =>
        e ? ClientConsensusStates.toJSON(e) : undefined,
      );
    } else {
      obj.clients_consensus = [];
    }
    if (message.clients_metadata) {
      obj.clients_metadata = message.clients_metadata.map((e) =>
        e ? IdentifiedGenesisMetadata.toJSON(e) : undefined,
      );
    } else {
      obj.clients_metadata = [];
    }
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.create_localhost !== undefined &&
      (obj.create_localhost = message.create_localhost);
    message.next_client_sequence !== undefined &&
      (obj.next_client_sequence = message.next_client_sequence);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I,
  ): GenesisState {
    const message = createBaseGenesisState();
    message.clients =
      object.clients?.map((e) => IdentifiedClientState.fromPartial(e)) || [];
    message.clients_consensus =
      object.clients_consensus?.map((e) =>
        ClientConsensusStates.fromPartial(e),
      ) || [];
    message.clients_metadata =
      object.clients_metadata?.map((e) =>
        IdentifiedGenesisMetadata.fromPartial(e),
      ) || [];
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    message.create_localhost = object.create_localhost ?? false;
    message.next_client_sequence = object.next_client_sequence ?? "0";
    return message;
  },
};

function createBaseGenesisMetadata(): GenesisMetadata {
  return { key: new Uint8Array(), value: new Uint8Array() };
}

export const GenesisMetadata = {
  encode(
    message: GenesisMetadata,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisMetadata {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
      value: isSet(object.value)
        ? bytesFromBase64(object.value)
        : new Uint8Array(),
    };
  },

  toJSON(message: GenesisMetadata): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array(),
      ));
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisMetadata>, I>>(
    object: I,
  ): GenesisMetadata {
    const message = createBaseGenesisMetadata();
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    return message;
  },
};

function createBaseIdentifiedGenesisMetadata(): IdentifiedGenesisMetadata {
  return { client_id: "", client_metadata: [] };
}

export const IdentifiedGenesisMetadata = {
  encode(
    message: IdentifiedGenesisMetadata,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    for (const v of message.client_metadata) {
      GenesisMetadata.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): IdentifiedGenesisMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentifiedGenesisMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.client_id = reader.string();
          break;
        case 2:
          message.client_metadata.push(
            GenesisMetadata.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IdentifiedGenesisMetadata {
    return {
      client_id: isSet(object.client_id) ? String(object.client_id) : "",
      client_metadata: Array.isArray(object?.client_metadata)
        ? object.client_metadata.map((e: any) => GenesisMetadata.fromJSON(e))
        : [],
    };
  },

  toJSON(message: IdentifiedGenesisMetadata): unknown {
    const obj: any = {};
    message.client_id !== undefined && (obj.client_id = message.client_id);
    if (message.client_metadata) {
      obj.client_metadata = message.client_metadata.map((e) =>
        e ? GenesisMetadata.toJSON(e) : undefined,
      );
    } else {
      obj.client_metadata = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IdentifiedGenesisMetadata>, I>>(
    object: I,
  ): IdentifiedGenesisMetadata {
    const message = createBaseIdentifiedGenesisMetadata();
    message.client_id = object.client_id ?? "";
    message.client_metadata =
      object.client_metadata?.map((e) => GenesisMetadata.fromPartial(e)) || [];
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
