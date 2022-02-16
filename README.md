<p align="center">
  <img src="./media/logo-light.svg#gh-light-mode-only" type="image/svg+xml" width="75%" class="light-logo" />
  <img src="./media/logo-dark.svg#gh-dark-mode-only" type="image/svg+xml" width="75%" class="dark-logo" />
</p>

<p align="center">
  The JavaScript SDK for Secret Network.
</p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/secretjs/beta">
</p>

<p align="center">
  <a href="https://secretjs.scrt.network" target="_blank"><strong>Explore the Docs »</strong></a>
</p>

<h1 id="table-of-contents">Table of Contents</h1>

- [Key Features](#key-features)
- [Beta Version Notice](#beta-version-notice)
- [Installation](#installation)
- [Usage Examples](#usage-examples)
  - [Sending Queries](#sending-queries)
  - [Broadcasting Transactions](#broadcasting-transactions)
- [API](#api)
  - [Wallet](#wallet)
    - [Importing account from mnemonic phrase](#importing-account-from-mnemonic-phrase)
    - [Generating a random account](#generating-a-random-account)
  - [SecretNetworkClient](#secretnetworkclient)
    - [Readonly](#readonly)
    - [Signer](#signer)
      - [Using Keplr](#using-keplr)
        - [`keplr.getOfflineSignerOnlyAmino()`](#keplrgetofflinesigneronlyamino)
        - [`keplr.getOfflineSigner()`](#keplrgetofflinesigner)
        - [`keplr.getOfflineSignerAuto()`](#keplrgetofflinesignerauto)
- [Migrating from Secret.js v0.17.x](#migrating-from-secretjs-v017x)

# Key Features

Secret.js a JavaScript SDK for writing applications that interact with the Secret Network blockchain.

- Written in TypeScript and provided with type definitions.
- Provides simple abstractions over core data structures.
- Supports every possible message and transaction type.
- Exposes every possible query type.
- Handles input/output encryption/decryption for Secret Contracts.
- Works in Node.js, modern web browsers and React Native.

# Beta Version Notice

This library is still in beta, **APIs may break**. Beta testers are welcome!

See [project board](https://github.com/scrtlabs/secret.js/projects/1) for list of existing/missing features.

# Installation

```bash
npm install secretjs@beta
```

or

```bash
yarn add secretjs@beta
```

# Usage Examples

For a lot more usage examples [refer to the tests](./test/test.ts).

## Sending Queries

```typescript
import { SecretNetworkClient } from "secretjs";

// To create a readonly secretjs client, just pass in an RPC endpoint
const secretjs = await SecretNetworkClient.create(
  "https://rpc-secret.scrtlabs.com/secret-4/rpc/",
);

const {
  balance: { amount },
} = await secretjs.query.bank.balance({
  address: "secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03",
  denom: "uscrt",
});

console.log(`I have ${amount / 1e6} SCRT!`);

const {
  codeInfo: { codeHash },
} = await secretjs.query.compute.code(5);

const { token_info } = await secretjs.query.compute.queryContract({
  address: sSCRT,
  codeHash,
  query: { token_info: {} },
});

console.log(`sSCRT has a total supply of ${token_info.total_supply} sSCRT!`);
```

## Broadcasting Transactions

```typescript
import { Wallet, SecretNetworkClient, MsgSend, MsgMultiSend } from "secretjs";

const wallet = new Wallet(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);
const myAddress = wallet.address;

// To create a signer secretjs client, also pass in a wallet
const secretjs = await SecretNetworkClient.create(
  "https://rpc.pulsar.griptapejs.com/",
  {
    wallet: wallet,
    walletAddress: myAddress,
    chainId: "pulsar-2",
  },
);

const bob = "secret1dgqnta7fwjj6x9kusyz7n8vpl73l7wsm0gaamk";
const msg = new MsgSend({
  fromAddress: myAddress,
  toAddress: bob,
  amount: [{ denom: "uscrt", amount: "1" }],
});

const tx = await secretjs.tx.broadcast([msg], {
  gasLimit: 20_000,
  gasPriceInFeeDenom: 0.25,
  feeDenom: "uscrt",
});
```

# API

## Wallet

An offline wallet implementation, used to sign transactions. Usually we'd just want to pass it to `SecretNetworkClient`.

[**Full API »**](https://secretjs.scrt.network/classes/Wallet.html)

### Importing account from mnemonic phrase

```typescript
import { Wallet } from "secretjs";

const wallet = new Wallet(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);
const myAddress = wallet.address;
```

### Generating a random account

```typescript
import { Wallet } from "secretjs";

const wallet = new Wallet();
const myAddress = wallet.address;
const myMnemonicPhrase = wallet.mnemonic;
```

## SecretNetworkClient

[**Full API »**](https://secretjs.scrt.network/classes/SecretNetworkClient.html)

### Readonly

A readonly client can only send queries and get chain information.

TODO

### Signer

A signer client can broadcast transactions, send queries and get chain information.

#### Using Keplr

The recommended way is using `keplr.getOfflineSignerOnlyAmino()`.

TODO

##### `keplr.getOfflineSignerOnlyAmino()`

Although this is the legacy way of signing transactions on cosmos-sdk, it's still the most recommended due to Ledger support & better UI on Keplr.

- 🟩 Looks good on Keplr
- 🟩 Supports users signing with Ledger
- 🟥 Doesn't support signing transactions with these Msgs:
  - authz/MsgExec
  - authz/MsgGrant
  - authz/MsgRevoke
  - feegrant/MsgGrantAllowance
  - feegrant/MsgRevokeAllowance
  - All IBC relayer Msgs:
    - gov/MsgSubmitProposal/ClientUpdateProposal
    - gov/MsgSubmitProposal/UpgradeProposal
    - ibc_channel/MsgAcknowledgement
    - ibc_channel/MsgChannelCloseConfirm
    - ibc_channel/MsgChannelCloseInit
    - ibc_channel/MsgChannelOpenAck
    - ibc_channel/MsgChannelOpenConfirm
    - ibc_channel/MsgChannelOpenInit
    - ibc_channel/MsgChannelOpenTry
    - ibc_channel/MsgRecvPacket
    - ibc_channel/MsgTimeout
    - ibc_channel/MsgTimeoutOnClose
    - ibc_client/MsgCreateClient
    - ibc_client/MsgSubmitMisbehaviour
    - ibc_client/MsgUpdateClient
    - ibc_client/MsgUpgradeClient
    - ibc_connection/MsgConnectionOpenAck
    - ibc_connection/MsgConnectionOpenConfirm
    - ibc_connection/MsgConnectionOpenInit
    - ibc_connection/MsgConnectionOpenTry

Please note that ibc_transfer/MsgTransfer for sending funds across IBC is supported.

<img src="./media/keplr-amino.png" width="45%" />

##### `keplr.getOfflineSigner()`

The new way of signing transactions on cosmos-sdk, it's more efficient but still doesn't have Ledger support, so it's most recommended for usage in apps that don't require signing transactions with Ledger.

- 🟥 Looks bad on Keplr
- 🟥 Doesn't support users signing with Ledger
- 🟩 Supports signing transactions with all types of Msgs

<img src="./media/keplr-proto.png" width="45%" />

##### `keplr.getOfflineSignerAuto()`

Currently this is equivalent to `keplr.getOfflineSigner()` but may change at the discretion of the Keplr team.

# Migrating from Secret.js v0.17.x

TODO
