//@ts-ignore
const util = require("util");
require("ts-node").register({ transpileOnly: true });

const exec = util.promisify(require("child_process").exec);

module.exports = async () => {
  try {
    console.log("Tearing down local testnet...");
    //@ts-ignore
    const { stdout, stderr } = await exec("docker rm -f localsecret");
    const { stdout2, stderr2 } = await exec("docker-compose -f test/cw20-ics20/docker-compose.yml down");

    // console.log("stdout (testnet container name?):", stdout);
    if (stderr) {
      console.error("stderr:", stderr);
    }
    if (stderr2) {
      console.error("stderr:", stderr);
    }
  } catch (e) {
    console.error("Teardown failed:", e);
  }
};
