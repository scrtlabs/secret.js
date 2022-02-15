[Secret.js](../README.md) / [Exports](../modules.md) / MsgRecvPacket

# Class: MsgRecvPacket

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgRecvPacket.md#constructor)

### Methods

- [toAmino](MsgRecvPacket.md#toamino)
- [toProto](MsgRecvPacket.md#toproto)

## Constructors

### constructor

• **new MsgRecvPacket**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgRecvPacket` |

#### Defined in

[tx/ibc_channel.ts:4](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L4)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_channel.ts:12](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L12)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_channel.ts:8](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L8)
