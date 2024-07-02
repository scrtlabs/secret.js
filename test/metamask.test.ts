import { fromHex, fromUtf8, toHex, toUtf8 } from "@cosmjs/encoding";
import { keccak_256 } from "@noble/hashes/sha3";
import * as secp256k1 from "@noble/secp256k1";
import fs from "fs";
import {
  MetaMaskWallet,
  MsgStoreCodeResponse,
  SecretNetworkClient,
  TxResultCode,
} from "../src";
import { accounts, getValueFromEvents, chain1LCD } from "./utils";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

test.skip("MetaMaskWallet account derivation", async () => {
  // TODO
  // The "MetaMaskWallet signer" test only tests the signer part of the wallet
  // it gets the account/pubkey from localStorage
  // To test the account derivation code of MetaMaskWallet.create() we need to fix
  // the personal_sign function in "MetaMaskWallet signer" which sets dummy recovery id
  // when signing stuff
});

test("MetaMaskWallet signer", async () => {
  //@ts-ignore
  global.localStorage = {
    getItem: () => {
      // pubkey of account a
      return toHex(accounts[0].walletAmino.publicKey);
    },
    removeItem: () => {},
    setItem: () => {},
  };

  const ethProvider = {
    request: async (req: {
      method: "personal_sign";
      params: [string /* msgToSign */, string /* ethAddress */];
    }) => {
      const msgData = fromUtf8(fromHex(req.params[0].slice(2)));
      const length = msgData.length;
      const eip191MessagePrefix = "\x19Ethereum Signed Message:\n";

      const msgToSign = eip191MessagePrefix + length + msgData;

      const msgHash = keccak_256(toUtf8(msgToSign));

      const privkey = accounts[0].walletAmino.privateKey;

      const signature = await secp256k1.sign(msgHash, privkey, {
        extraEntropy: true,
        der: false,
      });

      // add dummy leading 0x and dummy trailing recovery id
      // this needs to be fixed to test the address derivation code
      return `0x${toHex(signature)}00`;
    },
  };

  const wallet = await MetaMaskWallet.create(
    ethProvider,
    "0x087114fb337980d7b96098785f19345531816b6d", // derived ETH address for account a
  );

  const secretjs = new SecretNetworkClient({
    url: chain1LCD,
    wallet: wallet,
    walletAddress: wallet.address,
    chainId: "secretdev-1",
  });

  const txStore = await secretjs.tx.compute.storeCode(
    {
      sender: accounts[0].address,
      wasm_byte_code: fs.readFileSync(
        `${__dirname}/snip20-ibc.wasm.gz`,
      ) as Uint8Array,
      source: "",
      builder: "",
    },
    {
      broadcastCheckIntervalMs: 100,
      gasLimit: 5_000_000,
    },
  );
  if (txStore.code !== TxResultCode.Success) {
    console.error(txStore.rawLog);
  }
  expect(txStore.code).toBe(TxResultCode.Success);

  const code_id = MsgStoreCodeResponse.decode(txStore.data[0]).code_id;
  expect(code_id).toBe(getValueFromEvents(txStore.events, "message.code_id"));

  const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
    code_id,
  });

  const tx = await secretjs.tx.compute.instantiateContract(
    {
      sender: accounts[0].address,
      code_id: code_id,
      code_hash: code_hash,
      init_msg: {
        name: "Secret SCRT",
        admin: accounts[0].address,
        symbol: "SSCRT",
        decimals: 6,
        initial_balances: [{ address: accounts[0].address, amount: "1" }],
        prng_seed: "eW8=",
        config: {
          public_total_supply: true,
          enable_deposit: true,
          enable_redeem: true,
          enable_mint: false,
          enable_burn: false,
        },
        supported_denoms: ["uscrt"],
      },
      label: `label-${Date.now()}`,
      init_funds: [],
    },
    {
      broadcastCheckIntervalMs: 100,
      gasLimit: 5_000_000,
    },
  );
  if (tx.code !== TxResultCode.Success) {
    console.error(tx.rawLog);
  }
  expect(tx.code).toBe(TxResultCode.Success);

  expect(getValueFromEvents(tx.events, "message.action")).toBe(
    "/secret.compute.v1beta1.MsgInstantiateContract",
  );
  expect(getValueFromEvents(tx.events, "message.contract_address")).toContain(
    "secret1",
  );
});
