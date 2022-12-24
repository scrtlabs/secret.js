import {IbcClient, Link} from "@confio/relayer";
import {ChannelPair} from "@confio/relayer/build/lib/link";
import {GasPrice} from "@cosmjs/stargate";
import {sha256} from "@noble/hashes/sha256";
import {SecretNetworkClient, toHex, toUtf8} from "../../src";
// import {}
import {Order } from "../../src/protobuf/ibc/core/channel/v1/channel"
import {State as ChannelState} from "../../src/grpc_gateway/ibc/core/channel/v1/channel.pb";
import {State as ConnectionState} from "../../src/grpc_gateway/ibc/core/connection/v1/connection.pb";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/crypto";

const networksAddress = "localhost"

export const ibcDenom = (
  paths: {
    incomingPortId: string;
    incomingChannelId: string;
  }[],
  coinMinimalDenom: string
): string => {
  const prefixes = [];
  for (const path of paths) {
    prefixes.push(`${path.incomingPortId}/${path.incomingChannelId}`);
  }

  const prefix = prefixes.join("/");
  const denom = `${prefix}/${coinMinimalDenom}`;

  return "ibc/" + toHex(sha256(toUtf8(denom))).toUpperCase();
};

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForBlocks(chainId: string, url: string) {
  const secretjs = new SecretNetworkClient({
    url,
    chainId,
  });

  console.log(`Waiting for blocks on ${chainId}...`);
  while (true) {
    try {
      const { block } = await secretjs.query.tendermint.getLatestBlock({});

      if (Number(block?.header?.height) >= 1) {
        console.log(`Current block on ${chainId}: ${block!.header!.height}`);
        break;
      }
    } catch (e) {
      // console.error("block error:", e);
    }
    await sleep(100);
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
      const { connections } = await secretjs.query.ibc_connection.connections({});

      if (connections.length >= 1 && connections[0].state === ConnectionState.STATE_OPEN) {
        console.log("Found an open connection on", chainId);
        break;
      }
    } catch (e) {
      // console.error("IBC error:", e, "on chain", chainId);
    }
    await sleep(100);
  }
}

export async function waitForIBCChannel(chainId: string, url: string, channelId: string) {
  const secretjs = new SecretNetworkClient({
    url,
    chainId,
  });

  console.log(`Waiting for ${channelId} on ${chainId}...`);
  outter: while (true) {
    try {
      const { channels } = await secretjs.query.ibc_channel.channels({});

      for (const c of channels) {
        if (c.channel_id === channelId && c.state == ChannelState.STATE_OPEN) {
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
  const signerA = await DirectSecp256k1HdWallet.fromMnemonic(
      "word twist toast cloth movie predict advance crumble escape whale sail such angry muffin balcony keen move employ cook valve hurt glimpse breeze brick",
      { hdPaths: [stringToPath("m/44'/529'/0'/0/0")],
        prefix: "secret"
      }
  );
  const [firstAccount] = await signerA.getAccounts();
  console.log(`creating channels with account: ${firstAccount.address}`);

  const address = "secret1ldjxljw7v4vk6zhyduywh04hpj0jdwxsmrlatf";

  // Create IBC Client for chain A
  const clientA = await IbcClient.connectWithSigner(`http://${networksAddress}:26657`, signerA, address, {
    prefix: "secret",
    gasPrice: GasPrice.fromString("0.25uscrt"),
    estimatedBlockTime: 5750,
    estimatedIndexerTime: 500,
  });
  // console.group("IBC client for chain A");
  // console.log(JSON.stringify(clientA));
  // console.groupEnd();

  // Create IBC Client for chain A
  const clientB = await IbcClient.connectWithSigner(`http://${networksAddress}:36657`, signerA, address, {
    prefix: "secret",
    gasPrice: GasPrice.fromString("0.25uscrt"),
    estimatedBlockTime: 5750,
    estimatedIndexerTime: 500,
  });
  // console.group("IBC client for chain B");
  // console.log(JSON.stringify(clientB));
  // console.groupEnd();

  // Create new connectiosn for the 2 clients
  // console.group("IBC link details");
  // console.log(JSON.stringify(link));
  // console.groupEnd();

  return await Link.createWithNewConnections(clientA, clientB);
}
export async function createIbcChannel(link: Link, contractPort: string): Promise<ChannelPair> {
  await Promise.all([link.updateClient("A"), link.updateClient("B")]);

  // Create a channel for the connections
  const channels = await link.createChannel("A", contractPort, "transfer", Order.ORDER_UNORDERED, "ics20-1");

  // console.group("IBC channel details");
  // console.log(JSON.stringify(channels));
  // console.groupEnd();

  return channels;
}

export async function loopRelayer(link: Link) {
  let nextRelay = {};
  while (true) {
    try {
      nextRelay = await link.relayAll();
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
