[Secret.js](../README.md) / [Exports](../modules.md) / MsgSubmitEvidence

# Class: MsgSubmitEvidence

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgSubmitEvidence.md#constructor)

### Methods

- [toAmino](MsgSubmitEvidence.md#toamino)
- [toProto](MsgSubmitEvidence.md#toproto)

## Constructors

### constructor

• **new MsgSubmitEvidence**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgSubmitEvidence` |

#### Defined in

[tx/evidence.ts:4](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/evidence.ts#L4)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/evidence.ts:12](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/evidence.ts#L12)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/evidence.ts:8](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/evidence.ts#L8)
