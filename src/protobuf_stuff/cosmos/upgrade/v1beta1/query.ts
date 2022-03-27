/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import { Plan, ModuleVersion } from "../../../cosmos/upgrade/v1beta1/upgrade";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "cosmos.upgrade.v1beta1";

/**
 * QueryCurrentPlanRequest is the request type for the Query/CurrentPlan RPC
 * method.
 */
export interface QueryCurrentPlanRequest {}

/**
 * QueryCurrentPlanResponse is the response type for the Query/CurrentPlan RPC
 * method.
 */
export interface QueryCurrentPlanResponse {
  /** plan is the current upgrade plan. */
  plan?: Plan;
}

/**
 * QueryCurrentPlanRequest is the request type for the Query/AppliedPlan RPC
 * method.
 */
export interface QueryAppliedPlanRequest {
  /** name is the name of the applied plan to query for. */
  name: string;
}

/**
 * QueryAppliedPlanResponse is the response type for the Query/AppliedPlan RPC
 * method.
 */
export interface QueryAppliedPlanResponse {
  /** height is the block height at which the plan was applied. */
  height: string;
}

/**
 * QueryUpgradedConsensusStateRequest is the request type for the Query/UpgradedConsensusState
 * RPC method.
 */
export interface QueryUpgradedConsensusStateRequest {
  /**
   * last height of the current chain must be sent in request
   * as this is the height under which next consensus state is stored
   */
  lastHeight: string;
}

/**
 * QueryUpgradedConsensusStateResponse is the response type for the Query/UpgradedConsensusState
 * RPC method.
 */
export interface QueryUpgradedConsensusStateResponse {
  upgradedConsensusState: Uint8Array;
}

/**
 * QueryModuleVersionsRequest is the request type for the Query/ModuleVersions
 * RPC method.
 */
export interface QueryModuleVersionsRequest {
  /**
   * module_name is a field to query a specific module
   * consensus version from state. Leaving this empty will
   * fetch the full list of module versions from state
   */
  moduleName: string;
}

/**
 * QueryModuleVersionsResponse is the response type for the Query/ModuleVersions
 * RPC method.
 */
export interface QueryModuleVersionsResponse {
  /** module_versions is a list of module names with their consensus versions. */
  moduleVersions: ModuleVersion[];
}

function createBaseQueryCurrentPlanRequest(): QueryCurrentPlanRequest {
  return {};
}

export const QueryCurrentPlanRequest = {
  encode(
    _: QueryCurrentPlanRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryCurrentPlanRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentPlanRequest();
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

  fromJSON(_: any): QueryCurrentPlanRequest {
    return {};
  },

  toJSON(_: QueryCurrentPlanRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCurrentPlanRequest>, I>>(
    _: I,
  ): QueryCurrentPlanRequest {
    const message = createBaseQueryCurrentPlanRequest();
    return message;
  },
};

function createBaseQueryCurrentPlanResponse(): QueryCurrentPlanResponse {
  return { plan: undefined };
}

export const QueryCurrentPlanResponse = {
  encode(
    message: QueryCurrentPlanResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.plan !== undefined) {
      Plan.encode(message.plan, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryCurrentPlanResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentPlanResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.plan = Plan.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCurrentPlanResponse {
    return {
      plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
    };
  },

  toJSON(message: QueryCurrentPlanResponse): unknown {
    const obj: any = {};
    message.plan !== undefined &&
      (obj.plan = message.plan ? Plan.toJSON(message.plan) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCurrentPlanResponse>, I>>(
    object: I,
  ): QueryCurrentPlanResponse {
    const message = createBaseQueryCurrentPlanResponse();
    message.plan =
      object.plan !== undefined && object.plan !== null
        ? Plan.fromPartial(object.plan)
        : undefined;
    return message;
  },
};

function createBaseQueryAppliedPlanRequest(): QueryAppliedPlanRequest {
  return { name: "" };
}

export const QueryAppliedPlanRequest = {
  encode(
    message: QueryAppliedPlanRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryAppliedPlanRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAppliedPlanRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAppliedPlanRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: QueryAppliedPlanRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAppliedPlanRequest>, I>>(
    object: I,
  ): QueryAppliedPlanRequest {
    const message = createBaseQueryAppliedPlanRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseQueryAppliedPlanResponse(): QueryAppliedPlanResponse {
  return { height: "0" };
}

export const QueryAppliedPlanResponse = {
  encode(
    message: QueryAppliedPlanResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryAppliedPlanResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAppliedPlanResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAppliedPlanResponse {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
    };
  },

  toJSON(message: QueryAppliedPlanResponse): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAppliedPlanResponse>, I>>(
    object: I,
  ): QueryAppliedPlanResponse {
    const message = createBaseQueryAppliedPlanResponse();
    message.height = object.height ?? "0";
    return message;
  },
};

function createBaseQueryUpgradedConsensusStateRequest(): QueryUpgradedConsensusStateRequest {
  return { lastHeight: "0" };
}

export const QueryUpgradedConsensusStateRequest = {
  encode(
    message: QueryUpgradedConsensusStateRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.lastHeight !== "0") {
      writer.uint32(8).int64(message.lastHeight);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryUpgradedConsensusStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedConsensusStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastHeight = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryUpgradedConsensusStateRequest {
    return {
      lastHeight: isSet(object.lastHeight) ? String(object.lastHeight) : "0",
    };
  },

  toJSON(message: QueryUpgradedConsensusStateRequest): unknown {
    const obj: any = {};
    message.lastHeight !== undefined && (obj.lastHeight = message.lastHeight);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryUpgradedConsensusStateRequest>, I>,
  >(object: I): QueryUpgradedConsensusStateRequest {
    const message = createBaseQueryUpgradedConsensusStateRequest();
    message.lastHeight = object.lastHeight ?? "0";
    return message;
  },
};

function createBaseQueryUpgradedConsensusStateResponse(): QueryUpgradedConsensusStateResponse {
  return { upgradedConsensusState: new Uint8Array() };
}

export const QueryUpgradedConsensusStateResponse = {
  encode(
    message: QueryUpgradedConsensusStateResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.upgradedConsensusState.length !== 0) {
      writer.uint32(18).bytes(message.upgradedConsensusState);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryUpgradedConsensusStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedConsensusStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.upgradedConsensusState = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryUpgradedConsensusStateResponse {
    return {
      upgradedConsensusState: isSet(object.upgradedConsensusState)
        ? bytesFromBase64(object.upgradedConsensusState)
        : new Uint8Array(),
    };
  },

  toJSON(message: QueryUpgradedConsensusStateResponse): unknown {
    const obj: any = {};
    message.upgradedConsensusState !== undefined &&
      (obj.upgradedConsensusState = base64FromBytes(
        message.upgradedConsensusState !== undefined
          ? message.upgradedConsensusState
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryUpgradedConsensusStateResponse>, I>,
  >(object: I): QueryUpgradedConsensusStateResponse {
    const message = createBaseQueryUpgradedConsensusStateResponse();
    message.upgradedConsensusState =
      object.upgradedConsensusState ?? new Uint8Array();
    return message;
  },
};

function createBaseQueryModuleVersionsRequest(): QueryModuleVersionsRequest {
  return { moduleName: "" };
}

export const QueryModuleVersionsRequest = {
  encode(
    message: QueryModuleVersionsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.moduleName !== "") {
      writer.uint32(10).string(message.moduleName);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryModuleVersionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleVersionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moduleName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryModuleVersionsRequest {
    return {
      moduleName: isSet(object.moduleName) ? String(object.moduleName) : "",
    };
  },

  toJSON(message: QueryModuleVersionsRequest): unknown {
    const obj: any = {};
    message.moduleName !== undefined && (obj.moduleName = message.moduleName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryModuleVersionsRequest>, I>>(
    object: I,
  ): QueryModuleVersionsRequest {
    const message = createBaseQueryModuleVersionsRequest();
    message.moduleName = object.moduleName ?? "";
    return message;
  },
};

function createBaseQueryModuleVersionsResponse(): QueryModuleVersionsResponse {
  return { moduleVersions: [] };
}

export const QueryModuleVersionsResponse = {
  encode(
    message: QueryModuleVersionsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.moduleVersions) {
      ModuleVersion.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryModuleVersionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleVersionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moduleVersions.push(
            ModuleVersion.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryModuleVersionsResponse {
    return {
      moduleVersions: Array.isArray(object?.moduleVersions)
        ? object.moduleVersions.map((e: any) => ModuleVersion.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryModuleVersionsResponse): unknown {
    const obj: any = {};
    if (message.moduleVersions) {
      obj.moduleVersions = message.moduleVersions.map((e) =>
        e ? ModuleVersion.toJSON(e) : undefined,
      );
    } else {
      obj.moduleVersions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryModuleVersionsResponse>, I>>(
    object: I,
  ): QueryModuleVersionsResponse {
    const message = createBaseQueryModuleVersionsResponse();
    message.moduleVersions =
      object.moduleVersions?.map((e) => ModuleVersion.fromPartial(e)) || [];
    return message;
  },
};

/** Query defines the gRPC upgrade querier service. */
export interface Query {
  /** CurrentPlan queries the current upgrade plan. */
  currentPlan(
    request: DeepPartial<QueryCurrentPlanRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCurrentPlanResponse>;
  /** AppliedPlan queries a previously applied upgrade plan by its name. */
  appliedPlan(
    request: DeepPartial<QueryAppliedPlanRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryAppliedPlanResponse>;
  /**
   * UpgradedConsensusState queries the consensus state that will serve
   * as a trusted kernel for the next version of this chain. It will only be
   * stored at the last height of this chain.
   * UpgradedConsensusState RPC not supported with legacy querier
   */
  upgradedConsensusState(
    request: DeepPartial<QueryUpgradedConsensusStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUpgradedConsensusStateResponse>;
  /** ModuleVersions queries the list of module versions from state. */
  moduleVersions(
    request: DeepPartial<QueryModuleVersionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryModuleVersionsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.currentPlan = this.currentPlan.bind(this);
    this.appliedPlan = this.appliedPlan.bind(this);
    this.upgradedConsensusState = this.upgradedConsensusState.bind(this);
    this.moduleVersions = this.moduleVersions.bind(this);
  }

  currentPlan(
    request: DeepPartial<QueryCurrentPlanRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCurrentPlanResponse> {
    return this.rpc.unary(
      QueryCurrentPlanDesc,
      QueryCurrentPlanRequest.fromPartial(request),
      metadata,
    );
  }

  appliedPlan(
    request: DeepPartial<QueryAppliedPlanRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryAppliedPlanResponse> {
    return this.rpc.unary(
      QueryAppliedPlanDesc,
      QueryAppliedPlanRequest.fromPartial(request),
      metadata,
    );
  }

  upgradedConsensusState(
    request: DeepPartial<QueryUpgradedConsensusStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUpgradedConsensusStateResponse> {
    return this.rpc.unary(
      QueryUpgradedConsensusStateDesc,
      QueryUpgradedConsensusStateRequest.fromPartial(request),
      metadata,
    );
  }

  moduleVersions(
    request: DeepPartial<QueryModuleVersionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryModuleVersionsResponse> {
    return this.rpc.unary(
      QueryModuleVersionsDesc,
      QueryModuleVersionsRequest.fromPartial(request),
      metadata,
    );
  }
}

export const QueryDesc = {
  serviceName: "cosmos.upgrade.v1beta1.Query",
};

export const QueryCurrentPlanDesc: UnaryMethodDefinitionish = {
  methodName: "CurrentPlan",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryCurrentPlanRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryCurrentPlanResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryAppliedPlanDesc: UnaryMethodDefinitionish = {
  methodName: "AppliedPlan",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryAppliedPlanRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryAppliedPlanResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryUpgradedConsensusStateDesc: UnaryMethodDefinitionish = {
  methodName: "UpgradedConsensusState",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryUpgradedConsensusStateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryUpgradedConsensusStateResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryModuleVersionsDesc: UnaryMethodDefinitionish = {
  methodName: "ModuleVersions",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryModuleVersionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryModuleVersionsResponse.decode(data),
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
