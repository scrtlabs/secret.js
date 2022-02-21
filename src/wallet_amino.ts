import { fromBase64, toBase64, toUtf8 } from "@cosmjs/encoding";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { sha256 } from "@noble/hashes/sha256";
import * as secp256k1 from "@noble/secp256k1";
import { bech32 } from "bech32";
import * as bip32 from "bip32";
import * as bip39 from "bip39";
import { AminoMsg, Coin } from ".";

export const SECRET_COIN_TYPE = 529;
export const SECRET_BECH32_PREFIX = "secret";

export type WalletOptions = {
  hdAccountIndex?: number;
  coinType?: number;
  bech32Prefix?: string;
};

/**
 * AminoWallet is a wallet capable of signing on the legacy Amino encoding.
 * Amino encoding is still a must-use when signing with Ledger and thus still
 * supported in the chain, but is phased out slowly.
 *
 * In secret.js AminoWallet is mainly used for testing and should not be used
 * for anyhting else. The reason is that some Msg types don't support Amino
 * encoding anymore and thus won't work with this wallet (and Ledger).
 * Msgs that do support Amino encoding also must encode with Protobuf,
 * so if a Msg is working as intended with AminoWallet, it'll also work with {@link Wallet}.
 *
 * For reference, even txs that are signed using Amino, are sent to the chain
 * using Protobuf encoding, so inside the chain the tx is converted to Amino
 * in order to verify the signature.
 * */
export class AminoWallet {
  /** The mnemonic phrase used to derive this account */
  public readonly mnemonic: string;
  /** The account index in the HD derivation path */
  public readonly hdAccountIndex: number;
  /** The coin type in the HD derivation path */
  public readonly coinType: number;
  /** The secp256k1 private key that was derived from `mnemonic` + `hdAccountIndex` */
  public readonly privateKey: Uint8Array;
  /** The secp256k1 public key that was derived from `privateKey` */
  public readonly publicKey: Uint8Array;
  /** The account's secret address, derived from `publicKey` */
  public readonly address: string;
  /** The bech32 prefix for the account's address  */
  private readonly bech32Prefix: string;

  /**
   * @param {String} mnemonic Import mnemonic or generate random if empty
   * @param {Number} [options.hdAccountIndex] The account index in the HD derivation path. Defaults to `0`.
   * @param {Number} [options.coinType] The coin type in the HD derivation path. Defalts to Secret's `529`.
   * @param {String} [options.bech32Prefix] The bech32 prefix for the account's address. Defaults tp `"secret"`
   */
  constructor(mnemonic: string = "", options: WalletOptions = {}) {
    if (mnemonic === "") {
      mnemonic = bip39.generateMnemonic(256 /* 24 words */);
    }
    this.mnemonic = mnemonic;

    this.hdAccountIndex = options.hdAccountIndex ?? 0;
    this.coinType = options.coinType ?? SECRET_COIN_TYPE;
    this.bech32Prefix = options.bech32Prefix ?? SECRET_BECH32_PREFIX;

    const seed = bip39.mnemonicToSeedSync(this.mnemonic);
    const node = bip32.fromSeed(seed);
    const secretHD = node.derivePath(
      `m/44'/${this.coinType}'/0'/0/${this.hdAccountIndex}`,
    );
    const privateKey = secretHD.privateKey;

    if (!privateKey) {
      throw new Error("Failed to derive keypair");
    }

    this.privateKey = new Uint8Array(privateKey);
    this.publicKey = secp256k1.getPublicKey(this.privateKey, true);

    this.address = pubkeyToAddress(this.publicKey, this.bech32Prefix);
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

    const messageHash = sha256(serializeStdSignDoc(signDoc));

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
 * Convert a secp256k1 compressed public key to a secret address
 *
 * @param {Uint8Array} pubkey The account's pubkey, should be 33 bytes (compressed secp256k1)
 * @param {String} [prefix="secret"] The address' bech32 prefix, e.g. "secret", "cosmos", "terra". Defaults to `"secret"`.
 * @returns the account's secret address
 */
export function pubkeyToAddress(
  pubkey: Uint8Array,
  prefix: string = "secret",
): string {
  return bech32.encode(prefix, bech32.toWords(ripemd160(sha256(pubkey))));
}

/**
 * Convert a secp256k1 compressed public key to a secret address
 *
 * @param {Uint8Array} pubkey The account's pubkey as base64 string, should be 33 bytes (compressed secp256k1)
 * @param {String} [prefix="secret"] The address' bech32 prefix, e.g. "secret", "cosmos", "terra". Defaults to `"secret"`.
 * @returns the account's secret address
 */
export function base64PubkeyToAddress(
  pubkey: string,
  prefix: string = "secret",
): string {
  return bech32.encode(
    prefix,
    bech32.toWords(ripemd160(sha256(fromBase64(pubkey)))),
  );
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

export type AminoSignResponse = {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: StdSignDoc;
  readonly signature: StdSignature;
};

/**
 * The document to be signed
 *
 * @see https://docs.cosmos.network/master/modules/auth/03_types.html#stdsigndoc
 */
export type StdSignDoc = {
  readonly chain_id: string;
  readonly account_number: string;
  readonly sequence: string;
  readonly fee: StdFee;
  readonly msgs: readonly AminoMsg[];
  readonly memo: string;
};

export type StdFee = {
  readonly amount: readonly Coin[];
  readonly gas: string;
};

export type StdSignature = {
  readonly pub_key: Pubkey;
  readonly signature: string;
};

export type Pubkey = {
  // type is one of the strings defined in pubkeyType
  // I don't use a string literal union here as that makes trouble with json test data:
  // https://github.com/cosmos/cosmjs/pull/44#pullrequestreview-353280504
  readonly type: string;
  readonly value: any;
};

type Algo = "secp256k1" | "ed25519" | "sr25519";

export type AccountData = {
  /** A printable address (typically bech32 encoded) */
  readonly address: string;
  readonly algo: Algo;
  readonly pubkey: Uint8Array;
};

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
function JsonSortedStringify(obj: any): string {
  return JSON.stringify(sortedObject(obj));
}

function serializeStdSignDoc(signDoc: StdSignDoc): Uint8Array {
  return toUtf8(JsonSortedStringify(signDoc));
}

export type DirectSigner = {
  readonly getAccounts: () => Promise<readonly AccountData[]>;
  readonly signDirect: (
    signerAddress: string,
    signDoc: import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignDoc,
  ) => Promise<DirectSignResponse>;
};

export type DirectSignResponse = {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignDoc;
  readonly signature: StdSignature;
};

export type Signer = AminoSigner | DirectSigner;

export function isOfflineDirectSigner(signer: Signer): signer is DirectSigner {
  return (signer as DirectSigner).signDirect !== undefined;
}

export interface AminoSigner {
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
