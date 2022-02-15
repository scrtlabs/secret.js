[Secret.js](../README.md) / [Exports](../modules.md) / MsgMultiSend

# Class: MsgMultiSend

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgMultiSend.md#constructor)

### Properties

- [inputs](MsgMultiSend.md#inputs)
- [outputs](MsgMultiSend.md#outputs)

### Methods

- [toAmino](MsgMultiSend.md#toamino)
- [toProto](MsgMultiSend.md#toproto)

## Constructors

### constructor

• **new MsgMultiSend**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MsgMultiSendParams`](../modules.md#msgmultisendparams) |

#### Defined in

[tx/bank.ts:58](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/bank.ts#L58)

## Properties

### inputs

• **inputs**: [`Input`](../interfaces/Input.md)[]

#### Defined in

[tx/bank.ts:55](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/bank.ts#L55)

___

### outputs

• **outputs**: [`Output`](../interfaces/Output.md)[]

#### Defined in

[tx/bank.ts:56](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/bank.ts#L56)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/bank.ts:79](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/bank.ts#L79)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/bank.ts:63](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/bank.ts#L63)
