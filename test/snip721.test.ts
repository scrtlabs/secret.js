import { fromUtf8 } from "@cosmjs/encoding";
import { bech32 } from "bech32";
import fs from "fs";
import { MsgExecuteContract, SecretNetworkClient, Tx, Wallet } from "../src";
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

describe("tx.snip721", () => {
  test("Send", async () => {
    const { secretjs } = accounts[0];

    const txStore = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasmByteCode: fs.readFileSync(
          `${__dirname}/snip721.wasm.gz`,
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
        // codeHash, // Test MsgInstantiateContract without codeHash
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
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(txInit.code).toBe(0);

    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "wasm.contract_address",
    );

    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    const addMinterMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contractAddress,
      // codeHash, // Test MsgExecuteContract without codeHash
      msg: { add_minters: { minters: [accounts[0].address] } },
      sentFunds: [],
    });

    const mintMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contractAddress,
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
    });

    const txExec = await secretjs.tx.snip721.send(
      {
        sender: secretjs.address,
        contractAddress,
        msg: {
          send_nft: {
            contract: accounts[1].address,
            token_id: "1",
          },
        },
      },
      {
        gasLimit: 50_000,
      },
    );

    expect(fromUtf8(txExec.data[0])).toContain(
      '{"send_nft":{"status":"success"}}',
    );
  });

  test("Add Minters", async () => {
    const { secretjs } = accounts[0];

    const txStore = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasmByteCode: fs.readFileSync(
          `${__dirname}/snip721.wasm.gz`,
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
        // codeHash, // Test MsgInstantiateContract without codeHash
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
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(txInit.code).toBe(0);

    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "wasm.contract_address",
    );

    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    const addMinterMsg = await secretjs.tx.snip721.addMinter(
      {
        contractAddress,
        msg: { add_minters: { minters: [accounts[0].address] } },
        sender: accounts[0].address,
      },
      {
        gasLimit: 100_000,
      },
    );

    expect(fromUtf8(addMinterMsg.data[0])).toContain(
      '{"add_minters":{"status":"success"}}',
    );
  });

  test("Mint", async () => {
    const { secretjs } = accounts[0];

    const txStore = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasmByteCode: fs.readFileSync(
          `${__dirname}/snip721.wasm.gz`,
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
        // codeHash, // Test MsgInstantiateContract without codeHash
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
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(txInit.code).toBe(0);

    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "wasm.contract_address",
    );

    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    const addMinterMsg = await secretjs.tx.snip721.addMinter(
      {
        contractAddress,
        msg: { add_minters: { minters: [accounts[0].address] } },
        sender: accounts[0].address,
      },
      {
        gasLimit: 100_000,
      },
    );

    expect(fromUtf8(addMinterMsg.data[0])).toContain(
      '{"add_minters":{"status":"success"}}',
    );

    const mintMsg = await secretjs.tx.snip721.mint(
      {
        contractAddress,
        sender: accounts[0].address,
        msg: {
          mint_nft: {
            token_id: "1",
          },
        },
      },
      {
        gasLimit: 200_000,
      },
    );

    expect(fromUtf8(mintMsg.data[0])).toContain(
      '{"mint_nft":{"token_id":"1"}}',
    );
  });
});

describe("query.snip721", () => {
  test("View Tokens", async () => {
    const { secretjs } = accounts[0];

    const txStore = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasmByteCode: fs.readFileSync(
          `${__dirname}/snip721.wasm.gz`,
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
        // codeHash, // Test MsgInstantiateContract without codeHash
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
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(txInit.code).toBe(0);

    const contractAddress = getValueFromRawLog(
      txInit.rawLog,
      "wasm.contract_address",
    );

    expect(contractAddress).toBe(
      bech32.encode("secret", bech32.toWords(txInit.data[0])),
    );

    await secretjs.tx.snip721.setViewingKey(
      {
        contractAddress,
        sender: accounts[0].address,
        msg: {
          set_viewing_key: {
            key: "hello",
          },
        },
      },
      {
        gasLimit: 100_000,
      },
    );

    await secretjs.tx.snip721.addMinter(
      {
        contractAddress,
        msg: { add_minters: { minters: [accounts[0].address] } },
        sender: accounts[0].address,
      },
      {
        gasLimit: 100_000,
      },
    );

    await secretjs.tx.snip721.mint(
      {
        contractAddress,
        sender: accounts[0].address,
        msg: {
          mint_nft: {
            token_id: "1",
          },
        },
      },
      {
        gasLimit: 200_000,
      },
    );

    let tokens = await secretjs.query.snip721.GetOwnedTokens({
      contract: { address: contractAddress, codeHash },
      owner: accounts[0].address,
      auth: { viewer: { viewing_key: "hello", address: accounts[0].address } },
    });

    expect(tokens.token_list.tokens.length).toEqual(1);
  });
});
