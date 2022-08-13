import { fromHex, fromUtf8 } from ".";
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
  constructor(public ethAddress: string, public publicKey: Uint8Array) {}

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
    const message = fromUtf8(await serializeStdSignDoc(signDoc));
    // @ts-ignore
    const sigResult: string = await window.ethereum.request({
      method: "eth_signTypedData_v1",
      params: [
        [{ type: "string", name: "Transaction to Sign:", value: message }],
        this.ethAddress,
      ],
    });

    const signature = fromHex(sigResult.slice(2, -2));

    return {
      signed: signDoc,
      signature: encodeSecp256k1Signature(this.publicKey, signature),
    };
  }
}
