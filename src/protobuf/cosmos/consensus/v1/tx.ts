/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  BlockParams,
  EvidenceParams,
  ValidatorParams,
  ABCIParams,
} from "../../../tendermint/types/params";

export const protobufPackage = "cosmos.consensus.v1";

/** Since: cosmos-sdk 0.47 */

/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the x/consensus parameters to update.
   * VersionsParams is not included in this Msg because it is tracked
   * separarately in x/upgrade.
   *
   * NOTE: All parameters must be supplied.
   */
  block?: BlockParams;
  evidence?: EvidenceParams;
  validator?: ValidatorParams;
  /** Since: cosmos-sdk 0.50 */
  abci?: ABCIParams;
}

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {}

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    block: undefined,
    evidence: undefined,
    validator: undefined,
    abci: undefined,
  };
}

export const MsgUpdateParams = {
  encode(
    message: MsgUpdateParams,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.block !== undefined) {
      BlockParams.encode(message.block, writer.uint32(18).fork()).ldelim();
    }
    if (message.evidence !== undefined) {
      EvidenceParams.encode(
        message.evidence,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.validator !== undefined) {
      ValidatorParams.encode(
        message.validator,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.abci !== undefined) {
      ABCIParams.encode(message.abci, writer.uint32(42).fork()).ldelim();
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
          message.block = BlockParams.decode(reader, reader.uint32());
          break;
        case 3:
          message.evidence = EvidenceParams.decode(reader, reader.uint32());
          break;
        case 4:
          message.validator = ValidatorParams.decode(reader, reader.uint32());
          break;
        case 5:
          message.abci = ABCIParams.decode(reader, reader.uint32());
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
      block: isSet(object.block)
        ? BlockParams.fromJSON(object.block)
        : undefined,
      evidence: isSet(object.evidence)
        ? EvidenceParams.fromJSON(object.evidence)
        : undefined,
      validator: isSet(object.validator)
        ? ValidatorParams.fromJSON(object.validator)
        : undefined,
      abci: isSet(object.abci) ? ABCIParams.fromJSON(object.abci) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.block !== undefined &&
      (obj.block = message.block
        ? BlockParams.toJSON(message.block)
        : undefined);
    message.evidence !== undefined &&
      (obj.evidence = message.evidence
        ? EvidenceParams.toJSON(message.evidence)
        : undefined);
    message.validator !== undefined &&
      (obj.validator = message.validator
        ? ValidatorParams.toJSON(message.validator)
        : undefined);
    message.abci !== undefined &&
      (obj.abci = message.abci ? ABCIParams.toJSON(message.abci) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.block =
      object.block !== undefined && object.block !== null
        ? BlockParams.fromPartial(object.block)
        : undefined;
    message.evidence =
      object.evidence !== undefined && object.evidence !== null
        ? EvidenceParams.fromPartial(object.evidence)
        : undefined;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? ValidatorParams.fromPartial(object.validator)
        : undefined;
    message.abci =
      object.abci !== undefined && object.abci !== null
        ? ABCIParams.fromPartial(object.abci)
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

/** Msg defines the consensus Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a governance operation for updating the x/consensus module parameters.
   * The authority is defined in the keeper.
   *
   * Since: cosmos-sdk 0.47
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
  }
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.consensus.v1.Msg",
      "UpdateParams",
      data,
    );
    return promise.then((data) =>
      MsgUpdateParamsResponse.decode(new _m0.Reader(data)),
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
