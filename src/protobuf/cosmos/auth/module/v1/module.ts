/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.auth.module.v1";

/** Module is the config object for the auth module. */
export interface Module {
  /** bech32_prefix is the bech32 account prefix for the app. */
  bech32_prefix: string;
  /** module_account_permissions are module account permissions. */
  module_account_permissions: ModuleAccountPermission[];
  /** authority defines the custom module authority. If not set, defaults to the governance module. */
  authority: string;
}

/** ModuleAccountPermission represents permissions for a module account. */
export interface ModuleAccountPermission {
  /** account is the name of the module. */
  account: string;
  /**
   * permissions are the permissions this module has. Currently recognized
   * values are minter, burner and staking.
   */
  permissions: string[];
}

function createBaseModule(): Module {
  return { bech32_prefix: "", module_account_permissions: [], authority: "" };
}

export const Module = {
  encode(
    message: Module,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.bech32_prefix !== "") {
      writer.uint32(10).string(message.bech32_prefix);
    }
    for (const v of message.module_account_permissions) {
      ModuleAccountPermission.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.authority !== "") {
      writer.uint32(26).string(message.authority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Module {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bech32_prefix = reader.string();
          break;
        case 2:
          message.module_account_permissions.push(
            ModuleAccountPermission.decode(reader, reader.uint32()),
          );
          break;
        case 3:
          message.authority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Module {
    return {
      bech32_prefix: isSet(object.bech32_prefix)
        ? String(object.bech32_prefix)
        : "",
      module_account_permissions: Array.isArray(
        object?.module_account_permissions,
      )
        ? object.module_account_permissions.map((e: any) =>
            ModuleAccountPermission.fromJSON(e),
          )
        : [],
      authority: isSet(object.authority) ? String(object.authority) : "",
    };
  },

  toJSON(message: Module): unknown {
    const obj: any = {};
    message.bech32_prefix !== undefined &&
      (obj.bech32_prefix = message.bech32_prefix);
    if (message.module_account_permissions) {
      obj.module_account_permissions = message.module_account_permissions.map(
        (e) => (e ? ModuleAccountPermission.toJSON(e) : undefined),
      );
    } else {
      obj.module_account_permissions = [];
    }
    message.authority !== undefined && (obj.authority = message.authority);
    return obj;
  },

  fromPartial(object: DeepPartial<Module>): Module {
    const message = createBaseModule();
    message.bech32_prefix = object.bech32_prefix ?? "";
    message.module_account_permissions =
      object.module_account_permissions?.map((e) =>
        ModuleAccountPermission.fromPartial(e),
      ) || [];
    message.authority = object.authority ?? "";
    return message;
  },
};

function createBaseModuleAccountPermission(): ModuleAccountPermission {
  return { account: "", permissions: [] };
}

export const ModuleAccountPermission = {
  encode(
    message: ModuleAccountPermission,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    for (const v of message.permissions) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ModuleAccountPermission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleAccountPermission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.permissions.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModuleAccountPermission {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      permissions: Array.isArray(object?.permissions)
        ? object.permissions.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ModuleAccountPermission): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    if (message.permissions) {
      obj.permissions = message.permissions.map((e) => e);
    } else {
      obj.permissions = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ModuleAccountPermission>,
  ): ModuleAccountPermission {
    const message = createBaseModuleAccountPermission();
    message.account = object.account ?? "";
    message.permissions = object.permissions?.map((e) => e) || [];
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
