# Changelog & Version Info

## 1.5.2 

Reverted previous change

## 1.5.1

Removed hardcoded TX Key in preparation of Secret Network Shockwave Omega

## 1.5.0 

- BREAKING CHANGE: Switched all the APIs to GRPC-gateway. As a result, some commands have been slightly changed.
Most noticeable:
  - The library now uses REST endpoints, changed from grpc-web endpoints. To reflect this change `grpcWebUrl` is now `url` when creating a new client
  - Creating a new client is now sync using _new_ (rather than Async): `new SecretNetworkClient(...)`
  - Names of parameters are now snake_case rather than camelCase. e.g. `contractAddress` or `codeHash` is now `contract_address` or `codeHash`
  - `Tx` is now `TxResponse`