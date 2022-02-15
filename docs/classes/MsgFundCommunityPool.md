[Secret.js](../README.md) / [Exports](../modules.md) / MsgFundCommunityPool

# Class: MsgFundCommunityPool

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgFundCommunityPool.md#constructor)

### Properties

- [amount](MsgFundCommunityPool.md#amount)
- [depositor](MsgFundCommunityPool.md#depositor)

### Methods

- [toAmino](MsgFundCommunityPool.md#toamino)
- [toProto](MsgFundCommunityPool.md#toproto)

## Constructors

### constructor

• **new MsgFundCommunityPool**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgFundCommunityPoolParams`](../modules.md#msgfundcommunitypoolparams) |

#### Defined in

[tx/distribution.ts:142](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L142)

## Properties

### amount

• **amount**: [`Coin`](../interfaces/Coin.md)[]

#### Defined in

[tx/distribution.ts:140](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L140)

___

### depositor

• **depositor**: `string`

#### Defined in

[tx/distribution.ts:139](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L139)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/distribution.ts:163](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L163)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/distribution.ts:147](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L147)
