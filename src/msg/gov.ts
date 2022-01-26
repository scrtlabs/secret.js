import {
  MsgDepositEncodeObject,
  MsgSubmitProposalEncodeObject,
  MsgVoteEncodeObject,
} from "@cosmjs/stargate";

import {
  MsgDeposit,
  MsgSubmitProposal,
  MsgVote,
} from "cosmjs-types/cosmos/gov/v1beta1/tx";
export { MsgDeposit, MsgSubmitProposal, MsgVote };

export {
  isMsgDepositEncodeObject as isMsgDeposit,
  isMsgSubmitProposalEncodeObject as isMsgSubmitProposal,
  isMsgVoteEncodeObject as isMsgVote,
} from "@cosmjs/stargate";

export function createMsgDeposit(value: MsgDeposit): MsgDepositEncodeObject {
  return {
    typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
    value,
  };
}

export function createMsgSubmitProposal(
  value: MsgSubmitProposal
): MsgSubmitProposalEncodeObject {
  return {
    typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
    value,
  };
}

export function createMsgVote(value: MsgVote): MsgVoteEncodeObject {
  return {
    typeUrl: "/cosmos.gov.v1beta1.MsgVote",
    value,
  };
}
