import axios from "axios";
import util from "util";
const exec = util.promisify(require("child_process").exec);

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const SETUP_TIMEOUT_MS = 30_000;

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
      }, SETUP_TIMEOUT_MS); // reject after 20 seconds
      while (keepChecking) {
        try {
          //   console.log("1");
          const resp = await axios.get<{
            block: { header: { height: number } };
          }>("http://localhost:1317/blocks/latest");
          //   console.log("2");
          //   console.log(resp);

          if (Number(resp?.data?.block?.header?.height) >= 1) {
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
