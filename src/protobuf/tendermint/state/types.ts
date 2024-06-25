/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { ConsensusParams } from "../types/params";
import { ValidatorSet } from "../types/validator";
import {
  ResponseFinalizeBlock,
  ExecTxResult,
  Event,
  ValidatorUpdate,
} from "../abci/types";
import { Consensus } from "../version/types";
import { BlockID } from "../types/types";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "tendermint.state";

/**
 * LegacyABCIResponses retains the responses
 * of the legacy ABCI calls during block processing.
 * Note ReponseDeliverTx is renamed to ExecTxResult but they are semantically the same
 * Kept for backwards compatibility for versions prior to v0.38
 */
export interface LegacyABCIResponses {
  deliver_txs: ExecTxResult[];
  end_block?: ResponseEndBlock;
  begin_block?: ResponseBeginBlock;
}

/** ResponseBeginBlock is kept for backwards compatibility for versions prior to v0.38 */
export interface ResponseBeginBlock {
  events: Event[];
}

/** ResponseEndBlock is kept for backwards compatibility for versions prior to v0.38 */
export interface ResponseEndBlock {
  validator_updates: ValidatorUpdate[];
  consensus_param_updates?: ConsensusParams;
  events: Event[];
}

/** ValidatorsInfo represents the latest validator set, or the last height it changed */
export interface ValidatorsInfo {
  validator_set?: ValidatorSet;
  last_height_changed: string;
}

/** ConsensusParamsInfo represents the latest consensus params, or the last height it changed */
export interface ConsensusParamsInfo {
  consensus_params?: ConsensusParams;
  last_height_changed: string;
}

export interface ABCIResponsesInfo {
  legacy_abci_responses?: LegacyABCIResponses;
  height: string;
  response_finalize_block?: ResponseFinalizeBlock;
}

export interface Version {
  consensus?: Consensus;
  software: string;
}

export interface State {
  version?: Version;
  /** immutable */
  chain_id: string;
  initial_height: string;
  /** LastBlockHeight=0 at genesis (ie. block(H=0) does not exist) */
  last_block_height: string;
  last_block_id?: BlockID;
  last_block_time?: Timestamp;
  /**
   * LastValidators is used to validate block.LastCommit.
   * Validators are persisted to the database separately every time they change,
   * so we can query for historical validator sets.
   * Note that if s.LastBlockHeight causes a valset change,
   * we set s.LastHeightValidatorsChanged = s.LastBlockHeight + 1 + 1
   * Extra +1 due to nextValSet delay.
   */
  next_validators?: ValidatorSet;
  validators?: ValidatorSet;
  last_validators?: ValidatorSet;
  last_height_validators_changed: string;
  /**
   * Consensus parameters used for validating blocks.
   * Changes returned by EndBlock and updated after Commit.
   */
  consensus_params?: ConsensusParams;
  last_height_consensus_params_changed: string;
  /** Merkle root of the results from executing prev block */
  last_results_hash: Uint8Array;
  /** the latest AppHash we've received from calling abci.Commit() */
  app_hash: Uint8Array;
}

function createBaseLegacyABCIResponses(): LegacyABCIResponses {
  return { deliver_txs: [], end_block: undefined, begin_block: undefined };
}

export const LegacyABCIResponses = {
  encode(
    message: LegacyABCIResponses,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.deliver_txs) {
      ExecTxResult.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.end_block !== undefined) {
      ResponseEndBlock.encode(
        message.end_block,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.begin_block !== undefined) {
      ResponseBeginBlock.encode(
        message.begin_block,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyABCIResponses {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyABCIResponses();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deliver_txs.push(
            ExecTxResult.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.end_block = ResponseEndBlock.decode(reader, reader.uint32());
          break;
        case 3:
          message.begin_block = ResponseBeginBlock.decode(
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

  fromJSON(object: any): LegacyABCIResponses {
    return {
      deliver_txs: Array.isArray(object?.deliver_txs)
        ? object.deliver_txs.map((e: any) => ExecTxResult.fromJSON(e))
        : [],
      end_block: isSet(object.end_block)
        ? ResponseEndBlock.fromJSON(object.end_block)
        : undefined,
      begin_block: isSet(object.begin_block)
        ? ResponseBeginBlock.fromJSON(object.begin_block)
        : undefined,
    };
  },

  toJSON(message: LegacyABCIResponses): unknown {
    const obj: any = {};
    if (message.deliver_txs) {
      obj.deliver_txs = message.deliver_txs.map((e) =>
        e ? ExecTxResult.toJSON(e) : undefined,
      );
    } else {
      obj.deliver_txs = [];
    }
    message.end_block !== undefined &&
      (obj.end_block = message.end_block
        ? ResponseEndBlock.toJSON(message.end_block)
        : undefined);
    message.begin_block !== undefined &&
      (obj.begin_block = message.begin_block
        ? ResponseBeginBlock.toJSON(message.begin_block)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<LegacyABCIResponses>): LegacyABCIResponses {
    const message = createBaseLegacyABCIResponses();
    message.deliver_txs =
      object.deliver_txs?.map((e) => ExecTxResult.fromPartial(e)) || [];
    message.end_block =
      object.end_block !== undefined && object.end_block !== null
        ? ResponseEndBlock.fromPartial(object.end_block)
        : undefined;
    message.begin_block =
      object.begin_block !== undefined && object.begin_block !== null
        ? ResponseBeginBlock.fromPartial(object.begin_block)
        : undefined;
    return message;
  },
};

function createBaseResponseBeginBlock(): ResponseBeginBlock {
  return { events: [] };
}

export const ResponseBeginBlock = {
  encode(
    message: ResponseBeginBlock,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseBeginBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseBeginBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseBeginBlock {
    return {
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => Event.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ResponseBeginBlock): unknown {
    const obj: any = {};
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ResponseBeginBlock>): ResponseBeginBlock {
    const message = createBaseResponseBeginBlock();
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
};

function createBaseResponseEndBlock(): ResponseEndBlock {
  return {
    validator_updates: [],
    consensus_param_updates: undefined,
    events: [],
  };
}

export const ResponseEndBlock = {
  encode(
    message: ResponseEndBlock,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.validator_updates) {
      ValidatorUpdate.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.consensus_param_updates !== undefined) {
      ConsensusParams.encode(
        message.consensus_param_updates,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseEndBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseEndBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator_updates.push(
            ValidatorUpdate.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.consensus_param_updates = ConsensusParams.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 3:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseEndBlock {
    return {
      validator_updates: Array.isArray(object?.validator_updates)
        ? object.validator_updates.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      consensus_param_updates: isSet(object.consensus_param_updates)
        ? ConsensusParams.fromJSON(object.consensus_param_updates)
        : undefined,
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => Event.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ResponseEndBlock): unknown {
    const obj: any = {};
    if (message.validator_updates) {
      obj.validator_updates = message.validator_updates.map((e) =>
        e ? ValidatorUpdate.toJSON(e) : undefined,
      );
    } else {
      obj.validator_updates = [];
    }
    message.consensus_param_updates !== undefined &&
      (obj.consensus_param_updates = message.consensus_param_updates
        ? ConsensusParams.toJSON(message.consensus_param_updates)
        : undefined);
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ResponseEndBlock>): ResponseEndBlock {
    const message = createBaseResponseEndBlock();
    message.validator_updates =
      object.validator_updates?.map((e) => ValidatorUpdate.fromPartial(e)) ||
      [];
    message.consensus_param_updates =
      object.consensus_param_updates !== undefined &&
      object.consensus_param_updates !== null
        ? ConsensusParams.fromPartial(object.consensus_param_updates)
        : undefined;
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
};

function createBaseValidatorsInfo(): ValidatorsInfo {
  return { validator_set: undefined, last_height_changed: "0" };
}

export const ValidatorsInfo = {
  encode(
    message: ValidatorsInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.validator_set !== undefined) {
      ValidatorSet.encode(
        message.validator_set,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.last_height_changed !== "0") {
      writer.uint32(16).int64(message.last_height_changed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorsInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorsInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator_set = ValidatorSet.decode(reader, reader.uint32());
          break;
        case 2:
          message.last_height_changed = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorsInfo {
    return {
      validator_set: isSet(object.validator_set)
        ? ValidatorSet.fromJSON(object.validator_set)
        : undefined,
      last_height_changed: isSet(object.last_height_changed)
        ? String(object.last_height_changed)
        : "0",
    };
  },

  toJSON(message: ValidatorsInfo): unknown {
    const obj: any = {};
    message.validator_set !== undefined &&
      (obj.validator_set = message.validator_set
        ? ValidatorSet.toJSON(message.validator_set)
        : undefined);
    message.last_height_changed !== undefined &&
      (obj.last_height_changed = message.last_height_changed);
    return obj;
  },

  fromPartial(object: DeepPartial<ValidatorsInfo>): ValidatorsInfo {
    const message = createBaseValidatorsInfo();
    message.validator_set =
      object.validator_set !== undefined && object.validator_set !== null
        ? ValidatorSet.fromPartial(object.validator_set)
        : undefined;
    message.last_height_changed = object.last_height_changed ?? "0";
    return message;
  },
};

function createBaseConsensusParamsInfo(): ConsensusParamsInfo {
  return { consensus_params: undefined, last_height_changed: "0" };
}

export const ConsensusParamsInfo = {
  encode(
    message: ConsensusParamsInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consensus_params !== undefined) {
      ConsensusParams.encode(
        message.consensus_params,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.last_height_changed !== "0") {
      writer.uint32(16).int64(message.last_height_changed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusParamsInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensusParamsInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensus_params = ConsensusParams.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.last_height_changed = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsensusParamsInfo {
    return {
      consensus_params: isSet(object.consensus_params)
        ? ConsensusParams.fromJSON(object.consensus_params)
        : undefined,
      last_height_changed: isSet(object.last_height_changed)
        ? String(object.last_height_changed)
        : "0",
    };
  },

  toJSON(message: ConsensusParamsInfo): unknown {
    const obj: any = {};
    message.consensus_params !== undefined &&
      (obj.consensus_params = message.consensus_params
        ? ConsensusParams.toJSON(message.consensus_params)
        : undefined);
    message.last_height_changed !== undefined &&
      (obj.last_height_changed = message.last_height_changed);
    return obj;
  },

  fromPartial(object: DeepPartial<ConsensusParamsInfo>): ConsensusParamsInfo {
    const message = createBaseConsensusParamsInfo();
    message.consensus_params =
      object.consensus_params !== undefined && object.consensus_params !== null
        ? ConsensusParams.fromPartial(object.consensus_params)
        : undefined;
    message.last_height_changed = object.last_height_changed ?? "0";
    return message;
  },
};

function createBaseABCIResponsesInfo(): ABCIResponsesInfo {
  return {
    legacy_abci_responses: undefined,
    height: "0",
    response_finalize_block: undefined,
  };
}

export const ABCIResponsesInfo = {
  encode(
    message: ABCIResponsesInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.legacy_abci_responses !== undefined) {
      LegacyABCIResponses.encode(
        message.legacy_abci_responses,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.height !== "0") {
      writer.uint32(16).int64(message.height);
    }
    if (message.response_finalize_block !== undefined) {
      ResponseFinalizeBlock.encode(
        message.response_finalize_block,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ABCIResponsesInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseABCIResponsesInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.legacy_abci_responses = LegacyABCIResponses.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.height = longToString(reader.int64() as Long);
          break;
        case 3:
          message.response_finalize_block = ResponseFinalizeBlock.decode(
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

  fromJSON(object: any): ABCIResponsesInfo {
    return {
      legacy_abci_responses: isSet(object.legacy_abci_responses)
        ? LegacyABCIResponses.fromJSON(object.legacy_abci_responses)
        : undefined,
      height: isSet(object.height) ? String(object.height) : "0",
      response_finalize_block: isSet(object.response_finalize_block)
        ? ResponseFinalizeBlock.fromJSON(object.response_finalize_block)
        : undefined,
    };
  },

  toJSON(message: ABCIResponsesInfo): unknown {
    const obj: any = {};
    message.legacy_abci_responses !== undefined &&
      (obj.legacy_abci_responses = message.legacy_abci_responses
        ? LegacyABCIResponses.toJSON(message.legacy_abci_responses)
        : undefined);
    message.height !== undefined && (obj.height = message.height);
    message.response_finalize_block !== undefined &&
      (obj.response_finalize_block = message.response_finalize_block
        ? ResponseFinalizeBlock.toJSON(message.response_finalize_block)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ABCIResponsesInfo>): ABCIResponsesInfo {
    const message = createBaseABCIResponsesInfo();
    message.legacy_abci_responses =
      object.legacy_abci_responses !== undefined &&
      object.legacy_abci_responses !== null
        ? LegacyABCIResponses.fromPartial(object.legacy_abci_responses)
        : undefined;
    message.height = object.height ?? "0";
    message.response_finalize_block =
      object.response_finalize_block !== undefined &&
      object.response_finalize_block !== null
        ? ResponseFinalizeBlock.fromPartial(object.response_finalize_block)
        : undefined;
    return message;
  },
};

function createBaseVersion(): Version {
  return { consensus: undefined, software: "" };
}

export const Version = {
  encode(
    message: Version,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consensus !== undefined) {
      Consensus.encode(message.consensus, writer.uint32(10).fork()).ldelim();
    }
    if (message.software !== "") {
      writer.uint32(18).string(message.software);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Version {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVersion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensus = Consensus.decode(reader, reader.uint32());
          break;
        case 2:
          message.software = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Version {
    return {
      consensus: isSet(object.consensus)
        ? Consensus.fromJSON(object.consensus)
        : undefined,
      software: isSet(object.software) ? String(object.software) : "",
    };
  },

  toJSON(message: Version): unknown {
    const obj: any = {};
    message.consensus !== undefined &&
      (obj.consensus = message.consensus
        ? Consensus.toJSON(message.consensus)
        : undefined);
    message.software !== undefined && (obj.software = message.software);
    return obj;
  },

  fromPartial(object: DeepPartial<Version>): Version {
    const message = createBaseVersion();
    message.consensus =
      object.consensus !== undefined && object.consensus !== null
        ? Consensus.fromPartial(object.consensus)
        : undefined;
    message.software = object.software ?? "";
    return message;
  },
};

function createBaseState(): State {
  return {
    version: undefined,
    chain_id: "",
    initial_height: "0",
    last_block_height: "0",
    last_block_id: undefined,
    last_block_time: undefined,
    next_validators: undefined,
    validators: undefined,
    last_validators: undefined,
    last_height_validators_changed: "0",
    consensus_params: undefined,
    last_height_consensus_params_changed: "0",
    last_results_hash: new Uint8Array(),
    app_hash: new Uint8Array(),
  };
}

export const State = {
  encode(message: State, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== undefined) {
      Version.encode(message.version, writer.uint32(10).fork()).ldelim();
    }
    if (message.chain_id !== "") {
      writer.uint32(18).string(message.chain_id);
    }
    if (message.initial_height !== "0") {
      writer.uint32(112).int64(message.initial_height);
    }
    if (message.last_block_height !== "0") {
      writer.uint32(24).int64(message.last_block_height);
    }
    if (message.last_block_id !== undefined) {
      BlockID.encode(message.last_block_id, writer.uint32(34).fork()).ldelim();
    }
    if (message.last_block_time !== undefined) {
      Timestamp.encode(
        message.last_block_time,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.next_validators !== undefined) {
      ValidatorSet.encode(
        message.next_validators,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.validators !== undefined) {
      ValidatorSet.encode(
        message.validators,
        writer.uint32(58).fork(),
      ).ldelim();
    }
    if (message.last_validators !== undefined) {
      ValidatorSet.encode(
        message.last_validators,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.last_height_validators_changed !== "0") {
      writer.uint32(72).int64(message.last_height_validators_changed);
    }
    if (message.consensus_params !== undefined) {
      ConsensusParams.encode(
        message.consensus_params,
        writer.uint32(82).fork(),
      ).ldelim();
    }
    if (message.last_height_consensus_params_changed !== "0") {
      writer.uint32(88).int64(message.last_height_consensus_params_changed);
    }
    if (message.last_results_hash.length !== 0) {
      writer.uint32(98).bytes(message.last_results_hash);
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(106).bytes(message.app_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): State {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = Version.decode(reader, reader.uint32());
          break;
        case 2:
          message.chain_id = reader.string();
          break;
        case 14:
          message.initial_height = longToString(reader.int64() as Long);
          break;
        case 3:
          message.last_block_height = longToString(reader.int64() as Long);
          break;
        case 4:
          message.last_block_id = BlockID.decode(reader, reader.uint32());
          break;
        case 5:
          message.last_block_time = Timestamp.decode(reader, reader.uint32());
          break;
        case 6:
          message.next_validators = ValidatorSet.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 7:
          message.validators = ValidatorSet.decode(reader, reader.uint32());
          break;
        case 8:
          message.last_validators = ValidatorSet.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 9:
          message.last_height_validators_changed = longToString(
            reader.int64() as Long,
          );
          break;
        case 10:
          message.consensus_params = ConsensusParams.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 11:
          message.last_height_consensus_params_changed = longToString(
            reader.int64() as Long,
          );
          break;
        case 12:
          message.last_results_hash = reader.bytes();
          break;
        case 13:
          message.app_hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): State {
    return {
      version: isSet(object.version)
        ? Version.fromJSON(object.version)
        : undefined,
      chain_id: isSet(object.chain_id) ? String(object.chain_id) : "",
      initial_height: isSet(object.initial_height)
        ? String(object.initial_height)
        : "0",
      last_block_height: isSet(object.last_block_height)
        ? String(object.last_block_height)
        : "0",
      last_block_id: isSet(object.last_block_id)
        ? BlockID.fromJSON(object.last_block_id)
        : undefined,
      last_block_time: isSet(object.last_block_time)
        ? fromJsonTimestamp(object.last_block_time)
        : undefined,
      next_validators: isSet(object.next_validators)
        ? ValidatorSet.fromJSON(object.next_validators)
        : undefined,
      validators: isSet(object.validators)
        ? ValidatorSet.fromJSON(object.validators)
        : undefined,
      last_validators: isSet(object.last_validators)
        ? ValidatorSet.fromJSON(object.last_validators)
        : undefined,
      last_height_validators_changed: isSet(
        object.last_height_validators_changed,
      )
        ? String(object.last_height_validators_changed)
        : "0",
      consensus_params: isSet(object.consensus_params)
        ? ConsensusParams.fromJSON(object.consensus_params)
        : undefined,
      last_height_consensus_params_changed: isSet(
        object.last_height_consensus_params_changed,
      )
        ? String(object.last_height_consensus_params_changed)
        : "0",
      last_results_hash: isSet(object.last_results_hash)
        ? bytesFromBase64(object.last_results_hash)
        : new Uint8Array(),
      app_hash: isSet(object.app_hash)
        ? bytesFromBase64(object.app_hash)
        : new Uint8Array(),
    };
  },

  toJSON(message: State): unknown {
    const obj: any = {};
    message.version !== undefined &&
      (obj.version = message.version
        ? Version.toJSON(message.version)
        : undefined);
    message.chain_id !== undefined && (obj.chain_id = message.chain_id);
    message.initial_height !== undefined &&
      (obj.initial_height = message.initial_height);
    message.last_block_height !== undefined &&
      (obj.last_block_height = message.last_block_height);
    message.last_block_id !== undefined &&
      (obj.last_block_id = message.last_block_id
        ? BlockID.toJSON(message.last_block_id)
        : undefined);
    message.last_block_time !== undefined &&
      (obj.last_block_time = fromTimestamp(
        message.last_block_time,
      ).toISOString());
    message.next_validators !== undefined &&
      (obj.next_validators = message.next_validators
        ? ValidatorSet.toJSON(message.next_validators)
        : undefined);
    message.validators !== undefined &&
      (obj.validators = message.validators
        ? ValidatorSet.toJSON(message.validators)
        : undefined);
    message.last_validators !== undefined &&
      (obj.last_validators = message.last_validators
        ? ValidatorSet.toJSON(message.last_validators)
        : undefined);
    message.last_height_validators_changed !== undefined &&
      (obj.last_height_validators_changed =
        message.last_height_validators_changed);
    message.consensus_params !== undefined &&
      (obj.consensus_params = message.consensus_params
        ? ConsensusParams.toJSON(message.consensus_params)
        : undefined);
    message.last_height_consensus_params_changed !== undefined &&
      (obj.last_height_consensus_params_changed =
        message.last_height_consensus_params_changed);
    message.last_results_hash !== undefined &&
      (obj.last_results_hash = base64FromBytes(
        message.last_results_hash !== undefined
          ? message.last_results_hash
          : new Uint8Array(),
      ));
    message.app_hash !== undefined &&
      (obj.app_hash = base64FromBytes(
        message.app_hash !== undefined ? message.app_hash : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<State>): State {
    const message = createBaseState();
    message.version =
      object.version !== undefined && object.version !== null
        ? Version.fromPartial(object.version)
        : undefined;
    message.chain_id = object.chain_id ?? "";
    message.initial_height = object.initial_height ?? "0";
    message.last_block_height = object.last_block_height ?? "0";
    message.last_block_id =
      object.last_block_id !== undefined && object.last_block_id !== null
        ? BlockID.fromPartial(object.last_block_id)
        : undefined;
    message.last_block_time =
      object.last_block_time !== undefined && object.last_block_time !== null
        ? Timestamp.fromPartial(object.last_block_time)
        : undefined;
    message.next_validators =
      object.next_validators !== undefined && object.next_validators !== null
        ? ValidatorSet.fromPartial(object.next_validators)
        : undefined;
    message.validators =
      object.validators !== undefined && object.validators !== null
        ? ValidatorSet.fromPartial(object.validators)
        : undefined;
    message.last_validators =
      object.last_validators !== undefined && object.last_validators !== null
        ? ValidatorSet.fromPartial(object.last_validators)
        : undefined;
    message.last_height_validators_changed =
      object.last_height_validators_changed ?? "0";
    message.consensus_params =
      object.consensus_params !== undefined && object.consensus_params !== null
        ? ConsensusParams.fromPartial(object.consensus_params)
        : undefined;
    message.last_height_consensus_params_changed =
      object.last_height_consensus_params_changed ?? "0";
    message.last_results_hash = object.last_results_hash ?? new Uint8Array();
    message.app_hash = object.app_hash ?? new Uint8Array();
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
