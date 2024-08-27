import {
  MsgPayPacketFeeAsync as MsgPayPacketFeeAsyncParams,
  MsgPayPacketFee as MsgPayPacketFeeParams,
  MsgRegisterCounterpartyPayee as MsgRegisterCounterpartyPayeeParams,
  MsgRegisterPayee as MsgRegisterPayeeParams,
} from "../protobuf/ibc/applications/fee/v1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export {
  MsgPayPacketFeeAsync as MsgPayPacketFeeAsyncParams,
  MsgPayPacketFee as MsgPayPacketFeeParams,
  MsgRegisterCounterpartyPayee as MsgRegisterCounterpartyPayeeParams,
  MsgRegisterPayee as MsgRegisterPayeeParams,
} from "../protobuf/ibc/applications/fee/v1/tx";

/** MsgRegisterPayee defines the request type for the RegisterPayee rpc */
export class MsgRegisterPayee implements Msg {
  constructor(public params: MsgRegisterPayeeParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.applications.fee.v1.MsgRegisterPayee",
      value: this.params,
      encode: () => MsgRegisterPayeeParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgRegisterPayee",
      value: this.params,
    };
  }
}

/** MsgRegisterCounterpartyPayee defines the request type for the RegisterCounterpartyPayee rpc */
export class MsgRegisterCounterpartyPayee implements Msg {
  constructor(public params: MsgRegisterCounterpartyPayeeParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee",
      value: this.params,
      encode: () =>
        MsgRegisterCounterpartyPayeeParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgRegisterCounterpartyPayee",
      value: this.params,
    };
  }
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
      encode: () => MsgPayPacketFeeParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgPayPacketFee",
      value: this.params,
    };
  }
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
      encode: () => MsgPayPacketFeeAsyncParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgPayPacketFeeAsync",
      value: this.params,
    };
  }
}
