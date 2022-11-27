import { SecretNetworkClient } from "../src";
import { exec, sleep } from "./utils";

require("ts-node").register({ transpileOnly: true });

module.exports = async () => {
  if (process.env.SKIP_LOCALSECRET === "true") {
    return;
  }

  // init localsecret
  console.log("\nSetting up LocalSecret...");
  await exec("docker rm -f localsecret || true");
  const { /* stdout, */ stderr } = await exec(
    "docker run -it -d -p 1317:1316 --name localsecret ghcr.io/scrtlabs/localsecret:v1.6.0-alpha.4",
  );

  // console.log("stdout (testnet container id?):", stdout);
  if (stderr) {
    console.error("stderr:", stderr);
  }

  // Wait for the network to start (i.e. block number >= 1)
  console.log("Waiting for the network to start...");

  await waitForBlocks();

  // set block time to 200ms
  await exec(
    "docker exec localsecret sed -E -i '/timeout_(propose|prevote|precommit|commit)/s/[0-9]+m?s/200ms/' .secretd/config/config.toml",
  );
  await exec("docker stop localsecret");
  await exec("docker start localsecret");

  await waitForBlocks();

  console.log(`LocalSecret is running`);
};

async function waitForBlocks() {
  while (true) {
    const secretjs = new SecretNetworkClient({
      url: "http://localhost:1317",
      chainId: "secretdev-1",
    });

    try {
      const { block } = await secretjs.query.tendermint.getLatestBlock({});

      if (Number(block?.header?.height) >= 1) {
        break;
      }
    } catch (e) {
      // console.eerror(e);
    }
    await sleep(250);
  }
}
