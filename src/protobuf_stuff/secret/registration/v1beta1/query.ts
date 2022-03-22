/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "../../../google/protobuf/empty";
import { Key } from "../../../secret/registration/v1beta1/msg";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "secret.registration.v1beta1";

export interface QueryEncryptedSeedRequest {
  pubKey: Uint8Array;
}

export interface QueryEncryptedSeedResponse {
  /** [(gogoproto.nullable) = false]; */
  encryptedSeed: Uint8Array;
}

function createBaseQueryEncryptedSeedRequest(): QueryEncryptedSeedRequest {
  return { pubKey: new Uint8Array() };
}

export const QueryEncryptedSeedRequest = {
  encode(
    message: QueryEncryptedSeedRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pubKey.length !== 0) {
      writer.uint32(10).bytes(message.pubKey);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryEncryptedSeedRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEncryptedSeedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pubKey = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryEncryptedSeedRequest {
    return {
      pubKey: isSet(object.pubKey)
        ? bytesFromBase64(object.pubKey)
        : new Uint8Array(),
    };
  },

  toJSON(message: QueryEncryptedSeedRequest): unknown {
    const obj: any = {};
    message.pubKey !== undefined &&
      (obj.pubKey = base64FromBytes(
        message.pubKey !== undefined ? message.pubKey : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryEncryptedSeedRequest>, I>>(
    object: I,
  ): QueryEncryptedSeedRequest {
    const message = createBaseQueryEncryptedSeedRequest();
    message.pubKey = object.pubKey ?? new Uint8Array();
    return message;
  },
};

function createBaseQueryEncryptedSeedResponse(): QueryEncryptedSeedResponse {
  return { encryptedSeed: new Uint8Array() };
}

export const QueryEncryptedSeedResponse = {
  encode(
    message: QueryEncryptedSeedResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.encryptedSeed.length !== 0) {
      writer.uint32(10).bytes(message.encryptedSeed);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryEncryptedSeedResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEncryptedSeedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.encryptedSeed = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryEncryptedSeedResponse {
    return {
      encryptedSeed: isSet(object.encryptedSeed)
        ? bytesFromBase64(object.encryptedSeed)
        : new Uint8Array(),
    };
  },

  toJSON(message: QueryEncryptedSeedResponse): unknown {
    const obj: any = {};
    message.encryptedSeed !== undefined &&
      (obj.encryptedSeed = base64FromBytes(
        message.encryptedSeed !== undefined
          ? message.encryptedSeed
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryEncryptedSeedResponse>, I>>(
    object: I,
  ): QueryEncryptedSeedResponse {
    const message = createBaseQueryEncryptedSeedResponse();
    message.encryptedSeed = object.encryptedSeed ?? new Uint8Array();
    return message;
  },
};

/** Query provides defines the gRPC querier service */
export interface Query {
  /** Returns the key used for transactions */
  txKey(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<Key>;
  /** Returns the key used for registration */
  registrationKey(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata,
  ): Promise<Key>;
  /** Returns the encrypted seed for a registered node by public key */
  encryptedSeed(
    request: DeepPartial<QueryEncryptedSeedRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryEncryptedSeedResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.txKey = this.txKey.bind(this);
    this.registrationKey = this.registrationKey.bind(this);
    this.encryptedSeed = this.encryptedSeed.bind(this);
  }

  txKey(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<Key> {
    return this.rpc.unary(QueryTxKeyDesc, Empty.fromPartial(request), metadata);
  }

  registrationKey(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata,
  ): Promise<Key> {
    return this.rpc.unary(
      QueryRegistrationKeyDesc,
      Empty.fromPartial(request),
      metadata,
    );
  }

  encryptedSeed(
    request: DeepPartial<QueryEncryptedSeedRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryEncryptedSeedResponse> {
    return this.rpc.unary(
      QueryEncryptedSeedDesc,
      QueryEncryptedSeedRequest.fromPartial(request),
      metadata,
    );
  }
}

export const QueryDesc = {
  serviceName: "secret.registration.v1beta1.Query",
};

export const QueryTxKeyDesc: UnaryMethodDefinitionish = {
  methodName: "TxKey",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...Key.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryRegistrationKeyDesc: UnaryMethodDefinitionish = {
  methodName: "RegistrationKey",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...Key.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryEncryptedSeedDesc: UnaryMethodDefinitionish = {
  methodName: "EncryptedSeed",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryEncryptedSeedRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryEncryptedSeedResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR
  extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({
            ...this.options?.metadata.headersMap,
            ...metadata?.headersMap,
          })
        : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message);
          } else {
            const err = new Error(response.statusMessage) as any;
            err.code = response.status;
            err.metadata = response.trailers;
            reject(err);
          }
        },
      });
    });
  }
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
