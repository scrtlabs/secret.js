/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "secret.compute.v1beta1";

export interface MsgStoreCode {
  /** sender is the canonical address of the sender */
  sender: Uint8Array;
  /** WASMByteCode can be raw or gzip compressed */
  wasm_byte_code: Uint8Array;
  /** Source is a valid absolute HTTPS URI to the contract's source code, optional */
  source: string;
  /** Builder is a valid docker image name with tag, optional */
  builder: string;
}

/** MsgStoreCodeResponse returns store result data. */
export interface MsgStoreCodeResponse {
  /** CodeID is the reference to the stored WASM code */
  code_id: string;
}

export interface MsgInstantiateContract {
  /** sender is the canonical address of the sender */
  sender: Uint8Array;
  callback_code_hash: string;
  code_id: string;
  label: string;
  /** init_msg is an encrypted input to pass to the contract on init */
  init_msg: Uint8Array;
  init_funds: Coin[];
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_sig: Uint8Array;
  /** Admin is an optional address that can execute migrations */
  admin: string;
}

/** MsgInstantiateContractResponse return instantiation result data */
export interface MsgInstantiateContractResponse {
  /** Address is the bech32 address of the new contract instance. */
  address: string;
  /** Data contains base64-encoded bytes to returned from the contract */
  data: Uint8Array;
}

export interface MsgExecuteContract {
  /** sender is the canonical address of the sender */
  sender: Uint8Array;
  /** contract is the canonical address of the contract */
  contract: Uint8Array;
  /** msg is an encrypted input to pass to the contract on execute */
  msg: Uint8Array;
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_code_hash: string;
  sent_funds: Coin[];
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_sig: Uint8Array;
}

/** MsgExecuteContractResponse returns execution result data. */
export interface MsgExecuteContractResponse {
  /** Data contains base64-encoded bytes to returned from the contract */
  data: Uint8Array;
}

/** MsgMigrateContract runs a code upgrade/ downgrade for a smart contract */
export interface MsgMigrateContract {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** CodeID references the new WASM code */
  code_id: string;
  /** msg is an encrypted input to pass to the contract on migration */
  msg: Uint8Array;
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_sig: Uint8Array;
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_code_hash: string;
}

/** MsgMigrateContractResponse returns contract migration result data. */
export interface MsgMigrateContractResponse {
  /**
   * Data contains same raw bytes returned as data from the wasm contract.
   * (May be empty)
   */
  data: Uint8Array;
}

/** MsgUpdateAdmin sets a new admin for a smart contract */
export interface MsgUpdateAdmin {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** NewAdmin address to be set */
  new_admin: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_sig: Uint8Array;
}

/** MsgUpdateAdminResponse returns empty data */
export interface MsgUpdateAdminResponse {}

/** MsgClearAdmin removes any admin stored for a smart contract */
export interface MsgClearAdmin {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_sig: Uint8Array;
}

/** MsgClearAdminResponse returns empty data */
export interface MsgClearAdminResponse {}

function createBaseMsgStoreCode(): MsgStoreCode {
  return {
    sender: new Uint8Array(),
    wasm_byte_code: new Uint8Array(),
    source: "",
    builder: "",
  };
}

export const MsgStoreCode = {
  encode(
    message: MsgStoreCode,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender.length !== 0) {
      writer.uint32(10).bytes(message.sender);
    }
    if (message.wasm_byte_code.length !== 0) {
      writer.uint32(18).bytes(message.wasm_byte_code);
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    if (message.builder !== "") {
      writer.uint32(34).string(message.builder);
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
          message.sender = reader.bytes();
          break;
        case 2:
          message.wasm_byte_code = reader.bytes();
          break;
        case 3:
          message.source = reader.string();
          break;
        case 4:
          message.builder = reader.string();
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
      sender: isSet(object.sender)
        ? bytesFromBase64(object.sender)
        : new Uint8Array(),
      wasm_byte_code: isSet(object.wasm_byte_code)
        ? bytesFromBase64(object.wasm_byte_code)
        : new Uint8Array(),
      source: isSet(object.source) ? String(object.source) : "",
      builder: isSet(object.builder) ? String(object.builder) : "",
    };
  },

  toJSON(message: MsgStoreCode): unknown {
    const obj: any = {};
    message.sender !== undefined &&
      (obj.sender = base64FromBytes(
        message.sender !== undefined ? message.sender : new Uint8Array(),
      ));
    message.wasm_byte_code !== undefined &&
      (obj.wasm_byte_code = base64FromBytes(
        message.wasm_byte_code !== undefined
          ? message.wasm_byte_code
          : new Uint8Array(),
      ));
    message.source !== undefined && (obj.source = message.source);
    message.builder !== undefined && (obj.builder = message.builder);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStoreCode>, I>>(
    object: I,
  ): MsgStoreCode {
    const message = createBaseMsgStoreCode();
    message.sender = object.sender ?? new Uint8Array();
    message.wasm_byte_code = object.wasm_byte_code ?? new Uint8Array();
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    return message;
  },
};

function createBaseMsgStoreCodeResponse(): MsgStoreCodeResponse {
  return { code_id: "0" };
}

export const MsgStoreCodeResponse = {
  encode(
    message: MsgStoreCodeResponse,
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
  ): MsgStoreCodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreCodeResponse();
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

  fromJSON(object: any): MsgStoreCodeResponse {
    return {
      code_id: isSet(object.code_id) ? String(object.code_id) : "0",
    };
  },

  toJSON(message: MsgStoreCodeResponse): unknown {
    const obj: any = {};
    message.code_id !== undefined && (obj.code_id = message.code_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStoreCodeResponse>, I>>(
    object: I,
  ): MsgStoreCodeResponse {
    const message = createBaseMsgStoreCodeResponse();
    message.code_id = object.code_id ?? "0";
    return message;
  },
};

function createBaseMsgInstantiateContract(): MsgInstantiateContract {
  return {
    sender: new Uint8Array(),
    callback_code_hash: "",
    code_id: "0",
    label: "",
    init_msg: new Uint8Array(),
    init_funds: [],
    callback_sig: new Uint8Array(),
    admin: "",
  };
}

export const MsgInstantiateContract = {
  encode(
    message: MsgInstantiateContract,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender.length !== 0) {
      writer.uint32(10).bytes(message.sender);
    }
    if (message.callback_code_hash !== "") {
      writer.uint32(18).string(message.callback_code_hash);
    }
    if (message.code_id !== "0") {
      writer.uint32(24).uint64(message.code_id);
    }
    if (message.label !== "") {
      writer.uint32(34).string(message.label);
    }
    if (message.init_msg.length !== 0) {
      writer.uint32(42).bytes(message.init_msg);
    }
    for (const v of message.init_funds) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.callback_sig.length !== 0) {
      writer.uint32(58).bytes(message.callback_sig);
    }
    if (message.admin !== "") {
      writer.uint32(66).string(message.admin);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgInstantiateContract {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInstantiateContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.bytes();
          break;
        case 2:
          message.callback_code_hash = reader.string();
          break;
        case 3:
          message.code_id = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.label = reader.string();
          break;
        case 5:
          message.init_msg = reader.bytes();
          break;
        case 6:
          message.init_funds.push(Coin.decode(reader, reader.uint32()));
          break;
        case 7:
          message.callback_sig = reader.bytes();
          break;
        case 8:
          message.admin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInstantiateContract {
    return {
      sender: isSet(object.sender)
        ? bytesFromBase64(object.sender)
        : new Uint8Array(),
      callback_code_hash: isSet(object.callback_code_hash)
        ? String(object.callback_code_hash)
        : "",
      code_id: isSet(object.code_id) ? String(object.code_id) : "0",
      label: isSet(object.label) ? String(object.label) : "",
      init_msg: isSet(object.init_msg)
        ? bytesFromBase64(object.init_msg)
        : new Uint8Array(),
      init_funds: Array.isArray(object?.init_funds)
        ? object.init_funds.map((e: any) => Coin.fromJSON(e))
        : [],
      callback_sig: isSet(object.callback_sig)
        ? bytesFromBase64(object.callback_sig)
        : new Uint8Array(),
      admin: isSet(object.admin) ? String(object.admin) : "",
    };
  },

  toJSON(message: MsgInstantiateContract): unknown {
    const obj: any = {};
    message.sender !== undefined &&
      (obj.sender = base64FromBytes(
        message.sender !== undefined ? message.sender : new Uint8Array(),
      ));
    message.callback_code_hash !== undefined &&
      (obj.callback_code_hash = message.callback_code_hash);
    message.code_id !== undefined && (obj.code_id = message.code_id);
    message.label !== undefined && (obj.label = message.label);
    message.init_msg !== undefined &&
      (obj.init_msg = base64FromBytes(
        message.init_msg !== undefined ? message.init_msg : new Uint8Array(),
      ));
    if (message.init_funds) {
      obj.init_funds = message.init_funds.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.init_funds = [];
    }
    message.callback_sig !== undefined &&
      (obj.callback_sig = base64FromBytes(
        message.callback_sig !== undefined
          ? message.callback_sig
          : new Uint8Array(),
      ));
    message.admin !== undefined && (obj.admin = message.admin);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgInstantiateContract>, I>>(
    object: I,
  ): MsgInstantiateContract {
    const message = createBaseMsgInstantiateContract();
    message.sender = object.sender ?? new Uint8Array();
    message.callback_code_hash = object.callback_code_hash ?? "";
    message.code_id = object.code_id ?? "0";
    message.label = object.label ?? "";
    message.init_msg = object.init_msg ?? new Uint8Array();
    message.init_funds =
      object.init_funds?.map((e) => Coin.fromPartial(e)) || [];
    message.callback_sig = object.callback_sig ?? new Uint8Array();
    message.admin = object.admin ?? "";
    return message;
  },
};

function createBaseMsgInstantiateContractResponse(): MsgInstantiateContractResponse {
  return { address: "", data: new Uint8Array() };
}

export const MsgInstantiateContractResponse = {
  encode(
    message: MsgInstantiateContractResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgInstantiateContractResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInstantiateContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
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

  fromJSON(object: any): MsgInstantiateContractResponse {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgInstantiateContractResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgInstantiateContractResponse>, I>>(
    object: I,
  ): MsgInstantiateContractResponse {
    const message = createBaseMsgInstantiateContractResponse();
    message.address = object.address ?? "";
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgExecuteContract(): MsgExecuteContract {
  return {
    sender: new Uint8Array(),
    contract: new Uint8Array(),
    msg: new Uint8Array(),
    callback_code_hash: "",
    sent_funds: [],
    callback_sig: new Uint8Array(),
  };
}

export const MsgExecuteContract = {
  encode(
    message: MsgExecuteContract,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender.length !== 0) {
      writer.uint32(10).bytes(message.sender);
    }
    if (message.contract.length !== 0) {
      writer.uint32(18).bytes(message.contract);
    }
    if (message.msg.length !== 0) {
      writer.uint32(26).bytes(message.msg);
    }
    if (message.callback_code_hash !== "") {
      writer.uint32(34).string(message.callback_code_hash);
    }
    for (const v of message.sent_funds) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.callback_sig.length !== 0) {
      writer.uint32(50).bytes(message.callback_sig);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteContract {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.bytes();
          break;
        case 2:
          message.contract = reader.bytes();
          break;
        case 3:
          message.msg = reader.bytes();
          break;
        case 4:
          message.callback_code_hash = reader.string();
          break;
        case 5:
          message.sent_funds.push(Coin.decode(reader, reader.uint32()));
          break;
        case 6:
          message.callback_sig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExecuteContract {
    return {
      sender: isSet(object.sender)
        ? bytesFromBase64(object.sender)
        : new Uint8Array(),
      contract: isSet(object.contract)
        ? bytesFromBase64(object.contract)
        : new Uint8Array(),
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
      callback_code_hash: isSet(object.callback_code_hash)
        ? String(object.callback_code_hash)
        : "",
      sent_funds: Array.isArray(object?.sent_funds)
        ? object.sent_funds.map((e: any) => Coin.fromJSON(e))
        : [],
      callback_sig: isSet(object.callback_sig)
        ? bytesFromBase64(object.callback_sig)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgExecuteContract): unknown {
    const obj: any = {};
    message.sender !== undefined &&
      (obj.sender = base64FromBytes(
        message.sender !== undefined ? message.sender : new Uint8Array(),
      ));
    message.contract !== undefined &&
      (obj.contract = base64FromBytes(
        message.contract !== undefined ? message.contract : new Uint8Array(),
      ));
    message.msg !== undefined &&
      (obj.msg = base64FromBytes(
        message.msg !== undefined ? message.msg : new Uint8Array(),
      ));
    message.callback_code_hash !== undefined &&
      (obj.callback_code_hash = message.callback_code_hash);
    if (message.sent_funds) {
      obj.sent_funds = message.sent_funds.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.sent_funds = [];
    }
    message.callback_sig !== undefined &&
      (obj.callback_sig = base64FromBytes(
        message.callback_sig !== undefined
          ? message.callback_sig
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgExecuteContract>, I>>(
    object: I,
  ): MsgExecuteContract {
    const message = createBaseMsgExecuteContract();
    message.sender = object.sender ?? new Uint8Array();
    message.contract = object.contract ?? new Uint8Array();
    message.msg = object.msg ?? new Uint8Array();
    message.callback_code_hash = object.callback_code_hash ?? "";
    message.sent_funds =
      object.sent_funds?.map((e) => Coin.fromPartial(e)) || [];
    message.callback_sig = object.callback_sig ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgExecuteContractResponse(): MsgExecuteContractResponse {
  return { data: new Uint8Array() };
}

export const MsgExecuteContractResponse = {
  encode(
    message: MsgExecuteContractResponse,
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
  ): MsgExecuteContractResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteContractResponse();
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

  fromJSON(object: any): MsgExecuteContractResponse {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgExecuteContractResponse): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgExecuteContractResponse>, I>>(
    object: I,
  ): MsgExecuteContractResponse {
    const message = createBaseMsgExecuteContractResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgMigrateContract(): MsgMigrateContract {
  return {
    sender: "",
    contract: "",
    code_id: "0",
    msg: new Uint8Array(),
    callback_sig: new Uint8Array(),
    callback_code_hash: "",
  };
}

export const MsgMigrateContract = {
  encode(
    message: MsgMigrateContract,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contract !== "") {
      writer.uint32(18).string(message.contract);
    }
    if (message.code_id !== "0") {
      writer.uint32(24).uint64(message.code_id);
    }
    if (message.msg.length !== 0) {
      writer.uint32(34).bytes(message.msg);
    }
    if (message.callback_sig.length !== 0) {
      writer.uint32(58).bytes(message.callback_sig);
    }
    if (message.callback_code_hash !== "") {
      writer.uint32(66).string(message.callback_code_hash);
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
          message.sender = reader.string();
          break;
        case 2:
          message.contract = reader.string();
          break;
        case 3:
          message.code_id = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.msg = reader.bytes();
          break;
        case 7:
          message.callback_sig = reader.bytes();
          break;
        case 8:
          message.callback_code_hash = reader.string();
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
      sender: isSet(object.sender) ? String(object.sender) : "",
      contract: isSet(object.contract) ? String(object.contract) : "",
      code_id: isSet(object.code_id) ? String(object.code_id) : "0",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
      callback_sig: isSet(object.callback_sig)
        ? bytesFromBase64(object.callback_sig)
        : new Uint8Array(),
      callback_code_hash: isSet(object.callback_code_hash)
        ? String(object.callback_code_hash)
        : "",
    };
  },

  toJSON(message: MsgMigrateContract): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.contract !== undefined && (obj.contract = message.contract);
    message.code_id !== undefined && (obj.code_id = message.code_id);
    message.msg !== undefined &&
      (obj.msg = base64FromBytes(
        message.msg !== undefined ? message.msg : new Uint8Array(),
      ));
    message.callback_sig !== undefined &&
      (obj.callback_sig = base64FromBytes(
        message.callback_sig !== undefined
          ? message.callback_sig
          : new Uint8Array(),
      ));
    message.callback_code_hash !== undefined &&
      (obj.callback_code_hash = message.callback_code_hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMigrateContract>, I>>(
    object: I,
  ): MsgMigrateContract {
    const message = createBaseMsgMigrateContract();
    message.sender = object.sender ?? "";
    message.contract = object.contract ?? "";
    message.code_id = object.code_id ?? "0";
    message.msg = object.msg ?? new Uint8Array();
    message.callback_sig = object.callback_sig ?? new Uint8Array();
    message.callback_code_hash = object.callback_code_hash ?? "";
    return message;
  },
};

function createBaseMsgMigrateContractResponse(): MsgMigrateContractResponse {
  return { data: new Uint8Array() };
}

export const MsgMigrateContractResponse = {
  encode(
    message: MsgMigrateContractResponse,
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
  ): MsgMigrateContractResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMigrateContractResponse();
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

  fromJSON(object: any): MsgMigrateContractResponse {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgMigrateContractResponse): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMigrateContractResponse>, I>>(
    object: I,
  ): MsgMigrateContractResponse {
    const message = createBaseMsgMigrateContractResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgUpdateAdmin(): MsgUpdateAdmin {
  return {
    sender: "",
    new_admin: "",
    contract: "",
    callback_sig: new Uint8Array(),
  };
}

export const MsgUpdateAdmin = {
  encode(
    message: MsgUpdateAdmin,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.new_admin !== "") {
      writer.uint32(18).string(message.new_admin);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    if (message.callback_sig.length !== 0) {
      writer.uint32(58).bytes(message.callback_sig);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateAdmin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.new_admin = reader.string();
          break;
        case 3:
          message.contract = reader.string();
          break;
        case 7:
          message.callback_sig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateAdmin {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      new_admin: isSet(object.new_admin) ? String(object.new_admin) : "",
      contract: isSet(object.contract) ? String(object.contract) : "",
      callback_sig: isSet(object.callback_sig)
        ? bytesFromBase64(object.callback_sig)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgUpdateAdmin): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.new_admin !== undefined && (obj.new_admin = message.new_admin);
    message.contract !== undefined && (obj.contract = message.contract);
    message.callback_sig !== undefined &&
      (obj.callback_sig = base64FromBytes(
        message.callback_sig !== undefined
          ? message.callback_sig
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateAdmin>, I>>(
    object: I,
  ): MsgUpdateAdmin {
    const message = createBaseMsgUpdateAdmin();
    message.sender = object.sender ?? "";
    message.new_admin = object.new_admin ?? "";
    message.contract = object.contract ?? "";
    message.callback_sig = object.callback_sig ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgUpdateAdminResponse(): MsgUpdateAdminResponse {
  return {};
}

export const MsgUpdateAdminResponse = {
  encode(
    _: MsgUpdateAdminResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAdminResponse();
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

  fromJSON(_: any): MsgUpdateAdminResponse {
    return {};
  },

  toJSON(_: MsgUpdateAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateAdminResponse>, I>>(
    _: I,
  ): MsgUpdateAdminResponse {
    const message = createBaseMsgUpdateAdminResponse();
    return message;
  },
};

function createBaseMsgClearAdmin(): MsgClearAdmin {
  return { sender: "", contract: "", callback_sig: new Uint8Array() };
}

export const MsgClearAdmin = {
  encode(
    message: MsgClearAdmin,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    if (message.callback_sig.length !== 0) {
      writer.uint32(58).bytes(message.callback_sig);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClearAdmin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClearAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 3:
          message.contract = reader.string();
          break;
        case 7:
          message.callback_sig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClearAdmin {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      contract: isSet(object.contract) ? String(object.contract) : "",
      callback_sig: isSet(object.callback_sig)
        ? bytesFromBase64(object.callback_sig)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgClearAdmin): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.contract !== undefined && (obj.contract = message.contract);
    message.callback_sig !== undefined &&
      (obj.callback_sig = base64FromBytes(
        message.callback_sig !== undefined
          ? message.callback_sig
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClearAdmin>, I>>(
    object: I,
  ): MsgClearAdmin {
    const message = createBaseMsgClearAdmin();
    message.sender = object.sender ?? "";
    message.contract = object.contract ?? "";
    message.callback_sig = object.callback_sig ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgClearAdminResponse(): MsgClearAdminResponse {
  return {};
}

export const MsgClearAdminResponse = {
  encode(
    _: MsgClearAdminResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgClearAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClearAdminResponse();
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

  fromJSON(_: any): MsgClearAdminResponse {
    return {};
  },

  toJSON(_: MsgClearAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClearAdminResponse>, I>>(
    _: I,
  ): MsgClearAdminResponse {
    const message = createBaseMsgClearAdminResponse();
    return message;
  },
};

/** Msg defines the wasm Msg service. */
export interface Msg {
  /** StoreCode to submit Wasm code to the system */
  StoreCode(request: MsgStoreCode): Promise<MsgStoreCodeResponse>;
  /** Instantiate creates a new smart contract instance for the given code id. */
  InstantiateContract(
    request: MsgInstantiateContract,
  ): Promise<MsgInstantiateContractResponse>;
  /** Execute submits the given message data to a smart contract */
  ExecuteContract(
    request: MsgExecuteContract,
  ): Promise<MsgExecuteContractResponse>;
  /** Migrate runs a code upgrade/ downgrade for a smart contract */
  MigrateContract(
    request: MsgMigrateContract,
  ): Promise<MsgMigrateContractResponse>;
  /** UpdateAdmin sets a new   admin for a smart contract */
  UpdateAdmin(request: MsgUpdateAdmin): Promise<MsgUpdateAdminResponse>;
  /** ClearAdmin removes any admin stored for a smart contract */
  ClearAdmin(request: MsgClearAdmin): Promise<MsgClearAdminResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.StoreCode = this.StoreCode.bind(this);
    this.InstantiateContract = this.InstantiateContract.bind(this);
    this.ExecuteContract = this.ExecuteContract.bind(this);
    this.MigrateContract = this.MigrateContract.bind(this);
    this.UpdateAdmin = this.UpdateAdmin.bind(this);
    this.ClearAdmin = this.ClearAdmin.bind(this);
  }
  StoreCode(request: MsgStoreCode): Promise<MsgStoreCodeResponse> {
    const data = MsgStoreCode.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Msg",
      "StoreCode",
      data,
    );
    return promise.then((data) =>
      MsgStoreCodeResponse.decode(new _m0.Reader(data)),
    );
  }

  InstantiateContract(
    request: MsgInstantiateContract,
  ): Promise<MsgInstantiateContractResponse> {
    const data = MsgInstantiateContract.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Msg",
      "InstantiateContract",
      data,
    );
    return promise.then((data) =>
      MsgInstantiateContractResponse.decode(new _m0.Reader(data)),
    );
  }

  ExecuteContract(
    request: MsgExecuteContract,
  ): Promise<MsgExecuteContractResponse> {
    const data = MsgExecuteContract.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Msg",
      "ExecuteContract",
      data,
    );
    return promise.then((data) =>
      MsgExecuteContractResponse.decode(new _m0.Reader(data)),
    );
  }

  MigrateContract(
    request: MsgMigrateContract,
  ): Promise<MsgMigrateContractResponse> {
    const data = MsgMigrateContract.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Msg",
      "MigrateContract",
      data,
    );
    return promise.then((data) =>
      MsgMigrateContractResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateAdmin(request: MsgUpdateAdmin): Promise<MsgUpdateAdminResponse> {
    const data = MsgUpdateAdmin.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Msg",
      "UpdateAdmin",
      data,
    );
    return promise.then((data) =>
      MsgUpdateAdminResponse.decode(new _m0.Reader(data)),
    );
  }

  ClearAdmin(request: MsgClearAdmin): Promise<MsgClearAdminResponse> {
    const data = MsgClearAdmin.encode(request).finish();
    const promise = this.rpc.request(
      "secret.compute.v1beta1.Msg",
      "ClearAdmin",
      data,
    );
    return promise.then((data) =>
      MsgClearAdminResponse.decode(new _m0.Reader(data)),
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
