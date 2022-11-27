if (typeof BigInt === "undefined") {
  global.BigInt = require("big-integer");
}

// Note: the order of exports is important here
export * from "@cosmjs/encoding";
export * from "./encryption";
export * from "./query";
export * from "./secret_network_client";
export * from "./tx";
export * from "./utils";
export { WalletOptions } from "./wallet_amino";
export { Wallet } from "./wallet_proto";
export { MetaMaskWallet } from "./wallet_metamask";

export * from "./extensions/snip20";
export * from "./extensions/snip721";
export * from "./extensions/access_control";
export {
  MsgStoreCodeResponse,
  MsgInstantiateContractResponse,
  MsgExecuteContractResponse,
} from "./protobuf/secret/compute/v1beta1/msg";
