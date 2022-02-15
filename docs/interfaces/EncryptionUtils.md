[Secret.js](../README.md) / [Exports](../modules.md) / EncryptionUtils

# Interface: EncryptionUtils

## Implemented by

- [`EncryptionUtilsImpl`](../classes/EncryptionUtilsImpl.md)

## Table of contents

### Methods

- [decrypt](EncryptionUtils.md#decrypt)
- [encrypt](EncryptionUtils.md#encrypt)
- [getPubkey](EncryptionUtils.md#getpubkey)
- [getTxEncryptionKey](EncryptionUtils.md#gettxencryptionkey)

## Methods

### decrypt

▸ **decrypt**(`ciphertext`, `nonce`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ciphertext` | `Uint8Array` |
| `nonce` | `Uint8Array` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[encryption.ts:12](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L12)

___

### encrypt

▸ **encrypt**(`contractCodeHash`, `msg`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractCodeHash` | `string` |
| `msg` | `object` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[encryption.ts:13](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L13)

___

### getPubkey

▸ **getPubkey**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[encryption.ts:11](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L11)

___

### getTxEncryptionKey

▸ **getTxEncryptionKey**(`nonce`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `nonce` | `Uint8Array` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[encryption.ts:14](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L14)
