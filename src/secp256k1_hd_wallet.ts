import { Secp256k1HdWallet, Secp256k1HdWalletOptions } from "@cosmjs/amino";
import { HdPath, EnglishMnemonic, Slip10RawIndex } from "@cosmjs/crypto";

export function makeSecretNetworkPath(a: number): HdPath {
  return [
    Slip10RawIndex.hardened(44),
    Slip10RawIndex.hardened(118),
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
    options: Secp256k1HdWalletConstructorOptions
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
}
