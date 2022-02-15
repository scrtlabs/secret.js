[Secret.js](../README.md) / [Exports](../modules.md) / MsgChannelOpenInit

# Class: MsgChannelOpenInit

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgChannelOpenInit.md#constructor)

### Methods

- [toAmino](MsgChannelOpenInit.md#toamino)
- [toProto](MsgChannelOpenInit.md#toproto)

## Constructors

### constructor

• **new MsgChannelOpenInit**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgChannelOpenInit` |

#### Defined in

[tx/ibc_channel.ts:46](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L46)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_channel.ts:54](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L54)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_channel.ts:50](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L50)
