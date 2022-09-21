/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import * as _m0 from "protobufjs/minimal";
import { ContractInfo } from "../../../secret/compute/v1beta1/types";
import { Empty } from "../../../google/protobuf/empty";
import { BrowserHeaders } from "browser-headers";
import { StringEvent } from "../../../cosmos/base/abci/v1beta1/abci";

export const protobufPackage = "secret.compute.v1beta1";

export interface QuerySecretContractRequest {
  /** address is the bech32 human readable address of the contract */
  contractAddress: string;
  query: Uint8Array;
}

export interface QueryByLabelRequest {
  label: string;
}

export interface QueryByContractAddressRequest {
  /** address is the bech32 human readable address of the contract */
  contractAddress: string;
}

export interface QueryByCodeIDRequest {
  codeId: string;
}

export interface QuerySecretContractResponse {
  data: Uint8Array;
}

/** QueryContractInfoResponse is the response type for the Query/ContractInfo RPC method */
export interface QueryContractInfoResponse {
  /** contract_address is the bech32 human readable address of the contract */
  contractAddress: string;
  ContractInfo?: ContractInfo;
}

/** ContractInfoWithAddress adds the contract address to the ContractInfo representation */
export interface ContractInfoWithAddress {
  /** contract_address is the bech32 human readable address of the contract */
  contractAddress: string;
  ContractInfo?: ContractInfo;
}

export interface QueryContractsByCodeIDResponse {
  contractInfos: ContractInfoWithAddress[];
}

export interface CodeInfoResponse {
  codeId: string;
  /** creator is the bech32 human readable address of the contract */
  creator: string;
  codeHash: string;
  source: string;
  builder: string;
}

export interface QueryCodeResponse {
  codeInfo?: CodeInfoResponse;
  wasm: Uint8Array;
}

export interface QueryCodesResponse {
  codeInfos: CodeInfoResponse[];
}

export interface QueryContractAddressResponse {
  /** address is the bech32 human readable address of the contract */
  contractAddress: string;
}

export interface QueryContractLabelResponse {
  label: string;
}

export interface QueryCodeHashResponse {
  codeHash: string;
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

function createBaseQuerySecretContractRequest(): QuerySecretContractRequest {
  return { contractAddress: "", query: new Uint8Array() };
}

export const QuerySecretContractRequest = {
  encode(
    message: QuerySecretContractRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    if (message.query.length !== 0) {
      writer.uint32(18).bytes(message.query);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QuerySecretContractRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySecretContractRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        case 2:
          message.query = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySecretContractRequest {
    return {
      contractAddress: isSet(object.contractAddress)
        ? String(object.contractAddress)
        : "",
      query: isSet(object.query)
        ? bytesFromBase64(object.query)
        : new Uint8Array(),
    };
  },

  toJSON(message: QuerySecretContractRequest): unknown {
    const obj: any = {};
    message.contractAddress !== undefined &&
      (obj.contractAddress = message.contractAddress);
    message.query !== undefined &&
      (obj.query = base64FromBytes(
        message.query !== undefined ? message.query : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySecretContractRequest>, I>>(
    object: I,
  ): QuerySecretContractRequest {
    const message = createBaseQuerySecretContractRequest();
    message.contractAddress = object.contractAddress ?? "";
    message.query = object.query ?? new Uint8Array();
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

function createBaseQueryByContractAddressRequest(): QueryByContractAddressRequest {
  return { contractAddress: "" };
}

export const QueryByContractAddressRequest = {
  encode(
    message: QueryByContractAddressRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryByContractAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryByContractAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryByContractAddressRequest {
    return {
      contractAddress: isSet(object.contractAddress)
        ? String(object.contractAddress)
        : "",
    };
  },

  toJSON(message: QueryByContractAddressRequest): unknown {
    const obj: any = {};
    message.contractAddress !== undefined &&
      (obj.contractAddress = message.contractAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryByContractAddressRequest>, I>>(
    object: I,
  ): QueryByContractAddressRequest {
    const message = createBaseQueryByContractAddressRequest();
    message.contractAddress = object.contractAddress ?? "";
    return message;
  },
};

function createBaseQueryByCodeIDRequest(): QueryByCodeIDRequest {
  return { codeId: "0" };
}

export const QueryByCodeIDRequest = {
  encode(
    message: QueryByCodeIDRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.codeId !== "0") {
      writer.uint32(8).uint64(message.codeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryByCodeIDRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryByCodeIDRequest();
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

  fromJSON(object: any): QueryByCodeIDRequest {
    return {
      codeId: isSet(object.codeId) ? String(object.codeId) : "0",
    };
  },

  toJSON(message: QueryByCodeIDRequest): unknown {
    const obj: any = {};
    message.codeId !== undefined && (obj.codeId = message.codeId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryByCodeIDRequest>, I>>(
    object: I,
  ): QueryByCodeIDRequest {
    const message = createBaseQueryByCodeIDRequest();
    message.codeId = object.codeId ?? "0";
    return message;
  },
};

function createBaseQuerySecretContractResponse(): QuerySecretContractResponse {
  return { data: new Uint8Array() };
}

export const QuerySecretContractResponse = {
  encode(
    message: QuerySecretContractResponse,
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
  ): QuerySecretContractResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySecretContractResponse();
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

  fromJSON(object: any): QuerySecretContractResponse {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: QuerySecretContractResponse): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySecretContractResponse>, I>>(
    object: I,
  ): QuerySecretContractResponse {
    const message = createBaseQuerySecretContractResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseQueryContractInfoResponse(): QueryContractInfoResponse {
  return { contractAddress: "", ContractInfo: undefined };
}

export const QueryContractInfoResponse = {
  encode(
    message: QueryContractInfoResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
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
          message.contractAddress = reader.string();
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
      contractAddress: isSet(object.contractAddress)
        ? String(object.contractAddress)
        : "",
      ContractInfo: isSet(object.ContractInfo)
        ? ContractInfo.fromJSON(object.ContractInfo)
        : undefined,
    };
  },

  toJSON(message: QueryContractInfoResponse): unknown {
    const obj: any = {};
    message.contractAddress !== undefined &&
      (obj.contractAddress = message.contractAddress);
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
    message.contractAddress = object.contractAddress ?? "";
    message.ContractInfo =
      object.ContractInfo !== undefined && object.ContractInfo !== null
        ? ContractInfo.fromPartial(object.ContractInfo)
        : undefined;
    return message;
  },
};

function createBaseContractInfoWithAddress(): ContractInfoWithAddress {
  return { contractAddress: "", ContractInfo: undefined };
}

export const ContractInfoWithAddress = {
  encode(
    message: ContractInfoWithAddress,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
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
          message.contractAddress = reader.string();
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
      contractAddress: isSet(object.contractAddress)
        ? String(object.contractAddress)
        : "",
      ContractInfo: isSet(object.ContractInfo)
        ? ContractInfo.fromJSON(object.ContractInfo)
        : undefined,
    };
  },

  toJSON(message: ContractInfoWithAddress): unknown {
    const obj: any = {};
    message.contractAddress !== undefined &&
      (obj.contractAddress = message.contractAddress);
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
    message.contractAddress = object.contractAddress ?? "";
    message.ContractInfo =
      object.ContractInfo !== undefined && object.ContractInfo !== null
        ? ContractInfo.fromPartial(object.ContractInfo)
        : undefined;
    return message;
  },
};

function createBaseQueryContractsByCodeIDResponse(): QueryContractsByCodeIDResponse {
  return { contractInfos: [] };
}

export const QueryContractsByCodeIDResponse = {
  encode(
    message: QueryContractsByCodeIDResponse,
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
  ): QueryContractsByCodeIDResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractsByCodeIDResponse();
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

  fromJSON(object: any): QueryContractsByCodeIDResponse {
    return {
      contractInfos: Array.isArray(object?.contractInfos)
        ? object.contractInfos.map((e: any) =>
            ContractInfoWithAddress.fromJSON(e),
          )
        : [],
    };
  },

  toJSON(message: QueryContractsByCodeIDResponse): unknown {
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

  fromPartial<I extends Exact<DeepPartial<QueryContractsByCodeIDResponse>, I>>(
    object: I,
  ): QueryContractsByCodeIDResponse {
    const message = createBaseQueryContractsByCodeIDResponse();
    message.contractInfos =
      object.contractInfos?.map((e) =>
        ContractInfoWithAddress.fromPartial(e),
      ) || [];
    return message;
  },
};

function createBaseCodeInfoResponse(): CodeInfoResponse {
  return { codeId: "0", creator: "", codeHash: "", source: "", builder: "" };
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
    if (message.codeHash !== "") {
      writer.uint32(26).string(message.codeHash);
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
          message.codeHash = reader.string();
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
      codeHash: isSet(object.codeHash) ? String(object.codeHash) : "",
      source: isSet(object.source) ? String(object.source) : "",
      builder: isSet(object.builder) ? String(object.builder) : "",
    };
  },

  toJSON(message: CodeInfoResponse): unknown {
    const obj: any = {};
    message.codeId !== undefined && (obj.codeId = message.codeId);
    message.creator !== undefined && (obj.creator = message.creator);
    message.codeHash !== undefined && (obj.codeHash = message.codeHash);
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
    message.codeHash = object.codeHash ?? "";
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    return message;
  },
};

function createBaseQueryCodeResponse(): QueryCodeResponse {
  return { codeInfo: undefined, wasm: new Uint8Array() };
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
    if (message.wasm.length !== 0) {
      writer.uint32(18).bytes(message.wasm);
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
          message.wasm = reader.bytes();
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
      wasm: isSet(object.wasm)
        ? bytesFromBase64(object.wasm)
        : new Uint8Array(),
    };
  },

  toJSON(message: QueryCodeResponse): unknown {
    const obj: any = {};
    message.codeInfo !== undefined &&
      (obj.codeInfo = message.codeInfo
        ? CodeInfoResponse.toJSON(message.codeInfo)
        : undefined);
    message.wasm !== undefined &&
      (obj.wasm = base64FromBytes(
        message.wasm !== undefined ? message.wasm : new Uint8Array(),
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
    message.wasm = object.wasm ?? new Uint8Array();
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
  return { contractAddress: "" };
}

export const QueryContractAddressResponse = {
  encode(
    message: QueryContractAddressResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
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
          message.contractAddress = reader.string();
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
      contractAddress: isSet(object.contractAddress)
        ? String(object.contractAddress)
        : "",
    };
  },

  toJSON(message: QueryContractAddressResponse): unknown {
    const obj: any = {};
    message.contractAddress !== undefined &&
      (obj.contractAddress = message.contractAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryContractAddressResponse>, I>>(
    object: I,
  ): QueryContractAddressResponse {
    const message = createBaseQueryContractAddressResponse();
    message.contractAddress = object.contractAddress ?? "";
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

function createBaseQueryCodeHashResponse(): QueryCodeHashResponse {
  return { codeHash: "" };
}

export const QueryCodeHashResponse = {
  encode(
    message: QueryCodeHashResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.codeHash !== "") {
      writer.uint32(10).string(message.codeHash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryCodeHashResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodeHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCodeHashResponse {
    return {
      codeHash: isSet(object.codeHash) ? String(object.codeHash) : "",
    };
  },

  toJSON(message: QueryCodeHashResponse): unknown {
    const obj: any = {};
    message.codeHash !== undefined && (obj.codeHash = message.codeHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCodeHashResponse>, I>>(
    object: I,
  ): QueryCodeHashResponse {
    const message = createBaseQueryCodeHashResponse();
    message.codeHash = object.codeHash ?? "";
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

/** Query defines the gRPC querier service */
export interface Query {
  /** Query contract info by address */
  contractInfo(
    request: DeepPartial<QueryByContractAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractInfoResponse>;
  /** Query code info by id */
  contractsByCodeID(
    request: DeepPartial<QueryByCodeIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractsByCodeIDResponse>;
  /** Query secret contract */
  querySecretContract(
    request: DeepPartial<QuerySecretContractRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QuerySecretContractResponse>;
  /** Query a specific contract code by id */
  code(
    request: DeepPartial<QueryByCodeIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodeResponse>;
  /** Query all contract codes on-chain */
  codes(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodesResponse>;
  /** Query code hash by contract address */
  codeHashByContractAddress(
    request: DeepPartial<QueryByContractAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodeHashResponse>;
  /** Query code hash by code id */
  codeHashByCodeID(
    request: DeepPartial<QueryByCodeIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodeHashResponse>;
  /** Query contract label by address */
  labelByAddress(
    request: DeepPartial<QueryByContractAddressRequest>,
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
    this.contractsByCodeID = this.contractsByCodeID.bind(this);
    this.querySecretContract = this.querySecretContract.bind(this);
    this.code = this.code.bind(this);
    this.codes = this.codes.bind(this);
    this.codeHashByContractAddress = this.codeHashByContractAddress.bind(this);
    this.codeHashByCodeID = this.codeHashByCodeID.bind(this);
    this.labelByAddress = this.labelByAddress.bind(this);
    this.addressByLabel = this.addressByLabel.bind(this);
  }

  contractInfo(
    request: DeepPartial<QueryByContractAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractInfoResponse> {
    return this.rpc.unary(
      QueryContractInfoDesc,
      QueryByContractAddressRequest.fromPartial(request),
      metadata,
    );
  }

  contractsByCodeID(
    request: DeepPartial<QueryByCodeIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractsByCodeIDResponse> {
    return this.rpc.unary(
      QueryContractsByCodeIDDesc,
      QueryByCodeIDRequest.fromPartial(request),
      metadata,
    );
  }

  querySecretContract(
    request: DeepPartial<QuerySecretContractRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QuerySecretContractResponse> {
    return this.rpc.unary(
      QueryQuerySecretContractDesc,
      QuerySecretContractRequest.fromPartial(request),
      metadata,
    );
  }

  code(
    request: DeepPartial<QueryByCodeIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodeResponse> {
    return this.rpc.unary(
      QueryCodeDesc,
      QueryByCodeIDRequest.fromPartial(request),
      metadata,
    );
  }

  codes(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodesResponse> {
    return this.rpc.unary(QueryCodesDesc, Empty.fromPartial(request), metadata);
  }

  codeHashByContractAddress(
    request: DeepPartial<QueryByContractAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodeHashResponse> {
    return this.rpc.unary(
      QueryCodeHashByContractAddressDesc,
      QueryByContractAddressRequest.fromPartial(request),
      metadata,
    );
  }

  codeHashByCodeID(
    request: DeepPartial<QueryByCodeIDRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCodeHashResponse> {
    return this.rpc.unary(
      QueryCodeHashByCodeIDDesc,
      QueryByCodeIDRequest.fromPartial(request),
      metadata,
    );
  }

  labelByAddress(
    request: DeepPartial<QueryByContractAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryContractLabelResponse> {
    return this.rpc.unary(
      QueryLabelByAddressDesc,
      QueryByContractAddressRequest.fromPartial(request),
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
      return QueryByContractAddressRequest.encode(this).finish();
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

export const QueryContractsByCodeIDDesc: UnaryMethodDefinitionish = {
  methodName: "ContractsByCodeID",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryByCodeIDRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryContractsByCodeIDResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryQuerySecretContractDesc: UnaryMethodDefinitionish = {
  methodName: "QuerySecretContract",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QuerySecretContractRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QuerySecretContractResponse.decode(data),
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
      return QueryByCodeIDRequest.encode(this).finish();
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

export const QueryCodeHashByContractAddressDesc: UnaryMethodDefinitionish = {
  methodName: "CodeHashByContractAddress",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryByContractAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryCodeHashResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryCodeHashByCodeIDDesc: UnaryMethodDefinitionish = {
  methodName: "CodeHashByCodeID",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryByCodeIDRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryCodeHashResponse.decode(data),
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
      return QueryByContractAddressRequest.encode(this).finish();
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
