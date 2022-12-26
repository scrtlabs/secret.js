import { fromHex, fromUtf8, toHex, toUtf8 } from "@cosmjs/encoding";
import { jest } from "@jest/globals";
import { keccak_256 } from "@noble/hashes/sha3";
import * as secp256k1 from "@noble/secp256k1";
import {
  MetaMaskWallet,
  SecretNetworkClient,
  TxResultCode,
  Wallet,
} from "../src";
import { AminoWallet } from "../src/wallet_amino";
import {
  Account,
  checkInstantiateSuccess,
  localsecretRestApi,
  storeSnip20Ibc,
} from "./utils";

const accountNumber = 2;

//@ts-ignore
let accounts: Account[];

beforeAll(async () => {
  jest.spyOn(console, "warn").mockImplementation(() => {});

  //@ts-ignore
  accounts = global.__SCRT_TEST_ACCOUNTS__;

  // Initialize genesis accounts
  const mnemonics = [
    "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar", // account a
    "jelly shadow frog dirt dragon use armed praise universe win jungle close inmate rain oil canvas beauty pioneer chef soccer icon dizzy thunder meadow", // account b
    "chair love bleak wonder skirt permit say assist aunt credit roast size obtain minute throw sand usual age smart exact enough room shadow charge", // account c
    // account d is used by ts-relayer
  ];

  const mnemonic = mnemonics[accountNumber];
  const walletAmino = new AminoWallet(mnemonic);
  accounts[accountNumber] = {
    address: walletAmino.address,
    mnemonic: mnemonic,
    walletAmino,
    walletProto: new Wallet(mnemonic),
    secretjs: new SecretNetworkClient({
      url: localsecretRestApi,
      wallet: walletAmino,
      walletAddress: walletAmino.address,
      chainId: "secretdev-1",
    }),
  };
});

async function fundAccount(address: string) {
  const tx = await accounts[accountNumber].secretjs.tx.bank.send({
    amount: [{ amount: "1", denom: "uscrt" }],
    from_address: accounts[accountNumber].address,
    to_address: address,
  });

  if (tx.code === TxResultCode.Success) {
    return;
  }
}

test("MetaMaskWallet", async () => {
  //@ts-ignore
  global.localStorage = {
    getItem: () => {
      // pubkey of account a
      return toHex(accounts[accountNumber].walletAmino.publicKey);
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

      const privkey = accounts[2].walletAmino.privateKey;

      const signature = await secp256k1.sign(msgHash, privkey, {
        extraEntropy: true,
        der: false,
      });

      // add dummy leading 0x and trailing recovery id
      return `0x${toHex(signature)}00`;
    },
  };

  const wallet = await MetaMaskWallet.create(ethProvider, "blabla");

  let address = (await wallet.getAccounts())[0].address;
  console.log(`testing for address: ${address}`);

  console.log(`Funding account...`);
  await fundAccount(address);
  console.log(`done`);

  const secretjs = new SecretNetworkClient({
    url: localsecretRestApi,
    wallet: wallet,
    walletAddress: wallet.address,
    chainId: "secretdev-1",
  });

  const code_id = await storeSnip20Ibc(
    secretjs,
    accounts[accountNumber].address,
  );

  const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
    code_id,
  });

  const tx = await secretjs.tx.compute.instantiateContract(
    {
      sender: accounts[accountNumber].address,
      code_id: code_id,
      code_hash: code_hash,
      init_msg: {
        name: "Secret SCRT",
        admin: accounts[accountNumber].address,
        symbol: "SSCRT",
        decimals: 6,
        initial_balances: [
          { address: accounts[accountNumber].address, amount: "1" },
        ],
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
  checkInstantiateSuccess(tx);
});
