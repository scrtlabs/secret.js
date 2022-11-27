import { sha256 } from "@noble/hashes/sha256";
import * as secp256k1 from "@noble/secp256k1";
import {
  AminoWallet,
  encodeSecp256k1Signature,
  StdSignature,
} from "./wallet_amino";

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
    signDoc: import("./protobuf/cosmos/tx/v1beta1/tx").SignDoc,
  ): Promise<DirectSignResponse> {
    if (address !== this.address) {
      throw new Error(`Address ${address} not found in wallet`);
    }

    const messageHash = sha256(await serializeSignDoc(signDoc));
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

type DirectSignResponse = {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: import("./protobuf/cosmos/tx/v1beta1/tx").SignDoc;
  readonly signature: StdSignature;
};

async function serializeSignDoc({
  account_number,
  auth_info_bytes,
  body_bytes,
  chain_id,
}: import("./protobuf/cosmos/tx/v1beta1/tx").SignDoc): Promise<Uint8Array> {
  const { SignDoc } = await import("./protobuf/cosmos/tx/v1beta1/tx");
  return SignDoc.encode(
    SignDoc.fromPartial({
      account_number,
      auth_info_bytes,
      body_bytes,
      chain_id,
    }),
  ).finish();
}
