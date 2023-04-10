/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { PacketId } from "../../../core/channel/v1/channel";
import { IdentifiedPacketFees } from "./fee";

export const protobufPackage = "ibc.applications.fee.v1";

/** GenesisState defines the ICS29 fee middleware genesis state */
export interface GenesisState {
  /** list of identified packet fees */
  identified_fees: IdentifiedPacketFees[];
  /** list of fee enabled channels */
  fee_enabled_channels: FeeEnabledChannel[];
  /** list of registered payees */
  registered_payees: RegisteredPayee[];
  /** list of registered counterparty payees */
  registered_counterparty_payees: RegisteredCounterpartyPayee[];
  /** list of forward relayer addresses */
  forward_relayers: ForwardRelayerAddress[];
}

/** FeeEnabledChannel contains the PortID & ChannelID for a fee enabled channel */
export interface FeeEnabledChannel {
  /** unique port identifier */
  port_id: string;
  /** unique channel identifier */
  channel_id: string;
}

/** RegisteredPayee contains the relayer address and payee address for a specific channel */
export interface RegisteredPayee {
  /** unique channel identifier */
  channel_id: string;
  /** the relayer address */
  relayer: string;
  /** the payee address */
  payee: string;
}

/**
 * RegisteredCounterpartyPayee contains the relayer address and counterparty payee address for a specific channel (used
 * for recv fee distribution)
 */
export interface RegisteredCounterpartyPayee {
  /** unique channel identifier */
  channel_id: string;
  /** the relayer address */
  relayer: string;
  /** the counterparty payee address */
  counterparty_payee: string;
}

/** ForwardRelayerAddress contains the forward relayer address and PacketId used for async acknowledgements */
export interface ForwardRelayerAddress {
  /** the forward relayer address */
  address: string;
  /** unique packet identifer comprised of the channel ID, port ID and sequence */
  packet_id?: PacketId;
}

function createBaseGenesisState(): GenesisState {
  return {
    identified_fees: [],
    fee_enabled_channels: [],
    registered_payees: [],
    registered_counterparty_payees: [],
    forward_relayers: [],
  };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.identified_fees) {
      IdentifiedPacketFees.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.fee_enabled_channels) {
      FeeEnabledChannel.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.registered_payees) {
      RegisteredPayee.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.registered_counterparty_payees) {
      RegisteredCounterpartyPayee.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.forward_relayers) {
      ForwardRelayerAddress.encode(v!, writer.uint32(42).fork()).ldelim();
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
          message.identified_fees.push(
            IdentifiedPacketFees.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.fee_enabled_channels.push(
            FeeEnabledChannel.decode(reader, reader.uint32()),
          );
          break;
        case 3:
          message.registered_payees.push(
            RegisteredPayee.decode(reader, reader.uint32()),
          );
          break;
        case 4:
          message.registered_counterparty_payees.push(
            RegisteredCounterpartyPayee.decode(reader, reader.uint32()),
          );
          break;
        case 5:
          message.forward_relayers.push(
            ForwardRelayerAddress.decode(reader, reader.uint32()),
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
      identified_fees: Array.isArray(object?.identified_fees)
        ? object.identified_fees.map((e: any) =>
            IdentifiedPacketFees.fromJSON(e),
          )
        : [],
      fee_enabled_channels: Array.isArray(object?.fee_enabled_channels)
        ? object.fee_enabled_channels.map((e: any) =>
            FeeEnabledChannel.fromJSON(e),
          )
        : [],
      registered_payees: Array.isArray(object?.registered_payees)
        ? object.registered_payees.map((e: any) => RegisteredPayee.fromJSON(e))
        : [],
      registered_counterparty_payees: Array.isArray(
        object?.registered_counterparty_payees,
      )
        ? object.registered_counterparty_payees.map((e: any) =>
            RegisteredCounterpartyPayee.fromJSON(e),
          )
        : [],
      forward_relayers: Array.isArray(object?.forward_relayers)
        ? object.forward_relayers.map((e: any) =>
            ForwardRelayerAddress.fromJSON(e),
          )
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.identified_fees) {
      obj.identified_fees = message.identified_fees.map((e) =>
        e ? IdentifiedPacketFees.toJSON(e) : undefined,
      );
    } else {
      obj.identified_fees = [];
    }
    if (message.fee_enabled_channels) {
      obj.fee_enabled_channels = message.fee_enabled_channels.map((e) =>
        e ? FeeEnabledChannel.toJSON(e) : undefined,
      );
    } else {
      obj.fee_enabled_channels = [];
    }
    if (message.registered_payees) {
      obj.registered_payees = message.registered_payees.map((e) =>
        e ? RegisteredPayee.toJSON(e) : undefined,
      );
    } else {
      obj.registered_payees = [];
    }
    if (message.registered_counterparty_payees) {
      obj.registered_counterparty_payees =
        message.registered_counterparty_payees.map((e) =>
          e ? RegisteredCounterpartyPayee.toJSON(e) : undefined,
        );
    } else {
      obj.registered_counterparty_payees = [];
    }
    if (message.forward_relayers) {
      obj.forward_relayers = message.forward_relayers.map((e) =>
        e ? ForwardRelayerAddress.toJSON(e) : undefined,
      );
    } else {
      obj.forward_relayers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I,
  ): GenesisState {
    const message = createBaseGenesisState();
    message.identified_fees =
      object.identified_fees?.map((e) => IdentifiedPacketFees.fromPartial(e)) ||
      [];
    message.fee_enabled_channels =
      object.fee_enabled_channels?.map((e) =>
        FeeEnabledChannel.fromPartial(e),
      ) || [];
    message.registered_payees =
      object.registered_payees?.map((e) => RegisteredPayee.fromPartial(e)) ||
      [];
    message.registered_counterparty_payees =
      object.registered_counterparty_payees?.map((e) =>
        RegisteredCounterpartyPayee.fromPartial(e),
      ) || [];
    message.forward_relayers =
      object.forward_relayers?.map((e) =>
        ForwardRelayerAddress.fromPartial(e),
      ) || [];
    return message;
  },
};

function createBaseFeeEnabledChannel(): FeeEnabledChannel {
  return { port_id: "", channel_id: "" };
}

export const FeeEnabledChannel = {
  encode(
    message: FeeEnabledChannel,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FeeEnabledChannel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeeEnabledChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.port_id = reader.string();
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

  fromJSON(object: any): FeeEnabledChannel {
    return {
      port_id: isSet(object.port_id) ? String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
    };
  },

  toJSON(message: FeeEnabledChannel): unknown {
    const obj: any = {};
    message.port_id !== undefined && (obj.port_id = message.port_id);
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FeeEnabledChannel>, I>>(
    object: I,
  ): FeeEnabledChannel {
    const message = createBaseFeeEnabledChannel();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseRegisteredPayee(): RegisteredPayee {
  return { channel_id: "", relayer: "", payee: "" };
}

export const RegisteredPayee = {
  encode(
    message: RegisteredPayee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.relayer !== "") {
      writer.uint32(18).string(message.relayer);
    }
    if (message.payee !== "") {
      writer.uint32(26).string(message.payee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisteredPayee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredPayee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.relayer = reader.string();
          break;
        case 3:
          message.payee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisteredPayee {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      relayer: isSet(object.relayer) ? String(object.relayer) : "",
      payee: isSet(object.payee) ? String(object.payee) : "",
    };
  },

  toJSON(message: RegisteredPayee): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.relayer !== undefined && (obj.relayer = message.relayer);
    message.payee !== undefined && (obj.payee = message.payee);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisteredPayee>, I>>(
    object: I,
  ): RegisteredPayee {
    const message = createBaseRegisteredPayee();
    message.channel_id = object.channel_id ?? "";
    message.relayer = object.relayer ?? "";
    message.payee = object.payee ?? "";
    return message;
  },
};

function createBaseRegisteredCounterpartyPayee(): RegisteredCounterpartyPayee {
  return { channel_id: "", relayer: "", counterparty_payee: "" };
}

export const RegisteredCounterpartyPayee = {
  encode(
    message: RegisteredCounterpartyPayee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.relayer !== "") {
      writer.uint32(18).string(message.relayer);
    }
    if (message.counterparty_payee !== "") {
      writer.uint32(26).string(message.counterparty_payee);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RegisteredCounterpartyPayee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredCounterpartyPayee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel_id = reader.string();
          break;
        case 2:
          message.relayer = reader.string();
          break;
        case 3:
          message.counterparty_payee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisteredCounterpartyPayee {
    return {
      channel_id: isSet(object.channel_id) ? String(object.channel_id) : "",
      relayer: isSet(object.relayer) ? String(object.relayer) : "",
      counterparty_payee: isSet(object.counterparty_payee)
        ? String(object.counterparty_payee)
        : "",
    };
  },

  toJSON(message: RegisteredCounterpartyPayee): unknown {
    const obj: any = {};
    message.channel_id !== undefined && (obj.channel_id = message.channel_id);
    message.relayer !== undefined && (obj.relayer = message.relayer);
    message.counterparty_payee !== undefined &&
      (obj.counterparty_payee = message.counterparty_payee);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisteredCounterpartyPayee>, I>>(
    object: I,
  ): RegisteredCounterpartyPayee {
    const message = createBaseRegisteredCounterpartyPayee();
    message.channel_id = object.channel_id ?? "";
    message.relayer = object.relayer ?? "";
    message.counterparty_payee = object.counterparty_payee ?? "";
    return message;
  },
};

function createBaseForwardRelayerAddress(): ForwardRelayerAddress {
  return { address: "", packet_id: undefined };
}

export const ForwardRelayerAddress = {
  encode(
    message: ForwardRelayerAddress,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.packet_id !== undefined) {
      PacketId.encode(message.packet_id, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ForwardRelayerAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseForwardRelayerAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.packet_id = PacketId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ForwardRelayerAddress {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      packet_id: isSet(object.packet_id)
        ? PacketId.fromJSON(object.packet_id)
        : undefined,
    };
  },

  toJSON(message: ForwardRelayerAddress): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.packet_id !== undefined &&
      (obj.packet_id = message.packet_id
        ? PacketId.toJSON(message.packet_id)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ForwardRelayerAddress>, I>>(
    object: I,
  ): ForwardRelayerAddress {
    const message = createBaseForwardRelayerAddress();
    message.address = object.address ?? "";
    message.packet_id =
      object.packet_id !== undefined && object.packet_id !== null
        ? PacketId.fromPartial(object.packet_id)
        : undefined;
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
