/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  PageRequest,
  PageResponse,
} from "../../../../cosmos/base/query/v1beta1/pagination";

export const protobufPackage = "ibc.lightclients.wasm.v1";

/** QueryChecksumsRequest is the request type for the Query/Checksums RPC method. */
export interface QueryChecksumsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** QueryChecksumsResponse is the response type for the Query/Checksums RPC method. */
export interface QueryChecksumsResponse {
  /** checksums is a list of the hex encoded checksums of all wasm codes stored. */
  checksums: string[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryCodeRequest is the request type for the Query/Code RPC method. */
export interface QueryCodeRequest {
  /** checksum is a hex encoded string of the code stored. */
  checksum: string;
}

/** QueryCodeResponse is the response type for the Query/Code RPC method. */
export interface QueryCodeResponse {
  data: Uint8Array;
}

function createBaseQueryChecksumsRequest(): QueryChecksumsRequest {
  return { pagination: undefined };
}

export const QueryChecksumsRequest = {
  encode(
    message: QueryChecksumsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryChecksumsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChecksumsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryChecksumsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryChecksumsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryChecksumsRequest>,
  ): QueryChecksumsRequest {
    const message = createBaseQueryChecksumsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryChecksumsResponse(): QueryChecksumsResponse {
  return { checksums: [], pagination: undefined };
}

export const QueryChecksumsResponse = {
  encode(
    message: QueryChecksumsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.checksums) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryChecksumsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChecksumsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.checksums.push(reader.string());
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryChecksumsResponse {
    return {
      checksums: Array.isArray(object?.checksums)
        ? object.checksums.map((e: any) => String(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryChecksumsResponse): unknown {
    const obj: any = {};
    if (message.checksums) {
      obj.checksums = message.checksums.map((e) => e);
    } else {
      obj.checksums = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryChecksumsResponse>,
  ): QueryChecksumsResponse {
    const message = createBaseQueryChecksumsResponse();
    message.checksums = object.checksums?.map((e) => e) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryCodeRequest(): QueryCodeRequest {
  return { checksum: "" };
}

export const QueryCodeRequest = {
  encode(
    message: QueryCodeRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.checksum !== "") {
      writer.uint32(10).string(message.checksum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCodeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.checksum = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCodeRequest {
    return {
      checksum: isSet(object.checksum) ? String(object.checksum) : "",
    };
  },

  toJSON(message: QueryCodeRequest): unknown {
    const obj: any = {};
    message.checksum !== undefined && (obj.checksum = message.checksum);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryCodeRequest>): QueryCodeRequest {
    const message = createBaseQueryCodeRequest();
    message.checksum = object.checksum ?? "";
    return message;
  },
};

function createBaseQueryCodeResponse(): QueryCodeResponse {
  return { data: new Uint8Array() };
}

export const QueryCodeResponse = {
  encode(
    message: QueryCodeResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCodeResponse {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: QueryCodeResponse): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<QueryCodeResponse>): QueryCodeResponse {
    const message = createBaseQueryCodeResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

/** Query service for wasm module */
export interface Query {
  /** Get all Wasm checksums */
  Checksums(request: QueryChecksumsRequest): Promise<QueryChecksumsResponse>;
  /** Get Wasm code for given checksum */
  Code(request: QueryCodeRequest): Promise<QueryCodeResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Checksums = this.Checksums.bind(this);
    this.Code = this.Code.bind(this);
  }
  Checksums(request: QueryChecksumsRequest): Promise<QueryChecksumsResponse> {
    const data = QueryChecksumsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.lightclients.wasm.v1.Query",
      "Checksums",
      data,
    );
    return promise.then((data) =>
      QueryChecksumsResponse.decode(new _m0.Reader(data)),
    );
  }

  Code(request: QueryCodeRequest): Promise<QueryCodeResponse> {
    const data = QueryCodeRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.lightclients.wasm.v1.Query",
      "Code",
      data,
    );
    return promise.then((data) =>
      QueryCodeResponse.decode(new _m0.Reader(data)),
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
