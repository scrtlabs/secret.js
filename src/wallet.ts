import { toBase64, toUtf8 } from "@cosmjs/encoding";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { sha256 } from "@noble/hashes/sha256";
import * as secp256k1 from "@noble/secp256k1";
import { bech32 } from "bech32";
import * as bip32 from "bip32";
import * as bip39 from "bip39";
import { AminoMsg, Coin } from ".";

export const SECRET_COIN_TYPE = 529;

export class Wallet {
  public mnemonic: string;
  public publicKey: Uint8Array;
  public privateKey: Uint8Array;
  public address: string;

  /**
   * @param mnemonic Import mnemonic or generate random if empty
   * @param account The account index in the HD derivation path
   */
  constructor(mnemonic: string = "", account: number = 0) {
    if (mnemonic === "") {
      mnemonic = bip39.generateMnemonic(256);
    }
    this.mnemonic = mnemonic;

    const seed = bip39.mnemonicToSeedSync(this.mnemonic);
    const node = bip32.fromSeed(seed);
    const secretHD = node.derivePath(
      `m/44'/${SECRET_COIN_TYPE}'/0'/0/${account}`,
    );
    const privateKey = secretHD.privateKey;

    if (!privateKey) {
      throw new Error("Failed to derive keypair");
    }

    this.privateKey = new Uint8Array(privateKey);
    this.publicKey = secp256k1.getPublicKey(this.privateKey, true);

    this.address = bech32.encode(
      "secret",
      bech32.toWords(ripemd160(sha256(this.publicKey))),
    );
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    return [
      {
        address: this.address,
        algo: "secp256k1",
        pubkey: this.publicKey,
      },
    ];
  }

  public async signAmino(
    signerAddress: string,
    signDoc: StdSignDoc,
  ): Promise<AminoSignResponse> {
    if (signerAddress !== this.address) {
      throw new Error(`Address ${signerAddress} not found in wallet`);
    }

    const messageHash = sha256(serializeSignDoc(signDoc));

    const signature = await secp256k1.sign(messageHash, this.privateKey, {
      extraEntropy: true,
      der: false,
    });

    return {
      signed: signDoc,
      signature: encodeSecp256k1Signature(this.publicKey, signature),
    };
  }
}

/**
 * Takes a binary pubkey and signature to create a signature object
 *
 * @param pubkey a compressed secp256k1 public key
 * @param signature a 64 byte fixed length representation of secp256k1 signature components r and s
 */
export function encodeSecp256k1Signature(
  pubkey: Uint8Array,
  signature: Uint8Array,
): StdSignature {
  if (signature.length !== 64) {
    throw new Error(
      "Signature must be 64 bytes long. Cosmos SDK uses a 2x32 byte fixed length encoding for the secp256k1 signature integers r and s.",
    );
  }

  return {
    pub_key: encodeSecp256k1Pubkey(pubkey),
    signature: toBase64(signature),
  };
}

export function encodeSecp256k1Pubkey(pubkey: Uint8Array): Pubkey {
  if (pubkey.length !== 33 || (pubkey[0] !== 0x02 && pubkey[0] !== 0x03)) {
    throw new Error(
      "Public key must be compressed secp256k1, i.e. 33 bytes starting with 0x02 or 0x03",
    );
  }
  return {
    type: "tendermint/PubKeySecp256k1",
    value: toBase64(pubkey),
  };
}

export interface AminoSignResponse {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: StdSignDoc;
  readonly signature: StdSignature;
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

export type Algo = "secp256k1" | "ed25519" | "sr25519";

export interface AccountData {
  /** A printable address (typically bech32 encoded) */
  readonly address: string;
  readonly algo: Algo;
  readonly pubkey: Uint8Array;
}

function sortedObject(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sortedObject);
  }
  const sortedKeys = Object.keys(obj).sort();
  const result: Record<string, any> = {};
  // NOTE: Use forEach instead of reduce for performance with large objects eg Wasm code
  sortedKeys.forEach((key) => {
    result[key] = sortedObject(obj[key]);
  });
  return result;
}

/** Returns a JSON string with objects sorted by key, used for Amino signing */
export function sortedJsonStringify(obj: any): string {
  return JSON.stringify(sortedObject(obj));
}

export function serializeSignDoc(signDoc: StdSignDoc): Uint8Array {
  return toUtf8(sortedJsonStringify(signDoc));
}

export interface OfflineDirectSigner {
  readonly getAccounts: () => Promise<readonly AccountData[]>;
  readonly signDirect: (
    signerAddress: string,
    signDoc: import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignDoc,
  ) => Promise<DirectSignResponse>;
}

export interface DirectSignResponse {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignDoc;
  readonly signature: StdSignature;
}

export type OfflineSigner = OfflineAminoSigner | OfflineDirectSigner;

export function isOfflineDirectSigner(
  signer: OfflineSigner,
): signer is OfflineDirectSigner {
  return (signer as OfflineDirectSigner).signDirect !== undefined;
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
