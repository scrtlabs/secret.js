import { sha256 } from "@noble/hashes/sha256";
import { keccak_256 } from "@noble/hashes/sha3";
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
 * MetaMaskWallet is a wallet capable of signing on transactions using MetaMask.
 */
export class MetaMaskWallet {
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
  ): Promise<MetaMaskWallet> {
    // use localStorage to cache the publicKey to prevent signing request on every MetaMaskWallet.create()
    // if MetaMask is used we assume that there's localStorage in the environment
    const localStorageKey = `secretjs_${ethAddress}_pubkey`;
    const publicKeyHex = localStorage.getItem(localStorageKey);

    if (publicKeyHex) {
      // verify that ethAddress can be derived from publicKeyHex
      // this prevents reading wrong/corrupted data from localStorage

      const ethAddressBytes = ethAddress.slice(2).toLocaleLowerCase();
      const derivedEthAddressBytes = toHex(
        keccak_256(decompressSecp256k1PublicKey(publicKeyHex).slice(1)).slice(
          -20,
        ),
      ).toLocaleLowerCase();

      if (derivedEthAddressBytes === ethAddressBytes) {
        return new MetaMaskWallet(
          ethProvider,
          ethAddress,
          fromHex(publicKeyHex),
        );
      } else {
        localStorage.removeItem(localStorageKey);
      }
    }

    // On ETHland pubkeys are recovered from signatures, so we're going to:
    // 1. sign something
    // 2. recover the pubkey from the signature
    // 3. derive a secret address from the the pubkey

    const msgHash = sha256("Get secret address");

    const sigResult: string = await ethProvider.request({
      method: "eth_sign",
      params: [ethAddress, "0x" + toHex(msgHash)],
    });

    // strip leading 0x and extract recovery id
    const sig = fromHex(sigResult.slice(2, -2));
    const recoveryBit = parseInt(sigResult.slice(-2), 16) - 27;

    const publicKey = secp256k1.recoverPublicKey(msgHash, sig, recoveryBit);

    if (typeof publicKey === "undefined") {
      throw new Error(`Public key is undefined`);
    }

    localStorage.setItem(localStorageKey, toHex(publicKey));

    return new MetaMaskWallet(ethProvider, ethAddress, publicKey);
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

function decompressSecp256k1PublicKey(publicKeyHex: string): Uint8Array {
  const point = secp256k1.Point.fromHex(publicKeyHex);
  return point.toRawBytes(false);
}
