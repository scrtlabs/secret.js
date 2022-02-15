[Secret.js](../README.md) / [Exports](../modules.md) / IndexedTx

# Interface: IndexedTx

A transaction that is indexed as part of the transaction history

## Table of contents

### Properties

- [arrayLog](IndexedTx.md#arraylog)
- [code](IndexedTx.md#code)
- [gasUsed](IndexedTx.md#gasused)
- [gasWanted](IndexedTx.md#gaswanted)
- [hash](IndexedTx.md#hash)
- [height](IndexedTx.md#height)
- [jsonLog](IndexedTx.md#jsonlog)
- [rawLog](IndexedTx.md#rawlog)
- [tx](IndexedTx.md#tx)

## Properties

### arrayLog

• `Optional` `Readonly` **arrayLog**: [`ArrayLog`](../modules.md#arraylog)

If code = 0, `arrayLog` is a flattened `jsonLog`. Values are decrypted if possible.

#### Defined in

[secret_network_client.ts:189](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L189)

___

### code

• `Readonly` **code**: `number`

Transaction execution error code. 0 on success.

#### Defined in

[secret_network_client.ts:184](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L184)

___

### gasUsed

• `Readonly` **gasUsed**: `number`

#### Defined in

[secret_network_client.ts:205](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L205)

___

### gasWanted

• `Readonly` **gasWanted**: `number`

#### Defined in

[secret_network_client.ts:206](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L206)

___

### hash

• `Readonly` **hash**: `string`

Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex

#### Defined in

[secret_network_client.ts:182](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L182)

___

### height

• `Readonly` **height**: `number`

#### Defined in

[secret_network_client.ts:180](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L180)

___

### jsonLog

• `Optional` `Readonly` **jsonLog**: [`JsonLog`](../modules.md#jsonlog)

If code = 0, `jsonLog = JSON.parse(rawLow)`. Values are decrypted if possible.

#### Defined in

[secret_network_client.ts:187](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L187)

___

### rawLog

• `Readonly` **rawLog**: `string`

#### Defined in

[secret_network_client.ts:185](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L185)

___

### tx

• `Readonly` **tx**: `Uint8Array`

Raw transaction bytes stored in Tendermint.

If you hash this, you get the transaction hash (= transaction ID):

```js
import { sha256 } from "@noble/hashes/sha256";
import { toHex } from "@cosmjs/encoding";

const transactionId = toHex(sha256(indexTx.tx)).toUpperCase();
```

Use `decodeTxRaw` from @cosmjs/proto-signing to decode this.

#### Defined in

[secret_network_client.ts:204](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L204)
