[Secret.js](../README.md) / [Exports](../modules.md) / MsgVerifyInvariant

# Class: MsgVerifyInvariant

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgVerifyInvariant.md#constructor)

### Methods

- [toAmino](MsgVerifyInvariant.md#toamino)
- [toProto](MsgVerifyInvariant.md#toproto)

## Constructors

### constructor

• **new MsgVerifyInvariant**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgVerifyInvariant` |

#### Defined in

[tx/crisis.ts:4](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/crisis.ts#L4)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/crisis.ts:10](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/crisis.ts#L10)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/crisis.ts:7](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/crisis.ts#L7)
