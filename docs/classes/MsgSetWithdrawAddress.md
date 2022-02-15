[Secret.js](../README.md) / [Exports](../modules.md) / MsgSetWithdrawAddress

# Class: MsgSetWithdrawAddress

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgSetWithdrawAddress.md#constructor)

### Properties

- [delegatorAddress](MsgSetWithdrawAddress.md#delegatoraddress)
- [withdrawAddress](MsgSetWithdrawAddress.md#withdrawaddress)

### Methods

- [toAmino](MsgSetWithdrawAddress.md#toamino)
- [toProto](MsgSetWithdrawAddress.md#toproto)

## Constructors

### constructor

• **new MsgSetWithdrawAddress**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgSetWithdrawAddressParams`](../modules.md#msgsetwithdrawaddressparams) |

#### Defined in

[tx/distribution.ts:13](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L13)

## Properties

### delegatorAddress

• **delegatorAddress**: `string`

#### Defined in

[tx/distribution.ts:10](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L10)

___

### withdrawAddress

• **withdrawAddress**: `string`

#### Defined in

[tx/distribution.ts:11](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L11)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/distribution.ts:37](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L37)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/distribution.ts:21](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L21)
