import { sha256 } from "@noble/hashes/sha256";
import * as secp256k1 from "@noble/secp256k1";
import { fromHex, toHex } from ".";
import {
  AccountData,
  AminoSignResponse,
  encodeSecp256k1Signature,
  pubkeyToAddress,
  serializeStdSignDoc,
  StdSignDoc,
} from "./wallet_amino";

/**
 * MetaMaskSigner is a signer capable of signing on transactions using MetaMask.
 */
export class MetaMaskSigner {
  /** The account's secret address, derived from `publicKey` */
  public readonly address: string;

  private constructor(
    public ethProvider: any,
    public ethAddress: string,
    public publicKey: Uint8Array,
  ) {
    this.address = pubkeyToAddress(this.publicKey);
  }

  static async create(
    ethProvider: any,
    ethAddress: string,
  ): Promise<MetaMaskSigner> {
    const localStorageKey = `secretjs_${ethAddress}_pubkey`;

    const publicKeyHex = localStorage.getItem(localStorageKey);
    if (publicKeyHex) {
      // TODO verify that ethAddress can be derived from publicKeyHex
      return new MetaMaskSigner(ethProvider, ethAddress, fromHex(publicKeyHex));
    }

    const msgHash = sha256("Get secret address");

    const sigResult: string = await ethProvider.request({
      method: "eth_sign",
      params: [ethAddress, "0x" + toHex(msgHash)],
    });

    // strip leading 0x and extract recovery id
    const sig = fromHex(sigResult.slice(2, -2));
    const recoveryBit = parseInt(sigResult.slice(-2), 16) - 27;

    const publicKey = secp256k1.recoverPublicKey(
      msgHash,
      sig,
      recoveryBit,
      true,
    );

    localStorage.setItem(localStorageKey, toHex(publicKey));

    return new MetaMaskSigner(ethProvider, ethAddress, publicKey);
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
    address: string,
    signDoc: StdSignDoc,
  ): Promise<AminoSignResponse> {
    if (address !== pubkeyToAddress(this.publicKey)) {
      throw new Error(`Address ${address} not found in wallet`);
    }

    const messageHash = sha256(serializeStdSignDoc(signDoc));
    const sigResult: string = await this.ethProvider.request({
      method: "eth_sign",
      params: [this.ethAddress, "0x" + toHex(messageHash)],
    });

    // strip leading 0x and trailing recovery id
    const sig = fromHex(sigResult.slice(2, -2));

    return {
      signed: signDoc,
      signature: encodeSecp256k1Signature(this.publicKey, sig),
    };
  }
}
