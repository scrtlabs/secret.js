if (typeof BigInt === "undefined") {
  global.BigInt = require("big-integer");
}

// Note: the order of exports is important here
export * from "@cosmjs/encoding";
export * from "./encryption";
export * from "./query";
export * from "./secret_network_client";
export * from "./tx";
export {
  base64PubkeyToAddress,
  pubkeyToAddress,
  WalletOptions,
} from "./wallet_amino";
export { Wallet } from "./wallet_proto";
export { MetaMaskWallet } from "./wallet_metamask";
// export { MetaMaskTextWallet } from "./metamask_signer_eip191";

export * from "./extensions/snip20";
export * from "./extensions/snip721";
export * from "./extensions/access_control";
export { grpc } from "@improbable-eng/grpc-web";
