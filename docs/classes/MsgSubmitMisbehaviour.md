[Secret.js](../README.md) / [Exports](../modules.md) / MsgSubmitMisbehaviour

# Class: MsgSubmitMisbehaviour

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgSubmitMisbehaviour.md#constructor)

### Methods

- [toAmino](MsgSubmitMisbehaviour.md#toamino)
- [toProto](MsgSubmitMisbehaviour.md#toproto)

## Constructors

### constructor

• **new MsgSubmitMisbehaviour**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgSubmitMisbehaviour` |

#### Defined in

[tx/ibc_client.ts:32](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L32)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_client.ts:40](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L40)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_client.ts:36](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L36)
