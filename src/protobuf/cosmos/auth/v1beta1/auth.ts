/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "cosmos.auth.v1beta1";

/**
 * BaseAccount defines a base account type. It contains all the necessary fields
 * for basic account functionality. Any custom account type should extend this
 * type for additional functionality (e.g. vesting).
 */
export interface BaseAccount {
  address: string;
  pub_key?: Any;
  account_number: string;
  sequence: string;
}

/** ModuleAccount defines an account for modules that holds coins on a pool. */
export interface ModuleAccount {
  base_account?: BaseAccount;
  name: string;
  permissions: string[];
}

/** Params defines the parameters for the auth module. */
export interface Params {
  max_memo_characters: string;
  tx_sig_limit: string;
  tx_size_cost_per_byte: string;
  sig_verify_cost_ed25519: string;
  sig_verify_cost_secp256k1: string;
}

function createBaseBaseAccount(): BaseAccount {
  return {
    address: "",
    pub_key: undefined,
    account_number: "0",
    sequence: "0",
  };
}

export const BaseAccount = {
  encode(
    message: BaseAccount,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pub_key !== undefined) {
      Any.encode(message.pub_key, writer.uint32(18).fork()).ldelim();
    }
    if (message.account_number !== "0") {
      writer.uint32(24).uint64(message.account_number);
    }
    if (message.sequence !== "0") {
      writer.uint32(32).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pub_key = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.account_number = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.sequence = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseAccount {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pub_key: isSet(object.pub_key) ? Any.fromJSON(object.pub_key) : undefined,
      account_number: isSet(object.account_number)
        ? String(object.account_number)
        : "0",
      sequence: isSet(object.sequence) ? String(object.sequence) : "0",
    };
  },

  toJSON(message: BaseAccount): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.pub_key !== undefined &&
      (obj.pub_key = message.pub_key ? Any.toJSON(message.pub_key) : undefined);
    message.account_number !== undefined &&
      (obj.account_number = message.account_number);
    message.sequence !== undefined && (obj.sequence = message.sequence);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseAccount>, I>>(
    object: I,
  ): BaseAccount {
    const message = createBaseBaseAccount();
    message.address = object.address ?? "";
    message.pub_key =
      object.pub_key !== undefined && object.pub_key !== null
        ? Any.fromPartial(object.pub_key)
        : undefined;
    message.account_number = object.account_number ?? "0";
    message.sequence = object.sequence ?? "0";
    return message;
  },
};

function createBaseModuleAccount(): ModuleAccount {
  return { base_account: undefined, name: "", permissions: [] };
}

export const ModuleAccount = {
  encode(
    message: ModuleAccount,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.base_account !== undefined) {
      BaseAccount.encode(
        message.base_account,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    for (const v of message.permissions) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.base_account = BaseAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.permissions.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModuleAccount {
    return {
      base_account: isSet(object.base_account)
        ? BaseAccount.fromJSON(object.base_account)
        : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      permissions: Array.isArray(object?.permissions)
        ? object.permissions.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ModuleAccount): unknown {
    const obj: any = {};
    message.base_account !== undefined &&
      (obj.base_account = message.base_account
        ? BaseAccount.toJSON(message.base_account)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    if (message.permissions) {
      obj.permissions = message.permissions.map((e) => e);
    } else {
      obj.permissions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModuleAccount>, I>>(
    object: I,
  ): ModuleAccount {
    const message = createBaseModuleAccount();
    message.base_account =
      object.base_account !== undefined && object.base_account !== null
        ? BaseAccount.fromPartial(object.base_account)
        : undefined;
    message.name = object.name ?? "";
    message.permissions = object.permissions?.map((e) => e) || [];
    return message;
  },
};

function createBaseParams(): Params {
  return {
    max_memo_characters: "0",
    tx_sig_limit: "0",
    tx_size_cost_per_byte: "0",
    sig_verify_cost_ed25519: "0",
    sig_verify_cost_secp256k1: "0",
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.max_memo_characters !== "0") {
      writer.uint32(8).uint64(message.max_memo_characters);
    }
    if (message.tx_sig_limit !== "0") {
      writer.uint32(16).uint64(message.tx_sig_limit);
    }
    if (message.tx_size_cost_per_byte !== "0") {
      writer.uint32(24).uint64(message.tx_size_cost_per_byte);
    }
    if (message.sig_verify_cost_ed25519 !== "0") {
      writer.uint32(32).uint64(message.sig_verify_cost_ed25519);
    }
    if (message.sig_verify_cost_secp256k1 !== "0") {
      writer.uint32(40).uint64(message.sig_verify_cost_secp256k1);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.max_memo_characters = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.tx_sig_limit = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.tx_size_cost_per_byte = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.sig_verify_cost_ed25519 = longToString(
            reader.uint64() as Long,
          );
          break;
        case 5:
          message.sig_verify_cost_secp256k1 = longToString(
            reader.uint64() as Long,
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      max_memo_characters: isSet(object.max_memo_characters)
        ? String(object.max_memo_characters)
        : "0",
      tx_sig_limit: isSet(object.tx_sig_limit)
        ? String(object.tx_sig_limit)
        : "0",
      tx_size_cost_per_byte: isSet(object.tx_size_cost_per_byte)
        ? String(object.tx_size_cost_per_byte)
        : "0",
      sig_verify_cost_ed25519: isSet(object.sig_verify_cost_ed25519)
        ? String(object.sig_verify_cost_ed25519)
        : "0",
      sig_verify_cost_secp256k1: isSet(object.sig_verify_cost_secp256k1)
        ? String(object.sig_verify_cost_secp256k1)
        : "0",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.max_memo_characters !== undefined &&
      (obj.max_memo_characters = message.max_memo_characters);
    message.tx_sig_limit !== undefined &&
      (obj.tx_sig_limit = message.tx_sig_limit);
    message.tx_size_cost_per_byte !== undefined &&
      (obj.tx_size_cost_per_byte = message.tx_size_cost_per_byte);
    message.sig_verify_cost_ed25519 !== undefined &&
      (obj.sig_verify_cost_ed25519 = message.sig_verify_cost_ed25519);
    message.sig_verify_cost_secp256k1 !== undefined &&
      (obj.sig_verify_cost_secp256k1 = message.sig_verify_cost_secp256k1);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.max_memo_characters = object.max_memo_characters ?? "0";
    message.tx_sig_limit = object.tx_sig_limit ?? "0";
    message.tx_size_cost_per_byte = object.tx_size_cost_per_byte ?? "0";
    message.sig_verify_cost_ed25519 = object.sig_verify_cost_ed25519 ?? "0";
    message.sig_verify_cost_secp256k1 = object.sig_verify_cost_secp256k1 ?? "0";
    return message;
  },
};

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
