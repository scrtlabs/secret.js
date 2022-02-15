[Secret.js](../README.md) / [Exports](../modules.md) / MsgChannelOpenConfirm

# Class: MsgChannelOpenConfirm

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgChannelOpenConfirm.md#constructor)

### Methods

- [toAmino](MsgChannelOpenConfirm.md#toamino)
- [toProto](MsgChannelOpenConfirm.md#toproto)

## Constructors

### constructor

• **new MsgChannelOpenConfirm**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgChannelOpenConfirm` |

#### Defined in

[tx/ibc_channel.ts:102](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L102)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_channel.ts:110](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L110)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_channel.ts:106](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L106)
