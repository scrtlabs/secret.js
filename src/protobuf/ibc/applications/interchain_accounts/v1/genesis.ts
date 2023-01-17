/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Params } from "../controller/v1/controller";
import { Params as Params1 } from "../host/v1/host";

export const protobufPackage = "ibc.applications.interchain_accounts.v1";

/** GenesisState defines the interchain accounts genesis state */
export interface GenesisState {
  controller_genesis_state?: ControllerGenesisState;
  host_genesis_state?: HostGenesisState;
}

/** ControllerGenesisState defines the interchain accounts controller genesis state */
export interface ControllerGenesisState {
  active_channels: ActiveChannel[];
  interchain_accounts: RegisteredInterchainAccount[];
  ports: string[];
  params?: Params;
}

/** HostGenesisState defines the interchain accounts host genesis state */
export interface HostGenesisState {
  active_channels: ActiveChannel[];
  interchain_accounts: RegisteredInterchainAccount[];
  port: string;
  params?: Params1;
}

/** ActiveChannel contains a connection ID, port ID and associated active channel ID */
export interface ActiveChannel {
  connection_id: string;
  port_id: string;
  channel_id: string;
}

/** RegisteredInterchainAccount contains a connection ID, port ID and associated interchain account address */
export interface RegisteredInterchainAccount {
  connection_id: string;
  port_id: string;
  account_address: string;
}

function createBaseGenesisState(): GenesisState {
  return { controller_genesis_state: undefined, host_genesis_state: undefined };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.controller_genesis_state !== undefined) {
      ControllerGenesisState.encode(
        message.controller_genesis_state,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.host_genesis_state !== undefined) {
      HostGenesisState.encode(
        message.host_genesis_state,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.controller_genesis_state = ControllerGenesisState.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.host_genesis_state = HostGenesisState.decode(
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

  fromJSON(object: any): GenesisState {
    return {
      controller_genesis_state: isSet(object.controller_genesis_state)
        ? ControllerGenesisState.fromJSON(object.controller_genesis_state)
        : undefined,
      host_genesis_state: isSet(object.host_genesis_state)
        ? HostGenesisState.fromJSON(object.host_genesis_state)
        : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.controller_genesis_state !== undefined &&
      (obj.controller_genesis_state = message.controller_genesis_state
        ? ControllerGenesisState.toJSON(message.controller_genesis_state)
        : undefined);
    message.host_genesis_state !== undefined &&
      (obj.host_genesis_state = message.host_genesis_state
        ? HostGenesisState.toJSON(message.host_genesis_state)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I,
  ): GenesisState {
    const message = createBaseGenesisState();
    message.controller_genesis_state =
      object.controller_genesis_state !== undefined &&
      object.controller_genesis_state !== null
        ? ControllerGenesisState.fromPartial(object.controller_genesis_state)
        : undefined;
    message.host_genesis_state =
      object.host_genesis_state !== undefined &&
      object.host_genesis_state !== null
        ? HostGenesisState.fromPartial(object.host_genesis_state)
        : undefined;
    return message;
  },
};

function createBaseControllerGenesisState(): ControllerGenesisState {
  return {
    active_channels: [],
    interchain_accounts: [],
    ports: [],
    params: undefined,
  };
}

export const ControllerGenesisState = {
  encode(
    message: ControllerGenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.active_channels) {
      ActiveChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.interchain_accounts) {
      RegisteredInterchainAccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.ports) {
      writer.uint32(26).string(v!);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ControllerGenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.active_channels.push(
            ActiveChannel.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.interchain_accounts.push(
            RegisteredInterchainAccount.decode(reader, reader.uint32()),
          );
          break;
        case 3:
          message.ports.push(reader.string());
          break;
        case 4:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ControllerGenesisState {
    return {
      active_channels: Array.isArray(object?.active_channels)
        ? object.active_channels.map((e: any) => ActiveChannel.fromJSON(e))
        : [],
      interchain_accounts: Array.isArray(object?.interchain_accounts)
        ? object.interchain_accounts.map((e: any) =>
            RegisteredInterchainAccount.fromJSON(e),
          )
        : [],
      ports: Array.isArray(object?.ports)
        ? object.ports.map((e: any) => String(e))
        : [],
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: ControllerGenesisState): unknown {
    const obj: any = {};
    if (message.active_channels) {
      obj.active_channels = message.active_channels.map((e) =>
        e ? ActiveChannel.toJSON(e) : undefined,
      );
    } else {
      obj.active_channels = [];
    }
    if (message.interchain_accounts) {
      obj.interchain_accounts = message.interchain_accounts.map((e) =>
        e ? RegisteredInterchainAccount.toJSON(e) : undefined,
      );
    } else {
      obj.interchain_accounts = [];
    }
    if (message.ports) {
      obj.ports = message.ports.map((e) => e);
    } else {
      obj.ports = [];
    }
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ControllerGenesisState>, I>>(
    object: I,
  ): ControllerGenesisState {
    const message = createBaseControllerGenesisState();
    message.active_channels =
      object.active_channels?.map((e) => ActiveChannel.fromPartial(e)) || [];
    message.interchain_accounts =
      object.interchain_accounts?.map((e) =>
        RegisteredInterchainAccount.fromPartial(e),
      ) || [];
    message.ports = object.ports?.map((e) => e) || [];
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseHostGenesisState(): HostGenesisState {
  return {
    active_channels: [],
    interchain_accounts: [],
    port: "",
    params: undefined,
  };
}

export const HostGenesisState = {
  encode(
    message: HostGenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.active_channels) {
      ActiveChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.interchain_accounts) {
      RegisteredInterchainAccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.port !== "") {
      writer.uint32(26).string(message.port);
    }
    if (message.params !== undefined) {
      Params1.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostGenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.active_channels.push(
            ActiveChannel.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.interchain_accounts.push(
            RegisteredInterchainAccount.decode(reader, reader.uint32()),
          );
          break;
        case 3:
          message.port = reader.string();
          break;
        case 4:
          message.params = Params1.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HostGenesisState {
    return {
      active_channels: Array.isArray(object?.active_channels)
        ? object.active_channels.map((e: any) => ActiveChannel.fromJSON(e))
        : [],
      interchain_accounts: Array.isArray(object?.interchain_accounts)
        ? object.interchain_accounts.map((e: any) =>
            RegisteredInterchainAccount.fromJSON(e),
          )
        : [],
      port: isSet(object.port) ? String(object.port) : "",
      params: isSet(object.params)
        ? Params1.fromJSON(object.params)
        : undefined,
    };
  },

  toJSON(message: HostGenesisState): unknown {
    const obj: any = {};
    if (message.active_channels) {
      obj.active_channels = message.active_channels.map((e) =>
        e ? ActiveChannel.toJSON(e) : undefined,
      );
    } else {
      obj.active_channels = [];
    }
    if (message.interchain_accounts) {
      obj.interchain_accounts = message.interchain_accounts.map((e) =>
        e ? RegisteredInterchainAccount.toJSON(e) : undefined,
      );
    } else {
      obj.interchain_accounts = [];
    }
    message.port !== undefined && (obj.port = message.port);
    message.params !== undefined &&
      (obj.params = message.params
        ? Params1.toJSON(message.params)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HostGenesisState>, I>>(
    object: I,
  ): HostGenesisState {
    const message = createBaseHostGenesisState();
    message.active_channels =
      object.active_channels?.map((e) => ActiveChannel.fromPartial(e)) || [];
    message.interchain_accounts =
      object.interchain_accounts?.map((e) =>
        RegisteredInterchainAccount.fromPartial(e),
      ) || [];
    message.port = object.port ?? "";
    message.params =
      object.params !== undefined && object.params !== null
        ? Params1.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseActiveChannel(): ActiveChannel {
  return { connection_id: "", port_id: "", channel_id: "" };
}

export const ActiveChannel = {
  encode(
    message: ActiveChannel,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    if (message.port_id !== "") {
      writer.uint32(18).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(26).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveChannel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connection_id = reader.string();
          break;
        case 2:
          message.port_id = reader.string();
          break;
        case 3:
          message.channel_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActiveChannel {
    return {
      connection_id: isSet(object.connection_id)
        ? String(object.connection_id)
        : "",
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
    };
  },

  toJSON(message: ActiveChannel): unknown {
    const obj: any = {};
    message.connection_id !== undefined &&
      (obj.connection_id = message.connection_id);
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ActiveChannel>, I>>(
    object: I,
  ): ActiveChannel {
    const message = createBaseActiveChannel();
    message.connection_id = object.connection_id ?? "";
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseRegisteredInterchainAccount(): RegisteredInterchainAccount {
  return { connection_id: "", port_id: "", account_address: "" };
}

export const RegisteredInterchainAccount = {
  encode(
    message: RegisteredInterchainAccount,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    if (message.port_id !== "") {
      writer.uint32(18).string(message.port_id);
    }
    if (message.account_address !== "") {
      writer.uint32(26).string(message.account_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RegisteredInterchainAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredInterchainAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connection_id = reader.string();
          break;
        case 2:
          message.port_id = reader.string();
          break;
        case 3:
          message.account_address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisteredInterchainAccount {
    return {
      connection_id: isSet(object.connection_id)
        ? String(object.connection_id)
        : "",
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      account_address: isSet(object.account_address)
        ? String(object.account_address)
        : "",
    };
  },

  toJSON(message: RegisteredInterchainAccount): unknown {
    const obj: any = {};
    message.connection_id !== undefined &&
      (obj.connection_id = message.connection_id);
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.account_address !== undefined &&
      (obj.account_address = message.account_address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisteredInterchainAccount>, I>>(
    object: I,
  ): RegisteredInterchainAccount {
    const message = createBaseRegisteredInterchainAccount();
    message.connection_id = object.connection_id ?? "";
    message.port_id = object.port_id ?? "";
    message.account_address = object.account_address ?? "";
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
