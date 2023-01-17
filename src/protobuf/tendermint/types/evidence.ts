/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Vote, LightBlock } from "./types";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Validator } from "./validator";

export const protobufPackage = "tendermint.types";

export interface Evidence {
  duplicate_vote_evidence?: DuplicateVoteEvidence | undefined;
  light_client_attack_evidence?: LightClientAttackEvidence | undefined;
}

/** DuplicateVoteEvidence contains evidence of a validator signed two conflicting votes. */
export interface DuplicateVoteEvidence {
  vote_a?: Vote;
  vote_b?: Vote;
  total_voting_power: string;
  validator_power: string;
  timestamp?: Timestamp;
}

/** LightClientAttackEvidence contains evidence of a set of validators attempting to mislead a light client. */
export interface LightClientAttackEvidence {
  conflicting_block?: LightBlock;
  common_height: string;
  byzantine_validators: Validator[];
  total_voting_power: string;
  timestamp?: Timestamp;
}

export interface EvidenceList {
  evidence: Evidence[];
}

function createBaseEvidence(): Evidence {
  return {
    duplicate_vote_evidence: undefined,
    light_client_attack_evidence: undefined,
  };
}

export const Evidence = {
  encode(
    message: Evidence,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.duplicate_vote_evidence !== undefined) {
      DuplicateVoteEvidence.encode(
        message.duplicate_vote_evidence,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.light_client_attack_evidence !== undefined) {
      LightClientAttackEvidence.encode(
        message.light_client_attack_evidence,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Evidence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvidence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.duplicate_vote_evidence = DuplicateVoteEvidence.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.light_client_attack_evidence =
            LightClientAttackEvidence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Evidence {
    return {
      duplicate_vote_evidence: isSet(object.duplicate_vote_evidence)
        ? DuplicateVoteEvidence.fromJSON(object.duplicate_vote_evidence)
        : undefined,
      light_client_attack_evidence: isSet(object.light_client_attack_evidence)
        ? LightClientAttackEvidence.fromJSON(
            object.light_client_attack_evidence,
          )
        : undefined,
    };
  },

  toJSON(message: Evidence): unknown {
    const obj: any = {};
    message.duplicate_vote_evidence !== undefined &&
      (obj.duplicate_vote_evidence = message.duplicate_vote_evidence
        ? DuplicateVoteEvidence.toJSON(message.duplicate_vote_evidence)
        : undefined);
    message.light_client_attack_evidence !== undefined &&
      (obj.light_client_attack_evidence = message.light_client_attack_evidence
        ? LightClientAttackEvidence.toJSON(message.light_client_attack_evidence)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Evidence>, I>>(object: I): Evidence {
    const message = createBaseEvidence();
    message.duplicate_vote_evidence =
      object.duplicate_vote_evidence !== undefined &&
      object.duplicate_vote_evidence !== null
        ? DuplicateVoteEvidence.fromPartial(object.duplicate_vote_evidence)
        : undefined;
    message.light_client_attack_evidence =
      object.light_client_attack_evidence !== undefined &&
      object.light_client_attack_evidence !== null
        ? LightClientAttackEvidence.fromPartial(
            object.light_client_attack_evidence,
          )
        : undefined;
    return message;
  },
};

function createBaseDuplicateVoteEvidence(): DuplicateVoteEvidence {
  return {
    vote_a: undefined,
    vote_b: undefined,
    total_voting_power: "0",
    validator_power: "0",
    timestamp: undefined,
  };
}

export const DuplicateVoteEvidence = {
  encode(
    message: DuplicateVoteEvidence,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.vote_a !== undefined) {
      Vote.encode(message.vote_a, writer.uint32(10).fork()).ldelim();
    }
    if (message.vote_b !== undefined) {
      Vote.encode(message.vote_b, writer.uint32(18).fork()).ldelim();
    }
    if (message.total_voting_power !== "0") {
      writer.uint32(24).int64(message.total_voting_power);
    }
    if (message.validator_power !== "0") {
      writer.uint32(32).int64(message.validator_power);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(message.timestamp, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): DuplicateVoteEvidence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDuplicateVoteEvidence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vote_a = Vote.decode(reader, reader.uint32());
          break;
        case 2:
          message.vote_b = Vote.decode(reader, reader.uint32());
          break;
        case 3:
          message.total_voting_power = longToString(reader.int64() as Long);
          break;
        case 4:
          message.validator_power = longToString(reader.int64() as Long);
          break;
        case 5:
          message.timestamp = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DuplicateVoteEvidence {
    return {
      vote_a: isSet(object.vote_a) ? Vote.fromJSON(object.vote_a) : undefined,
      vote_b: isSet(object.vote_b) ? Vote.fromJSON(object.vote_b) : undefined,
      total_voting_power: isSet(object.total_voting_power)
        ? String(object.total_voting_power)
        : "0",
      validator_power: isSet(object.validator_power)
        ? String(object.validator_power)
        : "0",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
    };
  },

  toJSON(message: DuplicateVoteEvidence): unknown {
    const obj: any = {};
    message.vote_a !== undefined &&
      (obj.vote_a = message.vote_a ? Vote.toJSON(message.vote_a) : undefined);
    message.vote_b !== undefined &&
      (obj.vote_b = message.vote_b ? Vote.toJSON(message.vote_b) : undefined);
    message.total_voting_power !== undefined &&
      (obj.total_voting_power = message.total_voting_power);
    message.validator_power !== undefined &&
      (obj.validator_power = message.validator_power);
    message.timestamp !== undefined &&
      (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DuplicateVoteEvidence>, I>>(
    object: I,
  ): DuplicateVoteEvidence {
    const message = createBaseDuplicateVoteEvidence();
    message.vote_a =
      object.vote_a !== undefined && object.vote_a !== null
        ? Vote.fromPartial(object.vote_a)
        : undefined;
    message.vote_b =
      object.vote_b !== undefined && object.vote_b !== null
        ? Vote.fromPartial(object.vote_b)
        : undefined;
    message.total_voting_power = object.total_voting_power ?? "0";
    message.validator_power = object.validator_power ?? "0";
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Timestamp.fromPartial(object.timestamp)
        : undefined;
    return message;
  },
};

function createBaseLightClientAttackEvidence(): LightClientAttackEvidence {
  return {
    conflicting_block: undefined,
    common_height: "0",
    byzantine_validators: [],
    total_voting_power: "0",
    timestamp: undefined,
  };
}

export const LightClientAttackEvidence = {
  encode(
    message: LightClientAttackEvidence,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.conflicting_block !== undefined) {
      LightBlock.encode(
        message.conflicting_block,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.common_height !== "0") {
      writer.uint32(16).int64(message.common_height);
    }
    for (const v of message.byzantine_validators) {
      Validator.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.total_voting_power !== "0") {
      writer.uint32(32).int64(message.total_voting_power);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(message.timestamp, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): LightClientAttackEvidence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLightClientAttackEvidence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conflicting_block = LightBlock.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.common_height = longToString(reader.int64() as Long);
          break;
        case 3:
          message.byzantine_validators.push(
            Validator.decode(reader, reader.uint32()),
          );
          break;
        case 4:
          message.total_voting_power = longToString(reader.int64() as Long);
          break;
        case 5:
          message.timestamp = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LightClientAttackEvidence {
    return {
      conflicting_block: isSet(object.conflicting_block)
        ? LightBlock.fromJSON(object.conflicting_block)
        : undefined,
      common_height: isSet(object.common_height)
        ? String(object.common_height)
        : "0",
      byzantine_validators: Array.isArray(object?.byzantine_validators)
        ? object.byzantine_validators.map((e: any) => Validator.fromJSON(e))
        : [],
      total_voting_power: isSet(object.total_voting_power)
        ? String(object.total_voting_power)
        : "0",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
    };
  },

  toJSON(message: LightClientAttackEvidence): unknown {
    const obj: any = {};
    message.conflicting_block !== undefined &&
      (obj.conflicting_block = message.conflicting_block
        ? LightBlock.toJSON(message.conflicting_block)
        : undefined);
    message.common_height !== undefined &&
      (obj.common_height = message.common_height);
    if (message.byzantine_validators) {
      obj.byzantine_validators = message.byzantine_validators.map((e) =>
        e ? Validator.toJSON(e) : undefined,
      );
    } else {
      obj.byzantine_validators = [];
    }
    message.total_voting_power !== undefined &&
      (obj.total_voting_power = message.total_voting_power);
    message.timestamp !== undefined &&
      (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LightClientAttackEvidence>, I>>(
    object: I,
  ): LightClientAttackEvidence {
    const message = createBaseLightClientAttackEvidence();
    message.conflicting_block =
      object.conflicting_block !== undefined &&
      object.conflicting_block !== null
        ? LightBlock.fromPartial(object.conflicting_block)
        : undefined;
    message.common_height = object.common_height ?? "0";
    message.byzantine_validators =
      object.byzantine_validators?.map((e) => Validator.fromPartial(e)) || [];
    message.total_voting_power = object.total_voting_power ?? "0";
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Timestamp.fromPartial(object.timestamp)
        : undefined;
    return message;
  },
};

function createBaseEvidenceList(): EvidenceList {
  return { evidence: [] };
}

export const EvidenceList = {
  encode(
    message: EvidenceList,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.evidence) {
      Evidence.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EvidenceList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvidenceList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.evidence.push(Evidence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EvidenceList {
    return {
      evidence: Array.isArray(object?.evidence)
        ? object.evidence.map((e: any) => Evidence.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EvidenceList): unknown {
    const obj: any = {};
    if (message.evidence) {
      obj.evidence = message.evidence.map((e) =>
        e ? Evidence.toJSON(e) : undefined,
      );
    } else {
      obj.evidence = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EvidenceList>, I>>(
    object: I,
  ): EvidenceList {
    const message = createBaseEvidenceList();
    message.evidence =
      object.evidence?.map((e) => Evidence.fromPartial(e)) || [];
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
