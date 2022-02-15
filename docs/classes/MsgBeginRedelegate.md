[Secret.js](../README.md) / [Exports](../modules.md) / MsgBeginRedelegate

# Class: MsgBeginRedelegate

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgBeginRedelegate.md#constructor)

### Properties

- [amount](MsgBeginRedelegate.md#amount)
- [delegatorAddress](MsgBeginRedelegate.md#delegatoraddress)
- [validatorDstAddress](MsgBeginRedelegate.md#validatordstaddress)
- [validatorSrcAddress](MsgBeginRedelegate.md#validatorsrcaddress)

### Methods

- [toAmino](MsgBeginRedelegate.md#toamino)
- [toProto](MsgBeginRedelegate.md#toproto)

## Constructors

### constructor

• **new MsgBeginRedelegate**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgBeginRedelegateParams`](../modules.md#msgbeginredelegateparams) |

#### Defined in

[tx/staking.ts:279](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L279)

## Properties

### amount

• **amount**: [`Coin`](../interfaces/Coin.md)

#### Defined in

[tx/staking.ts:277](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L277)

___

### delegatorAddress

• **delegatorAddress**: `string`

#### Defined in

[tx/staking.ts:274](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L274)

___

### validatorDstAddress

• **validatorDstAddress**: `string`

#### Defined in

[tx/staking.ts:276](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L276)

___

### validatorSrcAddress

• **validatorSrcAddress**: `string`

#### Defined in

[tx/staking.ts:275](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L275)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/staking.ts:309](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L309)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/staking.ts:291](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L291)
