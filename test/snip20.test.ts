import fs from "fs";
import { bech32 } from "bech32";
import { fromUtf8, toBase64 } from "@cosmjs/encoding";
import {
  Account,
  exec,
  getMnemonicRegexForAccountName,
  getValueFromRawLog,
} from "./utils";
import { AminoWallet } from "../src/wallet_amino";
import { SecretNetworkClient, Tx, Wallet } from "../src";

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

describe("tx.snip20", () => {
  test("transfer", async () => {
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

    expect(txInit.code).toBe(0);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "instantiate",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    const txExec = await secretjs.tx.snip20.transfer(
      {
        sender: secretjs.address,
        contract: contractAddress,
        msg: { transfer: { recipient: accounts[1].address, amount: "2" } },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(fromUtf8(txExec.data[0])).toContain(
      '{"transfer":{"status":"success"}}',
    );
  });

  test("send", async () => {
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

    expect(txInit.code).toBe(0);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "instantiate",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    const txExec = await secretjs.tx.snip20.send(
      {
        sender: secretjs.address,
        contract: contractAddress,
        msg: { send: { recipient: accounts[1].address, amount: "2" } },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(fromUtf8(txExec.data[0])).toContain('{"send":{"status":"success"}}');
  });

  test("increase allowance", async () => {
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

    expect(txInit.code).toBe(0);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "instantiate",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    let txExec = await secretjs.tx.snip20.increaseAllowance(
      {
        sender: secretjs.address,
        contract: contractAddress,
        msg: {
          increase_allowance: { spender: accounts[1].address, amount: "2" },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(fromUtf8(txExec.data[0])).toContain("increase_allowance");
  });

  test("decrease allowance", async () => {
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

    expect(txInit.code).toBe(0);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "instantiate",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    let txExec = await secretjs.tx.snip20.increaseAllowance(
      {
        sender: secretjs.address,
        contract: contractAddress,
        msg: {
          increase_allowance: { spender: accounts[1].address, amount: "2" },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(fromUtf8(txExec.data[0])).toContain("increase_allowance");

    txExec = await secretjs.tx.snip20.decreaseAllowance(
      {
        sender: secretjs.address,
        contract: contractAddress,
        msg: {
          decrease_allowance: { spender: accounts[1].address, amount: "2" },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(fromUtf8(txExec.data[0])).toContain("decrease_allowance");
  });
});

describe("query.snip20", () => {
  test("balance", async () => {
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

    expect(txInit.code).toBe(0);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "instantiate",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    const txExec = await secretjs.tx.snip20.setViewingKey({
      sender: secretjs.address,
      contract: contractAddress,
      msg: { set_viewing_key: { key: "hello" } },
    });

    const txQuery = await secretjs.query.snip20.getBalance({
      address: secretjs.address,
      contract: { address: contractAddress, codeHash: codeHash },
      auth: { key: "hello" },
    });

    expect(txQuery.balance.amount).toEqual("2");
  });

  test("token parameters", async () => {
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

    expect(txInit.code).toBe(0);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "instantiate",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    const txQuery = await secretjs.query.snip20.getSnip20Params({
      contract: { address: contractAddress, codeHash: codeHash },
    });

    expect(txQuery).toEqual({
      token_info: {
        decimals: 6,
        name: "Secret SCRT",
        symbol: "SSCRT",
        total_supply: "2",
      },
    });
  });

  test("allowance", async () => {
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

    expect(txInit.code).toBe(0);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "instantiate",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    await secretjs.tx.snip20.increaseAllowance(
      {
        sender: secretjs.address,
        contract: contractAddress,
        msg: {
          increase_allowance: { spender: accounts[1].address, amount: "2" },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    await secretjs.tx.snip20.setViewingKey({
      sender: secretjs.address,
      contract: contractAddress,
      msg: { set_viewing_key: { key: "hello" } },
    });

    const txQuery = await secretjs.query.snip20.GetAllowance({
      contract: { address: contractAddress, codeHash: codeHash },
      owner: secretjs.address,
      spender: accounts[1].address,
      auth: { key: "hello" },
    });

    expect(txQuery.allowance).toEqual({
      allowance: "2",
      expiration: null,
      owner: secretjs.address,
      spender: accounts[1].address,
    });
  });

  test("transaction history", async () => {
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

    expect(txInit.code).toBe(0);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "instantiate",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    await secretjs.tx.snip20.setViewingKey({
      sender: secretjs.address,
      contract: contractAddress,
      msg: { set_viewing_key: { key: "hello" } },
    });

    await secretjs.tx.snip20.transfer(
      {
        sender: secretjs.address,
        contract: contractAddress,
        msg: { transfer: { recipient: accounts[1].address, amount: "2" } },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const txQuery = await secretjs.query.snip20.getTransactionHistory({
      contract: { address: contractAddress, codeHash: codeHash },
      address: secretjs.address,
      auth: { key: "hello" },
      page_size: 10,
    });

    expect(txQuery.transaction_history.total).toBe(2);
    expect(txQuery.transaction_history.txs[0].coins).toEqual({
      amount: "2",
      denom: "SSCRT",
    });
    expect(txQuery.transaction_history.txs[0].action).toEqual({
      transfer: {
        from: secretjs.address,
        recipient: accounts[1].address,
        sender: secretjs.address,
      },
    });
  });
});
