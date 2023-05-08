# Changelog & Version Info

## Unreleased

## 1.9.0

- Support Secret Network v1.9
- Fix `secretjs.tx.vesting.createVestingAccount()`
- Fix `secretjs.tx.registration.register()`
- Support IBC panic button:
  - `secretjs.tx.emergency_button.toggleIbcSwitch()` & `MsgToggleIbcSwitch`
  - `secretjs.query.emergency_button.params()`
- Support IBC Fee middleware:
  - `secretjs.tx.ibc_fee.payPacketFee()` & `MsgPayPacketFee`
  - `secretjs.tx.ibc_fee.payPacketFeeAsync()` & `MsgPayPacketFeeAsync`
  - `secretjs.tx.ibc_fee.registerPayee()` & `MsgRegisterPayee`
  - `secretjs.tx.ibc_fee.registerCounterpartyPayee()` & `MsgRegisterCounterpartyPayee`
  - `secretjs.query.ibc_fee.incentivizedPackets()`
  - `secretjs.query.ibc_fee.incentivizedPacket()`
  - `secretjs.query.ibc_fee.incentivizedPacketsForChannel()`
  - `secretjs.query.ibc_fee.totalRecvFees()`
  - `secretjs.query.ibc_fee.totalAckFees()`
  - `secretjs.query.ibc_fee.totalTimeoutFees()`
  - `secretjs.query.ibc_fee.payee()`
  - `secretjs.query.ibc_fee.counterpartyPayee()`
  - `secretjs.query.ibc_fee.feeEnabledChannels()`
  - `secretjs.query.ibc_fee.feeEnabledChannel()`
- Support IBC Packet Forward Middleware (PFM):
  - `secretjs.query.ibc_packet_forward.params()`

## 1.8.1

Fix: Don't actually sign the tx in simulation mode.

In simulation mode the node does not validate the signature. However, prior to v1.8.0 of secret.js, the simulated transaction was still being signed. This was inconvenient for UIs as it prompted users to provide a signature, rendering the simulation feature practically unusable, especially for Ledger users.

## 1.8.0

- Support Secret Network v1.8
- Add the `memo` field in IBC MsgTransfer
- Add `secretjs.query.ibc_transfer.escrowAddress()`
- Add `secretjs.query.ibc_client.consensusStateHeights()`
- Add `secretjs.query.ibc_client.consensusStateHeights()`
- Add `secretjs.query.ibc_iterchain_accounts_host.params()`
- Add `secretjs.query.ibc_iterchain_accounts_controller.params()`
- Add `secretjs.query.ibc_iterchain_accounts_controller.interchainAccount()`

## 1.7.2

Optimize encryption setup for v1.7.

## 1.7.1

Support Secret Network v1.7.

## 1.6.14

Export `MsgCreateVestingAccount`.

## 1.6.13

Fix `getTx()` sometimes throws "tx not found" instead of returning null.

## 1.6.12

- Allow passing `ibcTxOptions` to `getTx()`
- Fix resolving IBC responses when broadcasting a tx on Async & Sync modes

## 1.6.11

- Accept URLs with trailing slashes in `SecretNetworkClient`
- Fix Amino signing bug (introduced in v1.6.10)

## 1.6.10

Fix support for CosmJS' `DirectSigner`, which is used by wallets. E.g. this fixes using `keplr.getOfflineSigner()` as a wallet in `SecretNetworkClient`.

## 1.6.9

Add the `validateAddress()` helper function.

## 1.6.8

- Turn off `ibcResponses` by default on `txsQuery()` as it can lead to request spamming when there are a lot of results
- Add the `stringToCoin()` helper function
- Alias `coinFromString()` => `stringToCoin()`
- Alias `coinsFromString()` => `stringToCoins()`

## 1.6.7

- `txsQuery()`:
  - Add `pagination` & `order_by` options
  - Add `ibcTxOptions` - control whether and how to resolve IBC response txs
- Fix docs for how to query at a specific height
- Add the `stringToCoins()` helper function

## 1.6.6

Support sending txs that were signed with an Ethermint pubkey.

## 1.6.5

Fix a bug in `ibcResponses` where it sometimes returns a wrong ack/timeout tx.

Note: versions 1.6.2 through 1.6.4 are deprecated due to an NPM upload issue.

## 1.6.1

- Fix handling of empty response on `secretjs.query.compute.queryContract()`.
- Add the `ibcDenom()` util function for calculating the IBC denom of a token that was sent over IBC.

## 1.6.0

Add `ibcResponses` to `TxResponse` - if a tx results in IBC packets being sent, `ibcResponses` contains the IBC ack/timeout txs, Making it easy to verify the success of an IBC operations.

## 1.5.3

Fix localStorage optimization on `MetaMaskWallet.create()`

## 1.5.2

Reverted previous change

## 1.5.1

Removed hardcoded TX Key in preparation of Secret Network Shockwave Omega

## 1.5.0

- BREAKING CHANGE: Switched all the APIs to GRPC-gateway. As a result, some commands have been slightly changed.
  Most noticeable:
  - The library now uses REST endpoints, changed from grpc-web endpoints. To reflect this change `grpcWebUrl` is now `url` when creating a new client
  - Creating a new client is now sync using _new_ (rather than Async): `new SecretNetworkClient(...)`
  - Names of parameters are now snake_case rather than camelCase. e.g. `contractAddress` or `codeHash` is now `contract_address` or `code_hash`
  - `Tx` is now `TxResponse`
