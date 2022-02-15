[Secret.js](../README.md) / [Exports](../modules.md) / MsgEditValidator

# Class: MsgEditValidator

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgEditValidator.md#constructor)

### Properties

- [commissionRate](MsgEditValidator.md#commissionrate)
- [description](MsgEditValidator.md#description)
- [minSelfDelegation](MsgEditValidator.md#minselfdelegation)
- [validatorAddress](MsgEditValidator.md#validatoraddress)

### Methods

- [toAmino](MsgEditValidator.md#toamino)
- [toProto](MsgEditValidator.md#toproto)

## Constructors

### constructor

• **new MsgEditValidator**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgEditValidatorParams`](../modules.md#msgeditvalidatorparams) |

#### Defined in

[tx/staking.ts:151](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L151)

## Properties

### commissionRate

• `Optional` **commissionRate**: `number`

#### Defined in

[tx/staking.ts:148](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L148)

___

### description

• `Optional` **description**: [`Description`](../interfaces/Description.md)

#### Defined in

[tx/staking.ts:147](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L147)

___

### minSelfDelegation

• `Optional` **minSelfDelegation**: `string`

#### Defined in

[tx/staking.ts:149](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L149)

___

### validatorAddress

• **validatorAddress**: `string`

#### Defined in

[tx/staking.ts:146](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L146)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/staking.ts:187](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L187)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/staking.ts:163](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L163)
