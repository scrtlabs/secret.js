import {
  encodeSecp256k1Signature,
  AccountData,
  StdSignDoc,
  AminoSignResponse,
  serializeSignDoc,
} from "@cosmjs/amino";
import { OfflineDirectSigner as DirectSigner } from "@cosmjs/proto-signing";
import { sha256 } from "@noble/hashes/sha256";
import * as secp256k1 from "@noble/secp256k1";
import * as bip32 from "bip32";
import * as bip39 from "bip39";
import { pubkeyToAddress } from "./utils";

export const SECRET_COIN_TYPE = 529;
export const SECRET_BECH32_PREFIX = "secret";

export type Signer = AminoSigner | DirectSigner;

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
 * for anything else. The reason is that some Msg types don't support Amino
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
   * @param {Number} [options.coinType] The coin type in the HD derivation path. Defaults to Secret's `529`.
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
      throw new Error("Failed to derive key pair");
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

export interface AminoSigner {
  /**
   * Get SignMode for signing a tx.
   */
  readonly getSignMode?: () => Promise<
    import("./protobuf/cosmos/tx/signing/v1beta1/signing").SignMode
  >;

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

  readonly signPermit?: (
    signerAddress: string,
    signDoc: StdSignDoc,
  ) => Promise<AminoSignResponse>;
}

export interface AminoEip191Signer {
  readonly getAccounts: () => Promise<readonly AccountData[]>;
  readonly signAminoEip191: (
    signerAddress: string,
    signDoc: StdSignDoc,
  ) => Promise<AminoSignResponse>;
}
