import {
  encodeSecp256k1Signature,
  Secp256k1HdWalletOptions,
  serializeSignDoc,
} from "@cosmjs/amino";
import { fromHex, toAscii } from "@cosmjs/encoding";
import { hmac } from "@noble/hashes/hmac";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { sha256 } from "@noble/hashes/sha256";
import { sha512 } from "@noble/hashes/sha512";
import { bech32 } from "bech32";
import BN from "bn.js";
import elliptic from "elliptic";
import secureRandom from "secure-random";
import {
  AccountData,
  AminoSignResponse,
  Bip39,
  EnglishMnemonic,
  HdPath,
  OfflineAminoSigner,
  Slip10RawIndex,
  StdSignDoc,
} from ".";
import { Secp256k1, Secp256k1Keypair } from "./secp256k1";

interface Secp256k1HdWalletConstructorOptions
  extends Partial<Secp256k1HdWalletOptions> {
  readonly seed: Uint8Array;
}

function makeCosmoshubPath(a: number): HdPath {
  return [
    Slip10RawIndex.hardened(44),
    Slip10RawIndex.hardened(188),
    Slip10RawIndex.hardened(0),
    Slip10RawIndex.normal(0),
    Slip10RawIndex.normal(a),
  ];
}

const defaultOptions: Secp256k1HdWalletOptions = {
  bip39Password: "",
  hdPaths: [makeCosmoshubPath(0)],
  prefix: "cosmos",
};

/**
 * Derivation information required to derive a keypair and an address from a mnemonic.
 */
interface DerivationInfo {
  readonly hdPath: HdPath;
  /** The bech32 address prefix (human readable part). */
  readonly prefix: string;
}

export class Secp256k1HdWallet implements OfflineAminoSigner {
  /**
   * Restores a wallet from the given BIP39 mnemonic.
   *
   * @param mnemonic Any valid English mnemonic.
   * @param options An optional `Secp256k1HdWalletOptions` object optionally containing a bip39Password, hdPaths, and prefix.
   */
  public static async fromMnemonic(
    mnemonic: string,
    options: Partial<Secp256k1HdWalletOptions> = {},
  ): Promise<Secp256k1HdWallet> {
    const mnemonicChecked = new EnglishMnemonic(mnemonic);
    const seed = await Bip39.mnemonicToSeed(
      mnemonicChecked,
      options.bip39Password,
    );
    return new Secp256k1HdWallet(mnemonicChecked, {
      ...options,
      seed: seed,
    });
  }

  /**
   * Generates a new wallet with a BIP39 mnemonic of the given length.
   *
   * @param length The number of words in the mnemonic (12, 15, 18, 21 or 24).
   * @param options An optional `Secp256k1HdWalletOptions` object optionally containing a bip39Password, hdPaths, and prefix.
   */
  public static async generate(
    length: 12 | 15 | 18 | 21 | 24 = 12,
    options: Partial<Secp256k1HdWalletOptions> = {},
  ): Promise<Secp256k1HdWallet> {
    const entropyLength = 4 * Math.floor((11 * length) / 33);
    const entropy = secureRandom(entropyLength, { type: "Uint8Array" });
    const mnemonic = Bip39.encode(entropy);
    return Secp256k1HdWallet.fromMnemonic(mnemonic.toString(), options);
  }

  /** Base secret */
  private readonly secret: EnglishMnemonic;
  /** BIP39 seed */
  private readonly seed: Uint8Array;
  /** Derivation instruction */
  private readonly accounts: readonly DerivationInfo[];

  protected constructor(
    mnemonic: EnglishMnemonic,
    options: Secp256k1HdWalletConstructorOptions,
  ) {
    const hdPaths = options.hdPaths ?? defaultOptions.hdPaths;
    const prefix = options.prefix ?? defaultOptions.prefix;
    this.secret = mnemonic;
    this.seed = options.seed;
    this.accounts = hdPaths.map((hdPath) => ({
      hdPath: hdPath,
      prefix,
    }));
  }

  public get mnemonic(): string {
    return this.secret.toString();
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    const accountsWithPrivkeys = await this.getAccountsWithPrivkeys();
    return accountsWithPrivkeys.map(({ algo, pubkey, address }) => ({
      algo: algo,
      pubkey: pubkey,
      address: address,
    }));
  }

  public async signAmino(
    signerAddress: string,
    signDoc: StdSignDoc,
  ): Promise<AminoSignResponse> {
    const accounts = await this.getAccountsWithPrivkeys();
    const account = accounts.find(({ address }) => address === signerAddress);
    if (account === undefined) {
      throw new Error(`Address ${signerAddress} not found in wallet`);
    }
    const { privkey, pubkey } = account;
    const message = sha256(serializeSignDoc(signDoc));
    const signature = await Secp256k1.createSignature(message, privkey);
    const signatureBytes = new Uint8Array([
      ...signature.r(32),
      ...signature.s(32),
    ]);
    return {
      signed: signDoc,
      signature: encodeSecp256k1Signature(pubkey, signatureBytes),
    };
  }

  private async getKeyPair(hdPath: HdPath): Promise<Secp256k1Keypair> {
    const { privkey } = Slip10.derivePath(
      Slip10Curve.Secp256k1,
      this.seed,
      hdPath,
    );
    const { pubkey } = await Secp256k1.makeKeypair(privkey);
    return {
      privkey: privkey,
      pubkey: Secp256k1.compressPubkey(pubkey),
    };
  }

  private async getAccountsWithPrivkeys(): Promise<
    readonly AccountDataWithPrivkey[]
  > {
    return Promise.all(
      this.accounts.map(async ({ hdPath, prefix }) => {
        const { privkey, pubkey } = await this.getKeyPair(hdPath);
        const address = bech32.encode(
          prefix,
          rawSecp256k1PubkeyToRawAddress(pubkey),
        );
        return {
          algo: "secp256k1" as const,
          privkey: privkey,
          pubkey: pubkey,
          address: address,
        };
      }),
    );
  }
}

/**
 * Checks if data is a non-null object (i.e. matches the TypeScript object type).
 *
 * Note: this returns true for arrays, which are objects in JavaScript
 * even though array and object are different types in JSON.
 *
 * @see https://www.typescriptlang.org/docs/handbook/basic-types.html#object
 */
export function isNonNullObject(data: unknown): data is object {
  return typeof data === "object" && data !== null;
}

interface AccountDataWithPrivkey extends AccountData {
  readonly privkey: Uint8Array;
}

/**
 * Raw values must match the curve string in SLIP-0010 master key generation
 *
 * @see https://github.com/satoshilabs/slips/blob/master/slip-0010.md#master-key-generation
 */
export enum Slip10Curve {
  Secp256k1 = "Bitcoin seed",
  Ed25519 = "ed25519 seed",
}

export function rawSecp256k1PubkeyToRawAddress(
  pubkeyData: Uint8Array,
): Uint8Array {
  if (pubkeyData.length !== 33) {
    throw new Error(
      `Invalid Secp256k1 pubkey length (compressed): ${pubkeyData.length}`,
    );
  }
  return ripemd160(sha256(pubkeyData));
}

export interface Slip10Result {
  readonly chainCode: Uint8Array;
  readonly privkey: Uint8Array;
}

// Universal private key derivation accoring to
// https://github.com/satoshilabs/slips/blob/master/slip-0010.md
export class Slip10 {
  public static derivePath(
    curve: Slip10Curve,
    seed: Uint8Array,
    path: HdPath,
  ): Slip10Result {
    let result = this.master(curve, seed);
    for (const rawIndex of path) {
      result = this.child(curve, result.privkey, result.chainCode, rawIndex);
    }
    return result;
  }

  private static master(curve: Slip10Curve, seed: Uint8Array): Slip10Result {
    const i = hmac.create(sha512, toAscii(curve)).update(seed).digest();
    const il = i.slice(0, 32);
    const ir = i.slice(32, 64);

    if (
      curve !== Slip10Curve.Ed25519 &&
      (this.isZero(il) || this.isGteN(curve, il))
    ) {
      return this.master(curve, i);
    }

    return {
      chainCode: ir,
      privkey: il,
    };
  }

  private static child(
    curve: Slip10Curve,
    parentPrivkey: Uint8Array,
    parentChainCode: Uint8Array,
    rawIndex: Slip10RawIndex,
  ): Slip10Result {
    let i: Uint8Array;
    if (rawIndex.isHardened()) {
      const payload = new Uint8Array([
        0x00,
        ...parentPrivkey,
        ...rawIndex.toBytesBigEndian(),
      ]);
      i = hmac.create(sha512, parentChainCode).update(payload).digest();
    } else {
      if (curve === Slip10Curve.Ed25519) {
        throw new Error("Normal keys are not allowed with ed25519");
      } else {
        // Step 1 of https://github.com/satoshilabs/slips/blob/master/slip-0010.md#private-parent-key--private-child-key
        // Calculate I = HMAC-SHA512(Key = c_par, Data = ser_P(point(k_par)) || ser_32(i)).
        // where the functions point() and ser_p() are defined in BIP-0032
        const data = new Uint8Array([
          ...Slip10.serializedPoint(curve, new BN(parentPrivkey)),
          ...rawIndex.toBytesBigEndian(),
        ]);
        i = hmac.create(sha512, parentChainCode).update(data).digest();
      }
    }

    return this.childImpl(curve, parentPrivkey, parentChainCode, rawIndex, i);
  }

  /**
   * Implementation of ser_P(point(k_par)) from BIP-0032
   *
   * @see https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
   */
  private static serializedPoint(curve: Slip10Curve, p: BN): Uint8Array {
    switch (curve) {
      case Slip10Curve.Secp256k1:
        return fromHex(secp256k1.g.mul(p).encodeCompressed("hex"));
      default:
        throw new Error("curve not supported");
    }
  }

  private static childImpl(
    curve: Slip10Curve,
    parentPrivkey: Uint8Array,
    parentChainCode: Uint8Array,
    rawIndex: Slip10RawIndex,
    i: Uint8Array,
  ): Slip10Result {
    // step 2 (of the Private parent key → private child key algorithm)

    const il = i.slice(0, 32);
    const ir = i.slice(32, 64);

    // step 3
    const returnChainCode = ir;

    // step 4
    if (curve === Slip10Curve.Ed25519) {
      return {
        chainCode: returnChainCode,
        privkey: il,
      };
    }

    // step 5
    const n = this.n(curve);
    const returnChildKeyAsNumber = new BN(il).add(new BN(parentPrivkey)).mod(n);
    const returnChildKey = Uint8Array.from(
      returnChildKeyAsNumber.toArray("be", 32),
    );

    // step 6
    if (this.isGteN(curve, il) || this.isZero(returnChildKey)) {
      const newI = hmac
        .create(sha512, parentChainCode)
        .update(new Uint8Array([0x01, ...ir, ...rawIndex.toBytesBigEndian()]))
        .digest();
      return this.childImpl(
        curve,
        parentPrivkey,
        parentChainCode,
        rawIndex,
        newI,
      );
    }

    // step 7
    return {
      chainCode: returnChainCode,
      privkey: returnChildKey,
    };
  }

  private static isZero(privkey: Uint8Array): boolean {
    return privkey.every((byte) => byte === 0);
  }

  private static isGteN(curve: Slip10Curve, privkey: Uint8Array): boolean {
    const keyAsNumber = new BN(privkey);
    return keyAsNumber.gte(this.n(curve));
  }

  private static n(curve: Slip10Curve): BN {
    switch (curve) {
      case Slip10Curve.Secp256k1:
        return new BN(
          "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141",
          16,
        );
      default:
        throw new Error("curve not supported");
    }
  }
}

const secp256k1 = new elliptic.ec("secp256k1");
