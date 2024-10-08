// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               v5.28.1
// source: cosmos/bank/module/v1/module.proto

/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.bank.module.v1";

/** Module is the config object of the bank module. */
export interface Module {
  /**
   * blocked_module_accounts_override configures exceptional module accounts which should be blocked from receiving
   * funds. If left empty it defaults to the list of account names supplied in the auth module configuration as
   * module_account_permissions
   */
  blocked_module_accounts_override: string[];
  /** authority defines the custom module authority. If not set, defaults to the governance module. */
  authority: string;
}

function createBaseModule(): Module {
  return { blocked_module_accounts_override: [], authority: "" };
}

export const Module = {
  encode(message: Module, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.blocked_module_accounts_override) {
      writer.uint32(10).string(v!);
    }
    if (message.authority !== "") {
      writer.uint32(18).string(message.authority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Module {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.blocked_module_accounts_override.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authority = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Module {
    return {
      blocked_module_accounts_override: globalThis.Array.isArray(object?.blocked_module_accounts_override)
        ? object.blocked_module_accounts_override.map((e: any) => globalThis.String(e))
        : [],
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
    };
  },

  toJSON(message: Module): unknown {
    const obj: any = {};
    if (message.blocked_module_accounts_override?.length) {
      obj.blocked_module_accounts_override = message.blocked_module_accounts_override;
    }
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    return obj;
  },

  create(base?: DeepPartial<Module>): Module {
    return Module.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Module>): Module {
    const message = createBaseModule();
    message.blocked_module_accounts_override = object.blocked_module_accounts_override?.map((e) => e) || [];
    message.authority = object.authority ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}