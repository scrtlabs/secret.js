[Secret.js](../README.md) / [Exports](../modules.md) / MsgSend

# Class: MsgSend

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgSend.md#constructor)

### Properties

- [amount](MsgSend.md#amount)
- [fromAddress](MsgSend.md#fromaddress)
- [toAddress](MsgSend.md#toaddress)

### Methods

- [toAmino](MsgSend.md#toamino)
- [toProto](MsgSend.md#toproto)

## Constructors

### constructor

• **new MsgSend**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgSendParams`](../modules.md#msgsendparams) |

#### Defined in

[tx/bank.ts:14](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/bank.ts#L14)

## Properties

### amount

• **amount**: [`Coin`](../interfaces/Coin.md)[]

#### Defined in

[tx/bank.ts:12](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/bank.ts#L12)

___

### fromAddress

• **fromAddress**: `string`

#### Defined in

[tx/bank.ts:10](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/bank.ts#L10)

___

### toAddress

• **toAddress**: `string`

#### Defined in

[tx/bank.ts:11](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/bank.ts#L11)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/bank.ts:37](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/bank.ts#L37)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/bank.ts:20](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/bank.ts#L20)
