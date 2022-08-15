import { sha3_256 } from "@noble/hashes/sha3";
import * as secp256k1 from "@noble/secp256k1";
import { fromHex, toHex, toUtf8 } from ".";
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
export class MetaMaskTextSigner {
  private constructor(
    public ethProvider: any,
    public ethAddress: string,
    public publicKey: Uint8Array,
  ) {}

  static async create(
    ethProvider: any,
    ethAddress: string,
  ): Promise<MetaMaskTextSigner> {
    const localStorageKey = `secretjs_${ethAddress}_pubkey`;

    const publicKeyHex = localStorage.getItem(localStorageKey);
    if (publicKeyHex) {
      // TODO verify that ethAddress can be derived from publicKeyHex
      return new MetaMaskTextSigner(
        ethProvider,
        ethAddress,
        fromHex(publicKeyHex),
      );
    }

    const msgToSign = `0x${toHex(toUtf8("Get secret address"))}`;

    const sigResult: string = await ethProvider.request({
      method: "personal_sign",
      params: [msgToSign, ethAddress],
    });

    // strip leading 0x and extract recovery id
    const sig = fromHex(sigResult.slice(2, -2));
    const recoveryId = parseInt(sigResult.slice(-2), 16) - 27;

    const publicKey = secp256k1.recoverPublicKey(
      sha3_256(msgToSign),
      sig,
      recoveryId,
      true,
    );

    localStorage.setItem(localStorageKey, toHex(publicKey));

    return new MetaMaskTextSigner(ethProvider, ethAddress, publicKey);
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    return [
      {
        address: pubkeyToAddress(this.publicKey),
        algo: "secp256k1",
        pubkey: this.publicKey,
      },
    ];
  }

  public async signAminoEip191(
    address: string,
    signDoc: StdSignDoc,
  ): Promise<AminoSignResponse> {
    if (address !== pubkeyToAddress(this.publicKey)) {
      throw new Error(`Address ${address} not found in wallet`);
    }

    const msgToSign = `0x${toHex(serializeStdSignDoc(signDoc))}`;
    const sigResult: string = await this.ethProvider.request({
      method: "personal_sign",
      params: [msgToSign, this.ethAddress],
    });

    // strip leading 0x and trailing recovery id
    const sig = fromHex(sigResult.slice(2, -2));

    return {
      signed: signDoc,
      signature: encodeSecp256k1Signature(this.publicKey, sig),
    };
  }
}
