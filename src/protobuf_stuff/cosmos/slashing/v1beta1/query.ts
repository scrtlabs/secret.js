/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import {
  Params,
  ValidatorSigningInfo,
} from "../../../cosmos/slashing/v1beta1/slashing";
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "cosmos.slashing.v1beta1";

/** QueryParamsRequest is the request type for the Query/Params RPC method */
export interface QueryParamsRequest {}

/** QueryParamsResponse is the response type for the Query/Params RPC method */
export interface QueryParamsResponse {
  params?: Params;
}

/**
 * QuerySigningInfoRequest is the request type for the Query/SigningInfo RPC
 * method
 */
export interface QuerySigningInfoRequest {
  /** cons_address is the address to query signing info of */
  consAddress: string;
}

/**
 * QuerySigningInfoResponse is the response type for the Query/SigningInfo RPC
 * method
 */
export interface QuerySigningInfoResponse {
  /** val_signing_info is the signing info of requested val cons address */
  valSigningInfo?: ValidatorSigningInfo;
}

/**
 * QuerySigningInfosRequest is the request type for the Query/SigningInfos RPC
 * method
 */
export interface QuerySigningInfosRequest {
  pagination?: PageRequest;
}

/**
 * QuerySigningInfosResponse is the response type for the Query/SigningInfos RPC
 * method
 */
export interface QuerySigningInfosResponse {
  /** info is the signing info of all validators */
  info: ValidatorSigningInfo[];
  pagination?: PageResponse;
}

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

function createBaseQuerySigningInfoRequest(): QuerySigningInfoRequest {
  return { consAddress: "" };
}

export const QuerySigningInfoRequest = {
  encode(
    message: QuerySigningInfoRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consAddress !== "") {
      writer.uint32(10).string(message.consAddress);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QuerySigningInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySigningInfoRequest {
    return {
      consAddress: isSet(object.consAddress) ? String(object.consAddress) : "",
    };
  },

  toJSON(message: QuerySigningInfoRequest): unknown {
    const obj: any = {};
    message.consAddress !== undefined &&
      (obj.consAddress = message.consAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySigningInfoRequest>, I>>(
    object: I,
  ): QuerySigningInfoRequest {
    const message = createBaseQuerySigningInfoRequest();
    message.consAddress = object.consAddress ?? "";
    return message;
  },
};

function createBaseQuerySigningInfoResponse(): QuerySigningInfoResponse {
  return { valSigningInfo: undefined };
}

export const QuerySigningInfoResponse = {
  encode(
    message: QuerySigningInfoResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.valSigningInfo !== undefined) {
      ValidatorSigningInfo.encode(
        message.valSigningInfo,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QuerySigningInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valSigningInfo = ValidatorSigningInfo.decode(
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

  fromJSON(object: any): QuerySigningInfoResponse {
    return {
      valSigningInfo: isSet(object.valSigningInfo)
        ? ValidatorSigningInfo.fromJSON(object.valSigningInfo)
        : undefined,
    };
  },

  toJSON(message: QuerySigningInfoResponse): unknown {
    const obj: any = {};
    message.valSigningInfo !== undefined &&
      (obj.valSigningInfo = message.valSigningInfo
        ? ValidatorSigningInfo.toJSON(message.valSigningInfo)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySigningInfoResponse>, I>>(
    object: I,
  ): QuerySigningInfoResponse {
    const message = createBaseQuerySigningInfoResponse();
    message.valSigningInfo =
      object.valSigningInfo !== undefined && object.valSigningInfo !== null
        ? ValidatorSigningInfo.fromPartial(object.valSigningInfo)
        : undefined;
    return message;
  },
};

function createBaseQuerySigningInfosRequest(): QuerySigningInfosRequest {
  return { pagination: undefined };
}

export const QuerySigningInfosRequest = {
  encode(
    message: QuerySigningInfosRequest,
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
  ): QuerySigningInfosRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningInfosRequest();
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

  fromJSON(object: any): QuerySigningInfosRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QuerySigningInfosRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySigningInfosRequest>, I>>(
    object: I,
  ): QuerySigningInfosRequest {
    const message = createBaseQuerySigningInfosRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQuerySigningInfosResponse(): QuerySigningInfosResponse {
  return { info: [], pagination: undefined };
}

export const QuerySigningInfosResponse = {
  encode(
    message: QuerySigningInfosResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.info) {
      ValidatorSigningInfo.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QuerySigningInfosResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningInfosResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.info.push(
            ValidatorSigningInfo.decode(reader, reader.uint32()),
          );
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

  fromJSON(object: any): QuerySigningInfosResponse {
    return {
      info: Array.isArray(object?.info)
        ? object.info.map((e: any) => ValidatorSigningInfo.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QuerySigningInfosResponse): unknown {
    const obj: any = {};
    if (message.info) {
      obj.info = message.info.map((e) =>
        e ? ValidatorSigningInfo.toJSON(e) : undefined,
      );
    } else {
      obj.info = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySigningInfosResponse>, I>>(
    object: I,
  ): QuerySigningInfosResponse {
    const message = createBaseQuerySigningInfosResponse();
    message.info =
      object.info?.map((e) => ValidatorSigningInfo.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

/** Query provides defines the gRPC querier service */
export interface Query {
  /** Params queries the parameters of slashing module */
  params(
    request: DeepPartial<QueryParamsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryParamsResponse>;
  /** SigningInfo queries the signing info of given cons address */
  signingInfo(
    request: DeepPartial<QuerySigningInfoRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QuerySigningInfoResponse>;
  /** SigningInfos queries signing info of all validators */
  signingInfos(
    request: DeepPartial<QuerySigningInfosRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QuerySigningInfosResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.signingInfo = this.signingInfo.bind(this);
    this.signingInfos = this.signingInfos.bind(this);
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

  signingInfo(
    request: DeepPartial<QuerySigningInfoRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QuerySigningInfoResponse> {
    return this.rpc.unary(
      QuerySigningInfoDesc,
      QuerySigningInfoRequest.fromPartial(request),
      metadata,
    );
  }

  signingInfos(
    request: DeepPartial<QuerySigningInfosRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QuerySigningInfosResponse> {
    return this.rpc.unary(
      QuerySigningInfosDesc,
      QuerySigningInfosRequest.fromPartial(request),
      metadata,
    );
  }
}

export const QueryDesc = {
  serviceName: "cosmos.slashing.v1beta1.Query",
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

export const QuerySigningInfoDesc: UnaryMethodDefinitionish = {
  methodName: "SigningInfo",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QuerySigningInfoRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QuerySigningInfoResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QuerySigningInfosDesc: UnaryMethodDefinitionish = {
  methodName: "SigningInfos",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QuerySigningInfosRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QuerySigningInfosResponse.decode(data),
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
