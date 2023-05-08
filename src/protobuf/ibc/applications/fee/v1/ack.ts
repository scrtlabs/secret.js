/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "ibc.applications.fee.v1";

/** IncentivizedAcknowledgement is the acknowledgement format to be used by applications wrapped in the fee middleware */
export interface IncentivizedAcknowledgement {
  /** the underlying app acknowledgement bytes */
  app_acknowledgement: Uint8Array;
  /** the relayer address which submits the recv packet message */
  forward_relayer_address: string;
  /** success flag of the base application callback */
  underlying_app_success: boolean;
}

function createBaseIncentivizedAcknowledgement(): IncentivizedAcknowledgement {
  return {
    app_acknowledgement: new Uint8Array(),
    forward_relayer_address: "",
    underlying_app_success: false,
  };
}

export const IncentivizedAcknowledgement = {
  encode(
    message: IncentivizedAcknowledgement,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.app_acknowledgement.length !== 0) {
      writer.uint32(10).bytes(message.app_acknowledgement);
    }
    if (message.forward_relayer_address !== "") {
      writer.uint32(18).string(message.forward_relayer_address);
    }
    if (message.underlying_app_success === true) {
      writer.uint32(24).bool(message.underlying_app_success);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): IncentivizedAcknowledgement {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentivizedAcknowledgement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.app_acknowledgement = reader.bytes();
          break;
        case 2:
          message.forward_relayer_address = reader.string();
          break;
        case 3:
          message.underlying_app_success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IncentivizedAcknowledgement {
    return {
      app_acknowledgement: isSet(object.app_acknowledgement)
        ? bytesFromBase64(object.app_acknowledgement)
        : new Uint8Array(),
      forward_relayer_address: isSet(object.forward_relayer_address)
        ? String(object.forward_relayer_address)
        : "",
      underlying_app_success: isSet(object.underlying_app_success)
        ? Boolean(object.underlying_app_success)
        : false,
    };
  },

  toJSON(message: IncentivizedAcknowledgement): unknown {
    const obj: any = {};
    message.app_acknowledgement !== undefined &&
      (obj.app_acknowledgement = base64FromBytes(
        message.app_acknowledgement !== undefined
          ? message.app_acknowledgement
          : new Uint8Array(),
      ));
    message.forward_relayer_address !== undefined &&
      (obj.forward_relayer_address = message.forward_relayer_address);
    message.underlying_app_success !== undefined &&
      (obj.underlying_app_success = message.underlying_app_success);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IncentivizedAcknowledgement>, I>>(
    object: I,
  ): IncentivizedAcknowledgement {
    const message = createBaseIncentivizedAcknowledgement();
    message.app_acknowledgement =
      object.app_acknowledgement ?? new Uint8Array();
    message.forward_relayer_address = object.forward_relayer_address ?? "";
    message.underlying_app_success = object.underlying_app_success ?? false;
    return message;
  },
};

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
