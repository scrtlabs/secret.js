[Secret.js](../README.md) / [Exports](../modules.md) / MsgUndelegate

# Class: MsgUndelegate

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgUndelegate.md#constructor)

### Properties

- [amount](MsgUndelegate.md#amount)
- [delegatorAddress](MsgUndelegate.md#delegatoraddress)
- [validatorAddress](MsgUndelegate.md#validatoraddress)

### Methods

- [toAmino](MsgUndelegate.md#toamino)
- [toProto](MsgUndelegate.md#toproto)

## Constructors

### constructor

• **new MsgUndelegate**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgUndelegateParams`](../interfaces/MsgUndelegateParams.md) |

#### Defined in

[tx/staking.ts:333](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L333)

## Properties

### amount

• **amount**: [`Coin`](../interfaces/Coin.md)

#### Defined in

[tx/staking.ts:331](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L331)

___

### delegatorAddress

• **delegatorAddress**: `string`

#### Defined in

[tx/staking.ts:329](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L329)

___

### validatorAddress

• **validatorAddress**: `string`

#### Defined in

[tx/staking.ts:330](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L330)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/staking.ts:360](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L360)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/staking.ts:343](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L343)
