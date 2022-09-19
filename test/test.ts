import { fromUtf8, toBase64 } from "@cosmjs/encoding";
import { bech32 } from "bech32";
import fs from "fs";
import {
  BaseAccount,
  BondStatus,
  gasToFee,
  MsgDelegate,
  MsgExecuteContract,
  MsgGrantAuthorization,
  MsgSend,
  Proposal,
  ProposalStatus,
  ProposalType,
  SecretNetworkClient,
  StakeAuthorizationType,
  Tx,
  TxResultCode,
  VoteOption,
  Wallet,
} from "../src";
import {
  MsgExecuteContractResponse,
  MsgInstantiateContractResponse,
} from "../src/protobuf_stuff/secret/compute/v1beta1/msg";
import { AminoWallet } from "../src/wallet_amino";
import {
  Account,
  exec,
  getBalance,
  getValueFromRawLog,
  initContract,
  sleep,
  storeContract,
} from "./utils";

//@ts-ignore
let accounts: Account[];

beforeAll(async () => {
  //@ts-ignore
  accounts = global.__SCRT_TEST_ACCOUNTS__;

  // Initialize genesis accounts
  const mnemonics = [
    "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
    "jelly shadow frog dirt dragon use armed praise universe win jungle close inmate rain oil canvas beauty pioneer chef soccer icon dizzy thunder meadow",
    "chair love bleak wonder skirt permit say assist aunt credit roast size obtain minute throw sand usual age smart exact enough room shadow charge",
    "word twist toast cloth movie predict advance crumble escape whale sail such angry muffin balcony keen move employ cook valve hurt glimpse breeze brick",
  ];

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

  // Generate a bunch of accounts because tx.staking tests require creating a bunch of validators
  for (let i = 4; i <= 19; i++) {
    const wallet = new AminoWallet();
    const [{ address }] = await wallet.getAccounts();
    const walletProto = new Wallet(wallet.mnemonic);

    accounts[i] = {
      address: address,
      mnemonic: wallet.mnemonic,
      walletAmino: wallet,
      walletProto: walletProto,
      secretjs: await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        chainId: "secretdev-1",
        wallet: wallet,
        walletAddress: address,
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
            coins: [{ denom: "uscrt", amount: String(100_000 * 1e6 * 19) }],
          },
        ],
        outputs: accounts.slice(1).map(({ address }) => ({
          address,
          coins: [{ denom: "uscrt", amount: String(100_000 * 1e6) }],
        })),
      },
      {
        broadcastCheckIntervalMs: 100,
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

  // for (let accountId = 0; accountId < 20; accountId++) {
  //   console.log(
  //     `account[${accountId}]:\n${JSON.stringify(
  //       {
  //         ...accounts[accountId],
  //         walletAmino: undefined, // don't flood the screen with wallet object internals
  //         walletProto: undefined, // don't flood the screen with wallet object internals
  //         secretjs: undefined, // don't flood the screen with secretjs object internals
  //       },
  //       null,
  //       2,
  //     )}`,
  //   );
  // }

  // console.log(`setting: global.__SCRT_TEST_ACCOUNTS__ ${accounts}`);
  //@ts-ignore
  // global.__SCRT_TEST_ACCOUNTS__ = accounts;
});

describe("query", () => {
  test("query.getTx", async () => {
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
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

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
        initFunds: [],
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "/secret.compute.v1beta1.MsgInstantiateContract",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contractAddress).toBe(
      MsgInstantiateContractResponse.decode(txInit.data[0]).address,
    );

    const tx = await secretjs.tx.broadcast(
      [
        new MsgExecuteContract({
          sender: secretjs.address,
          contractAddress,
          msg: {
            create_viewing_key: {
              entropy: "bla bla",
            },
          },
          codeHash,
        }),
      ],
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    let txExec = await secretjs.query.getTx(tx.transactionHash);
    while (txExec === null) {
      sleep(100);
      txExec = await secretjs.query.getTx(tx.transactionHash);
    }

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(txExec.data[0]).data),
    ).toContain('{"create_viewing_key":{"key":"');
  });

  test("query.getTx error", async () => {
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
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

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
        initFunds: [],
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "/secret.compute.v1beta1.MsgInstantiateContract",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );

    const tx = await secretjs.tx.broadcast(
      [
        new MsgExecuteContract({
          sender: accounts[0].address,
          contractAddress: contractAddress,
          codeHash,
          msg: {
            transfer: {
              recipient: accounts[1].address,
              amount: "2",
            },
          },
        }),
      ],
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    let txExec = await secretjs.query.getTx(tx.transactionHash);
    while (txExec === null) {
      sleep(100);
      txExec = await secretjs.query.getTx(tx.transactionHash);
    }

    expect(txExec.rawLog).toContain(
      "failed to execute message; message index: 0",
    );
    expect(txExec.jsonLog).toStrictEqual({
      generic_err: { msg: "insufficient funds: balance=1, required=2" },
    });
  });
});

describe("query.auth", () => {
  test("accounts()", async () => {
    const { secretjs } = accounts[0];

    const result = await secretjs.query.auth.accounts({});

    // 20 accounts with a balance and 7? module accounts - ordering of tests can affect this.
    // it's more robust to check eq&gt rather than flat equality
    expect(result.length).toBeGreaterThanOrEqual(27);
    expect(
      result.filter((x) => x?.type === "ModuleAccount").length,
    ).toBeGreaterThanOrEqual(7);
    expect(
      result.filter((x) => x?.type === "BaseAccount").length,
    ).toBeGreaterThanOrEqual(20);
    expect(
      result.filter((x) => {
        if (x?.type !== "BaseAccount") {
          return false;
        }

        const account = x.account as BaseAccount;

        return (
          account.address === accounts[0].address ||
          account.address === accounts[1].address
        );
      }).length,
    ).toBe(2);
  });

  test("account()", async () => {
    const { secretjs } = accounts[0];

    const response = await secretjs.query.auth.account({
      address: accounts[1].address,
    });

    if (!response) {
      fail(`Account "${accounts[1].address}" should exist`);
    }

    expect(response.type).toBe("BaseAccount");

    const account = response.account as BaseAccount;

    expect(account.address).toBe(accounts[1].address);
    expect(account.accountNumber).toBe("1");
    expect(account.sequence).toBe("0");
  });

  test("params()", async () => {
    const { secretjs } = accounts[0];

    const { params } = await secretjs.query.auth.params();
    expect(params).toStrictEqual({
      maxMemoCharacters: "256",
      sigVerifyCostEd25519: "590",
      sigVerifyCostSecp256k1: "1000",
      txSigLimit: "7",
      txSizeCostPerByte: "10",
    });
  });
});

describe("query.compute", () => {
  let sSCRT: string;

  beforeAll(async () => {
    const codeId = await storeContract(
      `${__dirname}/snip20-ibc.wasm.gz`,
      accounts[0],
    );

    sSCRT = await initContract(
      codeId,
      {
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
      accounts[0],
    );
  });

  test("queryContract()", async () => {
    const { secretjs } = accounts[0];

    type Result = {
      token_info: {
        decimals: number;
        name: string;
        symbol: string;
        total_supply: string;
      };
    };

    const result = (await secretjs.query.compute.queryContract({
      contractAddress: sSCRT,
      //codeHash,
      query: { token_info: {} },
    })) as Result;

    expect(result).toStrictEqual({
      token_info: {
        decimals: 6,
        name: "Secret SCRT",
        symbol: "SSCRT",
        total_supply: "1",
      },
    });
  });

  test("queryContract() StdError", async () => {
    const { secretjs } = accounts[0];

    const result = await secretjs.query.compute.queryContract({
      contractAddress: sSCRT,
      query: {
        balance: {
          address: accounts[0].address,
          key: "wrong",
        },
      },
    });

    expect(result).toStrictEqual({
      viewing_key_error: {
        msg: "Wrong viewing key for this address or viewing key not set",
      },
    });
  });

  test("queryContract() VmError", async () => {
    const { secretjs } = accounts[0];

    const result = await secretjs.query.compute.queryContract({
      contractAddress: sSCRT,
      query: {
        non_existent_query: {},
      },
    });

    expect(result).toEqual(
      '{"parse_err":{"msg":"unknown variant `non_existent_query`, expected one of `token_info`, `token_config`, `contract_status`, `exchange_rate`, `allowance`, `balance`, `transfer_history`, `transaction_history`, `minters`, `with_permit`","target":"snip20_reference_impl::msg::QueryMsg"}}',
    );
  });

  test("queryContract() without codeHash", async () => {
    const { secretjs } = accounts[0];

    type Result = {
      token_info: {
        decimals: number;
        name: string;
        symbol: string;
        total_supply: string;
      };
    };

    const result = (await secretjs.query.compute.queryContract({
      contractAddress: sSCRT,
      query: { token_info: {} },
    })) as Result;

    expect(result).toStrictEqual({
      token_info: {
        decimals: 6,
        name: "Secret SCRT",
        symbol: "SSCRT",
        total_supply: "1",
      },
    });
  });
});

describe("tx.bank", () => {
  test("MsgSend", async () => {
    const { secretjs } = accounts[0];

    const aBefore = await getBalance(secretjs, accounts[0].address);
    const cBefore = await getBalance(secretjs, accounts[2].address);

    const sim = await secretjs.tx.bank.send.simulate({
      fromAddress: accounts[0].address,
      toAddress: accounts[2].address,
      amount: [{ denom: "uscrt", amount: "1" }],
    });

    const gasLimit = Math.ceil(Number(sim.gasInfo!.gasUsed) * 1.25);

    const msg = {
      fromAddress: accounts[0].address,
      toAddress: accounts[2].address,
      amount: [{ denom: "uscrt", amount: "1" }],
    };
    const tx = await secretjs.tx.bank.send(msg, {
      broadcastCheckIntervalMs: 100,
      gasLimit: gasLimit,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);
    expect(tx.tx.body.messages[0].value).toStrictEqual(msg);

    const aAfter = await getBalance(secretjs, accounts[0].address);
    const cAfter = await getBalance(secretjs, accounts[2].address);

    expect(aBefore - aAfter).toBe(BigInt(1) + BigInt(gasToFee(gasLimit, 0.1)));
    expect(cAfter - cBefore).toBe(BigInt(1));
  });

  test("MsgMultiSend", async () => {
    const { secretjs } = accounts[0];

    const aBefore = await getBalance(secretjs, accounts[0].address);
    const bBefore = await getBalance(secretjs, accounts[1].address);
    const cBefore = await getBalance(secretjs, accounts[2].address);

    const gasLimit = 20_000;

    const tx = await secretjs.tx.bank.multiSend(
      {
        inputs: [
          {
            address: accounts[0].address,
            coins: [{ denom: "uscrt", amount: "2" }],
          },
        ],
        outputs: [
          {
            address: accounts[1].address,
            coins: [{ denom: "uscrt", amount: "1" }],
          },
          {
            address: accounts[2].address,
            coins: [{ denom: "uscrt", amount: "1" }],
          },
        ],
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: gasLimit,
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    const aAfter = await getBalance(secretjs, accounts[0].address);
    const bAfter = await getBalance(secretjs, accounts[1].address);
    const cAfter = await getBalance(secretjs, accounts[2].address);

    expect(aBefore - aAfter).toBe(BigInt(2) + BigInt(gasToFee(gasLimit, 0.1)));
    expect(bAfter - bBefore).toBe(BigInt(1));
    expect(cAfter - cBefore).toBe(BigInt(1));
  });
});

describe("tx.compute", () => {
  test("MsgStoreCode", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasmByteCode: fs.readFileSync(
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
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);
    expect(
      Number(getValueFromRawLog(tx.rawLog, "message.code_id")),
    ).toBeGreaterThan(0);
  });

  test("MsgInstantiateContract", async () => {
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
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const codeId = Number(
      getValueFromRawLog(txStore.rawLog, "message.code_id"),
    );

    const {
      codeInfo: { codeHash },
    } = await secretjs.query.compute.code(codeId);

    const tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        codeId,
        codeHash,
        initMsg: {
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
        initFunds: [],
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

    expect(getValueFromRawLog(tx.rawLog, "message.action")).toBe(
      "/secret.compute.v1beta1.MsgInstantiateContract",
    );
    expect(getValueFromRawLog(tx.rawLog, "message.contract_address")).toContain(
      "secret1",
    );
  });

  test("MsgInstantiateContract VmError", async () => {
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
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const codeId = Number(
      getValueFromRawLog(txStore.rawLog, "message.code_id"),
    );

    const {
      codeInfo: { codeHash },
    } = await secretjs.query.compute.code(codeId);

    const tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        codeId,
        codeHash,
        initMsg: {},
        label: `label-${Date.now()}`,
        initFunds: [],
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );

    expect(tx.jsonLog).toStrictEqual({
      parse_err: {
        msg: "missing field `name`",
        target: "snip20_reference_impl::msg::InitMsg",
      },
    });
  });

  test("MsgExecuteContract xyz", async () => {
    const { secretjs } = accounts[0];

    const storeInput = {
      sender: accounts[0].address,
      wasmByteCode: fs.readFileSync(
        `${__dirname}/snip721.wasm.gz`,
      ) as Uint8Array,
      source: "",
      builder: "",
    };

    const simStore = await secretjs.tx.compute.storeCode.simulate(storeInput);

    const txStore = await secretjs.tx.compute.storeCode(storeInput, {
      broadcastCheckIntervalMs: 100,
      gasLimit: Math.ceil(Number(simStore.gasInfo!.gasUsed) * 1.25),
    });
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const codeId = Number(
      getValueFromRawLog(txStore.rawLog, "message.code_id"),
    );

    const {
      codeInfo: { codeHash },
    } = await secretjs.query.compute.code(codeId);

    const initInput = {
      sender: accounts[0].address,
      codeId,
      // codeHash, // Test MsgInstantiateContract without codeHash
      initMsg: {
        name: "SecretJS NFTs",
        symbol: "YOLO",
        admin: accounts[0].address,
        entropy: "a2FraS1waXBpCg==",
        royalty_info: {
          decimal_places_in_rates: 4,
          royalties: [{ recipient: accounts[0].address, rate: 700 }],
        },
        config: { public_token_supply: true },
      },
      label: `label-${Date.now()}`,
      initFunds: [],
    };

    const simInit = await secretjs.tx.compute.instantiateContract.simulate(
      initInput,
    );

    const txInit = await secretjs.tx.compute.instantiateContract(initInput, {
      broadcastCheckIntervalMs: 100,
      gasLimit: Math.ceil(Number(simInit.gasInfo!.gasUsed) * 1.25),
    });
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);
    expect(txInit.tx.body.messages[0].value.initMsg).toStrictEqual(
      initInput.initMsg,
    );

    const contract = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );

    const addMinterMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contractAddress: contract,
      // codeHash, // Test MsgExecuteContract without codeHash
      msg: { add_minters: { minters: [accounts[0].address] } },
      sentFunds: [],
    });

    const mintMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contractAddress: contract,
      codeHash,
      msg: {
        mint_nft: {
          token_id: "1",
          owner: accounts[0].address,
          public_metadata: {
            extension: {
              image:
                "https://scrt.network/secretnetwork-logo-secondary-black.png",
              name: "secretnetwork-logo-secondary-black",
            },
          },
          private_metadata: {
            extension: {
              image:
                "https://scrt.network/secretnetwork-logo-primary-white.png",
              name: "secretnetwork-logo-primary-white",
            },
          },
        },
      },
      sentFunds: [],
    });

    const simExec = await secretjs.tx.simulate([addMinterMsg, mintMsg]);

    const tx = await secretjs.tx.broadcast([addMinterMsg, mintMsg], {
      broadcastCheckIntervalMs: 100,
      gasLimit: Math.ceil(Number(simExec.gasInfo!.gasUsed) * 1.25),
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);
    expect(tx.tx.body.messages.map((m) => m.value.msg)).toStrictEqual([
      addMinterMsg.msg,
      mintMsg.msg,
    ]);

    expect(getValueFromRawLog(tx.rawLog, "message.contract_address")).toBe(
      contract,
    );

    // Check decryption
    expect(tx.arrayLog![10].key).toBe("minted");
    expect(tx.arrayLog![10].value).toBe("1");
  });

  test("MsgExecuteContract StdError", async () => {
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
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

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
        initFunds: [],
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "/secret.compute.v1beta1.MsgInstantiateContract",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );

    const txExec = await secretjs.tx.compute.executeContract(
      {
        sender: accounts[0].address,
        contractAddress: contractAddress,
        codeHash,
        msg: {
          transfer: {
            recipient: accounts[1].address,
            amount: "2",
          },
        },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );

    expect(txExec.rawLog).toContain(
      "failed to execute message; message index: 0",
    );
    expect(txExec.jsonLog).toStrictEqual({
      generic_err: { msg: "insufficient funds: balance=1, required=2" },
    });
  });

  test("MsgExecuteContract decrypt output data", async () => {
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
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

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
        initFunds: [],
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "/secret.compute.v1beta1.MsgInstantiateContract",
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contractAddress).toBe(
      MsgInstantiateContractResponse.decode(txInit.data[0]).address,
    );

    const txExec = await secretjs.tx.compute.executeContract(
      {
        sender: accounts[0].address,
        contractAddress: contractAddress,
        codeHash,
        msg: {
          create_viewing_key: {
            entropy: "bla bla",
          },
        },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(txExec.data[0]).data),
    ).toContain('{"create_viewing_key":{"key":"');
  });

  test("MsgExecuteContract VmError", async () => {
    const { secretjs } = accounts[0];

    const txStore = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasmByteCode: fs.readFileSync(
          `${__dirname}/snip721.wasm.gz`,
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
        // codeHash, // Test MsgInstantiateContract without codeHash
        initMsg: {
          name: "SecretJS NFTs",
          symbol: "YOLO",
          admin: accounts[0].address,
          entropy: "a2FraS1waXBpCg==",
          royalty_info: {
            decimal_places_in_rates: 4,
            royalties: [{ recipient: accounts[0].address, rate: 700 }],
          },
          config: { public_token_supply: true },
        },
        label: `label-${Date.now()}`,
        initFunds: [],
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    const contract = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );

    const addMinterMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contractAddress: contract,
      // codeHash, // Test MsgExecuteContract without codeHash
      msg: { add_minters: { minters: [accounts[0].address] } },
      sentFunds: [],
    });

    const mintMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contractAddress: contract,
      codeHash,
      msg: {
        yolo: {},
      },
      sentFunds: [],
    });

    const tx = await secretjs.tx.broadcast([addMinterMsg, mintMsg], {
      broadcastCheckIntervalMs: 100,
      gasLimit: 5_000_000,
    });

    expect(tx.jsonLog).toStrictEqual({
      parse_err: {
        msg: "unknown variant `yolo`, expected one of `mint_nft`, `batch_mint_nft`, `mint_nft_clones`, `set_metadata`, `set_royalty_info`, `reveal`, `make_ownership_private`, `set_global_approval`, `set_whitelisted_approval`, `approve`, `revoke`, `approve_all`, `revoke_all`, `transfer_nft`, `batch_transfer_nft`, `send_nft`, `batch_send_nft`, `burn_nft`, `batch_burn_nft`, `register_receive_nft`, `create_viewing_key`, `set_viewing_key`, `add_minters`, `remove_minters`, `set_minters`, `change_admin`, `set_contract_status`, `revoke_permit`",
        target: "snip721_reference_impl::msg::HandleMsg",
      },
    });
    expect(tx.rawLog).toContain("failed to execute message; message index: 1");
  });
});

describe("tx.gov", () => {
  async function getAllProposals(
    secretjs: SecretNetworkClient,
  ): Promise<Proposal[]> {
    const { proposals } = await secretjs.query.gov.proposals({
      proposalStatus: ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
      voter: "",
      depositor: "",
    });

    return proposals;
  }

  describe("MsgSubmitProposal", () => {
    test("TextProposal", async () => {
      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const tx = await secretjs.tx.gov.submitProposal(
        {
          type: ProposalType.TextProposal,
          proposer: accounts[0].address,
          initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
          content: {
            title: "Hi",
            description: "Hello",
          },
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

      expect(
        getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_type"),
      ).toBe("Text");

      expect(
        Number(getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_id")),
      ).toBeGreaterThanOrEqual(1);

      const proposalsAfter = await getAllProposals(secretjs);

      expect(proposalsAfter.length - proposalsBefore.length).toBe(1);
    });

    test("CommunityPoolSpendProposal", async () => {
      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const tx = await secretjs.tx.gov.submitProposal(
        {
          type: ProposalType.CommunityPoolSpendProposal,
          proposer: accounts[0].address,
          initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
          content: {
            title: "Hi",
            description: "Hello",
            recipient: accounts[1].address,
            amount: [{ amount: "1", denom: "uscrt" }],
          },
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

      expect(
        getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_type"),
      ).toBe("CommunityPoolSpend");
      expect(
        Number(getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_id")),
      ).toBeGreaterThanOrEqual(1);

      const proposalsAfter = await getAllProposals(secretjs);

      expect(proposalsAfter.length - proposalsBefore.length).toBe(1);
    });

    test("ParameterChangeProposal", async () => {
      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const tx = await secretjs.tx.gov.submitProposal(
        {
          type: ProposalType.ParameterChangeProposal,
          proposer: accounts[0].address,
          initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
          content: {
            title: "Hi",
            description: "YOLO",
            changes: [
              { subspace: "auth", key: "MaxMemoCharacters", value: '"512"' },
            ],
          },
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

      expect(
        getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_type"),
      ).toBe("ParameterChange");
      expect(
        Number(getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_id")),
      ).toBeGreaterThanOrEqual(1);

      const proposalsAfter = await getAllProposals(secretjs);

      expect(proposalsAfter.length - proposalsBefore.length).toBe(1);
    });

    test("SoftwareUpgradeProposal", async () => {
      // TODO make this work
      // https://discord.com/channels/669268347736686612/680435043570941973/938352848905863178

      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const tx = await secretjs.tx.gov.submitProposal(
        {
          type: ProposalType.SoftwareUpgradeProposal,
          proposer: accounts[0].address,
          initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
          content: {
            title: "Hi let's upgrade",
            description: "PROD NO FEAR",
            plan: {
              name: "Shockwave!",
              height: "1000000",
              info: "000000000019D6689C085AE165831E934FF763AE46A2A6C172B3F1B60A8CE26F",
            },
          },
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

      expect(
        getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_type"),
      ).toBe("SoftwareUpgrade");
      expect(
        Number(getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_id")),
      ).toBeGreaterThanOrEqual(1);

      const proposalsAfter = await getAllProposals(secretjs);

      expect(proposalsAfter.length - proposalsBefore.length).toBe(1);
    });

    test("CancelSoftwareUpgradeProposal", async () => {
      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const tx = await secretjs.tx.gov.submitProposal(
        {
          type: ProposalType.CancelSoftwareUpgradeProposal,
          proposer: accounts[0].address,
          initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
          content: {
            title: "Hi let's cancel",
            description: "PROD FEAR",
          },
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

      expect(
        getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_type"),
      ).toBe("CancelSoftwareUpgrade");
      expect(
        Number(getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_id")),
      ).toBeGreaterThanOrEqual(1);

      const proposalsAfter = await getAllProposals(secretjs);

      expect(proposalsAfter.length - proposalsBefore.length).toBe(1);
    });
  });

  test("MsgVote", async () => {
    const { secretjs } = accounts[0];

    const txSubmit = await secretjs.tx.gov.submitProposal(
      {
        type: ProposalType.TextProposal,
        proposer: accounts[0].address,
        initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
        content: {
          title: "Please vote yes",
          description: "Please don't vote no",
        },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txSubmit.code !== TxResultCode.Success) {
      console.error(txSubmit.rawLog);
    }
    expect(txSubmit.code).toBe(TxResultCode.Success);
    const proposalId = getValueFromRawLog(
      txSubmit.rawLog,
      "submit_proposal.proposal_id",
    );

    const tx = await secretjs.tx.gov.vote(
      {
        voter: accounts[0].address,
        proposalId,
        option: VoteOption.VOTE_OPTION_YES,
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

    expect(getValueFromRawLog(tx.rawLog, "proposal_vote.proposal_id")).toBe(
      proposalId,
    );
    expect(getValueFromRawLog(tx.rawLog, "proposal_vote.option")).toBe(
      '{"option":1,"weight":"1.000000000000000000"}',
    );
  });

  test("MsgVoteWeighted", async () => {
    const { secretjs } = accounts[0];

    const txSubmit = await secretjs.tx.gov.submitProposal(
      {
        type: ProposalType.TextProposal,
        proposer: accounts[0].address,
        initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
        content: {
          title: "Please vote yes",
          description: "Please don't vote no",
        },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txSubmit.code !== TxResultCode.Success) {
      console.error(txSubmit.rawLog);
    }
    expect(txSubmit.code).toBe(TxResultCode.Success);
    const proposalId = getValueFromRawLog(
      txSubmit.rawLog,
      "submit_proposal.proposal_id",
    );

    // vote yes with 70% of my power
    const tx = await secretjs.tx.gov.voteWeighted(
      {
        voter: accounts[0].address,
        proposalId,
        options: [
          // weights must sum to 1.0
          { weight: 0.7, option: VoteOption.VOTE_OPTION_YES },
          { weight: 0.3, option: VoteOption.VOTE_OPTION_ABSTAIN },
        ],
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

    expect(getValueFromRawLog(tx.rawLog, "proposal_vote.proposal_id")).toBe(
      proposalId,
    );
    expect(getValueFromRawLog(tx.rawLog, "proposal_vote.option")).toBe(
      '{"option":1,"weight":"0.700000000000000000"}\n{"option":2,"weight":"0.300000000000000000"}',
    );
  });

  test("MsgDeposit", async () => {
    const { secretjs } = accounts[0];

    const txSubmit = await secretjs.tx.gov.submitProposal(
      {
        type: ProposalType.TextProposal,
        proposer: accounts[0].address,
        initialDeposit: [],
        content: {
          title: "Hi",
          description: "Hello",
        },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txSubmit.code !== TxResultCode.Success) {
      console.error(txSubmit.rawLog);
    }
    expect(txSubmit.code).toBe(TxResultCode.Success);
    const proposalId = getValueFromRawLog(
      txSubmit.rawLog,
      "submit_proposal.proposal_id",
    );

    const tx = await secretjs.tx.gov.deposit(
      {
        depositor: accounts[0].address,
        proposalId,
        amount: [{ amount: "1", denom: "uscrt" }],
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

    const { deposit } = await secretjs.query.gov.deposit({
      depositor: accounts[0].address,
      proposalId,
    });

    expect(deposit?.amount).toStrictEqual([{ amount: "1", denom: "uscrt" }]);
  });
});

describe("tx.staking", () => {
  test("MsgDelegate", async () => {
    const { secretjs } = accounts[0];

    const {
      validators: [{ operatorAddress: validatorAddress, tokens: tokensBefore }],
    } = await secretjs.query.staking.validators({ status: "" });

    const tx = await secretjs.tx.staking.delegate(
      {
        delegatorAddress: accounts[0].address,
        validatorAddress,
        amount: { amount: "1", denom: "uscrt" },
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

    const {
      validators: [{ tokens: tokensAfter }],
    } = await secretjs.query.staking.validators({ status: "" });

    expect(BigInt(tokensAfter) - BigInt(tokensBefore)).toBe(BigInt(1));
  });

  test("MsgUndelegate", async () => {
    const { secretjs } = accounts[0];

    const {
      validators: [{ operatorAddress: validatorAddress, tokens: tokensBefore }],
    } = await secretjs.query.staking.validators({ status: "" });

    const txDelegate = await secretjs.tx.staking.delegate(
      {
        delegatorAddress: accounts[0].address,
        validatorAddress,
        amount: { amount: "1", denom: "uscrt" },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txDelegate.code !== TxResultCode.Success) {
      console.error(txDelegate.rawLog);
    }
    expect(txDelegate.code).toBe(TxResultCode.Success);
    const {
      validators: [{ tokens: tokensAfterDelegate }],
    } = await secretjs.query.staking.validators({ status: "" });
    expect(BigInt(tokensAfterDelegate) - BigInt(tokensBefore)).toBe(BigInt(1));

    const tx = await secretjs.tx.staking.undelegate(
      {
        delegatorAddress: accounts[0].address,
        validatorAddress,
        amount: { amount: "1", denom: "uscrt" },
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
    const {
      validators: [{ tokens: tokensAfterUndelegate }],
    } = await secretjs.query.staking.validators({ status: "" });
    expect(tokensAfterUndelegate).toBe(tokensBefore);
  });

  test("MsgCreateValidator", async () => {
    const { secretjs } = accounts[1];

    const { validators: validatorsBefore } =
      await secretjs.query.staking.validators({ status: "" });

    const tx = await secretjs.tx.staking.createValidator(
      {
        selfDelegatorAddress: accounts[1].address,
        commission: {
          maxChangeRate: 0.01,
          maxRate: 0.1,
          rate: 0.05,
        },
        description: {
          moniker: "banana",
          identity: "papaya",
          website: "watermelon.com",
          securityContact: "info@watermelon.com",
          details: "We are the banana papaya validator",
        },
        pubkey: toBase64(new Uint8Array(32).fill(1)),
        minSelfDelegation: "1",
        initialDelegation: { amount: "1", denom: "uscrt" },
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

    const { validators: validatorsAfter } =
      await secretjs.query.staking.validators({ status: "" });

    expect(validatorsAfter.length - validatorsBefore.length).toBe(1);
  });

  test("MsgEditValidator", async () => {
    const { secretjs } = accounts[2];

    const txCreateValidator = await secretjs.tx.staking.createValidator(
      {
        selfDelegatorAddress: accounts[2].address,
        commission: {
          maxChangeRate: 0.01,
          maxRate: 0.1,
          rate: 0.05,
        },
        description: {
          moniker: "banana",
          identity: "papaya",
          website: "watermelon.com",
          securityContact: "info@watermelon.com",
          details: "We are the banana papaya validator",
        },
        pubkey: toBase64(new Uint8Array(32).fill(2)),
        minSelfDelegation: "2",
        initialDelegation: { amount: "3", denom: "uscrt" },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txCreateValidator.code !== TxResultCode.Success) {
      console.error(txCreateValidator.rawLog);
    }
    expect(txCreateValidator.code).toBe(TxResultCode.Success);
    const validatorAddress = getValueFromRawLog(
      txCreateValidator.rawLog,
      "create_validator.validator",
    );

    const tx = await secretjs.tx.staking.editValidator(
      {
        validatorAddress,
        description: {
          moniker: "papaya",
          identity: "banana",
          website: "com.watermelon",
          securityContact: "as@com.com",
          details: "We are the banana papaya validator yay!",
        },
        minSelfDelegation: "3",
        // commissionRate: 0.04, // commission cannot be changed more than once in 24h
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

    const { validators } = await secretjs.query.staking.validators({
      status: "",
    });

    const validator = validators.find(
      (v) => v.operatorAddress === validatorAddress,
    )!;

    expect(validator).toBeTruthy();
    expect(validator.description).toStrictEqual({
      moniker: "papaya",
      identity: "banana",
      website: "com.watermelon",
      securityContact: "as@com.com",
      details: "We are the banana papaya validator yay!",
    });
    expect(validator.minSelfDelegation).toBe("3");
  });

  test("MsgBeginRedelegate", async () => {
    const txCreate = await accounts[3].secretjs.tx.staking.createValidator(
      {
        selfDelegatorAddress: accounts[3].address,
        commission: {
          maxChangeRate: 0.01,
          maxRate: 0.1,
          rate: 0.05,
        },
        description: {
          moniker: "banana",
          identity: "papaya",
          website: "watermelon.com",
          securityContact: "info@watermelon.com",
          details: "We are the banana papaya validator",
        },
        pubkey: toBase64(new Uint8Array(32).fill(3)),
        minSelfDelegation: "2",
        initialDelegation: { amount: "3", denom: "uscrt" },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txCreate.code !== TxResultCode.Success) {
      console.error(txCreate.rawLog);
    }
    expect(txCreate.code).toBe(TxResultCode.Success);

    const { validators } = await accounts[3].secretjs.query.staking.validators({
      status: "",
    });

    const txDelegate = await accounts[0].secretjs.tx.staking.delegate(
      {
        delegatorAddress: accounts[0].address,
        validatorAddress: validators[0].operatorAddress,
        amount: { amount: "1", denom: "uscrt" },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txDelegate.code !== TxResultCode.Success) {
      console.error(txDelegate.rawLog);
    }
    expect(txDelegate.code).toBe(TxResultCode.Success);

    const tx = await accounts[0].secretjs.tx.staking.beginRedelegate(
      {
        delegatorAddress: accounts[0].address,
        validatorSrcAddress: validators[0].operatorAddress,
        validatorDstAddress: validators[1].operatorAddress,
        amount: { amount: "1", denom: "uscrt" },
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
  });
});

describe("tx.slashing", () => {
  test("MsgUnjail", async () => {
    const { secretjs } = accounts[4];

    const txCreateValidator = await secretjs.tx.staking.createValidator(
      {
        selfDelegatorAddress: accounts[4].address,
        commission: {
          maxChangeRate: 0.01,
          maxRate: 0.1,
          rate: 0.05,
        },
        description: {
          moniker: "banana",
          identity: "papaya",
          website: "watermelon.com",
          securityContact: "info@watermelon.com",
          details: "We are the banana papaya validator",
        },
        pubkey: toBase64(new Uint8Array(32).fill(4)),
        minSelfDelegation: "2",
        initialDelegation: { amount: "3", denom: "uscrt" },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txCreateValidator.code !== TxResultCode.Success) {
      console.error(txCreateValidator.rawLog);
    }
    expect(txCreateValidator.code).toBe(TxResultCode.Success);

    const validatorAddr = getValueFromRawLog(
      txCreateValidator.rawLog,
      "create_validator.validator",
    );

    const txUnjail = await secretjs.tx.slashing.unjail(
      {
        validatorAddr,
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );

    // To jail a validator we have to be inactive for 10 minutes.
    // This is too much for a test, so getting to "validator not jailed"
    // is far enough for to make sure that MsgUnjail goes through.
    expect(txUnjail.code).toBe(5);
    expect(txUnjail.rawLog).toContain("validator not jailed");
  });
});

describe("tx.distribution", () => {
  test("MsgFundCommunityPool", async () => {
    const { secretjs, address: depositor } = accounts[0];

    const tx = await secretjs.tx.distribution.fundCommunityPool(
      {
        depositor,
        amount: [{ amount: "1", denom: "uscrt" }],
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
  });

  test("MsgWithdrawDelegatorReward", async () => {
    const { secretjs, address: delegatorAddress } = accounts[0];

    const {
      validators: [{ operatorAddress: validatorAddress }],
    } = await secretjs.query.staking.validators({ status: "" });

    const txDelegate = await secretjs.tx.staking.delegate(
      {
        delegatorAddress,
        validatorAddress,
        amount: { amount: "1", denom: "uscrt" },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (txDelegate.code !== TxResultCode.Success) {
      console.error(txDelegate.rawLog);
    }
    expect(txDelegate.code).toBe(TxResultCode.Success);

    const tx = await secretjs.tx.distribution.withdrawDelegatorReward(
      {
        delegatorAddress,
        validatorAddress,
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
  });

  test("MsgWithdrawValidatorCommission", async () => {
    const { validators } = await accounts[0].secretjs.query.staking.validators({
      status: "",
    });
    const onlineValidator = validators.find(
      (v) => v.status === BondStatus.BOND_STATUS_BONDED,
    )!;
    const selfDelegator = bech32.encode(
      "secret",
      bech32.decode(onlineValidator.operatorAddress).words,
    );
    const selfDelegatorAccount = accounts.find(
      (a) => a.address === selfDelegator,
    )!;

    const tx =
      await selfDelegatorAccount.secretjs.tx.distribution.withdrawValidatorCommission(
        {
          validatorAddress: onlineValidator.operatorAddress,
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
  });

  test("MsgSetWithdrawAddress", async () => {
    const { validators } = await accounts[0].secretjs.query.staking.validators({
      status: "",
    });
    const onlineValidator = validators.find(
      (v) => v.status === BondStatus.BOND_STATUS_BONDED,
    )!;
    const selfDelegator = bech32.encode(
      "secret",
      bech32.decode(onlineValidator.operatorAddress).words,
    );
    const selfDelegatorAccount = accounts.find(
      (a) => a.address === selfDelegator,
    )!;
    const notSelfDelegatorAccount = accounts.find(
      (a) => a.address !== selfDelegator,
    )!;

    const tx =
      await selfDelegatorAccount.secretjs.tx.distribution.setWithdrawAddress(
        {
          delegatorAddress: selfDelegatorAccount.address,
          withdrawAddress: notSelfDelegatorAccount.address,
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
  });
});

describe("sanity", () => {
  test.skip("Every msg has a Msg class", async () => {
    // TODO fix this test

    let { stdout } = await exec(
      `find "${__dirname}/../src/protobuf_stuff" -name msg.ts -or -name tx.ts -print0 | xargs -0 -n 1 grep -Po 'export interface Msg[A-Za-z]+' | grep -Po 'Msg.+' | grep -v Response | sort -u`,
    );

    const msgs = String(stdout)
      .split("\n")
      .map((msg) => msg.trim())
      .filter((msg) => msg.length > 0);

    ({ stdout } = await exec(
      `find "${__dirname}/../src/tx" -name "*.ts" -print0 | xargs -0 -n 1 grep -P 'export class Msg.+? implements Msg' | grep -Po 'Msg[A-Za-z]+\s' | sort -u`,
    ));

    const classes = String(stdout)
      .split("\n")
      .map((msg) => msg.trim())
      .filter((msg) => msg.length > 0);

    expect(msgs).toStrictEqual(classes);
  });

  test.skip("All queries are implemented", async () => {});
});

describe("tx.feegrant", () => {
  test("MsgGrantAllowance", async () => {
    const { secretjs } = accounts[0];
    const newWallet = new AminoWallet(); // this tests both amino & protobuf

    let tx = await secretjs.tx.feegrant.grantAllowance({
      granter: secretjs.address,
      grantee: newWallet.address,
      allowance: {
        spendLimit: [{ denom: "uscrt", amount: "1000000" }],
      },
    });

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    const secretjsGrantee = await SecretNetworkClient.create({
      grpcWebUrl: "http://localhost:9091",
      chainId: "secretdev-1",
      wallet: newWallet,
      walletAddress: newWallet.address,
    });

    // Send a tx without any balance
    const newWalletBalance = await getBalance(secretjs, newWallet.address);
    expect(newWalletBalance).toBe(BigInt(0));

    tx = await secretjsGrantee.tx.gov.submitProposal(
      {
        proposer: secretjsGrantee.address,
        type: ProposalType.TextProposal,
        initialDeposit: [],
        content: {
          title: "Test Feegrant",
          description: "YOLO",
        },
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
        feeGranter: secretjs.address,
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);
  });

  test("MsgRevokeAllowance", async () => {
    const { secretjs } = accounts[0];
    const newWallet = new AminoWallet(); // this tests both amino & protobuf

    let tx = await secretjs.tx.feegrant.grantAllowance({
      granter: secretjs.address,
      grantee: newWallet.address,
      allowance: {
        spendLimit: [{ denom: "uscrt", amount: "1000000" }],
      },
    });

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    tx = await secretjs.tx.feegrant.revokeAllowance({
      granter: secretjs.address,
      grantee: newWallet.address,
    });

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);
  });
});

describe("tx.authz", () => {
  describe("MsgGrant", () => {
    test("StakeAuthorization", async () => {
      const { secretjs: secretjsGranter } = accounts[1];
      const { secretjs: secretjsGrantee } = accounts[2];

      const {
        validators: [{ operatorAddress: validatorAddress }],
      } = await secretjsGranter.query.staking.validators({ status: "" });

      const tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            allowList: [validatorAddress],
            denyList: [],
            maxTokens: { amount: String(1_000_000), denom: "uscrt" },
            authorizationType: StakeAuthorizationType.Delegate,
          },
          expiration: Math.floor(Date.now() / 1000 + 10 * 60), // 10 minutes
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
    });

    test("SendAuthorization", async () => {
      const { secretjs: secretjsGranter } = accounts[2];
      const { secretjs: secretjsGrantee } = accounts[3];

      const tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            spendLimit: [{ amount: String(1_000_000), denom: "uscrt" }],
          },
          expiration: Math.floor(Date.now() / 1000 + 10 * 60), // 10 minutes
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
    });

    test("GenericAuthorization", async () => {
      const { secretjs: secretjsGranter } = accounts[3];
      const { secretjs: secretjsGrantee } = accounts[4];

      const tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            msg: MsgGrantAuthorization.MsgSend,
          },
          expiration: Math.floor(Date.now() / 1000 + 10 * 60), // 10 minutes
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
    });
  });

  describe("MsgExec", () => {
    test("StakeAuthorization", async () => {
      const { secretjs: secretjsGranter } = accounts[4];
      const { secretjs: secretjsGrantee } = accounts[5];

      const {
        validators: [{ operatorAddress: validatorAddress }],
      } = await secretjsGranter.query.staking.validators({ status: "" });

      let tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            allowList: [validatorAddress],
            denyList: [],
            maxTokens: { amount: String(1_000_000), denom: "uscrt" },
            authorizationType: StakeAuthorizationType.Delegate,
          },
          expiration: Math.floor(Date.now() / 1000 + 10 * 60), // 10 minutes
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

      tx = await secretjsGrantee.tx.authz.exec(
        {
          grantee: secretjsGrantee.address,
          msgs: [
            new MsgDelegate({
              amount: {
                amount: "1",
                denom: "uscrt",
              },
              delegatorAddress: secretjsGranter.address,
              validatorAddress,
            }),
          ],
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
    });

    test("SendAuthorization", async () => {
      const { secretjs: secretjsGranter } = accounts[5];
      const { secretjs: secretjsGrantee } = accounts[6];

      let tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            spendLimit: [{ amount: String(1_000_000), denom: "uscrt" }],
          },
          expiration: Math.floor(Date.now() / 1000 + 10 * 60), // 10 minutes
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

      tx = await secretjsGrantee.tx.authz.exec(
        {
          grantee: secretjsGrantee.address,
          msgs: [
            new MsgSend({
              fromAddress: secretjsGranter.address,
              toAddress: secretjsGranter.address,
              amount: [
                {
                  amount: "1",
                  denom: "uscrt",
                },
              ],
            }),
          ],
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
    });

    test("GenericAuthorization", async () => {
      const { secretjs: secretjsGranter } = accounts[6];
      const { secretjs: secretjsGrantee } = accounts[7];

      let tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            msg: MsgGrantAuthorization.MsgSend,
          },
          expiration: Math.floor(Date.now() / 1000 + 10 * 60), // 10 minutes
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

      tx = await secretjsGrantee.tx.authz.exec(
        {
          grantee: secretjsGrantee.address,
          msgs: [
            new MsgSend({
              fromAddress: secretjsGranter.address,
              toAddress: secretjsGranter.address,
              amount: [
                {
                  amount: "1",
                  denom: "uscrt",
                },
              ],
            }),
          ],
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
    });
  });

  describe("MsgRevoke", () => {
    test("StakeAuthorization", async () => {
      const { secretjs: secretjsGranter } = accounts[7];
      const { secretjs: secretjsGrantee } = accounts[8];

      const {
        validators: [{ operatorAddress: validatorAddress }],
      } = await secretjsGranter.query.staking.validators({ status: "" });

      let tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            allowList: [validatorAddress],
            denyList: [],
            maxTokens: { amount: String(1_000_000), denom: "uscrt" },
            authorizationType: StakeAuthorizationType.Delegate,
          },
          expiration: Math.floor(Date.now() / 1000 + 10 * 60), // 10 minutes
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

      tx = await secretjsGranter.tx.authz.revoke(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          msg: MsgGrantAuthorization.MsgDelegate,
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

      tx = await secretjsGrantee.tx.authz.exec(
        {
          grantee: secretjsGrantee.address,
          msgs: [
            new MsgDelegate({
              amount: {
                amount: "1",
                denom: "uscrt",
              },
              delegatorAddress: secretjsGranter.address,
              validatorAddress,
            }),
          ],
        },
        {
          broadcastCheckIntervalMs: 100,
          gasLimit: 5_000_000,
        },
      );
      if (tx.code !== TxResultCode.ErrUnauthorized) {
        console.error(tx.rawLog);
      }
      expect(tx.rawLog).toContain("authorization not found");
    });

    test("SendAuthorization", async () => {
      const { secretjs: secretjsGranter } = accounts[8];
      const { secretjs: secretjsGrantee } = accounts[9];

      let tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            spendLimit: [{ amount: String(1_000_000), denom: "uscrt" }],
          },
          expiration: Math.floor(Date.now() / 1000 + 10 * 60), // 10 minutes
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

      tx = await secretjsGranter.tx.authz.revoke(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          msg: MsgGrantAuthorization.MsgSend,
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

      tx = await secretjsGrantee.tx.authz.exec(
        {
          grantee: secretjsGrantee.address,
          msgs: [
            new MsgSend({
              fromAddress: secretjsGranter.address,
              toAddress: secretjsGranter.address,
              amount: [
                {
                  amount: "1",
                  denom: "uscrt",
                },
              ],
            }),
          ],
        },
        {
          broadcastCheckIntervalMs: 100,
          gasLimit: 5_000_000,
        },
      );
      if (tx.code !== TxResultCode.ErrUnauthorized) {
        console.error(tx.rawLog);
      }
      expect(tx.rawLog).toContain("authorization not found");
    });

    test("GenericAuthorization", async () => {
      const { secretjs: secretjsGranter } = accounts[9];
      const { secretjs: secretjsGrantee } = accounts[10];

      let tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            msg: MsgGrantAuthorization.MsgSend,
          },
          expiration: Math.floor(Date.now() / 1000 + 10 * 60), // 10 minutes
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

      tx = await secretjsGranter.tx.authz.revoke(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          msg: MsgGrantAuthorization.MsgSend,
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

      tx = await secretjsGrantee.tx.authz.exec(
        {
          grantee: secretjsGrantee.address,
          msgs: [
            new MsgSend({
              fromAddress: secretjsGranter.address,
              toAddress: secretjsGranter.address,
              amount: [
                {
                  amount: "1",
                  denom: "uscrt",
                },
              ],
            }),
          ],
        },
        {
          broadcastCheckIntervalMs: 100,
          gasLimit: 5_000_000,
        },
      );
      if (tx.code !== TxResultCode.ErrUnauthorized) {
        console.error(tx.rawLog);
      }
      expect(tx.rawLog).toContain("authorization not found");
    });
  });
});
