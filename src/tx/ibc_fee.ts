import { MsgParams } from ".";
import { Fee, PacketFee } from "../protobuf/ibc/applications/fee/v1/fee";
import {
  MsgPayPacketFeeAsync as MsgPayPacketFeeAsyncProto,
  MsgPayPacketFee as MsgPayPacketFeeProto,
  MsgRegisterCounterpartyPayee as MsgRegisterCounterpartyPayeeProto,
  MsgRegisterPayee as MsgRegisterPayeeProto,
} from "../protobuf/ibc/applications/fee/v1/tx";
import { PacketId } from "../protobuf/ibc/core/channel/v1/channel";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export interface MsgRegisterPayeeParams extends MsgParams {
  /** unique port identifier */
  port_id: string;
  /** unique channel identifier */
  channel_id: string;
  /** the relayer address */
  relayer: string;
  /** the payee address */
  payee: string;
}

/** MsgRegisterPayee defines the request type for the RegisterPayee rpc */
export class MsgRegisterPayee implements Msg {
  constructor(public params: MsgRegisterPayeeParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.applications.fee.v1.MsgRegisterPayee",
      value: this.params,
      encode: async () => MsgRegisterPayeeProto.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgRegisterPayee",
      value: this.params,
    };
  }
}

export interface MsgRegisterCounterpartyPayeeParams extends MsgParams {
  /** unique port identifier */
  port_id: string;
  /** unique channel identifier */
  channel_id: string;
  /** the relayer address */
  relayer: string;
  /** the counterparty payee address */
  counterparty_payee: string;
}

/** MsgRegisterCounterpartyPayee defines the request type for the RegisterCounterpartyPayee rpc */
export class MsgRegisterCounterpartyPayee implements Msg {
  constructor(public params: MsgRegisterCounterpartyPayeeParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee",
      value: this.params,
      encode: async () =>
        MsgRegisterCounterpartyPayeeProto.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgRegisterCounterpartyPayee",
      value: this.params,
    };
  }
}

export interface MsgPayPacketFeeParams extends MsgParams {
  /** fee encapsulates the recv, ack and timeout fees associated with an IBC packet */
  fee: Fee;
  /** the source port unique identifier */
  source_port_id: string;
  /** the source channel unique identifer */
  source_channel_id: string;
  /** account address to refund fee if necessary */
  signer: string;
  /** optional list of relayers permitted to the receive packet fees */
  relayers?: string[];
}

/**
 * MsgPayPacketFee defines the request type for the PayPacketFee rpc
 * This Msg can be used to pay for a packet at the next sequence send & should be combined with the Msg that will be
 * paid for
 */
export class MsgPayPacketFee implements Msg {
  constructor(public params: MsgPayPacketFeeParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.applications.fee.v1.MsgPayPacketFee",
      value: this.params,
      encode: async () =>
        MsgPayPacketFeeProto.encode({
          fee: this.params.fee,
          source_port_id: this.params.source_port_id,
          source_channel_id: this.params.source_channel_id,
          signer: this.params.signer,
          relayers: this.params.relayers || [],
        }).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgPayPacketFee",
      value: this.params,
    };
  }
}

export interface MsgPayPacketFeeAsyncParams extends MsgParams {
  /** unique packet identifier comprised of the channel ID, port ID and sequence */
  packet_id: PacketId;
  /** the packet fee associated with a particular IBC packet */
  packet_fee: PacketFee;
}

/**
 * MsgPayPacketFeeAsync defines the request type for the PayPacketFeeAsync rpc
 * This Msg can be used to pay for a packet at a specified sequence (instead of the next sequence send)
 */
export class MsgPayPacketFeeAsync implements Msg {
  constructor(public params: MsgPayPacketFeeAsyncParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.applications.fee.v1.MsgPayPacketFeeAsync",
      value: this.params,
      encode: async () =>
        MsgPayPacketFeeAsyncProto.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgPayPacketFeeAsync",
      value: this.params,
    };
  }
}
