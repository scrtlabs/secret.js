[Secret.js](../README.md) / [Exports](../modules.md) / Wallet

# Class: Wallet

## Table of contents

### Constructors

- [constructor](Wallet.md#constructor)

### Properties

- [address](Wallet.md#address)
- [mnemonic](Wallet.md#mnemonic)
- [privateKey](Wallet.md#privatekey)
- [publicKey](Wallet.md#publickey)

### Methods

- [getAccounts](Wallet.md#getaccounts)
- [signAmino](Wallet.md#signamino)

## Constructors

### constructor

• **new Wallet**(`mnemonic?`, `account?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mnemonic` | `string` | `""` | Import mnemonic or generate random if empty |
| `account` | `number` | `0` | The account index in the HD derivation path |

#### Defined in

[wallet.ts:22](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L22)

## Properties

### address

• **address**: `string`

#### Defined in

[wallet.ts:16](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L16)

___

### mnemonic

• **mnemonic**: `string`

#### Defined in

[wallet.ts:13](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L13)

___

### privateKey

• **privateKey**: `Uint8Array`

#### Defined in

[wallet.ts:15](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L15)

___

### publicKey

• **publicKey**: `Uint8Array`

#### Defined in

[wallet.ts:14](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L14)

## Methods

### getAccounts

▸ **getAccounts**(): `Promise`<readonly [`AccountData`](../interfaces/AccountData.md)[]\>

#### Returns

`Promise`<readonly [`AccountData`](../interfaces/AccountData.md)[]\>

#### Defined in

[wallet.ts:48](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L48)

___

### signAmino

▸ **signAmino**(`signerAddress`, `signDoc`): `Promise`<[`AminoSignResponse`](../interfaces/AminoSignResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerAddress` | `string` |
| `signDoc` | [`StdSignDoc`](../interfaces/StdSignDoc.md) |

#### Returns

`Promise`<[`AminoSignResponse`](../interfaces/AminoSignResponse.md)\>

#### Defined in

[wallet.ts:58](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L58)
