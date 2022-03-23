//@ts-ignore
const util = require("util");
require("ts-node").register({ transpileOnly: true });

const exec = util.promisify(require("child_process").exec);

module.exports = async () => {
  try {
    console.log("Tearing down local testnet...");
    //@ts-ignore
    const { stdout, stderr } = await exec("docker rm -f secretjs-testnet");
    // console.log("stdout (testnet container name?):", stdout);
    if (stderr) {
      console.error("stderr:", stderr);
    }
  } catch (e) {
    console.error("Teardown failed:", e);
  }
};
