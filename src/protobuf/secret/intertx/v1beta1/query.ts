/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "secret.intertx.v1beta1";

/** QueryInterchainAccountFromAddressRequest is the request type for the Query/InterchainAccountAddress RPC */
export interface QueryInterchainAccountFromAddressRequest {
  owner: string;
  connection_id: string;
}

/** QueryInterchainAccountFromAddressResponse the response type for the Query/InterchainAccountAddress RPC */
export interface QueryInterchainAccountFromAddressResponse {
  interchain_account_address: string;
}

function createBaseQueryInterchainAccountFromAddressRequest(): QueryInterchainAccountFromAddressRequest {
  return { owner: "", connection_id: "" };
}

export const QueryInterchainAccountFromAddressRequest = {
  encode(
    message: QueryInterchainAccountFromAddressRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.connection_id !== "") {
      writer.uint32(18).string(message.connection_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryInterchainAccountFromAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterchainAccountFromAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.connection_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryInterchainAccountFromAddressRequest {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      connection_id: isSet(object.connection_id)
        ? String(object.connection_id)
        : "",
    };
  },

  toJSON(message: QueryInterchainAccountFromAddressRequest): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.connection_id !== undefined &&
      (obj.connection_id = message.connection_id);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryInterchainAccountFromAddressRequest>, I>,
  >(object: I): QueryInterchainAccountFromAddressRequest {
    const message = createBaseQueryInterchainAccountFromAddressRequest();
    message.owner = object.owner ?? "";
    message.connection_id = object.connection_id ?? "";
    return message;
  },
};

function createBaseQueryInterchainAccountFromAddressResponse(): QueryInterchainAccountFromAddressResponse {
  return { interchain_account_address: "" };
}

export const QueryInterchainAccountFromAddressResponse = {
  encode(
    message: QueryInterchainAccountFromAddressResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.interchain_account_address !== "") {
      writer.uint32(10).string(message.interchain_account_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryInterchainAccountFromAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInterchainAccountFromAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interchain_account_address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryInterchainAccountFromAddressResponse {
    return {
      interchain_account_address: isSet(object.interchain_account_address)
        ? String(object.interchain_account_address)
        : "",
    };
  },

  toJSON(message: QueryInterchainAccountFromAddressResponse): unknown {
    const obj: any = {};
    message.interchain_account_address !== undefined &&
      (obj.interchain_account_address = message.interchain_account_address);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryInterchainAccountFromAddressResponse>, I>,
  >(object: I): QueryInterchainAccountFromAddressResponse {
    const message = createBaseQueryInterchainAccountFromAddressResponse();
    message.interchain_account_address =
      object.interchain_account_address ?? "";
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** QueryInterchainAccountFromAddress returns the interchain account for given owner address on a given connection pair */
  InterchainAccountFromAddress(
    request: QueryInterchainAccountFromAddressRequest,
  ): Promise<QueryInterchainAccountFromAddressResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.InterchainAccountFromAddress =
      this.InterchainAccountFromAddress.bind(this);
  }
  InterchainAccountFromAddress(
    request: QueryInterchainAccountFromAddressRequest,
  ): Promise<QueryInterchainAccountFromAddressResponse> {
    const data =
      QueryInterchainAccountFromAddressRequest.encode(request).finish();
    const promise = this.rpc.request(
      "secret.intertx.v1beta1.Query",
      "InterchainAccountFromAddress",
      data,
    );
    return promise.then((data) =>
      QueryInterchainAccountFromAddressResponse.decode(new _m0.Reader(data)),
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
