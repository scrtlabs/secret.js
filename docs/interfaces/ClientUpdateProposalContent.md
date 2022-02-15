[Secret.js](../README.md) / [Exports](../modules.md) / ClientUpdateProposalContent

# Interface: ClientUpdateProposalContent

ClientUpdateProposal is a governance proposal. If it passes, the substitute
client's consensus states starting from the 'initial height' are copied over
to the subjects client state. The proposal handler may fail if the subject
and the substitute do not match in client and chain parameters (with
exception to latest height, frozen height, and chain-id). The updated client
must also be valid (cannot be expired).

## Table of contents

### Properties

- [description](ClientUpdateProposalContent.md#description)
- [initialHeight](ClientUpdateProposalContent.md#initialheight)
- [subjectClientId](ClientUpdateProposalContent.md#subjectclientid)
- [substituteClientId](ClientUpdateProposalContent.md#substituteclientid)
- [title](ClientUpdateProposalContent.md#title)

## Properties

### description

• **description**: `string`

the description of the proposal

#### Defined in

[protobuf_stuff/ibc/core/client/v1/client.ts:54](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/protobuf_stuff/ibc/core/client/v1/client.ts#L54)

___

### initialHeight

• `Optional` **initialHeight**: `Height`

the intital height to copy consensus states from the substitute to the
subject

#### Defined in

[protobuf_stuff/ibc/core/client/v1/client.ts:66](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/protobuf_stuff/ibc/core/client/v1/client.ts#L66)

___

### subjectClientId

• **subjectClientId**: `string`

the client identifier for the client to be updated if the proposal passes

#### Defined in

[protobuf_stuff/ibc/core/client/v1/client.ts:56](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/protobuf_stuff/ibc/core/client/v1/client.ts#L56)

___

### substituteClientId

• **substituteClientId**: `string`

the substitute client identifier for the client standing in for the subject
client

#### Defined in

[protobuf_stuff/ibc/core/client/v1/client.ts:61](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/protobuf_stuff/ibc/core/client/v1/client.ts#L61)

___

### title

• **title**: `string`

the title of the update proposal

#### Defined in

[protobuf_stuff/ibc/core/client/v1/client.ts:52](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/protobuf_stuff/ibc/core/client/v1/client.ts#L52)
