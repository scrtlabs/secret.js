import { AminoMsg, Msg, ProtoMsg } from "./types";
import {
  MsgSend as MsgSendParams,
  MsgMultiSend as MsgMultiSendParams,
  MsgSetSendEnabled as MsgSetSendEnabledParams,
} from "../protobuf/cosmos/bank/v1beta1/tx";

export {
  MsgSend as MsgSendParams,
  MsgMultiSend as MsgMultiSendParams,
  MsgSetSendEnabled as MsgSetSendEnabledParams,
} from "../protobuf/cosmos/bank/v1beta1/tx";

/** MsgSend represents a message to send coins from one account to another. */
export class MsgSend implements Msg {
  constructor(public params: MsgSendParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.bank.v1beta1.MsgSend",
      value: this.params,
      encode: () => MsgSendParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgSend",
      value: this.params,
    };
  }
}

/** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
export class MsgMultiSend implements Msg {
  constructor(public params: MsgMultiSendParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.bank.v1beta1.MsgMultiSend",
      value: this.params,
      encode: () => MsgMultiSendParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgMultiSend",
      value: this.params,
    };
  }
}

export class MsgSetSendEnabled implements Msg {
  constructor(public params: MsgSetSendEnabledParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/cosmos.bank.v1beta1.MsgSetSendEnabled",
      value: this.params,
      encode: () => MsgSetSendEnabledParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgSetSendEnabled",
      value: this.params,
    };
  }
}
