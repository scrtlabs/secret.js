[Secret.js](../README.md) / [Exports](../modules.md) / MsgExecuteContractParams

# Interface: MsgExecuteContractParams

## Table of contents

### Properties

- [codeHash](MsgExecuteContractParams.md#codehash)
- [contract](MsgExecuteContractParams.md#contract)
- [msg](MsgExecuteContractParams.md#msg)
- [sender](MsgExecuteContractParams.md#sender)
- [sentFunds](MsgExecuteContractParams.md#sentfunds)

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

[tx/compute.ts:114](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L114)

___

### contract

• **contract**: `string`

#### Defined in

[tx/compute.ts:103](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L103)

___

### msg

• **msg**: `object`

#### Defined in

[tx/compute.ts:104](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L104)

___

### sender

• **sender**: `string`

#### Defined in

[tx/compute.ts:102](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L102)

___

### sentFunds

• **sentFunds**: [`Coin`](Coin.md)[]

#### Defined in

[tx/compute.ts:105](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L105)
