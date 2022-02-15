[Secret.js](../README.md) / [Exports](../modules.md) / MsgChannelOpenAck

# Class: MsgChannelOpenAck

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgChannelOpenAck.md#constructor)

### Methods

- [toAmino](MsgChannelOpenAck.md#toamino)
- [toProto](MsgChannelOpenAck.md#toproto)

## Constructors

### constructor

• **new MsgChannelOpenAck**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgChannelOpenAck` |

#### Defined in

[tx/ibc_channel.ts:88](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L88)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_channel.ts:96](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L96)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_channel.ts:92](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L92)
