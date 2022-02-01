import { toBase64 } from "@cosmjs/encoding";
import is_gzip from "is-gzip";
import pako from "pako";
import { Coin, EncryptionUtils } from "..";
import {
  MsgExecuteContract as MsgExecuteContractProto,
  MsgInstantiateContract as MsgInstantiateContractProto,
  MsgStoreCode as MsgStoreCodeProto,
  protobufPackage,
} from "../protobuf_stuff/secret/compute/v1beta1/msg";
import { addressToBytes } from "../query/secret";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export interface MsgInstantiateContractParams {
  sender: string;
  codeId: number;
  label: string;
  initMsg: object;
  initFunds: Coin[];
  /** The SHA256 hash value of the contract's WASM bytecode, represented as case-insensitive 64 character hex string. This is used to make sure only the contract that's being invoked can decrypt the query data.
   *
   * Valid examples:
   * - "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "0xaf74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "AF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   * - "0xAF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   */
  codeHash: string;
}

export class MsgInstantiateContract implements Msg {
  public sender: string;
  public codeId: number;
  public label: string;
  public initMsg: object;
  public initFunds: Coin[];
  public codeHash: string;

  constructor({
    sender,
    codeId,
    label,
    initMsg,
    initFunds,
    codeHash,
  }: MsgInstantiateContractParams) {
    this.sender = sender;
    this.codeId = codeId;
    this.label = label;
    this.initMsg = initMsg;
    this.initFunds = initFunds;
    this.codeHash = codeHash;
  }
  async toProto(utils: EncryptionUtils): Promise<ProtoMsg> {
    const encryptedContractInput = await utils.encrypt(
      this.codeHash,
      this.initMsg,
    );
    const msgContent: MsgInstantiateContractProto = {
      sender: addressToBytes(this.sender),
      callbackCodeHash: "",
      codeId: String(this.codeId),
      label: this.label,
      initMsg: encryptedContractInput,
      initFunds: this.initFunds,
      callbackSig: new Uint8Array(),
    };

    return {
      typeUrl: `/${protobufPackage}.MsgInstantiateContract`,
      value: msgContent,
      encode: (): Uint8Array => {
        return MsgInstantiateContractProto.encode(msgContent).finish();
      },
    };
  }
  async toAmino(utils: EncryptionUtils): Promise<AminoMsg> {
    const encryptedContractInput = await utils.encrypt(
      this.codeHash,
      this.initMsg,
    );

    return {
      type: "wasm/MsgInstantiateContract",
      value: {
        sender: this.sender,
        code_id: String(this.codeId),
        label: this.label,
        init_msg: toBase64(encryptedContractInput),
        init_funds: this.initFunds,
      },
    };
  }
}

export interface MsgExecuteContractParams {
  sender: string;
  contract: string;
  msg: object;
  sentFunds: Coin[];
  /** The SHA256 hash value of the contract's WASM bytecode, represented as case-insensitive 64 character hex string. This is used to make sure only the contract that's being invoked can decrypt the query data.
   *
   * Valid examples:
   * - "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "0xaf74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
   * - "AF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   * - "0xAF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
   */
  codeHash: string;
}

export class MsgExecuteContract implements Msg {
  public sender: string;
  public contract: string;
  public msg: object;
  public sentFunds: Coin[];
  public codeHash: string;

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
    this.sentFunds = sentFunds;
    this.codeHash = codeHash;
  }

  async toProto(utils: EncryptionUtils): Promise<ProtoMsg> {
    const encryptedContractInput = await utils.encrypt(this.codeHash, this.msg);
    const msgContent: MsgExecuteContractProto = {
      sender: addressToBytes(this.sender),
      contract: addressToBytes(this.contract),
      callbackCodeHash: "",
      msg: encryptedContractInput,
      sentFunds: this.sentFunds,
      callbackSig: new Uint8Array(),
    };

    return {
      typeUrl: `/${protobufPackage}.MsgExecuteContract`,
      value: msgContent,
      encode: (): Uint8Array => {
        return MsgExecuteContractProto.encode(msgContent).finish();
      },
    };
  }
  async toAmino(utils: EncryptionUtils): Promise<AminoMsg> {
    const encryptedContractInput = await utils.encrypt(this.codeHash, this.msg);

    return {
      type: "wasm/MsgExecuteContract",
      value: {
        sender: this.sender,
        contract: this.contract,
        msg: toBase64(encryptedContractInput),
        sent_funds: this.sentFunds,
      },
    };
  }
}

export interface MsgStoreCodeParams {
  sender: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasmByteCode: Uint8Array;
  /** Source is a valid absolute HTTPS URI to the contract's source code, optional */
  source: string;
  /** Builder is a valid docker image name with tag, optional */
  builder: string;
}

export class MsgStoreCode implements Msg {
  public sender: string;
  public wasmByteCode: Uint8Array;
  public source: string;
  public builder: string;

  constructor({ sender, wasmByteCode, source, builder }: MsgStoreCodeParams) {
    this.sender = sender;
    this.source = source;
    this.builder = builder;

    if (is_gzip(wasmByteCode)) {
      this.wasmByteCode = wasmByteCode;
    } else {
      this.wasmByteCode = pako.gzip(wasmByteCode, { level: 9 });
    }
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent: MsgStoreCodeProto = {
      sender: addressToBytes(this.sender),
      wasmByteCode: this.wasmByteCode,
      source: this.source,
      builder: this.builder,
    };

    return {
      typeUrl: `/${protobufPackage}.MsgStoreCode`,
      value: msgContent,
      encode: (): Uint8Array => {
        return MsgStoreCodeProto.encode(msgContent).finish();
      },
    };
  }
  async toAmino(): Promise<AminoMsg> {
    return {
      type: "wasm/MsgExecuteContract",
      value: {
        sender: this.sender,
        wasm_byte_code: toBase64(this.wasmByteCode),
        source: this.source ? this.source : undefined,
        builder: this.builder ? this.builder : undefined,
      },
    };
  }
}
