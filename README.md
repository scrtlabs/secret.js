<p align="center">
  <img src="logo.svg" type="image/svg+xml" width="75%" />
</p>
<p align="center">
  The JavaScript SDK for Secret Network.
</p>

<h2 id="table-of-contents">Table of Contents</h2>

- [Key Features](#key-features)
- [Beta Version Notice](#beta-version-notice)
- [Installation](#installation)
- [Usage](#usage)
  - [Sending Queries](#sending-queries)
  - [Broadcasting Transactions](#broadcasting-transactions)
- [Migration from secretjs v0.17.x](#migration-from-secretjs-v017x)
- [Full API](#full-api)
- [Types](#types)

## Key Features

Secret.js a JavaScript SDK for writing applications that interact with the Secret Network blockchain.

- Written in TypeScript and provided with type definitions.
- Provides simple abstractions over core data structures.
- Supports every possible message and transaction type.
- Exposes every possible query type.
- Handles input/output encryption/decryption for Secret Contracts.
- Works in Node.js, modern web browsers and React Native.

## Beta Version Notice

🟥 - TODO  
🟨 - Implemented  
🟩 - Implemented + Tested

- 🟥 Local HD wallet with Secret Network key derivation path
  - 🟨 Amino signer
  - 🟥 Protobuf signer
- 🟥 Test Keplr integration
- 🟨 Queries
  - 🟨 getTx(txhash)
  - 🟨 txsQuery(queryString)
  - 🟩 auth
  - 🟨 authz
  - 🟨 bank
  - 🟩 compute
  - 🟨 distribution
  - 🟨 evidence
  - 🟨 feegrant
  - 🟨 gov
  - 🟨 ibc_channel
  - 🟨 ibc_client
  - 🟨 ibc_connection
  - 🟨 ibc_transfer
  - 🟨 mint
  - 🟨 params
  - 🟨 registration
  - 🟨 slashing
  - 🟨 staking
  - 🟨 tendermint
  - 🟨 upgrade
- 🟥 Transactions
  - 🟥 authz
    - 🟥 MsgExec
    - 🟥 MsgRevoke
    - 🟥 MsgGrant
  - 🟩 bank
    - 🟩 MsgSend
    - 🟩 MsgMultiSend
  - 🟩 compute
    - 🟩 MsgStoreCode
    - 🟩 MsgInstantiateContract
    - 🟩 MsgExecuteContract
  - 🟥 crisis
    - 🟥 MsgVerifyInvariant
  - 🟥 distribution
    - 🟥 MsgWithdrawDelegatorReward
    - 🟩 MsgWithdrawValidatorCommission
    - 🟩 MsgFundCommunityPool
    - 🟥 MsgSetWithdrawAddress
  - 🟥 evidence
    - 🟥 MsgSubmitEvidence
  - 🟥 feegrant
    - 🟥 MsgRevokeAllowance
    - 🟥 MsgGrantAllowance
  - 🟨 gov
    - 🟨 MsgSubmitProposal
      - 🟩 TextProposalContent
      - 🟩 CommunityPoolSpendProposalContent
      - 🟩 ParameterChangeProposalContent
      - 🟨 ClientUpdateProposalContent
      - 🟨 UpgradeProposalContent
      - 🟨 SoftwareUpgradeProposalContent - signature mismatch bug
      - 🟩 CancelSoftwareUpgradeProposalContent
    - 🟩 MsgVote
    - 🟩 MsgVoteWeighted
    - 🟩 MsgDeposit
  - 🟥 ibc_channel (low priority)
    - 🟥 MsgChannelCloseConfirm
    - 🟥 MsgRecvPacket
    - 🟥 MsgTimeout
    - 🟥 MsgTimeoutOnClose
    - 🟥 MsgChannelOpenInit
    - 🟥 MsgAcknowledgement
    - 🟥 MsgChannelOpenTry
    - 🟥 MsgChannelOpenAck
    - 🟥 MsgChannelOpenConfirm
    - 🟥 MsgChannelCloseInit
  - 🟥 ibc_client (low priority)
    - 🟥 MsgUpgradeClient
    - 🟥 MsgSubmitMisbehaviour
    - 🟥 MsgCreateClient
    - 🟥 MsgUpdateClient
  - 🟥 ibc_connection (low priority)
    - 🟥 MsgConnectionOpenTry
    - 🟥 MsgConnectionOpenAck
    - 🟥 MsgConnectionOpenConfirm
    - 🟥 MsgConnectionOpenInit
  - 🟥 ibc_transfer
    - 🟥 MsgTransfer
  - 🟩 slashing
    - 🟩 MsgUnjail
  - 🟩 staking
    - 🟩 MsgCreateValidator
    - 🟩 MsgEditValidator
    - 🟩 MsgDelegate
    - 🟩 MsgBeginRedelegate
    - 🟩 MsgUndelegate

## Installation

```bash
npm install secretjs@beta
```

or

```bash
yarn add secretjs@beta
```

## Usage

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
import {
  SecretSecp256k1HdWallet,
  SecretNetworkClient,
  MsgSend,
  MsgMultiSend,
} from "secretjs";

const wallet = await SecretSecp256k1HdWallet.fromMnemonic(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);
const [{ address: me }] = await wallet.getAccounts();

// To create a signer secretjs client, also pass in a wallet
const secretjs = await SecretNetworkClient.create(
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

const tx1 = await secretjs.tx.broadcast([msgSendToAlice, msgSendToBob], {
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

const tx2 = await secretjs.tx.broadcast([msgSendToAliceAndBob], {
  gasLimit: 20_000,
  gasPriceInFeeDenom: 0.25,
  feeDenom: "uscrt",
});
```

## Migration from secretjs v0.17.x

TODO

## Full API

TODO

## Types

TODO generate from jsdocs
