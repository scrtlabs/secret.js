[Secret.js](../README.md) / [Exports](../modules.md) / MsgAcknowledgement

# Class: MsgAcknowledgement

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgAcknowledgement.md#constructor)

### Methods

- [toAmino](MsgAcknowledgement.md#toamino)
- [toProto](MsgAcknowledgement.md#toproto)

## Constructors

### constructor

• **new MsgAcknowledgement**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgAcknowledgement` |

#### Defined in

[tx/ibc_channel.ts:60](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L60)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_channel.ts:68](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L68)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_channel.ts:64](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L64)
