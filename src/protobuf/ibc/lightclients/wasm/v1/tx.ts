/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "ibc.lightclients.wasm.v1";

/** MsgStoreCode defines the request type for the StoreCode rpc. */
export interface MsgStoreCode {
  /** signer address */
  signer: string;
  /** wasm byte code of light client contract. It can be raw or gzip compressed */
  wasm_byte_code: Uint8Array;
}

/** MsgStoreCodeResponse defines the response type for the StoreCode rpc */
export interface MsgStoreCodeResponse {
  /** checksum is the sha256 hash of the stored code */
  checksum: Uint8Array;
}

/** MsgRemoveChecksum defines the request type for the MsgRemoveChecksum rpc. */
export interface MsgRemoveChecksum {
  /** signer address */
  signer: string;
  /** checksum is the sha256 hash to be removed from the store */
  checksum: Uint8Array;
}

/** MsgStoreChecksumResponse defines the response type for the StoreCode rpc */
export interface MsgRemoveChecksumResponse {}

/** MsgMigrateContract defines the request type for the MigrateContract rpc. */
export interface MsgMigrateContract {
  /** signer address */
  signer: string;
  /** the client id of the contract */
  client_id: string;
  /** checksum is the sha256 hash of the new wasm byte code for the contract */
  checksum: Uint8Array;
  /** the json encoded message to be passed to the contract on migration */
  msg: Uint8Array;
}

/** MsgMigrateContractResponse defines the response type for the MigrateContract rpc */
export interface MsgMigrateContractResponse {}

function createBaseMsgStoreCode(): MsgStoreCode {
  return { signer: "", wasm_byte_code: new Uint8Array() };
}

export const MsgStoreCode = {
  encode(
    message: MsgStoreCode,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.wasm_byte_code.length !== 0) {
      writer.uint32(18).bytes(message.wasm_byte_code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreCode {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreCode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string();
          break;
        case 2:
          message.wasm_byte_code = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStoreCode {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      wasm_byte_code: isSet(object.wasm_byte_code)
        ? bytesFromBase64(object.wasm_byte_code)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgStoreCode): unknown {
    const obj: any = {};
    message.signer !== undefined && (obj.signer = message.signer);
    message.wasm_byte_code !== undefined &&
      (obj.wasm_byte_code = base64FromBytes(
        message.wasm_byte_code !== undefined
          ? message.wasm_byte_code
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgStoreCode>): MsgStoreCode {
    const message = createBaseMsgStoreCode();
    message.signer = object.signer ?? "";
    message.wasm_byte_code = object.wasm_byte_code ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgStoreCodeResponse(): MsgStoreCodeResponse {
  return { checksum: new Uint8Array() };
}

export const MsgStoreCodeResponse = {
  encode(
    message: MsgStoreCodeResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.checksum.length !== 0) {
      writer.uint32(10).bytes(message.checksum);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgStoreCodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.checksum = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStoreCodeResponse {
    return {
      checksum: isSet(object.checksum)
        ? bytesFromBase64(object.checksum)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgStoreCodeResponse): unknown {
    const obj: any = {};
    message.checksum !== undefined &&
      (obj.checksum = base64FromBytes(
        message.checksum !== undefined ? message.checksum : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgStoreCodeResponse>): MsgStoreCodeResponse {
    const message = createBaseMsgStoreCodeResponse();
    message.checksum = object.checksum ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgRemoveChecksum(): MsgRemoveChecksum {
  return { signer: "", checksum: new Uint8Array() };
}

export const MsgRemoveChecksum = {
  encode(
    message: MsgRemoveChecksum,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.checksum.length !== 0) {
      writer.uint32(18).bytes(message.checksum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveChecksum {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveChecksum();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string();
          break;
        case 2:
          message.checksum = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveChecksum {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      checksum: isSet(object.checksum)
        ? bytesFromBase64(object.checksum)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgRemoveChecksum): unknown {
    const obj: any = {};
    message.signer !== undefined && (obj.signer = message.signer);
    message.checksum !== undefined &&
      (obj.checksum = base64FromBytes(
        message.checksum !== undefined ? message.checksum : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRemoveChecksum>): MsgRemoveChecksum {
    const message = createBaseMsgRemoveChecksum();
    message.signer = object.signer ?? "";
    message.checksum = object.checksum ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgRemoveChecksumResponse(): MsgRemoveChecksumResponse {
  return {};
}

export const MsgRemoveChecksumResponse = {
  encode(
    _: MsgRemoveChecksumResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgRemoveChecksumResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveChecksumResponse();
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

  fromJSON(_: any): MsgRemoveChecksumResponse {
    return {};
  },

  toJSON(_: MsgRemoveChecksumResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRemoveChecksumResponse>,
  ): MsgRemoveChecksumResponse {
    const message = createBaseMsgRemoveChecksumResponse();
    return message;
  },
};

function createBaseMsgMigrateContract(): MsgMigrateContract {
  return {
    signer: "",
    client_id: "",
    checksum: new Uint8Array(),
    msg: new Uint8Array(),
  };
}

export const MsgMigrateContract = {
  encode(
    message: MsgMigrateContract,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.client_id !== "") {
      writer.uint32(18).string(message.client_id);
    }
    if (message.checksum.length !== 0) {
      writer.uint32(26).bytes(message.checksum);
    }
    if (message.msg.length !== 0) {
      writer.uint32(34).bytes(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMigrateContract {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMigrateContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string();
          break;
        case 2:
          message.client_id = reader.string();
          break;
        case 3:
          message.checksum = reader.bytes();
          break;
        case 4:
          message.msg = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMigrateContract {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      client_id: isSet(object.client_id) ? String(object.client_id) : "",
      checksum: isSet(object.checksum)
        ? bytesFromBase64(object.checksum)
        : new Uint8Array(),
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
    };
  },

  toJSON(message: MsgMigrateContract): unknown {
    const obj: any = {};
    message.signer !== undefined && (obj.signer = message.signer);
    message.client_id !== undefined && (obj.client_id = message.client_id);
    message.checksum !== undefined &&
      (obj.checksum = base64FromBytes(
        message.checksum !== undefined ? message.checksum : new Uint8Array(),
      ));
    message.msg !== undefined &&
      (obj.msg = base64FromBytes(
        message.msg !== undefined ? message.msg : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgMigrateContract>): MsgMigrateContract {
    const message = createBaseMsgMigrateContract();
    message.signer = object.signer ?? "";
    message.client_id = object.client_id ?? "";
    message.checksum = object.checksum ?? new Uint8Array();
    message.msg = object.msg ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgMigrateContractResponse(): MsgMigrateContractResponse {
  return {};
}

export const MsgMigrateContractResponse = {
  encode(
    _: MsgMigrateContractResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgMigrateContractResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMigrateContractResponse();
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

  fromJSON(_: any): MsgMigrateContractResponse {
    return {};
  },

  toJSON(_: MsgMigrateContractResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgMigrateContractResponse>,
  ): MsgMigrateContractResponse {
    const message = createBaseMsgMigrateContractResponse();
    return message;
  },
};

/** Msg defines the ibc/08-wasm Msg service. */
export interface Msg {
  /** StoreCode defines a rpc handler method for MsgStoreCode. */
  StoreCode(request: MsgStoreCode): Promise<MsgStoreCodeResponse>;
  /** RemoveChecksum defines a rpc handler method for MsgRemoveChecksum. */
  RemoveChecksum(
    request: MsgRemoveChecksum,
  ): Promise<MsgRemoveChecksumResponse>;
  /** MigrateContract defines a rpc handler method for MsgMigrateContract. */
  MigrateContract(
    request: MsgMigrateContract,
  ): Promise<MsgMigrateContractResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.StoreCode = this.StoreCode.bind(this);
    this.RemoveChecksum = this.RemoveChecksum.bind(this);
    this.MigrateContract = this.MigrateContract.bind(this);
  }
  StoreCode(request: MsgStoreCode): Promise<MsgStoreCodeResponse> {
    const data = MsgStoreCode.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.lightclients.wasm.v1.Msg",
      "StoreCode",
      data,
    );
    return promise.then((data) =>
      MsgStoreCodeResponse.decode(new _m0.Reader(data)),
    );
  }

  RemoveChecksum(
    request: MsgRemoveChecksum,
  ): Promise<MsgRemoveChecksumResponse> {
    const data = MsgRemoveChecksum.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.lightclients.wasm.v1.Msg",
      "RemoveChecksum",
      data,
    );
    return promise.then((data) =>
      MsgRemoveChecksumResponse.decode(new _m0.Reader(data)),
    );
  }

  MigrateContract(
    request: MsgMigrateContract,
  ): Promise<MsgMigrateContractResponse> {
    const data = MsgMigrateContract.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.lightclients.wasm.v1.Msg",
      "MigrateContract",
      data,
    );
    return promise.then((data) =>
      MsgMigrateContractResponse.decode(new _m0.Reader(data)),
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
