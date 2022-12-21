import { exec, waitForChainToStart } from "./utils";

require("ts-node").register({ transpileOnly: true });

module.exports = async () => {
  if (process.env.SKIP_LOCALSECRET === "true") {
    return;
  }

  // init localsecret
  console.log("\nSetting up LocalSecret...");
  await exec("docker rm -f localsecret || true");
  const { /* stdout, */ stderr } = await exec(
    "docker run -it -d -p 1317:1316 -p 26657:26657 --name localsecret ghcr.io/scrtlabs/localsecret:v1.6.0-patch.1",
  );

  // console.log("stdout (testnet container id?):", stdout);
  if (stderr) {
    console.error("stderr:", stderr);
  }

  // Wait for the network to start (i.e. block number >= 1)
  console.log("Waiting for LocalSecret to start...");

  await waitForChainToStart({});

  // set block time to 200ms
  await exec(
    "docker exec localsecret sed -E -i '/timeout_(propose|prevote|precommit|commit)/s/[0-9]+m?s/200ms/' .secretd/config/config.toml",
  );
  await exec("docker stop localsecret");
  await exec("docker start localsecret");

  await waitForChainToStart({});

  console.log(`LocalSecret is running`);
};
