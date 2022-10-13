/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { ContractInfo } from "../../../secret/compute/v1beta1/types";
import { StringEvent } from "../../../cosmos/base/abci/v1beta1/abci";
import { Empty } from "../../../google/protobuf/empty";

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
}

export interface DecryptedAnswers {
  answers: DecryptedAnswer[];
  outputLogs: StringEvent[];
  outputError: string;
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
  return { type: "", input: "", outputData: "", outputDataAsString: "" };
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
    };
  },

  toJSON(message: DecryptedAnswer): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.input !== undefined && (obj.input = message.input);
    message.outputData !== undefined && (obj.outputData = message.outputData);
    message.outputDataAsString !== undefined &&
      (obj.outputDataAsString = message.outputDataAsString);
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
    return message;
  },
};

function createBaseDecryptedAnswers(): DecryptedAnswers {
  return { answers: [], outputLogs: [], outputError: "", plaintextError: "" };
}

export const DecryptedAnswers = {
  encode(
    message: DecryptedAnswers,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.answers) {
      DecryptedAnswer.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.outputLogs) {
      StringEvent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.outputError !== "") {
      writer.uint32(26).string(message.outputError);
    }
    if (message.plaintextError !== "") {
      writer.uint32(34).string(message.plaintextError);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecryptedAnswers {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecryptedAnswers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.answers.push(DecryptedAnswer.decode(reader, reader.uint32()));
          break;
        case 2:
          message.outputLogs.push(StringEvent.decode(reader, reader.uint32()));
          break;
        case 3:
          message.outputError = reader.string();
          break;
        case 4:
          message.plaintextError = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DecryptedAnswers {
    return {
      answers: Array.isArray(object?.answers)
        ? object.answers.map((e: any) => DecryptedAnswer.fromJSON(e))
        : [],
      outputLogs: Array.isArray(object?.outputLogs)
        ? object.outputLogs.map((e: any) => StringEvent.fromJSON(e))
        : [],
      outputError: isSet(object.outputError) ? String(object.outputError) : "",
      plaintextError: isSet(object.plaintextError)
        ? String(object.plaintextError)
        : "",
    };
  },

  toJSON(message: DecryptedAnswers): unknown {
    const obj: any = {};
    if (message.answers) {
      obj.answers = message.answers.map((e) =>
        e ? DecryptedAnswer.toJSON(e) : undefined,
      );
    } else {
      obj.answers = [];
    }
    if (message.outputLogs) {
      obj.outputLogs = message.outputLogs.map((e) =>
        e ? StringEvent.toJSON(e) : undefined,
      );
    } else {
      obj.outputLogs = [];
    }
    message.outputError !== undefined &&
      (obj.outputError = message.outputError);
    message.plaintextError !== undefined &&
      (obj.plaintextError = message.plaintextError);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DecryptedAnswers>, I>>(
    object: I,
  ): DecryptedAnswers {
    const message = createBaseDecryptedAnswers();
    message.answers =
      object.answers?.map((e) => DecryptedAnswer.fromPartial(e)) || [];
    message.outputLogs =
      object.outputLogs?.map((e) => StringEvent.fromPartial(e)) || [];
    message.outputError = object.outputError ?? "";
    message.plaintextError = object.plaintextError ?? "";
    return message;
  },
};

/** Query defines the gRPC querier service */
export interface Query {
  /** Query contract info by address */
  contractInfo(
    request: QueryByContractAddressRequest,
  ): Promise<QueryContractInfoResponse>;
  /** Query code info by id */
  contractsByCodeID(
    request: QueryByCodeIDRequest,
  ): Promise<QueryContractsByCodeIDResponse>;
  /** Query secret contract */
  querySecretContract(
    request: QuerySecretContractRequest,
  ): Promise<QuerySecretContractResponse>;
  /** Query a specific contract code by id */
  code(request: QueryByCodeIDRequest): Promise<QueryCodeResponse>;
  /** Query all contract codes on-chain */
  codes(request: Empty): Promise<QueryCodesResponse>;
  /** Query code hash by contract address */
  codeHashByContractAddress(
    request: QueryByContractAddressRequest,
  ): Promise<QueryCodeHashResponse>;
  /** Query code hash by code id */
  codeHashByCodeID(
    request: QueryByCodeIDRequest,
  ): Promise<QueryCodeHashResponse>;
  /** Query contract label by address */
  labelByAddress(
    request: QueryByContractAddressRequest,
  ): Promise<QueryContractLabelResponse>;
  /** Query contract address by label */
  addressByLabel(
    request: QueryByLabelRequest,
  ): Promise<QueryContractAddressResponse>;
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
