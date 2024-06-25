/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import {
  VoteOption,
  Params,
  WeightedVoteOption,
  voteOptionFromJSON,
  voteOptionToJSON,
} from "./gov";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.gov.v1";

/** Since: cosmos-sdk 0.46 */

/**
 * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
 * proposal Content.
 */
export interface MsgSubmitProposal {
  /** messages are the arbitrary messages to be executed if proposal passes. */
  messages: Any[];
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

/** MsgSubmitProposalResponse defines the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponse {
  /** proposal_id defines the unique id of the proposal. */
  proposal_id: string;
}

/**
 * MsgExecLegacyContent is used to wrap the legacy content field into a message.
 * This ensures backwards compatibility with v1beta1.MsgSubmitProposal.
 */
export interface MsgExecLegacyContent {
  /** content is the proposal's content. */
  content?: Any;
  /** authority must be the gov module address. */
  authority: string;
}

/** MsgExecLegacyContentResponse defines the Msg/ExecLegacyContent response type. */
export interface MsgExecLegacyContentResponse {}

/** MsgVote defines a message to cast a vote. */
export interface MsgVote {
  /** proposal_id defines the unique id of the proposal. */
  proposal_id: string;
  /** voter is the voter address for the proposal. */
  voter: string;
  /** option defines the vote option. */
  option: VoteOption;
  /** metadata is any arbitrary metadata attached to the Vote. */
  metadata: string;
}

/** MsgVoteResponse defines the Msg/Vote response type. */
export interface MsgVoteResponse {}

/** MsgVoteWeighted defines a message to cast a vote. */
export interface MsgVoteWeighted {
  /** proposal_id defines the unique id of the proposal. */
  proposal_id: string;
  /** voter is the voter address for the proposal. */
  voter: string;
  /** options defines the weighted vote options. */
  options: WeightedVoteOption[];
  /** metadata is any arbitrary metadata attached to the VoteWeighted. */
  metadata: string;
}

/** MsgVoteWeightedResponse defines the Msg/VoteWeighted response type. */
export interface MsgVoteWeightedResponse {}

/** MsgDeposit defines a message to submit a deposit to an existing proposal. */
export interface MsgDeposit {
  /** proposal_id defines the unique id of the proposal. */
  proposal_id: string;
  /** depositor defines the deposit addresses from the proposals. */
  depositor: string;
  /** amount to be deposited by depositor. */
  amount: Coin[];
}

/** MsgDepositResponse defines the Msg/Deposit response type. */
export interface MsgDepositResponse {}

/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the x/gov parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params?: Params;
}

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {}

/**
 * MsgCancelProposal is the Msg/CancelProposal request type.
 *
 * Since: cosmos-sdk 0.50
 */
export interface MsgCancelProposal {
  /** proposal_id defines the unique id of the proposal. */
  proposal_id: string;
  /** proposer is the account address of the proposer. */
  proposer: string;
}

/**
 * MsgCancelProposalResponse defines the response structure for executing a
 * MsgCancelProposal message.
 *
 * Since: cosmos-sdk 0.50
 */
export interface MsgCancelProposalResponse {
  /** proposal_id defines the unique id of the proposal. */
  proposal_id: string;
  /** canceled_time is the time when proposal is canceled. */
  canceled_time?: Timestamp;
  /** canceled_height defines the block height at which the proposal is canceled. */
  canceled_height: string;
}

function createBaseMsgSubmitProposal(): MsgSubmitProposal {
  return {
    messages: [],
    initial_deposit: [],
    proposer: "",
    metadata: "",
    title: "",
    summary: "",
    expedited: false,
  };
}

export const MsgSubmitProposal = {
  encode(
    message: MsgSubmitProposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.initial_deposit) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.proposer !== "") {
      writer.uint32(26).string(message.proposer);
    }
    if (message.metadata !== "") {
      writer.uint32(34).string(message.metadata);
    }
    if (message.title !== "") {
      writer.uint32(42).string(message.title);
    }
    if (message.summary !== "") {
      writer.uint32(50).string(message.summary);
    }
    if (message.expedited === true) {
      writer.uint32(56).bool(message.expedited);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Any.decode(reader, reader.uint32()));
          break;
        case 2:
          message.initial_deposit.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.proposer = reader.string();
          break;
        case 4:
          message.metadata = reader.string();
          break;
        case 5:
          message.title = reader.string();
          break;
        case 6:
          message.summary = reader.string();
          break;
        case 7:
          message.expedited = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitProposal {
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Any.fromJSON(e))
        : [],
      initial_deposit: Array.isArray(object?.initial_deposit)
        ? object.initial_deposit.map((e: any) => Coin.fromJSON(e))
        : [],
      proposer: isSet(object.proposer) ? String(object.proposer) : "",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      title: isSet(object.title) ? String(object.title) : "",
      summary: isSet(object.summary) ? String(object.summary) : "",
      expedited: isSet(object.expedited) ? Boolean(object.expedited) : false,
    };
  },

  toJSON(message: MsgSubmitProposal): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Any.toJSON(e) : undefined,
      );
    } else {
      obj.messages = [];
    }
    if (message.initial_deposit) {
      obj.initial_deposit = message.initial_deposit.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.initial_deposit = [];
    }
    message.proposer !== undefined && (obj.proposer = message.proposer);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.title !== undefined && (obj.title = message.title);
    message.summary !== undefined && (obj.summary = message.summary);
    message.expedited !== undefined && (obj.expedited = message.expedited);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSubmitProposal>): MsgSubmitProposal {
    const message = createBaseMsgSubmitProposal();
    message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
    message.initial_deposit =
      object.initial_deposit?.map((e) => Coin.fromPartial(e)) || [];
    message.proposer = object.proposer ?? "";
    message.metadata = object.metadata ?? "";
    message.title = object.title ?? "";
    message.summary = object.summary ?? "";
    message.expedited = object.expedited ?? false;
    return message;
  },
};

function createBaseMsgSubmitProposalResponse(): MsgSubmitProposalResponse {
  return { proposal_id: "0" };
}

export const MsgSubmitProposalResponse = {
  encode(
    message: MsgSubmitProposalResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.proposal_id !== "0") {
      writer.uint32(8).uint64(message.proposal_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgSubmitProposalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitProposalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitProposalResponse {
    return {
      proposal_id: isSet(object.proposal_id) ? String(object.proposal_id) : "0",
    };
  },

  toJSON(message: MsgSubmitProposalResponse): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = message.proposal_id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSubmitProposalResponse>,
  ): MsgSubmitProposalResponse {
    const message = createBaseMsgSubmitProposalResponse();
    message.proposal_id = object.proposal_id ?? "0";
    return message;
  },
};

function createBaseMsgExecLegacyContent(): MsgExecLegacyContent {
  return { content: undefined, authority: "" };
}

export const MsgExecLegacyContent = {
  encode(
    message: MsgExecLegacyContent,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.content !== undefined) {
      Any.encode(message.content, writer.uint32(10).fork()).ldelim();
    }
    if (message.authority !== "") {
      writer.uint32(18).string(message.authority);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgExecLegacyContent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecLegacyContent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.content = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.authority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExecLegacyContent {
    return {
      content: isSet(object.content) ? Any.fromJSON(object.content) : undefined,
      authority: isSet(object.authority) ? String(object.authority) : "",
    };
  },

  toJSON(message: MsgExecLegacyContent): unknown {
    const obj: any = {};
    message.content !== undefined &&
      (obj.content = message.content ? Any.toJSON(message.content) : undefined);
    message.authority !== undefined && (obj.authority = message.authority);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgExecLegacyContent>): MsgExecLegacyContent {
    const message = createBaseMsgExecLegacyContent();
    message.content =
      object.content !== undefined && object.content !== null
        ? Any.fromPartial(object.content)
        : undefined;
    message.authority = object.authority ?? "";
    return message;
  },
};

function createBaseMsgExecLegacyContentResponse(): MsgExecLegacyContentResponse {
  return {};
}

export const MsgExecLegacyContentResponse = {
  encode(
    _: MsgExecLegacyContentResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgExecLegacyContentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecLegacyContentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgExecLegacyContentResponse {
    return {};
  },

  toJSON(_: MsgExecLegacyContentResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgExecLegacyContentResponse>,
  ): MsgExecLegacyContentResponse {
    const message = createBaseMsgExecLegacyContentResponse();
    return message;
  },
};

function createBaseMsgVote(): MsgVote {
  return { proposal_id: "0", voter: "", option: 0, metadata: "" };
}

export const MsgVote = {
  encode(
    message: MsgVote,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.proposal_id !== "0") {
      writer.uint32(8).uint64(message.proposal_id);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    if (message.option !== 0) {
      writer.uint32(24).int32(message.option);
    }
    if (message.metadata !== "") {
      writer.uint32(34).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.voter = reader.string();
          break;
        case 3:
          message.option = reader.int32() as any;
          break;
        case 4:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgVote {
    return {
      proposal_id: isSet(object.proposal_id) ? String(object.proposal_id) : "0",
      voter: isSet(object.voter) ? String(object.voter) : "",
      option: isSet(object.option) ? voteOptionFromJSON(object.option) : 0,
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: MsgVote): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = message.proposal_id);
    message.voter !== undefined && (obj.voter = message.voter);
    message.option !== undefined &&
      (obj.option = voteOptionToJSON(message.option));
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgVote>): MsgVote {
    const message = createBaseMsgVote();
    message.proposal_id = object.proposal_id ?? "0";
    message.voter = object.voter ?? "";
    message.option = object.option ?? 0;
    message.metadata = object.metadata ?? "";
    return message;
  },
};

function createBaseMsgVoteResponse(): MsgVoteResponse {
  return {};
}

export const MsgVoteResponse = {
  encode(
    _: MsgVoteResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVoteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVoteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgVoteResponse {
    return {};
  },

  toJSON(_: MsgVoteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgVoteResponse>): MsgVoteResponse {
    const message = createBaseMsgVoteResponse();
    return message;
  },
};

function createBaseMsgVoteWeighted(): MsgVoteWeighted {
  return { proposal_id: "0", voter: "", options: [], metadata: "" };
}

export const MsgVoteWeighted = {
  encode(
    message: MsgVoteWeighted,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.proposal_id !== "0") {
      writer.uint32(8).uint64(message.proposal_id);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    for (const v of message.options) {
      WeightedVoteOption.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.metadata !== "") {
      writer.uint32(34).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVoteWeighted {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVoteWeighted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.voter = reader.string();
          break;
        case 3:
          message.options.push(
            WeightedVoteOption.decode(reader, reader.uint32()),
          );
          break;
        case 4:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgVoteWeighted {
    return {
      proposal_id: isSet(object.proposal_id) ? String(object.proposal_id) : "0",
      voter: isSet(object.voter) ? String(object.voter) : "",
      options: Array.isArray(object?.options)
        ? object.options.map((e: any) => WeightedVoteOption.fromJSON(e))
        : [],
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: MsgVoteWeighted): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = message.proposal_id);
    message.voter !== undefined && (obj.voter = message.voter);
    if (message.options) {
      obj.options = message.options.map((e) =>
        e ? WeightedVoteOption.toJSON(e) : undefined,
      );
    } else {
      obj.options = [];
    }
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgVoteWeighted>): MsgVoteWeighted {
    const message = createBaseMsgVoteWeighted();
    message.proposal_id = object.proposal_id ?? "0";
    message.voter = object.voter ?? "";
    message.options =
      object.options?.map((e) => WeightedVoteOption.fromPartial(e)) || [];
    message.metadata = object.metadata ?? "";
    return message;
  },
};

function createBaseMsgVoteWeightedResponse(): MsgVoteWeightedResponse {
  return {};
}

export const MsgVoteWeightedResponse = {
  encode(
    _: MsgVoteWeightedResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgVoteWeightedResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVoteWeightedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgVoteWeightedResponse {
    return {};
  },

  toJSON(_: MsgVoteWeightedResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgVoteWeightedResponse>,
  ): MsgVoteWeightedResponse {
    const message = createBaseMsgVoteWeightedResponse();
    return message;
  },
};

function createBaseMsgDeposit(): MsgDeposit {
  return { proposal_id: "0", depositor: "", amount: [] };
}

export const MsgDeposit = {
  encode(
    message: MsgDeposit,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.proposal_id !== "0") {
      writer.uint32(8).uint64(message.proposal_id);
    }
    if (message.depositor !== "") {
      writer.uint32(18).string(message.depositor);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeposit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.depositor = reader.string();
          break;
        case 3:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeposit {
    return {
      proposal_id: isSet(object.proposal_id) ? String(object.proposal_id) : "0",
      depositor: isSet(object.depositor) ? String(object.depositor) : "",
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgDeposit): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = message.proposal_id);
    message.depositor !== undefined && (obj.depositor = message.depositor);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeposit>): MsgDeposit {
    const message = createBaseMsgDeposit();
    message.proposal_id = object.proposal_id ?? "0";
    message.depositor = object.depositor ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgDepositResponse(): MsgDepositResponse {
  return {};
}

export const MsgDepositResponse = {
  encode(
    _: MsgDepositResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDepositResponse {
    return {};
  },

  toJSON(_: MsgDepositResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDepositResponse>): MsgDepositResponse {
    const message = createBaseMsgDepositResponse();
    return message;
  },
};

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(
    message: MsgUpdateParams,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(
    _: MsgUpdateParamsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateParamsResponse>,
  ): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

function createBaseMsgCancelProposal(): MsgCancelProposal {
  return { proposal_id: "0", proposer: "" };
}

export const MsgCancelProposal = {
  encode(
    message: MsgCancelProposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.proposal_id !== "0") {
      writer.uint32(8).uint64(message.proposal_id);
    }
    if (message.proposer !== "") {
      writer.uint32(18).string(message.proposer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.proposer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancelProposal {
    return {
      proposal_id: isSet(object.proposal_id) ? String(object.proposal_id) : "0",
      proposer: isSet(object.proposer) ? String(object.proposer) : "",
    };
  },

  toJSON(message: MsgCancelProposal): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = message.proposal_id);
    message.proposer !== undefined && (obj.proposer = message.proposer);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCancelProposal>): MsgCancelProposal {
    const message = createBaseMsgCancelProposal();
    message.proposal_id = object.proposal_id ?? "0";
    message.proposer = object.proposer ?? "";
    return message;
  },
};

function createBaseMsgCancelProposalResponse(): MsgCancelProposalResponse {
  return { proposal_id: "0", canceled_time: undefined, canceled_height: "0" };
}

export const MsgCancelProposalResponse = {
  encode(
    message: MsgCancelProposalResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.proposal_id !== "0") {
      writer.uint32(8).uint64(message.proposal_id);
    }
    if (message.canceled_time !== undefined) {
      Timestamp.encode(
        message.canceled_time,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.canceled_height !== "0") {
      writer.uint32(24).uint64(message.canceled_height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgCancelProposalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelProposalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.canceled_time = Timestamp.decode(reader, reader.uint32());
          break;
        case 3:
          message.canceled_height = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancelProposalResponse {
    return {
      proposal_id: isSet(object.proposal_id) ? String(object.proposal_id) : "0",
      canceled_time: isSet(object.canceled_time)
        ? fromJsonTimestamp(object.canceled_time)
        : undefined,
      canceled_height: isSet(object.canceled_height)
        ? String(object.canceled_height)
        : "0",
    };
  },

  toJSON(message: MsgCancelProposalResponse): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = message.proposal_id);
    message.canceled_time !== undefined &&
      (obj.canceled_time = fromTimestamp(message.canceled_time).toISOString());
    message.canceled_height !== undefined &&
      (obj.canceled_height = message.canceled_height);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCancelProposalResponse>,
  ): MsgCancelProposalResponse {
    const message = createBaseMsgCancelProposalResponse();
    message.proposal_id = object.proposal_id ?? "0";
    message.canceled_time =
      object.canceled_time !== undefined && object.canceled_time !== null
        ? Timestamp.fromPartial(object.canceled_time)
        : undefined;
    message.canceled_height = object.canceled_height ?? "0";
    return message;
  },
};

/** Msg defines the gov Msg service. */
export interface Msg {
  /** SubmitProposal defines a method to create new proposal given the messages. */
  SubmitProposal(
    request: MsgSubmitProposal,
  ): Promise<MsgSubmitProposalResponse>;
  /**
   * ExecLegacyContent defines a Msg to be in included in a MsgSubmitProposal
   * to execute a legacy content-based proposal.
   */
  ExecLegacyContent(
    request: MsgExecLegacyContent,
  ): Promise<MsgExecLegacyContentResponse>;
  /** Vote defines a method to add a vote on a specific proposal. */
  Vote(request: MsgVote): Promise<MsgVoteResponse>;
  /** VoteWeighted defines a method to add a weighted vote on a specific proposal. */
  VoteWeighted(request: MsgVoteWeighted): Promise<MsgVoteWeightedResponse>;
  /** Deposit defines a method to add deposit on a specific proposal. */
  Deposit(request: MsgDeposit): Promise<MsgDepositResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/gov module
   * parameters. The authority is defined in the keeper.
   *
   * Since: cosmos-sdk 0.47
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /**
   * CancelProposal defines a method to cancel governance proposal
   *
   * Since: cosmos-sdk 0.50
   */
  CancelProposal(
    request: MsgCancelProposal,
  ): Promise<MsgCancelProposalResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SubmitProposal = this.SubmitProposal.bind(this);
    this.ExecLegacyContent = this.ExecLegacyContent.bind(this);
    this.Vote = this.Vote.bind(this);
    this.VoteWeighted = this.VoteWeighted.bind(this);
    this.Deposit = this.Deposit.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
    this.CancelProposal = this.CancelProposal.bind(this);
  }
  SubmitProposal(
    request: MsgSubmitProposal,
  ): Promise<MsgSubmitProposalResponse> {
    const data = MsgSubmitProposal.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.gov.v1.Msg",
      "SubmitProposal",
      data,
    );
    return promise.then((data) =>
      MsgSubmitProposalResponse.decode(new _m0.Reader(data)),
    );
  }

  ExecLegacyContent(
    request: MsgExecLegacyContent,
  ): Promise<MsgExecLegacyContentResponse> {
    const data = MsgExecLegacyContent.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.gov.v1.Msg",
      "ExecLegacyContent",
      data,
    );
    return promise.then((data) =>
      MsgExecLegacyContentResponse.decode(new _m0.Reader(data)),
    );
  }

  Vote(request: MsgVote): Promise<MsgVoteResponse> {
    const data = MsgVote.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Msg", "Vote", data);
    return promise.then((data) => MsgVoteResponse.decode(new _m0.Reader(data)));
  }

  VoteWeighted(request: MsgVoteWeighted): Promise<MsgVoteWeightedResponse> {
    const data = MsgVoteWeighted.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Msg", "VoteWeighted", data);
    return promise.then((data) =>
      MsgVoteWeightedResponse.decode(new _m0.Reader(data)),
    );
  }

  Deposit(request: MsgDeposit): Promise<MsgDepositResponse> {
    const data = MsgDeposit.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Msg", "Deposit", data);
    return promise.then((data) =>
      MsgDepositResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Msg", "UpdateParams", data);
    return promise.then((data) =>
      MsgUpdateParamsResponse.decode(new _m0.Reader(data)),
    );
  }

  CancelProposal(
    request: MsgCancelProposal,
  ): Promise<MsgCancelProposalResponse> {
    const data = MsgCancelProposal.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.gov.v1.Msg",
      "CancelProposal",
      data,
    );
    return promise.then((data) =>
      MsgCancelProposalResponse.decode(new _m0.Reader(data)),
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

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

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000).toString();
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = Number(t.seconds) * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Timestamp {
  if (o instanceof Date) {
    return toTimestamp(o);
  } else if (typeof o === "string") {
    return toTimestamp(new Date(o));
  } else {
    return Timestamp.fromJSON(o);
  }
}

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
