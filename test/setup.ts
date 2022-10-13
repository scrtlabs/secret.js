// don't know why this doesn't work... fu jest
(async () => {
  console.warn = () => {};
  // console.log(`Setting up accounts...`);
  // let accounts: Account[] = [];
  //
  // // Extract genesis accounts from logs
  // const accountIdToName = ["a", "b", "c", "d"];
  // const { stdout: dockerLogsStdout } = await exec(
  //   "docker logs localsecret",
  //   { maxBuffer: 10 * 1024 * 1024 /* 10 MiB */ },
  // );
  // const logs = String(dockerLogsStdout);
  // for (const accountId of [0, 1, 2, 3]) {
  //   if (!accounts[accountId]) {
  //     const match = logs.match(
  //       getMnemonicRegexForAccountName(accountIdToName[accountId]),
  //     );
  //     if (match) {
  //       const parsedAccount = JSON.parse(match[0]) as Account;
  //       parsedAccount.walletAmino = new AminoWallet(parsedAccount.mnemonic);
  //       parsedAccount.walletProto = new Wallet(parsedAccount.mnemonic);
  //       parsedAccount.secretjs = new SecretNetworkClient({
  //         url: "http://localhost:1317",
  //         wallet: parsedAccount.walletAmino,
  //         walletAddress: parsedAccount.address,
  //         chainId: "secretdev-1",
  //       });
  //       accounts[accountId] = parsedAccount as Account;
  //     }
  //   }
  // }
  //
  // console.log(`Done 1st step`);
  // // Generate a bunch of accounts because tx.staking tests require creating a bunch of validators
  // for (let i = 4; i <= 19; i++) {
  //   const wallet = new AminoWallet();
  //   const [{ address, pubkey }] = await wallet.getAccounts();
  //   const walletProto = new Wallet(wallet.mnemonic);
  //
  //   accounts[i] = {
  //     name: String(i),
  //     type: "generated for fun",
  //     address: address,
  //     pubkey: JSON.stringify({
  //       "@type": "cosmos.crypto.secp256k1.PubKey",
  //       key: toBase64(pubkey),
  //     }),
  //     mnemonic: wallet.mnemonic,
  //     walletAmino: wallet,
  //     walletProto: walletProto,
  //     secretjs: new SecretNetworkClient({
  //       url: "http://localhost:1317",
  //       wallet: wallet,
  //       walletAddress: address,
  //       chainId: "secretdev-1",
  //     }),
  //   };
  // }
  //
  // // expect(accounts.length).toBe(20);
  //
  // // Send 100k SCRT from account 0 to each of accounts 1-19
  //
  // const { secretjs } = accounts[0];
  //
  // let tx: Tx;
  // try {
  //   tx = await secretjs.tx.bank.multiSend(
  //     {
  //       inputs: [
  //         {
  //           address: accounts[0].address,
  //           coins: [{ denom: "uscrt", amount: String(100_000 * 1e6 * 19) }],
  //         },
  //       ],
  //       outputs: accounts.slice(1).map(({ address }) => ({
  //         address,
  //         coins: [{ denom: "uscrt", amount: String(100_000 * 1e6) }],
  //       })),
  //     },
  //     {
  //       broadcastCheckIntervalMs: 100, gasLimit: 200_000,
  //     },
  //   );
  // } catch (e) {
  //   throw new Error(`Failed to multisend: ${e.stack}`);
  // }
  //
  // console.log(`Done 4th step`);
  // if (tx.code !== 0) {
  //   console.error(`failed to multisend coins`);
  //   throw new Error("Failed to multisend coins to initial accounts");
  // }
  //
  // for (let accountId = 0; accountId < 20; accountId++) {
  //   console.log(
  //     `account[${accountId}]:\n${JSON.stringify(
  //       {
  //         ...accounts[accountId],
  //         walletAmino: undefined, // don't flood the screen with wallet object internals
  //         walletProto: undefined, // don't flood the screen with wallet object internals
  //         secretjs: undefined, // don't flood the screen with secretjs object internals
  //       },
  //       null,
  //       2,
  //     )}`,
  //   );
  // }
  //
  // console.log(`setting: global.__SCRT_TEST_ACCOUNTS__ ${accounts}`);
  // //@ts-ignore
  // global.__SCRT_TEST_ACCOUNTS__ = accounts;
})();
