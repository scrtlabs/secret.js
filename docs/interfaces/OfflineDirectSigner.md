[Secret.js](../README.md) / [Exports](../modules.md) / OfflineDirectSigner

# Interface: OfflineDirectSigner

## Table of contents

### Methods

- [getAccounts](OfflineDirectSigner.md#getaccounts)
- [signDirect](OfflineDirectSigner.md#signdirect)

## Methods

### getAccounts

▸ `Readonly` **getAccounts**(): `Promise`<readonly [`AccountData`](AccountData.md)[]\>

#### Returns

`Promise`<readonly [`AccountData`](AccountData.md)[]\>

#### Defined in

[wallet.ts:190](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L190)

___

### signDirect

▸ `Readonly` **signDirect**(`signerAddress`, `signDoc`): `Promise`<[`DirectSignResponse`](DirectSignResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerAddress` | `string` |
| `signDoc` | `SignDoc` |

#### Returns

`Promise`<[`DirectSignResponse`](DirectSignResponse.md)\>

#### Defined in

[wallet.ts:191](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L191)
