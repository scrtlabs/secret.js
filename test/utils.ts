import { IbcClient, Link } from "@confio/relayer";
import { ChannelPair } from "@confio/relayer/build/lib/link";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/proto-signing/node_modules/@cosmjs/crypto";
import { GasPrice } from "@cosmjs/stargate";
import fs from "fs";
import util from "util";
import { SecretNetworkClient, TxResultCode, Wallet } from "../src";
import { State as ChannelState } from "../src/grpc_gateway/ibc/core/channel/v1/channel.pb";
import { State as ConnectionState } from "../src/grpc_gateway/ibc/core/connection/v1/connection.pb";
import { Order } from "../src/protobuf/ibc/core/channel/v1/channel";
import { AminoWallet } from "../src/wallet_amino";

export const exec = util.promisify(require("child_process").exec);

export type Account = {
  address: string;
  mnemonic: string;
  walletAmino: AminoWallet;
  walletProto: Wallet;
  secretjs: SecretNetworkClient;
};

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getMnemonicRegexForAccountName(account: string) {
  return new RegExp(`{"name":"${account}".+?"mnemonic":".+?"}`);
}

export function getValueFromRawLog(
  rawLog: string | undefined,
  key: string,
): string {
  if (!rawLog) {
    return "";
  }

  for (const l of JSON.parse(rawLog)) {
    for (const e of l.events) {
      for (const a of e.attributes) {
        if (`${e.type}.${a.key}` === key) {
          return String(a.value);
        }
      }
    }
  }

  return "";
}

export async function waitForTx(txhash: string): Promise<any> {
  while (true) {
    try {
      const { stdout } = await exec(
        `docker exec -i localsecret secretd q tx ${txhash}`,
      );

      if (Number(JSON.parse(stdout)?.code) === 0) {
        return JSON.parse(stdout);
      }
    } catch (error) {
      // console.error("q tx:", error);
    }

    await sleep(1000);
  }
}

export async function storeContract(
  wasmPath: string,
  account: Account,
): Promise<number> {
  const secretjs = account.secretjs;
  const txStore = await secretjs.tx.compute.storeCode(
    {
      sender: account.address,
      wasm_byte_code: fs.readFileSync(wasmPath) as Uint8Array,
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

  return Number(getValueFromRawLog(txStore.rawLog, "message.code_id"));
}

export async function initContract(
  code_id: number,
  init_msg: object,
  account: Account,
  label?: string,
): Promise<string> {
  const secretjs = account.secretjs;
  const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
    code_id: String(code_id),
  });

  const txInit = await secretjs.tx.compute.instantiateContract(
    {
      sender: account.address,
      code_id,
      code_hash,
      init_msg,
      label: label || `label-${Date.now()}`,
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

  return getValueFromRawLog(txInit.rawLog, "message.contract_address");
}

export async function getBalance(
  secretjs: SecretNetworkClient,
  address: string,
): Promise<bigint> {
  const response = await secretjs.query.bank.balance({
    address,
    denom: "uscrt",
  });

  if (response.balance) {
    return BigInt(response.balance.amount!);
  } else {
    return BigInt(0);
  }
}

export async function waitForIBCConnection(chainId: string, url: string) {
  const secretjs = new SecretNetworkClient({
    url,
    chainId,
  });

  console.log("Waiting for open connections on", chainId + "...");
  while (true) {
    try {
      const { connections } = await secretjs.query.ibc_connection.connections(
        {},
      );

      if (
        connections &&
        connections[0].state &&
        connections[0].state === ConnectionState.STATE_OPEN
      ) {
        console.log("Found an open connection on", chainId);
        break;
      }
    } catch (e) {
      // console.error("IBC error:", e, "on chain", chainId);
    }
    await sleep(100);
  }
}

export async function waitForIBCChannel(
  chainId: string,
  url: string,
  channelId: string,
) {
  const secretjs = new SecretNetworkClient({
    url,
    chainId,
  });

  console.log(`Waiting for ${channelId} on ${chainId}...`);
  outer: while (true) {
    try {
      const { channels } = await secretjs.query.ibc_channel.channels({});

      if (!channels) {
        break;
      }

      for (const c of channels) {
        if (c.channel_id === channelId && c.state == ChannelState.STATE_OPEN) {
          console.log(`${channelId} is open on ${chainId}`);
          break outer;
        }
      }
    } catch (e) {
      // console.error("IBC error:", e, "on chain", chainId);
    }
    await sleep(100);
  }
}

export async function createIbcConnection(): Promise<Link> {
  // Create signers as LocalSecret account d
  // (Both sides are localsecret so same account can be used on both sides)
  const signerA = await DirectSecp256k1HdWallet.fromMnemonic(
    "word twist toast cloth movie predict advance crumble escape whale sail such angry muffin balcony keen move employ cook valve hurt glimpse breeze brick", // account d
    { hdPaths: [stringToPath("m/44'/529'/0'/0/0")], prefix: "secret" },
  );
  const [account] = await signerA.getAccounts();

  const signerB = signerA;

  // Create IBC Client for chain A
  const clientA = await IbcClient.connectWithSigner(
    "http://localhost:26657",
    signerA,
    account.address,
    {
      prefix: "secret",
      gasPrice: GasPrice.fromString("0.25uscrt"),
      estimatedBlockTime: 750,
      estimatedIndexerTime: 500,
    },
  );

  // Create IBC Client for chain A
  const clientB = await IbcClient.connectWithSigner(
    "http://localhost:36657",
    signerB,
    account.address,
    {
      prefix: "secret",
      gasPrice: GasPrice.fromString("0.25uscrt"),
      estimatedBlockTime: 750,
      estimatedIndexerTime: 500,
    },
  );

  // Create new connection for the 2 clients
  return await Link.createWithNewConnections(clientA, clientB);
}
export async function createIbcChannel(
  ibcConnection: Link,
): Promise<ChannelPair> {
  await Promise.all([
    ibcConnection.updateClient("A"),
    ibcConnection.updateClient("B"),
  ]);

  // Create a channel for the connections
  return await ibcConnection.createChannel(
    "A",
    "transfer",
    "transfer",
    Order.ORDER_UNORDERED,
    "ics20-1",
  );
}

export async function loopRelayer(connection: Link) {
  let run = true;

  const done = new Promise<void>(async (resolve) => {
    while (run) {
      try {
        const nextRelay = await connection.relayAll();
        // console.log(nextRelay);

        await Promise.all([
          connection.updateClient("A"),
          connection.updateClient("B"),
        ]);
      } catch (e) {
        console.error(`loopRelayer: caught error: `, e);
      }
      await sleep(750);
    }

    resolve();
  });

  return () => {
    // 1. To stop the relayer, the caller needs to call this function
    // which lets the relayer know to stop looping
    run = false;
    // 2. Then the caller needs to wait for this promise to resolve
    // this promise resloves after all relayer txs have finished
    // otherwise the test suite kills LocalSecret mid-tx which throw exceptions
    // from inside the relayer loop
    return done;
  };
}

export function getAllMethodNames(obj: any): Array<string> {
  const methods = new Set<string>();
  while ((obj = Reflect.getPrototypeOf(obj))) {
    Reflect.ownKeys(obj).forEach((k) => {
      if (
        ![
          "__defineGetter__",
          "__defineSetter__",
          "__lookupGetter__",
          "__lookupSetter__",
          "__proto__",
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf",
        ].includes(k.toString())
      ) {
        methods.add(k.toString());
      }
    });
  }
  return Array.from(methods);
}

export async function waitForChainToStart({
  url,
  chainId,
}: {
  url?: string;
  chainId?: string;
}) {
  while (true) {
    const wallet = new AminoWallet(
      "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
    ); // account a

    const secretjs = new SecretNetworkClient({
      url: url ?? "http://localhost:1317",
      chainId: chainId ?? "secretdev-1",
      wallet,
      walletAddress: wallet.address,
    });

    try {
      const tx = await secretjs.tx.bank.send({
        amount: [{ amount: "1", denom: "uscrt" }],
        from_address: wallet.address,
        to_address: wallet.address,
      });

      if (tx.code === TxResultCode.Success) {
        break;
      }
    } catch (e) {
      // console.eerror(e);
    }
    await sleep(250);
  }
}
