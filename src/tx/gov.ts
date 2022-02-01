import {
  MsgDeposit as MsgDepositProto,
  MsgSubmitProposal as MsgSubmitProposalProto,
  MsgVote as MsgVoteProto,
  MsgVoteWeighted as MsgVoteWeightedProto,
} from "../protobuf_stuff/cosmos/gov/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgSubmitProposal implements Msg {
  constructor(msg: MsgSubmitProposalProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgVote implements Msg {
  constructor(msg: MsgVoteProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgVoteWeighted implements Msg {
  constructor(msg: MsgVoteWeightedProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgDeposit implements Msg {
  constructor(msg: MsgDepositProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}
