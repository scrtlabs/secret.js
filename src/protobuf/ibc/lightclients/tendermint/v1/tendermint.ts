/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Duration } from "../../../../google/protobuf/duration";
import { Height } from "../../../core/client/v1/client";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { MerkleRoot } from "../../../core/commitment/v1/commitment";
import { SignedHeader } from "../../../../tendermint/types/types";
import { ValidatorSet } from "../../../../tendermint/types/validator";
import { ProofSpec } from "../../../../confio/proofs";

export const protobufPackage = "ibc.lightclients.tendermint.v1";

/**
 * ClientState from Tendermint tracks the current validator set, latest height,
 * and a possible frozen height.
 */
export interface ClientState {
  chain_id: string;
  trust_level?: Fraction;
  /**
   * duration of the period since the LastestTimestamp during which the
   * submitted headers are valid for upgrade
   */
  trusting_period?: Duration;
  /** duration of the staking unbonding period */
  unbonding_period?: Duration;
  /** defines how much new (untrusted) header's Time can drift into the future. */
  max_clock_drift?: Duration;
  /** Block height when the client was frozen due to a misbehaviour */
  frozen_height?: Height;
  /** Latest height the client was updated to */
  latest_height?: Height;
  /** Proof specifications used in verifying counterparty state */
  proof_specs: ProofSpec[];
  /**
   * Path at which next upgraded client will be committed.
   * Each element corresponds to the key for a single CommitmentProof in the
   * chained proof. NOTE: ClientState must stored under
   * `{upgradePath}/{upgradeHeight}/clientState` ConsensusState must be stored
   * under `{upgradepath}/{upgradeHeight}/consensusState` For SDK chains using
   * the default upgrade module, upgrade_path should be []string{"upgrade",
   * "upgradedIBCState"}`
   */
  upgrade_path: string[];
  /**
   * allow_update_after_expiry is deprecated
   *
   * @deprecated
   */
  allow_update_after_expiry: boolean;
  /**
   * allow_update_after_misbehaviour is deprecated
   *
   * @deprecated
   */
  allow_update_after_misbehaviour: boolean;
}

/** ConsensusState defines the consensus state from Tendermint. */
export interface ConsensusState {
  /**
   * timestamp that corresponds to the block height in which the ConsensusState
   * was stored.
   */
  timestamp?: Timestamp;
  /** commitment root (i.e app hash) */
  root?: MerkleRoot;
  next_validators_hash: Uint8Array;
}

/**
 * Misbehaviour is a wrapper over two conflicting Headers
 * that implements Misbehaviour interface expected by ICS-02
 */
export interface Misbehaviour {
  client_id: string;
  header_1?: Header;
  header_2?: Header;
}

/**
 * Header defines the Tendermint client consensus Header.
 * It encapsulates all the information necessary to update from a trusted
 * Tendermint ConsensusState. The inclusion of TrustedHeight and
 * TrustedValidators allows this update to process correctly, so long as the
 * ConsensusState for the TrustedHeight exists, this removes race conditions
 * among relayers The SignedHeader and ValidatorSet are the new untrusted update
 * fields for the client. The TrustedHeight is the height of a stored
 * ConsensusState on the client that will be used to verify the new untrusted
 * header. The Trusted ConsensusState must be within the unbonding period of
 * current time in order to correctly verify, and the TrustedValidators must
 * hash to TrustedConsensusState.NextValidatorsHash since that is the last
 * trusted validator set at the TrustedHeight.
 */
export interface Header {
  signed_header?: SignedHeader;
  validator_set?: ValidatorSet;
  trusted_height?: Height;
  trusted_validators?: ValidatorSet;
}

/**
 * Fraction defines the protobuf message type for tmmath.Fraction that only
 * supports positive values.
 */
export interface Fraction {
  numerator: string;
  denominator: string;
}

function createBaseClientState(): ClientState {
  return {
    chain_id: "",
    trust_level: undefined,
    trusting_period: undefined,
    unbonding_period: undefined,
    max_clock_drift: undefined,
    frozen_height: undefined,
    latest_height: undefined,
    proof_specs: [],
    upgrade_path: [],
    allow_update_after_expiry: false,
    allow_update_after_misbehaviour: false,
  };
}

export const ClientState = {
  encode(
    message: ClientState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.chain_id !== "") {
      writer.uint32(10).string(message.chain_id);
    }
    if (message.trust_level !== undefined) {
      Fraction.encode(message.trust_level, writer.uint32(18).fork()).ldelim();
    }
    if (message.trusting_period !== undefined) {
      Duration.encode(
        message.trusting_period,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.unbonding_period !== undefined) {
      Duration.encode(
        message.unbonding_period,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.max_clock_drift !== undefined) {
      Duration.encode(
        message.max_clock_drift,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.frozen_height !== undefined) {
      Height.encode(message.frozen_height, writer.uint32(50).fork()).ldelim();
    }
    if (message.latest_height !== undefined) {
      Height.encode(message.latest_height, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.proof_specs) {
      ProofSpec.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.upgrade_path) {
      writer.uint32(74).string(v!);
    }
    if (message.allow_update_after_expiry === true) {
      writer.uint32(80).bool(message.allow_update_after_expiry);
    }
    if (message.allow_update_after_misbehaviour === true) {
      writer.uint32(88).bool(message.allow_update_after_misbehaviour);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chain_id = reader.string();
          break;
        case 2:
          message.trust_level = Fraction.decode(reader, reader.uint32());
          break;
        case 3:
          message.trusting_period = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.unbonding_period = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.max_clock_drift = Duration.decode(reader, reader.uint32());
          break;
        case 6:
          message.frozen_height = Height.decode(reader, reader.uint32());
          break;
        case 7:
          message.latest_height = Height.decode(reader, reader.uint32());
          break;
        case 8:
          message.proof_specs.push(ProofSpec.decode(reader, reader.uint32()));
          break;
        case 9:
          message.upgrade_path.push(reader.string());
          break;
        case 10:
          message.allow_update_after_expiry = reader.bool();
          break;
        case 11:
          message.allow_update_after_misbehaviour = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClientState {
    return {
      chain_id: isSet(object.chain_id) ? String(object.chain_id) : "",
      trust_level: isSet(object.trust_level)
        ? Fraction.fromJSON(object.trust_level)
        : undefined,
      trusting_period: isSet(object.trusting_period)
        ? Duration.fromJSON(object.trusting_period)
        : undefined,
      unbonding_period: isSet(object.unbonding_period)
        ? Duration.fromJSON(object.unbonding_period)
        : undefined,
      max_clock_drift: isSet(object.max_clock_drift)
        ? Duration.fromJSON(object.max_clock_drift)
        : undefined,
      frozen_height: isSet(object.frozen_height)
        ? Height.fromJSON(object.frozen_height)
        : undefined,
      latest_height: isSet(object.latest_height)
        ? Height.fromJSON(object.latest_height)
        : undefined,
      proof_specs: Array.isArray(object?.proof_specs)
        ? object.proof_specs.map((e: any) => ProofSpec.fromJSON(e))
        : [],
      upgrade_path: Array.isArray(object?.upgrade_path)
        ? object.upgrade_path.map((e: any) => String(e))
        : [],
      allow_update_after_expiry: isSet(object.allow_update_after_expiry)
        ? Boolean(object.allow_update_after_expiry)
        : false,
      allow_update_after_misbehaviour: isSet(
        object.allow_update_after_misbehaviour,
      )
        ? Boolean(object.allow_update_after_misbehaviour)
        : false,
    };
  },

  toJSON(message: ClientState): unknown {
    const obj: any = {};
    message.chain_id !== undefined && (obj.chain_id = message.chain_id);
    message.trust_level !== undefined &&
      (obj.trust_level = message.trust_level
        ? Fraction.toJSON(message.trust_level)
        : undefined);
    message.trusting_period !== undefined &&
      (obj.trusting_period = message.trusting_period
        ? Duration.toJSON(message.trusting_period)
        : undefined);
    message.unbonding_period !== undefined &&
      (obj.unbonding_period = message.unbonding_period
        ? Duration.toJSON(message.unbonding_period)
        : undefined);
    message.max_clock_drift !== undefined &&
      (obj.max_clock_drift = message.max_clock_drift
        ? Duration.toJSON(message.max_clock_drift)
        : undefined);
    message.frozen_height !== undefined &&
      (obj.frozen_height = message.frozen_height
        ? Height.toJSON(message.frozen_height)
        : undefined);
    message.latest_height !== undefined &&
      (obj.latest_height = message.latest_height
        ? Height.toJSON(message.latest_height)
        : undefined);
    if (message.proof_specs) {
      obj.proof_specs = message.proof_specs.map((e) =>
        e ? ProofSpec.toJSON(e) : undefined,
      );
    } else {
      obj.proof_specs = [];
    }
    if (message.upgrade_path) {
      obj.upgrade_path = message.upgrade_path.map((e) => e);
    } else {
      obj.upgrade_path = [];
    }
    message.allow_update_after_expiry !== undefined &&
      (obj.allow_update_after_expiry = message.allow_update_after_expiry);
    message.allow_update_after_misbehaviour !== undefined &&
      (obj.allow_update_after_misbehaviour =
        message.allow_update_after_misbehaviour);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClientState>, I>>(
    object: I,
  ): ClientState {
    const message = createBaseClientState();
    message.chain_id = object.chain_id ?? "";
    message.trust_level =
      object.trust_level !== undefined && object.trust_level !== null
        ? Fraction.fromPartial(object.trust_level)
        : undefined;
    message.trusting_period =
      object.trusting_period !== undefined && object.trusting_period !== null
        ? Duration.fromPartial(object.trusting_period)
        : undefined;
    message.unbonding_period =
      object.unbonding_period !== undefined && object.unbonding_period !== null
        ? Duration.fromPartial(object.unbonding_period)
        : undefined;
    message.max_clock_drift =
      object.max_clock_drift !== undefined && object.max_clock_drift !== null
        ? Duration.fromPartial(object.max_clock_drift)
        : undefined;
    message.frozen_height =
      object.frozen_height !== undefined && object.frozen_height !== null
        ? Height.fromPartial(object.frozen_height)
        : undefined;
    message.latest_height =
      object.latest_height !== undefined && object.latest_height !== null
        ? Height.fromPartial(object.latest_height)
        : undefined;
    message.proof_specs =
      object.proof_specs?.map((e) => ProofSpec.fromPartial(e)) || [];
    message.upgrade_path = object.upgrade_path?.map((e) => e) || [];
    message.allow_update_after_expiry =
      object.allow_update_after_expiry ?? false;
    message.allow_update_after_misbehaviour =
      object.allow_update_after_misbehaviour ?? false;
    return message;
  },
};

function createBaseConsensusState(): ConsensusState {
  return {
    timestamp: undefined,
    root: undefined,
    next_validators_hash: new Uint8Array(),
  };
}

export const ConsensusState = {
  encode(
    message: ConsensusState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(message.timestamp, writer.uint32(10).fork()).ldelim();
    }
    if (message.root !== undefined) {
      MerkleRoot.encode(message.root, writer.uint32(18).fork()).ldelim();
    }
    if (message.next_validators_hash.length !== 0) {
      writer.uint32(26).bytes(message.next_validators_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensusState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = Timestamp.decode(reader, reader.uint32());
          break;
        case 2:
          message.root = MerkleRoot.decode(reader, reader.uint32());
          break;
        case 3:
          message.next_validators_hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsensusState {
    return {
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      root: isSet(object.root) ? MerkleRoot.fromJSON(object.root) : undefined,
      next_validators_hash: isSet(object.next_validators_hash)
        ? bytesFromBase64(object.next_validators_hash)
        : new Uint8Array(),
    };
  },

  toJSON(message: ConsensusState): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
    message.root !== undefined &&
      (obj.root = message.root ? MerkleRoot.toJSON(message.root) : undefined);
    message.next_validators_hash !== undefined &&
      (obj.next_validators_hash = base64FromBytes(
        message.next_validators_hash !== undefined
          ? message.next_validators_hash
          : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsensusState>, I>>(
    object: I,
  ): ConsensusState {
    const message = createBaseConsensusState();
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Timestamp.fromPartial(object.timestamp)
        : undefined;
    message.root =
      object.root !== undefined && object.root !== null
        ? MerkleRoot.fromPartial(object.root)
        : undefined;
    message.next_validators_hash =
      object.next_validators_hash ?? new Uint8Array();
    return message;
  },
};

function createBaseMisbehaviour(): Misbehaviour {
  return { client_id: "", header_1: undefined, header_2: undefined };
}

export const Misbehaviour = {
  encode(
    message: Misbehaviour,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    if (message.header_1 !== undefined) {
      Header.encode(message.header_1, writer.uint32(18).fork()).ldelim();
    }
    if (message.header_2 !== undefined) {
      Header.encode(message.header_2, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Misbehaviour {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMisbehaviour();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.client_id = reader.string();
          break;
        case 2:
          message.header_1 = Header.decode(reader, reader.uint32());
          break;
        case 3:
          message.header_2 = Header.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Misbehaviour {
    return {
      client_id: isSet(object.client_id) ? String(object.client_id) : "",
      header_1: isSet(object.header_1)
        ? Header.fromJSON(object.header_1)
        : undefined,
      header_2: isSet(object.header_2)
        ? Header.fromJSON(object.header_2)
        : undefined,
    };
  },

  toJSON(message: Misbehaviour): unknown {
    const obj: any = {};
    message.client_id !== undefined && (obj.client_id = message.client_id);
    message.header_1 !== undefined &&
      (obj.header_1 = message.header_1
        ? Header.toJSON(message.header_1)
        : undefined);
    message.header_2 !== undefined &&
      (obj.header_2 = message.header_2
        ? Header.toJSON(message.header_2)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Misbehaviour>, I>>(
    object: I,
  ): Misbehaviour {
    const message = createBaseMisbehaviour();
    message.client_id = object.client_id ?? "";
    message.header_1 =
      object.header_1 !== undefined && object.header_1 !== null
        ? Header.fromPartial(object.header_1)
        : undefined;
    message.header_2 =
      object.header_2 !== undefined && object.header_2 !== null
        ? Header.fromPartial(object.header_2)
        : undefined;
    return message;
  },
};

function createBaseHeader(): Header {
  return {
    signed_header: undefined,
    validator_set: undefined,
    trusted_height: undefined,
    trusted_validators: undefined,
  };
}

export const Header = {
  encode(
    message: Header,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.signed_header !== undefined) {
      SignedHeader.encode(
        message.signed_header,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.validator_set !== undefined) {
      ValidatorSet.encode(
        message.validator_set,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.trusted_height !== undefined) {
      Height.encode(message.trusted_height, writer.uint32(26).fork()).ldelim();
    }
    if (message.trusted_validators !== undefined) {
      ValidatorSet.encode(
        message.trusted_validators,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Header {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signed_header = SignedHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.validator_set = ValidatorSet.decode(reader, reader.uint32());
          break;
        case 3:
          message.trusted_height = Height.decode(reader, reader.uint32());
          break;
        case 4:
          message.trusted_validators = ValidatorSet.decode(
            reader,
            reader.uint32(),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Header {
    return {
      signed_header: isSet(object.signed_header)
        ? SignedHeader.fromJSON(object.signed_header)
        : undefined,
      validator_set: isSet(object.validator_set)
        ? ValidatorSet.fromJSON(object.validator_set)
        : undefined,
      trusted_height: isSet(object.trusted_height)
        ? Height.fromJSON(object.trusted_height)
        : undefined,
      trusted_validators: isSet(object.trusted_validators)
        ? ValidatorSet.fromJSON(object.trusted_validators)
        : undefined,
    };
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    message.signed_header !== undefined &&
      (obj.signed_header = message.signed_header
        ? SignedHeader.toJSON(message.signed_header)
        : undefined);
    message.validator_set !== undefined &&
      (obj.validator_set = message.validator_set
        ? ValidatorSet.toJSON(message.validator_set)
        : undefined);
    message.trusted_height !== undefined &&
      (obj.trusted_height = message.trusted_height
        ? Height.toJSON(message.trusted_height)
        : undefined);
    message.trusted_validators !== undefined &&
      (obj.trusted_validators = message.trusted_validators
        ? ValidatorSet.toJSON(message.trusted_validators)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Header>, I>>(object: I): Header {
    const message = createBaseHeader();
    message.signed_header =
      object.signed_header !== undefined && object.signed_header !== null
        ? SignedHeader.fromPartial(object.signed_header)
        : undefined;
    message.validator_set =
      object.validator_set !== undefined && object.validator_set !== null
        ? ValidatorSet.fromPartial(object.validator_set)
        : undefined;
    message.trusted_height =
      object.trusted_height !== undefined && object.trusted_height !== null
        ? Height.fromPartial(object.trusted_height)
        : undefined;
    message.trusted_validators =
      object.trusted_validators !== undefined &&
      object.trusted_validators !== null
        ? ValidatorSet.fromPartial(object.trusted_validators)
        : undefined;
    return message;
  },
};

function createBaseFraction(): Fraction {
  return { numerator: "0", denominator: "0" };
}

export const Fraction = {
  encode(
    message: Fraction,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.numerator !== "0") {
      writer.uint32(8).uint64(message.numerator);
    }
    if (message.denominator !== "0") {
      writer.uint32(16).uint64(message.denominator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fraction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFraction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numerator = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.denominator = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Fraction {
    return {
      numerator: isSet(object.numerator) ? String(object.numerator) : "0",
      denominator: isSet(object.denominator) ? String(object.denominator) : "0",
    };
  },

  toJSON(message: Fraction): unknown {
    const obj: any = {};
    message.numerator !== undefined && (obj.numerator = message.numerator);
    message.denominator !== undefined &&
      (obj.denominator = message.denominator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Fraction>, I>>(object: I): Fraction {
    const message = createBaseFraction();
    message.numerator = object.numerator ?? "0";
    message.denominator = object.denominator ?? "0";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
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
