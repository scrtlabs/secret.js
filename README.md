<p align="center">
  <img src="./media/logo-light.svg#gh-light-mode-only" type="image/svg+xml" width="75%" class="light-logo" />
  <img src="./media/logo-dark.svg#gh-dark-mode-only" type="image/svg+xml" width="75%" class="dark-logo" />
</p>

<p align="center">
  The JavaScript SDK for Secret Network
</p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/secretjs/beta" />
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
  - [Keplr Wallet](#keplr-wallet)
    - [`getOfflineSignerOnlyAmino()`](#getofflinesigneronlyamino)
    - [`getOfflineSigner()`](#getofflinesigner)
    - [`getOfflineSignerAuto()`](#getofflinesignerauto)
- [Migrating from Secret.js v0.17.x](#migrating-from-secretjs-v017x)
- [API](#api)
  - [Wallet](#wallet)
    - [Importing account from mnemonic](#importing-account-from-mnemonic)
    - [Generating a random account](#generating-a-random-account)
  - [SecretNetworkClient](#secretnetworkclient)
    - [Readonly secret.js](#readonly-secretjs)
    - [Signer secret.js](#signer-secretjs)
    - [`secretjs.query`](#secretjsquery)
      - [`.getTx(hash)`](#gettxhash)
      - [`.txsQuery(query)`](#txsqueryquery)
      - [`.auth.account()`](#authaccount)
      - [`.auth.accounts()`](#authaccounts)
      - [`.auth.params()`](#authparams)
      - [`.authz.grants()`](#authzgrants)
      - [`.bank.balance()`](#bankbalance)
      - [`.bank.allBalances()`](#bankallbalances)
      - [`.bank.totalSupply()`](#banktotalsupply)
      - [`.bank.supplyOf()`](#banksupplyof)
      - [`.bank.params()`](#bankparams)
      - [`.bank.denomMetadata()`](#bankdenommetadata)
      - [`.bank.denomsMetadata()`](#bankdenomsmetadata)
      - [`.compute.contractCodeHash()`](#computecontractcodehash)
      - [`.compute.codeHash()`](#computecodehash)
      - [`.compute.contractInfo()`](#computecontractinfo)
      - [`.compute.contractsByCode()`](#computecontractsbycode)
      - [`.compute.queryContract()`](#computequerycontract)
      - [`.compute.code()`](#computecode)
      - [`.compute.codes()`](#computecodes)
      - [`.distribution.params()`](#distributionparams)
      - [`.distribution.validatorOutstandingRewards()`](#distributionvalidatoroutstandingrewards)
      - [`.distribution.validatorCommission()`](#distributionvalidatorcommission)
      - [`.distribution.validatorSlashes()`](#distributionvalidatorslashes)
      - [`.distribution.delegationRewards()`](#distributiondelegationrewards)
      - [`.distribution.delegationTotalRewards()`](#distributiondelegationtotalrewards)
      - [`.distribution.delegatorValidators()`](#distributiondelegatorvalidators)
      - [`.distribution.delegatorWithdrawAddress()`](#distributiondelegatorwithdrawaddress)
      - [`.distribution.communityPool()`](#distributioncommunitypool)
      - [`.distribution.foundationTax()`](#distributionfoundationtax)
      - [`.evidence.evidence()`](#evidenceevidence)
      - [`.evidence.allEvidence()`](#evidenceallevidence)
      - [`.feegrant.allowance()`](#feegrantallowance)
      - [`.feegrant.allowances()`](#feegrantallowances)
      - [`.gov.proposal()`](#govproposal)
      - [`.gov.proposals()`](#govproposals)
      - [`.gov.vote()`](#govvote)
      - [`.gov.votes()`](#govvotes)
      - [`.gov.params()`](#govparams)
      - [`.gov.deposit()`](#govdeposit)
      - [`.gov.deposits()`](#govdeposits)
      - [`.gov.tallyResult()`](#govtallyresult)
      - [`.ibc_channel.channel()`](#ibc_channelchannel)
      - [`.ibc_channel.channels()`](#ibc_channelchannels)
      - [`.ibc_channel.connectionChannels()`](#ibc_channelconnectionchannels)
      - [`.ibc_channel.channelClientState()`](#ibc_channelchannelclientstate)
      - [`.ibc_channel.channelConsensusState()`](#ibc_channelchannelconsensusstate)
      - [`.ibc_channel.packetCommitment()`](#ibc_channelpacketcommitment)
      - [`.ibc_channel.packetCommitments()`](#ibc_channelpacketcommitments)
      - [`.ibc_channel.packetReceipt()`](#ibc_channelpacketreceipt)
      - [`.ibc_channel.packetAcknowledgement()`](#ibc_channelpacketacknowledgement)
      - [`.ibc_channel.packetAcknowledgements()`](#ibc_channelpacketacknowledgements)
      - [`.ibc_channel.unreceivedPackets()`](#ibc_channelunreceivedpackets)
      - [`.ibc_channel.unreceivedAcks()`](#ibc_channelunreceivedacks)
      - [`.ibc_channel.nextSequenceReceive()`](#ibc_channelnextsequencereceive)
      - [`.ibc_client.clientState()`](#ibc_clientclientstate)
      - [`.ibc_client.clientStates()`](#ibc_clientclientstates)
      - [`.ibc_client.consensusState()`](#ibc_clientconsensusstate)
      - [`.ibc_client.consensusStates()`](#ibc_clientconsensusstates)
      - [`.ibc_client.clientStatus()`](#ibc_clientclientstatus)
      - [`.ibc_client.clientParams()`](#ibc_clientclientparams)
      - [`.ibc_client.upgradedClientState()`](#ibc_clientupgradedclientstate)
      - [`.ibc_client.upgradedConsensusState()`](#ibc_clientupgradedconsensusstate)
      - [`.ibc_connection.connection()`](#ibc_connectionconnection)
      - [`.ibc_connection.connections()`](#ibc_connectionconnections)
      - [`.ibc_connection.clientConnections()`](#ibc_connectionclientconnections)
      - [`.ibc_connection.connectionClientState()`](#ibc_connectionconnectionclientstate)
      - [`.ibc_connection.connectionConsensusState()`](#ibc_connectionconnectionconsensusstate)
      - [`.ibc_transfer.denomTrace()`](#ibc_transferdenomtrace)
      - [`.ibc_transfer.denomTraces()`](#ibc_transferdenomtraces)
      - [`.ibc_transfer.params()`](#ibc_transferparams)
      - [`.mint.params()`](#mintparams)
      - [`.mint.inflation()`](#mintinflation)
      - [`.mint.annualProvisions()`](#mintannualprovisions)
      - [`.params.params()`](#paramsparams)
      - [`.registration.txKey()`](#registrationtxkey)
      - [`.registration.registrationKey()`](#registrationregistrationkey)
      - [`.registration.encryptedSeed()`](#registrationencryptedseed)
      - [`.slashing.params()`](#slashingparams)
      - [`.slashing.signingInfo()`](#slashingsigninginfo)
      - [`.slashing.signingInfos()`](#slashingsigninginfos)
      - [`.staking.validators()`](#stakingvalidators)
      - [`.staking.validator()`](#stakingvalidator)
      - [`.staking.validatorDelegations()`](#stakingvalidatordelegations)
      - [`.staking.validatorUnbondingDelegations()`](#stakingvalidatorunbondingdelegations)
      - [`.staking.delegation()`](#stakingdelegation)
      - [`.staking.unbondingDelegation()`](#stakingunbondingdelegation)
      - [`.staking.delegatorDelegations()`](#stakingdelegatordelegations)
      - [`.staking.delegatorUnbondingDelegations()`](#stakingdelegatorunbondingdelegations)
      - [`.staking.redelegations()`](#stakingredelegations)
      - [`.staking.delegatorValidators()`](#stakingdelegatorvalidators)
      - [`.staking.delegatorValidator()`](#stakingdelegatorvalidator)
      - [`.staking.historicalInfo()`](#stakinghistoricalinfo)
      - [`.staking.pool()`](#stakingpool)
      - [`.staking.params()`](#stakingparams)
      - [`.tendermint.getNodeInfo()`](#tendermintgetnodeinfo)
      - [`.tendermint.getSyncing()`](#tendermintgetsyncing)
      - [`.tendermint.getLatestBlock()`](#tendermintgetlatestblock)
      - [`.tendermint.getBlockByHeight()`](#tendermintgetblockbyheight)
      - [`.tendermint.getLatestValidatorSet()`](#tendermintgetlatestvalidatorset)
      - [`.tendermint.getValidatorSetByHeight()`](#tendermintgetvalidatorsetbyheight)
      - [`.upgrade.currentPlan()`](#upgradecurrentplan)
      - [`.upgrade.appliedPlan()`](#upgradeappliedplan)
      - [`.upgrade.upgradedConsensusState()`](#upgradeupgradedconsensusstate)
      - [`.upgrade.moduleVersions()`](#upgrademoduleversions)
    - [`secretjs.address`](#secretjsaddress)
    - [`secretjs.tx`](#secretjstx)
      - [`.broadcast()`](#broadcast)
      - [`.authz.exec()`](#authzexec)
      - [`.authz.grant()`](#authzgrant)
      - [`.authz.revoke()`](#authzrevoke)
      - [`.bank.multiSend()`](#bankmultisend)
      - [`.bank.send()`](#banksend)
      - [`.compute.storeCode()`](#computestorecode)
      - [`.compute.instantiateContract()`](#computeinstantiatecontract)
      - [`.compute.executeContract()`](#computeexecutecontract)
      - [`.crisis.verifyInvariant()`](#crisisverifyinvariant)
      - [`.distribution.fundCommunityPool()`](#distributionfundcommunitypool)
      - [`.distribution.setWithdrawAddress()`](#distributionsetwithdrawaddress)
      - [`.distribution.withdrawDelegatorReward()`](#distributionwithdrawdelegatorreward)
      - [`.distribution.withdrawValidatorCommission()`](#distributionwithdrawvalidatorcommission)
      - [`.evidence.submitEvidence()`](#evidencesubmitevidence)
      - [`.feegrant.grantAllowance()`](#feegrantgrantallowance)
      - [`.feegrant.revokeAllowance()`](#feegrantrevokeallowance)
      - [`.gov.deposit()`](#govdeposit-1)
      - [`.gov.submitProposal()`](#govsubmitproposal)
      - [`.gov.vote()`](#govvote-1)
      - [`.gov.voteWeighted()`](#govvoteweighted)
      - [`.ibc.transfer()`](#ibctransfer)
      - [`.slashing.unjail()`](#slashingunjail)
      - [`.staking.beginRedelegate()`](#stakingbeginredelegate)
      - [`.staking.createValidator()`](#stakingcreatevalidator)
      - [`.staking.delegate()`](#stakingdelegate)
      - [`.staking.editValidator()`](#stakingeditvalidator)
      - [`.staking.undelegate()`](#stakingundelegate)

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

```ts
import { SecretNetworkClient } from "secretjs";

// To create a readonly secretjs client, just pass in an RPC endpoint
const secretjs = await SecretNetworkClient.create({
  rpcUrl: "https://rpc-secret.scrtlabs.com/secret-4/rpc/",
});

const {
  balance: { amount },
} = await secretjs.query.bank.balance({
  address: "secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03",
  denom: "uscrt",
});

console.log(`I have ${amount / 1e6} SCRT!`);

const sSCRT = "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek";
// Get codeHash using `secretcli q compute contract-hash secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek`
const sScrtCodeHash =
  "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e";

const { token_info } = await secretjs.query.compute.queryContract({
  address: sSCRT,
  codeHash: sScrtCodeHash, // optional but way faster
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

// To create a signer secretjs client, also pass in a wallet
const secretjs = await SecretNetworkClient.create({
  rpcUrl: "https://rpc.pulsar.griptapejs.com/",
  wallet: wallet,
  walletAddress: myAddress,
  chainId: "pulsar-2",
});

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

## Keplr Wallet

The recommended way to integrate Keplr is by using `window.keplr.getOfflineSignerOnlyAmino()`:

```ts
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

while (
  !window.keplr ||
  !window.getEnigmaUtils ||
  !window.getOfflineSignerOnlyAmino
) {
  await sleep(100);
}

const CHAIN_ID = "secret-4";
const SECRET_RPC = "https://rpc-secret.scrtlabs.com/secret-4/rpc/";

await window.keplr.enable(CHAIN_ID);

const keplrOfflineSigner = window.getOfflineSignerOnlyAmino(CHAIN_ID);
const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

const secretjs = await SecretNetworkClient.create({
  rpcUrl: SECRET_RPC,
  chainId: SECRET_CHAIN_ID,
  wallet: keplrOfflineSigner,
  walletAddress: myAddress,
  encryptionUtils: window.getEnigmaUtils(SECRET_CHAIN_ID),
});

// Note: Using `window.getEnigmaUtils` is optional, it will allow
// Keplr to use the same encryption seed across sessions for the account.
// The benefit of this is that `secretjs.query.getTx()` will be able to decrypt
// the response across sessions.
```

### `getOfflineSignerOnlyAmino()`

Although this is the legacy way of signing transactions on cosmos-sdk, it's still the most recommended for connecting to Keplr due to Ledger support & better UI on Keplr.

- 🟩 Looks good on Keplr
- 🟩 Supports users signing with Ledger
- 🟥 Doesn't support signing transactions with these Msgs:
  - [authz/MsgExec](https://secretjs.scrt.network/classes/MsgExec)
  - [authz/MsgGrant](https://secretjs.scrt.network/classes/MsgGrant)
  - [authz/MsgRevoke](https://secretjs.scrt.network/classes/MsgRevoke)
  - [feegrant/MsgGrantAllowance](https://secretjs.scrt.network/classes/MsgGrantAllowance)
  - [feegrant/MsgRevokeAllowance](https://secretjs.scrt.network/classes/MsgRevokeAllowance)
  - All IBC relayer Msgs:
    - [gov/MsgSubmitProposal/ClientUpdateProposal](https://secretjs.scrt.network/enums/ProposalType#ClientUpdateProposal)
    - [gov/MsgSubmitProposal/UpgradeProposal](https://secretjs.scrt.network/enums/ProposalType#UpgradeProposal)
    - [ibc_channel/MsgAcknowledgement](https://secretjs.scrt.network/classes/MsgAcknowledgement)
    - [ibc_channel/MsgChannelCloseConfirm](https://secretjs.scrt.network/classes/MsgChannelCloseConfirm)
    - [ibc_channel/MsgChannelCloseInit](https://secretjs.scrt.network/classes/MsgChannelCloseInit)
    - [ibc_channel/MsgChannelOpenAck](https://secretjs.scrt.network/classes/MsgChannelOpenAck)
    - [ibc_channel/MsgChannelOpenConfirm](https://secretjs.scrt.network/classes/MsgChannelOpenConfirm)
    - [ibc_channel/MsgChannelOpenInit](https://secretjs.scrt.network/classes/MsgChannelOpenInit)
    - [ibc_channel/MsgChannelOpenTry](https://secretjs.scrt.network/classes/MsgChannelOpenTry)
    - [ibc_channel/MsgRecvPacket](https://secretjs.scrt.network/classes/MsgRecvPacket)
    - [ibc_channel/MsgTimeout](https://secretjs.scrt.network/classes/MsgTimeout)
    - [ibc_channel/MsgTimeoutOnClose](https://secretjs.scrt.network/classes/MsgTimeoutOnClose)
    - [ibc_client/MsgCreateClient](https://secretjs.scrt.network/classes/MsgCreateClient)
    - [ibc_client/MsgSubmitMisbehaviour](https://secretjs.scrt.network/classes/MsgSubmitMisbehaviour)
    - [ibc_client/MsgUpdateClient](https://secretjs.scrt.network/classes/MsgUpdateClient)
    - [ibc_client/MsgUpgradeClient](https://secretjs.scrt.network/classes/MsgUpgradeClient)
    - [ibc_connection/MsgConnectionOpenAck](https://secretjs.scrt.network/classes/MsgConnectionOpenAck)
    - [ibc_connection/MsgConnectionOpenConfirm](https://secretjs.scrt.network/classes/MsgConnectionOpenConfirm)
    - [ibc_connection/MsgConnectionOpenInit](https://secretjs.scrt.network/classes/MsgConnectionOpenInit)
    - [ibc_connection/MsgConnectionOpenTry](https://secretjs.scrt.network/classes/MsgConnectionOpenTry)

Note that [ibc_transfer/MsgTransfer](https://secretjs.scrt.network/classes/MsgTransfer) for sending funds across IBC **is** supported.

<img src="./media/keplr-amino.png" width="60%" />

### `getOfflineSigner()`

The new way of signing transactions on cosmos-sdk, it's more efficient but still doesn't have Ledger support, so it's most recommended for usage in apps that don't require signing transactions with Ledger.

- 🟥 Looks bad on Keplr
- 🟥 Doesn't support users signing with Ledger
- 🟩 Supports signing transactions with all types of Msgs

<img src="./media/keplr-proto.png" width="60%" />

### `getOfflineSignerAuto()`

Currently this is equivalent to `keplr.getOfflineSigner()` but may change at the discretion of the Keplr team.

# Migrating from Secret.js v0.17.x

- `v0.9.x` through `v0.16.x` supported `secret-2` & `secret-3`
- `v0.17.x` supports `secret-4`
- `v1.2.x` supports `secret-4`, corresponds to [`v1.2.x` of secretd](https://github.com/scrtlabs/SecretNetwork/releases/tag/v1.2.0)

TODO

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

### Readonly secret.js

A readonly client can only send queries and get chain information. Access to all query types can be done via `secretjs.query`.

```ts
import { SecretNetworkClient } from "secretjs";

// To create a readonly secretjs client, just pass in an RPC endpoint
const secretjs = await SecretNetworkClient.create({
  rpcUrl: "https://rpc-secret.scrtlabs.com/secret-4/rpc/",
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

// To create a signer secretjs client, also pass in a wallet
const secretjs = await SecretNetworkClient.create({
  rpcUrl: "https://rpc.pulsar.griptapejs.com/",
  wallet: wallet,
  walletAddress: myAddress,
  chainId: "pulsar-2",
});
```

### `secretjs.query`

#### `.getTx(hash)`

Returns a transaction with a txhash. `hash` is a 64 character upper-case hex string.

#### `.txsQuery(query)`

Returns all transactions that match a query.

To tell which events you want, you need to provide a query. query is a string, which has a form: `condition AND condition ...` (no OR at the moment). Condition has a form: `key operation operand`. key is a string with a restricted set of possible symbols (`\t`, `\n`, `\r`, `\`, `(`, `)`, `"`, `'`, `=`, `>`, `<` are not allowed). Operation can be `=`, `<`, `<=`, `>`, `>=`, `CONTAINS` AND `EXISTS`. Operand can be a string (escaped with single quotes), number, date or time.

Examples:

- `tx.hash = 'XYZ'` # single transaction
- `tx.height = 5` # all txs of the fifth block
- `create_validator.validator = 'ABC'` # tx where validator ABC was created

Tendermint provides a few predefined keys: `tx.hash` and `tx.height`. You can provide additional event keys that were emitted during the transaction. All events are indexed by a composite key of the form `{eventType}.{evenAttrKey}`. Multiple event types with duplicate keys are allowed and are meant to categorize unique and distinct events.

To create a query for txs where AddrA transferred funds: `transfer.sender = 'AddrA'`

See `txsQuery` under https://secretjs.scrt.network/modules#Querier.

#### `.auth.account()`

Returns account details based on address.

```ts
const { address, accountNumber, sequence } = await secretjs.query.auth.account({
  address: accounts[1].address,
});
```

#### `.auth.accounts()`

Returns all the existing accounts.

```ts
/// Get all accounts
const result = await secretjs.query.auth.accounts({});
```

#### `.auth.params()`

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

#### `.authz.grants()`

Returns list of authorizations, granted to the grantee by the granter.

#### `.bank.balance()`

Balance queries the balance of a single coin for a single account.

```ts
const { balance } = await secretjs.query.bank.balance({
  address: myAddress,
  denom: "uscrt",
});
```

#### `.bank.allBalances()`

AllBalances queries the balance of all coins for a single account.

#### `.bank.totalSupply()`

TotalSupply queries the total supply of all coins.

#### `.bank.supplyOf()`

SupplyOf queries the supply of a single coin.

#### `.bank.params()`

Params queries the parameters of x/bank module.

#### `.bank.denomMetadata()`

DenomsMetadata queries the client metadata of a given coin denomination.

#### `.bank.denomsMetadata()`

DenomsMetadata queries the client metadata for all registered coin denominations.

#### `.compute.contractCodeHash()`

Get codeHash of a Secret Contract.

#### `.compute.codeHash()`

Get codeHash from a code id.

#### `.compute.contractInfo()`

Get metadata of a Secret Contract.

#### `.compute.contractsByCode()`

Get all contracts that were instantiated from a code id.

#### `.compute.queryContract()`

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
  address: sScrtAddress,
  codeHash: sScrtCodeHash,
  query: { token_info: {} },
})) as Result;
```

#### `.compute.code()`

Get WASM bytecode and metadata for a code id.

```ts
const { codeInfo } = await secretjs.query.compute.code(codeId);
```

#### `.compute.codes()`

Query all contract codes on-chain.

#### `.distribution.params()`

Params queries params of the distribution module.

#### `.distribution.validatorOutstandingRewards()`

ValidatorOutstandingRewards queries rewards of a validator address. \*/

#### `.distribution.validatorCommission()`

ValidatorCommission queries accumulated commission for a validator. \*/

#### `.distribution.validatorSlashes()`

ValidatorSlashes queries slash events of a validator. \*/

#### `.distribution.delegationRewards()`

DelegationRewards queries the total rewards accrued by a delegation. \*/

#### `.distribution.delegationTotalRewards()`

DelegationTotalRewards queries the total rewards accrued by a each validator.

#### `.distribution.delegatorValidators()`

DelegatorValidators queries the validators of a delegator. \*/

#### `.distribution.delegatorWithdrawAddress()`

DelegatorWithdrawAddress queries withdraw address of a delegator. \*/

#### `.distribution.communityPool()`

CommunityPool queries the community pool coins. \*/

#### `.distribution.foundationTax()`

DelegatorWithdrawAddress queries withdraw address of a delegator. \*/

#### `.evidence.evidence()`

Evidence queries evidence based on evidence hash.

#### `.evidence.allEvidence()`

AllEvidence queries all evidence.

#### `.feegrant.allowance()`

Allowance returns fee granted to the grantee by the granter.

#### `.feegrant.allowances()`

Allowances returns all the grants for address.

#### `.gov.proposal()`

Proposal queries proposal details based on ProposalID.

#### `.gov.proposals()`

Proposals queries all proposals based on given status.

```ts
// Get all proposals
const { proposals } = await secretjs.query.gov.proposals({
  proposalStatus: ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
  voter: "",
  depositor: "",
});
```

#### `.gov.vote()`

Vote queries voted information based on proposalID, voterAddr.

#### `.gov.votes()`

Votes queries votes of a given proposal.

#### `.gov.params()`

Params queries all parameters of the gov module.

#### `.gov.deposit()`

Deposit queries single deposit information based proposalID, depositAddr.

```ts
const {
  deposit: { amount },
} = await secretjs.query.gov.deposit({
  depositor: myAddress,
  proposalId: propId,
});
```

#### `.gov.deposits()`

Deposits queries all deposits of a single proposal.

#### `.gov.tallyResult()`

TallyResult queries the tally of a proposal vote.

#### `.ibc_channel.channel()`

Channel queries an IBC Channel.

#### `.ibc_channel.channels()`

Channels queries all the IBC channels of a chain.

#### `.ibc_channel.connectionChannels()`

ConnectionChannels queries all the channels associated with a connection end.

#### `.ibc_channel.channelClientState()`

ChannelClientState queries for the client state for the channel associated with the provided channel identifiers.

#### `.ibc_channel.channelConsensusState()`

ChannelConsensusState queries for the consensus state for the channel associated with the provided channel identifiers.

#### `.ibc_channel.packetCommitment()`

PacketCommitment queries a stored packet commitment hash.

#### `.ibc_channel.packetCommitments()`

PacketCommitments returns all the packet commitments hashes associated with a channel.

#### `.ibc_channel.packetReceipt()`

PacketReceipt queries if a given packet sequence has been received on the queried chain

#### `.ibc_channel.packetAcknowledgement()`

PacketAcknowledgement queries a stored packet acknowledgement hash.

#### `.ibc_channel.packetAcknowledgements()`

PacketAcknowledgements returns all the packet acknowledgements associated with a channel.

#### `.ibc_channel.unreceivedPackets()`

UnreceivedPackets returns all the unreceived IBC packets associated with a channel and sequences.

#### `.ibc_channel.unreceivedAcks()`

UnreceivedAcks returns all the unreceived IBC acknowledgements associated with a channel and sequences.

#### `.ibc_channel.nextSequenceReceive()`

NextSequenceReceive returns the next receive sequence for a given channel.

#### `.ibc_client.clientState()`

ClientState queries an IBC light client.

#### `.ibc_client.clientStates()`

ClientStates queries all the IBC light clients of a chain.

#### `.ibc_client.consensusState()`

ConsensusState queries a consensus state associated with a client state at a given height.

#### `.ibc_client.consensusStates()`

ConsensusStates queries all the consensus state associated with a given client.

#### `.ibc_client.clientStatus()`

Status queries the status of an IBC client.

#### `.ibc_client.clientParams()`

ClientParams queries all parameters of the ibc client.

#### `.ibc_client.upgradedClientState()`

UpgradedClientState queries an Upgraded IBC light client.

#### `.ibc_client.upgradedConsensusState()`

UpgradedConsensusState queries an Upgraded IBC consensus state.

#### `.ibc_connection.connection()`

Connection queries an IBC connection end.

#### `.ibc_connection.connections()`

Connections queries all the IBC connections of a chain.

#### `.ibc_connection.clientConnections()`

ClientConnections queries the connection paths associated with a client state.

#### `.ibc_connection.connectionClientState()`

ConnectionClientState queries the client state associated with the connection.

#### `.ibc_connection.connectionConsensusState()`

ConnectionConsensusState queries the consensus state associated with the connection.

#### `.ibc_transfer.denomTrace()`

DenomTrace queries a denomination trace information.

#### `.ibc_transfer.denomTraces()`

DenomTraces queries all denomination traces.

#### `.ibc_transfer.params()`

Params queries all parameters of the ibc-transfer module.

#### `.mint.params()`

Params returns the total set of minting parameters.

#### `.mint.inflation()`

Inflation returns the current minting inflation value.

#### `.mint.annualProvisions()`

AnnualProvisions current minting annual provisions value.

#### `.params.params()`

Params queries a specific parameter of a module, given its subspace and key.

#### `.registration.txKey()`

Returns the key used for transactions.

#### `.registration.registrationKey()`

Returns the key used for registration.

#### `.registration.encryptedSeed()`

Returns the encrypted seed for a registered node by public key.

#### `.slashing.params()`

Params queries the parameters of slashing module.

#### `.slashing.signingInfo()`

SigningInfo queries the signing info of given cons address.

#### `.slashing.signingInfos()`

SigningInfos queries signing info of all validators.

#### `.staking.validators()`

Validators queries all validators that match the given status.

```ts
// Get all validators
const { validators } = await secretjs.query.staking.validators({ status: "" });
```

#### `.staking.validator()`

Validator queries validator info for given validator address.

#### `.staking.validatorDelegations()`

ValidatorDelegations queries delegate info for given validator.

#### `.staking.validatorUnbondingDelegations()`

ValidatorUnbondingDelegations queries unbonding delegations of a validator.

#### `.staking.delegation()`

Delegation queries delegate info for given validator delegator pair.

#### `.staking.unbondingDelegation()`

UnbondingDelegation queries unbonding info for given validator delegator pair.

#### `.staking.delegatorDelegations()`

DelegatorDelegations queries all delegations of a given delegator address.

#### `.staking.delegatorUnbondingDelegations()`

DelegatorUnbondingDelegations queries all unbonding delegations of a given delegator address.

#### `.staking.redelegations()`

Redelegations queries redelegations of given address.

#### `.staking.delegatorValidators()`

DelegatorValidators queries all validators info for given delegator address.

#### `.staking.delegatorValidator()`

DelegatorValidator queries validator info for given delegator validator pair.

#### `.staking.historicalInfo()`

HistoricalInfo queries the historical info for given height.

#### `.staking.pool()`

Pool queries the pool info.

#### `.staking.params()`

Parameters queries the staking parameters.

#### `.tendermint.getNodeInfo()`

GetNodeInfo queries the current node info.

#### `.tendermint.getSyncing()`

GetSyncing queries node syncing.

#### `.tendermint.getLatestBlock()`

GetLatestBlock returns the latest block.

#### `.tendermint.getBlockByHeight()`

GetBlockByHeight queries block for given height.

#### `.tendermint.getLatestValidatorSet()`

GetLatestValidatorSet queries latest validator-set.

#### `.tendermint.getValidatorSetByHeight()`

GetValidatorSetByHeight queries validator-set at a given height.

#### `.upgrade.currentPlan()`

CurrentPlan queries the current upgrade plan.

#### `.upgrade.appliedPlan()`

AppliedPlan queries a previously applied upgrade plan by its name.

#### `.upgrade.upgradedConsensusState()`

UpgradedConsensusState queries the consensus state that will serve as a trusted kernel for the next version of this chain. It will only be stored at the last height of this chain.

#### `.upgrade.moduleVersions()`

ModuleVersions queries the list of module versions from state.

### `secretjs.address`

On a signer secret.js, `secretjs.address` is the same as `walletAddress`:

```ts
import { Wallet, SecretNetworkClient } from "secretjs";

const wallet = new Wallet(
  "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);
const myAddress = wallet.address;

// To create a signer secretjs client, also pass in a wallet
const secretjs = await SecretNetworkClient.create({
  rpcUrl: "https://rpc.pulsar.griptapejs.com/",
  wallet: wallet,
  walletAddress: myAddress,
  chainId: "pulsar-2",
});

const alsoMyAddress = secretjs.address;
```

### `secretjs.tx`

On a signer secret.js, `secretjs.tx` is used to broadcast transactions. Every function under `secretjs.tx` can receive an optional [SignAndBroadcastOptions](https://secretjs.scrt.network/modules#SignAndBroadcastOptions).

[Full API »](https://secretjs.scrt.network/modules#TxSender)

#### `.broadcast()`

Used to send a complex transactions, which contains a list of messages. The messages are executed in sequence, and the transaction succeeds if all messages succeed.

For a list of all messages see: https://secretjs.scrt.network/interfaces/Msg

```ts
const addMinterMsg = new MsgExecuteContract({
  sender: MY_ADDRESS,
  contract: MY_NFT_CONTRACT,
  codeHash: MY_NFT_CONTRACT_CODE_HASH,
  msg: { add_minters: { minters: [MY_ADDRESS] } },
  sentFunds: [],
});

const mintMsg = new MsgExecuteContract({
  sender: MY_ADDRESS,
  contract: MY_NFT_CONTRACT,
  codeHash: MY_NFT_CONTRACT_CODE_HASH,
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
  sentFunds: [],
});

const tx = await secretjs.tx.broadcast([addMinterMsg, mintMsg], {
  gasLimit: 200_000,
});
```

#### `.authz.exec()`

MsgExec attempts to execute the provided messages using authorizations granted to the grantee. Each message should have only one signer corresponding to the granter of the authorization.

Input: [MsgExecParams](https://secretjs.scrt.network/interfaces/MsgExecParams)

#### `.authz.grant()`

MsgGrant is a request type for Grant method. It declares authorization to the grantee on behalf of the granter with the provided expiration time.

Input: [MsgGrantParams](https://secretjs.scrt.network/interfaces/MsgGrantParams)

#### `.authz.revoke()`

MsgRevoke revokes any authorization with the provided sdk.Msg type on the granter's account with that has been granted to the grantee.

Input: [MsgRevokeParams](https://secretjs.scrt.network/interfaces/MsgRevokeParams)

#### `.bank.multiSend()`

MsgMultiSend represents an arbitrary multi-in, multi-out send message.

Input: [MsgMultiSendParams](https://secretjs.scrt.network/interfaces/MsgMultiSendParams)

```ts
const tx = await secretjs.tx.bank.multiSend(
  {
    inputs: [
      {
        address: myAddress,
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
  },
  {
    gasLimit: 20_000,
  },
);
```

#### `.bank.send()`

MsgSend represents a message to send coins from one account to another.

Input: [MsgSendParams](https://secretjs.scrt.network/interfaces/MsgSendParams)

```ts
const tx = await secretjs.tx.bank.send(
  {
    fromAddress: myAddress,
    toAddress: alice,
    amount: [{ denom: "uscrt", amount: "1" }],
  },
  {
    gasLimit: 20_000,
  },
);
```

#### `.compute.storeCode()`

Upload a compiled contract to Secret Network

Input: [MsgStoreCodeParams](https://secretjs.scrt.network/interfaces/MsgStoreCodeParams)

```ts
const tx = await secretjs.tx.compute.storeCode(
  {
    sender: myAddress,
    wasmByteCode: fs.readFileSync(
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

#### `.compute.instantiateContract()`

Instantiate a contract from code id

Input: [MsgInstantiateContractParams](https://secretjs.scrt.network/interfaces/MsgInstantiateContractParams)

```ts
const tx = await secretjs.tx.compute.instantiateContract(
  {
    sender: myAddress,
    codeId: codeId,
    codeHash: codeHash, // optional, but way way faster with it
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
    initFunds: [],
  },
  {
    gasLimit: 100_000,
  },
);

const contractAddress = tx.arrayLog.find(
  (log) => log.type === "message" && log.key === "contract_address",
).value;
```

#### `.compute.executeContract()`

Execute a function on a contract

Input: [MsgExecuteContractParams](https://secretjs.scrt.network/interfaces/MsgExecuteContractParams)

```ts
const tx = await secretjs.tx.compute.executeContract(
  {
    sender: myAddress,
    contract: contractAddress,
    codeHash: codeHash, // optional, but way way faster with it
    msg: {
      transfer: {
        recipient: bob,
        amount: "1",
      },
    },
    sentFunds: [],
  },
  {
    gasLimit: 100_000,
  },
);
```

#### `.crisis.verifyInvariant()`

MsgVerifyInvariant represents a message to verify a particular invariance.

Input: [MsgVerifyInvariantParams](https://secretjs.scrt.network/interfaces/MsgVerifyInvariantParams)

#### `.distribution.fundCommunityPool()`

MsgFundCommunityPool allows an account to directly fund the community pool.

Input: [MsgFundCommunityPoolParams](https://secretjs.scrt.network/interfaces/MsgFundCommunityPoolParams)

```ts
const tx = await secretjs.tx.distribution.fundCommunityPool(
  {
    depositor: myAddress,
    amount: [{ amount: "1", denom: "uscrt" }],
  },
  {
    gasLimit: 20_000,
  },
);
```

#### `.distribution.setWithdrawAddress()`

MsgSetWithdrawAddress sets the withdraw address for a delegator (or validator self-delegation).

Input: [MsgSetWithdrawAddressParams](https://secretjs.scrt.network/interfaces/MsgSetWithdrawAddressParams)

```ts
const tx = await secretjs.tx.distribution.setWithdrawAddress(
  {
    delegatorAddress: mySelfDelegatorAddress,
    withdrawAddress: myOtherAddress,
  },
  {
    gasLimit: 20_000,
  },
);
```

#### `.distribution.withdrawDelegatorReward()`

MsgWithdrawDelegatorReward represents delegation withdrawal to a delegator from a single validator.

Input: [MsgWithdrawDelegatorRewardParams](https://secretjs.scrt.network/interfaces/MsgWithdrawDelegatorRewardParams)

```ts
const tx = await secretjs.tx.distribution.withdrawDelegatorReward(
  {
    delegatorAddress: myAddress,
    validatorAddress: someValidatorAddress,
  },
  {
    gasLimit: 20_000,
  },
);
```

#### `.distribution.withdrawValidatorCommission()`

MsgWithdrawValidatorCommission withdraws the full commission to the validator address.

Input: [MsgWithdrawValidatorCommissionParams](https://secretjs.scrt.network/interfaces/MsgWithdrawValidatorCommissionParams)

```ts
const tx = await secretjs.tx.distribution.withdrawValidatorCommission(
  {
    validatorAddress: myValidatorAddress,
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
      delegatorAddress: mySelfDelegatorAddress,
      validatorAddress: myValidatorAddress,
    }),
    new MsgWithdrawValidatorCommission({
      validatorAddress: myValidatorAddress,
    }),
  ],
  {
    gasLimit: 30_000,
  },
);
```

#### `.evidence.submitEvidence()`

MsgSubmitEvidence represents a message that supports submitting arbitrary evidence of misbehavior such as equivocation or counterfactual signing.

Input: [MsgSubmitEvidenceParams](https://secretjs.scrt.network/interfaces/MsgSubmitEvidenceParams)

#### `.feegrant.grantAllowance()`

MsgGrantAllowance adds permission for Grantee to spend up to Allowance of fees from the account of Granter.

Input: [MsgGrantAllowanceParams](https://secretjs.scrt.network/interfaces/MsgGrantAllowanceParams)

#### `.feegrant.revokeAllowance()`

MsgRevokeAllowance removes any existing Allowance from Granter to Grantee.

Input: [MsgRevokeAllowanceParams](https://secretjs.scrt.network/interfaces/MsgRevokeAllowanceParams)

#### `.gov.deposit()`

MsgDeposit defines a message to submit a deposit to an existing proposal.

Input: [MsgDepositParams](https://secretjs.scrt.network/interfaces/MsgDepositParams)

```ts
const tx = await secretjs.tx.gov.deposit(
  {
    depositor: myAddress,
    proposalId: someProposalId,
    amount: [{ amount: "1", denom: "uscrt" }],
  },
  {
    gasLimit: 20_000,
  },
);
```

#### `.gov.submitProposal()`

MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary proposal Content.

Input: [MsgSubmitProposalParams](https://secretjs.scrt.network/interfaces/MsgSubmitProposalParams)

```ts
const tx = await secretjs.tx.gov.submitProposal(
  {
    type: ProposalType.TextProposal,
    proposer: myAddress,
    initialDeposit: [{ amount: "10000000", denom: "uscrt" }],
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

#### `.gov.vote()`

MsgVote defines a message to cast a vote.

Input: [MsgVoteParams](https://secretjs.scrt.network/interfaces/MsgVoteParams)

```ts
const tx = await secretjs.tx.gov.vote(
  {
    voter: myAddress,
    proposalId: someProposalId,
    option: VoteOption.VOTE_OPTION_YES,
  },
  {
    gasLimit: 50_000,
  },
);
```

#### `.gov.voteWeighted()`

MsgVoteWeighted defines a message to cast a vote, with an option to split the vote.

Input: [MsgVoteWeightedParams](https://secretjs.scrt.network/interfaces/MsgVoteWeightedParams)

```ts
// vote yes with 70% of my power
const tx = await secretjs.tx.gov.voteWeighted(
  {
    voter: myAddress,
    proposalId: someProposalId,
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

#### `.ibc.transfer()`

MsgTransfer defines a msg to transfer fungible tokens (i.e Coins) between ICS20 enabled chains. See ICS Spec here: https://github.com/cosmos/ics/tree/master/spec/ics-020-fungible-token-transfer#data-structures

Input: [MsgTransferParams](https://secretjs.scrt.network/interfaces/MsgTransferParams)

#### `.slashing.unjail()`

MsgUnjail defines a message to release a validator from jail.

Input: [MsgUnjailParams](https://secretjs.scrt.network/interfaces/MsgUnjailParams)

```ts
const tx = await secretjs.tx.slashing.unjail(
  {
    validatorAddr: mValidatorsAddress,
  },
  {
    gasLimit: 50_000,
  },
);
```

#### `.staking.beginRedelegate()`

MsgBeginRedelegate defines an SDK message for performing a redelegation of coins from a delegator and source validator to a destination validator.

Input: [MsgBeginRedelegateParams](https://secretjs.scrt.network/interfaces/MsgBeginRedelegateParams)

```ts
const tx = await secretjs.tx.staking.beginRedelegate(
  {
    delegatorAddress: myAddress,
    validatorSrcAddress: someValidator,
    validatorDstAddress: someOtherValidator,
    amount: { amount: "1", denom: "uscrt" },
  },
  {
    gasLimit: 50_000,
  },
);
```

#### `.staking.createValidator()`

MsgCreateValidator defines an SDK message for creating a new validator.

Input: [MsgCreateValidatorParams](https://secretjs.scrt.network/interfaces/MsgCreateValidatorParams)

```ts
const tx = await secretjs.tx.staking.createValidator(
  {
    selfDelegatorAddress: myAddress,
    commission: {
      maxChangeRate: 0.01, // can change +-1% every 24h
      maxRate: 0.1, // 10%
      rate: 0.05, // 5%
    },
    description: {
      moniker: "My validator's display name",
      identity: "ID on keybase.io, to have a logo on explorer and stuff",
      website: "example.com",
      securityContact: "hi@example.com",
      details: "We are good",
    },
    pubkey: toBase64(new Uint8Array(32).fill(1)), // validator's pubkey, to sign on validated blocks
    minSelfDelegation: "1", // uscrt
    initialDelegation: { amount: "1", denom: "uscrt" },
  },
  {
    gasLimit: 100_000,
  },
);
```

#### `.staking.delegate()`

MsgDelegate defines an SDK message for performing a delegation of coins from a delegator to a validator.

Input: [MsgDelegateParams](https://secretjs.scrt.network/interfaces/MsgDelegateParams)

```ts
const tx = await secretjs.tx.staking.delegate(
  {
    delegatorAddress: myAddress,
    validatorAddress: someValidatorAddress,
    amount: { amount: "1", denom: "uscrt" },
  },
  {
    gasLimit: 50_000,
  },
);
```

#### `.staking.editValidator()`

MsgEditValidator defines an SDK message for editing an existing validator.

Input: [MsgEditValidatorParams](https://secretjs.scrt.network/interfaces/MsgEditValidatorParams)

```ts
const tx = await secretjs.tx.staking.editValidator(
  {
    validatorAddress: myValidatorAddress,
    description: {
      // To edit even one item in "description you have to re-input everything
      moniker: "papaya",
      identity: "banana",
      website: "watermelon.com",
      securityContact: "sec@watermelon.com",
      details: "We are the banana papaya validator yay!",
    },
    minSelfDelegation: "2",
    commissionRate: 0.04, // 4%, commission cannot be changed more than once in 24h
  },
  {
    gasLimit: 5_000_000,
  },
);
```

#### `.staking.undelegate()`

MsgUndelegate defines an SDK message for performing an undelegation from a delegate and a validator

Input: [MsgUndelegateParams](https://secretjs.scrt.network/interfaces/MsgUndelegateParams)

```ts
const tx = await secretjs.tx.staking.undelegate(
  {
    delegatorAddress: myAddress,
    validatorAddress: someValidatorAddress,
    amount: { amount: "1", denom: "uscrt" },
  },
  {
    gasLimit: 50_000,
  },
);
```
