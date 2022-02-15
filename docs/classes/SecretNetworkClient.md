[Secret.js](../README.md) / [Exports](../modules.md) / SecretNetworkClient

# Class: SecretNetworkClient

## Table of contents

### Properties

- [query](SecretNetworkClient.md#query)
- [tendermint](SecretNetworkClient.md#tendermint)
- [tx](SecretNetworkClient.md#tx)

### Methods

- [create](SecretNetworkClient.md#create)

## Properties

### query

• **query**: `Querier`

#### Defined in

[secret_network_client.ts:227](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L227)

___

### tendermint

• **tendermint**: `Tendermint34Client`

#### Defined in

[secret_network_client.ts:229](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L229)

___

### tx

• **tx**: `TxSender`

#### Defined in

[secret_network_client.ts:228](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L228)

## Methods

### create

▸ `Static` **create**(`rpcUrl`, `signingParams?`): `Promise`<[`SecretNetworkClient`](SecretNetworkClient.md)\>

Creates a new SecretNetworkClient client. For a readonly client pass just the `rpcUrl` param.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rpcUrl` | `string` |
| `signingParams` | [`SigningParams`](../modules.md#signingparams) |

#### Returns

`Promise`<[`SecretNetworkClient`](SecretNetworkClient.md)\>

#### Defined in

[secret_network_client.ts:236](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L236)
