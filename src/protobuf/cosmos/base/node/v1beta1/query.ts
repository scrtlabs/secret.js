/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../../google/protobuf/timestamp";

export const protobufPackage = "cosmos.base.node.v1beta1";

/** ConfigRequest defines the request structure for the Config gRPC query. */
export interface ConfigRequest {}

/** ConfigResponse defines the response structure for the Config gRPC query. */
export interface ConfigResponse {
  minimum_gas_price: string;
  pruning_keep_recent: string;
  pruning_interval: string;
  halt_height: string;
}

/** StateRequest defines the request structure for the status of a node. */
export interface StatusRequest {}

/** StateResponse defines the response structure for the status of a node. */
export interface StatusResponse {
  /** earliest block height available in the store */
  earliest_store_height: string;
  /** current block height */
  height: string;
  /** block height timestamp */
  timestamp?: Timestamp;
  /** app hash of the current block */
  app_hash: Uint8Array;
  /** validator hash provided by the consensus header */
  validator_hash: Uint8Array;
}

function createBaseConfigRequest(): ConfigRequest {
  return {};
}

export const ConfigRequest = {
  encode(
    _: ConfigRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigRequest();
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

  fromJSON(_: any): ConfigRequest {
    return {};
  },

  toJSON(_: ConfigRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<ConfigRequest>): ConfigRequest {
    const message = createBaseConfigRequest();
    return message;
  },
};

function createBaseConfigResponse(): ConfigResponse {
  return {
    minimum_gas_price: "",
    pruning_keep_recent: "",
    pruning_interval: "",
    halt_height: "0",
  };
}

export const ConfigResponse = {
  encode(
    message: ConfigResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.minimum_gas_price !== "") {
      writer.uint32(10).string(message.minimum_gas_price);
    }
    if (message.pruning_keep_recent !== "") {
      writer.uint32(18).string(message.pruning_keep_recent);
    }
    if (message.pruning_interval !== "") {
      writer.uint32(26).string(message.pruning_interval);
    }
    if (message.halt_height !== "0") {
      writer.uint32(32).uint64(message.halt_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minimum_gas_price = reader.string();
          break;
        case 2:
          message.pruning_keep_recent = reader.string();
          break;
        case 3:
          message.pruning_interval = reader.string();
          break;
        case 4:
          message.halt_height = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConfigResponse {
    return {
      minimum_gas_price: isSet(object.minimum_gas_price)
        ? String(object.minimum_gas_price)
        : "",
      pruning_keep_recent: isSet(object.pruning_keep_recent)
        ? String(object.pruning_keep_recent)
        : "",
      pruning_interval: isSet(object.pruning_interval)
        ? String(object.pruning_interval)
        : "",
      halt_height: isSet(object.halt_height) ? String(object.halt_height) : "0",
    };
  },

  toJSON(message: ConfigResponse): unknown {
    const obj: any = {};
    message.minimum_gas_price !== undefined &&
      (obj.minimum_gas_price = message.minimum_gas_price);
    message.pruning_keep_recent !== undefined &&
      (obj.pruning_keep_recent = message.pruning_keep_recent);
    message.pruning_interval !== undefined &&
      (obj.pruning_interval = message.pruning_interval);
    message.halt_height !== undefined &&
      (obj.halt_height = message.halt_height);
    return obj;
  },

  fromPartial(object: DeepPartial<ConfigResponse>): ConfigResponse {
    const message = createBaseConfigResponse();
    message.minimum_gas_price = object.minimum_gas_price ?? "";
    message.pruning_keep_recent = object.pruning_keep_recent ?? "";
    message.pruning_interval = object.pruning_interval ?? "";
    message.halt_height = object.halt_height ?? "0";
    return message;
  },
};

function createBaseStatusRequest(): StatusRequest {
  return {};
}

export const StatusRequest = {
  encode(
    _: StatusRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusRequest();
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

  fromJSON(_: any): StatusRequest {
    return {};
  },

  toJSON(_: StatusRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<StatusRequest>): StatusRequest {
    const message = createBaseStatusRequest();
    return message;
  },
};

function createBaseStatusResponse(): StatusResponse {
  return {
    earliest_store_height: "0",
    height: "0",
    timestamp: undefined,
    app_hash: new Uint8Array(),
    validator_hash: new Uint8Array(),
  };
}

export const StatusResponse = {
  encode(
    message: StatusResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.earliest_store_height !== "0") {
      writer.uint32(8).uint64(message.earliest_store_height);
    }
    if (message.height !== "0") {
      writer.uint32(16).uint64(message.height);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(message.timestamp, writer.uint32(26).fork()).ldelim();
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(34).bytes(message.app_hash);
    }
    if (message.validator_hash.length !== 0) {
      writer.uint32(42).bytes(message.validator_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.earliest_store_height = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.height = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.timestamp = Timestamp.decode(reader, reader.uint32());
          break;
        case 4:
          message.app_hash = reader.bytes();
          break;
        case 5:
          message.validator_hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusResponse {
    return {
      earliest_store_height: isSet(object.earliest_store_height)
        ? String(object.earliest_store_height)
        : "0",
      height: isSet(object.height) ? String(object.height) : "0",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      app_hash: isSet(object.app_hash)
        ? bytesFromBase64(object.app_hash)
        : new Uint8Array(),
      validator_hash: isSet(object.validator_hash)
        ? bytesFromBase64(object.validator_hash)
        : new Uint8Array(),
    };
  },

  toJSON(message: StatusResponse): unknown {
    const obj: any = {};
    message.earliest_store_height !== undefined &&
      (obj.earliest_store_height = message.earliest_store_height);
    message.height !== undefined && (obj.height = message.height);
    message.timestamp !== undefined &&
      (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
    message.app_hash !== undefined &&
      (obj.app_hash = base64FromBytes(
        message.app_hash !== undefined ? message.app_hash : new Uint8Array(),
      ));
    message.validator_hash !== undefined &&
      (obj.validator_hash = base64FromBytes(
        message.validator_hash !== undefined
          ? message.validator_hash
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<StatusResponse>): StatusResponse {
    const message = createBaseStatusResponse();
    message.earliest_store_height = object.earliest_store_height ?? "0";
    message.height = object.height ?? "0";
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Timestamp.fromPartial(object.timestamp)
        : undefined;
    message.app_hash = object.app_hash ?? new Uint8Array();
    message.validator_hash = object.validator_hash ?? new Uint8Array();
    return message;
  },
};

/** Service defines the gRPC querier service for node related queries. */
export interface Service {
  /** Config queries for the operator configuration. */
  Config(request: ConfigRequest): Promise<ConfigResponse>;
  /** Status queries for the node status. */
  Status(request: StatusRequest): Promise<StatusResponse>;
}

export class ServiceClientImpl implements Service {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Config = this.Config.bind(this);
    this.Status = this.Status.bind(this);
  }
  Config(request: ConfigRequest): Promise<ConfigResponse> {
    const data = ConfigRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.node.v1beta1.Service",
      "Config",
      data,
    );
    return promise.then((data) => ConfigResponse.decode(new _m0.Reader(data)));
  }

  Status(request: StatusRequest): Promise<StatusResponse> {
    const data = StatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.node.v1beta1.Service",
      "Status",
      data,
    );
    return promise.then((data) => StatusResponse.decode(new _m0.Reader(data)));
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

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000).toString();
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = Number(t.seconds) * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Timestamp {
  if (o instanceof Date) {
    return toTimestamp(o);
  } else if (typeof o === "string") {
    return toTimestamp(new Date(o));
  } else {
    return Timestamp.fromJSON(o);
  }
}

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
