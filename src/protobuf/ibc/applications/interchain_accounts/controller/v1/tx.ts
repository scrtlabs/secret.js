/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  Order,
  orderFromJSON,
  orderToJSON,
} from "../../../../core/channel/v1/channel";
import { InterchainAccountPacketData } from "../../v1/packet";
import { Params } from "./controller";

export const protobufPackage =
  "ibc.applications.interchain_accounts.controller.v1";

/** MsgRegisterInterchainAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccount {
  owner: string;
  connection_id: string;
  version: string;
  ordering: Order;
}

/** MsgRegisterInterchainAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccountResponse {
  channel_id: string;
  port_id: string;
}

/** MsgSendTx defines the payload for Msg/SendTx */
export interface MsgSendTx {
  owner: string;
  connection_id: string;
  packet_data?: InterchainAccountPacketData;
  /**
   * Relative timeout timestamp provided will be added to the current block time during transaction execution.
   * The timeout timestamp must be non-zero.
   */
  relative_timeout: string;
}

/** MsgSendTxResponse defines the response for MsgSendTx */
export interface MsgSendTxResponse {
  sequence: string;
}

/** MsgUpdateParams defines the payload for Msg/UpdateParams */
export interface MsgUpdateParams {
  /** signer address */
  signer: string;
  /**
   * params defines the 27-interchain-accounts/controller parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params?: Params;
}

/** MsgUpdateParamsResponse defines the response for Msg/UpdateParams */
export interface MsgUpdateParamsResponse {}

function createBaseMsgRegisterInterchainAccount(): MsgRegisterInterchainAccount {
  return { owner: "", connection_id: "", version: "", ordering: 0 };
}

export const MsgRegisterInterchainAccount = {
  encode(
    message: MsgRegisterInterchainAccount,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.connection_id !== "") {
      writer.uint32(18).string(message.connection_id);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.ordering !== 0) {
      writer.uint32(32).int32(message.ordering);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgRegisterInterchainAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInterchainAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.connection_id = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        case 4:
          message.ordering = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterInterchainAccount {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      connection_id: isSet(object.connection_id)
        ? String(object.connection_id)
        : "",
      version: isSet(object.version) ? String(object.version) : "",
      ordering: isSet(object.ordering) ? orderFromJSON(object.ordering) : 0,
    };
  },

  toJSON(message: MsgRegisterInterchainAccount): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.connection_id !== undefined &&
      (obj.connection_id = message.connection_id);
    message.version !== undefined && (obj.version = message.version);
    message.ordering !== undefined &&
      (obj.ordering = orderToJSON(message.ordering));
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgRegisterInterchainAccount>,
  ): MsgRegisterInterchainAccount {
    const message = createBaseMsgRegisterInterchainAccount();
    message.owner = object.owner ?? "";
    message.connection_id = object.connection_id ?? "";
    message.version = object.version ?? "";
    message.ordering = object.ordering ?? 0;
    return message;
  },
};

function createBaseMsgRegisterInterchainAccountResponse(): MsgRegisterInterchainAccountResponse {
  return { channel_id: "", port_id: "" };
}

export const MsgRegisterInterchainAccountResponse = {
  encode(
    message: MsgRegisterInterchainAccountResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.port_id !== "") {
      writer.uint32(18).string(message.port_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgRegisterInterchainAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInterchainAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.port_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterInterchainAccountResponse {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
    };
  },

  toJSON(message: MsgRegisterInterchainAccountResponse): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.port_id !== undefined && (obj.port_id = message.port_id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgRegisterInterchainAccountResponse>,
  ): MsgRegisterInterchainAccountResponse {
    const message = createBaseMsgRegisterInterchainAccountResponse();
    message.channel_id = object.channel_id ?? "";
    message.port_id = object.port_id ?? "";
    return message;
  },
};

function createBaseMsgSendTx(): MsgSendTx {
  return {
    owner: "",
    connection_id: "",
    packet_data: undefined,
    relative_timeout: "0",
  };
}

export const MsgSendTx = {
  encode(
    message: MsgSendTx,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.connection_id !== "") {
      writer.uint32(18).string(message.connection_id);
    }
    if (message.packet_data !== undefined) {
      InterchainAccountPacketData.encode(
        message.packet_data,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.relative_timeout !== "0") {
      writer.uint32(32).uint64(message.relative_timeout);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.connection_id = reader.string();
          break;
        case 3:
          message.packet_data = InterchainAccountPacketData.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.relative_timeout = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSendTx {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      connection_id: isSet(object.connection_id)
        ? String(object.connection_id)
        : "",
      packet_data: isSet(object.packet_data)
        ? InterchainAccountPacketData.fromJSON(object.packet_data)
        : undefined,
      relative_timeout: isSet(object.relative_timeout)
        ? String(object.relative_timeout)
        : "0",
    };
  },

  toJSON(message: MsgSendTx): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.connection_id !== undefined &&
      (obj.connection_id = message.connection_id);
    message.packet_data !== undefined &&
      (obj.packet_data = message.packet_data
        ? InterchainAccountPacketData.toJSON(message.packet_data)
        : undefined);
    message.relative_timeout !== undefined &&
      (obj.relative_timeout = message.relative_timeout);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSendTx>): MsgSendTx {
    const message = createBaseMsgSendTx();
    message.owner = object.owner ?? "";
    message.connection_id = object.connection_id ?? "";
    message.packet_data =
      object.packet_data !== undefined && object.packet_data !== null
        ? InterchainAccountPacketData.fromPartial(object.packet_data)
        : undefined;
    message.relative_timeout = object.relative_timeout ?? "0";
    return message;
  },
};

function createBaseMsgSendTxResponse(): MsgSendTxResponse {
  return { sequence: "0" };
}

export const MsgSendTxResponse = {
  encode(
    message: MsgSendTxResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sequence !== "0") {
      writer.uint32(8).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendTxResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sequence = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSendTxResponse {
    return {
      sequence: isSet(object.sequence) ? String(object.sequence) : "0",
    };
  },

  toJSON(message: MsgSendTxResponse): unknown {
    const obj: any = {};
    message.sequence !== undefined && (obj.sequence = message.sequence);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSendTxResponse>): MsgSendTxResponse {
    const message = createBaseMsgSendTxResponse();
    message.sequence = object.sequence ?? "0";
    return message;
  },
};

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { signer: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(
    message: MsgUpdateParams,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParams {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.signer !== undefined && (obj.signer = message.signer);
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.signer = object.signer ?? "";
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(
    _: MsgUpdateParamsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateParamsResponse>,
  ): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

/** Msg defines the 27-interchain-accounts/controller Msg service. */
export interface Msg {
  /** RegisterInterchainAccount defines a rpc handler for MsgRegisterInterchainAccount. */
  RegisterInterchainAccount(
    request: MsgRegisterInterchainAccount,
  ): Promise<MsgRegisterInterchainAccountResponse>;
  /** SendTx defines a rpc handler for MsgSendTx. */
  SendTx(request: MsgSendTx): Promise<MsgSendTxResponse>;
  /** UpdateParams defines a rpc handler for MsgUpdateParams. */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RegisterInterchainAccount = this.RegisterInterchainAccount.bind(this);
    this.SendTx = this.SendTx.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
  }
  RegisterInterchainAccount(
    request: MsgRegisterInterchainAccount,
  ): Promise<MsgRegisterInterchainAccountResponse> {
    const data = MsgRegisterInterchainAccount.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.applications.interchain_accounts.controller.v1.Msg",
      "RegisterInterchainAccount",
      data,
    );
    return promise.then((data) =>
      MsgRegisterInterchainAccountResponse.decode(new _m0.Reader(data)),
    );
  }

  SendTx(request: MsgSendTx): Promise<MsgSendTxResponse> {
    const data = MsgSendTx.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.applications.interchain_accounts.controller.v1.Msg",
      "SendTx",
      data,
    );
    return promise.then((data) =>
      MsgSendTxResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.applications.interchain_accounts.controller.v1.Msg",
      "UpdateParams",
      data,
    );
    return promise.then((data) =>
      MsgUpdateParamsResponse.decode(new _m0.Reader(data)),
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
