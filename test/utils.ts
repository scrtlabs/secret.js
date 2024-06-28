import { stringToPath } from "@cosmjs/crypto";
import { DirectSecp256k1HdWallet, OfflineDirectSigner, OfflineSigner } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";
import { IbcClient, Link } from "@confio/relayer";
import { ChannelPair } from "@confio/relayer/build/lib/link";
import fs from "fs";
import util from "util";
import {
  ProposalContent,
  ProposalType,
  SecretNetworkClient,
  stringToCoins,
  TxResponse,
  TxResultCode,
  VoteOption,
  Wallet,
} from "../src";
import { Order } from "../src/protobuf/ibc/core/channel/v1/channel";
import { AminoWallet } from "../src/wallet_amino";
import { ProposalStatus } from "../src/grpc_gateway/cosmos/gov/v1beta1/gov.pb";

export const exec = util.promisify(require("child_process").exec);

export type Account = {
  address: string;
  mnemonic: string;
  walletAmino: AminoWallet;
  walletProto: Wallet;
  secretjs: SecretNetworkClient;
  secretjsProto: SecretNetworkClient;
};

export const accounts: Account[] = [];

export const chain1LCD = "http://20.84.98.207:1317"; //20.84.98.207
export const chain2LCD = "http://172.190.87.208:1317"; //172.190.87.208

export const chain1RPC = "http://20.84.98.207:26657";
export const chain2RPC = "http://172.190.87.208:26657";

// Initialize genesis accounts
const mnemonics = [
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar", // account a
  "jelly shadow frog dirt dragon use armed praise universe win jungle close inmate rain oil canvas beauty pioneer chef soccer icon dizzy thunder meadow", // account b
  "chair love bleak wonder skirt permit say assist aunt credit roast size obtain minute throw sand usual age smart exact enough room shadow charge", // account c
  // account d is used by ts-relayer

  // more test accounts for when we need fresh accounts (like when creating a validator)
  // this needs to be hard coded so we could fund the accounts once and share them between all test suites
  // (jest runs each test file in a different process and there's no good way of sharing global state)
  "road comfort vague essay seven dinosaur throw year crater amazing card shrug method large spatial rifle initial fade harsh clap control action average praise",
  "magic leisure piano time kangaroo consider cross settle cute expose fossil company used this connect garbage inject coach vendor slot antenna nerve love slush",
  "lake wink moment volume danger custom wheat trip trophy job clown robust clay script image degree wisdom magnet proof age universe under fox venture",
  "employ similar canoe mammal degree bacon fold auto butter airport skate athlete screen wool off tribe isolate misery aisle risk expose treat wrong drop",
  "mushroom crouch prepare hole install soda fetch night clean devote viable fork junk magic tragic expire boost cradle morning chapter odor kidney profit unique",
  "vanish soon ketchup acid twist someone burger dolphin sugar brand dose inflict remember control wool remain time glad harvest wonder alert lawsuit myself network",
  "duck illegal remove walk job control fever amateur vocal stand rescue pupil forest limit shoe churn ill then ill tool wise task federal visa",
  "planet unique bachelor hero glance apology nothing duty bracket until short faculty clay service sustain goose remember fork memory hockey peanut voyage benefit trip",
  "guitar milk brief roast mutual only kiwi position slush must reduce liberty dizzy mix nut caught ethics struggle wrist run proud jeans lens pretty",
  "police magnet impose senior opera west avoid can civil surge film outer swap replace sentence whale runway side ring raise table fox draft dynamic",
  "balance crawl leisure settle version lemon goat indicate inflict news sense spend public wrist quarter nominee mammal barely hedgehog jaguar quality screen squirrel hotel",
  "minor neglect obscure taste happy human truck pair solve weapon blade diamond bamboo draft siege page rocket license design nation collect equal champion jealous",
  "giraffe truck mention slim you music scrap elder swear latin festival hurdle museum disease rocket book diagram capital creek useful problem seminar razor world",
  "clock involve govern nurse kiss butter hockey hill hub hurry palace error moon asset learn health slam amateur lava zone this jelly toy essay",
  "culture possible muffin nut ocean nut frame dinosaur melody border oven crumble pumpkin normal zone prosper auction series time spray stage unveil whale inner",
  "lens upon insect rescue marriage wolf uphold sniff wine humor grass reflect rough belt labor quantum school imitate baby weasel destroy leg adapt parade",
  "popular famous wine robot melody warm sad suit never absurd fat flush into space question mechanic cactus coast couple outdoor ribbon town transfer fix",
];

for (let i = 0; i < mnemonics.length; i++) {
  const mnemonic = mnemonics[i];
  //const walletAmino = new AminoWallet(mnemonic);
  const walletAmino = new Wallet(mnemonic);
  const walletProto = new Wallet(mnemonic);
  accounts[i] = {
    address: walletAmino.address,
    mnemonic: mnemonic,
    walletAmino,
    walletProto,
    secretjs: new SecretNetworkClient({
      url: chain1LCD,
      wallet: walletAmino,
      walletAddress: walletAmino.address,
      chainId: "secretdev-1",
    }),
    secretjsProto: new SecretNetworkClient({
      url: chain1LCD,
      wallet: walletProto,
      walletAddress: walletProto.address,
      chainId: "secretdev-1",
    }),
  };
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function storeSnip20Ibc(
  secretjs: SecretNetworkClient,
  address: string,
) {
  const txStore = await secretjs.tx.compute.storeCode(
    {
      sender: address,
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

  return getValueFromEvents(txStore.events, "message.code_id");
}

export function checkInstantiateSuccess(tx: TxResponse): string {
  if (tx.code !== TxResultCode.Success) {
    console.error(tx.rawLog);
  }
  expect(tx.code).toBe(TxResultCode.Success);

  expect(getValueFromEvents(tx.events, "message.action")).toBe(
    "/secret.compute.v1beta1.MsgInstantiateContract",
  );
  expect(getValueFromEvents(tx.events, "message.contract_address")).toContain(
    "secret1",
  );

  return getValueFromEvents(tx.events, "message.contract_address");
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

export function getValueFromEvents(
  events: any[] | undefined,
  key: string,
): string {
  if (!events) {
    return "";
  }

  for (const e of events) {
    for (const a of e.attributes) {
      if (`${e.type}.${a.key}` === key) {
        return String(a.value);
      }
    }
  }

  return "";
}

export function getTxEvents(
  events: any[] | undefined,
  key: string,
): Object[] {
  let res: Object[] = [];
  if (!events) {
    return [];
  }

  for (const e of events) {
    if (`${e.type}` === key) {
      res.push(e);
    }
  }

  return res;
}

export async function storeContract(
  wasmPath: string,
  account: Account,
): Promise<number> {
  const secretjs = account.secretjsProto;
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

  return Number(getValueFromEvents(txStore.events, "message.code_id"));
}

export async function initContract(
  code_id: number,
  init_msg: object,
  account: Account,
  label?: string,
): Promise<string> {
  const secretjs = account.secretjsProto;
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
  expect(getValueFromEvents(txInit.events, "message.action")).toBe(
    "/secret.compute.v1beta1.MsgInstantiateContract",
  );

  return getValueFromEvents(txInit.events, "message.contract_address");
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

export async function createIbcConnection(): Promise<Link> {
  // Create signers as LocalSecret account d
  // (Both sides are localsecret so same account can be used on both sides)
  const signerA = await DirectSecp256k1HdWallet.fromMnemonic(
    "word twist toast cloth movie predict advance crumble escape whale sail such angry muffin balcony keen move employ cook valve hurt glimpse breeze brick", // account d
    { hdPaths: [stringToPath("m/44'/529'/0'/0/0")], prefix: "secret" },
  );
  const [account] = await signerA.getAccounts();
  const signerB = signerA;
  const a = signerA as OfflineSigner
  // Create IBC Client for chain A
  const clientA = await IbcClient.connectWithSigner(
    chain1RPC,
    a,
    account.address,
    {
      gasPrice: GasPrice.fromString("0.25uscrt"),
      estimatedBlockTime: 750,
      estimatedIndexerTime: 500,
    },
  );

  // Create IBC Client for chain A
  const clientB = await IbcClient.connectWithSigner(
    chain2RPC,
    signerB as OfflineSigner,
    account.address,
    {
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
  srcPort = "transfer",
  version = "ics20-1",
): Promise<ChannelPair> {
  await Promise.all([
    ibcConnection.updateClient("A"),
    ibcConnection.updateClient("B"),
  ]);

  // Create a channel for the connections
  return await ibcConnection.createChannel(
    "A",
    srcPort,
    "transfer",
    Order.ORDER_UNORDERED,
    version,
  );
}

export function loopRelayer(connection: Link) {
  let run = true;

  const done = new Promise<void>(async (resolve) => {
    while (run) {
      try {
        await connection.relayAll();

        await Promise.all([
          connection.updateClient("A"),
          connection.updateClient("B"),
        ]);
      } catch (e) {
        console.warn(`<loopRelayer> caught error: ${e.message}`);
      }
      await sleep(1_000);
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
  url: string;
  chainId: string;
}) {
  const { walletAmino: wallet, address: walletAddress } = accounts[0];

  const secretjs = new SecretNetworkClient({
    url: url,
    chainId: chainId,
    wallet,
    walletAddress,
  });

  while (true) {
    try {
      const tx = await secretjs.tx.bank.send({
        amount: stringToCoins("1uscrt"),
        from_address: walletAddress,
        to_address: walletAddress,
      });

      if (tx.code === TxResultCode.Success) {
        break;
      }
    } catch (e) {
      console.warn("Chain is not ready:" + e.message);
    }
    await sleep(1000);
  }
}

export async function waitForProposalToPass(
  secretjs: SecretNetworkClient,
  proposalId: string,
) {
  while (true) {
    try {
      const response = await secretjs.query.gov.proposal({
        proposal_id: proposalId,
      });

      if (
        response.proposal?.status ===
          ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
        response.proposal?.status ===
          ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
      ) {
        continue;
      }
      if (response.proposal?.status !== ProposalStatus.PROPOSAL_STATUS_PASSED) {
        console.error("the proposal we waited for - did not pass");
        expect(0).toEqual(1);
      } else {
        return;
      }
    } catch (e) {
      console.error(e);
    }
    await sleep(2500);
  }
}

export async function passParameterChangeProposal(
  secretjs: SecretNetworkClient,
  content: ProposalContent,
) {
  console.log("Passing parameter change proposal...");

  let tx = await secretjs.tx.gov.submitProposal(
    {
      type: ProposalType.ParameterChangeProposal,
      proposer: secretjs.address,
      initial_deposit: stringToCoins("100000000000uscrt"),
      is_expedited: true,
      content,
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

  const proposalId = getValueFromRawLog(
    tx.rawLog,
    "submit_proposal.proposal_id",
  );
  expect(Number(proposalId)).toBeGreaterThanOrEqual(1);

  tx = await secretjs.tx.gov.vote(
    {
      option: VoteOption.VOTE_OPTION_YES,
      proposal_id: proposalId,
      voter: secretjs.address,
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

  await waitForProposalToPass(secretjs, proposalId);
}

export async function turnIbcSwitchOn(secretjs: SecretNetworkClient) {
  console.log("Turning ibc-switch on...");

  // verify the switch is on the "off" position at the beginning
  const { params } = await secretjs.query.emergency_button.params({});
  if (params?.switch_status === "off") {
    const msg = {
      sender: secretjs.address,
    };
    let tx = await secretjs.tx.emergency_button.toggleIbcSwitch(msg, {
      broadcastCheckIntervalMs: 100,
      gasLimit: 5_000_000,
    });

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toEqual(TxResultCode.Success);
  }
}

export async function turnIbcSwitchOff(secretjs: SecretNetworkClient) {
  console.log("Turning ibc-switch off...");

  // verify the switch is on the "off" position at the beginning
  const { params } = await secretjs.query.emergency_button.params({});
  if (params?.switch_status === "on") {
    const msg = {
      sender: secretjs.address,
    };
    let tx = await secretjs.tx.emergency_button.toggleIbcSwitch(msg, {
      broadcastCheckIntervalMs: 100,
      gasLimit: 5_000_000,
    });

    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toEqual(TxResultCode.Success);
  }
}
