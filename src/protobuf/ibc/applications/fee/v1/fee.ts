/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { PacketId } from "../../../core/channel/v1/channel";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "ibc.applications.fee.v1";

/** Fee defines the ICS29 receive, acknowledgement and timeout fees */
export interface Fee {
  /** the packet receive fee */
  recv_fee: Coin[];
  /** the packet acknowledgement fee */
  ack_fee: Coin[];
  /** the packet timeout fee */
  timeout_fee: Coin[];
}

/** PacketFee contains ICS29 relayer fees, refund address and optional list of permitted relayers */
export interface PacketFee {
  /** fee encapsulates the recv, ack and timeout fees associated with an IBC packet */
  fee?: Fee;
  /** the refund address for unspent fees */
  refund_address: string;
  /** optional list of relayers permitted to receive fees */
  relayers: string[];
}

/** PacketFees contains a list of type PacketFee */
export interface PacketFees {
  /** list of packet fees */
  packet_fees: PacketFee[];
}

/** IdentifiedPacketFees contains a list of type PacketFee and associated PacketId */
export interface IdentifiedPacketFees {
  /** unique packet identifier comprised of the channel ID, port ID and sequence */
  packet_id?: PacketId;
  /** list of packet fees */
  packet_fees: PacketFee[];
}

function createBaseFee(): Fee {
  return { recv_fee: [], ack_fee: [], timeout_fee: [] };
}

export const Fee = {
  encode(message: Fee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.recv_fee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.ack_fee) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.timeout_fee) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recv_fee.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.ack_fee.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.timeout_fee.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Fee {
    return {
      recv_fee: Array.isArray(object?.recv_fee)
        ? object.recv_fee.map((e: any) => Coin.fromJSON(e))
        : [],
      ack_fee: Array.isArray(object?.ack_fee)
        ? object.ack_fee.map((e: any) => Coin.fromJSON(e))
        : [],
      timeout_fee: Array.isArray(object?.timeout_fee)
        ? object.timeout_fee.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Fee): unknown {
    const obj: any = {};
    if (message.recv_fee) {
      obj.recv_fee = message.recv_fee.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.recv_fee = [];
    }
    if (message.ack_fee) {
      obj.ack_fee = message.ack_fee.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.ack_fee = [];
    }
    if (message.timeout_fee) {
      obj.timeout_fee = message.timeout_fee.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.timeout_fee = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Fee>, I>>(object: I): Fee {
    const message = createBaseFee();
    message.recv_fee = object.recv_fee?.map((e) => Coin.fromPartial(e)) || [];
    message.ack_fee = object.ack_fee?.map((e) => Coin.fromPartial(e)) || [];
    message.timeout_fee =
      object.timeout_fee?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePacketFee(): PacketFee {
  return { fee: undefined, refund_address: "", relayers: [] };
}

export const PacketFee = {
  encode(
    message: PacketFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(10).fork()).ldelim();
    }
    if (message.refund_address !== "") {
      writer.uint32(18).string(message.refund_address);
    }
    for (const v of message.relayers) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PacketFee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fee = Fee.decode(reader, reader.uint32());
          break;
        case 2:
          message.refund_address = reader.string();
          break;
        case 3:
          message.relayers.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PacketFee {
    return {
      fee: isSet(object.fee) ? Fee.fromJSON(object.fee) : undefined,
      refund_address: isSet(object.refund_address)
        ? String(object.refund_address)
        : "",
      relayers: Array.isArray(object?.relayers)
        ? object.relayers.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: PacketFee): unknown {
    const obj: any = {};
    message.fee !== undefined &&
      (obj.fee = message.fee ? Fee.toJSON(message.fee) : undefined);
    message.refund_address !== undefined &&
      (obj.refund_address = message.refund_address);
    if (message.relayers) {
      obj.relayers = message.relayers.map((e) => e);
    } else {
      obj.relayers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PacketFee>, I>>(
    object: I,
  ): PacketFee {
    const message = createBasePacketFee();
    message.fee =
      object.fee !== undefined && object.fee !== null
        ? Fee.fromPartial(object.fee)
        : undefined;
    message.refund_address = object.refund_address ?? "";
    message.relayers = object.relayers?.map((e) => e) || [];
    return message;
  },
};

function createBasePacketFees(): PacketFees {
  return { packet_fees: [] };
}

export const PacketFees = {
  encode(
    message: PacketFees,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.packet_fees) {
      PacketFee.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PacketFees {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketFees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet_fees.push(PacketFee.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PacketFees {
    return {
      packet_fees: Array.isArray(object?.packet_fees)
        ? object.packet_fees.map((e: any) => PacketFee.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PacketFees): unknown {
    const obj: any = {};
    if (message.packet_fees) {
      obj.packet_fees = message.packet_fees.map((e) =>
        e ? PacketFee.toJSON(e) : undefined,
      );
    } else {
      obj.packet_fees = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PacketFees>, I>>(
    object: I,
  ): PacketFees {
    const message = createBasePacketFees();
    message.packet_fees =
      object.packet_fees?.map((e) => PacketFee.fromPartial(e)) || [];
    return message;
  },
};

function createBaseIdentifiedPacketFees(): IdentifiedPacketFees {
  return { packet_id: undefined, packet_fees: [] };
}

export const IdentifiedPacketFees = {
  encode(
    message: IdentifiedPacketFees,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.packet_id !== undefined) {
      PacketId.encode(message.packet_id, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.packet_fees) {
      PacketFee.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): IdentifiedPacketFees {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentifiedPacketFees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet_id = PacketId.decode(reader, reader.uint32());
          break;
        case 2:
          message.packet_fees.push(PacketFee.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IdentifiedPacketFees {
    return {
      packet_id: isSet(object.packet_id)
        ? PacketId.fromJSON(object.packet_id)
        : undefined,
      packet_fees: Array.isArray(object?.packet_fees)
        ? object.packet_fees.map((e: any) => PacketFee.fromJSON(e))
        : [],
    };
  },

  toJSON(message: IdentifiedPacketFees): unknown {
    const obj: any = {};
    message.packet_id !== undefined &&
      (obj.packet_id = message.packet_id
        ? PacketId.toJSON(message.packet_id)
        : undefined);
    if (message.packet_fees) {
      obj.packet_fees = message.packet_fees.map((e) =>
        e ? PacketFee.toJSON(e) : undefined,
      );
    } else {
      obj.packet_fees = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IdentifiedPacketFees>, I>>(
    object: I,
  ): IdentifiedPacketFees {
    const message = createBaseIdentifiedPacketFees();
    message.packet_id =
      object.packet_id !== undefined && object.packet_id !== null
        ? PacketId.fromPartial(object.packet_id)
        : undefined;
    message.packet_fees =
      object.packet_fees?.map((e) => PacketFee.fromPartial(e)) || [];
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
