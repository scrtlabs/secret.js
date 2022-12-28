# Changelog & Version Info

## 1.6.2

Fix a bug in `ibcResponses` where it sometimes returns a wrong ack/timeout tx.

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
