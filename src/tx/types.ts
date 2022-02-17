import { EncryptionUtils } from "..";

export interface ProtoMsg {
  typeUrl: string;
  value: any;
  encode(): Promise<Uint8Array>;
}

export type AminoMsg = {
  type: string;
  value: any;
};

export interface Msg {
  toProto(utils: EncryptionUtils): Promise<ProtoMsg>;
  toAmino(utils: EncryptionUtils): Promise<AminoMsg>;
}

export interface MsgParams {}
export interface IMsg {
  new (params: MsgParams): Msg;
}

/////////////////////////////////////////////////////
// bank
/////////////////////////////////////////////////////

/**
 * Coin defines a token with a denomination and an amount.
 *
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 */
export type Coin = {
  denom: string;
  amount: string;
};

/** Input models transaction input for MsgMultiSend. */
export type Input = {
  address: string;
  coins: Coin[];
};

/** Output models transaction outputs for MsgMultiSend. */
export type Output = {
  address: string;
  coins: Coin[];
};
