[Secret.js](../README.md) / [Exports](../modules.md) / MsgConnectionOpenTry

# Class: MsgConnectionOpenTry

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgConnectionOpenTry.md#constructor)

### Methods

- [toAmino](MsgConnectionOpenTry.md#toamino)
- [toProto](MsgConnectionOpenTry.md#toproto)

## Constructors

### constructor

• **new MsgConnectionOpenTry**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgConnectionOpenTry` |

#### Defined in

[tx/ibc_connection.ts:18](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L18)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_connection.ts:26](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L26)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_connection.ts:22](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L22)
