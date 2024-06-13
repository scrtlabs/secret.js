import fs from "fs";
import { fromUtf8, TxResultCode } from "../src";
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
import { MsgExecuteContractResponse } from "../src/protobuf/secret/compute/v1beta1/msg";
import { accounts, getValueFromEvents } from "./utils";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

let contract_address: string;
let code_id: string;
let code_hash: string | undefined;

beforeEach(async () => {
  const { secretjsProto } = accounts[0];

  // store smart contract on chain
  const txStore = await secretjsProto.tx.compute.storeCode(
    {
      sender: accounts[0].address,
      wasm_byte_code: fs.readFileSync(
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

  code_id = getValueFromEvents(txStore.events, "message.code_id");

  ({ code_hash } = await secretjsProto.query.compute.codeHashByCodeId({
    code_id,
  }));

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

  const txInit = await secretjsProto.tx.compute.instantiateContract(
    {
      sender: accounts[0].address,
      code_id,
      code_hash,
      init_msg: initMessage,
      label: `label-${Date.now()}`,
    },
    {
      gasLimit: 5_000_000,
    },
  );
  if (txInit.code !== TxResultCode.Success) {
    console.error(txInit.rawLog);
  }

  contract_address = getValueFromEvents(
    txInit.events,
    "message.contract_address",
  );
});

describe("tx.snip1155", () => {
  test("add curator", async () => {
    const { secretjsProto } = accounts[0];

    const addCuratorMsg: Snip1155AddCuratorOptions = {
      add_curators: {
        add_curators: [accounts[1].address],
      },
    };

    const addCuratorTx = await secretjsProto.tx.snip1155.addCurator(
      {
        contract_address,
        code_hash,
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
    const { secretjsProto } = accounts[0];

    const addMinterMsg: Snip1155AddMinterOptions = {
      add_minters: {
        token_id: "1",
        add_minters: [accounts[1].address],
      },
    };

    const addMinterTx = await secretjsProto.tx.snip1155.addMinter(
      {
        contract_address,
        code_hash,
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
    const { secretjsProto } = accounts[0];

    const removeMinterMsg: Snip1155RemoveMinterOptions = {
      remove_minters: {
        token_id: "1",
        remove_minters: [accounts[0].address],
      },
    };

    const removeMinterTx = await secretjsProto.tx.snip1155.removeMinter(
      {
        contract_address,
        code_hash,
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
    const { secretjsProto } = accounts[0];

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

    const mintTx = await secretjsProto.tx.snip1155.mint(
      {
        contract_address,
        code_hash,
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
    const { secretjsProto } = accounts[0];

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

    const burnTx = await secretjsProto.tx.snip1155.burn(
      {
        contract_address,
        code_hash,
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
    const { secretjsProto } = accounts[0];

    const sendMsg: Snip1155SendOptions = {
      send: {
        token_id: "1",
        from: accounts[0].address,
        recipient: accounts[1].address,
        amount: "100",
      },
    };

    const sendTx = await secretjsProto.tx.snip1155.send(
      {
        contract_address,
        code_hash,
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
    const { secretjsProto } = accounts[0];

    const transferMsg: Snip1155TransferOptions = {
      transfer: {
        token_id: "1",
        from: accounts[0].address,
        recipient: accounts[1].address,
        amount: "100",
      },
    };

    const transferTx = await secretjsProto.tx.snip1155.transfer(
      {
        contract_address,
        code_hash,
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
    const { secretjsProto } = accounts[0];

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

    const batchTransferTx = await secretjsProto.tx.snip1155.batchTransfer(
      {
        contract_address,
        code_hash,
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
    const { secretjsProto } = accounts[0];

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

    const batchSendTx = await secretjsProto.tx.snip1155.batchSend(
      {
        contract_address,
        code_hash,
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
    const { secretjsProto } = accounts[0];

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

    const curateTokensTx = await secretjsProto.tx.snip1155.curate(
      {
        contract_address,
        code_hash,
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
    const { secretjsProto } = accounts[0];

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

    const changeMetadataTx = await secretjsProto.tx.snip1155.changeMetaData(
      {
        contract_address,
        code_hash,
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
    const { secretjsProto } = accounts[0];

    const publicTokenInfoQuery =
      await secretjsProto.query.snip1155.getPublicTokenInfo({
        contract: {
          address: contract_address,
        },
        token_id: "2",
      });

    expect(
      publicTokenInfoQuery.token_id_public_info.token_id_info.name,
    ).toBeDefined();
  });

  test("get private token info", async () => {
    const { secretjsProto } = accounts[0];

    const txExec = await secretjsProto.tx.snip1155.setViewingKey(
      {
        sender: secretjsProto.address,
        code_hash,
        contract_address,
        msg: { set_viewing_key: { key: "hello" } },
      },
      { gasLimit: 5_000_000 },
    );
    if (txExec.code !== TxResultCode.Success) {
      console.error(txExec.rawLog);
    }
    expect(txExec.code).toBe(TxResultCode.Success);

    const privateTokenInfoQuery =
      await secretjsProto.query.snip1155.getPrivateTokenInfo({
        contract: {
          address: contract_address,
          code_hash,
        },
        token_id: "2",
        auth: {
          viewer: {
            viewing_key: "hello",
            address: secretjsProto.address,
          },
        },
      });

    expect(
      privateTokenInfoQuery.token_id_private_info.token_id_info
        .private_metadata,
    ).toBeDefined();

    const permit = await secretjsProto.utils.accessControl.permit.sign(
      secretjsProto.address,
      "secretdev-1",
      "Test",
      [contract_address],
      ["owner"],
      false,
    );

    const privateTokenInfoQuery2 =
      await secretjsProto.query.snip1155.getPrivateTokenInfo({
        contract: {
          address: contract_address,
          code_hash,
        },
        token_id: "2",
        auth: {
          permit,
        },
      });

    expect(
      privateTokenInfoQuery2.token_id_private_info.token_id_info
        .private_metadata,
    ).toBeDefined();
  });

  test("get balance", async () => {
    const { secretjsProto } = accounts[0];

    const txExec = await secretjsProto.tx.snip1155.setViewingKey(
      {
        sender: secretjsProto.address,
        code_hash,
        contract_address,
        msg: { set_viewing_key: { key: "hello" } },
      },
      { gasLimit: 5_000_000 },
    );
    if (txExec.code !== TxResultCode.Success) {
      console.error(txExec.rawLog);
    }
    expect(txExec.code).toBe(TxResultCode.Success);

    const balanceInfoQueryViewingKey =
      await secretjsProto.query.snip1155.getBalance({
        contract: {
          address: contract_address,
          code_hash,
        },
        token_id: "1",
        owner: secretjsProto.address,
        auth: {
          viewer: {
            viewing_key: "hello",
            address: secretjsProto.address,
          },
        },
      });

    expect(balanceInfoQueryViewingKey.balance.amount).toBeDefined();

    const permit = await secretjsProto.utils.accessControl.permit.sign(
      secretjsProto.address,
      "secretdev-1",
      "Test",
      [contract_address],
      ["owner"],
      false,
    );

    const balanceInfoQueryPermit =
      await secretjsProto.query.snip1155.getBalance({
        contract: {
          address: contract_address,
          code_hash,
        },
        token_id: "1",
        owner: secretjsProto.address,
        auth: {
          permit,
        },
      });

    expect(balanceInfoQueryPermit.balance.amount).toBeDefined();
  });

  test("get all balance", async () => {
    const { secretjsProto } = accounts[0];

    const txExec = await secretjsProto.tx.snip1155.setViewingKey(
      {
        sender: secretjsProto.address,
        code_hash,
        contract_address,
        msg: { set_viewing_key: { key: "hello" } },
      },
      { gasLimit: 5_000_000 },
    );
    if (txExec.code !== TxResultCode.Success) {
      console.error(txExec.rawLog);
    }
    expect(txExec.code).toBe(TxResultCode.Success);

    const allBalanceInfoQueryViewingKey =
      await secretjsProto.query.snip1155.getAllBalances({
        contract: {
          address: contract_address,
          code_hash,
        },
        owner: secretjsProto.address,
        auth: {
          viewer: {
            viewing_key: "hello",
            address: secretjsProto.address,
          },
        },
      });

    expect(
      allBalanceInfoQueryViewingKey.all_balances.every(
        (balance) => balance.amount && balance.token_id,
      ),
    ).toBeTruthy();

    const permit = await secretjsProto.utils.accessControl.permit.sign(
      secretjsProto.address,
      "secretdev-1",
      "Test",
      [contract_address],
      ["owner"],
      false,
    );

    const allBalanceInfoQueryPermit =
      await secretjsProto.query.snip1155.getAllBalances({
        contract: {
          address: contract_address,
          code_hash,
        },
        owner: secretjsProto.address,
        auth: {
          permit,
        },
      });

    expect(
      allBalanceInfoQueryPermit.all_balances.every(
        (balance) => balance.amount && balance.token_id,
      ),
    ).toBeTruthy();
  });

  test("get transfer history", async () => {
    const { secretjsProto } = accounts[0];

    //one transfer
    const transferMsg: Snip1155TransferOptions = {
      transfer: {
        token_id: "1",
        from: accounts[0].address,
        recipient: accounts[1].address,
        amount: "100",
      },
    };

    const transferTx = await secretjsProto.tx.snip1155.transfer(
      {
        contract_address,
        code_hash,
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

    const txExec = await secretjsProto.tx.snip1155.setViewingKey(
      {
        sender: secretjsProto.address,
        code_hash,
        contract_address,
        msg: { set_viewing_key: { key: "hello" } },
      },
      { gasLimit: 5_000_000 },
    );
    if (txExec.code !== TxResultCode.Success) {
      console.error(txExec.rawLog);
    }
    expect(txExec.code).toBe(TxResultCode.Success);

    const transactionHistoryQueryViewingKey =
      await secretjsProto.query.snip1155.getTransactionHistory({
        contract: {
          address: contract_address,
          code_hash,
        },
        page_size: 5,
        auth: {
          viewer: {
            viewing_key: "hello",
            address: secretjsProto.address,
          },
        },
      });

    expect(
      transactionHistoryQueryViewingKey.transaction_history.txs.length > 0,
    ).toBeTruthy();

    const permit = await secretjsProto.utils.accessControl.permit.sign(
      secretjsProto.address,
      "secretdev-1",
      "Test",
      [contract_address],
      ["owner"],
      false,
    );

    const transactionHistoryQueryPermit =
      await secretjsProto.query.snip1155.getTransactionHistory({
        contract: {
          address: contract_address,
          code_hash,
        },
        page_size: 1,
        auth: {
          permit,
        },
      });

    expect(
      transactionHistoryQueryPermit.transaction_history.txs.length > 0,
    ).toBeTruthy();
  });
});
