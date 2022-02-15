[Secret.js](../README.md) / [Exports](../modules.md) / MsgConnectionOpenAck

# Class: MsgConnectionOpenAck

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgConnectionOpenAck.md#constructor)

### Methods

- [toAmino](MsgConnectionOpenAck.md#toamino)
- [toProto](MsgConnectionOpenAck.md#toproto)

## Constructors

### constructor

• **new MsgConnectionOpenAck**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgConnectionOpenAck` |

#### Defined in

[tx/ibc_connection.ts:32](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L32)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_connection.ts:40](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L40)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_connection.ts:36](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L36)
