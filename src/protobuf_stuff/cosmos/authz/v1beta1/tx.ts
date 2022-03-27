/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import { Grant } from "../../../cosmos/authz/v1beta1/authz";
import { BrowserHeaders } from "browser-headers";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "cosmos.authz.v1beta1";

/**
 * MsgGrant is a request type for Grant method. It declares authorization to the grantee
 * on behalf of the granter with the provided expiration time.
 */
export interface MsgGrant {
  granter: string;
  grantee: string;
  grant?: Grant;
}

/** MsgExecResponse defines the Msg/MsgExecResponse response type. */
export interface MsgExecResponse {
  results: Uint8Array[];
}

/**
 * MsgExec attempts to execute the provided messages using
 * authorizations granted to the grantee. Each message should have only
 * one signer corresponding to the granter of the authorization.
 */
export interface MsgExec {
  grantee: string;
  /**
   * Authorization Msg requests to execute. Each msg must implement Authorization interface
   * The x/authz will try to find a grant matching (msg.signers[0], grantee, MsgTypeURL(msg))
   * triple and validate it.
   */
  msgs: Any[];
}

/** MsgGrantResponse defines the Msg/MsgGrant response type. */
export interface MsgGrantResponse {}

/**
 * MsgRevoke revokes any authorization with the provided sdk.Msg type on the
 * granter's account with that has been granted to the grantee.
 */
export interface MsgRevoke {
  granter: string;
  grantee: string;
  msgTypeUrl: string;
}

/** MsgRevokeResponse defines the Msg/MsgRevokeResponse response type. */
export interface MsgRevokeResponse {}

function createBaseMsgGrant(): MsgGrant {
  return { granter: "", grantee: "", grant: undefined };
}

export const MsgGrant = {
  encode(
    message: MsgGrant,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.grant !== undefined) {
      Grant.encode(message.grant, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgGrant {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGrant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.granter = reader.string();
          break;
        case 2:
          message.grantee = reader.string();
          break;
        case 3:
          message.grant = Grant.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgGrant {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      grant: isSet(object.grant) ? Grant.fromJSON(object.grant) : undefined,
    };
  },

  toJSON(message: MsgGrant): unknown {
    const obj: any = {};
    message.granter !== undefined && (obj.granter = message.granter);
    message.grantee !== undefined && (obj.grantee = message.grantee);
    message.grant !== undefined &&
      (obj.grant = message.grant ? Grant.toJSON(message.grant) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgGrant>, I>>(object: I): MsgGrant {
    const message = createBaseMsgGrant();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.grant =
      object.grant !== undefined && object.grant !== null
        ? Grant.fromPartial(object.grant)
        : undefined;
    return message;
  },
};

function createBaseMsgExecResponse(): MsgExecResponse {
  return { results: [] };
}

export const MsgExecResponse = {
  encode(
    message: MsgExecResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.results) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.results.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExecResponse {
    return {
      results: Array.isArray(object?.results)
        ? object.results.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: MsgExecResponse): unknown {
    const obj: any = {};
    if (message.results) {
      obj.results = message.results.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.results = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgExecResponse>, I>>(
    object: I,
  ): MsgExecResponse {
    const message = createBaseMsgExecResponse();
    message.results = object.results?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgExec(): MsgExec {
  return { grantee: "", msgs: [] };
}

export const MsgExec = {
  encode(
    message: MsgExec,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.grantee !== "") {
      writer.uint32(10).string(message.grantee);
    }
    for (const v of message.msgs) {
      Any.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExec {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.grantee = reader.string();
          break;
        case 2:
          message.msgs.push(Any.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExec {
    return {
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      msgs: Array.isArray(object?.msgs)
        ? object.msgs.map((e: any) => Any.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgExec): unknown {
    const obj: any = {};
    message.grantee !== undefined && (obj.grantee = message.grantee);
    if (message.msgs) {
      obj.msgs = message.msgs.map((e) => (e ? Any.toJSON(e) : undefined));
    } else {
      obj.msgs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgExec>, I>>(object: I): MsgExec {
    const message = createBaseMsgExec();
    message.grantee = object.grantee ?? "";
    message.msgs = object.msgs?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgGrantResponse(): MsgGrantResponse {
  return {};
}

export const MsgGrantResponse = {
  encode(
    _: MsgGrantResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgGrantResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGrantResponse();
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

  fromJSON(_: any): MsgGrantResponse {
    return {};
  },

  toJSON(_: MsgGrantResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgGrantResponse>, I>>(
    _: I,
  ): MsgGrantResponse {
    const message = createBaseMsgGrantResponse();
    return message;
  },
};

function createBaseMsgRevoke(): MsgRevoke {
  return { granter: "", grantee: "", msgTypeUrl: "" };
}

export const MsgRevoke = {
  encode(
    message: MsgRevoke,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.msgTypeUrl !== "") {
      writer.uint32(26).string(message.msgTypeUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevoke {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevoke();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.granter = reader.string();
          break;
        case 2:
          message.grantee = reader.string();
          break;
        case 3:
          message.msgTypeUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRevoke {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      msgTypeUrl: isSet(object.msgTypeUrl) ? String(object.msgTypeUrl) : "",
    };
  },

  toJSON(message: MsgRevoke): unknown {
    const obj: any = {};
    message.granter !== undefined && (obj.granter = message.granter);
    message.grantee !== undefined && (obj.grantee = message.grantee);
    message.msgTypeUrl !== undefined && (obj.msgTypeUrl = message.msgTypeUrl);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevoke>, I>>(
    object: I,
  ): MsgRevoke {
    const message = createBaseMsgRevoke();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.msgTypeUrl = object.msgTypeUrl ?? "";
    return message;
  },
};

function createBaseMsgRevokeResponse(): MsgRevokeResponse {
  return {};
}

export const MsgRevokeResponse = {
  encode(
    _: MsgRevokeResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeResponse();
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

  fromJSON(_: any): MsgRevokeResponse {
    return {};
  },

  toJSON(_: MsgRevokeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevokeResponse>, I>>(
    _: I,
  ): MsgRevokeResponse {
    const message = createBaseMsgRevokeResponse();
    return message;
  },
};

/** Msg defines the authz Msg service. */
export interface Msg {
  /**
   * Grant grants the provided authorization to the grantee on the granter's
   * account with the provided expiration time. If there is already a grant
   * for the given (granter, grantee, Authorization) triple, then the grant
   * will be overwritten.
   */
  grant(
    request: DeepPartial<MsgGrant>,
    metadata?: grpc.Metadata,
  ): Promise<MsgGrantResponse>;
  /**
   * Exec attempts to execute the provided messages using
   * authorizations granted to the grantee. Each message should have only
   * one signer corresponding to the granter of the authorization.
   */
  exec(
    request: DeepPartial<MsgExec>,
    metadata?: grpc.Metadata,
  ): Promise<MsgExecResponse>;
  /**
   * Revoke revokes any authorization corresponding to the provided method name on the
   * granter's account that has been granted to the grantee.
   */
  revoke(
    request: DeepPartial<MsgRevoke>,
    metadata?: grpc.Metadata,
  ): Promise<MsgRevokeResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.grant = this.grant.bind(this);
    this.exec = this.exec.bind(this);
    this.revoke = this.revoke.bind(this);
  }

  grant(
    request: DeepPartial<MsgGrant>,
    metadata?: grpc.Metadata,
  ): Promise<MsgGrantResponse> {
    return this.rpc.unary(
      MsgGrantDesc,
      MsgGrant.fromPartial(request),
      metadata,
    );
  }

  exec(
    request: DeepPartial<MsgExec>,
    metadata?: grpc.Metadata,
  ): Promise<MsgExecResponse> {
    return this.rpc.unary(MsgExecDesc, MsgExec.fromPartial(request), metadata);
  }

  revoke(
    request: DeepPartial<MsgRevoke>,
    metadata?: grpc.Metadata,
  ): Promise<MsgRevokeResponse> {
    return this.rpc.unary(
      MsgRevokeDesc,
      MsgRevoke.fromPartial(request),
      metadata,
    );
  }
}

export const MsgDesc = {
  serviceName: "cosmos.authz.v1beta1.Msg",
};

export const MsgGrantDesc: UnaryMethodDefinitionish = {
  methodName: "Grant",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgGrant.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...MsgGrantResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const MsgExecDesc: UnaryMethodDefinitionish = {
  methodName: "Exec",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgExec.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...MsgExecResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const MsgRevokeDesc: UnaryMethodDefinitionish = {
  methodName: "Revoke",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgRevoke.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...MsgRevokeResponse.decode(data),
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
