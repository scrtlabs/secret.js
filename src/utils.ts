import { fromBase64, toHex, toUtf8 } from "@cosmjs/encoding";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { sha256 } from "@noble/hashes/sha256";
import { bech32 } from "bech32";
import { Coin } from "./tx";

/**
 *
 * Copied here to avoid unnecessary deps
 *
 * MIT License
 *
 * Copyright (c) Kevin Mårtensson <kevinmartensson@gmail.com> (github.com/kevva)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * @param buf
 */
export const is_gzip = (buf: Buffer | Uint8Array): boolean => {
  if (!buf || buf.length < 3) {
    return false;
  }

  return buf[0] === 0x1f && buf[1] === 0x8b && buf[2] === 0x08;
};

/**
 * Convert a secp256k1 compressed public key to an address
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
 * Convert a secp256k1 compressed public key to an address
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
 * @param {String} selfDelegator The self delegator bech32 encoded address
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
 * @param {String} validator The validator bech32 encoded address
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
 * Convert a secp256k1 compressed public key to an address
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

/**
 * Compute the IBC denom of a token that was sent over IBC.
 *
 * For example, to get the IBC denom of SCRT on mainnet Osmosis:
 * ```
 * ibcDenom([{incomingPortId: "transfer", incomingChannelId: "channel-88"}], "uscrt")
 * ```
 */
export const ibcDenom = (
  paths: {
    incomingPortId: string;
    incomingChannelId: string;
  }[],
  coinMinimalDenom: string,
): string => {
  const prefixes = [];
  for (const path of paths) {
    prefixes.push(`${path.incomingPortId}/${path.incomingChannelId}`);
  }

  const prefix = prefixes.join("/");
  const denom = `${prefix}/${coinMinimalDenom}`;

  return "ibc/" + toHex(sha256(toUtf8(denom))).toUpperCase();
};

/**
 * E.g. "1uscrt,1uatom,1uosmo" =>
 * [{amount:"1",denom:"uscrt"},{amount:"1",denom:"uatom"},{amount:"1",denom:"uosmo"}]
 *
 */
export const stringToCoins = (coinsAsString: string): Coin[] =>
  coinsAsString.split(",").map((cointAsStr) => {
    const regexMatch = cointAsStr.match(/^(\d+)([a-z]+)$/);

    if (regexMatch === null) {
      throw new Error(`cannot extract denom & amount from '${cointAsStr}'`);
    }

    return { amount: regexMatch[1], denom: regexMatch[2] };
  });
