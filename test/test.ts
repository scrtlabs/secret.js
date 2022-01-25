import { clearConfigCache } from "prettier";
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

const accounts: { [name: string]: Account | null } = {
  a: null,
  b: null,
  c: null,
  d: null,
};

const getMnemonicRegexForAccount = (account: string) =>
  new RegExp(`{"name":"${account}".+?"mnemonic":".+?"}`);

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
          if (Object.values(accounts).includes(null)) {
            const { stdout } = await exec("docker logs secretjs-testnet");
            const logs = String(stdout);
            for (const account of Object.keys(accounts)) {
              if (accounts[account] === null) {
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
            !Object.values(accounts).includes(null)
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
  beforeAll(async () => {
    const { stdout: cp_wasm, stderr } = await exec(
      `docker cp "$(pwd)/test/snip20-ibc.wasm.gz" secretjs-testnet:/snip20-ibc.wasm.gz`,
    );

    const { stdout: secretcli_store } = await exec(
      `docker exec -i secretjs-testnet secretd tx compute store /snip20-ibc.wasm.gz --from a --gas 10000000 -y`,
    );
    const { txhash }: { txhash: string } = JSON.parse(secretcli_store);

    while (true) {
      try {
        const { stdout } = await exec(
          `docker exec -i secretjs-testnet secretd q tx ${txhash}`,
        );

        if (Number(JSON.parse(stdout)?.code) === 0) {
          break;
        }
      } catch (error) {
        // console.error("q tx:", error);
      }

      await sleep(3000);
    }
  }, SECONDS_30 * 2 * 10);

  test(
    "getCodes()",
    async () => {
      const secretjs = await SecretNetworkClient.connect(
        "http://localhost:26657",
      );

      const x = await secretjs.getCodes();

      console.log(x);

      const result: number = 3;
      expect(1 + 2).toBe(result);
    },
    1000 * 60 * 60,
  );
});
