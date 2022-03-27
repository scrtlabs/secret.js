/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "cosmos.base.reflection.v1beta1";

/** ListAllInterfacesRequest is the request type of the ListAllInterfaces RPC. */
export interface ListAllInterfacesRequest {}

/** ListAllInterfacesResponse is the response type of the ListAllInterfaces RPC. */
export interface ListAllInterfacesResponse {
  /** interface_names is an array of all the registered interfaces. */
  interfaceNames: string[];
}

/**
 * ListImplementationsRequest is the request type of the ListImplementations
 * RPC.
 */
export interface ListImplementationsRequest {
  /** interface_name defines the interface to query the implementations for. */
  interfaceName: string;
}

/**
 * ListImplementationsResponse is the response type of the ListImplementations
 * RPC.
 */
export interface ListImplementationsResponse {
  implementationMessageNames: string[];
}

function createBaseListAllInterfacesRequest(): ListAllInterfacesRequest {
  return {};
}

export const ListAllInterfacesRequest = {
  encode(
    _: ListAllInterfacesRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ListAllInterfacesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAllInterfacesRequest();
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

  fromJSON(_: any): ListAllInterfacesRequest {
    return {};
  },

  toJSON(_: ListAllInterfacesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListAllInterfacesRequest>, I>>(
    _: I,
  ): ListAllInterfacesRequest {
    const message = createBaseListAllInterfacesRequest();
    return message;
  },
};

function createBaseListAllInterfacesResponse(): ListAllInterfacesResponse {
  return { interfaceNames: [] };
}

export const ListAllInterfacesResponse = {
  encode(
    message: ListAllInterfacesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.interfaceNames) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ListAllInterfacesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAllInterfacesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interfaceNames.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListAllInterfacesResponse {
    return {
      interfaceNames: Array.isArray(object?.interfaceNames)
        ? object.interfaceNames.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ListAllInterfacesResponse): unknown {
    const obj: any = {};
    if (message.interfaceNames) {
      obj.interfaceNames = message.interfaceNames.map((e) => e);
    } else {
      obj.interfaceNames = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListAllInterfacesResponse>, I>>(
    object: I,
  ): ListAllInterfacesResponse {
    const message = createBaseListAllInterfacesResponse();
    message.interfaceNames = object.interfaceNames?.map((e) => e) || [];
    return message;
  },
};

function createBaseListImplementationsRequest(): ListImplementationsRequest {
  return { interfaceName: "" };
}

export const ListImplementationsRequest = {
  encode(
    message: ListImplementationsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.interfaceName !== "") {
      writer.uint32(10).string(message.interfaceName);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ListImplementationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListImplementationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interfaceName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListImplementationsRequest {
    return {
      interfaceName: isSet(object.interfaceName)
        ? String(object.interfaceName)
        : "",
    };
  },

  toJSON(message: ListImplementationsRequest): unknown {
    const obj: any = {};
    message.interfaceName !== undefined &&
      (obj.interfaceName = message.interfaceName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListImplementationsRequest>, I>>(
    object: I,
  ): ListImplementationsRequest {
    const message = createBaseListImplementationsRequest();
    message.interfaceName = object.interfaceName ?? "";
    return message;
  },
};

function createBaseListImplementationsResponse(): ListImplementationsResponse {
  return { implementationMessageNames: [] };
}

export const ListImplementationsResponse = {
  encode(
    message: ListImplementationsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.implementationMessageNames) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ListImplementationsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListImplementationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.implementationMessageNames.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListImplementationsResponse {
    return {
      implementationMessageNames: Array.isArray(
        object?.implementationMessageNames,
      )
        ? object.implementationMessageNames.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ListImplementationsResponse): unknown {
    const obj: any = {};
    if (message.implementationMessageNames) {
      obj.implementationMessageNames = message.implementationMessageNames.map(
        (e) => e,
      );
    } else {
      obj.implementationMessageNames = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListImplementationsResponse>, I>>(
    object: I,
  ): ListImplementationsResponse {
    const message = createBaseListImplementationsResponse();
    message.implementationMessageNames =
      object.implementationMessageNames?.map((e) => e) || [];
    return message;
  },
};

/** ReflectionService defines a service for interface reflection. */
export interface ReflectionService {
  /**
   * ListAllInterfaces lists all the interfaces registered in the interface
   * registry.
   */
  listAllInterfaces(
    request: DeepPartial<ListAllInterfacesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListAllInterfacesResponse>;
  /**
   * ListImplementations list all the concrete types that implement a given
   * interface.
   */
  listImplementations(
    request: DeepPartial<ListImplementationsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListImplementationsResponse>;
}

export class ReflectionServiceClientImpl implements ReflectionService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.listAllInterfaces = this.listAllInterfaces.bind(this);
    this.listImplementations = this.listImplementations.bind(this);
  }

  listAllInterfaces(
    request: DeepPartial<ListAllInterfacesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListAllInterfacesResponse> {
    return this.rpc.unary(
      ReflectionServiceListAllInterfacesDesc,
      ListAllInterfacesRequest.fromPartial(request),
      metadata,
    );
  }

  listImplementations(
    request: DeepPartial<ListImplementationsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListImplementationsResponse> {
    return this.rpc.unary(
      ReflectionServiceListImplementationsDesc,
      ListImplementationsRequest.fromPartial(request),
      metadata,
    );
  }
}

export const ReflectionServiceDesc = {
  serviceName: "cosmos.base.reflection.v1beta1.ReflectionService",
};

export const ReflectionServiceListAllInterfacesDesc: UnaryMethodDefinitionish =
  {
    methodName: "ListAllInterfaces",
    service: ReflectionServiceDesc,
    requestStream: false,
    responseStream: false,
    requestType: {
      serializeBinary() {
        return ListAllInterfacesRequest.encode(this).finish();
      },
    } as any,
    responseType: {
      deserializeBinary(data: Uint8Array) {
        return {
          ...ListAllInterfacesResponse.decode(data),
          toObject() {
            return this;
          },
        };
      },
    } as any,
  };

export const ReflectionServiceListImplementationsDesc: UnaryMethodDefinitionish =
  {
    methodName: "ListImplementations",
    service: ReflectionServiceDesc,
    requestStream: false,
    responseStream: false,
    requestType: {
      serializeBinary() {
        return ListImplementationsRequest.encode(this).finish();
      },
    } as any,
    responseType: {
      deserializeBinary(data: Uint8Array) {
        return {
          ...ListImplementationsResponse.decode(data),
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
