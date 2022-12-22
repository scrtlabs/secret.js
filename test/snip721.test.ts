import { fromUtf8 } from "@cosmjs/encoding";
import { jest } from "@jest/globals";
import fs from "fs";
import {
  MsgExecuteContract,
  SecretNetworkClient,
  TxResponse,
  TxResultCode,
  Wallet,
} from "../src";
import {
  MsgExecuteContractResponse,
  MsgInstantiateContractResponse,
} from "../src/protobuf/secret/compute/v1beta1/msg";
import { AminoWallet } from "../src/wallet_amino";
import { Account, getValueFromRawLog } from "./utils";

//@ts-ignore
let accounts: Account[];

beforeAll(async () => {
  jest.spyOn(console, "warn").mockImplementation(() => {});

  //@ts-ignore
  accounts = global.__SCRT_TEST_ACCOUNTS__;

  // Initialize genesis accounts
  const mnemonics = [
    "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar", // account a
    "jelly shadow frog dirt dragon use armed praise universe win jungle close inmate rain oil canvas beauty pioneer chef soccer icon dizzy thunder meadow", // account b
    "chair love bleak wonder skirt permit say assist aunt credit roast size obtain minute throw sand usual age smart exact enough room shadow charge", // account c
    // account d is used by ts-relayer
  ];

  for (let i = 0; i < mnemonics.length; i++) {
    const mnemonic = mnemonics[i];
    const walletAmino = new AminoWallet(mnemonic);
    accounts[i] = {
      address: walletAmino.address,
      mnemonic: mnemonic,
      walletAmino,
      walletProto: new Wallet(mnemonic),
      secretjs: new SecretNetworkClient({
        url: "http://localhost:1317",
        wallet: walletAmino,
        walletAddress: walletAmino.address,
        chainId: "secretdev-1",
      }),
    };
  }

  // Generate a bunch of accounts because tx.staking tests require creating a bunch of validators
  for (let i = 3; i <= 19; i++) {
    const wallet = new AminoWallet();
    const [{ address }] = await wallet.getAccounts();
    const walletProto = new Wallet(wallet.mnemonic);

    accounts[i] = {
      address: address,
      mnemonic: wallet.mnemonic,
      walletAmino: wallet,
      walletProto: walletProto,
      secretjs: new SecretNetworkClient({
        url: "http://localhost:1317",
        chainId: "secretdev-1",
        wallet: wallet,
        walletAddress: address,
      }),
    };
  }

  // Send 100k SCRT from account 0 to each of accounts 1-19

  const { secretjs } = accounts[0];

  let tx: TxResponse;
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
    throw new Error(`Failed to multisend: ${JSON.stringify(e)}`);
  }

  if (tx.code !== TxResultCode.Success) {
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
        wasm_byte_code: fs.readFileSync(
          `${__dirname}/snip721.wasm.gz`,
        ) as Uint8Array,
        source: "",
        builder: "",
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    const txInit = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        // codeHash, // Test MsgInstantiateContract without codeHash
        init_msg: {
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
        init_funds: [],
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    const contract_address = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contract_address).toBe(
      MsgInstantiateContractResponse.decode(txInit.data[0]).address,
    );

    const addMinterMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contract_address,
      // codeHash, // Test MsgExecuteContract without codeHash
      msg: { add_minters: { minters: [accounts[0].address] } },
      sent_funds: [],
    });

    const mintMsg = new MsgExecuteContract({
      sender: accounts[0].address,
      contract_address,
      code_hash,
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
      sent_funds: [],
    });

    const tx = await secretjs.tx.broadcast([addMinterMsg, mintMsg], {
      gasLimit: 5_000_000,
    });
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    const txExec = await secretjs.tx.snip721.send(
      {
        sender: secretjs.address,
        contract_address,
        msg: {
          send_nft: {
            contract: accounts[1].address,
            token_id: "1",
          },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (txExec.code !== TxResultCode.Success) {
      console.error(txExec.rawLog);
    }
    expect(txExec.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(txExec.data[0]).data),
    ).toContain('{"send_nft":{"status":"success"}}');
  });

  test("Add Minters", async () => {
    const { secretjs } = accounts[0];

    const txStore = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasm_byte_code: fs.readFileSync(
          `${__dirname}/snip721.wasm.gz`,
        ) as Uint8Array,
        source: "",
        builder: "",
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id,
    });

    const txInit = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        // codeHash, // Test MsgInstantiateContract without codeHash
        init_msg: {
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
        init_funds: [],
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    const contract_address = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );

    expect(contract_address).toBe(
      MsgInstantiateContractResponse.decode(txInit.data[0]).address,
    );

    const addMinterTx = await secretjs.tx.snip721.addMinter(
      {
        contract_address,
        msg: { add_minters: { minters: [accounts[0].address] } },
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (addMinterTx.code !== TxResultCode.Success) {
      console.error(addMinterTx.rawLog);
    }
    expect(addMinterTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(addMinterTx.data[0]).data),
    ).toContain('{"add_minters":{"status":"success"}}');
  });

  test("Mint", async () => {
    const { secretjs } = accounts[0];

    const txStore = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasm_byte_code: fs.readFileSync(
          `${__dirname}/snip721.wasm.gz`,
        ) as Uint8Array,
        source: "",
        builder: "",
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
      code_id: code_id,
    });

    const txInit = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        // codeHash, // Test MsgInstantiateContract without codeHash
        init_msg: {
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
        init_funds: [],
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    const contract_address = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contract_address).toBe(
      MsgInstantiateContractResponse.decode(txInit.data[0]).address,
    );

    const addMinterTx = await secretjs.tx.snip721.addMinter(
      {
        contract_address,
        msg: { add_minters: { minters: [accounts[0].address] } },
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (addMinterTx.code !== TxResultCode.Success) {
      console.error(addMinterTx.rawLog);
    }
    expect(addMinterTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(addMinterTx.data[0]).data),
    ).toContain('{"add_minters":{"status":"success"}}');

    const mintTx = await secretjs.tx.snip721.mint(
      {
        contract_address,
        sender: accounts[0].address,
        msg: {
          mint_nft: {
            token_id: "1",
          },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (mintTx.code !== TxResultCode.Success) {
      console.error(mintTx.rawLog);
    }
    expect(mintTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(mintTx.data[0]).data),
    ).toContain('{"mint_nft":{"token_id":"1"}}');
  });
});

describe("query.snip721", () => {
  test("View Tokens", async () => {
    const { secretjs } = accounts[0];

    const txStore = await secretjs.tx.compute.storeCode(
      {
        sender: accounts[0].address,
        wasm_byte_code: fs.readFileSync(
          `${__dirname}/snip721.wasm.gz`,
        ) as Uint8Array,
        source: "",
        builder: "",
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (txStore.code !== TxResultCode.Success) {
      console.error(txStore.rawLog);
    }
    expect(txStore.code).toBe(TxResultCode.Success);

    const code_id = getValueFromRawLog(txStore.rawLog, "message.code_id");

    const { code_hash: codeHash } =
      await secretjs.query.compute.codeHashByCodeId({
        code_id,
      });

    const txInit = await secretjs.tx.compute.instantiateContract(
      {
        sender: accounts[0].address,
        code_id,
        // codeHash, // Test MsgInstantiateContract without codeHash
        init_msg: {
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
        init_funds: [],
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (txInit.code !== TxResultCode.Success) {
      console.error(txInit.rawLog);
    }
    expect(txInit.code).toBe(TxResultCode.Success);

    const contract_address = getValueFromRawLog(
      txInit.rawLog,
      "message.contract_address",
    );
    expect(contract_address).toBe(
      MsgInstantiateContractResponse.decode(txInit.data[0]).address,
    );

    let tx = await secretjs.tx.snip721.setViewingKey(
      {
        contract_address,
        sender: accounts[0].address,
        msg: {
          set_viewing_key: {
            key: "hello",
          },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    tx = await secretjs.tx.snip721.addMinter(
      {
        contract_address,
        msg: { add_minters: { minters: [accounts[0].address] } },
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    tx = await secretjs.tx.snip721.mint(
      {
        contract_address,
        sender: accounts[0].address,
        msg: {
          mint_nft: {
            token_id: "1",
          },
        },
      },
      {
        gasLimit: 5_000_000,
      },
    );
    if (tx.code !== TxResultCode.Success) {
      console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    const tokens = await secretjs.query.snip721.GetOwnedTokens({
      contract: { address: contract_address, codeHash: codeHash! },
      owner: accounts[0].address,
      auth: { viewer: { viewing_key: "hello", address: accounts[0].address } },
    });

    expect(tokens.token_list.tokens.length).toEqual(1);

    const permit = await secretjs.utils.accessControl.permit.sign(
      accounts[0].address,
      "secretdev-1",
      "Test",
      [contract_address],
      ["owner"],
      false,
    );

    const tokens2 = await secretjs.query.snip721.GetOwnedTokens({
      contract: { address: contract_address, codeHash: codeHash! },
      owner: accounts[0].address,
      auth: { permit: permit },
    });

    expect(tokens2.token_list.tokens.length).toEqual(1);
  });
});
