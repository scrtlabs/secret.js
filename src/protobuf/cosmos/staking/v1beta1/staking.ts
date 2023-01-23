/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Header } from "../../../tendermint/types/types";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.staking.v1beta1";

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
  UNRECOGNIZED = -1,
}

export function bondStatusFromJSON(object: any): BondStatus {
  switch (object) {
    case 0:
    case "BOND_STATUS_UNSPECIFIED":
      return BondStatus.BOND_STATUS_UNSPECIFIED;
    case 1:
    case "BOND_STATUS_UNBONDED":
      return BondStatus.BOND_STATUS_UNBONDED;
    case 2:
    case "BOND_STATUS_UNBONDING":
      return BondStatus.BOND_STATUS_UNBONDING;
    case 3:
    case "BOND_STATUS_BONDED":
      return BondStatus.BOND_STATUS_BONDED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BondStatus.UNRECOGNIZED;
  }
}

export function bondStatusToJSON(object: BondStatus): string {
  switch (object) {
    case BondStatus.BOND_STATUS_UNSPECIFIED:
      return "BOND_STATUS_UNSPECIFIED";
    case BondStatus.BOND_STATUS_UNBONDED:
      return "BOND_STATUS_UNBONDED";
    case BondStatus.BOND_STATUS_UNBONDING:
      return "BOND_STATUS_UNBONDING";
    case BondStatus.BOND_STATUS_BONDED:
      return "BOND_STATUS_BONDED";
    default:
      return "UNKNOWN";
  }
}

/**
 * HistoricalInfo contains header and validator information for a given block.
 * It is stored as part of staking module's state, which persists the `n` most
 * recent HistoricalInfo
 * (`n` is set by the staking module's `historical_entries` parameter).
 */
export interface HistoricalInfo {
  header?: Header;
  valset: Validator[];
}

/**
 * CommissionRates defines the initial commission rates to be used for creating
 * a validator.
 */
export interface CommissionRates {
  /** rate is the commission rate charged to delegators, as a fraction. */
  rate: string;
  /** max_rate defines the maximum commission rate which validator can ever charge, as a fraction. */
  max_rate: string;
  /** max_change_rate defines the maximum daily increase of the validator commission, as a fraction. */
  max_change_rate: string;
}

/** Commission defines commission parameters for a given validator. */
export interface Commission {
  /** commission_rates defines the initial commission rates to be used for creating a validator. */
  commission_rates?: CommissionRates;
  /** update_time is the last time the commission rate was changed. */
  update_time?: Timestamp;
}

/** Description defines a validator description. */
export interface Description {
  /** moniker defines a human-readable name for the validator. */
  moniker: string;
  /** identity defines an optional identity signature (ex. UPort or Keybase). */
  identity: string;
  /** website defines an optional website link. */
  website: string;
  /** security_contact defines an optional email for security contact. */
  security_contact: string;
  /** details define other optional details. */
  details: string;
}

/**
 * Validator defines a validator, together with the total amount of the
 * Validator's bond shares and their exchange rate to coins. Slashing results in
 * a decrease in the exchange rate, allowing correct calculation of future
 * undelegations without iterating over delegators. When coins are delegated to
 * this validator, the validator is credited with a delegation whose number of
 * bond shares is based on the amount of coins delegated divided by the current
 * exchange rate. Voting power can be calculated as total bonded shares
 * multiplied by exchange rate.
 */
export interface Validator {
  /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
  operator_address: string;
  /** consensus_pubkey is the consensus public key of the validator, as a Protobuf Any. */
  consensus_pubkey?: Any;
  /** jailed defined whether the validator has been jailed from bonded status or not. */
  jailed: boolean;
  /** status is the validator status (bonded/unbonding/unbonded). */
  status: BondStatus;
  /** tokens define the delegated tokens (incl. self-delegation). */
  tokens: string;
  /** delegator_shares defines total shares issued to a validator's delegators. */
  delegator_shares: string;
  /** description defines the description terms for the validator. */
  description?: Description;
  /** unbonding_height defines, if unbonding, the height at which this validator has begun unbonding. */
  unbonding_height: string;
  /** unbonding_time defines, if unbonding, the min time for the validator to complete unbonding. */
  unbonding_time?: Timestamp;
  /** commission defines the commission parameters. */
  commission?: Commission;
  /** min_self_delegation is the validator's self declared minimum self delegation. */
  min_self_delegation: string;
}

/** ValAddresses defines a repeated set of validator addresses. */
export interface ValAddresses {
  addresses: string[];
}

/**
 * DVPair is struct that just has a delegator-validator pair with no other data.
 * It is intended to be used as a marshalable pointer. For example, a DVPair can
 * be used to construct the key to getting an UnbondingDelegation from state.
 */
export interface DVPair {
  delegator_address: string;
  validator_address: string;
}

/** DVPairs defines an array of DVPair objects. */
export interface DVPairs {
  pairs: DVPair[];
}

/**
 * DVVTriplet is struct that just has a delegator-validator-validator triplet
 * with no other data. It is intended to be used as a marshalable pointer. For
 * example, a DVVTriplet can be used to construct the key to getting a
 * Redelegation from state.
 */
export interface DVVTriplet {
  delegator_address: string;
  validator_src_address: string;
  validator_dst_address: string;
}

/** DVVTriplets defines an array of DVVTriplet objects. */
export interface DVVTriplets {
  triplets: DVVTriplet[];
}

/**
 * Delegation represents the bond with tokens held by an account. It is
 * owned by one delegator, and is associated with the voting power of one
 * validator.
 */
export interface Delegation {
  /** delegator_address is the bech32-encoded address of the delegator. */
  delegator_address: string;
  /** validator_address is the bech32-encoded address of the validator. */
  validator_address: string;
  /** shares define the delegation shares received. */
  shares: string;
}

/**
 * UnbondingDelegation stores all of a single delegator's unbonding bonds
 * for a single validator in an time-ordered list.
 */
export interface UnbondingDelegation {
  /** delegator_address is the bech32-encoded address of the delegator. */
  delegator_address: string;
  /** validator_address is the bech32-encoded address of the validator. */
  validator_address: string;
  /** entries are the unbonding delegation entries. */
  entries: UnbondingDelegationEntry[];
}

/** UnbondingDelegationEntry defines an unbonding object with relevant metadata. */
export interface UnbondingDelegationEntry {
  /** creation_height is the height which the unbonding took place. */
  creation_height: string;
  /** completion_time is the unix time for unbonding completion. */
  completion_time?: Timestamp;
  /** initial_balance defines the tokens initially scheduled to receive at completion. */
  initial_balance: string;
  /** balance defines the tokens to receive at completion. */
  balance: string;
}

/** RedelegationEntry defines a redelegation object with relevant metadata. */
export interface RedelegationEntry {
  /** creation_height  defines the height which the redelegation took place. */
  creation_height: string;
  /** completion_time defines the unix time for redelegation completion. */
  completion_time?: Timestamp;
  /** initial_balance defines the initial balance when redelegation started. */
  initial_balance: string;
  /** shares_dst is the amount of destination-validator shares created by redelegation. */
  shares_dst: string;
}

/**
 * Redelegation contains the list of a particular delegator's redelegating bonds
 * from a particular source validator to a particular destination validator.
 */
export interface Redelegation {
  /** delegator_address is the bech32-encoded address of the delegator. */
  delegator_address: string;
  /** validator_src_address is the validator redelegation source operator address. */
  validator_src_address: string;
  /** validator_dst_address is the validator redelegation destination operator address. */
  validator_dst_address: string;
  /** entries are the redelegation entries. */
  entries: RedelegationEntry[];
}

/** Params defines the parameters for the staking module. */
export interface Params {
  /** unbonding_time is the time duration of unbonding. */
  unbonding_time?: Duration;
  /** max_validators is the maximum number of validators. */
  max_validators: number;
  /** max_entries is the max entries for either unbonding delegation or redelegation (per pair/trio). */
  max_entries: number;
  /** historical_entries is the number of historical entries to persist. */
  historical_entries: number;
  /** bond_denom defines the bondable coin denomination. */
  bond_denom: string;
}

/**
 * DelegationResponse is equivalent to Delegation except that it contains a
 * balance in addition to shares which is more suitable for client responses.
 */
export interface DelegationResponse {
  delegation?: Delegation;
  balance?: Coin;
}

/**
 * RedelegationEntryResponse is equivalent to a RedelegationEntry except that it
 * contains a balance in addition to shares which is more suitable for client
 * responses.
 */
export interface RedelegationEntryResponse {
  redelegation_entry?: RedelegationEntry;
  balance: string;
}

/**
 * RedelegationResponse is equivalent to a Redelegation except that its entries
 * contain a balance in addition to shares which is more suitable for client
 * responses.
 */
export interface RedelegationResponse {
  redelegation?: Redelegation;
  entries: RedelegationEntryResponse[];
}

/**
 * Pool is used for tracking bonded and not-bonded token supply of the bond
 * denomination.
 */
export interface Pool {
  not_bonded_tokens: string;
  bonded_tokens: string;
}

function createBaseHistoricalInfo(): HistoricalInfo {
  return { header: undefined, valset: [] };
}

export const HistoricalInfo = {
  encode(
    message: HistoricalInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.valset) {
      Validator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HistoricalInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHistoricalInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = Header.decode(reader, reader.uint32());
          break;
        case 2:
          message.valset.push(Validator.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HistoricalInfo {
    return {
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      valset: Array.isArray(object?.valset)
        ? object.valset.map((e: any) => Validator.fromJSON(e))
        : [],
    };
  },

  toJSON(message: HistoricalInfo): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header ? Header.toJSON(message.header) : undefined);
    if (message.valset) {
      obj.valset = message.valset.map((e) =>
        e ? Validator.toJSON(e) : undefined,
      );
    } else {
      obj.valset = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HistoricalInfo>, I>>(
    object: I,
  ): HistoricalInfo {
    const message = createBaseHistoricalInfo();
    message.header =
      object.header !== undefined && object.header !== null
        ? Header.fromPartial(object.header)
        : undefined;
    message.valset = object.valset?.map((e) => Validator.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCommissionRates(): CommissionRates {
  return { rate: "", max_rate: "", max_change_rate: "" };
}

export const CommissionRates = {
  encode(
    message: CommissionRates,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.rate !== "") {
      writer.uint32(10).string(message.rate);
    }
    if (message.max_rate !== "") {
      writer.uint32(18).string(message.max_rate);
    }
    if (message.max_change_rate !== "") {
      writer.uint32(26).string(message.max_change_rate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommissionRates {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommissionRates();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rate = reader.string();
          break;
        case 2:
          message.max_rate = reader.string();
          break;
        case 3:
          message.max_change_rate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommissionRates {
    return {
      rate: isSet(object.rate) ? String(object.rate) : "",
      max_rate: isSet(object.max_rate) ? String(object.max_rate) : "",
      max_change_rate: isSet(object.max_change_rate)
        ? String(object.max_change_rate)
        : "",
    };
  },

  toJSON(message: CommissionRates): unknown {
    const obj: any = {};
    message.rate !== undefined && (obj.rate = message.rate);
    message.max_rate !== undefined && (obj.max_rate = message.max_rate);
    message.max_change_rate !== undefined &&
      (obj.max_change_rate = message.max_change_rate);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommissionRates>, I>>(
    object: I,
  ): CommissionRates {
    const message = createBaseCommissionRates();
    message.rate = object.rate ?? "";
    message.max_rate = object.max_rate ?? "";
    message.max_change_rate = object.max_change_rate ?? "";
    return message;
  },
};

function createBaseCommission(): Commission {
  return { commission_rates: undefined, update_time: undefined };
}

export const Commission = {
  encode(
    message: Commission,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.commission_rates !== undefined) {
      CommissionRates.encode(
        message.commission_rates,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.update_time !== undefined) {
      Timestamp.encode(message.update_time, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Commission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.commission_rates = CommissionRates.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.update_time = Timestamp.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Commission {
    return {
      commission_rates: isSet(object.commission_rates)
        ? CommissionRates.fromJSON(object.commission_rates)
        : undefined,
      update_time: isSet(object.update_time)
        ? fromJsonTimestamp(object.update_time)
        : undefined,
    };
  },

  toJSON(message: Commission): unknown {
    const obj: any = {};
    message.commission_rates !== undefined &&
      (obj.commission_rates = message.commission_rates
        ? CommissionRates.toJSON(message.commission_rates)
        : undefined);
    message.update_time !== undefined &&
      (obj.update_time = fromTimestamp(message.update_time).toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Commission>, I>>(
    object: I,
  ): Commission {
    const message = createBaseCommission();
    message.commission_rates =
      object.commission_rates !== undefined && object.commission_rates !== null
        ? CommissionRates.fromPartial(object.commission_rates)
        : undefined;
    message.update_time =
      object.update_time !== undefined && object.update_time !== null
        ? Timestamp.fromPartial(object.update_time)
        : undefined;
    return message;
  },
};

function createBaseDescription(): Description {
  return {
    moniker: "",
    identity: "",
    website: "",
    security_contact: "",
    details: "",
  };
}

export const Description = {
  encode(
    message: Description,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.moniker !== "") {
      writer.uint32(10).string(message.moniker);
    }
    if (message.identity !== "") {
      writer.uint32(18).string(message.identity);
    }
    if (message.website !== "") {
      writer.uint32(26).string(message.website);
    }
    if (message.security_contact !== "") {
      writer.uint32(34).string(message.security_contact);
    }
    if (message.details !== "") {
      writer.uint32(42).string(message.details);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Description {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moniker = reader.string();
          break;
        case 2:
          message.identity = reader.string();
          break;
        case 3:
          message.website = reader.string();
          break;
        case 4:
          message.security_contact = reader.string();
          break;
        case 5:
          message.details = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Description {
    return {
      moniker: isSet(object.moniker) ? String(object.moniker) : "",
      identity: isSet(object.identity) ? String(object.identity) : "",
      website: isSet(object.website) ? String(object.website) : "",
      security_contact: isSet(object.security_contact)
        ? String(object.security_contact)
        : "",
      details: isSet(object.details) ? String(object.details) : "",
    };
  },

  toJSON(message: Description): unknown {
    const obj: any = {};
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.identity !== undefined && (obj.identity = message.identity);
    message.website !== undefined && (obj.website = message.website);
    message.security_contact !== undefined &&
      (obj.security_contact = message.security_contact);
    message.details !== undefined && (obj.details = message.details);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Description>, I>>(
    object: I,
  ): Description {
    const message = createBaseDescription();
    message.moniker = object.moniker ?? "";
    message.identity = object.identity ?? "";
    message.website = object.website ?? "";
    message.security_contact = object.security_contact ?? "";
    message.details = object.details ?? "";
    return message;
  },
};

function createBaseValidator(): Validator {
  return {
    operator_address: "",
    consensus_pubkey: undefined,
    jailed: false,
    status: 0,
    tokens: "",
    delegator_shares: "",
    description: undefined,
    unbonding_height: "0",
    unbonding_time: undefined,
    commission: undefined,
    min_self_delegation: "",
  };
}

export const Validator = {
  encode(
    message: Validator,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.operator_address !== "") {
      writer.uint32(10).string(message.operator_address);
    }
    if (message.consensus_pubkey !== undefined) {
      Any.encode(message.consensus_pubkey, writer.uint32(18).fork()).ldelim();
    }
    if (message.jailed === true) {
      writer.uint32(24).bool(message.jailed);
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    if (message.tokens !== "") {
      writer.uint32(42).string(message.tokens);
    }
    if (message.delegator_shares !== "") {
      writer.uint32(50).string(message.delegator_shares);
    }
    if (message.description !== undefined) {
      Description.encode(
        message.description,
        writer.uint32(58).fork(),
      ).ldelim();
    }
    if (message.unbonding_height !== "0") {
      writer.uint32(64).int64(message.unbonding_height);
    }
    if (message.unbonding_time !== undefined) {
      Timestamp.encode(
        message.unbonding_time,
        writer.uint32(74).fork(),
      ).ldelim();
    }
    if (message.commission !== undefined) {
      Commission.encode(message.commission, writer.uint32(82).fork()).ldelim();
    }
    if (message.min_self_delegation !== "") {
      writer.uint32(90).string(message.min_self_delegation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operator_address = reader.string();
          break;
        case 2:
          message.consensus_pubkey = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.jailed = reader.bool();
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        case 5:
          message.tokens = reader.string();
          break;
        case 6:
          message.delegator_shares = reader.string();
          break;
        case 7:
          message.description = Description.decode(reader, reader.uint32());
          break;
        case 8:
          message.unbonding_height = longToString(reader.int64() as Long);
          break;
        case 9:
          message.unbonding_time = Timestamp.decode(reader, reader.uint32());
          break;
        case 10:
          message.commission = Commission.decode(reader, reader.uint32());
          break;
        case 11:
          message.min_self_delegation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Validator {
    return {
      operator_address: isSet(object.operator_address)
        ? String(object.operator_address)
        : "",
      consensus_pubkey: isSet(object.consensus_pubkey)
        ? Any.fromJSON(object.consensus_pubkey)
        : undefined,
      jailed: isSet(object.jailed) ? Boolean(object.jailed) : false,
      status: isSet(object.status) ? bondStatusFromJSON(object.status) : 0,
      tokens: isSet(object.tokens) ? String(object.tokens) : "",
      delegator_shares: isSet(object.delegator_shares)
        ? String(object.delegator_shares)
        : "",
      description: isSet(object.description)
        ? Description.fromJSON(object.description)
        : undefined,
      unbonding_height: isSet(object.unbonding_height)
        ? String(object.unbonding_height)
        : "0",
      unbonding_time: isSet(object.unbonding_time)
        ? fromJsonTimestamp(object.unbonding_time)
        : undefined,
      commission: isSet(object.commission)
        ? Commission.fromJSON(object.commission)
        : undefined,
      min_self_delegation: isSet(object.min_self_delegation)
        ? String(object.min_self_delegation)
        : "",
    };
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    message.operator_address !== undefined &&
      (obj.operator_address = message.operator_address);
    message.consensus_pubkey !== undefined &&
      (obj.consensus_pubkey = message.consensus_pubkey
        ? Any.toJSON(message.consensus_pubkey)
        : undefined);
    message.jailed !== undefined && (obj.jailed = message.jailed);
    message.status !== undefined &&
      (obj.status = bondStatusToJSON(message.status));
    message.tokens !== undefined && (obj.tokens = message.tokens);
    message.delegator_shares !== undefined &&
      (obj.delegator_shares = message.delegator_shares);
    message.description !== undefined &&
      (obj.description = message.description
        ? Description.toJSON(message.description)
        : undefined);
    message.unbonding_height !== undefined &&
      (obj.unbonding_height = message.unbonding_height);
    message.unbonding_time !== undefined &&
      (obj.unbonding_time = fromTimestamp(
        message.unbonding_time,
      ).toISOString());
    message.commission !== undefined &&
      (obj.commission = message.commission
        ? Commission.toJSON(message.commission)
        : undefined);
    message.min_self_delegation !== undefined &&
      (obj.min_self_delegation = message.min_self_delegation);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Validator>, I>>(
    object: I,
  ): Validator {
    const message = createBaseValidator();
    message.operator_address = object.operator_address ?? "";
    message.consensus_pubkey =
      object.consensus_pubkey !== undefined && object.consensus_pubkey !== null
        ? Any.fromPartial(object.consensus_pubkey)
        : undefined;
    message.jailed = object.jailed ?? false;
    message.status = object.status ?? 0;
    message.tokens = object.tokens ?? "";
    message.delegator_shares = object.delegator_shares ?? "";
    message.description =
      object.description !== undefined && object.description !== null
        ? Description.fromPartial(object.description)
        : undefined;
    message.unbonding_height = object.unbonding_height ?? "0";
    message.unbonding_time =
      object.unbonding_time !== undefined && object.unbonding_time !== null
        ? Timestamp.fromPartial(object.unbonding_time)
        : undefined;
    message.commission =
      object.commission !== undefined && object.commission !== null
        ? Commission.fromPartial(object.commission)
        : undefined;
    message.min_self_delegation = object.min_self_delegation ?? "";
    return message;
  },
};

function createBaseValAddresses(): ValAddresses {
  return { addresses: [] };
}

export const ValAddresses = {
  encode(
    message: ValAddresses,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.addresses) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValAddresses {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValAddresses();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addresses.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValAddresses {
    return {
      addresses: Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ValAddresses): unknown {
    const obj: any = {};
    if (message.addresses) {
      obj.addresses = message.addresses.map((e) => e);
    } else {
      obj.addresses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValAddresses>, I>>(
    object: I,
  ): ValAddresses {
    const message = createBaseValAddresses();
    message.addresses = object.addresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseDVPair(): DVPair {
  return { delegator_address: "", validator_address: "" };
}

export const DVPair = {
  encode(
    message: DVPair,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.validator_address !== "") {
      writer.uint32(18).string(message.validator_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DVPair {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDVPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.validator_address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DVPair {
    return {
      delegator_address: isSet(object.delegator_address)
        ? String(object.delegator_address)
        : "",
      validator_address: isSet(object.validator_address)
        ? String(object.validator_address)
        : "",
    };
  },

  toJSON(message: DVPair): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DVPair>, I>>(object: I): DVPair {
    const message = createBaseDVPair();
    message.delegator_address = object.delegator_address ?? "";
    message.validator_address = object.validator_address ?? "";
    return message;
  },
};

function createBaseDVPairs(): DVPairs {
  return { pairs: [] };
}

export const DVPairs = {
  encode(
    message: DVPairs,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.pairs) {
      DVPair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DVPairs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDVPairs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pairs.push(DVPair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DVPairs {
    return {
      pairs: Array.isArray(object?.pairs)
        ? object.pairs.map((e: any) => DVPair.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DVPairs): unknown {
    const obj: any = {};
    if (message.pairs) {
      obj.pairs = message.pairs.map((e) => (e ? DVPair.toJSON(e) : undefined));
    } else {
      obj.pairs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DVPairs>, I>>(object: I): DVPairs {
    const message = createBaseDVPairs();
    message.pairs = object.pairs?.map((e) => DVPair.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDVVTriplet(): DVVTriplet {
  return {
    delegator_address: "",
    validator_src_address: "",
    validator_dst_address: "",
  };
}

export const DVVTriplet = {
  encode(
    message: DVVTriplet,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.validator_src_address !== "") {
      writer.uint32(18).string(message.validator_src_address);
    }
    if (message.validator_dst_address !== "") {
      writer.uint32(26).string(message.validator_dst_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DVVTriplet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDVVTriplet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.validator_src_address = reader.string();
          break;
        case 3:
          message.validator_dst_address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DVVTriplet {
    return {
      delegator_address: isSet(object.delegator_address)
        ? String(object.delegator_address)
        : "",
      validator_src_address: isSet(object.validator_src_address)
        ? String(object.validator_src_address)
        : "",
      validator_dst_address: isSet(object.validator_dst_address)
        ? String(object.validator_dst_address)
        : "",
    };
  },

  toJSON(message: DVVTriplet): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_src_address !== undefined &&
      (obj.validator_src_address = message.validator_src_address);
    message.validator_dst_address !== undefined &&
      (obj.validator_dst_address = message.validator_dst_address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DVVTriplet>, I>>(
    object: I,
  ): DVVTriplet {
    const message = createBaseDVVTriplet();
    message.delegator_address = object.delegator_address ?? "";
    message.validator_src_address = object.validator_src_address ?? "";
    message.validator_dst_address = object.validator_dst_address ?? "";
    return message;
  },
};

function createBaseDVVTriplets(): DVVTriplets {
  return { triplets: [] };
}

export const DVVTriplets = {
  encode(
    message: DVVTriplets,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.triplets) {
      DVVTriplet.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DVVTriplets {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDVVTriplets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.triplets.push(DVVTriplet.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DVVTriplets {
    return {
      triplets: Array.isArray(object?.triplets)
        ? object.triplets.map((e: any) => DVVTriplet.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DVVTriplets): unknown {
    const obj: any = {};
    if (message.triplets) {
      obj.triplets = message.triplets.map((e) =>
        e ? DVVTriplet.toJSON(e) : undefined,
      );
    } else {
      obj.triplets = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DVVTriplets>, I>>(
    object: I,
  ): DVVTriplets {
    const message = createBaseDVVTriplets();
    message.triplets =
      object.triplets?.map((e) => DVVTriplet.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDelegation(): Delegation {
  return { delegator_address: "", validator_address: "", shares: "" };
}

export const Delegation = {
  encode(
    message: Delegation,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.validator_address !== "") {
      writer.uint32(18).string(message.validator_address);
    }
    if (message.shares !== "") {
      writer.uint32(26).string(message.shares);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Delegation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.validator_address = reader.string();
          break;
        case 3:
          message.shares = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Delegation {
    return {
      delegator_address: isSet(object.delegator_address)
        ? String(object.delegator_address)
        : "",
      validator_address: isSet(object.validator_address)
        ? String(object.validator_address)
        : "",
      shares: isSet(object.shares) ? String(object.shares) : "",
    };
  },

  toJSON(message: Delegation): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    message.shares !== undefined && (obj.shares = message.shares);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Delegation>, I>>(
    object: I,
  ): Delegation {
    const message = createBaseDelegation();
    message.delegator_address = object.delegator_address ?? "";
    message.validator_address = object.validator_address ?? "";
    message.shares = object.shares ?? "";
    return message;
  },
};

function createBaseUnbondingDelegation(): UnbondingDelegation {
  return { delegator_address: "", validator_address: "", entries: [] };
}

export const UnbondingDelegation = {
  encode(
    message: UnbondingDelegation,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.validator_address !== "") {
      writer.uint32(18).string(message.validator_address);
    }
    for (const v of message.entries) {
      UnbondingDelegationEntry.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnbondingDelegation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbondingDelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.validator_address = reader.string();
          break;
        case 3:
          message.entries.push(
            UnbondingDelegationEntry.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnbondingDelegation {
    return {
      delegator_address: isSet(object.delegator_address)
        ? String(object.delegator_address)
        : "",
      validator_address: isSet(object.validator_address)
        ? String(object.validator_address)
        : "",
      entries: Array.isArray(object?.entries)
        ? object.entries.map((e: any) => UnbondingDelegationEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UnbondingDelegation): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    if (message.entries) {
      obj.entries = message.entries.map((e) =>
        e ? UnbondingDelegationEntry.toJSON(e) : undefined,
      );
    } else {
      obj.entries = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnbondingDelegation>, I>>(
    object: I,
  ): UnbondingDelegation {
    const message = createBaseUnbondingDelegation();
    message.delegator_address = object.delegator_address ?? "";
    message.validator_address = object.validator_address ?? "";
    message.entries =
      object.entries?.map((e) => UnbondingDelegationEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUnbondingDelegationEntry(): UnbondingDelegationEntry {
  return {
    creation_height: "0",
    completion_time: undefined,
    initial_balance: "",
    balance: "",
  };
}

export const UnbondingDelegationEntry = {
  encode(
    message: UnbondingDelegationEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.creation_height !== "0") {
      writer.uint32(8).int64(message.creation_height);
    }
    if (message.completion_time !== undefined) {
      Timestamp.encode(
        message.completion_time,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.initial_balance !== "") {
      writer.uint32(26).string(message.initial_balance);
    }
    if (message.balance !== "") {
      writer.uint32(34).string(message.balance);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): UnbondingDelegationEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbondingDelegationEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creation_height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.completion_time = Timestamp.decode(reader, reader.uint32());
          break;
        case 3:
          message.initial_balance = reader.string();
          break;
        case 4:
          message.balance = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnbondingDelegationEntry {
    return {
      creation_height: isSet(object.creation_height)
        ? String(object.creation_height)
        : "0",
      completion_time: isSet(object.completion_time)
        ? fromJsonTimestamp(object.completion_time)
        : undefined,
      initial_balance: isSet(object.initial_balance)
        ? String(object.initial_balance)
        : "",
      balance: isSet(object.balance) ? String(object.balance) : "",
    };
  },

  toJSON(message: UnbondingDelegationEntry): unknown {
    const obj: any = {};
    message.creation_height !== undefined &&
      (obj.creation_height = message.creation_height);
    message.completion_time !== undefined &&
      (obj.completion_time = fromTimestamp(
        message.completion_time,
      ).toISOString());
    message.initial_balance !== undefined &&
      (obj.initial_balance = message.initial_balance);
    message.balance !== undefined && (obj.balance = message.balance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnbondingDelegationEntry>, I>>(
    object: I,
  ): UnbondingDelegationEntry {
    const message = createBaseUnbondingDelegationEntry();
    message.creation_height = object.creation_height ?? "0";
    message.completion_time =
      object.completion_time !== undefined && object.completion_time !== null
        ? Timestamp.fromPartial(object.completion_time)
        : undefined;
    message.initial_balance = object.initial_balance ?? "";
    message.balance = object.balance ?? "";
    return message;
  },
};

function createBaseRedelegationEntry(): RedelegationEntry {
  return {
    creation_height: "0",
    completion_time: undefined,
    initial_balance: "",
    shares_dst: "",
  };
}

export const RedelegationEntry = {
  encode(
    message: RedelegationEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.creation_height !== "0") {
      writer.uint32(8).int64(message.creation_height);
    }
    if (message.completion_time !== undefined) {
      Timestamp.encode(
        message.completion_time,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.initial_balance !== "") {
      writer.uint32(26).string(message.initial_balance);
    }
    if (message.shares_dst !== "") {
      writer.uint32(34).string(message.shares_dst);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RedelegationEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegationEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creation_height = longToString(reader.int64() as Long);
          break;
        case 2:
          message.completion_time = Timestamp.decode(reader, reader.uint32());
          break;
        case 3:
          message.initial_balance = reader.string();
          break;
        case 4:
          message.shares_dst = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RedelegationEntry {
    return {
      creation_height: isSet(object.creation_height)
        ? String(object.creation_height)
        : "0",
      completion_time: isSet(object.completion_time)
        ? fromJsonTimestamp(object.completion_time)
        : undefined,
      initial_balance: isSet(object.initial_balance)
        ? String(object.initial_balance)
        : "",
      shares_dst: isSet(object.shares_dst) ? String(object.shares_dst) : "",
    };
  },

  toJSON(message: RedelegationEntry): unknown {
    const obj: any = {};
    message.creation_height !== undefined &&
      (obj.creation_height = message.creation_height);
    message.completion_time !== undefined &&
      (obj.completion_time = fromTimestamp(
        message.completion_time,
      ).toISOString());
    message.initial_balance !== undefined &&
      (obj.initial_balance = message.initial_balance);
    message.shares_dst !== undefined && (obj.shares_dst = message.shares_dst);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RedelegationEntry>, I>>(
    object: I,
  ): RedelegationEntry {
    const message = createBaseRedelegationEntry();
    message.creation_height = object.creation_height ?? "0";
    message.completion_time =
      object.completion_time !== undefined && object.completion_time !== null
        ? Timestamp.fromPartial(object.completion_time)
        : undefined;
    message.initial_balance = object.initial_balance ?? "";
    message.shares_dst = object.shares_dst ?? "";
    return message;
  },
};

function createBaseRedelegation(): Redelegation {
  return {
    delegator_address: "",
    validator_src_address: "",
    validator_dst_address: "",
    entries: [],
  };
}

export const Redelegation = {
  encode(
    message: Redelegation,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.validator_src_address !== "") {
      writer.uint32(18).string(message.validator_src_address);
    }
    if (message.validator_dst_address !== "") {
      writer.uint32(26).string(message.validator_dst_address);
    }
    for (const v of message.entries) {
      RedelegationEntry.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Redelegation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.validator_src_address = reader.string();
          break;
        case 3:
          message.validator_dst_address = reader.string();
          break;
        case 4:
          message.entries.push(
            RedelegationEntry.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Redelegation {
    return {
      delegator_address: isSet(object.delegator_address)
        ? String(object.delegator_address)
        : "",
      validator_src_address: isSet(object.validator_src_address)
        ? String(object.validator_src_address)
        : "",
      validator_dst_address: isSet(object.validator_dst_address)
        ? String(object.validator_dst_address)
        : "",
      entries: Array.isArray(object?.entries)
        ? object.entries.map((e: any) => RedelegationEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Redelegation): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_src_address !== undefined &&
      (obj.validator_src_address = message.validator_src_address);
    message.validator_dst_address !== undefined &&
      (obj.validator_dst_address = message.validator_dst_address);
    if (message.entries) {
      obj.entries = message.entries.map((e) =>
        e ? RedelegationEntry.toJSON(e) : undefined,
      );
    } else {
      obj.entries = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Redelegation>, I>>(
    object: I,
  ): Redelegation {
    const message = createBaseRedelegation();
    message.delegator_address = object.delegator_address ?? "";
    message.validator_src_address = object.validator_src_address ?? "";
    message.validator_dst_address = object.validator_dst_address ?? "";
    message.entries =
      object.entries?.map((e) => RedelegationEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseParams(): Params {
  return {
    unbonding_time: undefined,
    max_validators: 0,
    max_entries: 0,
    historical_entries: 0,
    bond_denom: "",
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.unbonding_time !== undefined) {
      Duration.encode(
        message.unbonding_time,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.max_validators !== 0) {
      writer.uint32(16).uint32(message.max_validators);
    }
    if (message.max_entries !== 0) {
      writer.uint32(24).uint32(message.max_entries);
    }
    if (message.historical_entries !== 0) {
      writer.uint32(32).uint32(message.historical_entries);
    }
    if (message.bond_denom !== "") {
      writer.uint32(42).string(message.bond_denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbonding_time = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.max_validators = reader.uint32();
          break;
        case 3:
          message.max_entries = reader.uint32();
          break;
        case 4:
          message.historical_entries = reader.uint32();
          break;
        case 5:
          message.bond_denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      unbonding_time: isSet(object.unbonding_time)
        ? Duration.fromJSON(object.unbonding_time)
        : undefined,
      max_validators: isSet(object.max_validators)
        ? Number(object.max_validators)
        : 0,
      max_entries: isSet(object.max_entries) ? Number(object.max_entries) : 0,
      historical_entries: isSet(object.historical_entries)
        ? Number(object.historical_entries)
        : 0,
      bond_denom: isSet(object.bond_denom) ? String(object.bond_denom) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.unbonding_time !== undefined &&
      (obj.unbonding_time = message.unbonding_time
        ? Duration.toJSON(message.unbonding_time)
        : undefined);
    message.max_validators !== undefined &&
      (obj.max_validators = Math.round(message.max_validators));
    message.max_entries !== undefined &&
      (obj.max_entries = Math.round(message.max_entries));
    message.historical_entries !== undefined &&
      (obj.historical_entries = Math.round(message.historical_entries));
    message.bond_denom !== undefined && (obj.bond_denom = message.bond_denom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.unbonding_time =
      object.unbonding_time !== undefined && object.unbonding_time !== null
        ? Duration.fromPartial(object.unbonding_time)
        : undefined;
    message.max_validators = object.max_validators ?? 0;
    message.max_entries = object.max_entries ?? 0;
    message.historical_entries = object.historical_entries ?? 0;
    message.bond_denom = object.bond_denom ?? "";
    return message;
  },
};

function createBaseDelegationResponse(): DelegationResponse {
  return { delegation: undefined, balance: undefined };
}

export const DelegationResponse = {
  encode(
    message: DelegationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.delegation !== undefined) {
      Delegation.encode(message.delegation, writer.uint32(10).fork()).ldelim();
    }
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegation = Delegation.decode(reader, reader.uint32());
          break;
        case 2:
          message.balance = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegationResponse {
    return {
      delegation: isSet(object.delegation)
        ? Delegation.fromJSON(object.delegation)
        : undefined,
      balance: isSet(object.balance)
        ? Coin.fromJSON(object.balance)
        : undefined,
    };
  },

  toJSON(message: DelegationResponse): unknown {
    const obj: any = {};
    message.delegation !== undefined &&
      (obj.delegation = message.delegation
        ? Delegation.toJSON(message.delegation)
        : undefined);
    message.balance !== undefined &&
      (obj.balance = message.balance
        ? Coin.toJSON(message.balance)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegationResponse>, I>>(
    object: I,
  ): DelegationResponse {
    const message = createBaseDelegationResponse();
    message.delegation =
      object.delegation !== undefined && object.delegation !== null
        ? Delegation.fromPartial(object.delegation)
        : undefined;
    message.balance =
      object.balance !== undefined && object.balance !== null
        ? Coin.fromPartial(object.balance)
        : undefined;
    return message;
  },
};

function createBaseRedelegationEntryResponse(): RedelegationEntryResponse {
  return { redelegation_entry: undefined, balance: "" };
}

export const RedelegationEntryResponse = {
  encode(
    message: RedelegationEntryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.redelegation_entry !== undefined) {
      RedelegationEntry.encode(
        message.redelegation_entry,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.balance !== "") {
      writer.uint32(34).string(message.balance);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RedelegationEntryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegationEntryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redelegation_entry = RedelegationEntry.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 4:
          message.balance = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RedelegationEntryResponse {
    return {
      redelegation_entry: isSet(object.redelegation_entry)
        ? RedelegationEntry.fromJSON(object.redelegation_entry)
        : undefined,
      balance: isSet(object.balance) ? String(object.balance) : "",
    };
  },

  toJSON(message: RedelegationEntryResponse): unknown {
    const obj: any = {};
    message.redelegation_entry !== undefined &&
      (obj.redelegation_entry = message.redelegation_entry
        ? RedelegationEntry.toJSON(message.redelegation_entry)
        : undefined);
    message.balance !== undefined && (obj.balance = message.balance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RedelegationEntryResponse>, I>>(
    object: I,
  ): RedelegationEntryResponse {
    const message = createBaseRedelegationEntryResponse();
    message.redelegation_entry =
      object.redelegation_entry !== undefined &&
      object.redelegation_entry !== null
        ? RedelegationEntry.fromPartial(object.redelegation_entry)
        : undefined;
    message.balance = object.balance ?? "";
    return message;
  },
};

function createBaseRedelegationResponse(): RedelegationResponse {
  return { redelegation: undefined, entries: [] };
}

export const RedelegationResponse = {
  encode(
    message: RedelegationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.redelegation !== undefined) {
      Redelegation.encode(
        message.redelegation,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    for (const v of message.entries) {
      RedelegationEntryResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RedelegationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redelegation = Redelegation.decode(reader, reader.uint32());
          break;
        case 2:
          message.entries.push(
            RedelegationEntryResponse.decode(reader, reader.uint32()),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RedelegationResponse {
    return {
      redelegation: isSet(object.redelegation)
        ? Redelegation.fromJSON(object.redelegation)
        : undefined,
      entries: Array.isArray(object?.entries)
        ? object.entries.map((e: any) => RedelegationEntryResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RedelegationResponse): unknown {
    const obj: any = {};
    message.redelegation !== undefined &&
      (obj.redelegation = message.redelegation
        ? Redelegation.toJSON(message.redelegation)
        : undefined);
    if (message.entries) {
      obj.entries = message.entries.map((e) =>
        e ? RedelegationEntryResponse.toJSON(e) : undefined,
      );
    } else {
      obj.entries = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RedelegationResponse>, I>>(
    object: I,
  ): RedelegationResponse {
    const message = createBaseRedelegationResponse();
    message.redelegation =
      object.redelegation !== undefined && object.redelegation !== null
        ? Redelegation.fromPartial(object.redelegation)
        : undefined;
    message.entries =
      object.entries?.map((e) => RedelegationEntryResponse.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBasePool(): Pool {
  return { not_bonded_tokens: "", bonded_tokens: "" };
}

export const Pool = {
  encode(message: Pool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.not_bonded_tokens !== "") {
      writer.uint32(10).string(message.not_bonded_tokens);
    }
    if (message.bonded_tokens !== "") {
      writer.uint32(18).string(message.bonded_tokens);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.not_bonded_tokens = reader.string();
          break;
        case 2:
          message.bonded_tokens = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Pool {
    return {
      not_bonded_tokens: isSet(object.not_bonded_tokens)
        ? String(object.not_bonded_tokens)
        : "",
      bonded_tokens: isSet(object.bonded_tokens)
        ? String(object.bonded_tokens)
        : "",
    };
  },

  toJSON(message: Pool): unknown {
    const obj: any = {};
    message.not_bonded_tokens !== undefined &&
      (obj.not_bonded_tokens = message.not_bonded_tokens);
    message.bonded_tokens !== undefined &&
      (obj.bonded_tokens = message.bonded_tokens);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Pool>, I>>(object: I): Pool {
    const message = createBasePool();
    message.not_bonded_tokens = object.not_bonded_tokens ?? "";
    message.bonded_tokens = object.bonded_tokens ?? "";
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
