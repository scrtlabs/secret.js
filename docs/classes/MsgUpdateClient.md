[Secret.js](../README.md) / [Exports](../modules.md) / MsgUpdateClient

# Class: MsgUpdateClient

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgUpdateClient.md#constructor)

### Methods

- [toAmino](MsgUpdateClient.md#toamino)
- [toProto](MsgUpdateClient.md#toproto)

## Constructors

### constructor

• **new MsgUpdateClient**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgUpdateClient` |

#### Defined in

[tx/ibc_client.ts:4](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L4)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_client.ts:12](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L12)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_client.ts:8](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L8)
