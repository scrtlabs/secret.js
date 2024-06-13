import { stringToCoins, TxResponse, TxResultCode } from "../src";
import { accounts, chain1LCD, waitForChainToStart } from "./utils";

require("ts-node").register({ transpileOnly: true });

module.exports = async () => {
  if (process.env.SKIP_LOCALSECRET === "true") {
    return;
  }

  console.log("\nWaiting for LocalSecret to start...");

  await waitForChainToStart({
    chainId: "secretdev-1",
    url: chain1LCD,
  });

  console.log("Funding test accounts...");

  // Send 100k SCRT from account a to each of accounts 3-19
  const { secretjs } = accounts[0];

  let tx: TxResponse;
  try {
    tx = await secretjs.tx.bank.multiSend(
      {
        inputs: [
          {
            address: accounts[0].address,
            coins: stringToCoins(
              `${10_000 * 1e6 * (accounts.length - 3)}uscrt`,
            ),
          },
        ],
        outputs: accounts.slice(3).map(({ address }) => ({
          address,
          coins: stringToCoins(`${10_000 * 1e6}uscrt`),
        })),
      },
      {
        broadcastCheckIntervalMs: 100,
        gasLimit: 200_000,
      },
    );

    if (tx.code !== TxResultCode.Success) {
      console.error(`Failed to multisend: ${tx.rawLog}`);
      throw new Error(`Failed to multisend: ${tx.rawLog}`);
    }
  } catch (e) {
    console.error(`Failed to multisend: ${JSON.stringify(e)}`);
    throw new Error(`Failed to multisend: ${JSON.stringify(e)}`);
  }
};
