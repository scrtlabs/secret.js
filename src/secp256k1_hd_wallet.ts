import { Secp256k1HdWallet, Secp256k1HdWalletOptions } from "@cosmjs/amino";
import { Bip39, EnglishMnemonic, HdPath, Slip10RawIndex } from "@cosmjs/crypto";
import secureRandom from "secure-random";

export function makeSecretNetworkPath(a: number): HdPath {
  return [
    Slip10RawIndex.hardened(44),
    Slip10RawIndex.hardened(529),
    Slip10RawIndex.hardened(0),
    Slip10RawIndex.normal(0),
    Slip10RawIndex.normal(a),
  ];
}

interface Secp256k1HdWalletConstructorOptions
  extends Partial<Secp256k1HdWalletOptions> {
  readonly seed: Uint8Array;
}

const defaultOptions: Secp256k1HdWalletOptions = {
  bip39Password: "",
  hdPaths: [makeSecretNetworkPath(0)],
  prefix: "secret",
};

export class SecretSecp256k1HdWallet extends Secp256k1HdWallet {
  protected constructor(
    mnemonic: EnglishMnemonic,
    options: Secp256k1HdWalletConstructorOptions,
  ) {
    const hdPaths = options.hdPaths ?? defaultOptions.hdPaths;
    const prefix = options.prefix ?? defaultOptions.prefix;
    const bip39Password = options.bip39Password ?? defaultOptions.bip39Password;

    super(mnemonic, {
      hdPaths,
      prefix,
      bip39Password,
      seed: options.seed,
    });
  }

  /**
   * Restores a wallet from the given BIP39 mnemonic.
   *
   * @param mnemonic Any valid English mnemonic.
   * @param options An optional `Secp256k1HdWalletOptions` object optionally containing a bip39Password, hdPaths, and prefix.
   */
  public static async fromMnemonic(
    mnemonic: string,
    options: Partial<Secp256k1HdWalletOptions> = {},
  ): Promise<SecretSecp256k1HdWallet> {
    const mnemonicChecked = new EnglishMnemonic(mnemonic);
    const seed = await Bip39.mnemonicToSeed(
      mnemonicChecked,
      options.bip39Password,
    );
    return new SecretSecp256k1HdWallet(mnemonicChecked, {
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
    length: 12 | 15 | 18 | 21 | 24 = 24,
    options: Partial<Secp256k1HdWalletOptions> = {},
  ): Promise<SecretSecp256k1HdWallet> {
    const entropyLength = 4 * Math.floor((11 * length) / 33);
    const entropy = secureRandom(entropyLength, { type: "Uint8Array" });
    const mnemonic = Bip39.encode(entropy);

    const hdPaths = options.hdPaths ?? defaultOptions.hdPaths;
    const prefix = options.prefix ?? defaultOptions.prefix;
    const bip39Password = options.bip39Password ?? defaultOptions.bip39Password;

    return SecretSecp256k1HdWallet.fromMnemonic(mnemonic.toString(), {
      hdPaths,
      prefix,
      bip39Password,
    });
  }
}
