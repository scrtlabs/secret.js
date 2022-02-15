[Secret.js](../README.md) / [Exports](../modules.md) / MsgExecuteContract

# Class: MsgExecuteContract

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgExecuteContract.md#constructor)

### Properties

- [codeHash](MsgExecuteContract.md#codehash)
- [contract](MsgExecuteContract.md#contract)
- [msg](MsgExecuteContract.md#msg)
- [sender](MsgExecuteContract.md#sender)
- [sentFunds](MsgExecuteContract.md#sentfunds)

### Methods

- [toAmino](MsgExecuteContract.md#toamino)
- [toProto](MsgExecuteContract.md#toproto)

## Constructors

### constructor

• **new MsgExecuteContract**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgExecuteContractParams`](../interfaces/MsgExecuteContractParams.md) |

#### Defined in

[tx/compute.ts:125](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L125)

## Properties

### codeHash

• **codeHash**: `string`

#### Defined in

[tx/compute.ts:123](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L123)

___

### contract

• **contract**: `string`

#### Defined in

[tx/compute.ts:119](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L119)

___

### msg

• **msg**: `object`

#### Defined in

[tx/compute.ts:120](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L120)

___

### sender

• **sender**: `string`

#### Defined in

[tx/compute.ts:118](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L118)

___

### sentFunds

• **sentFunds**: [`Coin`](../interfaces/Coin.md)[]

#### Defined in

[tx/compute.ts:122](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L122)

## Methods

### toAmino

▸ **toAmino**(`utils`): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `utils` | [`EncryptionUtils`](../interfaces/EncryptionUtils.md) |

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/compute.ts:167](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L167)

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

[tx/compute.ts:140](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L140)
