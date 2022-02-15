<p align="center">
  <img src="./media/logo-light.svg#gh-light-mode-only" type="image/svg+xml" width="75%" />
  <img src="./media/logo-dark.svg#gh-dark-mode-only" type="image/svg+xml" width="75%" />
</p>

<p align="center">
  The JavaScript SDK for Secret Network.
</p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/secretjs/beta">
</p>

<p align="center">
  <a href="https://secretjs.scrt.network"><strong>Explore the Docs »</strong></a>
</p>

<h2 id="table-of-contents">Table of Contents</h2>

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
- [Migrating from Secret.js v0.17.x](#migrating-from-secretjs-v017x)

## Key Features

Secret.js a JavaScript SDK for writing applications that interact with the Secret Network blockchain.

- Written in TypeScript and provided with type definitions.
- Provides simple abstractions over core data structures.
- Supports every possible message and transaction type.
- Exposes every possible query type.
- Handles input/output encryption/decryption for Secret Contracts.
- Works in Node.js, modern web browsers and React Native.

## Beta Version Notice

This library is still in beta, **APIs may break**. Beta testers are welcome!

See [project board](https://github.com/scrtlabs/secret.js/projects/1) for list of existing/missing features.

## Installation

```bash
npm install secretjs@beta
```

or

```bash
yarn add secretjs@beta
```

## Usage Examples

### Sending Queries

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

### Broadcasting Transactions

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
  gasLimit: 40_000,
  gasPriceInFeeDenom: 0.25,
  feeDenom: "uscrt",
});
```

## API

### Wallet

An offline wallet implementation, used to sign transactions. Usually we'd just want to pass it to `SecretNetworkClient`.

[**Full API »**](https://secretjs.scrt.network/classes/Wallet.html)

#### Importing account from mnemonic phrase

```typescript
import { Wallet } from "secretjs";

const wallet = new Wallet(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);
const myAddress = wallet.address;
```

#### Generating a random account

```typescript
import { Wallet } from "secretjs";

const wallet = new Wallet();
const myAddress = wallet.address;
const myMnemonicPhrase = wallet.mnemonic;
```

### SecretNetworkClient

[**Full API »**](https://secretjs.scrt.network/classes/SecretNetworkClient.html)

#### Readonly

TODO

#### Signer

TODO

## Migrating from Secret.js v0.17.x

TODO
