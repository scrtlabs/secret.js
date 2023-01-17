/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { IdentifiedChannel, PacketState } from "./channel";

export const protobufPackage = "ibc.core.channel.v1";

/** GenesisState defines the ibc channel submodule's genesis state. */
export interface GenesisState {
  channels: IdentifiedChannel[];
  acknowledgements: PacketState[];
  commitments: PacketState[];
  receipts: PacketState[];
  send_sequences: PacketSequence[];
  recv_sequences: PacketSequence[];
  ack_sequences: PacketSequence[];
  /** the sequence for the next generated channel identifier */
  next_channel_sequence: string;
}

/**
 * PacketSequence defines the genesis type necessary to retrieve and store
 * next send and receive sequences.
 */
export interface PacketSequence {
  port_id: string;
  channel_id: string;
  sequence: string;
}

function createBaseGenesisState(): GenesisState {
  return {
    channels: [],
    acknowledgements: [],
    commitments: [],
    receipts: [],
    send_sequences: [],
    recv_sequences: [],
    ack_sequences: [],
    next_channel_sequence: "0",
  };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.channels) {
      IdentifiedChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.acknowledgements) {
      PacketState.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.commitments) {
      PacketState.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.receipts) {
      PacketState.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.send_sequences) {
      PacketSequence.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.recv_sequences) {
      PacketSequence.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.ack_sequences) {
      PacketSequence.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.next_channel_sequence !== "0") {
      writer.uint32(64).uint64(message.next_channel_sequence);
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
          message.channels.push(
            IdentifiedChannel.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.acknowledgements.push(
            PacketState.decode(reader, reader.uint32()),
          );
          break;
        case 3:
          message.commitments.push(PacketState.decode(reader, reader.uint32()));
          break;
        case 4:
          message.receipts.push(PacketState.decode(reader, reader.uint32()));
          break;
        case 5:
          message.send_sequences.push(
            PacketSequence.decode(reader, reader.uint32()),
          );
          break;
        case 6:
          message.recv_sequences.push(
            PacketSequence.decode(reader, reader.uint32()),
          );
          break;
        case 7:
          message.ack_sequences.push(
            PacketSequence.decode(reader, reader.uint32()),
          );
          break;
        case 8:
          message.next_channel_sequence = longToString(reader.uint64() as Long);
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
      channels: Array.isArray(object?.channels)
        ? object.channels.map((e: any) => IdentifiedChannel.fromJSON(e))
        : [],
      acknowledgements: Array.isArray(object?.acknowledgements)
        ? object.acknowledgements.map((e: any) => PacketState.fromJSON(e))
        : [],
      commitments: Array.isArray(object?.commitments)
        ? object.commitments.map((e: any) => PacketState.fromJSON(e))
        : [],
      receipts: Array.isArray(object?.receipts)
        ? object.receipts.map((e: any) => PacketState.fromJSON(e))
        : [],
      send_sequences: Array.isArray(object?.send_sequences)
        ? object.send_sequences.map((e: any) => PacketSequence.fromJSON(e))
        : [],
      recv_sequences: Array.isArray(object?.recv_sequences)
        ? object.recv_sequences.map((e: any) => PacketSequence.fromJSON(e))
        : [],
      ack_sequences: Array.isArray(object?.ack_sequences)
        ? object.ack_sequences.map((e: any) => PacketSequence.fromJSON(e))
        : [],
      next_channel_sequence: isSet(object.next_channel_sequence)
        ? String(object.next_channel_sequence)
        : "0",
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.channels) {
      obj.channels = message.channels.map((e) =>
        e ? IdentifiedChannel.toJSON(e) : undefined,
      );
    } else {
      obj.channels = [];
    }
    if (message.acknowledgements) {
      obj.acknowledgements = message.acknowledgements.map((e) =>
        e ? PacketState.toJSON(e) : undefined,
      );
    } else {
      obj.acknowledgements = [];
    }
    if (message.commitments) {
      obj.commitments = message.commitments.map((e) =>
        e ? PacketState.toJSON(e) : undefined,
      );
    } else {
      obj.commitments = [];
    }
    if (message.receipts) {
      obj.receipts = message.receipts.map((e) =>
        e ? PacketState.toJSON(e) : undefined,
      );
    } else {
      obj.receipts = [];
    }
    if (message.send_sequences) {
      obj.send_sequences = message.send_sequences.map((e) =>
        e ? PacketSequence.toJSON(e) : undefined,
      );
    } else {
      obj.send_sequences = [];
    }
    if (message.recv_sequences) {
      obj.recv_sequences = message.recv_sequences.map((e) =>
        e ? PacketSequence.toJSON(e) : undefined,
      );
    } else {
      obj.recv_sequences = [];
    }
    if (message.ack_sequences) {
      obj.ack_sequences = message.ack_sequences.map((e) =>
        e ? PacketSequence.toJSON(e) : undefined,
      );
    } else {
      obj.ack_sequences = [];
    }
    message.next_channel_sequence !== undefined &&
      (obj.next_channel_sequence = message.next_channel_sequence);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I,
  ): GenesisState {
    const message = createBaseGenesisState();
    message.channels =
      object.channels?.map((e) => IdentifiedChannel.fromPartial(e)) || [];
    message.acknowledgements =
      object.acknowledgements?.map((e) => PacketState.fromPartial(e)) || [];
    message.commitments =
      object.commitments?.map((e) => PacketState.fromPartial(e)) || [];
    message.receipts =
      object.receipts?.map((e) => PacketState.fromPartial(e)) || [];
    message.send_sequences =
      object.send_sequences?.map((e) => PacketSequence.fromPartial(e)) || [];
    message.recv_sequences =
      object.recv_sequences?.map((e) => PacketSequence.fromPartial(e)) || [];
    message.ack_sequences =
      object.ack_sequences?.map((e) => PacketSequence.fromPartial(e)) || [];
    message.next_channel_sequence = object.next_channel_sequence ?? "0";
    return message;
  },
};

function createBasePacketSequence(): PacketSequence {
  return { port_id: "", channel_id: "", sequence: "0" };
}

export const PacketSequence = {
  encode(
    message: PacketSequence,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.sequence !== "0") {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PacketSequence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketSequence();
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
          message.sequence = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PacketSequence {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      sequence: isSet(object.sequence) ? String(object.sequence) : "0",
    };
  },

  toJSON(message: PacketSequence): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.sequence !== undefined && (obj.sequence = message.sequence);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PacketSequence>, I>>(
    object: I,
  ): PacketSequence {
    const message = createBasePacketSequence();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.sequence = object.sequence ?? "0";
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
