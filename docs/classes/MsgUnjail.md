[Secret.js](../README.md) / [Exports](../modules.md) / MsgUnjail

# Class: MsgUnjail

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgUnjail.md#constructor)

### Properties

- [validatorAddr](MsgUnjail.md#validatoraddr)

### Methods

- [toAmino](MsgUnjail.md#toamino)
- [toProto](MsgUnjail.md#toproto)

## Constructors

### constructor

• **new MsgUnjail**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgUnjailParams`](../modules.md#msgunjailparams) |

#### Defined in

[tx/slashing.ts:10](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/slashing.ts#L10)

## Properties

### validatorAddr

• **validatorAddr**: `string`

#### Defined in

[tx/slashing.ts:8](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/slashing.ts#L8)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/slashing.ts:29](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/slashing.ts#L29)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/slashing.ts:14](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/slashing.ts#L14)
