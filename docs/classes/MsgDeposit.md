[Secret.js](../README.md) / [Exports](../modules.md) / MsgDeposit

# Class: MsgDeposit

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgDeposit.md#constructor)

### Properties

- [amount](MsgDeposit.md#amount)
- [depositor](MsgDeposit.md#depositor)
- [proposalId](MsgDeposit.md#proposalid)

### Methods

- [toAmino](MsgDeposit.md#toamino)
- [toProto](MsgDeposit.md#toproto)

## Constructors

### constructor

• **new MsgDeposit**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `MsgDeposit` |

#### Defined in

[tx/gov.ts:355](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L355)

## Properties

### amount

• **amount**: [`Coin`](../interfaces/Coin.md)[]

#### Defined in

[tx/gov.ts:353](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L353)

___

### depositor

• **depositor**: `string`

#### Defined in

[tx/gov.ts:351](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L351)

___

### proposalId

• **proposalId**: `string`

#### Defined in

[tx/gov.ts:352](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L352)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/gov.ts:375](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L375)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/gov.ts:361](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L361)
