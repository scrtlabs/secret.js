[Secret.js](../README.md) / [Exports](../modules.md) / MsgTransfer

# Class: MsgTransfer

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgTransfer.md#constructor)

### Properties

- [params](MsgTransfer.md#params)

### Methods

- [toAmino](MsgTransfer.md#toamino)
- [toProto](MsgTransfer.md#toproto)

## Constructors

### constructor

• **new MsgTransfer**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`MsgTransferParams`](../modules.md#msgtransferparams) |

#### Defined in

[tx/ibc_transfer.ts:46](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_transfer.ts#L46)

## Properties

### params

• **params**: [`MsgTransferParams`](../modules.md#msgtransferparams)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_transfer.ts:71](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_transfer.ts#L71)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_transfer.ts:48](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_transfer.ts#L48)
