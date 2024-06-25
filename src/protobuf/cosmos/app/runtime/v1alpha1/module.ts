/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.app.runtime.v1alpha1";

/** Module is the config object for the runtime module. */
export interface Module {
  /** app_name is the name of the app. */
  app_name: string;
  /**
   * begin_blockers specifies the module names of begin blockers
   * to call in the order in which they should be called. If this is left empty
   * no begin blocker will be registered.
   */
  begin_blockers: string[];
  /**
   * end_blockers specifies the module names of the end blockers
   * to call in the order in which they should be called. If this is left empty
   * no end blocker will be registered.
   */
  end_blockers: string[];
  /**
   * init_genesis specifies the module names of init genesis functions
   * to call in the order in which they should be called. If this is left empty
   * no init genesis function will be registered.
   */
  init_genesis: string[];
  /**
   * export_genesis specifies the order in which to export module genesis data.
   * If this is left empty, the init_genesis order will be used for export genesis
   * if it is specified.
   */
  export_genesis: string[];
  /**
   * override_store_keys is an optional list of overrides for the module store keys
   * to be used in keeper construction.
   */
  override_store_keys: StoreKeyConfig[];
  /**
   * order_migrations defines the order in which module migrations are performed.
   * If this is left empty, it uses the default migration order.
   * https://pkg.go.dev/github.com/cosmos/cosmos-sdk@v0.47.0-alpha2/types/module#DefaultMigrationsOrder
   */
  order_migrations: string[];
  /**
   * precommiters specifies the module names of the precommiters
   * to call in the order in which they should be called. If this is left empty
   * no precommit function will be registered.
   */
  precommiters: string[];
  /**
   * prepare_check_staters specifies the module names of the prepare_check_staters
   * to call in the order in which they should be called. If this is left empty
   * no preparecheckstate function will be registered.
   */
  prepare_check_staters: string[];
}

/**
 * StoreKeyConfig may be supplied to override the default module store key, which
 * is the module name.
 */
export interface StoreKeyConfig {
  /** name of the module to override the store key of */
  module_name: string;
  /** the kv store key to use instead of the module name. */
  kv_store_key: string;
}

function createBaseModule(): Module {
  return {
    app_name: "",
    begin_blockers: [],
    end_blockers: [],
    init_genesis: [],
    export_genesis: [],
    override_store_keys: [],
    order_migrations: [],
    precommiters: [],
    prepare_check_staters: [],
  };
}

export const Module = {
  encode(
    message: Module,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.app_name !== "") {
      writer.uint32(10).string(message.app_name);
    }
    for (const v of message.begin_blockers) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.end_blockers) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.init_genesis) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.export_genesis) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.override_store_keys) {
      StoreKeyConfig.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.order_migrations) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.precommiters) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.prepare_check_staters) {
      writer.uint32(74).string(v!);
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
          message.app_name = reader.string();
          break;
        case 2:
          message.begin_blockers.push(reader.string());
          break;
        case 3:
          message.end_blockers.push(reader.string());
          break;
        case 4:
          message.init_genesis.push(reader.string());
          break;
        case 5:
          message.export_genesis.push(reader.string());
          break;
        case 6:
          message.override_store_keys.push(
            StoreKeyConfig.decode(reader, reader.uint32()),
          );
          break;
        case 7:
          message.order_migrations.push(reader.string());
          break;
        case 8:
          message.precommiters.push(reader.string());
          break;
        case 9:
          message.prepare_check_staters.push(reader.string());
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
      app_name: isSet(object.app_name) ? String(object.app_name) : "",
      begin_blockers: Array.isArray(object?.begin_blockers)
        ? object.begin_blockers.map((e: any) => String(e))
        : [],
      end_blockers: Array.isArray(object?.end_blockers)
        ? object.end_blockers.map((e: any) => String(e))
        : [],
      init_genesis: Array.isArray(object?.init_genesis)
        ? object.init_genesis.map((e: any) => String(e))
        : [],
      export_genesis: Array.isArray(object?.export_genesis)
        ? object.export_genesis.map((e: any) => String(e))
        : [],
      override_store_keys: Array.isArray(object?.override_store_keys)
        ? object.override_store_keys.map((e: any) => StoreKeyConfig.fromJSON(e))
        : [],
      order_migrations: Array.isArray(object?.order_migrations)
        ? object.order_migrations.map((e: any) => String(e))
        : [],
      precommiters: Array.isArray(object?.precommiters)
        ? object.precommiters.map((e: any) => String(e))
        : [],
      prepare_check_staters: Array.isArray(object?.prepare_check_staters)
        ? object.prepare_check_staters.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: Module): unknown {
    const obj: any = {};
    message.app_name !== undefined && (obj.app_name = message.app_name);
    if (message.begin_blockers) {
      obj.begin_blockers = message.begin_blockers.map((e) => e);
    } else {
      obj.begin_blockers = [];
    }
    if (message.end_blockers) {
      obj.end_blockers = message.end_blockers.map((e) => e);
    } else {
      obj.end_blockers = [];
    }
    if (message.init_genesis) {
      obj.init_genesis = message.init_genesis.map((e) => e);
    } else {
      obj.init_genesis = [];
    }
    if (message.export_genesis) {
      obj.export_genesis = message.export_genesis.map((e) => e);
    } else {
      obj.export_genesis = [];
    }
    if (message.override_store_keys) {
      obj.override_store_keys = message.override_store_keys.map((e) =>
        e ? StoreKeyConfig.toJSON(e) : undefined,
      );
    } else {
      obj.override_store_keys = [];
    }
    if (message.order_migrations) {
      obj.order_migrations = message.order_migrations.map((e) => e);
    } else {
      obj.order_migrations = [];
    }
    if (message.precommiters) {
      obj.precommiters = message.precommiters.map((e) => e);
    } else {
      obj.precommiters = [];
    }
    if (message.prepare_check_staters) {
      obj.prepare_check_staters = message.prepare_check_staters.map((e) => e);
    } else {
      obj.prepare_check_staters = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Module>): Module {
    const message = createBaseModule();
    message.app_name = object.app_name ?? "";
    message.begin_blockers = object.begin_blockers?.map((e) => e) || [];
    message.end_blockers = object.end_blockers?.map((e) => e) || [];
    message.init_genesis = object.init_genesis?.map((e) => e) || [];
    message.export_genesis = object.export_genesis?.map((e) => e) || [];
    message.override_store_keys =
      object.override_store_keys?.map((e) => StoreKeyConfig.fromPartial(e)) ||
      [];
    message.order_migrations = object.order_migrations?.map((e) => e) || [];
    message.precommiters = object.precommiters?.map((e) => e) || [];
    message.prepare_check_staters =
      object.prepare_check_staters?.map((e) => e) || [];
    return message;
  },
};

function createBaseStoreKeyConfig(): StoreKeyConfig {
  return { module_name: "", kv_store_key: "" };
}

export const StoreKeyConfig = {
  encode(
    message: StoreKeyConfig,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.module_name !== "") {
      writer.uint32(10).string(message.module_name);
    }
    if (message.kv_store_key !== "") {
      writer.uint32(18).string(message.kv_store_key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreKeyConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreKeyConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.module_name = reader.string();
          break;
        case 2:
          message.kv_store_key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoreKeyConfig {
    return {
      module_name: isSet(object.module_name) ? String(object.module_name) : "",
      kv_store_key: isSet(object.kv_store_key)
        ? String(object.kv_store_key)
        : "",
    };
  },

  toJSON(message: StoreKeyConfig): unknown {
    const obj: any = {};
    message.module_name !== undefined &&
      (obj.module_name = message.module_name);
    message.kv_store_key !== undefined &&
      (obj.kv_store_key = message.kv_store_key);
    return obj;
  },

  fromPartial(object: DeepPartial<StoreKeyConfig>): StoreKeyConfig {
    const message = createBaseStoreKeyConfig();
    message.module_name = object.module_name ?? "";
    message.kv_store_key = object.kv_store_key ?? "";
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
