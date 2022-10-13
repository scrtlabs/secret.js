/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { NetAddress } from "../../tendermint/p2p/types";

export const protobufPackage = "tendermint.p2p";

export interface PexRequest {}

export interface PexAddrs {
  addrs: NetAddress[];
}

export interface Message {
  pexRequest?: PexRequest | undefined;
  pexAddrs?: PexAddrs | undefined;
}

function createBasePexRequest(): PexRequest {
  return {};
}

export const PexRequest = {
  encode(_: PexRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PexRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePexRequest();
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

  fromJSON(_: any): PexRequest {
    return {};
  },

  toJSON(_: PexRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PexRequest>, I>>(_: I): PexRequest {
    const message = createBasePexRequest();
    return message;
  },
};

function createBasePexAddrs(): PexAddrs {
  return { addrs: [] };
}

export const PexAddrs = {
  encode(
    message: PexAddrs,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.addrs) {
      NetAddress.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PexAddrs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePexAddrs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addrs.push(NetAddress.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PexAddrs {
    return {
      addrs: Array.isArray(object?.addrs)
        ? object.addrs.map((e: any) => NetAddress.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PexAddrs): unknown {
    const obj: any = {};
    if (message.addrs) {
      obj.addrs = message.addrs.map((e) =>
        e ? NetAddress.toJSON(e) : undefined,
      );
    } else {
      obj.addrs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PexAddrs>, I>>(object: I): PexAddrs {
    const message = createBasePexAddrs();
    message.addrs = object.addrs?.map((e) => NetAddress.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMessage(): Message {
  return { pexRequest: undefined, pexAddrs: undefined };
}

export const Message = {
  encode(
    message: Message,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pexRequest !== undefined) {
      PexRequest.encode(message.pexRequest, writer.uint32(10).fork()).ldelim();
    }
    if (message.pexAddrs !== undefined) {
      PexAddrs.encode(message.pexAddrs, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pexRequest = PexRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.pexAddrs = PexAddrs.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      pexRequest: isSet(object.pexRequest)
        ? PexRequest.fromJSON(object.pexRequest)
        : undefined,
      pexAddrs: isSet(object.pexAddrs)
        ? PexAddrs.fromJSON(object.pexAddrs)
        : undefined,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.pexRequest !== undefined &&
      (obj.pexRequest = message.pexRequest
        ? PexRequest.toJSON(message.pexRequest)
        : undefined);
    message.pexAddrs !== undefined &&
      (obj.pexAddrs = message.pexAddrs
        ? PexAddrs.toJSON(message.pexAddrs)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.pexRequest =
      object.pexRequest !== undefined && object.pexRequest !== null
        ? PexRequest.fromPartial(object.pexRequest)
        : undefined;
    message.pexAddrs =
      object.pexAddrs !== undefined && object.pexAddrs !== null
        ? PexAddrs.fromPartial(object.pexAddrs)
        : undefined;
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
