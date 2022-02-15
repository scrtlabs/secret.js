[Secret.js](../README.md) / [Exports](../modules.md) / MsgDelegate

# Class: MsgDelegate

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgDelegate.md#constructor)

### Properties

- [amount](MsgDelegate.md#amount)
- [delegatorAddress](MsgDelegate.md#delegatoraddress)
- [validatorAddress](MsgDelegate.md#validatoraddress)

### Methods

- [toAmino](MsgDelegate.md#toamino)
- [toProto](MsgDelegate.md#toproto)

## Constructors

### constructor

• **new MsgDelegate**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgDelegateParams`](../modules.md#msgdelegateparams) |

#### Defined in

[tx/staking.ts:227](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L227)

## Properties

### amount

• **amount**: [`Coin`](../interfaces/Coin.md)

#### Defined in

[tx/staking.ts:225](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L225)

___

### delegatorAddress

• **delegatorAddress**: `string`

#### Defined in

[tx/staking.ts:223](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L223)

___

### validatorAddress

• **validatorAddress**: `string`

#### Defined in

[tx/staking.ts:224](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L224)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/staking.ts:254](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L254)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/staking.ts:237](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L237)
