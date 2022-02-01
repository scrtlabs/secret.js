import { Coin } from "..";
import { CommunityPoolSpendProposal } from "../protobuf_stuff/cosmos/distribution/v1beta1/distribution";
import { TextProposal } from "../protobuf_stuff/cosmos/gov/v1beta1/gov";
import {
  MsgDeposit as MsgDepositProto,
  MsgSubmitProposal as MsgSubmitProposalProto,
  MsgVote as MsgVoteProto,
  MsgVoteWeighted as MsgVoteWeightedProto,
  protobufPackage,
} from "../protobuf_stuff/cosmos/gov/v1beta1/tx";
import { ParameterChangeProposal } from "../protobuf_stuff/cosmos/params/v1beta1/params";
import {
  CancelSoftwareUpgradeProposal,
  SoftwareUpgradeProposal,
} from "../protobuf_stuff/cosmos/upgrade/v1beta1/upgrade";
import { Any } from "../protobuf_stuff/google/protobuf/any";
import {
  ClientUpdateProposal,
  UpgradeProposal,
} from "../protobuf_stuff/ibc/core/client/v1/client";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export type Proposal =
  | TextProposal
  | CommunityPoolSpendProposal
  | ParameterChangeProposal
  | ClientUpdateProposal
  | UpgradeProposal
  | SoftwareUpgradeProposal
  | CancelSoftwareUpgradeProposal;

export {
  TextProposal,
  CommunityPoolSpendProposal,
  ParameterChangeProposal,
  ClientUpdateProposal,
  UpgradeProposal,
  SoftwareUpgradeProposal,
  CancelSoftwareUpgradeProposal,
};

export enum ProposalType {
  TextProposal,
  CommunityPoolSpendProposal,
  ParameterChangeProposal,
  ClientUpdateProposal,
  UpgradeProposal,
  SoftwareUpgradeProposal,
  CancelSoftwareUpgradeProposal,
}

export interface MsgSubmitProposalParams {
  type: ProposalType;
  content: Proposal;
  initialDeposit: Coin[];
  proposer: string;
}

export class MsgSubmitProposal implements Msg {
  public content: Proposal;
  public initialDeposit: Coin[];
  public proposer: string;
  public type: ProposalType;

  constructor({
    type,
    content,
    initialDeposit,
    proposer,
  }: MsgSubmitProposalParams) {
    this.proposer = proposer;
    this.initialDeposit = initialDeposit;
    this.content = content;
    this.type = type;
  }

  async toProto(): Promise<ProtoMsg> {
    let content: Any;

    switch (this.type) {
      case ProposalType.TextProposal:
        content = Any.fromPartial({
          typeUrl: "/cosmos.gov.v1beta1.TextProposal",
          value: TextProposal.encode(
            TextProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.CommunityPoolSpendProposal:
        content = Any.fromPartial({
          typeUrl: "/cosmos.distribution.v1beta1.CommunityPoolSpendProposal",
          value: CommunityPoolSpendProposal.encode(
            CommunityPoolSpendProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.ParameterChangeProposal:
        content = Any.fromPartial({
          typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
          value: ParameterChangeProposal.encode(
            ParameterChangeProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.ClientUpdateProposal:
        content = Any.fromPartial({
          typeUrl: "/ibc.core.client.v1.ClientUpdateProposal",
          value: ClientUpdateProposal.encode(
            ClientUpdateProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.UpgradeProposal:
        content = Any.fromPartial({
          typeUrl: "/ibc.core.client.v1.UpgradeProposal",
          value: UpgradeProposal.encode(
            UpgradeProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.SoftwareUpgradeProposal:
        content = Any.fromPartial({
          typeUrl: "/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal",
          value: SoftwareUpgradeProposal.encode(
            SoftwareUpgradeProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.CancelSoftwareUpgradeProposal:
        content = Any.fromPartial({
          typeUrl: "/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal",
          value: CancelSoftwareUpgradeProposal.encode(
            CancelSoftwareUpgradeProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      default:
        throw new Error(
          `Unknown proposal type: "${this.type}" - ${JSON.stringify(
            this.content,
          )}`,
        );
    }

    const msgContent: MsgSubmitProposalProto = {
      content: content,
      initialDeposit: this.initialDeposit,
      proposer: this.proposer,
    };

    return {
      typeUrl: `/${protobufPackage}.MsgSubmitProposal`,
      value: msgContent,
      encode: function (): Uint8Array {
        return MsgSubmitProposalProto.encode(msgContent).finish();
      },
    };
  }

  async toAmino(): Promise<AminoMsg> {
    let type: string;

    switch (this.type) {
      case ProposalType.TextProposal:
        type = "cosmos-sdk/TextProposal";
        break;

      case ProposalType.CommunityPoolSpendProposal:
        type = "cosmos-sdk/CommunityPoolSpendProposal";
        break;

      case ProposalType.ParameterChangeProposal:
        type = "cosmos-sdk/ParameterChangeProposal";
        break;

      case ProposalType.ClientUpdateProposal:
        throw new Error(
          'Proposal of type "ClientUpdateProposal" is not supported with an Amino signer.',
        );

      case ProposalType.UpgradeProposal:
        throw new Error(
          'Proposal of type "UpgradeProposal" is not supported with an Amino signer.',
        );

      case ProposalType.SoftwareUpgradeProposal:
        type = "cosmos-sdk/SoftwareUpgradeProposal";
        break;

      case ProposalType.CancelSoftwareUpgradeProposal:
        type = "cosmos-sdk/CancelSoftwareUpgradeProposal";
        break;

      default:
        throw new Error(
          `Unknown proposal type: "${this.type}" - ${JSON.stringify(
            this.content,
          )}`,
        );
    }

    return {
      type: "cosmos-sdk/MsgSubmitProposal",
      value: {
        content: { type, value: this.content },
        initial_deposit: this.initialDeposit,
        proposer: this.proposer,
      },
    };
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
