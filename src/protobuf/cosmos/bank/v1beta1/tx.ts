/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Params, Input, Output, SendEnabled } from "./bank";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.bank.v1beta1";

/** MsgSend represents a message to send coins from one account to another. */
export interface MsgSend {
  from_address: string;
  to_address: string;
  amount: Coin[];
}

/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgSendResponse {}

/** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
export interface MsgMultiSend {
  /**
   * Inputs, despite being `repeated`, only allows one sender input. This is
   * checked in MsgMultiSend's ValidateBasic.
   */
  inputs: Input[];
  outputs: Output[];
}

/** MsgMultiSendResponse defines the Msg/MultiSend response type. */
export interface MsgMultiSendResponse {}

/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the x/bank parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params?: Params;
}

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {}

/**
 * MsgSetSendEnabled is the Msg/SetSendEnabled request type.
 *
 * Only entries to add/update/delete need to be included.
 * Existing SendEnabled entries that are not included in this
 * message are left unchanged.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabled {
  /** authority is the address that controls the module. */
  authority: string;
  /** send_enabled is the list of entries to add or update. */
  send_enabled: SendEnabled[];
  /**
   * use_default_for is a list of denoms that should use the params.default_send_enabled value.
   * Denoms listed here will have their SendEnabled entries deleted.
   * If a denom is included that doesn't have a SendEnabled entry,
   * it will be ignored.
   */
  use_default_for: string[];
}

/**
 * MsgSetSendEnabledResponse defines the Msg/SetSendEnabled response type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabledResponse {}

function createBaseMsgSend(): MsgSend {
  return { from_address: "", to_address: "", amount: [] };
}

export const MsgSend = {
  encode(
    message: MsgSend,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.from_address !== "") {
      writer.uint32(10).string(message.from_address);
    }
    if (message.to_address !== "") {
      writer.uint32(18).string(message.to_address);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from_address = reader.string();
          break;
        case 2:
          message.to_address = reader.string();
          break;
        case 3:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSend {
    return {
      from_address: isSet(object.from_address)
        ? String(object.from_address)
        : "",
      to_address: isSet(object.to_address) ? String(object.to_address) : "",
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgSend): unknown {
    const obj: any = {};
    message.from_address !== undefined &&
      (obj.from_address = message.from_address);
    message.to_address !== undefined && (obj.to_address = message.to_address);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSend>): MsgSend {
    const message = createBaseMsgSend();
    message.from_address = object.from_address ?? "";
    message.to_address = object.to_address ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgSendResponse(): MsgSendResponse {
  return {};
}

export const MsgSendResponse = {
  encode(
    _: MsgSendResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendResponse();
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

  fromJSON(_: any): MsgSendResponse {
    return {};
  },

  toJSON(_: MsgSendResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgSendResponse>): MsgSendResponse {
    const message = createBaseMsgSendResponse();
    return message;
  },
};

function createBaseMsgMultiSend(): MsgMultiSend {
  return { inputs: [], outputs: [] };
}

export const MsgMultiSend = {
  encode(
    message: MsgMultiSend,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.inputs) {
      Input.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.outputs) {
      Output.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiSend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inputs.push(Input.decode(reader, reader.uint32()));
          break;
        case 2:
          message.outputs.push(Output.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMultiSend {
    return {
      inputs: Array.isArray(object?.inputs)
        ? object.inputs.map((e: any) => Input.fromJSON(e))
        : [],
      outputs: Array.isArray(object?.outputs)
        ? object.outputs.map((e: any) => Output.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgMultiSend): unknown {
    const obj: any = {};
    if (message.inputs) {
      obj.inputs = message.inputs.map((e) => (e ? Input.toJSON(e) : undefined));
    } else {
      obj.inputs = [];
    }
    if (message.outputs) {
      obj.outputs = message.outputs.map((e) =>
        e ? Output.toJSON(e) : undefined,
      );
    } else {
      obj.outputs = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgMultiSend>): MsgMultiSend {
    const message = createBaseMsgMultiSend();
    message.inputs = object.inputs?.map((e) => Input.fromPartial(e)) || [];
    message.outputs = object.outputs?.map((e) => Output.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgMultiSendResponse(): MsgMultiSendResponse {
  return {};
}

export const MsgMultiSendResponse = {
  encode(
    _: MsgMultiSendResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgMultiSendResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMultiSendResponse();
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

  fromJSON(_: any): MsgMultiSendResponse {
    return {};
  },

  toJSON(_: MsgMultiSendResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgMultiSendResponse>): MsgMultiSendResponse {
    const message = createBaseMsgMultiSendResponse();
    return message;
  },
};

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(
    message: MsgUpdateParams,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
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
          message.authority = reader.string();
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
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
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

function createBaseMsgSetSendEnabled(): MsgSetSendEnabled {
  return { authority: "", send_enabled: [], use_default_for: [] };
}

export const MsgSetSendEnabled = {
  encode(
    message: MsgSetSendEnabled,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.send_enabled) {
      SendEnabled.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.use_default_for) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetSendEnabled {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetSendEnabled();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.send_enabled.push(
            SendEnabled.decode(reader, reader.uint32()),
          );
          break;
        case 3:
          message.use_default_for.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetSendEnabled {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      send_enabled: Array.isArray(object?.send_enabled)
        ? object.send_enabled.map((e: any) => SendEnabled.fromJSON(e))
        : [],
      use_default_for: Array.isArray(object?.use_default_for)
        ? object.use_default_for.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: MsgSetSendEnabled): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.send_enabled) {
      obj.send_enabled = message.send_enabled.map((e) =>
        e ? SendEnabled.toJSON(e) : undefined,
      );
    } else {
      obj.send_enabled = [];
    }
    if (message.use_default_for) {
      obj.use_default_for = message.use_default_for.map((e) => e);
    } else {
      obj.use_default_for = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetSendEnabled>): MsgSetSendEnabled {
    const message = createBaseMsgSetSendEnabled();
    message.authority = object.authority ?? "";
    message.send_enabled =
      object.send_enabled?.map((e) => SendEnabled.fromPartial(e)) || [];
    message.use_default_for = object.use_default_for?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgSetSendEnabledResponse(): MsgSetSendEnabledResponse {
  return {};
}

export const MsgSetSendEnabledResponse = {
  encode(
    _: MsgSetSendEnabledResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgSetSendEnabledResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetSendEnabledResponse();
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

  fromJSON(_: any): MsgSetSendEnabledResponse {
    return {};
  },

  toJSON(_: MsgSetSendEnabledResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgSetSendEnabledResponse>,
  ): MsgSetSendEnabledResponse {
    const message = createBaseMsgSetSendEnabledResponse();
    return message;
  },
};

/** Msg defines the bank Msg service. */
export interface Msg {
  /** Send defines a method for sending coins from one account to another account. */
  Send(request: MsgSend): Promise<MsgSendResponse>;
  /** MultiSend defines a method for sending coins from some accounts to other accounts. */
  MultiSend(request: MsgMultiSend): Promise<MsgMultiSendResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/bank module parameters.
   * The authority is defined in the keeper.
   *
   * Since: cosmos-sdk 0.47
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /**
   * SetSendEnabled is a governance operation for setting the SendEnabled flag
   * on any number of Denoms. Only the entries to add or update should be
   * included. Entries that already exist in the store, but that aren't
   * included in this message, will be left unchanged.
   *
   * Since: cosmos-sdk 0.47
   */
  SetSendEnabled(
    request: MsgSetSendEnabled,
  ): Promise<MsgSetSendEnabledResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Send = this.Send.bind(this);
    this.MultiSend = this.MultiSend.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
    this.SetSendEnabled = this.SetSendEnabled.bind(this);
  }
  Send(request: MsgSend): Promise<MsgSendResponse> {
    const data = MsgSend.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "Send", data);
    return promise.then((data) => MsgSendResponse.decode(new _m0.Reader(data)));
  }

  MultiSend(request: MsgMultiSend): Promise<MsgMultiSendResponse> {
    const data = MsgMultiSend.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.bank.v1beta1.Msg",
      "MultiSend",
      data,
    );
    return promise.then((data) =>
      MsgMultiSendResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.bank.v1beta1.Msg",
      "UpdateParams",
      data,
    );
    return promise.then((data) =>
      MsgUpdateParamsResponse.decode(new _m0.Reader(data)),
    );
  }

  SetSendEnabled(
    request: MsgSetSendEnabled,
  ): Promise<MsgSetSendEnabledResponse> {
    const data = MsgSetSendEnabled.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.bank.v1beta1.Msg",
      "SetSendEnabled",
      data,
    );
    return promise.then((data) =>
      MsgSetSendEnabledResponse.decode(new _m0.Reader(data)),
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
