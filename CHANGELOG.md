# Changelog & Version Info

## Unreleased

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
