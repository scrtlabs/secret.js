import fs from "fs";
import util from "util";
import { SecretNetworkClient, TxResultCode, Wallet } from "../src";
import { IbcClient, Link } from "@confio/relayer";
import { ChannelPair } from "@confio/relayer/build/lib/link";
import { GasPrice } from "@cosmjs/stargate";
import {
  Order,
  State as ChannelState,
} from "../src/protobuf/ibc/core/channel/v1/channel";
import { State as ConnectionState } from "../src/protobuf/ibc/core/connection/v1/connection";
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

export async function waitForIBCConnection(
  chainId: string,
  url: string,
) {
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
        connections.length >= 1 &&
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
  outter: while (true) {
    try {
      const { channels } = await secretjs.query.ibc_channel.channels({});

      for (const c of channels) {
        if (c.channelId === channelId && c.state == ChannelState.STATE_OPEN) {
          console.log(`${channelId} is open on ${chainId}`);
          break outter;
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
  const signerA = new Wallet(
    "word twist toast cloth movie predict advance crumble escape whale sail such angry muffin balcony keen move employ cook valve hurt glimpse breeze brick",
  );
  const signerB = signerA;

  // Create IBC Client for chain A
  const clientA = await IbcClient.connectWithSigner(
    "http://localhost:26657",
    signerA,
    signerA.address,
    {
      prefix: "secret",
      gasPrice: GasPrice.fromString("0.25uscrt"),
      estimatedBlockTime: 5750,
      estimatedIndexerTime: 500,
    },
  );
  // console.group("IBC client for chain A");
  // console.log(JSON.stringify(clientA));
  // console.groupEnd();

  // Create IBC Client for chain A
  const clientB = await IbcClient.connectWithSigner(
    "http://localhost:36657",
    signerB,
    signerB.address,
    {
      prefix: "secret",
      gasPrice: GasPrice.fromString("0.25uscrt"),
      estimatedBlockTime: 5750,
      estimatedIndexerTime: 500,
    },
  );
  // console.group("IBC client for chain B");
  // console.log(JSON.stringify(clientB));
  // console.groupEnd();

  // Create new connectiosn for the 2 clients
  const link = await Link.createWithNewConnections(clientA, clientB);

  // console.group("IBC link details");
  // console.log(JSON.stringify(link));
  // console.groupEnd();

  return link;
}
export async function createIbcChannel(
  link: Link,
  contractPort: string,
): Promise<ChannelPair> {
  await Promise.all([link.updateClient("A"), link.updateClient("B")]);

  // Create a channel for the connections
  const channels = await link.createChannel(
    "A",
    contractPort,
    "transfer",
    Order.ORDER_UNORDERED,
    "ics20-1",
  );

  // console.group("IBC channel details");
  // console.log(JSON.stringify(channels));
  // console.groupEnd();

  return channels;
}

export async function loopRelayer(link: Link) {
  while (true) {
    try {
      let nextRelay = await link.relayAll();
      // console.group("Next relay:");
      // console.log(nextRelay);
      // console.groupEnd();

      await Promise.all([link.updateClient("A"), link.updateClient("B")]);
    } catch (e) {
      console.error(`Caught error: `, e);
    }
    await sleep(5000);
  }
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
