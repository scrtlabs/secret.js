[Secret.js](../README.md) / [Exports](../modules.md) / ReadonlySigner

# Class: ReadonlySigner

## Implements

- [`OfflineAminoSigner`](../interfaces/OfflineAminoSigner.md)

## Table of contents

### Constructors

- [constructor](ReadonlySigner.md#constructor)

### Methods

- [getAccounts](ReadonlySigner.md#getaccounts)
- [signAmino](ReadonlySigner.md#signamino)

## Constructors

### constructor

• **new ReadonlySigner**()

## Methods

### getAccounts

▸ **getAccounts**(): `Promise`<readonly [`AccountData`](../interfaces/AccountData.md)[]\>

Get AccountData array from wallet. Rejects if not enabled.

#### Returns

`Promise`<readonly [`AccountData`](../interfaces/AccountData.md)[]\>

#### Implementation of

[OfflineAminoSigner](../interfaces/OfflineAminoSigner.md).[getAccounts](../interfaces/OfflineAminoSigner.md#getaccounts)

#### Defined in

[secret_network_client.ts:97](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L97)

___

### signAmino

▸ **signAmino**(`_signerAddress`, `_signDoc`): `Promise`<[`AminoSignResponse`](../interfaces/AminoSignResponse.md)\>

Request signature from whichever key corresponds to provided bech32-encoded address. Rejects if not enabled.

The signer implementation may offer the user the ability to override parts of the signDoc. It must
return the doc that was signed in the response.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerAddress` | `string` |
| `_signDoc` | [`StdSignDoc`](../interfaces/StdSignDoc.md) |

#### Returns

`Promise`<[`AminoSignResponse`](../interfaces/AminoSignResponse.md)\>

#### Implementation of

[OfflineAminoSigner](../interfaces/OfflineAminoSigner.md).[signAmino](../interfaces/OfflineAminoSigner.md#signamino)

#### Defined in

[secret_network_client.ts:100](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L100)
