import fs from "fs";
import {Permit, SecretNetworkClient, Tx, Wallet} from "../src";
import { AminoWallet } from "../src/wallet_amino";
import { Account, getValueFromRawLog } from "./utils";

// @ts-ignore
let accounts: Account[];

beforeAll(async () => {
  // @ts-ignore
  accounts = global.__SCRT_TEST_ACCOUNTS__;

  // Initialize genesis accounts
  const mnemonics = [
    "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
    "jelly shadow frog dirt dragon use armed praise universe win jungle close inmate rain oil canvas beauty pioneer chef soccer icon dizzy thunder meadow",
    "chair love bleak wonder skirt permit say assist aunt credit roast size obtain minute throw sand usual age smart exact enough room shadow charge",
    "word twist toast cloth movie predict advance crumble escape whale sail such angry muffin balcony keen move employ cook valve hurt glimpse breeze brick",
  ];

  for (let i = 0; i < mnemonics.length; i++) {
    const mnemonic = mnemonics[i];
    const walletAmino = new AminoWallet(mnemonic);
    accounts[i] = {
      address: walletAmino.address,
      mnemonic: mnemonic,
      walletAmino,
      walletProto: new Wallet(mnemonic),
      secretjs: await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        wallet: walletAmino,
        walletAddress: walletAmino.address,
        chainId: "secretdev-1",
      }),
    };
  }

  // Generate a bunch of accounts because tx.staking tests require creating a bunch of validators
  for (let i = 4; i <= 19; i++) {
    const wallet = new AminoWallet();
    const [{ address }] = await wallet.getAccounts();
    const walletProto = new Wallet(wallet.mnemonic);

    accounts[i] = {
      address: address,
      mnemonic: wallet.mnemonic,
      walletAmino: wallet,
      walletProto: walletProto,
      secretjs: await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        chainId: "secretdev-1",
        wallet: wallet,
        walletAddress: address,
      }),
    };
  }

  // Send 100k SCRT from account 0 to each of accounts 1-19

  const { secretjs } = accounts[0];

  let tx: Tx;
  try {
    tx = await secretjs.tx.bank.multiSend(
      {
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
      },
      {
        gasLimit: 200_000,
      },
    );
  } catch (e) {
    throw new Error(`Failed to multisend: ${e.stack}`);
  }

  if (tx.code !== 0) {
    console.error(`failed to multisend coins`);
    throw new Error("Failed to multisend coins to initial accounts");
  }
});

describe("permit", () => {
  test("sign", async () => {
    const { secretjs } = accounts[0];

    const txStore = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasmByteCode: fs.readFileSync(
          `${__dirname}/snip20-ibc.wasm.gz`,
        ) as Uint8Array,
        source: "",
        builder: "",
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(txStore.code).toBe(0);

    const codeId = Number(
      getValueFromRawLog(txStore.rawLog, "message.code_id"),
    );

    const {
      codeInfo: { codeHash },
    } = await secretjs.query.compute.code(codeId);

    const txInit = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        codeId,
        codeHash,
        initMsg: {
          name: "Secret SCRT",
          admin: accounts[0].address,
          symbol: "SSCRT",
          decimals: 6,
          initial_balances: [{ address: accounts[0].address, amount: "2" }],
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
      },
      {
        gasLimit: 5_000_000,
      },
    );
    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    let permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secret-2",
      "test",
      [contractAddress],
      ["owner", "balance"],
        false
    );

    let query = await secretjs.query.snip20.getBalance({
      contract: { address: contractAddress, codeHash },
      address: accounts[0].address,
      auth: { permit },
    });

    expect(query.balance.amount).toEqual("2");
  });

  test("invalid permit signature", async () => {
    const { secretjs } = accounts[0];

    let permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secret-2",
      "test",
      ["abcdef"],
      ["owner", "balance"],
        false
    );

    permit.signature = {
      signature: "afffffffffffffffffffff",
      pub_key: permit.signature.pub_key,
    };

    try {
      secretjs.utils.accessControl.permit.verify(
        permit,
        accounts[0].address,
        "abcdef",
        ["owner"],
      );
    } catch (e: any) {
      expect(e?.type).toBe("PermitError");
      return;
    }
    expect("This should have failed already").toBe("Not here");
  });

  test("contract not in permit", async () => {
    const { secretjs } = accounts[0];

    let permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secret-2",
      "test",
      ["abcdef"],
      ["owner", "balance"],
        false
    );

    permit.signature = {
      signature: "afffffffffffffffffffff",
      pub_key: permit.signature.pub_key,
    };

    try {
      secretjs.utils.accessControl.permit.verify(
        permit,
        accounts[0].address,
        "xxxxxxxxxxxxxxxxxxxxx",
        ["owner"],
      );
    } catch (e: any) {
      expect(e?.type).toBe("PermitError");
      return;
    }
    expect("This should have failed already").toBe("Not here");
  });

  test("permit address is not signer", async () => {
    const { secretjs } = accounts[0];

    let permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secret-2",
      "test",
      ["abcdef"],
      ["owner", "balance"],
        false
    );

    permit.signature = {
      signature: "afffffffffffffffffffff",
      pub_key: permit.signature.pub_key,
    };

    try {
      secretjs.utils.accessControl.permit.verify(
        permit,
        accounts[1].address,
        "abcdef",
        ["owner"],
      );
    } catch (e: any) {
      expect(e?.type).toBe("PermitError");
      return;
    }
    expect("This should have failed already").toBe("Not here");
  });

  test("pubkey does not match", async () => {
    const { secretjs } = accounts[0];
    const secretjs2 = accounts[1].secretjs;

    let permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secret-2",
      "test",
      ["abcdef"],
      ["owner", "balance"],
        false
    );

    let permit2 = await secretjs2.utils.accessControl.permit.sign(
      accounts[1].address,
      "secret-2",
      "test",
      ["abcdef"],
      ["owner", "balance"],
        false
    );

    permit.signature = permit2.signature;

    try {
      let res = secretjs.utils.accessControl.permit.verify(
        permit,
        accounts[0].address,
        "abcdef",
        ["owner"],
      );
      console.log(`result: ${res}`);
    } catch (e: any) {
      expect(e?.type).toBe("PermitError");
      return;
    }
    expect("This should have failed already").toBe("Not here");
  });

  test("validatePermit", async () => {
    const { secretjs } = accounts[0];
    const secretjs2 = accounts[1].secretjs;

    let permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secret-2",
      "test",
      ["abcdef"],
      ["owner", "balance"],
        false
    );

    let result = secretjs.utils.accessControl.permit.verifyNoExcept(
      permit,
      accounts[0].address,
      "abcdef",
      ["owner"],
    );
    expect(result).toBeTruthy();
  });

  test("validatePermit Keplr Signing", async () => {
    const { secretjs } = accounts[0];
    let permit: Permit = {"params":{"chain_id":"secret-4","permit_name":"default","allowed_tokens":["secret1p0vgghl8rw4ukzm7geyy0f0tl29glxrtnlalue"],"permissions":["owner"]},"signature":{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"AgyShSTNVC3olnm/VAPUvrN5IbGrqe1oH+E5/H3F9SUB"},"signature":"c7t302ZD08RR9nRi3J1zx7YV3+KZc/C3HbG+IXF8jalH2n6x4WWM1Iaphx8P0dDoJoNyWDMq3SBhe10lWkCy0w=="}}

    let result = secretjs.utils.accessControl.permit.verify(
        permit,
        "secret1p0vgghl8rw4ukzm7geyy0f0tl29glxrtnlalue",
        "secret1p0vgghl8rw4ukzm7geyy0f0tl29glxrtnlalue",
        ["owner"],
    );
    expect(result).toBeTruthy();

  });
});
