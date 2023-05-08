/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "secret.emergencybutton.v1beta1";

/** Params defines the parameters for the ibc-rate-limit module. */
export interface Params {
  switch_status: string;
  pauser_address: string;
}

function createBaseParams(): Params {
  return { switch_status: "", pauser_address: "" };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.switch_status !== "") {
      writer.uint32(10).string(message.switch_status);
    }
    if (message.pauser_address !== "") {
      writer.uint32(18).string(message.pauser_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.switch_status = reader.string();
          break;
        case 2:
          message.pauser_address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      switch_status: isSet(object.switch_status)
        ? String(object.switch_status)
        : "",
      pauser_address: isSet(object.pauser_address)
        ? String(object.pauser_address)
        : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.switch_status !== undefined &&
      (obj.switch_status = message.switch_status);
    message.pauser_address !== undefined &&
      (obj.pauser_address = message.pauser_address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.switch_status = object.switch_status ?? "";
    message.pauser_address = object.pauser_address ?? "";
    return message;
  },
};

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
