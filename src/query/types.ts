import { Coin, ProposalStatus } from "..";

/** BondStatus is the status of a validator. */
export enum BondStatus {
  /** BOND_STATUS_UNSPECIFIED - UNSPECIFIED defines an invalid validator status. */
  BOND_STATUS_UNSPECIFIED = 0,
  /** BOND_STATUS_UNBONDED - UNBONDED defines a validator that is not bonded. */
  BOND_STATUS_UNBONDED = 1,
  /** BOND_STATUS_UNBONDING - UNBONDING defines a validator that is unbonding. */
  BOND_STATUS_UNBONDING = 2,
  /** BOND_STATUS_BONDED - BONDED defines a validator that is bonded. */
  BOND_STATUS_BONDED = 3,
}

/** Proposal defines the core field members of a governance proposal. */
export type Proposal = {
  proposalId: string;
  content?: import("../protobuf_stuff/google/protobuf/any").Any;
  status: ProposalStatus;
  finalTallyResult?: import("../protobuf_stuff/cosmos/gov/v1beta1/gov").TallyResult;
  submitTime?: import("../protobuf_stuff/google/protobuf/timestamp").Timestamp;
  depositEndTime?: import("../protobuf_stuff/google/protobuf/timestamp").Timestamp;
  totalDeposit: Coin[];
  votingStartTime?: import("../protobuf_stuff/google/protobuf/timestamp").Timestamp;
  votingEndTime?: import("../protobuf_stuff/google/protobuf/timestamp").Timestamp;
};
