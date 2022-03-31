import fs from "fs";
import { toBase64 } from "@cosmjs/encoding";
import {
  Account,
  exec,
  getMnemonicRegexForAccountName,
  getValueFromRawLog,
} from "./utils";
import { AminoWallet } from "../src/wallet_amino";
import { PermitError, SecretNetworkClient, Tx, Wallet } from "../src";

// @ts-ignore
let accounts: Account[];

beforeAll(async () => {
  // @ts-ignore
  accounts = global.__SCRT_TEST_ACCOUNTS__;

  // Extract genesis accounts from logs
  const accountIdToName = ["a", "b", "c", "d"];
  const { stdout: dockerLogsStdout } = await exec(
    "docker logs secretjs-testnet",
  );
  const logs = String(dockerLogsStdout);
  for (const accountId of [0, 1, 2, 3]) {
    if (!accounts[accountId]) {
      const match = logs.match(
        getMnemonicRegexForAccountName(accountIdToName[accountId]),
      );
      if (match) {
        const parsedAccount = JSON.parse(match[0]) as Account;
        parsedAccount.walletAmino = new AminoWallet(parsedAccount.mnemonic);
        parsedAccount.walletProto = new Wallet(parsedAccount.mnemonic);
        parsedAccount.secretjs = await SecretNetworkClient.create({
          grpcWebUrl: "http://localhost:9091",
          wallet: parsedAccount.walletAmino,
          walletAddress: parsedAccount.address,
          chainId: "secretdev-1",
        });
        accounts[accountId] = parsedAccount as Account;
      }
    }
  }

  // Generate a bunch of accounts because tx.staking tests require creating a bunch of validators
  for (let i = 4; i <= 19; i++) {
    const wallet = new AminoWallet();
    const [{ address, pubkey }] = await wallet.getAccounts();
    const walletProto = new Wallet(wallet.mnemonic);

    accounts[i] = {
      name: String(i),
      type: "generated for fun",
      address: address,
      pubkey: JSON.stringify({
        "@type": "cosmos.crypto.secp256k1.PubKey",
        key: toBase64(pubkey),
      }),
      mnemonic: wallet.mnemonic,
      walletAmino: wallet,
      walletProto: walletProto,
      secretjs: await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        wallet: wallet,
        walletAddress: address,
        chainId: "secretdev-1",
      }),
    };
  }

  // expect(accounts.length).toBe(20);

  // Send 100k SCRT from account 0 to each of accounts 1-19

  const { secretjs } = accounts[0];

  let tx: Tx;
  try {
    tx = await secretjs.tx.bank.multiSend(
      {
        inputs: [
          {
            address: accounts[0].address,
            coins: [{ denom: "uscrt", amount: String(100_000 * 1e6 * 19) }],
          },
        ],
        outputs: accounts.slice(1).map(({ address }) => ({
          address,
          coins: [{ denom: "uscrt", amount: String(100_000 * 1e6) }],
        })),
      },
      {
        gasLimit: 200_000,
      },
    );
  } catch (e) {
    throw new Error(`Failed to multisend: ${e.stack}`);
  }

  if (tx.code !== 0) {
    console.error(`failed to multisend coins`);
    throw new Error("Failed to multisend coins to initial accounts");
  }
});

describe("permit", () => {
  test("sign", async () => {
    const { secretjs } = accounts[0];

    const txStore = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasmByteCode: fs.readFileSync(
          `${__dirname}/snip20-ibc.wasm.gz`,
        ) as Uint8Array,
        source: "",
        builder: "",
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(txStore.code).toBe(0);

    const codeId = Number(
      getValueFromRawLog(txStore.rawLog, "message.code_id"),
    );

    const {
      codeInfo: { codeHash },
    } = await secretjs.query.compute.code(codeId);

    const txInit = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        codeId,
        codeHash,
        initMsg: {
          name: "Secret SCRT",
          admin: accounts[0].address,
          symbol: "SSCRT",
          decimals: 6,
          initial_balances: [{ address: accounts[0].address, amount: "2" }],
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
        initFunds: [],
      },
      {
        gasLimit: 5_000_000,
      },
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    let permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secret-2",
      "test",
      [contractAddress],
      ["owner", "balance"],
    );

    let query = await secretjs.query.snip20.getBalance({
      contract: { address: contractAddress, codeHash },
      address: accounts[0].address,
      auth: { permit },
    });

    expect(query.balance.amount).toEqual("2");
  });

  test("invalid permit signature", async () => {
    const { secretjs } = accounts[0];

    let permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secret-2",
      "test",
      ["abcdef"],
      ["owner", "balance"],
    );

    permit.signature = {
      signature: "afffffffffffffffffffff",
      pub_key: permit.signature.pub_key,
    };

    try {
      secretjs.utils.accessControl.permit.verify(
        permit,
        accounts[0].address,
        "abcdef",
        ["owner"],
      );
    } catch (e: any) {
      expect(e?.type).toBe("PermitError");
      return;
    }
    expect("This should have failed already").toBe("Not here");
  });

  test("contract not in permit", async () => {
    const { secretjs } = accounts[0];

    let permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secret-2",
      "test",
      ["abcdef"],
      ["owner", "balance"],
    );

    permit.signature = {
      signature: "afffffffffffffffffffff",
      pub_key: permit.signature.pub_key,
    };

    try {
      secretjs.utils.accessControl.permit.verify(
        permit,
        accounts[0].address,
        "xxxxxxxxxxxxxxxxxxxxx",
        ["owner"],
      );
    } catch (e: any) {
      expect(e?.type).toBe("PermitError");
      return;
    }
    expect("This should have failed already").toBe("Not here");
  });

  test("permit address is not signer", async () => {
    const { secretjs } = accounts[0];

    let permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secret-2",
      "test",
      ["abcdef"],
      ["owner", "balance"],
    );

    permit.signature = {
      signature: "afffffffffffffffffffff",
      pub_key: permit.signature.pub_key,
    };

    try {
      secretjs.utils.accessControl.permit.verify(
        permit,
        accounts[1].address,
        "abcdef",
        ["owner"],
      );
    } catch (e: any) {
      expect(e?.type).toBe("PermitError");
      return;
    }
    expect("This should have failed already").toBe("Not here");
  });

  test("pubkey does not match", async () => {
    const { secretjs } = accounts[0];
    const secretjs2 = accounts[1].secretjs;

    let permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secret-2",
      "test",
      ["abcdef"],
      ["owner", "balance"],
    );

    let permit2 = await secretjs2.utils.accessControl.permit.sign(
      accounts[1].address,
      "secret-2",
      "test",
      ["abcdef"],
      ["owner", "balance"],
    );

    permit.signature = permit2.signature;

    try {
      secretjs.utils.accessControl.permit.verify(
        permit,
        accounts[1].address,
        "abcdef",
        ["owner"],
      );
    } catch (e: any) {
      expect(e?.type).toBe("PermitError");
      return;
    }
    expect("This should have failed already").toBe("Not here");
  });
});
