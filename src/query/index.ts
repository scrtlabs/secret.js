// ls | sort | grep -v index | awk -F \. '{print "export * from \"./" $1 "\";"}' > index.t

export * from "./auth";
export * from "./authz";
export * from "./bank";
export * from "./compute";
export * from "./distribution";
export * from "./evidence";
export * from "./feegrant";
export * from "./gov";
export * from "./ibc_channel";
export * from "./ibc_client";
export * from "./ibc_connection";
export * from "./ibc_transfer";
export * from "./mauth";
export * from "./mint";
export * from "./node";
export * from "./params";
export * from "./registration";
export * from "./slashing";
export * from "./staking";
export * from "./tendermint";
export * from "./upgrade";
