import fetch from "cross-fetch";
import {fromBase64, fromHex, fromUtf8, toBase64, toHex,} from "@cosmjs/encoding";
import {sha256} from "@noble/hashes/sha256";
import {
    AuthQuerier,
    Coin,
    MsgExecuteContract,
    MsgExecuteContractParams,
    MsgInstantiateContract,
    MsgInstantiateContractParams,
    MsgMultiSend,
    MsgMultiSendParams,
    MsgSend,
    MsgSendParams,
    MsgStoreCode,
    MsgStoreCodeParams,
    StdSignature,
} from ".";
import {EncryptionUtils, EncryptionUtilsImpl} from "./encryption";
import {PermitSigner} from "./extensions/access_control/permit/permit_signer";
import {BaseAccount} from "./grpc_gateway/cosmos/auth/v1beta1/auth.pb";
import {TxResponse as TxResponsePb} from "./grpc_gateway/cosmos/base/abci/v1beta1/abci.pb";
import {Service as TxService,} from "./grpc_gateway/cosmos/tx/v1beta1/service.pb";
import {Tx as TxPb} from "./grpc_gateway/cosmos/tx/v1beta1/tx.pb";
import {TxMsgData} from "./protobuf/cosmos/base/abci/v1beta1/abci";
import {LegacyAminoPubKey} from "./protobuf/cosmos/crypto/multisig/keys";
import {PubKey} from "./protobuf/cosmos/crypto/secp256k1/keys";
import {AuthInfo, SignDoc, TxBody as TxBodyPb, TxRaw,} from "./protobuf/cosmos/tx/v1beta1/tx";
import {Any} from "./protobuf/google/protobuf/any";
import {MsgExecuteContractResponse, MsgInstantiateContractResponse,} from "./protobuf/secret/compute/v1beta1/msg";
import {BankQuerier} from "./query";
import {bytesToAddress, ComputeQuerier} from "./query";
import {AminoMsg, Msg, MsgParams, MsgRegistry, ProtoMsg,} from "./tx";
import {
    AccountData,
    AminoSigner,
    AminoSignResponse,
    encodeSecp256k1Pubkey,
    isDirectSigner,
    isSignDoc,
    isSignDocCamelCase,
    Pubkey,
    Signer,
    StdFee,
    StdSignDoc,
} from "./wallet_amino";

global.fetch = fetch;

export type CreateClientOptions = {
    /** A URL to the API service, also known as LCD, REST API or gRPC-gateway, by default on port 1317 */
    url: string;
    /** The chain-id is used in encryption code & when signing txs. */
    chainId: string;
    /** A wallet for signing transactions & permits. When `wallet` is supplied, `walletAddress` & `chainId` must be supplied too. */
    wallet?: Signer;
    /** walletAddress is the specific account address in the wallet that is permitted to sign transactions & permits. */
    walletAddress?: string;
    /** Passing `encryptionSeed` will allow tx decryption at a later time. Ignored if `encryptionUtils` is supplied. Must be 32 bytes. */
    encryptionSeed?: Uint8Array;
    /** `encryptionUtils` overrides the default {@link EncryptionUtilsImpl}. */
    encryptionUtils?: EncryptionUtils;
};

/**
 * SingleMsgTx is a function that broadcasts a single message transaction.
 * It also has a `simulate()` method to execute the transaction without
 * committing it on-chain. This is helpful for gas estimation.
 *
 * WARNING: `tx.compute.instantiateContract()` & `tx.compute.executeContract()` simulation is not supported for security reasons!
 */
export type SingleMsgTx<T> = {
    (params: T, txOptions?: TxOptions): Promise<TxResponse>;
};

export enum BroadcastMode {
    /**
     * Broadcast transaction to mempool and wait for DeliverTx response.
     *
     * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_commit
     */
    Block = "Block",
    /**
     * Broadcast transaction to mempool and wait for CheckTx response.
     *
     * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync
     */
    Sync = "Sync",
    /**
     * Broadcast transaction to mempool and do not wait for CheckTx response.
     *
     * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async
     */
    Async = "Async",
}

export type IbcTxOptions = {
    /** If `false` skip resolving the IBC response txs (acknowledge/timeout).
     *
     * Defaults to `true` when broadcasting a tx or using `getTx()`.
     * Defaults to `false` when using `txsQuery()`.
     *
     */
    resolveResponses?: boolean;
    /**
     * How much time (in milliseconds) to wait for IBC response txs (acknowledge/timeout).
     *
     * Defaults to `120_000` (2 minutes).
     *
     */
    resolveResponsesTimeoutMs?: number;
    /**
     * When waiting for the IBC response txs (acknowledge/timeout) to commit on-chain, how much time (in milliseconds) to wait between checks.
     *
     * Smaller intervals will cause more load on your node provider. Keep in mind that blocks on Secret Network take about 6 seconds to finalize.
     *
     * Defaults to `15_000` (15 seconds).
     */
    resolveResponsesCheckIntervalMs?: number;
};

type ExplicitIbcTxOptions = {
    resolveResponses: boolean;
    resolveResponsesTimeoutMs: number;
    resolveResponsesCheckIntervalMs: number;
};

export type TxOptions = {
    /** Defaults to `25_000`. */
    gasLimit?: number;
    /** E.g. gasPriceInFeeDenom=0.1 & feeDenom="uscrt" => Total fee for tx is `0.1 * gasLimit`uscrt. Defaults to `0.1`. */
    gasPriceInFeeDenom?: number;
    /** Defaults to `"uscrt"`. */
    feeDenom?: string;
    /** Address of the fee granter from which to charge gas fees. */
    feeGranter?: string;
    /** Defaults to `""`. */
    memo?: string;
    /** If `false` returns immediately with only the `transactionHash` field set. Defaults to `true`. */
    waitForCommit?: boolean;
    /**
     * How much time (in milliseconds) to wait for tx to commit on-chain.
     *
     * Defaults to `60_000`. Ignored if `waitForCommit = false`.
     */
    broadcastTimeoutMs?: number;
    /**
     * When waiting for the tx to commit on-chain, how much time (in milliseconds) to wait between checks.
     *
     * Smaller intervals will cause more load on your node provider. Keep in mind that blocks on Secret Network take about 6 seconds to finalize.
     *
     * Defaults to `6_000`. Ignored if `waitForCommit = false`.
     */
    broadcastCheckIntervalMs?: number;
    /**
     * If `BroadcastMode.Sync` - Broadcast transaction to mempool and wait for CheckTx response.
     *
     * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync
     *
     * If `BroadcastMode.Async` Broadcast transaction to mempool and do not wait for CheckTx response.
     *
     * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async
     */
    broadcastMode?: BroadcastMode;
    /**
     * explicitSignerData can be used to override `chainId`, `accountNumber` & `accountSequence`.
     * This is useful when using {@link BroadcastMode.Async} or when you don't want secretjs
     * to query for `accountNumber` & `accountSequence` from the chain. (smoother in UIs, less load on your node provider).
     */
    explicitSignerData?: SignerData;
    /**
     * Options for resolving IBC ack/timeout txs that resulted from this tx.
     */
    ibcTxsOptions?: IbcTxOptions;
};

/**
 * Signing information for a single signer that is not included in the transaction.
 *
 * @see https://github.com/cosmos/cosmos-sdk/blob/v0.42.2/x/auth/signing/sign_mode_handler.go#L23-L37
 */
export interface SignerData {
    readonly accountNumber: number;
    readonly sequence: number;
    readonly chainId: string;
}

export class ReadonlySigner implements AminoSigner {
    getAccounts(): Promise<readonly AccountData[]> {
        throw new Error("getAccounts() is not supported in readonly mode.");
    }
    signAmino(
        _signerAddress: string,
        _signDoc: StdSignDoc,
    ): Promise<AminoSignResponse> {
        throw new Error("signAmino() is not supported in readonly mode.");
    }
}

export type Querier = {
    /** Returns a transaction with a txhash. Must be 64 character upper-case hex string */
    getTx: (
        hash: string,
        ibcTxOptions?: IbcTxOptions,
    ) => Promise<TxResponse | null>;
    auth: AuthQuerier;
    bank: BankQuerier;
    compute: ComputeQuerier;
};

export type ArrayLog = Array<{
    msg: number;
    type: string;
    key: string;
    value: string;
}>;

export type JsonLog = Array<{
    msg_index: number;
    events: Array<{
        type: string;
        attributes: Array<{ key: string; value: string }>;
    }>;
}>;

/**
 * MsgData defines the data returned in a Result object during message
 * execution.
 */
export type MsgData = {
    msgType: string;
    data: Uint8Array;
};

export type AnyJson = { "@type": string } & any;

/** A transaction that is indexed as part of the transaction history */
export type TxResponse = {
    /** Block height in which the tx was committed on-chain */
    readonly height: number;
    /** An RFC 3339 timestamp of when the tx was committed on-chain.
     * The format is `{year}-{month}-{day}T{hour}:{min}:{sec}[.{frac_sec}]Z`.
     */
    readonly timestamp: string;
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
    /** Transaction execution error code. 0 on success. See {@link TxResultCode}. */
    readonly code: TxResultCode;
    /** Namespace for the Code */
    readonly codespace: string;
    /** Additional information. May be non-deterministic. */
    readonly info: string;
    /**
     * If code != 0, rawLog contains the error.
     *
     * If code = 0 you'll probably want to use `jsonLog` or `arrayLog`. Values are not decrypted.
     */
    readonly rawLog: string;
    /** If code = 0, `jsonLog = JSON.parse(rawLow)`. Values are decrypted if possible. */
    readonly jsonLog?: JsonLog;
    /** If code = 0, `arrayLog` is a flattened `jsonLog`. Values are decrypted if possible. */
    readonly arrayLog?: ArrayLog;

    /**
     * Events defines all the events emitted by processing a transaction. Note,
     * these events include those emitted by processing all the messages and those
     * emitted from the ante handler. Whereas Logs contains the events, with
     * additional metadata, emitted only by processing the messages.
     *
     * Note: events are not decrypted.
     */
    readonly events: Array<
        import("./grpc_gateway/tendermint/abci/types.pb").Event
    >;
    /** Return value (if there's any) for each input message */
    readonly data: Array<Uint8Array>;
    /**
     * Decoded transaction input.
     */
    readonly tx: TxPb;
    /**
     * Amount of gas that was actually used by the transaction.
     */
    readonly gasUsed: number;
    /**
     * Gas limit that was originaly set by the transaction.
     */
    readonly gasWanted: number;
    /** If code = 0 and the tx resulted in sending IBC packets, `ibcAckTxs` is a list of IBC acknowledgement or timeout transactions which signal whether the original IBC packet was accepted, rejected or timed-out on the receiving chain. */
    readonly ibcResponses: Array<Promise<IbcResponse>>;
};

export type IbcResponse = {
    type: "ack" | "timeout";
    tx: TxResponse;
};

export type TxSender = {
    /**
     * Sign and broadcast a transaction to Secret Network.
     *
     * @param {TxOptions} [options] Options for signing and broadcasting
     * @param {Number} [options.gasLimit=25_000]
     * @param {Number} [options.gasPriceInFeeDenom=0.1] E.g. gasPriceInFeeDenom=0.1 & feeDenom="uscrt" => Total fee for tx is `0.1 * gasLimit`uscrt.
     * @param {String} [options.feeDenom="uscrt"]
     * @param {String} [options.memo=""]
     * @param {boolean} [options.waitForCommit=true] If false returns immediately with `transactionHash`. Defaults to `true`.
     * @param {Number} [options.broadcastTimeoutMs=60_000] How much time (in milliseconds) to wait for tx to commit on-chain. Ignored if `waitForCommit = false`.
     * @param {Number} [options.broadcastCheckIntervalMs=6_000] When waiting for the tx to commit on-chain, how much time (in milliseconds) to wait between checks. Smaller intervals will cause more load on your node provider. Keep in mind that blocks on Secret Network take about 6 seconds to finalize. Ignored if `waitForCommit = false`.
     * @param {BroadcastMode} [options.broadcastMode=BroadcastMode.Sync] If {@link BroadcastMode.Sync} - Broadcast transaction to mempool and wait for CheckTx response. @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync. If {@link BroadcastMode.Async} Broadcast transaction to mempool and do not wait for CheckTx response. @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async.
     * @param {SignerData} [options.explicitSignerData] explicitSignerData  can be used to override `chainId`, `accountNumber` & `accountSequence`. This is useful when using {@link BroadcastMode.Async} or when you don't want secretjs to query for `accountNumber` & `accountSequence` from the chain. (smoother in UIs, less load on your node provider).
     * @param {Number} [options.explicitSignerData.accountNumber]
     * @param {Number} [options.explicitSignerData.sequence]
     * @param {String} [options.explicitSignerData.chainId]
     * @param {Msg[]} messages A list of messages, executed sequentially. If all messages succeeds then the transaction succeed, and the resulting {@link TxResponse} object will have `code = 0`. If at lease one message fails, the entire transaction is reverted and {@link TxResponse} `code` field will not be `0`.
     *
     * List of possible Msgs:
     *   - bank            {@link MsgMultiSend}
     *   - bank            {@link MsgSend}
     *   - compute         {@link MsgExecuteContract}
     *   - compute         {@link MsgInstantiateContract}
     *   - compute         {@link MsgStoreCode}
     */
    broadcast: (messages: Msg[], txOptions?: TxOptions) => Promise<TxResponse>;

    bank: {
        /** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
        multiSend: SingleMsgTx<MsgMultiSendParams>;
        /** MsgSend represents a message to send coins from one account to another. */
        send: SingleMsgTx<MsgSendParams>;
    };
    compute: {
        /** Execute a function on a contract */
        executeContract: SingleMsgTx<MsgExecuteContractParams<object>>;
        /** Instantiate a contract from code id */
        instantiateContract: SingleMsgTx<MsgInstantiateContractParams>;
        /** Upload a compiled contract to Secret Network */
        storeCode: SingleMsgTx<MsgStoreCodeParams>;
    };
};

type ComputeMsgToNonce = { [msgIndex: number]: Uint8Array };

export class SecretNetworkClientLight {
    public readonly query: Querier;
    public readonly tx: TxSender;
    public readonly address: string;
    private readonly url: string;
    private readonly wallet: Signer;
    private readonly chainId: string;

    private encryptionUtils: EncryptionUtils;

    public utils: { accessControl: { permit: PermitSigner } };

    /** Creates a new SecretNetworkClient client. For a readonly client pass just the `url` param. */
    constructor(options: CreateClientOptions) {
        this.url = options.url.replace(/\/*$/g, ""); // remove trailing slashes

        this.query = {
            auth: new AuthQuerier(options.url),
            bank: new BankQuerier(options.url),
            compute: new ComputeQuerier(options.url),
            getTx: (hash) => this.getTx(hash),
        };

        if (options.wallet && options.walletAddress === undefined) {
            throw new Error("Must also pass 'walletAddress' when passing 'wallet'");
        }

        this.wallet = options.wallet ?? new ReadonlySigner();
        this.address = options.walletAddress ?? "";
        this.chainId = options.chainId;

        this.utils = { accessControl: { permit: new PermitSigner(this.wallet) } };

        // TODO fix this "any"
        const doMsg = (msgClass: any): (params: MsgParams, options?: TxOptions) => Promise<TxResponse> => {
            return (params: MsgParams, options?: TxOptions) => {
                return this.tx.broadcast([new msgClass(params)], options);
            };
        };

        this.tx = {
            broadcast: this.signAndBroadcast.bind(this),

            bank: {
                multiSend: doMsg(MsgMultiSend),
                send: doMsg(MsgSend),
            },
            compute: {
                executeContract: doMsg(MsgExecuteContract),
                instantiateContract: doMsg(MsgInstantiateContract),
                storeCode: doMsg(MsgStoreCode),
            },
        };

        if (options.encryptionUtils) {
            this.encryptionUtils = options.encryptionUtils;
        } else {
            this.encryptionUtils = new EncryptionUtilsImpl(
                this.url,
                options.encryptionSeed,
                this.chainId,
            );
        }

        // Reinitialize ComputeQuerier with a shared EncryptionUtils (better caching, same seed)
        this.query.compute = new ComputeQuerier(this.url, this.encryptionUtils);
    }

    private async getTx(
        hash: string,
    ): Promise<TxResponse | null> {
        try {
            const { tx_response } = await TxService.GetTx(
                { hash },
                { pathPrefix: this.url },
            );

            return tx_response
                ? this.decodeTxResponse(tx_response)
                : null;
        } catch (error) {
            if (error?.message === `tx not found: ${hash}`) {
                return null;
            } else {
                throw error;
            }
        }
    }

    private async decodeTxResponse(
        txResp: TxResponsePb,
    ): Promise<TxResponse> {
        let explicitIbcTxOptions: ExplicitIbcTxOptions;

        const nonces: ComputeMsgToNonce = [];

        const tx = txResp.tx as TxPb;

        // Decoded input tx messages
        for (
            let i = 0;
            !isNaN(Number(tx?.body?.messages?.length)) &&
            i < Number(tx?.body?.messages?.length);
            i++
        ) {
            const msg: AnyJson = tx.body!.messages![i];

            // Check if the message needs decryption
            let contractInputMsgFieldName = "";
            if (msg["@type"] === "/secret.compute.v1beta1.MsgInstantiateContract") {
                contractInputMsgFieldName = "init_msg";
            } else if (
                msg["@type"] === "/secret.compute.v1beta1.MsgExecuteContract"
            ) {
                contractInputMsgFieldName = "msg";
            }

            if (contractInputMsgFieldName !== "") {
                // Encrypted, try to decrypt
                try {
                    const contractInputMsgBytes = fromBase64(
                        msg[contractInputMsgFieldName],
                    );

                    const nonce = contractInputMsgBytes.slice(0, 32);
                    const ciphertext = contractInputMsgBytes.slice(64);

                    const plaintext = await this.encryptionUtils.decrypt(
                        ciphertext,
                        nonce,
                    );
                    msg[contractInputMsgFieldName] = JSON.parse(
                        fromUtf8(plaintext).slice(64), // first 64 chars is the codeHash as a hex string
                    );

                    nonces[i] = nonce; // Fill nonces array to later use it in output decryption
                } catch (decryptionError) {
                    // Not encrypted or can't decrypt because not original sender
                }
            }

            tx.body!.messages![i] = msg;
        }

        let rawLog: string = txResp.raw_log!;
        let jsonLog: JsonLog | undefined;
        let arrayLog: ArrayLog | undefined;
        let ibcResponses: Array<Promise<IbcResponse>> = [];
        if (txResp.code === 0 && rawLog !== "") {
            jsonLog = JSON.parse(rawLog) as JsonLog;

            arrayLog = [];
            for (let msgIndex = 0; msgIndex < jsonLog.length; msgIndex++) {
                if (jsonLog[msgIndex].msg_index === undefined) {
                    jsonLog[msgIndex].msg_index = msgIndex;
                    // See https://github.com/cosmos/cosmos-sdk/pull/11147
                }

                const log = jsonLog[msgIndex];
                for (const event of log.events) {
                    for (const attr of event.attributes) {
                        // Try to decrypt
                        if (event.type === "wasm") {
                            const nonce = nonces[msgIndex];
                            if (nonce && nonce.length === 32) {
                                try {
                                    attr.key = fromUtf8(
                                        await this.encryptionUtils.decrypt(
                                            fromBase64(attr.key),
                                            nonce,
                                        ),
                                    ).trim();
                                } catch (e) {}
                                try {
                                    attr.value = fromUtf8(
                                        await this.encryptionUtils.decrypt(
                                            fromBase64(attr.value),
                                            nonce,
                                        ),
                                    ).trim();
                                } catch (e) {}
                            }
                        }

                        arrayLog.push({
                            msg: msgIndex,
                            type: event.type,
                            key: attr.key,
                            value: attr.value,
                        });
                    }
                }
            }
        } else if (txResp.code !== 0 && rawLog !== "") {
            try {
                const errorMessageRgx =
                    /; message index: (\d+):(?: dispatch: submessages:)* encrypted: (.+?): (?:instantiate|execute|query|reply to) contract failed/g;
                const rgxMatches = errorMessageRgx.exec(rawLog);
                if (rgxMatches?.length === 3) {
                    const encryptedError = fromBase64(rgxMatches[2]);
                    const msgIndex = Number(rgxMatches[1]);

                    const decryptedBase64Error = await this.encryptionUtils.decrypt(
                        encryptedError,
                        nonces[msgIndex],
                    );

                    const decryptedError = fromUtf8(decryptedBase64Error);

                    rawLog = rawLog.replace(
                        `encrypted: ${rgxMatches[2]}`,
                        decryptedError,
                    );

                    try {
                        jsonLog = JSON.parse(decryptedError);
                    } catch (e) {}
                }
            } catch (decryptionError) {
                // Not encrypted or can't decrypt because not original sender
            }
        }

        const txMsgData = TxMsgData.decode(fromHex(txResp.data!));
        const data = new Array<Uint8Array>(txMsgData.data.length);

        for (let msgIndex = 0; msgIndex < txMsgData.data.length; msgIndex++) {
            data[msgIndex] = txMsgData.data[msgIndex].data;

            const nonce = nonces[msgIndex];
            if (nonce && nonce.length === 32) {
                // Check if the output data needs decryption

                try {
                    const { "@type": type_url } = tx.body!.messages![msgIndex] as AnyJson;

                    if (type_url === "/secret.compute.v1beta1.MsgInstantiateContract") {
                        const decoded = MsgInstantiateContractResponse.decode(
                            txMsgData.data[msgIndex].data,
                        );
                        const decrypted = fromBase64(
                            fromUtf8(await this.encryptionUtils.decrypt(decoded.data, nonce)),
                        );
                        data[msgIndex] = MsgInstantiateContractResponse.encode({
                            address: decoded.address,
                            data: decrypted,
                        }).finish();
                    } else if (
                        type_url === "/secret.compute.v1beta1.MsgExecuteContract"
                    ) {
                        const decoded = MsgExecuteContractResponse.decode(
                            txMsgData.data[msgIndex].data,
                        );
                        const decrypted = fromBase64(
                            fromUtf8(await this.encryptionUtils.decrypt(decoded.data, nonce)),
                        );
                        data[msgIndex] = MsgExecuteContractResponse.encode({
                            data: decrypted,
                        }).finish();
                    }
                } catch (decryptionError) {
                    // Not encrypted or can't decrypt because not original sender
                }
            }
        }

        return {
            height: Number(txResp.height),
            timestamp: txResp.timestamp!,
            transactionHash: txResp.txhash!,
            code: txResp.code!,
            codespace: txResp.codespace!,
            info: txResp.info!,
            tx,
            rawLog,
            jsonLog,
            arrayLog,
            events: txResp.events!,
            data,
            gasUsed: Number(txResp.gas_used),
            gasWanted: Number(txResp.gas_wanted),
            ibcResponses,
        };
    }

    /**
     * Broadcasts a signed transaction to the network and monitors its inclusion in a block.
     *
     * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
     * an error is thrown.
     *
     * If the transaction is not included in a block before the provided timeout, this errors with a `TimeoutError`.
     *
     * If the transaction is included in a block, a {@link TxResponse} is returned. The caller then
     * usually needs to check for execution success or failure.
     */
    private async broadcastTx(
        txBytes: Uint8Array,
        timeoutMs: number,
        checkIntervalMs: number,
        mode: BroadcastMode,
        waitForCommit: boolean,
        ibcTxOptions?: IbcTxOptions,
    ): Promise<TxResponse> {
        const start = Date.now();

        const txhash = toHex(sha256(txBytes)).toUpperCase();

        if (!waitForCommit && mode == BroadcastMode.Block) {
            mode = BroadcastMode.Sync;
        }

        let tx_response: TxResponsePb | undefined;

        if (mode === BroadcastMode.Block) {
            waitForCommit = true;

            const { BroadcastMode } = await import(
                "./grpc_gateway/cosmos/tx/v1beta1/service.pb"
                );

            let isBroadcastTimedOut = false;
            try {
                ({ tx_response } = await TxService.BroadcastTx(
                    {
                        //@ts-ignore for some reason the type is tx_bytes but only works as txBytes
                        txBytes: toBase64(txBytes),
                        mode: BroadcastMode.BROADCAST_MODE_BLOCK,
                    },
                    { pathPrefix: this.url },
                ));
            } catch (e) {
                if (
                    JSON.stringify(e)
                        .toLowerCase()
                        .includes("timed out waiting for tx to be included in a block")
                ) {
                    isBroadcastTimedOut = true;
                } else {
                    throw new Error(
                        `Failed to broadcast transaction ID ${txhash}: '${JSON.stringify(
                            e,
                        )}'.`,
                    );
                }
            }

            if (!isBroadcastTimedOut) {
                tx_response!.tx = (
                    await import("./protobuf/cosmos/tx/v1beta1/tx")
                ).Tx.toJSON(
                    (await import("./protobuf/cosmos/tx/v1beta1/tx")).Tx.decode(txBytes),
                ) as AnyJson;

                const tx = tx_response!.tx as TxPb;

                const resolvePubkey = (pubkey: Any) => {
                    if (pubkey.type_url === "/cosmos.crypto.multisig.LegacyAminoPubKey") {
                        const multisig = LegacyAminoPubKey.decode(
                            // @ts-expect-error
                            fromBase64(pubkey.value),
                        );
                        for (let i = 0; i < multisig.public_keys.length; i++) {
                            // @ts-expect-error
                            multisig.public_keys[i] = resolvePubkey(multisig.public_keys[i]);
                        }

                        return LegacyAminoPubKey.toJSON(multisig);
                    } else {
                        return {
                            type_url: pubkey.type_url,
                            // assuming all single pubkeys have the same protobuf type
                            // this works for secp256k1, secp256r1 & ethermint pubkeys
                            value: PubKey.toJSON(
                                PubKey.decode(
                                    // @ts-expect-error
                                    // pubkey.value is actually a base64 string but it's Any
                                    // so TypeScript thinks it's a Uint8Array
                                    fromBase64(pubkey.value),
                                ),
                            ),
                        };
                    }
                };

                //@ts-ignore
                tx.auth_info!.signer_infos! = tx.auth_info?.signer_infos?.map((si) => {
                    //@ts-ignore
                    si.public_key = resolvePubkey(si.public_key);
                    return si;
                });

                for (
                    let i = 0;
                    !isNaN(Number(tx.body?.messages?.length)) &&
                    i < Number(tx.body?.messages?.length);
                    i++
                ) {
                    //@ts-ignore
                    let msg: { type_url: string; value: any } = tx.body!.messages![i];

                    const { type_url: msgType, value: msgBytes } = msg;

                    const msgDecoder = MsgRegistry.get(msgType);
                    if (!msgDecoder) {
                        continue;
                    }

                    msg = {
                        type_url: msgType,
                        value: msgDecoder.decode(fromBase64(msgBytes)),
                    };

                    if (
                        msg.type_url === "/secret.compute.v1beta1.MsgInstantiateContract"
                    ) {
                        msg.value.sender = bytesToAddress(msg.value.sender);
                        msg.value.init_msg = toBase64(msg.value.init_msg);
                        msg.value.callback_sig = null;
                    } else if (
                        msg.type_url === "/secret.compute.v1beta1.MsgExecuteContract"
                    ) {
                        msg.value.sender = bytesToAddress(msg.value.sender);
                        msg.value.contract = bytesToAddress(msg.value.contract);
                        msg.value.msg = toBase64(msg.value.msg);
                        msg.value.callback_sig = null;
                    } else if (msg.type_url === "/secret.compute.v1beta1.MsgStoreCode") {
                        msg.value.sender = bytesToAddress(msg.value.sender);
                        msg.value.wasm_byte_code = toBase64(msg.value.wasm_byte_code);
                    }

                    tx.body!.messages![i] = msg;
                }

                tx_response!.tx = {
                    "@type": "/cosmos.tx.v1beta1.Tx",
                    ...protobufJsonToGrpcGatewayJson(tx_response!.tx),
                };

                return await this.decodeTxResponse(tx_response!);
            }
        } else if (mode === BroadcastMode.Sync) {
            const { BroadcastMode } = await import(
                "./grpc_gateway/cosmos/tx/v1beta1/service.pb"
                );

            ({ tx_response } = await TxService.BroadcastTx(
                {
                    //@ts-ignore for some reason the type is tx_bytes but only works as txBytes
                    txBytes: toBase64(txBytes),
                    mode: BroadcastMode.BROADCAST_MODE_SYNC,
                },
                { pathPrefix: this.url },
            ));

            if (tx_response?.code !== 0) {
                throw new Error(
                    `Broadcasting transaction failed with code ${tx_response?.code} (codespace: ${tx_response?.codespace}). Log: ${tx_response?.raw_log}`,
                );
            }
        } else if (mode === BroadcastMode.Async) {
            const { BroadcastMode } = await import(
                "./grpc_gateway/cosmos/tx/v1beta1/service.pb"
                );

            TxService.BroadcastTx(
                {
                    //@ts-ignore for some reason the type is tx_bytes but only works as txBytes
                    txBytes: toBase64(txBytes),
                    mode: BroadcastMode.BROADCAST_MODE_ASYNC,
                },
                { pathPrefix: this.url },
            );
        } else {
            throw new Error(
                `Unknown broadcast mode "${String(mode)}", must be either "${String(
                    BroadcastMode.Block,
                )}", "${String(BroadcastMode.Sync)}" or "${String(
                    BroadcastMode.Async,
                )}".`,
            );
        }

        if (!waitForCommit) {
            //@ts-ignore
            return { transactionHash: txhash };
        }

        // sleep first because there's no point in checking right after broadcasting
        await sleep(checkIntervalMs / 2);

        while (true) {
            const result = await this.getTx(txhash);

            if (result) {
                return result;
            }

            if (start + timeoutMs < Date.now()) {
                throw new Error(
                    `Transaction ID ${txhash} was submitted but was not yet found on the chain. You might want to check later or increase broadcastTimeoutMs from '${timeoutMs}'.`,
                );
            }

            await sleep(checkIntervalMs);
        }
    }

    public async prepareAndSign(
        messages: Msg[],
        txOptions?: TxOptions,
        simulate: boolean = false,
    ): Promise<Uint8Array> {
        const gasLimit = txOptions?.gasLimit ?? 25_000;
        const gasPriceInFeeDenom = txOptions?.gasPriceInFeeDenom ?? 0.1;
        const feeDenom = txOptions?.feeDenom ?? "uscrt";
        const memo = txOptions?.memo ?? "";
        const feeGranter = txOptions?.feeGranter;

        const explicitSignerData = txOptions?.explicitSignerData;

        const txRaw = await this.sign(
            messages,
            {
                gas: String(gasLimit),
                amount: [
                    {
                        amount: String(gasToFee(gasLimit, gasPriceInFeeDenom)),
                        denom: feeDenom,
                    },
                ],
                granter: feeGranter,
            },
            memo,
            explicitSignerData,
            simulate,
        );

        return TxRaw.encode(txRaw).finish();
    }

    private async signAndBroadcast(
        messages: Msg[],
        txOptions?: TxOptions,
    ): Promise<TxResponse> {
        const txBytes = await this.prepareAndSign(messages, txOptions);

        return this.broadcastTx(
            txBytes,
            txOptions?.broadcastTimeoutMs ?? 60_000,
            txOptions?.broadcastCheckIntervalMs ?? 6_000,
            txOptions?.broadcastMode ?? BroadcastMode.Block,
            txOptions?.waitForCommit ?? true,
            txOptions?.ibcTxsOptions,
        );
    }

    /**
     * Gets account number and sequence from the API, creates a sign doc,
     * creates a single signature and assembles the signed transaction.
     *
     * The sign mode (SIGN_MODE_DIRECT or SIGN_MODE_LEGACY_AMINO_JSON) is determined by this client's signer.
     *
     * You can pass signer data (account number, sequence and chain ID) explicitly instead of querying them
     * from the chain. This is needed when signing for a multisig account, but it also allows for offline signing
     * (See the SigningStargateClient.offline constructor).
     */
    private async sign(
        messages: Msg[],
        fee: StdFee,
        memo: string,
        explicitSignerData?: SignerData,
        simulate: boolean = false,
    ): Promise<TxRaw> {
        const accountFromSigner = (await this.wallet.getAccounts()).find(
            (account) => account.address === this.address,
        );
        if (!accountFromSigner) {
            throw new Error("Failed to retrieve account from signer");
        }

        let signerData: SignerData;
        if (explicitSignerData) {
            signerData = explicitSignerData;
        } else {
            const { account } = await this.query.auth.account({
                address: this.address,
            });

            if (!account) {
                throw new Error(
                    `Cannot find account "${this.address}", make sure it has a balance.`,
                );
            }

            if (account["@type"] !== "/cosmos.auth.v1beta1.BaseAccount") {
                throw new Error(
                    `Cannot sign with account of type "${account["@type"]}", can only sign with "/cosmos.auth.v1beta1.BaseAccount".`,
                );
            }

            const baseAccount = account as BaseAccount;
            signerData = {
                accountNumber: Number(baseAccount.account_number),
                sequence: Number(baseAccount.sequence),
                chainId: this.chainId,
            };
        }

        if (isDirectSigner(this.wallet)) {
            return this.signDirect(
                accountFromSigner,
                messages,
                fee,
                memo,
                signerData,
                simulate,
            );
        } else {
            return this.signAmino(
                accountFromSigner,
                messages,
                fee,
                memo,
                signerData,
                simulate,
            );
        }
    }

    private async signAmino(
        account: AccountData,
        messages: Msg[],
        fee: StdFee,
        memo: string,
        { accountNumber, sequence, chainId }: SignerData,
        simulate: boolean = false,
    ): Promise<TxRaw> {
        if (isDirectSigner(this.wallet)) {
            throw new Error(
                "Wrong signer type! Expected AminoSigner or AminoEip191Signer.",
            );
        }

        let signMode = (
            await import("./protobuf/cosmos/tx/signing/v1beta1/signing")
        ).SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
        if (typeof this.wallet.getSignMode === "function") {
            signMode = await this.wallet.getSignMode();
        }

        const msgs = await Promise.all(
            messages.map(async (msg) => {
                await this.populateCodeHash(msg);
                return msg.toAmino(this.encryptionUtils);
            }),
        );
        const signDoc = makeSignDocAmino(
            msgs,
            fee,
            chainId,
            memo,
            accountNumber,
            sequence,
        );

        let signed: StdSignDoc;
        let signature: StdSignature;

        if (!simulate) {
            ({ signature, signed } = await this.wallet.signAmino(
                account.address,
                signDoc,
            ));
        } else {
            signed = signDoc;
            signature = getSimulateSignature();
        }

        const txBody = {
            type_url: "/cosmos.tx.v1beta1.TxBody",
            value: {
                messages: await Promise.all(
                    messages.map(async (msg, index) => {
                        await this.populateCodeHash(msg);
                        const asProto: ProtoMsg = await msg.toProto(this.encryptionUtils);

                        return asProto;
                    }),
                ),
                memo: memo,
            },
        };
        const txBodyBytes = await this.encodeTx(txBody);
        const signedGasLimit = Number(signed.fee.gas);
        const signedSequence = Number(signed.sequence);
        const pubkey = await encodePubkey(encodeSecp256k1Pubkey(account.pubkey));
        const signedAuthInfoBytes = await makeAuthInfoBytes(
            [{ pubkey, sequence: signedSequence }],
            signed.fee.amount,
            signedGasLimit,
            signed.fee.granter,
            signMode,
        );
        return TxRaw.fromPartial({
            body_bytes: txBodyBytes,
            auth_info_bytes: signedAuthInfoBytes,
            signatures: [fromBase64(signature.signature)],
        });
    }

    private async populateCodeHash(msg: Msg) {
        if (msg instanceof MsgExecuteContract) {
            if (!msg.codeHash) {
                msg.codeHash = (
                    await this.query.compute.codeHashByContractAddress({
                        contract_address: msg.contractAddress,
                    })
                ).code_hash!;
            }
        } else if (msg instanceof MsgInstantiateContract) {
            if (!msg.codeHash) {
                msg.codeHash = (
                    await this.query.compute.codeHashByCodeId({
                        code_id: msg.codeId,
                    })
                ).code_hash!;
            }
        }
    }

    private async encodeTx(txBody: {
        type_url: string;
        value: {
            messages: ProtoMsg[];
            memo: string;
        };
    }): Promise<Uint8Array> {
        const wrappedMessages = await Promise.all(
            txBody.value.messages.map(async (message) => {
                const binaryValue = await message.encode();
                return Any.fromPartial({
                    type_url: message.type_url,
                    value: binaryValue,
                });
            }),
        );

        const txBodyEncoded = TxBodyPb.fromPartial({
            ...txBody.value,
            messages: wrappedMessages,
        });
        return TxBodyPb.encode(txBodyEncoded).finish();
    }

    private async signDirect(
        account: AccountData,
        messages: Msg[],
        fee: StdFee,
        memo: string,
        { accountNumber, sequence, chainId }: SignerData,
        simulate: boolean = false,
    ): Promise<TxRaw> {
        if (!isDirectSigner(this.wallet)) {
            throw new Error("Wrong signer type! Expected DirectSigner.");
        }

        const txBody = {
            type_url: "/cosmos.tx.v1beta1.TxBody",
            value: {
                messages: await Promise.all(
                    messages.map(async (msg, index) => {
                        await this.populateCodeHash(msg);
                        const asProto = await msg.toProto(this.encryptionUtils);

                        return asProto;
                    }),
                ),
                memo: memo,
            },
        };

        const txBodyBytes = await this.encodeTx(txBody);
        const pubkey = await encodePubkey(encodeSecp256k1Pubkey(account.pubkey));
        const gasLimit = Number(fee.gas);
        const authInfoBytes = await makeAuthInfoBytes(
            [{ pubkey, sequence }],
            fee.amount,
            gasLimit,
            fee.granter,
        );

        const signDoc = makeSignDocProto(
            txBodyBytes,
            authInfoBytes,
            chainId,
            accountNumber,
        );

        let signed: SignDoc | SignDocCamelCase;
        let signature: StdSignature;

        if (!simulate) {
            ({ signature, signed } = await this.wallet.signDirect(
                account.address,
                signDoc,
            ));
        } else {
            signed = signDoc;
            signature = getSimulateSignature();
        }

        if (isSignDoc(signed)) {
            // Wallet
            return TxRaw.fromPartial({
                body_bytes: signed.body_bytes,
                auth_info_bytes: signed.auth_info_bytes,
                signatures: [fromBase64(signature.signature)],
            });
        } else if (isSignDocCamelCase(signed)) {
            // cosmjs/Keplr
            return TxRaw.fromPartial({
                body_bytes: signed.bodyBytes,
                auth_info_bytes: signed.authInfoBytes,
                signatures: [fromBase64(signature.signature)],
            });
        } else {
            throw new Error(`unknown SignDoc instance: ${JSON.stringify(signed)}`);
        }
    }
}

function sleep(ms: number) {
    return new Promise((accept) => setTimeout(accept, ms));
}

export function gasToFee(gasLimit: number, gasPrice: number): number {
    return Math.ceil(gasLimit * gasPrice);
}

/**
 * Creates and serializes an AuthInfo document.
 *
 * This implementation does not support different signing modes for the different signers.
 */
async function makeAuthInfoBytes(
    signers: ReadonlyArray<{
        readonly pubkey: import("./protobuf/google/protobuf/any").Any;
        readonly sequence: number;
    }>,
    feeAmount: readonly Coin[],
    gasLimit: number,
    feeGranter?: string,
    signMode?: import("./protobuf/cosmos/tx/signing/v1beta1/signing").SignMode,
): Promise<Uint8Array> {
    if (!signMode) {
        signMode = (await import("./protobuf/cosmos/tx/signing/v1beta1/signing"))
            .SignMode.SIGN_MODE_DIRECT;
    }

    const authInfo: AuthInfo = {
        signer_infos: makeSignerInfos(signers, signMode),
        fee: {
            amount: [...feeAmount],
            gas_limit: String(gasLimit),
            granter: feeGranter ?? "",
            payer: "",
        },
    };

    const { AuthInfo } = await import("./protobuf/cosmos/tx/v1beta1/tx");
    return AuthInfo.encode(AuthInfo.fromPartial(authInfo)).finish();
}

/**
 * Create signer infos from the provided signers.
 *
 * This implementation does not support different signing modes for the different signers.
 */
function makeSignerInfos(
    signers: ReadonlyArray<{
        readonly pubkey: import("./protobuf/google/protobuf/any").Any;
        readonly sequence: number;
    }>,
    signMode: import("./protobuf/cosmos/tx/signing/v1beta1/signing").SignMode,
): import("./protobuf/cosmos/tx/v1beta1/tx").SignerInfo[] {
    return signers.map(
        ({
             pubkey,
             sequence,
         }): import("./protobuf/cosmos/tx/v1beta1/tx").SignerInfo => ({
            public_key: pubkey,
            mode_info: {
                single: { mode: signMode },
            },
            sequence: String(sequence),
        }),
    );
}

/** SignDoc is the type used for generating sign bytes for SIGN_MODE_DIRECT. */
export interface SignDocCamelCase {
    /**
     * bodyBytes is protobuf serialization of a TxBody that matches the
     * representation in TxRaw.
     */
    bodyBytes: Uint8Array;
    /**
     * authInfoBytes is a protobuf serialization of an AuthInfo that matches the
     * representation in TxRaw.
     */
    authInfoBytes: Uint8Array;
    /**
     * chainId is the unique identifier of the chain this transaction targets.
     * It prevents signed transactions from being used on another chain by an
     * attacker
     */
    chainId: string;
    /** accountNumber is the account number of the account in state */
    accountNumber: string;
}

function makeSignDocProto(
    bodyBytes: Uint8Array,
    authInfoBytes: Uint8Array,
    chainId: string,
    accountNumber: number,
): import("./protobuf/cosmos/tx/v1beta1/tx").SignDoc & SignDocCamelCase {
    return {
        body_bytes: bodyBytes,
        auth_info_bytes: authInfoBytes,
        chain_id: chainId,
        account_number: String(accountNumber),

        // cosmjs/Keplr
        bodyBytes,
        authInfoBytes,
        chainId,
        accountNumber: String(accountNumber),
    };
}

async function encodePubkey(
    pubkey: Pubkey,
): Promise<import("./protobuf/google/protobuf/any").Any> {
    const { Any } = await import("./protobuf/google/protobuf/any");

    if (isSecp256k1Pubkey(pubkey)) {
        const { PubKey } = await import("./protobuf/cosmos/crypto/secp256k1/keys");

        const pubkeyProto = PubKey.fromPartial({
            key: fromBase64(pubkey.value),
        });
        return Any.fromPartial({
            type_url: "/cosmos.crypto.secp256k1.PubKey",
            value: Uint8Array.from(PubKey.encode(pubkeyProto).finish()),
        });
    } else if (isMultisigThresholdPubkey(pubkey)) {
        const { LegacyAminoPubKey } = await import(
            "./protobuf/cosmos/crypto/multisig/keys"
            );

        const pubkeyProto = LegacyAminoPubKey.fromPartial({
            threshold: Number(pubkey.value.threshold),
            public_keys: pubkey.value.pubkeys.map(encodePubkey),
        });
        return Any.fromPartial({
            type_url: "/cosmos.crypto.multisig.LegacyAminoPubKey",
            value: Uint8Array.from(LegacyAminoPubKey.encode(pubkeyProto).finish()),
        });
    } else {
        throw new Error(`Pubkey type ${pubkey.type} not recognized`);
    }
}

function isSecp256k1Pubkey(pubkey: Pubkey): boolean {
    return pubkey.type === "tendermint/PubKeySecp256k1";
}

function isMultisigThresholdPubkey(pubkey: Pubkey): boolean {
    return pubkey.type === "tendermint/PubKeyMultisigThreshold";
}

function makeSignDocAmino(
    msgs: readonly AminoMsg[],
    fee: StdFee,
    chainId: string,
    memo: string | undefined,
    accountNumber: number | string,
    sequence: number | string,
): StdSignDoc {
    return {
        chain_id: chainId,
        account_number: String(accountNumber),
        sequence: String(sequence),
        fee: fee,
        msgs: msgs,
        memo: memo || "",
    };
}

export enum TxResultCode {
    /** Success is returned if the transaction executed successfully */
    Success = 0,

    /** ErrInternal should never be exposed, but we reserve this code for non-specified errors */
    ErrInternal = 1,

    /** ErrTxDecode is returned if we cannot parse a transaction */
    ErrTxDecode = 2,

    /** ErrInvalidSequence is used the sequence number (nonce) is incorrect for the signature */
    ErrInvalidSequence = 3,

    /** ErrUnauthorized is used whenever a request without sufficient authorization is handled. */
    ErrUnauthorized = 4,

    /** ErrInsufficientFunds is used when the account cannot pay requested amount. */
    ErrInsufficientFunds = 5,

    /** ErrUnknownRequest to doc */
    ErrUnknownRequest = 6,

    /** ErrInvalidAddress to doc */
    ErrInvalidAddress = 7,

    /** ErrInvalidPubKey to doc */
    ErrInvalidPubKey = 8,

    /** ErrUnknownAddress to doc */
    ErrUnknownAddress = 9,

    /** ErrInvalidCoins to doc */
    ErrInvalidCoins = 10,

    /** ErrOutOfGas to doc */
    ErrOutOfGas = 11,

    /** ErrMemoTooLarge to doc */
    ErrMemoTooLarge = 12,

    /** ErrInsufficientFee to doc */
    ErrInsufficientFee = 13,

    /** ErrTooManySignatures to doc */
    ErrTooManySignatures = 14,

    /** ErrNoSignatures to doc */
    ErrNoSignatures = 15,

    /** ErrJSONMarshal defines an ABCI typed JSON marshalling error */
    ErrJSONMarshal = 16,

    /** ErrJSONUnmarshal defines an ABCI typed JSON unmarshalling error */
    ErrJSONUnmarshal = 17,

    /** ErrInvalidRequest defines an ABCI typed error where the request contains invalid data. */
    ErrInvalidRequest = 18,

    /** ErrTxInMempoolCache defines an ABCI typed error where a tx already exists in the mempool. */
    ErrTxInMempoolCache = 19,

    /** ErrMempoolIsFull defines an ABCI typed error where the mempool is full. */
    ErrMempoolIsFull = 20,

    /** ErrTxTooLarge defines an ABCI typed error where tx is too large. */
    ErrTxTooLarge = 21,

    /** ErrKeyNotFound defines an error when the key doesn't exist */
    ErrKeyNotFound = 22,

    /** ErrWrongPassword defines an error when the key password is invalid. */
    ErrWrongPassword = 23,

    /** ErrorInvalidSigner defines an error when the tx intended signer does not match the given signer. */
    ErrorInvalidSigner = 24,

    /** ErrorInvalidGasAdjustment defines an error for an invalid gas adjustment */
    ErrorInvalidGasAdjustment = 25,

    /** ErrInvalidHeight defines an error for an invalid height */
    ErrInvalidHeight = 26,

    /** ErrInvalidVersion defines a general error for an invalid version */
    ErrInvalidVersion = 27,

    /** ErrInvalidChainID defines an error when the chain-id is invalid. */
    ErrInvalidChainID = 28,

    /** ErrInvalidType defines an error an invalid type. */
    ErrInvalidType = 29,

    /** ErrTxTimeoutHeight defines an error for when a tx is rejected out due to an explicitly set timeout height. */
    ErrTxTimeoutHeight = 30,

    /** ErrUnknownExtensionOptions defines an error for unknown extension options. */
    ErrUnknownExtensionOptions = 31,

    /** ErrWrongSequence defines an error where the account sequence defined in the signer info doesn't match the account's actual sequence number. */
    ErrWrongSequence = 32,

    /** ErrPackAny defines an error when packing a protobuf message to Any fails. */
    ErrPackAny = 33,

    /** ErrUnpackAny defines an error when unpacking a protobuf message from Any fails. */
    ErrUnpackAny = 34,

    /** ErrLogic defines an internal logic error, e.g. an invariant or assertion that is violated. It is a programmer error, not a user-facing error. */
    ErrLogic = 35,

    /** ErrConflict defines a conflict error, e.g. when two goroutines try to access the same resource and one of them fails. */
    ErrConflict = 36,

    /** ErrNotSupported is returned when we call a branch of a code which is currently not supported. */
    ErrNotSupported = 37,

    /** ErrNotFound defines an error when requested entity doesn't exist in the state. */
    ErrNotFound = 38,

    /** ErrIO should be used to wrap internal errors caused by external operation. Examples: not DB domain error, file writing etc... */
    ErrIO = 39,

    /** ErrAppConfig defines an error occurred if min-gas-prices field in BaseConfig is empty. */
    ErrAppConfig = 40,

    /** ErrPanic is only set when we recover from a panic, so we know to redact potentially sensitive system info. */
    ErrPanic = 111222,
}

/**
 * Recursively converts an object of type `{ type_url: string; value: any; }`
 * to type `{ "@type": string; ...values }`
 */
function protobufJsonToGrpcGatewayJson(obj: any): any {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(protobufJsonToGrpcGatewayJson);
    }

    if (
        Object.keys(obj).length === 2 &&
        typeof obj["type_url"] === "string" &&
        typeof obj["value"] === "object"
    ) {
        return Object.assign(
            { "@type": obj["type_url"] },
            protobufJsonToGrpcGatewayJson(obj["value"]),
        );
    }

    const result: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
        result[key] = protobufJsonToGrpcGatewayJson(obj[key]);
    });

    return result;
}

function getSimulateSignature(): StdSignature {
    return {
        pub_key: {
            type: "tendermint/PubKeySecp256k1",
            value: toBase64(new Uint8Array(33).fill(0)),
        },
        signature: toBase64(new Uint8Array(64).fill(0)),
    };
}
