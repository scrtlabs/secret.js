[Secret.js](../README.md) / [Exports](../modules.md) / MsgExec

# Class: MsgExec

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgExec.md#constructor)

### Properties

- [params](MsgExec.md#params)

### Methods

- [toAmino](MsgExec.md#toamino)
- [toProto](MsgExec.md#toproto)

## Constructors

### constructor

• **new MsgExec**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`MsgExecParams`](../modules.md#msgexecparams) |

#### Defined in

[tx/authz.ts:205](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/authz.ts#L205)

## Properties

### params

• **params**: [`MsgExecParams`](../modules.md#msgexecparams)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/authz.ts:223](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/authz.ts#L223)

___

### toProto

▸ **toProto**(`utils`): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `utils` | [`EncryptionUtils`](../interfaces/EncryptionUtils.md) |

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/authz.ts:207](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/authz.ts#L207)
