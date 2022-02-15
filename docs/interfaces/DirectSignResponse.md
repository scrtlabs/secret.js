[Secret.js](../README.md) / [Exports](../modules.md) / DirectSignResponse

# Interface: DirectSignResponse

## Table of contents

### Properties

- [signature](DirectSignResponse.md#signature)
- [signed](DirectSignResponse.md#signed)

## Properties

### signature

• `Readonly` **signature**: [`StdSignature`](StdSignature.md)

#### Defined in

[wallet.ts:203](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L203)

___

### signed

• `Readonly` **signed**: `SignDoc`

The sign doc that was signed.
This may be different from the input signDoc when the signer modifies it as part of the signing process.

#### Defined in

[wallet.ts:202](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/wallet.ts#L202)
