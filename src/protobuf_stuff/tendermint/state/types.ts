/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  ResponseEndBlock,
  ResponseBeginBlock,
  ResponseDeliverTx,
} from "../../tendermint/abci/types";
import { ValidatorSet } from "../../tendermint/types/validator";
import { ConsensusParams } from "../../tendermint/types/params";
import { Consensus } from "../../tendermint/version/types";
import { BlockID } from "../../tendermint/types/types";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "tendermint.state";

/**
 * ABCIResponses retains the responses
 * of the various ABCI calls during block processing.
 * It is persisted to disk for each height before calling Commit.
 */
export interface ABCIResponses {
  deliverTxs: ResponseDeliverTx[];
  endBlock?: ResponseEndBlock;
  beginBlock?: ResponseBeginBlock;
}

/** ValidatorsInfo represents the latest validator set, or the last height it changed */
export interface ValidatorsInfo {
  validatorSet?: ValidatorSet;
  lastHeightChanged: string;
}

/** ConsensusParamsInfo represents the latest consensus params, or the last height it changed */
export interface ConsensusParamsInfo {
  consensusParams?: ConsensusParams;
  lastHeightChanged: string;
}

export interface Version {
  consensus?: Consensus;
  software: string;
}

export interface State {
  version?: Version;
  /** immutable */
  chainId: string;
  initialHeight: string;
  /** LastBlockHeight=0 at genesis (ie. block(H=0) does not exist) */
  lastBlockHeight: string;
  lastBlockId?: BlockID;
  lastBlockTime?: Timestamp;
  /**
   * LastValidators is used to validate block.LastCommit.
   * Validators are persisted to the database separately every time they change,
   * so we can query for historical validator sets.
   * Note that if s.LastBlockHeight causes a valset change,
   * we set s.LastHeightValidatorsChanged = s.LastBlockHeight + 1 + 1
   * Extra +1 due to nextValSet delay.
   */
  nextValidators?: ValidatorSet;
  validators?: ValidatorSet;
  lastValidators?: ValidatorSet;
  lastHeightValidatorsChanged: string;
  /**
   * Consensus parameters used for validating blocks.
   * Changes returned by EndBlock and updated after Commit.
   */
  consensusParams?: ConsensusParams;
  lastHeightConsensusParamsChanged: string;
  /** Merkle root of the results from executing prev block */
  lastResultsHash: Uint8Array;
  /** the latest AppHash we've received from calling abci.Commit() */
  appHash: Uint8Array;
}

function createBaseABCIResponses(): ABCIResponses {
  return { deliverTxs: [], endBlock: undefined, beginBlock: undefined };
}

export const ABCIResponses = {
  encode(
    message: ABCIResponses,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.deliverTxs) {
      ResponseDeliverTx.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.endBlock !== undefined) {
      ResponseEndBlock.encode(
        message.endBlock,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.beginBlock !== undefined) {
      ResponseBeginBlock.encode(
        message.beginBlock,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ABCIResponses {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseABCIResponses();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deliverTxs.push(
            ResponseDeliverTx.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.endBlock = ResponseEndBlock.decode(reader, reader.uint32());
          break;
        case 3:
          message.beginBlock = ResponseBeginBlock.decode(
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

  fromJSON(object: any): ABCIResponses {
    return {
      deliverTxs: Array.isArray(object?.deliverTxs)
        ? object.deliverTxs.map((e: any) => ResponseDeliverTx.fromJSON(e))
        : [],
      endBlock: isSet(object.endBlock)
        ? ResponseEndBlock.fromJSON(object.endBlock)
        : undefined,
      beginBlock: isSet(object.beginBlock)
        ? ResponseBeginBlock.fromJSON(object.beginBlock)
        : undefined,
    };
  },

  toJSON(message: ABCIResponses): unknown {
    const obj: any = {};
    if (message.deliverTxs) {
      obj.deliverTxs = message.deliverTxs.map((e) =>
        e ? ResponseDeliverTx.toJSON(e) : undefined,
      );
    } else {
      obj.deliverTxs = [];
    }
    message.endBlock !== undefined &&
      (obj.endBlock = message.endBlock
        ? ResponseEndBlock.toJSON(message.endBlock)
        : undefined);
    message.beginBlock !== undefined &&
      (obj.beginBlock = message.beginBlock
        ? ResponseBeginBlock.toJSON(message.beginBlock)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ABCIResponses>, I>>(
    object: I,
  ): ABCIResponses {
    const message = createBaseABCIResponses();
    message.deliverTxs =
      object.deliverTxs?.map((e) => ResponseDeliverTx.fromPartial(e)) || [];
    message.endBlock =
      object.endBlock !== undefined && object.endBlock !== null
        ? ResponseEndBlock.fromPartial(object.endBlock)
        : undefined;
    message.beginBlock =
      object.beginBlock !== undefined && object.beginBlock !== null
        ? ResponseBeginBlock.fromPartial(object.beginBlock)
        : undefined;
    return message;
  },
};

function createBaseValidatorsInfo(): ValidatorsInfo {
  return { validatorSet: undefined, lastHeightChanged: "0" };
}

export const ValidatorsInfo = {
  encode(
    message: ValidatorsInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.validatorSet !== undefined) {
      ValidatorSet.encode(
        message.validatorSet,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.lastHeightChanged !== "0") {
      writer.uint32(16).int64(message.lastHeightChanged);
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
          message.validatorSet = ValidatorSet.decode(reader, reader.uint32());
          break;
        case 2:
          message.lastHeightChanged = longToString(reader.int64() as Long);
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
      validatorSet: isSet(object.validatorSet)
        ? ValidatorSet.fromJSON(object.validatorSet)
        : undefined,
      lastHeightChanged: isSet(object.lastHeightChanged)
        ? String(object.lastHeightChanged)
        : "0",
    };
  },

  toJSON(message: ValidatorsInfo): unknown {
    const obj: any = {};
    message.validatorSet !== undefined &&
      (obj.validatorSet = message.validatorSet
        ? ValidatorSet.toJSON(message.validatorSet)
        : undefined);
    message.lastHeightChanged !== undefined &&
      (obj.lastHeightChanged = message.lastHeightChanged);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidatorsInfo>, I>>(
    object: I,
  ): ValidatorsInfo {
    const message = createBaseValidatorsInfo();
    message.validatorSet =
      object.validatorSet !== undefined && object.validatorSet !== null
        ? ValidatorSet.fromPartial(object.validatorSet)
        : undefined;
    message.lastHeightChanged = object.lastHeightChanged ?? "0";
    return message;
  },
};

function createBaseConsensusParamsInfo(): ConsensusParamsInfo {
  return { consensusParams: undefined, lastHeightChanged: "0" };
}

export const ConsensusParamsInfo = {
  encode(
    message: ConsensusParamsInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consensusParams !== undefined) {
      ConsensusParams.encode(
        message.consensusParams,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.lastHeightChanged !== "0") {
      writer.uint32(16).int64(message.lastHeightChanged);
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
          message.consensusParams = ConsensusParams.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 2:
          message.lastHeightChanged = longToString(reader.int64() as Long);
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
      consensusParams: isSet(object.consensusParams)
        ? ConsensusParams.fromJSON(object.consensusParams)
        : undefined,
      lastHeightChanged: isSet(object.lastHeightChanged)
        ? String(object.lastHeightChanged)
        : "0",
    };
  },

  toJSON(message: ConsensusParamsInfo): unknown {
    const obj: any = {};
    message.consensusParams !== undefined &&
      (obj.consensusParams = message.consensusParams
        ? ConsensusParams.toJSON(message.consensusParams)
        : undefined);
    message.lastHeightChanged !== undefined &&
      (obj.lastHeightChanged = message.lastHeightChanged);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsensusParamsInfo>, I>>(
    object: I,
  ): ConsensusParamsInfo {
    const message = createBaseConsensusParamsInfo();
    message.consensusParams =
      object.consensusParams !== undefined && object.consensusParams !== null
        ? ConsensusParams.fromPartial(object.consensusParams)
        : undefined;
    message.lastHeightChanged = object.lastHeightChanged ?? "0";
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

  fromPartial<I extends Exact<DeepPartial<Version>, I>>(object: I): Version {
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
    chainId: "",
    initialHeight: "0",
    lastBlockHeight: "0",
    lastBlockId: undefined,
    lastBlockTime: undefined,
    nextValidators: undefined,
    validators: undefined,
    lastValidators: undefined,
    lastHeightValidatorsChanged: "0",
    consensusParams: undefined,
    lastHeightConsensusParamsChanged: "0",
    lastResultsHash: new Uint8Array(),
    appHash: new Uint8Array(),
  };
}

export const State = {
  encode(message: State, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== undefined) {
      Version.encode(message.version, writer.uint32(10).fork()).ldelim();
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.initialHeight !== "0") {
      writer.uint32(112).int64(message.initialHeight);
    }
    if (message.lastBlockHeight !== "0") {
      writer.uint32(24).int64(message.lastBlockHeight);
    }
    if (message.lastBlockId !== undefined) {
      BlockID.encode(message.lastBlockId, writer.uint32(34).fork()).ldelim();
    }
    if (message.lastBlockTime !== undefined) {
      Timestamp.encode(
        message.lastBlockTime,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.nextValidators !== undefined) {
      ValidatorSet.encode(
        message.nextValidators,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.validators !== undefined) {
      ValidatorSet.encode(
        message.validators,
        writer.uint32(58).fork(),
      ).ldelim();
    }
    if (message.lastValidators !== undefined) {
      ValidatorSet.encode(
        message.lastValidators,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.lastHeightValidatorsChanged !== "0") {
      writer.uint32(72).int64(message.lastHeightValidatorsChanged);
    }
    if (message.consensusParams !== undefined) {
      ConsensusParams.encode(
        message.consensusParams,
        writer.uint32(82).fork(),
      ).ldelim();
    }
    if (message.lastHeightConsensusParamsChanged !== "0") {
      writer.uint32(88).int64(message.lastHeightConsensusParamsChanged);
    }
    if (message.lastResultsHash.length !== 0) {
      writer.uint32(98).bytes(message.lastResultsHash);
    }
    if (message.appHash.length !== 0) {
      writer.uint32(106).bytes(message.appHash);
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
          message.chainId = reader.string();
          break;
        case 14:
          message.initialHeight = longToString(reader.int64() as Long);
          break;
        case 3:
          message.lastBlockHeight = longToString(reader.int64() as Long);
          break;
        case 4:
          message.lastBlockId = BlockID.decode(reader, reader.uint32());
          break;
        case 5:
          message.lastBlockTime = Timestamp.decode(reader, reader.uint32());
          break;
        case 6:
          message.nextValidators = ValidatorSet.decode(reader, reader.uint32());
          break;
        case 7:
          message.validators = ValidatorSet.decode(reader, reader.uint32());
          break;
        case 8:
          message.lastValidators = ValidatorSet.decode(reader, reader.uint32());
          break;
        case 9:
          message.lastHeightValidatorsChanged = longToString(
            reader.int64() as Long,
          );
          break;
        case 10:
          message.consensusParams = ConsensusParams.decode(
            reader,
            reader.uint32(),
          );
          break;
        case 11:
          message.lastHeightConsensusParamsChanged = longToString(
            reader.int64() as Long,
          );
          break;
        case 12:
          message.lastResultsHash = reader.bytes();
          break;
        case 13:
          message.appHash = reader.bytes();
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
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      initialHeight: isSet(object.initialHeight)
        ? String(object.initialHeight)
        : "0",
      lastBlockHeight: isSet(object.lastBlockHeight)
        ? String(object.lastBlockHeight)
        : "0",
      lastBlockId: isSet(object.lastBlockId)
        ? BlockID.fromJSON(object.lastBlockId)
        : undefined,
      lastBlockTime: isSet(object.lastBlockTime)
        ? fromJsonTimestamp(object.lastBlockTime)
        : undefined,
      nextValidators: isSet(object.nextValidators)
        ? ValidatorSet.fromJSON(object.nextValidators)
        : undefined,
      validators: isSet(object.validators)
        ? ValidatorSet.fromJSON(object.validators)
        : undefined,
      lastValidators: isSet(object.lastValidators)
        ? ValidatorSet.fromJSON(object.lastValidators)
        : undefined,
      lastHeightValidatorsChanged: isSet(object.lastHeightValidatorsChanged)
        ? String(object.lastHeightValidatorsChanged)
        : "0",
      consensusParams: isSet(object.consensusParams)
        ? ConsensusParams.fromJSON(object.consensusParams)
        : undefined,
      lastHeightConsensusParamsChanged: isSet(
        object.lastHeightConsensusParamsChanged,
      )
        ? String(object.lastHeightConsensusParamsChanged)
        : "0",
      lastResultsHash: isSet(object.lastResultsHash)
        ? bytesFromBase64(object.lastResultsHash)
        : new Uint8Array(),
      appHash: isSet(object.appHash)
        ? bytesFromBase64(object.appHash)
        : new Uint8Array(),
    };
  },

  toJSON(message: State): unknown {
    const obj: any = {};
    message.version !== undefined &&
      (obj.version = message.version
        ? Version.toJSON(message.version)
        : undefined);
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.initialHeight !== undefined &&
      (obj.initialHeight = message.initialHeight);
    message.lastBlockHeight !== undefined &&
      (obj.lastBlockHeight = message.lastBlockHeight);
    message.lastBlockId !== undefined &&
      (obj.lastBlockId = message.lastBlockId
        ? BlockID.toJSON(message.lastBlockId)
        : undefined);
    message.lastBlockTime !== undefined &&
      (obj.lastBlockTime = fromTimestamp(message.lastBlockTime).toISOString());
    message.nextValidators !== undefined &&
      (obj.nextValidators = message.nextValidators
        ? ValidatorSet.toJSON(message.nextValidators)
        : undefined);
    message.validators !== undefined &&
      (obj.validators = message.validators
        ? ValidatorSet.toJSON(message.validators)
        : undefined);
    message.lastValidators !== undefined &&
      (obj.lastValidators = message.lastValidators
        ? ValidatorSet.toJSON(message.lastValidators)
        : undefined);
    message.lastHeightValidatorsChanged !== undefined &&
      (obj.lastHeightValidatorsChanged = message.lastHeightValidatorsChanged);
    message.consensusParams !== undefined &&
      (obj.consensusParams = message.consensusParams
        ? ConsensusParams.toJSON(message.consensusParams)
        : undefined);
    message.lastHeightConsensusParamsChanged !== undefined &&
      (obj.lastHeightConsensusParamsChanged =
        message.lastHeightConsensusParamsChanged);
    message.lastResultsHash !== undefined &&
      (obj.lastResultsHash = base64FromBytes(
        message.lastResultsHash !== undefined
          ? message.lastResultsHash
          : new Uint8Array(),
      ));
    message.appHash !== undefined &&
      (obj.appHash = base64FromBytes(
        message.appHash !== undefined ? message.appHash : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<State>, I>>(object: I): State {
    const message = createBaseState();
    message.version =
      object.version !== undefined && object.version !== null
        ? Version.fromPartial(object.version)
        : undefined;
    message.chainId = object.chainId ?? "";
    message.initialHeight = object.initialHeight ?? "0";
    message.lastBlockHeight = object.lastBlockHeight ?? "0";
    message.lastBlockId =
      object.lastBlockId !== undefined && object.lastBlockId !== null
        ? BlockID.fromPartial(object.lastBlockId)
        : undefined;
    message.lastBlockTime =
      object.lastBlockTime !== undefined && object.lastBlockTime !== null
        ? Timestamp.fromPartial(object.lastBlockTime)
        : undefined;
    message.nextValidators =
      object.nextValidators !== undefined && object.nextValidators !== null
        ? ValidatorSet.fromPartial(object.nextValidators)
        : undefined;
    message.validators =
      object.validators !== undefined && object.validators !== null
        ? ValidatorSet.fromPartial(object.validators)
        : undefined;
    message.lastValidators =
      object.lastValidators !== undefined && object.lastValidators !== null
        ? ValidatorSet.fromPartial(object.lastValidators)
        : undefined;
    message.lastHeightValidatorsChanged =
      object.lastHeightValidatorsChanged ?? "0";
    message.consensusParams =
      object.consensusParams !== undefined && object.consensusParams !== null
        ? ConsensusParams.fromPartial(object.consensusParams)
        : undefined;
    message.lastHeightConsensusParamsChanged =
      object.lastHeightConsensusParamsChanged ?? "0";
    message.lastResultsHash = object.lastResultsHash ?? new Uint8Array();
    message.appHash = object.appHash ?? new Uint8Array();
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
