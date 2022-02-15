[Secret.js](../README.md) / [Exports](../modules.md) / MsgRevoke

# Class: MsgRevoke

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgRevoke.md#constructor)

### Properties

- [params](MsgRevoke.md#params)

### Methods

- [toAmino](MsgRevoke.md#toamino)
- [toProto](MsgRevoke.md#toproto)

## Constructors

### constructor

• **new MsgRevoke**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`MsgRevokeParams`](../modules.md#msgrevokeparams) |

#### Defined in

[tx/authz.ts:237](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/authz.ts#L237)

## Properties

### params

• **params**: [`MsgRevokeParams`](../modules.md#msgrevokeparams)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/authz.ts:256](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/authz.ts#L256)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/authz.ts:239](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/authz.ts#L239)
