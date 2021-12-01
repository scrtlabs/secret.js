import { Coin, EncodeObject } from "@cosmjs/proto-signing";

export interface MsgStoreCode {
  /** Bech32 account address */
  sender: string;
  /** Base64 encoded Wasm */
  wasm_byte_code: string;
  /** A valid URI reference to the contract's source code. Can be empty. */
  source?: string;
  /** A docker tag. Can be empty. */
  builder?: string;
}

export interface MsgInstantiateContract {
  /** Bech32 account address */
  sender: string;
  /** ID of the Wasm code that was uploaded before */
  code_id: string;
  /** Human-readable label for this contract */
  label: string;
  /** Init message as JavaScript object */
  init_msg: any;
  /** Funds to send to the contract */
  init_funds: Coin[];
}

export interface MsgExecuteContract {
  /** Bech32 account address */
  sender: string;
  /** Bech32 contract address */
  contract: string;
  /** Handle message as JavaScript object */
  msg: any;
  /** Funds to send to the contract */
  sent_funds: Coin[];
}

interface MsgStoreCodeEncodeObject extends EncodeObject {
  readonly typeUrl: "/secret.compute.v1beta1.MsgStoreCode";
  readonly value: MsgStoreCode;
}

interface MsgInstantiateContractEncodeObject extends EncodeObject {
  readonly typeUrl: "/secret.compute.v1beta1.MsgInstantiateContract";
  readonly value: MsgInstantiateContract;
}

interface MsgExecuteContractEncodeObject extends EncodeObject {
  readonly typeUrl: "/secret.compute.v1beta1.MsgExecuteContract";
  readonly value: MsgExecuteContract;
}

export function isMsgStoreCode(
  encodeObject: EncodeObject
): encodeObject is MsgStoreCodeEncodeObject {
  return (
    (encodeObject as MsgStoreCodeEncodeObject).typeUrl ===
    "/secret.compute.v1beta1.MsgStoreCode"
  );
}
export function isMsgInstantiateContract(
  encodeObject: EncodeObject
): encodeObject is MsgInstantiateContractEncodeObject {
  return (
    (encodeObject as MsgInstantiateContractEncodeObject).typeUrl ===
    "/secret.compute.v1beta1.MsgInstantiateContract"
  );
}

export function isMsgExecuteContract(
  encodeObject: EncodeObject
): encodeObject is MsgExecuteContractEncodeObject {
  return (
    (encodeObject as MsgExecuteContractEncodeObject).typeUrl ===
    "/secret.compute.v1beta1.MsgExecuteContract"
  );
}

export function createMsgStoreCode(
  value: MsgStoreCode
): MsgStoreCodeEncodeObject {
  return {
    typeUrl: "/secret.compute.v1beta1.MsgStoreCode",
    value,
  };
}

export function createMsgInstantiateContract(
  value: MsgInstantiateContract
): MsgInstantiateContractEncodeObject {
  return {
    typeUrl: "/secret.compute.v1beta1.MsgInstantiateContract",
    value,
  };
}

export function createMsgExecuteContract(
  value: MsgExecuteContract
): MsgExecuteContractEncodeObject {
  return {
    typeUrl: "/secret.compute.v1beta1.MsgExecuteContract",
    value,
  };
}
