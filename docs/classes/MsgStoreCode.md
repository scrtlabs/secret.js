[Secret.js](../README.md) / [Exports](../modules.md) / MsgStoreCode

# Class: MsgStoreCode

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgStoreCode.md#constructor)

### Properties

- [builder](MsgStoreCode.md#builder)
- [sender](MsgStoreCode.md#sender)
- [source](MsgStoreCode.md#source)
- [wasmByteCode](MsgStoreCode.md#wasmbytecode)

### Methods

- [toAmino](MsgStoreCode.md#toamino)
- [toProto](MsgStoreCode.md#toproto)

## Constructors

### constructor

• **new MsgStoreCode**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgStoreCodeParams`](../interfaces/MsgStoreCodeParams.md) |

#### Defined in

[tx/compute.ts:203](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L203)

## Properties

### builder

• **builder**: `string`

#### Defined in

[tx/compute.ts:201](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L201)

___

### sender

• **sender**: `string`

#### Defined in

[tx/compute.ts:198](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L198)

___

### source

• **source**: `string`

#### Defined in

[tx/compute.ts:200](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L200)

___

### wasmByteCode

• **wasmByteCode**: `Uint8Array`

#### Defined in

[tx/compute.ts:199](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L199)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/compute.ts:232](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L232)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/compute.ts:215](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L215)
