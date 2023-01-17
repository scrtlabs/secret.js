/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { ContractInfo } from "./types";
import { StringEvent } from "../../../cosmos/base/abci/v1beta1/abci";
import { Empty } from "../../../google/protobuf/empty";

export const protobufPackage = "secret.compute.v1beta1";

export interface QuerySecretContractRequest {
  /** address is the bech32 human readable address of the contract */
  contract_address: string;
  query: Uint8Array;
}

export interface QueryByLabelRequest {
  label: string;
}

export interface QueryByContractAddressRequest {
  /** address is the bech32 human readable address of the contract */
  contract_address: string;
}

export interface QueryByCodeIdRequest {
  code_id: string;
}

export interface QuerySecretContractResponse {
  data: Uint8Array;
}

/** QueryContractInfoResponse is the response type for the Query/ContractInfo RPC method */
export interface QueryContractInfoResponse {
  /** contract_address is the bech32 human readable address of the contract */
  contract_address: string;
  ContractInfo?: ContractInfo;
}

/** ContractInfoWithAddress adds the contract address to the ContractInfo representation */
export interface ContractInfoWithAddress {
  /** contract_address is the bech32 human readable address of the contract */
  contract_address: string;
  ContractInfo?: ContractInfo;
}

export interface QueryContractsByCodeIdResponse {
  contract_infos: ContractInfoWithAddress[];
}

export interface CodeInfoResponse {
  code_id: string;
  /** creator is the bech32 human readable address of the contract */
  creator: string;
  code_hash: string;
  source: string;
  builder: string;
}

export interface QueryCodeResponse {
  code_info?: CodeInfoResponse;
  wasm: Uint8Array;
}

export interface QueryCodesResponse {
  code_infos: CodeInfoResponse[];
}

export interface QueryContractAddressResponse {
  /** address is the bech32 human readable address of the contract */
  contract_address: string;
}

export interface QueryContractLabelResponse {
  label: string;
}

export interface QueryCodeHashResponse {
  code_hash: string;
}

/** DecryptedAnswer is a struct that represents a decrypted tx-query */
export interface DecryptedAnswer {
  type: string;
  input: string;
  output_data: string;
  output_data_as_string: string;
}

export interface DecryptedAnswers {
  answers: DecryptedAnswer[];
  output_logs: StringEvent[];
  output_error: string;
  plaintext_error: string;
}

function createBaseQuerySecretContractRequest(): QuerySecretContractRequest {
  return { contract_address: "", query: new Uint8Array() };
}

export const QuerySecretContractRequest = {
  encode(
    message: QuerySecretContractRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contract_address !== "") {
      writer.uint32(10).string(message.contract_address);
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
          message.contract_address = reader.string();
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
      contract_address: isSet(object.contract_address)
        ? String(object.contract_address)
        : "",
      query: isSet(object.query)
        ? bytesFromBase64(object.query)
        : new Uint8Array(),
    };
  },

  toJSON(message: QuerySecretContractRequest): unknown {
    const obj: any = {};
    message.contract_address !== undefined &&
      (obj.contract_address = message.contract_address);
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
    message.contract_address = object.contract_address ?? "";
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
  return { contract_address: "" };
}

export const QueryByContractAddressRequest = {
  encode(
    message: QueryByContractAddressRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contract_address !== "") {
      writer.uint32(10).string(message.contract_address);
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
          message.contract_address = reader.string();
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
      contract_address: isSet(object.contract_address)
        ? String(object.contract_address)
        : "",
    };
  },

  toJSON(message: QueryByContractAddressRequest): unknown {
    const obj: any = {};
    message.contract_address !== undefined &&
      (obj.contract_address = message.contract_address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryByContractAddressRequest>, I>>(
    object: I,
  ): QueryByContractAddressRequest {
    const message = createBaseQueryByContractAddressRequest();
    message.contract_address = object.contract_address ?? "";
    return message;
  },
};

function createBaseQueryByCodeIdRequest(): QueryByCodeIdRequest {
  return { code_id: "0" };
}

export const QueryByCodeIdRequest = {
  encode(
    message: QueryByCodeIdRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.code_id !== "0") {
      writer.uint32(8).uint64(message.code_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryByCodeIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryByCodeIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code_id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryByCodeIdRequest {
    return {
      code_id: isSet(object.code_id) ? String(object.code_id) : "0",
    };
  },

  toJSON(message: QueryByCodeIdRequest): unknown {
    const obj: any = {};
    message.code_id !== undefined && (obj.code_id = message.code_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryByCodeIdRequest>, I>>(
    object: I,
  ): QueryByCodeIdRequest {
    const message = createBaseQueryByCodeIdRequest();
    message.code_id = object.code_id ?? "0";
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
  return { contract_address: "", ContractInfo: undefined };
}

export const QueryContractInfoResponse = {
  encode(
    message: QueryContractInfoResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contract_address !== "") {
      writer.uint32(10).string(message.contract_address);
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
          message.contract_address = reader.string();
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
      contract_address: isSet(object.contract_address)
        ? String(object.contract_address)
        : "",
      ContractInfo: isSet(object.ContractInfo)
        ? ContractInfo.fromJSON(object.ContractInfo)
        : undefined,
    };
  },

  toJSON(message: QueryContractInfoResponse): unknown {
    const obj: any = {};
    message.contract_address !== undefined &&
      (obj.contract_address = message.contract_address);
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
    message.contract_address = object.contract_address ?? "";
    message.ContractInfo =
      object.ContractInfo !== undefined && object.ContractInfo !== null
        ? ContractInfo.fromPartial(object.ContractInfo)
        : undefined;
    return message;
  },
};

function createBaseContractInfoWithAddress(): ContractInfoWithAddress {
  return { contract_address: "", ContractInfo: undefined };
}

export const ContractInfoWithAddress = {
  encode(
    message: ContractInfoWithAddress,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contract_address !== "") {
      writer.uint32(10).string(message.contract_address);
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
          message.contract_address = reader.string();
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
      contract_address: isSet(object.contract_address)
        ? String(object.contract_address)
        : "",
      ContractInfo: isSet(object.ContractInfo)
        ? ContractInfo.fromJSON(object.ContractInfo)
        : undefined,
    };
  },

  toJSON(message: ContractInfoWithAddress): unknown {
    const obj: any = {};
    message.contract_address !== undefined &&
      (obj.contract_address = message.contract_address);
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
    message.contract_address = object.contract_address ?? "";
    message.ContractInfo =
      object.ContractInfo !== undefined && object.ContractInfo !== null
        ? ContractInfo.fromPartial(object.ContractInfo)
        : undefined;
    return message;
  },
};

function createBaseQueryContractsByCodeIdResponse(): QueryContractsByCodeIdResponse {
  return { contract_infos: [] };
}

export const QueryContractsByCodeIdResponse = {
  encode(
    message: QueryContractsByCodeIdResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.contract_infos) {
      ContractInfoWithAddress.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryContractsByCodeIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractsByCodeIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contract_infos.push(
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

  fromJSON(object: any): QueryContractsByCodeIdResponse {
    return {
      contract_infos: Array.isArray(object?.contract_infos)
        ? object.contract_infos.map((e: any) =>
            ContractInfoWithAddress.fromJSON(e),
          )
        : [],
    };
  },

  toJSON(message: QueryContractsByCodeIdResponse): unknown {
    const obj: any = {};
    if (message.contract_infos) {
      obj.contract_infos = message.contract_infos.map((e) =>
        e ? ContractInfoWithAddress.toJSON(e) : undefined,
      );
    } else {
      obj.contract_infos = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryContractsByCodeIdResponse>, I>>(
    object: I,
  ): QueryContractsByCodeIdResponse {
    const message = createBaseQueryContractsByCodeIdResponse();
    message.contract_infos =
      object.contract_infos?.map((e) =>
        ContractInfoWithAddress.fromPartial(e),
      ) || [];
    return message;
  },
};

function createBaseCodeInfoResponse(): CodeInfoResponse {
  return { code_id: "0", creator: "", code_hash: "", source: "", builder: "" };
}

export const CodeInfoResponse = {
  encode(
    message: CodeInfoResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.code_id !== "0") {
      writer.uint32(8).uint64(message.code_id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.code_hash !== "") {
      writer.uint32(26).string(message.code_hash);
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
          message.code_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.code_hash = reader.string();
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
      code_id: isSet(object.code_id) ? String(object.code_id) : "0",
      creator: isSet(object.creator) ? String(object.creator) : "",
      code_hash: isSet(object.code_hash) ? String(object.code_hash) : "",
      source: isSet(object.source) ? String(object.source) : "",
      builder: isSet(object.builder) ? String(object.builder) : "",
    };
  },

  toJSON(message: CodeInfoResponse): unknown {
    const obj: any = {};
    message.code_id !== undefined && (obj.code_id = message.code_id);
    message.creator !== undefined && (obj.creator = message.creator);
    message.code_hash !== undefined && (obj.code_hash = message.code_hash);
    message.source !== undefined && (obj.source = message.source);
    message.builder !== undefined && (obj.builder = message.builder);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CodeInfoResponse>, I>>(
    object: I,
  ): CodeInfoResponse {
    const message = createBaseCodeInfoResponse();
    message.code_id = object.code_id ?? "0";
    message.creator = object.creator ?? "";
    message.code_hash = object.code_hash ?? "";
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    return message;
  },
};

function createBaseQueryCodeResponse(): QueryCodeResponse {
  return { code_info: undefined, wasm: new Uint8Array() };
}

export const QueryCodeResponse = {
  encode(
    message: QueryCodeResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.code_info !== undefined) {
      CodeInfoResponse.encode(
        message.code_info,
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
          message.code_info = CodeInfoResponse.decode(reader, reader.uint32());
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
      code_info: isSet(object.code_info)
        ? CodeInfoResponse.fromJSON(object.code_info)
        : undefined,
      wasm: isSet(object.wasm)
        ? bytesFromBase64(object.wasm)
        : new Uint8Array(),
    };
  },

  toJSON(message: QueryCodeResponse): unknown {
    const obj: any = {};
    message.code_info !== undefined &&
      (obj.code_info = message.code_info
        ? CodeInfoResponse.toJSON(message.code_info)
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
    message.code_info =
      object.code_info !== undefined && object.code_info !== null
        ? CodeInfoResponse.fromPartial(object.code_info)
        : undefined;
    message.wasm = object.wasm ?? new Uint8Array();
    return message;
  },
};

function createBaseQueryCodesResponse(): QueryCodesResponse {
  return { code_infos: [] };
}

export const QueryCodesResponse = {
  encode(
    message: QueryCodesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.code_infos) {
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
          message.code_infos.push(
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
      code_infos: Array.isArray(object?.code_infos)
        ? object.code_infos.map((e: any) => CodeInfoResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryCodesResponse): unknown {
    const obj: any = {};
    if (message.code_infos) {
      obj.code_infos = message.code_infos.map((e) =>
        e ? CodeInfoResponse.toJSON(e) : undefined,
      );
    } else {
      obj.code_infos = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCodesResponse>, I>>(
    object: I,
  ): QueryCodesResponse {
    const message = createBaseQueryCodesResponse();
    message.code_infos =
      object.code_infos?.map((e) => CodeInfoResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryContractAddressResponse(): QueryContractAddressResponse {
  return { contract_address: "" };
}

export const QueryContractAddressResponse = {
  encode(
    message: QueryContractAddressResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contract_address !== "") {
      writer.uint32(10).string(message.contract_address);
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
          message.contract_address = reader.string();
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
      contract_address: isSet(object.contract_address)
        ? String(object.contract_address)
        : "",
    };
  },

  toJSON(message: QueryContractAddressResponse): unknown {
    const obj: any = {};
    message.contract_address !== undefined &&
      (obj.contract_address = message.contract_address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryContractAddressResponse>, I>>(
    object: I,
  ): QueryContractAddressResponse {
    const message = createBaseQueryContractAddressResponse();
    message.contract_address = object.contract_address ?? "";
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
  return { code_hash: "" };
}

export const QueryCodeHashResponse = {
  encode(
    message: QueryCodeHashResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.code_hash !== "") {
      writer.uint32(10).string(message.code_hash);
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
          message.code_hash = reader.string();
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
      code_hash: isSet(object.code_hash) ? String(object.code_hash) : "",
    };
  },

  toJSON(message: QueryCodeHashResponse): unknown {
    const obj: any = {};
    message.code_hash !== undefined && (obj.code_hash = message.code_hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCodeHashResponse>, I>>(
    object: I,
  ): QueryCodeHashResponse {
    const message = createBaseQueryCodeHashResponse();
    message.code_hash = object.code_hash ?? "";
    return message;
  },
};

function createBaseDecryptedAnswer(): DecryptedAnswer {
  return { type: "", input: "", output_data: "", output_data_as_string: "" };
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
    if (message.output_data !== "") {
      writer.uint32(26).string(message.output_data);
    }
    if (message.output_data_as_string !== "") {
      writer.uint32(34).string(message.output_data_as_string);
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
          message.output_data = reader.string();
          break;
        case 4:
          message.output_data_as_string = reader.string();
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
      output_data: isSet(object.output_data) ? String(object.output_data) : "",
      output_data_as_string: isSet(object.output_data_as_string)
        ? String(object.output_data_as_string)
        : "",
    };
  },

  toJSON(message: DecryptedAnswer): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.input !== undefined && (obj.input = message.input);
    message.output_data !== undefined &&
      (obj.output_data = message.output_data);
    message.output_data_as_string !== undefined &&
      (obj.output_data_as_string = message.output_data_as_string);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DecryptedAnswer>, I>>(
    object: I,
  ): DecryptedAnswer {
    const message = createBaseDecryptedAnswer();
    message.type = object.type ?? "";
    message.input = object.input ?? "";
    message.output_data = object.output_data ?? "";
    message.output_data_as_string = object.output_data_as_string ?? "";
    return message;
  },
};

function createBaseDecryptedAnswers(): DecryptedAnswers {
  return {
    answers: [],
    output_logs: [],
    output_error: "",
    plaintext_error: "",
  };
}

export const DecryptedAnswers = {
  encode(
    message: DecryptedAnswers,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.answers) {
      DecryptedAnswer.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.output_logs) {
      StringEvent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.output_error !== "") {
      writer.uint32(26).string(message.output_error);
    }
    if (message.plaintext_error !== "") {
      writer.uint32(34).string(message.plaintext_error);
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
          message.output_logs.push(StringEvent.decode(reader, reader.uint32()));
          break;
        case 3:
          message.output_error = reader.string();
          break;
        case 4:
          message.plaintext_error = reader.string();
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
      output_logs: Array.isArray(object?.output_logs)
        ? object.output_logs.map((e: any) => StringEvent.fromJSON(e))
        : [],
      output_error: isSet(object.output_error)
        ? String(object.output_error)
        : "",
      plaintext_error: isSet(object.plaintext_error)
        ? String(object.plaintext_error)
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
    if (message.output_logs) {
      obj.output_logs = message.output_logs.map((e) =>
        e ? StringEvent.toJSON(e) : undefined,
      );
    } else {
      obj.output_logs = [];
    }
    message.output_error !== undefined &&
      (obj.output_error = message.output_error);
    message.plaintext_error !== undefined &&
      (obj.plaintext_error = message.plaintext_error);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DecryptedAnswers>, I>>(
    object: I,
  ): DecryptedAnswers {
    const message = createBaseDecryptedAnswers();
    message.answers =
      object.answers?.map((e) => DecryptedAnswer.fromPartial(e)) || [];
    message.output_logs =
      object.output_logs?.map((e) => StringEvent.fromPartial(e)) || [];
    message.output_error = object.output_error ?? "";
    message.plaintext_error = object.plaintext_error ?? "";
    return message;
  },
};

/** Query defines the gRPC querier service */
export interface Query {
  /** Query contract info by address */
  ContractInfo(
    request: QueryByContractAddressRequest,
  ): Promise<QueryContractInfoResponse>;
  /** Query code info by id */
  ContractsByCodeId(
    request: QueryByCodeIdRequest,
  ): Promise<QueryContractsByCodeIdResponse>;
  /** Query secret contract */
  QuerySecretContract(
    request: QuerySecretContractRequest,
  ): Promise<QuerySecretContractResponse>;
  /** Query a specific contract code by id */
  Code(request: QueryByCodeIdRequest): Promise<QueryCodeResponse>;
  /** Query all contract codes on-chain */
  Codes(request: Empty): Promise<QueryCodesResponse>;
  /** Query code hash by contract address */
  CodeHashByContractAddress(
    request: QueryByContractAddressRequest,
  ): Promise<QueryCodeHashResponse>;
  /** Query code hash by code id */
  CodeHashByCodeId(
    request: QueryByCodeIdRequest,
  ): Promise<QueryCodeHashResponse>;
  /** Query contract label by address */
  LabelByAddress(
    request: QueryByContractAddressRequest,
  ): Promise<QueryContractLabelResponse>;
  /** Query contract address by label */
  AddressByLabel(
    request: QueryByLabelRequest,
  ): Promise<QueryContractAddressResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ContractInfo = this.ContractInfo.bind(this);
    this.ContractsByCodeId = this.ContractsByCodeId.bind(this);
    this.QuerySecretContract = this.QuerySecretContract.bind(this);
    this.Code = this.Code.bind(this);
    this.Codes = this.Codes.bind(this);
    this.CodeHashByContractAddress = this.CodeHashByContractAddress.bind(this);
    this.CodeHashByCodeId = this.CodeHashByCodeId.bind(this);
    this.LabelByAddress = this.LabelByAddress.bind(this);
    this.AddressByLabel = this.AddressByLabel.bind(this);
  }
  ContractInfo(
    request: QueryByContractAddressRequest,
  ): Promise<QueryContractInfoResponse> {
    const data = QueryByContractAddressRequest.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Query",
      "ContractInfo",
      data,
    );
    return promise.then((data) =>
      QueryContractInfoResponse.decode(new _m0.Reader(data)),
    );
  }

  ContractsByCodeId(
    request: QueryByCodeIdRequest,
  ): Promise<QueryContractsByCodeIdResponse> {
    const data = QueryByCodeIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Query",
      "ContractsByCodeId",
      data,
    );
    return promise.then((data) =>
      QueryContractsByCodeIdResponse.decode(new _m0.Reader(data)),
    );
  }

  QuerySecretContract(
    request: QuerySecretContractRequest,
  ): Promise<QuerySecretContractResponse> {
    const data = QuerySecretContractRequest.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Query",
      "QuerySecretContract",
      data,
    );
    return promise.then((data) =>
      QuerySecretContractResponse.decode(new _m0.Reader(data)),
    );
  }

  Code(request: QueryByCodeIdRequest): Promise<QueryCodeResponse> {
    const data = QueryByCodeIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Query",
      "Code",
      data,
    );
    return promise.then((data) =>
      QueryCodeResponse.decode(new _m0.Reader(data)),
    );
  }

  Codes(request: Empty): Promise<QueryCodesResponse> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Query",
      "Codes",
      data,
    );
    return promise.then((data) =>
      QueryCodesResponse.decode(new _m0.Reader(data)),
    );
  }

  CodeHashByContractAddress(
    request: QueryByContractAddressRequest,
  ): Promise<QueryCodeHashResponse> {
    const data = QueryByContractAddressRequest.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Query",
      "CodeHashByContractAddress",
      data,
    );
    return promise.then((data) =>
      QueryCodeHashResponse.decode(new _m0.Reader(data)),
    );
  }

  CodeHashByCodeId(
    request: QueryByCodeIdRequest,
  ): Promise<QueryCodeHashResponse> {
    const data = QueryByCodeIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Query",
      "CodeHashByCodeId",
      data,
    );
    return promise.then((data) =>
      QueryCodeHashResponse.decode(new _m0.Reader(data)),
    );
  }

  LabelByAddress(
    request: QueryByContractAddressRequest,
  ): Promise<QueryContractLabelResponse> {
    const data = QueryByContractAddressRequest.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Query",
      "LabelByAddress",
      data,
    );
    return promise.then((data) =>
      QueryContractLabelResponse.decode(new _m0.Reader(data)),
    );
  }

  AddressByLabel(
    request: QueryByLabelRequest,
  ): Promise<QueryContractAddressResponse> {
    const data = QueryByLabelRequest.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Query",
      "AddressByLabel",
      data,
    );
    return promise.then((data) =>
      QueryContractAddressResponse.decode(new _m0.Reader(data)),
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
