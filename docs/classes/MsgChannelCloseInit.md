[Secret.js](../README.md) / [Exports](../modules.md) / MsgChannelCloseInit

# Class: MsgChannelCloseInit

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgChannelCloseInit.md#constructor)

### Methods

- [toAmino](MsgChannelCloseInit.md#toamino)
- [toProto](MsgChannelCloseInit.md#toproto)

## Constructors

### constructor

• **new MsgChannelCloseInit**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgChannelCloseInit` |

#### Defined in

[tx/ibc_channel.ts:116](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L116)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_channel.ts:124](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L124)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_channel.ts:120](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L120)
