[Secret.js](../README.md) / [Exports](../modules.md) / MsgConnectionOpenInit

# Class: MsgConnectionOpenInit

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgConnectionOpenInit.md#constructor)

### Methods

- [toAmino](MsgConnectionOpenInit.md#toamino)
- [toProto](MsgConnectionOpenInit.md#toproto)

## Constructors

### constructor

• **new MsgConnectionOpenInit**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgConnectionOpenInit` |

#### Defined in

[tx/ibc_connection.ts:4](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L4)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_connection.ts:12](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L12)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_connection.ts:8](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_connection.ts#L8)
