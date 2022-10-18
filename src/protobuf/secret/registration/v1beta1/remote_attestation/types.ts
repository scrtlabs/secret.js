/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "secret.registration.remote_attestation.v1beta1";

export interface QuoteReport {
  id: string;
  timestamp: string;
  version: string;
  isv_enclave_quote_status: string;
  platform_info_blob: string;
  isv_enclave_quote_body: string;
  advisory_ids: string[];
}

export interface QuoteReportBody {
  mr_enclave: string;
  mr_signer: string;
  report_data: string;
}

export interface QuoteReportData {
  version: string;
  sign_type: string;
  report_body?: QuoteReportBody;
}

export interface EndorsedAttestationReport {
  report: Uint8Array;
  signature: Uint8Array;
  signing_cert: Uint8Array;
}

export interface SGXEC256Signature {
  gx: string;
  gy: string;
}

export interface PlatformInfoBlob {
  sgx_epid_group_flags: number;
  sgx_tcb_evaluation_flags: number;
  pse_evaluation_flags: number;
  latest_equivalent_tcb_psvn: string;
  latest_pse_isvsvn: string;
  latest_psda_svn: string;
  xeid: number;
  gid: number;
  sgx_ec256_signature_t?: SGXEC256Signature;
}

function createBaseQuoteReport(): QuoteReport {
  return {
    id: "",
    timestamp: "",
    version: "0",
    isv_enclave_quote_status: "",
    platform_info_blob: "",
    isv_enclave_quote_body: "",
    advisory_ids: [],
  };
}

export const QuoteReport = {
  encode(
    message: QuoteReport,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.timestamp !== "") {
      writer.uint32(18).string(message.timestamp);
    }
    if (message.version !== "0") {
      writer.uint32(24).uint64(message.version);
    }
    if (message.isv_enclave_quote_status !== "") {
      writer.uint32(34).string(message.isv_enclave_quote_status);
    }
    if (message.platform_info_blob !== "") {
      writer.uint32(42).string(message.platform_info_blob);
    }
    if (message.isv_enclave_quote_body !== "") {
      writer.uint32(50).string(message.isv_enclave_quote_body);
    }
    for (const v of message.advisory_ids) {
      writer.uint32(58).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuoteReport {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuoteReport();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.timestamp = reader.string();
          break;
        case 3:
          message.version = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.isv_enclave_quote_status = reader.string();
          break;
        case 5:
          message.platform_info_blob = reader.string();
          break;
        case 6:
          message.isv_enclave_quote_body = reader.string();
          break;
        case 7:
          message.advisory_ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuoteReport {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "",
      version: isSet(object.version) ? String(object.version) : "0",
      isv_enclave_quote_status: isSet(object.isv_enclave_quote_status)
        ? String(object.isv_enclave_quote_status)
        : "",
      platform_info_blob: isSet(object.platform_info_blob)
        ? String(object.platform_info_blob)
        : "",
      isv_enclave_quote_body: isSet(object.isv_enclave_quote_body)
        ? String(object.isv_enclave_quote_body)
        : "",
      advisory_ids: Array.isArray(object?.advisory_ids)
        ? object.advisory_ids.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: QuoteReport): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    message.version !== undefined && (obj.version = message.version);
    message.isv_enclave_quote_status !== undefined &&
      (obj.isv_enclave_quote_status = message.isv_enclave_quote_status);
    message.platform_info_blob !== undefined &&
      (obj.platform_info_blob = message.platform_info_blob);
    message.isv_enclave_quote_body !== undefined &&
      (obj.isv_enclave_quote_body = message.isv_enclave_quote_body);
    if (message.advisory_ids) {
      obj.advisory_ids = message.advisory_ids.map((e) => e);
    } else {
      obj.advisory_ids = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuoteReport>, I>>(
    object: I,
  ): QuoteReport {
    const message = createBaseQuoteReport();
    message.id = object.id ?? "";
    message.timestamp = object.timestamp ?? "";
    message.version = object.version ?? "0";
    message.isv_enclave_quote_status = object.isv_enclave_quote_status ?? "";
    message.platform_info_blob = object.platform_info_blob ?? "";
    message.isv_enclave_quote_body = object.isv_enclave_quote_body ?? "";
    message.advisory_ids = object.advisory_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseQuoteReportBody(): QuoteReportBody {
  return { mr_enclave: "", mr_signer: "", report_data: "" };
}

export const QuoteReportBody = {
  encode(
    message: QuoteReportBody,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.mr_enclave !== "") {
      writer.uint32(10).string(message.mr_enclave);
    }
    if (message.mr_signer !== "") {
      writer.uint32(18).string(message.mr_signer);
    }
    if (message.report_data !== "") {
      writer.uint32(26).string(message.report_data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuoteReportBody {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuoteReportBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mr_enclave = reader.string();
          break;
        case 2:
          message.mr_signer = reader.string();
          break;
        case 3:
          message.report_data = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuoteReportBody {
    return {
      mr_enclave: isSet(object.mr_enclave) ? String(object.mr_enclave) : "",
      mr_signer: isSet(object.mr_signer) ? String(object.mr_signer) : "",
      report_data: isSet(object.report_data) ? String(object.report_data) : "",
    };
  },

  toJSON(message: QuoteReportBody): unknown {
    const obj: any = {};
    message.mr_enclave !== undefined && (obj.mr_enclave = message.mr_enclave);
    message.mr_signer !== undefined && (obj.mr_signer = message.mr_signer);
    message.report_data !== undefined &&
      (obj.report_data = message.report_data);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuoteReportBody>, I>>(
    object: I,
  ): QuoteReportBody {
    const message = createBaseQuoteReportBody();
    message.mr_enclave = object.mr_enclave ?? "";
    message.mr_signer = object.mr_signer ?? "";
    message.report_data = object.report_data ?? "";
    return message;
  },
};

function createBaseQuoteReportData(): QuoteReportData {
  return { version: "0", sign_type: "0", report_body: undefined };
}

export const QuoteReportData = {
  encode(
    message: QuoteReportData,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.version !== "0") {
      writer.uint32(8).uint64(message.version);
    }
    if (message.sign_type !== "0") {
      writer.uint32(16).uint64(message.sign_type);
    }
    if (message.report_body !== undefined) {
      QuoteReportBody.encode(
        message.report_body,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuoteReportData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuoteReportData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.sign_type = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.report_body = QuoteReportBody.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuoteReportData {
    return {
      version: isSet(object.version) ? String(object.version) : "0",
      sign_type: isSet(object.sign_type) ? String(object.sign_type) : "0",
      report_body: isSet(object.report_body)
        ? QuoteReportBody.fromJSON(object.report_body)
        : undefined,
    };
  },

  toJSON(message: QuoteReportData): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.sign_type !== undefined && (obj.sign_type = message.sign_type);
    message.report_body !== undefined &&
      (obj.report_body = message.report_body
        ? QuoteReportBody.toJSON(message.report_body)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuoteReportData>, I>>(
    object: I,
  ): QuoteReportData {
    const message = createBaseQuoteReportData();
    message.version = object.version ?? "0";
    message.sign_type = object.sign_type ?? "0";
    message.report_body =
      object.report_body !== undefined && object.report_body !== null
        ? QuoteReportBody.fromPartial(object.report_body)
        : undefined;
    return message;
  },
};

function createBaseEndorsedAttestationReport(): EndorsedAttestationReport {
  return {
    report: new Uint8Array(),
    signature: new Uint8Array(),
    signing_cert: new Uint8Array(),
  };
}

export const EndorsedAttestationReport = {
  encode(
    message: EndorsedAttestationReport,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.report.length !== 0) {
      writer.uint32(10).bytes(message.report);
    }
    if (message.signature.length !== 0) {
      writer.uint32(18).bytes(message.signature);
    }
    if (message.signing_cert.length !== 0) {
      writer.uint32(26).bytes(message.signing_cert);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): EndorsedAttestationReport {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEndorsedAttestationReport();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.report = reader.bytes();
          break;
        case 2:
          message.signature = reader.bytes();
          break;
        case 3:
          message.signing_cert = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EndorsedAttestationReport {
    return {
      report: isSet(object.report)
        ? bytesFromBase64(object.report)
        : new Uint8Array(),
      signature: isSet(object.signature)
        ? bytesFromBase64(object.signature)
        : new Uint8Array(),
      signing_cert: isSet(object.signing_cert)
        ? bytesFromBase64(object.signing_cert)
        : new Uint8Array(),
    };
  },

  toJSON(message: EndorsedAttestationReport): unknown {
    const obj: any = {};
    message.report !== undefined &&
      (obj.report = base64FromBytes(
        message.report !== undefined ? message.report : new Uint8Array(),
      ));
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array(),
      ));
    message.signing_cert !== undefined &&
      (obj.signing_cert = base64FromBytes(
        message.signing_cert !== undefined
          ? message.signing_cert
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EndorsedAttestationReport>, I>>(
    object: I,
  ): EndorsedAttestationReport {
    const message = createBaseEndorsedAttestationReport();
    message.report = object.report ?? new Uint8Array();
    message.signature = object.signature ?? new Uint8Array();
    message.signing_cert = object.signing_cert ?? new Uint8Array();
    return message;
  },
};

function createBaseSGXEC256Signature(): SGXEC256Signature {
  return { gx: "", gy: "" };
}

export const SGXEC256Signature = {
  encode(
    message: SGXEC256Signature,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.gx !== "") {
      writer.uint32(10).string(message.gx);
    }
    if (message.gy !== "") {
      writer.uint32(18).string(message.gy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SGXEC256Signature {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSGXEC256Signature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gx = reader.string();
          break;
        case 2:
          message.gy = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SGXEC256Signature {
    return {
      gx: isSet(object.gx) ? String(object.gx) : "",
      gy: isSet(object.gy) ? String(object.gy) : "",
    };
  },

  toJSON(message: SGXEC256Signature): unknown {
    const obj: any = {};
    message.gx !== undefined && (obj.gx = message.gx);
    message.gy !== undefined && (obj.gy = message.gy);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SGXEC256Signature>, I>>(
    object: I,
  ): SGXEC256Signature {
    const message = createBaseSGXEC256Signature();
    message.gx = object.gx ?? "";
    message.gy = object.gy ?? "";
    return message;
  },
};

function createBasePlatformInfoBlob(): PlatformInfoBlob {
  return {
    sgx_epid_group_flags: 0,
    sgx_tcb_evaluation_flags: 0,
    pse_evaluation_flags: 0,
    latest_equivalent_tcb_psvn: "",
    latest_pse_isvsvn: "",
    latest_psda_svn: "",
    xeid: 0,
    gid: 0,
    sgx_ec256_signature_t: undefined,
  };
}

export const PlatformInfoBlob = {
  encode(
    message: PlatformInfoBlob,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sgx_epid_group_flags !== 0) {
      writer.uint32(8).uint32(message.sgx_epid_group_flags);
    }
    if (message.sgx_tcb_evaluation_flags !== 0) {
      writer.uint32(16).uint32(message.sgx_tcb_evaluation_flags);
    }
    if (message.pse_evaluation_flags !== 0) {
      writer.uint32(24).uint32(message.pse_evaluation_flags);
    }
    if (message.latest_equivalent_tcb_psvn !== "") {
      writer.uint32(34).string(message.latest_equivalent_tcb_psvn);
    }
    if (message.latest_pse_isvsvn !== "") {
      writer.uint32(42).string(message.latest_pse_isvsvn);
    }
    if (message.latest_psda_svn !== "") {
      writer.uint32(50).string(message.latest_psda_svn);
    }
    if (message.xeid !== 0) {
      writer.uint32(56).uint32(message.xeid);
    }
    if (message.gid !== 0) {
      writer.uint32(64).uint32(message.gid);
    }
    if (message.sgx_ec256_signature_t !== undefined) {
      SGXEC256Signature.encode(
        message.sgx_ec256_signature_t,
        writer.uint32(74).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlatformInfoBlob {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlatformInfoBlob();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sgx_epid_group_flags = reader.uint32();
          break;
        case 2:
          message.sgx_tcb_evaluation_flags = reader.uint32();
          break;
        case 3:
          message.pse_evaluation_flags = reader.uint32();
          break;
        case 4:
          message.latest_equivalent_tcb_psvn = reader.string();
          break;
        case 5:
          message.latest_pse_isvsvn = reader.string();
          break;
        case 6:
          message.latest_psda_svn = reader.string();
          break;
        case 7:
          message.xeid = reader.uint32();
          break;
        case 8:
          message.gid = reader.uint32();
          break;
        case 9:
          message.sgx_ec256_signature_t = SGXEC256Signature.decode(
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

  fromJSON(object: any): PlatformInfoBlob {
    return {
      sgx_epid_group_flags: isSet(object.sgx_epid_group_flags)
        ? Number(object.sgx_epid_group_flags)
        : 0,
      sgx_tcb_evaluation_flags: isSet(object.sgx_tcb_evaluation_flags)
        ? Number(object.sgx_tcb_evaluation_flags)
        : 0,
      pse_evaluation_flags: isSet(object.pse_evaluation_flags)
        ? Number(object.pse_evaluation_flags)
        : 0,
      latest_equivalent_tcb_psvn: isSet(object.latest_equivalent_tcb_psvn)
        ? String(object.latest_equivalent_tcb_psvn)
        : "",
      latest_pse_isvsvn: isSet(object.latest_pse_isvsvn)
        ? String(object.latest_pse_isvsvn)
        : "",
      latest_psda_svn: isSet(object.latest_psda_svn)
        ? String(object.latest_psda_svn)
        : "",
      xeid: isSet(object.xeid) ? Number(object.xeid) : 0,
      gid: isSet(object.gid) ? Number(object.gid) : 0,
      sgx_ec256_signature_t: isSet(object.sgx_ec256_signature_t)
        ? SGXEC256Signature.fromJSON(object.sgx_ec256_signature_t)
        : undefined,
    };
  },

  toJSON(message: PlatformInfoBlob): unknown {
    const obj: any = {};
    message.sgx_epid_group_flags !== undefined &&
      (obj.sgx_epid_group_flags = Math.round(message.sgx_epid_group_flags));
    message.sgx_tcb_evaluation_flags !== undefined &&
      (obj.sgx_tcb_evaluation_flags = Math.round(
        message.sgx_tcb_evaluation_flags,
      ));
    message.pse_evaluation_flags !== undefined &&
      (obj.pse_evaluation_flags = Math.round(message.pse_evaluation_flags));
    message.latest_equivalent_tcb_psvn !== undefined &&
      (obj.latest_equivalent_tcb_psvn = message.latest_equivalent_tcb_psvn);
    message.latest_pse_isvsvn !== undefined &&
      (obj.latest_pse_isvsvn = message.latest_pse_isvsvn);
    message.latest_psda_svn !== undefined &&
      (obj.latest_psda_svn = message.latest_psda_svn);
    message.xeid !== undefined && (obj.xeid = Math.round(message.xeid));
    message.gid !== undefined && (obj.gid = Math.round(message.gid));
    message.sgx_ec256_signature_t !== undefined &&
      (obj.sgx_ec256_signature_t = message.sgx_ec256_signature_t
        ? SGXEC256Signature.toJSON(message.sgx_ec256_signature_t)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlatformInfoBlob>, I>>(
    object: I,
  ): PlatformInfoBlob {
    const message = createBasePlatformInfoBlob();
    message.sgx_epid_group_flags = object.sgx_epid_group_flags ?? 0;
    message.sgx_tcb_evaluation_flags = object.sgx_tcb_evaluation_flags ?? 0;
    message.pse_evaluation_flags = object.pse_evaluation_flags ?? 0;
    message.latest_equivalent_tcb_psvn =
      object.latest_equivalent_tcb_psvn ?? "";
    message.latest_pse_isvsvn = object.latest_pse_isvsvn ?? "";
    message.latest_psda_svn = object.latest_psda_svn ?? "";
    message.xeid = object.xeid ?? 0;
    message.gid = object.gid ?? 0;
    message.sgx_ec256_signature_t =
      object.sgx_ec256_signature_t !== undefined &&
      object.sgx_ec256_signature_t !== null
        ? SGXEC256Signature.fromPartial(object.sgx_ec256_signature_t)
        : undefined;
    return message;
  },
};

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
