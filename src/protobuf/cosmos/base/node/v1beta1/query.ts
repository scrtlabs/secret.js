/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.base.node.v1beta1";

/** ConfigRequest defines the request structure for the Config gRPC query. */
export interface ConfigRequest {}

/** ConfigResponse defines the response structure for the Config gRPC query. */
export interface ConfigResponse {
  minimum_gas_price: string;
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

  fromPartial<I extends Exact<DeepPartial<ConfigRequest>, I>>(
    _: I,
  ): ConfigRequest {
    const message = createBaseConfigRequest();
    return message;
  },
};

function createBaseConfigResponse(): ConfigResponse {
  return { minimum_gas_price: "" };
}

export const ConfigResponse = {
  encode(
    message: ConfigResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.minimum_gas_price !== "") {
      writer.uint32(10).string(message.minimum_gas_price);
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
    };
  },

  toJSON(message: ConfigResponse): unknown {
    const obj: any = {};
    message.minimum_gas_price !== undefined &&
      (obj.minimum_gas_price = message.minimum_gas_price);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfigResponse>, I>>(
    object: I,
  ): ConfigResponse {
    const message = createBaseConfigResponse();
    message.minimum_gas_price = object.minimum_gas_price ?? "";
    return message;
  },
};

/** Service defines the gRPC querier service for node related queries. */
export interface Service {
  /** Config queries for the operator configuration. */
  Config(request: ConfigRequest): Promise<ConfigResponse>;
}

export class ServiceClientImpl implements Service {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Config = this.Config.bind(this);
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
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
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
