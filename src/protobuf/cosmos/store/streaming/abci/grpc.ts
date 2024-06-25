/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  RequestFinalizeBlock,
  ResponseFinalizeBlock,
  ResponseCommit,
} from "../../../../tendermint/abci/types";
import { StoreKVPair } from "../../v1beta1/listening";

export const protobufPackage = "cosmos.store.streaming.abci";

/** ListenEndBlockRequest is the request type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockRequest {
  req?: RequestFinalizeBlock;
  res?: ResponseFinalizeBlock;
}

/** ListenEndBlockResponse is the response type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockResponse {}

/** ListenCommitRequest is the request type for the ListenCommit RPC method */
export interface ListenCommitRequest {
  /** explicitly pass in block height as ResponseCommit does not contain this info */
  block_height: string;
  res?: ResponseCommit;
  change_set: StoreKVPair[];
}

/** ListenCommitResponse is the response type for the ListenCommit RPC method */
export interface ListenCommitResponse {}

function createBaseListenFinalizeBlockRequest(): ListenFinalizeBlockRequest {
  return { req: undefined, res: undefined };
}

export const ListenFinalizeBlockRequest = {
  encode(
    message: ListenFinalizeBlockRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.req !== undefined) {
      RequestFinalizeBlock.encode(
        message.req,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.res !== undefined) {
      ResponseFinalizeBlock.encode(
        message.res,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ListenFinalizeBlockRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenFinalizeBlockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.req = RequestFinalizeBlock.decode(reader, reader.uint32());
          break;
        case 2:
          message.res = ResponseFinalizeBlock.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListenFinalizeBlockRequest {
    return {
      req: isSet(object.req)
        ? RequestFinalizeBlock.fromJSON(object.req)
        : undefined,
      res: isSet(object.res)
        ? ResponseFinalizeBlock.fromJSON(object.res)
        : undefined,
    };
  },

  toJSON(message: ListenFinalizeBlockRequest): unknown {
    const obj: any = {};
    message.req !== undefined &&
      (obj.req = message.req
        ? RequestFinalizeBlock.toJSON(message.req)
        : undefined);
    message.res !== undefined &&
      (obj.res = message.res
        ? ResponseFinalizeBlock.toJSON(message.res)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListenFinalizeBlockRequest>,
  ): ListenFinalizeBlockRequest {
    const message = createBaseListenFinalizeBlockRequest();
    message.req =
      object.req !== undefined && object.req !== null
        ? RequestFinalizeBlock.fromPartial(object.req)
        : undefined;
    message.res =
      object.res !== undefined && object.res !== null
        ? ResponseFinalizeBlock.fromPartial(object.res)
        : undefined;
    return message;
  },
};

function createBaseListenFinalizeBlockResponse(): ListenFinalizeBlockResponse {
  return {};
}

export const ListenFinalizeBlockResponse = {
  encode(
    _: ListenFinalizeBlockResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ListenFinalizeBlockResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenFinalizeBlockResponse();
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

  fromJSON(_: any): ListenFinalizeBlockResponse {
    return {};
  },

  toJSON(_: ListenFinalizeBlockResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<ListenFinalizeBlockResponse>,
  ): ListenFinalizeBlockResponse {
    const message = createBaseListenFinalizeBlockResponse();
    return message;
  },
};

function createBaseListenCommitRequest(): ListenCommitRequest {
  return { block_height: "0", res: undefined, change_set: [] };
}

export const ListenCommitRequest = {
  encode(
    message: ListenCommitRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.block_height !== "0") {
      writer.uint32(8).int64(message.block_height);
    }
    if (message.res !== undefined) {
      ResponseCommit.encode(message.res, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.change_set) {
      StoreKVPair.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListenCommitRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenCommitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.res = ResponseCommit.decode(reader, reader.uint32());
          break;
        case 3:
          message.change_set.push(StoreKVPair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListenCommitRequest {
    return {
      block_height: isSet(object.block_height)
        ? String(object.block_height)
        : "0",
      res: isSet(object.res) ? ResponseCommit.fromJSON(object.res) : undefined,
      change_set: Array.isArray(object?.change_set)
        ? object.change_set.map((e: any) => StoreKVPair.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListenCommitRequest): unknown {
    const obj: any = {};
    message.block_height !== undefined &&
      (obj.block_height = message.block_height);
    message.res !== undefined &&
      (obj.res = message.res ? ResponseCommit.toJSON(message.res) : undefined);
    if (message.change_set) {
      obj.change_set = message.change_set.map((e) =>
        e ? StoreKVPair.toJSON(e) : undefined,
      );
    } else {
      obj.change_set = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ListenCommitRequest>): ListenCommitRequest {
    const message = createBaseListenCommitRequest();
    message.block_height = object.block_height ?? "0";
    message.res =
      object.res !== undefined && object.res !== null
        ? ResponseCommit.fromPartial(object.res)
        : undefined;
    message.change_set =
      object.change_set?.map((e) => StoreKVPair.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListenCommitResponse(): ListenCommitResponse {
  return {};
}

export const ListenCommitResponse = {
  encode(
    _: ListenCommitResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ListenCommitResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenCommitResponse();
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

  fromJSON(_: any): ListenCommitResponse {
    return {};
  },

  toJSON(_: ListenCommitResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<ListenCommitResponse>): ListenCommitResponse {
    const message = createBaseListenCommitResponse();
    return message;
  },
};

/** ABCIListenerService is the service for the BaseApp ABCIListener interface */
export interface ABCIListenerService {
  /** ListenFinalizeBlock is the corresponding endpoint for ABCIListener.ListenEndBlock */
  ListenFinalizeBlock(
    request: ListenFinalizeBlockRequest,
  ): Promise<ListenFinalizeBlockResponse>;
  /** ListenCommit is the corresponding endpoint for ABCIListener.ListenCommit */
  ListenCommit(request: ListenCommitRequest): Promise<ListenCommitResponse>;
}

export class ABCIListenerServiceClientImpl implements ABCIListenerService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListenFinalizeBlock = this.ListenFinalizeBlock.bind(this);
    this.ListenCommit = this.ListenCommit.bind(this);
  }
  ListenFinalizeBlock(
    request: ListenFinalizeBlockRequest,
  ): Promise<ListenFinalizeBlockResponse> {
    const data = ListenFinalizeBlockRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.store.streaming.abci.ABCIListenerService",
      "ListenFinalizeBlock",
      data,
    );
    return promise.then((data) =>
      ListenFinalizeBlockResponse.decode(new _m0.Reader(data)),
    );
  }

  ListenCommit(request: ListenCommitRequest): Promise<ListenCommitResponse> {
    const data = ListenCommitRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.store.streaming.abci.ABCIListenerService",
      "ListenCommit",
      data,
    );
    return promise.then((data) =>
      ListenCommitResponse.decode(new _m0.Reader(data)),
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

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
