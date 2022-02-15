[Secret.js](../README.md) / [Exports](../modules.md) / EncryptionUtilsImpl

# Class: EncryptionUtilsImpl

## Implements

- [`EncryptionUtils`](../interfaces/EncryptionUtils.md)

## Table of contents

### Constructors

- [constructor](EncryptionUtilsImpl.md#constructor)

### Properties

- [pubkey](EncryptionUtilsImpl.md#pubkey)

### Methods

- [decrypt](EncryptionUtilsImpl.md#decrypt)
- [encrypt](EncryptionUtilsImpl.md#encrypt)
- [getPubkey](EncryptionUtilsImpl.md#getpubkey)
- [getTxEncryptionKey](EncryptionUtilsImpl.md#gettxencryptionkey)
- [GenerateNewKeyPair](EncryptionUtilsImpl.md#generatenewkeypair)
- [GenerateNewKeyPairFromSeed](EncryptionUtilsImpl.md#generatenewkeypairfromseed)
- [GenerateNewSeed](EncryptionUtilsImpl.md#generatenewseed)

## Constructors

### constructor

• **new EncryptionUtilsImpl**(`registrationQuerier`, `seed?`, `chainId?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `registrationQuerier` | `QueryClientImpl` |
| `seed?` | `Uint8Array` |
| `chainId?` | `string` |

#### Defined in

[encryption.ts:32](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L32)

## Properties

### pubkey

• `Readonly` **pubkey**: `Uint8Array`

#### Defined in

[encryption.ts:29](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L29)

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

#### Implementation of

[EncryptionUtils](../interfaces/EncryptionUtils.md).[decrypt](../interfaces/EncryptionUtils.md#decrypt)

#### Defined in

[encryption.ts:128](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L128)

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

#### Implementation of

[EncryptionUtils](../interfaces/EncryptionUtils.md).[encrypt](../interfaces/EncryptionUtils.md#encrypt)

#### Defined in

[encryption.ts:104](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L104)

___

### getPubkey

▸ **getPubkey**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Implementation of

[EncryptionUtils](../interfaces/EncryptionUtils.md).[getPubkey](../interfaces/EncryptionUtils.md#getpubkey)

#### Defined in

[encryption.ts:148](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L148)

___

### getTxEncryptionKey

▸ **getTxEncryptionKey**(`nonce`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `nonce` | `Uint8Array` |

#### Returns

`Promise`<`Uint8Array`\>

#### Implementation of

[EncryptionUtils](../interfaces/EncryptionUtils.md).[getTxEncryptionKey](../interfaces/EncryptionUtils.md#gettxencryptionkey)

#### Defined in

[encryption.ts:90](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L90)

___

### GenerateNewKeyPair

▸ `Static` **GenerateNewKeyPair**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `privkey` | `Uint8Array` |
| `pubkey` | `Uint8Array` |

#### Defined in

[encryption.ts:58](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L58)

___

### GenerateNewKeyPairFromSeed

▸ `Static` **GenerateNewKeyPairFromSeed**(`seed`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `Uint8Array` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `privkey` | `Uint8Array` |
| `pubkey` | `Uint8Array` |

#### Defined in

[encryption.ts:71](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L71)

___

### GenerateNewSeed

▸ `Static` **GenerateNewSeed**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[encryption.ts:67](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/encryption.ts#L67)
