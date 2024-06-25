/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { BlockID } from "../../../../tendermint/types/types";
import { Block } from "../../../../tendermint/types/block";
import { Block as Block1 } from "./types";
import { DefaultNodeInfo } from "../../../../tendermint/p2p/types";

export const protobufPackage = "cosmos.base.tendermint.v1beta1";

/** GetValidatorSetByHeightRequest is the request type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetValidatorSetByHeightRequest {
  height: string;
  /** pagination defines an pagination for the request. */
  pagination?: PageRequest;
}

/** GetValidatorSetByHeightResponse is the response type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetValidatorSetByHeightResponse {
  block_height: string;
  validators: Validator[];
  /** pagination defines an pagination for the response. */
  pagination?: PageResponse;
}

/** GetLatestValidatorSetRequest is the request type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetLatestValidatorSetRequest {
  /** pagination defines an pagination for the request. */
  pagination?: PageRequest;
}

/** GetLatestValidatorSetResponse is the response type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetLatestValidatorSetResponse {
  block_height: string;
  validators: Validator[];
  /** pagination defines an pagination for the response. */
  pagination?: PageResponse;
}

/** Validator is the type for the validator-set. */
export interface Validator {
  address: string;
  pub_key?: Any;
  voting_power: string;
  proposer_priority: string;
}

/** GetBlockByHeightRequest is the request type for the Query/GetBlockByHeight RPC method. */
export interface GetBlockByHeightRequest {
  height: string;
}

/** GetBlockByHeightResponse is the response type for the Query/GetBlockByHeight RPC method. */
export interface GetBlockByHeightResponse {
  block_id?: BlockID;
  /** Deprecated: please use `sdk_block` instead */
  block?: Block;
  /** Since: cosmos-sdk 0.47 */
  sdk_block?: Block1;
}

/** GetLatestBlockRequest is the request type for the Query/GetLatestBlock RPC method. */
export interface GetLatestBlockRequest {}

/** GetLatestBlockResponse is the response type for the Query/GetLatestBlock RPC method. */
export interface GetLatestBlockResponse {
  block_id?: BlockID;
  /** Deprecated: please use `sdk_block` instead */
  block?: Block;
  /** Since: cosmos-sdk 0.47 */
  sdk_block?: Block1;
}

/** GetSyncingRequest is the request type for the Query/GetSyncing RPC method. */
export interface GetSyncingRequest {}

/** GetSyncingResponse is the response type for the Query/GetSyncing RPC method. */
export interface GetSyncingResponse {
  syncing: boolean;
}

/** GetNodeInfoRequest is the request type for the Query/GetNodeInfo RPC method. */
export interface GetNodeInfoRequest {}

/** GetNodeInfoResponse is the response type for the Query/GetNodeInfo RPC method. */
export interface GetNodeInfoResponse {
  default_node_info?: DefaultNodeInfo;
  application_version?: VersionInfo;
}

/** VersionInfo is the type for the GetNodeInfoResponse message. */
export interface VersionInfo {
  name: string;
  app_name: string;
  version: string;
  git_commit: string;
  build_tags: string;
  go_version: string;
  build_deps: Module[];
  /** Since: cosmos-sdk 0.43 */
  cosmos_sdk_version: string;
}

/** Module is the type for VersionInfo */
export interface Module {
  /** module path */
  path: string;
  /** module version */
  version: string;
  /** checksum */
  sum: string;
}

/** ABCIQueryRequest defines the request structure for the ABCIQuery gRPC query. */
export interface ABCIQueryRequest {
  data: Uint8Array;
  path: string;
  height: string;
  prove: boolean;
}

/**
 * ABCIQueryResponse defines the response structure for the ABCIQuery gRPC query.
 *
 * Note: This type is a duplicate of the ResponseQuery proto type defined in
 * Tendermint.
 */
export interface ABCIQueryResponse {
  code: number;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  index: string;
  key: Uint8Array;
  value: Uint8Array;
  proof_ops?: ProofOps;
  height: string;
  codespace: string;
}

/**
 * ProofOp defines an operation used for calculating Merkle root. The data could
 * be arbitrary format, providing necessary data for example neighbouring node
 * hash.
 *
 * Note: This type is a duplicate of the ProofOp proto type defined in Tendermint.
 */
export interface ProofOp {
  type: string;
  key: Uint8Array;
  data: Uint8Array;
}

/**
 * ProofOps is Merkle proof defined by the list of ProofOps.
 *
 * Note: This type is a duplicate of the ProofOps proto type defined in Tendermint.
 */
export interface ProofOps {
  ops: ProofOp[];
}

function createBaseGetValidatorSetByHeightRequest(): GetValidatorSetByHeightRequest {
  return { height: "0", pagination: undefined };
}

export const GetValidatorSetByHeightRequest = {
  encode(
    message: GetValidatorSetByHeightRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetValidatorSetByHeightRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetValidatorSetByHeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetValidatorSetByHeightRequest {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: GetValidatorSetByHeightRequest): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetValidatorSetByHeightRequest>,
  ): GetValidatorSetByHeightRequest {
    const message = createBaseGetValidatorSetByHeightRequest();
    message.height = object.height ?? "0";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseGetValidatorSetByHeightResponse(): GetValidatorSetByHeightResponse {
  return { block_height: "0", validators: [], pagination: undefined };
}

export const GetValidatorSetByHeightResponse = {
  encode(
    message: GetValidatorSetByHeightResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.block_height !== "0") {
      writer.uint32(8).int64(message.block_height);
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetValidatorSetByHeightResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetValidatorSetByHeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.validators.push(Validator.decode(reader, reader.uint32()));
          break;
        case 3:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetValidatorSetByHeightResponse {
    return {
      block_height: isSet(object.block_height)
        ? String(object.block_height)
        : "0",
      validators: Array.isArray(object?.validators)
        ? object.validators.map((e: any) => Validator.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: GetValidatorSetByHeightResponse): unknown {
    const obj: any = {};
    message.block_height !== undefined &&
      (obj.block_height = message.block_height);
    if (message.validators) {
      obj.validators = message.validators.map((e) =>
        e ? Validator.toJSON(e) : undefined,
      );
    } else {
      obj.validators = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetValidatorSetByHeightResponse>,
  ): GetValidatorSetByHeightResponse {
    const message = createBaseGetValidatorSetByHeightResponse();
    message.block_height = object.block_height ?? "0";
    message.validators =
      object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseGetLatestValidatorSetRequest(): GetLatestValidatorSetRequest {
  return { pagination: undefined };
}

export const GetLatestValidatorSetRequest = {
  encode(
    message: GetLatestValidatorSetRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetLatestValidatorSetRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLatestValidatorSetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLatestValidatorSetRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: GetLatestValidatorSetRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetLatestValidatorSetRequest>,
  ): GetLatestValidatorSetRequest {
    const message = createBaseGetLatestValidatorSetRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseGetLatestValidatorSetResponse(): GetLatestValidatorSetResponse {
  return { block_height: "0", validators: [], pagination: undefined };
}

export const GetLatestValidatorSetResponse = {
  encode(
    message: GetLatestValidatorSetResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.block_height !== "0") {
      writer.uint32(8).int64(message.block_height);
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetLatestValidatorSetResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLatestValidatorSetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.validators.push(Validator.decode(reader, reader.uint32()));
          break;
        case 3:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLatestValidatorSetResponse {
    return {
      block_height: isSet(object.block_height)
        ? String(object.block_height)
        : "0",
      validators: Array.isArray(object?.validators)
        ? object.validators.map((e: any) => Validator.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: GetLatestValidatorSetResponse): unknown {
    const obj: any = {};
    message.block_height !== undefined &&
      (obj.block_height = message.block_height);
    if (message.validators) {
      obj.validators = message.validators.map((e) =>
        e ? Validator.toJSON(e) : undefined,
      );
    } else {
      obj.validators = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetLatestValidatorSetResponse>,
  ): GetLatestValidatorSetResponse {
    const message = createBaseGetLatestValidatorSetResponse();
    message.block_height = object.block_height ?? "0";
    message.validators =
      object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseValidator(): Validator {
  return {
    address: "",
    pub_key: undefined,
    voting_power: "0",
    proposer_priority: "0",
  };
}

export const Validator = {
  encode(
    message: Validator,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pub_key !== undefined) {
      Any.encode(message.pub_key, writer.uint32(18).fork()).ldelim();
    }
    if (message.voting_power !== "0") {
      writer.uint32(24).int64(message.voting_power);
    }
    if (message.proposer_priority !== "0") {
      writer.uint32(32).int64(message.proposer_priority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pub_key = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.voting_power = longToString(reader.int64() as Long);
          break;
        case 4:
          message.proposer_priority = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Validator {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pub_key: isSet(object.pub_key) ? Any.fromJSON(object.pub_key) : undefined,
      voting_power: isSet(object.voting_power)
        ? String(object.voting_power)
        : "0",
      proposer_priority: isSet(object.proposer_priority)
        ? String(object.proposer_priority)
        : "0",
    };
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.pub_key !== undefined &&
      (obj.pub_key = message.pub_key ? Any.toJSON(message.pub_key) : undefined);
    message.voting_power !== undefined &&
      (obj.voting_power = message.voting_power);
    message.proposer_priority !== undefined &&
      (obj.proposer_priority = message.proposer_priority);
    return obj;
  },

  fromPartial(object: DeepPartial<Validator>): Validator {
    const message = createBaseValidator();
    message.address = object.address ?? "";
    message.pub_key =
      object.pub_key !== undefined && object.pub_key !== null
        ? Any.fromPartial(object.pub_key)
        : undefined;
    message.voting_power = object.voting_power ?? "0";
    message.proposer_priority = object.proposer_priority ?? "0";
    return message;
  },
};

function createBaseGetBlockByHeightRequest(): GetBlockByHeightRequest {
  return { height: "0" };
}

export const GetBlockByHeightRequest = {
  encode(
    message: GetBlockByHeightRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetBlockByHeightRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockByHeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBlockByHeightRequest {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
    };
  },

  toJSON(message: GetBlockByHeightRequest): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetBlockByHeightRequest>,
  ): GetBlockByHeightRequest {
    const message = createBaseGetBlockByHeightRequest();
    message.height = object.height ?? "0";
    return message;
  },
};

function createBaseGetBlockByHeightResponse(): GetBlockByHeightResponse {
  return { block_id: undefined, block: undefined, sdk_block: undefined };
}

export const GetBlockByHeightResponse = {
  encode(
    message: GetBlockByHeightResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(10).fork()).ldelim();
    }
    if (message.block !== undefined) {
      Block.encode(message.block, writer.uint32(18).fork()).ldelim();
    }
    if (message.sdk_block !== undefined) {
      Block1.encode(message.sdk_block, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetBlockByHeightResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockByHeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_id = BlockID.decode(reader, reader.uint32());
          break;
        case 2:
          message.block = Block.decode(reader, reader.uint32());
          break;
        case 3:
          message.sdk_block = Block1.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBlockByHeightResponse {
    return {
      block_id: isSet(object.block_id)
        ? BlockID.fromJSON(object.block_id)
        : undefined,
      block: isSet(object.block) ? Block.fromJSON(object.block) : undefined,
      sdk_block: isSet(object.sdk_block)
        ? Block1.fromJSON(object.sdk_block)
        : undefined,
    };
  },

  toJSON(message: GetBlockByHeightResponse): unknown {
    const obj: any = {};
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? BlockID.toJSON(message.block_id)
        : undefined);
    message.block !== undefined &&
      (obj.block = message.block ? Block.toJSON(message.block) : undefined);
    message.sdk_block !== undefined &&
      (obj.sdk_block = message.sdk_block
        ? Block1.toJSON(message.sdk_block)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetBlockByHeightResponse>,
  ): GetBlockByHeightResponse {
    const message = createBaseGetBlockByHeightResponse();
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromPartial(object.block_id)
        : undefined;
    message.block =
      object.block !== undefined && object.block !== null
        ? Block.fromPartial(object.block)
        : undefined;
    message.sdk_block =
      object.sdk_block !== undefined && object.sdk_block !== null
        ? Block1.fromPartial(object.sdk_block)
        : undefined;
    return message;
  },
};

function createBaseGetLatestBlockRequest(): GetLatestBlockRequest {
  return {};
}

export const GetLatestBlockRequest = {
  encode(
    _: GetLatestBlockRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetLatestBlockRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLatestBlockRequest();
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

  fromJSON(_: any): GetLatestBlockRequest {
    return {};
  },

  toJSON(_: GetLatestBlockRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<GetLatestBlockRequest>): GetLatestBlockRequest {
    const message = createBaseGetLatestBlockRequest();
    return message;
  },
};

function createBaseGetLatestBlockResponse(): GetLatestBlockResponse {
  return { block_id: undefined, block: undefined, sdk_block: undefined };
}

export const GetLatestBlockResponse = {
  encode(
    message: GetLatestBlockResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(10).fork()).ldelim();
    }
    if (message.block !== undefined) {
      Block.encode(message.block, writer.uint32(18).fork()).ldelim();
    }
    if (message.sdk_block !== undefined) {
      Block1.encode(message.sdk_block, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetLatestBlockResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLatestBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_id = BlockID.decode(reader, reader.uint32());
          break;
        case 2:
          message.block = Block.decode(reader, reader.uint32());
          break;
        case 3:
          message.sdk_block = Block1.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLatestBlockResponse {
    return {
      block_id: isSet(object.block_id)
        ? BlockID.fromJSON(object.block_id)
        : undefined,
      block: isSet(object.block) ? Block.fromJSON(object.block) : undefined,
      sdk_block: isSet(object.sdk_block)
        ? Block1.fromJSON(object.sdk_block)
        : undefined,
    };
  },

  toJSON(message: GetLatestBlockResponse): unknown {
    const obj: any = {};
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? BlockID.toJSON(message.block_id)
        : undefined);
    message.block !== undefined &&
      (obj.block = message.block ? Block.toJSON(message.block) : undefined);
    message.sdk_block !== undefined &&
      (obj.sdk_block = message.sdk_block
        ? Block1.toJSON(message.sdk_block)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetLatestBlockResponse>,
  ): GetLatestBlockResponse {
    const message = createBaseGetLatestBlockResponse();
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromPartial(object.block_id)
        : undefined;
    message.block =
      object.block !== undefined && object.block !== null
        ? Block.fromPartial(object.block)
        : undefined;
    message.sdk_block =
      object.sdk_block !== undefined && object.sdk_block !== null
        ? Block1.fromPartial(object.sdk_block)
        : undefined;
    return message;
  },
};

function createBaseGetSyncingRequest(): GetSyncingRequest {
  return {};
}

export const GetSyncingRequest = {
  encode(
    _: GetSyncingRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSyncingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSyncingRequest();
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

  fromJSON(_: any): GetSyncingRequest {
    return {};
  },

  toJSON(_: GetSyncingRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<GetSyncingRequest>): GetSyncingRequest {
    const message = createBaseGetSyncingRequest();
    return message;
  },
};

function createBaseGetSyncingResponse(): GetSyncingResponse {
  return { syncing: false };
}

export const GetSyncingResponse = {
  encode(
    message: GetSyncingResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.syncing === true) {
      writer.uint32(8).bool(message.syncing);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSyncingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSyncingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.syncing = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSyncingResponse {
    return {
      syncing: isSet(object.syncing) ? Boolean(object.syncing) : false,
    };
  },

  toJSON(message: GetSyncingResponse): unknown {
    const obj: any = {};
    message.syncing !== undefined && (obj.syncing = message.syncing);
    return obj;
  },

  fromPartial(object: DeepPartial<GetSyncingResponse>): GetSyncingResponse {
    const message = createBaseGetSyncingResponse();
    message.syncing = object.syncing ?? false;
    return message;
  },
};

function createBaseGetNodeInfoRequest(): GetNodeInfoRequest {
  return {};
}

export const GetNodeInfoRequest = {
  encode(
    _: GetNodeInfoRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNodeInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNodeInfoRequest();
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

  fromJSON(_: any): GetNodeInfoRequest {
    return {};
  },

  toJSON(_: GetNodeInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<GetNodeInfoRequest>): GetNodeInfoRequest {
    const message = createBaseGetNodeInfoRequest();
    return message;
  },
};

function createBaseGetNodeInfoResponse(): GetNodeInfoResponse {
  return { default_node_info: undefined, application_version: undefined };
}

export const GetNodeInfoResponse = {
  encode(
    message: GetNodeInfoResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.default_node_info !== undefined) {
      DefaultNodeInfo.encode(
        message.default_node_info,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.application_version !== undefined) {
      VersionInfo.encode(
        message.application_version,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNodeInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNodeInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.default_node_info = DefaultNodeInfo.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.application_version = VersionInfo.decode(
            reader,
            reader.uint32(),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetNodeInfoResponse {
    return {
      default_node_info: isSet(object.default_node_info)
        ? DefaultNodeInfo.fromJSON(object.default_node_info)
        : undefined,
      application_version: isSet(object.application_version)
        ? VersionInfo.fromJSON(object.application_version)
        : undefined,
    };
  },

  toJSON(message: GetNodeInfoResponse): unknown {
    const obj: any = {};
    message.default_node_info !== undefined &&
      (obj.default_node_info = message.default_node_info
        ? DefaultNodeInfo.toJSON(message.default_node_info)
        : undefined);
    message.application_version !== undefined &&
      (obj.application_version = message.application_version
        ? VersionInfo.toJSON(message.application_version)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetNodeInfoResponse>): GetNodeInfoResponse {
    const message = createBaseGetNodeInfoResponse();
    message.default_node_info =
      object.default_node_info !== undefined &&
      object.default_node_info !== null
        ? DefaultNodeInfo.fromPartial(object.default_node_info)
        : undefined;
    message.application_version =
      object.application_version !== undefined &&
      object.application_version !== null
        ? VersionInfo.fromPartial(object.application_version)
        : undefined;
    return message;
  },
};

function createBaseVersionInfo(): VersionInfo {
  return {
    name: "",
    app_name: "",
    version: "",
    git_commit: "",
    build_tags: "",
    go_version: "",
    build_deps: [],
    cosmos_sdk_version: "",
  };
}

export const VersionInfo = {
  encode(
    message: VersionInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.app_name !== "") {
      writer.uint32(18).string(message.app_name);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.git_commit !== "") {
      writer.uint32(34).string(message.git_commit);
    }
    if (message.build_tags !== "") {
      writer.uint32(42).string(message.build_tags);
    }
    if (message.go_version !== "") {
      writer.uint32(50).string(message.go_version);
    }
    for (const v of message.build_deps) {
      Module.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.cosmos_sdk_version !== "") {
      writer.uint32(66).string(message.cosmos_sdk_version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VersionInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVersionInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.app_name = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        case 4:
          message.git_commit = reader.string();
          break;
        case 5:
          message.build_tags = reader.string();
          break;
        case 6:
          message.go_version = reader.string();
          break;
        case 7:
          message.build_deps.push(Module.decode(reader, reader.uint32()));
          break;
        case 8:
          message.cosmos_sdk_version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VersionInfo {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      app_name: isSet(object.app_name) ? String(object.app_name) : "",
      version: isSet(object.version) ? String(object.version) : "",
      git_commit: isSet(object.git_commit) ? String(object.git_commit) : "",
      build_tags: isSet(object.build_tags) ? String(object.build_tags) : "",
      go_version: isSet(object.go_version) ? String(object.go_version) : "",
      build_deps: Array.isArray(object?.build_deps)
        ? object.build_deps.map((e: any) => Module.fromJSON(e))
        : [],
      cosmos_sdk_version: isSet(object.cosmos_sdk_version)
        ? String(object.cosmos_sdk_version)
        : "",
    };
  },

  toJSON(message: VersionInfo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.app_name !== undefined && (obj.app_name = message.app_name);
    message.version !== undefined && (obj.version = message.version);
    message.git_commit !== undefined && (obj.git_commit = message.git_commit);
    message.build_tags !== undefined && (obj.build_tags = message.build_tags);
    message.go_version !== undefined && (obj.go_version = message.go_version);
    if (message.build_deps) {
      obj.build_deps = message.build_deps.map((e) =>
        e ? Module.toJSON(e) : undefined,
      );
    } else {
      obj.build_deps = [];
    }
    message.cosmos_sdk_version !== undefined &&
      (obj.cosmos_sdk_version = message.cosmos_sdk_version);
    return obj;
  },

  fromPartial(object: DeepPartial<VersionInfo>): VersionInfo {
    const message = createBaseVersionInfo();
    message.name = object.name ?? "";
    message.app_name = object.app_name ?? "";
    message.version = object.version ?? "";
    message.git_commit = object.git_commit ?? "";
    message.build_tags = object.build_tags ?? "";
    message.go_version = object.go_version ?? "";
    message.build_deps =
      object.build_deps?.map((e) => Module.fromPartial(e)) || [];
    message.cosmos_sdk_version = object.cosmos_sdk_version ?? "";
    return message;
  },
};

function createBaseModule(): Module {
  return { path: "", version: "", sum: "" };
}

export const Module = {
  encode(
    message: Module,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.sum !== "") {
      writer.uint32(26).string(message.sum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Module {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.path = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        case 3:
          message.sum = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Module {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      version: isSet(object.version) ? String(object.version) : "",
      sum: isSet(object.sum) ? String(object.sum) : "",
    };
  },

  toJSON(message: Module): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    message.version !== undefined && (obj.version = message.version);
    message.sum !== undefined && (obj.sum = message.sum);
    return obj;
  },

  fromPartial(object: DeepPartial<Module>): Module {
    const message = createBaseModule();
    message.path = object.path ?? "";
    message.version = object.version ?? "";
    message.sum = object.sum ?? "";
    return message;
  },
};

function createBaseABCIQueryRequest(): ABCIQueryRequest {
  return { data: new Uint8Array(), path: "", height: "0", prove: false };
}

export const ABCIQueryRequest = {
  encode(
    message: ABCIQueryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.height !== "0") {
      writer.uint32(24).int64(message.height);
    }
    if (message.prove === true) {
      writer.uint32(32).bool(message.prove);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ABCIQueryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseABCIQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        case 2:
          message.path = reader.string();
          break;
        case 3:
          message.height = longToString(reader.int64() as Long);
          break;
        case 4:
          message.prove = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ABCIQueryRequest {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      path: isSet(object.path) ? String(object.path) : "",
      height: isSet(object.height) ? String(object.height) : "0",
      prove: isSet(object.prove) ? Boolean(object.prove) : false,
    };
  },

  toJSON(message: ABCIQueryRequest): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    message.path !== undefined && (obj.path = message.path);
    message.height !== undefined && (obj.height = message.height);
    message.prove !== undefined && (obj.prove = message.prove);
    return obj;
  },

  fromPartial(object: DeepPartial<ABCIQueryRequest>): ABCIQueryRequest {
    const message = createBaseABCIQueryRequest();
    message.data = object.data ?? new Uint8Array();
    message.path = object.path ?? "";
    message.height = object.height ?? "0";
    message.prove = object.prove ?? false;
    return message;
  },
};

function createBaseABCIQueryResponse(): ABCIQueryResponse {
  return {
    code: 0,
    log: "",
    info: "",
    index: "0",
    key: new Uint8Array(),
    value: new Uint8Array(),
    proof_ops: undefined,
    height: "0",
    codespace: "",
  };
}

export const ABCIQueryResponse = {
  encode(
    message: ABCIQueryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.index !== "0") {
      writer.uint32(40).int64(message.index);
    }
    if (message.key.length !== 0) {
      writer.uint32(50).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(58).bytes(message.value);
    }
    if (message.proof_ops !== undefined) {
      ProofOps.encode(message.proof_ops, writer.uint32(66).fork()).ldelim();
    }
    if (message.height !== "0") {
      writer.uint32(72).int64(message.height);
    }
    if (message.codespace !== "") {
      writer.uint32(82).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ABCIQueryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseABCIQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.uint32();
          break;
        case 3:
          message.log = reader.string();
          break;
        case 4:
          message.info = reader.string();
          break;
        case 5:
          message.index = longToString(reader.int64() as Long);
          break;
        case 6:
          message.key = reader.bytes();
          break;
        case 7:
          message.value = reader.bytes();
          break;
        case 8:
          message.proof_ops = ProofOps.decode(reader, reader.uint32());
          break;
        case 9:
          message.height = longToString(reader.int64() as Long);
          break;
        case 10:
          message.codespace = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ABCIQueryResponse {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
      log: isSet(object.log) ? String(object.log) : "",
      info: isSet(object.info) ? String(object.info) : "",
      index: isSet(object.index) ? String(object.index) : "0",
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
      value: isSet(object.value)
        ? bytesFromBase64(object.value)
        : new Uint8Array(),
      proof_ops: isSet(object.proof_ops)
        ? ProofOps.fromJSON(object.proof_ops)
        : undefined,
      height: isSet(object.height) ? String(object.height) : "0",
      codespace: isSet(object.codespace) ? String(object.codespace) : "",
    };
  },

  toJSON(message: ABCIQueryResponse): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.log !== undefined && (obj.log = message.log);
    message.info !== undefined && (obj.info = message.info);
    message.index !== undefined && (obj.index = message.index);
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array(),
      ));
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array(),
      ));
    message.proof_ops !== undefined &&
      (obj.proof_ops = message.proof_ops
        ? ProofOps.toJSON(message.proof_ops)
        : undefined);
    message.height !== undefined && (obj.height = message.height);
    message.codespace !== undefined && (obj.codespace = message.codespace);
    return obj;
  },

  fromPartial(object: DeepPartial<ABCIQueryResponse>): ABCIQueryResponse {
    const message = createBaseABCIQueryResponse();
    message.code = object.code ?? 0;
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.index = object.index ?? "0";
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    message.proof_ops =
      object.proof_ops !== undefined && object.proof_ops !== null
        ? ProofOps.fromPartial(object.proof_ops)
        : undefined;
    message.height = object.height ?? "0";
    message.codespace = object.codespace ?? "";
    return message;
  },
};

function createBaseProofOp(): ProofOp {
  return { type: "", key: new Uint8Array(), data: new Uint8Array() };
}

export const ProofOp = {
  encode(
    message: ProofOp,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProofOp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.key = reader.bytes();
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProofOp {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: ProofOp): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array(),
      ));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<ProofOp>): ProofOp {
    const message = createBaseProofOp();
    message.type = object.type ?? "";
    message.key = object.key ?? new Uint8Array();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseProofOps(): ProofOps {
  return { ops: [] };
}

export const ProofOps = {
  encode(
    message: ProofOps,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.ops) {
      ProofOp.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProofOps {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofOps();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ops.push(ProofOp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProofOps {
    return {
      ops: Array.isArray(object?.ops)
        ? object.ops.map((e: any) => ProofOp.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ProofOps): unknown {
    const obj: any = {};
    if (message.ops) {
      obj.ops = message.ops.map((e) => (e ? ProofOp.toJSON(e) : undefined));
    } else {
      obj.ops = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ProofOps>): ProofOps {
    const message = createBaseProofOps();
    message.ops = object.ops?.map((e) => ProofOp.fromPartial(e)) || [];
    return message;
  },
};

/** Service defines the gRPC querier service for tendermint queries. */
export interface Service {
  /** GetNodeInfo queries the current node info. */
  GetNodeInfo(request: GetNodeInfoRequest): Promise<GetNodeInfoResponse>;
  /** GetSyncing queries node syncing. */
  GetSyncing(request: GetSyncingRequest): Promise<GetSyncingResponse>;
  /** GetLatestBlock returns the latest block. */
  GetLatestBlock(
    request: GetLatestBlockRequest,
  ): Promise<GetLatestBlockResponse>;
  /** GetBlockByHeight queries block for given height. */
  GetBlockByHeight(
    request: GetBlockByHeightRequest,
  ): Promise<GetBlockByHeightResponse>;
  /** GetLatestValidatorSet queries latest validator-set. */
  GetLatestValidatorSet(
    request: GetLatestValidatorSetRequest,
  ): Promise<GetLatestValidatorSetResponse>;
  /** GetValidatorSetByHeight queries validator-set at a given height. */
  GetValidatorSetByHeight(
    request: GetValidatorSetByHeightRequest,
  ): Promise<GetValidatorSetByHeightResponse>;
  /**
   * ABCIQuery defines a query handler that supports ABCI queries directly to the
   * application, bypassing Tendermint completely. The ABCI query must contain
   * a valid and supported path, including app, custom, p2p, and store.
   *
   * Since: cosmos-sdk 0.46
   */
  ABCIQuery(request: ABCIQueryRequest): Promise<ABCIQueryResponse>;
}

export class ServiceClientImpl implements Service {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetNodeInfo = this.GetNodeInfo.bind(this);
    this.GetSyncing = this.GetSyncing.bind(this);
    this.GetLatestBlock = this.GetLatestBlock.bind(this);
    this.GetBlockByHeight = this.GetBlockByHeight.bind(this);
    this.GetLatestValidatorSet = this.GetLatestValidatorSet.bind(this);
    this.GetValidatorSetByHeight = this.GetValidatorSetByHeight.bind(this);
    this.ABCIQuery = this.ABCIQuery.bind(this);
  }
  GetNodeInfo(request: GetNodeInfoRequest): Promise<GetNodeInfoResponse> {
    const data = GetNodeInfoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetNodeInfo",
      data,
    );
    return promise.then((data) =>
      GetNodeInfoResponse.decode(new _m0.Reader(data)),
    );
  }

  GetSyncing(request: GetSyncingRequest): Promise<GetSyncingResponse> {
    const data = GetSyncingRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetSyncing",
      data,
    );
    return promise.then((data) =>
      GetSyncingResponse.decode(new _m0.Reader(data)),
    );
  }

  GetLatestBlock(
    request: GetLatestBlockRequest,
  ): Promise<GetLatestBlockResponse> {
    const data = GetLatestBlockRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetLatestBlock",
      data,
    );
    return promise.then((data) =>
      GetLatestBlockResponse.decode(new _m0.Reader(data)),
    );
  }

  GetBlockByHeight(
    request: GetBlockByHeightRequest,
  ): Promise<GetBlockByHeightResponse> {
    const data = GetBlockByHeightRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetBlockByHeight",
      data,
    );
    return promise.then((data) =>
      GetBlockByHeightResponse.decode(new _m0.Reader(data)),
    );
  }

  GetLatestValidatorSet(
    request: GetLatestValidatorSetRequest,
  ): Promise<GetLatestValidatorSetResponse> {
    const data = GetLatestValidatorSetRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetLatestValidatorSet",
      data,
    );
    return promise.then((data) =>
      GetLatestValidatorSetResponse.decode(new _m0.Reader(data)),
    );
  }

  GetValidatorSetByHeight(
    request: GetValidatorSetByHeightRequest,
  ): Promise<GetValidatorSetByHeightResponse> {
    const data = GetValidatorSetByHeightRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetValidatorSetByHeight",
      data,
    );
    return promise.then((data) =>
      GetValidatorSetByHeightResponse.decode(new _m0.Reader(data)),
    );
  }

  ABCIQuery(request: ABCIQueryRequest): Promise<ABCIQueryResponse> {
    const data = ABCIQueryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "ABCIQuery",
      data,
    );
    return promise.then((data) =>
      ABCIQueryResponse.decode(new _m0.Reader(data)),
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
