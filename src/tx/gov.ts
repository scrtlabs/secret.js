import { AminoMsg, Msg, ProtoMsg } from "./types";
import { Coin } from "../protobuf/cosmos/base/v1beta1/coin";
import { Any } from "../protobuf/google/protobuf/any";
import {
  MsgSubmitProposal as MsgSubmitProposalProto,
  MsgVote as MsgVoteParams,
  MsgVoteWeighted as MsgVoteWeightedParams,
  MsgExecLegacyContent as MsgExecLegacyContentProto,
  MsgCancelProposal as MsgCancelProposalParams,
  MsgDeposit as MsgDepositParams,
} from "../protobuf/cosmos/gov/v1/tx";

export {
  MsgVote as MsgVoteParams,
  MsgVoteWeighted as MsgVoteWeightedParams,
  MsgCancelProposal as MsgCancelProposalParams,
  MsgDeposit as MsgDepositParams,
} from "../protobuf/cosmos/gov/v1/tx";

export { VoteOption, ProposalStatus } from "../protobuf/cosmos/gov/v1/gov";

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

export type ProposalContent =
  | import("../protobuf/cosmos/gov/v1beta1/gov").TextProposal
  | import("../protobuf/cosmos/distribution/v1beta1/distribution").CommunityPoolSpendProposal
  | import("../protobuf/cosmos/params/v1beta1/params").ParameterChangeProposal
  | import("../protobuf/ibc/core/client/v1/client").ClientUpdateProposal
  | import("../protobuf/ibc/core/client/v1/client").UpgradeProposal
  | import("../protobuf/cosmos/upgrade/v1beta1/upgrade").SoftwareUpgradeProposal
  | import("../protobuf/cosmos/upgrade/v1beta1/upgrade").CancelSoftwareUpgradeProposal;

export type ParamChange = {
  subspace: string;
  key: string;
  value: string;
};

export interface MsgSubmitProposalParams {
  /** messages are the arbitrary messages to be executed if proposal passes. */
  messages: Msg[];
  /** initial_deposit is the deposit value that must be paid at proposal submission. */
  initial_deposit: Coin[];
  /** proposer is the account address of the proposer. */
  proposer: string;
  /** metadata is any arbitrary metadata attached to the proposal. */
  metadata: string;
  /**
   * title is the title of the proposal.
   *
   * Since: cosmos-sdk 0.47
   */
  title: string;
  /**
   * summary is the summary of the proposal
   *
   * Since: cosmos-sdk 0.47
   */
  summary: string;
  /**
   * expedited defines if the proposal is expedited or not
   *
   * Since: cosmos-sdk 0.50
   */
  expedited: boolean;
}

/**
 * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
 * proposal Content.
 */
export class MsgSubmitProposal implements Msg {
  constructor(public params: MsgSubmitProposalParams) {}

  async toProto(): Promise<ProtoMsg> {
    let msgContent = {
      ...this.params,
      messages: await Promise.all(
        this.params.messages.map(async (msg) => {
          const protoMsg = await msg.toProto();
          return Any.fromPartial({
            type_url: protoMsg.type_url,
            value: protoMsg.encode(),
          });
        }),
      ),
    };
    return {
      type_url: `/cosmos.gov.v1.MsgSubmitProposal`,
      value: msgContent,
      encode: () => MsgSubmitProposalProto.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("Not implemented. Please use WalletProto");
  }
}

export class MsgVote implements Msg {
  constructor(public params: MsgVoteParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/cosmos.gov.v1.MsgVote`,
      value: this.params,
      encode: () => MsgVoteParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgVote",
      value: this.params,
    };
  }
}

/** MsgVoteWeighted defines a message to cast a vote, with an option to split the vote. */
export class MsgVoteWeighted implements Msg {
  constructor(public params: MsgVoteWeightedParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/cosmos.gov.v1.MsgVoteWeighted`,
      value: this.params,
      encode: () => MsgVoteWeightedParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgVoteWeighted",
      value: this.params,
    };
  }
}

/** MsgDeposit defines a message to submit a deposit to an existing proposal. */
export class MsgDeposit implements Msg {
  constructor(public params: MsgDepositParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/cosmos.gov.v1.MsgDeposit`,
      value: this.params,
      encode: () => MsgDepositParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgDeposit",
      value: this.params,
    };
  }
}

/** MsgDeposit defines a message to submit a deposit to an existing proposal. */
export class MsgCancelProposal implements Msg {
  constructor(public params: MsgCancelProposalParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/cosmos.gov.v1.MsgCancelProposal`,
      value: this.params,
      encode: () => MsgCancelProposalParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgCancelProposal",
      value: this.params,
    };
  }
}

export interface MsgExecLegacyContentParams {
  type: ProposalType;
  initial_deposit: Coin[];
  proposer: string;
  content: ProposalContent;
  authority: string;
}

/** MsgDeposit defines a message to submit a deposit to an existing proposal. */
export class MsgExecLegacyContent implements Msg {
  constructor(public params: MsgExecLegacyContentParams) {}

  async toProto(): Promise<ProtoMsg> {
    let content: Any;
    switch (this.params.type) {
      case ProposalType.TextProposal:
        const { TextProposal } = await import(
          "../protobuf/cosmos/gov/v1beta1/gov"
        );
        content = Any.fromPartial({
          type_url: "/cosmos.gov.v1beta1.TextProposal",
          value: TextProposal.encode(
            TextProposal.fromPartial(this.params.content),
          ).finish(),
        });
        break;

      case ProposalType.CommunityPoolSpendProposal:
        const { CommunityPoolSpendProposal } = await import(
          "../protobuf/cosmos/distribution/v1beta1/distribution"
        );
        content = Any.fromPartial({
          type_url: "/cosmos.distribution.v1beta1.CommunityPoolSpendProposal",
          value: CommunityPoolSpendProposal.encode(
            CommunityPoolSpendProposal.fromPartial(this.params.content),
          ).finish(),
        });
        break;

      case ProposalType.ParameterChangeProposal:
        const { ParameterChangeProposal } = await import(
          "../protobuf/cosmos/params/v1beta1/params"
        );
        content = Any.fromPartial({
          type_url: "/cosmos.params.v1beta1.ParameterChangeProposal",
          value: ParameterChangeProposal.encode(
            ParameterChangeProposal.fromPartial(this.params.content),
          ).finish(),
        });
        break;

      case ProposalType.ClientUpdateProposal:
        const { ClientUpdateProposal } = await import(
          "../protobuf/ibc/core/client/v1/client"
        );
        content = Any.fromPartial({
          type_url: "/ibc.core.client.v1.ClientUpdateProposal",
          value: ClientUpdateProposal.encode(
            ClientUpdateProposal.fromPartial(this.params.content),
          ).finish(),
        });
        break;

      case ProposalType.UpgradeProposal:
        const { UpgradeProposal } = await import(
          "../protobuf/ibc/core/client/v1/client"
        );
        content = Any.fromPartial({
          type_url: "/ibc.core.client.v1.UpgradeProposal",
          value: UpgradeProposal.encode(
            UpgradeProposal.fromPartial(this.params.content),
          ).finish(),
        });
        break;

      case ProposalType.SoftwareUpgradeProposal:
        const { SoftwareUpgradeProposal } = await import(
          "../protobuf/cosmos/upgrade/v1beta1/upgrade"
        );
        content = Any.fromPartial({
          type_url: "/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal",
          value: SoftwareUpgradeProposal.encode(
            SoftwareUpgradeProposal.fromPartial(this.params.content),
          ).finish(),
        });
        break;

      case ProposalType.CancelSoftwareUpgradeProposal:
        const { CancelSoftwareUpgradeProposal } = await import(
          "../protobuf/cosmos/upgrade/v1beta1/upgrade"
        );
        content = Any.fromPartial({
          type_url: "/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal",
          value: CancelSoftwareUpgradeProposal.encode(
            CancelSoftwareUpgradeProposal.fromPartial(this.params.content),
          ).finish(),
        });
        break;

      default:
        throw new Error(
          `Unknown proposal type: "${this.params.type}" - ${JSON.stringify(
            this.params.content,
          )}`,
        );
    }
    const msgContent = {
      authority: this.params.authority,
      content,
    };
    return {
      type_url: `/cosmos.gov.v1.MsgExecLegacyContent`,
      value: msgContent,
      encode: () => MsgExecLegacyContentProto.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("Not implemented. Please use WalletProto");
  }
}
