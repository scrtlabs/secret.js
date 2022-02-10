import {
  AminoSignResponse,
  Secp256k1HdWalletOptions,
  StdSignDoc,
} from "@cosmjs/amino";
import { AccountData, HdPath, Slip10RawIndex } from "./cosmjs_shim";
import { Secp256k1HdWallet } from "./cosmjs_shim/secp256k1_hd_wallet";

export function makeSecretNetworkPath(a: number): HdPath {
  return [
    Slip10RawIndex.hardened(44),
    Slip10RawIndex.hardened(529),
    Slip10RawIndex.hardened(0),
    Slip10RawIndex.normal(0),
    Slip10RawIndex.normal(a),
  ];
}

const defaultOptions: Secp256k1HdWalletOptions = {
  bip39Password: "",
  hdPaths: [makeSecretNetworkPath(0)],
  prefix: "secret",
};

export class SecretSecp256k1HdWallet {
  private innerWallet: Secp256k1HdWallet;

  protected constructor(innerWallet: Secp256k1HdWallet) {
    this.innerWallet = innerWallet;
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
    return new SecretSecp256k1HdWallet(
      await Secp256k1HdWallet.fromMnemonic(mnemonic, {
        hdPaths: options.hdPaths ?? defaultOptions.hdPaths,
        prefix: options.prefix ?? defaultOptions.prefix,
        bip39Password: options.bip39Password ?? defaultOptions.bip39Password,
      }),
    );
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
    return new SecretSecp256k1HdWallet(
      await Secp256k1HdWallet.generate(length, {
        hdPaths: options.hdPaths ?? defaultOptions.hdPaths,
        prefix: options.prefix ?? defaultOptions.prefix,
        bip39Password: options.bip39Password ?? defaultOptions.bip39Password,
      }),
    );
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    return this.innerWallet.getAccounts();
  }

  public async signAmino(
    signerAddress: string,
    signDoc: StdSignDoc,
  ): Promise<AminoSignResponse> {
    return this.innerWallet.signAmino(signerAddress, signDoc);
  }

  public get mnemonic(): string {
    return this.innerWallet.mnemonic;
  }
}
