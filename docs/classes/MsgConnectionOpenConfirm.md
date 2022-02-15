[Secret.js](../README.md) / [Exports](../modules.md) / MsgConnectionOpenConfirm

# Class: MsgConnectionOpenConfirm

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgConnectionOpenConfirm.md#constructor)

### Methods

- [toAmino](MsgConnectionOpenConfirm.md#toamino)
- [toProto](MsgConnectionOpenConfirm.md#toproto)

## Constructors

### constructor

• **new MsgConnectionOpenConfirm**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgConnectionOpenConfirm` |

#### Defined in

[tx/ibc_connection.ts:46](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L46)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_connection.ts:54](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L54)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_connection.ts:50](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L50)
