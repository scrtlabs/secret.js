/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { Plan } from "../../../../cosmos/upgrade/v1beta1/upgrade";
import { Params } from "./client";

export const protobufPackage = "ibc.core.client.v1";

/** MsgCreateClient defines a message to create an IBC client */
export interface MsgCreateClient {
  /** light client state */
  client_state?: Any;
  /**
   * consensus state associated with the client that corresponds to a given
   * height.
   */
  consensus_state?: Any;
  /** signer address */
  signer: string;
}

/** MsgCreateClientResponse defines the Msg/CreateClient response type. */
export interface MsgCreateClientResponse {}

/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using
 * the given client message.
 */
export interface MsgUpdateClient {
  /** client unique identifier */
  client_id: string;
  /** client message to update the light client */
  client_message?: Any;
  /** signer address */
  signer: string;
}

/** MsgUpdateClientResponse defines the Msg/UpdateClient response type. */
export interface MsgUpdateClientResponse {}

/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client
 * state
 */
export interface MsgUpgradeClient {
  /** client unique identifier */
  client_id: string;
  /** upgraded client state */
  client_state?: Any;
  /**
   * upgraded consensus state, only contains enough information to serve as a
   * basis of trust in update logic
   */
  consensus_state?: Any;
  /** proof that old chain committed to new client */
  proof_upgrade_client: Uint8Array;
  /** proof that old chain committed to new consensus state */
  proof_upgrade_consensus_state: Uint8Array;
  /** signer address */
  signer: string;
}

/** MsgUpgradeClientResponse defines the Msg/UpgradeClient response type. */
export interface MsgUpgradeClientResponse {}

/**
 * MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for
 * light client misbehaviour.
 * This message has been deprecated. Use MsgUpdateClient instead.
 *
 * @deprecated
 */
export interface MsgSubmitMisbehaviour {
  /** client unique identifier */
  client_id: string;
  /** misbehaviour used for freezing the light client */
  misbehaviour?: Any;
  /** signer address */
  signer: string;
}

/**
 * MsgSubmitMisbehaviourResponse defines the Msg/SubmitMisbehaviour response
 * type.
 */
export interface MsgSubmitMisbehaviourResponse {}

/** MsgRecoverClient defines the message used to recover a frozen or expired client. */
export interface MsgRecoverClient {
  /** the client identifier for the client to be updated if the proposal passes */
  subject_client_id: string;
  /**
   * the substitute client identifier for the client which will replace the subject
   * client
   */
  substitute_client_id: string;
  /** signer address */
  signer: string;
}

/** MsgRecoverClientResponse defines the Msg/RecoverClient response type. */
export interface MsgRecoverClientResponse {}

/** MsgIBCSoftwareUpgrade defines the message used to schedule an upgrade of an IBC client using a v1 governance proposal */
export interface MsgIBCSoftwareUpgrade {
  plan?: Plan;
  /**
   * An UpgradedClientState must be provided to perform an IBC breaking upgrade.
   * This will make the chain commit to the correct upgraded (self) client state
   * before the upgrade occurs, so that connecting chains can verify that the
   * new upgraded client is valid by verifying a proof on the previous version
   * of the chain. This will allow IBC connections to persist smoothly across
   * planned chain upgrades. Correspondingly, the UpgradedClientState field has been
   * deprecated in the Cosmos SDK to allow for this logic to exist solely in
   * the 02-client module.
   */
  upgraded_client_state?: Any;
  /** signer address */
  signer: string;
}

/** MsgIBCSoftwareUpgradeResponse defines the Msg/IBCSoftwareUpgrade response type. */
export interface MsgIBCSoftwareUpgradeResponse {}

/** MsgUpdateParams defines the sdk.Msg type to update the client parameters. */
export interface MsgUpdateParams {
  /** signer address */
  signer: string;
  /**
   * params defines the client parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params?: Params;
}

/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponse {}

function createBaseMsgCreateClient(): MsgCreateClient {
  return { client_state: undefined, consensus_state: undefined, signer: "" };
}

export const MsgCreateClient = {
  encode(
    message: MsgCreateClient,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.client_state !== undefined) {
      Any.encode(message.client_state, writer.uint32(10).fork()).ldelim();
    }
    if (message.consensus_state !== undefined) {
      Any.encode(message.consensus_state, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateClient {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.client_state = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.consensus_state = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateClient {
    return {
      client_state: isSet(object.client_state)
        ? Any.fromJSON(object.client_state)
        : undefined,
      consensus_state: isSet(object.consensus_state)
        ? Any.fromJSON(object.consensus_state)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgCreateClient): unknown {
    const obj: any = {};
    message.client_state !== undefined &&
      (obj.client_state = message.client_state
        ? Any.toJSON(message.client_state)
        : undefined);
    message.consensus_state !== undefined &&
      (obj.consensus_state = message.consensus_state
        ? Any.toJSON(message.consensus_state)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateClient>): MsgCreateClient {
    const message = createBaseMsgCreateClient();
    message.client_state =
      object.client_state !== undefined && object.client_state !== null
        ? Any.fromPartial(object.client_state)
        : undefined;
    message.consensus_state =
      object.consensus_state !== undefined && object.consensus_state !== null
        ? Any.fromPartial(object.consensus_state)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgCreateClientResponse(): MsgCreateClientResponse {
  return {};
}

export const MsgCreateClientResponse = {
  encode(
    _: MsgCreateClientResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgCreateClientResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateClientResponse();
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

  fromJSON(_: any): MsgCreateClientResponse {
    return {};
  },

  toJSON(_: MsgCreateClientResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgCreateClientResponse>,
  ): MsgCreateClientResponse {
    const message = createBaseMsgCreateClientResponse();
    return message;
  },
};

function createBaseMsgUpdateClient(): MsgUpdateClient {
  return { client_id: "", client_message: undefined, signer: "" };
}

export const MsgUpdateClient = {
  encode(
    message: MsgUpdateClient,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    if (message.client_message !== undefined) {
      Any.encode(message.client_message, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateClient {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.client_id = reader.string();
          break;
        case 2:
          message.client_message = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateClient {
    return {
      client_id: isSet(object.client_id) ? String(object.client_id) : "",
      client_message: isSet(object.client_message)
        ? Any.fromJSON(object.client_message)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgUpdateClient): unknown {
    const obj: any = {};
    message.client_id !== undefined && (obj.client_id = message.client_id);
    message.client_message !== undefined &&
      (obj.client_message = message.client_message
        ? Any.toJSON(message.client_message)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateClient>): MsgUpdateClient {
    const message = createBaseMsgUpdateClient();
    message.client_id = object.client_id ?? "";
    message.client_message =
      object.client_message !== undefined && object.client_message !== null
        ? Any.fromPartial(object.client_message)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgUpdateClientResponse(): MsgUpdateClientResponse {
  return {};
}

export const MsgUpdateClientResponse = {
  encode(
    _: MsgUpdateClientResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpdateClientResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateClientResponse();
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

  fromJSON(_: any): MsgUpdateClientResponse {
    return {};
  },

  toJSON(_: MsgUpdateClientResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpdateClientResponse>,
  ): MsgUpdateClientResponse {
    const message = createBaseMsgUpdateClientResponse();
    return message;
  },
};

function createBaseMsgUpgradeClient(): MsgUpgradeClient {
  return {
    client_id: "",
    client_state: undefined,
    consensus_state: undefined,
    proof_upgrade_client: new Uint8Array(),
    proof_upgrade_consensus_state: new Uint8Array(),
    signer: "",
  };
}

export const MsgUpgradeClient = {
  encode(
    message: MsgUpgradeClient,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    if (message.client_state !== undefined) {
      Any.encode(message.client_state, writer.uint32(18).fork()).ldelim();
    }
    if (message.consensus_state !== undefined) {
      Any.encode(message.consensus_state, writer.uint32(26).fork()).ldelim();
    }
    if (message.proof_upgrade_client.length !== 0) {
      writer.uint32(34).bytes(message.proof_upgrade_client);
    }
    if (message.proof_upgrade_consensus_state.length !== 0) {
      writer.uint32(42).bytes(message.proof_upgrade_consensus_state);
    }
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpgradeClient {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpgradeClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.client_id = reader.string();
          break;
        case 2:
          message.client_state = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.consensus_state = Any.decode(reader, reader.uint32());
          break;
        case 4:
          message.proof_upgrade_client = reader.bytes();
          break;
        case 5:
          message.proof_upgrade_consensus_state = reader.bytes();
          break;
        case 6:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpgradeClient {
    return {
      client_id: isSet(object.client_id) ? String(object.client_id) : "",
      client_state: isSet(object.client_state)
        ? Any.fromJSON(object.client_state)
        : undefined,
      consensus_state: isSet(object.consensus_state)
        ? Any.fromJSON(object.consensus_state)
        : undefined,
      proof_upgrade_client: isSet(object.proof_upgrade_client)
        ? bytesFromBase64(object.proof_upgrade_client)
        : new Uint8Array(),
      proof_upgrade_consensus_state: isSet(object.proof_upgrade_consensus_state)
        ? bytesFromBase64(object.proof_upgrade_consensus_state)
        : new Uint8Array(),
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgUpgradeClient): unknown {
    const obj: any = {};
    message.client_id !== undefined && (obj.client_id = message.client_id);
    message.client_state !== undefined &&
      (obj.client_state = message.client_state
        ? Any.toJSON(message.client_state)
        : undefined);
    message.consensus_state !== undefined &&
      (obj.consensus_state = message.consensus_state
        ? Any.toJSON(message.consensus_state)
        : undefined);
    message.proof_upgrade_client !== undefined &&
      (obj.proof_upgrade_client = base64FromBytes(
        message.proof_upgrade_client !== undefined
          ? message.proof_upgrade_client
          : new Uint8Array(),
      ));
    message.proof_upgrade_consensus_state !== undefined &&
      (obj.proof_upgrade_consensus_state = base64FromBytes(
        message.proof_upgrade_consensus_state !== undefined
          ? message.proof_upgrade_consensus_state
          : new Uint8Array(),
      ));
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpgradeClient>): MsgUpgradeClient {
    const message = createBaseMsgUpgradeClient();
    message.client_id = object.client_id ?? "";
    message.client_state =
      object.client_state !== undefined && object.client_state !== null
        ? Any.fromPartial(object.client_state)
        : undefined;
    message.consensus_state =
      object.consensus_state !== undefined && object.consensus_state !== null
        ? Any.fromPartial(object.consensus_state)
        : undefined;
    message.proof_upgrade_client =
      object.proof_upgrade_client ?? new Uint8Array();
    message.proof_upgrade_consensus_state =
      object.proof_upgrade_consensus_state ?? new Uint8Array();
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgUpgradeClientResponse(): MsgUpgradeClientResponse {
  return {};
}

export const MsgUpgradeClientResponse = {
  encode(
    _: MsgUpgradeClientResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUpgradeClientResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpgradeClientResponse();
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

  fromJSON(_: any): MsgUpgradeClientResponse {
    return {};
  },

  toJSON(_: MsgUpgradeClientResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgUpgradeClientResponse>,
  ): MsgUpgradeClientResponse {
    const message = createBaseMsgUpgradeClientResponse();
    return message;
  },
};

function createBaseMsgSubmitMisbehaviour(): MsgSubmitMisbehaviour {
  return { client_id: "", misbehaviour: undefined, signer: "" };
}

export const MsgSubmitMisbehaviour = {
  encode(
    message: MsgSubmitMisbehaviour,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    if (message.misbehaviour !== undefined) {
      Any.encode(message.misbehaviour, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgSubmitMisbehaviour {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitMisbehaviour();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.client_id = reader.string();
          break;
        case 2:
          message.misbehaviour = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitMisbehaviour {
    return {
      client_id: isSet(object.client_id) ? String(object.client_id) : "",
      misbehaviour: isSet(object.misbehaviour)
        ? Any.fromJSON(object.misbehaviour)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgSubmitMisbehaviour): unknown {
    const obj: any = {};
    message.client_id !== undefined && (obj.client_id = message.client_id);
    message.misbehaviour !== undefined &&
      (obj.misbehaviour = message.misbehaviour
        ? Any.toJSON(message.misbehaviour)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSubmitMisbehaviour>,
  ): MsgSubmitMisbehaviour {
    const message = createBaseMsgSubmitMisbehaviour();
    message.client_id = object.client_id ?? "";
    message.misbehaviour =
      object.misbehaviour !== undefined && object.misbehaviour !== null
        ? Any.fromPartial(object.misbehaviour)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgSubmitMisbehaviourResponse(): MsgSubmitMisbehaviourResponse {
  return {};
}

export const MsgSubmitMisbehaviourResponse = {
  encode(
    _: MsgSubmitMisbehaviourResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgSubmitMisbehaviourResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitMisbehaviourResponse();
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

  fromJSON(_: any): MsgSubmitMisbehaviourResponse {
    return {};
  },

  toJSON(_: MsgSubmitMisbehaviourResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgSubmitMisbehaviourResponse>,
  ): MsgSubmitMisbehaviourResponse {
    const message = createBaseMsgSubmitMisbehaviourResponse();
    return message;
  },
};

function createBaseMsgRecoverClient(): MsgRecoverClient {
  return { subject_client_id: "", substitute_client_id: "", signer: "" };
}

export const MsgRecoverClient = {
  encode(
    message: MsgRecoverClient,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.subject_client_id !== "") {
      writer.uint32(10).string(message.subject_client_id);
    }
    if (message.substitute_client_id !== "") {
      writer.uint32(18).string(message.substitute_client_id);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecoverClient {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecoverClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subject_client_id = reader.string();
          break;
        case 2:
          message.substitute_client_id = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRecoverClient {
    return {
      subject_client_id: isSet(object.subject_client_id)
        ? String(object.subject_client_id)
        : "",
      substitute_client_id: isSet(object.substitute_client_id)
        ? String(object.substitute_client_id)
        : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgRecoverClient): unknown {
    const obj: any = {};
    message.subject_client_id !== undefined &&
      (obj.subject_client_id = message.subject_client_id);
    message.substitute_client_id !== undefined &&
      (obj.substitute_client_id = message.substitute_client_id);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRecoverClient>): MsgRecoverClient {
    const message = createBaseMsgRecoverClient();
    message.subject_client_id = object.subject_client_id ?? "";
    message.substitute_client_id = object.substitute_client_id ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgRecoverClientResponse(): MsgRecoverClientResponse {
  return {};
}

export const MsgRecoverClientResponse = {
  encode(
    _: MsgRecoverClientResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgRecoverClientResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecoverClientResponse();
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

  fromJSON(_: any): MsgRecoverClientResponse {
    return {};
  },

  toJSON(_: MsgRecoverClientResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRecoverClientResponse>,
  ): MsgRecoverClientResponse {
    const message = createBaseMsgRecoverClientResponse();
    return message;
  },
};

function createBaseMsgIBCSoftwareUpgrade(): MsgIBCSoftwareUpgrade {
  return { plan: undefined, upgraded_client_state: undefined, signer: "" };
}

export const MsgIBCSoftwareUpgrade = {
  encode(
    message: MsgIBCSoftwareUpgrade,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.plan !== undefined) {
      Plan.encode(message.plan, writer.uint32(10).fork()).ldelim();
    }
    if (message.upgraded_client_state !== undefined) {
      Any.encode(
        message.upgraded_client_state,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgIBCSoftwareUpgrade {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIBCSoftwareUpgrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.plan = Plan.decode(reader, reader.uint32());
          break;
        case 2:
          message.upgraded_client_state = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgIBCSoftwareUpgrade {
    return {
      plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
      upgraded_client_state: isSet(object.upgraded_client_state)
        ? Any.fromJSON(object.upgraded_client_state)
        : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgIBCSoftwareUpgrade): unknown {
    const obj: any = {};
    message.plan !== undefined &&
      (obj.plan = message.plan ? Plan.toJSON(message.plan) : undefined);
    message.upgraded_client_state !== undefined &&
      (obj.upgraded_client_state = message.upgraded_client_state
        ? Any.toJSON(message.upgraded_client_state)
        : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgIBCSoftwareUpgrade>,
  ): MsgIBCSoftwareUpgrade {
    const message = createBaseMsgIBCSoftwareUpgrade();
    message.plan =
      object.plan !== undefined && object.plan !== null
        ? Plan.fromPartial(object.plan)
        : undefined;
    message.upgraded_client_state =
      object.upgraded_client_state !== undefined &&
      object.upgraded_client_state !== null
        ? Any.fromPartial(object.upgraded_client_state)
        : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgIBCSoftwareUpgradeResponse(): MsgIBCSoftwareUpgradeResponse {
  return {};
}

export const MsgIBCSoftwareUpgradeResponse = {
  encode(
    _: MsgIBCSoftwareUpgradeResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgIBCSoftwareUpgradeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIBCSoftwareUpgradeResponse();
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

  fromJSON(_: any): MsgIBCSoftwareUpgradeResponse {
    return {};
  },

  toJSON(_: MsgIBCSoftwareUpgradeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgIBCSoftwareUpgradeResponse>,
  ): MsgIBCSoftwareUpgradeResponse {
    const message = createBaseMsgIBCSoftwareUpgradeResponse();
    return message;
  },
};

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { signer: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(
    message: MsgUpdateParams,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
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
          message.signer = reader.string();
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
      signer: isSet(object.signer) ? String(object.signer) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.signer !== undefined && (obj.signer = message.signer);
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.signer = object.signer ?? "";
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

/** Msg defines the ibc/client Msg service. */
export interface Msg {
  /** CreateClient defines a rpc handler method for MsgCreateClient. */
  CreateClient(request: MsgCreateClient): Promise<MsgCreateClientResponse>;
  /** UpdateClient defines a rpc handler method for MsgUpdateClient. */
  UpdateClient(request: MsgUpdateClient): Promise<MsgUpdateClientResponse>;
  /** UpgradeClient defines a rpc handler method for MsgUpgradeClient. */
  UpgradeClient(request: MsgUpgradeClient): Promise<MsgUpgradeClientResponse>;
  /** SubmitMisbehaviour defines a rpc handler method for MsgSubmitMisbehaviour. */
  SubmitMisbehaviour(
    request: MsgSubmitMisbehaviour,
  ): Promise<MsgSubmitMisbehaviourResponse>;
  /** RecoverClient defines a rpc handler method for MsgRecoverClient. */
  RecoverClient(request: MsgRecoverClient): Promise<MsgRecoverClientResponse>;
  /** IBCSoftwareUpgrade defines a rpc handler method for MsgIBCSoftwareUpgrade. */
  IBCSoftwareUpgrade(
    request: MsgIBCSoftwareUpgrade,
  ): Promise<MsgIBCSoftwareUpgradeResponse>;
  /** UpdateClientParams defines a rpc handler method for MsgUpdateParams. */
  UpdateClientParams(
    request: MsgUpdateParams,
  ): Promise<MsgUpdateParamsResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateClient = this.CreateClient.bind(this);
    this.UpdateClient = this.UpdateClient.bind(this);
    this.UpgradeClient = this.UpgradeClient.bind(this);
    this.SubmitMisbehaviour = this.SubmitMisbehaviour.bind(this);
    this.RecoverClient = this.RecoverClient.bind(this);
    this.IBCSoftwareUpgrade = this.IBCSoftwareUpgrade.bind(this);
    this.UpdateClientParams = this.UpdateClientParams.bind(this);
  }
  CreateClient(request: MsgCreateClient): Promise<MsgCreateClientResponse> {
    const data = MsgCreateClient.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.client.v1.Msg",
      "CreateClient",
      data,
    );
    return promise.then((data) =>
      MsgCreateClientResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateClient(request: MsgUpdateClient): Promise<MsgUpdateClientResponse> {
    const data = MsgUpdateClient.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.client.v1.Msg",
      "UpdateClient",
      data,
    );
    return promise.then((data) =>
      MsgUpdateClientResponse.decode(new _m0.Reader(data)),
    );
  }

  UpgradeClient(request: MsgUpgradeClient): Promise<MsgUpgradeClientResponse> {
    const data = MsgUpgradeClient.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.client.v1.Msg",
      "UpgradeClient",
      data,
    );
    return promise.then((data) =>
      MsgUpgradeClientResponse.decode(new _m0.Reader(data)),
    );
  }

  SubmitMisbehaviour(
    request: MsgSubmitMisbehaviour,
  ): Promise<MsgSubmitMisbehaviourResponse> {
    const data = MsgSubmitMisbehaviour.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.client.v1.Msg",
      "SubmitMisbehaviour",
      data,
    );
    return promise.then((data) =>
      MsgSubmitMisbehaviourResponse.decode(new _m0.Reader(data)),
    );
  }

  RecoverClient(request: MsgRecoverClient): Promise<MsgRecoverClientResponse> {
    const data = MsgRecoverClient.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.client.v1.Msg",
      "RecoverClient",
      data,
    );
    return promise.then((data) =>
      MsgRecoverClientResponse.decode(new _m0.Reader(data)),
    );
  }

  IBCSoftwareUpgrade(
    request: MsgIBCSoftwareUpgrade,
  ): Promise<MsgIBCSoftwareUpgradeResponse> {
    const data = MsgIBCSoftwareUpgrade.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.client.v1.Msg",
      "IBCSoftwareUpgrade",
      data,
    );
    return promise.then((data) =>
      MsgIBCSoftwareUpgradeResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateClientParams(
    request: MsgUpdateParams,
  ): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(
      "ibc.core.client.v1.Msg",
      "UpdateClientParams",
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
