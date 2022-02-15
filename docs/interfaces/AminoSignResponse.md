[Secret.js](../README.md) / [Exports](../modules.md) / AminoSignResponse

# Interface: AminoSignResponse

## Table of contents

### Properties

- [signature](AminoSignResponse.md#signature)
- [signed](AminoSignResponse.md#signed)

## Properties

### signature

• `Readonly` **signature**: [`StdSignature`](StdSignature.md)

#### Defined in

[wallet.ts:120](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L120)

___

### signed

• `Readonly` **signed**: [`StdSignDoc`](StdSignDoc.md)

The sign doc that was signed.
This may be different from the input signDoc when the signer modifies it as part of the signing process.

#### Defined in

[wallet.ts:119](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L119)
