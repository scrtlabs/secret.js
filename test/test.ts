import { toBase64 } from "@cosmjs/encoding";
import { bech32 } from "bech32";
import fs from "fs";
import util from "util";
import {
  BaseAccount,
  BondStatus,
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgDeposit,
  MsgEditValidator,
  MsgExecuteContract,
  MsgFundCommunityPool,
  MsgInstantiateContract,
  MsgMultiSend,
  MsgSend,
  MsgSetWithdrawAddress,
  MsgStoreCode,
  MsgSubmitProposal,
  MsgUndelegate,
  MsgUnjail,
  MsgVote,
  MsgVoteWeighted,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
  Proposal,
  ProposalStatus,
  ProposalType,
  SecretNetworkClient,
  SecretSecp256k1HdWallet,
  VoteOption,
} from "../src";
import { gasToFee } from "../src/secret_network_client";

const exec = util.promisify(require("child_process").exec);

type Account = {
  name: string;
  type: string;
  address: string;
  pubkey: string;
  mnemonic: string;
  wallet: SecretSecp256k1HdWallet;
  secretjs: SecretNetworkClient;
};

const accounts: Account[] = [];

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getMnemonicRegexForAccountName(account: string) {
  return new RegExp(`{"name":"${account}".+?"mnemonic":".+?"}`);
}

function getValueFromRawLog(rawLog: string | undefined, key: string): string {
  if (!rawLog) {
    return "";
  }

  for (const l of JSON.parse(rawLog)) {
    for (const e of l.events) {
      for (const a of e.attributes) {
        if (`${e.type}.${a.key}` === key) {
          return String(a.value);
        }
      }
    }
  }

  return "";
}

async function waitForTx(txhash: string): Promise<any> {
  while (true) {
    try {
      const { stdout } = await exec(
        `docker exec -i secretjs-testnet secretd q tx ${txhash}`,
      );

      if (Number(JSON.parse(stdout)?.code) === 0) {
        return JSON.parse(stdout);
      }
    } catch (error) {
      // console.error("q tx:", error);
    }

    await sleep(1000);
  }
}

async function secretcliStore(
  wasmPath: string,
  account: Account,
): Promise<number> {
  const { stdout: cp_wasm, stderr } = await exec(
    `docker cp "${wasmPath}" secretjs-testnet:/wasm-file`,
  );

  const { stdout: secretcli_store } = await exec(
    `docker exec -i secretjs-testnet secretd tx compute store /wasm-file --from "${account.name}" --gas 10000000 -y`,
  );
  const { txhash }: { txhash: string } = JSON.parse(secretcli_store);

  const tx = await waitForTx(txhash);

  return Number(
    tx.logs[0].events[0].attributes.find(
      (a: { key: string; value: string }) => a.key === "code_id",
    ).value,
  );
}

async function secretcliInit(
  codeId: number,
  initMsg: object,
  label: string,
  account: Account,
): Promise<string> {
  const { stdout: secretcli_store } = await exec(
    `docker exec -i secretjs-testnet secretd tx compute instantiate ${codeId} '${JSON.stringify(
      initMsg,
    )}' --label "${label}" --from "${account.name}" --gas 500000 -y`,
  );
  const { txhash }: { txhash: string } = JSON.parse(secretcli_store);

  const tx = await waitForTx(txhash);

  return String(
    tx.logs[0].events[0].attributes.find(
      (a: { key: string; value: string }) => a.key === "contract_address",
    ).value,
  );
}

async function getBalance(
  secretjs: SecretNetworkClient,
  address: string,
): Promise<bigint> {
  const response = await secretjs.query.bank.balance({
    address,
    denom: "uscrt",
  });

  if (response.balance) {
    return BigInt(response.balance.amount);
  } else {
    return BigInt(0);
  }
}

beforeAll(async () => {
  try {
    // init testnet
    console.log("Setting up a local testnet...");
    await exec("docker rm -f secretjs-testnet || true");
    const { /* stdout, */ stderr } = await exec(
      "docker run -it -d -p 26657:26657 -p 26656:26656 -p 1317:1317 --name secretjs-testnet enigmampc/secret-network-sw-dev:v1.2.2-1",
    );
    // console.log("stdout (testnet container id?):", stdout);
    if (stderr) {
      console.error("stderr:", stderr);
    }

    // Wait for the network to start (i.e. block number >= 1)
    console.log("Waiting for the network to start...");

    const timeout = Date.now() + 30_000;
    while (true) {
      expect(Date.now()).toBeLessThan(timeout);

      try {
        const { stdout: status } = await exec(
          "docker exec -i secretjs-testnet secretd status",
        );

        const resp = JSON.parse(status);

        if (Number(resp?.SyncInfo?.latest_block_height) >= 1) {
          break;
        }
      } catch (e) {
        // console.error(e);
      }
      await sleep(250);
    }

    // Extract genesis accounts from logs
    const accountIdToName = ["a", "b", "c", "d"];
    const { stdout: dockerLogsStdout } = await exec(
      "docker logs secretjs-testnet",
    );
    const logs = String(dockerLogsStdout);
    for (const accountId of [0, 1, 2, 3]) {
      if (!accounts[accountId]) {
        const match = logs.match(
          getMnemonicRegexForAccountName(accountIdToName[accountId]),
        );
        if (match) {
          const parsedAccount = JSON.parse(match[0]);
          parsedAccount.wallet = await SecretSecp256k1HdWallet.fromMnemonic(
            parsedAccount.mnemonic,
          );
          parsedAccount.secretjs = await SecretNetworkClient.create(
            "http://localhost:26657",
            {
              signer: parsedAccount.wallet,
              signerAddress: parsedAccount.address,
              chainId: "secretdev-1",
            },
          );
          accounts[accountId] = parsedAccount as Account;
        }
      }
    }

    // Generate a bunch of accounts because tx.staking tests require creating a bunch of validators
    for (let i = 4; i <= 19; i++) {
      const wallet = await SecretSecp256k1HdWallet.generate();
      const [{ address, pubkey }] = await wallet.getAccounts();

      accounts[i] = {
        name: String(i),
        type: "generated for fun",
        address: address,
        pubkey: JSON.stringify({
          "@type": "cosmos.crypto.secp256k1.PubKey",
          key: toBase64(pubkey),
        }),
        mnemonic: wallet.mnemonic,
        wallet: wallet,
        secretjs: await SecretNetworkClient.create("http://localhost:26657", {
          signer: wallet,
          signerAddress: address,
          chainId: "secretdev-1",
        }),
      };
    }

    expect(accounts.length).toBe(20);

    // Send 100k SCRT from account 0 to each of accounts 1-19
    const msgMultiSend = new MsgMultiSend({
      inputs: [
        {
          address: accounts[0].address,
          coins: [{ denom: "uscrt", amount: String(100_000 * 1e6 * 19) }],
        },
      ],
      outputs: accounts.slice(1).map(({ address }) => ({
        address,
        coins: [{ denom: "uscrt", amount: String(100_000 * 1e6) }],
      })),
    });

    const { secretjs } = accounts[0];

    const tx = await secretjs.tx.broadcast([msgMultiSend], {
      gasLimit: 200_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);

    for (let accountId = 0; accountId < 20; accountId++) {
      console.log(
        `account[${accountId}]:\n${JSON.stringify(
          {
            ...accounts[accountId],
            wallet: undefined, // don't flood the screen with wallet object internals
            secretjs: undefined, // don't flood the screen with secretjs object internals
          },
          null,
          2,
        )}`,
      );
    }
  } catch (e) {
    console.error("Setup failed:", e);
  }
}, 45_000);

afterAll(async () => {
  try {
    console.log("Tearing down local testnet...");
    const { stdout, stderr } = await exec("docker rm -f secretjs-testnet");
    // console.log("stdout (testnet container name?):", stdout);
    if (stderr) {
      console.error("stderr:", stderr);
    }
  } catch (e) {
    console.error("Teardown failed:", e);
  }
});

describe("query.auth", () => {
  test("accounts()", async () => {
    const { secretjs } = accounts[0];

    const result = await secretjs.query.auth.accounts({});

    // 20 accounts with a balance and 7 module accounts
    expect(result.length).toBe(27);
    expect(result.filter((x) => x?.type === "ModuleAccount").length).toBe(7);
    expect(result.filter((x) => x?.type === "BaseAccount").length).toBe(20);
    expect(
      result.filter((x) => {
        if (x?.type !== "BaseAccount") {
          return false;
        }

        const account = x.account as BaseAccount;

        return (
          account.address === accounts[0].address ||
          account.address === accounts[1].address
        );
      }).length,
    ).toBe(2);
  });

  test("account()", async () => {
    const { secretjs } = accounts[0];

    const response = await secretjs.query.auth.account({
      address: accounts[1].address,
    });

    if (!response) {
      fail(`Account "${accounts[1].address}" should exist`);
    }

    expect(response.type).toBe("BaseAccount");

    const account = response.account as BaseAccount;

    expect(account.address).toBe(accounts[1].address);
    expect(account.accountNumber).toBe("1");
    expect(account.sequence).toBe("0");
  });

  test("params()", async () => {
    const { secretjs } = accounts[0];

    const response = await secretjs.query.auth.params();
    expect(response).toEqual({
      params: {
        maxMemoCharacters: "256",
        sigVerifyCostEd25519: "590",
        sigVerifyCostSecp256k1: "1000",
        txSigLimit: "7",
        txSizeCostPerByte: "10",
      },
    });
  });
});

describe("query.compute", () => {
  let sSCRT: string;

  beforeAll(async () => {
    const codeId = await secretcliStore(
      `${__dirname}/snip20-ibc.wasm.gz`,
      accounts[0],
    );

    sSCRT = await secretcliInit(
      codeId,
      {
        name: "Secret SCRT",
        admin: accounts[0].address,
        symbol: "SSCRT",
        decimals: 6,
        initial_balances: [{ address: accounts[0].address, amount: "1" }],
        prng_seed: "eW8=",
        config: {
          public_total_supply: true,
          enable_deposit: true,
          enable_redeem: true,
          enable_mint: false,
          enable_burn: false,
        },
        supported_denoms: ["uscrt"],
      },
      "sSCRT",
      accounts[0],
    );
  });

  test("queryContract()", async () => {
    const { secretjs } = accounts[0];

    const {
      codeInfo: { codeHash },
    } = await secretjs.query.compute.code(1);

    type Result = {
      token_info: {
        decimals: number;
        name: string;
        symbol: string;
        total_supply: string;
      };
    };

    const result = (await secretjs.query.compute.queryContract({
      address: sSCRT,
      codeHash,
      query: { token_info: {} },
    })) as Result;

    expect(result).toEqual({
      token_info: {
        decimals: 6,
        name: "Secret SCRT",
        symbol: "SSCRT",
        total_supply: "1",
      },
    });
  });
});

describe("tx.bank", () => {
  test("MsgSend", async () => {
    const { secretjs } = accounts[0];

    const aBefore = await getBalance(secretjs, accounts[0].address);
    const cBefore = await getBalance(secretjs, accounts[2].address);

    const gasLimit = 20_000;
    const msg = new MsgSend({
      fromAddress: accounts[0].address,
      toAddress: accounts[2].address,
      amount: [{ denom: "uscrt", amount: "1" }],
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: gasLimit,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);

    const aAfter = await getBalance(secretjs, accounts[0].address);
    const cAfter = await getBalance(secretjs, accounts[2].address);

    expect(aBefore - aAfter).toBe(BigInt(1) + BigInt(gasToFee(gasLimit, 0.25)));
    expect(cAfter - cBefore).toBe(BigInt(1));
  });

  test("MsgMultiSend", async () => {
    const { secretjs } = accounts[0];

    const aBefore = await getBalance(secretjs, accounts[0].address);
    const bBefore = await getBalance(secretjs, accounts[1].address);
    const cBefore = await getBalance(secretjs, accounts[2].address);

    const gasLimit = 20_000;
    const msg = new MsgMultiSend({
      inputs: [
        {
          address: accounts[0].address,
          coins: [{ denom: "uscrt", amount: "2" }],
        },
      ],
      outputs: [
        {
          address: accounts[1].address,
          coins: [{ denom: "uscrt", amount: "1" }],
        },
        {
          address: accounts[2].address,
          coins: [{ denom: "uscrt", amount: "1" }],
        },
      ],
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: gasLimit,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);

    const aAfter = await getBalance(secretjs, accounts[0].address);
    const bAfter = await getBalance(secretjs, accounts[1].address);
    const cAfter = await getBalance(secretjs, accounts[2].address);

    expect(aBefore - aAfter).toBe(BigInt(2) + BigInt(gasToFee(gasLimit, 0.25)));
    expect(bAfter - bBefore).toBe(BigInt(1));
    expect(cAfter - cBefore).toBe(BigInt(1));
  });
});

describe("tx.compute", () => {
  test("MsgStoreCode", async () => {
    const { secretjs } = accounts[0];

    const msg = new MsgStoreCode({
      sender: accounts[0].address,
      wasmByteCode: fs.readFileSync(
        `${__dirname}/snip20-ibc.wasm.gz`,
      ) as Uint8Array,
      source: "",
      builder: "",
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);
    expect(
      Number(getValueFromRawLog(tx.rawLog, "message.code_id")),
    ).toBeGreaterThan(0);
  });

  test("MsgInstantiateContract", async () => {
    const { secretjs } = accounts[0];

    const msgStore = new MsgStoreCode({
      sender: accounts[0].address,
      wasmByteCode: fs.readFileSync(
        `${__dirname}/snip20-ibc.wasm.gz`,
      ) as Uint8Array,
      source: "",
      builder: "",
    });

    const txStore = await secretjs.tx.broadcast([msgStore], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(txStore.code).toBe(0);

    const codeId = Number(
      getValueFromRawLog(txStore.rawLog, "message.code_id"),
    );

    const {
      codeInfo: { codeHash },
    } = await secretjs.query.compute.code(codeId);

    const msg = new MsgInstantiateContract({
      sender: accounts[0].address,
      codeId,
      codeHash,
      initMsg: {
        name: "Secret SCRT",
        admin: accounts[0].address,
        symbol: "SSCRT",
        decimals: 6,
        initial_balances: [{ address: accounts[0].address, amount: "1" }],
        prng_seed: "eW8=",
        config: {
          public_total_supply: true,
          enable_deposit: true,
          enable_redeem: true,
          enable_mint: false,
          enable_burn: false,
        },
        supported_denoms: ["uscrt"],
      },
      label: `label-${Date.now()}`,
      initFunds: [],
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);

    expect(getValueFromRawLog(tx.rawLog, "message.action")).toBe("instantiate");
    expect(getValueFromRawLog(tx.rawLog, "message.contract_address")).toContain(
      "secret1",
    );
  });

  test("MsgExecuteContract", async () => {
    const { secretjs } = accounts[0];

    const msgStore = new MsgStoreCode({
      sender: accounts[0].address,
      wasmByteCode: fs.readFileSync(
        `${__dirname}/snip721.wasm.gz`,
      ) as Uint8Array,
      source: "",
      builder: "",
    });

    const txStore = await secretjs.tx.broadcast([msgStore], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(txStore.code).toBe(0);

    const codeId = Number(
      getValueFromRawLog(txStore.rawLog, "message.code_id"),
    );

    const {
      codeInfo: { codeHash },
    } = await secretjs.query.compute.code(codeId);

    const msgInit = new MsgInstantiateContract({
      sender: accounts[0].address,
      codeId,
      codeHash,
      initMsg: {
        name: "SecretJS NFTs",
        symbol: "YOLO",
        admin: accounts[0].address,
        entropy: "a2FraS1waXBpCg==",
        royalty_info: {
          decimal_places_in_rates: 4,
          royalties: [{ recipient: accounts[0].address, rate: 700 }],
        },
        config: { public_token_supply: true },
      },
      label: `label-${Date.now()}`,
      initFunds: [],
    });

    const txInit = await secretjs.tx.broadcast([msgInit], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(txInit.code).toBe(0);

    const contract = getValueFromRawLog(txInit.rawLog, "wasm.contract_address");

    const addMinterMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contract,
      codeHash,
      msg: { add_minters: { minters: [accounts[0].address] } },
      sentFunds: [],
    });

    const mintMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contract,
      codeHash,
      msg: {
        mint_nft: {
          token_id: "1",
          owner: accounts[0].address,
          public_metadata: {
            extension: {
              image:
                "https://scrt.network/secretnetwork-logo-secondary-black.png",
              name: "secretnetwork-logo-secondary-black",
            },
          },
          private_metadata: {
            extension: {
              image:
                "https://scrt.network/secretnetwork-logo-primary-white.png",
              name: "secretnetwork-logo-primary-white",
            },
          },
        },
      },
      sentFunds: [],
    });

    const tx = await secretjs.tx.broadcast([addMinterMsg, mintMsg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);

    expect(getValueFromRawLog(tx.rawLog, "message.action")).toBe("execute");
    expect(getValueFromRawLog(tx.rawLog, "wasm.contract_address")).toBe(
      contract,
    );

    // Check decryption
    expect(tx.arrayLog![10].key).toBe("minted");
    expect(tx.arrayLog![10].value).toBe("1");
  });
});

describe("tx.gov", () => {
  async function getAllProposals(
    secretjs: SecretNetworkClient,
  ): Promise<Proposal[]> {
    const { proposals } = await secretjs.query.gov.proposals({
      proposalStatus: ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
      voter: "",
      depositor: "",
    });

    return proposals;
  }

  describe("MsgSubmitProposal", () => {
    test("TextProposal", async () => {
      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const msg = new MsgSubmitProposal({
        type: ProposalType.TextProposal,
        proposer: accounts[0].address,
        initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
        content: {
          title: "Hi",
          description: "Hello",
        },
      });

      const tx = await secretjs.tx.broadcast([msg], {
        gasLimit: 5_000_000,
        gasPriceInFeeDenom: 0.25,
        feeDenom: "uscrt",
      });

      expect(tx.code).toBe(0);

      expect(
        getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_type"),
      ).toBe("Text");

      expect(
        Number(getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_id")),
      ).toBeGreaterThanOrEqual(1);

      const proposalsAfter = await getAllProposals(secretjs);

      expect(proposalsAfter.length - proposalsBefore.length).toBe(1);
    });

    test("CommunityPoolSpendProposal", async () => {
      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const msg = new MsgSubmitProposal({
        type: ProposalType.CommunityPoolSpendProposal,
        proposer: accounts[0].address,
        initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
        content: {
          title: "Hi",
          description: "Hello",
          recipient: accounts[1].address,
          amount: [{ amount: "1", denom: "uscrt" }],
        },
      });

      const tx = await secretjs.tx.broadcast([msg], {
        gasLimit: 5_000_000,
        gasPriceInFeeDenom: 0.25,
        feeDenom: "uscrt",
      });

      expect(tx.code).toBe(0);

      expect(
        getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_type"),
      ).toBe("CommunityPoolSpend");
      expect(
        Number(getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_id")),
      ).toBeGreaterThanOrEqual(1);

      const proposalsAfter = await getAllProposals(secretjs);

      expect(proposalsAfter.length - proposalsBefore.length).toBe(1);
    });

    test("ParameterChangeProposal", async () => {
      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const msg = new MsgSubmitProposal({
        type: ProposalType.ParameterChangeProposal,
        proposer: accounts[0].address,
        initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
        content: {
          title: "Hi",
          description: "YOLO",
          changes: [
            { subspace: "auth", key: "MaxMemoCharacters", value: '"512"' },
          ],
        },
      });

      const tx = await secretjs.tx.broadcast([msg], {
        gasLimit: 5_000_000,
        gasPriceInFeeDenom: 0.25,
        feeDenom: "uscrt",
      });

      expect(tx.code).toBe(0);

      expect(
        getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_type"),
      ).toBe("ParameterChange");
      expect(
        Number(getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_id")),
      ).toBeGreaterThanOrEqual(1);

      const proposalsAfter = await getAllProposals(secretjs);

      expect(proposalsAfter.length - proposalsBefore.length).toBe(1);
    });

    test.skip("SoftwareUpgradeProposal", async () => {
      // TODO make this work
      // https://discord.com/channels/669268347736686612/680435043570941973/938352848905863178

      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const msg = new MsgSubmitProposal({
        type: ProposalType.SoftwareUpgradeProposal,
        proposer: accounts[0].address,
        initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
        content: {
          title: "Hi let's upgrade",
          description: "PROD NO FEAR",
          plan: {
            name: "Shockwave!",
            height: "1000000",
            info: "000000000019D6689C085AE165831E934FF763AE46A2A6C172B3F1B60A8CE26F",
          },
        },
      });

      const tx = await secretjs.tx.broadcast([msg], {
        gasLimit: 5_000_000,
        gasPriceInFeeDenom: 0.25,
        feeDenom: "uscrt",
      });

      expect(tx.code).toBe(0);

      expect(
        getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_type"),
      ).toBe("SoftwareUpgrade");
      expect(
        Number(getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_id")),
      ).toBeGreaterThanOrEqual(1);

      const proposalsAfter = await getAllProposals(secretjs);

      expect(proposalsAfter.length - proposalsBefore.length).toBe(1);
    });

    test("CancelSoftwareUpgradeProposal", async () => {
      const { secretjs } = accounts[0];

      const proposalsBefore = await getAllProposals(secretjs);

      const msg = new MsgSubmitProposal({
        type: ProposalType.CancelSoftwareUpgradeProposal,
        proposer: accounts[0].address,
        initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
        content: {
          title: "Hi let's cancel",
          description: "PROD FEAR",
        },
      });

      const tx = await secretjs.tx.broadcast([msg], {
        gasLimit: 5_000_000,
        gasPriceInFeeDenom: 0.25,
        feeDenom: "uscrt",
      });

      expect(tx.code).toBe(0);

      expect(
        getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_type"),
      ).toBe("CancelSoftwareUpgrade");
      expect(
        Number(getValueFromRawLog(tx.rawLog, "submit_proposal.proposal_id")),
      ).toBeGreaterThanOrEqual(1);

      const proposalsAfter = await getAllProposals(secretjs);

      expect(proposalsAfter.length - proposalsBefore.length).toBe(1);
    });
  });

  test("MsgVote", async () => {
    const { secretjs } = accounts[0];

    const msgSubmit = new MsgSubmitProposal({
      type: ProposalType.TextProposal,
      proposer: accounts[0].address,
      initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
      content: {
        title: "Please vote yes",
        description: "Please don't vote no",
      },
    });

    const txSubmit = await secretjs.tx.broadcast([msgSubmit], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(txSubmit.code).toBe(0);
    const proposalId = getValueFromRawLog(
      txSubmit.rawLog,
      "submit_proposal.proposal_id",
    );

    const msg = new MsgVote({
      voter: accounts[0].address,
      proposalId,
      option: VoteOption.VOTE_OPTION_YES,
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);

    expect(getValueFromRawLog(tx.rawLog, "proposal_vote.proposal_id")).toBe(
      proposalId,
    );
    expect(getValueFromRawLog(tx.rawLog, "proposal_vote.option")).toBe(
      '{"option":1,"weight":"1.000000000000000000"}',
    );
  });

  test("MsgVoteWeighted", async () => {
    const { secretjs } = accounts[0];

    const msgSubmit = new MsgSubmitProposal({
      type: ProposalType.TextProposal,
      proposer: accounts[0].address,
      initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
      content: {
        title: "Please vote yes",
        description: "Please don't vote no",
      },
    });

    const txSubmit = await secretjs.tx.broadcast([msgSubmit], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(txSubmit.code).toBe(0);
    const proposalId = getValueFromRawLog(
      txSubmit.rawLog,
      "submit_proposal.proposal_id",
    );

    // vote yes with 70% of my power
    const msg = new MsgVoteWeighted({
      voter: accounts[0].address,
      proposalId,
      options: [
        // weights must sum to 1.0
        { weight: 0.7, option: VoteOption.VOTE_OPTION_YES },
        { weight: 0.3, option: VoteOption.VOTE_OPTION_ABSTAIN },
      ],
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);

    expect(getValueFromRawLog(tx.rawLog, "proposal_vote.proposal_id")).toBe(
      proposalId,
    );
    expect(getValueFromRawLog(tx.rawLog, "proposal_vote.option")).toBe(
      '{"option":1,"weight":"0.700000000000000000"}\n{"option":2,"weight":"0.300000000000000000"}',
    );
  });

  test("MsgDeposit", async () => {
    const { secretjs } = accounts[0];

    const msgSubmit = new MsgSubmitProposal({
      type: ProposalType.TextProposal,
      proposer: accounts[0].address,
      initialDeposit: [],
      content: {
        title: "Hi",
        description: "Hello",
      },
    });

    const txSubmit = await secretjs.tx.broadcast([msgSubmit], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(txSubmit.code).toBe(0);
    const proposalId = getValueFromRawLog(
      txSubmit.rawLog,
      "submit_proposal.proposal_id",
    );

    const msg = new MsgDeposit({
      depositor: accounts[0].address,
      proposalId,
      amount: [{ amount: "1", denom: "uscrt" }],
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);

    const { deposit } = await secretjs.query.gov.deposit({
      depositor: accounts[0].address,
      proposalId,
    });

    expect(deposit?.amount).toEqual([{ amount: "1", denom: "uscrt" }]);
  });
});

describe("tx.staking", () => {
  test("MsgDelegate", async () => {
    const { secretjs } = accounts[0];

    const {
      validators: [{ operatorAddress: validatorAddress, tokens: tokensBefore }],
    } = await secretjs.query.staking.validators({ status: "" });

    const msg = new MsgDelegate({
      delegatorAddress: accounts[0].address,
      validatorAddress,
      amount: { amount: "1", denom: "uscrt" },
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);

    const {
      validators: [{ tokens: tokensAfter }],
    } = await secretjs.query.staking.validators({ status: "" });

    expect(BigInt(tokensAfter) - BigInt(tokensBefore)).toBe(BigInt(1));
  });

  test("MsgUndelegate", async () => {
    const { secretjs } = accounts[0];

    const {
      validators: [{ operatorAddress: validatorAddress, tokens: tokensBefore }],
    } = await secretjs.query.staking.validators({ status: "" });

    const msgDelegate = new MsgDelegate({
      delegatorAddress: accounts[0].address,
      validatorAddress,
      amount: { amount: "1", denom: "uscrt" },
    });

    const txDelegate = await secretjs.tx.broadcast([msgDelegate], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(txDelegate.code).toBe(0);
    const {
      validators: [{ tokens: tokensAfterDelegate }],
    } = await secretjs.query.staking.validators({ status: "" });
    expect(BigInt(tokensAfterDelegate) - BigInt(tokensBefore)).toBe(BigInt(1));

    const msg = new MsgUndelegate({
      delegatorAddress: accounts[0].address,
      validatorAddress,
      amount: { amount: "1", denom: "uscrt" },
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);
    const {
      validators: [{ tokens: tokensAfterUndelegate }],
    } = await secretjs.query.staking.validators({ status: "" });
    expect(tokensAfterUndelegate).toBe(tokensBefore);
  });

  test("MsgCreateValidator", async () => {
    const { secretjs } = accounts[1];

    const { validators: validatorsBefore } =
      await secretjs.query.staking.validators({ status: "" });

    const msg = new MsgCreateValidator({
      selfDelegatorAddress: accounts[1].address,
      commission: {
        maxChangeRate: 0.01,
        maxRate: 0.1,
        rate: 0.05,
      },
      description: {
        moniker: "banana",
        identity: "papaya",
        website: "watermelon.com",
        securityContact: "info@watermelon.com",
        details: "We are the banana papaya validator",
      },
      pubkey: toBase64(new Uint8Array(32).fill(1)),
      minSelfDelegation: "1",
      initialDelegation: { amount: "1", denom: "uscrt" },
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);

    const { validators: validatorsAfter } =
      await secretjs.query.staking.validators({ status: "" });

    expect(validatorsAfter.length - validatorsBefore.length).toBe(1);
  });

  test("MsgEditValidator", async () => {
    const { secretjs } = accounts[2];

    const msgCreateValidator = new MsgCreateValidator({
      selfDelegatorAddress: accounts[2].address,
      commission: {
        maxChangeRate: 0.01,
        maxRate: 0.1,
        rate: 0.05,
      },
      description: {
        moniker: "banana",
        identity: "papaya",
        website: "watermelon.com",
        securityContact: "info@watermelon.com",
        details: "We are the banana papaya validator",
      },
      pubkey: toBase64(new Uint8Array(32).fill(2)),
      minSelfDelegation: "2",
      initialDelegation: { amount: "3", denom: "uscrt" },
    });

    const txCreateValidator = await secretjs.tx.broadcast(
      [msgCreateValidator],
      {
        gasLimit: 5_000_000,
        gasPriceInFeeDenom: 0.25,
        feeDenom: "uscrt",
      },
    );

    expect(txCreateValidator.code).toBe(0);
    const validatorAddress = getValueFromRawLog(
      txCreateValidator.rawLog,
      "create_validator.validator",
    );

    const msg = new MsgEditValidator({
      validatorAddress,
      description: {
        moniker: "papaya",
        identity: "banana",
        website: "com.watermelon",
        securityContact: "as@com.com",
        details: "We are the banana papaya validator yay!",
      },
      minSelfDelegation: "3",
      // commissionRate: 0.04, // commission cannot be changed more than once in 24h
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);

    const { validators } = await secretjs.query.staking.validators({
      status: "",
    });

    const validator = validators.find(
      (v) => v.operatorAddress === validatorAddress,
    )!;

    expect(validator).toBeTruthy();
    expect(validator.description).toEqual({
      moniker: "papaya",
      identity: "banana",
      website: "com.watermelon",
      securityContact: "as@com.com",
      details: "We are the banana papaya validator yay!",
    });
    expect(validator.minSelfDelegation).toBe("3");
  });

  test("MsgBeginRedelegate", async () => {
    const msgCreateValidator = new MsgCreateValidator({
      selfDelegatorAddress: accounts[3].address,
      commission: {
        maxChangeRate: 0.01,
        maxRate: 0.1,
        rate: 0.05,
      },
      description: {
        moniker: "banana",
        identity: "papaya",
        website: "watermelon.com",
        securityContact: "info@watermelon.com",
        details: "We are the banana papaya validator",
      },
      pubkey: toBase64(new Uint8Array(32).fill(3)),
      minSelfDelegation: "2",
      initialDelegation: { amount: "3", denom: "uscrt" },
    });

    const txCreate = await accounts[3].secretjs.tx.broadcast(
      [msgCreateValidator],
      {
        gasLimit: 5_000_000,
        gasPriceInFeeDenom: 0.25,
        feeDenom: "uscrt",
      },
    );

    expect(txCreate.code).toBe(0);

    const { validators } = await accounts[3].secretjs.query.staking.validators({
      status: "",
    });

    const msgDelegate = new MsgDelegate({
      delegatorAddress: accounts[0].address,
      validatorAddress: validators[0].operatorAddress,
      amount: { amount: "1", denom: "uscrt" },
    });

    const txDelegate = await accounts[0].secretjs.tx.broadcast([msgDelegate], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(txDelegate.code).toBe(0);

    const msg = new MsgBeginRedelegate({
      delegatorAddress: accounts[0].address,
      validatorSrcAddress: validators[0].operatorAddress,
      validatorDstAddress: validators[1].operatorAddress,
      amount: { amount: "1", denom: "uscrt" },
    });

    const tx = await accounts[0].secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);
  });
});

describe("tx.slashing", () => {
  test("MsgUnjail", async () => {
    const { secretjs } = accounts[4];

    const msgCreateValidator = new MsgCreateValidator({
      selfDelegatorAddress: accounts[4].address,
      commission: {
        maxChangeRate: 0.01,
        maxRate: 0.1,
        rate: 0.05,
      },
      description: {
        moniker: "banana",
        identity: "papaya",
        website: "watermelon.com",
        securityContact: "info@watermelon.com",
        details: "We are the banana papaya validator",
      },
      pubkey: toBase64(new Uint8Array(32).fill(4)),
      minSelfDelegation: "2",
      initialDelegation: { amount: "3", denom: "uscrt" },
    });

    const txCreateValidator = await secretjs.tx.broadcast(
      [msgCreateValidator],
      {
        gasLimit: 5_000_000,
        gasPriceInFeeDenom: 0.25,
        feeDenom: "uscrt",
      },
    );

    expect(txCreateValidator.code).toBe(0);

    const validatorAddr = getValueFromRawLog(
      txCreateValidator.rawLog,
      "create_validator.validator",
    );

    const msgUnjail = new MsgUnjail({
      validatorAddr,
    });

    const txUnjail = await secretjs.tx.broadcast([msgUnjail], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    // To jail a validator we have to be inactive for 10 minutes.
    // This is too much for a test, so getting to "validator not jailed"
    // is far enough for to make sure that MsgUnjail goes through.
    expect(txUnjail.code).toBe(5);
    expect(txUnjail.rawLog).toContain("validator not jailed");
  });
});

describe("tx.distribution", () => {
  test("MsgFundCommunityPool", async () => {
    const { secretjs, address: depositor } = accounts[0];

    const msg = new MsgFundCommunityPool({
      depositor,
      amount: [{ amount: "1", denom: "uscrt" }],
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);
  });

  test("MsgWithdrawDelegatorReward", async () => {
    const { secretjs, address: delegatorAddress } = accounts[0];

    const {
      validators: [{ operatorAddress: validatorAddress }],
    } = await secretjs.query.staking.validators({ status: "" });

    const msgDelegate = new MsgDelegate({
      delegatorAddress,
      validatorAddress,
      amount: { amount: "1", denom: "uscrt" },
    });

    const txDelegate = await secretjs.tx.broadcast([msgDelegate], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(txDelegate.code).toBe(0);

    const msg = new MsgWithdrawDelegatorReward({
      delegatorAddress,
      validatorAddress,
    });

    const tx = await secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);
  });

  test("MsgWithdrawValidatorCommission", async () => {
    const { validators } = await accounts[0].secretjs.query.staking.validators({
      status: "",
    });
    const onlineValidator = validators.find(
      (v) => v.status === BondStatus.BOND_STATUS_BONDED,
    )!;
    const selfDelegator = bech32.encode(
      "secret",
      bech32.decode(onlineValidator.operatorAddress).words,
    );
    const selfDelegatorAccount = accounts.find(
      (a) => a.address === selfDelegator,
    )!;

    const msg = new MsgWithdrawValidatorCommission({
      validatorAddress: onlineValidator.operatorAddress,
    });

    const tx = await selfDelegatorAccount.secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);
  });

  test("MsgSetWithdrawAddress", async () => {
    const { validators } = await accounts[0].secretjs.query.staking.validators({
      status: "",
    });
    const onlineValidator = validators.find(
      (v) => v.status === BondStatus.BOND_STATUS_BONDED,
    )!;
    const selfDelegator = bech32.encode(
      "secret",
      bech32.decode(onlineValidator.operatorAddress).words,
    );
    const selfDelegatorAccount = accounts.find(
      (a) => a.address === selfDelegator,
    )!;
    const notSelfDelegatorAccount = accounts.find(
      (a) => a.address !== selfDelegator,
    )!;

    const msg = new MsgSetWithdrawAddress({
      delegatorAddress: selfDelegatorAccount.address,
      withdrawAddress: notSelfDelegatorAccount.address,
    });

    const tx = await selfDelegatorAccount.secretjs.tx.broadcast([msg], {
      gasLimit: 5_000_000,
      gasPriceInFeeDenom: 0.25,
      feeDenom: "uscrt",
    });

    expect(tx.code).toBe(0);
  });
});

test.skip("Webpack 5 compiles out of the box", async () => {});
test.skip("All Msgs are implemented", async () => {});
test.skip("All queries are implemented", async () => {});
