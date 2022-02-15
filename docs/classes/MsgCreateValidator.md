[Secret.js](../README.md) / [Exports](../modules.md) / MsgCreateValidator

# Class: MsgCreateValidator

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgCreateValidator.md#constructor)

### Properties

- [commission](MsgCreateValidator.md#commission)
- [delegatorAddress](MsgCreateValidator.md#delegatoraddress)
- [description](MsgCreateValidator.md#description)
- [initialDelegation](MsgCreateValidator.md#initialdelegation)
- [minSelfDelegation](MsgCreateValidator.md#minselfdelegation)
- [pubkey](MsgCreateValidator.md#pubkey)
- [validatorAddress](MsgCreateValidator.md#validatoraddress)

### Methods

- [toAmino](MsgCreateValidator.md#toamino)
- [toProto](MsgCreateValidator.md#toproto)

## Constructors

### constructor

• **new MsgCreateValidator**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgCreateValidatorParams`](../modules.md#msgcreatevalidatorparams) |

#### Defined in

[tx/staking.ts:43](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L43)

## Properties

### commission

• **commission**: [`CommissionRates`](../modules.md#commissionrates)

#### Defined in

[tx/staking.ts:36](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L36)

___

### delegatorAddress

• **delegatorAddress**: `string`

#### Defined in

[tx/staking.ts:38](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L38)

___

### description

• **description**: [`Description`](../interfaces/Description.md)

#### Defined in

[tx/staking.ts:35](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L35)

___

### initialDelegation

• **initialDelegation**: [`Coin`](../interfaces/Coin.md)

#### Defined in

[tx/staking.ts:41](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L41)

___

### minSelfDelegation

• **minSelfDelegation**: `string`

#### Defined in

[tx/staking.ts:37](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L37)

___

### pubkey

• **pubkey**: `string`

#### Defined in

[tx/staking.ts:40](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L40)

___

### validatorAddress

• **validatorAddress**: `string`

#### Defined in

[tx/staking.ts:39](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L39)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/staking.ts:106](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L106)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/staking.ts:63](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/staking.ts#L63)
