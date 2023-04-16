import { fromBase64, fromHex, toUtf8 } from "@cosmjs/encoding";
import { hkdf } from "@noble/hashes/hkdf";
import { sha256 } from "@noble/hashes/sha256";
import * as ed from '@noble/ed25519';
import { ed25519, x25519 } from '@noble/curves/ed25519';
import { PolyfillCryptoProvider, SIV } from "miscreant";
import secureRandom from "secure-random";
import { Query } from "./grpc_gateway/secret/registration/v1beta1/query.pb";


const { Fp } = ed25519.CURVE; // Use field over 2n**255n-19n


// from https://github.com/paulmillr/noble-ed25519/issues/81
/**
 * Converts to Montgomery; aka x coordinate of curve25519.
 * We don't have fromX25519, because we don't know sign.
 *
 * ```
 * u, v: curve25519 coordinates
 * x, y: ed25519 coordinates
 * (u, v) = ((1+y)/(1-y), sqrt(-486664)*u/x)
 * (x, y) = (sqrt(-486664)*u/v, (u-1)/(u+1))
 * ```
 * https://blog.filippo.io/using-ed25519-keys-for-encryption
 * @returns u coordinate of curve25519 point
 * @example
 */
function toX25519(y: any) {
  const _1n = BigInt(1);
  const u = Fp.create((_1n + y) * Fp.inv(_1n - y)); // (1+y) / (1-y) == (1+y) * inv(1-y)
  return Fp.toBytes(u);
}


export function getSharedSecret(privateKey: Uint8Array, publicKey: Uint8Array): Uint8Array {
  const { head } = ed25519.utils.getExtendedPublicKey(privateKey);
  const u = toX25519(ed25519.ExtendedPoint.fromHex(publicKey).y);
  return x25519.scalarMult(head, u);
}

const cryptoProvider = new PolyfillCryptoProvider();

export interface EncryptionUtils {
  getPubkey: () => Promise<Uint8Array>;
  decrypt: (ciphertext: Uint8Array, nonce: Uint8Array) => Promise<Uint8Array>;
  encrypt: (contractCodeHash: string, msg: object) => Promise<Uint8Array>;
  getTxEncryptionKey: (nonce: Uint8Array) => Promise<Uint8Array>;
}

const hkdfSalt: Uint8Array = fromHex(
  "000000000000000000024bead8df69990852c202db0e0097c1a12ea637d7e96d",
);
const mainnetConsensusIoPubKey = fromBase64(
  "79++5YOHfm0SwhlpUDClv7cuCjq9xBZlWqSjDJWkRG8=",
);
const mainnetChainIds = new Set(["secret-2", "secret-3", "secret-4"]);

export class EncryptionUtilsImpl implements EncryptionUtils {
  private readonly seed: Uint8Array;
  private readonly privkey: Uint8Array;
  public readonly pubkey: Uint8Array;
  private consensusIoPubKey: Uint8Array = new Uint8Array(); // cache

  public constructor(private url: string, seed?: Uint8Array, chainId?: string) {
    if (!seed) {
      this.seed = EncryptionUtilsImpl.GenerateNewSeed();
    } else {
      if (seed.length !== 32) {
        throw new Error("encryptionSeed must be a Uint8Array of length 32");
      }
      this.seed = seed;
    }

    const { privkey, pubkey } = EncryptionUtilsImpl.GenerateNewKeyPairFromSeed(
      this.seed,
    );
    this.privkey = privkey;
    this.pubkey = pubkey;

    // todo: add this again post upgrade
    if (chainId && mainnetChainIds.has(chainId)) {
      // Major speedup
      // TODO: not sure if this is the best approach for detecting mainnet
      this.consensusIoPubKey = mainnetConsensusIoPubKey;
    }
  }

  public static GenerateNewKeyPair(): {
    privkey: Uint8Array;
    pubkey: Uint8Array;
  } {
    return EncryptionUtilsImpl.GenerateNewKeyPairFromSeed(
      EncryptionUtilsImpl.GenerateNewSeed(),
    );
  }

  public static GenerateNewSeed(): Uint8Array {
    //return secureRandom(32, { type: "Uint8Array" });
    return ed.utils.randomPrivateKey();
  }

  public static GenerateNewKeyPairFromSeed(seed: Uint8Array): {
    privkey: Uint8Array;
    pubkey: Uint8Array;
  } {
    let pubkey = ed.getPublicKey(seed);
    return { privkey: seed, pubkey };
  }

  private async getConsensusIoPubKey(): Promise<Uint8Array> {
    if (this.consensusIoPubKey.length === 32) {
      return this.consensusIoPubKey;
    }

    const { key } = await Query.TxKey({}, { pathPrefix: this.url });
    this.consensusIoPubKey = fromBase64(key as unknown as string);

    return this.consensusIoPubKey;
  }

  public async getTxEncryptionKey(nonce: Uint8Array): Promise<Uint8Array> {
    const consensusIoPubKey = await this.getConsensusIoPubKey();

    const txEncryptionIkm = getSharedSecret(this.privkey, consensusIoPubKey);
    return hkdf(
      sha256,
      Uint8Array.from([...txEncryptionIkm, ...nonce]),
      hkdfSalt,
      "",
      32,
    );
  }

  public async encrypt(
    contractCodeHash: string,
    msg: object,
  ): Promise<Uint8Array> {
    const nonce = secureRandom(32, { type: "Uint8Array" });

    const txEncryptionKey = await this.getTxEncryptionKey(nonce);

    const siv = await SIV.importKey(txEncryptionKey, "AES-SIV", cryptoProvider);

    const plaintext = toUtf8(contractCodeHash + JSON.stringify(msg));

    const ciphertext = await siv.seal(plaintext, [new Uint8Array()]);

    // ciphertext = nonce(32) || wallet_pubkey(32) || ciphertext
    return Uint8Array.from([...nonce, ...this.pubkey, ...ciphertext]);
  }

  public async decrypt(
    ciphertext: Uint8Array,
    nonce: Uint8Array,
  ): Promise<Uint8Array> {
    if (!ciphertext?.length) {
      return new Uint8Array();
    }

    const txEncryptionKey = await this.getTxEncryptionKey(nonce);

    const siv = await SIV.importKey(txEncryptionKey, "AES-SIV", cryptoProvider);

    return await siv.open(ciphertext, [new Uint8Array()]);
  }

  getPubkey(): Promise<Uint8Array> {
    return Promise.resolve(this.pubkey);
  }
}
