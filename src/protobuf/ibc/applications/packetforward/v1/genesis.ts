/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "packetforward.v1";

/** GenesisState defines the packetforward genesis state */
export interface GenesisState {
  params?: Params;
  /**
   * key - information about forwarded packet: src_channel
   * (parsedReceiver.Channel), src_port (parsedReceiver.Port), sequence value -
   * information about original packet for refunding if necessary: retries,
   * srcPacketSender, srcPacket.DestinationChannel, srcPacket.DestinationPort
   */
  in_flight_packets: { [key: string]: InFlightPacket };
}

export interface GenesisState_InFlightPacketsEntry {
  key: string;
  value?: InFlightPacket;
}

/** Params defines the set of IBC packetforward parameters. */
export interface Params {
  fee_percentage: string;
}

/**
 * InFlightPacket contains information about original packet for
 * writing the acknowledgement and refunding if necessary.
 */
export interface InFlightPacket {
  original_sender_address: string;
  refund_channel_id: string;
  refund_port_id: string;
  packet_src_channel_id: string;
  packet_src_port_id: string;
  packet_timeout_timestamp: string;
  packet_timeout_height: string;
  packet_data: Uint8Array;
  refund_sequence: string;
  retries_remaining: number;
  timeout: string;
  nonrefundable: boolean;
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, in_flight_packets: {} };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    Object.entries(message.in_flight_packets).forEach(([key, value]) => {
      GenesisState_InFlightPacketsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork(),
      ).ldelim();
    });
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
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          const entry2 = GenesisState_InFlightPacketsEntry.decode(
            reader,
            reader.uint32(),
          );
          if (entry2.value !== undefined) {
            message.in_flight_packets[entry2.key] = entry2.value;
          }
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
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      in_flight_packets: isObject(object.in_flight_packets)
        ? Object.entries(object.in_flight_packets).reduce<{
            [key: string]: InFlightPacket;
          }>((acc, [key, value]) => {
            acc[key] = InFlightPacket.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    obj.in_flight_packets = {};
    if (message.in_flight_packets) {
      Object.entries(message.in_flight_packets).forEach(([k, v]) => {
        obj.in_flight_packets[k] = InFlightPacket.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I,
  ): GenesisState {
    const message = createBaseGenesisState();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    message.in_flight_packets = Object.entries(
      object.in_flight_packets ?? {},
    ).reduce<{ [key: string]: InFlightPacket }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = InFlightPacket.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGenesisState_InFlightPacketsEntry(): GenesisState_InFlightPacketsEntry {
  return { key: "", value: undefined };
}

export const GenesisState_InFlightPacketsEntry = {
  encode(
    message: GenesisState_InFlightPacketsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      InFlightPacket.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GenesisState_InFlightPacketsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_InFlightPacketsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = InFlightPacket.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState_InFlightPacketsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? InFlightPacket.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: GenesisState_InFlightPacketsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? InFlightPacket.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GenesisState_InFlightPacketsEntry>, I>,
  >(object: I): GenesisState_InFlightPacketsEntry {
    const message = createBaseGenesisState_InFlightPacketsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? InFlightPacket.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseParams(): Params {
  return { fee_percentage: "" };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.fee_percentage !== "") {
      writer.uint32(10).string(message.fee_percentage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fee_percentage = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      fee_percentage: isSet(object.fee_percentage)
        ? String(object.fee_percentage)
        : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.fee_percentage !== undefined &&
      (obj.fee_percentage = message.fee_percentage);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.fee_percentage = object.fee_percentage ?? "";
    return message;
  },
};

function createBaseInFlightPacket(): InFlightPacket {
  return {
    original_sender_address: "",
    refund_channel_id: "",
    refund_port_id: "",
    packet_src_channel_id: "",
    packet_src_port_id: "",
    packet_timeout_timestamp: "0",
    packet_timeout_height: "",
    packet_data: new Uint8Array(),
    refund_sequence: "0",
    retries_remaining: 0,
    timeout: "0",
    nonrefundable: false,
  };
}

export const InFlightPacket = {
  encode(
    message: InFlightPacket,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.original_sender_address !== "") {
      writer.uint32(10).string(message.original_sender_address);
    }
    if (message.refund_channel_id !== "") {
      writer.uint32(18).string(message.refund_channel_id);
    }
    if (message.refund_port_id !== "") {
      writer.uint32(26).string(message.refund_port_id);
    }
    if (message.packet_src_channel_id !== "") {
      writer.uint32(34).string(message.packet_src_channel_id);
    }
    if (message.packet_src_port_id !== "") {
      writer.uint32(42).string(message.packet_src_port_id);
    }
    if (message.packet_timeout_timestamp !== "0") {
      writer.uint32(48).uint64(message.packet_timeout_timestamp);
    }
    if (message.packet_timeout_height !== "") {
      writer.uint32(58).string(message.packet_timeout_height);
    }
    if (message.packet_data.length !== 0) {
      writer.uint32(66).bytes(message.packet_data);
    }
    if (message.refund_sequence !== "0") {
      writer.uint32(72).uint64(message.refund_sequence);
    }
    if (message.retries_remaining !== 0) {
      writer.uint32(80).int32(message.retries_remaining);
    }
    if (message.timeout !== "0") {
      writer.uint32(88).uint64(message.timeout);
    }
    if (message.nonrefundable === true) {
      writer.uint32(96).bool(message.nonrefundable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InFlightPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInFlightPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.original_sender_address = reader.string();
          break;
        case 2:
          message.refund_channel_id = reader.string();
          break;
        case 3:
          message.refund_port_id = reader.string();
          break;
        case 4:
          message.packet_src_channel_id = reader.string();
          break;
        case 5:
          message.packet_src_port_id = reader.string();
          break;
        case 6:
          message.packet_timeout_timestamp = longToString(
            reader.uint64() as Long,
          );
          break;
        case 7:
          message.packet_timeout_height = reader.string();
          break;
        case 8:
          message.packet_data = reader.bytes();
          break;
        case 9:
          message.refund_sequence = longToString(reader.uint64() as Long);
          break;
        case 10:
          message.retries_remaining = reader.int32();
          break;
        case 11:
          message.timeout = longToString(reader.uint64() as Long);
          break;
        case 12:
          message.nonrefundable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InFlightPacket {
    return {
      original_sender_address: isSet(object.original_sender_address)
        ? String(object.original_sender_address)
        : "",
      refund_channel_id: isSet(object.refund_channel_id)
        ? String(object.refund_channel_id)
        : "",
      refund_port_id: isSet(object.refund_port_id)
        ? String(object.refund_port_id)
        : "",
      packet_src_channel_id: isSet(object.packet_src_channel_id)
        ? String(object.packet_src_channel_id)
        : "",
      packet_src_port_id: isSet(object.packet_src_port_id)
        ? String(object.packet_src_port_id)
        : "",
      packet_timeout_timestamp: isSet(object.packet_timeout_timestamp)
        ? String(object.packet_timeout_timestamp)
        : "0",
      packet_timeout_height: isSet(object.packet_timeout_height)
        ? String(object.packet_timeout_height)
        : "",
      packet_data: isSet(object.packet_data)
        ? bytesFromBase64(object.packet_data)
        : new Uint8Array(),
      refund_sequence: isSet(object.refund_sequence)
        ? String(object.refund_sequence)
        : "0",
      retries_remaining: isSet(object.retries_remaining)
        ? Number(object.retries_remaining)
        : 0,
      timeout: isSet(object.timeout) ? String(object.timeout) : "0",
      nonrefundable: isSet(object.nonrefundable)
        ? Boolean(object.nonrefundable)
        : false,
    };
  },

  toJSON(message: InFlightPacket): unknown {
    const obj: any = {};
    message.original_sender_address !== undefined &&
      (obj.original_sender_address = message.original_sender_address);
    message.refund_channel_id !== undefined &&
      (obj.refund_channel_id = message.refund_channel_id);
    message.refund_port_id !== undefined &&
      (obj.refund_port_id = message.refund_port_id);
    message.packet_src_channel_id !== undefined &&
      (obj.packet_src_channel_id = message.packet_src_channel_id);
    message.packet_src_port_id !== undefined &&
      (obj.packet_src_port_id = message.packet_src_port_id);
    message.packet_timeout_timestamp !== undefined &&
      (obj.packet_timeout_timestamp = message.packet_timeout_timestamp);
    message.packet_timeout_height !== undefined &&
      (obj.packet_timeout_height = message.packet_timeout_height);
    message.packet_data !== undefined &&
      (obj.packet_data = base64FromBytes(
        message.packet_data !== undefined
          ? message.packet_data
          : new Uint8Array(),
      ));
    message.refund_sequence !== undefined &&
      (obj.refund_sequence = message.refund_sequence);
    message.retries_remaining !== undefined &&
      (obj.retries_remaining = Math.round(message.retries_remaining));
    message.timeout !== undefined && (obj.timeout = message.timeout);
    message.nonrefundable !== undefined &&
      (obj.nonrefundable = message.nonrefundable);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InFlightPacket>, I>>(
    object: I,
  ): InFlightPacket {
    const message = createBaseInFlightPacket();
    message.original_sender_address = object.original_sender_address ?? "";
    message.refund_channel_id = object.refund_channel_id ?? "";
    message.refund_port_id = object.refund_port_id ?? "";
    message.packet_src_channel_id = object.packet_src_channel_id ?? "";
    message.packet_src_port_id = object.packet_src_port_id ?? "";
    message.packet_timeout_timestamp = object.packet_timeout_timestamp ?? "0";
    message.packet_timeout_height = object.packet_timeout_height ?? "";
    message.packet_data = object.packet_data ?? new Uint8Array();
    message.refund_sequence = object.refund_sequence ?? "0";
    message.retries_remaining = object.retries_remaining ?? 0;
    message.timeout = object.timeout ?? "0";
    message.nonrefundable = object.nonrefundable ?? false;
    return message;
  },
};

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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
