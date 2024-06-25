/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Permissions } from "./types";

export const protobufPackage = "cosmos.circuit.v1";

/** MsgAuthorizeCircuitBreaker defines the Msg/AuthorizeCircuitBreaker request type. */
export interface MsgAuthorizeCircuitBreaker {
  /**
   * granter is the granter of the circuit breaker permissions and must have
   * LEVEL_SUPER_ADMIN.
   */
  granter: string;
  /** grantee is the account authorized with the provided permissions. */
  grantee: string;
  /**
   * permissions are the circuit breaker permissions that the grantee receives.
   * These will overwrite any existing permissions. LEVEL_NONE_UNSPECIFIED can
   * be specified to revoke all permissions.
   */
  permissions?: Permissions;
}

/** MsgAuthorizeCircuitBreakerResponse defines the Msg/AuthorizeCircuitBreaker response type. */
export interface MsgAuthorizeCircuitBreakerResponse {
  success: boolean;
}

/** MsgTripCircuitBreaker defines the Msg/TripCircuitBreaker request type. */
export interface MsgTripCircuitBreaker {
  /** authority is the account authorized to trip the circuit breaker. */
  authority: string;
  /**
   * msg_type_urls specifies a list of type URLs to immediately stop processing.
   * IF IT IS LEFT EMPTY, ALL MSG PROCESSING WILL STOP IMMEDIATELY.
   * This value is validated against the authority's permissions and if the
   * authority does not have permissions to trip the specified msg type URLs
   * (or all URLs), the operation will fail.
   */
  msg_type_urls: string[];
}

/** MsgTripCircuitBreakerResponse defines the Msg/TripCircuitBreaker response type. */
export interface MsgTripCircuitBreakerResponse {
  success: boolean;
}

/** MsgResetCircuitBreaker defines the Msg/ResetCircuitBreaker request type. */
export interface MsgResetCircuitBreaker {
  /** authority is the account authorized to trip or reset the circuit breaker. */
  authority: string;
  /**
   * msg_type_urls specifies a list of Msg type URLs to resume processing. If
   * it is left empty all Msg processing for type URLs that the account is
   * authorized to trip will resume.
   */
  msg_type_urls: string[];
}

/** MsgResetCircuitBreakerResponse defines the Msg/ResetCircuitBreaker response type. */
export interface MsgResetCircuitBreakerResponse {
  success: boolean;
}

function createBaseMsgAuthorizeCircuitBreaker(): MsgAuthorizeCircuitBreaker {
  return { granter: "", grantee: "", permissions: undefined };
}

export const MsgAuthorizeCircuitBreaker = {
  encode(
    message: MsgAuthorizeCircuitBreaker,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.permissions !== undefined) {
      Permissions.encode(
        message.permissions,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgAuthorizeCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorizeCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.granter = reader.string();
          break;
        case 2:
          message.grantee = reader.string();
          break;
        case 3:
          message.permissions = Permissions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAuthorizeCircuitBreaker {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      permissions: isSet(object.permissions)
        ? Permissions.fromJSON(object.permissions)
        : undefined,
    };
  },

  toJSON(message: MsgAuthorizeCircuitBreaker): unknown {
    const obj: any = {};
    message.granter !== undefined && (obj.granter = message.granter);
    message.grantee !== undefined && (obj.grantee = message.grantee);
    message.permissions !== undefined &&
      (obj.permissions = message.permissions
        ? Permissions.toJSON(message.permissions)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgAuthorizeCircuitBreaker>,
  ): MsgAuthorizeCircuitBreaker {
    const message = createBaseMsgAuthorizeCircuitBreaker();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.permissions =
      object.permissions !== undefined && object.permissions !== null
        ? Permissions.fromPartial(object.permissions)
        : undefined;
    return message;
  },
};

function createBaseMsgAuthorizeCircuitBreakerResponse(): MsgAuthorizeCircuitBreakerResponse {
  return { success: false };
}

export const MsgAuthorizeCircuitBreakerResponse = {
  encode(
    message: MsgAuthorizeCircuitBreakerResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgAuthorizeCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorizeCircuitBreakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAuthorizeCircuitBreakerResponse {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
    };
  },

  toJSON(message: MsgAuthorizeCircuitBreakerResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgAuthorizeCircuitBreakerResponse>,
  ): MsgAuthorizeCircuitBreakerResponse {
    const message = createBaseMsgAuthorizeCircuitBreakerResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseMsgTripCircuitBreaker(): MsgTripCircuitBreaker {
  return { authority: "", msg_type_urls: [] };
}

export const MsgTripCircuitBreaker = {
  encode(
    message: MsgTripCircuitBreaker,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.msg_type_urls) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgTripCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTripCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.msg_type_urls.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTripCircuitBreaker {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      msg_type_urls: Array.isArray(object?.msg_type_urls)
        ? object.msg_type_urls.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: MsgTripCircuitBreaker): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.msg_type_urls) {
      obj.msg_type_urls = message.msg_type_urls.map((e) => e);
    } else {
      obj.msg_type_urls = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgTripCircuitBreaker>,
  ): MsgTripCircuitBreaker {
    const message = createBaseMsgTripCircuitBreaker();
    message.authority = object.authority ?? "";
    message.msg_type_urls = object.msg_type_urls?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgTripCircuitBreakerResponse(): MsgTripCircuitBreakerResponse {
  return { success: false };
}

export const MsgTripCircuitBreakerResponse = {
  encode(
    message: MsgTripCircuitBreakerResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgTripCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTripCircuitBreakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTripCircuitBreakerResponse {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
    };
  },

  toJSON(message: MsgTripCircuitBreakerResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgTripCircuitBreakerResponse>,
  ): MsgTripCircuitBreakerResponse {
    const message = createBaseMsgTripCircuitBreakerResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseMsgResetCircuitBreaker(): MsgResetCircuitBreaker {
  return { authority: "", msg_type_urls: [] };
}

export const MsgResetCircuitBreaker = {
  encode(
    message: MsgResetCircuitBreaker,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.msg_type_urls) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgResetCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgResetCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 3:
          message.msg_type_urls.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgResetCircuitBreaker {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      msg_type_urls: Array.isArray(object?.msg_type_urls)
        ? object.msg_type_urls.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: MsgResetCircuitBreaker): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.msg_type_urls) {
      obj.msg_type_urls = message.msg_type_urls.map((e) => e);
    } else {
      obj.msg_type_urls = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgResetCircuitBreaker>,
  ): MsgResetCircuitBreaker {
    const message = createBaseMsgResetCircuitBreaker();
    message.authority = object.authority ?? "";
    message.msg_type_urls = object.msg_type_urls?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgResetCircuitBreakerResponse(): MsgResetCircuitBreakerResponse {
  return { success: false };
}

export const MsgResetCircuitBreakerResponse = {
  encode(
    message: MsgResetCircuitBreakerResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgResetCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgResetCircuitBreakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgResetCircuitBreakerResponse {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
    };
  },

  toJSON(message: MsgResetCircuitBreakerResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgResetCircuitBreakerResponse>,
  ): MsgResetCircuitBreakerResponse {
    const message = createBaseMsgResetCircuitBreakerResponse();
    message.success = object.success ?? false;
    return message;
  },
};

/** Msg defines the circuit Msg service. */
export interface Msg {
  /**
   * AuthorizeCircuitBreaker allows a super-admin to grant (or revoke) another
   * account's circuit breaker permissions.
   */
  AuthorizeCircuitBreaker(
    request: MsgAuthorizeCircuitBreaker,
  ): Promise<MsgAuthorizeCircuitBreakerResponse>;
  /** TripCircuitBreaker pauses processing of Msg's in the state machine. */
  TripCircuitBreaker(
    request: MsgTripCircuitBreaker,
  ): Promise<MsgTripCircuitBreakerResponse>;
  /**
   * ResetCircuitBreaker resumes processing of Msg's in the state machine that
   * have been been paused using TripCircuitBreaker.
   */
  ResetCircuitBreaker(
    request: MsgResetCircuitBreaker,
  ): Promise<MsgResetCircuitBreakerResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AuthorizeCircuitBreaker = this.AuthorizeCircuitBreaker.bind(this);
    this.TripCircuitBreaker = this.TripCircuitBreaker.bind(this);
    this.ResetCircuitBreaker = this.ResetCircuitBreaker.bind(this);
  }
  AuthorizeCircuitBreaker(
    request: MsgAuthorizeCircuitBreaker,
  ): Promise<MsgAuthorizeCircuitBreakerResponse> {
    const data = MsgAuthorizeCircuitBreaker.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.circuit.v1.Msg",
      "AuthorizeCircuitBreaker",
      data,
    );
    return promise.then((data) =>
      MsgAuthorizeCircuitBreakerResponse.decode(new _m0.Reader(data)),
    );
  }

  TripCircuitBreaker(
    request: MsgTripCircuitBreaker,
  ): Promise<MsgTripCircuitBreakerResponse> {
    const data = MsgTripCircuitBreaker.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.circuit.v1.Msg",
      "TripCircuitBreaker",
      data,
    );
    return promise.then((data) =>
      MsgTripCircuitBreakerResponse.decode(new _m0.Reader(data)),
    );
  }

  ResetCircuitBreaker(
    request: MsgResetCircuitBreaker,
  ): Promise<MsgResetCircuitBreakerResponse> {
    const data = MsgResetCircuitBreaker.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.circuit.v1.Msg",
      "ResetCircuitBreaker",
      data,
    );
    return promise.then((data) =>
      MsgResetCircuitBreakerResponse.decode(new _m0.Reader(data)),
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
