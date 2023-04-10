/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Counterparty, Version } from "./connection";
import { Any } from "../../../../google/protobuf/any";
import { Height } from "../../client/v1/client";

export const protobufPackage = "ibc.core.connection.v1";

/**
 * MsgConnectionOpenInit defines the msg sent by an account on Chain A to
 * initialize a connection with Chain B.
 */
export interface MsgConnectionOpenInit {
  client_id: string;
  counterparty?: Counterparty;
  version?: Version;
  delay_period: string;
  signer: string;
}

/**
 * MsgConnectionOpenInitResponse defines the Msg/ConnectionOpenInit response
 * type.
 */
export interface MsgConnectionOpenInitResponse {}

/**
 * MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a
 * connection on Chain B.
 */
export interface MsgConnectionOpenTry {
  client_id: string;
  /**
   * Deprecated: this field is unused. Crossing hellos are no longer supported in core IBC.
   *
   * @deprecated
   */
  previous_connection_id: string;
  client_state?: Any;
  counterparty?: Counterparty;
  delay_period: string;
  counterparty_versions: Version[];
  proof_height?: Height;
  /**
   * proof of the initialization the connection on Chain A: `UNITIALIZED ->
   * INIT`
   */
  proof_init: Uint8Array;
  /** proof of client state included in message */
  proof_client: Uint8Array;
  /** proof of client consensus state */
  proof_consensus: Uint8Array;
  consensus_height?: Height;
  signer: string;
}

/** MsgConnectionOpenTryResponse defines the Msg/ConnectionOpenTry response type. */
export interface MsgConnectionOpenTryResponse {}

/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
export interface MsgConnectionOpenAck {
  connection_id: string;
  counterparty_connection_id: string;
  version?: Version;
  client_state?: Any;
  proof_height?: Height;
  /**
   * proof of the initialization the connection on Chain B: `UNITIALIZED ->
   * TRYOPEN`
   */
  proof_try: Uint8Array;
  /** proof of client state included in message */
  proof_client: Uint8Array;
  /** proof of client consensus state */
  proof_consensus: Uint8Array;
  consensus_height?: Height;
  signer: string;
}

/** MsgConnectionOpenAckResponse defines the Msg/ConnectionOpenAck response type. */
export interface MsgConnectionOpenAckResponse {}

/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
export interface MsgConnectionOpenConfirm {
  connection_id: string;
  /** proof for the change of the connection state on Chain A: `INIT -> OPEN` */
  proof_ack: Uint8Array;
  proof_height?: Height;
  signer: string;
}

/**
 * MsgConnectionOpenConfirmResponse defines the Msg/ConnectionOpenConfirm
 * response type.
 */
export interface MsgConnectionOpenConfirmResponse {}

function createBaseMsgConnectionOpenInit(): MsgConnectionOpenInit {
  return {
    client_id: "",
    counterparty: undefined,
    version: undefined,
    delay_period: "0",
    signer: "",
  };
}

export const MsgConnectionOpenInit = {
  encode(
    message: MsgConnectionOpenInit,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    if (message.counterparty !== undefined) {
      Counterparty.encode(
        message.counterparty,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.version !== undefined) {
      Version.encode(message.version, writer.uint32(26).fork()).ldelim();
    }
    if (message.delay_period !== "0") {
      writer.uint32(32).uint64(message.delay_period);
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgConnectionOpenInit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.client_id = reader.string();
          break;
        case 2:
          message.counterparty = Counterparty.decode(reader, reader.uint32());
          break;
        case 3:
          message.version = Version.decode(reader, reader.uint32());
          break;
        case 4:
          message.delay_period = longToString(reader.uint64() as Long);
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

  fromJSON(object: any): MsgConnectionOpenInit {
    return {
      client_id: isSet(object.client_id) ? String(object.client_id) : "",
      counterparty: isSet(object.counterparty)
        ? Counterparty.fromJSON(object.counterparty)
        : undefined,
      version: isSet(object.version)
        ? Version.fromJSON(object.version)
        : undefined,
      delay_period: isSet(object.delay_period)
        ? String(object.delay_period)
        : "0",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgConnectionOpenInit): unknown {
    const obj: any = {};
    message.client_id !== undefined && (obj.client_id = message.client_id);
    message.counterparty !== undefined &&
      (obj.counterparty = message.counterparty
        ? Counterparty.toJSON(message.counterparty)
        : undefined);
    message.version !== undefined &&
      (obj.version = message.version
        ? Version.toJSON(message.version)
        : undefined);
    message.delay_period !== undefined &&
      (obj.delay_period = message.delay_period);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConnectionOpenInit>, I>>(
    object: I,
  ): MsgConnectionOpenInit {
    const message = createBaseMsgConnectionOpenInit();
    message.client_id = object.client_id ?? "";
    message.counterparty =
      object.counterparty !== undefined && object.counterparty !== null
        ? Counterparty.fromPartial(object.counterparty)
        : undefined;
    message.version =
      object.version !== undefined && object.version !== null
        ? Version.fromPartial(object.version)
        : undefined;
    message.delay_period = object.delay_period ?? "0";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgConnectionOpenInitResponse(): MsgConnectionOpenInitResponse {
  return {};
}

export const MsgConnectionOpenInitResponse = {
  encode(
    _: MsgConnectionOpenInitResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgConnectionOpenInitResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenInitResponse();
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

  fromJSON(_: any): MsgConnectionOpenInitResponse {
    return {};
  },

  toJSON(_: MsgConnectionOpenInitResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConnectionOpenInitResponse>, I>>(
    _: I,
  ): MsgConnectionOpenInitResponse {
    const message = createBaseMsgConnectionOpenInitResponse();
    return message;
  },
};

function createBaseMsgConnectionOpenTry(): MsgConnectionOpenTry {
  return {
    client_id: "",
    previous_connection_id: "",
    client_state: undefined,
    counterparty: undefined,
    delay_period: "0",
    counterparty_versions: [],
    proof_height: undefined,
    proof_init: new Uint8Array(),
    proof_client: new Uint8Array(),
    proof_consensus: new Uint8Array(),
    consensus_height: undefined,
    signer: "",
  };
}

export const MsgConnectionOpenTry = {
  encode(
    message: MsgConnectionOpenTry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    if (message.previous_connection_id !== "") {
      writer.uint32(18).string(message.previous_connection_id);
    }
    if (message.client_state !== undefined) {
      Any.encode(message.client_state, writer.uint32(26).fork()).ldelim();
    }
    if (message.counterparty !== undefined) {
      Counterparty.encode(
        message.counterparty,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.delay_period !== "0") {
      writer.uint32(40).uint64(message.delay_period);
    }
    for (const v of message.counterparty_versions) {
      Version.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(58).fork()).ldelim();
    }
    if (message.proof_init.length !== 0) {
      writer.uint32(66).bytes(message.proof_init);
    }
    if (message.proof_client.length !== 0) {
      writer.uint32(74).bytes(message.proof_client);
    }
    if (message.proof_consensus.length !== 0) {
      writer.uint32(82).bytes(message.proof_consensus);
    }
    if (message.consensus_height !== undefined) {
      Height.encode(
        message.consensus_height,
        writer.uint32(90).fork(),
      ).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(98).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgConnectionOpenTry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenTry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.client_id = reader.string();
          break;
        case 2:
          message.previous_connection_id = reader.string();
          break;
        case 3:
          message.client_state = Any.decode(reader, reader.uint32());
          break;
        case 4:
          message.counterparty = Counterparty.decode(reader, reader.uint32());
          break;
        case 5:
          message.delay_period = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.counterparty_versions.push(
            Version.decode(reader, reader.uint32()),
          );
          break;
        case 7:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 8:
          message.proof_init = reader.bytes();
          break;
        case 9:
          message.proof_client = reader.bytes();
          break;
        case 10:
          message.proof_consensus = reader.bytes();
          break;
        case 11:
          message.consensus_height = Height.decode(reader, reader.uint32());
          break;
        case 12:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgConnectionOpenTry {
    return {
      client_id: isSet(object.client_id) ? String(object.client_id) : "",
      previous_connection_id: isSet(object.previous_connection_id)
        ? String(object.previous_connection_id)
        : "",
      client_state: isSet(object.client_state)
        ? Any.fromJSON(object.client_state)
        : undefined,
      counterparty: isSet(object.counterparty)
        ? Counterparty.fromJSON(object.counterparty)
        : undefined,
      delay_period: isSet(object.delay_period)
        ? String(object.delay_period)
        : "0",
      counterparty_versions: Array.isArray(object?.counterparty_versions)
        ? object.counterparty_versions.map((e: any) => Version.fromJSON(e))
        : [],
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      proof_init: isSet(object.proof_init)
        ? bytesFromBase64(object.proof_init)
        : new Uint8Array(),
      proof_client: isSet(object.proof_client)
        ? bytesFromBase64(object.proof_client)
        : new Uint8Array(),
      proof_consensus: isSet(object.proof_consensus)
        ? bytesFromBase64(object.proof_consensus)
        : new Uint8Array(),
      consensus_height: isSet(object.consensus_height)
        ? Height.fromJSON(object.consensus_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgConnectionOpenTry): unknown {
    const obj: any = {};
    message.client_id !== undefined && (obj.client_id = message.client_id);
    message.previous_connection_id !== undefined &&
      (obj.previous_connection_id = message.previous_connection_id);
    message.client_state !== undefined &&
      (obj.client_state = message.client_state
        ? Any.toJSON(message.client_state)
        : undefined);
    message.counterparty !== undefined &&
      (obj.counterparty = message.counterparty
        ? Counterparty.toJSON(message.counterparty)
        : undefined);
    message.delay_period !== undefined &&
      (obj.delay_period = message.delay_period);
    if (message.counterparty_versions) {
      obj.counterparty_versions = message.counterparty_versions.map((e) =>
        e ? Version.toJSON(e) : undefined,
      );
    } else {
      obj.counterparty_versions = [];
    }
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.proof_init !== undefined &&
      (obj.proof_init = base64FromBytes(
        message.proof_init !== undefined
          ? message.proof_init
          : new Uint8Array(),
      ));
    message.proof_client !== undefined &&
      (obj.proof_client = base64FromBytes(
        message.proof_client !== undefined
          ? message.proof_client
          : new Uint8Array(),
      ));
    message.proof_consensus !== undefined &&
      (obj.proof_consensus = base64FromBytes(
        message.proof_consensus !== undefined
          ? message.proof_consensus
          : new Uint8Array(),
      ));
    message.consensus_height !== undefined &&
      (obj.consensus_height = message.consensus_height
        ? Height.toJSON(message.consensus_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConnectionOpenTry>, I>>(
    object: I,
  ): MsgConnectionOpenTry {
    const message = createBaseMsgConnectionOpenTry();
    message.client_id = object.client_id ?? "";
    message.previous_connection_id = object.previous_connection_id ?? "";
    message.client_state =
      object.client_state !== undefined && object.client_state !== null
        ? Any.fromPartial(object.client_state)
        : undefined;
    message.counterparty =
      object.counterparty !== undefined && object.counterparty !== null
        ? Counterparty.fromPartial(object.counterparty)
        : undefined;
    message.delay_period = object.delay_period ?? "0";
    message.counterparty_versions =
      object.counterparty_versions?.map((e) => Version.fromPartial(e)) || [];
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.proof_init = object.proof_init ?? new Uint8Array();
    message.proof_client = object.proof_client ?? new Uint8Array();
    message.proof_consensus = object.proof_consensus ?? new Uint8Array();
    message.consensus_height =
      object.consensus_height !== undefined && object.consensus_height !== null
        ? Height.fromPartial(object.consensus_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgConnectionOpenTryResponse(): MsgConnectionOpenTryResponse {
  return {};
}

export const MsgConnectionOpenTryResponse = {
  encode(
    _: MsgConnectionOpenTryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgConnectionOpenTryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenTryResponse();
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

  fromJSON(_: any): MsgConnectionOpenTryResponse {
    return {};
  },

  toJSON(_: MsgConnectionOpenTryResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConnectionOpenTryResponse>, I>>(
    _: I,
  ): MsgConnectionOpenTryResponse {
    const message = createBaseMsgConnectionOpenTryResponse();
    return message;
  },
};

function createBaseMsgConnectionOpenAck(): MsgConnectionOpenAck {
  return {
    connection_id: "",
    counterparty_connection_id: "",
    version: undefined,
    client_state: undefined,
    proof_height: undefined,
    proof_try: new Uint8Array(),
    proof_client: new Uint8Array(),
    proof_consensus: new Uint8Array(),
    consensus_height: undefined,
    signer: "",
  };
}

export const MsgConnectionOpenAck = {
  encode(
    message: MsgConnectionOpenAck,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    if (message.counterparty_connection_id !== "") {
      writer.uint32(18).string(message.counterparty_connection_id);
    }
    if (message.version !== undefined) {
      Version.encode(message.version, writer.uint32(26).fork()).ldelim();
    }
    if (message.client_state !== undefined) {
      Any.encode(message.client_state, writer.uint32(34).fork()).ldelim();
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(42).fork()).ldelim();
    }
    if (message.proof_try.length !== 0) {
      writer.uint32(50).bytes(message.proof_try);
    }
    if (message.proof_client.length !== 0) {
      writer.uint32(58).bytes(message.proof_client);
    }
    if (message.proof_consensus.length !== 0) {
      writer.uint32(66).bytes(message.proof_consensus);
    }
    if (message.consensus_height !== undefined) {
      Height.encode(
        message.consensus_height,
        writer.uint32(74).fork(),
      ).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(82).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgConnectionOpenAck {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connection_id = reader.string();
          break;
        case 2:
          message.counterparty_connection_id = reader.string();
          break;
        case 3:
          message.version = Version.decode(reader, reader.uint32());
          break;
        case 4:
          message.client_state = Any.decode(reader, reader.uint32());
          break;
        case 5:
          message.proof_height = Height.decode(reader, reader.uint32());
          break;
        case 6:
          message.proof_try = reader.bytes();
          break;
        case 7:
          message.proof_client = reader.bytes();
          break;
        case 8:
          message.proof_consensus = reader.bytes();
          break;
        case 9:
          message.consensus_height = Height.decode(reader, reader.uint32());
          break;
        case 10:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgConnectionOpenAck {
    return {
      connection_id: isSet(object.connection_id)
        ? String(object.connection_id)
        : "",
      counterparty_connection_id: isSet(object.counterparty_connection_id)
        ? String(object.counterparty_connection_id)
        : "",
      version: isSet(object.version)
        ? Version.fromJSON(object.version)
        : undefined,
      client_state: isSet(object.client_state)
        ? Any.fromJSON(object.client_state)
        : undefined,
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      proof_try: isSet(object.proof_try)
        ? bytesFromBase64(object.proof_try)
        : new Uint8Array(),
      proof_client: isSet(object.proof_client)
        ? bytesFromBase64(object.proof_client)
        : new Uint8Array(),
      proof_consensus: isSet(object.proof_consensus)
        ? bytesFromBase64(object.proof_consensus)
        : new Uint8Array(),
      consensus_height: isSet(object.consensus_height)
        ? Height.fromJSON(object.consensus_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgConnectionOpenAck): unknown {
    const obj: any = {};
    message.connection_id !== undefined &&
      (obj.connection_id = message.connection_id);
    message.counterparty_connection_id !== undefined &&
      (obj.counterparty_connection_id = message.counterparty_connection_id);
    message.version !== undefined &&
      (obj.version = message.version
        ? Version.toJSON(message.version)
        : undefined);
    message.client_state !== undefined &&
      (obj.client_state = message.client_state
        ? Any.toJSON(message.client_state)
        : undefined);
    message.proof_height !== undefined &&
      (obj.proof_height = message.proof_height
        ? Height.toJSON(message.proof_height)
        : undefined);
    message.proof_try !== undefined &&
      (obj.proof_try = base64FromBytes(
        message.proof_try !== undefined ? message.proof_try : new Uint8Array(),
      ));
    message.proof_client !== undefined &&
      (obj.proof_client = base64FromBytes(
        message.proof_client !== undefined
          ? message.proof_client
          : new Uint8Array(),
      ));
    message.proof_consensus !== undefined &&
      (obj.proof_consensus = base64FromBytes(
        message.proof_consensus !== undefined
          ? message.proof_consensus
          : new Uint8Array(),
      ));
    message.consensus_height !== undefined &&
      (obj.consensus_height = message.consensus_height
        ? Height.toJSON(message.consensus_height)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConnectionOpenAck>, I>>(
    object: I,
  ): MsgConnectionOpenAck {
    const message = createBaseMsgConnectionOpenAck();
    message.connection_id = object.connection_id ?? "";
    message.counterparty_connection_id =
      object.counterparty_connection_id ?? "";
    message.version =
      object.version !== undefined && object.version !== null
        ? Version.fromPartial(object.version)
        : undefined;
    message.client_state =
      object.client_state !== undefined && object.client_state !== null
        ? Any.fromPartial(object.client_state)
        : undefined;
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.proof_try = object.proof_try ?? new Uint8Array();
    message.proof_client = object.proof_client ?? new Uint8Array();
    message.proof_consensus = object.proof_consensus ?? new Uint8Array();
    message.consensus_height =
      object.consensus_height !== undefined && object.consensus_height !== null
        ? Height.fromPartial(object.consensus_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgConnectionOpenAckResponse(): MsgConnectionOpenAckResponse {
  return {};
}

export const MsgConnectionOpenAckResponse = {
  encode(
    _: MsgConnectionOpenAckResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgConnectionOpenAckResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenAckResponse();
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

  fromJSON(_: any): MsgConnectionOpenAckResponse {
    return {};
  },

  toJSON(_: MsgConnectionOpenAckResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConnectionOpenAckResponse>, I>>(
    _: I,
  ): MsgConnectionOpenAckResponse {
    const message = createBaseMsgConnectionOpenAckResponse();
    return message;
  },
};

function createBaseMsgConnectionOpenConfirm(): MsgConnectionOpenConfirm {
  return {
    connection_id: "",
    proof_ack: new Uint8Array(),
    proof_height: undefined,
    signer: "",
  };
}

export const MsgConnectionOpenConfirm = {
  encode(
    message: MsgConnectionOpenConfirm,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    if (message.proof_ack.length !== 0) {
      writer.uint32(18).bytes(message.proof_ack);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgConnectionOpenConfirm {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenConfirm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connection_id = reader.string();
          break;
        case 2:
          message.proof_ack = reader.bytes();
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

  fromJSON(object: any): MsgConnectionOpenConfirm {
    return {
      connection_id: isSet(object.connection_id)
        ? String(object.connection_id)
        : "",
      proof_ack: isSet(object.proof_ack)
        ? bytesFromBase64(object.proof_ack)
        : new Uint8Array(),
      proof_height: isSet(object.proof_height)
        ? Height.fromJSON(object.proof_height)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgConnectionOpenConfirm): unknown {
    const obj: any = {};
    message.connection_id !== undefined &&
      (obj.connection_id = message.connection_id);
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

  fromPartial<I extends Exact<DeepPartial<MsgConnectionOpenConfirm>, I>>(
    object: I,
  ): MsgConnectionOpenConfirm {
    const message = createBaseMsgConnectionOpenConfirm();
    message.connection_id = object.connection_id ?? "";
    message.proof_ack = object.proof_ack ?? new Uint8Array();
    message.proof_height =
      object.proof_height !== undefined && object.proof_height !== null
        ? Height.fromPartial(object.proof_height)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgConnectionOpenConfirmResponse(): MsgConnectionOpenConfirmResponse {
  return {};
}

export const MsgConnectionOpenConfirmResponse = {
  encode(
    _: MsgConnectionOpenConfirmResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgConnectionOpenConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConnectionOpenConfirmResponse();
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

  fromJSON(_: any): MsgConnectionOpenConfirmResponse {
    return {};
  },

  toJSON(_: MsgConnectionOpenConfirmResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgConnectionOpenConfirmResponse>, I>,
  >(_: I): MsgConnectionOpenConfirmResponse {
    const message = createBaseMsgConnectionOpenConfirmResponse();
    return message;
  },
};

/** Msg defines the ibc/connection Msg service. */
export interface Msg {
  /** ConnectionOpenInit defines a rpc handler method for MsgConnectionOpenInit. */
  ConnectionOpenInit(
    request: MsgConnectionOpenInit,
  ): Promise<MsgConnectionOpenInitResponse>;
  /** ConnectionOpenTry defines a rpc handler method for MsgConnectionOpenTry. */
  ConnectionOpenTry(
    request: MsgConnectionOpenTry,
  ): Promise<MsgConnectionOpenTryResponse>;
  /** ConnectionOpenAck defines a rpc handler method for MsgConnectionOpenAck. */
  ConnectionOpenAck(
    request: MsgConnectionOpenAck,
  ): Promise<MsgConnectionOpenAckResponse>;
  /**
   * ConnectionOpenConfirm defines a rpc handler method for
   * MsgConnectionOpenConfirm.
   */
  ConnectionOpenConfirm(
    request: MsgConnectionOpenConfirm,
  ): Promise<MsgConnectionOpenConfirmResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ConnectionOpenInit = this.ConnectionOpenInit.bind(this);
    this.ConnectionOpenTry = this.ConnectionOpenTry.bind(this);
    this.ConnectionOpenAck = this.ConnectionOpenAck.bind(this);
    this.ConnectionOpenConfirm = this.ConnectionOpenConfirm.bind(this);
  }
  ConnectionOpenInit(
    request: MsgConnectionOpenInit,
  ): Promise<MsgConnectionOpenInitResponse> {
    const data = MsgConnectionOpenInit.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.connection.v1.Msg",
      "ConnectionOpenInit",
      data,
    );
    return promise.then((data) =>
      MsgConnectionOpenInitResponse.decode(new _m0.Reader(data)),
    );
  }

  ConnectionOpenTry(
    request: MsgConnectionOpenTry,
  ): Promise<MsgConnectionOpenTryResponse> {
    const data = MsgConnectionOpenTry.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.connection.v1.Msg",
      "ConnectionOpenTry",
      data,
    );
    return promise.then((data) =>
      MsgConnectionOpenTryResponse.decode(new _m0.Reader(data)),
    );
  }

  ConnectionOpenAck(
    request: MsgConnectionOpenAck,
  ): Promise<MsgConnectionOpenAckResponse> {
    const data = MsgConnectionOpenAck.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.connection.v1.Msg",
      "ConnectionOpenAck",
      data,
    );
    return promise.then((data) =>
      MsgConnectionOpenAckResponse.decode(new _m0.Reader(data)),
    );
  }

  ConnectionOpenConfirm(
    request: MsgConnectionOpenConfirm,
  ): Promise<MsgConnectionOpenConfirmResponse> {
    const data = MsgConnectionOpenConfirm.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.connection.v1.Msg",
      "ConnectionOpenConfirm",
      data,
    );
    return promise.then((data) =>
      MsgConnectionOpenConfirmResponse.decode(new _m0.Reader(data)),
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
