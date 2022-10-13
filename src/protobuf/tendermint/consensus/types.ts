/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  PartSetHeader,
  Proposal as Proposal1,
  Part,
  Vote as Vote2,
  SignedMsgType,
  BlockID,
  signedMsgTypeFromJSON,
  signedMsgTypeToJSON,
} from "../../tendermint/types/types";
import { BitArray } from "../../tendermint/libs/bits/types";

export const protobufPackage = "tendermint.consensus";

/**
 * NewRoundStep is sent for every step taken in the ConsensusState.
 * For every height/round/step transition
 */
export interface NewRoundStep {
  height: string;
  round: number;
  step: number;
  secondsSinceStartTime: string;
  lastCommitRound: number;
}

/**
 * NewValidBlock is sent when a validator observes a valid block B in some round r,
 * i.e., there is a Proposal for block B and 2/3+ prevotes for the block B in the round r.
 * In case the block is also committed, then IsCommit flag is set to true.
 */
export interface NewValidBlock {
  height: string;
  round: number;
  blockPartSetHeader?: PartSetHeader;
  blockParts?: BitArray;
  isCommit: boolean;
}

/** Proposal is sent when a new block is proposed. */
export interface Proposal {
  proposal?: Proposal1;
}

/** ProposalPOL is sent when a previous proposal is re-proposed. */
export interface ProposalPOL {
  height: string;
  proposalPolRound: number;
  proposalPol?: BitArray;
}

/** BlockPart is sent when gossipping a piece of the proposed block. */
export interface BlockPart {
  height: string;
  round: number;
  part?: Part;
}

/** Vote is sent when voting for a proposal (or lack thereof). */
export interface Vote {
  vote?: Vote2;
}

/** HasVote is sent to indicate that a particular vote has been received. */
export interface HasVote {
  height: string;
  round: number;
  type: SignedMsgType;
  index: number;
}

/** VoteSetMaj23 is sent to indicate that a given BlockID has seen +2/3 votes. */
export interface VoteSetMaj23 {
  height: string;
  round: number;
  type: SignedMsgType;
  blockId?: BlockID;
}

/** VoteSetBits is sent to communicate the bit-array of votes seen for the BlockID. */
export interface VoteSetBits {
  height: string;
  round: number;
  type: SignedMsgType;
  blockId?: BlockID;
  votes?: BitArray;
}

export interface Message {
  newRoundStep?: NewRoundStep | undefined;
  newValidBlock?: NewValidBlock | undefined;
  proposal?: Proposal | undefined;
  proposalPol?: ProposalPOL | undefined;
  blockPart?: BlockPart | undefined;
  vote?: Vote | undefined;
  hasVote?: HasVote | undefined;
  voteSetMaj23?: VoteSetMaj23 | undefined;
  voteSetBits?: VoteSetBits | undefined;
}

function createBaseNewRoundStep(): NewRoundStep {
  return {
    height: "0",
    round: 0,
    step: 0,
    secondsSinceStartTime: "0",
    lastCommitRound: 0,
  };
}

export const NewRoundStep = {
  encode(
    message: NewRoundStep,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(16).int32(message.round);
    }
    if (message.step !== 0) {
      writer.uint32(24).uint32(message.step);
    }
    if (message.secondsSinceStartTime !== "0") {
      writer.uint32(32).int64(message.secondsSinceStartTime);
    }
    if (message.lastCommitRound !== 0) {
      writer.uint32(40).int32(message.lastCommitRound);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewRoundStep {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewRoundStep();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.round = reader.int32();
          break;
        case 3:
          message.step = reader.uint32();
          break;
        case 4:
          message.secondsSinceStartTime = longToString(reader.int64() as Long);
          break;
        case 5:
          message.lastCommitRound = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NewRoundStep {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? Number(object.round) : 0,
      step: isSet(object.step) ? Number(object.step) : 0,
      secondsSinceStartTime: isSet(object.secondsSinceStartTime)
        ? String(object.secondsSinceStartTime)
        : "0",
      lastCommitRound: isSet(object.lastCommitRound)
        ? Number(object.lastCommitRound)
        : 0,
    };
  },

  toJSON(message: NewRoundStep): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.step !== undefined && (obj.step = Math.round(message.step));
    message.secondsSinceStartTime !== undefined &&
      (obj.secondsSinceStartTime = message.secondsSinceStartTime);
    message.lastCommitRound !== undefined &&
      (obj.lastCommitRound = Math.round(message.lastCommitRound));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NewRoundStep>, I>>(
    object: I,
  ): NewRoundStep {
    const message = createBaseNewRoundStep();
    message.height = object.height ?? "0";
    message.round = object.round ?? 0;
    message.step = object.step ?? 0;
    message.secondsSinceStartTime = object.secondsSinceStartTime ?? "0";
    message.lastCommitRound = object.lastCommitRound ?? 0;
    return message;
  },
};

function createBaseNewValidBlock(): NewValidBlock {
  return {
    height: "0",
    round: 0,
    blockPartSetHeader: undefined,
    blockParts: undefined,
    isCommit: false,
  };
}

export const NewValidBlock = {
  encode(
    message: NewValidBlock,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(16).int32(message.round);
    }
    if (message.blockPartSetHeader !== undefined) {
      PartSetHeader.encode(
        message.blockPartSetHeader,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.blockParts !== undefined) {
      BitArray.encode(message.blockParts, writer.uint32(34).fork()).ldelim();
    }
    if (message.isCommit === true) {
      writer.uint32(40).bool(message.isCommit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewValidBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewValidBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.round = reader.int32();
          break;
        case 3:
          message.blockPartSetHeader = PartSetHeader.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.blockParts = BitArray.decode(reader, reader.uint32());
          break;
        case 5:
          message.isCommit = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NewValidBlock {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? Number(object.round) : 0,
      blockPartSetHeader: isSet(object.blockPartSetHeader)
        ? PartSetHeader.fromJSON(object.blockPartSetHeader)
        : undefined,
      blockParts: isSet(object.blockParts)
        ? BitArray.fromJSON(object.blockParts)
        : undefined,
      isCommit: isSet(object.isCommit) ? Boolean(object.isCommit) : false,
    };
  },

  toJSON(message: NewValidBlock): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.blockPartSetHeader !== undefined &&
      (obj.blockPartSetHeader = message.blockPartSetHeader
        ? PartSetHeader.toJSON(message.blockPartSetHeader)
        : undefined);
    message.blockParts !== undefined &&
      (obj.blockParts = message.blockParts
        ? BitArray.toJSON(message.blockParts)
        : undefined);
    message.isCommit !== undefined && (obj.isCommit = message.isCommit);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NewValidBlock>, I>>(
    object: I,
  ): NewValidBlock {
    const message = createBaseNewValidBlock();
    message.height = object.height ?? "0";
    message.round = object.round ?? 0;
    message.blockPartSetHeader =
      object.blockPartSetHeader !== undefined &&
      object.blockPartSetHeader !== null
        ? PartSetHeader.fromPartial(object.blockPartSetHeader)
        : undefined;
    message.blockParts =
      object.blockParts !== undefined && object.blockParts !== null
        ? BitArray.fromPartial(object.blockParts)
        : undefined;
    message.isCommit = object.isCommit ?? false;
    return message;
  },
};

function createBaseProposal(): Proposal {
  return { proposal: undefined };
}

export const Proposal = {
  encode(
    message: Proposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.proposal !== undefined) {
      Proposal1.encode(message.proposal, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Proposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal = Proposal1.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Proposal {
    return {
      proposal: isSet(object.proposal)
        ? Proposal1.fromJSON(object.proposal)
        : undefined,
    };
  },

  toJSON(message: Proposal): unknown {
    const obj: any = {};
    message.proposal !== undefined &&
      (obj.proposal = message.proposal
        ? Proposal1.toJSON(message.proposal)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Proposal>, I>>(object: I): Proposal {
    const message = createBaseProposal();
    message.proposal =
      object.proposal !== undefined && object.proposal !== null
        ? Proposal1.fromPartial(object.proposal)
        : undefined;
    return message;
  },
};

function createBaseProposalPOL(): ProposalPOL {
  return { height: "0", proposalPolRound: 0, proposalPol: undefined };
}

export const ProposalPOL = {
  encode(
    message: ProposalPOL,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.proposalPolRound !== 0) {
      writer.uint32(16).int32(message.proposalPolRound);
    }
    if (message.proposalPol !== undefined) {
      BitArray.encode(message.proposalPol, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProposalPOL {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProposalPOL();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.proposalPolRound = reader.int32();
          break;
        case 3:
          message.proposalPol = BitArray.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProposalPOL {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      proposalPolRound: isSet(object.proposalPolRound)
        ? Number(object.proposalPolRound)
        : 0,
      proposalPol: isSet(object.proposalPol)
        ? BitArray.fromJSON(object.proposalPol)
        : undefined,
    };
  },

  toJSON(message: ProposalPOL): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.proposalPolRound !== undefined &&
      (obj.proposalPolRound = Math.round(message.proposalPolRound));
    message.proposalPol !== undefined &&
      (obj.proposalPol = message.proposalPol
        ? BitArray.toJSON(message.proposalPol)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProposalPOL>, I>>(
    object: I,
  ): ProposalPOL {
    const message = createBaseProposalPOL();
    message.height = object.height ?? "0";
    message.proposalPolRound = object.proposalPolRound ?? 0;
    message.proposalPol =
      object.proposalPol !== undefined && object.proposalPol !== null
        ? BitArray.fromPartial(object.proposalPol)
        : undefined;
    return message;
  },
};

function createBaseBlockPart(): BlockPart {
  return { height: "0", round: 0, part: undefined };
}

export const BlockPart = {
  encode(
    message: BlockPart,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(16).int32(message.round);
    }
    if (message.part !== undefined) {
      Part.encode(message.part, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockPart {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockPart();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.round = reader.int32();
          break;
        case 3:
          message.part = Part.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BlockPart {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? Number(object.round) : 0,
      part: isSet(object.part) ? Part.fromJSON(object.part) : undefined,
    };
  },

  toJSON(message: BlockPart): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.part !== undefined &&
      (obj.part = message.part ? Part.toJSON(message.part) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BlockPart>, I>>(
    object: I,
  ): BlockPart {
    const message = createBaseBlockPart();
    message.height = object.height ?? "0";
    message.round = object.round ?? 0;
    message.part =
      object.part !== undefined && object.part !== null
        ? Part.fromPartial(object.part)
        : undefined;
    return message;
  },
};

function createBaseVote(): Vote {
  return { vote: undefined };
}

export const Vote = {
  encode(message: Vote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vote !== undefined) {
      Vote2.encode(message.vote, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vote = Vote2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vote {
    return {
      vote: isSet(object.vote) ? Vote2.fromJSON(object.vote) : undefined,
    };
  },

  toJSON(message: Vote): unknown {
    const obj: any = {};
    message.vote !== undefined &&
      (obj.vote = message.vote ? Vote2.toJSON(message.vote) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vote>, I>>(object: I): Vote {
    const message = createBaseVote();
    message.vote =
      object.vote !== undefined && object.vote !== null
        ? Vote2.fromPartial(object.vote)
        : undefined;
    return message;
  },
};

function createBaseHasVote(): HasVote {
  return { height: "0", round: 0, type: 0, index: 0 };
}

export const HasVote = {
  encode(
    message: HasVote,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(16).int32(message.round);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.index !== 0) {
      writer.uint32(32).int32(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HasVote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHasVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.round = reader.int32();
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        case 4:
          message.index = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HasVote {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? Number(object.round) : 0,
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      index: isSet(object.index) ? Number(object.index) : 0,
    };
  },

  toJSON(message: HasVote): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.type !== undefined &&
      (obj.type = signedMsgTypeToJSON(message.type));
    message.index !== undefined && (obj.index = Math.round(message.index));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HasVote>, I>>(object: I): HasVote {
    const message = createBaseHasVote();
    message.height = object.height ?? "0";
    message.round = object.round ?? 0;
    message.type = object.type ?? 0;
    message.index = object.index ?? 0;
    return message;
  },
};

function createBaseVoteSetMaj23(): VoteSetMaj23 {
  return { height: "0", round: 0, type: 0, blockId: undefined };
}

export const VoteSetMaj23 = {
  encode(
    message: VoteSetMaj23,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(16).int32(message.round);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.blockId !== undefined) {
      BlockID.encode(message.blockId, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoteSetMaj23 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoteSetMaj23();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.round = reader.int32();
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        case 4:
          message.blockId = BlockID.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoteSetMaj23 {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? Number(object.round) : 0,
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      blockId: isSet(object.blockId)
        ? BlockID.fromJSON(object.blockId)
        : undefined,
    };
  },

  toJSON(message: VoteSetMaj23): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.type !== undefined &&
      (obj.type = signedMsgTypeToJSON(message.type));
    message.blockId !== undefined &&
      (obj.blockId = message.blockId
        ? BlockID.toJSON(message.blockId)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VoteSetMaj23>, I>>(
    object: I,
  ): VoteSetMaj23 {
    const message = createBaseVoteSetMaj23();
    message.height = object.height ?? "0";
    message.round = object.round ?? 0;
    message.type = object.type ?? 0;
    message.blockId =
      object.blockId !== undefined && object.blockId !== null
        ? BlockID.fromPartial(object.blockId)
        : undefined;
    return message;
  },
};

function createBaseVoteSetBits(): VoteSetBits {
  return {
    height: "0",
    round: 0,
    type: 0,
    blockId: undefined,
    votes: undefined,
  };
}

export const VoteSetBits = {
  encode(
    message: VoteSetBits,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(16).int32(message.round);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.blockId !== undefined) {
      BlockID.encode(message.blockId, writer.uint32(34).fork()).ldelim();
    }
    if (message.votes !== undefined) {
      BitArray.encode(message.votes, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoteSetBits {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoteSetBits();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.round = reader.int32();
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        case 4:
          message.blockId = BlockID.decode(reader, reader.uint32());
          break;
        case 5:
          message.votes = BitArray.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoteSetBits {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? Number(object.round) : 0,
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      blockId: isSet(object.blockId)
        ? BlockID.fromJSON(object.blockId)
        : undefined,
      votes: isSet(object.votes) ? BitArray.fromJSON(object.votes) : undefined,
    };
  },

  toJSON(message: VoteSetBits): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.type !== undefined &&
      (obj.type = signedMsgTypeToJSON(message.type));
    message.blockId !== undefined &&
      (obj.blockId = message.blockId
        ? BlockID.toJSON(message.blockId)
        : undefined);
    message.votes !== undefined &&
      (obj.votes = message.votes ? BitArray.toJSON(message.votes) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VoteSetBits>, I>>(
    object: I,
  ): VoteSetBits {
    const message = createBaseVoteSetBits();
    message.height = object.height ?? "0";
    message.round = object.round ?? 0;
    message.type = object.type ?? 0;
    message.blockId =
      object.blockId !== undefined && object.blockId !== null
        ? BlockID.fromPartial(object.blockId)
        : undefined;
    message.votes =
      object.votes !== undefined && object.votes !== null
        ? BitArray.fromPartial(object.votes)
        : undefined;
    return message;
  },
};

function createBaseMessage(): Message {
  return {
    newRoundStep: undefined,
    newValidBlock: undefined,
    proposal: undefined,
    proposalPol: undefined,
    blockPart: undefined,
    vote: undefined,
    hasVote: undefined,
    voteSetMaj23: undefined,
    voteSetBits: undefined,
  };
}

export const Message = {
  encode(
    message: Message,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.newRoundStep !== undefined) {
      NewRoundStep.encode(
        message.newRoundStep,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.newValidBlock !== undefined) {
      NewValidBlock.encode(
        message.newValidBlock,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.proposal !== undefined) {
      Proposal.encode(message.proposal, writer.uint32(26).fork()).ldelim();
    }
    if (message.proposalPol !== undefined) {
      ProposalPOL.encode(
        message.proposalPol,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.blockPart !== undefined) {
      BlockPart.encode(message.blockPart, writer.uint32(42).fork()).ldelim();
    }
    if (message.vote !== undefined) {
      Vote.encode(message.vote, writer.uint32(50).fork()).ldelim();
    }
    if (message.hasVote !== undefined) {
      HasVote.encode(message.hasVote, writer.uint32(58).fork()).ldelim();
    }
    if (message.voteSetMaj23 !== undefined) {
      VoteSetMaj23.encode(
        message.voteSetMaj23,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.voteSetBits !== undefined) {
      VoteSetBits.encode(
        message.voteSetBits,
        writer.uint32(74).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.newRoundStep = NewRoundStep.decode(reader, reader.uint32());
          break;
        case 2:
          message.newValidBlock = NewValidBlock.decode(reader, reader.uint32());
          break;
        case 3:
          message.proposal = Proposal.decode(reader, reader.uint32());
          break;
        case 4:
          message.proposalPol = ProposalPOL.decode(reader, reader.uint32());
          break;
        case 5:
          message.blockPart = BlockPart.decode(reader, reader.uint32());
          break;
        case 6:
          message.vote = Vote.decode(reader, reader.uint32());
          break;
        case 7:
          message.hasVote = HasVote.decode(reader, reader.uint32());
          break;
        case 8:
          message.voteSetMaj23 = VoteSetMaj23.decode(reader, reader.uint32());
          break;
        case 9:
          message.voteSetBits = VoteSetBits.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      newRoundStep: isSet(object.newRoundStep)
        ? NewRoundStep.fromJSON(object.newRoundStep)
        : undefined,
      newValidBlock: isSet(object.newValidBlock)
        ? NewValidBlock.fromJSON(object.newValidBlock)
        : undefined,
      proposal: isSet(object.proposal)
        ? Proposal.fromJSON(object.proposal)
        : undefined,
      proposalPol: isSet(object.proposalPol)
        ? ProposalPOL.fromJSON(object.proposalPol)
        : undefined,
      blockPart: isSet(object.blockPart)
        ? BlockPart.fromJSON(object.blockPart)
        : undefined,
      vote: isSet(object.vote) ? Vote.fromJSON(object.vote) : undefined,
      hasVote: isSet(object.hasVote)
        ? HasVote.fromJSON(object.hasVote)
        : undefined,
      voteSetMaj23: isSet(object.voteSetMaj23)
        ? VoteSetMaj23.fromJSON(object.voteSetMaj23)
        : undefined,
      voteSetBits: isSet(object.voteSetBits)
        ? VoteSetBits.fromJSON(object.voteSetBits)
        : undefined,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.newRoundStep !== undefined &&
      (obj.newRoundStep = message.newRoundStep
        ? NewRoundStep.toJSON(message.newRoundStep)
        : undefined);
    message.newValidBlock !== undefined &&
      (obj.newValidBlock = message.newValidBlock
        ? NewValidBlock.toJSON(message.newValidBlock)
        : undefined);
    message.proposal !== undefined &&
      (obj.proposal = message.proposal
        ? Proposal.toJSON(message.proposal)
        : undefined);
    message.proposalPol !== undefined &&
      (obj.proposalPol = message.proposalPol
        ? ProposalPOL.toJSON(message.proposalPol)
        : undefined);
    message.blockPart !== undefined &&
      (obj.blockPart = message.blockPart
        ? BlockPart.toJSON(message.blockPart)
        : undefined);
    message.vote !== undefined &&
      (obj.vote = message.vote ? Vote.toJSON(message.vote) : undefined);
    message.hasVote !== undefined &&
      (obj.hasVote = message.hasVote
        ? HasVote.toJSON(message.hasVote)
        : undefined);
    message.voteSetMaj23 !== undefined &&
      (obj.voteSetMaj23 = message.voteSetMaj23
        ? VoteSetMaj23.toJSON(message.voteSetMaj23)
        : undefined);
    message.voteSetBits !== undefined &&
      (obj.voteSetBits = message.voteSetBits
        ? VoteSetBits.toJSON(message.voteSetBits)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.newRoundStep =
      object.newRoundStep !== undefined && object.newRoundStep !== null
        ? NewRoundStep.fromPartial(object.newRoundStep)
        : undefined;
    message.newValidBlock =
      object.newValidBlock !== undefined && object.newValidBlock !== null
        ? NewValidBlock.fromPartial(object.newValidBlock)
        : undefined;
    message.proposal =
      object.proposal !== undefined && object.proposal !== null
        ? Proposal.fromPartial(object.proposal)
        : undefined;
    message.proposalPol =
      object.proposalPol !== undefined && object.proposalPol !== null
        ? ProposalPOL.fromPartial(object.proposalPol)
        : undefined;
    message.blockPart =
      object.blockPart !== undefined && object.blockPart !== null
        ? BlockPart.fromPartial(object.blockPart)
        : undefined;
    message.vote =
      object.vote !== undefined && object.vote !== null
        ? Vote.fromPartial(object.vote)
        : undefined;
    message.hasVote =
      object.hasVote !== undefined && object.hasVote !== null
        ? HasVote.fromPartial(object.hasVote)
        : undefined;
    message.voteSetMaj23 =
      object.voteSetMaj23 !== undefined && object.voteSetMaj23 !== null
        ? VoteSetMaj23.fromPartial(object.voteSetMaj23)
        : undefined;
    message.voteSetBits =
      object.voteSetBits !== undefined && object.voteSetBits !== null
        ? VoteSetBits.fromPartial(object.voteSetBits)
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

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
