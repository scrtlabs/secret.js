import { fromHex, toHex } from "@cosmjs/encoding";
import { Uint32 } from "@cosmjs/math";
import * as bip39 from "bip39";

export class Slip10RawIndex extends Uint32 {
  public static hardened(hardenedIndex: number): Slip10RawIndex {
    return new Slip10RawIndex(hardenedIndex + 2 ** 31);
  }

  public static normal(normalIndex: number): Slip10RawIndex {
    return new Slip10RawIndex(normalIndex);
  }

  public isHardened(): boolean {
    return this.data >= 2 ** 31;
  }
}

/**
 * An array of raw SLIP10 indices.
 *
 * This can be constructed via string parsing:
 *
 * ```ts
 * import { stringToPath } from "@cosmjs/crypto";
 *
 * const path = stringToPath("m/0'/1/2'/2/1000000000");
 * ```
 *
 * or manually:
 *
 * ```ts
 * import { HdPath, Slip10RawIndex } from "@cosmjs/crypto";
 *
 * // m/0'/1/2'/2/1000000000
 * const path: HdPath = [
 *   Slip10RawIndex.hardened(0),
 *   Slip10RawIndex.normal(1),
 *   Slip10RawIndex.hardened(2),
 *   Slip10RawIndex.normal(2),
 *   Slip10RawIndex.normal(1000000000),
 * ];
 * ```
 */
export type HdPath = readonly Slip10RawIndex[];

export class EnglishMnemonic {
  public static readonly wordlist: readonly string[] = bip39.wordlists.english;

  // list of space separated lower case words (1 or more)
  private static readonly mnemonicMatcher = /^[a-z]+( [a-z]+)*$/;

  private readonly data: string;

  public constructor(mnemonic: string) {
    if (!EnglishMnemonic.mnemonicMatcher.test(mnemonic)) {
      throw new Error("Invalid mnemonic format");
    }

    const words = mnemonic.split(" ");
    const allowedWordsLengths: readonly number[] = [12, 15, 18, 21, 24];
    if (allowedWordsLengths.indexOf(words.length) === -1) {
      throw new Error(
        `Invalid word count in mnemonic (allowed: ${allowedWordsLengths} got: ${words.length})`,
      );
    }

    for (const word of words) {
      if (EnglishMnemonic.wordlist.indexOf(word) === -1) {
        throw new Error("Mnemonic contains invalid word");
      }
    }

    // Throws with informative error message if mnemonic is not valid
    bip39.mnemonicToEntropy(mnemonic);

    this.data = mnemonic;
  }

  public toString(): string {
    return this.data;
  }
}

export class Bip39 {
  /**
   * Encodes raw entropy of length 16, 20, 24, 28 or 32 bytes as an English mnemonic between 12 and 24 words.
   *
   * | Entropy            | Words |
   * |--------------------|-------|
   * | 128 bit (16 bytes) |    12 |
   * | 160 bit (20 bytes) |    15 |
   * | 192 bit (24 bytes) |    18 |
   * | 224 bit (28 bytes) |    21 |
   * | 256 bit (32 bytes) |    24 |
   *
   *
   * @see https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#generating-the-mnemonic
   * @param entropy The entropy to be encoded. This must be cryptographically secure.
   */
  public static encode(entropy: Uint8Array): EnglishMnemonic {
    const allowedEntropyLengths: readonly number[] = [16, 20, 24, 28, 32];

    if (allowedEntropyLengths.indexOf(entropy.length) === -1) {
      throw new Error("invalid input length");
    }

    return new EnglishMnemonic(bip39.entropyToMnemonic(toHex(entropy)));
  }

  public static decode(mnemonic: EnglishMnemonic): Uint8Array {
    return fromHex(bip39.mnemonicToEntropy(mnemonic.toString()));
  }

  public static async mnemonicToSeed(
    mnemonic: EnglishMnemonic,
    password?: string,
  ): Promise<Uint8Array> {
    return new Uint8Array(
      await bip39.mnemonicToSeed(mnemonic.toString(), password),
    );
  }
}
