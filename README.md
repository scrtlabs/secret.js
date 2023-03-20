<p align="center">
  <img src="./media/logo-light.svg#gh-light-mode-only" type="image/svg+xml" width="75%" class="light-logo" />
  <img src="./media/logo-dark.svg#gh-dark-mode-only" type="image/svg+xml" width="75%" class="dark-logo" />
</p>

<p align="center">
  The JavaScript SDK for Secret Network
</p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/secretjs" />
  <img alt="ci" style="margin-left: 0.3em" src="https://github.com/scrtlabs/secret.js/actions/workflows/test.yml/badge.svg?branch=master" />
</p>

<p align="center">
  <a href="https://secretjs.scrt.network" target="_blank"><strong>Explore the Docs »</strong></a>
</p>
<p align="center">
  <a href="https://github.com/scrtlabs/secret.js" target="_blank"><strong>GitHub »</strong></a>
</p>

<h1 id="table-of-contents">Table of Contents</h1>

- [Key Features](#key-features)
- [Beta Version Notice](#beta-version-notice)
- [Installation](#installation)
- [Usage Examples](#usage-examples)
  - [Sending Queries](#sending-queries)
  - [Broadcasting Transactions](#broadcasting-transactions)
- [Integrations](#integrations)
  - [MetaMask](#metamask)
  - [Keplr Wallet](#keplr-wallet)
    - [`SignerOnlyAmino` vs `Signer` vs `SignerAuto`](#signeronlyamino-vs-signer-vs-signerauto)
  - [Fina Wallet](#fina-wallet)
    - [Deep linking](#deep-linking)
  - [Leap Cosmos Wallet](#leap-cosmos-wallet)
  - [StarShell Wallet](#starshell-wallet)
- [API](#api)
  - [Wallet](#wallet)
    - [Importing account from mnemonic](#importing-account-from-mnemonic)
    - [Generating a random account](#generating-a-random-account)
  - [SecretNetworkClient](#secretnetworkclient)
    - [Querier secret.js](#querier-secretjs)
    - [Signer secret.js](#signer-secretjs)
    - [`secretjs.query`](#secretjsquery)
    - [`secretjs.address`](#secretjsaddress)
    - [`secretjs.tx`](#secretjstx)
    - [Resolve IBC Responses](#resolve-ibc-responses)
  - [Helper Functions](#helper-functions)
    - [`pubkeyToAddress()`](#pubkeytoaddress)
    - [`base64PubkeyToAddress()`](#base64pubkeytoaddress)
    - [`selfDelegatorAddressToValidatorAddress()`](#selfdelegatoraddresstovalidatoraddress)
    - [`validatorAddressToSelfDelegatorAddress()`](#validatoraddresstoselfdelegatoraddress)
    - [`tendermintPubkeyToValconsAddress()`](#tendermintpubkeytovalconsaddress)
    - [`base64TendermintPubkeyToValconsAddress()`](#base64tendermintpubkeytovalconsaddress)
    - [`ibcDenom()`](#ibcdenom)
    - [`stringToCoins()` / `coinsFromString()`](#stringtocoins--coinsfromstring)
    - [`stringToCoins()` / `coinFromString()`](#stringtocoins--coinfromstring)
    - [`validateAddress()`](#validateaddress)

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
npm install secretjs
```

or

```bash
yarn add secretjs
```

**Additional step for React Native:**

Follow the instruction of [react-native-get-random-values](https://www.npmjs.com/package/react-native-get-random-values) package

# Usage Examples

Note: Public gRPC-web endpoints can be found in https://github.com/scrtlabs/api-registry for both mainnet and testnet.

For a lot more usage examples [refer to the tests](./test/test.ts).

## Sending Queries

```ts
import { SecretNetworkClient, grpc } from "secretjs";

const url = "TODO get from https://github.com/scrtlabs/api-registry";

// To create a readonly secret.js client, just pass in a gRPC-web endpoint
const secretjs = new SecretNetworkClient({
  url,
  chainId: "secret-4",
});

const {
  balance: { amount },
} = await secretjs.query.bank.balance(
  {
    address: "secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03",
    denom: "uscrt",
  } /*,
  // optional: query at a specific height (using an archive node) 
  [["x-cosmos-block-height", "2000000"]]
  */,
);

console.log(`I have ${Number(amount) / 1e6} SCRT!`);

const sSCRT = "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek";
// Get codeHash using `secretcli q compute contract-hash secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek`
const sScrtCodeHash =
  "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e";

const { token_info } = await secretjs.query.compute.queryContract({
  contract_address: sSCRT,
  code_hash: sScrtCodeHash, // optional but way faster
  query: { token_info: {} },
});

console.log(`sSCRT has ${token_info.decimals} decimals!`);
```

## Broadcasting Transactions

```ts
import { Wallet, SecretNetworkClient, MsgSend, MsgMultiSend } from "secretjs";

const wallet = new Wallet(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);
const myAddress = wallet.address;

const url = "TODO get from https://github.com/scrtlabs/api-registry";

// To create a signer secret.js client, also pass in a wallet
const secretjs = new SecretNetworkClient({
  url,
  chainId: "secret-4",
  wallet: wallet,
  walletAddress: myAddress,
});

const bob = "secret1dgqnta7fwjj6x9kusyz7n8vpl73l7wsm0gaamk";
const msg = new MsgSend({
  from_address: myAddress,
  to_address: bob,
  amount: stringToCoins("1uscrt"),
});

const tx = await secretjs.tx.broadcast([msg], {
  gasLimit: 20_000,
  gasPriceInFeeDenom: 0.1,
  feeDenom: "uscrt",
});
```

# Integrations

## MetaMask

```ts
import { SecretNetworkClient, MetaMaskWallet } from "secretjs";

//@ts-ignore
const [ethAddress] = await window.ethereum.request({
  method: "eth_requestAccounts",
});

const wallet = await MetaMaskWallet.create(window.ethereum, ethAddress);

const secretjs = new SecretNetworkClient({
  url: "TODO get from https://github.com/scrtlabs/api-registry",
  chainId: "secret-4",
  wallet: wallet,
  walletAddress: wallet.address,
});
```

Notes:

1. MetaMask supports mobile!
2. MetaMask supports Ledger.
3. You might want to pass `encryptionSeed` to `SecretNetworkClient.create()` to use the same encryption key for the user across sessions. This value should be a true random 32 byte number that is stored securly in your app, such that only the user can decrypt it. This can also be a `sha256(user_password)` but might impair UX.
4. See Keplr's [`getOfflineSignerOnlyAmino()`](#getofflinesigneronlyamino) for list of unsupported transactions.

<img src="./media/metamask-signing-example.jpg" width="55%" style="border-radius: 10px;" />

## Keplr Wallet

The recommended way of integrating Keplr is by using `window.keplr.getOfflineSignerOnlyAmino()`:

```ts
import { SecretNetworkClient } from "secretjs";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

while (
  !window.keplr ||
  !window.getEnigmaUtils ||
  !window.getOfflineSignerOnlyAmino
) {
  await sleep(50);
}

const CHAIN_ID = "secret-4";

await window.keplr.enable(CHAIN_ID);

const keplrOfflineSigner = window.keplr.getOfflineSignerOnlyAmino(CHAIN_ID);
const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

const url = "TODO get from https://github.com/scrtlabs/api-registry";

const secretjs = new SecretNetworkClient({
  url,
  chainId: CHAIN_ID,
  wallet: keplrOfflineSigner,
  walletAddress: myAddress,
  encryptionUtils: window.keplr.getEnigmaUtils(CHAIN_ID),
});

// Note: Using `window.getEnigmaUtils` is optional, it will allow
// Keplr to use the same encryption seed across sessions for the account.
// The benefit of this is that `secretjs.query.getTx()` will be able to decrypt
// the response across sessions.
```

Notes:

1. No mobile support yet.
2. Keplr supports Ledger.
3. By using `encryptionUtils` you let Keplr handle user encryption keys for you, which allows you to easily decrypt transactions across sessions.

Links:

- <a href="https://www.keplr.app" target="_blank"><strong>Official Keplr Website »</strong></a>
- <a href="https://docs.keplr.app/api" target="_blank"><strong>Keplr API Docs »</strong></a>

### `SignerOnlyAmino` vs `Signer` vs `SignerAuto`

TLDR:

- [`getOfflineSignerOnlyAmino()`](#getofflinesigneronlyamino): The recommended way. Supports Ledger, has a nice UI.
- [`getOfflineSigner()`](#getofflinesigner): No Ledger support, ugly UI, can send IBC **relayer** txs and submit IBC gov proposals.
- [`getOfflineSignerAuto()`](#getofflinesignerauto): If Ledger alias for `getOfflineSignerOnlyAmino()`, otherwise alias for `getOfflineSigner()`.

#### `window.keplr.getOfflineSignerOnlyAmino()`

Although this is the legacy way of signing transactions on cosmos-sdk, it's still the most recommended for connecting to Keplr due to Ledger support & better UI on Keplr.

- 🟩 Looks good on Keplr
- 🟩 Supports users signing with Ledger
- 🟥 Doesn't support signing these transactions:
  - Every tx type under `ibc_client`, `ibc_connection` and `ibc_channel` (meaning IBC relaying, for example with [ts-relayer](https://github.com/confio/ts-relayer))
  - [gov/MsgSubmitProposal/ClientUpdateProposal](https://secretjs.scrt.network/enums/ProposalType#ClientUpdateProposal)
  - [gov/MsgSubmitProposal/UpgradeProposal](https://secretjs.scrt.network/enums/ProposalType#UpgradeProposal)

Note that [ibc_transfer/MsgTransfer](https://secretjs.scrt.network/classes/MsgTransfer) for sending funds across IBC **is** supported.

<img src="./media/keplr-amino.png" width="55%" style="border-style: solid;border-color: #5e72e4;border-radius: 10px;" />

#### `window.keplr.getOfflineSigner()`

The new way of signing transactions on cosmos-sdk, it's more efficient but still doesn't have Ledger support, so it's most recommended for usage in apps that don't require signing transactions with Ledger.

- 🟥 Looks bad on Keplr
- 🟥 Doesn't support users signing with Ledger
- 🟩 Supports signing transactions with all types of Msgs

<img src="./media/keplr-proto.png" width="55%" style="border-style: solid;border-color: #5e72e4;border-radius: 10px;" />

#### `window.keplr.getOfflineSignerAuto()`

If the connected Keplr account uses Ledger, returns `window.keplr.getOfflineSignerOnlyAmino()`.  
Otherwise returns `window.keplr.getOfflineSigner()`.

## Fina Wallet

Fina implements the Keplr API, so [the above Keplr docs](#keplr-wallet) applies. If you support Keplr, your app will also work on the Fina Wallet mobile app. This works because the Fina Wallet mobile app has webview to which it injects its objects under `window.keplr`.

### Deep linking

Fina supports deep linking into its in-app browser.

Example1: `fina://wllet/dapps?network=secret-4&url=https%3A%2F%2Fdash.scrt.network`

Example2:

If a user accessed your app using a regular mobile browser, you can open your app in the Fina in-app browser using this code:

```ts
const urlSearchParams = new URLSearchParams();
urlSearchParams.append("network", "secret-4");
urlSearchParams.append("url", window.location.href);

window.open(`fina://wllet/dapps?${urlSearchParams.toString()}`, "_blank");
```

Links:

- <a href="https://fina.cash" target="_blank"><strong>Official Fina Website »</strong></a>

## Leap Cosmos Wallet

The recommended way of integrating Leap is by using `window.leap.getOfflineSignerOnlyAmino()`:

```ts
import { SecretNetworkClient } from "secretjs";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

while (
  !window.leap ||
  !window.leap.getEnigmaUtils ||
  !window.leap.getOfflineSignerOnlyAmino
) {
  await sleep(50);
}

const CHAIN_ID = "secret-4";

await window.leap.enable(CHAIN_ID);

const leapOfflineSigner = window.leap.getOfflineSignerOnlyAmino(CHAIN_ID);
const [{ address: myAddress }] = await leapOfflineSigner.getAccounts();

const url = "TODO get from https://github.com/scrtlabs/api-registry";

const secretjs = new SecretNetworkClient({
  url,
  chainId: CHAIN_ID,
  wallet: leapOfflineSigner,
  walletAddress: myAddress,
  encryptionUtils: window.leap.getEnigmaUtils(CHAIN_ID),
});

// Note: Using `window.leap.getEnigmaUtils()` is optional, it will allow
// Leap to use the same encryption seed across sessions for the account.
// The benefit of this is that `secretjs.query.getTx()` will be able to decrypt
// the response across sessions.
```

Links:

- <a href="https://www.leapwallet.io/cosmos" target="_blank"><strong>Official Leap Website »</strong></a>
- <a href="https://docs.leapwallet.io/cosmos/connect-to-leap/introduction" target="_blank"><strong>Leap API Docs »</strong></a>

## StarShell Wallet

StarShell implements the Keplr API, so [the above Keplr docs](#keplr-wallet) applies. If you support Keplr, your app will also work on StarShell wallet. This works because StarShell wallet asks the user to turn off Keplr and then overrides `window.keplr` with its objects.

Links:

- <a href="https://starshell.net" target="_blank"><strong>Official StarShell Website »</strong></a>

# API

## Wallet

An offline wallet implementation, used to sign transactions. Usually we'd just want to pass it to `SecretNetworkClient`.

[**Full API »**](https://secretjs.scrt.network/classes/Wallet.html)

### Importing account from mnemonic

```ts
import { Wallet } from "secretjs";

const wallet = new Wallet(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);
const myAddress = wallet.address;
```

### Generating a random account

```ts
import { Wallet } from "secretjs";

const wallet = new Wallet();
const myAddress = wallet.address;
const myMnemonicPhrase = wallet.mnemonic;
```

## SecretNetworkClient

[**Full API »**](https://secretjs.scrt.network/classes/SecretNetworkClient.html)

### Querier secret.js

A querier client can only send queries and get chain information. Access to all query types can be done via `secretjs.query`.

```ts
import { SecretNetworkClient } from "secretjs";

const url = "TODO get from https://github.com/scrtlabs/api-registry";

// To create a readonly secret.js client, just pass in a gRPC-web endpoint
const secretjs = new SecretNetworkClient({
  chainId: "secret-4",
  url,
});
```

### Signer secret.js

A signer client can broadcast transactions, send queries and get chain information.

Here in addition to `secretjs.query`, there are also `secretjs.tx` & `secretjs.address`.

```ts
import { Wallet, SecretNetworkClient, MsgSend, MsgMultiSend } from "secretjs";

const wallet = new Wallet(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);
const myAddress = wallet.address;

const url = "TODO get from https://github.com/scrtlabs/api-registry";

// To create a signer secret.js client you must also pass in `wallet`, `walletAddress` and `chainId`
const secretjs = new SecretNetworkClient({
  url,
  chainId: "secret-4",
  wallet: wallet,
  walletAddress: myAddress,
});
```

### `secretjs.query`

#### `secretjs.query.getTx(hash)`

Returns a transaction with a txhash. `hash` is a 64 character upper-case hex string.

#### `secretjs.query.txsQuery(query)`

Returns all transactions that match a query.

To tell which events you want, you need to provide a query. query is a string, which has a form: `condition AND condition ...` (no OR at the moment). Condition has a form: `key operation operand`. key is a string with a restricted set of possible symbols (`\t`, `\n`, `\r`, `\`, `(`, `)`, `"`, `'`, `=`, `>`, `<` are not allowed). Operation can be `=`, `<`, `<=`, `>`, `>=`, `CONTAINS` AND `EXISTS`. Operand can be a string (escaped with single quotes), number, date or time.

Examples:

- `tx.hash = 'XYZ'` # single transaction
- `tx.height = 5` # all txs of the fifth block
- `create_validator.validator = 'ABC'` # tx where validator ABC was created

Tendermint provides a few predefined keys: `tx.hash` and `tx.height`. You can provide additional event keys that were emitted during the transaction. All events are indexed by a composite key of the form `{eventType}.{evenAttrKey}`. Multiple event types with duplicate keys are allowed and are meant to categorize unique and distinct events.

To create a query for txs where AddrA transferred funds: `transfer.sender = 'AddrA'`

See `txsQuery` under https://secretjs.scrt.network/modules#Querier.

#### `secretjs.query.auth.account()`

Returns account details based on address.

```ts
const { address, accountNumber, sequence } = await secretjs.query.auth.account({
  address: myAddress,
});
```

#### `secretjs.query.auth.accounts()`

Returns all existing accounts on the blockchain.

```ts
/// Get all accounts
const result = await secretjs.query.auth.accounts({});
```

#### `secretjs.query.auth.params()`

Queries all x/auth parameters.

```ts
const {
  params: {
    maxMemoCharacters,
    sigVerifyCostEd25519,
    sigVerifyCostSecp256k1,
    txSigLimit,
    txSizeCostPerByte,
  },
} = await secretjs.query.auth.params();
```

#### `secretjs.query.authz.grants()`

Returns list of authorizations, granted to the grantee by the granter.

#### `secretjs.query.bank.balance()`

Balance queries the balance of a single coin for a single account.

```ts
const { balance } = await secretjs.query.bank.balance({
  address: myAddress,
  denom: "uscrt",
});
```

#### `secretjs.query.bank.allBalances()`

AllBalances queries the balance of all coins for a single account.

#### `secretjs.query.bank.totalSupply()`

TotalSupply queries the total supply of all coins.

#### `secretjs.query.bank.supplyOf()`

SupplyOf queries the supply of a single coin.

#### `secretjs.query.bank.params()`

Params queries the parameters of x/bank module.

#### `secretjs.query.bank.denomMetadata()`

DenomsMetadata queries the client metadata of a given coin denomination.

#### `secretjs.query.bank.denomsMetadata()`

DenomsMetadata queries the client metadata for all registered coin denominations.

#### `secretjs.query.compute.contractCodeHash()`

Get codeHash of a Secret Contract.

#### `secretjs.query.compute.codeHash()`

Get codeHash from a code id.

#### `secretjs.query.compute.contractInfo()`

Get metadata of a Secret Contract.

#### `secretjs.query.compute.contractsByCode()`

Get all contracts that were instantiated from a code id.

#### `secretjs.query.compute.queryContract()`

Query a Secret Contract.

```ts
type Result = {
  token_info: {
    decimals: number;
    name: string;
    symbol: string;
    total_supply: string;
  };
};

const result = (await secretjs.query.compute.queryContract({
  contract_address: sScrtAddress,
  code_hash: sScrtCodeHash, // optional but way faster
  query: { token_info: {} },
})) as Result;
```

#### `secretjs.query.compute.code()`

Get WASM bytecode and metadata for a code id.

```ts
const { codeInfo } = await secretjs.query.compute.code(codeId);
```

#### `secretjs.query.compute.codes()`

Query all contract codes on-chain.

#### `secretjs.query.distribution.params()`

Params queries params of the distribution module.

#### `secretjs.query.distribution.validatorOutstandingRewards()`

ValidatorOutstandingRewards queries rewards of a validator address.

#### `secretjs.query.distribution.validatorCommission()`

ValidatorCommission queries accumulated commission for a validator.

#### `secretjs.query.distribution.validatorSlashes()`

ValidatorSlashes queries slash events of a validator.

#### `secretjs.query.distribution.delegationRewards()`

DelegationRewards queries the total rewards accrued by a delegation.

#### `secretjs.query.distribution.delegationTotalRewards()`

DelegationTotalRewards queries the total rewards accrued by a each validator.

#### `secretjs.query.distribution.delegatorValidators()`

DelegatorValidators queries the validators of a delegator.

#### `secretjs.query.distribution.delegatorWithdrawAddress()`

DelegatorWithdrawAddress queries withdraw address of a delegator.

#### `secretjs.query.distribution.communityPool()`

CommunityPool queries the community pool coins.

#### `secretjs.query.distribution.foundationTax()`

DelegatorWithdrawAddress queries withdraw address of a delegator.

#### `secretjs.query.evidence.evidence()`

Evidence queries evidence based on evidence hash.

#### `secretjs.query.evidence.allEvidence()`

AllEvidence queries all evidence.

#### `secretjs.query.feegrant.allowance()`

Allowance returns fee granted to the grantee by the granter.

#### `secretjs.query.feegrant.allowances()`

Allowances returns all the grants for address.

#### `secretjs.query.gov.proposal()`

Proposal queries proposal details based on ProposalID.

#### `secretjs.query.gov.proposals()`

Proposals queries all proposals based on given status.

```ts
// Get all proposals
const { proposals } = await secretjs.query.gov.proposals({
  proposal_status: ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
  voter: "",
  depositor: "",
});
```

#### `secretjs.query.gov.vote()`

Vote queries voted information based on proposalID, voterAddr.

#### `secretjs.query.gov.votes()`

Votes queries votes of a given proposal.

#### `secretjs.query.gov.params()`

Params queries all parameters of the gov module.

#### `secretjs.query.gov.deposit()`

Deposit queries single deposit information based proposalID, depositAddr.

```ts
const {
  deposit: { amount },
} = await secretjs.query.gov.deposit({
  depositor: myAddress,
  proposalId: propId,
});
```

#### `secretjs.query.gov.deposits()`

Deposits queries all deposits of a single proposal.

#### `secretjs.query.gov.tallyResult()`

TallyResult queries the tally of a proposal vote.

#### `secretjs.query.ibc_channel.channel()`

Channel queries an IBC Channel.

#### `secretjs.query.ibc_channel.channels()`

Channels queries all the IBC channels of a chain.

#### `secretjs.query.ibc_channel.connectionChannels()`

ConnectionChannels queries all the channels associated with a connection end.

#### `secretjs.query.ibc_channel.channelClientState()`

ChannelClientState queries for the client state for the channel associated with the provided channel identifiers.

#### `secretjs.query.ibc_channel.channelConsensusState()`

ChannelConsensusState queries for the consensus state for the channel associated with the provided channel identifiers.

#### `secretjs.query.ibc_channel.packetCommitment()`

PacketCommitment queries a stored packet commitment hash.

#### `secretjs.query.ibc_channel.packetCommitments()`

PacketCommitments returns all the packet commitments hashes associated with a channel.

#### `secretjs.query.ibc_channel.packetReceipt()`

PacketReceipt queries if a given packet sequence has been received on the queried chain

#### `secretjs.query.ibc_channel.packetAcknowledgement()`

PacketAcknowledgement queries a stored packet acknowledgement hash.

#### `secretjs.query.ibc_channel.packetAcknowledgements()`

PacketAcknowledgements returns all the packet acknowledgements associated with a channel.

#### `secretjs.query.ibc_channel.unreceivedPackets()`

UnreceivedPackets returns all the unreceived IBC packets associated with a channel and sequences.

#### `secretjs.query.ibc_channel.unreceivedAcks()`

UnreceivedAcks returns all the unreceived IBC acknowledgements associated with a channel and sequences.

#### `secretjs.query.ibc_channel.nextSequenceReceive()`

NextSequenceReceive returns the next receive sequence for a given channel.

#### `secretjs.query.ibc_client.clientState()`

ClientState queries an IBC light client.

#### `secretjs.query.ibc_client.clientStates()`

ClientStates queries all the IBC light clients of a chain.

#### `secretjs.query.ibc_client.consensusState()`

ConsensusState queries a consensus state associated with a client state at a given height.

#### `secretjs.query.ibc_client.consensusStates()`

ConsensusStates queries all the consensus state associated with a given client.

#### `secretjs.query.ibc_client.clientStatus()`

Status queries the status of an IBC client.

#### `secretjs.query.ibc_client.clientParams()`

ClientParams queries all parameters of the ibc client.

#### `secretjs.query.ibc_client.upgradedClientState()`

UpgradedClientState queries an Upgraded IBC light client.

#### `secretjs.query.ibc_client.upgradedConsensusState()`

UpgradedConsensusState queries an Upgraded IBC consensus state.

#### `secretjs.query.ibc_connection.connection()`

Connection queries an IBC connection end.

#### `secretjs.query.ibc_connection.connections()`

Connections queries all the IBC connections of a chain.

#### `secretjs.query.ibc_connection.clientConnections()`

ClientConnections queries the connection paths associated with a client state.

#### `secretjs.query.ibc_connection.connectionClientState()`

ConnectionClientState queries the client state associated with the connection.

#### `secretjs.query.ibc_connection.connectionConsensusState()`

ConnectionConsensusState queries the consensus state associated with the connection.

#### `secretjs.query.ibc_transfer.denomTrace()`

DenomTrace queries a denomination trace information.

#### `secretjs.query.ibc_transfer.denomTraces()`

DenomTraces queries all denomination traces.

#### `secretjs.query.ibc_transfer.params()`

Params queries all parameters of the ibc-transfer module.

#### `secretjs.query.mint.params()`

Params returns the total set of minting parameters.

#### `secretjs.query.mint.inflation()`

Inflation returns the current minting inflation value.

#### `secretjs.query.mint.annualProvisions()`

AnnualProvisions current minting annual provisions value.

#### `secretjs.query.params.params()`

Params queries a specific parameter of a module, given its subspace and key.

#### `secretjs.query.registration.txKey()`

Returns the key used for transactions.

#### `secretjs.query.registration.registrationKey()`

Returns the key used for registration.

#### `secretjs.query.registration.encryptedSeed()`

Returns the encrypted seed for a registered node by public key.

#### `secretjs.query.slashing.params()`

Params queries the parameters of slashing module.

#### `secretjs.query.slashing.signingInfo()`

SigningInfo queries the signing info of given cons address.

#### `secretjs.query.slashing.signingInfos()`

SigningInfos queries signing info of all validators.

#### `secretjs.query.staking.validators()`

Validators queries all validators that match the given status.

```ts
// Get all validators
const { validators } = await secretjs.query.staking.validators({ status: "" });
```

#### `secretjs.query.staking.validator()`

Validator queries validator info for given validator address.

#### `secretjs.query.staking.validatorDelegations()`

ValidatorDelegations queries delegate info for given validator.

#### `secretjs.query.staking.validatorUnbondingDelegations()`

ValidatorUnbondingDelegations queries unbonding delegations of a validator.

#### `secretjs.query.staking.delegation()`

Delegation queries delegate info for given validator delegator pair.

#### `secretjs.query.staking.unbondingDelegation()`

UnbondingDelegation queries unbonding info for given validator delegator pair.

#### `secretjs.query.staking.delegatorDelegations()`

DelegatorDelegations queries all delegations of a given delegator address.

#### `secretjs.query.staking.delegatorUnbondingDelegations()`

DelegatorUnbondingDelegations queries all unbonding delegations of a given delegator address.

#### `secretjs.query.staking.redelegations()`

Redelegations queries redelegations of given address.

#### `secretjs.query.staking.delegatorValidators()`

DelegatorValidators queries all validators info for given delegator address.

#### `secretjs.query.staking.delegatorValidator()`

DelegatorValidator queries validator info for given delegator validator pair.

#### `secretjs.query.staking.historicalInfo()`

HistoricalInfo queries the historical info for given height.

#### `secretjs.query.staking.pool()`

Pool queries the pool info.

#### `secretjs.query.staking.params()`

Parameters queries the staking parameters.

#### `secretjs.query.tendermint.getNodeInfo()`

GetNodeInfo queries the current node info.

#### `secretjs.query.tendermint.getSyncing()`

GetSyncing queries node syncing.

#### `secretjs.query.tendermint.getLatestBlock()`

GetLatestBlock returns the latest block.

#### `secretjs.query.tendermint.getBlockByHeight()`

GetBlockByHeight queries block for given height.

#### `secretjs.query.tendermint.getLatestValidatorSet()`

GetLatestValidatorSet queries latest validator-set.

#### `secretjs.query.tendermint.getValidatorSetByHeight()`

GetValidatorSetByHeight queries validator-set at a given height.

#### `secretjs.query.upgrade.currentPlan()`

CurrentPlan queries the current upgrade plan.

#### `secretjs.query.upgrade.appliedPlan()`

AppliedPlan queries a previously applied upgrade plan by its name.

#### `secretjs.query.upgrade.upgradedConsensusState()`

UpgradedConsensusState queries the consensus state that will serve as a trusted kernel for the next version of this chain. It will only be stored at the last height of this chain.

#### `secretjs.query.upgrade.moduleVersions()`

ModuleVersions queries the list of module versions from state.

### `secretjs.address`

On a signer secret.js, `secretjs.address` is the same as `walletAddress`:

```ts
import { Wallet, SecretNetworkClient } from "secretjs";

const wallet = new Wallet(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);
const myAddress = wallet.address;

const url = "TODO get from https://github.com/scrtlabs/api-registry";

// To create a signer secret.js client, also pass in a wallet
const secretjs = new SecretNetworkClient({
  url,
  chainId: "secret-4",
  wallet: wallet,
  walletAddress: myAddress,
});

const alsoMyAddress = secretjs.address;
```

### `secretjs.tx`

On a signer secret.js, `secretjs.tx` is used to broadcast transactions. Every function under `secretjs.tx` can receive an optional [TxOptions](https://secretjs.scrt.network/modules#TxOptions).

[**Full API »**](https://secretjs.scrt.network/modules#TxSender)

#### `secretjs.tx.broadcast()`

Used to send a complex transactions, which contains a list of messages. The messages are executed in sequence, and the transaction succeeds if all messages succeed.

For a list of all messages see: https://secretjs.scrt.network/interfaces/Msg

```ts
const addMinterMsg = new MsgExecuteContract({
  sender: MY_ADDRESS,
  contract_address: MY_NFT_CONTRACT,
  code_hash: MY_NFT_CONTRACT_CODE_HASH, // optional but way faster
  msg: { add_minters: { minters: [MY_ADDRESS] } },
  sent_funds: [], // optional
});

const mintMsg = new MsgExecuteContract({
  sender: MY_ADDRESS,
  contract_address: MY_NFT_CONTRACT,
  code_hash: MY_NFT_CONTRACT_CODE_HASH, // optional but way faster
  msg: {
    mint_nft: {
      token_id: "1",
      owner: MY_ADDRESS,
      public_metadata: {
        extension: {
          image: "https://scrt.network/secretnetwork-logo-secondary-black.png",
          name: "secretnetwork-logo-secondary-black",
        },
      },
      private_metadata: {
        extension: {
          image: "https://scrt.network/secretnetwork-logo-primary-white.png",
          name: "secretnetwork-logo-primary-white",
        },
      },
    },
  },
  sent_funds: [], // optional
});

const tx = await secretjs.tx.broadcast([addMinterMsg, mintMsg], {
  gasLimit: 200_000,
});
```

#### `secretjs.tx.simulate()`

Used to simulate a complex transactions, which contains a list of messages, without broadcasting it to the chain. Can be used to get a gas estimation or to see the output without actually committing a transaction on-chain.

The input should be exactly how you'd use it in `secretjs.tx.broadcast()`, except that you don't have to pass in `gasLimit`, `gasPriceInFeeDenom` & `feeDenom`.

Notes:

- :warning: On mainnet it's recommended to not simulate every transaction as this can burden your node provider. Instead, use this while testing to determine the gas limit for each of your app's transactions, then in production use hard-coded values.
- Gas estimation is known to be a bit off, so you might need to adjust it a bit before broadcasting.
- `MsgInstantiateContract` & `MsgExecuteContract` simulation is not supported for security reasons.

```ts
const sendToAlice = new MsgSend({
  from_address: bob,
  to_address: alice,
  amount: stringToCoins("1uscrt"),
});

const sendToEve = new MsgSend({
  from_address: bob,
  to_address: eve,
  amount: stringToCoins("1uscrt"),
});

const sim = await secretjs.tx.simulate([sendToAlice, sendToEve]);

const tx = await secretjs.tx.broadcast([sendToAlice, sendToEve], {
  // Adjust gasLimit up by 10% to account for gas estimation error
  gasLimit: Math.ceil(sim.gasInfo.gasUsed * 1.1),
});
```

#### `secretjs.tx.signTx()`

Used to sign transactions independently from the broadcast process.  
This is useful when you want to keep your seed safe and sign transactions offline.

#### `secretjs.tx.broadcastSignedTx()`

Used to send offline signed transactions.

```ts
const bob = "secret1dgqnta7fwjj6x9kusyz7n8vpl73l7wsm0gaamk";
const msg = new MsgSend({
  from_address: myAddress,
  to_address: bob,
  amount: stringToCoins("1000000uscrt"),
});

let signedTX = await secretjs.tx.signTx([msg], {
  gasLimit: 20_000,
  gasPriceInFeeDenom: 0.1,
  feeDenom: "uscrt",
});

let tx = await secretjs.tx.broadcastSignedTx(signedTX);
```

#### `secretjs.tx.authz.exec()`

MsgExec attempts to execute the provided messages using authorizations granted to the grantee. Each message should have only one signer corresponding to the granter of the authorization.

Input: [MsgExecParams](https://secretjs.scrt.network/interfaces/MsgExecParams)

##### `secretjs.tx.authz.exec.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.authz.grant()`

MsgGrant is a request type for Grant method. It declares authorization to the grantee on behalf of the granter with the provided expiration time.

Input: [MsgGrantParams](https://secretjs.scrt.network/interfaces/MsgGrantParams)

##### `secretjs.tx.authz.grant.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.authz.revoke()`

MsgRevoke revokes any authorization with the provided sdk.Msg type on the granter's account with that has been granted to the grantee.

Input: [MsgRevokeParams](https://secretjs.scrt.network/interfaces/MsgRevokeParams)

##### `secretjs.tx.authz.revoke.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.bank.multiSend()`

MsgMultiSend represents an arbitrary multi-in, multi-out send message.

Input: [MsgMultiSendParams](https://secretjs.scrt.network/interfaces/MsgMultiSendParams)

```ts
const tx = await secretjs.tx.bank.multiSend(
  {
    inputs: [
      {
        address: myAddress,
        coins: stringToCoins("2uscrt"),
      },
    ],
    outputs: [
      {
        address: alice,
        coins: stringToCoins("1uscrt"),
      },
      {
        address: bob,
        coins: stringToCoins("1uscrt"),
      },
    ],
  },
  {
    gasLimit: 20_000,
  },
);
```

    ##### `secretjs.tx.bank.multiSend.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.bank.send()`

MsgSend represents a message to send coins from one account to another.

Input: [MsgSendParams](https://secretjs.scrt.network/interfaces/MsgSendParams)

```ts
const tx = await secretjs.tx.bank.send(
  {
    from_address: myAddress,
    to_address: alice,
    amount: stringToCoins("1uscrt"),
  },
  {
    gasLimit: 20_000,
  },
);
```

##### `secretjs.tx.bank.send.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.compute.storeCode()`

Upload a compiled contract to Secret Network

Input: [MsgStoreCodeParams](https://secretjs.scrt.network/interfaces/MsgStoreCodeParams)

```ts
const tx = await secretjs.tx.compute.storeCode(
  {
    sender: myAddress,
    wasm_byte_code: fs.readFileSync(
      `${__dirname}/snip20-ibc.wasm.gz`,
    ) as Uint8Array,
    source: "",
    builder: "",
  },
  {
    gasLimit: 1_000_000,
  },
);

const codeId = Number(
  tx.arrayLog.find((log) => log.type === "message" && log.key === "code_id")
    .value,
);
```

##### `secretjs.tx.compute.storeCode.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.compute.instantiateContract()`

Instantiate a contract from code id

Input: [MsgInstantiateContractParams](https://secretjs.scrt.network/interfaces/MsgInstanti

ateContractParams)

```ts
const tx = await secretjs.tx.compute.instantiateContract(
  {
    sender: myAddress,
    code_id: codeId,
    code_hash: codeHash, // optional but way faster
    initMsg: {
      name: "Secret SCRT",
      admin: myAddress,
      symbol: "SSCRT",
      decimals: 6,
      initial_balances: [{ address: myAddress, amount: "1" }],
      prng_seed: "eW8=",
      config: {
        public_total_supply: true,
        enable_deposit: true,
        enable_redeem: true,
        enable_mint: false,
        enable_burn: false,
      },
      supported_denoms: ["uscrt"],
    },
    label: "sSCRT",
    init_funds: [], // optional
  },
  {
    gasLimit: 100_000,
  },
);

const contractAddress = tx.arrayLog.find(
  (log) => log.type === "message" && log.key === "contract_address",
).value;
```

##### `secretjs.tx.compute.instantiateContract.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

WARNING: `secretjs.tx.compute.instantiateContract()` & `secretjs.tx.compute.executeContract()` simulation is not supported for security reasons.

#### `secretjs.tx.compute.executeContract()`

Execute a function on a contract

Input: [MsgExecuteContractParams](https://secretjs.scrt.network/interfaces/MsgExecuteContractParams)

```ts
const tx = await secretjs.tx.compute.executeContract(
  {
    sender: myAddress,
    contract_address: contractAddress,
    code_hash: codeHash, // optional but way faster
    msg: {
      transfer: {
        recipient: bob,
        amount: "1",
      },
    },
    sent_funds: [], // optional
  },
  {
    gasLimit: 100_000,
  },
);
```

##### `secretjs.tx.compute.executeContract.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

WARNING: `secretjs.tx.compute.instantiateContract()` & `secretjs.tx.compute.executeContract()` simulation is not supported for security reasons.

#### `secretjs.tx.crisis.verifyInvariant()`

MsgVerifyInvariant represents a message to verify a particular invariance.

Input: [MsgVerifyInvariantParams](https://secretjs.scrt.network/interfaces/MsgVerifyInvariantParams)

##### `secretjs.tx.crisis.verifyInvariant.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.distribution.fundCommunityPool()`

MsgFundCommunityPool allows an account to directly fund the community pool.

Input: [MsgFundCommunityPoolParams](https://secretjs.scrt.network/interfaces/MsgFundCommunityPoolParams)

```ts
const tx = await secretjs.tx.distribution.fundCommunityPool(
  {
    depositor: myAddress,
    amount: stringToCoins("1uscrt"),
  },
  {
    gasLimit: 20_000,
  },
);
```

##### `secretjs.tx.distribution.fundCommunityPool.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.distribution.setWithdrawAddress()`

MsgSetWithdrawAddress sets the withdraw address for a delegator (or validator self-delegation).

Input: [MsgSetWithdrawAddressParams](https://secretjs.scrt.network/interfaces/MsgSetWithdrawAddressParams)

```ts
const tx = await secretjs.tx.distribution.setWithdrawAddress(
  {
    delegator_address: mySelfDelegatorAddress,
    withdraw_address: myOtherAddress,
  },
  {
    gasLimit: 20_000,
  },
);
```

##### `secretjs.tx.distribution.setWithdrawAddress.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.distribution.withdrawDelegatorReward()`

MsgWithdrawDelegatorReward represents delegation withdrawal to a delegator from a single validator.

Input: [MsgWithdrawDelegatorRewardParams](https://secretjs.scrt.network/interfaces/MsgWithdrawDelegatorRewardParams)

```ts
const tx = await secretjs.tx.distribution.withdrawDelegatorReward(
  {
    delegator_address: myAddress,
    validator_address: someValidatorAddress,
  },
  {
    gasLimit: 20_000,
  },
);
```

##### `secretjs.tx.distribution.withdrawDelegatorReward.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.distribution.withdrawValidatorCommission()`

MsgWithdrawValidatorCommission withdraws the full commission to the validator address.

Input: [MsgWithdrawValidatorCommissionParams](https://secretjs.scrt.network/interfaces/MsgWithdrawValidatorCommissionParams)

```ts
const tx = await secretjs.tx.distribution.withdrawValidatorCommission(
  {
    validator_address: myValidatorAddress,
  },
  {
    gasLimit: 20_000,
  },
);
```

Or a better one:

```ts
const tx = await secretjs.tx.broadcast(
  [
    new MsgWithdrawDelegatorReward({
      delegator_address: mySelfDelegatorAddress,
      validator_address: myValidatorAddress,
    }),
    new MsgWithdrawValidatorCommission({
      validator_address: myValidatorAddress,
    }),
  ],
  {
    gasLimit: 30_000,
  },
);
```

##### `secretjs.tx.distribution.withdrawValidatorCommission.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.evidence.submitEvidence()`

MsgSubmitEvidence represents a message that supports submitting arbitrary evidence of misbehavior such as equivocation or counterfactual signing.

Input: [MsgSubmitEvidenceParams](https://secretjs.scrt.network/interfaces/MsgSubmitEvidenceParams)

##### `secretjs.tx.evidence.submitEvidence.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.feegrant.grantAllowance()`

MsgGrantAllowance adds permission for Grantee to spend up to Allowance of fees from the account of Granter.

Input: [MsgGrantAllowanceParams](https://secretjs.scrt.network/interfaces/MsgGrantAllowanceParams)

```ts
const newWallet = new Wallet();

const txGranter = await secretjsGranter.tx.feegrant.grantAllowance({
  granter: secretjsGranter.address,
  grantee: newWallet.address,
  allowance: {
    spend_limit: stringToCoins("1000000uscrt"),
  },
});

const secretjsGrantee = new SecretNetworkClient({
  url: "http://localhost:1317",
  chainId: "secretdev-1",
  wallet: newWallet,
  walletAddress: newWallet.address,
});

// Send a tx from newWallet with secretjs.address as the fee payer
cosnt txGrantee = await secretjsGrantee.tx.gov.submitProposal(
  {
    proposer: secretjsGrantee.address,
    type: ProposalType.TextProposal,
    initial_deposit: [],
    content: {
      title: "Send a tx without any balance",
      description: `Thanks ${secretjsGranter.address}!`,
    },
  },
  {
    feeGranter: secretjsGranter.address,
  },
);
```

##### `secretjs.tx.feegrant.grantAllowance.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.feegrant.revokeAllowance()`

MsgRevokeAllowance removes any existing Allowance from Granter to Grantee.

Input: [MsgRevokeAllowanceParams](https://secretjs.scrt.network/interfaces/MsgRevokeAllowanceParams)

```ts
const tx = await secretjs.tx.feegrant.revokeAllowance({
  granter: secretjs.address,
  grantee: newWallet.address,
});
```

##### `secretjs.tx.feegrant.revokeAllowance.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.gov.deposit()`

MsgDeposit defines a message to submit a deposit to an existing proposal.

Input: [MsgDepositParams](https://secretjs.scrt.network/interfaces/MsgDepositParams)

```ts
const tx = await secretjs.tx.gov.deposit(
  {
    depositor: myAddress,
    proposal_id: someProposalId,
    amount: stringToCoins("1uscrt"),
  },
  {
    gasLimit: 20_000,
  },
);
```

##### `secretjs.tx.gov.deposit.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.gov.submitProposal()`

MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary proposal Content.

Input: [MsgSubmitProposalParams](https://secretjs.scrt.network/interfaces/MsgSubmitProposalParams)

```ts
const tx = await secretjs.tx.gov.submitProposal(
  {
    type: ProposalType.TextProposal,
    proposer: myAddress,
    initial_deposit: stringToCoins("100000000uscrt"),
    content: {
      title: "Hi",
      description: "Let's vote on this",
    },
  },
  {
    gasLimit: 50_000,
  },
);

const proposalId = Number(
  tx.arrayLog.find(
    (log) => log.type === "submit_proposal" && log.key === "proposal_id",
  ).value,
);
```

##### `secretjs.tx.gov.submitProposal.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.gov.vote()`

MsgVote defines a message to cast a vote.

Input: [MsgVoteParams](https://secretjs.scrt.network/interfaces/MsgVoteParams)

```ts
const tx = await secretjs.tx.gov.vote(
  {
    voter: myAddress,
    proposal_id: someProposalId,
    option: VoteOption.VOTE_OPTION_YES,
  },
  {
    gasLimit: 50_000,
  },
);
```

##### `secretjs.tx.gov.vote.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.gov.voteWeighted()`

MsgVoteWeighted defines a message to cast a vote, with an option to split the vote.

Input: [MsgVoteWeightedParams](https://secretjs.scrt.network/interfaces/MsgVoteWeightedParams)

```ts
// vote yes with 70% of my power
const tx = await secretjs.tx.gov.voteWeighted(
  {
    voter: myAddress,
    proposal_id: someProposalId,
    options: [
      // weights must sum to 1.0
      { weight: 0.7, option: VoteOption.VOTE_OPTION_YES },
      { weight: 0.3, option: VoteOption.VOTE_OPTION_ABSTAIN },
    ],
  },
  {
    gasLimit: 50_000,
  },
);
```

##### `secretjs.tx.gov.voteWeighted.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.ibc.transfer()`

MsgTransfer defines a msg to transfer fungible tokens (i.e Coins) between ICS20 enabled chains. See ICS Spec here: https://github.com/cosmos/ics/tree/master/spec/ics-020-fungible-token-transfer#data-structures

Input: [MsgTransferParams](https://secretjs.scrt.network/interfaces/MsgTransferParams)

##### `secretjs.tx.ibc.transfer.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.slashing.unjail()`

MsgUnjail defines a message to release a validator from jail.

Input: [MsgUnjailParams](https://secretjs.scrt.network/interfaces/MsgUnjailParams)

```ts
const tx = await secretjs.tx.slashing.unjail(
  {
    validator_addr: mValidatorsAddress,
  },
  {
    gasLimit: 50_000,
  },
);
```

##### `secretjs.tx.slashing.unjail.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.staking.beginRedelegate()`

MsgBeginRedelegate defines an SDK message for performing a redelegation of coins from a delegator and source validator to a destination validator.

Input: [MsgBeginRedelegateParams](https://secretjs.scrt.network/interfaces/MsgBeginRedelegateParams)

```ts
const tx = await secretjs.tx.staking.beginRedelegate(
  {
    delegator_address: myAddress,
    validator_src_address: someValidator,
    validator_dst_address: someOtherValidator,
    amount: stringToCoin("1uscrt"),
  },
  {
    gasLimit: 50_000,
  },
);
```

##### `secretjs.tx.staking.beginRedelegate.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.staking.createValidator()`

MsgCreateValidator defines an SDK message for creating a new validator.

Input: [MsgCreateValidatorParams](https://secretjs.scrt.network/interfaces/MsgCreateValidatorParams)

```ts
const tx = await secretjs.tx.staking.createValidator(
  {
    delegator_address: myAddress,
    commission: {
      max_change_rate: 0.01, // can change +-1% every 24h
      max_rate: 0.1, // 10%
      rate: 0.05, // 5%
    },
    description: {
      moniker: "My validator's display name",
      identity: "ID on keybase.io, to have a logo on explorer and stuff",
      website: "example.com",
      security_contact: "hi@example.com",
      details: "**We** are good",
    },
    pubkey: toBase64(new Uint8Array(32).fill(1)), // validator's pubkey, to sign on validated blocks
    min_self_delegation: "1", // uscrt
    initial_delegation: stringToCoin("1uscrt"),
  },
  {
    gasLimit: 100_000,
  },
);
```

##### `secretjs.tx.staking.createValidator.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.staking.delegate()`

MsgDelegate defines an SDK message for performing a delegation of coins from a delegator to a validator.

Input: [MsgDelegateParams](https://secretjs.scrt.network/interfaces/MsgDelegateParams)

```ts
const tx = await secretjs.tx.staking.delegate(
  {
    delegator_address: myAddress,
    validator_address: someValidatorAddress,
    amount: stringToCoin("1uscrt"),
  },
  {
    gasLimit: 50_000,
  },
);
```

##### `secretjs.tx.staking.delegate.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.staking.editValidator()`

MsgEditValidator defines an SDK message for editing an existing validator.

Input: [MsgEditValidatorParams](https://secretjs.scrt.network/interfaces/MsgEditValidatorParams)

```ts
const tx = await secretjs.tx.staking.editValidator(
  {
    validator_address: myValidatorAddress,
    description: {
      // To edit even one item in "description you have to re-input everything
      moniker: "papaya",
      identity: "banana",
      website: "watermelon.com",
      security_contact: "sec@watermelon.com",
      details: "We are the banana papaya validator yay!",
    },
    min_self_delegation: "2",
    commission_rate: 0.04, // 4%, commission cannot be changed more than once in 24h
  },
  {
    gasLimit: 5_000_000,
  },
);
```

##### `secretjs.tx.staking.editValidator.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

#### `secretjs.tx.staking.undelegate()`

MsgUndelegate defines an SDK message for performing an undelegation from a delegate and a validator

Input: [MsgUndelegateParams](https://secretjs.scrt.network/interfaces/MsgUndelegateParams)

```ts
const tx = await secretjs.tx.staking.undelegate(
  {
    delegator_address: myAddress,
    validator_address: someValidatorAddress,
    amount: stringToCoin("1uscrt"),
  },
  {
    gasLimit: 50_000,
  },
);
```

##### `secretjs.tx.staking.undelegate.simulate()`

Simulates execution without sending a transactions. Input is exactly like the parent function. For more info see [`secretjs.tx.simulate()`](#secretjstxsimulate).

### Resolve IBC Responses

If a tx that was sent using secret.js resulted in IBC packets being sent to other chains, secret.js will resolve the IBC response (ack or timeout) inside `TxResponse`.

```ts
import { Wallet, SecretNetworkClient } from "secretjs";

const wallet = new Wallet(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);

const osmoAddress = new Wallet(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
  {
    bech32Prefix: "osmos",
    coinType: 118,
  },
).address;

const secretjs = new SecretNetworkClient({
  url: "http://localhost:1317",
  chainId: "secretdev-1",
  wallet,
  walletAddress: wallet.address,
});

const tx = await secretjs.tx.ibc.transfer(
  {
    sender: wallet.address,
    receiver: osmoAddress,
    source_channel: "channel-1",
    source_port: "transfer",
    token: stringToCoin("1uscrt"),
    timeout_timestamp: String(Math.floor(Date.now() / 1000) + 10 * 60), // 10 minutes
  },
  {
    gasLimit: 100_000,
    ibcTxsOptions: {
      resolveResponses: true, // enable IBC responses resolution (defualt)
      resolveResponsesTimeoutMs: 12 * 60 * 1000, // stop checking after 12 minutes (default is 2 minutes)
      resolveResponsesCheckIntervalMs: 15_000, // check every 15 seconds (default)
    },
  },
);

if (tx.code !== 0) {
  console.error("failed sending 1uscrt from Secret to Osmosis:", tx.rawLog);
} else {
  try {
    const ibcResp = await tx.ibcResponses[0];
    if (ibcResp.type === "ack") {
      console.log("successfuly sent 1uscrt from Secret to Osmosis!");
    } else {
      console.error(
        "failed sending 1uscrt from Secret to Osmosis: IBC packet timed-out before committed on Osmosis",
      );
    }
  } catch (_error) {
    console.error(
      `timed-out while trying to resolve IBC response for txhash ${tx.transactionHash}`,
    );
  }
}
```

## Helper Functions

### `pubkeyToAddress()`

Convert a secp256k1 compressed public key to an account address.

https://secretjs.scrt.network/modules#pubkeyToAddress

### `base64PubkeyToAddress()`

Convert a secp256k1 compressed base64 encoded public key to an account address.

https://secretjs.scrt.network/modules#base64PubkeyToAddress

### `selfDelegatorAddressToValidatorAddress()`

Convert a self delegator address to a validator address.

https://secretjs.scrt.network/modules#selfDelegatorAddressToValidatorAddress

### `validatorAddressToSelfDelegatorAddress()`

Convert a validator address to a self delegator address.

https://secretjs.scrt.network/modules#validatorAddressToSelfDelegatorAddress

### `tendermintPubkeyToValconsAddress()`

Convert a Tendermint ed25519 public key to a consensus address.

https://secretjs.scrt.network/modules#tendermintPubkeyToValconsAddress

### `base64TendermintPubkeyToValconsAddress()`

Convert a secp256k1 compressed public key to an account address.

https://secretjs.scrt.network/modules#base64TendermintPubkeyToValconsAddress

### `ibcDenom()`

Compute the IBC denom of a token that was sent over IBC.

https://secretjs.scrt.network/modules#ibcDenom

### `stringToCoins()` / `coinsFromString()`

E.g.
convert `"1uscrt,1uatom,1uosmo"`
into `[{amount:"1",denom:"uscrt"}, {amount:"1",denom:"uatom"}, {amount:"1",denom:"uosmo"}]`

https://secretjs.scrt.network/modules#stringToCoins

### `stringToCoins()` / `coinFromString()`

E.g.
convert `"1uscrt,1uatom,1uosmo"`
into `[{amount:"1",denom:"uscrt"}, {amount:"1",denom:"uatom"}, {amount:"1",denom:"uosmo"}]`

https://secretjs.scrt.network/modules#stringToCoins

### `validateAddress()`

Checks if a given address is a valid address.

https://secretjs.scrt.network/modules#validateAddress
