import { sha256 } from "@noble/hashes/sha256";
import { fromHex, toHex } from ".";
import {
  AccountData,
  encodeSecp256k1Signature,
  pubkeyToAddress,
  StdSignature,
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

  public async signDirect(
    address: string,
    signDoc: import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignDoc,
  ): Promise<DirectSignResponse> {
    if (address !== pubkeyToAddress(this.publicKey)) {
      throw new Error(`Address ${address} not found in wallet`);
    }

    const messageHash = sha256(await serializeSignDoc(signDoc));
    // @ts-ignore
    const sigResult: string = await window.ethereum.request({
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

type DirectSignResponse = {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignDoc;
  readonly signature: StdSignature;
};

async function serializeSignDoc({
  accountNumber,
  authInfoBytes,
  bodyBytes,
  chainId,
}: import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignDoc): Promise<Uint8Array> {
  const { SignDoc } = await import("./protobuf_stuff/cosmos/tx/v1beta1/tx");
  return SignDoc.encode(
    SignDoc.fromPartial({
      accountNumber: accountNumber,
      authInfoBytes: authInfoBytes,
      bodyBytes: bodyBytes,
      chainId: chainId,
    }),
  ).finish();
}
