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

export interface EthereumProvider {
  request(args: {
    method: "eth_sign";
    params: [
      (
        | string
        | [
            {
              type: "string";
              name: "Secret Network Transaction";
              value: string;
            },
          ]
      ),
      string,
    ];
  }): Promise<string>;
}

/**
 * MetaMaskSigner is a signer capable of signing on transactions using MetaMask.
 */
export class MetaMaskSigner {
  private constructor(
    public ethProvider: EthereumProvider,
    public ethAddress: string,
    public publicKey: Uint8Array,
  ) {}

  static async create(
    ethProvider: EthereumProvider,
    ethAddress: string,
  ): Promise<MetaMaskSigner> {
    const localStorageKey = `secretjs_${ethAddress}_pubkey`;

    const publicKeyHex = localStorage.getItem(localStorageKey);
    if (publicKeyHex) {
      // TODO verify that ethAddress can be derived from publicKeyHex
      return new MetaMaskSigner(ethProvider, ethAddress, fromHex(publicKeyHex));
    }

    const msgHash = sha256("blabla");

    const sigResult: string = await ethProvider.request({
      method: "eth_sign",
      params: [ethAddress, "0x" + toHex(msgHash)],
    });

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
        address: pubkeyToAddress(this.publicKey),
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

    const signature = fromHex(sigResult.slice(2, -2));

    return {
      signed: signDoc,
      signature: encodeSecp256k1Signature(this.publicKey, signature),
    };
  }
}
