/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.autocli.v1";

/** ModuleOptions describes the CLI options for a Cosmos SDK module. */
export interface ModuleOptions {
  /** tx describes the tx commands for the module. */
  tx?: ServiceCommandDescriptor;
  /** query describes the queries commands for the module. */
  query?: ServiceCommandDescriptor;
}

/** ServiceCommandDescriptor describes a CLI command based on a protobuf service. */
export interface ServiceCommandDescriptor {
  /**
   * service is the fully qualified name of the protobuf service to build
   * the command from. It can be left empty if sub_commands are used instead
   * which may be the case if a module provides multiple tx and/or query services.
   */
  service: string;
  /**
   * rpc_command_options are options for commands generated from rpc methods.
   * If no options are specified for a given rpc method on the service, a
   * command will be generated for that method with the default options.
   */
  rpc_command_options: RpcCommandOptions[];
  /**
   * sub_commands is a map of optional sub-commands for this command based on
   * different protobuf services. The map key is used as the name of the
   * sub-command.
   */
  sub_commands: { [key: string]: ServiceCommandDescriptor };
}

export interface ServiceCommandDescriptor_SubCommandsEntry {
  key: string;
  value?: ServiceCommandDescriptor;
}

/**
 * RpcCommandOptions specifies options for commands generated from protobuf
 * rpc methods.
 */
export interface RpcCommandOptions {
  /**
   * rpc_method is short name of the protobuf rpc method that this command is
   * generated from.
   */
  rpc_method: string;
  /**
   * use is the one-line usage method. It also allows specifying an alternate
   * name for the command as the first word of the usage text.
   *
   * By default the name of an rpc command is the kebab-case short name of the
   * rpc method.
   */
  use: string;
  /** long is the long message shown in the 'help <this-command>' output. */
  long: string;
  /** short is the short description shown in the 'help' output. */
  short: string;
  /** example is examples of how to use the command. */
  example: string;
  /** alias is an array of aliases that can be used instead of the first word in Use. */
  alias: string[];
  /**
   * suggest_for is an array of command names for which this command will be suggested -
   * similar to aliases but only suggests.
   */
  suggest_for: string[];
  /** deprecated defines, if this command is deprecated and should print this string when used. */
  deprecated: string;
  /**
   * version defines the version for this command. If this value is non-empty and the command does not
   * define a "version" flag, a "version" boolean flag will be added to the command and, if specified,
   * will print content of the "Version" variable. A shorthand "v" flag will also be added if the
   * command does not define one.
   */
  version: string;
  /**
   * flag_options are options for flags generated from rpc request fields.
   * By default all request fields are configured as flags. They can
   * also be configured as positional args instead using positional_args.
   */
  flag_options: { [key: string]: FlagOptions };
  /** positional_args specifies positional arguments for the command. */
  positional_args: PositionalArgDescriptor[];
  /** skip specifies whether to skip this rpc method when generating commands. */
  skip: boolean;
}

export interface RpcCommandOptions_FlagOptionsEntry {
  key: string;
  value?: FlagOptions;
}

/**
 * FlagOptions are options for flags generated from rpc request fields.
 * By default, all request fields are configured as flags based on the
 * kebab-case name of the field. Fields can be turned into positional arguments
 * instead by using RpcCommandOptions.positional_args.
 */
export interface FlagOptions {
  /** name is an alternate name to use for the field flag. */
  name: string;
  /** shorthand is a one-letter abbreviated flag. */
  shorthand: string;
  /** usage is the help message. */
  usage: string;
  /** default_value is the default value as text. */
  default_value: string;
  /** deprecated is the usage text to show if this flag is deprecated. */
  deprecated: string;
  /** shorthand_deprecated is the usage text to show if the shorthand of this flag is deprecated. */
  shorthand_deprecated: string;
  /** hidden hides the flag from help/usage text */
  hidden: boolean;
}

/** PositionalArgDescriptor describes a positional argument. */
export interface PositionalArgDescriptor {
  /**
   * proto_field specifies the proto field to use as the positional arg. Any
   * fields used as positional args will not have a flag generated.
   */
  proto_field: string;
  /**
   * varargs makes a positional parameter a varargs parameter. This can only be
   * applied to last positional parameter and the proto_field must a repeated
   * field.
   */
  varargs: boolean;
}

function createBaseModuleOptions(): ModuleOptions {
  return { tx: undefined, query: undefined };
}

export const ModuleOptions = {
  encode(
    message: ModuleOptions,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.tx !== undefined) {
      ServiceCommandDescriptor.encode(
        message.tx,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.query !== undefined) {
      ServiceCommandDescriptor.encode(
        message.query,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = ServiceCommandDescriptor.decode(reader, reader.uint32());
          break;
        case 2:
          message.query = ServiceCommandDescriptor.decode(
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

  fromJSON(object: any): ModuleOptions {
    return {
      tx: isSet(object.tx)
        ? ServiceCommandDescriptor.fromJSON(object.tx)
        : undefined,
      query: isSet(object.query)
        ? ServiceCommandDescriptor.fromJSON(object.query)
        : undefined,
    };
  },

  toJSON(message: ModuleOptions): unknown {
    const obj: any = {};
    message.tx !== undefined &&
      (obj.tx = message.tx
        ? ServiceCommandDescriptor.toJSON(message.tx)
        : undefined);
    message.query !== undefined &&
      (obj.query = message.query
        ? ServiceCommandDescriptor.toJSON(message.query)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ModuleOptions>): ModuleOptions {
    const message = createBaseModuleOptions();
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? ServiceCommandDescriptor.fromPartial(object.tx)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? ServiceCommandDescriptor.fromPartial(object.query)
        : undefined;
    return message;
  },
};

function createBaseServiceCommandDescriptor(): ServiceCommandDescriptor {
  return { service: "", rpc_command_options: [], sub_commands: {} };
}

export const ServiceCommandDescriptor = {
  encode(
    message: ServiceCommandDescriptor,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.service !== "") {
      writer.uint32(10).string(message.service);
    }
    for (const v of message.rpc_command_options) {
      RpcCommandOptions.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    Object.entries(message.sub_commands).forEach(([key, value]) => {
      ServiceCommandDescriptor_SubCommandsEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ServiceCommandDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceCommandDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.service = reader.string();
          break;
        case 2:
          message.rpc_command_options.push(
            RpcCommandOptions.decode(reader, reader.uint32()),
          );
          break;
        case 3:
          const entry3 = ServiceCommandDescriptor_SubCommandsEntry.decode(
            reader,
            reader.uint32(),
          );
          if (entry3.value !== undefined) {
            message.sub_commands[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceCommandDescriptor {
    return {
      service: isSet(object.service) ? String(object.service) : "",
      rpc_command_options: Array.isArray(object?.rpc_command_options)
        ? object.rpc_command_options.map((e: any) =>
            RpcCommandOptions.fromJSON(e),
          )
        : [],
      sub_commands: isObject(object.sub_commands)
        ? Object.entries(object.sub_commands).reduce<{
            [key: string]: ServiceCommandDescriptor;
          }>((acc, [key, value]) => {
            acc[key] = ServiceCommandDescriptor.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: ServiceCommandDescriptor): unknown {
    const obj: any = {};
    message.service !== undefined && (obj.service = message.service);
    if (message.rpc_command_options) {
      obj.rpc_command_options = message.rpc_command_options.map((e) =>
        e ? RpcCommandOptions.toJSON(e) : undefined,
      );
    } else {
      obj.rpc_command_options = [];
    }
    obj.sub_commands = {};
    if (message.sub_commands) {
      Object.entries(message.sub_commands).forEach(([k, v]) => {
        obj.sub_commands[k] = ServiceCommandDescriptor.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ServiceCommandDescriptor>,
  ): ServiceCommandDescriptor {
    const message = createBaseServiceCommandDescriptor();
    message.service = object.service ?? "";
    message.rpc_command_options =
      object.rpc_command_options?.map((e) =>
        RpcCommandOptions.fromPartial(e),
      ) || [];
    message.sub_commands = Object.entries(object.sub_commands ?? {}).reduce<{
      [key: string]: ServiceCommandDescriptor;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = ServiceCommandDescriptor.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseServiceCommandDescriptor_SubCommandsEntry(): ServiceCommandDescriptor_SubCommandsEntry {
  return { key: "", value: undefined };
}

export const ServiceCommandDescriptor_SubCommandsEntry = {
  encode(
    message: ServiceCommandDescriptor_SubCommandsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      ServiceCommandDescriptor.encode(
        message.value,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ServiceCommandDescriptor_SubCommandsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceCommandDescriptor_SubCommandsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = ServiceCommandDescriptor.decode(
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

  fromJSON(object: any): ServiceCommandDescriptor_SubCommandsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? ServiceCommandDescriptor.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: ServiceCommandDescriptor_SubCommandsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? ServiceCommandDescriptor.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ServiceCommandDescriptor_SubCommandsEntry>,
  ): ServiceCommandDescriptor_SubCommandsEntry {
    const message = createBaseServiceCommandDescriptor_SubCommandsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? ServiceCommandDescriptor.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseRpcCommandOptions(): RpcCommandOptions {
  return {
    rpc_method: "",
    use: "",
    long: "",
    short: "",
    example: "",
    alias: [],
    suggest_for: [],
    deprecated: "",
    version: "",
    flag_options: {},
    positional_args: [],
    skip: false,
  };
}

export const RpcCommandOptions = {
  encode(
    message: RpcCommandOptions,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.rpc_method !== "") {
      writer.uint32(10).string(message.rpc_method);
    }
    if (message.use !== "") {
      writer.uint32(18).string(message.use);
    }
    if (message.long !== "") {
      writer.uint32(26).string(message.long);
    }
    if (message.short !== "") {
      writer.uint32(34).string(message.short);
    }
    if (message.example !== "") {
      writer.uint32(42).string(message.example);
    }
    for (const v of message.alias) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.suggest_for) {
      writer.uint32(58).string(v!);
    }
    if (message.deprecated !== "") {
      writer.uint32(66).string(message.deprecated);
    }
    if (message.version !== "") {
      writer.uint32(74).string(message.version);
    }
    Object.entries(message.flag_options).forEach(([key, value]) => {
      RpcCommandOptions_FlagOptionsEntry.encode(
        { key: key as any, value },
        writer.uint32(82).fork(),
      ).ldelim();
    });
    for (const v of message.positional_args) {
      PositionalArgDescriptor.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.skip === true) {
      writer.uint32(96).bool(message.skip);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RpcCommandOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRpcCommandOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rpc_method = reader.string();
          break;
        case 2:
          message.use = reader.string();
          break;
        case 3:
          message.long = reader.string();
          break;
        case 4:
          message.short = reader.string();
          break;
        case 5:
          message.example = reader.string();
          break;
        case 6:
          message.alias.push(reader.string());
          break;
        case 7:
          message.suggest_for.push(reader.string());
          break;
        case 8:
          message.deprecated = reader.string();
          break;
        case 9:
          message.version = reader.string();
          break;
        case 10:
          const entry10 = RpcCommandOptions_FlagOptionsEntry.decode(
            reader,
            reader.uint32(),
          );
          if (entry10.value !== undefined) {
            message.flag_options[entry10.key] = entry10.value;
          }
          break;
        case 11:
          message.positional_args.push(
            PositionalArgDescriptor.decode(reader, reader.uint32()),
          );
          break;
        case 12:
          message.skip = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RpcCommandOptions {
    return {
      rpc_method: isSet(object.rpc_method) ? String(object.rpc_method) : "",
      use: isSet(object.use) ? String(object.use) : "",
      long: isSet(object.long) ? String(object.long) : "",
      short: isSet(object.short) ? String(object.short) : "",
      example: isSet(object.example) ? String(object.example) : "",
      alias: Array.isArray(object?.alias)
        ? object.alias.map((e: any) => String(e))
        : [],
      suggest_for: Array.isArray(object?.suggest_for)
        ? object.suggest_for.map((e: any) => String(e))
        : [],
      deprecated: isSet(object.deprecated) ? String(object.deprecated) : "",
      version: isSet(object.version) ? String(object.version) : "",
      flag_options: isObject(object.flag_options)
        ? Object.entries(object.flag_options).reduce<{
            [key: string]: FlagOptions;
          }>((acc, [key, value]) => {
            acc[key] = FlagOptions.fromJSON(value);
            return acc;
          }, {})
        : {},
      positional_args: Array.isArray(object?.positional_args)
        ? object.positional_args.map((e: any) =>
            PositionalArgDescriptor.fromJSON(e),
          )
        : [],
      skip: isSet(object.skip) ? Boolean(object.skip) : false,
    };
  },

  toJSON(message: RpcCommandOptions): unknown {
    const obj: any = {};
    message.rpc_method !== undefined && (obj.rpc_method = message.rpc_method);
    message.use !== undefined && (obj.use = message.use);
    message.long !== undefined && (obj.long = message.long);
    message.short !== undefined && (obj.short = message.short);
    message.example !== undefined && (obj.example = message.example);
    if (message.alias) {
      obj.alias = message.alias.map((e) => e);
    } else {
      obj.alias = [];
    }
    if (message.suggest_for) {
      obj.suggest_for = message.suggest_for.map((e) => e);
    } else {
      obj.suggest_for = [];
    }
    message.deprecated !== undefined && (obj.deprecated = message.deprecated);
    message.version !== undefined && (obj.version = message.version);
    obj.flag_options = {};
    if (message.flag_options) {
      Object.entries(message.flag_options).forEach(([k, v]) => {
        obj.flag_options[k] = FlagOptions.toJSON(v);
      });
    }
    if (message.positional_args) {
      obj.positional_args = message.positional_args.map((e) =>
        e ? PositionalArgDescriptor.toJSON(e) : undefined,
      );
    } else {
      obj.positional_args = [];
    }
    message.skip !== undefined && (obj.skip = message.skip);
    return obj;
  },

  fromPartial(object: DeepPartial<RpcCommandOptions>): RpcCommandOptions {
    const message = createBaseRpcCommandOptions();
    message.rpc_method = object.rpc_method ?? "";
    message.use = object.use ?? "";
    message.long = object.long ?? "";
    message.short = object.short ?? "";
    message.example = object.example ?? "";
    message.alias = object.alias?.map((e) => e) || [];
    message.suggest_for = object.suggest_for?.map((e) => e) || [];
    message.deprecated = object.deprecated ?? "";
    message.version = object.version ?? "";
    message.flag_options = Object.entries(object.flag_options ?? {}).reduce<{
      [key: string]: FlagOptions;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = FlagOptions.fromPartial(value);
      }
      return acc;
    }, {});
    message.positional_args =
      object.positional_args?.map((e) =>
        PositionalArgDescriptor.fromPartial(e),
      ) || [];
    message.skip = object.skip ?? false;
    return message;
  },
};

function createBaseRpcCommandOptions_FlagOptionsEntry(): RpcCommandOptions_FlagOptionsEntry {
  return { key: "", value: undefined };
}

export const RpcCommandOptions_FlagOptionsEntry = {
  encode(
    message: RpcCommandOptions_FlagOptionsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      FlagOptions.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RpcCommandOptions_FlagOptionsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRpcCommandOptions_FlagOptionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = FlagOptions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RpcCommandOptions_FlagOptionsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? FlagOptions.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: RpcCommandOptions_FlagOptionsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? FlagOptions.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<RpcCommandOptions_FlagOptionsEntry>,
  ): RpcCommandOptions_FlagOptionsEntry {
    const message = createBaseRpcCommandOptions_FlagOptionsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? FlagOptions.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseFlagOptions(): FlagOptions {
  return {
    name: "",
    shorthand: "",
    usage: "",
    default_value: "",
    deprecated: "",
    shorthand_deprecated: "",
    hidden: false,
  };
}

export const FlagOptions = {
  encode(
    message: FlagOptions,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.shorthand !== "") {
      writer.uint32(18).string(message.shorthand);
    }
    if (message.usage !== "") {
      writer.uint32(26).string(message.usage);
    }
    if (message.default_value !== "") {
      writer.uint32(34).string(message.default_value);
    }
    if (message.deprecated !== "") {
      writer.uint32(50).string(message.deprecated);
    }
    if (message.shorthand_deprecated !== "") {
      writer.uint32(58).string(message.shorthand_deprecated);
    }
    if (message.hidden === true) {
      writer.uint32(64).bool(message.hidden);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FlagOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlagOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.shorthand = reader.string();
          break;
        case 3:
          message.usage = reader.string();
          break;
        case 4:
          message.default_value = reader.string();
          break;
        case 6:
          message.deprecated = reader.string();
          break;
        case 7:
          message.shorthand_deprecated = reader.string();
          break;
        case 8:
          message.hidden = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FlagOptions {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      shorthand: isSet(object.shorthand) ? String(object.shorthand) : "",
      usage: isSet(object.usage) ? String(object.usage) : "",
      default_value: isSet(object.default_value)
        ? String(object.default_value)
        : "",
      deprecated: isSet(object.deprecated) ? String(object.deprecated) : "",
      shorthand_deprecated: isSet(object.shorthand_deprecated)
        ? String(object.shorthand_deprecated)
        : "",
      hidden: isSet(object.hidden) ? Boolean(object.hidden) : false,
    };
  },

  toJSON(message: FlagOptions): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.shorthand !== undefined && (obj.shorthand = message.shorthand);
    message.usage !== undefined && (obj.usage = message.usage);
    message.default_value !== undefined &&
      (obj.default_value = message.default_value);
    message.deprecated !== undefined && (obj.deprecated = message.deprecated);
    message.shorthand_deprecated !== undefined &&
      (obj.shorthand_deprecated = message.shorthand_deprecated);
    message.hidden !== undefined && (obj.hidden = message.hidden);
    return obj;
  },

  fromPartial(object: DeepPartial<FlagOptions>): FlagOptions {
    const message = createBaseFlagOptions();
    message.name = object.name ?? "";
    message.shorthand = object.shorthand ?? "";
    message.usage = object.usage ?? "";
    message.default_value = object.default_value ?? "";
    message.deprecated = object.deprecated ?? "";
    message.shorthand_deprecated = object.shorthand_deprecated ?? "";
    message.hidden = object.hidden ?? false;
    return message;
  },
};

function createBasePositionalArgDescriptor(): PositionalArgDescriptor {
  return { proto_field: "", varargs: false };
}

export const PositionalArgDescriptor = {
  encode(
    message: PositionalArgDescriptor,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.proto_field !== "") {
      writer.uint32(10).string(message.proto_field);
    }
    if (message.varargs === true) {
      writer.uint32(16).bool(message.varargs);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): PositionalArgDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePositionalArgDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proto_field = reader.string();
          break;
        case 2:
          message.varargs = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PositionalArgDescriptor {
    return {
      proto_field: isSet(object.proto_field) ? String(object.proto_field) : "",
      varargs: isSet(object.varargs) ? Boolean(object.varargs) : false,
    };
  },

  toJSON(message: PositionalArgDescriptor): unknown {
    const obj: any = {};
    message.proto_field !== undefined &&
      (obj.proto_field = message.proto_field);
    message.varargs !== undefined && (obj.varargs = message.varargs);
    return obj;
  },

  fromPartial(
    object: DeepPartial<PositionalArgDescriptor>,
  ): PositionalArgDescriptor {
    const message = createBasePositionalArgDescriptor();
    message.proto_field = object.proto_field ?? "";
    message.varargs = object.varargs ?? false;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
