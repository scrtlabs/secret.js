/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Channel, Packet } from "./channel";
import { Height } from "../../client/v1/client";

export const protobufPackage = "ibc.core.channel.v1";

/** ResponseResultType defines the possible outcomes of the execution of a message */
export enum ResponseResultType {
  /** RESPONSE_RESULT_TYPE_UNSPECIFIED - Default zero value enumeration */
  RESPONSE_RESULT_TYPE_UNSPECIFIED = 0,
  /** RESPONSE_RESULT_TYPE_NOOP - The message did not call the IBC application callbacks (because, for example, the packet had already been relayed) */
  RESPONSE_RESULT_TYPE_NOOP = 1,
  /** RESPONSE_RESULT_TYPE_SUCCESS - The message was executed successfully */
  RESPONSE_RESULT_TYPE_SUCCESS = 2,
  UNRECOGNIZED = -1,
}

export function responseResultTypeFromJSON(object: any): ResponseResultType {
  switch (object) {
    case 0:
    case "RESPONSE_RESULT_TYPE_UNSPECIFIED":
      return ResponseResultType.RESPONSE_RESULT_TYPE_UNSPECIFIED;
    case 1:
    case "RESPONSE_RESULT_TYPE_NOOP":
      return ResponseResultType.RESPONSE_RESULT_TYPE_NOOP;
    case 2:
    case "RESPONSE_RESULT_TYPE_SUCCESS":
      return ResponseResultType.RESPONSE_RESULT_TYPE_SUCCESS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseResultType.UNRECOGNIZED;
  }
}

export function responseResultTypeToJSON(object: ResponseResultType): string {
  switch (object) {
    case ResponseResultType.RESPONSE_RESULT_TYPE_UNSPECIFIED:
      return "RESPONSE_RESULT_TYPE_UNSPECIFIED";
    case ResponseResultType.RESPONSE_RESULT_TYPE_NOOP:
      return "RESPONSE_RESULT_TYPE_NOOP";
    case ResponseResultType.RESPONSE_RESULT_TYPE_SUCCESS:
      return "RESPONSE_RESULT_TYPE_SUCCESS";
    default:
      return "UNKNOWN";
  }
}

/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It
 * is called by a relayer on Chain A.
 */
export interface MsgChannelOpenInit {
  port_id: string;
  channel?: Channel;
  signer: string;
}

/** MsgChannelOpenInitResponse defines the Msg/ChannelOpenInit response type. */
export interface MsgChannelOpenInitResponse {
  channel_id: string;
  version: string;
}

/**
 * MsgChannelOpenInit defines a msg sent by a Relayer to try to open a channel
 * on Chain B. The version field within the Channel field has been deprecated. Its
 * value will be ignored by core IBC.
 */
export interface MsgChannelOpenTry {
  port_id: string;
  /**
   * Deprecated: this field is unused. Crossing hello's are no longer supported in core IBC.
   *
   * @deprecated
   */
  previous_channel_id: string;
  /** NOTE: the version field within the channel has been deprecated. Its value will be ignored by core IBC. */
  channel?: Channel;
  counterparty_version: string;
  proof_init: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/** MsgChannelOpenTryResponse defines the Msg/ChannelOpenTry response type. */
export interface MsgChannelOpenTryResponse {
  version: string;
}

/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge
 * the change of channel state to TRYOPEN on Chain B.
 */
export interface MsgChannelOpenAck {
  port_id: string;
  channel_id: string;
  counterparty_channel_id: string;
  counterparty_version: string;
  proof_try: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/** MsgChannelOpenAckResponse defines the Msg/ChannelOpenAck response type. */
export interface MsgChannelOpenAckResponse {}

/**
 * MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of channel state to OPEN on Chain A.
 */
export interface MsgChannelOpenConfirm {
  port_id: string;
  channel_id: string;
  proof_ack: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/**
 * MsgChannelOpenConfirmResponse defines the Msg/ChannelOpenConfirm response
 * type.
 */
export interface MsgChannelOpenConfirmResponse {}

/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A
 * to close a channel with Chain B.
 */
export interface MsgChannelCloseInit {
  port_id: string;
  channel_id: string;
  signer: string;
}

/** MsgChannelCloseInitResponse defines the Msg/ChannelCloseInit response type. */
export interface MsgChannelCloseInitResponse {}

/**
 * MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B
 * to acknowledge the change of channel state to CLOSED on Chain A.
 */
export interface MsgChannelCloseConfirm {
  port_id: string;
  channel_id: string;
  proof_init: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/**
 * MsgChannelCloseConfirmResponse defines the Msg/ChannelCloseConfirm response
 * type.
 */
export interface MsgChannelCloseConfirmResponse {}

/** MsgRecvPacket receives incoming IBC packet */
export interface MsgRecvPacket {
  packet?: Packet;
  proof_commitment: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/** MsgRecvPacketResponse defines the Msg/RecvPacket response type. */
export interface MsgRecvPacketResponse {
  result: ResponseResultType;
}

/** MsgTimeout receives timed-out packet */
export interface MsgTimeout {
  packet?: Packet;
  proof_unreceived: Uint8Array;
  proof_height?: Height;
  next_sequence_recv: string;
  signer: string;
}

/** MsgTimeoutResponse defines the Msg/Timeout response type. */
export interface MsgTimeoutResponse {
  result: ResponseResultType;
}

/** MsgTimeoutOnClose timed-out packet upon counterparty channel closure. */
export interface MsgTimeoutOnClose {
  packet?: Packet;
  proof_unreceived: Uint8Array;
  proof_close: Uint8Array;
  proof_height?: Height;
  next_sequence_recv: string;
  signer: string;
}

/** MsgTimeoutOnCloseResponse defines the Msg/TimeoutOnClose response type. */
export interface MsgTimeoutOnCloseResponse {
  result: ResponseResultType;
}

/** MsgAcknowledgement receives incoming IBC acknowledgement */
export interface MsgAcknowledgement {
  packet?: Packet;
  acknowledgement: Uint8Array;
  proof_acked: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/** MsgAcknowledgementResponse defines the Msg/Acknowledgement response type. */
export interface MsgAcknowledgementResponse {
  result: ResponseResultType;
}

function createBaseMsgChannelOpenInit(): MsgChannelOpenInit {
  return { port_id: "", channel: undefined, signer: "" };
}

export const MsgChannelOpenInit = {
  encode(
    message: MsgChannelOpenInit,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenInit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.port_id = reader.string();
          break;
        case 2:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenInit {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel: isSet(object.channel)
        ? Channel.fromJSON(object.channel)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelOpenInit): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel !== undefined &&
      (obj.channel = message.channel
        ? Channel.toJSON(message.channel)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenInit>, I>>(
    object: I,
  ): MsgChannelOpenInit {
    const message = createBaseMsgChannelOpenInit();
    message.port_id = object.port_id ?? "";
    message.channel =
      object.channel !== undefined && object.channel !== null
        ? Channel.fromPartial(object.channel)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenInitResponse(): MsgChannelOpenInitResponse {
  return { channel_id: "", version: "" };
}

export const MsgChannelOpenInitResponse = {
  encode(
    message: MsgChannelOpenInitResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelOpenInitResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenInitResponse {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: MsgChannelOpenInitResponse): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenInitResponse>, I>>(
    object: I,
  ): MsgChannelOpenInitResponse {
    const message = createBaseMsgChannelOpenInitResponse();
    message.channel_id = object.channel_id ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenTry(): MsgChannelOpenTry {
  return {
    port_id: "",
    previous_channel_id: "",
    channel: undefined,
    counterparty_version: "",
    proof_init: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgChannelOpenTry = {
  encode(
    message: MsgChannelOpenTry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.previous_channel_id !== "") {
      writer.uint32(18).string(message.previous_channel_id);
    }
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(26).fork()).ldelim();
    }
    if (message.counterparty_version !== "") {
      writer.uint32(34).string(message.counterparty_version);
    }
    if (message.proof_init.length !== 0) {
      writer.uint32(42).bytes(message.proof_init);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenTry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenTry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.port_id = reader.string();
          break;
        case 2:
          message.previous_channel_id = reader.string();
          break;
        case 3:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        case 4:
          message.counterparty_version = reader.string();
          break;
        case 5:
          message.proof_init = reader.bytes();
          break;
        case 6:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 7:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenTry {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      previous_channel_id: isSet(object.previous_channel_id)
        ? String(object.previous_channel_id)
        : "",
      channel: isSet(object.channel)
        ? Channel.fromJSON(object.channel)
        : undefined,
      counterparty_version: isSet(object.counterparty_version)
        ? String(object.counterparty_version)
        : "",
      proof_init: isSet(object.proof_init)
        ? bytesFromBase64(object.proof_init)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelOpenTry): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.previous_channel_id !== undefined &&
      (obj.previous_channel_id = message.previous_channel_id);
    message.channel !== undefined &&
      (obj.channel = message.channel
        ? Channel.toJSON(message.channel)
        : undefined);
    message.counterparty_version !== undefined &&
      (obj.counterparty_version = message.counterparty_version);
    message.proof_init !== undefined &&
      (obj.proof_init = base64FromBytes(
        message.proof_init !== undefined
          ? message.proof_init
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenTry>, I>>(
    object: I,
  ): MsgChannelOpenTry {
    const message = createBaseMsgChannelOpenTry();
    message.port_id = object.port_id ?? "";
    message.previous_channel_id = object.previous_channel_id ?? "";
    message.channel =
      object.channel !== undefined && object.channel !== null
        ? Channel.fromPartial(object.channel)
        : undefined;
    message.counterparty_version = object.counterparty_version ?? "";
    message.proof_init = object.proof_init ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenTryResponse(): MsgChannelOpenTryResponse {
  return { version: "" };
}

export const MsgChannelOpenTryResponse = {
  encode(
    message: MsgChannelOpenTryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelOpenTryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenTryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenTryResponse {
    return {
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: MsgChannelOpenTryResponse): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenTryResponse>, I>>(
    object: I,
  ): MsgChannelOpenTryResponse {
    const message = createBaseMsgChannelOpenTryResponse();
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenAck(): MsgChannelOpenAck {
  return {
    port_id: "",
    channel_id: "",
    counterparty_channel_id: "",
    counterparty_version: "",
    proof_try: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgChannelOpenAck = {
  encode(
    message: MsgChannelOpenAck,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.counterparty_channel_id !== "") {
      writer.uint32(26).string(message.counterparty_channel_id);
    }
    if (message.counterparty_version !== "") {
      writer.uint32(34).string(message.counterparty_version);
    }
    if (message.proof_try.length !== 0) {
      writer.uint32(42).bytes(message.proof_try);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenAck {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.port_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.counterparty_channel_id = reader.string();
          break;
        case 4:
          message.counterparty_version = reader.string();
          break;
        case 5:
          message.proof_try = reader.bytes();
          break;
        case 6:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 7:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenAck {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      counterparty_channel_id: isSet(object.counterparty_channel_id)
        ? String(object.counterparty_channel_id)
        : "",
      counterparty_version: isSet(object.counterparty_version)
        ? String(object.counterparty_version)
        : "",
      proof_try: isSet(object.proof_try)
        ? bytesFromBase64(object.proof_try)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelOpenAck): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.counterparty_channel_id !== undefined &&
      (obj.counterparty_channel_id = message.counterparty_channel_id);
    message.counterparty_version !== undefined &&
      (obj.counterparty_version = message.counterparty_version);
    message.proof_try !== undefined &&
      (obj.proof_try = base64FromBytes(
        message.proof_try !== undefined ? message.proof_try : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenAck>, I>>(
    object: I,
  ): MsgChannelOpenAck {
    const message = createBaseMsgChannelOpenAck();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.counterparty_channel_id = object.counterparty_channel_id ?? "";
    message.counterparty_version = object.counterparty_version ?? "";
    message.proof_try = object.proof_try ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenAckResponse(): MsgChannelOpenAckResponse {
  return {};
}

export const MsgChannelOpenAckResponse = {
  encode(
    _: MsgChannelOpenAckResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelOpenAckResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenAckResponse();
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

  fromJSON(_: any): MsgChannelOpenAckResponse {
    return {};
  },

  toJSON(_: MsgChannelOpenAckResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenAckResponse>, I>>(
    _: I,
  ): MsgChannelOpenAckResponse {
    const message = createBaseMsgChannelOpenAckResponse();
    return message;
  },
};

function createBaseMsgChannelOpenConfirm(): MsgChannelOpenConfirm {
  return {
    port_id: "",
    channel_id: "",
    proof_ack: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgChannelOpenConfirm = {
  encode(
    message: MsgChannelOpenConfirm,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.proof_ack.length !== 0) {
      writer.uint32(26).bytes(message.proof_ack);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelOpenConfirm {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenConfirm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.port_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.proof_ack = reader.bytes();
          break;
        case 4:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenConfirm {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      proof_ack: isSet(object.proof_ack)
        ? bytesFromBase64(object.proof_ack)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelOpenConfirm): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.proof_ack !== undefined &&
      (obj.proof_ack = base64FromBytes(
        message.proof_ack !== undefined ? message.proof_ack : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenConfirm>, I>>(
    object: I,
  ): MsgChannelOpenConfirm {
    const message = createBaseMsgChannelOpenConfirm();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.proof_ack = object.proof_ack ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenConfirmResponse(): MsgChannelOpenConfirmResponse {
  return {};
}

export const MsgChannelOpenConfirmResponse = {
  encode(
    _: MsgChannelOpenConfirmResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelOpenConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenConfirmResponse();
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

  fromJSON(_: any): MsgChannelOpenConfirmResponse {
    return {};
  },

  toJSON(_: MsgChannelOpenConfirmResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenConfirmResponse>, I>>(
    _: I,
  ): MsgChannelOpenConfirmResponse {
    const message = createBaseMsgChannelOpenConfirmResponse();
    return message;
  },
};

function createBaseMsgChannelCloseInit(): MsgChannelCloseInit {
  return { port_id: "", channel_id: "", signer: "" };
}

export const MsgChannelCloseInit = {
  encode(
    message: MsgChannelCloseInit,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseInit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.port_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelCloseInit {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelCloseInit): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelCloseInit>, I>>(
    object: I,
  ): MsgChannelCloseInit {
    const message = createBaseMsgChannelCloseInit();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelCloseInitResponse(): MsgChannelCloseInitResponse {
  return {};
}

export const MsgChannelCloseInitResponse = {
  encode(
    _: MsgChannelCloseInitResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelCloseInitResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseInitResponse();
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

  fromJSON(_: any): MsgChannelCloseInitResponse {
    return {};
  },

  toJSON(_: MsgChannelCloseInitResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelCloseInitResponse>, I>>(
    _: I,
  ): MsgChannelCloseInitResponse {
    const message = createBaseMsgChannelCloseInitResponse();
    return message;
  },
};

function createBaseMsgChannelCloseConfirm(): MsgChannelCloseConfirm {
  return {
    port_id: "",
    channel_id: "",
    proof_init: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgChannelCloseConfirm = {
  encode(
    message: MsgChannelCloseConfirm,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.proof_init.length !== 0) {
      writer.uint32(26).bytes(message.proof_init);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelCloseConfirm {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseConfirm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.port_id = reader.string();
          break;
        case 2:
          message.channel_id = reader.string();
          break;
        case 3:
          message.proof_init = reader.bytes();
          break;
        case 4:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelCloseConfirm {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      proof_init: isSet(object.proof_init)
        ? bytesFromBase64(object.proof_init)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelCloseConfirm): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.proof_init !== undefined &&
      (obj.proof_init = base64FromBytes(
        message.proof_init !== undefined
          ? message.proof_init
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelCloseConfirm>, I>>(
    object: I,
  ): MsgChannelCloseConfirm {
    const message = createBaseMsgChannelCloseConfirm();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.proof_init = object.proof_init ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelCloseConfirmResponse(): MsgChannelCloseConfirmResponse {
  return {};
}

export const MsgChannelCloseConfirmResponse = {
  encode(
    _: MsgChannelCloseConfirmResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelCloseConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseConfirmResponse();
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

  fromJSON(_: any): MsgChannelCloseConfirmResponse {
    return {};
  },

  toJSON(_: MsgChannelCloseConfirmResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgChannelCloseConfirmResponse>, I>>(
    _: I,
  ): MsgChannelCloseConfirmResponse {
    const message = createBaseMsgChannelCloseConfirmResponse();
    return message;
  },
};

function createBaseMsgRecvPacket(): MsgRecvPacket {
  return {
    packet: undefined,
    proof_commitment: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgRecvPacket = {
  encode(
    message: MsgRecvPacket,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof_commitment.length !== 0) {
      writer.uint32(18).bytes(message.proof_commitment);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecvPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecvPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet = Packet.decode(reader, reader.uint32());
          break;
        case 2:
          message.proof_commitment = reader.bytes();
          break;
        case 3:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 4:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRecvPacket {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      proof_commitment: isSet(object.proof_commitment)
        ? bytesFromBase64(object.proof_commitment)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgRecvPacket): unknown {
    const obj: any = {};
    message.packet !== undefined &&
      (obj.packet = message.packet ? Packet.toJSON(message.packet) : undefined);
    message.proof_commitment !== undefined &&
      (obj.proof_commitment = base64FromBytes(
        message.proof_commitment !== undefined
          ? message.proof_commitment
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRecvPacket>, I>>(
    object: I,
  ): MsgRecvPacket {
    const message = createBaseMsgRecvPacket();
    message.packet =
      object.packet !== undefined && object.packet !== null
        ? Packet.fromPartial(object.packet)
        : undefined;
    message.proof_commitment = object.proof_commitment ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgRecvPacketResponse(): MsgRecvPacketResponse {
  return { result: 0 };
}

export const MsgRecvPacketResponse = {
  encode(
    message: MsgRecvPacketResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgRecvPacketResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecvPacketResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRecvPacketResponse {
    return {
      result: isSet(object.result)
        ? responseResultTypeFromJSON(object.result)
        : 0,
    };
  },

  toJSON(message: MsgRecvPacketResponse): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRecvPacketResponse>, I>>(
    object: I,
  ): MsgRecvPacketResponse {
    const message = createBaseMsgRecvPacketResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgTimeout(): MsgTimeout {
  return {
    packet: undefined,
    proof_unreceived: new Uint8Array(),
    proof_height: undefined,
    next_sequence_recv: "0",
    signer: "",
  };
}

export const MsgTimeout = {
  encode(
    message: MsgTimeout,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof_unreceived.length !== 0) {
      writer.uint32(18).bytes(message.proof_unreceived);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    if (message.next_sequence_recv !== "0") {
      writer.uint32(32).uint64(message.next_sequence_recv);
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeout {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeout();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet = Packet.decode(reader, reader.uint32());
          break;
        case 2:
          message.proof_unreceived = reader.bytes();
          break;
        case 3:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 4:
          message.next_sequence_recv = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTimeout {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      proof_unreceived: isSet(object.proof_unreceived)
        ? bytesFromBase64(object.proof_unreceived)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      next_sequence_recv: isSet(object.next_sequence_recv)
        ? String(object.next_sequence_recv)
        : "0",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgTimeout): unknown {
    const obj: any = {};
    message.packet !== undefined &&
      (obj.packet = message.packet ? Packet.toJSON(message.packet) : undefined);
    message.proof_unreceived !== undefined &&
      (obj.proof_unreceived = base64FromBytes(
        message.proof_unreceived !== undefined
          ? message.proof_unreceived
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.next_sequence_recv !== undefined &&
      (obj.next_sequence_recv = message.next_sequence_recv);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTimeout>, I>>(
    object: I,
  ): MsgTimeout {
    const message = createBaseMsgTimeout();
    message.packet =
      object.packet !== undefined && object.packet !== null
        ? Packet.fromPartial(object.packet)
        : undefined;
    message.proof_unreceived = object.proof_unreceived ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.next_sequence_recv = object.next_sequence_recv ?? "0";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgTimeoutResponse(): MsgTimeoutResponse {
  return { result: 0 };
}

export const MsgTimeoutResponse = {
  encode(
    message: MsgTimeoutResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeoutResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeoutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTimeoutResponse {
    return {
      result: isSet(object.result)
        ? responseResultTypeFromJSON(object.result)
        : 0,
    };
  },

  toJSON(message: MsgTimeoutResponse): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTimeoutResponse>, I>>(
    object: I,
  ): MsgTimeoutResponse {
    const message = createBaseMsgTimeoutResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgTimeoutOnClose(): MsgTimeoutOnClose {
  return {
    packet: undefined,
    proof_unreceived: new Uint8Array(),
    proof_close: new Uint8Array(),
    proof_height: undefined,
    next_sequence_recv: "0",
    signer: "",
  };
}

export const MsgTimeoutOnClose = {
  encode(
    message: MsgTimeoutOnClose,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof_unreceived.length !== 0) {
      writer.uint32(18).bytes(message.proof_unreceived);
    }
    if (message.proof_close.length !== 0) {
      writer.uint32(26).bytes(message.proof_close);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
    }
    if (message.next_sequence_recv !== "0") {
      writer.uint32(40).uint64(message.next_sequence_recv);
    }
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeoutOnClose {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeoutOnClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet = Packet.decode(reader, reader.uint32());
          break;
        case 2:
          message.proof_unreceived = reader.bytes();
          break;
        case 3:
          message.proof_close = reader.bytes();
          break;
        case 4:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.next_sequence_recv = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTimeoutOnClose {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      proof_unreceived: isSet(object.proof_unreceived)
        ? bytesFromBase64(object.proof_unreceived)
        : new Uint8Array(),
      proof_close: isSet(object.proof_close)
        ? bytesFromBase64(object.proof_close)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      next_sequence_recv: isSet(object.next_sequence_recv)
        ? String(object.next_sequence_recv)
        : "0",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgTimeoutOnClose): unknown {
    const obj: any = {};
    message.packet !== undefined &&
      (obj.packet = message.packet ? Packet.toJSON(message.packet) : undefined);
    message.proof_unreceived !== undefined &&
      (obj.proof_unreceived = base64FromBytes(
        message.proof_unreceived !== undefined
          ? message.proof_unreceived
          : new Uint8Array(),
      ));
    message.proof_close !== undefined &&
      (obj.proof_close = base64FromBytes(
        message.proof_close !== undefined
          ? message.proof_close
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.next_sequence_recv !== undefined &&
      (obj.next_sequence_recv = message.next_sequence_recv);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTimeoutOnClose>, I>>(
    object: I,
  ): MsgTimeoutOnClose {
    const message = createBaseMsgTimeoutOnClose();
    message.packet =
      object.packet !== undefined && object.packet !== null
        ? Packet.fromPartial(object.packet)
        : undefined;
    message.proof_unreceived = object.proof_unreceived ?? new Uint8Array();
    message.proof_close = object.proof_close ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.next_sequence_recv = object.next_sequence_recv ?? "0";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgTimeoutOnCloseResponse(): MsgTimeoutOnCloseResponse {
  return { result: 0 };
}

export const MsgTimeoutOnCloseResponse = {
  encode(
    message: MsgTimeoutOnCloseResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgTimeoutOnCloseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeoutOnCloseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTimeoutOnCloseResponse {
    return {
      result: isSet(object.result)
        ? responseResultTypeFromJSON(object.result)
        : 0,
    };
  },

  toJSON(message: MsgTimeoutOnCloseResponse): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTimeoutOnCloseResponse>, I>>(
    object: I,
  ): MsgTimeoutOnCloseResponse {
    const message = createBaseMsgTimeoutOnCloseResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgAcknowledgement(): MsgAcknowledgement {
  return {
    packet: undefined,
    acknowledgement: new Uint8Array(),
    proof_acked: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgAcknowledgement = {
  encode(
    message: MsgAcknowledgement,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.acknowledgement.length !== 0) {
      writer.uint32(18).bytes(message.acknowledgement);
    }
    if (message.proof_acked.length !== 0) {
      writer.uint32(26).bytes(message.proof_acked);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAcknowledgement {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcknowledgement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet = Packet.decode(reader, reader.uint32());
          break;
        case 2:
          message.acknowledgement = reader.bytes();
          break;
        case 3:
          message.proof_acked = reader.bytes();
          break;
        case 4:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAcknowledgement {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      acknowledgement: isSet(object.acknowledgement)
        ? bytesFromBase64(object.acknowledgement)
        : new Uint8Array(),
      proof_acked: isSet(object.proof_acked)
        ? bytesFromBase64(object.proof_acked)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgAcknowledgement): unknown {
    const obj: any = {};
    message.packet !== undefined &&
      (obj.packet = message.packet ? Packet.toJSON(message.packet) : undefined);
    message.acknowledgement !== undefined &&
      (obj.acknowledgement = base64FromBytes(
        message.acknowledgement !== undefined
          ? message.acknowledgement
          : new Uint8Array(),
      ));
    message.proof_acked !== undefined &&
      (obj.proof_acked = base64FromBytes(
        message.proof_acked !== undefined
          ? message.proof_acked
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAcknowledgement>, I>>(
    object: I,
  ): MsgAcknowledgement {
    const message = createBaseMsgAcknowledgement();
    message.packet =
      object.packet !== undefined && object.packet !== null
        ? Packet.fromPartial(object.packet)
        : undefined;
    message.acknowledgement = object.acknowledgement ?? new Uint8Array();
    message.proof_acked = object.proof_acked ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgAcknowledgementResponse(): MsgAcknowledgementResponse {
  return { result: 0 };
}

export const MsgAcknowledgementResponse = {
  encode(
    message: MsgAcknowledgementResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgAcknowledgementResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcknowledgementResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAcknowledgementResponse {
    return {
      result: isSet(object.result)
        ? responseResultTypeFromJSON(object.result)
        : 0,
    };
  },

  toJSON(message: MsgAcknowledgementResponse): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAcknowledgementResponse>, I>>(
    object: I,
  ): MsgAcknowledgementResponse {
    const message = createBaseMsgAcknowledgementResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

/** Msg defines the ibc/channel Msg service. */
export interface Msg {
  /** ChannelOpenInit defines a rpc handler method for MsgChannelOpenInit. */
  ChannelOpenInit(
    request: MsgChannelOpenInit,
  ): Promise<MsgChannelOpenInitResponse>;
  /** ChannelOpenTry defines a rpc handler method for MsgChannelOpenTry. */
  ChannelOpenTry(
    request: MsgChannelOpenTry,
  ): Promise<MsgChannelOpenTryResponse>;
  /** ChannelOpenAck defines a rpc handler method for MsgChannelOpenAck. */
  ChannelOpenAck(
    request: MsgChannelOpenAck,
  ): Promise<MsgChannelOpenAckResponse>;
  /** ChannelOpenConfirm defines a rpc handler method for MsgChannelOpenConfirm. */
  ChannelOpenConfirm(
    request: MsgChannelOpenConfirm,
  ): Promise<MsgChannelOpenConfirmResponse>;
  /** ChannelCloseInit defines a rpc handler method for MsgChannelCloseInit. */
  ChannelCloseInit(
    request: MsgChannelCloseInit,
  ): Promise<MsgChannelCloseInitResponse>;
  /**
   * ChannelCloseConfirm defines a rpc handler method for
   * MsgChannelCloseConfirm.
   */
  ChannelCloseConfirm(
    request: MsgChannelCloseConfirm,
  ): Promise<MsgChannelCloseConfirmResponse>;
  /** RecvPacket defines a rpc handler method for MsgRecvPacket. */
  RecvPacket(request: MsgRecvPacket): Promise<MsgRecvPacketResponse>;
  /** Timeout defines a rpc handler method for MsgTimeout. */
  Timeout(request: MsgTimeout): Promise<MsgTimeoutResponse>;
  /** TimeoutOnClose defines a rpc handler method for MsgTimeoutOnClose. */
  TimeoutOnClose(
    request: MsgTimeoutOnClose,
  ): Promise<MsgTimeoutOnCloseResponse>;
  /** Acknowledgement defines a rpc handler method for MsgAcknowledgement. */
  Acknowledgement(
    request: MsgAcknowledgement,
  ): Promise<MsgAcknowledgementResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ChannelOpenInit = this.ChannelOpenInit.bind(this);
    this.ChannelOpenTry = this.ChannelOpenTry.bind(this);
    this.ChannelOpenAck = this.ChannelOpenAck.bind(this);
    this.ChannelOpenConfirm = this.ChannelOpenConfirm.bind(this);
    this.ChannelCloseInit = this.ChannelCloseInit.bind(this);
    this.ChannelCloseConfirm = this.ChannelCloseConfirm.bind(this);
    this.RecvPacket = this.RecvPacket.bind(this);
    this.Timeout = this.Timeout.bind(this);
    this.TimeoutOnClose = this.TimeoutOnClose.bind(this);
    this.Acknowledgement = this.Acknowledgement.bind(this);
  }
  ChannelOpenInit(
    request: MsgChannelOpenInit,
  ): Promise<MsgChannelOpenInitResponse> {
    const data = MsgChannelOpenInit.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelOpenInit",
      data,
    );
    return promise.then((data) =>
      MsgChannelOpenInitResponse.decode(new _m0.Reader(data)),
    );
  }

  ChannelOpenTry(
    request: MsgChannelOpenTry,
  ): Promise<MsgChannelOpenTryResponse> {
    const data = MsgChannelOpenTry.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelOpenTry",
      data,
    );
    return promise.then((data) =>
      MsgChannelOpenTryResponse.decode(new _m0.Reader(data)),
    );
  }

  ChannelOpenAck(
    request: MsgChannelOpenAck,
  ): Promise<MsgChannelOpenAckResponse> {
    const data = MsgChannelOpenAck.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelOpenAck",
      data,
    );
    return promise.then((data) =>
      MsgChannelOpenAckResponse.decode(new _m0.Reader(data)),
    );
  }

  ChannelOpenConfirm(
    request: MsgChannelOpenConfirm,
  ): Promise<MsgChannelOpenConfirmResponse> {
    const data = MsgChannelOpenConfirm.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelOpenConfirm",
      data,
    );
    return promise.then((data) =>
      MsgChannelOpenConfirmResponse.decode(new _m0.Reader(data)),
    );
  }

  ChannelCloseInit(
    request: MsgChannelCloseInit,
  ): Promise<MsgChannelCloseInitResponse> {
    const data = MsgChannelCloseInit.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelCloseInit",
      data,
    );
    return promise.then((data) =>
      MsgChannelCloseInitResponse.decode(new _m0.Reader(data)),
    );
  }

  ChannelCloseConfirm(
    request: MsgChannelCloseConfirm,
  ): Promise<MsgChannelCloseConfirmResponse> {
    const data = MsgChannelCloseConfirm.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelCloseConfirm",
      data,
    );
    return promise.then((data) =>
      MsgChannelCloseConfirmResponse.decode(new _m0.Reader(data)),
    );
  }

  RecvPacket(request: MsgRecvPacket): Promise<MsgRecvPacketResponse> {
    const data = MsgRecvPacket.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "RecvPacket",
      data,
    );
    return promise.then((data) =>
      MsgRecvPacketResponse.decode(new _m0.Reader(data)),
    );
  }

  Timeout(request: MsgTimeout): Promise<MsgTimeoutResponse> {
    const data = MsgTimeout.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "Timeout",
      data,
    );
    return promise.then((data) =>
      MsgTimeoutResponse.decode(new _m0.Reader(data)),
    );
  }

  TimeoutOnClose(
    request: MsgTimeoutOnClose,
  ): Promise<MsgTimeoutOnCloseResponse> {
    const data = MsgTimeoutOnClose.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "TimeoutOnClose",
      data,
    );
    return promise.then((data) =>
      MsgTimeoutOnCloseResponse.decode(new _m0.Reader(data)),
    );
  }

  Acknowledgement(
    request: MsgAcknowledgement,
  ): Promise<MsgAcknowledgementResponse> {
    const data = MsgAcknowledgement.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "Acknowledgement",
      data,
    );
    return promise.then((data) =>
      MsgAcknowledgementResponse.decode(new _m0.Reader(data)),
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
