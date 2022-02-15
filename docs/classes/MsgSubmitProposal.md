[Secret.js](../README.md) / [Exports](../modules.md) / MsgSubmitProposal

# Class: MsgSubmitProposal

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgSubmitProposal.md#constructor)

### Properties

- [content](MsgSubmitProposal.md#content)
- [initialDeposit](MsgSubmitProposal.md#initialdeposit)
- [proposer](MsgSubmitProposal.md#proposer)
- [type](MsgSubmitProposal.md#type)

### Methods

- [toAmino](MsgSubmitProposal.md#toamino)
- [toProto](MsgSubmitProposal.md#toproto)

## Constructors

### constructor

• **new MsgSubmitProposal**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgSubmitProposalParams`](../interfaces/MsgSubmitProposalParams.md) |

#### Defined in

[tx/gov.ts:111](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L111)

## Properties

### content

• **content**: [`ProposalContent`](../modules.md#proposalcontent)

#### Defined in

[tx/gov.ts:107](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L107)

___

### initialDeposit

• **initialDeposit**: [`Coin`](../interfaces/Coin.md)[]

#### Defined in

[tx/gov.ts:108](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L108)

___

### proposer

• **proposer**: `string`

#### Defined in

[tx/gov.ts:109](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L109)

___

### type

• **type**: [`ProposalType`](../enums/ProposalType.md)

#### Defined in

[tx/gov.ts:106](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L106)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/gov.ts:211](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L211)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/gov.ts:123](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/gov.ts#L123)
