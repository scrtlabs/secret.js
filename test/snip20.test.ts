import { fromUtf8 } from "@cosmjs/encoding";
import fs from "fs";
import {
  MsgExecuteContractResponse,
  MsgInstantiateContractResponse,
  TxResultCode,
} from "../src";
import { accounts, getValueFromRawLog } from "./utils";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("tx.snip20", () => {
  test("transfer", async () => {
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
        gasLimit: 5_000_000,
      },
    );

    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id: code_id,
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
        init_funds: [],
      },
      {
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

    const txExec = await secretjs.tx.snip20.transfer(
      {
        sender: secretjs.address,
        contract_address,
        msg: {
          transfer: { recipient: accounts[1].address, amount: "2" },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(txExec.data[0]).data),
    ).toContain('{"transfer":{"status":"success"}}');
  });

  test("send", async () => {
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
        gasLimit: 5_000_000,
      },
    );

    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash: code_hash } =
      await secretjs.query.compute.codeHashByCodeId({
        code_id: code_id,
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
        init_funds: [],
      },
      {
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

    const txExec = await secretjs.tx.snip20.send(
      {
        sender: secretjs.address,
        contract_address,
        msg: { send: { recipient: accounts[1].address, amount: "2" } },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(txExec.data[0]).data),
    ).toContain('{"send":{"status":"success"}}');
  });

  test("increase allowance", async () => {
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
        gasLimit: 5_000_000,
      },
    );

    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash: code_hash } =
      await secretjs.query.compute.codeHashByCodeId({
        code_id: code_id,
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
        init_funds: [],
      },
      {
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

    let txExec = await secretjs.tx.snip20.increaseAllowance(
      {
        sender: secretjs.address,
        contract_address: contractAddress,
        msg: {
          increase_allowance: {
            spender: accounts[1].address,
            amount: "2",
          },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(txExec.data[0]).data),
    ).toContain("increase_allowance");
  });

  test("decrease allowance", async () => {
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
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash: code_hash } =
      await secretjs.query.compute.codeHashByCodeId({
        code_id: code_id,
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
        init_funds: [],
      },
      {
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

    let txExec = await secretjs.tx.snip20.increaseAllowance(
      {
        sender: secretjs.address,
        contract_address: contractAddress,
        msg: {
          increase_allowance: {
            spender: accounts[1].address,
            amount: "2",
          },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(txExec.data[0]).data),
    ).toContain("increase_allowance");

    txExec = await secretjs.tx.snip20.decreaseAllowance(
      {
        sender: secretjs.address,
        contract_address: contractAddress,
        msg: {
          decrease_allowance: {
            spender: accounts[1].address,
            amount: "2",
          },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(txExec.data[0]).data),
    ).toContain("decrease_allowance");
  });
});

describe("query.snip20", () => {
  test("balance", async () => {
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
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash: code_hash } =
      await secretjs.query.compute.codeHashByCodeId({
        code_id: code_id,
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
        init_funds: [],
      },
      {
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

    const txExec = await secretjs.tx.snip20.setViewingKey(
      {
        sender: secretjs.address,
        contract_address: contractAddress,
        msg: { set_viewing_key: { key: "hello" } },
      },
      { gasLimit: 5_000_000 },
    );
    if (txExec.code !== TxResultCode.Success) {
      console.error(txExec.rawLog);
    }
    expect(txExec.code).toBe(TxResultCode.Success);

    const txQuery = await secretjs.query.snip20.getBalance({
      address: secretjs.address,
      contract: { address: contractAddress, code_hash: code_hash! },
      auth: { key: "hello" },
    });

    expect(txQuery.balance.amount).toEqual("2");
  });

  test("token parameters", async () => {
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
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash: code_hash } =
      await secretjs.query.compute.codeHashByCodeId({
        code_id: code_id,
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
        init_funds: [],
      },
      {
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

    const txQuery = await secretjs.query.snip20.getSnip20Params({
      contract: { address: contractAddress, code_hash: code_hash! },
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
        wasm_byte_code: fs.readFileSync(
          `${__dirname}/snip20-ibc.wasm.gz`,
        ) as Uint8Array,
        source: "",
        builder: "",
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash: code_hash } =
      await secretjs.query.compute.codeHashByCodeId({
        code_id: code_id,
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
        init_funds: [],
      },
      {
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

    await secretjs.tx.snip20.increaseAllowance(
      {
        sender: secretjs.address,
        contract_address: contractAddress,
        msg: {
          increase_allowance: {
            spender: accounts[1].address,
            amount: "2",
          },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    await secretjs.tx.snip20.setViewingKey(
      {
        sender: secretjs.address,
        contract_address: contractAddress,
        msg: { set_viewing_key: { key: "hello" } },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const txQuery = await secretjs.query.snip20.GetAllowance({
      contract: { address: contractAddress, code_hash: code_hash! },
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
        wasm_byte_code: fs.readFileSync(
          `${__dirname}/snip20-ibc.wasm.gz`,
        ) as Uint8Array,
        source: "",
        builder: "",
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash: code_hash } =
      await secretjs.query.compute.codeHashByCodeId({
        code_id: code_id,
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
        init_funds: [],
      },
      {
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

    await secretjs.tx.snip20.setViewingKey(
      {
        sender: secretjs.address,
        contract_address: contractAddress,
        msg: { set_viewing_key: { key: "hello" } },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    await secretjs.tx.snip20.transfer(
      {
        sender: secretjs.address,
        contract_address: contractAddress,
        msg: {
          transfer: { recipient: accounts[1].address, amount: "2" },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );

    const txQuery = await secretjs.query.snip20.getTransactionHistory({
      contract: { address: contractAddress, code_hash: code_hash! },
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
