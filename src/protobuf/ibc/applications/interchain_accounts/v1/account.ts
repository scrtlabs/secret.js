/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { BaseAccount } from "../../../../cosmos/auth/v1beta1/auth";

export const protobufPackage = "ibc.applications.interchain_accounts.v1";

/** An InterchainAccount is defined as a BaseAccount & the address of the account owner on the controller chain */
export interface InterchainAccount {
  base_account?: BaseAccount;
  account_owner: string;
}

function createBaseInterchainAccount(): InterchainAccount {
  return { base_account: undefined, account_owner: "" };
}

export const InterchainAccount = {
  encode(
    message: InterchainAccount,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.base_account !== undefined) {
      BaseAccount.encode(
        message.base_account,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.account_owner !== "") {
      writer.uint32(18).string(message.account_owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterchainAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterchainAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.base_account = BaseAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.account_owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InterchainAccount {
    return {
      base_account: isSet(object.base_account)
        ? BaseAccount.fromJSON(object.base_account)
        : undefined,
      account_owner: isSet(object.account_owner)
        ? String(object.account_owner)
        : "",
    };
  },

  toJSON(message: InterchainAccount): unknown {
    const obj: any = {};
    message.base_account !== undefined &&
      (obj.base_account = message.base_account
        ? BaseAccount.toJSON(message.base_account)
        : undefined);
    message.account_owner !== undefined &&
      (obj.account_owner = message.account_owner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InterchainAccount>, I>>(
    object: I,
  ): InterchainAccount {
    const message = createBaseInterchainAccount();
    message.base_account =
      object.base_account !== undefined && object.base_account !== null
        ? BaseAccount.fromPartial(object.base_account)
        : undefined;
    message.account_owner = object.account_owner ?? "";
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
