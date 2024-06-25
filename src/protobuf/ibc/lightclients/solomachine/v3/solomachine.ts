/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";

export const protobufPackage = "ibc.lightclients.solomachine.v3";

/**
 * ClientState defines a solo machine client that tracks the current consensus
 * state and if the client is frozen.
 */
export interface ClientState {
  /** latest sequence of the client state */
  sequence: string;
  /** frozen sequence of the solo machine */
  is_frozen: boolean;
  consensus_state?: ConsensusState;
}

/**
 * ConsensusState defines a solo machine consensus state. The sequence of a
 * consensus state is contained in the "height" key used in storing the
 * consensus state.
 */
export interface ConsensusState {
  /** public key of the solo machine */
  public_key?: Any;
  /**
   * diversifier allows the same public key to be re-used across different solo
   * machine clients (potentially on different chains) without being considered
   * misbehaviour.
   */
  diversifier: string;
  timestamp: string;
}

/** Header defines a solo machine consensus header */
export interface Header {
  timestamp: string;
  signature: Uint8Array;
  new_public_key?: Any;
  new_diversifier: string;
}

/**
 * Misbehaviour defines misbehaviour for a solo machine which consists
 * of a sequence and two signatures over different messages at that sequence.
 */
export interface Misbehaviour {
  sequence: string;
  signature_one?: SignatureAndData;
  signature_two?: SignatureAndData;
}

/**
 * SignatureAndData contains a signature and the data signed over to create that
 * signature.
 */
export interface SignatureAndData {
  signature: Uint8Array;
  path: Uint8Array;
  data: Uint8Array;
  timestamp: string;
}

/**
 * TimestampedSignatureData contains the signature data and the timestamp of the
 * signature.
 */
export interface TimestampedSignatureData {
  signature_data: Uint8Array;
  timestamp: string;
}

/** SignBytes defines the signed bytes used for signature verification. */
export interface SignBytes {
  /** the sequence number */
  sequence: string;
  /** the proof timestamp */
  timestamp: string;
  /** the public key diversifier */
  diversifier: string;
  /** the standardised path bytes */
  path: Uint8Array;
  /** the marshaled data bytes */
  data: Uint8Array;
}

/** HeaderData returns the SignBytes data for update verification. */
export interface HeaderData {
  /** header public key */
  new_pub_key?: Any;
  /** header diversifier */
  new_diversifier: string;
}

function createBaseClientState(): ClientState {
  return { sequence: "0", is_frozen: false, consensus_state: undefined };
}

export const ClientState = {
  encode(
    message: ClientState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sequence !== "0") {
      writer.uint32(8).uint64(message.sequence);
    }
    if (message.is_frozen === true) {
      writer.uint32(16).bool(message.is_frozen);
    }
    if (message.consensus_state !== undefined) {
      ConsensusState.encode(
        message.consensus_state,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sequence = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.is_frozen = reader.bool();
          break;
        case 3:
          message.consensus_state = ConsensusState.decode(
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

  fromJSON(object: any): ClientState {
    return {
      sequence: isSet(object.sequence) ? String(object.sequence) : "0",
      is_frozen: isSet(object.is_frozen) ? Boolean(object.is_frozen) : false,
      consensus_state: isSet(object.consensus_state)
        ? ConsensusState.fromJSON(object.consensus_state)
        : undefined,
    };
  },

  toJSON(message: ClientState): unknown {
    const obj: any = {};
    message.sequence !== undefined && (obj.sequence = message.sequence);
    message.is_frozen !== undefined && (obj.is_frozen = message.is_frozen);
    message.consensus_state !== undefined &&
      (obj.consensus_state = message.consensus_state
        ? ConsensusState.toJSON(message.consensus_state)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ClientState>): ClientState {
    const message = createBaseClientState();
    message.sequence = object.sequence ?? "0";
    message.is_frozen = object.is_frozen ?? false;
    message.consensus_state =
      object.consensus_state !== undefined && object.consensus_state !== null
        ? ConsensusState.fromPartial(object.consensus_state)
        : undefined;
    return message;
  },
};

function createBaseConsensusState(): ConsensusState {
  return { public_key: undefined, diversifier: "", timestamp: "0" };
}

export const ConsensusState = {
  encode(
    message: ConsensusState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.public_key !== undefined) {
      Any.encode(message.public_key, writer.uint32(10).fork()).ldelim();
    }
    if (message.diversifier !== "") {
      writer.uint32(18).string(message.diversifier);
    }
    if (message.timestamp !== "0") {
      writer.uint32(24).uint64(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensusState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.public_key = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.diversifier = reader.string();
          break;
        case 3:
          message.timestamp = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsensusState {
    return {
      public_key: isSet(object.public_key)
        ? Any.fromJSON(object.public_key)
        : undefined,
      diversifier: isSet(object.diversifier) ? String(object.diversifier) : "",
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "0",
    };
  },

  toJSON(message: ConsensusState): unknown {
    const obj: any = {};
    message.public_key !== undefined &&
      (obj.public_key = message.public_key
        ? Any.toJSON(message.public_key)
        : undefined);
    message.diversifier !== undefined &&
      (obj.diversifier = message.diversifier);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    return obj;
  },

  fromPartial(object: DeepPartial<ConsensusState>): ConsensusState {
    const message = createBaseConsensusState();
    message.public_key =
      object.public_key !== undefined && object.public_key !== null
        ? Any.fromPartial(object.public_key)
        : undefined;
    message.diversifier = object.diversifier ?? "";
    message.timestamp = object.timestamp ?? "0";
    return message;
  },
};

function createBaseHeader(): Header {
  return {
    timestamp: "0",
    signature: new Uint8Array(),
    new_public_key: undefined,
    new_diversifier: "",
  };
}

export const Header = {
  encode(
    message: Header,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.timestamp !== "0") {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.signature.length !== 0) {
      writer.uint32(18).bytes(message.signature);
    }
    if (message.new_public_key !== undefined) {
      Any.encode(message.new_public_key, writer.uint32(26).fork()).ldelim();
    }
    if (message.new_diversifier !== "") {
      writer.uint32(34).string(message.new_diversifier);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Header {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.signature = reader.bytes();
          break;
        case 3:
          message.new_public_key = Any.decode(reader, reader.uint32());
          break;
        case 4:
          message.new_diversifier = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Header {
    return {
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "0",
      signature: isSet(object.signature)
        ? bytesFromBase64(object.signature)
        : new Uint8Array(),
      new_public_key: isSet(object.new_public_key)
        ? Any.fromJSON(object.new_public_key)
        : undefined,
      new_diversifier: isSet(object.new_diversifier)
        ? String(object.new_diversifier)
        : "",
    };
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array(),
      ));
    message.new_public_key !== undefined &&
      (obj.new_public_key = message.new_public_key
        ? Any.toJSON(message.new_public_key)
        : undefined);
    message.new_diversifier !== undefined &&
      (obj.new_diversifier = message.new_diversifier);
    return obj;
  },

  fromPartial(object: DeepPartial<Header>): Header {
    const message = createBaseHeader();
    message.timestamp = object.timestamp ?? "0";
    message.signature = object.signature ?? new Uint8Array();
    message.new_public_key =
      object.new_public_key !== undefined && object.new_public_key !== null
        ? Any.fromPartial(object.new_public_key)
        : undefined;
    message.new_diversifier = object.new_diversifier ?? "";
    return message;
  },
};

function createBaseMisbehaviour(): Misbehaviour {
  return { sequence: "0", signature_one: undefined, signature_two: undefined };
}

export const Misbehaviour = {
  encode(
    message: Misbehaviour,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sequence !== "0") {
      writer.uint32(8).uint64(message.sequence);
    }
    if (message.signature_one !== undefined) {
      SignatureAndData.encode(
        message.signature_one,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.signature_two !== undefined) {
      SignatureAndData.encode(
        message.signature_two,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Misbehaviour {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMisbehaviour();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sequence = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.signature_one = SignatureAndData.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 3:
          message.signature_two = SignatureAndData.decode(
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

  fromJSON(object: any): Misbehaviour {
    return {
      sequence: isSet(object.sequence) ? String(object.sequence) : "0",
      signature_one: isSet(object.signature_one)
        ? SignatureAndData.fromJSON(object.signature_one)
        : undefined,
      signature_two: isSet(object.signature_two)
        ? SignatureAndData.fromJSON(object.signature_two)
        : undefined,
    };
  },

  toJSON(message: Misbehaviour): unknown {
    const obj: any = {};
    message.sequence !== undefined && (obj.sequence = message.sequence);
    message.signature_one !== undefined &&
      (obj.signature_one = message.signature_one
        ? SignatureAndData.toJSON(message.signature_one)
        : undefined);
    message.signature_two !== undefined &&
      (obj.signature_two = message.signature_two
        ? SignatureAndData.toJSON(message.signature_two)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Misbehaviour>): Misbehaviour {
    const message = createBaseMisbehaviour();
    message.sequence = object.sequence ?? "0";
    message.signature_one =
      object.signature_one !== undefined && object.signature_one !== null
        ? SignatureAndData.fromPartial(object.signature_one)
        : undefined;
    message.signature_two =
      object.signature_two !== undefined && object.signature_two !== null
        ? SignatureAndData.fromPartial(object.signature_two)
        : undefined;
    return message;
  },
};

function createBaseSignatureAndData(): SignatureAndData {
  return {
    signature: new Uint8Array(),
    path: new Uint8Array(),
    data: new Uint8Array(),
    timestamp: "0",
  };
}

export const SignatureAndData = {
  encode(
    message: SignatureAndData,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.signature.length !== 0) {
      writer.uint32(10).bytes(message.signature);
    }
    if (message.path.length !== 0) {
      writer.uint32(18).bytes(message.path);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    if (message.timestamp !== "0") {
      writer.uint32(32).uint64(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignatureAndData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureAndData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signature = reader.bytes();
          break;
        case 2:
          message.path = reader.bytes();
          break;
        case 3:
          message.data = reader.bytes();
          break;
        case 4:
          message.timestamp = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignatureAndData {
    return {
      signature: isSet(object.signature)
        ? bytesFromBase64(object.signature)
        : new Uint8Array(),
      path: isSet(object.path)
        ? bytesFromBase64(object.path)
        : new Uint8Array(),
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "0",
    };
  },

  toJSON(message: SignatureAndData): unknown {
    const obj: any = {};
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array(),
      ));
    message.path !== undefined &&
      (obj.path = base64FromBytes(
        message.path !== undefined ? message.path : new Uint8Array(),
      ));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    return obj;
  },

  fromPartial(object: DeepPartial<SignatureAndData>): SignatureAndData {
    const message = createBaseSignatureAndData();
    message.signature = object.signature ?? new Uint8Array();
    message.path = object.path ?? new Uint8Array();
    message.data = object.data ?? new Uint8Array();
    message.timestamp = object.timestamp ?? "0";
    return message;
  },
};

function createBaseTimestampedSignatureData(): TimestampedSignatureData {
  return { signature_data: new Uint8Array(), timestamp: "0" };
}

export const TimestampedSignatureData = {
  encode(
    message: TimestampedSignatureData,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.signature_data.length !== 0) {
      writer.uint32(10).bytes(message.signature_data);
    }
    if (message.timestamp !== "0") {
      writer.uint32(16).uint64(message.timestamp);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): TimestampedSignatureData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimestampedSignatureData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signature_data = reader.bytes();
          break;
        case 2:
          message.timestamp = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TimestampedSignatureData {
    return {
      signature_data: isSet(object.signature_data)
        ? bytesFromBase64(object.signature_data)
        : new Uint8Array(),
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "0",
    };
  },

  toJSON(message: TimestampedSignatureData): unknown {
    const obj: any = {};
    message.signature_data !== undefined &&
      (obj.signature_data = base64FromBytes(
        message.signature_data !== undefined
          ? message.signature_data
          : new Uint8Array(),
      ));
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    return obj;
  },

  fromPartial(
    object: DeepPartial<TimestampedSignatureData>,
  ): TimestampedSignatureData {
    const message = createBaseTimestampedSignatureData();
    message.signature_data = object.signature_data ?? new Uint8Array();
    message.timestamp = object.timestamp ?? "0";
    return message;
  },
};

function createBaseSignBytes(): SignBytes {
  return {
    sequence: "0",
    timestamp: "0",
    diversifier: "",
    path: new Uint8Array(),
    data: new Uint8Array(),
  };
}

export const SignBytes = {
  encode(
    message: SignBytes,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sequence !== "0") {
      writer.uint32(8).uint64(message.sequence);
    }
    if (message.timestamp !== "0") {
      writer.uint32(16).uint64(message.timestamp);
    }
    if (message.diversifier !== "") {
      writer.uint32(26).string(message.diversifier);
    }
    if (message.path.length !== 0) {
      writer.uint32(34).bytes(message.path);
    }
    if (message.data.length !== 0) {
      writer.uint32(42).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignBytes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignBytes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sequence = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.timestamp = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.diversifier = reader.string();
          break;
        case 4:
          message.path = reader.bytes();
          break;
        case 5:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignBytes {
    return {
      sequence: isSet(object.sequence) ? String(object.sequence) : "0",
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "0",
      diversifier: isSet(object.diversifier) ? String(object.diversifier) : "",
      path: isSet(object.path)
        ? bytesFromBase64(object.path)
        : new Uint8Array(),
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: SignBytes): unknown {
    const obj: any = {};
    message.sequence !== undefined && (obj.sequence = message.sequence);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    message.diversifier !== undefined &&
      (obj.diversifier = message.diversifier);
    message.path !== undefined &&
      (obj.path = base64FromBytes(
        message.path !== undefined ? message.path : new Uint8Array(),
      ));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<SignBytes>): SignBytes {
    const message = createBaseSignBytes();
    message.sequence = object.sequence ?? "0";
    message.timestamp = object.timestamp ?? "0";
    message.diversifier = object.diversifier ?? "";
    message.path = object.path ?? new Uint8Array();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseHeaderData(): HeaderData {
  return { new_pub_key: undefined, new_diversifier: "" };
}

export const HeaderData = {
  encode(
    message: HeaderData,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.new_pub_key !== undefined) {
      Any.encode(message.new_pub_key, writer.uint32(10).fork()).ldelim();
    }
    if (message.new_diversifier !== "") {
      writer.uint32(18).string(message.new_diversifier);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HeaderData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeaderData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.new_pub_key = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.new_diversifier = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HeaderData {
    return {
      new_pub_key: isSet(object.new_pub_key)
        ? Any.fromJSON(object.new_pub_key)
        : undefined,
      new_diversifier: isSet(object.new_diversifier)
        ? String(object.new_diversifier)
        : "",
    };
  },

  toJSON(message: HeaderData): unknown {
    const obj: any = {};
    message.new_pub_key !== undefined &&
      (obj.new_pub_key = message.new_pub_key
        ? Any.toJSON(message.new_pub_key)
        : undefined);
    message.new_diversifier !== undefined &&
      (obj.new_diversifier = message.new_diversifier);
    return obj;
  },

  fromPartial(object: DeepPartial<HeaderData>): HeaderData {
    const message = createBaseHeaderData();
    message.new_pub_key =
      object.new_pub_key !== undefined && object.new_pub_key !== null
        ? Any.fromPartial(object.new_pub_key)
        : undefined;
    message.new_diversifier = object.new_diversifier ?? "";
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
