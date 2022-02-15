[Secret.js](../README.md) / [Exports](../modules.md) / MsgGrant

# Class: MsgGrant

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgGrant.md#constructor)

### Properties

- [params](MsgGrant.md#params)

### Methods

- [toAmino](MsgGrant.md#toamino)
- [toProto](MsgGrant.md#toproto)

## Constructors

### constructor

• **new MsgGrant**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`MsgGrantParams`](../modules.md#msggrantparams) |

#### Defined in

[tx/authz.ts:119](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/authz.ts#L119)

## Properties

### params

• **params**: [`MsgGrantParams`](../modules.md#msggrantparams)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/authz.ts:189](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/authz.ts#L189)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/authz.ts:121](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/authz.ts#L121)
