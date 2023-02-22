/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Proof } from "../crypto/proof";
import { Consensus } from "../version/types";
import { Timestamp } from "../../google/protobuf/timestamp";
import { ValidatorSet } from "./validator";

export const protobufPackage = "tendermint.types";

/** BlockIdFlag indicates which BlcokID the signature is for */
export enum BlockIDFlag {
  BLOCK_ID_FLAG_UNKNOWN = 0,
  BLOCK_ID_FLAG_ABSENT = 1,
  BLOCK_ID_FLAG_COMMIT = 2,
  BLOCK_ID_FLAG_NIL = 3,
  UNRECOGNIZED = -1,
}

export function blockIDFlagFromJSON(object: any): BlockIDFlag {
  switch (object) {
    case 0:
    case "BLOCK_ID_FLAG_UNKNOWN":
      return BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN;
    case 1:
    case "BLOCK_ID_FLAG_ABSENT":
      return BlockIDFlag.BLOCK_ID_FLAG_ABSENT;
    case 2:
    case "BLOCK_ID_FLAG_COMMIT":
      return BlockIDFlag.BLOCK_ID_FLAG_COMMIT;
    case 3:
    case "BLOCK_ID_FLAG_NIL":
      return BlockIDFlag.BLOCK_ID_FLAG_NIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BlockIDFlag.UNRECOGNIZED;
  }
}

export function blockIDFlagToJSON(object: BlockIDFlag): string {
  switch (object) {
    case BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN:
      return "BLOCK_ID_FLAG_UNKNOWN";
    case BlockIDFlag.BLOCK_ID_FLAG_ABSENT:
      return "BLOCK_ID_FLAG_ABSENT";
    case BlockIDFlag.BLOCK_ID_FLAG_COMMIT:
      return "BLOCK_ID_FLAG_COMMIT";
    case BlockIDFlag.BLOCK_ID_FLAG_NIL:
      return "BLOCK_ID_FLAG_NIL";
    default:
      return "UNKNOWN";
  }
}

/** SignedMsgType is a type of signed message in the consensus. */
export enum SignedMsgType {
  SIGNED_MSG_TYPE_UNKNOWN = 0,
  /** SIGNED_MSG_TYPE_PREVOTE - Votes */
  SIGNED_MSG_TYPE_PREVOTE = 1,
  SIGNED_MSG_TYPE_PRECOMMIT = 2,
  /** SIGNED_MSG_TYPE_PROPOSAL - Proposals */
  SIGNED_MSG_TYPE_PROPOSAL = 32,
  UNRECOGNIZED = -1,
}

export function signedMsgTypeFromJSON(object: any): SignedMsgType {
  switch (object) {
    case 0:
    case "SIGNED_MSG_TYPE_UNKNOWN":
      return SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN;
    case 1:
    case "SIGNED_MSG_TYPE_PREVOTE":
      return SignedMsgType.SIGNED_MSG_TYPE_PREVOTE;
    case 2:
    case "SIGNED_MSG_TYPE_PRECOMMIT":
      return SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT;
    case 32:
    case "SIGNED_MSG_TYPE_PROPOSAL":
      return SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SignedMsgType.UNRECOGNIZED;
  }
}

export function signedMsgTypeToJSON(object: SignedMsgType): string {
  switch (object) {
    case SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN:
      return "SIGNED_MSG_TYPE_UNKNOWN";
    case SignedMsgType.SIGNED_MSG_TYPE_PREVOTE:
      return "SIGNED_MSG_TYPE_PREVOTE";
    case SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT:
      return "SIGNED_MSG_TYPE_PRECOMMIT";
    case SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL:
      return "SIGNED_MSG_TYPE_PROPOSAL";
    default:
      return "UNKNOWN";
  }
}

/** PartsetHeader */
export interface PartSetHeader {
  total: number;
  hash: Uint8Array;
}

export interface Part {
  index: number;
  bytes: Uint8Array;
  proof?: Proof;
}

/** BlockID */
export interface BlockID {
  hash: Uint8Array;
  part_set_header?: PartSetHeader;
}

/** Header defines the structure of a Tendermint block header. */
export interface Header {
  /** basic block info */
  version?: Consensus;
  chain_id: string;
  height: string;
  time?: Timestamp;
  /** prev block info */
  last_block_id?: BlockID;
  /** hashes of block data */
  last_commit_hash: Uint8Array;
  /** transactions */
  data_hash: Uint8Array;
  /** hashes from the app output from the prev block */
  validators_hash: Uint8Array;
  /** validators for the next block */
  next_validators_hash: Uint8Array;
  /** consensus params for current block */
  consensus_hash: Uint8Array;
  /** state after txs from the previous block */
  app_hash: Uint8Array;
  /** root hash of all results from the txs from the previous block */
  last_results_hash: Uint8Array;
  /** consensus info */
  evidence_hash: Uint8Array;
  /** original proposer of the block */
  proposer_address: Uint8Array;
  /** encrypted random */
  encrypted_random?: EncryptedRandom;
}

/** Data contains the set of transactions included in the block */
export interface EncryptedRandom {
  random: Uint8Array;
  proof: Uint8Array;
}

/** Data contains the set of transactions included in the block */
export interface Data {
  /**
   * Txs that will be applied by state @ block.Height+1.
   * NOTE: not all txs here are valid.  We're just agreeing on the order first.
   * This means that block.AppHash does not include these txs.
   */
  txs: Uint8Array[];
}

/**
 * Vote represents a prevote, precommit, or commit vote from validators for
 * consensus.
 */
export interface Vote {
  type: SignedMsgType;
  height: string;
  round: number;
  /** zero if vote is nil. */
  block_id?: BlockID;
  timestamp?: Timestamp;
  validator_address: Uint8Array;
  validator_index: number;
  signature: Uint8Array;
}

/** Commit contains the evidence that a block was committed by a set of validators. */
export interface Commit {
  height: string;
  round: number;
  block_id?: BlockID;
  signatures: CommitSig[];
}

/** CommitSig is a part of the Vote included in a Commit. */
export interface CommitSig {
  block_id_flag: BlockIDFlag;
  validator_address: Uint8Array;
  timestamp?: Timestamp;
  signature: Uint8Array;
}

export interface Proposal {
  type: SignedMsgType;
  height: string;
  round: number;
  pol_round: number;
  block_id?: BlockID;
  timestamp?: Timestamp;
  signature: Uint8Array;
}

export interface SignedHeader {
  header?: Header;
  commit?: Commit;
}

export interface LightBlock {
  signed_header?: SignedHeader;
  validator_set?: ValidatorSet;
}

export interface BlockMeta {
  block_id?: BlockID;
  block_size: string;
  header?: Header;
  num_txs: string;
}

/** TxProof represents a Merkle proof of the presence of a transaction in the Merkle tree. */
export interface TxProof {
  root_hash: Uint8Array;
  data: Uint8Array;
  proof?: Proof;
}

function createBasePartSetHeader(): PartSetHeader {
  return { total: 0, hash: new Uint8Array() };
}

export const PartSetHeader = {
  encode(
    message: PartSetHeader,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).uint32(message.total);
    }
    if (message.hash.length !== 0) {
      writer.uint32(18).bytes(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartSetHeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartSetHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.uint32();
          break;
        case 2:
          message.hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartSetHeader {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
    };
  },

  toJSON(message: PartSetHeader): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = Math.round(message.total));
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PartSetHeader>, I>>(
    object: I,
  ): PartSetHeader {
    const message = createBasePartSetHeader();
    message.total = object.total ?? 0;
    message.hash = object.hash ?? new Uint8Array();
    return message;
  },
};

function createBasePart(): Part {
  return { index: 0, bytes: new Uint8Array(), proof: undefined };
}

export const Part = {
  encode(message: Part, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint32(message.index);
    }
    if (message.bytes.length !== 0) {
      writer.uint32(18).bytes(message.bytes);
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Part {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePart();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        case 2:
          message.bytes = reader.bytes();
          break;
        case 3:
          message.proof = Proof.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Part {
    return {
      index: isSet(object.index) ? Number(object.index) : 0,
      bytes: isSet(object.bytes)
        ? bytesFromBase64(object.bytes)
        : new Uint8Array(),
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: Part): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = Math.round(message.index));
    message.bytes !== undefined &&
      (obj.bytes = base64FromBytes(
        message.bytes !== undefined ? message.bytes : new Uint8Array(),
      ));
    message.proof !== undefined &&
      (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Part>, I>>(object: I): Part {
    const message = createBasePart();
    message.index = object.index ?? 0;
    message.bytes = object.bytes ?? new Uint8Array();
    message.proof =
      object.proof !== undefined && object.proof !== null
        ? Proof.fromPartial(object.proof)
        : undefined;
    return message;
  },
};

function createBaseBlockID(): BlockID {
  return { hash: new Uint8Array(), part_set_header: undefined };
}

export const BlockID = {
  encode(
    message: BlockID,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.part_set_header !== undefined) {
      PartSetHeader.encode(
        message.part_set_header,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockID {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes();
          break;
        case 2:
          message.part_set_header = PartSetHeader.decode(
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

  fromJSON(object: any): BlockID {
    return {
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(),
      part_set_header: isSet(object.part_set_header)
        ? PartSetHeader.fromJSON(object.part_set_header)
        : undefined,
    };
  },

  toJSON(message: BlockID): unknown {
    const obj: any = {};
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array(),
      ));
    message.part_set_header !== undefined &&
      (obj.part_set_header = message.part_set_header
        ? PartSetHeader.toJSON(message.part_set_header)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BlockID>, I>>(object: I): BlockID {
    const message = createBaseBlockID();
    message.hash = object.hash ?? new Uint8Array();
    message.part_set_header =
      object.part_set_header !== undefined && object.part_set_header !== null
        ? PartSetHeader.fromPartial(object.part_set_header)
        : undefined;
    return message;
  },
};

function createBaseHeader(): Header {
  return {
    version: undefined,
    chain_id: "",
    height: "0",
    time: undefined,
    last_block_id: undefined,
    last_commit_hash: new Uint8Array(),
    data_hash: new Uint8Array(),
    validators_hash: new Uint8Array(),
    next_validators_hash: new Uint8Array(),
    consensus_hash: new Uint8Array(),
    app_hash: new Uint8Array(),
    last_results_hash: new Uint8Array(),
    evidence_hash: new Uint8Array(),
    proposer_address: new Uint8Array(),
    encrypted_random: undefined,
  };
}

export const Header = {
  encode(
    message: Header,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.version !== undefined) {
      Consensus.encode(message.version, writer.uint32(10).fork()).ldelim();
    }
    if (message.chain_id !== "") {
      writer.uint32(18).string(message.chain_id);
    }
    if (message.height !== "0") {
      writer.uint32(24).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(message.time, writer.uint32(34).fork()).ldelim();
    }
    if (message.last_block_id !== undefined) {
      BlockID.encode(message.last_block_id, writer.uint32(42).fork()).ldelim();
    }
    if (message.last_commit_hash.length !== 0) {
      writer.uint32(50).bytes(message.last_commit_hash);
    }
    if (message.data_hash.length !== 0) {
      writer.uint32(58).bytes(message.data_hash);
    }
    if (message.validators_hash.length !== 0) {
      writer.uint32(66).bytes(message.validators_hash);
    }
    if (message.next_validators_hash.length !== 0) {
      writer.uint32(74).bytes(message.next_validators_hash);
    }
    if (message.consensus_hash.length !== 0) {
      writer.uint32(82).bytes(message.consensus_hash);
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(90).bytes(message.app_hash);
    }
    if (message.last_results_hash.length !== 0) {
      writer.uint32(98).bytes(message.last_results_hash);
    }
    if (message.evidence_hash.length !== 0) {
      writer.uint32(106).bytes(message.evidence_hash);
    }
    if (message.proposer_address.length !== 0) {
      writer.uint32(114).bytes(message.proposer_address);
    }
    if (message.encrypted_random !== undefined) {
      EncryptedRandom.encode(
        message.encrypted_random,
        writer.uint32(122).fork(),
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
          message.version = Consensus.decode(reader, reader.uint32());
          break;
        case 2:
          message.chain_id = reader.string();
          break;
        case 3:
          message.height = longToString(reader.int64() as Long);
          break;
        case 4:
          message.time = Timestamp.decode(reader, reader.uint32());
          break;
        case 5:
          message.last_block_id = BlockID.decode(reader, reader.uint32());
          break;
        case 6:
          message.last_commit_hash = reader.bytes();
          break;
        case 7:
          message.data_hash = reader.bytes();
          break;
        case 8:
          message.validators_hash = reader.bytes();
          break;
        case 9:
          message.next_validators_hash = reader.bytes();
          break;
        case 10:
          message.consensus_hash = reader.bytes();
          break;
        case 11:
          message.app_hash = reader.bytes();
          break;
        case 12:
          message.last_results_hash = reader.bytes();
          break;
        case 13:
          message.evidence_hash = reader.bytes();
          break;
        case 14:
          message.proposer_address = reader.bytes();
          break;
        case 15:
          message.encrypted_random = EncryptedRandom.decode(
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
      version: isSet(object.version)
        ? Consensus.fromJSON(object.version)
        : undefined,
      chain_id: isSet(object.chain_id) ? String(object.chain_id) : "",
      height: isSet(object.height) ? String(object.height) : "0",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      last_block_id: isSet(object.last_block_id)
        ? BlockID.fromJSON(object.last_block_id)
        : undefined,
      last_commit_hash: isSet(object.last_commit_hash)
        ? bytesFromBase64(object.last_commit_hash)
        : new Uint8Array(),
      data_hash: isSet(object.data_hash)
        ? bytesFromBase64(object.data_hash)
        : new Uint8Array(),
      validators_hash: isSet(object.validators_hash)
        ? bytesFromBase64(object.validators_hash)
        : new Uint8Array(),
      next_validators_hash: isSet(object.next_validators_hash)
        ? bytesFromBase64(object.next_validators_hash)
        : new Uint8Array(),
      consensus_hash: isSet(object.consensus_hash)
        ? bytesFromBase64(object.consensus_hash)
        : new Uint8Array(),
      app_hash: isSet(object.app_hash)
        ? bytesFromBase64(object.app_hash)
        : new Uint8Array(),
      last_results_hash: isSet(object.last_results_hash)
        ? bytesFromBase64(object.last_results_hash)
        : new Uint8Array(),
      evidence_hash: isSet(object.evidence_hash)
        ? bytesFromBase64(object.evidence_hash)
        : new Uint8Array(),
      proposer_address: isSet(object.proposer_address)
        ? bytesFromBase64(object.proposer_address)
        : new Uint8Array(),
      encrypted_random: isSet(object.encrypted_random)
        ? EncryptedRandom.fromJSON(object.encrypted_random)
        : undefined,
    };
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    message.version !== undefined &&
      (obj.version = message.version
        ? Consensus.toJSON(message.version)
        : undefined);
    message.chain_id !== undefined && (obj.chain_id = message.chain_id);
    message.height !== undefined && (obj.height = message.height);
    message.time !== undefined &&
      (obj.time = fromTimestamp(message.time).toISOString());
    message.last_block_id !== undefined &&
      (obj.last_block_id = message.last_block_id
        ? BlockID.toJSON(message.last_block_id)
        : undefined);
    message.last_commit_hash !== undefined &&
      (obj.last_commit_hash = base64FromBytes(
        message.last_commit_hash !== undefined
          ? message.last_commit_hash
          : new Uint8Array(),
      ));
    message.data_hash !== undefined &&
      (obj.data_hash = base64FromBytes(
        message.data_hash !== undefined ? message.data_hash : new Uint8Array(),
      ));
    message.validators_hash !== undefined &&
      (obj.validators_hash = base64FromBytes(
        message.validators_hash !== undefined
          ? message.validators_hash
          : new Uint8Array(),
      ));
    message.next_validators_hash !== undefined &&
      (obj.next_validators_hash = base64FromBytes(
        message.next_validators_hash !== undefined
          ? message.next_validators_hash
          : new Uint8Array(),
      ));
    message.consensus_hash !== undefined &&
      (obj.consensus_hash = base64FromBytes(
        message.consensus_hash !== undefined
          ? message.consensus_hash
          : new Uint8Array(),
      ));
    message.app_hash !== undefined &&
      (obj.app_hash = base64FromBytes(
        message.app_hash !== undefined ? message.app_hash : new Uint8Array(),
      ));
    message.last_results_hash !== undefined &&
      (obj.last_results_hash = base64FromBytes(
        message.last_results_hash !== undefined
          ? message.last_results_hash
          : new Uint8Array(),
      ));
    message.evidence_hash !== undefined &&
      (obj.evidence_hash = base64FromBytes(
        message.evidence_hash !== undefined
          ? message.evidence_hash
          : new Uint8Array(),
      ));
    message.proposer_address !== undefined &&
      (obj.proposer_address = base64FromBytes(
        message.proposer_address !== undefined
          ? message.proposer_address
          : new Uint8Array(),
      ));
    message.encrypted_random !== undefined &&
      (obj.encrypted_random = message.encrypted_random
        ? EncryptedRandom.toJSON(message.encrypted_random)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Header>, I>>(object: I): Header {
    const message = createBaseHeader();
    message.version =
      object.version !== undefined && object.version !== null
        ? Consensus.fromPartial(object.version)
        : undefined;
    message.chain_id = object.chain_id ?? "";
    message.height = object.height ?? "0";
    message.time =
      object.time !== undefined && object.time !== null
        ? Timestamp.fromPartial(object.time)
        : undefined;
    message.last_block_id =
      object.last_block_id !== undefined && object.last_block_id !== null
        ? BlockID.fromPartial(object.last_block_id)
        : undefined;
    message.last_commit_hash = object.last_commit_hash ?? new Uint8Array();
    message.data_hash = object.data_hash ?? new Uint8Array();
    message.validators_hash = object.validators_hash ?? new Uint8Array();
    message.next_validators_hash =
      object.next_validators_hash ?? new Uint8Array();
    message.consensus_hash = object.consensus_hash ?? new Uint8Array();
    message.app_hash = object.app_hash ?? new Uint8Array();
    message.last_results_hash = object.last_results_hash ?? new Uint8Array();
    message.evidence_hash = object.evidence_hash ?? new Uint8Array();
    message.proposer_address = object.proposer_address ?? new Uint8Array();
    message.encrypted_random =
      object.encrypted_random !== undefined && object.encrypted_random !== null
        ? EncryptedRandom.fromPartial(object.encrypted_random)
        : undefined;
    return message;
  },
};

function createBaseEncryptedRandom(): EncryptedRandom {
  return { random: new Uint8Array(), proof: new Uint8Array() };
}

export const EncryptedRandom = {
  encode(
    message: EncryptedRandom,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.random.length !== 0) {
      writer.uint32(10).bytes(message.random);
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EncryptedRandom {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptedRandom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.random = reader.bytes();
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EncryptedRandom {
    return {
      random: isSet(object.random)
        ? bytesFromBase64(object.random)
        : new Uint8Array(),
      proof: isSet(object.proof)
        ? bytesFromBase64(object.proof)
        : new Uint8Array(),
    };
  },

  toJSON(message: EncryptedRandom): unknown {
    const obj: any = {};
    message.random !== undefined &&
      (obj.random = base64FromBytes(
        message.random !== undefined ? message.random : new Uint8Array(),
      ));
    message.proof !== undefined &&
      (obj.proof = base64FromBytes(
        message.proof !== undefined ? message.proof : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EncryptedRandom>, I>>(
    object: I,
  ): EncryptedRandom {
    const message = createBaseEncryptedRandom();
    message.random = object.random ?? new Uint8Array();
    message.proof = object.proof ?? new Uint8Array();
    return message;
  },
};

function createBaseData(): Data {
  return { txs: [] };
}

export const Data = {
  encode(message: Data, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Data {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Data {
    return {
      txs: Array.isArray(object?.txs)
        ? object.txs.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: Data): unknown {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.txs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Data>, I>>(object: I): Data {
    const message = createBaseData();
    message.txs = object.txs?.map((e) => e) || [];
    return message;
  },
};

function createBaseVote(): Vote {
  return {
    type: 0,
    height: "0",
    round: 0,
    block_id: undefined,
    timestamp: undefined,
    validator_address: new Uint8Array(),
    validator_index: 0,
    signature: new Uint8Array(),
  };
}

export const Vote = {
  encode(message: Vote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.height !== "0") {
      writer.uint32(16).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(24).int32(message.round);
    }
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(34).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(message.timestamp, writer.uint32(42).fork()).ldelim();
    }
    if (message.validator_address.length !== 0) {
      writer.uint32(50).bytes(message.validator_address);
    }
    if (message.validator_index !== 0) {
      writer.uint32(56).int32(message.validator_index);
    }
    if (message.signature.length !== 0) {
      writer.uint32(66).bytes(message.signature);
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
          message.type = reader.int32() as any;
          break;
        case 2:
          message.height = longToString(reader.int64() as Long);
          break;
        case 3:
          message.round = reader.int32();
          break;
        case 4:
          message.block_id = BlockID.decode(reader, reader.uint32());
          break;
        case 5:
          message.timestamp = Timestamp.decode(reader, reader.uint32());
          break;
        case 6:
          message.validator_address = reader.bytes();
          break;
        case 7:
          message.validator_index = reader.int32();
          break;
        case 8:
          message.signature = reader.bytes();
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
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? Number(object.round) : 0,
      block_id: isSet(object.block_id)
        ? BlockID.fromJSON(object.block_id)
        : undefined,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      validator_address: isSet(object.validator_address)
        ? bytesFromBase64(object.validator_address)
        : new Uint8Array(),
      validator_index: isSet(object.validator_index)
        ? Number(object.validator_index)
        : 0,
      signature: isSet(object.signature)
        ? bytesFromBase64(object.signature)
        : new Uint8Array(),
    };
  },

  toJSON(message: Vote): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = signedMsgTypeToJSON(message.type));
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? BlockID.toJSON(message.block_id)
        : undefined);
    message.timestamp !== undefined &&
      (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
    message.validator_address !== undefined &&
      (obj.validator_address = base64FromBytes(
        message.validator_address !== undefined
          ? message.validator_address
          : new Uint8Array(),
      ));
    message.validator_index !== undefined &&
      (obj.validator_index = Math.round(message.validator_index));
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vote>, I>>(object: I): Vote {
    const message = createBaseVote();
    message.type = object.type ?? 0;
    message.height = object.height ?? "0";
    message.round = object.round ?? 0;
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromPartial(object.block_id)
        : undefined;
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Timestamp.fromPartial(object.timestamp)
        : undefined;
    message.validator_address = object.validator_address ?? new Uint8Array();
    message.validator_index = object.validator_index ?? 0;
    message.signature = object.signature ?? new Uint8Array();
    return message;
  },
};

function createBaseCommit(): Commit {
  return { height: "0", round: 0, block_id: undefined, signatures: [] };
}

export const Commit = {
  encode(
    message: Commit,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(16).int32(message.round);
    }
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.signatures) {
      CommitSig.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Commit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommit();
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
          message.block_id = BlockID.decode(reader, reader.uint32());
          break;
        case 4:
          message.signatures.push(CommitSig.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Commit {
    return {
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? Number(object.round) : 0,
      block_id: isSet(object.block_id)
        ? BlockID.fromJSON(object.block_id)
        : undefined,
      signatures: Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => CommitSig.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Commit): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? BlockID.toJSON(message.block_id)
        : undefined);
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) =>
        e ? CommitSig.toJSON(e) : undefined,
      );
    } else {
      obj.signatures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Commit>, I>>(object: I): Commit {
    const message = createBaseCommit();
    message.height = object.height ?? "0";
    message.round = object.round ?? 0;
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromPartial(object.block_id)
        : undefined;
    message.signatures =
      object.signatures?.map((e) => CommitSig.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCommitSig(): CommitSig {
  return {
    block_id_flag: 0,
    validator_address: new Uint8Array(),
    timestamp: undefined,
    signature: new Uint8Array(),
  };
}

export const CommitSig = {
  encode(
    message: CommitSig,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.block_id_flag !== 0) {
      writer.uint32(8).int32(message.block_id_flag);
    }
    if (message.validator_address.length !== 0) {
      writer.uint32(18).bytes(message.validator_address);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(message.timestamp, writer.uint32(26).fork()).ldelim();
    }
    if (message.signature.length !== 0) {
      writer.uint32(34).bytes(message.signature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitSig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitSig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_id_flag = reader.int32() as any;
          break;
        case 2:
          message.validator_address = reader.bytes();
          break;
        case 3:
          message.timestamp = Timestamp.decode(reader, reader.uint32());
          break;
        case 4:
          message.signature = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommitSig {
    return {
      block_id_flag: isSet(object.block_id_flag)
        ? blockIDFlagFromJSON(object.block_id_flag)
        : 0,
      validator_address: isSet(object.validator_address)
        ? bytesFromBase64(object.validator_address)
        : new Uint8Array(),
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      signature: isSet(object.signature)
        ? bytesFromBase64(object.signature)
        : new Uint8Array(),
    };
  },

  toJSON(message: CommitSig): unknown {
    const obj: any = {};
    message.block_id_flag !== undefined &&
      (obj.block_id_flag = blockIDFlagToJSON(message.block_id_flag));
    message.validator_address !== undefined &&
      (obj.validator_address = base64FromBytes(
        message.validator_address !== undefined
          ? message.validator_address
          : new Uint8Array(),
      ));
    message.timestamp !== undefined &&
      (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommitSig>, I>>(
    object: I,
  ): CommitSig {
    const message = createBaseCommitSig();
    message.block_id_flag = object.block_id_flag ?? 0;
    message.validator_address = object.validator_address ?? new Uint8Array();
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Timestamp.fromPartial(object.timestamp)
        : undefined;
    message.signature = object.signature ?? new Uint8Array();
    return message;
  },
};

function createBaseProposal(): Proposal {
  return {
    type: 0,
    height: "0",
    round: 0,
    pol_round: 0,
    block_id: undefined,
    timestamp: undefined,
    signature: new Uint8Array(),
  };
}

export const Proposal = {
  encode(
    message: Proposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.height !== "0") {
      writer.uint32(16).int64(message.height);
    }
    if (message.round !== 0) {
      writer.uint32(24).int32(message.round);
    }
    if (message.pol_round !== 0) {
      writer.uint32(32).int32(message.pol_round);
    }
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(42).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(message.timestamp, writer.uint32(50).fork()).ldelim();
    }
    if (message.signature.length !== 0) {
      writer.uint32(58).bytes(message.signature);
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
          message.type = reader.int32() as any;
          break;
        case 2:
          message.height = longToString(reader.int64() as Long);
          break;
        case 3:
          message.round = reader.int32();
          break;
        case 4:
          message.pol_round = reader.int32();
          break;
        case 5:
          message.block_id = BlockID.decode(reader, reader.uint32());
          break;
        case 6:
          message.timestamp = Timestamp.decode(reader, reader.uint32());
          break;
        case 7:
          message.signature = reader.bytes();
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
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? Number(object.round) : 0,
      pol_round: isSet(object.pol_round) ? Number(object.pol_round) : 0,
      block_id: isSet(object.block_id)
        ? BlockID.fromJSON(object.block_id)
        : undefined,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      signature: isSet(object.signature)
        ? bytesFromBase64(object.signature)
        : new Uint8Array(),
    };
  },

  toJSON(message: Proposal): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = signedMsgTypeToJSON(message.type));
    message.height !== undefined && (obj.height = message.height);
    message.round !== undefined && (obj.round = Math.round(message.round));
    message.pol_round !== undefined &&
      (obj.pol_round = Math.round(message.pol_round));
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? BlockID.toJSON(message.block_id)
        : undefined);
    message.timestamp !== undefined &&
      (obj.timestamp = fromTimestamp(message.timestamp).toISOString());
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Proposal>, I>>(object: I): Proposal {
    const message = createBaseProposal();
    message.type = object.type ?? 0;
    message.height = object.height ?? "0";
    message.round = object.round ?? 0;
    message.pol_round = object.pol_round ?? 0;
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromPartial(object.block_id)
        : undefined;
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Timestamp.fromPartial(object.timestamp)
        : undefined;
    message.signature = object.signature ?? new Uint8Array();
    return message;
  },
};

function createBaseSignedHeader(): SignedHeader {
  return { header: undefined, commit: undefined };
}

export const SignedHeader = {
  encode(
    message: SignedHeader,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.commit !== undefined) {
      Commit.encode(message.commit, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignedHeader {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignedHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = Header.decode(reader, reader.uint32());
          break;
        case 2:
          message.commit = Commit.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignedHeader {
    return {
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      commit: isSet(object.commit) ? Commit.fromJSON(object.commit) : undefined,
    };
  },

  toJSON(message: SignedHeader): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header ? Header.toJSON(message.header) : undefined);
    message.commit !== undefined &&
      (obj.commit = message.commit ? Commit.toJSON(message.commit) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignedHeader>, I>>(
    object: I,
  ): SignedHeader {
    const message = createBaseSignedHeader();
    message.header =
      object.header !== undefined && object.header !== null
        ? Header.fromPartial(object.header)
        : undefined;
    message.commit =
      object.commit !== undefined && object.commit !== null
        ? Commit.fromPartial(object.commit)
        : undefined;
    return message;
  },
};

function createBaseLightBlock(): LightBlock {
  return { signed_header: undefined, validator_set: undefined };
}

export const LightBlock = {
  encode(
    message: LightBlock,
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LightBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLightBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signed_header = SignedHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.validator_set = ValidatorSet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LightBlock {
    return {
      signed_header: isSet(object.signed_header)
        ? SignedHeader.fromJSON(object.signed_header)
        : undefined,
      validator_set: isSet(object.validator_set)
        ? ValidatorSet.fromJSON(object.validator_set)
        : undefined,
    };
  },

  toJSON(message: LightBlock): unknown {
    const obj: any = {};
    message.signed_header !== undefined &&
      (obj.signed_header = message.signed_header
        ? SignedHeader.toJSON(message.signed_header)
        : undefined);
    message.validator_set !== undefined &&
      (obj.validator_set = message.validator_set
        ? ValidatorSet.toJSON(message.validator_set)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LightBlock>, I>>(
    object: I,
  ): LightBlock {
    const message = createBaseLightBlock();
    message.signed_header =
      object.signed_header !== undefined && object.signed_header !== null
        ? SignedHeader.fromPartial(object.signed_header)
        : undefined;
    message.validator_set =
      object.validator_set !== undefined && object.validator_set !== null
        ? ValidatorSet.fromPartial(object.validator_set)
        : undefined;
    return message;
  },
};

function createBaseBlockMeta(): BlockMeta {
  return {
    block_id: undefined,
    block_size: "0",
    header: undefined,
    num_txs: "0",
  };
}

export const BlockMeta = {
  encode(
    message: BlockMeta,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(10).fork()).ldelim();
    }
    if (message.block_size !== "0") {
      writer.uint32(16).int64(message.block_size);
    }
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(26).fork()).ldelim();
    }
    if (message.num_txs !== "0") {
      writer.uint32(32).int64(message.num_txs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockMeta {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_id = BlockID.decode(reader, reader.uint32());
          break;
        case 2:
          message.block_size = longToString(reader.int64() as Long);
          break;
        case 3:
          message.header = Header.decode(reader, reader.uint32());
          break;
        case 4:
          message.num_txs = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BlockMeta {
    return {
      block_id: isSet(object.block_id)
        ? BlockID.fromJSON(object.block_id)
        : undefined,
      block_size: isSet(object.block_size) ? String(object.block_size) : "0",
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      num_txs: isSet(object.num_txs) ? String(object.num_txs) : "0",
    };
  },

  toJSON(message: BlockMeta): unknown {
    const obj: any = {};
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? BlockID.toJSON(message.block_id)
        : undefined);
    message.block_size !== undefined && (obj.block_size = message.block_size);
    message.header !== undefined &&
      (obj.header = message.header ? Header.toJSON(message.header) : undefined);
    message.num_txs !== undefined && (obj.num_txs = message.num_txs);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BlockMeta>, I>>(
    object: I,
  ): BlockMeta {
    const message = createBaseBlockMeta();
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromPartial(object.block_id)
        : undefined;
    message.block_size = object.block_size ?? "0";
    message.header =
      object.header !== undefined && object.header !== null
        ? Header.fromPartial(object.header)
        : undefined;
    message.num_txs = object.num_txs ?? "0";
    return message;
  },
};

function createBaseTxProof(): TxProof {
  return {
    root_hash: new Uint8Array(),
    data: new Uint8Array(),
    proof: undefined,
  };
}

export const TxProof = {
  encode(
    message: TxProof,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.root_hash.length !== 0) {
      writer.uint32(10).bytes(message.root_hash);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxProof {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.root_hash = reader.bytes();
          break;
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.proof = Proof.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxProof {
    return {
      root_hash: isSet(object.root_hash)
        ? bytesFromBase64(object.root_hash)
        : new Uint8Array(),
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: TxProof): unknown {
    const obj: any = {};
    message.root_hash !== undefined &&
      (obj.root_hash = base64FromBytes(
        message.root_hash !== undefined ? message.root_hash : new Uint8Array(),
      ));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    message.proof !== undefined &&
      (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TxProof>, I>>(object: I): TxProof {
    const message = createBaseTxProof();
    message.root_hash = object.root_hash ?? new Uint8Array();
    message.data = object.data ?? new Uint8Array();
    message.proof =
      object.proof !== undefined && object.proof !== null
        ? Proof.fromPartial(object.proof)
        : undefined;
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
