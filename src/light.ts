if (typeof BigInt === "undefined") {
    global.BigInt = require("big-integer");
}

export { SecretNetworkClientLight as SecretNetworkClient } from "./light-client";