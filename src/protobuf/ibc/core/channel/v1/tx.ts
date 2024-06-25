/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  Channel,
  Packet,
  State,
  Params,
  stateFromJSON,
  stateToJSON,
} from "./channel";
import { Height } from "../../client/v1/client";
import { UpgradeFields, Upgrade, ErrorReceipt } from "./upgrade";

export const protobufPackage = "ibc.core.channel.v1";

/** ResponseResultType defines the possible outcomes of the execution of a message */
export enum ResponseResultType {
  /** RESPONSE_RESULT_TYPE_UNSPECIFIED - Default zero value enumeration */
  RESPONSE_RESULT_TYPE_UNSPECIFIED = 0,
  /** RESPONSE_RESULT_TYPE_NOOP - The message did not call the IBC application callbacks (because, for example, the packet had already been relayed) */
  RESPONSE_RESULT_TYPE_NOOP = 1,
  /** RESPONSE_RESULT_TYPE_SUCCESS - The message was executed successfully */
  RESPONSE_RESULT_TYPE_SUCCESS = 2,
  /** RESPONSE_RESULT_TYPE_FAILURE - The message was executed unsuccessfully */
  RESPONSE_RESULT_TYPE_FAILURE = 3,
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
    case 3:
    case "RESPONSE_RESULT_TYPE_FAILURE":
      return ResponseResultType.RESPONSE_RESULT_TYPE_FAILURE;
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
    case ResponseResultType.RESPONSE_RESULT_TYPE_FAILURE:
      return "RESPONSE_RESULT_TYPE_FAILURE";
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
  channel_id: string;
}

/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge
 * the change of channel state to TRYOPEN on Chain B.
 * WARNING: a channel upgrade MUST NOT initialize an upgrade for this channel
 * in the same block as executing this message otherwise the counterparty will
 * be incapable of opening.
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
  counterparty_upgrade_sequence: string;
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
  counterparty_upgrade_sequence: string;
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

/**
 * MsgChannelUpgradeInit defines the request type for the ChannelUpgradeInit rpc
 * WARNING: Initializing a channel upgrade in the same block as opening the channel
 * may result in the counterparty being incapable of opening.
 */
export interface MsgChannelUpgradeInit {
  port_id: string;
  channel_id: string;
  fields?: UpgradeFields;
  signer: string;
}

/** MsgChannelUpgradeInitResponse defines the MsgChannelUpgradeInit response type */
export interface MsgChannelUpgradeInitResponse {
  upgrade?: Upgrade;
  upgrade_sequence: string;
}

/** MsgChannelUpgradeTry defines the request type for the ChannelUpgradeTry rpc */
export interface MsgChannelUpgradeTry {
  port_id: string;
  channel_id: string;
  proposed_upgrade_connection_hops: string[];
  counterparty_upgrade_fields?: UpgradeFields;
  counterparty_upgrade_sequence: string;
  proof_channel: Uint8Array;
  proof_upgrade: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/** MsgChannelUpgradeTryResponse defines the MsgChannelUpgradeTry response type */
export interface MsgChannelUpgradeTryResponse {
  upgrade?: Upgrade;
  upgrade_sequence: string;
  result: ResponseResultType;
}

/** MsgChannelUpgradeAck defines the request type for the ChannelUpgradeAck rpc */
export interface MsgChannelUpgradeAck {
  port_id: string;
  channel_id: string;
  counterparty_upgrade?: Upgrade;
  proof_channel: Uint8Array;
  proof_upgrade: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/** MsgChannelUpgradeAckResponse defines MsgChannelUpgradeAck response type */
export interface MsgChannelUpgradeAckResponse {
  result: ResponseResultType;
}

/** MsgChannelUpgradeConfirm defines the request type for the ChannelUpgradeConfirm rpc */
export interface MsgChannelUpgradeConfirm {
  port_id: string;
  channel_id: string;
  counterparty_channel_state: State;
  counterparty_upgrade?: Upgrade;
  proof_channel: Uint8Array;
  proof_upgrade: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/** MsgChannelUpgradeConfirmResponse defines MsgChannelUpgradeConfirm response type */
export interface MsgChannelUpgradeConfirmResponse {
  result: ResponseResultType;
}

/** MsgChannelUpgradeOpen defines the request type for the ChannelUpgradeOpen rpc */
export interface MsgChannelUpgradeOpen {
  port_id: string;
  channel_id: string;
  counterparty_channel_state: State;
  counterparty_upgrade_sequence: string;
  proof_channel: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/** MsgChannelUpgradeOpenResponse defines the MsgChannelUpgradeOpen response type */
export interface MsgChannelUpgradeOpenResponse {}

/** MsgChannelUpgradeTimeout defines the request type for the ChannelUpgradeTimeout rpc */
export interface MsgChannelUpgradeTimeout {
  port_id: string;
  channel_id: string;
  counterparty_channel?: Channel;
  proof_channel: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/** MsgChannelUpgradeTimeoutRepsonse defines the MsgChannelUpgradeTimeout response type */
export interface MsgChannelUpgradeTimeoutResponse {}

/** MsgChannelUpgradeCancel defines the request type for the ChannelUpgradeCancel rpc */
export interface MsgChannelUpgradeCancel {
  port_id: string;
  channel_id: string;
  error_receipt?: ErrorReceipt;
  proof_error_receipt: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/** MsgChannelUpgradeCancelResponse defines the MsgChannelUpgradeCancel response type */
export interface MsgChannelUpgradeCancelResponse {}

/** MsgUpdateParams is the MsgUpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the channel parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params?: Params;
}

/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponse {}

/** MsgPruneAcknowledgements defines the request type for the PruneAcknowledgements rpc. */
export interface MsgPruneAcknowledgements {
  port_id: string;
  channel_id: string;
  limit: string;
  signer: string;
}

/** MsgPruneAcknowledgementsResponse defines the response type for the PruneAcknowledgements rpc. */
export interface MsgPruneAcknowledgementsResponse {
  /** Number of sequences pruned (includes both packet acknowledgements and packet receipts where appropriate). */
  total_pruned_sequences: string;
  /** Number of sequences left after pruning. */
  total_remaining_sequences: string;
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

  fromPartial(object: DeepPartial<MsgChannelOpenInit>): MsgChannelOpenInit {
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

  fromPartial(
    object: DeepPartial<MsgChannelOpenInitResponse>,
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

  fromPartial(object: DeepPartial<MsgChannelOpenTry>): MsgChannelOpenTry {
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
  return { version: "", channel_id: "" };
}

export const MsgChannelOpenTryResponse = {
  encode(
    message: MsgChannelOpenTryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
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
        case 2:
          message.channel_id = reader.string();
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
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
    };
  },

  toJSON(message: MsgChannelOpenTryResponse): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgChannelOpenTryResponse>,
  ): MsgChannelOpenTryResponse {
    const message = createBaseMsgChannelOpenTryResponse();
    message.version = object.version ?? "";
    message.channel_id = object.channel_id ?? "";
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

  fromPartial(object: DeepPartial<MsgChannelOpenAck>): MsgChannelOpenAck {
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

  fromPartial(
    _: DeepPartial<MsgChannelOpenAckResponse>,
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

  fromPartial(
    object: DeepPartial<MsgChannelOpenConfirm>,
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

  fromPartial(
    _: DeepPartial<MsgChannelOpenConfirmResponse>,
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

  fromPartial(object: DeepPartial<MsgChannelCloseInit>): MsgChannelCloseInit {
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

  fromPartial(
    _: DeepPartial<MsgChannelCloseInitResponse>,
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
    counterparty_upgrade_sequence: "0",
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
    if (message.counterparty_upgrade_sequence !== "0") {
      writer.uint32(48).uint64(message.counterparty_upgrade_sequence);
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
        case 6:
          message.counterparty_upgrade_sequence = longToString(
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
      counterparty_upgrade_sequence: isSet(object.counterparty_upgrade_sequence)
        ? String(object.counterparty_upgrade_sequence)
        : "0",
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
    message.counterparty_upgrade_sequence !== undefined &&
      (obj.counterparty_upgrade_sequence =
        message.counterparty_upgrade_sequence);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgChannelCloseConfirm>,
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
    message.counterparty_upgrade_sequence =
      object.counterparty_upgrade_sequence ?? "0";
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

  fromPartial(
    _: DeepPartial<MsgChannelCloseConfirmResponse>,
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

  fromPartial(object: DeepPartial<MsgRecvPacket>): MsgRecvPacket {
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

  fromPartial(
    object: DeepPartial<MsgRecvPacketResponse>,
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

  fromPartial(object: DeepPartial<MsgTimeout>): MsgTimeout {
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

  fromPartial(object: DeepPartial<MsgTimeoutResponse>): MsgTimeoutResponse {
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
    counterparty_upgrade_sequence: "0",
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
    if (message.counterparty_upgrade_sequence !== "0") {
      writer.uint32(56).uint64(message.counterparty_upgrade_sequence);
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
        case 7:
          message.counterparty_upgrade_sequence = longToString(
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
      counterparty_upgrade_sequence: isSet(object.counterparty_upgrade_sequence)
        ? String(object.counterparty_upgrade_sequence)
        : "0",
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
    message.counterparty_upgrade_sequence !== undefined &&
      (obj.counterparty_upgrade_sequence =
        message.counterparty_upgrade_sequence);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgTimeoutOnClose>): MsgTimeoutOnClose {
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
    message.counterparty_upgrade_sequence =
      object.counterparty_upgrade_sequence ?? "0";
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

  fromPartial(
    object: DeepPartial<MsgTimeoutOnCloseResponse>,
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

  fromPartial(object: DeepPartial<MsgAcknowledgement>): MsgAcknowledgement {
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

  fromPartial(
    object: DeepPartial<MsgAcknowledgementResponse>,
  ): MsgAcknowledgementResponse {
    const message = createBaseMsgAcknowledgementResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgChannelUpgradeInit(): MsgChannelUpgradeInit {
  return { port_id: "", channel_id: "", fields: undefined, signer: "" };
}

export const MsgChannelUpgradeInit = {
  encode(
    message: MsgChannelUpgradeInit,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.fields !== undefined) {
      UpgradeFields.encode(message.fields, writer.uint32(26).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeInit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeInit();
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
          message.fields = UpgradeFields.decode(reader, reader.uint32());
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

  fromJSON(object: any): MsgChannelUpgradeInit {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      fields: isSet(object.fields)
        ? UpgradeFields.fromJSON(object.fields)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeInit): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.fields !== undefined &&
      (obj.fields = message.fields
        ? UpgradeFields.toJSON(message.fields)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgChannelUpgradeInit>,
  ): MsgChannelUpgradeInit {
    const message = createBaseMsgChannelUpgradeInit();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.fields =
      object.fields !== undefined && object.fields !== null
        ? UpgradeFields.fromPartial(object.fields)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeInitResponse(): MsgChannelUpgradeInitResponse {
  return { upgrade: undefined, upgrade_sequence: "0" };
}

export const MsgChannelUpgradeInitResponse = {
  encode(
    message: MsgChannelUpgradeInitResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.upgrade !== undefined) {
      Upgrade.encode(message.upgrade, writer.uint32(10).fork()).ldelim();
    }
    if (message.upgrade_sequence !== "0") {
      writer.uint32(16).uint64(message.upgrade_sequence);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeInitResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upgrade = Upgrade.decode(reader, reader.uint32());
          break;
        case 2:
          message.upgrade_sequence = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeInitResponse {
    return {
      upgrade: isSet(object.upgrade)
        ? Upgrade.fromJSON(object.upgrade)
        : undefined,
      upgrade_sequence: isSet(object.upgrade_sequence)
        ? String(object.upgrade_sequence)
        : "0",
    };
  },

  toJSON(message: MsgChannelUpgradeInitResponse): unknown {
    const obj: any = {};
    message.upgrade !== undefined &&
      (obj.upgrade = message.upgrade
        ? Upgrade.toJSON(message.upgrade)
        : undefined);
    message.upgrade_sequence !== undefined &&
      (obj.upgrade_sequence = message.upgrade_sequence);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgChannelUpgradeInitResponse>,
  ): MsgChannelUpgradeInitResponse {
    const message = createBaseMsgChannelUpgradeInitResponse();
    message.upgrade =
      object.upgrade !== undefined && object.upgrade !== null
        ? Upgrade.fromPartial(object.upgrade)
        : undefined;
    message.upgrade_sequence = object.upgrade_sequence ?? "0";
    return message;
  },
};

function createBaseMsgChannelUpgradeTry(): MsgChannelUpgradeTry {
  return {
    port_id: "",
    channel_id: "",
    proposed_upgrade_connection_hops: [],
    counterparty_upgrade_fields: undefined,
    counterparty_upgrade_sequence: "0",
    proof_channel: new Uint8Array(),
    proof_upgrade: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeTry = {
  encode(
    message: MsgChannelUpgradeTry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    for (const v of message.proposed_upgrade_connection_hops) {
      writer.uint32(26).string(v!);
    }
    if (message.counterparty_upgrade_fields !== undefined) {
      UpgradeFields.encode(
        message.counterparty_upgrade_fields,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.counterparty_upgrade_sequence !== "0") {
      writer.uint32(40).uint64(message.counterparty_upgrade_sequence);
    }
    if (message.proof_channel.length !== 0) {
      writer.uint32(50).bytes(message.proof_channel);
    }
    if (message.proof_upgrade.length !== 0) {
      writer.uint32(58).bytes(message.proof_upgrade);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(66).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(74).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeTry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTry();
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
          message.proposed_upgrade_connection_hops.push(reader.string());
          break;
        case 4:
          message.counterparty_upgrade_fields = UpgradeFields.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 5:
          message.counterparty_upgrade_sequence = longToString(
            reader.uint64() as Long,
          );
          break;
        case 6:
          message.proof_channel = reader.bytes();
          break;
        case 7:
          message.proof_upgrade = reader.bytes();
          break;
        case 8:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 9:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeTry {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      proposed_upgrade_connection_hops: Array.isArray(
        object?.proposed_upgrade_connection_hops,
      )
        ? object.proposed_upgrade_connection_hops.map((e: any) => String(e))
        : [],
      counterparty_upgrade_fields: isSet(object.counterparty_upgrade_fields)
        ? UpgradeFields.fromJSON(object.counterparty_upgrade_fields)
        : undefined,
      counterparty_upgrade_sequence: isSet(object.counterparty_upgrade_sequence)
        ? String(object.counterparty_upgrade_sequence)
        : "0",
      proof_channel: isSet(object.proof_channel)
        ? bytesFromBase64(object.proof_channel)
        : new Uint8Array(),
      proof_upgrade: isSet(object.proof_upgrade)
        ? bytesFromBase64(object.proof_upgrade)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeTry): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    if (message.proposed_upgrade_connection_hops) {
      obj.proposed_upgrade_connection_hops =
        message.proposed_upgrade_connection_hops.map((e) => e);
    } else {
      obj.proposed_upgrade_connection_hops = [];
    }
    message.counterparty_upgrade_fields !== undefined &&
      (obj.counterparty_upgrade_fields = message.counterparty_upgrade_fields
        ? UpgradeFields.toJSON(message.counterparty_upgrade_fields)
        : undefined);
    message.counterparty_upgrade_sequence !== undefined &&
      (obj.counterparty_upgrade_sequence =
        message.counterparty_upgrade_sequence);
    message.proof_channel !== undefined &&
      (obj.proof_channel = base64FromBytes(
        message.proof_channel !== undefined
          ? message.proof_channel
          : new Uint8Array(),
      ));
    message.proof_upgrade !== undefined &&
      (obj.proof_upgrade = base64FromBytes(
        message.proof_upgrade !== undefined
          ? message.proof_upgrade
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgChannelUpgradeTry>): MsgChannelUpgradeTry {
    const message = createBaseMsgChannelUpgradeTry();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.proposed_upgrade_connection_hops =
      object.proposed_upgrade_connection_hops?.map((e) => e) || [];
    message.counterparty_upgrade_fields =
      object.counterparty_upgrade_fields !== undefined &&
      object.counterparty_upgrade_fields !== null
        ? UpgradeFields.fromPartial(object.counterparty_upgrade_fields)
        : undefined;
    message.counterparty_upgrade_sequence =
      object.counterparty_upgrade_sequence ?? "0";
    message.proof_channel = object.proof_channel ?? new Uint8Array();
    message.proof_upgrade = object.proof_upgrade ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeTryResponse(): MsgChannelUpgradeTryResponse {
  return { upgrade: undefined, upgrade_sequence: "0", result: 0 };
}

export const MsgChannelUpgradeTryResponse = {
  encode(
    message: MsgChannelUpgradeTryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.upgrade !== undefined) {
      Upgrade.encode(message.upgrade, writer.uint32(10).fork()).ldelim();
    }
    if (message.upgrade_sequence !== "0") {
      writer.uint32(16).uint64(message.upgrade_sequence);
    }
    if (message.result !== 0) {
      writer.uint32(24).int32(message.result);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeTryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upgrade = Upgrade.decode(reader, reader.uint32());
          break;
        case 2:
          message.upgrade_sequence = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.result = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeTryResponse {
    return {
      upgrade: isSet(object.upgrade)
        ? Upgrade.fromJSON(object.upgrade)
        : undefined,
      upgrade_sequence: isSet(object.upgrade_sequence)
        ? String(object.upgrade_sequence)
        : "0",
      result: isSet(object.result)
        ? responseResultTypeFromJSON(object.result)
        : 0,
    };
  },

  toJSON(message: MsgChannelUpgradeTryResponse): unknown {
    const obj: any = {};
    message.upgrade !== undefined &&
      (obj.upgrade = message.upgrade
        ? Upgrade.toJSON(message.upgrade)
        : undefined);
    message.upgrade_sequence !== undefined &&
      (obj.upgrade_sequence = message.upgrade_sequence);
    message.result !== undefined &&
      (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgChannelUpgradeTryResponse>,
  ): MsgChannelUpgradeTryResponse {
    const message = createBaseMsgChannelUpgradeTryResponse();
    message.upgrade =
      object.upgrade !== undefined && object.upgrade !== null
        ? Upgrade.fromPartial(object.upgrade)
        : undefined;
    message.upgrade_sequence = object.upgrade_sequence ?? "0";
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgChannelUpgradeAck(): MsgChannelUpgradeAck {
  return {
    port_id: "",
    channel_id: "",
    counterparty_upgrade: undefined,
    proof_channel: new Uint8Array(),
    proof_upgrade: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeAck = {
  encode(
    message: MsgChannelUpgradeAck,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.counterparty_upgrade !== undefined) {
      Upgrade.encode(
        message.counterparty_upgrade,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.proof_channel.length !== 0) {
      writer.uint32(34).bytes(message.proof_channel);
    }
    if (message.proof_upgrade.length !== 0) {
      writer.uint32(42).bytes(message.proof_upgrade);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeAck {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeAck();
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
          message.counterparty_upgrade = Upgrade.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.proof_channel = reader.bytes();
          break;
        case 5:
          message.proof_upgrade = reader.bytes();
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

  fromJSON(object: any): MsgChannelUpgradeAck {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      counterparty_upgrade: isSet(object.counterparty_upgrade)
        ? Upgrade.fromJSON(object.counterparty_upgrade)
        : undefined,
      proof_channel: isSet(object.proof_channel)
        ? bytesFromBase64(object.proof_channel)
        : new Uint8Array(),
      proof_upgrade: isSet(object.proof_upgrade)
        ? bytesFromBase64(object.proof_upgrade)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeAck): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.counterparty_upgrade !== undefined &&
      (obj.counterparty_upgrade = message.counterparty_upgrade
        ? Upgrade.toJSON(message.counterparty_upgrade)
        : undefined);
    message.proof_channel !== undefined &&
      (obj.proof_channel = base64FromBytes(
        message.proof_channel !== undefined
          ? message.proof_channel
          : new Uint8Array(),
      ));
    message.proof_upgrade !== undefined &&
      (obj.proof_upgrade = base64FromBytes(
        message.proof_upgrade !== undefined
          ? message.proof_upgrade
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgChannelUpgradeAck>): MsgChannelUpgradeAck {
    const message = createBaseMsgChannelUpgradeAck();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.counterparty_upgrade =
      object.counterparty_upgrade !== undefined &&
      object.counterparty_upgrade !== null
        ? Upgrade.fromPartial(object.counterparty_upgrade)
        : undefined;
    message.proof_channel = object.proof_channel ?? new Uint8Array();
    message.proof_upgrade = object.proof_upgrade ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeAckResponse(): MsgChannelUpgradeAckResponse {
  return { result: 0 };
}

export const MsgChannelUpgradeAckResponse = {
  encode(
    message: MsgChannelUpgradeAckResponse,
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
  ): MsgChannelUpgradeAckResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeAckResponse();
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

  fromJSON(object: any): MsgChannelUpgradeAckResponse {
    return {
      result: isSet(object.result)
        ? responseResultTypeFromJSON(object.result)
        : 0,
    };
  },

  toJSON(message: MsgChannelUpgradeAckResponse): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgChannelUpgradeAckResponse>,
  ): MsgChannelUpgradeAckResponse {
    const message = createBaseMsgChannelUpgradeAckResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgChannelUpgradeConfirm(): MsgChannelUpgradeConfirm {
  return {
    port_id: "",
    channel_id: "",
    counterparty_channel_state: 0,
    counterparty_upgrade: undefined,
    proof_channel: new Uint8Array(),
    proof_upgrade: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeConfirm = {
  encode(
    message: MsgChannelUpgradeConfirm,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.counterparty_channel_state !== 0) {
      writer.uint32(24).int32(message.counterparty_channel_state);
    }
    if (message.counterparty_upgrade !== undefined) {
      Upgrade.encode(
        message.counterparty_upgrade,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.proof_channel.length !== 0) {
      writer.uint32(42).bytes(message.proof_channel);
    }
    if (message.proof_upgrade.length !== 0) {
      writer.uint32(50).bytes(message.proof_upgrade);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(58).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(66).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeConfirm {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeConfirm();
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
          message.counterparty_channel_state = reader.int32() as any;
          break;
        case 4:
          message.counterparty_upgrade = Upgrade.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 5:
          message.proof_channel = reader.bytes();
          break;
        case 6:
          message.proof_upgrade = reader.bytes();
          break;
        case 7:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 8:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeConfirm {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      counterparty_channel_state: isSet(object.counterparty_channel_state)
        ? stateFromJSON(object.counterparty_channel_state)
        : 0,
      counterparty_upgrade: isSet(object.counterparty_upgrade)
        ? Upgrade.fromJSON(object.counterparty_upgrade)
        : undefined,
      proof_channel: isSet(object.proof_channel)
        ? bytesFromBase64(object.proof_channel)
        : new Uint8Array(),
      proof_upgrade: isSet(object.proof_upgrade)
        ? bytesFromBase64(object.proof_upgrade)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeConfirm): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.counterparty_channel_state !== undefined &&
      (obj.counterparty_channel_state = stateToJSON(
        message.counterparty_channel_state,
      ));
    message.counterparty_upgrade !== undefined &&
      (obj.counterparty_upgrade = message.counterparty_upgrade
        ? Upgrade.toJSON(message.counterparty_upgrade)
        : undefined);
    message.proof_channel !== undefined &&
      (obj.proof_channel = base64FromBytes(
        message.proof_channel !== undefined
          ? message.proof_channel
          : new Uint8Array(),
      ));
    message.proof_upgrade !== undefined &&
      (obj.proof_upgrade = base64FromBytes(
        message.proof_upgrade !== undefined
          ? message.proof_upgrade
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgChannelUpgradeConfirm>,
  ): MsgChannelUpgradeConfirm {
    const message = createBaseMsgChannelUpgradeConfirm();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.counterparty_channel_state = object.counterparty_channel_state ?? 0;
    message.counterparty_upgrade =
      object.counterparty_upgrade !== undefined &&
      object.counterparty_upgrade !== null
        ? Upgrade.fromPartial(object.counterparty_upgrade)
        : undefined;
    message.proof_channel = object.proof_channel ?? new Uint8Array();
    message.proof_upgrade = object.proof_upgrade ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeConfirmResponse(): MsgChannelUpgradeConfirmResponse {
  return { result: 0 };
}

export const MsgChannelUpgradeConfirmResponse = {
  encode(
    message: MsgChannelUpgradeConfirmResponse,
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
  ): MsgChannelUpgradeConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeConfirmResponse();
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

  fromJSON(object: any): MsgChannelUpgradeConfirmResponse {
    return {
      result: isSet(object.result)
        ? responseResultTypeFromJSON(object.result)
        : 0,
    };
  },

  toJSON(message: MsgChannelUpgradeConfirmResponse): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgChannelUpgradeConfirmResponse>,
  ): MsgChannelUpgradeConfirmResponse {
    const message = createBaseMsgChannelUpgradeConfirmResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgChannelUpgradeOpen(): MsgChannelUpgradeOpen {
  return {
    port_id: "",
    channel_id: "",
    counterparty_channel_state: 0,
    counterparty_upgrade_sequence: "0",
    proof_channel: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeOpen = {
  encode(
    message: MsgChannelUpgradeOpen,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.counterparty_channel_state !== 0) {
      writer.uint32(24).int32(message.counterparty_channel_state);
    }
    if (message.counterparty_upgrade_sequence !== "0") {
      writer.uint32(32).uint64(message.counterparty_upgrade_sequence);
    }
    if (message.proof_channel.length !== 0) {
      writer.uint32(42).bytes(message.proof_channel);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeOpen {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeOpen();
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
          message.counterparty_channel_state = reader.int32() as any;
          break;
        case 4:
          message.counterparty_upgrade_sequence = longToString(
            reader.uint64() as Long,
          );
          break;
        case 5:
          message.proof_channel = reader.bytes();
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

  fromJSON(object: any): MsgChannelUpgradeOpen {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      counterparty_channel_state: isSet(object.counterparty_channel_state)
        ? stateFromJSON(object.counterparty_channel_state)
        : 0,
      counterparty_upgrade_sequence: isSet(object.counterparty_upgrade_sequence)
        ? String(object.counterparty_upgrade_sequence)
        : "0",
      proof_channel: isSet(object.proof_channel)
        ? bytesFromBase64(object.proof_channel)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeOpen): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.counterparty_channel_state !== undefined &&
      (obj.counterparty_channel_state = stateToJSON(
        message.counterparty_channel_state,
      ));
    message.counterparty_upgrade_sequence !== undefined &&
      (obj.counterparty_upgrade_sequence =
        message.counterparty_upgrade_sequence);
    message.proof_channel !== undefined &&
      (obj.proof_channel = base64FromBytes(
        message.proof_channel !== undefined
          ? message.proof_channel
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgChannelUpgradeOpen>,
  ): MsgChannelUpgradeOpen {
    const message = createBaseMsgChannelUpgradeOpen();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.counterparty_channel_state = object.counterparty_channel_state ?? 0;
    message.counterparty_upgrade_sequence =
      object.counterparty_upgrade_sequence ?? "0";
    message.proof_channel = object.proof_channel ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeOpenResponse(): MsgChannelUpgradeOpenResponse {
  return {};
}

export const MsgChannelUpgradeOpenResponse = {
  encode(
    _: MsgChannelUpgradeOpenResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeOpenResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeOpenResponse();
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

  fromJSON(_: any): MsgChannelUpgradeOpenResponse {
    return {};
  },

  toJSON(_: MsgChannelUpgradeOpenResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgChannelUpgradeOpenResponse>,
  ): MsgChannelUpgradeOpenResponse {
    const message = createBaseMsgChannelUpgradeOpenResponse();
    return message;
  },
};

function createBaseMsgChannelUpgradeTimeout(): MsgChannelUpgradeTimeout {
  return {
    port_id: "",
    channel_id: "",
    counterparty_channel: undefined,
    proof_channel: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeTimeout = {
  encode(
    message: MsgChannelUpgradeTimeout,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.counterparty_channel !== undefined) {
      Channel.encode(
        message.counterparty_channel,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.proof_channel.length !== 0) {
      writer.uint32(34).bytes(message.proof_channel);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(42).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeTimeout {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTimeout();
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
          message.counterparty_channel = Channel.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.proof_channel = reader.bytes();
          break;
        case 5:
          message.proof_height = Height.decode(reader, reader.uint32());
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

  fromJSON(object: any): MsgChannelUpgradeTimeout {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      counterparty_channel: isSet(object.counterparty_channel)
        ? Channel.fromJSON(object.counterparty_channel)
        : undefined,
      proof_channel: isSet(object.proof_channel)
        ? bytesFromBase64(object.proof_channel)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeTimeout): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.counterparty_channel !== undefined &&
      (obj.counterparty_channel = message.counterparty_channel
        ? Channel.toJSON(message.counterparty_channel)
        : undefined);
    message.proof_channel !== undefined &&
      (obj.proof_channel = base64FromBytes(
        message.proof_channel !== undefined
          ? message.proof_channel
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgChannelUpgradeTimeout>,
  ): MsgChannelUpgradeTimeout {
    const message = createBaseMsgChannelUpgradeTimeout();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.counterparty_channel =
      object.counterparty_channel !== undefined &&
      object.counterparty_channel !== null
        ? Channel.fromPartial(object.counterparty_channel)
        : undefined;
    message.proof_channel = object.proof_channel ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeTimeoutResponse(): MsgChannelUpgradeTimeoutResponse {
  return {};
}

export const MsgChannelUpgradeTimeoutResponse = {
  encode(
    _: MsgChannelUpgradeTimeoutResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeTimeoutResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTimeoutResponse();
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

  fromJSON(_: any): MsgChannelUpgradeTimeoutResponse {
    return {};
  },

  toJSON(_: MsgChannelUpgradeTimeoutResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgChannelUpgradeTimeoutResponse>,
  ): MsgChannelUpgradeTimeoutResponse {
    const message = createBaseMsgChannelUpgradeTimeoutResponse();
    return message;
  },
};

function createBaseMsgChannelUpgradeCancel(): MsgChannelUpgradeCancel {
  return {
    port_id: "",
    channel_id: "",
    error_receipt: undefined,
    proof_error_receipt: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeCancel = {
  encode(
    message: MsgChannelUpgradeCancel,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.error_receipt !== undefined) {
      ErrorReceipt.encode(
        message.error_receipt,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.proof_error_receipt.length !== 0) {
      writer.uint32(34).bytes(message.proof_error_receipt);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(42).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeCancel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeCancel();
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
          message.error_receipt = ErrorReceipt.decode(reader, reader.uint32());
          break;
        case 4:
          message.proof_error_receipt = reader.bytes();
          break;
        case 5:
          message.proof_height = Height.decode(reader, reader.uint32());
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

  fromJSON(object: any): MsgChannelUpgradeCancel {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      error_receipt: isSet(object.error_receipt)
        ? ErrorReceipt.fromJSON(object.error_receipt)
        : undefined,
      proof_error_receipt: isSet(object.proof_error_receipt)
        ? bytesFromBase64(object.proof_error_receipt)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeCancel): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.error_receipt !== undefined &&
      (obj.error_receipt = message.error_receipt
        ? ErrorReceipt.toJSON(message.error_receipt)
        : undefined);
    message.proof_error_receipt !== undefined &&
      (obj.proof_error_receipt = base64FromBytes(
        message.proof_error_receipt !== undefined
          ? message.proof_error_receipt
          : new Uint8Array(),
      ));
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgChannelUpgradeCancel>,
  ): MsgChannelUpgradeCancel {
    const message = createBaseMsgChannelUpgradeCancel();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.error_receipt =
      object.error_receipt !== undefined && object.error_receipt !== null
        ? ErrorReceipt.fromPartial(object.error_receipt)
        : undefined;
    message.proof_error_receipt =
      object.proof_error_receipt ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeCancelResponse(): MsgChannelUpgradeCancelResponse {
  return {};
}

export const MsgChannelUpgradeCancelResponse = {
  encode(
    _: MsgChannelUpgradeCancelResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgChannelUpgradeCancelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeCancelResponse();
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

  fromJSON(_: any): MsgChannelUpgradeCancelResponse {
    return {};
  },

  toJSON(_: MsgChannelUpgradeCancelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgChannelUpgradeCancelResponse>,
  ): MsgChannelUpgradeCancelResponse {
    const message = createBaseMsgChannelUpgradeCancelResponse();
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

function createBaseMsgPruneAcknowledgements(): MsgPruneAcknowledgements {
  return { port_id: "", channel_id: "", limit: "0", signer: "" };
}

export const MsgPruneAcknowledgements = {
  encode(
    message: MsgPruneAcknowledgements,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.limit !== "0") {
      writer.uint32(24).uint64(message.limit);
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgPruneAcknowledgements {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPruneAcknowledgements();
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
          message.limit = longToString(reader.uint64() as Long);
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

  fromJSON(object: any): MsgPruneAcknowledgements {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      limit: isSet(object.limit) ? String(object.limit) : "0",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgPruneAcknowledgements): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.limit !== undefined && (obj.limit = message.limit);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgPruneAcknowledgements>,
  ): MsgPruneAcknowledgements {
    const message = createBaseMsgPruneAcknowledgements();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.limit = object.limit ?? "0";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgPruneAcknowledgementsResponse(): MsgPruneAcknowledgementsResponse {
  return { total_pruned_sequences: "0", total_remaining_sequences: "0" };
}

export const MsgPruneAcknowledgementsResponse = {
  encode(
    message: MsgPruneAcknowledgementsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.total_pruned_sequences !== "0") {
      writer.uint32(8).uint64(message.total_pruned_sequences);
    }
    if (message.total_remaining_sequences !== "0") {
      writer.uint32(16).uint64(message.total_remaining_sequences);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgPruneAcknowledgementsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPruneAcknowledgementsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total_pruned_sequences = longToString(
            reader.uint64() as Long,
          );
          break;
        case 2:
          message.total_remaining_sequences = longToString(
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

  fromJSON(object: any): MsgPruneAcknowledgementsResponse {
    return {
      total_pruned_sequences: isSet(object.total_pruned_sequences)
        ? String(object.total_pruned_sequences)
        : "0",
      total_remaining_sequences: isSet(object.total_remaining_sequences)
        ? String(object.total_remaining_sequences)
        : "0",
    };
  },

  toJSON(message: MsgPruneAcknowledgementsResponse): unknown {
    const obj: any = {};
    message.total_pruned_sequences !== undefined &&
      (obj.total_pruned_sequences = message.total_pruned_sequences);
    message.total_remaining_sequences !== undefined &&
      (obj.total_remaining_sequences = message.total_remaining_sequences);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgPruneAcknowledgementsResponse>,
  ): MsgPruneAcknowledgementsResponse {
    const message = createBaseMsgPruneAcknowledgementsResponse();
    message.total_pruned_sequences = object.total_pruned_sequences ?? "0";
    message.total_remaining_sequences = object.total_remaining_sequences ?? "0";
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
  /** ChannelUpgradeInit defines a rpc handler method for MsgChannelUpgradeInit. */
  ChannelUpgradeInit(
    request: MsgChannelUpgradeInit,
  ): Promise<MsgChannelUpgradeInitResponse>;
  /** ChannelUpgradeTry defines a rpc handler method for MsgChannelUpgradeTry. */
  ChannelUpgradeTry(
    request: MsgChannelUpgradeTry,
  ): Promise<MsgChannelUpgradeTryResponse>;
  /** ChannelUpgradeAck defines a rpc handler method for MsgChannelUpgradeAck. */
  ChannelUpgradeAck(
    request: MsgChannelUpgradeAck,
  ): Promise<MsgChannelUpgradeAckResponse>;
  /** ChannelUpgradeConfirm defines a rpc handler method for MsgChannelUpgradeConfirm. */
  ChannelUpgradeConfirm(
    request: MsgChannelUpgradeConfirm,
  ): Promise<MsgChannelUpgradeConfirmResponse>;
  /** ChannelUpgradeOpen defines a rpc handler method for MsgChannelUpgradeOpen. */
  ChannelUpgradeOpen(
    request: MsgChannelUpgradeOpen,
  ): Promise<MsgChannelUpgradeOpenResponse>;
  /** ChannelUpgradeTimeout defines a rpc handler method for MsgChannelUpgradeTimeout. */
  ChannelUpgradeTimeout(
    request: MsgChannelUpgradeTimeout,
  ): Promise<MsgChannelUpgradeTimeoutResponse>;
  /** ChannelUpgradeCancel defines a rpc handler method for MsgChannelUpgradeCancel. */
  ChannelUpgradeCancel(
    request: MsgChannelUpgradeCancel,
  ): Promise<MsgChannelUpgradeCancelResponse>;
  /** UpdateChannelParams defines a rpc handler method for MsgUpdateParams. */
  UpdateChannelParams(
    request: MsgUpdateParams,
  ): Promise<MsgUpdateParamsResponse>;
  /** PruneAcknowledgements defines a rpc handler method for MsgPruneAcknowledgements. */
  PruneAcknowledgements(
    request: MsgPruneAcknowledgements,
  ): Promise<MsgPruneAcknowledgementsResponse>;
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
    this.ChannelUpgradeInit = this.ChannelUpgradeInit.bind(this);
    this.ChannelUpgradeTry = this.ChannelUpgradeTry.bind(this);
    this.ChannelUpgradeAck = this.ChannelUpgradeAck.bind(this);
    this.ChannelUpgradeConfirm = this.ChannelUpgradeConfirm.bind(this);
    this.ChannelUpgradeOpen = this.ChannelUpgradeOpen.bind(this);
    this.ChannelUpgradeTimeout = this.ChannelUpgradeTimeout.bind(this);
    this.ChannelUpgradeCancel = this.ChannelUpgradeCancel.bind(this);
    this.UpdateChannelParams = this.UpdateChannelParams.bind(this);
    this.PruneAcknowledgements = this.PruneAcknowledgements.bind(this);
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

  ChannelUpgradeInit(
    request: MsgChannelUpgradeInit,
  ): Promise<MsgChannelUpgradeInitResponse> {
    const data = MsgChannelUpgradeInit.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelUpgradeInit",
      data,
    );
    return promise.then((data) =>
      MsgChannelUpgradeInitResponse.decode(new _m0.Reader(data)),
    );
  }

  ChannelUpgradeTry(
    request: MsgChannelUpgradeTry,
  ): Promise<MsgChannelUpgradeTryResponse> {
    const data = MsgChannelUpgradeTry.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelUpgradeTry",
      data,
    );
    return promise.then((data) =>
      MsgChannelUpgradeTryResponse.decode(new _m0.Reader(data)),
    );
  }

  ChannelUpgradeAck(
    request: MsgChannelUpgradeAck,
  ): Promise<MsgChannelUpgradeAckResponse> {
    const data = MsgChannelUpgradeAck.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelUpgradeAck",
      data,
    );
    return promise.then((data) =>
      MsgChannelUpgradeAckResponse.decode(new _m0.Reader(data)),
    );
  }

  ChannelUpgradeConfirm(
    request: MsgChannelUpgradeConfirm,
  ): Promise<MsgChannelUpgradeConfirmResponse> {
    const data = MsgChannelUpgradeConfirm.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelUpgradeConfirm",
      data,
    );
    return promise.then((data) =>
      MsgChannelUpgradeConfirmResponse.decode(new _m0.Reader(data)),
    );
  }

  ChannelUpgradeOpen(
    request: MsgChannelUpgradeOpen,
  ): Promise<MsgChannelUpgradeOpenResponse> {
    const data = MsgChannelUpgradeOpen.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelUpgradeOpen",
      data,
    );
    return promise.then((data) =>
      MsgChannelUpgradeOpenResponse.decode(new _m0.Reader(data)),
    );
  }

  ChannelUpgradeTimeout(
    request: MsgChannelUpgradeTimeout,
  ): Promise<MsgChannelUpgradeTimeoutResponse> {
    const data = MsgChannelUpgradeTimeout.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelUpgradeTimeout",
      data,
    );
    return promise.then((data) =>
      MsgChannelUpgradeTimeoutResponse.decode(new _m0.Reader(data)),
    );
  }

  ChannelUpgradeCancel(
    request: MsgChannelUpgradeCancel,
  ): Promise<MsgChannelUpgradeCancelResponse> {
    const data = MsgChannelUpgradeCancel.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "ChannelUpgradeCancel",
      data,
    );
    return promise.then((data) =>
      MsgChannelUpgradeCancelResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateChannelParams(
    request: MsgUpdateParams,
  ): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "UpdateChannelParams",
      data,
    );
    return promise.then((data) =>
      MsgUpdateParamsResponse.decode(new _m0.Reader(data)),
    );
  }

  PruneAcknowledgements(
    request: MsgPruneAcknowledgements,
  ): Promise<MsgPruneAcknowledgementsResponse> {
    const data = MsgPruneAcknowledgements.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.channel.v1.Msg",
      "PruneAcknowledgements",
      data,
    );
    return promise.then((data) =>
      MsgPruneAcknowledgementsResponse.decode(new _m0.Reader(data)),
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
