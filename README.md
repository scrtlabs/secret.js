# Secret.js

The JavaScript SDK for Secret Network.

Secret.js a JavaScript SDK for writing applications that interact with the Secret Network blockchain. It aims to be a complete library for interacting with the Secret Network blockchain and its ecosystem.

## Table of Contents

- [Secret.js](#secretjs)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Beta Version Notice](#beta-version-notice)
  - [Installation](#installation)
    - [NPM](#npm)
    - [Yarn](#yarn)
  - [Usage](#usage)
    - [Sending Queries](#sending-queries)
    - [Broadcasting Transactions](#broadcasting-transactions)
  - [Full API](#full-api)
  - [Types](#types)

## Key Features

- Written in TypeScript and provided with type definitions.
- Provides simple abstractions over core data structures.
- Supports every possible message and transaction type.
- Exposes every possible query type.
- Handles input/output encryption/decryption for Secret Contracts.
- Works in Node.js, modern web browsers and React Native.

## Beta Version Notice

List of features and their working status:

- [x] Local HD wallet with Secret Network key derivation path
- [ ] Queries
  - [ ] getTx(txhash)
    - [x] working
    - [ ] tested
  - [ ] txsQuery(queryString)
    - [x] working
    - [ ] tested
  - [ ] auth
    - [x] working
    - [ ] tested
  - [ ] authz
    - [x] working
    - [ ] tested
  - [ ] bank
    - [x] working
    - [ ] tested
  - [ ] compute
    - [x] working
    - [ ] tested
  - [ ] distribution
    - [x] working
    - [ ] tested
  - [ ] evidence
    - [x] working
    - [ ] tested
  - [ ] feegrant
    - [x] working
    - [ ] tested
  - [ ] gov
    - [x] working
    - [ ] tested
  - [ ] ibc_channel
    - [x] working
    - [ ] tested
  - [ ] ibc_client
    - [x] working
    - [ ] tested
  - [ ] ibc_connection
    - [x] working
    - [ ] tested
  - [ ] ibc_transfer
    - [x] working
    - [ ] tested
  - [ ] mint
    - [x] working
    - [ ] tested
  - [ ] params
    - [x] working
    - [ ] tested
  - [ ] registration
    - [x] working
    - [ ] tested
  - [ ] slashing
    - [x] working
    - [ ] tested
  - [ ] staking
    - [x] working
    - [ ] tested
  - [ ] tendermint
    - [x] working
    - [ ] tested
  - [ ] upgrade
    - [x] working
    - [ ] tested
- [ ] Transactions

  - [ ] authz
    - [ ] MsgExec
    - [ ] MsgRevoke
    - [ ] MsgGrant
  - [x] bank
    - [x] MsgSend
    - [x] MsgMultiSend
  - [x] compute
    - [x] MsgStoreCode
    - [x] MsgInstantiateContract
      - [ ] output decryption
    - [x] MsgExecuteContract
      - [ ] output decryption
  - [ ] crisis
    - [ ] MsgVerifyInvariant
  - [ ] distribution
    - [ ] MsgWithdrawDelegatorReward
    - [ ] MsgWithdrawValidatorCommission
    - [ ] MsgFundCommunityPool
    - [ ] MsgSetWithdrawAddress
  - [ ] evidence
    - [ ] MsgSubmitEvidence
  - [ ] feegrant
    - [ ] MsgRevokeAllowance
    - [ ] MsgGrantAllowance
  - [ ] gov
    - [ ] MsgSubmitProposal
      - [x] TextProposalContent
      - [x] CommunityPoolSpendProposalContent
      - [x] ParameterChangeProposalContent
      - [ ] ClientUpdateProposalContent
      - [ ] UpgradeProposalContent
      - [ ] SoftwareUpgradeProposalContent - signature missmatch bug
      - [x] CancelSoftwareUpgradeProposalContent
    - [ ] MsgVote
    - [ ] MsgVoteWeighted
    - [ ] MsgDeposit
  - [ ] ibc_channel
    - [ ] MsgChannelCloseConfirm
    - [ ] MsgRecvPacket
    - [ ] MsgTimeout
    - [ ] MsgTimeoutOnClose
    - [ ] MsgChannelOpenInit
    - [ ] MsgAcknowledgement
    - [ ] MsgChannelOpenTry
    - [ ] MsgChannelOpenAck
    - [ ] MsgChannelOpenConfirm
    - [ ] MsgChannelCloseInit
  - [ ] ibc_client
    - [ ] MsgUpgradeClient
    - [ ] MsgSubmitMisbehaviour
    - [ ] MsgCreateClient
    - [ ] MsgUpdateClient
  - [ ] ibc_connection
    - [ ] MsgConnectionOpenTry
    - [ ] MsgConnectionOpenAck
    - [ ] MsgConnectionOpenConfirm
    - [ ] MsgConnectionOpenInit
  - [ ] ibc_transfer
    - [ ] MsgTransfer
  - [ ] slashing
    - [ ] MsgUnjail
  - [ ] staking
    - [ ] MsgCreateValidator
    - [ ] MsgEditValidator
    - [ ] MsgDelegate
    - [ ] MsgBeginRedelegate
    - [ ] MsgUndelegate

## Installation

### NPM

```bash
npm install secretjs@beta
```

### Yarn

```bash
yarn add secretjs@beta
```

## Usage

### Sending Queries

```typescript
// To create a readonly secretjs client, just pass in an RPC endpoint
const secretjs = SecretNetworkClient.create(
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
const wallet = await SecretSecp256k1HdWallet.fromMnemonic(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);
const [{ address: me }] = await wallet.getAccounts();

// To create a signer secretjs client, also pass in a wallet
const secretjs = SecretNetworkClient.create(
  "https://rpc.pulsar.griptapejs.com/",
  {
    signer: wallet,
    signerAddress: me,
    chainId: "pulsar-2",
  },
);

// Sending multiple messages in the same transaction is easy:
const alice = "secret1vnd90m6p64hmz4g5fngeqfusa6shnxhyfmrp59";
const msgSendToAlice = new MsgSend({
  fromAddress: me,
  toAddress: alice,
  amount: [{ denom: "uscrt", amount: "1" }],
});

const bob = "secret1dgqnta7fwjj6x9kusyz7n8vpl73l7wsm0gaamk";
const msgSendToBob = new MsgSend({
  fromAddress: me,
  toAddress: bob,
  amount: [{ denom: "uscrt", amount: "1" }],
});

const tx1 = await secretjs.tx.signAndBroadcast([msgSendToAlice, msgSendToBob], {
  gasLimit: 40_000,
  gasPriceInFeeDenom: 0.25,
  feeDenom: "uscrt",
});

// But in this case we can do it more efficiently:
const msgSendToAliceAndBob = new MsgMultiSend({
  inputs: [
    {
      address: me,
      coins: [{ denom: "uscrt", amount: "2" }],
    },
  ],
  outputs: [
    {
      address: alice,
      coins: [{ denom: "uscrt", amount: "1" }],
    },
    {
      address: bob,
      coins: [{ denom: "uscrt", amount: "1" }],
    },
  ],
});

const tx2 = await secretjs.tx.signAndBroadcast([msgSendToAliceAndBob], {
  gasLimit: 20_000,
  gasPriceInFeeDenom: 0.25,
  feeDenom: "uscrt",
});
```

## Full API

TODO

## Types

TODO generate from jsdocs
