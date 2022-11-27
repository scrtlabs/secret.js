import fs from "fs";
import util from "util";
import { SecretNetworkClient, TxResultCode, Wallet } from "../src";
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
