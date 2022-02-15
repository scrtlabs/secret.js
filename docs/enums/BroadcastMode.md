[Secret.js](../README.md) / [Exports](../modules.md) / BroadcastMode

# Enumeration: BroadcastMode

## Table of contents

### Enumeration members

- [Async](BroadcastMode.md#async)
- [Sync](BroadcastMode.md#sync)

## Enumeration members

### Async

• **Async** = `1`

Broadcast transaction to mempool and do not wait for CheckTx response.

**`see`** https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async

#### Defined in

[secret_network_client.ts:41](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L41)

___

### Sync

• **Sync** = `0`

Broadcast transaction to mempool and wait for CheckTx response.

**`see`** https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync

#### Defined in

[secret_network_client.ts:35](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/secret_network_client.ts#L35)
