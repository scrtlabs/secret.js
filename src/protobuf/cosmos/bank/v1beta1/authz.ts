/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.bank.v1beta1";

/**
 * SendAuthorization allows the grantee to spend up to spend_limit coins from
 * the granter's account.
 *
 * Since: cosmos-sdk 0.43
 */
export interface SendAuthorization {
  spend_limit: Coin[];
  /**
   * allow_list specifies an optional list of addresses to whom the grantee can send tokens on behalf of the
   * granter. If omitted, any recipient is allowed.
   *
   * Since: cosmos-sdk 0.47
   */
  allow_list: string[];
}

function createBaseSendAuthorization(): SendAuthorization {
  return { spend_limit: [], allow_list: [] };
}

export const SendAuthorization = {
  encode(
    message: SendAuthorization,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.spend_limit) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.allow_list) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendAuthorization {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spend_limit.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.allow_list.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendAuthorization {
    return {
      spend_limit: Array.isArray(object?.spend_limit)
        ? object.spend_limit.map((e: any) => Coin.fromJSON(e))
        : [],
      allow_list: Array.isArray(object?.allow_list)
        ? object.allow_list.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: SendAuthorization): unknown {
    const obj: any = {};
    if (message.spend_limit) {
      obj.spend_limit = message.spend_limit.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.spend_limit = [];
    }
    if (message.allow_list) {
      obj.allow_list = message.allow_list.map((e) => e);
    } else {
      obj.allow_list = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SendAuthorization>): SendAuthorization {
    const message = createBaseSendAuthorization();
    message.spend_limit =
      object.spend_limit?.map((e) => Coin.fromPartial(e)) || [];
    message.allow_list = object.allow_list?.map((e) => e) || [];
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
