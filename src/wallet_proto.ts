import { sha256 } from "@noble/hashes/sha256";
import {
  AminoWallet,
  encodeSecp256k1Signature,
  StdSignature,
} from "./wallet_amino";

import { ec as EC } from "elliptic";
const secp256k1 = new EC("secp256k1");

/**
 * Wallet is a wallet capable of signing on transactions.
 *
 * `Wallet` can just extend `AminoWallet` and be a valid `DirectSigner` because
 * `SecretNetworkClient` checks first for the existence of `signDirect` function
 * before checking for `signAmino` function.
 */

export class Wallet extends AminoWallet {
  public async signDirect(
    address: string,
    signDoc: import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignDoc,
  ): Promise<DirectSignResponse> {
    if (address !== this.address) {
      throw new Error(`Address ${address} not found in wallet`);
    }

    const messageHash = sha256(await serializeSignDoc(signDoc));

    const signature = secp256k1
      .keyFromPrivate(this.privateKey)
      .sign(messageHash);

    return {
      signed: signDoc,
      signature: encodeSecp256k1Signature(
        this.publicKey,
        Uint8Array.from([...signature.r.toArray(), ...signature.s.toArray()]),
      ),
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
