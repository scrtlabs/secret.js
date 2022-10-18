/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.crisis.v1beta1";

/** MsgVerifyInvariant represents a message to verify a particular invariance. */
export interface MsgVerifyInvariant {
  sender: string;
  invariant_module_name: string;
  invariant_route: string;
}

/** MsgVerifyInvariantResponse defines the Msg/VerifyInvariant response type. */
export interface MsgVerifyInvariantResponse {}

function createBaseMsgVerifyInvariant(): MsgVerifyInvariant {
  return { sender: "", invariant_module_name: "", invariant_route: "" };
}

export const MsgVerifyInvariant = {
  encode(
    message: MsgVerifyInvariant,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.invariant_module_name !== "") {
      writer.uint32(18).string(message.invariant_module_name);
    }
    if (message.invariant_route !== "") {
      writer.uint32(26).string(message.invariant_route);
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
          message.invariant_module_name = reader.string();
          break;
        case 3:
          message.invariant_route = reader.string();
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
      invariant_module_name: isSet(object.invariant_module_name)
        ? String(object.invariant_module_name)
        : "",
      invariant_route: isSet(object.invariant_route)
        ? String(object.invariant_route)
        : "",
    };
  },

  toJSON(message: MsgVerifyInvariant): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.invariant_module_name !== undefined &&
      (obj.invariant_module_name = message.invariant_module_name);
    message.invariant_route !== undefined &&
      (obj.invariant_route = message.invariant_route);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgVerifyInvariant>, I>>(
    object: I,
  ): MsgVerifyInvariant {
    const message = createBaseMsgVerifyInvariant();
    message.sender = object.sender ?? "";
    message.invariant_module_name = object.invariant_module_name ?? "";
    message.invariant_route = object.invariant_route ?? "";
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
  VerifyInvariant(
    request: MsgVerifyInvariant,
  ): Promise<MsgVerifyInvariantResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.VerifyInvariant = this.VerifyInvariant.bind(this);
  }
  VerifyInvariant(
    request: MsgVerifyInvariant,
  ): Promise<MsgVerifyInvariantResponse> {
    const data = MsgVerifyInvariant.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.crisis.v1beta1.Msg",
      "VerifyInvariant",
      data,
    );
    return promise.then((data) =>
      MsgVerifyInvariantResponse.decode(new _m0.Reader(data)),
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
