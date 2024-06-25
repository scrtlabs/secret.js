/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { DenomTrace, Params } from "./transfer";
import {
  PageRequest,
  PageResponse,
} from "../../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "ibc.applications.transfer.v1";

/**
 * QueryDenomTraceRequest is the request type for the Query/DenomTrace RPC
 * method
 */
export interface QueryDenomTraceRequest {
  /** hash (in hex format) or denom (full denom with ibc prefix) of the denomination trace information. */
  hash: string;
}

/**
 * QueryDenomTraceResponse is the response type for the Query/DenomTrace RPC
 * method.
 */
export interface QueryDenomTraceResponse {
  /** denom_trace returns the requested denomination trace information. */
  denom_trace?: DenomTrace;
}

/**
 * QueryConnectionsRequest is the request type for the Query/DenomTraces RPC
 * method
 */
export interface QueryDenomTracesRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/**
 * QueryConnectionsResponse is the response type for the Query/DenomTraces RPC
 * method.
 */
export interface QueryDenomTracesResponse {
  /** denom_traces returns all denominations trace information. */
  denom_traces: DenomTrace[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: Params;
}

/**
 * QueryDenomHashRequest is the request type for the Query/DenomHash RPC
 * method
 */
export interface QueryDenomHashRequest {
  /** The denomination trace ([port_id]/[channel_id])+/[denom] */
  trace: string;
}

/**
 * QueryDenomHashResponse is the response type for the Query/DenomHash RPC
 * method.
 */
export interface QueryDenomHashResponse {
  /** hash (in hex format) of the denomination trace information. */
  hash: string;
}

/** QueryEscrowAddressRequest is the request type for the EscrowAddress RPC method. */
export interface QueryEscrowAddressRequest {
  /** unique port identifier */
  port_id: string;
  /** unique channel identifier */
  channel_id: string;
}

/** QueryEscrowAddressResponse is the response type of the EscrowAddress RPC method. */
export interface QueryEscrowAddressResponse {
  /** the escrow account address */
  escrow_address: string;
}

/** QueryTotalEscrowForDenomRequest is the request type for TotalEscrowForDenom RPC method. */
export interface QueryTotalEscrowForDenomRequest {
  denom: string;
}

/** QueryTotalEscrowForDenomResponse is the response type for TotalEscrowForDenom RPC method. */
export interface QueryTotalEscrowForDenomResponse {
  amount?: Coin;
}

function createBaseQueryDenomTraceRequest(): QueryDenomTraceRequest {
  return { hash: "" };
}

export const QueryDenomTraceRequest = {
  encode(
    message: QueryDenomTraceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryDenomTraceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTraceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomTraceRequest {
    return {
      hash: isSet(object.hash) ? String(object.hash) : "",
    };
  },

  toJSON(message: QueryDenomTraceRequest): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryDenomTraceRequest>,
  ): QueryDenomTraceRequest {
    const message = createBaseQueryDenomTraceRequest();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseQueryDenomTraceResponse(): QueryDenomTraceResponse {
  return { denom_trace: undefined };
}

export const QueryDenomTraceResponse = {
  encode(
    message: QueryDenomTraceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.denom_trace !== undefined) {
      DenomTrace.encode(message.denom_trace, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryDenomTraceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTraceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom_trace = DenomTrace.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomTraceResponse {
    return {
      denom_trace: isSet(object.denom_trace)
        ? DenomTrace.fromJSON(object.denom_trace)
        : undefined,
    };
  },

  toJSON(message: QueryDenomTraceResponse): unknown {
    const obj: any = {};
    message.denom_trace !== undefined &&
      (obj.denom_trace = message.denom_trace
        ? DenomTrace.toJSON(message.denom_trace)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryDenomTraceResponse>,
  ): QueryDenomTraceResponse {
    const message = createBaseQueryDenomTraceResponse();
    message.denom_trace =
      object.denom_trace !== undefined && object.denom_trace !== null
        ? DenomTrace.fromPartial(object.denom_trace)
        : undefined;
    return message;
  },
};

function createBaseQueryDenomTracesRequest(): QueryDenomTracesRequest {
  return { pagination: undefined };
}

export const QueryDenomTracesRequest = {
  encode(
    message: QueryDenomTracesRequest,
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
  ): QueryDenomTracesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTracesRequest();
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

  fromJSON(object: any): QueryDenomTracesRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryDenomTracesRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryDenomTracesRequest>,
  ): QueryDenomTracesRequest {
    const message = createBaseQueryDenomTracesRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryDenomTracesResponse(): QueryDenomTracesResponse {
  return { denom_traces: [], pagination: undefined };
}

export const QueryDenomTracesResponse = {
  encode(
    message: QueryDenomTracesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.denom_traces) {
      DenomTrace.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryDenomTracesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTracesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom_traces.push(DenomTrace.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomTracesResponse {
    return {
      denom_traces: Array.isArray(object?.denom_traces)
        ? object.denom_traces.map((e: any) => DenomTrace.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryDenomTracesResponse): unknown {
    const obj: any = {};
    if (message.denom_traces) {
      obj.denom_traces = message.denom_traces.map((e) =>
        e ? DenomTrace.toJSON(e) : undefined,
      );
    } else {
      obj.denom_traces = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryDenomTracesResponse>,
  ): QueryDenomTracesResponse {
    const message = createBaseQueryDenomTracesResponse();
    message.denom_traces =
      object.denom_traces?.map((e) => DenomTrace.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(
    _: QueryParamsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseQueryDenomHashRequest(): QueryDenomHashRequest {
  return { trace: "" };
}

export const QueryDenomHashRequest = {
  encode(
    message: QueryDenomHashRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.trace !== "") {
      writer.uint32(10).string(message.trace);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryDenomHashRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomHashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trace = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomHashRequest {
    return {
      trace: isSet(object.trace) ? String(object.trace) : "",
    };
  },

  toJSON(message: QueryDenomHashRequest): unknown {
    const obj: any = {};
    message.trace !== undefined && (obj.trace = message.trace);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryDenomHashRequest>,
  ): QueryDenomHashRequest {
    const message = createBaseQueryDenomHashRequest();
    message.trace = object.trace ?? "";
    return message;
  },
};

function createBaseQueryDenomHashResponse(): QueryDenomHashResponse {
  return { hash: "" };
}

export const QueryDenomHashResponse = {
  encode(
    message: QueryDenomHashResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryDenomHashResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomHashResponse {
    return {
      hash: isSet(object.hash) ? String(object.hash) : "",
    };
  },

  toJSON(message: QueryDenomHashResponse): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryDenomHashResponse>,
  ): QueryDenomHashResponse {
    const message = createBaseQueryDenomHashResponse();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseQueryEscrowAddressRequest(): QueryEscrowAddressRequest {
  return { port_id: "", channel_id: "" };
}

export const QueryEscrowAddressRequest = {
  encode(
    message: QueryEscrowAddressRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryEscrowAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEscrowAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.port_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryEscrowAddressRequest {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
    };
  },

  toJSON(message: QueryEscrowAddressRequest): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryEscrowAddressRequest>,
  ): QueryEscrowAddressRequest {
    const message = createBaseQueryEscrowAddressRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseQueryEscrowAddressResponse(): QueryEscrowAddressResponse {
  return { escrow_address: "" };
}

export const QueryEscrowAddressResponse = {
  encode(
    message: QueryEscrowAddressResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.escrow_address !== "") {
      writer.uint32(10).string(message.escrow_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryEscrowAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEscrowAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.escrow_address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryEscrowAddressResponse {
    return {
      escrow_address: isSet(object.escrow_address)
        ? String(object.escrow_address)
        : "",
    };
  },

  toJSON(message: QueryEscrowAddressResponse): unknown {
    const obj: any = {};
    message.escrow_address !== undefined &&
      (obj.escrow_address = message.escrow_address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryEscrowAddressResponse>,
  ): QueryEscrowAddressResponse {
    const message = createBaseQueryEscrowAddressResponse();
    message.escrow_address = object.escrow_address ?? "";
    return message;
  },
};

function createBaseQueryTotalEscrowForDenomRequest(): QueryTotalEscrowForDenomRequest {
  return { denom: "" };
}

export const QueryTotalEscrowForDenomRequest = {
  encode(
    message: QueryTotalEscrowForDenomRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryTotalEscrowForDenomRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalEscrowForDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalEscrowForDenomRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
    };
  },

  toJSON(message: QueryTotalEscrowForDenomRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTotalEscrowForDenomRequest>,
  ): QueryTotalEscrowForDenomRequest {
    const message = createBaseQueryTotalEscrowForDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryTotalEscrowForDenomResponse(): QueryTotalEscrowForDenomResponse {
  return { amount: undefined };
}

export const QueryTotalEscrowForDenomResponse = {
  encode(
    message: QueryTotalEscrowForDenomResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryTotalEscrowForDenomResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalEscrowForDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalEscrowForDenomResponse {
    return {
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: QueryTotalEscrowForDenomResponse): unknown {
    const obj: any = {};
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTotalEscrowForDenomResponse>,
  ): QueryTotalEscrowForDenomResponse {
    const message = createBaseQueryTotalEscrowForDenomResponse();
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromPartial(object.amount)
        : undefined;
    return message;
  },
};

/** Query provides defines the gRPC querier service. */
export interface Query {
  /** DenomTraces queries all denomination traces. */
  DenomTraces(
    request: QueryDenomTracesRequest,
  ): Promise<QueryDenomTracesResponse>;
  /** DenomTrace queries a denomination trace information. */
  DenomTrace(request: QueryDenomTraceRequest): Promise<QueryDenomTraceResponse>;
  /** Params queries all parameters of the ibc-transfer module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** DenomHash queries a denomination hash information. */
  DenomHash(request: QueryDenomHashRequest): Promise<QueryDenomHashResponse>;
  /** EscrowAddress returns the escrow address for a particular port and channel id. */
  EscrowAddress(
    request: QueryEscrowAddressRequest,
  ): Promise<QueryEscrowAddressResponse>;
  /** TotalEscrowForDenom returns the total amount of tokens in escrow based on the denom. */
  TotalEscrowForDenom(
    request: QueryTotalEscrowForDenomRequest,
  ): Promise<QueryTotalEscrowForDenomResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DenomTraces = this.DenomTraces.bind(this);
    this.DenomTrace = this.DenomTrace.bind(this);
    this.Params = this.Params.bind(this);
    this.DenomHash = this.DenomHash.bind(this);
    this.EscrowAddress = this.EscrowAddress.bind(this);
    this.TotalEscrowForDenom = this.TotalEscrowForDenom.bind(this);
  }
  DenomTraces(
    request: QueryDenomTracesRequest,
  ): Promise<QueryDenomTracesResponse> {
    const data = QueryDenomTracesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.applications.transfer.v1.Query",
      "DenomTraces",
      data,
    );
    return promise.then((data) =>
      QueryDenomTracesResponse.decode(new _m0.Reader(data)),
    );
  }

  DenomTrace(
    request: QueryDenomTraceRequest,
  ): Promise<QueryDenomTraceResponse> {
    const data = QueryDenomTraceRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.applications.transfer.v1.Query",
      "DenomTrace",
      data,
    );
    return promise.then((data) =>
      QueryDenomTraceResponse.decode(new _m0.Reader(data)),
    );
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.applications.transfer.v1.Query",
      "Params",
      data,
    );
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data)),
    );
  }

  DenomHash(request: QueryDenomHashRequest): Promise<QueryDenomHashResponse> {
    const data = QueryDenomHashRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.applications.transfer.v1.Query",
      "DenomHash",
      data,
    );
    return promise.then((data) =>
      QueryDenomHashResponse.decode(new _m0.Reader(data)),
    );
  }

  EscrowAddress(
    request: QueryEscrowAddressRequest,
  ): Promise<QueryEscrowAddressResponse> {
    const data = QueryEscrowAddressRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.applications.transfer.v1.Query",
      "EscrowAddress",
      data,
    );
    return promise.then((data) =>
      QueryEscrowAddressResponse.decode(new _m0.Reader(data)),
    );
  }

  TotalEscrowForDenom(
    request: QueryTotalEscrowForDenomRequest,
  ): Promise<QueryTotalEscrowForDenomResponse> {
    const data = QueryTotalEscrowForDenomRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.applications.transfer.v1.Query",
      "TotalEscrowForDenom",
      data,
    );
    return promise.then((data) =>
      QueryTotalEscrowForDenomResponse.decode(new _m0.Reader(data)),
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
