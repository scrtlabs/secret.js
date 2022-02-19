import { toBase64 } from "@cosmjs/encoding";
import is_gzip from "is-gzip";
import { MsgParams } from ".";
import { EncryptionUtils } from "..";
import { addressToBytes } from "../query/compute";
import { AminoMsg, Coin, Msg, ProtoMsg } from "./types";

export interface MsgInstantiateContractParams extends MsgParams {
  sender: string;
  /** The id of the contract's WASM code */
  codeId: number;
  /** A unique label across all contracts */
  label: string;
  /** The input message to the contract's constructor */
  initMsg: any;
  /** Funds to send to the contract */
  initFunds?: Coin[];
  /** The SHA256 hash value of the contract's WASM bytecode, represented as case-insensitive 64
   * character hex string.
   * This is used to make sure only the contract that's being invoked can decrypt the query data.
   *
   * codeHash is an optional parameter but using it will result in way faster execution time.
   *
   * Valid examples:
   * - "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "0xaf74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "AF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   * - "0xAF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   */
  codeHash?: string;
}

export function getMissingCodeHashWarning(method: string): string {
  return `${new Date().toISOString()} WARNING: ${method} was used without the "codeHash" parameter. This is discouraged and will result in much slower execution times for your app.`;
}

/** Instantiate a contract from code id */
export class MsgInstantiateContract implements Msg {
  public sender: string;
  public codeId: string;
  public label: string;
  public initMsg: object;
  private initMsgEncrypted: Uint8Array | null;
  public initFunds: Coin[];
  public codeHash: string;
  private warnCodeHash: boolean = false;

  constructor({
    sender,
    codeId,
    label,
    initMsg,
    initFunds,
    codeHash,
  }: MsgInstantiateContractParams) {
    this.sender = sender;
    this.codeId = String(codeId);
    this.label = label;
    this.initMsg = initMsg;
    this.initMsgEncrypted = null;
    this.initFunds = initFunds ?? [];

    if (codeHash) {
      this.codeHash = codeHash.replace("0x", "").toLowerCase();
    } else {
      // codeHash will be set in SecretNetworkClient before invoking toProto() & toAimno()
      this.codeHash = "";
      this.warnCodeHash = true;
      console.warn(getMissingCodeHashWarning("MsgInstantiateContract"));
    }
  }

  async toProto(utils: EncryptionUtils): Promise<ProtoMsg> {
    if (this.warnCodeHash) {
      console.warn(getMissingCodeHashWarning("MsgInstantiateContract"));
    }

    if (!this.initMsgEncrypted) {
      // The encryption uses a random nonce
      // toProto() & toAmino() are called multiple times during signing
      // so to keep the msg consistant across calls we encrypt the msg only once
      this.initMsgEncrypted = await utils.encrypt(this.codeHash, this.initMsg);
    }

    const msgContent = {
      sender: addressToBytes(this.sender),
      codeId: this.codeId,
      label: this.label,
      initMsg: this.initMsgEncrypted,
      initFunds: this.initFunds,
      // callbackSig & callbackCodeHash are internal stuff that doesn't matter here
      callbackSig: new Uint8Array(),
      callbackCodeHash: "",
    };

    return {
      typeUrl: "/secret.compute.v1beta1.MsgInstantiateContract",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/secret/compute/v1beta1/msg")
        ).MsgInstantiateContract.encode(msgContent).finish(),
    };
  }

  async toAmino(utils: EncryptionUtils): Promise<AminoMsg> {
    if (this.warnCodeHash) {
      console.warn(getMissingCodeHashWarning("MsgInstantiateContract"));
    }

    if (!this.initMsgEncrypted) {
      // The encryption uses a random nonce
      // toProto() & toAmino() are called multiple times during signing
      // so to keep the msg consistant across calls we encrypt the msg only once
      this.initMsgEncrypted = await utils.encrypt(this.codeHash, this.initMsg);
    }

    return {
      type: "wasm/MsgInstantiateContract",
      value: {
        sender: this.sender,
        code_id: this.codeId,
        label: this.label,
        init_msg: toBase64(this.initMsgEncrypted),
        init_funds: this.initFunds,
      },
    };
  }
}

export interface MsgExecuteContractParams extends MsgParams {
  sender: string;
  /** The contract's address */
  contract: string;
  /** The input message */
  msg: any;
  /** Funds to send to the contract */
  sentFunds?: Coin[];
  /** The SHA256 hash value of the contract's WASM bytecode, represented as case-insensitive 64
   * character hex string.
   * This is used to make sure only the contract that's being invoked can decrypt the query data.
   *
   * codeHash is an optional parameter but using it will result in way faster execution time.
   *
   * Valid examples:
   * - "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "0xaf74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "AF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   * - "0xAF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   */
  codeHash?: string;
}

/** Execute a function on a contract */
export class MsgExecuteContract implements Msg {
  public sender: string;
  public contract: string;
  public msg: object;
  private msgEncrypted: Uint8Array | null;
  public sentFunds: Coin[];
  public codeHash: string;
  private warnCodeHash: boolean = false;

  constructor({
    sender,
    contract,
    msg,
    sentFunds,
    codeHash,
  }: MsgExecuteContractParams) {
    this.sender = sender;
    this.contract = contract;
    this.msg = msg;
    this.msgEncrypted = null;
    this.sentFunds = sentFunds ?? [];

    if (codeHash) {
      this.codeHash = codeHash.replace("0x", "").toLowerCase();
    } else {
      // codeHash will be set in SecretNetworkClient before invoking toProto() & toAimno()
      this.codeHash = "";
      this.warnCodeHash = true;
      console.warn(getMissingCodeHashWarning("MsgExecuteContract"));
    }
  }

  async toProto(utils: EncryptionUtils): Promise<ProtoMsg> {
    if (this.warnCodeHash) {
      console.warn(getMissingCodeHashWarning("MsgExecuteContract"));
    }

    if (!this.msgEncrypted) {
      // The encryption uses a random nonce
      // toProto() & toAmino() are called multiple times during signing
      // so to keep the msg consistant across calls we encrypt the msg only once
      this.msgEncrypted = await utils.encrypt(this.codeHash, this.msg);
    }

    const msgContent = {
      sender: addressToBytes(this.sender),
      contract: addressToBytes(this.contract),
      msg: this.msgEncrypted,
      sentFunds: this.sentFunds,
      // callbackSig & callbackCodeHash are internal stuff that doesn't matter here
      callbackSig: new Uint8Array(),
      callbackCodeHash: "",
    };

    return {
      typeUrl: "/secret.compute.v1beta1.MsgExecuteContract",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/secret/compute/v1beta1/msg")
        ).MsgExecuteContract.encode(msgContent).finish(),
    };
  }
  async toAmino(utils: EncryptionUtils): Promise<AminoMsg> {
    if (this.warnCodeHash) {
      console.warn(getMissingCodeHashWarning("MsgExecuteContract"));
    }

    if (!this.msgEncrypted) {
      // The encryption uses a random nonce
      // toProto() & toAmino() are called multiple times during signing
      // so to keep the msg consistant across calls we encrypt the msg only once
      this.msgEncrypted = await utils.encrypt(this.codeHash, this.msg);
    }

    return {
      type: "wasm/MsgExecuteContract",
      value: {
        sender: this.sender,
        contract: this.contract,
        msg: toBase64(this.msgEncrypted),
        sent_funds: this.sentFunds,
      },
    };
  }
}

export interface MsgStoreCodeParams extends MsgParams {
  sender: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasmByteCode: Uint8Array;
  /** Source is a valid absolute HTTPS URI to the contract's source code, optional */
  source: string;
  /** Builder is a valid docker image name with tag, optional */
  builder: string;
}

/** Upload a compiled contract to Secret Network */
export class MsgStoreCode implements Msg {
  public sender: string;
  public wasmByteCode: Uint8Array;
  public source: string;
  public builder: string;

  constructor({ sender, wasmByteCode, source, builder }: MsgStoreCodeParams) {
    this.sender = sender;
    this.source = source;
    this.builder = builder;
    this.wasmByteCode = wasmByteCode;
  }

  private async gzipWasm() {
    if (!is_gzip(this.wasmByteCode)) {
      const pako = await import("pako");
      this.wasmByteCode = pako.gzip(this.wasmByteCode, { level: 9 });
    }
  }

  async toProto(): Promise<ProtoMsg> {
    await this.gzipWasm();

    const msgContent = {
      sender: addressToBytes(this.sender),
      wasmByteCode: this.wasmByteCode,
      source: this.source,
      builder: this.builder,
    };

    return {
      typeUrl: "/secret.compute.v1beta1.MsgStoreCode",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/secret/compute/v1beta1/msg")
        ).MsgStoreCode.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    await this.gzipWasm();

    return {
      type: "wasm/MsgStoreCode",
      value: {
        sender: this.sender,
        wasm_byte_code: toBase64(this.wasmByteCode),
        source: this.source.length > 0 ? this.source : undefined,
        builder: this.builder.length > 0 ? this.builder : undefined,
      },
    };
  }
}
