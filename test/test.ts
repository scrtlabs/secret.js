import { fromBase64, fromUtf8, toBase64 } from "@cosmjs/encoding";
import { bech32 } from "bech32";
import fs from "fs";
import {
  MsgDelegate,
  MsgExecuteContract,
  MsgExecuteContractResponse,
  MsgGrantAuthorization,
  MsgInstantiateContractResponse,
  MsgSend,
  MsgSetAutoRestake,
  MsgSubmitProposal,
  ProposalType,
  SecretNetworkClient,
  StakeAuthorizationType,
  TxResultCode,
  VoteOption,
  base64PubkeyToAddress,
  base64TendermintPubkeyToValconsAddress,
  gasToFee,
  pubkeyToAddress,
  selfDelegatorAddressToValidatorAddress,
  stringToCoin,
  stringToCoins,
  tendermintPubkeyToValconsAddress,
  validateAddress,
  validatorAddressToSelfDelegatorAddress,
} from "../src";
import { BaseAccount } from "../src/grpc_gateway/cosmos/auth/v1beta1/auth.pb";
import { Proposal } from "../src/grpc_gateway/cosmos/gov/v1beta1/gov.pb";
import { BondStatus } from "../src/grpc_gateway/cosmos/staking/v1beta1/staking.pb";
import { MsgSubmitProposalResponse } from "../src/protobuf/cosmos/gov/v1beta1/tx";
import { MsgStoreCodeResponse } from "../src/protobuf/secret/compute/v1beta1/msg";
import { AminoWallet } from "../src/wallet_amino";
import {
  accounts,
  chain1LCD,
  checkInstantiateSuccess,
  exec,
  getAllMethodNames,
  getBalance,
  getValueFromRawLog,
  initContract,
  sleep,
  storeContract,
  storeSnip20Ibc,
} from "./utils";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("query", () => {
  test("getTx", async () => {
    const { secretjs } = accounts[0];

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

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    const txInit = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        code_hash,
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
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "/secret.compute.v1beta1.MsgInstantiateContract",
    );
    const contract_address = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contract_address).toBe(
      MsgInstantiateContractResponse.decode(txInit.data[0]).address,
    );

    const tx = await secretjs.tx.broadcast(
      [
        new MsgExecuteContract({
          sender: secretjs.address,
          contract_address,
          msg: {
            create_viewing_key: {
              entropy: "bla bla",
            },
          },
          code_hash,
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

  test("getTx error", async () => {
    const { secretjs } = accounts[0];

    const code_id = await storeSnip20Ibc(secretjs, accounts[0].address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    const txInit = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        code_hash,
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
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "/secret.compute.v1beta1.MsgInstantiateContract",
    );
    const contract_address = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );

    const tx = await secretjs.tx.broadcast(
      [
        new MsgExecuteContract({
          sender: accounts[0].address,
          contract_address: contract_address,
          code_hash,
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

  test("query at height", async () => {
    const { secretjs } = accounts[accounts.length - 1];

    let queryResultThen = await secretjs.query.bank.balance(
      {
        address: secretjs.address,
        denom: "uscrt",
      },
      [["x-cosmos-block-height", "1"]],
    );

    // test account should not have a balance at first
    expect(queryResultThen.balance!.amount).toBe("0");

    let queryResultNow = await secretjs.query.bank.balance({
      address: secretjs.address,
      denom: "uscrt",
    });

    // by now test account should have a balance
    expect(queryResultNow.balance!.amount).not.toBe("0");
  });

  describe("txsQuery", () => {
    beforeAll(async () => {
      // create a bunch of txs for us to query later
      const txs = await Promise.all(
        accounts.map((a) =>
          a.secretjs.tx.bank.send({
            amount: stringToCoins("1uscrt"),
            from_address: a.address,
            to_address: a.address,
          }),
        ),
      );

      txs.forEach((tx) => {
        if (tx.code !== TxResultCode.Success) {
          console.error(tx.rawLog);
        }
        expect(tx.code).toBe(TxResultCode.Success);
      });
    });

    test("pagination.limit", async () => {
      expect(accounts.length).toBeGreaterThan(10);

      const { secretjs } = accounts[0];

      let queryResult = await secretjs.query.txsQuery(
        "message.action='/cosmos.bank.v1beta1.MsgSend'",
        undefined,
        { limit: "10" },
      );

      expect(queryResult.length).toBe(10);
    });

    test("pagination.offset", async () => {
      const { secretjs } = accounts[0];

      const first = await secretjs.query.txsQuery(
        "message.action='/cosmos.bank.v1beta1.MsgSend'",
        undefined,
        { limit: "1" },
      );

      const second = await secretjs.query.txsQuery(
        "message.action='/cosmos.bank.v1beta1.MsgSend'",
        undefined,
        { limit: "1", offset: "1" },
      );

      expect(first.length).toBe(1);
      expect(second.length).toBe(1);
      expect(first[0].transactionHash).not.toBe(second[0].transactionHash);
    });
  });
});

describe("query.distribution", () => {
  test("restakeThreshold()", async () => {
    const { secretjs } = accounts[0];
    const { threshold } = await secretjs.query.distribution.restakeThreshold(
      {},
    );

    expect(threshold).toBe("10000000.000000000000000000");
  });
});

describe("query.ibc_iterchain_accounts_controller", () => {
  test("params()", async () => {
    const { secretjs } = accounts[0];
    const { params } =
      await secretjs.query.ibc_iterchain_accounts_controller.params({});

    expect(params).toStrictEqual({
      controller_enabled: true,
    });
  });

  test.skip("interchainAccount()", async () => {
    // const { secretjs } = accounts[0];
    // const { address } =
    //   await secretjs.query.ibc_iterchain_accounts_controller.interchainAccount(
    //     {},
    //   );
    // expect(address).toStrictEqual({
    //   controller_enabled: false,
    // });
  });
});

describe("query.ibc_iterchain_accounts_host", () => {
  test("params()", async () => {
    const { secretjs } = accounts[0];
    const { params } = await secretjs.query.ibc_iterchain_accounts_host.params(
      {},
    );

    expect(params).toStrictEqual({
      host_enabled: true,
      allow_messages: [],
    });
  });
});

describe("query.ibc_packet_forward", () => {
  test("params()", async () => {
    const { secretjs } = accounts[0];
    const { params } = await secretjs.query.ibc_packet_forward.params({});

    expect(params).toStrictEqual({
      fee_percentage: "0.000000000000000000",
    });
  });
});

describe("query.auth", () => {
  test("accounts()", async () => {
    const { secretjs } = accounts[0];

    const response = await secretjs.query.auth.accounts({});

    const baseAccounts = response.accounts!.filter(
      (a) => a["@type"] === "/cosmos.auth.v1beta1.BaseAccount",
    );

    expect(baseAccounts.length).toBeGreaterThanOrEqual(accounts.length);

    for (const a of accounts.map((a) => a.address)) {
      expect(baseAccounts.map((a) => (a as BaseAccount).address)).toContain(a);
    }
  });

  test("account()", async () => {
    const { secretjs } = accounts[0];

    const response = await secretjs.query.auth.account({
      address: accounts[1].address,
    });

    if (!response.account) {
      fail(`Account "${accounts[1].address}" should exist`);
    }

    expect(response.account["@type"]).toBe("/cosmos.auth.v1beta1.BaseAccount");

    const account = response.account as BaseAccount;

    expect(account.address).toBe(accounts[1].address);
    expect(account.account_number).toBe("1");
  });

  test("params()", async () => {
    const { secretjs } = accounts[0];

    const { params } = await secretjs.query.auth.params({});
    expect(params).toStrictEqual({
      max_memo_characters: "256",
      sig_verify_cost_ed25519: "590",
      sig_verify_cost_secp256k1: "1000",
      tx_sig_limit: "7",
      tx_size_cost_per_byte: "10",
    });
  });
});

describe("query.compute", () => {
  let sSCRT: string;
  let benchContract: string;

  beforeAll(async () => {
    const code_id = await storeContract(
      `${__dirname}/snip20-ibc.wasm.gz`,
      accounts[0],
    );

    sSCRT = await initContract(
      code_id,
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
      "blabla",
    );

    const code_id_bench = await storeContract(
      `${__dirname}/bench-contract.wasm.gz`,
      accounts[0],
    );

    benchContract = await initContract(
      code_id_bench,
      { init: {} },
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
      contract_address: sSCRT,
      //code_hash,
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

  test("queryContract() empty response", async () => {
    const { secretjs } = accounts[0];

    const result = await secretjs.query.compute.queryContract({
      contract_address: benchContract,
      query: { noop_query: {} },
    });

    expect(result).toStrictEqual({});
  });

  test("queryContract() StdError", async () => {
    const { secretjs } = accounts[0];

    const result = await secretjs.query.compute.queryContract({
      contract_address: sSCRT,
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
      contract_address: sSCRT,
      query: {
        non_existent_query: {},
      },
    });

    expect(result).toEqual(
      '{"parse_err":{"msg":"unknown variant `non_existent_query`, expected one of `token_info`, `token_config`, `contract_status`, `exchange_rate`, `allowance`, `balance`, `transfer_history`, `transaction_history`, `minters`, `with_permit`","target":"snip20_reference_impl::msg::QueryMsg"}}',
    );
  });

  test("queryContract() without code_hash", async () => {
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
      contract_address: sSCRT,
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

  test("codes()", async () => {
    const { secretjs } = accounts[0];

    const codes = await secretjs.query.compute.codes({});

    expect(codes.code_infos!.length).toBeGreaterThanOrEqual(2);
  });

  test("addressByLabel()", async () => {
    const { secretjs } = accounts[0];

    const addressByLabel = await secretjs.query.compute.addressByLabel({
      label: "blabla",
    });

    expect(addressByLabel.contract_address).toBe(sSCRT);
  });
});

describe("tx", () => {
  test("Offline Signing", async () => {
    const { secretjs } = accounts[0];

    const cBefore = await getBalance(secretjs, accounts[2].address);

    const msg = new MsgSend({
      from_address: accounts[0].address,
      to_address: accounts[2].address,
      amount: stringToCoins("1uscrt"),
    });

    let signedTX = await secretjs.tx.signTx([msg], {
      gasLimit: 20_000,
      gasPriceInFeeDenom: 0.1,
      feeDenom: "uscrt",
    });

    let tx = await secretjs.tx.broadcastSignedTx(signedTX);
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    const cAfter = await getBalance(secretjs, accounts[2].address);
    expect(cAfter - cBefore).toBe(BigInt(1));

    // Double use of the same message
    let tx_double = await secretjs.tx.broadcastSignedTx(signedTX);
    if (tx_double.code === TxResultCode.Success) {
      console.error(tx_double.rawLog);
    }
  });
});

describe("tx.bank", () => {
  test("MsgSend", async () => {
    const { secretjs } = accounts[0];

    const aBefore = await getBalance(secretjs, accounts[0].address);
    const cBefore = await getBalance(secretjs, accounts[2].address);

    const sim = await secretjs.tx.bank.send.simulate({
      from_address: accounts[0].address,
      to_address: accounts[2].address,
      amount: stringToCoins("1uscrt"),
    });

    const gasLimit = Math.ceil(Number(sim.gas_info!.gas_used) * 1.25);

    const msg = {
      from_address: accounts[0].address,
      to_address: accounts[2].address,
      amount: stringToCoins("1uscrt"),
    };
    const tx = await secretjs.tx.bank.send(msg, {
      broadcastCheckIntervalMs: 100,
      gasLimit: gasLimit,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);
    expect(tx.tx.body?.messages![0]).toStrictEqual({
      "@type": "/cosmos.bank.v1beta1.MsgSend",
      from_address: accounts[0].address,
      to_address: accounts[2].address,
      amount: stringToCoins("1uscrt"),
    });

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
            coins: stringToCoins("2uscrt"),
          },
        ],
        outputs: [
          {
            address: accounts[1].address,
            coins: stringToCoins("1uscrt"),
          },
          {
            address: accounts[2].address,
            coins: stringToCoins("1uscrt"),
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

    const code_id = await storeSnip20Ibc(secretjs, accounts[0].address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    const tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        code_hash,
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
    checkInstantiateSuccess(tx);
  });

  test("MsgInstantiateContract VmError", async () => {
    const { secretjs } = accounts[0];

    const code_id = await storeSnip20Ibc(secretjs, accounts[0].address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    const tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        code_hash,
        init_msg: {},
        label: `label-${Date.now()}`,
        init_funds: [],
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
      wasm_byte_code: fs.readFileSync(
        `${__dirname}/snip721.wasm.gz`,
      ) as Uint8Array,
      source: "",
      builder: "",
    };

    const simStore = await secretjs.tx.compute.storeCode.simulate(storeInput);

    const txStore = await secretjs.tx.compute.storeCode(storeInput, {
      broadcastCheckIntervalMs: 100,
      gasLimit: Math.ceil(Number(simStore.gas_info!.gas_used) * 1.25),
    });
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    const initInput = {
      sender: accounts[0].address,
      code_id,
      // code_hash, // Test MsgInstantiateContract without code_hash
      init_msg: {
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
      init_funds: [],
    };

    // contract simulation shouldn't work after the v1.7 upgrade
    try {
      await secretjs.tx.compute.instantiateContract.simulate(initInput);
      expect(false).toBe(true);
    } catch (error) {}

    const txInit = await secretjs.tx.compute.instantiateContract(initInput, {
      broadcastCheckIntervalMs: 100,
      gasLimit: 5e6,
    });
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);
    //@ts-ignore
    expect(txInit.tx.body?.messages![0].init_msg).toStrictEqual(
      initInput.init_msg,
    );

    const contract = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );

    const addMinterMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contract_address: contract,
      // code_hash, // Test MsgExecuteContract without code_hash
      msg: { add_minters: { minters: [accounts[0].address] } },
      sent_funds: [],
    });

    const mintMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contract_address: contract,
      code_hash,
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
      sent_funds: [],
    });

    // contract simulation shouldn't work after the v1.7 upgrade
    try {
      await secretjs.tx.simulate([addMinterMsg, mintMsg]);
      expect(false).toBe(true);
    } catch (error) {}

    const tx = await secretjs.tx.broadcast([addMinterMsg, mintMsg], {
      broadcastCheckIntervalMs: 100,
      gasLimit: 5e6,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);
    //@ts-ignore
    expect(tx.tx.body?.messages?.map((m) => m.msg)).toStrictEqual([
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

    const code_id = await storeSnip20Ibc(secretjs, accounts[0].address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    const txInit = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        code_hash,
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
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "/secret.compute.v1beta1.MsgInstantiateContract",
    );
    const contract_address = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );

    const txExec = await secretjs.tx.compute.executeContract(
      {
        sender: accounts[0].address,
        contract_address: contract_address,
        code_hash,
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

    const code_id = await storeSnip20Ibc(secretjs, accounts[0].address);
    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    const txInit = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        code_hash,
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
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    expect(getValueFromRawLog(txInit.rawLog, "message.action")).toBe(
      "/secret.compute.v1beta1.MsgInstantiateContract",
    );
    const contract_address = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contract_address).toBe(
      MsgInstantiateContractResponse.decode(txInit.data[0]).address,
    );

    const txExec = await secretjs.tx.compute.executeContract(
      {
        sender: accounts[0].address,
        contract_address: contract_address,
        code_hash,
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
        wasm_byte_code: fs.readFileSync(
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

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    const txInit = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        // code_hash, // Test MsgInstantiateContract without code_hash
        init_msg: {
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
        init_funds: [],
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
      contract_address: contract,
      // code_hash, // Test MsgExecuteContract without code_hash
      msg: { add_minters: { minters: [accounts[0].address] } },
      sent_funds: [],
    });

    const mintMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contract_address: contract,
      code_hash,
      msg: {
        yolo: {},
      },
      sent_funds: [],
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

  test("MsgInstantiateContract admin", async () => {
    const { secretjs } = accounts[0];

    const code_id = await storeSnip20Ibc(secretjs, accounts[0].address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    const tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        admin: accounts[0].address,
        code_id,
        code_hash,
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
    checkInstantiateSuccess(tx);
  });

  test("init without admin", async () => {
    const { secretjs } = accounts[0];

    const code_id = await storeSnip20Ibc(secretjs, secretjs.address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    let tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: secretjs.address,
        code_id,
        code_hash,
        init_msg: {
          name: "Secret SCRT",
          admin: secretjs.address,
          symbol: "SSCRT",
          decimals: 6,
          initial_balances: [{ address: secretjs.address, amount: "1" }],
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

    const contract_address = MsgInstantiateContractResponse.decode(
      tx.data[0],
    ).address;

    const { ContractInfo } = await secretjs.query.compute.contractInfo({
      contract_address,
    });

    expect(ContractInfo?.admin).toBe("");
  });

  test("init with admin", async () => {
    const { secretjs } = accounts[0];

    const code_id = await storeSnip20Ibc(secretjs, secretjs.address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    let tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: secretjs.address,
        admin: secretjs.address,
        code_id,
        code_hash,
        init_msg: {
          name: "Secret SCRT",
          admin: secretjs.address,
          symbol: "SSCRT",
          decimals: 6,
          initial_balances: [{ address: secretjs.address, amount: "1" }],
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

    const contract_address = MsgInstantiateContractResponse.decode(
      tx.data[0],
    ).address;

    const { ContractInfo } = await secretjs.query.compute.contractInfo({
      contract_address,
    });

    expect(ContractInfo?.admin).toBe(secretjs.address);
  });

  test("MsgUpdateAdmin", async () => {
    const { secretjs } = accounts[0];

    const code_id = await storeSnip20Ibc(secretjs, secretjs.address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    let tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: secretjs.address,
        admin: secretjs.address,
        code_id,
        code_hash,
        init_msg: {
          name: "Secret SCRT",
          admin: secretjs.address,
          symbol: "SSCRT",
          decimals: 6,
          initial_balances: [{ address: secretjs.address, amount: "1" }],
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

    const contract_address = MsgInstantiateContractResponse.decode(
      tx.data[0],
    ).address;

    let { ContractInfo } = await secretjs.query.compute.contractInfo({
      contract_address,
    });

    expect(ContractInfo?.admin).toBe(secretjs.address);

    tx = await secretjs.tx.compute.updateAdmin({
      sender: secretjs.address,
      contract_address,
      new_admin: accounts[1].address,
    });

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    ({ ContractInfo } = await secretjs.query.compute.contractInfo({
      contract_address,
    }));

    expect(ContractInfo?.admin).toBe(accounts[1].address);
  });

  test("MsgClearAdmin", async () => {
    const { secretjs } = accounts[0];

    const code_id = await storeSnip20Ibc(secretjs, secretjs.address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    let tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: secretjs.address,
        admin: secretjs.address,
        code_id,
        code_hash,
        init_msg: {
          name: "Secret SCRT",
          admin: secretjs.address,
          symbol: "SSCRT",
          decimals: 6,
          initial_balances: [{ address: secretjs.address, amount: "1" }],
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

    const contract_address = MsgInstantiateContractResponse.decode(
      tx.data[0],
    ).address;

    let { ContractInfo } = await secretjs.query.compute.contractInfo({
      contract_address,
    });

    expect(ContractInfo?.admin).toBe(secretjs.address);

    tx = await secretjs.tx.compute.clearAdmin({
      sender: secretjs.address,
      contract_address,
    });

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    ({ ContractInfo } = await secretjs.query.compute.contractInfo({
      contract_address,
    }));

    expect(ContractInfo?.admin).toBe("");
  });

  test("MsgMigrateContract", async () => {
    const { secretjs } = accounts[0];

    const code_id = await storeSnip20Ibc(secretjs, secretjs.address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    let tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: secretjs.address,
        admin: secretjs.address,
        code_id,
        code_hash,
        init_msg: {
          name: "Secret SCRT",
          admin: secretjs.address,
          symbol: "SSCRT",
          decimals: 6,
          initial_balances: [{ address: secretjs.address, amount: "1" }],
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

    const contract_address = MsgInstantiateContractResponse.decode(
      tx.data[0],
    ).address;

    const { ContractInfo } = await secretjs.query.compute.contractInfo({
      contract_address,
    });

    expect(ContractInfo?.admin).toBe(secretjs.address);

    const initHeight = String(tx.height);

    tx = await secretjs.tx.compute.storeCode(
      {
        sender: secretjs.address,
        wasm_byte_code: fs.readFileSync(
          `${__dirname}/ibc-hooks.wasm.gz`,
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

    const new_code_id = MsgStoreCodeResponse.decode(tx.data[0]).code_id;
    const { code_hash: new_code_hash } =
      await secretjs.query.compute.codeHashByCodeId({
        code_id: new_code_id,
      });

    tx = await secretjs.tx.compute.migrateContract(
      {
        sender: secretjs.address,
        contract_address,
        code_id: new_code_id,
        code_hash: new_code_hash,
        msg: { nop: {} },
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

    const { block } = await secretjs.query.tendermint.getBlockByHeight({
      height: String(tx.height),
    });

    const timestampRfc3339 = String(block?.header?.time);
    const ns = timestampRfc3339.slice(-7).slice(0, 6);
    const timestampMs = String(new Date(timestampRfc3339).getTime());
    const timestampNs = timestampMs + ns;

    expect(tx.arrayLog).toStrictEqual([
      {
        msg: 0,
        type: "message",
        key: "action",
        value: "/secret.compute.v1beta1.MsgMigrateContract",
      },
      { msg: 0, type: "message", key: "module", value: "compute" },
      {
        msg: 0,
        type: "message",
        key: "sender",
        value: "secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03",
      },
      { msg: 0, type: "migrate", key: "code_id", value: new_code_id },
      {
        msg: 0,
        type: "migrate",
        key: "contract_address",
        value: contract_address,
      },
      {
        msg: 0,
        type: "wasm",
        key: "contract_address",
        value: contract_address,
      },
      {
        msg: 0,
        type: "wasm",
        key: "migrate.env",
        value: `Env { block: BlockInfo { height: ${tx.height}, time: Timestamp(Uint64(${timestampNs})), chain_id: "secretdev-1" }, transaction: Some(TransactionInfo { index: 0 }), contract: ContractInfo { address: Addr("${contract_address}"), code_hash: "${new_code_hash}" } }`,
      },
      {
        msg: 0,
        type: "wasm",
        key: "migrate.msg",
        value: "Nop",
      },
    ]);

    const { entries } = await secretjs.query.compute.contractHistory({
      contract_address,
    });

    expect(entries).toStrictEqual([
      {
        code_id: code_id,
        msg: '{"name":"Secret SCRT","admin":"secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03","symbol":"SSCRT","decimals":6,"initial_balances":[{"address":"secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03","amount":"1"}],"prng_seed":"eW8=","config":{"public_total_supply":true,"enable_deposit":true,"enable_redeem":true,"enable_mint":false,"enable_burn":false},"supported_denoms":["uscrt"]}',
        operation: "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT",
        updated: {
          block_height: initHeight,
          tx_index: "0",
        },
      },
      {
        code_id: new_code_id,
        msg: '{"nop":{}}',
        operation: "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE",
        updated: {
          block_height: String(tx.height),
          tx_index: "0",
        },
      },
    ]);
  });

  test("MsgUpdateAdmin", async () => {
    const { secretjs } = accounts[0];

    const code_id = await storeSnip20Ibc(secretjs, secretjs.address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    let tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: secretjs.address,
        admin: secretjs.address,
        code_id,
        code_hash,
        init_msg: {
          name: "Secret SCRT",
          admin: secretjs.address,
          symbol: "SSCRT",
          decimals: 6,
          initial_balances: [{ address: secretjs.address, amount: "1" }],
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

    const contract_address = MsgInstantiateContractResponse.decode(
      tx.data[0],
    ).address;

    const initHeight = String(tx.height);

    tx = await secretjs.tx.compute.storeCode(
      {
        sender: secretjs.address,
        wasm_byte_code: fs.readFileSync(
          `${__dirname}/ibc-hooks.wasm.gz`,
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

    const new_code_id = MsgStoreCodeResponse.decode(tx.data[0]).code_id;
    const { code_hash: new_code_hash } =
      await secretjs.query.compute.codeHashByCodeId({
        code_id: new_code_id,
      });

    tx = await secretjs.tx.compute.migrateContract(
      {
        sender: secretjs.address,
        contract_address,
        code_id: new_code_id,
        code_hash: new_code_hash,
        msg: { nop: {} },
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

    const { block } = await secretjs.query.tendermint.getBlockByHeight({
      height: String(tx.height),
    });

    const timestampRfc3339 = String(block?.header?.time);
    const ns = timestampRfc3339.slice(-7).slice(0, 6);
    const timestampMs = String(new Date(timestampRfc3339).getTime());
    const timestampNs = timestampMs + ns;

    expect(tx.arrayLog).toStrictEqual([
      {
        msg: 0,
        type: "message",
        key: "action",
        value: "/secret.compute.v1beta1.MsgMigrateContract",
      },
      { msg: 0, type: "message", key: "module", value: "compute" },
      {
        msg: 0,
        type: "message",
        key: "sender",
        value: "secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03",
      },
      { msg: 0, type: "migrate", key: "code_id", value: new_code_id },
      {
        msg: 0,
        type: "migrate",
        key: "contract_address",
        value: contract_address,
      },
      {
        msg: 0,
        type: "wasm",
        key: "contract_address",
        value: contract_address,
      },
      {
        msg: 0,
        type: "wasm",
        key: "migrate.env",
        value: `Env { block: BlockInfo { height: ${tx.height}, time: Timestamp(Uint64(${timestampNs})), chain_id: "secretdev-1" }, transaction: Some(TransactionInfo { index: 0 }), contract: ContractInfo { address: Addr("${contract_address}"), code_hash: "${new_code_hash}" } }`,
      },
      {
        msg: 0,
        type: "wasm",
        key: "migrate.msg",
        value: "Nop",
      },
    ]);

    const { entries } = await secretjs.query.compute.contractHistory({
      contract_address,
    });

    expect(entries).toStrictEqual([
      {
        code_id: code_id,
        msg: '{"name":"Secret SCRT","admin":"secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03","symbol":"SSCRT","decimals":6,"initial_balances":[{"address":"secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03","amount":"1"}],"prng_seed":"eW8=","config":{"public_total_supply":true,"enable_deposit":true,"enable_redeem":true,"enable_mint":false,"enable_burn":false},"supported_denoms":["uscrt"]}',
        operation: "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT",
        updated: {
          block_height: initHeight,
          tx_index: "0",
        },
      },
      {
        code_id: new_code_id,
        msg: '{"nop":{}}',
        operation: "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE",
        updated: {
          block_height: String(tx.height),
          tx_index: "0",
        },
      },
    ]);
  });
});

describe("tx.gov", () => {
  async function getAllProposals(
    secretjs: SecretNetworkClient,
  ): Promise<Proposal[]> {
    const { proposals } = await secretjs.query.gov.proposals({});

    return proposals!;
  }

  describe("MsgSubmitProposal", () => {
    test("TextProposal", async () => {
      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const tx = await secretjs.tx.gov.submitProposal(
        {
          type: ProposalType.TextProposal,
          proposer: accounts[0].address,
          initial_deposit: stringToCoins("10000000uscrt"),
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

      const { proposal_id } = MsgSubmitProposalResponse.decode(tx.data[0]);

      expect(Number(proposal_id)).toBeGreaterThanOrEqual(1);

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
          initial_deposit: stringToCoins("10000000uscrt"),
          content: {
            title: "Hi",
            description: "Hello",
            recipient: accounts[1].address,
            amount: stringToCoins("1uscrt"),
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
          initial_deposit: stringToCoins("10000000uscrt"),
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
      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const tx = await secretjs.tx.gov.submitProposal(
        {
          type: ProposalType.SoftwareUpgradeProposal,
          proposer: accounts[0].address,
          initial_deposit: stringToCoins("10000000uscrt"),
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
          initial_deposit: stringToCoins("10000000uscrt"),
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
        initial_deposit: stringToCoins("10000000uscrt"),
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
    const proposal_id = getValueFromRawLog(
      txSubmit.rawLog,
      "submit_proposal.proposal_id",
    );

    const tx = await secretjs.tx.gov.vote(
      {
        voter: accounts[0].address,
        proposal_id,
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
      proposal_id,
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
        initial_deposit: stringToCoins("10000000uscrt"),
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
    const proposal_id = getValueFromRawLog(
      txSubmit.rawLog,
      "submit_proposal.proposal_id",
    );

    // vote yes with 70% of my power
    const tx = await secretjs.tx.gov.voteWeighted(
      {
        voter: accounts[0].address,
        proposal_id,
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
      proposal_id,
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
        initial_deposit: [],
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
    const proposal_id = getValueFromRawLog(
      txSubmit.rawLog,
      "submit_proposal.proposal_id",
    );

    const tx = await secretjs.tx.gov.deposit(
      {
        depositor: accounts[0].address,
        proposal_id: proposal_id,
        amount: stringToCoins("1uscrt"),
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
      proposal_id,
    });

    expect(deposit?.amount).toStrictEqual(stringToCoins("1uscrt"));
  });

  test("Expedited", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.broadcast(
      [
        new MsgSubmitProposal({
          // expedited
          type: ProposalType.TextProposal,
          proposer: accounts[0].address,
          initial_deposit: stringToCoins("50000000uscrt"),
          content: {
            title: "Expedited Hi",
            description: "Expedited Hello",
          },
          is_expedited: true,
        }),
        new MsgSubmitProposal({
          // expedited = false
          type: ProposalType.TextProposal,
          proposer: accounts[0].address,
          initial_deposit: stringToCoins("10000000uscrt"),
          content: {
            title: "Hi",
            description: "Hello",
          },
          is_expedited: false,
        }),
        new MsgSubmitProposal({
          // expedited omitted
          type: ProposalType.TextProposal,
          proposer: accounts[0].address,
          initial_deposit: stringToCoins("10000000uscrt"),
          content: {
            title: "Hi",
            description: "Hello",
          },
        }),
      ],
      {
        gasLimit: 5_000_000,
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    let { proposal_id } = MsgSubmitProposalResponse.decode(tx.data[0]);

    let { proposal } = await secretjs.query.gov.proposal({
      proposal_id,
    });

    expect(proposal?.is_expedited).toBe(true);

    ({ proposal_id } = MsgSubmitProposalResponse.decode(tx.data[1]));

    ({ proposal } = await secretjs.query.gov.proposal({
      proposal_id,
    }));

    expect(proposal?.is_expedited).toBe(false);

    ({ proposal_id } = MsgSubmitProposalResponse.decode(tx.data[2]));

    ({ proposal } = await secretjs.query.gov.proposal({
      proposal_id,
    }));

    expect(proposal?.is_expedited).toBe(false);
  });
});

describe("tx.staking", () => {
  test("MsgDelegate", async () => {
    const { secretjs } = accounts[0];

    const [{ operator_address: validator_address, tokens: tokensBefore }] = (
      await secretjs.query.staking.validators({
        status: "",
      })
    ).validators!;

    const tx = await secretjs.tx.staking.delegate(
      {
        delegator_address: accounts[0].address,
        validator_address: validator_address!,
        amount: stringToCoin("1uscrt"),
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

    const [{ tokens: tokensAfter }] = (
      await secretjs.query.staking.validators({ status: "" })
    ).validators!;

    expect(BigInt(tokensAfter!) - BigInt(tokensBefore!)).toBe(BigInt(1));
  });

  test("MsgUndelegate", async () => {
    const { secretjs } = accounts[0];

    const [{ operator_address: validator_address, tokens: tokensBefore }] = (
      await secretjs.query.staking.validators({ status: "" })
    ).validators!;

    const txDelegate = await secretjs.tx.staking.delegate(
      {
        delegator_address: accounts[0].address,
        validator_address: validator_address!,
        amount: stringToCoin("1uscrt"),
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

    const [{ tokens: tokensAfterDelegate }] = (
      await secretjs.query.staking.validators({ status: "" })
    ).validators!;
    expect(BigInt(tokensAfterDelegate!) - BigInt(tokensBefore!)).toBe(
      BigInt(1),
    );

    const tx = await secretjs.tx.staking.undelegate(
      {
        delegator_address: accounts[0].address,
        validator_address: validator_address!,
        amount: stringToCoin("1uscrt"),
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

    const [{ tokens: tokensAfterUndelegate }] = (
      await secretjs.query.staking.validators({ status: "" })
    ).validators!;
    expect(tokensAfterUndelegate).toBe(tokensBefore);
  });

  test("MsgCreateValidator", async () => {
    const { secretjs } = accounts[1];

    const { validators: validatorsBefore } =
      await secretjs.query.staking.validators({ status: "" });

    const tx = await secretjs.tx.staking.createValidator(
      {
        delegator_address: accounts[1].address,
        commission: {
          max_change_rate: 0.01,
          max_rate: 0.1,
          rate: 0.05,
        },
        description: {
          moniker: "banana",
          identity: "papaya",
          website: "watermelon.com",
          security_contact: "info@watermelon.com",
          details: "We are the banana papaya validator",
        },
        pubkey: toBase64(new Uint8Array(32).fill(1)),
        min_self_delegation: "1",
        initial_delegation: stringToCoin("1uscrt"),
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

    expect(validatorsAfter!.length - validatorsBefore!.length).toBe(1);
  });

  test("MsgEditValidator", async () => {
    const { secretjs } = accounts[2];

    const txCreateValidator = await secretjs.tx.staking.createValidator(
      {
        delegator_address: accounts[2].address,
        commission: {
          max_change_rate: 0.01,
          max_rate: 0.1,
          rate: 0.05,
        },
        description: {
          moniker: "banana",
          identity: "papaya",
          website: "watermelon.com",
          security_contact: "info@watermelon.com",
          details: "We are the banana papaya validator",
        },
        pubkey: toBase64(new Uint8Array(32).fill(2)),
        min_self_delegation: "2",
        initial_delegation: stringToCoin("3uscrt"),
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
    const validator_address = getValueFromRawLog(
      txCreateValidator.rawLog,
      "create_validator.validator",
    );

    const tx = await secretjs.tx.staking.editValidator(
      {
        validator_address,
        description: {
          moniker: "papaya",
          identity: "banana",
          website: "com.watermelon",
          security_contact: "as@com.com",
          details: "We are the banana papaya validator yay!",
        },
        min_self_delegation: "3",
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

    const validator = validators!.find(
      (v) => v.operator_address === validator_address,
    )!;

    expect(validator).toBeTruthy();
    expect(validator.description).toStrictEqual({
      moniker: "papaya",
      identity: "banana",
      website: "com.watermelon",
      security_contact: "as@com.com",
      details: "We are the banana papaya validator yay!",
    });
    expect(validator.min_self_delegation).toBe("3");
  });

  test("MsgBeginRedelegate", async () => {
    const txCreate = await accounts[3].secretjs.tx.staking.createValidator(
      {
        delegator_address: accounts[3].address,
        commission: {
          max_change_rate: 0.01,
          max_rate: 0.1,
          rate: 0.05,
        },
        description: {
          moniker: "banana",
          identity: "papaya",
          website: "watermelon.com",
          security_contact: "info@watermelon.com",
          details: "We are the banana papaya validator",
        },
        pubkey: toBase64(new Uint8Array(32).fill(3)),
        min_self_delegation: "2",
        initial_delegation: stringToCoin("3uscrt"),
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
        delegator_address: accounts[0].address,
        validator_address: validators![0].operator_address!,
        amount: stringToCoin("1uscrt"),
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
        delegator_address: accounts[0].address,
        validator_src_address: validators![0].operator_address!,
        validator_dst_address: validators![1].operator_address!,
        amount: stringToCoin("1uscrt"),
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
        delegator_address: accounts[4].address,
        commission: {
          max_change_rate: 0.01,
          max_rate: 0.1,
          rate: 0.05,
        },
        description: {
          moniker: "banana",
          identity: "papaya",
          website: "watermelon.com",
          security_contact: "info@watermelon.com",
          details: "We are the banana papaya validator",
        },
        pubkey: toBase64(new Uint8Array(32).fill(4)),
        min_self_delegation: "2",
        initial_delegation: stringToCoin("3uscrt"),
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

    const validator_addr = getValueFromRawLog(
      txCreateValidator.rawLog,
      "create_validator.validator",
    );

    const txUnjail = await secretjs.tx.slashing.unjail(
      {
        validator_addr,
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );

    // To jail a validator we have to be inactive for 10 minutes.
    // This is too much for a test, so getting to "validator not jailed"
    // is far enough to make sure that MsgUnjail goes through.
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
        amount: stringToCoins("1uscrt"),
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
    const { secretjs, address: delegator_address } = accounts[0];

    const [{ operator_address: validator_address }] = (
      await secretjs.query.staking.validators({ status: "" })
    ).validators!;

    const txDelegate = await secretjs.tx.staking.delegate(
      {
        delegator_address,
        validator_address: validator_address!,
        amount: stringToCoin("1uscrt"),
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
        delegator_address,
        validator_address: validator_address!,
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
    const onlineValidator = validators!.find(
      (v) => v.status === BondStatus.BOND_STATUS_BONDED,
    )!;
    const selfDelegator = bech32.encode(
      "secret",
      bech32.decode(onlineValidator.operator_address!).words,
    );
    const selfDelegatorAccount = accounts.find(
      (a) => a.address === selfDelegator,
    )!;

    const tx =
      await selfDelegatorAccount.secretjs.tx.distribution.withdrawValidatorCommission(
        {
          validator_address: onlineValidator.operator_address!,
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
    const onlineValidator = validators!.find(
      (v) => v.status === BondStatus.BOND_STATUS_BONDED,
    )!;
    const selfDelegator = bech32.encode(
      "secret",
      bech32.decode(onlineValidator.operator_address!).words,
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
          delegator_address: selfDelegatorAccount.address,
          withdraw_address: notSelfDelegatorAccount.address,
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

  test("MsgSetAutoRestake true", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.broadcast(
      [
        new MsgDelegate({
          delegator_address: secretjs.address,
          validator_address: selfDelegatorAddressToValidatorAddress(
            secretjs.address,
          ),
          amount: stringToCoin("1000000000uscrt"),
        }),
        new MsgSetAutoRestake({
          delegator_address: secretjs.address,
          validator_address: selfDelegatorAddressToValidatorAddress(
            secretjs.address,
          ),
          enabled: true,
        }),
      ],
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    const { validators } = await secretjs.query.distribution.restakingEntries({
      delegator: secretjs.address,
    });

    expect(validators).toContain(
      selfDelegatorAddressToValidatorAddress(secretjs.address),
    );
  });

  test("MsgSetAutoRestake false", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.broadcast(
      [
        new MsgDelegate({
          delegator_address: secretjs.address,
          validator_address: selfDelegatorAddressToValidatorAddress(
            secretjs.address,
          ),
          amount: stringToCoin(`${1_000e6}uscrt`),
        }),
        new MsgSetAutoRestake({
          delegator_address: secretjs.address,
          validator_address: selfDelegatorAddressToValidatorAddress(
            secretjs.address,
          ),
          enabled: true,
        }),
        new MsgSetAutoRestake({
          delegator_address: secretjs.address,
          validator_address: selfDelegatorAddressToValidatorAddress(
            secretjs.address,
          ),
          enabled: false,
        }),
      ],
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    const { validators } = await secretjs.query.distribution.restakingEntries({
      delegator: secretjs.address,
    });

    expect(validators).not.toContain(
      selfDelegatorAddressToValidatorAddress(secretjs.address),
    );
  });
});

describe("sanity", () => {
  test.skip("Every msg has a decoder registered in the registry", async () => {});

  test.skip("Every msg has a Msg class", async () => {
    // TODO fix this test

    let { stdout } = await exec(
      `find "${__dirname}/../src/protobuf" -name msg.ts -or -name tx.ts -print0 | xargs -0 -n 1 grep -Po 'export interface Msg[A-Za-z]+' | grep -Po 'Msg.+' | grep -v Response | sort -u`,
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

  test("All queries are implemented", async () => {
    let { stdout } = await exec(
      `find "${__dirname}/../src/grpc_gateway" -name query.pb.ts -type f`,
    );

    const queryFiles = String(stdout)
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x.length > 0);

    const { secretjs } = accounts[0];
    const secretjsQueries: string[][] = [];
    for (const module of Object.keys(secretjs.query)) {
      if (["getTx", "txsQuery", "snip20", "snip721"].includes(module)) {
        continue;
      }
      secretjsQueries.push(
        //@ts-ignore
        getAllMethodNames(secretjs.query[module])
          .map((q) => q.replace(/^queryContract$/, "querySecretContract"))
          .sort(),
      );
    }

    for (const f of queryFiles) {
      ({ stdout } = await exec(
        `cat "${f}" | grep -Po 'static .+?\\(req' | awk -F '[ (]' '{print $2}'`,
      ));

      const grpcGatewayQueries = String(stdout)
        .split("\n")
        .map((x) => x.trim())
        .filter((x) => x.length > 0)
        .map((x) => x.slice(0, 1).toLocaleLowerCase() + x.slice(1))
        .sort();

      expect(secretjsQueries).toContainEqual(grpcGatewayQueries);
    }
  });

  test("Same tx.tx structure when broadcasting in block mode and when using getTx()", async () => {
    const { secretjs } = accounts[0];

    let tx = await secretjs.tx.compute.storeCode(
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
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    const storeTxBroadcast = tx.tx;
    const storeTxGetTx = (await secretjs.query.getTx(tx.transactionHash))!.tx;

    expect(storeTxGetTx).toStrictEqual(storeTxBroadcast);

    const code_id = getValueFromRawLog(tx.rawLog, "message.code_id");

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        code_hash,
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

    const initTxBroadcast = tx.tx;
    const initTxGetTx = (await secretjs.query.getTx(tx.transactionHash))!.tx;

    expect(initTxGetTx).toStrictEqual(initTxBroadcast);

    const contract_address = MsgInstantiateContractResponse.decode(
      tx.data[0],
    ).address;

    tx = await secretjs.tx.broadcast(
      [
        new MsgExecuteContract({
          sender: secretjs.address,
          contract_address,
          msg: {
            create_viewing_key: {
              entropy: "bla bla",
            },
          },
          code_hash,
        }),
      ],
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    const execTxBroadcast = tx.tx;
    const execTxGetTx = (await secretjs.query.getTx(tx.transactionHash))!.tx;

    expect(execTxGetTx).toStrictEqual(execTxBroadcast);
  });
});

describe("tx.feegrant", () => {
  test("MsgGrantAllowance", async () => {
    const { secretjs } = accounts[0];
    const newWallet = new AminoWallet(); // this tests both amino & protobuf

    let tx = await secretjs.tx.feegrant.grantAllowance({
      granter: secretjs.address,
      grantee: newWallet.address,
      allowance: {
        spend_limit: stringToCoins("1000000uscrt"),
      },
    });

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    const secretjsGrantee = new SecretNetworkClient({
      url: chain1LCD,
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
        initial_deposit: [],
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
        spend_limit: stringToCoins("1000000uscrt"),
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

      const [{ operator_address: validator_address }] = (
        await secretjsGranter.query.staking.validators({ status: "" })
      ).validators!;

      const tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            allow_list: [validator_address!],
            deny_list: [],
            max_tokens: stringToCoin("1000000uscrt"),
            authorization_type: StakeAuthorizationType.Delegate,
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
            spend_limit: [stringToCoins("1000000uscrt")][0],
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

      const [{ operator_address: validator_address }] = (
        await secretjsGranter.query.staking.validators({ status: "" })
      ).validators!;

      let tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            allow_list: [validator_address!],
            deny_list: [],
            max_tokens: stringToCoin("1000000uscrt"),
            authorization_type: StakeAuthorizationType.Delegate,
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
              amount: stringToCoin("1uscrt"),
              delegator_address: secretjsGranter.address,
              validator_address: validator_address!,
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
            spend_limit: [stringToCoins("1000000uscrt")][0],
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
              from_address: secretjsGranter.address,
              to_address: secretjsGranter.address,
              amount: stringToCoins("1uscrt"),
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
              from_address: secretjsGranter.address,
              to_address: secretjsGranter.address,
              amount: stringToCoins("1uscrt"),
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

      const [{ operator_address: validator_address }] = (
        await secretjsGranter.query.staking.validators({ status: "" })
      ).validators!;

      let tx = await secretjsGranter.tx.authz.grant(
        {
          granter: secretjsGranter.address,
          grantee: secretjsGrantee.address,
          authorization: {
            allow_list: [validator_address!],
            deny_list: [],
            max_tokens: stringToCoin("1000000uscrt"),
            authorization_type: StakeAuthorizationType.Delegate,
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
              amount: stringToCoin("1uscrt"),
              delegator_address: secretjsGranter.address,
              validator_address: validator_address!,
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
            spend_limit: [stringToCoins("1000000uscrt")][0],
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
              from_address: secretjsGranter.address,
              to_address: secretjsGranter.address,
              amount: stringToCoins("1uscrt"),
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
              from_address: secretjsGranter.address,
              to_address: secretjsGranter.address,
              amount: stringToCoins("1uscrt"),
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

// Utils tests don't require LocalSecret to run, so SKIP_LOCALSECRET=true
// env variable can be used to run them faster
describe("utils", () => {
  test("pubkeyToAddress", async () => {
    expect(
      pubkeyToAddress(
        fromBase64("AorghQCGoNZ8wzxuAsw85sSrqOAay19PaaewNZ7+I2ST"),
      ),
    ).toBe("secret1e8fnfznmgm67nud2uf2lrcvuy40pcdhrerph7v");
  });

  test("base64PubkeyToAddress", async () => {
    expect(
      base64PubkeyToAddress("AorghQCGoNZ8wzxuAsw85sSrqOAay19PaaewNZ7+I2ST"),
    ).toBe("secret1e8fnfznmgm67nud2uf2lrcvuy40pcdhrerph7v");
  });

  test("selfDelegatorAddressToValidatorAddress", async () => {
    expect(
      selfDelegatorAddressToValidatorAddress(
        "secret1hscf4cjrhzsea5an5smt4z9aezhh4sf5r4dam5",
      ),
    ).toBe("secretvaloper1hscf4cjrhzsea5an5smt4z9aezhh4sf5jjrqka");
  });

  test("validatorAddressToSelfDelegatorAddress", async () => {
    expect(
      validatorAddressToSelfDelegatorAddress(
        "secretvaloper1hscf4cjrhzsea5an5smt4z9aezhh4sf5jjrqka",
      ),
    ).toBe("secret1hscf4cjrhzsea5an5smt4z9aezhh4sf5r4dam5");
  });

  test("tendermintPubkeyToValconsAddress", async () => {
    expect(
      tendermintPubkeyToValconsAddress(
        fromBase64("KgnRkdlLhDJT/9zxTl3YwUfXevNgYorFV7NjAflVkAg="),
      ),
    ).toBe("secretvalcons1rd5gs24he44ufnwawshu3u73lh33cx5z7npzre");
  });

  test("base64TendermintPubkeyToValconsAddress", async () => {
    expect(
      base64TendermintPubkeyToValconsAddress(
        "KgnRkdlLhDJT/9zxTl3YwUfXevNgYorFV7NjAflVkAg=",
      ),
    ).toBe("secretvalcons1rd5gs24he44ufnwawshu3u73lh33cx5z7npzre");
  });

  describe("validateAddress", () => {
    test("invalid bech32", async () => {
      expect(validateAddress("asdasds")).toStrictEqual({
        isValid: false,
        reason: "failed to decode address as a bech32: asdasds too short",
      });
    });

    test("wrong prefix", async () => {
      expect(
        validateAddress(
          "secret1e8fnfznmgm67nud2uf2lrcvuy40pcdhrerph7v",
          "cosmos",
        ),
      ).toStrictEqual({
        isValid: false,
        reason: "wrong bech32 prefix, expected 'cosmos', got 'secret'",
      });
    });

    test("ok length 20", async () => {
      expect(
        validateAddress("secret1e8fnfznmgm67nud2uf2lrcvuy40pcdhrerph7v"),
      ).toStrictEqual({
        isValid: true,
      });
    });

    test("ok length 32", async () => {
      expect(
        validateAddress(
          "blabla1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583scvwdet",
          "blabla",
        ),
      ).toStrictEqual({
        isValid: true,
      });
    });

    test("wrong length", async () => {
      expect(
        validateAddress("secret1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqp3sprt"),
      ).toStrictEqual({
        isValid: false,
        reason: "wrong address length, expected 20 or 32 bytes, got 21",
      });
    });
  });
});

describe("tx broadcast multi", () => {
  test("Send Multiple Messages Amino", async () => {
    const { secretjs } = accounts[0];

    const code_id = await storeSnip20Ibc(secretjs, accounts[0].address);

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    let tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        code_hash,
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
    let contract_address = checkInstantiateSuccess(tx);

    tx = await secretjs.tx.broadcast(
      [
        new MsgSend({
          from_address: accounts[0].address,
          to_address: accounts[2].address,
          amount: stringToCoins("1uscrt"),
        }),
        new MsgExecuteContract({
          sender: secretjs.address,
          contract_address,
          msg: {
            create_viewing_key: {
              entropy: "bla bla",
            },
          },
          code_hash,
        }),
      ],
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);
  });
});

test("url without trailing slashes", async () => {
  // without slashes
  const secretjs = new SecretNetworkClient({
    chainId: "secretdev-1",
    url: chain1LCD.replace(/\/*$/g, ""),
  });

  const res = await secretjs.query.tendermint.getLatestBlock({});

  expect(Number(res.block?.header?.height)).toBeGreaterThan(0);
});

test("url with trailing slashes", async () => {
  // without slashes
  const secretjs = new SecretNetworkClient({
    chainId: "secretdev-1",
    url: chain1LCD + "//////",
  });

  const res = await secretjs.query.tendermint.getLatestBlock({});

  expect(Number(res.block?.header?.height)).toBeGreaterThan(0);
});
