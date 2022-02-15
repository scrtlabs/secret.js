[Secret.js](../README.md) / [Exports](../modules.md) / MsgInstantiateContractParams

# Interface: MsgInstantiateContractParams

## Table of contents

### Properties

- [codeHash](MsgInstantiateContractParams.md#codehash)
- [codeId](MsgInstantiateContractParams.md#codeid)
- [initFunds](MsgInstantiateContractParams.md#initfunds)
- [initMsg](MsgInstantiateContractParams.md#initmsg)
- [label](MsgInstantiateContractParams.md#label)
- [sender](MsgInstantiateContractParams.md#sender)

## Properties

### codeHash

• **codeHash**: `string`

The SHA256 hash value of the contract's WASM bytecode, represented as case-insensitive 64 character hex string. This is used to make sure only the contract that's being invoked can decrypt the query data.

Valid examples:
- "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
- "0xaf74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
- "AF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"
- "0xAF74387E276BE8874F07BEC3A87023EE49B0E7EBE08178C49D0A49C3C98ED60E"

#### Defined in

[tx/compute.ts:22](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L22)

___

### codeId

• **codeId**: `number`

#### Defined in

[tx/compute.ts:10](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L10)

___

### initFunds

• **initFunds**: [`Coin`](Coin.md)[]

#### Defined in

[tx/compute.ts:13](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L13)

___

### initMsg

• **initMsg**: `object`

#### Defined in

[tx/compute.ts:12](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L12)

___

### label

• **label**: `string`

#### Defined in

[tx/compute.ts:11](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L11)

___

### sender

• **sender**: `string`

#### Defined in

[tx/compute.ts:9](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L9)
