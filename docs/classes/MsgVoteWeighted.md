[Secret.js](../README.md) / [Exports](../modules.md) / MsgVoteWeighted

# Class: MsgVoteWeighted

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgVoteWeighted.md#constructor)

### Properties

- [options](MsgVoteWeighted.md#options)
- [proposalId](MsgVoteWeighted.md#proposalid)
- [voter](MsgVoteWeighted.md#voter)

### Methods

- [toAmino](MsgVoteWeighted.md#toamino)
- [toProto](MsgVoteWeighted.md#toproto)

## Constructors

### constructor

• **new MsgVoteWeighted**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgVoteWeightedParams`](../modules.md#msgvoteweightedparams) |

#### Defined in

[tx/gov.ts:308](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L308)

## Properties

### options

• **options**: [`WeightedVoteOption`](../interfaces/WeightedVoteOption.md)[]

#### Defined in

[tx/gov.ts:306](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L306)

___

### proposalId

• **proposalId**: `string`

#### Defined in

[tx/gov.ts:305](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L305)

___

### voter

• **voter**: `string`

#### Defined in

[tx/gov.ts:304](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L304)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/gov.ts:331](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L331)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/gov.ts:314](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L314)
