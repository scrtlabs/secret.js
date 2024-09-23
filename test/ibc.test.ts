import { Link } from "@confio/relayer";
import { sha256 } from "@noble/hashes/sha256";
import fs from "fs";
import pako from "pako";
import {
  coinFromString,
  coinsFromString,
  ibcDenom,
  MsgExecuteContract,
  MsgInstantiateContractResponse,
  MsgPayPacketFee,
  MsgStoreCode,
  MsgStoreCodeResponse,
  MsgTransfer,
  SecretNetworkClient,
  stringToCoin,
  toBase64,
  toHex,
  toUtf8,
  TxResponse,
  TxResultCode,
  Wallet,
} from "../src";
import { Coin } from "../src/grpc_gateway/cosmos/base/v1beta1/coin.pb";
import {
  Account,
  accounts,
  chain1LCD,
  chain2LCD,
  createIbcChannel,
  createIbcConnection,
  loopRelayer,
  passParameterChangeProposal,
  sleep,
  turnIbcSwitchOff,
  turnIbcSwitchOn,
  waitForChainToStart,
} from "./utils";

let ibcConnection: Link;
let stopRelayer: () => Promise<void>;

beforeAll(async () => {
  jest.spyOn(console, "warn").mockImplementation(() => {});

  console.log("Waiting for LocalSecret2 to start...");

  await waitForChainToStart({
    chainId: "secretdev-2",
    url: chain2LCD,
  });

  console.log("Creating IBC connection...");
  ibcConnection = await createIbcConnection();
}, 180_000);

const contractsSetup = async (version: string = "ics20-1") => {
  type Contract = {
    wasm: Uint8Array;
    address: string;
    codeId: number;
    ibcPortId: string;
    codeHash: string;
  };

  const contracts: { snip20: Contract; cw20ics20: Contract } = {
    snip20: {
      wasm: new Uint8Array(),
      address: "",
      codeId: -1,
      ibcPortId: "",
      codeHash: "",
    },
    cw20ics20: {
      wasm: new Uint8Array(),
      address: "",
      codeId: -1,
      ibcPortId: "",
      codeHash: "",
    },
  };

  let ibcChannelIdOnChain1 = "";
  let ibcChannelIdOnChain2 = "";

  if (stopRelayer) {
    console.log("Pausing relayer...");
    await stopRelayer();
  }

  contracts.snip20.wasm = fs.readFileSync(
    `${__dirname}/snip20-ibc.wasm.gz`,
  ) as Uint8Array;
  contracts.cw20ics20.wasm = fs.readFileSync(
    `${__dirname}/cw20-ics20.wasm.gz`,
  ) as Uint8Array;

  contracts.snip20.codeHash = toHex(sha256(pako.ungzip(contracts.snip20.wasm)));
  contracts.cw20ics20.codeHash = toHex(
    sha256(pako.ungzip(contracts.cw20ics20.wasm)),
  );

  console.log("Storing contracts on secretdev-1...");

  let tx: TxResponse = await accounts[0].secretjs.tx.broadcast(
    [
      new MsgStoreCode({
        sender: accounts[0].address,
        wasm_byte_code: contracts.snip20.wasm,
        source: "",
        builder: "",
      }),
      new MsgStoreCode({
        sender: accounts[0].address,
        wasm_byte_code: contracts.cw20ics20.wasm,
        source: "",
        builder: "",
      }),
    ],
    { gasLimit: 5_000_000 },
  );
  if (tx.code !== TxResultCode.Success) {
    console.error(tx.rawLog);
  }
  expect(tx.code).toBe(TxResultCode.Success);

  contracts.snip20.codeId = Number(
    MsgStoreCodeResponse.decode(tx.data[0]).code_id,
  );
  contracts.cw20ics20.codeId = Number(
    MsgStoreCodeResponse.decode(tx.data[1]).code_id,
  );

  console.log("Instantiating snip20 on secretdev-1...");

  tx = await accounts[0].secretjs.tx.compute.instantiateContract(
    {
      sender: accounts[0].address,
      code_id: contracts.snip20.codeId,
      code_hash: contracts.snip20.codeHash,
      init_msg: {
        name: "Secret SCRT",
        admin: accounts[0].address,
        symbol: "SSCRT",
        decimals: 6,
        initial_balances: [{ address: accounts[0].address, amount: "1000" }],
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
      label: `snip20-${Date.now()}`,
    },
    { gasLimit: 300_000 },
  );
  if (tx.code !== TxResultCode.Success) {
    console.error(tx.rawLog);
  }
  expect(tx.code).toBe(TxResultCode.Success);

  contracts.snip20.address = MsgInstantiateContractResponse.decode(
    tx.data[0],
  ).address;
  contracts.snip20.ibcPortId = "wasm." + contracts.snip20.address;

  console.log("Instantiating cw20-ics20 on secretdev-1...");

  tx = await accounts[0].secretjs.tx.compute.instantiateContract(
    {
      sender: accounts[0].address,
      code_id: contracts.cw20ics20.codeId,
      code_hash: contracts.cw20ics20.codeHash,
      init_msg: {
        admin: accounts[0].address,
        allowlist: [
          {
            contract: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
          },
        ],
      },
      label: `cw20-ics20-${Date.now()}`,
    },
    { gasLimit: 300_000 },
  );
  if (tx.code !== TxResultCode.Success) {
    console.error(tx.rawLog);
  }
  expect(tx.code).toBe(TxResultCode.Success);

  contracts.cw20ics20.address = MsgInstantiateContractResponse.decode(
    tx.data[0],
  ).address;
  contracts.cw20ics20.ibcPortId = "wasm." + contracts.cw20ics20.address;

  console.log(
    `Creating IBC wasm <-> transfer channel with version='${version}'...`,
  );
  const ibcChannelPair = await createIbcChannel(
    ibcConnection,
    contracts.cw20ics20.ibcPortId,
    version,
  );

  ibcChannelIdOnChain1 = ibcChannelPair.src.channelId;
  ibcChannelIdOnChain2 = ibcChannelPair.dest.channelId;

  expect(ibcChannelIdOnChain1).not.toBe("");
  expect(ibcChannelIdOnChain2).not.toBe("");

  console.log("Looping relayer...");
  stopRelayer = loopRelayer(ibcConnection);

  return { contracts, ibcChannelIdOnChain1, ibcChannelIdOnChain2 };
};

afterAll(async () => {
  if (stopRelayer) {
    console.log("Stopping relayer...");
    await stopRelayer();
  }
});

describe("ibcResponses", () => {
  let ibcChannelIdOnChain1 = "";
  let ibcChannelIdOnChain2 = "";

  beforeAll(async () => {
    if (stopRelayer) {
      console.log("Pausing relayer...");
      await stopRelayer();
    }

    console.log("Creating IBC transfer <-> transfer channel...");
    const ibcChannelPair = await createIbcChannel(ibcConnection);

    ibcChannelIdOnChain1 = ibcChannelPair.src.channelId;
    ibcChannelIdOnChain2 = ibcChannelPair.dest.channelId;

    expect(ibcChannelIdOnChain1).not.toBe("");
    expect(ibcChannelIdOnChain2).not.toBe("");

    console.log("Looping relayer...");
    stopRelayer = loopRelayer(ibcConnection);
  });

  test("ibcResponses", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.ibc.transfer(
      {
        sender: secretjs.address,
        receiver: secretjs.address,
        source_channel: ibcChannelIdOnChain1,
        source_port: "transfer",
        token: stringToCoin("1uscrt"),
        timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minutes
        memo: "hi",
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 100_000,
        ibcTxsOptions: {
          resolveResponsesCheckIntervalMs: 250,
        },
      },
    );

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    expect(tx.ibcResponses.length).toBe(1);
    const ibcResp = await tx.ibcResponses[0];

    expect(ibcResp.type).toBe("ack");

    expect(
      ibcResp.tx.arrayLog?.find(
        (x) =>
          x.type === "fungible_token_packet" &&
          x.key === "success" &&
          x.value === "\x01",
      ),
    ).toBeTruthy();
  }, 90_000);

  test("multiple ibcResponses", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.broadcast(
      [
        new MsgTransfer({
          sender: secretjs.address,
          receiver: secretjs.address,
          source_channel: ibcChannelIdOnChain1,
          source_port: "transfer",
          token: stringToCoin("1uscrt"),
          timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minutes
          memo: "hi",
        }),
        new MsgTransfer({
          sender: secretjs.address,
          receiver: secretjs.address,
          source_channel: ibcChannelIdOnChain1,
          source_port: "transfer",
          token: stringToCoin("1uscrt"),
          timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minutes
          memo: "hi",
        }),
      ],
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 200_000,
        ibcTxsOptions: {
          resolveResponsesCheckIntervalMs: 250,
        },
      },
    );

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    expect(tx.ibcResponses.length).toBe(2);
    const ibcResponses = await Promise.all(tx.ibcResponses);

    for (const ibcResp of ibcResponses) {
      expect(ibcResp.type).toBe("ack");
      expect(
        ibcResp.tx.arrayLog?.find(
          (x) =>
            x.type === "fungible_token_packet" &&
            x.key === "success" &&
            x.value === "\x01",
        ),
      ).toBeTruthy();
    }
  }, 90_000);

  test("ibcResponses timeout", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.ibc.transfer(
      {
        sender: secretjs.address,
        receiver: secretjs.address,
        source_channel: ibcChannelIdOnChain1,
        source_port: "transfer",
        token: stringToCoin("1uscrt"),
        timeout_timestamp: String(Math.floor(Date.now() / 1000) + 1), // 1 second
        memo: "hi",
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 100_000,
        ibcTxsOptions: {
          resolveResponsesCheckIntervalMs: 250,
        },
      },
    );

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    expect(tx.ibcResponses.length).toBe(1);
    const ibcResp = await tx.ibcResponses[0];

    expect(ibcResp.type).toBe("timeout");

    expect(
      ibcResp.tx.arrayLog?.find(
        (x) =>
          x.type === "timeout" && x.key === "refund_amount" && x.value === "1",
      ),
    ).toBeTruthy();
    expect(
      ibcResp.tx.arrayLog?.find(
        (x) =>
          x.type === "timeout" &&
          x.key === "refund_denom" &&
          x.value === "uscrt",
      ),
    ).toBeTruthy();
    expect(
      ibcResp.tx.arrayLog?.find(
        (x) =>
          x.type === "timeout" &&
          x.key === "refund_receiver" &&
          x.value === secretjs.address,
      ),
    ).toBeTruthy();
  }, 1000_000);

  test("ibcResponses turned off by default on txsQuery", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.ibc.transfer(
      {
        sender: secretjs.address,
        receiver: secretjs.address,
        source_channel: ibcChannelIdOnChain1,
        source_port: "transfer",
        token: stringToCoin("1uscrt"),
        timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minutes
        memo: "hi",
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 100_000,
      },
    );

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    let txs: TxResponse[] = [];
    let tries = 4;
    while (txs?.length === 0 && tries > 0) {
      // since this is immediately after tx broadcast,
      // give some time for it to register in the node
      await sleep(150);
      txs = await secretjs.query.txsQuery(`tx.hash='${tx.transactionHash}'`);
      tries--;
    }

    expect(txs.length).toBe(1);
    expect(txs[0].ibcResponses.length).toBe(0);
  }, 90_000);
});

describe("cw20-ics20", () => {
  type Contract = {
    wasm: Uint8Array;
    address: string;
    codeId: number;
    ibcPortId: string;
    codeHash: string;
  };

  let contracts: { snip20: Contract; cw20ics20: Contract } = {
    snip20: {
      wasm: new Uint8Array(),
      address: "",
      codeId: -1,
      ibcPortId: "",
      codeHash: "",
    },
    cw20ics20: {
      wasm: new Uint8Array(),
      address: "",
      codeId: -1,
      ibcPortId: "",
      codeHash: "",
    },
  };

  let ibcChannelIdOnChain1 = "";
  let ibcChannelIdOnChain2 = "";

  beforeAll(async () => {
    ({ contracts, ibcChannelIdOnChain1, ibcChannelIdOnChain2 } =
      await contractsSetup());
  }, 180_000 /* 3 minute timeout */);

  test(
    "send from secretdev-1 to secretdev-2 then back to secretdev-1",
    async () => {
      const accountOnSecretdev2: Account = {
        address: accounts[0].address,
        mnemonic: accounts[0].mnemonic,
        walletAmino: accounts[0].walletAmino,
        walletProto: accounts[0].walletProto,
        secretjs: new SecretNetworkClient({
          url: chain2LCD,
          wallet: accounts[0].walletProto,
          walletAddress: accounts[0].address,
          chainId: "secretdev-2",
        }),
        secretjsProto: new SecretNetworkClient({
          url: chain2LCD,
          wallet: accounts[0].walletProto,
          walletAddress: accounts[0].address,
          chainId: "secretdev-2",
        }),
      };

      // register snip20 on cw20-ics20, then send tokens from secretdev-1
      console.log("Sending tokens from secretdev-1...");

      const sendTokensTx = await accounts[0].secretjs.tx.broadcast(
        [
          new MsgExecuteContract({
            sender: accounts[0].address,
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            msg: {
              set_viewing_key: {
                key: "banana",
              },
            },
          }),
          new MsgExecuteContract({
            sender: accounts[0].address,
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            msg: {
              send: {
                recipient: contracts.cw20ics20.address,
                recipient_code_hash: contracts.cw20ics20.codeHash,
                amount: "1",
                msg: toBase64(
                  toUtf8(
                    JSON.stringify({
                      channel: ibcChannelIdOnChain1,
                      remote_address: accountOnSecretdev2.address,
                      timeout: 10 * 60, // 10 minutes
                    }),
                  ),
                ),
              },
            },
          }),
        ],
        {
          gasLimit: 5_000_000,
        },
      );
      if (sendTokensTx.code !== TxResultCode.Success) {
        console.error(sendTokensTx.rawLog);
      }
      expect(sendTokensTx.code).toBe(TxResultCode.Success);

      let snip20Balance: { balance: { amount: string } } =
        await accounts[0].secretjs.query.compute.queryContract({
          contract_address: contracts.snip20.address,
          code_hash: contracts.snip20.codeHash,
          query: {
            balance: {
              key: "banana",
              address: accounts[0].address,
            },
          },
        });
      expect(snip20Balance.balance.amount).toBe("999");

      console.log("Waiting for tokens to arrive on secretdev-2...");

      const expectedIbcDenom = ibcDenom(
        [
          {
            incomingChannelId: ibcChannelIdOnChain2,
            incomingPortId: "transfer",
          },
        ],
        `cw20:${contracts.snip20.address}`,
      );

      // wait for tokens to arrive on secretdev-2
      expect((await sendTokensTx.ibcResponses[0]).type).toBe("ack");

      // the balance query is lagging for some reason (on mainnet too!)
      // so we'll wait for it to update
      let balance: Coin | undefined;
      while (balance?.amount === "0" || !balance) {
        ({ balance } = await accountOnSecretdev2.secretjs.query.bank.balance({
          denom: expectedIbcDenom,
          address: accountOnSecretdev2.address,
        }));
      }

      expect(balance?.amount).toBe("1");

      console.log("Sending tokens back from secretdev-2...");

      // send tokens back from secretdev-2
      const sendTokensBackTx =
        await accountOnSecretdev2.secretjs.tx.ibc.transfer({
          sender: accountOnSecretdev2.address,
          source_port: "transfer",
          source_channel: ibcChannelIdOnChain2,
          token: {
            denom: expectedIbcDenom,
            amount: "1",
          },
          receiver: accounts[0].address,
          timeout_timestamp: String(
            Math.floor(Date.now() / 1000) + 10 * 60,
          ) /* 10 minutes */,
          memo: "hi",
        });

      if (sendTokensBackTx.code !== TxResultCode.Success) {
        console.error(sendTokensBackTx.rawLog);
      }
      expect(sendTokensBackTx.code).toBe(TxResultCode.Success);

      console.log("Waiting for tokens to arrive back to secretdev-1...");

      expect((await sendTokensBackTx.ibcResponses[0]).type).toBe("ack");

      snip20Balance = await accounts[0].secretjs.query.compute.queryContract({
        contract_address: contracts.snip20.address,
        code_hash: contracts.snip20.codeHash,
        query: {
          balance: { key: "banana", address: accounts[0].address },
        },
      });

      expect(snip20Balance.balance.amount).toBe("1000");

      console.log("Sending tokens from secretdev-1 with a short timeout...");

      const sendTokensTimeoutTx = await accounts[0].secretjs.tx.broadcast(
        [
          new MsgExecuteContract({
            sender: accounts[0].address,
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            msg: {
              send: {
                recipient: contracts.cw20ics20.address,
                recipient_code_hash: contracts.cw20ics20.codeHash,
                amount: "1",
                msg: toBase64(
                  toUtf8(
                    JSON.stringify({
                      channel: ibcChannelIdOnChain1,
                      remote_address: accountOnSecretdev2.address,
                      timeout: 1, // 1 second
                    }),
                  ),
                ),
              },
            },
          }),
        ],
        {
          gasLimit: 5_000_000,
        },
      );
      if (sendTokensTimeoutTx.code !== TxResultCode.Success) {
        console.error(sendTokensTimeoutTx.rawLog);
      }
      expect(sendTokensTimeoutTx.code).toBe(TxResultCode.Success);

      // Balance is deducted optimistically so we should see 999 right away
      snip20Balance = await accounts[0].secretjs.query.compute.queryContract({
        contract_address: contracts.snip20.address,
        code_hash: contracts.snip20.codeHash,
        query: {
          balance: {
            key: "banana",
            address: accounts[0].address,
          },
        },
      });
      expect(snip20Balance.balance.amount).toBe("999");

      console.log(
        "Waiting for tokens refund to secretdev-1 after the timeout...",
      );

      const ibcResp = await sendTokensTimeoutTx.ibcResponses[0];
      expect(ibcResp.type).toBe("timeout");

      snip20Balance = await accounts[0].secretjs.query.compute.queryContract({
        contract_address: contracts.snip20.address,
        code_hash: contracts.snip20.codeHash,
        query: {
          balance: { key: "banana", address: accounts[0].address },
        },
      });

      expect(snip20Balance.balance.amount).toBe("1000");
    },
    5 * 60 * 1000 /* 5 minute timeout */,
  );
});

describe("packet-forward-middleware", () => {
  let ibcChannelIdOnChain1 = "";
  let ibcChannelIdOnChain2 = "";

  beforeAll(async () => {
    if (stopRelayer) {
      console.log("Pausing relayer...");
      await stopRelayer();
    }

    console.log("Creating IBC transfer <-> transfer channel...");
    const ibcChannelPair = await createIbcChannel(ibcConnection);

    ibcChannelIdOnChain1 = ibcChannelPair.src.channelId;
    ibcChannelIdOnChain2 = ibcChannelPair.dest.channelId;

    expect(ibcChannelIdOnChain1).not.toBe("");
    expect(ibcChannelIdOnChain2).not.toBe("");

    console.log("Looping relayer...");
    stopRelayer = loopRelayer(ibcConnection);
  });

  test("happy path", async () => {
    const { secretjs } = accounts[0];

    const freshAccount = new Wallet();

    const { balance: freshAccountBalanceBefore } =
      await secretjs.query.bank.balance({
        address: freshAccount.address,
        denom: "uscrt",
      });

    expect(freshAccountBalanceBefore?.amount).toBe("0");

    const tx = await secretjs.tx.ibc.transfer(
      {
        sender: secretjs.address,
        receiver: secretjs.address,
        source_channel: ibcChannelIdOnChain1,
        source_port: "transfer",
        token: stringToCoin("1uscrt"),
        timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minutes
        memo: JSON.stringify({
          forward: {
            receiver: freshAccount.address,
            port: "transfer",
            channel: ibcChannelIdOnChain2,
          },
        }),
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 100_000,
        ibcTxsOptions: {
          resolveResponsesCheckIntervalMs: 250,
        },
      },
    );

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    // packet forward should resolve only after the final destination is acked
    expect(tx.ibcResponses.length).toBe(1);
    const ibcResp = await tx.ibcResponses[0];
    expect(ibcResp.type).toBe("ack");

    const { balance: freshAccountBalanceAfter } =
      await secretjs.query.bank.balance({
        address: freshAccount.address,
        denom: "uscrt",
      });

    expect(freshAccountBalanceAfter?.amount).toBe("1");
  }, 90_000);
});

describe("fee middleware", () => {
  let ibcChannelIdOnChain1 = "";
  let ibcChannelIdOnChain2 = "";

  const relayerPayee = new Wallet();

  type Contract = {
    wasm: Uint8Array;
    address: string;
    codeId: number;
    ibcPortId: string;
    codeHash: string;
  };

  let contracts: { snip20: Contract; cw20ics20: Contract } = {
    snip20: {
      wasm: new Uint8Array(),
      address: "",
      codeId: -1,
      ibcPortId: "",
      codeHash: "",
    },
    cw20ics20: {
      wasm: new Uint8Array(),
      address: "",
      codeId: -1,
      ibcPortId: "",
      codeHash: "",
    },
  };

  let ibcWasmChannelIdOnChain1 = "";
  let ibcWasmChannelIdOnChain2 = "";

  beforeAll(async () => {
    if (stopRelayer) {
      console.log("Pausing relayer...");
      await stopRelayer();
    }

    console.log("Creating IBC transfer <-> transfer channel with fee...");
    const ibcChannelPair = await createIbcChannel(
      ibcConnection,
      "transfer",
      '{"fee_version":"ics29-1","app_version":"ics20-1"}',
    );

    ibcChannelIdOnChain1 = ibcChannelPair.src.channelId;
    ibcChannelIdOnChain2 = ibcChannelPair.dest.channelId;

    expect(ibcChannelIdOnChain1).not.toBe("");
    expect(ibcChannelIdOnChain2).not.toBe("");

    console.log("Registering relayer payee on secretdev-1...");

    const relayerWallet = new Wallet(
      "word twist toast cloth movie predict advance crumble escape whale sail such angry muffin balcony keen move employ cook valve hurt glimpse breeze brick",
    ); // account d
    const secretjs1 = new SecretNetworkClient({
      chainId: "secretdev-1",
      url: chain1LCD,
      wallet: relayerWallet,
      walletAddress: relayerWallet.address,
    });

    // For recv_packet on secretdev-2 that the relayer submits
    let tx = await secretjs1.tx.ibc_fee.registerCounterpartyPayee({
      relayer: relayerWallet.address,
      channel_id: ibcChannelIdOnChain1,
      port_id: "transfer",
      counterparty_payee: relayerPayee.address,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    // Unnecessary as by default the payee on this chain is the relayer
    // but we want to test that the fee is payed and it's easier on a fresh account
    tx = await secretjs1.tx.ibc_fee.registerPayee({
      relayer: relayerWallet.address,
      channel_id: ibcChannelIdOnChain1,
      port_id: "transfer",
      payee: relayerPayee.address,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    console.log("Registering relayer payee on secretdev-2...");

    const secretjs2 = new SecretNetworkClient({
      chainId: "secretdev-2",
      url: chain2LCD,
      wallet: relayerWallet,
      walletAddress: relayerWallet.address,
    });

    // For recv_packet on secretdev-1 that the relayer submits
    tx = await secretjs2.tx.ibc_fee.registerCounterpartyPayee({
      relayer: relayerWallet.address,
      channel_id: ibcChannelIdOnChain2,
      port_id: "transfer",
      counterparty_payee: relayerPayee.address,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    // Unnecessary as by default the payee on this chain is the relayer
    // but we want to test that the fee is payed and it's easier on a fresh account
    tx = await secretjs2.tx.ibc_fee.registerPayee({
      relayer: relayerWallet.address,
      channel_id: ibcChannelIdOnChain2,
      port_id: "transfer",
      payee: relayerPayee.address,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    console.log("Looping relayer...");
    stopRelayer = loopRelayer(ibcConnection);

    ({
      contracts,
      ibcChannelIdOnChain1: ibcWasmChannelIdOnChain1,
      ibcChannelIdOnChain2: ibcWasmChannelIdOnChain2,
    } = await contractsSetup(
      '{"fee_version":"ics29-1","app_version":"ics20-1"}',
    ));

    if (stopRelayer) {
      console.log("Pausing relayer...");
      await stopRelayer();
    }

    // Unnecessary as by default the payee on this chain is the relayer
    // but we want to test that the fee is payed and it's easier on a fresh account
    tx = await secretjs1.tx.ibc_fee.registerPayee({
      relayer: relayerWallet.address,
      channel_id: ibcWasmChannelIdOnChain1,
      port_id: contracts.cw20ics20.ibcPortId,
      payee: relayerPayee.address,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    // For recv_packet on secretdev-2 that the relayer submits
    tx = await secretjs1.tx.ibc_fee.registerCounterpartyPayee({
      relayer: relayerWallet.address,
      channel_id: ibcWasmChannelIdOnChain1,
      port_id: contracts.cw20ics20.ibcPortId,
      counterparty_payee: relayerPayee.address,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    // Unnecessary as by default the payee on this chain is the relayer
    // but we want to test that the fee is payed and it's easier on a fresh account
    tx = await secretjs2.tx.ibc_fee.registerPayee({
      relayer: relayerWallet.address,
      channel_id: ibcWasmChannelIdOnChain2,
      port_id: "transfer",
      payee: relayerPayee.address,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    // For recv_packet on secretdev-1 that the relayer submits
    tx = await secretjs2.tx.ibc_fee.registerCounterpartyPayee({
      relayer: relayerWallet.address,
      channel_id: ibcWasmChannelIdOnChain2,
      port_id: "transfer",
      counterparty_payee: relayerPayee.address,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    stopRelayer = loopRelayer(ibcConnection);
  }, 120_000);

  test("transfer fee recv + ack", async () => {
    const { secretjs } = accounts[0];

    const { balance: payeeBalanceBefore } = await secretjs.query.bank.balance({
      address: relayerPayee.address,
      denom: "uscrt",
    });

    const recv_fee = 11;
    const ack_fee = 12;
    const timeout_fee = 13;

    const tx = await secretjs.tx.broadcast(
      [
        // MsgPayPacketFee must come before the IBC packet
        // https://github.com/cosmos/ibc-go/blob/v4.3.0/modules/apps/29-fee/keeper/msg_server.go#L104
        new MsgPayPacketFee({
          signer: secretjs.address,
          source_channel_id: ibcChannelIdOnChain1,
          source_port_id: "transfer",
          fee: {
            recv_fee: coinsFromString(`${recv_fee}uscrt`),
            ack_fee: coinsFromString(`${ack_fee}uscrt`),
            timeout_fee: coinsFromString(`${timeout_fee}uscrt`),
          },
          relayers: [],
        }),
        new MsgTransfer({
          sender: secretjs.address,
          receiver: secretjs.address,
          source_channel: ibcChannelIdOnChain1,
          source_port: "transfer",
          token: stringToCoin("1uscrt"),
          timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minutes
          memo: "hi",
        }),
      ],
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 150_000,
        ibcTxsOptions: {
          resolveResponsesCheckIntervalMs: 250,
        },
      },
    );

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    expect(tx.ibcResponses.length).toBe(1);
    const ibcResp = await tx.ibcResponses[0];
    expect(ibcResp.type).toBe("ack");

    const { balance: payeeBalanceAfter } = await secretjs.query.bank.balance({
      address: relayerPayee.address,
      denom: "uscrt",
    });

    // recv_fee on secretdev-2 + ack_fee on secretdev-1
    expect(
      Number(payeeBalanceAfter?.amount) - Number(payeeBalanceBefore?.amount),
    ).toBe(
      /* counterparty chain fee: */ recv_fee + /* source chain fee: */ ack_fee,
    );
  }, 90_000);

  test("transfer fee recv + timeout", async () => {
    const { secretjs } = accounts[0];

    const { balance: payeeBalanceBefore } = await secretjs.query.bank.balance({
      address: relayerPayee.address,
      denom: "uscrt",
    });

    const recv_fee = 11;
    const ack_fee = 12;
    const timeout_fee = 13;

    const tx = await secretjs.tx.broadcast(
      [
        // MsgPayPacketFee must come before the IBC packet
        // https://github.com/cosmos/ibc-go/blob/v4.3.0/modules/apps/29-fee/keeper/msg_server.go#L104
        new MsgPayPacketFee({
          signer: secretjs.address,
          source_channel_id: ibcChannelIdOnChain1,
          source_port_id: "transfer",
          fee: {
            recv_fee: coinsFromString(`${recv_fee}uscrt`),
            ack_fee: coinsFromString(`${ack_fee}uscrt`),
            timeout_fee: coinsFromString(`${timeout_fee}uscrt`),
          },
          relayers: [],
        }),
        new MsgTransfer({
          sender: secretjs.address,
          receiver: secretjs.address,
          source_channel: ibcChannelIdOnChain1,
          source_port: "transfer",
          token: stringToCoin("1uscrt"),
          timeout_timestamp: String(Math.floor(Date.now() / 1000) + 1), // 1 second
          memo: "hi",
        }),
      ],
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 150_000,
        ibcTxsOptions: {
          resolveResponsesCheckIntervalMs: 250,
        },
      },
    );

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    expect(tx.ibcResponses.length).toBe(1);
    const ibcResp = await tx.ibcResponses[0];
    expect(ibcResp.type).toBe("timeout");

    const { balance: payeeBalanceAfter } = await secretjs.query.bank.balance({
      address: relayerPayee.address,
      denom: "uscrt",
    });

    // only timeout_fee on secretdev-1
    // no recv_fee because the packet timed out before recv_packet
    expect(
      Number(payeeBalanceAfter?.amount) - Number(payeeBalanceBefore?.amount),
    ).toBe(/* source chain fee: */ timeout_fee);
  }, 90_000);

  test(
    "wasm fee recv + ack + timeout",
    async () => {
      const accountOnSecretdev2: Account = {
        address: accounts[0].address,
        mnemonic: accounts[0].mnemonic,
        walletAmino: accounts[0].walletAmino,
        walletProto: accounts[0].walletProto,
        secretjs: new SecretNetworkClient({
          url: chain2LCD,
          wallet: accounts[0].walletProto,
          walletAddress: accounts[0].address,
          chainId: "secretdev-2",
        }),
        secretjsProto: new SecretNetworkClient({
          url: chain2LCD,
          wallet: accounts[0].walletProto,
          walletAddress: accounts[0].address,
          chainId: "secretdev-2",
        }),
      };

      const { balance: payeeBalanceBefore } =
        await accounts[0].secretjs.query.bank.balance({
          address: relayerPayee.address,
          denom: "uscrt",
        });

      const recv_fee = 11;
      const ack_fee = 12;
      const timeout_fee = 13;

      // register snip20 on cw20-ics20, then send tokens from secretdev-1
      console.log("Sending tokens from secretdev-1...");

      let tx = await accounts[0].secretjs.tx.broadcast(
        [
          new MsgExecuteContract({
            sender: accounts[0].address,
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            msg: {
              set_viewing_key: {
                key: "banana",
              },
            },
          }),
          // MsgPayPacketFee must come before the IBC packet
          // https://github.com/cosmos/ibc-go/blob/v4.3.0/modules/apps/29-fee/keeper/msg_server.go#L104
          new MsgPayPacketFee({
            signer: accounts[0].address,
            source_channel_id: ibcWasmChannelIdOnChain1,
            source_port_id: contracts.cw20ics20.ibcPortId,
            fee: {
              recv_fee: coinsFromString(`${recv_fee}uscrt`),
              ack_fee: coinsFromString(`${ack_fee}uscrt`),
              timeout_fee: coinsFromString(`${timeout_fee}uscrt`),
            },
            relayers: [],
          }),
          new MsgExecuteContract({
            sender: accounts[0].address,
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            msg: {
              send: {
                recipient: contracts.cw20ics20.address,
                recipient_code_hash: contracts.cw20ics20.codeHash,
                amount: "1",
                msg: toBase64(
                  toUtf8(
                    JSON.stringify({
                      channel: ibcWasmChannelIdOnChain1,
                      remote_address: accountOnSecretdev2.address,
                      timeout: 10 * 60, // 10 minutes
                    }),
                  ),
                ),
              },
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

      let snip20Balance: { balance: { amount: string } } =
        await accounts[0].secretjs.query.compute.queryContract({
          contract_address: contracts.snip20.address,
          code_hash: contracts.snip20.codeHash,
          query: {
            balance: {
              key: "banana",
              address: accounts[0].address,
            },
          },
        });
      expect(snip20Balance.balance.amount).toBe("999");

      console.log("Waiting for tokens to arrive on secretdev-2...");

      const expectedIbcDenom = ibcDenom(
        [
          {
            incomingChannelId: ibcWasmChannelIdOnChain2,
            incomingPortId: "transfer",
          },
        ],
        `cw20:${contracts.snip20.address}`,
      );

      // wait for tokens to arrive on secretdev-2
      expect((await tx.ibcResponses[0]).type).toBe("ack");

      const { balance: payeeBalanceAfterRecv } =
        await accounts[0].secretjs.query.bank.balance({
          address: relayerPayee.address,
          denom: "uscrt",
        });

      // recv_fee on secretdev-2 + ack_fee on secretdev-1
      expect(
        Number(payeeBalanceAfterRecv?.amount) -
          Number(payeeBalanceBefore?.amount),
      ).toBe(
        /* counterparty chain fee: */ recv_fee +
          /* source chain fee: */ ack_fee,
      );

      // the balance query is lagging for some reason (on mainnet too!)
      // so we'll wait for it to update
      let balance: Coin | undefined;
      while (balance?.amount === "0" || !balance) {
        ({ balance } = await accountOnSecretdev2.secretjs.query.bank.balance({
          denom: expectedIbcDenom,
          address: accountOnSecretdev2.address,
        }));
      }

      expect(balance?.amount).toBe("1");

      console.log("Sending tokens back from secretdev-2...");

      // send tokens back from secretdev-2
      tx = await accountOnSecretdev2.secretjs.tx.ibc.transfer({
        sender: accountOnSecretdev2.address,
        source_port: "transfer",
        source_channel: ibcWasmChannelIdOnChain2,
        token: {
          denom: expectedIbcDenom,
          amount: "1",
        },
        receiver: accounts[0].address,
        timeout_timestamp: String(
          Math.floor(Date.now() / 1000) + 10 * 60,
        ) /* 10 minutes */,
        memo: "hi",
      });

      if (tx.code !== TxResultCode.Success) {
        console.error(tx.rawLog);
      }
      expect(tx.code).toBe(TxResultCode.Success);

      console.log("Waiting for tokens to arrive back to secretdev-1...");

      expect((await tx.ibcResponses[0]).type).toBe("ack");

      snip20Balance = await accounts[0].secretjs.query.compute.queryContract({
        contract_address: contracts.snip20.address,
        code_hash: contracts.snip20.codeHash,
        query: {
          balance: { key: "banana", address: accounts[0].address },
        },
      });

      expect(snip20Balance.balance.amount).toBe("1000");

      console.log("Sending tokens from secretdev-1 with a short timeout...");

      tx = await accounts[0].secretjs.tx.broadcast(
        [
          // MsgPayPacketFee must come before the IBC packet
          // https://github.com/cosmos/ibc-go/blob/v4.3.0/modules/apps/29-fee/keeper/msg_server.go#L104
          new MsgPayPacketFee({
            signer: accounts[0].address,
            source_channel_id: ibcWasmChannelIdOnChain1,
            source_port_id: contracts.cw20ics20.ibcPortId,
            fee: {
              recv_fee: coinsFromString(`${recv_fee}uscrt`),
              ack_fee: coinsFromString(`${ack_fee}uscrt`),
              timeout_fee: coinsFromString(`${timeout_fee}uscrt`),
            },
            relayers: [],
          }),
          new MsgExecuteContract({
            sender: accounts[0].address,
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            msg: {
              send: {
                recipient: contracts.cw20ics20.address,
                recipient_code_hash: contracts.cw20ics20.codeHash,
                amount: "1",
                msg: toBase64(
                  toUtf8(
                    JSON.stringify({
                      channel: ibcWasmChannelIdOnChain1,
                      remote_address: accountOnSecretdev2.address,
                      timeout: 1, // 1 second
                    }),
                  ),
                ),
              },
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

      // Balance is deducted optimistically so we should see 999 right away
      snip20Balance = await accounts[0].secretjs.query.compute.queryContract({
        contract_address: contracts.snip20.address,
        code_hash: contracts.snip20.codeHash,
        query: {
          balance: {
            key: "banana",
            address: accounts[0].address,
          },
        },
      });
      expect(snip20Balance.balance.amount).toBe("999");

      console.log(
        "Waiting for tokens refund to secretdev-1 after the timeout...",
      );

      const ibcResp = await tx.ibcResponses[0];
      expect(ibcResp.type).toBe("timeout");

      snip20Balance = await accounts[0].secretjs.query.compute.queryContract({
        contract_address: contracts.snip20.address,
        code_hash: contracts.snip20.codeHash,
        query: {
          balance: { key: "banana", address: accounts[0].address },
        },
      });

      expect(snip20Balance.balance.amount).toBe("1000");

      const { balance: payeeBalanceAfterTimeout } =
        await accounts[0].secretjs.query.bank.balance({
          address: relayerPayee.address,
          denom: "uscrt",
        });

      // only timeout_fee on secretdev-1
      // no recv_fee because the packet timed out before recv_packet
      expect(
        Number(payeeBalanceAfterTimeout?.amount) -
          Number(payeeBalanceAfterRecv?.amount),
      ).toBe(/* source chain fee: */ timeout_fee);
    },
    5 * 60 * 1000 /* 5 minute timeout */,
  );
});

describe("ibc-switch middleware", () => {
  describe("query.emergency_button", () => {
    test("params()", async () => {
      const { secretjs } = accounts[0];
      const { params } = await secretjs.query.emergency_button.params({});

      expect(params).toStrictEqual({
        pauser_address: "",
        switch_status: "on",
      });
    });
  });

  describe("tx.emergency_button", () => {
    test("MsgToggleIbcSwitch ErrUnauthorizedToggle - address empty in module's params", async () => {
      // assume address is empty in ibc-switch's module params
      const { secretjs } = accounts[0];

      const msg = {
        sender: accounts[0].address,
      };
      const tx = await secretjs.tx.emergency_button.toggleIbcSwitch(msg, {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      });

      expect(tx.code).toEqual(3);
      expect(tx.rawLog).toContain(
        "no address is currently approved to toggle emergency button",
      );
    });

    test("MsgToggleIbcSwitch", async () => {
      const { secretjs } = accounts[0];

      await passParameterChangeProposal(secretjs, {
        switch_status: "on",
        pauser_address: secretjs.address,
      });

      const sim = await secretjs.tx.emergency_button.toggleIbcSwitch.simulate({
        sender: accounts[0].address,
      });

      const gasLimit = Math.ceil(Number(sim.gas_info!.gas_used) * 1.25);

      const msg = {
        sender: accounts[0].address,
      };
      const tx = await secretjs.tx.emergency_button.toggleIbcSwitch(msg, {
        broadcastCheckIntervalMs: 100,
        gasLimit: gasLimit,
      });
      if (tx.code !== TxResultCode.Success) {
        console.error(tx.rawLog);
      }
      expect(tx.code).toBe(TxResultCode.Success);

      // query the new params
      const { params } = await secretjs.query.emergency_button.params({});

      expect(params).toStrictEqual({
        pauser_address: `${secretjs.address}`,
        switch_status: "off",
      });
    });

    test("MsgToggleIbcSwitch ErrUnauthorizedToggle - address different in module params", async () => {
      // assume we just set the address to something in the previous test
      const { secretjs } = accounts[1];

      const msg = {
        sender: secretjs.address,
      };
      const tx = await secretjs.tx.emergency_button.toggleIbcSwitch(msg, {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      });

      expect(tx.code).toEqual(2);
      expect(tx.rawLog).toContain(
        "failed to execute message; message index: 0: this address is not allowed to toggle emergency button: emergency button toggle failed",
      );
    });

    afterAll(async () => {
      // restore the "on" status of the ibc-switch
      const { secretjs } = accounts[0];

      // do nothing if it's "on" now
      const { params } = await secretjs.query.emergency_button.params({});
      if (params?.switch_status === "on") {
        return;
      }

      const msg = {
        sender: secretjs.address,
      };
      const tx = await secretjs.tx.emergency_button.toggleIbcSwitch(msg, {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      });

      expect(tx.code).toEqual(TxResultCode.Success);
    });
  });

  let ibcChannelIdOnChain1 = "";
  let ibcChannelIdOnChain2 = "";

  describe("Transfer Stack", () => {
    beforeAll(async () => {
      if (stopRelayer) {
        console.log("Pausing relayer...");
        await stopRelayer();
      }

      console.log("Creating IBC transfer <-> transfer channel...");
      const ibcChannelPair = await createIbcChannel(ibcConnection);

      ibcChannelIdOnChain1 = ibcChannelPair.src.channelId;
      ibcChannelIdOnChain2 = ibcChannelPair.dest.channelId;

      expect(ibcChannelIdOnChain1).not.toBe("");
      expect(ibcChannelIdOnChain2).not.toBe("");

      console.log("Looping relayer...");
      stopRelayer = loopRelayer(ibcConnection);

      const { secretjs } = accounts[0];
      await passParameterChangeProposal(secretjs, {
        switch_status: "on",
        pauser_address: secretjs.address,
      });
    });

    test("Failed attempt to turn off switch - still on", async () => {
      const { secretjs: secretjsAuthorized } = accounts[0]; // authorized
      await turnIbcSwitchOn(secretjsAuthorized); // should do nothing

      const { secretjs } = accounts[1]; // unauthorized

      // try to turn off switch but fail
      const msg = {
        sender: secretjs.address,
      };
      let tx = await secretjs.tx.emergency_button.toggleIbcSwitch(msg, {
        broadcastCheckIntervalMs: 100,
        gasLimit: 5_000_000,
      });

      expect(tx.code).toEqual(2);
      expect(tx.rawLog).toContain(
        "this address is not allowed to toggle emergency button",
      );

      // switch is still on, this should work as usual
      const freshAccount = new Wallet();

      const { balance: freshAccountBalanceBefore } =
        await secretjs.query.bank.balance({
          address: freshAccount.address,
          denom: "uscrt",
        });

      expect(freshAccountBalanceBefore?.amount).toBe("0");

      tx = await secretjs.tx.ibc.transfer(
        {
          sender: secretjs.address,
          receiver: secretjs.address,
          source_channel: ibcChannelIdOnChain1,
          source_port: "transfer",
          token: stringToCoin("1uscrt"),
          timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minutes
          memo: JSON.stringify({
            forward: {
              receiver: freshAccount.address,
              port: "transfer",
              channel: ibcChannelIdOnChain2,
            },
          }),
        },
        {
          broadcastCheckIntervalMs: 100,
          gasLimit: 100_000,
          ibcTxsOptions: {
            resolveResponsesCheckIntervalMs: 250,
          },
        },
      );

      if (tx.code !== TxResultCode.Success) {
        console.error(tx.rawLog);
      }
      expect(tx.code).toBe(TxResultCode.Success);

      // packet forward should resolve only after the final destination is acked
      expect(tx.ibcResponses.length).toBe(1);
      const ibcResp = await tx.ibcResponses[0];
      expect(ibcResp.type).toBe("ack");

      const { balance: freshAccountBalanceAfter } =
        await secretjs.query.bank.balance({
          address: freshAccount.address,
          denom: "uscrt",
        });

      expect(freshAccountBalanceAfter?.amount).toBe("1");
    }, 90_000);

    test("switch turned off", async () => {
      const { secretjs } = accounts[0]; // authorized

      await turnIbcSwitchOff(secretjs);

      const freshAccount = new Wallet();

      const { balance: freshAccountBalanceBefore } =
        await secretjs.query.bank.balance({
          address: freshAccount.address,
          denom: "uscrt",
        });

      expect(freshAccountBalanceBefore?.amount).toBe("0");

      const tx = await secretjs.tx.ibc.transfer(
        {
          sender: secretjs.address,
          receiver: secretjs.address,
          source_channel: ibcChannelIdOnChain1,
          source_port: "transfer",
          token: stringToCoin("1uscrt"),
          timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minutes
          memo: JSON.stringify({
            forward: {
              receiver: freshAccount.address,
              port: "transfer",
              channel: ibcChannelIdOnChain2,
            },
          }),
        },
        {
          broadcastCheckIntervalMs: 100,
          gasLimit: 100_000,
          ibcTxsOptions: {
            resolveResponsesCheckIntervalMs: 250,
          },
        },
      );

      expect(tx.code).toBe(1);
      expect(tx.rawLog).toContain("Ibc packets are currently paused");

      expect(tx.ibcResponses.length).toBe(0);

      const { balance: freshAccountBalanceAfter } =
        await secretjs.query.bank.balance({
          address: freshAccount.address,
          denom: "uscrt",
        });

      expect(freshAccountBalanceAfter?.amount).toBe("0");
    }, 90_000);
  });

  describe("Compute Stack", () => {
    type Contract = {
      wasm: Uint8Array;
      address: string;
      codeId: number;
      ibcPortId: string;
      codeHash: string;
    };

    let contracts: { snip20: Contract; cw20ics20: Contract } = {
      snip20: {
        wasm: new Uint8Array(),
        address: "",
        codeId: -1,
        ibcPortId: "",
        codeHash: "",
      },
      cw20ics20: {
        wasm: new Uint8Array(),
        address: "",
        codeId: -1,
        ibcPortId: "",
        codeHash: "",
      },
    };

    beforeAll(async () => {
      ({ contracts, ibcChannelIdOnChain1, ibcChannelIdOnChain2 } =
        await contractsSetup());

      const { secretjs } = accounts[0];
      await passParameterChangeProposal(secretjs, {
        switch_status: "on",
        pauser_address: secretjs.address,
      });
    }, 180_000 /* 3 minute timeout */);

    test("switch turned off", async () => {
      const { secretjs } = accounts[0];
      await turnIbcSwitchOn(secretjs);

      const setViewingKeyTx = await secretjs.tx.snip20.setViewingKey(
        {
          sender: accounts[0].address,
          contract_address: contracts.snip20.address,
          code_hash: contracts.snip20.codeHash,
          msg: {
            set_viewing_key: {
              key: "banana",
            },
          },
        },
        {
          broadcastCheckIntervalMs: 100,
          gasLimit: 500_000,
          ibcTxsOptions: {
            resolveResponsesCheckIntervalMs: 250,
          },
        },
      );
      if (setViewingKeyTx.code !== TxResultCode.Success) {
        console.error(setViewingKeyTx.rawLog);
        fail(new Error("Failed to send viewing key tx"));
      }

      let snip20BalanceBefore = await secretjs.query.snip20.getBalance({
        contract: {
          address: contracts.snip20.address,
          code_hash: contracts.snip20.codeHash,
        },
        address: accounts[0].address,
        auth: {
          key: "banana",
        },
      });

      await turnIbcSwitchOff(secretjs);

      const accountOnSecretdev2: Account = {
        address: accounts[0].address,
        mnemonic: accounts[0].mnemonic,
        walletAmino: accounts[0].walletAmino,
        walletProto: accounts[0].walletProto,
        secretjs: new SecretNetworkClient({
          url: chain2LCD,
          wallet: accounts[0].walletProto,
          walletAddress: accounts[0].address,
          chainId: "secretdev-2",
        }),
        secretjsProto: new SecretNetworkClient({
          url: chain2LCD,
          wallet: accounts[0].walletProto,
          walletAddress: accounts[0].address,
          chainId: "secretdev-2",
        }),
      };

      // register snip20 on cw20-ics20, then send tokens from secretdev-1
      console.log("Sending tokens from secretdev-1...");

      const sendTokensTx = await accounts[0].secretjs.tx.broadcast(
        [
          new MsgExecuteContract({
            sender: accounts[0].address,
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            msg: {
              set_viewing_key: {
                key: "banana",
              },
            },
          }),
          new MsgExecuteContract({
            sender: accounts[0].address,
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            msg: {
              send: {
                recipient: contracts.cw20ics20.address,
                recipient_code_hash: contracts.cw20ics20.codeHash,
                amount: "1",
                msg: toBase64(
                  toUtf8(
                    JSON.stringify({
                      channel: ibcChannelIdOnChain1,
                      remote_address: accountOnSecretdev2.address,
                      timeout: 10 * 60, // 10 minutes
                    }),
                  ),
                ),
              },
            },
          }),
        ],
        {
          gasLimit: 5_000_000,
        },
      );

      expect(sendTokensTx.code).toBe(1);
      expect(sendTokensTx.rawLog).toContain("Ibc packets are currently paused");

      const snip20BalanceAfter: { balance: { amount: string } } =
        await accounts[0].secretjs.query.compute.queryContract({
          contract_address: contracts.snip20.address,
          code_hash: contracts.snip20.codeHash,
          query: {
            balance: {
              key: "banana",
              address: secretjs.address,
            },
          },
        });

      expect(snip20BalanceAfter.balance.amount).toBe(
        snip20BalanceBefore.balance.amount,
      );

      expect(sendTokensTx.ibcResponses.length).toBe(0);
    }, 180_000);

    test("switch turned back on", async () => {
      const { secretjs } = accounts[0];
      await turnIbcSwitchOff(secretjs);
      await turnIbcSwitchOn(secretjs);

      const accountOnSecretdev2: Account = {
        address: accounts[0].address,
        mnemonic: accounts[0].mnemonic,
        walletAmino: accounts[0].walletAmino,
        walletProto: accounts[0].walletProto,
        secretjs: new SecretNetworkClient({
          url: chain2LCD,
          wallet: accounts[0].walletProto,
          walletAddress: accounts[0].address,
          chainId: "secretdev-2",
        }),
        secretjsProto: new SecretNetworkClient({
          url: chain2LCD,
          wallet: accounts[0].walletProto,
          walletAddress: accounts[0].address,
          chainId: "secretdev-2",
        }),
      };

      // register snip20 on cw20-ics20, then send tokens from secretdev-1
      console.log("Sending tokens from secretdev-1...");

      let snip20BalanceBefore = await secretjs.query.snip20.getBalance({
        contract: {
          address: contracts.snip20.address,
          code_hash: contracts.snip20.codeHash,
        },
        address: accounts[0].address,
        auth: {
          key: "banana",
        },
      });

      const sendTokensTx = await accounts[0].secretjs.tx.broadcast(
        [
          new MsgExecuteContract({
            sender: accounts[0].address,
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            msg: {
              set_viewing_key: {
                key: "banana",
              },
            },
          }),
          new MsgExecuteContract({
            sender: accounts[0].address,
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            msg: {
              send: {
                recipient: contracts.cw20ics20.address,
                recipient_code_hash: contracts.cw20ics20.codeHash,
                amount: "1",
                msg: toBase64(
                  toUtf8(
                    JSON.stringify({
                      channel: ibcChannelIdOnChain1,
                      remote_address: accountOnSecretdev2.address,
                      timeout: 10 * 60, // 10 minutes
                    }),
                  ),
                ),
              },
            },
          }),
        ],
        {
          gasLimit: 5_000_000,
        },
      );
      if (sendTokensTx.code !== TxResultCode.Success) {
        console.error(sendTokensTx.rawLog);
      }
      expect(sendTokensTx.code).toBe(TxResultCode.Success);

      let snip20Balance: { balance: { amount: string } } =
        await accounts[0].secretjs.query.compute.queryContract({
          contract_address: contracts.snip20.address,
          code_hash: contracts.snip20.codeHash,
          query: {
            balance: {
              key: "banana",
              address: accounts[0].address,
            },
          },
        });

      expect(Number(snip20Balance.balance.amount)).toBe(
        Number(snip20BalanceBefore.balance.amount) - 1,
      );

      console.log("Waiting for tokens to arrive on secretdev-2...");

      const expectedIbcDenom = ibcDenom(
        [
          {
            incomingChannelId: ibcChannelIdOnChain2,
            incomingPortId: "transfer",
          },
        ],
        `cw20:${contracts.snip20.address}`,
      );

      // wait for tokens to arrive on secretdev-2
      expect((await sendTokensTx.ibcResponses[0]).type).toBe("ack");

      // the balance query is lagging for some reason (on mainnet too!)
      // so we'll wait for it to update
      let balance: Coin | undefined;
      while (balance?.amount === "0" || !balance) {
        ({ balance } = await accountOnSecretdev2.secretjs.query.bank.balance({
          denom: expectedIbcDenom,
          address: accountOnSecretdev2.address,
        }));
      }
    }, 180_000);
  });
});

describe("ibc-hooks middleware", () => {
  let ibcChannelIdOnChain1 = "";
  let ibcChannelIdOnChain2 = "";

  let wrapDepositContractAddress: string;
  let sscrt2ContractAddress: string;
  let sscrt2CodeHash: string;

  beforeAll(async () => {
    if (stopRelayer) {
      console.log("Pausing relayer...");
      await stopRelayer();
    }

    console.log("Creating IBC transfer <-> transfer channel...");
    const ibcChannelPair = await createIbcChannel(ibcConnection);

    ibcChannelIdOnChain1 = ibcChannelPair.src.channelId;
    ibcChannelIdOnChain2 = ibcChannelPair.dest.channelId;

    expect(ibcChannelIdOnChain1).not.toBe("");
    expect(ibcChannelIdOnChain2).not.toBe("");

    console.log("Looping relayer...");
    stopRelayer = loopRelayer(ibcConnection);

    const { secretjs } = accounts[0];

    let tx = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasm_byte_code: fs.readFileSync(
          `${__dirname}/ibc-hooks.wasm.gz`,
        ) as Uint8Array,
        source: "",
        builder: "",
      },
      {
        gasLimit: 5_000_000,
      },
    );

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    let { code_id } = MsgStoreCodeResponse.decode(tx.data[0]);

    tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        init_msg: { nop: {} },
        label: `label-${Date.now()}`,
      },
      {
        gasLimit: 5_000_000,
      },
    );

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    wrapDepositContractAddress = MsgInstantiateContractResponse.decode(
      tx.data[0],
    ).address;

    tx = await secretjs.tx.compute.storeCode(
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

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    ({ code_id } = MsgStoreCodeResponse.decode(tx.data[0]));

    tx = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        init_msg: {
          name: "Secret SCRT2",
          admin: accounts[0].address,
          symbol: "SSCRTTWO",
          decimals: 6,
          initial_balances: [],
          prng_seed: "eW8=",
          config: {
            public_total_supply: true,
            enable_deposit: true,
            enable_redeem: true,
            enable_mint: false,
            enable_burn: false,
          },
          supported_denoms: [
            ibcDenom(
              [
                {
                  incomingChannelId: ibcChannelIdOnChain1,
                  incomingPortId: "transfer",
                },
              ],
              "uscrt",
            ),
          ],
        },
        label: `label-${Date.now()}`,
        init_funds: [],
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    sscrt2ContractAddress = MsgInstantiateContractResponse.decode(
      tx.data[0],
    ).address;

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });
    sscrt2CodeHash = code_hash!;
  });

  test("send funds over IBC to contract", async () => {
    const secretjs2 = new SecretNetworkClient({
      url: chain2LCD,
      wallet: accounts[0].walletProto,
      walletAddress: accounts[0].address,
      chainId: "secretdev-2",
    });

    let tx = await secretjs2.tx.ibc.transfer(
      {
        sender: secretjs2.address,
        receiver: wrapDepositContractAddress,
        source_channel: ibcChannelIdOnChain2,
        source_port: "transfer",
        token: stringToCoin("123uscrt"),
        timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minutes
        memo: JSON.stringify({
          wasm: {
            contract: wrapDepositContractAddress,
            msg: {
              wrap_deposit: {
                snip20_address: sscrt2ContractAddress,
                snip20_code_hash: sscrt2CodeHash,
                recipient_address: secretjs2.address,
              },
            },
          },
        }),
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 100_000,
        ibcTxsOptions: {
          resolveResponsesCheckIntervalMs: 250,
        },
      },
    );

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    expect(tx.ibcResponses.length).toBe(1);
    const ibcResp = await tx.ibcResponses[0];
    expect(ibcResp.type).toBe("ack");

    const { secretjs } = accounts[0];

    tx = await secretjs.tx.snip20.setViewingKey(
      {
        sender: secretjs.address,
        contract_address: sscrt2ContractAddress,
        msg: { set_viewing_key: { key: "gm" } },
      },
      { gasLimit: 100_000, broadcastCheckIntervalMs: 100 },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    const { balance: sscrt2Balance } = await secretjs.query.snip20.getBalance({
      address: secretjs.address,
      contract: {
        address: sscrt2ContractAddress,
        code_hash: sscrt2CodeHash,
      },
      auth: { key: "gm" },
    });

    expect(sscrt2Balance.amount).toEqual("123");

    const denom = ibcDenom(
      [
        {
          incomingChannelId: ibcChannelIdOnChain1,
          incomingPortId: "transfer",
        },
      ],
      "uscrt",
    );

    const { balance: sscrt2ContractBalance } =
      await secretjs.query.bank.balance({
        address: sscrt2ContractAddress,
        denom,
      });

    expect(sscrt2ContractBalance?.amount).toEqual("123");

    const { supply } = await secretjs.query.bank.totalSupply({});

    expect(supply?.find((s) => s.denom === denom)?.amount).toEqual("123");

    const { balance } = await secretjs.query.bank.balance({
      address: sscrt2ContractAddress,
      denom,
    });

    expect(balance?.amount).toEqual("123");
  }, 90_000);

  test("receive ack after sending MsgTransfer from a contract", async () => {
    const { secretjs } = accounts[0];

    let tx = await secretjs.tx.compute.executeContract(
      {
        sender: secretjs.address,
        contract_address: wrapDepositContractAddress,
        sent_funds: coinsFromString("234uscrt"),
        msg: {
          ibc_transfer: {
            channel_id: ibcChannelIdOnChain1,
            to_address: secretjs.address,
            amount: coinFromString("234uscrt"),
            timeout_sec_from_now: "600", // 10 minutes
          },
        },
      },
      {
        gasLimit: 100_000,
        broadcastCheckIntervalMs: 100,
        ibcTxsOptions: {
          resolveResponsesCheckIntervalMs: 250,
        },
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    expect(tx.ibcResponses.length).toBe(1);
    const ibcResp = await tx.ibcResponses[0];
    expect(ibcResp.type).toBe("ack");

    expect(
      ibcResp.tx.arrayLog?.find(
        (l) =>
          l.msg === 0 &&
          l.type === "wasm" &&
          l.key === "contract_address" &&
          l.value === wrapDepositContractAddress,
      ),
    ).toBeTruthy();
    expect(
      ibcResp.tx.arrayLog?.find(
        (l) =>
          l.msg === 0 &&
          l.type === "wasm" &&
          l.key === "ibc_lifecycle_complete.ibc_ack.success" &&
          l.value === "true",
      ),
    ).toBeTruthy();
  }, 90_000);

  test("receive timeout after sending MsgTransfer from a contract", async () => {
    const { secretjs } = accounts[0];

    let tx = await secretjs.tx.compute.executeContract(
      {
        sender: secretjs.address,
        contract_address: wrapDepositContractAddress,
        sent_funds: coinsFromString("234uscrt"),
        msg: {
          ibc_transfer: {
            channel_id: ibcChannelIdOnChain1,
            to_address: secretjs.address,
            amount: coinFromString("234uscrt"),
            timeout_sec_from_now: "1", // 1 second
          },
        },
      },
      {
        gasLimit: 100_000,
        broadcastCheckIntervalMs: 100,
        ibcTxsOptions: {
          resolveResponsesCheckIntervalMs: 250,
        },
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    expect(tx.ibcResponses.length).toBe(1);
    const ibcResp = await tx.ibcResponses[0];
    expect(ibcResp.type).toBe("timeout");

    expect(
      ibcResp.tx.arrayLog?.find(
        (l) =>
          l.msg === 0 &&
          l.type === "wasm" &&
          l.key === "contract_address" &&
          l.value === wrapDepositContractAddress,
      ),
    ).toBeTruthy();
    expect(
      ibcResp.tx.arrayLog?.find(
        (l) =>
          l.msg === 0 &&
          l.type === "wasm" &&
          l.key === "ibc_lifecycle_complete.ibc_timeout.channel" &&
          l.value === ibcChannelIdOnChain1,
      ),
    ).toBeTruthy();
  }, 90_000);
});
