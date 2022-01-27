import util from "util";
import { SecretNetworkClient } from "../src";
const exec = util.promisify(require("child_process").exec);

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const SECONDS_30 = 30_000;

type Account = {
  name: string;
  type: string;
  address: string;
  pubkey: string;
  mnemonic: string;
};

const emptyAccount: Account = {
  name: "",
  type: "",
  address: "",
  pubkey: "",
  mnemonic: "",
};

function isEmpty(a: Account): boolean {
  return a.name === "";
}

let accounts: { [name: string]: Account } = {
  a: emptyAccount,
  b: emptyAccount,
  c: emptyAccount,
  d: emptyAccount,
};

function getMnemonicRegexForAccount(account: string) {
  return new RegExp(`{"name":"${account}".+?"mnemonic":".+?"}`);
}

async function waitForTx(txhash: string): Promise<any> {
  while (true) {
    try {
      const { stdout } = await exec(
        `docker exec -i secretjs-testnet secretd q tx ${txhash}`,
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

async function secretcliStore(
  wasmPath: string,
  account: Account,
): Promise<number> {
  const { stdout: cp_wasm, stderr } = await exec(
    `docker cp "${wasmPath}" secretjs-testnet:/wasm-file`,
  );

  const { stdout: secretcli_store } = await exec(
    `docker exec -i secretjs-testnet secretd tx compute store /wasm-file --from "${account.name}" --gas 10000000 -y`,
  );
  const { txhash }: { txhash: string } = JSON.parse(secretcli_store);

  const tx = await waitForTx(txhash);

  return Number(
    tx.logs[0].events[0].attributes.find(
      (a: { key: string; value: string }) => a.key === "code_id",
    ).value,
  );
}

async function secretcliInit(
  codeId: number,
  initMsg: object,
  label: string,
  account: Account,
): Promise<string> {
  const { stdout: secretcli_store } = await exec(
    `docker exec -i secretjs-testnet secretd tx compute instantiate ${codeId} '${JSON.stringify(
      initMsg,
    )}' --label "${label}" --from "${account.name}" --gas 500000 -y`,
  );
  const { txhash }: { txhash: string } = JSON.parse(secretcli_store);

  const tx = await waitForTx(txhash);

  return String(
    tx.logs[0].events[0].attributes.find(
      (a: { key: string; value: string }) => a.key === "contract_address",
    ).value,
  );
}

beforeAll(async () => {
  try {
    // init testnet
    console.log("Setting up local testnet...");
    await exec("docker rm -f secretjs-testnet || true");
    const { stdout, stderr } = await exec(
      "docker run -it -d -p 26657:26657 -p 26656:26656 -p 1317:1317 --name secretjs-testnet enigmampc/secret-network-sw-dev:v1.2.2-1",
    );
    console.log("stdout (testnet container id?):", stdout);
    if (stderr) {
      console.error("stderr:", stderr);
    }

    return new Promise<void>(async (accept, reject) => {
      let keepChecking = true;
      const rejectTimeoout = setTimeout(() => {
        keepChecking = false;
        reject();
      }, SECONDS_30); // reject after X time

      while (keepChecking) {
        try {
          // extract mnemonics of genesis accounts from logs
          if (Object.values(accounts).find((a) => isEmpty(a))) {
            const { stdout } = await exec("docker logs secretjs-testnet");
            const logs = String(stdout);
            for (const account of Object.keys(accounts)) {
              if (isEmpty(accounts[account])) {
                const match = logs.match(getMnemonicRegexForAccount(account));
                if (match) {
                  accounts[account] = JSON.parse(match[0]) as Account;
                }
              }
            }
          }

          // check if the network has started (i.e. block number >= 1)
          const { stdout: status } = await exec(
            "docker exec -i secretjs-testnet secretd status",
          );

          const resp = JSON.parse(status);

          if (
            Number(resp?.SyncInfo?.latest_block_height) >= 1 &&
            !Object.values(accounts).find((a) => isEmpty(a))
          ) {
            clearTimeout(rejectTimeoout);
            accept();
            return;
          }
        } catch (e) {
          //   console.error(e);
        }
        await sleep(250);
      }
    });
  } catch (e) {
    console.error("Setup failed:", e);
  }
}, SECONDS_30 + 5_000);

afterAll(async () => {
  try {
    console.log("Tearing down local testnet...");
    const { stdout, stderr } = await exec("docker rm -f secretjs-testnet");
    console.log("stdout (testnet container name?):", stdout);
    if (stderr) {
      console.error("stderr:", stderr);
    }
  } catch (e) {
    console.error("Teardown failed:", e);
  }
});

describe("queries", () => {
  let sSCRT: string;

  beforeAll(async () => {
    const codeId = await secretcliStore(
      `${__dirname}/snip20-ibc.wasm.gz`,
      accounts.a,
    );

    sSCRT = await secretcliInit(
      codeId,
      {
        name: "Secret SCRT",
        admin: accounts.a.address,
        symbol: "SSCRT",
        decimals: 6,
        initial_balances: [{ address: accounts.a.address, amount: "1" }],
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
      "sSCRT",
      accounts.a,
    );

    console.log("code id", codeId);
  }, SECONDS_30 * 2 * 10);

  test(
    "query sSCRT",
    async () => {
      const secretjs = await SecretNetworkClient.connect(
        "http://localhost:26657",
      );

      const {
        codeInfo: { codeHash },
      } = await secretjs.query.compute.code(1);

      const x = await secretjs.query.compute.queryContract({
        address: sSCRT,
        codeHash,
        query: { token_info: {} },
      });

      console.log(x);
    },
    1000 * 60 * 60,
  );
});
