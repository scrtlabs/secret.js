/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "cosmos.slashing.v1beta1";

/** MsgUnjail defines the Msg/Unjail request type */
export interface MsgUnjail {
  validatorAddr: string;
}

/** MsgUnjailResponse defines the Msg/Unjail response type */
export interface MsgUnjailResponse {}

function createBaseMsgUnjail(): MsgUnjail {
  return { validatorAddr: "" };
}

export const MsgUnjail = {
  encode(
    message: MsgUnjail,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnjail {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnjail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUnjail {
    return {
      validatorAddr: isSet(object.validatorAddr)
        ? String(object.validatorAddr)
        : "",
    };
  },

  toJSON(message: MsgUnjail): unknown {
    const obj: any = {};
    message.validatorAddr !== undefined &&
      (obj.validatorAddr = message.validatorAddr);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnjail>, I>>(
    object: I,
  ): MsgUnjail {
    const message = createBaseMsgUnjail();
    message.validatorAddr = object.validatorAddr ?? "";
    return message;
  },
};

function createBaseMsgUnjailResponse(): MsgUnjailResponse {
  return {};
}

export const MsgUnjailResponse = {
  encode(
    _: MsgUnjailResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnjailResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnjailResponse();
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

  fromJSON(_: any): MsgUnjailResponse {
    return {};
  },

  toJSON(_: MsgUnjailResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnjailResponse>, I>>(
    _: I,
  ): MsgUnjailResponse {
    const message = createBaseMsgUnjailResponse();
    return message;
  },
};

/** Msg defines the slashing Msg service. */
export interface Msg {
  /**
   * Unjail defines a method for unjailing a jailed validator, thus returning
   * them into the bonded validator set, so they can begin receiving provisions
   * and rewards again.
   */
  unjail(
    request: DeepPartial<MsgUnjail>,
    metadata?: grpc.Metadata,
  ): Promise<MsgUnjailResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.unjail = this.unjail.bind(this);
  }

  unjail(
    request: DeepPartial<MsgUnjail>,
    metadata?: grpc.Metadata,
  ): Promise<MsgUnjailResponse> {
    return this.rpc.unary(
      MsgUnjailDesc,
      MsgUnjail.fromPartial(request),
      metadata,
    );
  }
}

export const MsgDesc = {
  serviceName: "cosmos.slashing.v1beta1.Msg",
};

export const MsgUnjailDesc: UnaryMethodDefinitionish = {
  methodName: "Unjail",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgUnjail.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...MsgUnjailResponse.decode(data),
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
