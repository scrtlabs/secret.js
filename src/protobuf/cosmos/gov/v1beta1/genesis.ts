/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  DepositParams,
  VotingParams,
  TallyParams,
  Deposit,
  Vote,
  Proposal,
} from "./gov";

export const protobufPackage = "cosmos.gov.v1beta1";

/** GenesisState defines the gov module's genesis state. */
export interface GenesisState {
  /** starting_proposal_id is the ID of the starting proposal. */
  starting_proposal_id: string;
  /** deposits defines all the deposits present at genesis. */
  deposits: Deposit[];
  /** votes defines all the votes present at genesis. */
  votes: Vote[];
  /** proposals defines all the proposals present at genesis. */
  proposals: Proposal[];
  /** params defines all the paramaters of related to deposit. */
  deposit_params?: DepositParams;
  /** params defines all the paramaters of related to voting. */
  voting_params?: VotingParams;
  /** params defines all the paramaters of related to tally. */
  tally_params?: TallyParams;
}

function createBaseGenesisState(): GenesisState {
  return {
    starting_proposal_id: "0",
    deposits: [],
    votes: [],
    proposals: [],
    deposit_params: undefined,
    voting_params: undefined,
    tally_params: undefined,
  };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.starting_proposal_id !== "0") {
      writer.uint32(8).uint64(message.starting_proposal_id);
    }
    for (const v of message.deposits) {
      Deposit.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.votes) {
      Vote.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.proposals) {
      Proposal.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.deposit_params !== undefined) {
      DepositParams.encode(
        message.deposit_params,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.voting_params !== undefined) {
      VotingParams.encode(
        message.voting_params,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.tally_params !== undefined) {
      TallyParams.encode(
        message.tally_params,
        writer.uint32(58).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.starting_proposal_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.deposits.push(Deposit.decode(reader, reader.uint32()));
          break;
        case 3:
          message.votes.push(Vote.decode(reader, reader.uint32()));
          break;
        case 4:
          message.proposals.push(Proposal.decode(reader, reader.uint32()));
          break;
        case 5:
          message.deposit_params = DepositParams.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 6:
          message.voting_params = VotingParams.decode(reader, reader.uint32());
          break;
        case 7:
          message.tally_params = TallyParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      starting_proposal_id: isSet(object.starting_proposal_id)
        ? String(object.starting_proposal_id)
        : "0",
      deposits: Array.isArray(object?.deposits)
        ? object.deposits.map((e: any) => Deposit.fromJSON(e))
        : [],
      votes: Array.isArray(object?.votes)
        ? object.votes.map((e: any) => Vote.fromJSON(e))
        : [],
      proposals: Array.isArray(object?.proposals)
        ? object.proposals.map((e: any) => Proposal.fromJSON(e))
        : [],
      deposit_params: isSet(object.deposit_params)
        ? DepositParams.fromJSON(object.deposit_params)
        : undefined,
      voting_params: isSet(object.voting_params)
        ? VotingParams.fromJSON(object.voting_params)
        : undefined,
      tally_params: isSet(object.tally_params)
        ? TallyParams.fromJSON(object.tally_params)
        : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.starting_proposal_id !== undefined &&
      (obj.starting_proposal_id = message.starting_proposal_id);
    if (message.deposits) {
      obj.deposits = message.deposits.map((e) =>
        e ? Deposit.toJSON(e) : undefined,
      );
    } else {
      obj.deposits = [];
    }
    if (message.votes) {
      obj.votes = message.votes.map((e) => (e ? Vote.toJSON(e) : undefined));
    } else {
      obj.votes = [];
    }
    if (message.proposals) {
      obj.proposals = message.proposals.map((e) =>
        e ? Proposal.toJSON(e) : undefined,
      );
    } else {
      obj.proposals = [];
    }
    message.deposit_params !== undefined &&
      (obj.deposit_params = message.deposit_params
        ? DepositParams.toJSON(message.deposit_params)
        : undefined);
    message.voting_params !== undefined &&
      (obj.voting_params = message.voting_params
        ? VotingParams.toJSON(message.voting_params)
        : undefined);
    message.tally_params !== undefined &&
      (obj.tally_params = message.tally_params
        ? TallyParams.toJSON(message.tally_params)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I,
  ): GenesisState {
    const message = createBaseGenesisState();
    message.starting_proposal_id = object.starting_proposal_id ?? "0";
    message.deposits =
      object.deposits?.map((e) => Deposit.fromPartial(e)) || [];
    message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
    message.proposals =
      object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
    message.deposit_params =
      object.deposit_params !== undefined && object.deposit_params !== null
        ? DepositParams.fromPartial(object.deposit_params)
        : undefined;
    message.voting_params =
      object.voting_params !== undefined && object.voting_params !== null
        ? VotingParams.fromPartial(object.voting_params)
        : undefined;
    message.tally_params =
      object.tally_params !== undefined && object.tally_params !== null
        ? TallyParams.fromPartial(object.tally_params)
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
