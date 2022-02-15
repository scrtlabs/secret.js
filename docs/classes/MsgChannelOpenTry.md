[Secret.js](../README.md) / [Exports](../modules.md) / MsgChannelOpenTry

# Class: MsgChannelOpenTry

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgChannelOpenTry.md#constructor)

### Methods

- [toAmino](MsgChannelOpenTry.md#toamino)
- [toProto](MsgChannelOpenTry.md#toproto)

## Constructors

### constructor

• **new MsgChannelOpenTry**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgChannelOpenTry` |

#### Defined in

[tx/ibc_channel.ts:74](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L74)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_channel.ts:82](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L82)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_channel.ts:78](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L78)
