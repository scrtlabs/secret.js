[Secret.js](../README.md) / [Exports](../modules.md) / MsgCreateClient

# Class: MsgCreateClient

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgCreateClient.md#constructor)

### Methods

- [toAmino](MsgCreateClient.md#toamino)
- [toProto](MsgCreateClient.md#toproto)

## Constructors

### constructor

• **new MsgCreateClient**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgCreateClient` |

#### Defined in

[tx/ibc_client.ts:46](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L46)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_client.ts:54](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L54)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_client.ts:50](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L50)
