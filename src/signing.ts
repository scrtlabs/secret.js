// This entire file was extracted from cosmjs@0.27.1
// Because it doesn't make sure that its dependencies are valid typescript

import { fromBase64 } from "@cosmjs/encoding";
import { AminoMsg, Coin } from ".";
import { LegacyAminoPubKey } from "./protobuf_stuff/cosmos/crypto/multisig/keys";
import { PubKey } from "./protobuf_stuff/cosmos/crypto/secp256k1/keys";
import { SignMode } from "./protobuf_stuff/cosmos/tx/signing/v1beta1/signing";
import {
  AuthInfo,
  SignDoc,
  SignerInfo,
} from "./protobuf_stuff/cosmos/tx/v1beta1/tx";
import { Any } from "./protobuf_stuff/google/protobuf/any";

/**
 * Signing information for a single signer that is not included in the transaction.
 *
 * @see https://github.com/cosmos/cosmos-sdk/blob/v0.42.2/x/auth/signing/sign_mode_handler.go#L23-L37
 */
export interface SignerData {
  readonly accountNumber: number;
  readonly sequence: number;
  readonly chainId: string;
}

/**
 * A pubkey which contains the data directly without further nesting.
 *
 * You can think of this as a non-multisig pubkey.
 */
export interface SinglePubkey extends Pubkey {
  // type is one of the strings defined in pubkeyType
  // I don't use a string literal union here as that makes trouble with json test data:
  // https://github.com/cosmos/cosmjs/pull/44#pullrequestreview-353280504
  readonly type: string;
  /**
   * The base64 encoding of the Amino binary encoded pubkey.
   *
   * Note: if type is Secp256k1, this must contain a 33 bytes compressed pubkey.
   */
  readonly value: string;
}

export interface Secp256k1Pubkey extends SinglePubkey {
  readonly type: "tendermint/PubKeySecp256k1";
  readonly value: string;
}

export function isSecp256k1Pubkey(pubkey: Pubkey): pubkey is Secp256k1Pubkey {
  return (pubkey as Secp256k1Pubkey).type === "tendermint/PubKeySecp256k1";
}

export function isMultisigThresholdPubkey(
  pubkey: Pubkey,
): pubkey is MultisigThresholdPubkey {
  return (
    (pubkey as MultisigThresholdPubkey).type ===
    "tendermint/PubKeyMultisigThreshold"
  );
}

export interface MultisigThresholdPubkey extends Pubkey {
  readonly type: "tendermint/PubKeyMultisigThreshold";
  readonly value: {
    /** A string-encoded integer */
    readonly threshold: string;
    readonly pubkeys: readonly SinglePubkey[];
  };
}

export function encodePubkey(pubkey: Pubkey): Any {
  if (isSecp256k1Pubkey(pubkey)) {
    const pubkeyProto = PubKey.fromPartial({
      key: fromBase64(pubkey.value),
    });
    return Any.fromPartial({
      typeUrl: "/cosmos.crypto.secp256k1.PubKey",
      value: Uint8Array.from(PubKey.encode(pubkeyProto).finish()),
    });
  } else if (isMultisigThresholdPubkey(pubkey)) {
    const pubkeyProto = LegacyAminoPubKey.fromPartial({
      threshold: Number(pubkey.value.threshold),
      publicKeys: pubkey.value.pubkeys.map(encodePubkey),
    });
    return Any.fromPartial({
      typeUrl: "/cosmos.crypto.multisig.LegacyAminoPubKey",
      value: Uint8Array.from(LegacyAminoPubKey.encode(pubkeyProto).finish()),
    });
  } else {
    throw new Error(`Pubkey type ${pubkey.type} not recognized`);
  }
}

/**
 * Creates and serializes an AuthInfo document.
 *
 * This implementation does not support different signing modes for the different signers.
 */
export function makeAuthInfoBytes(
  signers: ReadonlyArray<{ readonly pubkey: Any; readonly sequence: number }>,
  feeAmount: readonly Coin[],
  gasLimit: number,
  signMode = SignMode.SIGN_MODE_DIRECT,
): Uint8Array {
  const authInfo = {
    signerInfos: makeSignerInfos(signers, signMode),
    fee: {
      amount: [...feeAmount],
      gasLimit: String(gasLimit),
    },
  };
  return AuthInfo.encode(AuthInfo.fromPartial(authInfo)).finish();
}

/**
 * Create signer infos from the provided signers.
 *
 * This implementation does not support different signing modes for the different signers.
 */
function makeSignerInfos(
  signers: ReadonlyArray<{ readonly pubkey: Any; readonly sequence: number }>,
  signMode: SignMode,
): SignerInfo[] {
  return signers.map(
    ({ pubkey, sequence }): SignerInfo => ({
      publicKey: pubkey,
      modeInfo: {
        single: { mode: signMode },
      },
      sequence: String(sequence),
    }),
  );
}

export function makeSignDoc(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  chainId: string,
  accountNumber: number,
): SignDoc {
  return {
    bodyBytes: bodyBytes,
    authInfoBytes: authInfoBytes,
    chainId: chainId,
    accountNumber: String(accountNumber),
  };
}

export interface OfflineDirectSigner {
  readonly getAccounts: () => Promise<readonly AccountData[]>;
  readonly signDirect: (
    signerAddress: string,
    signDoc: SignDoc,
  ) => Promise<DirectSignResponse>;
}

export interface DirectSignResponse {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: SignDoc;
  readonly signature: StdSignature;
}

export type OfflineSigner = OfflineAminoSigner | OfflineDirectSigner;

export function isOfflineDirectSigner(
  signer: OfflineSigner,
): signer is OfflineDirectSigner {
  return (signer as OfflineDirectSigner).signDirect !== undefined;
}

export type Algo = "secp256k1" | "ed25519" | "sr25519";

export interface AccountData {
  /** A printable address (typically bech32 encoded) */
  readonly address: string;
  readonly algo: Algo;
  readonly pubkey: Uint8Array;
}

export interface OfflineAminoSigner {
  /**
   * Get AccountData array from wallet. Rejects if not enabled.
   */
  readonly getAccounts: () => Promise<readonly AccountData[]>;

  /**
   * Request signature from whichever key corresponds to provided bech32-encoded address. Rejects if not enabled.
   *
   * The signer implementation may offer the user the ability to override parts of the signDoc. It must
   * return the doc that was signed in the response.
   *
   * @param signerAddress The address of the account that should sign the transaction
   * @param signDoc The content that should be signed
   */
  readonly signAmino: (
    signerAddress: string,
    signDoc: StdSignDoc,
  ) => Promise<AminoSignResponse>;
}

export interface AminoSignResponse {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: StdSignDoc;
  readonly signature: StdSignature;
}

export interface StdSignature {
  readonly pub_key: Pubkey;
  readonly signature: string;
}

export interface Pubkey {
  // type is one of the strings defined in pubkeyType
  // I don't use a string literal union here as that makes trouble with json test data:
  // https://github.com/cosmos/cosmjs/pull/44#pullrequestreview-353280504
  readonly type: string;
  readonly value: any;
}

/**
 * The document to be signed
 *
 * @see https://docs.cosmos.network/master/modules/auth/03_types.html#stdsigndoc
 */
export interface StdSignDoc {
  readonly chain_id: string;
  readonly account_number: string;
  readonly sequence: string;
  readonly fee: StdFee;
  readonly msgs: readonly AminoMsg[];
  readonly memo: string;
}

export interface StdFee {
  readonly amount: readonly Coin[];
  readonly gas: string;
}
