[Secret.js](../README.md) / [Exports](../modules.md) / MsgVote

# Class: MsgVote

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgVote.md#constructor)

### Properties

- [option](MsgVote.md#option)
- [proposalId](MsgVote.md#proposalid)
- [voter](MsgVote.md#voter)

### Methods

- [toAmino](MsgVote.md#toamino)
- [toProto](MsgVote.md#toproto)

## Constructors

### constructor

• **new MsgVote**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `MsgVote` |

#### Defined in

[tx/gov.ts:254](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L254)

## Properties

### option

• **option**: [`VoteOption`](../enums/VoteOption.md)

#### Defined in

[tx/gov.ts:252](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L252)

___

### proposalId

• **proposalId**: `string`

#### Defined in

[tx/gov.ts:251](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L251)

___

### voter

• **voter**: `string`

#### Defined in

[tx/gov.ts:250](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L250)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/gov.ts:274](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L274)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/gov.ts:260](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L260)
