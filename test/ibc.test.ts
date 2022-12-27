import { TxResultCode, MsgTransfer } from "../src";
import {
  waitForChainToStart,
  chain2LCD,
  exec,
  createIbcConnection,
  createIbcChannel,
  loopRelayer,
  accounts,
} from "./utils";

let ibcChannelIdOnChain1 = "";
let ibcChannelIdOnChain2 = "";
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
  const ibcConnection = await createIbcConnection();

  console.log("Creating IBC channel...");
  const ibcChannelPair = await createIbcChannel(ibcConnection);

  ibcChannelIdOnChain1 = ibcChannelPair.src.channelId;
  ibcChannelIdOnChain2 = ibcChannelPair.dest.channelId;

  expect(ibcChannelIdOnChain1).not.toBe("");
  expect(ibcChannelIdOnChain2).not.toBe("");

  console.log("Looping relayer...");
  stopRelayer = await loopRelayer(ibcConnection);
}, 180_000);

afterAll(async () => {
  const done = stopRelayer();
  await done;
});

test("ibcResponses", async () => {
  const { secretjs } = accounts[0];

  const tx = await secretjs.tx.ibc.transfer(
    {
      sender: secretjs.address,
      receiver: secretjs.address,
      source_channel: ibcChannelIdOnChain1,
      source_port: "transfer",
      token: {
        amount: "1",
        denom: "uscrt",
      },
      timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minute timeout
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
        token: {
          amount: "1",
          denom: "uscrt",
        },
        timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minute timeout
      }),
      new MsgTransfer({
        sender: secretjs.address,
        receiver: secretjs.address,
        source_channel: ibcChannelIdOnChain1,
        source_port: "transfer",
        token: {
          amount: "1",
          denom: "uscrt",
        },
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
      token: {
        amount: "1",
        denom: "uscrt",
      },
      timeout_timestamp: String(Math.floor(Date.now() / 1000) + 1), // 1 second timeout
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
        x.type === "timeout" && x.key === "refund_denom" && x.value === "uscrt",
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

// describe("cw20-ics20", () => {
//   let contractAddress: string;
//   beforeAll(async () => {});
// });
