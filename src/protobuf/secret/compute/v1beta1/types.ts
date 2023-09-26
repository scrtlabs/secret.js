/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "secret.compute.v1beta1";

export enum AccessType {
  UNDEFINED = 0,
  NOBODY = 1,
  ONLY_ADDRESS = 2,
  EVERYBODY = 3,
  UNRECOGNIZED = -1,
}

export function accessTypeFromJSON(object: any): AccessType {
  switch (object) {
    case 0:
    case "UNDEFINED":
      return AccessType.UNDEFINED;
    case 1:
    case "NOBODY":
      return AccessType.NOBODY;
    case 2:
    case "ONLY_ADDRESS":
      return AccessType.ONLY_ADDRESS;
    case 3:
    case "EVERYBODY":
      return AccessType.EVERYBODY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AccessType.UNRECOGNIZED;
  }
}

export function accessTypeToJSON(object: AccessType): string {
  switch (object) {
    case AccessType.UNDEFINED:
      return "UNDEFINED";
    case AccessType.NOBODY:
      return "NOBODY";
    case AccessType.ONLY_ADDRESS:
      return "ONLY_ADDRESS";
    case AccessType.EVERYBODY:
      return "EVERYBODY";
    default:
      return "UNKNOWN";
  }
}

/** ContractCodeHistoryOperationType actions that caused a code change */
export enum ContractCodeHistoryOperationType {
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED - ContractCodeHistoryOperationTypeUnspecified placeholder for empty value */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED = 0,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT - ContractCodeHistoryOperationTypeInit on chain contract instantiation */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT = 1,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE - ContractCodeHistoryOperationTypeMigrate code migration */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE = 2,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS - ContractCodeHistoryOperationTypeGenesis based on genesis data */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS = 3,
  UNRECOGNIZED = -1,
}

export function contractCodeHistoryOperationTypeFromJSON(
  object: any,
): ContractCodeHistoryOperationType {
  switch (object) {
    case 0:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED;
    case 1:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT;
    case 2:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE;
    case 3:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ContractCodeHistoryOperationType.UNRECOGNIZED;
  }
}

export function contractCodeHistoryOperationTypeToJSON(
  object: ContractCodeHistoryOperationType,
): string {
  switch (object) {
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED";
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT";
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE";
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";
    default:
      return "UNKNOWN";
  }
}

export interface AccessTypeParam {
  value: AccessType;
}

/** CodeInfo is data for the uploaded contract WASM code */
export interface CodeInfo {
  code_hash: Uint8Array;
  creator: Uint8Array;
  source: string;
  builder: string;
}

export interface ContractKey {
  og_contract_key: Uint8Array;
  current_contract_key: Uint8Array;
  current_contract_key_proof: Uint8Array;
}

export interface ContractCustomInfo {
  enclave_key?: ContractKey;
  label: string;
}

/** ContractInfo stores a WASM contract instance */
export interface ContractInfo {
  /** CodeID is the reference to the stored Wasm code */
  code_id: string;
  /** Creator address who initially instantiated the contract */
  creator: Uint8Array;
  /** Label is mandatory metadata to be stored with a contract instance. */
  label: string;
  /** Created Tx position when the contract was instantiated. */
  created?: AbsoluteTxPosition;
  ibc_port_id: string;
  /** Admin is an optional address that can execute migrations */
  admin: string;
  /** Proof that enclave executed the instantiate command */
  admin_proof: Uint8Array;
}

/** AbsoluteTxPosition can be used to sort contracts */
export interface AbsoluteTxPosition {
  /** BlockHeight is the block the contract was created at */
  block_height: string;
  /** TxIndex is a monotonic counter within the block (actual transaction index, or gas consumed) */
  tx_index: string;
}

/** Model is a struct that holds a KV pair */
export interface Model {
  /** hex-encode key to read it better (this is often ascii) */
  Key: Uint8Array;
  /** base64-encode raw value */
  Value: Uint8Array;
}

/** ContractCodeHistoryEntry metadata to a contract. */
export interface ContractCodeHistoryEntry {
  operation: ContractCodeHistoryOperationType;
  /** CodeID is the reference to the stored WASM code */
  code_id: string;
  /** Updated Tx position when the operation was executed. */
  updated?: AbsoluteTxPosition;
  msg: Uint8Array;
}

function createBaseAccessTypeParam(): AccessTypeParam {
  return { value: 0 };
}

export const AccessTypeParam = {
  encode(
    message: AccessTypeParam,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.value !== 0) {
      writer.uint32(8).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccessTypeParam {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccessTypeParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccessTypeParam {
    return {
      value: isSet(object.value) ? accessTypeFromJSON(object.value) : 0,
    };
  },

  toJSON(message: AccessTypeParam): unknown {
    const obj: any = {};
    message.value !== undefined &&
      (obj.value = accessTypeToJSON(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AccessTypeParam>, I>>(
    object: I,
  ): AccessTypeParam {
    const message = createBaseAccessTypeParam();
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseCodeInfo(): CodeInfo {
  return {
    code_hash: new Uint8Array(),
    creator: new Uint8Array(),
    source: "",
    builder: "",
  };
}

export const CodeInfo = {
  encode(
    message: CodeInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.code_hash.length !== 0) {
      writer.uint32(10).bytes(message.code_hash);
    }
    if (message.creator.length !== 0) {
      writer.uint32(18).bytes(message.creator);
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    if (message.builder !== "") {
      writer.uint32(34).string(message.builder);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CodeInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCodeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code_hash = reader.bytes();
          break;
        case 2:
          message.creator = reader.bytes();
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

  fromJSON(object: any): CodeInfo {
    return {
      code_hash: isSet(object.code_hash)
        ? bytesFromBase64(object.code_hash)
        : new Uint8Array(),
      creator: isSet(object.creator)
        ? bytesFromBase64(object.creator)
        : new Uint8Array(),
      source: isSet(object.source) ? String(object.source) : "",
      builder: isSet(object.builder) ? String(object.builder) : "",
    };
  },

  toJSON(message: CodeInfo): unknown {
    const obj: any = {};
    message.code_hash !== undefined &&
      (obj.code_hash = base64FromBytes(
        message.code_hash !== undefined ? message.code_hash : new Uint8Array(),
      ));
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array(),
      ));
    message.source !== undefined && (obj.source = message.source);
    message.builder !== undefined && (obj.builder = message.builder);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CodeInfo>, I>>(object: I): CodeInfo {
    const message = createBaseCodeInfo();
    message.code_hash = object.code_hash ?? new Uint8Array();
    message.creator = object.creator ?? new Uint8Array();
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    return message;
  },
};

function createBaseContractKey(): ContractKey {
  return {
    og_contract_key: new Uint8Array(),
    current_contract_key: new Uint8Array(),
    current_contract_key_proof: new Uint8Array(),
  };
}

export const ContractKey = {
  encode(
    message: ContractKey,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.og_contract_key.length !== 0) {
      writer.uint32(10).bytes(message.og_contract_key);
    }
    if (message.current_contract_key.length !== 0) {
      writer.uint32(18).bytes(message.current_contract_key);
    }
    if (message.current_contract_key_proof.length !== 0) {
      writer.uint32(26).bytes(message.current_contract_key_proof);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.og_contract_key = reader.bytes();
          break;
        case 2:
          message.current_contract_key = reader.bytes();
          break;
        case 3:
          message.current_contract_key_proof = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContractKey {
    return {
      og_contract_key: isSet(object.og_contract_key)
        ? bytesFromBase64(object.og_contract_key)
        : new Uint8Array(),
      current_contract_key: isSet(object.current_contract_key)
        ? bytesFromBase64(object.current_contract_key)
        : new Uint8Array(),
      current_contract_key_proof: isSet(object.current_contract_key_proof)
        ? bytesFromBase64(object.current_contract_key_proof)
        : new Uint8Array(),
    };
  },

  toJSON(message: ContractKey): unknown {
    const obj: any = {};
    message.og_contract_key !== undefined &&
      (obj.og_contract_key = base64FromBytes(
        message.og_contract_key !== undefined
          ? message.og_contract_key
          : new Uint8Array(),
      ));
    message.current_contract_key !== undefined &&
      (obj.current_contract_key = base64FromBytes(
        message.current_contract_key !== undefined
          ? message.current_contract_key
          : new Uint8Array(),
      ));
    message.current_contract_key_proof !== undefined &&
      (obj.current_contract_key_proof = base64FromBytes(
        message.current_contract_key_proof !== undefined
          ? message.current_contract_key_proof
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContractKey>, I>>(
    object: I,
  ): ContractKey {
    const message = createBaseContractKey();
    message.og_contract_key = object.og_contract_key ?? new Uint8Array();
    message.current_contract_key =
      object.current_contract_key ?? new Uint8Array();
    message.current_contract_key_proof =
      object.current_contract_key_proof ?? new Uint8Array();
    return message;
  },
};

function createBaseContractCustomInfo(): ContractCustomInfo {
  return { enclave_key: undefined, label: "" };
}

export const ContractCustomInfo = {
  encode(
    message: ContractCustomInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.enclave_key !== undefined) {
      ContractKey.encode(
        message.enclave_key,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.label !== "") {
      writer.uint32(18).string(message.label);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractCustomInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractCustomInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enclave_key = ContractKey.decode(reader, reader.uint32());
          break;
        case 2:
          message.label = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContractCustomInfo {
    return {
      enclave_key: isSet(object.enclave_key)
        ? ContractKey.fromJSON(object.enclave_key)
        : undefined,
      label: isSet(object.label) ? String(object.label) : "",
    };
  },

  toJSON(message: ContractCustomInfo): unknown {
    const obj: any = {};
    message.enclave_key !== undefined &&
      (obj.enclave_key = message.enclave_key
        ? ContractKey.toJSON(message.enclave_key)
        : undefined);
    message.label !== undefined && (obj.label = message.label);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContractCustomInfo>, I>>(
    object: I,
  ): ContractCustomInfo {
    const message = createBaseContractCustomInfo();
    message.enclave_key =
      object.enclave_key !== undefined && object.enclave_key !== null
        ? ContractKey.fromPartial(object.enclave_key)
        : undefined;
    message.label = object.label ?? "";
    return message;
  },
};

function createBaseContractInfo(): ContractInfo {
  return {
    code_id: "0",
    creator: new Uint8Array(),
    label: "",
    created: undefined,
    ibc_port_id: "",
    admin: "",
    admin_proof: new Uint8Array(),
  };
}

export const ContractInfo = {
  encode(
    message: ContractInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.code_id !== "0") {
      writer.uint32(8).uint64(message.code_id);
    }
    if (message.creator.length !== 0) {
      writer.uint32(18).bytes(message.creator);
    }
    if (message.label !== "") {
      writer.uint32(34).string(message.label);
    }
    if (message.created !== undefined) {
      AbsoluteTxPosition.encode(
        message.created,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.ibc_port_id !== "") {
      writer.uint32(50).string(message.ibc_port_id);
    }
    if (message.admin !== "") {
      writer.uint32(58).string(message.admin);
    }
    if (message.admin_proof.length !== 0) {
      writer.uint32(66).bytes(message.admin_proof);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.creator = reader.bytes();
          break;
        case 4:
          message.label = reader.string();
          break;
        case 5:
          message.created = AbsoluteTxPosition.decode(reader, reader.uint32());
          break;
        case 6:
          message.ibc_port_id = reader.string();
          break;
        case 7:
          message.admin = reader.string();
          break;
        case 8:
          message.admin_proof = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContractInfo {
    return {
      code_id: isSet(object.code_id) ? String(object.code_id) : "0",
      creator: isSet(object.creator)
        ? bytesFromBase64(object.creator)
        : new Uint8Array(),
      label: isSet(object.label) ? String(object.label) : "",
      created: isSet(object.created)
        ? AbsoluteTxPosition.fromJSON(object.created)
        : undefined,
      ibc_port_id: isSet(object.ibc_port_id) ? String(object.ibc_port_id) : "",
      admin: isSet(object.admin) ? String(object.admin) : "",
      admin_proof: isSet(object.admin_proof)
        ? bytesFromBase64(object.admin_proof)
        : new Uint8Array(),
    };
  },

  toJSON(message: ContractInfo): unknown {
    const obj: any = {};
    message.code_id !== undefined && (obj.code_id = message.code_id);
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array(),
      ));
    message.label !== undefined && (obj.label = message.label);
    message.created !== undefined &&
      (obj.created = message.created
        ? AbsoluteTxPosition.toJSON(message.created)
        : undefined);
    message.ibc_port_id !== undefined &&
      (obj.ibc_port_id = message.ibc_port_id);
    message.admin !== undefined && (obj.admin = message.admin);
    message.admin_proof !== undefined &&
      (obj.admin_proof = base64FromBytes(
        message.admin_proof !== undefined
          ? message.admin_proof
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContractInfo>, I>>(
    object: I,
  ): ContractInfo {
    const message = createBaseContractInfo();
    message.code_id = object.code_id ?? "0";
    message.creator = object.creator ?? new Uint8Array();
    message.label = object.label ?? "";
    message.created =
      object.created !== undefined && object.created !== null
        ? AbsoluteTxPosition.fromPartial(object.created)
        : undefined;
    message.ibc_port_id = object.ibc_port_id ?? "";
    message.admin = object.admin ?? "";
    message.admin_proof = object.admin_proof ?? new Uint8Array();
    return message;
  },
};

function createBaseAbsoluteTxPosition(): AbsoluteTxPosition {
  return { block_height: "0", tx_index: "0" };
}

export const AbsoluteTxPosition = {
  encode(
    message: AbsoluteTxPosition,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.block_height !== "0") {
      writer.uint32(8).int64(message.block_height);
    }
    if (message.tx_index !== "0") {
      writer.uint32(16).uint64(message.tx_index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AbsoluteTxPosition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAbsoluteTxPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.tx_index = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AbsoluteTxPosition {
    return {
      block_height: isSet(object.block_height)
        ? String(object.block_height)
        : "0",
      tx_index: isSet(object.tx_index) ? String(object.tx_index) : "0",
    };
  },

  toJSON(message: AbsoluteTxPosition): unknown {
    const obj: any = {};
    message.block_height !== undefined &&
      (obj.block_height = message.block_height);
    message.tx_index !== undefined && (obj.tx_index = message.tx_index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AbsoluteTxPosition>, I>>(
    object: I,
  ): AbsoluteTxPosition {
    const message = createBaseAbsoluteTxPosition();
    message.block_height = object.block_height ?? "0";
    message.tx_index = object.tx_index ?? "0";
    return message;
  },
};

function createBaseModel(): Model {
  return { Key: new Uint8Array(), Value: new Uint8Array() };
}

export const Model = {
  encode(message: Model, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Key.length !== 0) {
      writer.uint32(10).bytes(message.Key);
    }
    if (message.Value.length !== 0) {
      writer.uint32(18).bytes(message.Value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Model {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Key = reader.bytes();
          break;
        case 2:
          message.Value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Model {
    return {
      Key: isSet(object.Key) ? bytesFromBase64(object.Key) : new Uint8Array(),
      Value: isSet(object.Value)
        ? bytesFromBase64(object.Value)
        : new Uint8Array(),
    };
  },

  toJSON(message: Model): unknown {
    const obj: any = {};
    message.Key !== undefined &&
      (obj.Key = base64FromBytes(
        message.Key !== undefined ? message.Key : new Uint8Array(),
      ));
    message.Value !== undefined &&
      (obj.Value = base64FromBytes(
        message.Value !== undefined ? message.Value : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Model>, I>>(object: I): Model {
    const message = createBaseModel();
    message.Key = object.Key ?? new Uint8Array();
    message.Value = object.Value ?? new Uint8Array();
    return message;
  },
};

function createBaseContractCodeHistoryEntry(): ContractCodeHistoryEntry {
  return {
    operation: 0,
    code_id: "0",
    updated: undefined,
    msg: new Uint8Array(),
  };
}

export const ContractCodeHistoryEntry = {
  encode(
    message: ContractCodeHistoryEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.operation !== 0) {
      writer.uint32(8).int32(message.operation);
    }
    if (message.code_id !== "0") {
      writer.uint32(16).uint64(message.code_id);
    }
    if (message.updated !== undefined) {
      AbsoluteTxPosition.encode(
        message.updated,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.msg.length !== 0) {
      writer.uint32(34).bytes(message.msg);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ContractCodeHistoryEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractCodeHistoryEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operation = reader.int32() as any;
          break;
        case 2:
          message.code_id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.updated = AbsoluteTxPosition.decode(reader, reader.uint32());
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

  fromJSON(object: any): ContractCodeHistoryEntry {
    return {
      operation: isSet(object.operation)
        ? contractCodeHistoryOperationTypeFromJSON(object.operation)
        : 0,
      code_id: isSet(object.code_id) ? String(object.code_id) : "0",
      updated: isSet(object.updated)
        ? AbsoluteTxPosition.fromJSON(object.updated)
        : undefined,
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
    };
  },

  toJSON(message: ContractCodeHistoryEntry): unknown {
    const obj: any = {};
    message.operation !== undefined &&
      (obj.operation = contractCodeHistoryOperationTypeToJSON(
        message.operation,
      ));
    message.code_id !== undefined && (obj.code_id = message.code_id);
    message.updated !== undefined &&
      (obj.updated = message.updated
        ? AbsoluteTxPosition.toJSON(message.updated)
        : undefined);
    message.msg !== undefined &&
      (obj.msg = base64FromBytes(
        message.msg !== undefined ? message.msg : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContractCodeHistoryEntry>, I>>(
    object: I,
  ): ContractCodeHistoryEntry {
    const message = createBaseContractCodeHistoryEntry();
    message.operation = object.operation ?? 0;
    message.code_id = object.code_id ?? "0";
    message.updated =
      object.updated !== undefined && object.updated !== null
        ? AbsoluteTxPosition.fromPartial(object.updated)
        : undefined;
    message.msg = object.msg ?? new Uint8Array();
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
