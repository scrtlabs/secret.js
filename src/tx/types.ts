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

/////////////////////////////////////////////////////
// bank
/////////////////////////////////////////////////////

/**
 * Coin defines a token with a denomination and an amount.
 *
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 */
export interface Coin {
  denom: string;
  amount: string;
}

/** Input models transaction input for MsgMultiSend. */
export interface Input {
  address: string;
  coins: Coin[];
}

/** Output models transaction outputs for MsgMultiSend. */
export interface Output {
  address: string;
  coins: Coin[];
}

/////////////////////////////////////////////////////
// staking
/////////////////////////////////////////////////////

/** Description defines a validator description. */
export interface Description {
  /** moniker defines a human-readable name for the validator. */
  moniker: string;
  /** identity defines an optional identity signature (ex. UPort or Keybase). */
  identity: string;
  /** website defines an optional website link. */
  website: string;
  /** security_contact defines an optional email for security contact. */
  securityContact: string;
  /** details define other optional details. */
  details: string;
}
