[Secret.js](../README.md) / [Exports](../modules.md) / MsgTimeoutOnClose

# Class: MsgTimeoutOnClose

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgTimeoutOnClose.md#constructor)

### Methods

- [toAmino](MsgTimeoutOnClose.md#toamino)
- [toProto](MsgTimeoutOnClose.md#toproto)

## Constructors

### constructor

• **new MsgTimeoutOnClose**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgTimeoutOnClose` |

#### Defined in

[tx/ibc_channel.ts:32](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L32)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_channel.ts:40](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L40)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_channel.ts:36](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_channel.ts#L36)
