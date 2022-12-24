import { sha256 } from "@noble/hashes/sha256";
import * as fs from "fs";
import {
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgStoreCode,
  SecretNetworkClient,
  toBase64,
  toHex,
  toUtf8,
  TxResultCode,
  Wallet,
  MsgInstantiateContractResponse
} from "../../src";
import { AminoWallet } from "../../src/wallet_amino";
import { ibcDenom, loopRelayer, sleep, createIbcConnection, waitForBlocks, createIbcChannel } from "./utils";

type Account = {
    address: string;
    mnemonic: string;
    walletAmino: AminoWallet;
    walletProto: Wallet;
    secretjs: SecretNetworkClient;
};

const accounts1 = new Array<Account>(2);
const accounts2 = new Array<Account>(2);

type Contract = {
    wasm: Uint8Array;
    address: string;
    codeId: number;
    ibcPortId: string;
    codeHash: string;
};

const contracts: { snip20: Contract; ics20: Contract } = {
    snip20: {
        wasm: new Uint8Array(),
        address: "",
        codeId: -1,
        ibcPortId: "",
        codeHash: "",
    },
    ics20: {
        wasm: new Uint8Array(),
        address: "",
        codeId: -1,
        ibcPortId: "",
        codeHash: "",
    },
};

let channelId1 = "";
let channelId2 = "";

let networksAddress = "localhost" ;

beforeAll(async () => {
    console.log("!!!!!")
    const linkPromise = await createIbcConnection();
    console.log("!!!!!")

    const mnemonics = [
        "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
        "jelly shadow frog dirt dragon use armed praise universe win jungle close inmate rain oil canvas beauty pioneer chef soccer icon dizzy thunder meadow",
    ];

    // Create clients for all of the existing wallets in secretdev-1
    for (let i = 0; i < mnemonics.length; i++) {
        const mnemonic = mnemonics[i];
        const walletAmino = new AminoWallet(mnemonic);
        accounts1[i] = {
            address: walletAmino.address,
            mnemonic: mnemonic,
            walletAmino,
            walletProto: new Wallet(mnemonic),
            secretjs: new SecretNetworkClient({
                url: `http://${networksAddress}:1317`,
                wallet: walletAmino,
                walletAddress: walletAmino.address,
                chainId: "secretdev-1",
            }),
        };
    }

    // Create clients for all of the existing wallets in secretdev-2
    for (let i = 0; i < mnemonics.length; i++) {
        const mnemonic = mnemonics[i];
        const walletAmino = new AminoWallet(mnemonic);
        accounts2[i] = {
            address: walletAmino.address,
            mnemonic: mnemonic,
            walletAmino,
            walletProto: new Wallet(mnemonic),
            secretjs: new SecretNetworkClient({
                url: `http://${networksAddress}:3317`,
                wallet: walletAmino,
                walletAddress: walletAmino.address,
                chainId: "secretdev-2",
            }),
        };
    }

    await waitForBlocks("secretdev-1", `http://${networksAddress}:1317`);
    await waitForBlocks("secretdev-2", `http://${networksAddress}:3317`);

    contracts.snip20.wasm = fs.readFileSync(`${__dirname}/snip20.wasm`) as Uint8Array;
    contracts.ics20.wasm = fs.readFileSync(`${__dirname}/../contract.wasm`) as Uint8Array;

    contracts.snip20.codeHash = toHex(sha256(contracts.snip20.wasm));
    contracts.ics20.codeHash = toHex(sha256(contracts.ics20.wasm));

    console.log("Storing contracts on secretdev-1...");

    let tx = await accounts1[0].secretjs.tx.broadcast(
        [
            new MsgStoreCode({
                sender: accounts1[0].address,
                wasm_byte_code: contracts.snip20.wasm,
                source: "",
                builder: "",
            }),
            new MsgStoreCode({
                sender: accounts1[0].address,
                wasm_byte_code: contracts.ics20.wasm,
                source: "",
                builder: "",
            }),
        ],
        { gasLimit: 5_000_000 }
    );
    if (tx.code !== TxResultCode.Success) {
        console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    contracts.snip20.codeId = Number(tx.arrayLog.find((x) => x.key === "code_id").value);
    contracts.ics20.codeId = Number(tx.arrayLog.reverse().find((x) => x.key === "code_id").value);

    console.log("Instantiating snip20 on secretdev-1...");

    tx = await accounts1[0].secretjs.tx.compute.instantiateContract(
        {
            sender: accounts1[0].address,
            code_id: contracts.snip20.codeId,
            code_hash: contracts.snip20.codeHash,
            init_msg: {
                name: "Secret SCRT",
                admin: accounts1[0].address,
                symbol: "SSCRT",
                decimals: 6,
                initial_balances: [{ address: accounts1[0].address, amount: "1000" }],
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
            label: `snip20-${Date.now()}`,
        },
        { gasLimit: 300_000 }
    );

    contracts.snip20.address = MsgInstantiateContractResponse.decode(tx.data[0]).address;
    contracts.snip20.ibcPortId = "wasm." + contracts.snip20.address;

    console.log("Instantiating cw20-ics20 on secretdev-1...");

    tx = await accounts1[0].secretjs.tx.compute.instantiateContract(
        {
            sender: accounts1[0].address,
            code_id: contracts.ics20.codeId,
            code_hash: contracts.ics20.codeHash,
            init_msg: {
                admin: accounts1[0].address,
                allowlist: [
                    {
                        contract: contracts.snip20.address,
                        code_hash: contracts.snip20.codeHash,
                    },
                ],
            },
            label: `ics20-${Date.now()}`,
        },
        { gasLimit: 300_000 }
    );
    if (tx.code !== TxResultCode.Success) {
        console.error(tx.rawLog);
    }
    expect(tx.code).toBe(TxResultCode.Success);

    contracts.ics20.address = MsgInstantiateContractResponse.decode(tx.data[0]).address;
    contracts.ics20.ibcPortId = "wasm." + contracts.ics20.address;

    console.log("Waiting for IBC connection...");
    const link = await linkPromise;

    console.log("Creating IBC channel...");
    const channels = await createIbcChannel(link, contracts.ics20.ibcPortId);

    channelId1 = channels.src.channelId;
    channelId2 = channels.dest.channelId;

    console.log("Looping relayer...");
    loopRelayer(link);
}, 180_000 /* 3 minutes timeout */);

test(
    "send from secretdev-1 to secretdev-2 then back to secretdev-1",
    async () => {
        // register snip20 on ics20, then send tokens from secretdev-1
        console.log("Sending tokens from secretdev-1...");

        let tx = await accounts1[0].secretjs.tx.broadcast(
            [
                new MsgExecuteContract({
                    sender: accounts1[0].address,
                    contract_address: contracts.snip20.address,
                    code_hash: contracts.snip20.codeHash,
                    msg: {
                        set_viewing_key: {
                            key: "banana",
                        },
                    },
                }),
                new MsgExecuteContract({
                    sender: accounts1[0].address,
                    contract_address: contracts.snip20.address,
                    code_hash: contracts.snip20.codeHash,
                    msg: {
                        send: {
                            recipient: contracts.ics20.address,
                            recipient_code_hash: contracts.ics20.codeHash,
                            amount: "1",
                            msg: toBase64(
                                toUtf8(
                                    JSON.stringify({
                                        channel: channelId1,
                                        remote_address: accounts2[1].address,
                                        timeout: 10 * 60, // 10 minutes
                                    })
                                )
                            ),
                        },
                    },
                }),
            ],
            {
                gasLimit: 5_000_000,
            }
        );
        if (tx.code !== TxResultCode.Success) {
            console.error(tx.rawLog);
        }
        expect(tx.code).toBe(TxResultCode.Success);

        let snip20Balance: any = await accounts1[0].secretjs.query.compute.queryContract({
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            query: {
                balance: {
                    key: "banana",
                    address: accounts1[0].address,
                },
            },
        });
        expect(snip20Balance.balance.amount).toBe("999");

        console.log("Waiting for tokens to arrive to secretdev-2...");

        const expectedIbcDenom = ibcDenom(
            [{ incomingChannelId: channelId2, incomingPortId: "transfer" }],
            `cw20:${contracts.snip20.address}`
        );

        // wait for tokens to arrive to secretdev-2
        while (true) {
            const { balance } = await accounts2[1].secretjs.query.bank.balance({
                denom: expectedIbcDenom,
                address: accounts2[1].address,
            });

            if (balance?.amount === "1") {
                break;
            }

            await sleep(500);
        }

        console.log("Sending tokens back from secretdev-2...");

        // send tokens back from secretdev-2
        tx = await accounts2[1].secretjs.tx.ibc.transfer({
            sender: accounts2[1].address,
            source_port: "transfer",
            source_channel: channelId2,
            token: {
                denom: expectedIbcDenom,
                amount: "1",
            },
            receiver: accounts1[0].address,
            timeout_timestamp: "6000000000"
            //timeoutTimestampSec: String(Math.floor(Date.now() / 1000) + 10 * 60) /* 10 minutes */,
        });

        if (tx.code !== TxResultCode.Success) {
            console.error(tx.rawLog);
        }
        expect(tx.code).toBe(TxResultCode.Success);

        console.log("Waiting for tokens to arrive back to secretdev-1...");

        while (true) {
            snip20Balance = await accounts1[0].secretjs.query.compute.queryContract({
                contract_address: contracts.snip20.address,
                code_hash: contracts.snip20.codeHash,
                query: {
                    balance: { key: "banana", address: accounts1[0].address },
                },
            });

            if (snip20Balance.balance.amount === "1000") {
                break;
            }

            await sleep(500);
        }

        console.log("Sending tokens from secretdev-1 with a short timeout...");

        tx = await accounts1[0].secretjs.tx.broadcast(
            [
                new MsgExecuteContract({
                    sender: accounts1[0].address,
                    contract_address: contracts.snip20.address,
                    code_hash: contracts.snip20.codeHash,
                    msg: {
                        send: {
                            recipient: contracts.ics20.address,
                            recipient_code_hash: contracts.ics20.codeHash,
                            amount: "1",
                            msg: toBase64(
                                toUtf8(
                                    JSON.stringify({
                                        channel: channelId1,
                                        remote_address: accounts2[1].address,
                                        timeout: 3, // 3 seconds
                                    })
                                )
                            ),
                        },
                    },
                }),
            ],
            {
                gasLimit: 5_000_000,
            }
        );
        if (tx.code !== TxResultCode.Success) {
            console.error(tx.rawLog);
        }
        expect(tx.code).toBe(TxResultCode.Success);

        // Balance is deducted optimistically so we should see 999 right away
        snip20Balance = await accounts1[0].secretjs.query.compute.queryContract({
            contract_address: contracts.snip20.address,
            code_hash: contracts.snip20.codeHash,
            query: {
                balance: {
                    key: "banana",
                    address: accounts1[0].address,
                },
            },
        });
        expect(snip20Balance.balance.amount).toBe("999");

        console.log("Waiting for tokens refund to secretdev-1 after the timeout...");

        while (true) {
            snip20Balance = await accounts1[0].secretjs.query.compute.queryContract({
                contract_address: contracts.snip20.address,
                code_hash: contracts.snip20.codeHash,
                query: {
                    balance: { key: "banana", address: accounts1[0].address },
                },
            });

            if (snip20Balance.balance.amount === "1000") {
                break;
            }

            await sleep(500);
        }
    },
    5 * 60 * 1000 /* 5 minutes */
);