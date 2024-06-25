/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import {
  VoteOption,
  ProposalExecutorResult,
  MemberRequest,
  voteOptionFromJSON,
  voteOptionToJSON,
  proposalExecutorResultFromJSON,
  proposalExecutorResultToJSON,
} from "./types";

export const protobufPackage = "cosmos.group.v1";

/** Since: cosmos-sdk 0.46 */

/** Exec defines modes of execution of a proposal on creation or on new vote. */
export enum Exec {
  /**
   * EXEC_UNSPECIFIED - An empty value means that there should be a separate
   * MsgExec request for the proposal to execute.
   */
  EXEC_UNSPECIFIED = 0,
  /**
   * EXEC_TRY - Try to execute the proposal immediately.
   * If the proposal is not allowed per the DecisionPolicy,
   * the proposal will still be open and could
   * be executed at a later point.
   */
  EXEC_TRY = 1,
  UNRECOGNIZED = -1,
}

export function execFromJSON(object: any): Exec {
  switch (object) {
    case 0:
    case "EXEC_UNSPECIFIED":
      return Exec.EXEC_UNSPECIFIED;
    case 1:
    case "EXEC_TRY":
      return Exec.EXEC_TRY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Exec.UNRECOGNIZED;
  }
}

export function execToJSON(object: Exec): string {
  switch (object) {
    case Exec.EXEC_UNSPECIFIED:
      return "EXEC_UNSPECIFIED";
    case Exec.EXEC_TRY:
      return "EXEC_TRY";
    default:
      return "UNKNOWN";
  }
}

/** MsgCreateGroup is the Msg/CreateGroup request type. */
export interface MsgCreateGroup {
  /** admin is the account address of the group admin. */
  admin: string;
  /** members defines the group members. */
  members: MemberRequest[];
  /** metadata is any arbitrary metadata to attached to the group. */
  metadata: string;
}

/** MsgCreateGroupResponse is the Msg/CreateGroup response type. */
export interface MsgCreateGroupResponse {
  /** group_id is the unique ID of the newly created group. */
  group_id: string;
}

/** MsgUpdateGroupMembers is the Msg/UpdateGroupMembers request type. */
export interface MsgUpdateGroupMembers {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: string;
  /**
   * member_updates is the list of members to update,
   * set weight to 0 to remove a member.
   */
  member_updates: MemberRequest[];
}

/** MsgUpdateGroupMembersResponse is the Msg/UpdateGroupMembers response type. */
export interface MsgUpdateGroupMembersResponse {}

/** MsgUpdateGroupAdmin is the Msg/UpdateGroupAdmin request type. */
export interface MsgUpdateGroupAdmin {
  /** admin is the current account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: string;
  /** new_admin is the group new admin account address. */
  new_admin: string;
}

/** MsgUpdateGroupAdminResponse is the Msg/UpdateGroupAdmin response type. */
export interface MsgUpdateGroupAdminResponse {}

/** MsgUpdateGroupMetadata is the Msg/UpdateGroupMetadata request type. */
export interface MsgUpdateGroupMetadata {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: string;
  /** metadata is the updated group's metadata. */
  metadata: string;
}

/** MsgUpdateGroupMetadataResponse is the Msg/UpdateGroupMetadata response type. */
export interface MsgUpdateGroupMetadataResponse {}

/** MsgCreateGroupPolicy is the Msg/CreateGroupPolicy request type. */
export interface MsgCreateGroupPolicy {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: string;
  /** metadata is any arbitrary metadata attached to the group policy. */
  metadata: string;
  /** decision_policy specifies the group policy's decision policy. */
  decision_policy?: Any;
}

/** MsgCreateGroupPolicyResponse is the Msg/CreateGroupPolicy response type. */
export interface MsgCreateGroupPolicyResponse {
  /** address is the account address of the newly created group policy. */
  address: string;
}

/** MsgUpdateGroupPolicyAdmin is the Msg/UpdateGroupPolicyAdmin request type. */
export interface MsgUpdateGroupPolicyAdmin {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_policy_address is the account address of the group policy. */
  group_policy_address: string;
  /** new_admin is the new group policy admin. */
  new_admin: string;
}

/** MsgUpdateGroupPolicyAdminResponse is the Msg/UpdateGroupPolicyAdmin response type. */
export interface MsgUpdateGroupPolicyAdminResponse {}

/** MsgCreateGroupWithPolicy is the Msg/CreateGroupWithPolicy request type. */
export interface MsgCreateGroupWithPolicy {
  /** admin is the account address of the group and group policy admin. */
  admin: string;
  /** members defines the group members. */
  members: MemberRequest[];
  /** group_metadata is any arbitrary metadata attached to the group. */
  group_metadata: string;
  /** group_policy_metadata is any arbitrary metadata attached to the group policy. */
  group_policy_metadata: string;
  /**
   * group_policy_as_admin is a boolean field, if set to true, the group policy account address will be used as group
   * and group policy admin.
   */
  group_policy_as_admin: boolean;
  /** decision_policy specifies the group policy's decision policy. */
  decision_policy?: Any;
}

/** MsgCreateGroupWithPolicyResponse is the Msg/CreateGroupWithPolicy response type. */
export interface MsgCreateGroupWithPolicyResponse {
  /** group_id is the unique ID of the newly created group with policy. */
  group_id: string;
  /** group_policy_address is the account address of the newly created group policy. */
  group_policy_address: string;
}

/** MsgUpdateGroupPolicyDecisionPolicy is the Msg/UpdateGroupPolicyDecisionPolicy request type. */
export interface MsgUpdateGroupPolicyDecisionPolicy {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_policy_address is the account address of group policy. */
  group_policy_address: string;
  /** decision_policy is the updated group policy's decision policy. */
  decision_policy?: Any;
}

/** MsgUpdateGroupPolicyDecisionPolicyResponse is the Msg/UpdateGroupPolicyDecisionPolicy response type. */
export interface MsgUpdateGroupPolicyDecisionPolicyResponse {}

/** MsgUpdateGroupPolicyMetadata is the Msg/UpdateGroupPolicyMetadata request type. */
export interface MsgUpdateGroupPolicyMetadata {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_policy_address is the account address of group policy. */
  group_policy_address: string;
  /** metadata is the group policy metadata to be updated. */
  metadata: string;
}

/** MsgUpdateGroupPolicyMetadataResponse is the Msg/UpdateGroupPolicyMetadata response type. */
export interface MsgUpdateGroupPolicyMetadataResponse {}

/** MsgSubmitProposal is the Msg/SubmitProposal request type. */
export interface MsgSubmitProposal {
  /** group_policy_address is the account address of group policy. */
  group_policy_address: string;
  /**
   * proposers are the account addresses of the proposers.
   * Proposers signatures will be counted as yes votes.
   */
  proposers: string[];
  /** metadata is any arbitrary metadata attached to the proposal. */
  metadata: string;
  /** messages is a list of `sdk.Msg`s that will be executed if the proposal passes. */
  messages: Any[];
  /**
   * exec defines the mode of execution of the proposal,
   * whether it should be executed immediately on creation or not.
   * If so, proposers signatures are considered as Yes votes.
   */
  exec: Exec;
  /**
   * title is the title of the proposal.
   *
   * Since: cosmos-sdk 0.47
   */
  title: string;
  /**
   * summary is the summary of the proposal.
   *
   * Since: cosmos-sdk 0.47
   */
  summary: string;
}

/** MsgSubmitProposalResponse is the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponse {
  /** proposal is the unique ID of the proposal. */
  proposal_id: string;
}

/** MsgWithdrawProposal is the Msg/WithdrawProposal request type. */
export interface MsgWithdrawProposal {
  /** proposal is the unique ID of the proposal. */
  proposal_id: string;
  /** address is the admin of the group policy or one of the proposer of the proposal. */
  address: string;
}

/** MsgWithdrawProposalResponse is the Msg/WithdrawProposal response type. */
export interface MsgWithdrawProposalResponse {}

/** MsgVote is the Msg/Vote request type. */
export interface MsgVote {
  /** proposal is the unique ID of the proposal. */
  proposal_id: string;
  /** voter is the voter account address. */
  voter: string;
  /** option is the voter's choice on the proposal. */
  option: VoteOption;
  /** metadata is any arbitrary metadata attached to the vote. */
  metadata: string;
  /**
   * exec defines whether the proposal should be executed
   * immediately after voting or not.
   */
  exec: Exec;
}

/** MsgVoteResponse is the Msg/Vote response type. */
export interface MsgVoteResponse {}

/** MsgExec is the Msg/Exec request type. */
export interface MsgExec {
  /** proposal is the unique ID of the proposal. */
  proposal_id: string;
  /** executor is the account address used to execute the proposal. */
  executor: string;
}

/** MsgExecResponse is the Msg/Exec request type. */
export interface MsgExecResponse {
  /** result is the final result of the proposal execution. */
  result: ProposalExecutorResult;
}

/** MsgLeaveGroup is the Msg/LeaveGroup request type. */
export interface MsgLeaveGroup {
  /** address is the account address of the group member. */
  address: string;
  /** group_id is the unique ID of the group. */
  group_id: string;
}

/** MsgLeaveGroupResponse is the Msg/LeaveGroup response type. */
export interface MsgLeaveGroupResponse {}

function createBaseMsgCreateGroup(): MsgCreateGroup {
  return { admin: "", members: [], metadata: "" };
}

export const MsgCreateGroup = {
  encode(
    message: MsgCreateGroup,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    for (const v of message.members) {
      MemberRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.members.push(MemberRequest.decode(reader, reader.uint32()));
          break;
        case 3:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroup {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      members: Array.isArray(object?.members)
        ? object.members.map((e: any) => MemberRequest.fromJSON(e))
        : [],
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: MsgCreateGroup): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    if (message.members) {
      obj.members = message.members.map((e) =>
        e ? MemberRequest.toJSON(e) : undefined,
      );
    } else {
      obj.members = [];
    }
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateGroup>): MsgCreateGroup {
    const message = createBaseMsgCreateGroup();
    message.admin = object.admin ?? "";
    message.members =
      object.members?.map((e) => MemberRequest.fromPartial(e)) || [];
    message.metadata = object.metadata ?? "";
    return message;
  },
};

function createBaseMsgCreateGroupResponse(): MsgCreateGroupResponse {
  return { group_id: "0" };
}

export const MsgCreateGroupResponse = {
  encode(
    message: MsgCreateGroupResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.group_id !== "0") {
      writer.uint32(8).uint64(message.group_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgCreateGroupResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupResponse {
    return {
      group_id: isSet(object.group_id) ? String(object.group_id) : "0",
    };
  },

  toJSON(message: MsgCreateGroupResponse): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateGroupResponse>,
  ): MsgCreateGroupResponse {
    const message = createBaseMsgCreateGroupResponse();
    message.group_id = object.group_id ?? "0";
    return message;
  },
};

function createBaseMsgUpdateGroupMembers(): MsgUpdateGroupMembers {
  return { admin: "", group_id: "0", member_updates: [] };
}

export const MsgUpdateGroupMembers = {
  encode(
    message: MsgUpdateGroupMembers,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.group_id !== "0") {
      writer.uint32(16).uint64(message.group_id);
    }
    for (const v of message.member_updates) {
      MemberRequest.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateGroupMembers {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMembers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.group_id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.member_updates.push(
            MemberRequest.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupMembers {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      group_id: isSet(object.group_id) ? String(object.group_id) : "0",
      member_updates: Array.isArray(object?.member_updates)
        ? object.member_updates.map((e: any) => MemberRequest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgUpdateGroupMembers): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.group_id !== undefined && (obj.group_id = message.group_id);
    if (message.member_updates) {
      obj.member_updates = message.member_updates.map((e) =>
        e ? MemberRequest.toJSON(e) : undefined,
      );
    } else {
      obj.member_updates = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateGroupMembers>,
  ): MsgUpdateGroupMembers {
    const message = createBaseMsgUpdateGroupMembers();
    message.admin = object.admin ?? "";
    message.group_id = object.group_id ?? "0";
    message.member_updates =
      object.member_updates?.map((e) => MemberRequest.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgUpdateGroupMembersResponse(): MsgUpdateGroupMembersResponse {
  return {};
}

export const MsgUpdateGroupMembersResponse = {
  encode(
    _: MsgUpdateGroupMembersResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateGroupMembersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMembersResponse();
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

  fromJSON(_: any): MsgUpdateGroupMembersResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupMembersResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateGroupMembersResponse>,
  ): MsgUpdateGroupMembersResponse {
    const message = createBaseMsgUpdateGroupMembersResponse();
    return message;
  },
};

function createBaseMsgUpdateGroupAdmin(): MsgUpdateGroupAdmin {
  return { admin: "", group_id: "0", new_admin: "" };
}

export const MsgUpdateGroupAdmin = {
  encode(
    message: MsgUpdateGroupAdmin,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.group_id !== "0") {
      writer.uint32(16).uint64(message.group_id);
    }
    if (message.new_admin !== "") {
      writer.uint32(26).string(message.new_admin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupAdmin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.group_id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.new_admin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupAdmin {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      group_id: isSet(object.group_id) ? String(object.group_id) : "0",
      new_admin: isSet(object.new_admin) ? String(object.new_admin) : "",
    };
  },

  toJSON(message: MsgUpdateGroupAdmin): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.group_id !== undefined && (obj.group_id = message.group_id);
    message.new_admin !== undefined && (obj.new_admin = message.new_admin);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateGroupAdmin>): MsgUpdateGroupAdmin {
    const message = createBaseMsgUpdateGroupAdmin();
    message.admin = object.admin ?? "";
    message.group_id = object.group_id ?? "0";
    message.new_admin = object.new_admin ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupAdminResponse(): MsgUpdateGroupAdminResponse {
  return {};
}

export const MsgUpdateGroupAdminResponse = {
  encode(
    _: MsgUpdateGroupAdminResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateGroupAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupAdminResponse();
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

  fromJSON(_: any): MsgUpdateGroupAdminResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateGroupAdminResponse>,
  ): MsgUpdateGroupAdminResponse {
    const message = createBaseMsgUpdateGroupAdminResponse();
    return message;
  },
};

function createBaseMsgUpdateGroupMetadata(): MsgUpdateGroupMetadata {
  return { admin: "", group_id: "0", metadata: "" };
}

export const MsgUpdateGroupMetadata = {
  encode(
    message: MsgUpdateGroupMetadata,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.group_id !== "0") {
      writer.uint32(16).uint64(message.group_id);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateGroupMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.group_id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupMetadata {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      group_id: isSet(object.group_id) ? String(object.group_id) : "0",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: MsgUpdateGroupMetadata): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.group_id !== undefined && (obj.group_id = message.group_id);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateGroupMetadata>,
  ): MsgUpdateGroupMetadata {
    const message = createBaseMsgUpdateGroupMetadata();
    message.admin = object.admin ?? "";
    message.group_id = object.group_id ?? "0";
    message.metadata = object.metadata ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupMetadataResponse(): MsgUpdateGroupMetadataResponse {
  return {};
}

export const MsgUpdateGroupMetadataResponse = {
  encode(
    _: MsgUpdateGroupMetadataResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateGroupMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMetadataResponse();
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

  fromJSON(_: any): MsgUpdateGroupMetadataResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupMetadataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateGroupMetadataResponse>,
  ): MsgUpdateGroupMetadataResponse {
    const message = createBaseMsgUpdateGroupMetadataResponse();
    return message;
  },
};

function createBaseMsgCreateGroupPolicy(): MsgCreateGroupPolicy {
  return { admin: "", group_id: "0", metadata: "", decision_policy: undefined };
}

export const MsgCreateGroupPolicy = {
  encode(
    message: MsgCreateGroupPolicy,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.group_id !== "0") {
      writer.uint32(16).uint64(message.group_id);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.decision_policy !== undefined) {
      Any.encode(message.decision_policy, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgCreateGroupPolicy {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.group_id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.decision_policy = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupPolicy {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      group_id: isSet(object.group_id) ? String(object.group_id) : "0",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      decision_policy: isSet(object.decision_policy)
        ? Any.fromJSON(object.decision_policy)
        : undefined,
    };
  },

  toJSON(message: MsgCreateGroupPolicy): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.group_id !== undefined && (obj.group_id = message.group_id);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.decision_policy !== undefined &&
      (obj.decision_policy = message.decision_policy
        ? Any.toJSON(message.decision_policy)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateGroupPolicy>): MsgCreateGroupPolicy {
    const message = createBaseMsgCreateGroupPolicy();
    message.admin = object.admin ?? "";
    message.group_id = object.group_id ?? "0";
    message.metadata = object.metadata ?? "";
    message.decision_policy =
      object.decision_policy !== undefined && object.decision_policy !== null
        ? Any.fromPartial(object.decision_policy)
        : undefined;
    return message;
  },
};

function createBaseMsgCreateGroupPolicyResponse(): MsgCreateGroupPolicyResponse {
  return { address: "" };
}

export const MsgCreateGroupPolicyResponse = {
  encode(
    message: MsgCreateGroupPolicyResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgCreateGroupPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupPolicyResponse {
    return {
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: MsgCreateGroupPolicyResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateGroupPolicyResponse>,
  ): MsgCreateGroupPolicyResponse {
    const message = createBaseMsgCreateGroupPolicyResponse();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyAdmin(): MsgUpdateGroupPolicyAdmin {
  return { admin: "", group_policy_address: "", new_admin: "" };
}

export const MsgUpdateGroupPolicyAdmin = {
  encode(
    message: MsgUpdateGroupPolicyAdmin,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.group_policy_address !== "") {
      writer.uint32(18).string(message.group_policy_address);
    }
    if (message.new_admin !== "") {
      writer.uint32(26).string(message.new_admin);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateGroupPolicyAdmin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.group_policy_address = reader.string();
          break;
        case 3:
          message.new_admin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupPolicyAdmin {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      group_policy_address: isSet(object.group_policy_address)
        ? String(object.group_policy_address)
        : "",
      new_admin: isSet(object.new_admin) ? String(object.new_admin) : "",
    };
  },

  toJSON(message: MsgUpdateGroupPolicyAdmin): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.group_policy_address !== undefined &&
      (obj.group_policy_address = message.group_policy_address);
    message.new_admin !== undefined && (obj.new_admin = message.new_admin);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateGroupPolicyAdmin>,
  ): MsgUpdateGroupPolicyAdmin {
    const message = createBaseMsgUpdateGroupPolicyAdmin();
    message.admin = object.admin ?? "";
    message.group_policy_address = object.group_policy_address ?? "";
    message.new_admin = object.new_admin ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyAdminResponse(): MsgUpdateGroupPolicyAdminResponse {
  return {};
}

export const MsgUpdateGroupPolicyAdminResponse = {
  encode(
    _: MsgUpdateGroupPolicyAdminResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateGroupPolicyAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyAdminResponse();
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

  fromJSON(_: any): MsgUpdateGroupPolicyAdminResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupPolicyAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateGroupPolicyAdminResponse>,
  ): MsgUpdateGroupPolicyAdminResponse {
    const message = createBaseMsgUpdateGroupPolicyAdminResponse();
    return message;
  },
};

function createBaseMsgCreateGroupWithPolicy(): MsgCreateGroupWithPolicy {
  return {
    admin: "",
    members: [],
    group_metadata: "",
    group_policy_metadata: "",
    group_policy_as_admin: false,
    decision_policy: undefined,
  };
}

export const MsgCreateGroupWithPolicy = {
  encode(
    message: MsgCreateGroupWithPolicy,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    for (const v of message.members) {
      MemberRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.group_metadata !== "") {
      writer.uint32(26).string(message.group_metadata);
    }
    if (message.group_policy_metadata !== "") {
      writer.uint32(34).string(message.group_policy_metadata);
    }
    if (message.group_policy_as_admin === true) {
      writer.uint32(40).bool(message.group_policy_as_admin);
    }
    if (message.decision_policy !== undefined) {
      Any.encode(message.decision_policy, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgCreateGroupWithPolicy {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupWithPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.members.push(MemberRequest.decode(reader, reader.uint32()));
          break;
        case 3:
          message.group_metadata = reader.string();
          break;
        case 4:
          message.group_policy_metadata = reader.string();
          break;
        case 5:
          message.group_policy_as_admin = reader.bool();
          break;
        case 6:
          message.decision_policy = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupWithPolicy {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      members: Array.isArray(object?.members)
        ? object.members.map((e: any) => MemberRequest.fromJSON(e))
        : [],
      group_metadata: isSet(object.group_metadata)
        ? String(object.group_metadata)
        : "",
      group_policy_metadata: isSet(object.group_policy_metadata)
        ? String(object.group_policy_metadata)
        : "",
      group_policy_as_admin: isSet(object.group_policy_as_admin)
        ? Boolean(object.group_policy_as_admin)
        : false,
      decision_policy: isSet(object.decision_policy)
        ? Any.fromJSON(object.decision_policy)
        : undefined,
    };
  },

  toJSON(message: MsgCreateGroupWithPolicy): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    if (message.members) {
      obj.members = message.members.map((e) =>
        e ? MemberRequest.toJSON(e) : undefined,
      );
    } else {
      obj.members = [];
    }
    message.group_metadata !== undefined &&
      (obj.group_metadata = message.group_metadata);
    message.group_policy_metadata !== undefined &&
      (obj.group_policy_metadata = message.group_policy_metadata);
    message.group_policy_as_admin !== undefined &&
      (obj.group_policy_as_admin = message.group_policy_as_admin);
    message.decision_policy !== undefined &&
      (obj.decision_policy = message.decision_policy
        ? Any.toJSON(message.decision_policy)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateGroupWithPolicy>,
  ): MsgCreateGroupWithPolicy {
    const message = createBaseMsgCreateGroupWithPolicy();
    message.admin = object.admin ?? "";
    message.members =
      object.members?.map((e) => MemberRequest.fromPartial(e)) || [];
    message.group_metadata = object.group_metadata ?? "";
    message.group_policy_metadata = object.group_policy_metadata ?? "";
    message.group_policy_as_admin = object.group_policy_as_admin ?? false;
    message.decision_policy =
      object.decision_policy !== undefined && object.decision_policy !== null
        ? Any.fromPartial(object.decision_policy)
        : undefined;
    return message;
  },
};

function createBaseMsgCreateGroupWithPolicyResponse(): MsgCreateGroupWithPolicyResponse {
  return { group_id: "0", group_policy_address: "" };
}

export const MsgCreateGroupWithPolicyResponse = {
  encode(
    message: MsgCreateGroupWithPolicyResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.group_id !== "0") {
      writer.uint32(8).uint64(message.group_id);
    }
    if (message.group_policy_address !== "") {
      writer.uint32(18).string(message.group_policy_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgCreateGroupWithPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupWithPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.group_policy_address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupWithPolicyResponse {
    return {
      group_id: isSet(object.group_id) ? String(object.group_id) : "0",
      group_policy_address: isSet(object.group_policy_address)
        ? String(object.group_policy_address)
        : "",
    };
  },

  toJSON(message: MsgCreateGroupWithPolicyResponse): unknown {
    const obj: any = {};
    message.group_id !== undefined && (obj.group_id = message.group_id);
    message.group_policy_address !== undefined &&
      (obj.group_policy_address = message.group_policy_address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateGroupWithPolicyResponse>,
  ): MsgCreateGroupWithPolicyResponse {
    const message = createBaseMsgCreateGroupWithPolicyResponse();
    message.group_id = object.group_id ?? "0";
    message.group_policy_address = object.group_policy_address ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyDecisionPolicy(): MsgUpdateGroupPolicyDecisionPolicy {
  return { admin: "", group_policy_address: "", decision_policy: undefined };
}

export const MsgUpdateGroupPolicyDecisionPolicy = {
  encode(
    message: MsgUpdateGroupPolicyDecisionPolicy,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.group_policy_address !== "") {
      writer.uint32(18).string(message.group_policy_address);
    }
    if (message.decision_policy !== undefined) {
      Any.encode(message.decision_policy, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateGroupPolicyDecisionPolicy {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.group_policy_address = reader.string();
          break;
        case 3:
          message.decision_policy = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupPolicyDecisionPolicy {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      group_policy_address: isSet(object.group_policy_address)
        ? String(object.group_policy_address)
        : "",
      decision_policy: isSet(object.decision_policy)
        ? Any.fromJSON(object.decision_policy)
        : undefined,
    };
  },

  toJSON(message: MsgUpdateGroupPolicyDecisionPolicy): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.group_policy_address !== undefined &&
      (obj.group_policy_address = message.group_policy_address);
    message.decision_policy !== undefined &&
      (obj.decision_policy = message.decision_policy
        ? Any.toJSON(message.decision_policy)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateGroupPolicyDecisionPolicy>,
  ): MsgUpdateGroupPolicyDecisionPolicy {
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicy();
    message.admin = object.admin ?? "";
    message.group_policy_address = object.group_policy_address ?? "";
    message.decision_policy =
      object.decision_policy !== undefined && object.decision_policy !== null
        ? Any.fromPartial(object.decision_policy)
        : undefined;
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyDecisionPolicyResponse(): MsgUpdateGroupPolicyDecisionPolicyResponse {
  return {};
}

export const MsgUpdateGroupPolicyDecisionPolicyResponse = {
  encode(
    _: MsgUpdateGroupPolicyDecisionPolicyResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateGroupPolicyDecisionPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicyResponse();
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

  fromJSON(_: any): MsgUpdateGroupPolicyDecisionPolicyResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupPolicyDecisionPolicyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateGroupPolicyDecisionPolicyResponse>,
  ): MsgUpdateGroupPolicyDecisionPolicyResponse {
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicyResponse();
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyMetadata(): MsgUpdateGroupPolicyMetadata {
  return { admin: "", group_policy_address: "", metadata: "" };
}

export const MsgUpdateGroupPolicyMetadata = {
  encode(
    message: MsgUpdateGroupPolicyMetadata,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.group_policy_address !== "") {
      writer.uint32(18).string(message.group_policy_address);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateGroupPolicyMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.group_policy_address = reader.string();
          break;
        case 3:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupPolicyMetadata {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      group_policy_address: isSet(object.group_policy_address)
        ? String(object.group_policy_address)
        : "",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: MsgUpdateGroupPolicyMetadata): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.group_policy_address !== undefined &&
      (obj.group_policy_address = message.group_policy_address);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgUpdateGroupPolicyMetadata>,
  ): MsgUpdateGroupPolicyMetadata {
    const message = createBaseMsgUpdateGroupPolicyMetadata();
    message.admin = object.admin ?? "";
    message.group_policy_address = object.group_policy_address ?? "";
    message.metadata = object.metadata ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyMetadataResponse(): MsgUpdateGroupPolicyMetadataResponse {
  return {};
}

export const MsgUpdateGroupPolicyMetadataResponse = {
  encode(
    _: MsgUpdateGroupPolicyMetadataResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateGroupPolicyMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyMetadataResponse();
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

  fromJSON(_: any): MsgUpdateGroupPolicyMetadataResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupPolicyMetadataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateGroupPolicyMetadataResponse>,
  ): MsgUpdateGroupPolicyMetadataResponse {
    const message = createBaseMsgUpdateGroupPolicyMetadataResponse();
    return message;
  },
};

function createBaseMsgSubmitProposal(): MsgSubmitProposal {
  return {
    group_policy_address: "",
    proposers: [],
    metadata: "",
    messages: [],
    exec: 0,
    title: "",
    summary: "",
  };
}

export const MsgSubmitProposal = {
  encode(
    message: MsgSubmitProposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.group_policy_address !== "") {
      writer.uint32(10).string(message.group_policy_address);
    }
    for (const v of message.proposers) {
      writer.uint32(18).string(v!);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.exec !== 0) {
      writer.uint32(40).int32(message.exec);
    }
    if (message.title !== "") {
      writer.uint32(50).string(message.title);
    }
    if (message.summary !== "") {
      writer.uint32(58).string(message.summary);
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
          message.group_policy_address = reader.string();
          break;
        case 2:
          message.proposers.push(reader.string());
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.messages.push(Any.decode(reader, reader.uint32()));
          break;
        case 5:
          message.exec = reader.int32() as any;
          break;
        case 6:
          message.title = reader.string();
          break;
        case 7:
          message.summary = reader.string();
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
      group_policy_address: isSet(object.group_policy_address)
        ? String(object.group_policy_address)
        : "",
      proposers: Array.isArray(object?.proposers)
        ? object.proposers.map((e: any) => String(e))
        : [],
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Any.fromJSON(e))
        : [],
      exec: isSet(object.exec) ? execFromJSON(object.exec) : 0,
      title: isSet(object.title) ? String(object.title) : "",
      summary: isSet(object.summary) ? String(object.summary) : "",
    };
  },

  toJSON(message: MsgSubmitProposal): unknown {
    const obj: any = {};
    message.group_policy_address !== undefined &&
      (obj.group_policy_address = message.group_policy_address);
    if (message.proposers) {
      obj.proposers = message.proposers.map((e) => e);
    } else {
      obj.proposers = [];
    }
    message.metadata !== undefined && (obj.metadata = message.metadata);
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Any.toJSON(e) : undefined,
      );
    } else {
      obj.messages = [];
    }
    message.exec !== undefined && (obj.exec = execToJSON(message.exec));
    message.title !== undefined && (obj.title = message.title);
    message.summary !== undefined && (obj.summary = message.summary);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSubmitProposal>): MsgSubmitProposal {
    const message = createBaseMsgSubmitProposal();
    message.group_policy_address = object.group_policy_address ?? "";
    message.proposers = object.proposers?.map((e) => e) || [];
    message.metadata = object.metadata ?? "";
    message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
    message.exec = object.exec ?? 0;
    message.title = object.title ?? "";
    message.summary = object.summary ?? "";
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

function createBaseMsgWithdrawProposal(): MsgWithdrawProposal {
  return { proposal_id: "0", address: "" };
}

export const MsgWithdrawProposal = {
  encode(
    message: MsgWithdrawProposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.proposal_id !== "0") {
      writer.uint32(8).uint64(message.proposal_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawProposal {
    return {
      proposal_id: isSet(object.proposal_id) ? String(object.proposal_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: MsgWithdrawProposal): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = message.proposal_id);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgWithdrawProposal>): MsgWithdrawProposal {
    const message = createBaseMsgWithdrawProposal();
    message.proposal_id = object.proposal_id ?? "0";
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseMsgWithdrawProposalResponse(): MsgWithdrawProposalResponse {
  return {};
}

export const MsgWithdrawProposalResponse = {
  encode(
    _: MsgWithdrawProposalResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgWithdrawProposalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawProposalResponse();
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

  fromJSON(_: any): MsgWithdrawProposalResponse {
    return {};
  },

  toJSON(_: MsgWithdrawProposalResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgWithdrawProposalResponse>,
  ): MsgWithdrawProposalResponse {
    const message = createBaseMsgWithdrawProposalResponse();
    return message;
  },
};

function createBaseMsgVote(): MsgVote {
  return { proposal_id: "0", voter: "", option: 0, metadata: "", exec: 0 };
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
    if (message.exec !== 0) {
      writer.uint32(40).int32(message.exec);
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
        case 5:
          message.exec = reader.int32() as any;
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
      exec: isSet(object.exec) ? execFromJSON(object.exec) : 0,
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
    message.exec !== undefined && (obj.exec = execToJSON(message.exec));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgVote>): MsgVote {
    const message = createBaseMsgVote();
    message.proposal_id = object.proposal_id ?? "0";
    message.voter = object.voter ?? "";
    message.option = object.option ?? 0;
    message.metadata = object.metadata ?? "";
    message.exec = object.exec ?? 0;
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

function createBaseMsgExec(): MsgExec {
  return { proposal_id: "0", executor: "" };
}

export const MsgExec = {
  encode(
    message: MsgExec,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.proposal_id !== "0") {
      writer.uint32(8).uint64(message.proposal_id);
    }
    if (message.executor !== "") {
      writer.uint32(18).string(message.executor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExec {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.executor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExec {
    return {
      proposal_id: isSet(object.proposal_id) ? String(object.proposal_id) : "0",
      executor: isSet(object.executor) ? String(object.executor) : "",
    };
  },

  toJSON(message: MsgExec): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = message.proposal_id);
    message.executor !== undefined && (obj.executor = message.executor);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgExec>): MsgExec {
    const message = createBaseMsgExec();
    message.proposal_id = object.proposal_id ?? "0";
    message.executor = object.executor ?? "";
    return message;
  },
};

function createBaseMsgExecResponse(): MsgExecResponse {
  return { result: 0 };
}

export const MsgExecResponse = {
  encode(
    message: MsgExecResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(16).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.result = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExecResponse {
    return {
      result: isSet(object.result)
        ? proposalExecutorResultFromJSON(object.result)
        : 0,
    };
  },

  toJSON(message: MsgExecResponse): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = proposalExecutorResultToJSON(message.result));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgExecResponse>): MsgExecResponse {
    const message = createBaseMsgExecResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgLeaveGroup(): MsgLeaveGroup {
  return { address: "", group_id: "0" };
}

export const MsgLeaveGroup = {
  encode(
    message: MsgLeaveGroup,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.group_id !== "0") {
      writer.uint32(16).uint64(message.group_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLeaveGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLeaveGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.group_id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgLeaveGroup {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      group_id: isSet(object.group_id) ? String(object.group_id) : "0",
    };
  },

  toJSON(message: MsgLeaveGroup): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.group_id !== undefined && (obj.group_id = message.group_id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgLeaveGroup>): MsgLeaveGroup {
    const message = createBaseMsgLeaveGroup();
    message.address = object.address ?? "";
    message.group_id = object.group_id ?? "0";
    return message;
  },
};

function createBaseMsgLeaveGroupResponse(): MsgLeaveGroupResponse {
  return {};
}

export const MsgLeaveGroupResponse = {
  encode(
    _: MsgLeaveGroupResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgLeaveGroupResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLeaveGroupResponse();
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

  fromJSON(_: any): MsgLeaveGroupResponse {
    return {};
  },

  toJSON(_: MsgLeaveGroupResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgLeaveGroupResponse>): MsgLeaveGroupResponse {
    const message = createBaseMsgLeaveGroupResponse();
    return message;
  },
};

/** Msg is the cosmos.group.v1 Msg service. */
export interface Msg {
  /** CreateGroup creates a new group with an admin account address, a list of members and some optional metadata. */
  CreateGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse>;
  /** UpdateGroupMembers updates the group members with given group id and admin address. */
  UpdateGroupMembers(
    request: MsgUpdateGroupMembers,
  ): Promise<MsgUpdateGroupMembersResponse>;
  /** UpdateGroupAdmin updates the group admin with given group id and previous admin address. */
  UpdateGroupAdmin(
    request: MsgUpdateGroupAdmin,
  ): Promise<MsgUpdateGroupAdminResponse>;
  /** UpdateGroupMetadata updates the group metadata with given group id and admin address. */
  UpdateGroupMetadata(
    request: MsgUpdateGroupMetadata,
  ): Promise<MsgUpdateGroupMetadataResponse>;
  /** CreateGroupPolicy creates a new group policy using given DecisionPolicy. */
  CreateGroupPolicy(
    request: MsgCreateGroupPolicy,
  ): Promise<MsgCreateGroupPolicyResponse>;
  /** CreateGroupWithPolicy creates a new group with policy. */
  CreateGroupWithPolicy(
    request: MsgCreateGroupWithPolicy,
  ): Promise<MsgCreateGroupWithPolicyResponse>;
  /** UpdateGroupPolicyAdmin updates a group policy admin. */
  UpdateGroupPolicyAdmin(
    request: MsgUpdateGroupPolicyAdmin,
  ): Promise<MsgUpdateGroupPolicyAdminResponse>;
  /** UpdateGroupPolicyDecisionPolicy allows a group policy's decision policy to be updated. */
  UpdateGroupPolicyDecisionPolicy(
    request: MsgUpdateGroupPolicyDecisionPolicy,
  ): Promise<MsgUpdateGroupPolicyDecisionPolicyResponse>;
  /** UpdateGroupPolicyMetadata updates a group policy metadata. */
  UpdateGroupPolicyMetadata(
    request: MsgUpdateGroupPolicyMetadata,
  ): Promise<MsgUpdateGroupPolicyMetadataResponse>;
  /** SubmitProposal submits a new proposal. */
  SubmitProposal(
    request: MsgSubmitProposal,
  ): Promise<MsgSubmitProposalResponse>;
  /** WithdrawProposal withdraws a proposal. */
  WithdrawProposal(
    request: MsgWithdrawProposal,
  ): Promise<MsgWithdrawProposalResponse>;
  /** Vote allows a voter to vote on a proposal. */
  Vote(request: MsgVote): Promise<MsgVoteResponse>;
  /** Exec executes a proposal. */
  Exec(request: MsgExec): Promise<MsgExecResponse>;
  /** LeaveGroup allows a group member to leave the group. */
  LeaveGroup(request: MsgLeaveGroup): Promise<MsgLeaveGroupResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateGroup = this.CreateGroup.bind(this);
    this.UpdateGroupMembers = this.UpdateGroupMembers.bind(this);
    this.UpdateGroupAdmin = this.UpdateGroupAdmin.bind(this);
    this.UpdateGroupMetadata = this.UpdateGroupMetadata.bind(this);
    this.CreateGroupPolicy = this.CreateGroupPolicy.bind(this);
    this.CreateGroupWithPolicy = this.CreateGroupWithPolicy.bind(this);
    this.UpdateGroupPolicyAdmin = this.UpdateGroupPolicyAdmin.bind(this);
    this.UpdateGroupPolicyDecisionPolicy =
      this.UpdateGroupPolicyDecisionPolicy.bind(this);
    this.UpdateGroupPolicyMetadata = this.UpdateGroupPolicyMetadata.bind(this);
    this.SubmitProposal = this.SubmitProposal.bind(this);
    this.WithdrawProposal = this.WithdrawProposal.bind(this);
    this.Vote = this.Vote.bind(this);
    this.Exec = this.Exec.bind(this);
    this.LeaveGroup = this.LeaveGroup.bind(this);
  }
  CreateGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse> {
    const data = MsgCreateGroup.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1.Msg",
      "CreateGroup",
      data,
    );
    return promise.then((data) =>
      MsgCreateGroupResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateGroupMembers(
    request: MsgUpdateGroupMembers,
  ): Promise<MsgUpdateGroupMembersResponse> {
    const data = MsgUpdateGroupMembers.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1.Msg",
      "UpdateGroupMembers",
      data,
    );
    return promise.then((data) =>
      MsgUpdateGroupMembersResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateGroupAdmin(
    request: MsgUpdateGroupAdmin,
  ): Promise<MsgUpdateGroupAdminResponse> {
    const data = MsgUpdateGroupAdmin.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1.Msg",
      "UpdateGroupAdmin",
      data,
    );
    return promise.then((data) =>
      MsgUpdateGroupAdminResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateGroupMetadata(
    request: MsgUpdateGroupMetadata,
  ): Promise<MsgUpdateGroupMetadataResponse> {
    const data = MsgUpdateGroupMetadata.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1.Msg",
      "UpdateGroupMetadata",
      data,
    );
    return promise.then((data) =>
      MsgUpdateGroupMetadataResponse.decode(new _m0.Reader(data)),
    );
  }

  CreateGroupPolicy(
    request: MsgCreateGroupPolicy,
  ): Promise<MsgCreateGroupPolicyResponse> {
    const data = MsgCreateGroupPolicy.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1.Msg",
      "CreateGroupPolicy",
      data,
    );
    return promise.then((data) =>
      MsgCreateGroupPolicyResponse.decode(new _m0.Reader(data)),
    );
  }

  CreateGroupWithPolicy(
    request: MsgCreateGroupWithPolicy,
  ): Promise<MsgCreateGroupWithPolicyResponse> {
    const data = MsgCreateGroupWithPolicy.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1.Msg",
      "CreateGroupWithPolicy",
      data,
    );
    return promise.then((data) =>
      MsgCreateGroupWithPolicyResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateGroupPolicyAdmin(
    request: MsgUpdateGroupPolicyAdmin,
  ): Promise<MsgUpdateGroupPolicyAdminResponse> {
    const data = MsgUpdateGroupPolicyAdmin.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1.Msg",
      "UpdateGroupPolicyAdmin",
      data,
    );
    return promise.then((data) =>
      MsgUpdateGroupPolicyAdminResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateGroupPolicyDecisionPolicy(
    request: MsgUpdateGroupPolicyDecisionPolicy,
  ): Promise<MsgUpdateGroupPolicyDecisionPolicyResponse> {
    const data = MsgUpdateGroupPolicyDecisionPolicy.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1.Msg",
      "UpdateGroupPolicyDecisionPolicy",
      data,
    );
    return promise.then((data) =>
      MsgUpdateGroupPolicyDecisionPolicyResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateGroupPolicyMetadata(
    request: MsgUpdateGroupPolicyMetadata,
  ): Promise<MsgUpdateGroupPolicyMetadataResponse> {
    const data = MsgUpdateGroupPolicyMetadata.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1.Msg",
      "UpdateGroupPolicyMetadata",
      data,
    );
    return promise.then((data) =>
      MsgUpdateGroupPolicyMetadataResponse.decode(new _m0.Reader(data)),
    );
  }

  SubmitProposal(
    request: MsgSubmitProposal,
  ): Promise<MsgSubmitProposalResponse> {
    const data = MsgSubmitProposal.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1.Msg",
      "SubmitProposal",
      data,
    );
    return promise.then((data) =>
      MsgSubmitProposalResponse.decode(new _m0.Reader(data)),
    );
  }

  WithdrawProposal(
    request: MsgWithdrawProposal,
  ): Promise<MsgWithdrawProposalResponse> {
    const data = MsgWithdrawProposal.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1.Msg",
      "WithdrawProposal",
      data,
    );
    return promise.then((data) =>
      MsgWithdrawProposalResponse.decode(new _m0.Reader(data)),
    );
  }

  Vote(request: MsgVote): Promise<MsgVoteResponse> {
    const data = MsgVote.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "Vote", data);
    return promise.then((data) => MsgVoteResponse.decode(new _m0.Reader(data)));
  }

  Exec(request: MsgExec): Promise<MsgExecResponse> {
    const data = MsgExec.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "Exec", data);
    return promise.then((data) => MsgExecResponse.decode(new _m0.Reader(data)));
  }

  LeaveGroup(request: MsgLeaveGroup): Promise<MsgLeaveGroupResponse> {
    const data = MsgLeaveGroup.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "LeaveGroup", data);
    return promise.then((data) =>
      MsgLeaveGroupResponse.decode(new _m0.Reader(data)),
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
