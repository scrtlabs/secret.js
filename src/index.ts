global.BigInt = require("bigint-polyfill");

// Note: the order of exports is important here
export * from "@cosmjs/encoding";
export * from "./encryption";
export * from "./query";
export * from "./secret_network_client";
export * from "./tx";
export * from "./utils";
export type { WalletOptions } from "./wallet_amino";
export { Wallet } from "./wallet_proto";
export { MetaMaskWallet } from "./wallet_metamask";

export * from "./extensions/snip20";
export * from "./extensions/snip721";
export * from "./extensions/access_control";
export { grpc } from "@improbable-eng/grpc-web";
