import fs from "fs";
import { SecretNetworkClient, Tx } from "../src/secret_network_client";
import { AminoWallet } from "../src/wallet_amino";
import { Wallet } from "../src/wallet_proto";
import { Account, getValueFromRawLog } from "./utils";

// @ts-ignore
let accounts: Account[];

// @ts-ignore
let v1CodeID: number;

// @ts-ignore
let v1ContractHash: string;

beforeAll(async () => {
  // @ts-ignore
  accounts = global.__SCRT_TEST_ACCOUNTS__;

  // Initialize genesis accounts
  const mnemonics = [
    "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
    "jelly shadow frog dirt dragon use armed praise universe win jungle close inmate rain oil canvas beauty pioneer chef soccer icon dizzy thunder meadow",
    "chair love bleak wonder skirt permit say assist aunt credit roast size obtain minute throw sand usual age smart exact enough room shadow charge",
    "word twist toast cloth movie predict advance crumble escape whale sail such angry muffin balcony keen move employ cook valve hurt glimpse breeze brick",
  ];

  accounts = new Array();
  for (let i = 0; i < mnemonics.length; i++) {
    const mnemonic = mnemonics[i];
    const walletAmino = new AminoWallet(mnemonic);
    accounts[i] = {
      address: walletAmino.address,
      mnemonic: mnemonic,
      walletAmino,
      walletProto: new Wallet(mnemonic),
      secretjs: await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        wallet: walletAmino,
        walletAddress: walletAmino.address,
        chainId: "secretdev-1",
      }),
    };
  }

  // Send 100k SCRT from account 0 to each of accounts 1-19

  const { secretjs } = accounts[0];

  let tx: Tx;
  try {
    tx = await secretjs.tx.bank.multiSend(
      {
        inputs: [
          {
            address: accounts[0].address,
            coins: [
              {
                denom: "uscrt",
                amount: String(100_000 * 1e6 * accounts.slice(1).length),
              },
            ],
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

  const txStoreV1 = await secretjs.tx.compute.storeCode(
    {
      sender: accounts[0].address,
      wasmByteCode: fs.readFileSync(
        `${__dirname}/test_contract_v1.wasm`,
      ) as Uint8Array,
      source: "",
      builder: "",
    },
    {
      gasLimit: 5_000_000,
    },
  );

  expect(txStoreV1.code).toBe(0);

  v1ContractHash = (await secretjs.query.compute.code(v1CodeID)).codeInfo
    .codeHash;
});

type Result = {
  get: {
    count: number;
  };
};

describe("v1.revert_state", () => {
  test("quick_error()", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        codeId: v1CodeID,
        codeHash: v1ContractHash,
        initMsg: {
          counter: { counter: 10, expires: 100 },
        },
        label: `label-${Date.now()}`,
        initFunds: [],
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const addr = getValueFromRawLog(tx.rawLog, "message.contract_address");

    await secretjs.tx.compute.executeContract(
      {
        sender: accounts[0].address,
        contractAddress: addr,
        msg: {
          quick_error: {},
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const result = (await secretjs.query.compute.queryContract({
      contractAddress: addr,
      codeHash: v1ContractHash,
      query: {
        get: {},
      },
    })) as Result;

    expect(result.get.count).toBe(10);
  });

  test("multiple_sub_messages_no_reply_with_error()", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        codeId: v1CodeID,
        codeHash: v1ContractHash,
        initMsg: {
          counter: { counter: 10, expires: 100 },
        },
        label: `label-${Date.now()}`,
        initFunds: [],
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const addr = getValueFromRawLog(tx.rawLog, "message.contract_address");

    await secretjs.tx.compute.executeContract(
      {
        sender: accounts[0].address,
        contractAddress: addr,
        msg: {
          multiple_sub_messages_no_reply_with_error: {},
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const result = (await secretjs.query.compute.queryContract({
      contractAddress: addr,
      codeHash: v1ContractHash,
      query: {
        get: {},
      },
    })) as Result;

    expect(result.get.count).toBe(10);
  });

  test("multiple_sub_messages_no_reply_with_panic()", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        codeId: v1CodeID,
        codeHash: v1ContractHash,
        initMsg: {
          counter: { counter: 10, expires: 100 },
        },
        label: `label-${Date.now()}`,
        initFunds: [],
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const addr = getValueFromRawLog(tx.rawLog, "message.contract_address");

    await secretjs.tx.compute.executeContract(
      {
        sender: accounts[0].address,
        contractAddress: addr,
        msg: {
          multiple_sub_messages_no_reply_with_panic: {},
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const result = (await secretjs.query.compute.queryContract({
      contractAddress: addr,
      codeHash: v1ContractHash,
      query: {
        get: {},
      },
    })) as Result;

    expect(result.get.count).toBe(10);
  });

  test("multiple_sub_messages_with_reply_with_error()", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        codeId: v1CodeID,
        codeHash: v1ContractHash,
        initMsg: {
          counter: { counter: 10, expires: 100 },
        },
        label: `label-${Date.now()}`,
        initFunds: [],
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const addr = getValueFromRawLog(tx.rawLog, "message.contract_address");

    await secretjs.tx.compute.executeContract(
      {
        sender: accounts[0].address,
        contractAddress: addr,
        msg: {
          multiple_sub_messages_with_reply_with_error: {},
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const result = (await secretjs.query.compute.queryContract({
      contractAddress: addr,
      codeHash: v1ContractHash,
      query: {
        get: {},
      },
    })) as Result;

    expect(result.get.count).toBe(22);
  });

  test("multiple_sub_messages_with_reply_with_panic()", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        codeId: v1CodeID,
        codeHash: v1ContractHash,
        initMsg: {
          counter: { counter: 10, expires: 100 },
        },
        label: `label-${Date.now()}`,
        initFunds: [],
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const addr = getValueFromRawLog(tx.rawLog, "message.contract_address");

    await secretjs.tx.compute.executeContract(
      {
        sender: accounts[0].address,
        contractAddress: addr,
        msg: {
          multiple_sub_messages_with_reply_with_panic: {},
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const result = (await secretjs.query.compute.queryContract({
      contractAddress: addr,
      codeHash: v1ContractHash,
      query: {
        get: {},
      },
    })) as Result;

    expect(result.get.count).toBe(10);
  });
});
