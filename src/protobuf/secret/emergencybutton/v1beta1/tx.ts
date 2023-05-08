/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "secret.emergencybutton.v1beta1";

/** MsgToggleIbcSwitch represents a message to toggle the emergencybutton status by the defined pauser. */
export interface MsgToggleIbcSwitch {
  sender: string;
}

/** MsgToggleIbcSwitchResponse defines the response type for the toggle. */
export interface MsgToggleIbcSwitchResponse {}

function createBaseMsgToggleIbcSwitch(): MsgToggleIbcSwitch {
  return { sender: "" };
}

export const MsgToggleIbcSwitch = {
  encode(
    message: MsgToggleIbcSwitch,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgToggleIbcSwitch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleIbcSwitch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgToggleIbcSwitch {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
    };
  },

  toJSON(message: MsgToggleIbcSwitch): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleIbcSwitch>, I>>(
    object: I,
  ): MsgToggleIbcSwitch {
    const message = createBaseMsgToggleIbcSwitch();
    message.sender = object.sender ?? "";
    return message;
  },
};

function createBaseMsgToggleIbcSwitchResponse(): MsgToggleIbcSwitchResponse {
  return {};
}

export const MsgToggleIbcSwitchResponse = {
  encode(
    _: MsgToggleIbcSwitchResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgToggleIbcSwitchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleIbcSwitchResponse();
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

  fromJSON(_: any): MsgToggleIbcSwitchResponse {
    return {};
  },

  toJSON(_: MsgToggleIbcSwitchResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgToggleIbcSwitchResponse>, I>>(
    _: I,
  ): MsgToggleIbcSwitchResponse {
    const message = createBaseMsgToggleIbcSwitchResponse();
    return message;
  },
};

/** Msg defines the bank Msg service. */
export interface Msg {
  /** ToggleIbcSwitch defines a method for toggling the status of the emergencybutton. */
  ToggleIbcSwitch(
    request: MsgToggleIbcSwitch,
  ): Promise<MsgToggleIbcSwitchResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ToggleIbcSwitch = this.ToggleIbcSwitch.bind(this);
  }
  ToggleIbcSwitch(
    request: MsgToggleIbcSwitch,
  ): Promise<MsgToggleIbcSwitchResponse> {
    const data = MsgToggleIbcSwitch.encode(request).finish();
    const promise = this.rpc.request(
      "secret.emergencybutton.v1beta1.Msg",
      "ToggleIbcSwitch",
      data,
    );
    return promise.then((data) =>
      MsgToggleIbcSwitchResponse.decode(new _m0.Reader(data)),
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
