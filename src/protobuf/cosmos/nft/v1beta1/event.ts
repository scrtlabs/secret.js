/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.nft.v1beta1";

/** EventSend is emitted on Msg/Send */
export interface EventSend {
  /** class_id associated with the nft */
  class_id: string;
  /** id is a unique identifier of the nft */
  id: string;
  /** sender is the address of the owner of nft */
  sender: string;
  /** receiver is the receiver address of nft */
  receiver: string;
}

/** EventMint is emitted on Mint */
export interface EventMint {
  /** class_id associated with the nft */
  class_id: string;
  /** id is a unique identifier of the nft */
  id: string;
  /** owner is the owner address of the nft */
  owner: string;
}

/** EventBurn is emitted on Burn */
export interface EventBurn {
  /** class_id associated with the nft */
  class_id: string;
  /** id is a unique identifier of the nft */
  id: string;
  /** owner is the owner address of the nft */
  owner: string;
}

function createBaseEventSend(): EventSend {
  return { class_id: "", id: "", sender: "", receiver: "" };
}

export const EventSend = {
  encode(
    message: EventSend,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    if (message.receiver !== "") {
      writer.uint32(34).string(message.receiver);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.class_id = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.sender = reader.string();
          break;
        case 4:
          message.receiver = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventSend {
    return {
      class_id: isSet(object.class_id) ? String(object.class_id) : "",
      id: isSet(object.id) ? String(object.id) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
    };
  },

  toJSON(message: EventSend): unknown {
    const obj: any = {};
    message.class_id !== undefined && (obj.class_id = message.class_id);
    message.id !== undefined && (obj.id = message.id);
    message.sender !== undefined && (obj.sender = message.sender);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    return obj;
  },

  fromPartial(object: DeepPartial<EventSend>): EventSend {
    const message = createBaseEventSend();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.sender = object.sender ?? "";
    message.receiver = object.receiver ?? "";
    return message;
  },
};

function createBaseEventMint(): EventMint {
  return { class_id: "", id: "", owner: "" };
}

export const EventMint = {
  encode(
    message: EventMint,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventMint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventMint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.class_id = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventMint {
    return {
      class_id: isSet(object.class_id) ? String(object.class_id) : "",
      id: isSet(object.id) ? String(object.id) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: EventMint): unknown {
    const obj: any = {};
    message.class_id !== undefined && (obj.class_id = message.class_id);
    message.id !== undefined && (obj.id = message.id);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial(object: DeepPartial<EventMint>): EventMint {
    const message = createBaseEventMint();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseEventBurn(): EventBurn {
  return { class_id: "", id: "", owner: "" };
}

export const EventBurn = {
  encode(
    message: EventBurn,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventBurn {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBurn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.class_id = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventBurn {
    return {
      class_id: isSet(object.class_id) ? String(object.class_id) : "",
      id: isSet(object.id) ? String(object.id) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: EventBurn): unknown {
    const obj: any = {};
    message.class_id !== undefined && (obj.class_id = message.class_id);
    message.id !== undefined && (obj.id = message.id);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial(object: DeepPartial<EventBurn>): EventBurn {
    const message = createBaseEventBurn();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.owner = object.owner ?? "";
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
