import fs from "fs";
import {
  fromUtf8,
  SecretNetworkClient,
  Tx,
  TxResultCode,
  Wallet,
} from "../src";
import {
  Snip1155AddCuratorOptions,
  Snip1155AddMinterOptions,
  Snip1155BatchSendOptions,
  Snip1155BatchTransferOptions,
  Snip1155BurnTokensOptions,
  Snip1155ChangeMetaDataOptions,
  Snip1155CurateTokensOptions,
  Snip1155InitMessageOptions,
  Snip1155MintTokensOptions,
  Snip1155RemoveMinterOptions,
  Snip1155SendOptions,
  Snip1155TransferOptions,
} from "../src/extensions/snip1155/types";
import { MsgExecuteContractResponse } from "../src/protobuf_stuff/secret/compute/v1beta1/msg";
import { AminoWallet } from "../src/wallet_amino";
import { Account, getValueFromRawLog } from "./utils";

let accounts: Account[];
let contractAddress: string;
let codeId: number;
let codeHash: string;

beforeAll(async () => {
  //@ts-ignore
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

beforeEach(async () => {
  const { secretjs } = accounts[0];

  // store smart contract on chain
  const txStore = await secretjs.tx.compute.storeCode(
    {
      sender: accounts[0].address,
      wasmByteCode: fs.readFileSync(
        `${__dirname}/snip1155.wasm.gz`,
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

  codeId = Number(getValueFromRawLog(txStore.rawLog, "message.code_id"));

  ({
    codeInfo: { codeHash },
  } = await secretjs.query.compute.code(codeId));

  const initMessage: Snip1155InitMessageOptions = {
    has_admin: true,
    curators: [accounts[0].address],
    initial_tokens: [
      {
        token_info: {
          token_id: "1",
          symbol: "MFT",
          name: "my first token",
          token_config: {
            fungible: {
              minters: [accounts[0].address],
              decimals: 8,
              public_total_supply: true,
              enable_mint: true,
              enable_burn: true,
              minter_may_update_metadata: true,
            },
          },
        },
        balances: [{ address: accounts[0].address, amount: "1000" }],
      },
      {
        token_info: {
          token_id: "2",
          symbol: "BNFT",
          name: "Bored NFT",
          token_config: {
            nft: {
              minters: [accounts[0].address],
              public_total_supply: true,
              owner_is_public: true,
              enable_burn: true,
              owner_may_update_metadata: true,
              minter_may_update_metadata: true,
            },
          },
        },
        balances: [{ address: accounts[0].address, amount: "1" }],
      },
    ],

    entropy: "a2FraS1waXBpCg==",
  };

  const txInit = await secretjs.tx.compute.instantiateContract(
    {
      sender: accounts[0].address,
      codeId,
      initMsg: initMessage,
      label: `label-${Date.now()}`,
    },
    {
      gasLimit: 5_000_000,
    },
  );
  if (txInit.code !== TxResultCode.Success) {
    console.error(txInit.rawLog);
  }

  contractAddress = getValueFromRawLog(
    txInit.rawLog,
    "message.contract_address",
  );
});

describe("tx.snip1155", () => {
  test("add curator", async () => {
    const { secretjs } = accounts[0];

    const addCuratorMsg: Snip1155AddCuratorOptions = {
      add_curators: {
        add_curators: [accounts[1].address],
      },
    };

    const addCuratorTx = await secretjs.tx.snip1155.addCurator(
      {
        contractAddress,
        msg: addCuratorMsg,
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );

    expect(addCuratorTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(addCuratorTx.data[0]).data),
    ).toContain('"add_curators":{"status":"success"}');
  });

  test("add minter", async () => {
    const { secretjs } = accounts[0];

    const addMinterMsg: Snip1155AddMinterOptions = {
      add_minters: {
        token_id: "1",
        add_minters: [accounts[1].address],
      },
    };

    const addMinterTx = await secretjs.tx.snip1155.addMinter(
      {
        contractAddress,
        msg: addMinterMsg,
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
    ).toContain('"add_minters":{"status":"success"}');
  });

  test("remove minter", async () => {
    const { secretjs } = accounts[0];

    const removeMinterMsg: Snip1155RemoveMinterOptions = {
      remove_minters: {
        token_id: "1",
        remove_minters: [accounts[0].address],
      },
    };

    const removeMinterTx = await secretjs.tx.snip1155.removeMinter(
      {
        contractAddress,
        msg: removeMinterMsg,
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );

    if (removeMinterTx.code !== TxResultCode.Success) {
      console.error(removeMinterTx.rawLog);
    }

    expect(removeMinterTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(removeMinterTx.data[0]).data),
    ).toContain('"remove_minters":{"status":"success"}');
  });

  test("mint tokens", async () => {
    const { secretjs } = accounts[0];

    const mintMsg: Snip1155MintTokensOptions = {
      mint_tokens: {
        mint_tokens: [
          {
            token_id: "1",
            balances: [{ address: accounts[0].address, amount: "1000" }],
          },
        ],
      },
    };

    const mintTx = await secretjs.tx.snip1155.mint(
      {
        contractAddress,
        msg: mintMsg,
        sender: accounts[0].address,
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
    ).toContain('"mint_tokens":{"status":"success"}');
  });

  test("burn tokens", async () => {
    const { secretjs } = accounts[0];

    const burnMsg: Snip1155BurnTokensOptions = {
      burn_tokens: {
        burn_tokens: [
          {
            token_id: "1",
            balances: [{ address: accounts[0].address, amount: "1000" }],
          },
        ],
      },
    };

    const burnTx = await secretjs.tx.snip1155.burn(
      {
        contractAddress,
        msg: burnMsg,
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );

    if (burnTx.code !== TxResultCode.Success) {
      console.error(burnTx.rawLog);
    }

    expect(burnTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(burnTx.data[0]).data),
    ).toContain('"burn_tokens":{"status":"success"}');
  });

  test("send tokens", async () => {
    const { secretjs } = accounts[0];

    const sendMsg: Snip1155SendOptions = {
      send: {
        token_id: "1",
        from: accounts[0].address,
        recipient: accounts[1].address,
        amount: "100",
      },
    };

    const sendTx = await secretjs.tx.snip1155.send(
      {
        contractAddress,
        msg: sendMsg,
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );

    if (sendTx.code !== TxResultCode.Success) {
      console.error(sendTx.rawLog);
    }

    expect(sendTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(sendTx.data[0]).data),
    ).toContain('"send":{"status":"success"}');
  });

  test("transfer tokens", async () => {
    const { secretjs } = accounts[0];

    const transferMsg: Snip1155TransferOptions = {
      transfer: {
        token_id: "1",
        from: accounts[0].address,
        recipient: accounts[1].address,
        amount: "100",
      },
    };

    const transferTx = await secretjs.tx.snip1155.transfer(
      {
        contractAddress,
        msg: transferMsg,
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );

    if (transferTx.code !== TxResultCode.Success) {
      console.error(transferTx.rawLog);
    }

    expect(transferTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(transferTx.data[0]).data),
    ).toContain('"transfer":{"status":"success"}');
  });

  test("batch transfer tokens", async () => {
    const { secretjs } = accounts[0];

    const batchTransferMsg: Snip1155BatchTransferOptions = {
      batch_transfer: {
        actions: [
          {
            token_id: "1",
            from: accounts[0].address,
            recipient: accounts[1].address,
            amount: "100",
          },
          {
            token_id: "2",
            from: accounts[0].address,
            recipient: accounts[1].address,
            amount: "1",
          },
        ],
      },
    };

    const batchTransferTx = await secretjs.tx.snip1155.batchTransfer(
      {
        contractAddress,
        msg: batchTransferMsg,
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );

    if (batchTransferTx.code !== TxResultCode.Success) {
      console.error(batchTransferTx.rawLog);
    }

    expect(batchTransferTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(batchTransferTx.data[0]).data),
    ).toContain('"batch_transfer":{"status":"success"}');
  });

  test("batch send tokens", async () => {
    const { secretjs } = accounts[0];

    const batchSendMsg: Snip1155BatchSendOptions = {
      batch_send: {
        actions: [
          {
            token_id: "1",
            from: accounts[0].address,
            recipient: accounts[1].address,
            amount: "100",
          },
          {
            token_id: "2",
            from: accounts[0].address,
            recipient: accounts[1].address,
            amount: "1",
          },
        ],
      },
    };

    const batchSendTx = await secretjs.tx.snip1155.batchSend(
      {
        contractAddress,
        msg: batchSendMsg,
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );

    if (batchSendTx.code !== TxResultCode.Success) {
      console.error(batchSendTx.rawLog);
    }

    expect(batchSendTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(batchSendTx.data[0]).data),
    ).toContain('"batch_send":{"status":"success"}');
  });

  test("curate tokens", async () => {
    const { secretjs } = accounts[0];

    const curateTokensMsg: Snip1155CurateTokensOptions = {
      curate_token_ids: {
        initial_tokens: [
          {
            token_info: {
              token_id: "3",
              name: "proof of test",
              symbol: "POT",
              token_config: {
                fungible: {
                  minters: [],
                  decimals: 4,
                  public_total_supply: true,
                  enable_burn: true,
                  enable_mint: true,
                  minter_may_update_metadata: true,
                },
              },
            },
            balances: [{ amount: "1000", address: accounts[0].address }],
          },
        ],
      },
    };

    const curateTokensTx = await secretjs.tx.snip1155.curate(
      {
        contractAddress,
        msg: curateTokensMsg,
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );

    if (curateTokensTx.code !== TxResultCode.Success) {
      console.error(curateTokensTx.rawLog);
    }

    expect(curateTokensTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(MsgExecuteContractResponse.decode(curateTokensTx.data[0]).data),
    ).toContain('"curate_token_ids":{"status":"success"}');
  });

  test("change meta data", async () => {
    const { secretjs } = accounts[0];

    const changeMetadatMsg: Snip1155ChangeMetaDataOptions = {
      change_metadata: {
        token_id: "2",
        public_metadata: {
          token_uri: "aoskoaks",
          //extension: "jhuhuh",
        },
        private_metadata: {
          token_uri: "aidsajid",
          //extension: "asdsojd",
        },
      },
    };

    const changeMetadataTx = await secretjs.tx.snip1155.changeMetaData(
      {
        contractAddress,
        msg: changeMetadatMsg,
        sender: accounts[0].address,
      },
      {
        gasLimit: 5_000_000,
      },
    );

    if (changeMetadataTx.code !== TxResultCode.Success) {
      console.error(changeMetadataTx.rawLog);
    }

    expect(changeMetadataTx.code).toBe(TxResultCode.Success);

    expect(
      fromUtf8(
        MsgExecuteContractResponse.decode(changeMetadataTx.data[0]).data,
      ),
    ).toContain('"change_metadata":{"status":"success"}');
  });
});

describe("query.snip1155", () => {
  test("get publick token info", async () => {
    const { secretjs } = accounts[0];

    const publicTokenInfoQuery =
      await secretjs.query.snip1155.getPublicTokenInfo({
        contract: {
          address: contractAddress,
        },
        token_id: "2",
      });

    expect(
      publicTokenInfoQuery.token_id_public_info.token_id_info.name,
    ).toBeDefined();
  });


    
      test("get private token info", async () => {

        const { secretjs } = accounts[0];


        const txExec = await secretjs.tx.snip1155.setViewingKey(
          {
            sender: secretjs.address,
            contractAddress,
            msg: { set_viewing_key: { key: "hello" } },
          },
          { gasLimit: 5_000_000 },
        );
        if (txExec.code !== TxResultCode.Success) {
          console.error(txExec.rawLog);
        }
        expect(txExec.code).toBe(TxResultCode.Success);



        const privateTokenInfoQuery =
          await secretjs.query.snip1155.getPrivateTokenInfo({
            contract: {
              address: contractAddress,
            },
            token_id: "2",
            auth: {
              viewer: {
                viewing_key: 'hello',
                address: secretjs.address
              }
            }
          });

        expect(
          privateTokenInfoQuery.token_id_private_info.token_id_info.private_metadata,
        ).toBeDefined();




        const permit = await secretjs.utils.accessControl.permit.sign(
          secretjs.address,
          "secretdev-1",
          "Test",
          [contractAddress],
          ["owner"],
          false,
        );
   

      const privateTokenInfoQuery2 = await secretjs.query.snip1155.getPrivateTokenInfo({
        contract: {
          address: contractAddress,
        },
        token_id: "2",
        auth: {
          permit
        }
      });

    expect(
      privateTokenInfoQuery2.token_id_private_info.token_id_info.private_metadata,
    ).toBeDefined();



  });

});
