[Secret.js](../README.md) / [Exports](../modules.md) / MsgStoreCodeParams

# Interface: MsgStoreCodeParams

## Table of contents

### Properties

- [builder](MsgStoreCodeParams.md#builder)
- [sender](MsgStoreCodeParams.md#sender)
- [source](MsgStoreCodeParams.md#source)
- [wasmByteCode](MsgStoreCodeParams.md#wasmbytecode)

## Properties

### builder

• **builder**: `string`

Builder is a valid docker image name with tag, optional

#### Defined in

[tx/compute.ts:194](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L194)

___

### sender

• **sender**: `string`

#### Defined in

[tx/compute.ts:188](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L188)

___

### source

• **source**: `string`

Source is a valid absolute HTTPS URI to the contract's source code, optional

#### Defined in

[tx/compute.ts:192](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L192)

___

### wasmByteCode

• **wasmByteCode**: `Uint8Array`

WASMByteCode can be raw or gzip compressed

#### Defined in

[tx/compute.ts:190](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/compute.ts#L190)
