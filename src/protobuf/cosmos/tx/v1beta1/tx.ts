/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import {
  SignMode,
  signModeFromJSON,
  signModeToJSON,
} from "../signing/v1beta1/signing";
import { CompactBitArray } from "../../crypto/multisig/v1beta1/multisig";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.tx.v1beta1";

/** Txs is an array of Tx, used to generate the code needed for the enclave to unpack txs and validate them */
export interface Txs {
  tx: Uint8Array[];
}

/** Tx is the standard type used for broadcasting transactions. */
export interface Tx {
  /** body is the processable content of the transaction */
  body?: TxBody;
  /**
   * auth_info is the authorization related content of the transaction,
   * specifically signers, signer modes and fee
   */
  auth_info?: AuthInfo;
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures: Uint8Array[];
}

/**
 * TxRaw is a variant of Tx that pins the signer's exact binary representation
 * of body and auth_info. This is used for signing, broadcasting and
 * verification. The binary `serialize(tx: TxRaw)` is stored in Tendermint and
 * the hash `sha256(serialize(tx: TxRaw))` becomes the "txhash", commonly used
 * as the transaction ID.
 */
export interface TxRaw {
  /**
   * body_bytes is a protobuf serialization of a TxBody that matches the
   * representation in SignDoc.
   */
  body_bytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in SignDoc.
   */
  auth_info_bytes: Uint8Array;
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures: Uint8Array[];
}

/** SignDoc is the type used for generating sign bytes for SIGN_MODE_DIRECT. */
export interface SignDoc {
  /**
   * body_bytes is protobuf serialization of a TxBody that matches the
   * representation in TxRaw.
   */
  body_bytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in TxRaw.
   */
  auth_info_bytes: Uint8Array;
  /**
   * chain_id is the unique identifier of the chain this transaction targets.
   * It prevents signed transactions from being used on another chain by an
   * attacker
   */
  chain_id: string;
  /** account_number is the account number of the account in state */
  account_number: string;
}

/** TxBody is the body of a transaction that all signers sign over. */
export interface TxBody {
  /**
   * messages is a list of messages to be executed. The required signers of
   * those messages define the number and order of elements in AuthInfo's
   * signer_infos and Tx's signatures. Each required signer address is added to
   * the list only the first time it occurs.
   * By convention, the first required signer (usually from the first message)
   * is referred to as the primary signer and pays the fee for the whole
   * transaction.
   */
  messages: Any[];
  /**
   * memo is any arbitrary note/comment to be added to the transaction.
   * WARNING: in clients, any publicly exposed text should not be called memo,
   * but should be called `note` instead (see https://github.com/cosmos/cosmos-sdk/issues/9122).
   */
  memo: string;
  /**
   * timeout is the block height after which this transaction will not
   * be processed by the chain
   */
  timeout_height: string;
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, the transaction will be rejected
   */
  extension_options: Any[];
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, they will be ignored
   */
  non_critical_extension_options: Any[];
}

/**
 * AuthInfo describes the fee and signer modes that are used to sign a
 * transaction.
 */
export interface AuthInfo {
  /**
   * signer_infos defines the signing modes for the required signers. The number
   * and order of elements must match the required signers from TxBody's
   * messages. The first element is the primary signer and the one which pays
   * the fee.
   */
  signer_infos: SignerInfo[];
  /**
   * Fee is the fee and gas limit for the transaction. The first signer is the
   * primary signer and the one which pays the fee. The fee can be calculated
   * based on the cost of evaluating the body and doing signature verification
   * of the signers. This can be estimated via simulation.
   */
  fee?: Fee;
}

/**
 * SignerInfo describes the public key and signing mode of a single top-level
 * signer.
 */
export interface SignerInfo {
  /**
   * public_key is the public key of the signer. It is optional for accounts
   * that already exist in state. If unset, the verifier can use the required \
   * signer address for this position and lookup the public key.
   */
  public_key?: Any;
  /**
   * mode_info describes the signing mode of the signer and is a nested
   * structure to support nested multisig pubkey's
   */
  mode_info?: ModeInfo;
  /**
   * sequence is the sequence of the account, which describes the
   * number of committed transactions signed by a given address. It is used to
   * prevent replay attacks.
   */
  sequence: string;
}

/** ModeInfo describes the signing mode of a single or nested multisig signer. */
export interface ModeInfo {
  /** single represents a single signer */
  single?: ModeInfo_Single | undefined;
  /** multi represents a nested multisig signer */
  multi?: ModeInfo_Multi | undefined;
}

/**
 * Single is the mode info for a single signer. It is structured as a message
 * to allow for additional fields such as locale for SIGN_MODE_TEXTUAL in the
 * future
 */
export interface ModeInfo_Single {
  /** mode is the signing mode of the single signer */
  mode: SignMode;
}

/** Multi is the mode info for a multisig public key */
export interface ModeInfo_Multi {
  /** bitarray specifies which keys within the multisig are signing */
  bitarray?: CompactBitArray;
  /**
   * mode_infos is the corresponding modes of the signers of the multisig
   * which could include nested multisig public keys
   */
  mode_infos: ModeInfo[];
}

/**
 * Fee includes the amount of coins paid in fees and the maximum
 * gas to be used by the transaction. The ratio yields an effective "gasprice",
 * which must be above some miminum to be accepted into the mempool.
 */
export interface Fee {
  /** amount is the amount of coins to be paid as a fee */
  amount: Coin[];
  /**
   * gas_limit is the maximum gas that can be used in transaction processing
   * before an out of gas error occurs
   */
  gas_limit: string;
  /**
   * if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
   * the payer must be a tx signer (and thus have signed this field in AuthInfo).
   * setting this field does *not* change the ordering of required signers for the transaction.
   */
  payer: string;
  /**
   * if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
   * to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
   * not support fee grants, this will fail
   */
  granter: string;
}

function createBaseTxs(): Txs {
  return { tx: [] };
}

export const Txs = {
  encode(message: Txs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tx) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Txs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Txs {
    return {
      tx: Array.isArray(object?.tx)
        ? object.tx.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: Txs): unknown {
    const obj: any = {};
    if (message.tx) {
      obj.tx = message.tx.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.tx = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Txs>, I>>(object: I): Txs {
    const message = createBaseTxs();
    message.tx = object.tx?.map((e) => e) || [];
    return message;
  },
};

function createBaseTx(): Tx {
  return { body: undefined, auth_info: undefined, signatures: [] };
}

export const Tx = {
  encode(message: Tx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.body !== undefined) {
      TxBody.encode(message.body, writer.uint32(10).fork()).ldelim();
    }
    if (message.auth_info !== undefined) {
      AuthInfo.encode(message.auth_info, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.signatures) {
      writer.uint32(26).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.body = TxBody.decode(reader, reader.uint32());
          break;
        case 2:
          message.auth_info = AuthInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.signatures.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tx {
    return {
      body: isSet(object.body) ? TxBody.fromJSON(object.body) : undefined,
      auth_info: isSet(object.auth_info)
        ? AuthInfo.fromJSON(object.auth_info)
        : undefined,
      signatures: Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: Tx): unknown {
    const obj: any = {};
    message.body !== undefined &&
      (obj.body = message.body ? TxBody.toJSON(message.body) : undefined);
    message.auth_info !== undefined &&
      (obj.auth_info = message.auth_info
        ? AuthInfo.toJSON(message.auth_info)
        : undefined);
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.signatures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tx>, I>>(object: I): Tx {
    const message = createBaseTx();
    message.body =
      object.body !== undefined && object.body !== null
        ? TxBody.fromPartial(object.body)
        : undefined;
    message.auth_info =
      object.auth_info !== undefined && object.auth_info !== null
        ? AuthInfo.fromPartial(object.auth_info)
        : undefined;
    message.signatures = object.signatures?.map((e) => e) || [];
    return message;
  },
};

function createBaseTxRaw(): TxRaw {
  return {
    body_bytes: new Uint8Array(),
    auth_info_bytes: new Uint8Array(),
    signatures: [],
  };
}

export const TxRaw = {
  encode(message: TxRaw, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.body_bytes.length !== 0) {
      writer.uint32(10).bytes(message.body_bytes);
    }
    if (message.auth_info_bytes.length !== 0) {
      writer.uint32(18).bytes(message.auth_info_bytes);
    }
    for (const v of message.signatures) {
      writer.uint32(26).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxRaw {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxRaw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.body_bytes = reader.bytes();
          break;
        case 2:
          message.auth_info_bytes = reader.bytes();
          break;
        case 3:
          message.signatures.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxRaw {
    return {
      body_bytes: isSet(object.body_bytes)
        ? bytesFromBase64(object.body_bytes)
        : new Uint8Array(),
      auth_info_bytes: isSet(object.auth_info_bytes)
        ? bytesFromBase64(object.auth_info_bytes)
        : new Uint8Array(),
      signatures: Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: TxRaw): unknown {
    const obj: any = {};
    message.body_bytes !== undefined &&
      (obj.body_bytes = base64FromBytes(
        message.body_bytes !== undefined
          ? message.body_bytes
          : new Uint8Array(),
      ));
    message.auth_info_bytes !== undefined &&
      (obj.auth_info_bytes = base64FromBytes(
        message.auth_info_bytes !== undefined
          ? message.auth_info_bytes
          : new Uint8Array(),
      ));
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.signatures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TxRaw>, I>>(object: I): TxRaw {
    const message = createBaseTxRaw();
    message.body_bytes = object.body_bytes ?? new Uint8Array();
    message.auth_info_bytes = object.auth_info_bytes ?? new Uint8Array();
    message.signatures = object.signatures?.map((e) => e) || [];
    return message;
  },
};

function createBaseSignDoc(): SignDoc {
  return {
    body_bytes: new Uint8Array(),
    auth_info_bytes: new Uint8Array(),
    chain_id: "",
    account_number: "0",
  };
}

export const SignDoc = {
  encode(
    message: SignDoc,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.body_bytes.length !== 0) {
      writer.uint32(10).bytes(message.body_bytes);
    }
    if (message.auth_info_bytes.length !== 0) {
      writer.uint32(18).bytes(message.auth_info_bytes);
    }
    if (message.chain_id !== "") {
      writer.uint32(26).string(message.chain_id);
    }
    if (message.account_number !== "0") {
      writer.uint32(32).uint64(message.account_number);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.body_bytes = reader.bytes();
          break;
        case 2:
          message.auth_info_bytes = reader.bytes();
          break;
        case 3:
          message.chain_id = reader.string();
          break;
        case 4:
          message.account_number = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignDoc {
    return {
      body_bytes: isSet(object.body_bytes)
        ? bytesFromBase64(object.body_bytes)
        : new Uint8Array(),
      auth_info_bytes: isSet(object.auth_info_bytes)
        ? bytesFromBase64(object.auth_info_bytes)
        : new Uint8Array(),
      chain_id: isSet(object.chain_id) ? String(object.chain_id) : "",
      account_number: isSet(object.account_number)
        ? String(object.account_number)
        : "0",
    };
  },

  toJSON(message: SignDoc): unknown {
    const obj: any = {};
    message.body_bytes !== undefined &&
      (obj.body_bytes = base64FromBytes(
        message.body_bytes !== undefined
          ? message.body_bytes
          : new Uint8Array(),
      ));
    message.auth_info_bytes !== undefined &&
      (obj.auth_info_bytes = base64FromBytes(
        message.auth_info_bytes !== undefined
          ? message.auth_info_bytes
          : new Uint8Array(),
      ));
    message.chain_id !== undefined && (obj.chain_id = message.chain_id);
    message.account_number !== undefined &&
      (obj.account_number = message.account_number);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignDoc>, I>>(object: I): SignDoc {
    const message = createBaseSignDoc();
    message.body_bytes = object.body_bytes ?? new Uint8Array();
    message.auth_info_bytes = object.auth_info_bytes ?? new Uint8Array();
    message.chain_id = object.chain_id ?? "";
    message.account_number = object.account_number ?? "0";
    return message;
  },
};

function createBaseTxBody(): TxBody {
  return {
    messages: [],
    memo: "",
    timeout_height: "0",
    extension_options: [],
    non_critical_extension_options: [],
  };
}

export const TxBody = {
  encode(
    message: TxBody,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.memo !== "") {
      writer.uint32(18).string(message.memo);
    }
    if (message.timeout_height !== "0") {
      writer.uint32(24).uint64(message.timeout_height);
    }
    for (const v of message.extension_options) {
      Any.encode(v!, writer.uint32(8186).fork()).ldelim();
    }
    for (const v of message.non_critical_extension_options) {
      Any.encode(v!, writer.uint32(16378).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxBody {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Any.decode(reader, reader.uint32()));
          break;
        case 2:
          message.memo = reader.string();
          break;
        case 3:
          message.timeout_height = longToString(reader.uint64() as Long);
          break;
        case 1023:
          message.extension_options.push(Any.decode(reader, reader.uint32()));
          break;
        case 2047:
          message.non_critical_extension_options.push(
            Any.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxBody {
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Any.fromJSON(e))
        : [],
      memo: isSet(object.memo) ? String(object.memo) : "",
      timeout_height: isSet(object.timeout_height)
        ? String(object.timeout_height)
        : "0",
      extension_options: Array.isArray(object?.extension_options)
        ? object.extension_options.map((e: any) => Any.fromJSON(e))
        : [],
      non_critical_extension_options: Array.isArray(
        object?.non_critical_extension_options,
      )
        ? object.non_critical_extension_options.map((e: any) => Any.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TxBody): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Any.toJSON(e) : undefined,
      );
    } else {
      obj.messages = [];
    }
    message.memo !== undefined && (obj.memo = message.memo);
    message.timeout_height !== undefined &&
      (obj.timeout_height = message.timeout_height);
    if (message.extension_options) {
      obj.extension_options = message.extension_options.map((e) =>
        e ? Any.toJSON(e) : undefined,
      );
    } else {
      obj.extension_options = [];
    }
    if (message.non_critical_extension_options) {
      obj.non_critical_extension_options =
        message.non_critical_extension_options.map((e) =>
          e ? Any.toJSON(e) : undefined,
        );
    } else {
      obj.non_critical_extension_options = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TxBody>, I>>(object: I): TxBody {
    const message = createBaseTxBody();
    message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
    message.memo = object.memo ?? "";
    message.timeout_height = object.timeout_height ?? "0";
    message.extension_options =
      object.extension_options?.map((e) => Any.fromPartial(e)) || [];
    message.non_critical_extension_options =
      object.non_critical_extension_options?.map((e) => Any.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseAuthInfo(): AuthInfo {
  return { signer_infos: [], fee: undefined };
}

export const AuthInfo = {
  encode(
    message: AuthInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.signer_infos) {
      SignerInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signer_infos.push(SignerInfo.decode(reader, reader.uint32()));
          break;
        case 2:
          message.fee = Fee.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthInfo {
    return {
      signer_infos: Array.isArray(object?.signer_infos)
        ? object.signer_infos.map((e: any) => SignerInfo.fromJSON(e))
        : [],
      fee: isSet(object.fee) ? Fee.fromJSON(object.fee) : undefined,
    };
  },

  toJSON(message: AuthInfo): unknown {
    const obj: any = {};
    if (message.signer_infos) {
      obj.signer_infos = message.signer_infos.map((e) =>
        e ? SignerInfo.toJSON(e) : undefined,
      );
    } else {
      obj.signer_infos = [];
    }
    message.fee !== undefined &&
      (obj.fee = message.fee ? Fee.toJSON(message.fee) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthInfo>, I>>(object: I): AuthInfo {
    const message = createBaseAuthInfo();
    message.signer_infos =
      object.signer_infos?.map((e) => SignerInfo.fromPartial(e)) || [];
    message.fee =
      object.fee !== undefined && object.fee !== null
        ? Fee.fromPartial(object.fee)
        : undefined;
    return message;
  },
};

function createBaseSignerInfo(): SignerInfo {
  return { public_key: undefined, mode_info: undefined, sequence: "0" };
}

export const SignerInfo = {
  encode(
    message: SignerInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.public_key !== undefined) {
      Any.encode(message.public_key, writer.uint32(10).fork()).ldelim();
    }
    if (message.mode_info !== undefined) {
      ModeInfo.encode(message.mode_info, writer.uint32(18).fork()).ldelim();
    }
    if (message.sequence !== "0") {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignerInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignerInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.public_key = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.mode_info = ModeInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.sequence = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignerInfo {
    return {
      public_key: isSet(object.public_key)
        ? Any.fromJSON(object.public_key)
        : undefined,
      mode_info: isSet(object.mode_info)
        ? ModeInfo.fromJSON(object.mode_info)
        : undefined,
      sequence: isSet(object.sequence) ? String(object.sequence) : "0",
    };
  },

  toJSON(message: SignerInfo): unknown {
    const obj: any = {};
    message.public_key !== undefined &&
      (obj.public_key = message.public_key
        ? Any.toJSON(message.public_key)
        : undefined);
    message.mode_info !== undefined &&
      (obj.mode_info = message.mode_info
        ? ModeInfo.toJSON(message.mode_info)
        : undefined);
    message.sequence !== undefined && (obj.sequence = message.sequence);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignerInfo>, I>>(
    object: I,
  ): SignerInfo {
    const message = createBaseSignerInfo();
    message.public_key =
      object.public_key !== undefined && object.public_key !== null
        ? Any.fromPartial(object.public_key)
        : undefined;
    message.mode_info =
      object.mode_info !== undefined && object.mode_info !== null
        ? ModeInfo.fromPartial(object.mode_info)
        : undefined;
    message.sequence = object.sequence ?? "0";
    return message;
  },
};

function createBaseModeInfo(): ModeInfo {
  return { single: undefined, multi: undefined };
}

export const ModeInfo = {
  encode(
    message: ModeInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.single !== undefined) {
      ModeInfo_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
    }
    if (message.multi !== undefined) {
      ModeInfo_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.single = ModeInfo_Single.decode(reader, reader.uint32());
          break;
        case 2:
          message.multi = ModeInfo_Multi.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModeInfo {
    return {
      single: isSet(object.single)
        ? ModeInfo_Single.fromJSON(object.single)
        : undefined,
      multi: isSet(object.multi)
        ? ModeInfo_Multi.fromJSON(object.multi)
        : undefined,
    };
  },

  toJSON(message: ModeInfo): unknown {
    const obj: any = {};
    message.single !== undefined &&
      (obj.single = message.single
        ? ModeInfo_Single.toJSON(message.single)
        : undefined);
    message.multi !== undefined &&
      (obj.multi = message.multi
        ? ModeInfo_Multi.toJSON(message.multi)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModeInfo>, I>>(object: I): ModeInfo {
    const message = createBaseModeInfo();
    message.single =
      object.single !== undefined && object.single !== null
        ? ModeInfo_Single.fromPartial(object.single)
        : undefined;
    message.multi =
      object.multi !== undefined && object.multi !== null
        ? ModeInfo_Multi.fromPartial(object.multi)
        : undefined;
    return message;
  },
};

function createBaseModeInfo_Single(): ModeInfo_Single {
  return { mode: 0 };
}

export const ModeInfo_Single = {
  encode(
    message: ModeInfo_Single,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo_Single {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModeInfo_Single();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mode = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModeInfo_Single {
    return {
      mode: isSet(object.mode) ? signModeFromJSON(object.mode) : 0,
    };
  },

  toJSON(message: ModeInfo_Single): unknown {
    const obj: any = {};
    message.mode !== undefined && (obj.mode = signModeToJSON(message.mode));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModeInfo_Single>, I>>(
    object: I,
  ): ModeInfo_Single {
    const message = createBaseModeInfo_Single();
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseModeInfo_Multi(): ModeInfo_Multi {
  return { bitarray: undefined, mode_infos: [] };
}

export const ModeInfo_Multi = {
  encode(
    message: ModeInfo_Multi,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.bitarray !== undefined) {
      CompactBitArray.encode(
        message.bitarray,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    for (const v of message.mode_infos) {
      ModeInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo_Multi {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModeInfo_Multi();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bitarray = CompactBitArray.decode(reader, reader.uint32());
          break;
        case 2:
          message.mode_infos.push(ModeInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModeInfo_Multi {
    return {
      bitarray: isSet(object.bitarray)
        ? CompactBitArray.fromJSON(object.bitarray)
        : undefined,
      mode_infos: Array.isArray(object?.mode_infos)
        ? object.mode_infos.map((e: any) => ModeInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ModeInfo_Multi): unknown {
    const obj: any = {};
    message.bitarray !== undefined &&
      (obj.bitarray = message.bitarray
        ? CompactBitArray.toJSON(message.bitarray)
        : undefined);
    if (message.mode_infos) {
      obj.mode_infos = message.mode_infos.map((e) =>
        e ? ModeInfo.toJSON(e) : undefined,
      );
    } else {
      obj.mode_infos = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModeInfo_Multi>, I>>(
    object: I,
  ): ModeInfo_Multi {
    const message = createBaseModeInfo_Multi();
    message.bitarray =
      object.bitarray !== undefined && object.bitarray !== null
        ? CompactBitArray.fromPartial(object.bitarray)
        : undefined;
    message.mode_infos =
      object.mode_infos?.map((e) => ModeInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFee(): Fee {
  return { amount: [], gas_limit: "0", payer: "", granter: "" };
}

export const Fee = {
  encode(message: Fee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.gas_limit !== "0") {
      writer.uint32(16).uint64(message.gas_limit);
    }
    if (message.payer !== "") {
      writer.uint32(26).string(message.payer);
    }
    if (message.granter !== "") {
      writer.uint32(34).string(message.granter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.gas_limit = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.payer = reader.string();
          break;
        case 4:
          message.granter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Fee {
    return {
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
      gas_limit: isSet(object.gas_limit) ? String(object.gas_limit) : "0",
      payer: isSet(object.payer) ? String(object.payer) : "",
      granter: isSet(object.granter) ? String(object.granter) : "",
    };
  },

  toJSON(message: Fee): unknown {
    const obj: any = {};
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    message.gas_limit !== undefined && (obj.gas_limit = message.gas_limit);
    message.payer !== undefined && (obj.payer = message.payer);
    message.granter !== undefined && (obj.granter = message.granter);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Fee>, I>>(object: I): Fee {
    const message = createBaseFee();
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.gas_limit = object.gas_limit ?? "0";
    message.payer = object.payer ?? "";
    message.granter = object.granter ?? "";
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
