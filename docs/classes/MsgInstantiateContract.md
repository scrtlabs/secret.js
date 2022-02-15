[Secret.js](../README.md) / [Exports](../modules.md) / MsgInstantiateContract

# Class: MsgInstantiateContract

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgInstantiateContract.md#constructor)

### Properties

- [codeHash](MsgInstantiateContract.md#codehash)
- [codeId](MsgInstantiateContract.md#codeid)
- [initFunds](MsgInstantiateContract.md#initfunds)
- [initMsg](MsgInstantiateContract.md#initmsg)
- [label](MsgInstantiateContract.md#label)
- [sender](MsgInstantiateContract.md#sender)

### Methods

- [toAmino](MsgInstantiateContract.md#toamino)
- [toProto](MsgInstantiateContract.md#toproto)

## Constructors

### constructor

• **new MsgInstantiateContract**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgInstantiateContractParams`](../interfaces/MsgInstantiateContractParams.md) |

#### Defined in

[tx/compute.ts:34](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L34)

## Properties

### codeHash

• **codeHash**: `string`

#### Defined in

[tx/compute.ts:32](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L32)

___

### codeId

• **codeId**: `string`

#### Defined in

[tx/compute.ts:27](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L27)

___

### initFunds

• **initFunds**: [`Coin`](../interfaces/Coin.md)[]

#### Defined in

[tx/compute.ts:31](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L31)

___

### initMsg

• **initMsg**: `object`

#### Defined in

[tx/compute.ts:29](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L29)

___

### label

• **label**: `string`

#### Defined in

[tx/compute.ts:28](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L28)

___

### sender

• **sender**: `string`

#### Defined in

[tx/compute.ts:26](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L26)

## Methods

### toAmino

▸ **toAmino**(`utils`): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `utils` | [`EncryptionUtils`](../interfaces/EncryptionUtils.md) |

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/compute.ts:80](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L80)

___

### toProto

▸ **toProto**(`utils`): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `utils` | [`EncryptionUtils`](../interfaces/EncryptionUtils.md) |

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/compute.ts:51](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L51)
