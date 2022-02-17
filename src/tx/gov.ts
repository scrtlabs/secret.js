import BigNumber from "bignumber.js";
import { Coin, MsgParams } from "..";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export type ProposalContent =
  | import("../protobuf_stuff/cosmos/gov/v1beta1/gov").TextProposal
  | import("../protobuf_stuff/cosmos/distribution/v1beta1/distribution").CommunityPoolSpendProposal
  | import("../protobuf_stuff/cosmos/params/v1beta1/params").ParameterChangeProposal
  | import("../protobuf_stuff/ibc/core/client/v1/client").ClientUpdateProposal
  | import("../protobuf_stuff/ibc/core/client/v1/client").UpgradeProposal
  | import("../protobuf_stuff/cosmos/upgrade/v1beta1/upgrade").SoftwareUpgradeProposal
  | import("../protobuf_stuff/cosmos/upgrade/v1beta1/upgrade").CancelSoftwareUpgradeProposal;

/** VoteOption enumerates the valid vote options for a given governance proposal. */
export enum VoteOption {
  /** VOTE_OPTION_UNSPECIFIED defines a no-op vote option. */
  VOTE_OPTION_UNSPECIFIED = 0,
  /** VOTE_OPTION_YES defines a yes vote option. */
  VOTE_OPTION_YES = 1,
  /** VOTE_OPTION_ABSTAIN defines an abstain vote option. */
  VOTE_OPTION_ABSTAIN = 2,
  /** VOTE_OPTION_NO defines a no vote option. */
  VOTE_OPTION_NO = 3,
  /** VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option. */
  VOTE_OPTION_NO_WITH_VETO = 4,
}

/** ProposalStatus enumerates the valid statuses of a proposal. */
export enum ProposalStatus {
  /** PROPOSAL_STATUS_UNSPECIFIED defines the default propopsal status. */
  PROPOSAL_STATUS_UNSPECIFIED = 0,
  /** PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit period. */
  PROPOSAL_STATUS_DEPOSIT_PERIOD = 1,
  /** PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting period. */
  PROPOSAL_STATUS_VOTING_PERIOD = 2,
  /** PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has passed. */
  PROPOSAL_STATUS_PASSED = 3,
  /** PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has been rejected. */
  PROPOSAL_STATUS_REJECTED = 4,
  /** PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has failed. */
  PROPOSAL_STATUS_FAILED = 5,
  UNRECOGNIZED = -1,
}

/** ParamChange defines an individual parameter change, for use in ParameterChangeProposal. */
export type ParamChange = {
  subspace: string;
  key: string;
  value: string;
};

export enum ProposalType {
  TextProposal = "TextProposal",
  CommunityPoolSpendProposal = "CommunityPoolSpendProposal",
  /**
   * @see {@link https://docs.scrt.network/guides/governance} for possible subspaces, keys and values.
   */
  ParameterChangeProposal = "ParameterChangeProposal",
  /** Not supported with Amino signer. */
  ClientUpdateProposal = "ClientUpdateProposal",
  /** Not supported with Amino signer. */
  UpgradeProposal = "UpgradeProposal",
  SoftwareUpgradeProposal = "SoftwareUpgradeProposal",
  CancelSoftwareUpgradeProposal = "CancelSoftwareUpgradeProposal",
}

const proposalTypeToAminoType: Map<ProposalType, string> = new Map([
  [ProposalType.TextProposal, "cosmos-sdk/TextProposal"],
  [
    ProposalType.CommunityPoolSpendProposal,
    "cosmos-sdk/CommunityPoolSpendProposal",
  ],
  [ProposalType.ParameterChangeProposal, "cosmos-sdk/ParameterChangeProposal"],
  [ProposalType.SoftwareUpgradeProposal, "cosmos-sdk/SoftwareUpgradeProposal"],
  [
    ProposalType.CancelSoftwareUpgradeProposal,
    "cosmos-sdk/CancelSoftwareUpgradeProposal",
  ],
]);

export interface MsgSubmitProposalParams {
  type: ProposalType;
  content: ProposalContent;
  initialDeposit: Coin[];
  proposer: string;
}

/**
 * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
 * proposal Content.
 */
export class MsgSubmitProposal implements Msg {
  public type: ProposalType;
  public content: ProposalContent;
  public initialDeposit: Coin[];
  public proposer: string;

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
    const { Any } = await import("../protobuf_stuff/google/protobuf/any");
    let content: import("../protobuf_stuff/google/protobuf/any").Any;

    switch (this.type) {
      case ProposalType.TextProposal:
        const { TextProposal } = await import(
          "../protobuf_stuff/cosmos/gov/v1beta1/gov"
        );
        content = Any.fromPartial({
          typeUrl: "/cosmos.gov.v1beta1.TextProposal",
          value: TextProposal.encode(
            TextProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.CommunityPoolSpendProposal:
        const { CommunityPoolSpendProposal } = await import(
          "../protobuf_stuff/cosmos/distribution/v1beta1/distribution"
        );
        content = Any.fromPartial({
          typeUrl: "/cosmos.distribution.v1beta1.CommunityPoolSpendProposal",
          value: CommunityPoolSpendProposal.encode(
            CommunityPoolSpendProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.ParameterChangeProposal:
        const { ParameterChangeProposal } = await import(
          "../protobuf_stuff/cosmos/params/v1beta1/params"
        );
        content = Any.fromPartial({
          typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
          value: ParameterChangeProposal.encode(
            ParameterChangeProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.ClientUpdateProposal:
        const { ClientUpdateProposal } = await import(
          "../protobuf_stuff/ibc/core/client/v1/client"
        );
        content = Any.fromPartial({
          typeUrl: "/ibc.core.client.v1.ClientUpdateProposal",
          value: ClientUpdateProposal.encode(
            ClientUpdateProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.UpgradeProposal:
        const { UpgradeProposal } = await import(
          "../protobuf_stuff/ibc/core/client/v1/client"
        );
        content = Any.fromPartial({
          typeUrl: "/ibc.core.client.v1.UpgradeProposal",
          value: UpgradeProposal.encode(
            UpgradeProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.SoftwareUpgradeProposal:
        const { SoftwareUpgradeProposal } = await import(
          "../protobuf_stuff/cosmos/upgrade/v1beta1/upgrade"
        );
        content = Any.fromPartial({
          typeUrl: "/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal",
          value: SoftwareUpgradeProposal.encode(
            SoftwareUpgradeProposal.fromPartial(this.content),
          ).finish(),
        });
        break;

      case ProposalType.CancelSoftwareUpgradeProposal:
        const { CancelSoftwareUpgradeProposal } = await import(
          "../protobuf_stuff/cosmos/upgrade/v1beta1/upgrade"
        );
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

    const msgContent = {
      content: content,
      initialDeposit: this.initialDeposit,
      proposer: this.proposer,
    };

    return {
      typeUrl: `/cosmos.gov.v1beta1.MsgSubmitProposal`,
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/gov/v1beta1/tx")
        ).MsgSubmitProposal.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    const contentType = proposalTypeToAminoType.get(this.type);
    if (!contentType) {
      throw new Error(
        `Proposal of type "${String(
          this.type,
        )}" is not supported with an Amino signer.`,
      );
    }

    let content: any = this.content;
    if (this.type === ProposalType.SoftwareUpgradeProposal) {
      if (content.plan) {
        content = {
          ...content,
          plan: {
            type: "cosmos-sdk/Plan",
            value: { ...content.plan },
          },
        };
      }
    }

    return {
      type: "cosmos-sdk/MsgSubmitProposal",
      value: {
        content: {
          type: contentType,
          value: content,
        },
        initial_deposit: this.initialDeposit,
        proposer: this.proposer,
      },
    };
  }
}

/** MsgVote defines a message to cast a vote. */

export interface MsgVoteParams extends MsgParams {
  proposalId: string;
  voter: string;
  option: VoteOption;
}
export class MsgVote implements Msg {
  public voter: string;
  public proposalId: string;
  public option: VoteOption;

  constructor({ voter, proposalId, option }: MsgVoteParams) {
    this.voter = voter;
    this.proposalId = proposalId;
    this.option = option;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      voter: this.voter,
      proposalId: this.proposalId,
      option: this.option,
    };

    return {
      typeUrl: `/cosmos.gov.v1beta1.MsgVote`,
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/gov/v1beta1/tx")
        ).MsgVote.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgVote",
      value: {
        voter: this.voter,
        proposal_id: this.proposalId,
        option: this.option,
      },
    };
  }
}

/** WeightedVoteOption defines a unit of vote for vote split. */
export interface WeightedVoteOption {
  /** option is a {@link VoteOption}. */
  option: VoteOption;
  /** weight is a number between 0 and 1 with precision of 18 decimals. */
  weight: number;
}

export interface MsgVoteWeightedParams extends MsgParams {
  voter: string;
  proposalId: string;
  options: WeightedVoteOption[];
}

/** MsgVoteWeighted defines a message to cast a vote, with an option to split the vote. */
export class MsgVoteWeighted implements Msg {
  public voter: string;
  public proposalId: string;
  public options: WeightedVoteOption[];

  constructor({ voter, proposalId, options }: MsgVoteWeightedParams) {
    this.voter = voter;
    this.proposalId = proposalId;
    this.options = options;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      voter: this.voter,
      proposalId: this.proposalId,
      options: this.options.map((o) => ({
        option: o.option,
        weight: new BigNumber(o.weight).toFixed(18).replace(/0\.0*/, ""),
      })),
    };

    return {
      typeUrl: `/cosmos.gov.v1beta1.MsgVoteWeighted`,
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/gov/v1beta1/tx")
        ).MsgVoteWeighted.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    const msgContent = {
      voter: this.voter,
      proposal_id: this.proposalId,
      options: this.options.map((o) => ({
        option: o.option,
        weight: new BigNumber(o.weight).toFixed(18),
      })),
    };

    return {
      type: "cosmos-sdk/MsgVoteWeighted",
      value: msgContent,
    };
  }
}

export interface MsgDepositParams extends MsgParams {
  proposalId: string;
  depositor: string;
  amount: Coin[];
}

/** MsgDeposit defines a message to submit a deposit to an existing proposal. */
export class MsgDeposit implements Msg {
  public depositor: string;
  public proposalId: string;
  public amount: Coin[];

  constructor({ depositor, proposalId, amount }: MsgDepositParams) {
    this.depositor = depositor;
    this.proposalId = proposalId;
    this.amount = amount;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      depositor: this.depositor,
      proposalId: this.proposalId,
      amount: this.amount,
    };

    return {
      typeUrl: `/cosmos.gov.v1beta1.MsgDeposit`,
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/gov/v1beta1/tx")
        ).MsgDeposit.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgDeposit",
      value: {
        depositor: this.depositor,
        proposal_id: this.proposalId,
        amount: this.amount,
      },
    };
  }
}
