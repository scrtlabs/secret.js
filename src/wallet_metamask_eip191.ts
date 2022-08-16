import { keccak_256 } from "@noble/hashes/sha3";
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
 * MetaMaskWallet is a wallet capable of signing on transactions using MetaMask.
 * Note: After Shockwave Delta this will become MetaMaskWallet
 */
export class MetaMaskTextWallet {
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
  ): Promise<MetaMaskTextWallet> {
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
        return new MetaMaskTextWallet(
          ethProvider,
          ethAddress,
          fromHex(publicKeyHex),
        );
      }
    }

    const rawMsg = toUtf8("Get secret address");
    const msgToSign = `0x${toHex(rawMsg)}`;

    const sigResult: string = (await ethProvider.request({
      method: "personal_sign",
      params: [msgToSign, ethAddress],
    }))!.toString();

    // strip leading 0x and extract recovery id
    const sig = fromHex(sigResult.slice(2, -2));
    const recoveryId = parseInt(sigResult.slice(-2), 16) - 27;

    const eip191MessagePrefix = toUtf8("\x19Ethereum Signed Message:\n");
    const rawMsgLength = toUtf8(String(rawMsg.length));

    const publicKey = secp256k1.recoverPublicKey(
      keccak_256(
        new Uint8Array([...eip191MessagePrefix, ...rawMsgLength, ...rawMsg]),
      ),
      sig,
      recoveryId,
      true,
    );

    localStorage.setItem(localStorageKey, toHex(publicKey));

    return new MetaMaskTextWallet(ethProvider, ethAddress, publicKey);
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

function decompressSecp256k1PublicKey(publicKeyHex: string): Uint8Array {
  const point = secp256k1.Point.fromHex(publicKeyHex);
  const x = point.toRawBytes(false);
  console.log(x);
  return x;
}
