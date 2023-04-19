import { Link } from "@confio/relayer";
import { sha256 } from "@noble/hashes/sha256";
import fs from "fs";
import pako from "pako";
import {
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
  exec,
  loopRelayer,
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

  // set block time to 600ms
  await exec(
    `docker compose -f "${__dirname}/docker-compose.yml" exec localsecret-2 sed -E -i '/timeout_(propose|prevote|precommit|commit)/s/[0-9]+m?s/200ms/' .secretd/config/config.toml`,
  );
  await exec(
    `docker compose -f "${__dirname}/docker-compose.yml" restart localsecret-2`,
  );

  await waitForChainToStart({
    chainId: "secretdev-2",
    url: chain2LCD,
  });

  console.log("Creating IBC connection...");
  ibcConnection = await createIbcConnection();
}, 180_000);

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
        timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minute timeout
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
          timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minute timeout
        }),
        new MsgTransfer({
          sender: secretjs.address,
          receiver: secretjs.address,
          source_channel: ibcChannelIdOnChain1,
          source_port: "transfer",
          token: stringToCoin("1uscrt"),
          timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minute timeout
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
  }, 90_000);

  test("ibcResponses turned off by default on txsQuery", async () => {
    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.ibc.transfer(
      {
        sender: secretjs.address,
        receiver: secretjs.address,
        source_channel: ibcChannelIdOnChain1,
        source_port: "transfer",
        token: stringToCoin("1uscrt"),
        timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minute timeout
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

    const txs = await secretjs.query.txsQuery(
      `tx.hash='${tx.transactionHash}'`,
    );

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

  beforeAll(async () => {
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

    contracts.snip20.codeHash = toHex(
      sha256(pako.ungzip(contracts.snip20.wasm)),
    );
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

    console.log("Creating IBC wasm <-> transfer channel...");
    const ibcChannelPair = await createIbcChannel(
      ibcConnection,
      contracts.cw20ics20.ibcPortId,
    );

    ibcChannelIdOnChain1 = ibcChannelPair.src.channelId;
    ibcChannelIdOnChain2 = ibcChannelPair.dest.channelId;

    expect(ibcChannelIdOnChain1).not.toBe("");
    expect(ibcChannelIdOnChain2).not.toBe("");

    console.log("Looping relayer...");
    stopRelayer = loopRelayer(ibcConnection);
  }, 180_000 /* 3 minutes timeout */);

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
          wallet: accounts[0].walletAmino,
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
    5 * 60 * 1000 /* 5 minutes */,
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
        timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minute timeout
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
  });

  test("fee recv + ack", async () => {
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
        }),
        new MsgTransfer({
          sender: secretjs.address,
          receiver: secretjs.address,
          source_channel: ibcChannelIdOnChain1,
          source_port: "transfer",
          token: stringToCoin("1uscrt"),
          timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minute timeout
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

  test("fee recv + timeout", async () => {
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
        }),
        new MsgTransfer({
          sender: secretjs.address,
          receiver: secretjs.address,
          source_channel: ibcChannelIdOnChain1,
          source_port: "transfer",
          token: stringToCoin("1uscrt"),
          timeout_timestamp: String(Math.floor(Date.now() / 1000) + 1), // 1 second timeout
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
});

describe("ibc-hooks middleware", () => {
  let ibcChannelIdOnChain1 = "";
  let ibcChannelIdOnChain2 = "";

  let wrap_deposit_contract_address: string;
  let sscrt2_contract_address: string;
  let sscrt2_code_hash: string;

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

    wrap_deposit_contract_address = MsgInstantiateContractResponse.decode(
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

    sscrt2_contract_address = MsgInstantiateContractResponse.decode(
      tx.data[0],
    ).address;

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });
    sscrt2_code_hash = code_hash!;
  });

  test("send funds over IBC to contract", async () => {
    const secretjs2 = new SecretNetworkClient({
      url: chain2LCD,
      wallet: accounts[0].walletAmino,
      walletAddress: accounts[0].address,
      chainId: "secretdev-2",
    });

    let tx = await secretjs2.tx.ibc.transfer(
      {
        sender: secretjs2.address,
        receiver: wrap_deposit_contract_address,
        source_channel: ibcChannelIdOnChain2,
        source_port: "transfer",
        token: stringToCoin("123uscrt"),
        timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minutes
        memo: JSON.stringify({
          wasm: {
            contract: wrap_deposit_contract_address,
            msg: {
              wrap_deposit: {
                snip20_address: sscrt2_contract_address,
                snip20_code_hash: sscrt2_code_hash,
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
        contract_address: sscrt2_contract_address,
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
        address: sscrt2_contract_address,
        code_hash: sscrt2_code_hash,
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

    const { balance: contractBalance } = await secretjs.query.bank.balance({
      address: sscrt2_contract_address,
      denom,
    });

    expect(contractBalance?.amount).toEqual("123");

    const { supply } = await secretjs.query.bank.totalSupply({});

    expect(supply?.find((s) => s.denom === denom)?.amount).toEqual("123");
  }, 90_000);
});
