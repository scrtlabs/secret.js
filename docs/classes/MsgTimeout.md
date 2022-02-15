[Secret.js](../README.md) / [Exports](../modules.md) / MsgTimeout

# Class: MsgTimeout

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgTimeout.md#constructor)

### Methods

- [toAmino](MsgTimeout.md#toamino)
- [toProto](MsgTimeout.md#toproto)

## Constructors

### constructor

• **new MsgTimeout**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgTimeout` |

#### Defined in

[tx/ibc_channel.ts:18](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L18)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_channel.ts:26](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L26)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_channel.ts:22](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L22)
