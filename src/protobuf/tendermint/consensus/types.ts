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
} from "../types/types";
import { BitArray } from "../libs/bits/types";

export const protobufPackage = "tendermint.consensus";

/**
 * NewRoundStep is sent for every step taken in the ConsensusState.
 * For every height/round/step transition
 */
export interface NewRoundStep {
  height: string;
  round: number;
  step: number;
  seconds_since_start_time: string;
  last_commit_round: number;
}

/**
 * NewValidBlock is sent when a validator observes a valid block B in some round r,
 * i.e., there is a Proposal for block B and 2/3+ prevotes for the block B in the round r.
 * In case the block is also committed, then IsCommit flag is set to true.
 */
export interface NewValidBlock {
  height: string;
  round: number;
  block_part_set_header?: PartSetHeader;
  block_parts?: BitArray;
  is_commit: boolean;
}

/** Proposal is sent when a new block is proposed. */
export interface Proposal {
  proposal?: Proposal1;
}

/** ProposalPOL is sent when a previous proposal is re-proposed. */
export interface ProposalPOL {
  height: string;
  proposal_pol_round: number;
  proposal_pol?: BitArray;
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
  block_id?: BlockID;
}

/** VoteSetBits is sent to communicate the bit-array of votes seen for the BlockID. */
export interface VoteSetBits {
  height: string;
  round: number;
  type: SignedMsgType;
  block_id?: BlockID;
  votes?: BitArray;
}

export interface Message {
  new_round_step?: NewRoundStep | undefined;
  new_valid_block?: NewValidBlock | undefined;
  proposal?: Proposal | undefined;
  proposal_pol?: ProposalPOL | undefined;
  block_part?: BlockPart | undefined;
  vote?: Vote | undefined;
  has_vote?: HasVote | undefined;
  vote_set_maj23?: VoteSetMaj23 | undefined;
  vote_set_bits?: VoteSetBits | undefined;
}

function createBaseNewRoundStep(): NewRoundStep {
  return {
    height: "0",
    round: 0,
    step: 0,
    seconds_since_start_time: "0",
    last_commit_round: 0,
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
    if (message.seconds_since_start_time !== "0") {
      writer.uint32(32).int64(message.seconds_since_start_time);
    }
    if (message.last_commit_round !== 0) {
      writer.uint32(40).int32(message.last_commit_round);
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
          message.seconds_since_start_time = longToString(
            reader.int64() as Long,
          );
          break;
        case 5:
          message.last_commit_round = reader.int32();
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
      seconds_since_start_time: isSet(object.seconds_since_start_time)
        ? String(object.seconds_since_start_time)
        : "0",
      last_commit_round: isSet(object.last_commit_round)
        ? Number(object.last_commit_round)
        : 0,
    };
  },

  toJSON(message: NewRoundStep): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.step !== undefined && (obj.step = Math.round(message.step));
    message.seconds_since_start_time !== undefined &&
      (obj.seconds_since_start_time = message.seconds_since_start_time);
    message.last_commit_round !== undefined &&
      (obj.last_commit_round = Math.round(message.last_commit_round));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NewRoundStep>, I>>(
    object: I,
  ): NewRoundStep {
    const message = createBaseNewRoundStep();
    message.height = object.height ?? "0";
    message.round = object.round ?? 0;
    message.step = object.step ?? 0;
    message.seconds_since_start_time = object.seconds_since_start_time ?? "0";
    message.last_commit_round = object.last_commit_round ?? 0;
    return message;
  },
};

function createBaseNewValidBlock(): NewValidBlock {
  return {
    height: "0",
    round: 0,
    block_part_set_header: undefined,
    block_parts: undefined,
    is_commit: false,
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
    if (message.block_part_set_header !== undefined) {
      PartSetHeader.encode(
        message.block_part_set_header,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.block_parts !== undefined) {
      BitArray.encode(message.block_parts, writer.uint32(34).fork()).ldelim();
    }
    if (message.is_commit === true) {
      writer.uint32(40).bool(message.is_commit);
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
          message.block_part_set_header = PartSetHeader.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.block_parts = BitArray.decode(reader, reader.uint32());
          break;
        case 5:
          message.is_commit = reader.bool();
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
      block_part_set_header: isSet(object.block_part_set_header)
        ? PartSetHeader.fromJSON(object.block_part_set_header)
        : undefined,
      block_parts: isSet(object.block_parts)
        ? BitArray.fromJSON(object.block_parts)
        : undefined,
      is_commit: isSet(object.is_commit) ? Boolean(object.is_commit) : false,
    };
  },

  toJSON(message: NewValidBlock): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.block_part_set_header !== undefined &&
      (obj.block_part_set_header = message.block_part_set_header
        ? PartSetHeader.toJSON(message.block_part_set_header)
        : undefined);
    message.block_parts !== undefined &&
      (obj.block_parts = message.block_parts
        ? BitArray.toJSON(message.block_parts)
        : undefined);
    message.is_commit !== undefined && (obj.is_commit = message.is_commit);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NewValidBlock>, I>>(
    object: I,
  ): NewValidBlock {
    const message = createBaseNewValidBlock();
    message.height = object.height ?? "0";
    message.round = object.round ?? 0;
    message.block_part_set_header =
      object.block_part_set_header !== undefined &&
      object.block_part_set_header !== null
        ? PartSetHeader.fromPartial(object.block_part_set_header)
        : undefined;
    message.block_parts =
      object.block_parts !== undefined && object.block_parts !== null
        ? BitArray.fromPartial(object.block_parts)
        : undefined;
    message.is_commit = object.is_commit ?? false;
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
  return { height: "0", proposal_pol_round: 0, proposal_pol: undefined };
}

export const ProposalPOL = {
  encode(
    message: ProposalPOL,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.proposal_pol_round !== 0) {
      writer.uint32(16).int32(message.proposal_pol_round);
    }
    if (message.proposal_pol !== undefined) {
      BitArray.encode(message.proposal_pol, writer.uint32(26).fork()).ldelim();
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
          message.proposal_pol_round = reader.int32();
          break;
        case 3:
          message.proposal_pol = BitArray.decode(reader, reader.uint32());
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
      proposal_pol_round: isSet(object.proposal_pol_round)
        ? Number(object.proposal_pol_round)
        : 0,
      proposal_pol: isSet(object.proposal_pol)
        ? BitArray.fromJSON(object.proposal_pol)
        : undefined,
    };
  },

  toJSON(message: ProposalPOL): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.proposal_pol_round !== undefined &&
      (obj.proposal_pol_round = Math.round(message.proposal_pol_round));
    message.proposal_pol !== undefined &&
      (obj.proposal_pol = message.proposal_pol
        ? BitArray.toJSON(message.proposal_pol)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProposalPOL>, I>>(
    object: I,
  ): ProposalPOL {
    const message = createBaseProposalPOL();
    message.height = object.height ?? "0";
    message.proposal_pol_round = object.proposal_pol_round ?? 0;
    message.proposal_pol =
      object.proposal_pol !== undefined && object.proposal_pol !== null
        ? BitArray.fromPartial(object.proposal_pol)
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
  return { height: "0", round: 0, type: 0, block_id: undefined };
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
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(34).fork()).ldelim();
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
          message.block_id = BlockID.decode(reader, reader.uint32());
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
      block_id: isSet(object.block_id)
        ? BlockID.fromJSON(object.block_id)
        : undefined,
    };
  },

  toJSON(message: VoteSetMaj23): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.type !== undefined &&
      (obj.type = signedMsgTypeToJSON(message.type));
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? BlockID.toJSON(message.block_id)
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
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromPartial(object.block_id)
        : undefined;
    return message;
  },
};

function createBaseVoteSetBits(): VoteSetBits {
  return {
    height: "0",
    round: 0,
    type: 0,
    block_id: undefined,
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
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(34).fork()).ldelim();
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
          message.block_id = BlockID.decode(reader, reader.uint32());
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
      block_id: isSet(object.block_id)
        ? BlockID.fromJSON(object.block_id)
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
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? BlockID.toJSON(message.block_id)
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
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromPartial(object.block_id)
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
    new_round_step: undefined,
    new_valid_block: undefined,
    proposal: undefined,
    proposal_pol: undefined,
    block_part: undefined,
    vote: undefined,
    has_vote: undefined,
    vote_set_maj23: undefined,
    vote_set_bits: undefined,
  };
}

export const Message = {
  encode(
    message: Message,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.new_round_step !== undefined) {
      NewRoundStep.encode(
        message.new_round_step,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.new_valid_block !== undefined) {
      NewValidBlock.encode(
        message.new_valid_block,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.proposal !== undefined) {
      Proposal.encode(message.proposal, writer.uint32(26).fork()).ldelim();
    }
    if (message.proposal_pol !== undefined) {
      ProposalPOL.encode(
        message.proposal_pol,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.block_part !== undefined) {
      BlockPart.encode(message.block_part, writer.uint32(42).fork()).ldelim();
    }
    if (message.vote !== undefined) {
      Vote.encode(message.vote, writer.uint32(50).fork()).ldelim();
    }
    if (message.has_vote !== undefined) {
      HasVote.encode(message.has_vote, writer.uint32(58).fork()).ldelim();
    }
    if (message.vote_set_maj23 !== undefined) {
      VoteSetMaj23.encode(
        message.vote_set_maj23,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.vote_set_bits !== undefined) {
      VoteSetBits.encode(
        message.vote_set_bits,
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
          message.new_round_step = NewRoundStep.decode(reader, reader.uint32());
          break;
        case 2:
          message.new_valid_block = NewValidBlock.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 3:
          message.proposal = Proposal.decode(reader, reader.uint32());
          break;
        case 4:
          message.proposal_pol = ProposalPOL.decode(reader, reader.uint32());
          break;
        case 5:
          message.block_part = BlockPart.decode(reader, reader.uint32());
          break;
        case 6:
          message.vote = Vote.decode(reader, reader.uint32());
          break;
        case 7:
          message.has_vote = HasVote.decode(reader, reader.uint32());
          break;
        case 8:
          message.vote_set_maj23 = VoteSetMaj23.decode(reader, reader.uint32());
          break;
        case 9:
          message.vote_set_bits = VoteSetBits.decode(reader, reader.uint32());
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
      new_round_step: isSet(object.new_round_step)
        ? NewRoundStep.fromJSON(object.new_round_step)
        : undefined,
      new_valid_block: isSet(object.new_valid_block)
        ? NewValidBlock.fromJSON(object.new_valid_block)
        : undefined,
      proposal: isSet(object.proposal)
        ? Proposal.fromJSON(object.proposal)
        : undefined,
      proposal_pol: isSet(object.proposal_pol)
        ? ProposalPOL.fromJSON(object.proposal_pol)
        : undefined,
      block_part: isSet(object.block_part)
        ? BlockPart.fromJSON(object.block_part)
        : undefined,
      vote: isSet(object.vote) ? Vote.fromJSON(object.vote) : undefined,
      has_vote: isSet(object.has_vote)
        ? HasVote.fromJSON(object.has_vote)
        : undefined,
      vote_set_maj23: isSet(object.vote_set_maj23)
        ? VoteSetMaj23.fromJSON(object.vote_set_maj23)
        : undefined,
      vote_set_bits: isSet(object.vote_set_bits)
        ? VoteSetBits.fromJSON(object.vote_set_bits)
        : undefined,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.new_round_step !== undefined &&
      (obj.new_round_step = message.new_round_step
        ? NewRoundStep.toJSON(message.new_round_step)
        : undefined);
    message.new_valid_block !== undefined &&
      (obj.new_valid_block = message.new_valid_block
        ? NewValidBlock.toJSON(message.new_valid_block)
        : undefined);
    message.proposal !== undefined &&
      (obj.proposal = message.proposal
        ? Proposal.toJSON(message.proposal)
        : undefined);
    message.proposal_pol !== undefined &&
      (obj.proposal_pol = message.proposal_pol
        ? ProposalPOL.toJSON(message.proposal_pol)
        : undefined);
    message.block_part !== undefined &&
      (obj.block_part = message.block_part
        ? BlockPart.toJSON(message.block_part)
        : undefined);
    message.vote !== undefined &&
      (obj.vote = message.vote ? Vote.toJSON(message.vote) : undefined);
    message.has_vote !== undefined &&
      (obj.has_vote = message.has_vote
        ? HasVote.toJSON(message.has_vote)
        : undefined);
    message.vote_set_maj23 !== undefined &&
      (obj.vote_set_maj23 = message.vote_set_maj23
        ? VoteSetMaj23.toJSON(message.vote_set_maj23)
        : undefined);
    message.vote_set_bits !== undefined &&
      (obj.vote_set_bits = message.vote_set_bits
        ? VoteSetBits.toJSON(message.vote_set_bits)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.new_round_step =
      object.new_round_step !== undefined && object.new_round_step !== null
        ? NewRoundStep.fromPartial(object.new_round_step)
        : undefined;
    message.new_valid_block =
      object.new_valid_block !== undefined && object.new_valid_block !== null
        ? NewValidBlock.fromPartial(object.new_valid_block)
        : undefined;
    message.proposal =
      object.proposal !== undefined && object.proposal !== null
        ? Proposal.fromPartial(object.proposal)
        : undefined;
    message.proposal_pol =
      object.proposal_pol !== undefined && object.proposal_pol !== null
        ? ProposalPOL.fromPartial(object.proposal_pol)
        : undefined;
    message.block_part =
      object.block_part !== undefined && object.block_part !== null
        ? BlockPart.fromPartial(object.block_part)
        : undefined;
    message.vote =
      object.vote !== undefined && object.vote !== null
        ? Vote.fromPartial(object.vote)
        : undefined;
    message.has_vote =
      object.has_vote !== undefined && object.has_vote !== null
        ? HasVote.fromPartial(object.has_vote)
        : undefined;
    message.vote_set_maj23 =
      object.vote_set_maj23 !== undefined && object.vote_set_maj23 !== null
        ? VoteSetMaj23.fromPartial(object.vote_set_maj23)
        : undefined;
    message.vote_set_bits =
      object.vote_set_bits !== undefined && object.vote_set_bits !== null
        ? VoteSetBits.fromPartial(object.vote_set_bits)
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
