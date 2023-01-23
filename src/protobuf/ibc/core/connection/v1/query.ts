/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { ConnectionEnd, IdentifiedConnection } from "./connection";
import { Height, IdentifiedClientState } from "../../client/v1/client";
import {
  PageRequest,
  PageResponse,
} from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";

export const protobufPackage = "ibc.core.connection.v1";

/**
 * QueryConnectionRequest is the request type for the Query/Connection RPC
 * method
 */
export interface QueryConnectionRequest {
  /** connection unique identifier */
  connection_id: string;
}

/**
 * QueryConnectionResponse is the response type for the Query/Connection RPC
 * method. Besides the connection end, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryConnectionResponse {
  /** connection associated with the request identifier */
  connection?: ConnectionEnd;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height?: Height;
}

/**
 * QueryConnectionsRequest is the request type for the Query/Connections RPC
 * method
 */
export interface QueryConnectionsRequest {
  pagination?: PageRequest;
}

/**
 * QueryConnectionsResponse is the response type for the Query/Connections RPC
 * method.
 */
export interface QueryConnectionsResponse {
  /** list of stored connections of the chain. */
  connections: IdentifiedConnection[];
  /** pagination response */
  pagination?: PageResponse;
  /** query block height */
  height?: Height;
}

/**
 * QueryClientConnectionsRequest is the request type for the
 * Query/ClientConnections RPC method
 */
export interface QueryClientConnectionsRequest {
  /** client identifier associated with a connection */
  client_id: string;
}

/**
 * QueryClientConnectionsResponse is the response type for the
 * Query/ClientConnections RPC method
 */
export interface QueryClientConnectionsResponse {
  /** slice of all the connection paths associated with a client. */
  connection_paths: string[];
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was generated */
  proof_height?: Height;
}

/**
 * QueryConnectionClientStateRequest is the request type for the
 * Query/ConnectionClientState RPC method
 */
export interface QueryConnectionClientStateRequest {
  /** connection identifier */
  connection_id: string;
}

/**
 * QueryConnectionClientStateResponse is the response type for the
 * Query/ConnectionClientState RPC method
 */
export interface QueryConnectionClientStateResponse {
  /** client state associated with the channel */
  identified_client_state?: IdentifiedClientState;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height?: Height;
}

/**
 * QueryConnectionConsensusStateRequest is the request type for the
 * Query/ConnectionConsensusState RPC method
 */
export interface QueryConnectionConsensusStateRequest {
  /** connection identifier */
  connection_id: string;
  revision_number: string;
  revision_height: string;
}

/**
 * QueryConnectionConsensusStateResponse is the response type for the
 * Query/ConnectionConsensusState RPC method
 */
export interface QueryConnectionConsensusStateResponse {
  /** consensus state associated with the channel */
  consensus_state?: Any;
  /** client ID associated with the consensus state */
  client_id: string;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height?: Height;
}

function createBaseQueryConnectionRequest(): QueryConnectionRequest {
  return { connection_id: "" };
}

export const QueryConnectionRequest = {
  encode(
    message: QueryConnectionRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryConnectionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connection_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConnectionRequest {
    return {
      connection_id: isSet(object.connection_id)
        ? String(object.connection_id)
        : "",
    };
  },

  toJSON(message: QueryConnectionRequest): unknown {
    const obj: any = {};
    message.connection_id !== undefined &&
      (obj.connection_id = message.connection_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConnectionRequest>, I>>(
    object: I,
  ): QueryConnectionRequest {
    const message = createBaseQueryConnectionRequest();
    message.connection_id = object.connection_id ?? "";
    return message;
  },
};

function createBaseQueryConnectionResponse(): QueryConnectionResponse {
  return {
    connection: undefined,
    proof: new Uint8Array(),
    proof_height: undefined,
  };
}

export const QueryConnectionResponse = {
  encode(
    message: QueryConnectionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.connection !== undefined) {
      ConnectionEnd.encode(
        message.connection,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryConnectionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connection = ConnectionEnd.decode(reader, reader.uint32());
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConnectionResponse {
    return {
      connection: isSet(object.connection)
        ? ConnectionEnd.fromJSON(object.connection)
        : undefined,
      proof: isSet(object.proof)
        ? bytesFromBase64(object.proof)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
    };
  },

  toJSON(message: QueryConnectionResponse): unknown {
    const obj: any = {};
    message.connection !== undefined &&
      (obj.connection = message.connection
        ? ConnectionEnd.toJSON(message.connection)
        : undefined);
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(
        message.proof !== undefined ? message.proof : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConnectionResponse>, I>>(
    object: I,
  ): QueryConnectionResponse {
    const message = createBaseQueryConnectionResponse();
    message.connection =
      object.connection !== undefined && object.connection !== null
        ? ConnectionEnd.fromPartial(object.connection)
        : undefined;
    message.proof = object.proof ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    return message;
  },
};

function createBaseQueryConnectionsRequest(): QueryConnectionsRequest {
  return { pagination: undefined };
}

export const QueryConnectionsRequest = {
  encode(
    message: QueryConnectionsRequest,
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
  ): QueryConnectionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionsRequest();
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

  fromJSON(object: any): QueryConnectionsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryConnectionsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConnectionsRequest>, I>>(
    object: I,
  ): QueryConnectionsRequest {
    const message = createBaseQueryConnectionsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryConnectionsResponse(): QueryConnectionsResponse {
  return { connections: [], pagination: undefined, height: undefined };
}

export const QueryConnectionsResponse = {
  encode(
    message: QueryConnectionsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.connections) {
      IdentifiedConnection.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryConnectionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connections.push(
            IdentifiedConnection.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        case 3:
          message.height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConnectionsResponse {
    return {
      connections: Array.isArray(object?.connections)
        ? object.connections.map((e: any) => IdentifiedConnection.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
      height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
    };
  },

  toJSON(message: QueryConnectionsResponse): unknown {
    const obj: any = {};
    if (message.connections) {
      obj.connections = message.connections.map((e) =>
        e ? IdentifiedConnection.toJSON(e) : undefined,
      );
    } else {
      obj.connections = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    message.height !== undefined &&
      (obj.height = message.height ? Height.toJSON(message.height) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConnectionsResponse>, I>>(
    object: I,
  ): QueryConnectionsResponse {
    const message = createBaseQueryConnectionsResponse();
    message.connections =
      object.connections?.map((e) => IdentifiedConnection.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    message.height =
      object.height !== undefined && object.height !== null
        ? Height.fromPartial(object.height)
        : undefined;
    return message;
  },
};

function createBaseQueryClientConnectionsRequest(): QueryClientConnectionsRequest {
  return { client_id: "" };
}

export const QueryClientConnectionsRequest = {
  encode(
    message: QueryClientConnectionsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryClientConnectionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientConnectionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.client_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClientConnectionsRequest {
    return {
      client_id: isSet(object.client_id) ? String(object.client_id) : "",
    };
  },

  toJSON(message: QueryClientConnectionsRequest): unknown {
    const obj: any = {};
    message.client_id !== undefined && (obj.client_id = message.client_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryClientConnectionsRequest>, I>>(
    object: I,
  ): QueryClientConnectionsRequest {
    const message = createBaseQueryClientConnectionsRequest();
    message.client_id = object.client_id ?? "";
    return message;
  },
};

function createBaseQueryClientConnectionsResponse(): QueryClientConnectionsResponse {
  return {
    connection_paths: [],
    proof: new Uint8Array(),
    proof_height: undefined,
  };
}

export const QueryClientConnectionsResponse = {
  encode(
    message: QueryClientConnectionsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.connection_paths) {
      writer.uint32(10).string(v!);
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryClientConnectionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientConnectionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connection_paths.push(reader.string());
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClientConnectionsResponse {
    return {
      connection_paths: Array.isArray(object?.connection_paths)
        ? object.connection_paths.map((e: any) => String(e))
        : [],
      proof: isSet(object.proof)
        ? bytesFromBase64(object.proof)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
    };
  },

  toJSON(message: QueryClientConnectionsResponse): unknown {
    const obj: any = {};
    if (message.connection_paths) {
      obj.connection_paths = message.connection_paths.map((e) => e);
    } else {
      obj.connection_paths = [];
    }
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(
        message.proof !== undefined ? message.proof : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryClientConnectionsResponse>, I>>(
    object: I,
  ): QueryClientConnectionsResponse {
    const message = createBaseQueryClientConnectionsResponse();
    message.connection_paths = object.connection_paths?.map((e) => e) || [];
    message.proof = object.proof ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    return message;
  },
};

function createBaseQueryConnectionClientStateRequest(): QueryConnectionClientStateRequest {
  return { connection_id: "" };
}

export const QueryConnectionClientStateRequest = {
  encode(
    message: QueryConnectionClientStateRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryConnectionClientStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionClientStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connection_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConnectionClientStateRequest {
    return {
      connection_id: isSet(object.connection_id)
        ? String(object.connection_id)
        : "",
    };
  },

  toJSON(message: QueryConnectionClientStateRequest): unknown {
    const obj: any = {};
    message.connection_id !== undefined &&
      (obj.connection_id = message.connection_id);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryConnectionClientStateRequest>, I>,
  >(object: I): QueryConnectionClientStateRequest {
    const message = createBaseQueryConnectionClientStateRequest();
    message.connection_id = object.connection_id ?? "";
    return message;
  },
};

function createBaseQueryConnectionClientStateResponse(): QueryConnectionClientStateResponse {
  return {
    identified_client_state: undefined,
    proof: new Uint8Array(),
    proof_height: undefined,
  };
}

export const QueryConnectionClientStateResponse = {
  encode(
    message: QueryConnectionClientStateResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.identified_client_state !== undefined) {
      IdentifiedClientState.encode(
        message.identified_client_state,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryConnectionClientStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionClientStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identified_client_state = IdentifiedClientState.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConnectionClientStateResponse {
    return {
      identified_client_state: isSet(object.identified_client_state)
        ? IdentifiedClientState.fromJSON(object.identified_client_state)
        : undefined,
      proof: isSet(object.proof)
        ? bytesFromBase64(object.proof)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
    };
  },

  toJSON(message: QueryConnectionClientStateResponse): unknown {
    const obj: any = {};
    message.identified_client_state !== undefined &&
      (obj.identified_client_state = message.identified_client_state
        ? IdentifiedClientState.toJSON(message.identified_client_state)
        : undefined);
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(
        message.proof !== undefined ? message.proof : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryConnectionClientStateResponse>, I>,
  >(object: I): QueryConnectionClientStateResponse {
    const message = createBaseQueryConnectionClientStateResponse();
    message.identified_client_state =
      object.identified_client_state !== undefined &&
      object.identified_client_state !== null
        ? IdentifiedClientState.fromPartial(object.identified_client_state)
        : undefined;
    message.proof = object.proof ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    return message;
  },
};

function createBaseQueryConnectionConsensusStateRequest(): QueryConnectionConsensusStateRequest {
  return { connection_id: "", revision_number: "0", revision_height: "0" };
}

export const QueryConnectionConsensusStateRequest = {
  encode(
    message: QueryConnectionConsensusStateRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    if (message.revision_number !== "0") {
      writer.uint32(16).uint64(message.revision_number);
    }
    if (message.revision_height !== "0") {
      writer.uint32(24).uint64(message.revision_height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryConnectionConsensusStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionConsensusStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connection_id = reader.string();
          break;
        case 2:
          message.revision_number = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.revision_height = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConnectionConsensusStateRequest {
    return {
      connection_id: isSet(object.connection_id)
        ? String(object.connection_id)
        : "",
      revision_number: isSet(object.revision_number)
        ? String(object.revision_number)
        : "0",
      revision_height: isSet(object.revision_height)
        ? String(object.revision_height)
        : "0",
    };
  },

  toJSON(message: QueryConnectionConsensusStateRequest): unknown {
    const obj: any = {};
    message.connection_id !== undefined &&
      (obj.connection_id = message.connection_id);
    message.revision_number !== undefined &&
      (obj.revision_number = message.revision_number);
    message.revision_height !== undefined &&
      (obj.revision_height = message.revision_height);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryConnectionConsensusStateRequest>, I>,
  >(object: I): QueryConnectionConsensusStateRequest {
    const message = createBaseQueryConnectionConsensusStateRequest();
    message.connection_id = object.connection_id ?? "";
    message.revision_number = object.revision_number ?? "0";
    message.revision_height = object.revision_height ?? "0";
    return message;
  },
};

function createBaseQueryConnectionConsensusStateResponse(): QueryConnectionConsensusStateResponse {
  return {
    consensus_state: undefined,
    client_id: "",
    proof: new Uint8Array(),
    proof_height: undefined,
  };
}

export const QueryConnectionConsensusStateResponse = {
  encode(
    message: QueryConnectionConsensusStateResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consensus_state !== undefined) {
      Any.encode(message.consensus_state, writer.uint32(10).fork()).ldelim();
    }
    if (message.client_id !== "") {
      writer.uint32(18).string(message.client_id);
    }
    if (message.proof.length !== 0) {
      writer.uint32(26).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryConnectionConsensusStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionConsensusStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensus_state = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.client_id = reader.string();
          break;
        case 3:
          message.proof = reader.bytes();
          break;
        case 4:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConnectionConsensusStateResponse {
    return {
      consensus_state: isSet(object.consensus_state)
        ? Any.fromJSON(object.consensus_state)
        : undefined,
      client_id: isSet(object.client_id) ? String(object.client_id) : "",
      proof: isSet(object.proof)
        ? bytesFromBase64(object.proof)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
    };
  },

  toJSON(message: QueryConnectionConsensusStateResponse): unknown {
    const obj: any = {};
    message.consensus_state !== undefined &&
      (obj.consensus_state = message.consensus_state
        ? Any.toJSON(message.consensus_state)
        : undefined);
    message.client_id !== undefined && (obj.client_id = message.client_id);
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(
        message.proof !== undefined ? message.proof : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryConnectionConsensusStateResponse>, I>,
  >(object: I): QueryConnectionConsensusStateResponse {
    const message = createBaseQueryConnectionConsensusStateResponse();
    message.consensus_state =
      object.consensus_state !== undefined && object.consensus_state !== null
        ? Any.fromPartial(object.consensus_state)
        : undefined;
    message.client_id = object.client_id ?? "";
    message.proof = object.proof ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    return message;
  },
};

/** Query provides defines the gRPC querier service */
export interface Query {
  /** Connection queries an IBC connection end. */
  Connection(request: QueryConnectionRequest): Promise<QueryConnectionResponse>;
  /** Connections queries all the IBC connections of a chain. */
  Connections(
    request: QueryConnectionsRequest,
  ): Promise<QueryConnectionsResponse>;
  /**
   * ClientConnections queries the connection paths associated with a client
   * state.
   */
  ClientConnections(
    request: QueryClientConnectionsRequest,
  ): Promise<QueryClientConnectionsResponse>;
  /**
   * ConnectionClientState queries the client state associated with the
   * connection.
   */
  ConnectionClientState(
    request: QueryConnectionClientStateRequest,
  ): Promise<QueryConnectionClientStateResponse>;
  /**
   * ConnectionConsensusState queries the consensus state associated with the
   * connection.
   */
  ConnectionConsensusState(
    request: QueryConnectionConsensusStateRequest,
  ): Promise<QueryConnectionConsensusStateResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Connection = this.Connection.bind(this);
    this.Connections = this.Connections.bind(this);
    this.ClientConnections = this.ClientConnections.bind(this);
    this.ConnectionClientState = this.ConnectionClientState.bind(this);
    this.ConnectionConsensusState = this.ConnectionConsensusState.bind(this);
  }
  Connection(
    request: QueryConnectionRequest,
  ): Promise<QueryConnectionResponse> {
    const data = QueryConnectionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.connection.v1.Query",
      "Connection",
      data,
    );
    return promise.then((data) =>
      QueryConnectionResponse.decode(new _m0.Reader(data)),
    );
  }

  Connections(
    request: QueryConnectionsRequest,
  ): Promise<QueryConnectionsResponse> {
    const data = QueryConnectionsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.connection.v1.Query",
      "Connections",
      data,
    );
    return promise.then((data) =>
      QueryConnectionsResponse.decode(new _m0.Reader(data)),
    );
  }

  ClientConnections(
    request: QueryClientConnectionsRequest,
  ): Promise<QueryClientConnectionsResponse> {
    const data = QueryClientConnectionsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.connection.v1.Query",
      "ClientConnections",
      data,
    );
    return promise.then((data) =>
      QueryClientConnectionsResponse.decode(new _m0.Reader(data)),
    );
  }

  ConnectionClientState(
    request: QueryConnectionClientStateRequest,
  ): Promise<QueryConnectionClientStateResponse> {
    const data = QueryConnectionClientStateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.connection.v1.Query",
      "ConnectionClientState",
      data,
    );
    return promise.then((data) =>
      QueryConnectionClientStateResponse.decode(new _m0.Reader(data)),
    );
  }

  ConnectionConsensusState(
    request: QueryConnectionConsensusStateRequest,
  ): Promise<QueryConnectionConsensusStateResponse> {
    const data = QueryConnectionConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.connection.v1.Query",
      "ConnectionConsensusState",
      data,
    );
    return promise.then((data) =>
      QueryConnectionConsensusStateResponse.decode(new _m0.Reader(data)),
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

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

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
