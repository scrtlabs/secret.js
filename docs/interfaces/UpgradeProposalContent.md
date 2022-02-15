[Secret.js](../README.md) / [Exports](../modules.md) / UpgradeProposalContent

# Interface: UpgradeProposalContent

UpgradeProposal is a gov Content type for initiating an IBC breaking
upgrade.

## Table of contents

### Properties

- [description](UpgradeProposalContent.md#description)
- [plan](UpgradeProposalContent.md#plan)
- [title](UpgradeProposalContent.md#title)
- [upgradedClientState](UpgradeProposalContent.md#upgradedclientstate)

## Properties

### description

• **description**: `string`

#### Defined in

[protobuf_stuff/ibc/core/client/v1/client.ts:75](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/protobuf_stuff/ibc/core/client/v1/client.ts#L75)

___

### plan

• `Optional` **plan**: `Plan`

#### Defined in

[protobuf_stuff/ibc/core/client/v1/client.ts:76](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/protobuf_stuff/ibc/core/client/v1/client.ts#L76)

___

### title

• **title**: `string`

#### Defined in

[protobuf_stuff/ibc/core/client/v1/client.ts:74](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/protobuf_stuff/ibc/core/client/v1/client.ts#L74)

___

### upgradedClientState

• `Optional` **upgradedClientState**: `Any`

An UpgradedClientState must be provided to perform an IBC breaking upgrade.
This will make the chain commit to the correct upgraded (self) client state
before the upgrade occurs, so that connecting chains can verify that the
new upgraded client is valid by verifying a proof on the previous version
of the chain. This will allow IBC connections to persist smoothly across
planned chain upgrades

#### Defined in

[protobuf_stuff/ibc/core/client/v1/client.ts:85](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/protobuf_stuff/ibc/core/client/v1/client.ts#L85)
