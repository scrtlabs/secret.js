/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "cosmos.nft.v1beta1";

/** Class defines the class of the nft type. */
export interface Class {
  /** id defines the unique identifier of the NFT classification, similar to the contract address of ERC721 */
  id: string;
  /** name defines the human-readable name of the NFT classification. Optional */
  name: string;
  /** symbol is an abbreviated name for nft classification. Optional */
  symbol: string;
  /** description is a brief description of nft classification. Optional */
  description: string;
  /** uri for the class metadata stored off chain. It can define schema for Class and NFT `Data` attributes. Optional */
  uri: string;
  /** uri_hash is a hash of the document pointed by uri. Optional */
  uri_hash: string;
  /** data is the app specific metadata of the NFT class. Optional */
  data?: Any;
}

/** NFT defines the NFT. */
export interface NFT {
  /** class_id associated with the NFT, similar to the contract address of ERC721 */
  class_id: string;
  /** id is a unique identifier of the NFT */
  id: string;
  /** uri for the NFT metadata stored off chain */
  uri: string;
  /** uri_hash is a hash of the document pointed by uri */
  uri_hash: string;
  /** data is an app specific data of the NFT. Optional */
  data?: Any;
}

function createBaseClass(): Class {
  return {
    id: "",
    name: "",
    symbol: "",
    description: "",
    uri: "",
    uri_hash: "",
    data: undefined,
  };
}

export const Class = {
  encode(message: Class, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(26).string(message.symbol);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.uri !== "") {
      writer.uint32(42).string(message.uri);
    }
    if (message.uri_hash !== "") {
      writer.uint32(50).string(message.uri_hash);
    }
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Class {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClass();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.symbol = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.uri = reader.string();
          break;
        case 6:
          message.uri_hash = reader.string();
          break;
        case 7:
          message.data = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Class {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      description: isSet(object.description) ? String(object.description) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      uri_hash: isSet(object.uri_hash) ? String(object.uri_hash) : "",
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: Class): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.description !== undefined &&
      (obj.description = message.description);
    message.uri !== undefined && (obj.uri = message.uri);
    message.uri_hash !== undefined && (obj.uri_hash = message.uri_hash);
    message.data !== undefined &&
      (obj.data = message.data ? Any.toJSON(message.data) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Class>): Class {
    const message = createBaseClass();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.description = object.description ?? "";
    message.uri = object.uri ?? "";
    message.uri_hash = object.uri_hash ?? "";
    message.data =
      object.data !== undefined && object.data !== null
        ? Any.fromPartial(object.data)
        : undefined;
    return message;
  },
};

function createBaseNFT(): NFT {
  return { class_id: "", id: "", uri: "", uri_hash: "", data: undefined };
}

export const NFT = {
  encode(message: NFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.uri !== "") {
      writer.uint32(26).string(message.uri);
    }
    if (message.uri_hash !== "") {
      writer.uint32(34).string(message.uri_hash);
    }
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NFT {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNFT();
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
          message.uri = reader.string();
          break;
        case 4:
          message.uri_hash = reader.string();
          break;
        case 10:
          message.data = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NFT {
    return {
      class_id: isSet(object.class_id) ? String(object.class_id) : "",
      id: isSet(object.id) ? String(object.id) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      uri_hash: isSet(object.uri_hash) ? String(object.uri_hash) : "",
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: NFT): unknown {
    const obj: any = {};
    message.class_id !== undefined && (obj.class_id = message.class_id);
    message.id !== undefined && (obj.id = message.id);
    message.uri !== undefined && (obj.uri = message.uri);
    message.uri_hash !== undefined && (obj.uri_hash = message.uri_hash);
    message.data !== undefined &&
      (obj.data = message.data ? Any.toJSON(message.data) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<NFT>): NFT {
    const message = createBaseNFT();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.uri = object.uri ?? "";
    message.uri_hash = object.uri_hash ?? "";
    message.data =
      object.data !== undefined && object.data !== null
        ? Any.fromPartial(object.data)
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
