[Secret.js](../README.md) / [Exports](../modules.md) / MsgRevokeAllowance

# Class: MsgRevokeAllowance

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgRevokeAllowance.md#constructor)

### Methods

- [toAmino](MsgRevokeAllowance.md#toamino)
- [toProto](MsgRevokeAllowance.md#toproto)

## Constructors

### constructor

• **new MsgRevokeAllowance**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgRevokeAllowance` |

#### Defined in

[tx/feegrant.ts:16](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/feegrant.ts#L16)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/feegrant.ts:22](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/feegrant.ts#L22)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/feegrant.ts:19](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/feegrant.ts#L19)
