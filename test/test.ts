import util from "util";
const exec = util.promisify(require("child_process").exec);

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const SETUP_TIMEOUT_MS = 30_000;

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
      }, SETUP_TIMEOUT_MS); // reject after SETUP_TIMEOUT_MS seconds

      while (keepChecking) {
        try {
          // extract mnemonics of genesis testnet accounts
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
}, SETUP_TIMEOUT_MS + 5_000);

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

test("adds 1 + 2 to equal 3", () => {
  const result: number = 3;
  expect(1 + 2).toBe(result);
});
