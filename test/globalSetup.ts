import { exec, waitForChainToStart } from "./utils";

require("ts-node").register({ transpileOnly: true });

module.exports = async () => {
  if (process.env.SKIP_LOCALSECRET === "true") {
    return;
  }

  await exec(`docker pull $(cat "${__dirname}/localsecret-version")`);

  // init localsecret
  console.log("\nSetting up LocalSecret...");
  await exec("docker rm -f localsecret || true");
  let { /* stdout, */ stderr } = await exec(
    `docker run -d -p 1317:1316 -p 26657:26657 --name localsecret $(cat "${__dirname}/localsecret-version")`,
  );

  // console.log("stdout (testnet container id?):", stdout);
  if (stderr) {
    console.error("stderr:", stderr);
  }

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

  if (process.env.SKIP_IBC_COMPOSE === "true") {
    return;
  }

  let { /* stdout, */ err } = await exec(
      `docker-compose -f test/cw20-ics20/docker-compose.yml up -d`,
  );
  // console.log("stdout (testnet container id?):", stdout);
  if (err) {
    console.error("stderr:", err);
  }
};
