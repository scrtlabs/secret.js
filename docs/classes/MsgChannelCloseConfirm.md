[Secret.js](../README.md) / [Exports](../modules.md) / MsgChannelCloseConfirm

# Class: MsgChannelCloseConfirm

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgChannelCloseConfirm.md#constructor)

### Methods

- [toAmino](MsgChannelCloseConfirm.md#toamino)
- [toProto](MsgChannelCloseConfirm.md#toproto)

## Constructors

### constructor

• **new MsgChannelCloseConfirm**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgChannelCloseConfirm` |

#### Defined in

[tx/ibc_channel.ts:130](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L130)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_channel.ts:138](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L138)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_channel.ts:134](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L134)
