[Secret.js](../README.md) / [Exports](../modules.md) / MsgWithdrawValidatorCommission

# Class: MsgWithdrawValidatorCommission

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgWithdrawValidatorCommission.md#constructor)

### Properties

- [validatorAddress](MsgWithdrawValidatorCommission.md#validatoraddress)

### Methods

- [toAmino](MsgWithdrawValidatorCommission.md#toamino)
- [toProto](MsgWithdrawValidatorCommission.md#toproto)

## Constructors

### constructor

• **new MsgWithdrawValidatorCommission**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgWithdrawValidatorCommissionParams`](../modules.md#msgwithdrawvalidatorcommissionparams) |

#### Defined in

[tx/distribution.ts:104](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L104)

## Properties

### validatorAddress

• **validatorAddress**: `string`

#### Defined in

[tx/distribution.ts:102](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L102)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/distribution.ts:123](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L123)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/distribution.ts:108](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L108)
