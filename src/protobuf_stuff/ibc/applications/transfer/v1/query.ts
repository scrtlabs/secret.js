/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import {
  DenomTrace,
  Params,
} from "../../../../ibc/applications/transfer/v1/transfer";
import {
  PageRequest,
  PageResponse,
} from "../../../../cosmos/base/query/v1beta1/pagination";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "ibc.applications.transfer.v1";

/**
 * QueryDenomTraceRequest is the request type for the Query/DenomTrace RPC
 * method
 */
export interface QueryDenomTraceRequest {
  /** hash (in hex format) of the denomination trace information. */
  hash: string;
}

/**
 * QueryDenomTraceResponse is the response type for the Query/DenomTrace RPC
 * method.
 */
export interface QueryDenomTraceResponse {
  /** denom_trace returns the requested denomination trace information. */
  denomTrace?: DenomTrace;
}

/**
 * QueryConnectionsRequest is the request type for the Query/DenomTraces RPC
 * method
 */
export interface QueryDenomTracesRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/**
 * QueryConnectionsResponse is the response type for the Query/DenomTraces RPC
 * method.
 */
export interface QueryDenomTracesResponse {
  /** denom_traces returns all denominations trace information. */
  denomTraces: DenomTrace[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: Params;
}

function createBaseQueryDenomTraceRequest(): QueryDenomTraceRequest {
  return { hash: "" };
}

export const QueryDenomTraceRequest = {
  encode(
    message: QueryDenomTraceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryDenomTraceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTraceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomTraceRequest {
    return {
      hash: isSet(object.hash) ? String(object.hash) : "",
    };
  },

  toJSON(message: QueryDenomTraceRequest): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomTraceRequest>, I>>(
    object: I,
  ): QueryDenomTraceRequest {
    const message = createBaseQueryDenomTraceRequest();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseQueryDenomTraceResponse(): QueryDenomTraceResponse {
  return { denomTrace: undefined };
}

export const QueryDenomTraceResponse = {
  encode(
    message: QueryDenomTraceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.denomTrace !== undefined) {
      DenomTrace.encode(message.denomTrace, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryDenomTraceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTraceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomTrace = DenomTrace.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomTraceResponse {
    return {
      denomTrace: isSet(object.denomTrace)
        ? DenomTrace.fromJSON(object.denomTrace)
        : undefined,
    };
  },

  toJSON(message: QueryDenomTraceResponse): unknown {
    const obj: any = {};
    message.denomTrace !== undefined &&
      (obj.denomTrace = message.denomTrace
        ? DenomTrace.toJSON(message.denomTrace)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomTraceResponse>, I>>(
    object: I,
  ): QueryDenomTraceResponse {
    const message = createBaseQueryDenomTraceResponse();
    message.denomTrace =
      object.denomTrace !== undefined && object.denomTrace !== null
        ? DenomTrace.fromPartial(object.denomTrace)
        : undefined;
    return message;
  },
};

function createBaseQueryDenomTracesRequest(): QueryDenomTracesRequest {
  return { pagination: undefined };
}

export const QueryDenomTracesRequest = {
  encode(
    message: QueryDenomTracesRequest,
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
  ): QueryDenomTracesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTracesRequest();
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

  fromJSON(object: any): QueryDenomTracesRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryDenomTracesRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomTracesRequest>, I>>(
    object: I,
  ): QueryDenomTracesRequest {
    const message = createBaseQueryDenomTracesRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryDenomTracesResponse(): QueryDenomTracesResponse {
  return { denomTraces: [], pagination: undefined };
}

export const QueryDenomTracesResponse = {
  encode(
    message: QueryDenomTracesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.denomTraces) {
      DenomTrace.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryDenomTracesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTracesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomTraces.push(DenomTrace.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryDenomTracesResponse {
    return {
      denomTraces: Array.isArray(object?.denomTraces)
        ? object.denomTraces.map((e: any) => DenomTrace.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryDenomTracesResponse): unknown {
    const obj: any = {};
    if (message.denomTraces) {
      obj.denomTraces = message.denomTraces.map((e) =>
        e ? DenomTrace.toJSON(e) : undefined,
      );
    } else {
      obj.denomTraces = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomTracesResponse>, I>>(
    object: I,
  ): QueryDenomTracesResponse {
    const message = createBaseQueryDenomTracesResponse();
    message.denomTraces =
      object.denomTraces?.map((e) => DenomTrace.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(
    _: QueryParamsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(
    _: I,
  ): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(
    object: I,
  ): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

/** Query provides defines the gRPC querier service. */
export interface Query {
  /** DenomTrace queries a denomination trace information. */
  denomTrace(
    request: DeepPartial<QueryDenomTraceRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryDenomTraceResponse>;
  /** DenomTraces queries all denomination traces. */
  denomTraces(
    request: DeepPartial<QueryDenomTracesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryDenomTracesResponse>;
  /** Params queries all parameters of the ibc-transfer module. */
  params(
    request: DeepPartial<QueryParamsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryParamsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.denomTrace = this.denomTrace.bind(this);
    this.denomTraces = this.denomTraces.bind(this);
    this.params = this.params.bind(this);
  }

  denomTrace(
    request: DeepPartial<QueryDenomTraceRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryDenomTraceResponse> {
    return this.rpc.unary(
      QueryDenomTraceDesc,
      QueryDenomTraceRequest.fromPartial(request),
      metadata,
    );
  }

  denomTraces(
    request: DeepPartial<QueryDenomTracesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryDenomTracesResponse> {
    return this.rpc.unary(
      QueryDenomTracesDesc,
      QueryDenomTracesRequest.fromPartial(request),
      metadata,
    );
  }

  params(
    request: DeepPartial<QueryParamsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryParamsResponse> {
    return this.rpc.unary(
      QueryParamsDesc,
      QueryParamsRequest.fromPartial(request),
      metadata,
    );
  }
}

export const QueryDesc = {
  serviceName: "ibc.applications.transfer.v1.Query",
};

export const QueryDenomTraceDesc: UnaryMethodDefinitionish = {
  methodName: "DenomTrace",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryDenomTraceRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryDenomTraceResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryDenomTracesDesc: UnaryMethodDefinitionish = {
  methodName: "DenomTraces",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryDenomTracesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryDenomTracesResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryParamsDesc: UnaryMethodDefinitionish = {
  methodName: "Params",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryParamsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryParamsResponse.decode(data),
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
