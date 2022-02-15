[Secret.js](../README.md) / [Exports](../modules.md) / MsgUpgradeClient

# Class: MsgUpgradeClient

## Implements

- [`Msg`](../interfaces/Msg.md)

## Table of contents

### Constructors

- [constructor](MsgUpgradeClient.md#constructor)

### Methods

- [toAmino](MsgUpgradeClient.md#toamino)
- [toProto](MsgUpgradeClient.md#toproto)

## Constructors

### constructor

• **new MsgUpgradeClient**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MsgUpgradeClient` |

#### Defined in

[tx/ibc_client.ts:18](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L18)

## Methods

### toAmino

▸ **toAmino**(): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toAmino](../interfaces/Msg.md#toamino)

#### Defined in

[tx/ibc_client.ts:26](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L26)

___

### toProto

▸ **toProto**(): `Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Returns

`Promise`<[`ProtoMsg`](../interfaces/ProtoMsg.md)\>

#### Implementation of

[Msg](../interfaces/Msg.md).[toProto](../interfaces/Msg.md#toproto)

#### Defined in

[tx/ibc_client.ts:22](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/ibc_client.ts#L22)
