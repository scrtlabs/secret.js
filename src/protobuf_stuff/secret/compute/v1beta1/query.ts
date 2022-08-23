/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import { ContractInfo } from "../../../secret/compute/v1beta1/types";
import { Empty } from "../../../google/protobuf/empty";
import { BrowserHeaders } from "browser-headers";
import { StringEvent } from "../../../cosmos/base/abci/v1beta1/abci";

export const protobufPackage = "secret.compute.v1beta1";

export interface QuerySmartContractStateRequest {
  /** address is the canonical address of the contract */
  address: string;
  queryData: Uint8Array;
}

export interface QueryByLabelRequest {
  label: string;
}

export interface QueryByAddressRequest {
  /** address is the canonical address of the contract */
  address: string;
}

export interface QueryByIDRequest {
  /** grpc-gateway_out does not support Go style CodID */
  codeId: string;
}

export interface QuerySmartContractStateResponse {
  data: Uint8Array;
}

/** QueryContractInfoResponse is the response type for the Query/ContractInfo RPC method */
export interface QueryContractInfoResponse {
  /** address is the canonical address of the contract */
  address: string;
  ContractInfo?: ContractInfo;
}

/** ContractInfoWithAddress adds the address (key) to the ContractInfo representation */
export interface ContractInfoWithAddress {
  /** address is the canonical address of the contract */
  address: string;
  ContractInfo?: ContractInfo;
}

export interface QueryContractsByCodeResponse {
  contractInfos: ContractInfoWithAddress[];
}

export interface CodeInfoResponse {
  /** id for legacy support */
  codeId: string;
  creator: string;
  dataHash: Uint8Array;
  source: string;
  builder: string;
}

export interface QueryCodeResponse {
  codeInfo?: CodeInfoResponse;
  data: Uint8Array;
}

export interface QueryCodesResponse {
  codeInfos: CodeInfoResponse[];
}

export interface QueryContractAddressResponse {
  /** address is the canonical address of the contract */
  address: string;
}

export interface QueryContractLabelResponse {
  label: string;
}

export interface QueryContractKeyResponse {
  key: Uint8Array;
}

export interface QueryContractHashResponse {
  codeHash: Uint8Array;
}

/** DecryptedAnswer is a struct that represents a decrypted tx-query */
export interface DecryptedAnswer {
  type: string;
  input: string;
  outputData: string;
  outputDataAsString: string;
  outputLogs: StringEvent[];
  outputError: Uint8Array;
  plaintextError: string;
}

function createBaseQuerySmartContractStateRequest(): QuerySmartContractStateRequest {
  return { address: "", queryData: new Uint8Array() };
}

export const QuerySmartContractStateRequest = {
  encode(
    message: QuerySmartContractStateRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.queryData.length !== 0) {
      writer.uint32(18).bytes(message.queryData);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QuerySmartContractStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySmartContractStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.queryData = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySmartContractStateRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      queryData: isSet(object.queryData)
        ? bytesFromBase64(object.queryData)
        : new Uint8Array(),
    };
  },

  toJSON(message: QuerySmartContractStateRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.queryData !== undefined &&
      (obj.queryData = base64FromBytes(
        message.queryData !== undefined ? message.queryData : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySmartContractStateRequest>, I>>(
    object: I,
  ): QuerySmartContractStateRequest {
    const message = createBaseQuerySmartContractStateRequest();
    message.address = object.address ?? "";
    message.queryData = object.queryData ?? new Uint8Array();
    return message;
  },
};

function createBaseQueryByLabelRequest(): QueryByLabelRequest {
  return { label: "" };
}

export const QueryByLabelRequest = {
  encode(
    message: QueryByLabelRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryByLabelRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryByLabelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.label = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryByLabelRequest {
    return {
      label: isSet(object.label) ? String(object.label) : "",
    };
  },

  toJSON(message: QueryByLabelRequest): unknown {
    const obj: any = {};
    message.label !== undefined && (obj.label = message.label);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryByLabelRequest>, I>>(
    object: I,
  ): QueryByLabelRequest {
    const message = createBaseQueryByLabelRequest();
    message.label = object.label ?? "";
    return message;
  },
};

function createBaseQueryByAddressRequest(): QueryByAddressRequest {
  return { address: "" };
}

export const QueryByAddressRequest = {
  encode(
    message: QueryByAddressRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryByAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryByAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryByAddressRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryByAddressRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryByAddressRequest>, I>>(
    object: I,
  ): QueryByAddressRequest {
    const message = createBaseQueryByAddressRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryByIDRequest(): QueryByIDRequest {
  return { codeId: "0" };
}

export const QueryByIDRequest = {
  encode(
    message: QueryByIDRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.codeId !== "0") {
      writer.uint32(8).uint64(message.codeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryByIDRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryByIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryByIDRequest {
    return {
      codeId: isSet(object.codeId) ? String(object.codeId) : "0",
    };
  },

  toJSON(message: QueryByIDRequest): unknown {
    const obj: any = {};
    message.codeId !== undefined && (obj.codeId = message.codeId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryByIDRequest>, I>>(
    object: I,
  ): QueryByIDRequest {
    const message = createBaseQueryByIDRequest();
    message.codeId = object.codeId ?? "0";
    return message;
  },
};

function createBaseQuerySmartContractStateResponse(): QuerySmartContractStateResponse {
  return { data: new Uint8Array() };
}

export const QuerySmartContractStateResponse = {
  encode(
    message: QuerySmartContractStateResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QuerySmartContractStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySmartContractStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySmartContractStateResponse {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: QuerySmartContractStateResponse): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySmartContractStateResponse>, I>>(
    object: I,
  ): QuerySmartContractStateResponse {
    const message = createBaseQuerySmartContractStateResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseQueryContractInfoResponse(): QueryContractInfoResponse {
  return { address: "", ContractInfo: undefined };
}

export const QueryContractInfoResponse = {
  encode(
    message: QueryContractInfoResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.ContractInfo !== undefined) {
      ContractInfo.encode(
        message.ContractInfo,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryContractInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.ContractInfo = ContractInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryContractInfoResponse {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      ContractInfo: isSet(object.ContractInfo)
        ? ContractInfo.fromJSON(object.ContractInfo)
        : undefined,
    };
  },

  toJSON(message: QueryContractInfoResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.ContractInfo !== undefined &&
      (obj.ContractInfo = message.ContractInfo
        ? ContractInfo.toJSON(message.ContractInfo)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryContractInfoResponse>, I>>(
    object: I,
  ): QueryContractInfoResponse {
    const message = createBaseQueryContractInfoResponse();
    message.address = object.address ?? "";
    message.ContractInfo =
      object.ContractInfo !== undefined && object.ContractInfo !== null
        ? ContractInfo.fromPartial(object.ContractInfo)
        : undefined;
    return message;
  },
};

function createBaseContractInfoWithAddress(): ContractInfoWithAddress {
  return { address: "", ContractInfo: undefined };
}

export const ContractInfoWithAddress = {
  encode(
    message: ContractInfoWithAddress,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.ContractInfo !== undefined) {
      ContractInfo.encode(
        message.ContractInfo,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ContractInfoWithAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractInfoWithAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.ContractInfo = ContractInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContractInfoWithAddress {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      ContractInfo: isSet(object.ContractInfo)
        ? ContractInfo.fromJSON(object.ContractInfo)
        : undefined,
    };
  },

  toJSON(message: ContractInfoWithAddress): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.ContractInfo !== undefined &&
      (obj.ContractInfo = message.ContractInfo
        ? ContractInfo.toJSON(message.ContractInfo)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContractInfoWithAddress>, I>>(
    object: I,
  ): ContractInfoWithAddress {
    const message = createBaseContractInfoWithAddress();
    message.address = object.address ?? "";
    message.ContractInfo =
      object.ContractInfo !== undefined && object.ContractInfo !== null
        ? ContractInfo.fromPartial(object.ContractInfo)
        : undefined;
    return message;
  },
};

function createBaseQueryContractsByCodeResponse(): QueryContractsByCodeResponse {
  return { contractInfos: [] };
}

export const QueryContractsByCodeResponse = {
  encode(
    message: QueryContractsByCodeResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.contractInfos) {
      ContractInfoWithAddress.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryContractsByCodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractsByCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractInfos.push(
            ContractInfoWithAddress.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryContractsByCodeResponse {
    return {
      contractInfos: Array.isArray(object?.contractInfos)
        ? object.contractInfos.map((e: any) =>
            ContractInfoWithAddress.fromJSON(e),
          )
        : [],
    };
  },

  toJSON(message: QueryContractsByCodeResponse): unknown {
    const obj: any = {};
    if (message.contractInfos) {
      obj.contractInfos = message.contractInfos.map((e) =>
        e ? ContractInfoWithAddress.toJSON(e) : undefined,
      );
    } else {
      obj.contractInfos = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryContractsByCodeResponse>, I>>(
    object: I,
  ): QueryContractsByCodeResponse {
    const message = createBaseQueryContractsByCodeResponse();
    message.contractInfos =
      object.contractInfos?.map((e) =>
        ContractInfoWithAddress.fromPartial(e),
      ) || [];
    return message;
  },
};

function createBaseCodeInfoResponse(): CodeInfoResponse {
  return {
    codeId: "0",
    creator: "",
    dataHash: new Uint8Array(),
    source: "",
    builder: "",
  };
}

export const CodeInfoResponse = {
  encode(
    message: CodeInfoResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.codeId !== "0") {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.dataHash.length !== 0) {
      writer.uint32(26).bytes(message.dataHash);
    }
    if (message.source !== "") {
      writer.uint32(34).string(message.source);
    }
    if (message.builder !== "") {
      writer.uint32(42).string(message.builder);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CodeInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCodeInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.dataHash = reader.bytes();
          break;
        case 4:
          message.source = reader.string();
          break;
        case 5:
          message.builder = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CodeInfoResponse {
    return {
      codeId: isSet(object.codeId) ? String(object.codeId) : "0",
      creator: isSet(object.creator) ? String(object.creator) : "",
      dataHash: isSet(object.dataHash)
        ? bytesFromBase64(object.dataHash)
        : new Uint8Array(),
      source: isSet(object.source) ? String(object.source) : "",
      builder: isSet(object.builder) ? String(object.builder) : "",
    };
  },

  toJSON(message: CodeInfoResponse): unknown {
    const obj: any = {};
    message.codeId !== undefined && (obj.codeId = message.codeId);
    message.creator !== undefined && (obj.creator = message.creator);
    message.dataHash !== undefined &&
      (obj.dataHash = base64FromBytes(
        message.dataHash !== undefined ? message.dataHash : new Uint8Array(),
      ));
    message.source !== undefined && (obj.source = message.source);
    message.builder !== undefined && (obj.builder = message.builder);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CodeInfoResponse>, I>>(
    object: I,
  ): CodeInfoResponse {
    const message = createBaseCodeInfoResponse();
    message.codeId = object.codeId ?? "0";
    message.creator = object.creator ?? "";
    message.dataHash = object.dataHash ?? new Uint8Array();
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    return message;
  },
};

function createBaseQueryCodeResponse(): QueryCodeResponse {
  return { codeInfo: undefined, data: new Uint8Array() };
}

export const QueryCodeResponse = {
  encode(
    message: QueryCodeResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.codeInfo !== undefined) {
      CodeInfoResponse.encode(
        message.codeInfo,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeInfo = CodeInfoResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCodeResponse {
    return {
      codeInfo: isSet(object.codeInfo)
        ? CodeInfoResponse.fromJSON(object.codeInfo)
        : undefined,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: QueryCodeResponse): unknown {
    const obj: any = {};
    message.codeInfo !== undefined &&
      (obj.codeInfo = message.codeInfo
        ? CodeInfoResponse.toJSON(message.codeInfo)
        : undefined);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCodeResponse>, I>>(
    object: I,
  ): QueryCodeResponse {
    const message = createBaseQueryCodeResponse();
    message.codeInfo =
      object.codeInfo !== undefined && object.codeInfo !== null
        ? CodeInfoResponse.fromPartial(object.codeInfo)
        : undefined;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseQueryCodesResponse(): QueryCodesResponse {
  return { codeInfos: [] };
}

export const QueryCodesResponse = {
  encode(
    message: QueryCodesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.codeInfos) {
      CodeInfoResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCodesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeInfos.push(
            CodeInfoResponse.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCodesResponse {
    return {
      codeInfos: Array.isArray(object?.codeInfos)
        ? object.codeInfos.map((e: any) => CodeInfoResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryCodesResponse): unknown {
    const obj: any = {};
    if (message.codeInfos) {
      obj.codeInfos = message.codeInfos.map((e) =>
        e ? CodeInfoResponse.toJSON(e) : undefined,
      );
    } else {
      obj.codeInfos = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCodesResponse>, I>>(
    object: I,
  ): QueryCodesResponse {
    const message = createBaseQueryCodesResponse();
    message.codeInfos =
      object.codeInfos?.map((e) => CodeInfoResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryContractAddressResponse(): QueryContractAddressResponse {
  return { address: "" };
}

export const QueryContractAddressResponse = {
  encode(
    message: QueryContractAddressResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryContractAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryContractAddressResponse {
    return {
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryContractAddressResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryContractAddressResponse>, I>>(
    object: I,
  ): QueryContractAddressResponse {
    const message = createBaseQueryContractAddressResponse();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryContractLabelResponse(): QueryContractLabelResponse {
  return { label: "" };
}

export const QueryContractLabelResponse = {
  encode(
    message: QueryContractLabelResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryContractLabelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractLabelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.label = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryContractLabelResponse {
    return {
      label: isSet(object.label) ? String(object.label) : "",
    };
  },

  toJSON(message: QueryContractLabelResponse): unknown {
    const obj: any = {};
    message.label !== undefined && (obj.label = message.label);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryContractLabelResponse>, I>>(
    object: I,
  ): QueryContractLabelResponse {
    const message = createBaseQueryContractLabelResponse();
    message.label = object.label ?? "";
    return message;
  },
};

function createBaseQueryContractKeyResponse(): QueryContractKeyResponse {
  return { key: new Uint8Array() };
}

export const QueryContractKeyResponse = {
  encode(
    message: QueryContractKeyResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryContractKeyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryContractKeyResponse {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
    };
  },

  toJSON(message: QueryContractKeyResponse): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryContractKeyResponse>, I>>(
    object: I,
  ): QueryContractKeyResponse {
    const message = createBaseQueryContractKeyResponse();
    message.key = object.key ?? new Uint8Array();
    return message;
  },
};

function createBaseQueryContractHashResponse(): QueryContractHashResponse {
  return { codeHash: new Uint8Array() };
}

export const QueryContractHashResponse = {
  encode(
    message: QueryContractHashResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.codeHash.length !== 0) {
      writer.uint32(10).bytes(message.codeHash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryContractHashResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeHash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryContractHashResponse {
    return {
      codeHash: isSet(object.codeHash)
        ? bytesFromBase64(object.codeHash)
        : new Uint8Array(),
    };
  },

  toJSON(message: QueryContractHashResponse): unknown {
    const obj: any = {};
    message.codeHash !== undefined &&
      (obj.codeHash = base64FromBytes(
        message.codeHash !== undefined ? message.codeHash : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryContractHashResponse>, I>>(
    object: I,
  ): QueryContractHashResponse {
    const message = createBaseQueryContractHashResponse();
    message.codeHash = object.codeHash ?? new Uint8Array();
    return message;
  },
};

function createBaseDecryptedAnswer(): DecryptedAnswer {
  return {
    type: "",
    input: "",
    outputData: "",
    outputDataAsString: "",
    outputLogs: [],
    outputError: new Uint8Array(),
    plaintextError: "",
  };
}

export const DecryptedAnswer = {
  encode(
    message: DecryptedAnswer,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.input !== "") {
      writer.uint32(18).string(message.input);
    }
    if (message.outputData !== "") {
      writer.uint32(26).string(message.outputData);
    }
    if (message.outputDataAsString !== "") {
      writer.uint32(34).string(message.outputDataAsString);
    }
    for (const v of message.outputLogs) {
      StringEvent.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.outputError.length !== 0) {
      writer.uint32(50).bytes(message.outputError);
    }
    if (message.plaintextError !== "") {
      writer.uint32(58).string(message.plaintextError);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecryptedAnswer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecryptedAnswer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.input = reader.string();
          break;
        case 3:
          message.outputData = reader.string();
          break;
        case 4:
          message.outputDataAsString = reader.string();
          break;
        case 5:
          message.outputLogs.push(StringEvent.decode(reader, reader.uint32()));
          break;
        case 6:
          message.outputError = reader.bytes();
          break;
        case 7:
          message.plaintextError = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DecryptedAnswer {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      input: isSet(object.input) ? String(object.input) : "",
      outputData: isSet(object.outputData) ? String(object.outputData) : "",
      outputDataAsString: isSet(object.outputDataAsString)
        ? String(object.outputDataAsString)
        : "",
      outputLogs: Array.isArray(object?.outputLogs)
        ? object.outputLogs.map((e: any) => StringEvent.fromJSON(e))
        : [],
      outputError: isSet(object.outputError)
        ? bytesFromBase64(object.outputError)
        : new Uint8Array(),
      plaintextError: isSet(object.plaintextError)
        ? String(object.plaintextError)
        : "",
    };
  },

  toJSON(message: DecryptedAnswer): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.input !== undefined && (obj.input = message.input);
    message.outputData !== undefined && (obj.outputData = message.outputData);
    message.outputDataAsString !== undefined &&
      (obj.outputDataAsString = message.outputDataAsString);
    if (message.outputLogs) {
      obj.outputLogs = message.outputLogs.map((e) =>
        e ? StringEvent.toJSON(e) : undefined,
      );
    } else {
      obj.outputLogs = [];
    }
    message.outputError !== undefined &&
      (obj.outputError = base64FromBytes(
        message.outputError !== undefined
          ? message.outputError
          : new Uint8Array(),
      ));
    message.plaintextError !== undefined &&
      (obj.plaintextError = message.plaintextError);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DecryptedAnswer>, I>>(
    object: I,
  ): DecryptedAnswer {
    const message = createBaseDecryptedAnswer();
    message.type = object.type ?? "";
    message.input = object.input ?? "";
    message.outputData = object.outputData ?? "";
    message.outputDataAsString = object.outputDataAsString ?? "";
    message.outputLogs =
      object.outputLogs?.map((e) => StringEvent.fromPartial(e)) || [];
    message.outputError = object.outputError ?? new Uint8Array();
    message.plaintextError = object.plaintextError ?? "";
    return message;
  },
};

/** Query provides defines the gRPC querier service */
export interface Query {
  /** Query contract */
  contractInfo(
    request: DeepPartial<QueryByAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractInfoResponse>;
  /** Query contract */
  contractsByCode(
    request: DeepPartial<QueryByIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractsByCodeResponse>;
  /** Query contract */
  smartContractState(
    request: DeepPartial<QuerySmartContractStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QuerySmartContractStateResponse>;
  /** Query a specific contract code */
  code(
    request: DeepPartial<QueryByIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodeResponse>;
  /** Query all contract codes on-chain */
  codes(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodesResponse>;
  /** Query contract hash by address */
  contractHash(
    request: DeepPartial<QueryByAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractHashResponse>;
  /** Query contract hash by code id */
  contractHashByID(
    request: DeepPartial<QueryByIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractHashResponse>;
  /** Query contract key by address */
  contractKey(
    request: DeepPartial<QueryByAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractKeyResponse>;
  /** Query contract label by address */
  labelByAddress(
    request: DeepPartial<QueryByAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractLabelResponse>;
  /** Query contract address by label */
  addressByLabel(
    request: DeepPartial<QueryByLabelRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractAddressResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.contractInfo = this.contractInfo.bind(this);
    this.contractsByCode = this.contractsByCode.bind(this);
    this.smartContractState = this.smartContractState.bind(this);
    this.code = this.code.bind(this);
    this.codes = this.codes.bind(this);
    this.contractHash = this.contractHash.bind(this);
    this.contractHashByID = this.contractHashByID.bind(this);
    this.contractKey = this.contractKey.bind(this);
    this.labelByAddress = this.labelByAddress.bind(this);
    this.addressByLabel = this.addressByLabel.bind(this);
  }

  contractInfo(
    request: DeepPartial<QueryByAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractInfoResponse> {
    return this.rpc.unary(
      QueryContractInfoDesc,
      QueryByAddressRequest.fromPartial(request),
      metadata,
    );
  }

  contractsByCode(
    request: DeepPartial<QueryByIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractsByCodeResponse> {
    return this.rpc.unary(
      QueryContractsByCodeDesc,
      QueryByIDRequest.fromPartial(request),
      metadata,
    );
  }

  smartContractState(
    request: DeepPartial<QuerySmartContractStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QuerySmartContractStateResponse> {
    return this.rpc.unary(
      QuerySmartContractStateDesc,
      QuerySmartContractStateRequest.fromPartial(request),
      metadata,
    );
  }

  code(
    request: DeepPartial<QueryByIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodeResponse> {
    return this.rpc.unary(
      QueryCodeDesc,
      QueryByIDRequest.fromPartial(request),
      metadata,
    );
  }

  codes(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodesResponse> {
    return this.rpc.unary(QueryCodesDesc, Empty.fromPartial(request), metadata);
  }

  contractHash(
    request: DeepPartial<QueryByAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractHashResponse> {
    return this.rpc.unary(
      QueryContractHashDesc,
      QueryByAddressRequest.fromPartial(request),
      metadata,
    );
  }

  contractHashByID(
    request: DeepPartial<QueryByIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractHashResponse> {
    return this.rpc.unary(
      QueryContractHashByIDDesc,
      QueryByIDRequest.fromPartial(request),
      metadata,
    );
  }

  contractKey(
    request: DeepPartial<QueryByAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractKeyResponse> {
    return this.rpc.unary(
      QueryContractKeyDesc,
      QueryByAddressRequest.fromPartial(request),
      metadata,
    );
  }

  labelByAddress(
    request: DeepPartial<QueryByAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractLabelResponse> {
    return this.rpc.unary(
      QueryLabelByAddressDesc,
      QueryByAddressRequest.fromPartial(request),
      metadata,
    );
  }

  addressByLabel(
    request: DeepPartial<QueryByLabelRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractAddressResponse> {
    return this.rpc.unary(
      QueryAddressByLabelDesc,
      QueryByLabelRequest.fromPartial(request),
      metadata,
    );
  }
}

export const QueryDesc = {
  serviceName: "secret.compute.v1beta1.Query",
};

export const QueryContractInfoDesc: UnaryMethodDefinitionish = {
  methodName: "ContractInfo",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryByAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryContractInfoResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryContractsByCodeDesc: UnaryMethodDefinitionish = {
  methodName: "ContractsByCode",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryByIDRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryContractsByCodeResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QuerySmartContractStateDesc: UnaryMethodDefinitionish = {
  methodName: "SmartContractState",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QuerySmartContractStateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QuerySmartContractStateResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryCodeDesc: UnaryMethodDefinitionish = {
  methodName: "Code",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryByIDRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryCodeResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryCodesDesc: UnaryMethodDefinitionish = {
  methodName: "Codes",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryCodesResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryContractHashDesc: UnaryMethodDefinitionish = {
  methodName: "ContractHash",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryByAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryContractHashResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryContractHashByIDDesc: UnaryMethodDefinitionish = {
  methodName: "ContractHashByID",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryByIDRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryContractHashResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryContractKeyDesc: UnaryMethodDefinitionish = {
  methodName: "ContractKey",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryByAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryContractKeyResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryLabelByAddressDesc: UnaryMethodDefinitionish = {
  methodName: "LabelByAddress",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryByAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryContractLabelResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryAddressByLabelDesc: UnaryMethodDefinitionish = {
  methodName: "AddressByLabel",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryByLabelRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryContractAddressResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR
  extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({
            ...this.options?.metadata.headersMap,
            ...metadata?.headersMap,
          })
        : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message);
          } else {
            const err = new Error(response.statusMessage) as any;
            err.code = response.status;
            err.metadata = response.trailers;
            reject(err);
          }
        },
      });
    });
  }
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
