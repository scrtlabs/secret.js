[Secret.js](../README.md) / [Exports](../modules.md) / OfflineAminoSigner

# Interface: OfflineAminoSigner

## Implemented by

- [`ReadonlySigner`](../classes/ReadonlySigner.md)

## Table of contents

### Methods

- [getAccounts](OfflineAminoSigner.md#getaccounts)
- [signAmino](OfflineAminoSigner.md#signamino)

## Methods

### getAccounts

▸ `Readonly` **getAccounts**(): `Promise`<readonly [`AccountData`](AccountData.md)[]\>

Get AccountData array from wallet. Rejects if not enabled.

#### Returns

`Promise`<readonly [`AccountData`](AccountData.md)[]\>

#### Defined in

[wallet.ts:218](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L218)

___

### signAmino

▸ `Readonly` **signAmino**(`signerAddress`, `signDoc`): `Promise`<[`AminoSignResponse`](AminoSignResponse.md)\>

Request signature from whichever key corresponds to provided bech32-encoded address. Rejects if not enabled.

The signer implementation may offer the user the ability to override parts of the signDoc. It must
return the doc that was signed in the response.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signerAddress` | `string` | The address of the account that should sign the transaction |
| `signDoc` | [`StdSignDoc`](StdSignDoc.md) | The content that should be signed |

#### Returns

`Promise`<[`AminoSignResponse`](AminoSignResponse.md)\>

#### Defined in

[wallet.ts:229](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L229)
