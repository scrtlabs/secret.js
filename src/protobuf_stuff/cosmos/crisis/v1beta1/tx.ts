/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "cosmos.crisis.v1beta1";

/** MsgVerifyInvariant represents a message to verify a particular invariance. */
export interface MsgVerifyInvariant {
  sender: string;
  invariantModuleName: string;
  invariantRoute: string;
}

/** MsgVerifyInvariantResponse defines the Msg/VerifyInvariant response type. */
export interface MsgVerifyInvariantResponse {}

function createBaseMsgVerifyInvariant(): MsgVerifyInvariant {
  return { sender: "", invariantModuleName: "", invariantRoute: "" };
}

export const MsgVerifyInvariant = {
  encode(
    message: MsgVerifyInvariant,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.invariantModuleName !== "") {
      writer.uint32(18).string(message.invariantModuleName);
    }
    if (message.invariantRoute !== "") {
      writer.uint32(26).string(message.invariantRoute);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVerifyInvariant {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVerifyInvariant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.invariantModuleName = reader.string();
          break;
        case 3:
          message.invariantRoute = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgVerifyInvariant {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      invariantModuleName: isSet(object.invariantModuleName)
        ? String(object.invariantModuleName)
        : "",
      invariantRoute: isSet(object.invariantRoute)
        ? String(object.invariantRoute)
        : "",
    };
  },

  toJSON(message: MsgVerifyInvariant): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.invariantModuleName !== undefined &&
      (obj.invariantModuleName = message.invariantModuleName);
    message.invariantRoute !== undefined &&
      (obj.invariantRoute = message.invariantRoute);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgVerifyInvariant>, I>>(
    object: I,
  ): MsgVerifyInvariant {
    const message = createBaseMsgVerifyInvariant();
    message.sender = object.sender ?? "";
    message.invariantModuleName = object.invariantModuleName ?? "";
    message.invariantRoute = object.invariantRoute ?? "";
    return message;
  },
};

function createBaseMsgVerifyInvariantResponse(): MsgVerifyInvariantResponse {
  return {};
}

export const MsgVerifyInvariantResponse = {
  encode(
    _: MsgVerifyInvariantResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgVerifyInvariantResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVerifyInvariantResponse();
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

  fromJSON(_: any): MsgVerifyInvariantResponse {
    return {};
  },

  toJSON(_: MsgVerifyInvariantResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgVerifyInvariantResponse>, I>>(
    _: I,
  ): MsgVerifyInvariantResponse {
    const message = createBaseMsgVerifyInvariantResponse();
    return message;
  },
};

/** Msg defines the bank Msg service. */
export interface Msg {
  /** VerifyInvariant defines a method to verify a particular invariance. */
  verifyInvariant(
    request: DeepPartial<MsgVerifyInvariant>,
    metadata?: grpc.Metadata,
  ): Promise<MsgVerifyInvariantResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.verifyInvariant = this.verifyInvariant.bind(this);
  }

  verifyInvariant(
    request: DeepPartial<MsgVerifyInvariant>,
    metadata?: grpc.Metadata,
  ): Promise<MsgVerifyInvariantResponse> {
    return this.rpc.unary(
      MsgVerifyInvariantDesc,
      MsgVerifyInvariant.fromPartial(request),
      metadata,
    );
  }
}

export const MsgDesc = {
  serviceName: "cosmos.crisis.v1beta1.Msg",
};

export const MsgVerifyInvariantDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyInvariant",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgVerifyInvariant.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...MsgVerifyInvariantResponse.decode(data),
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
