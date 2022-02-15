[Secret.js](../README.md) / [Exports](../modules.md) / MsgWithdrawDelegationReward

# Class: MsgWithdrawDelegationReward

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgWithdrawDelegationReward.md#constructor)

### Properties

- [delegatorAddress](MsgWithdrawDelegationReward.md#delegatoraddress)
- [validatorAddress](MsgWithdrawDelegationReward.md#validatoraddress)

### Methods

- [toAmino](MsgWithdrawDelegationReward.md#toamino)
- [toProto](MsgWithdrawDelegationReward.md#toproto)

## Constructors

### constructor

• **new MsgWithdrawDelegationReward**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgWithdrawDelegatorRewardParams`](../modules.md#msgwithdrawdelegatorrewardparams) |

#### Defined in

[tx/distribution.ts:62](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L62)

## Properties

### delegatorAddress

• **delegatorAddress**: `string`

#### Defined in

[tx/distribution.ts:59](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L59)

___

### validatorAddress

• **validatorAddress**: `string`

#### Defined in

[tx/distribution.ts:60](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L60)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/distribution.ts:86](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L86)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/distribution.ts:70](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/distribution.ts#L70)
