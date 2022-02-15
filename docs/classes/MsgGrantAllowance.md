[Secret.js](../README.md) / [Exports](../modules.md) / MsgGrantAllowance

# Class: MsgGrantAllowance

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgGrantAllowance.md#constructor)

### Methods

- [toAmino](MsgGrantAllowance.md#toamino)
- [toProto](MsgGrantAllowance.md#toproto)

## Constructors

### constructor

• **new MsgGrantAllowance**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgGrantAllowance` |

#### Defined in

[tx/feegrant.ts:4](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/feegrant.ts#L4)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/feegrant.ts:10](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/feegrant.ts#L10)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/feegrant.ts:7](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/feegrant.ts#L7)
