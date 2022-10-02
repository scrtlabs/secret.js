import { fromBase64 } from "@cosmjs/encoding";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { sha256 } from "@noble/hashes/sha256";
import { bech32 } from "bech32";

/**
 * Convert a secp256k1 compressed public key to a address
 *
 * @param {Uint8Array} pubkey The account's pubkey, should be 33 bytes (compressed secp256k1)
 * @param {String} [prefix="secret"] The address' bech32 prefix. Defaults to `"secret"`.
 * @returns the account's address
 */
export function pubkeyToAddress(
  pubkey: Uint8Array,
  prefix: string = "secret",
): string {
  return bech32.encode(prefix, bech32.toWords(ripemd160(sha256(pubkey))));
}

/**
 * Convert a secp256k1 compressed public key to a address
 *
 * @param {Uint8Array} pubkey The account's pubkey as base64 string, should be 33 bytes (compressed secp256k1)
 * @param {String} [prefix="secret"] The address' bech32 prefix. Defaults to `"secret"`.
 * @returns the account's address
 */
export function base64PubkeyToAddress(
  pubkey: string,
  prefix: string = "secret",
): string {
  return pubkeyToAddress(fromBase64(pubkey), prefix);
}

/**
 * Convert self delegator address to validator address
 *
 * @param {string} selfDelegator The self delegator bech32 encoded address
 * @param {String} [prefix="secret"] The self delegator address' bech32 prefix. Defaults to `"secret"`.
 * @returns the account's address
 */
export function selfDelegatorAddressToValidatorAddress(
  selfDelegator: string,
  prefix: string = "secret",
): string {
  return bech32.encode(`${prefix}valoper`, bech32.decode(selfDelegator).words);
}

/**
 * Convert self delegator address to validator address
 *
 * @param {string} validator The validator bech32 encoded address
 * @param {String} [prefix="secret"] The self delegator address' bech32 prefix. Defaults to `"secret"`.
 * @returns the account's address
 */
export function validatorAddressToSelfDelegatorAddress(
  validator: string,
  prefix: string = "secret",
): string {
  return bech32.encode(prefix, bech32.decode(validator).words);
}

/**
 * Convert a Tendermint ed25519 public key to a consensus address
 *
 * @param {Uint8Array} pubkey The tendermint pubkey, should be 32 bytes (ed25519)
 * @param {String} [prefix="secret"] The valcons address' bech32 prefix. Defaults to `"secret"`.
 * @returns the valcons account's address
 */
export function tendermintPubkeyToValconsAddress(
  pubkey: Uint8Array,
  prefix: string = "secret",
): string {
  return bech32.encode(
    `${prefix}valcons`,
    bech32.toWords(sha256(pubkey).slice(0, 20)),
  );
}

/**
 * Convert a secp256k1 compressed public key to a address
 *
 * @param {Uint8Array} pubkey The account's pubkey as base64 string, should be 33 bytes (compressed secp256k1)
 * @param {String} [prefix="secret"] The address' bech32 prefix. Defaults to `"secret"`.
 * @returns the account's address
 */
export function base64TendermintPubkeyToValconsAddress(
  pubkey: string,
  prefix: string = "secret",
): string {
  return tendermintPubkeyToValconsAddress(fromBase64(pubkey), prefix);
}
