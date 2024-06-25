/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Permissions, GenesisAccountPermissions } from "./types";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";

export const protobufPackage = "cosmos.circuit.v1";

/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequest {
  address: string;
}

/** AccountResponse is the response type for the Query/Account RPC method. */
export interface AccountResponse {
  permission?: Permissions;
}

/** QueryAccountsRequest is the request type for the Query/Accounts RPC method. */
export interface QueryAccountsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** AccountsResponse is the response type for the Query/Accounts RPC method. */
export interface AccountsResponse {
  accounts: GenesisAccountPermissions[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryDisableListRequest is the request type for the Query/DisabledList RPC method. */
export interface QueryDisabledListRequest {}

/** DisabledListResponse is the response type for the Query/DisabledList RPC method. */
export interface DisabledListResponse {
  disabled_list: string[];
}

function createBaseQueryAccountRequest(): QueryAccountRequest {
  return { address: "" };
}

export const QueryAccountRequest = {
  encode(
    message: QueryAccountRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryAccountRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAccountRequest>): QueryAccountRequest {
    const message = createBaseQueryAccountRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseAccountResponse(): AccountResponse {
  return { permission: undefined };
}

export const AccountResponse = {
  encode(
    message: AccountResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.permission !== undefined) {
      Permissions.encode(message.permission, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.permission = Permissions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountResponse {
    return {
      permission: isSet(object.permission)
        ? Permissions.fromJSON(object.permission)
        : undefined,
    };
  },

  toJSON(message: AccountResponse): unknown {
    const obj: any = {};
    message.permission !== undefined &&
      (obj.permission = message.permission
        ? Permissions.toJSON(message.permission)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<AccountResponse>): AccountResponse {
    const message = createBaseAccountResponse();
    message.permission =
      object.permission !== undefined && object.permission !== null
        ? Permissions.fromPartial(object.permission)
        : undefined;
    return message;
  },
};

function createBaseQueryAccountsRequest(): QueryAccountsRequest {
  return { pagination: undefined };
}

export const QueryAccountsRequest = {
  encode(
    message: QueryAccountsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryAccountsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAccountsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAccountsRequest>): QueryAccountsRequest {
    const message = createBaseQueryAccountsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseAccountsResponse(): AccountsResponse {
  return { accounts: [], pagination: undefined };
}

export const AccountsResponse = {
  encode(
    message: AccountsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.accounts) {
      GenesisAccountPermissions.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accounts.push(
            GenesisAccountPermissions.decode(reader, reader.uint32()),
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccountsResponse {
    return {
      accounts: Array.isArray(object?.accounts)
        ? object.accounts.map((e: any) => GenesisAccountPermissions.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: AccountsResponse): unknown {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map((e) =>
        e ? GenesisAccountPermissions.toJSON(e) : undefined,
      );
    } else {
      obj.accounts = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<AccountsResponse>): AccountsResponse {
    const message = createBaseAccountsResponse();
    message.accounts =
      object.accounts?.map((e) => GenesisAccountPermissions.fromPartial(e)) ||
      [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryDisabledListRequest(): QueryDisabledListRequest {
  return {};
}

export const QueryDisabledListRequest = {
  encode(
    _: QueryDisabledListRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryDisabledListRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDisabledListRequest();
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

  fromJSON(_: any): QueryDisabledListRequest {
    return {};
  },

  toJSON(_: QueryDisabledListRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryDisabledListRequest>,
  ): QueryDisabledListRequest {
    const message = createBaseQueryDisabledListRequest();
    return message;
  },
};

function createBaseDisabledListResponse(): DisabledListResponse {
  return { disabled_list: [] };
}

export const DisabledListResponse = {
  encode(
    message: DisabledListResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.disabled_list) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): DisabledListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDisabledListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.disabled_list.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DisabledListResponse {
    return {
      disabled_list: Array.isArray(object?.disabled_list)
        ? object.disabled_list.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: DisabledListResponse): unknown {
    const obj: any = {};
    if (message.disabled_list) {
      obj.disabled_list = message.disabled_list.map((e) => e);
    } else {
      obj.disabled_list = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<DisabledListResponse>): DisabledListResponse {
    const message = createBaseDisabledListResponse();
    message.disabled_list = object.disabled_list?.map((e) => e) || [];
    return message;
  },
};

/** Query defines the circuit gRPC querier service. */
export interface Query {
  /** Account returns account permissions. */
  Account(request: QueryAccountRequest): Promise<AccountResponse>;
  /** Account returns account permissions. */
  Accounts(request: QueryAccountsRequest): Promise<AccountsResponse>;
  /** DisabledList returns a list of disabled message urls */
  DisabledList(
    request: QueryDisabledListRequest,
  ): Promise<DisabledListResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Account = this.Account.bind(this);
    this.Accounts = this.Accounts.bind(this);
    this.DisabledList = this.DisabledList.bind(this);
  }
  Account(request: QueryAccountRequest): Promise<AccountResponse> {
    const data = QueryAccountRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.circuit.v1.Query",
      "Account",
      data,
    );
    return promise.then((data) => AccountResponse.decode(new _m0.Reader(data)));
  }

  Accounts(request: QueryAccountsRequest): Promise<AccountsResponse> {
    const data = QueryAccountsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.circuit.v1.Query",
      "Accounts",
      data,
    );
    return promise.then((data) =>
      AccountsResponse.decode(new _m0.Reader(data)),
    );
  }

  DisabledList(
    request: QueryDisabledListRequest,
  ): Promise<DisabledListResponse> {
    const data = QueryDisabledListRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.circuit.v1.Query",
      "DisabledList",
      data,
    );
    return promise.then((data) =>
      DisabledListResponse.decode(new _m0.Reader(data)),
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
