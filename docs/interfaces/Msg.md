[Secret.js](../README.md) / [Exports](../modules.md) / Msg

# Interface: Msg

## Implemented by

- [`MsgAcknowledgement`](../classes/MsgAcknowledgement.md)
- [`MsgBeginRedelegate`](../classes/MsgBeginRedelegate.md)
- [`MsgChannelCloseConfirm`](../classes/MsgChannelCloseConfirm.md)
- [`MsgChannelCloseInit`](../classes/MsgChannelCloseInit.md)
- [`MsgChannelOpenAck`](../classes/MsgChannelOpenAck.md)
- [`MsgChannelOpenConfirm`](../classes/MsgChannelOpenConfirm.md)
- [`MsgChannelOpenInit`](../classes/MsgChannelOpenInit.md)
- [`MsgChannelOpenTry`](../classes/MsgChannelOpenTry.md)
- [`MsgConnectionOpenAck`](../classes/MsgConnectionOpenAck.md)
- [`MsgConnectionOpenConfirm`](../classes/MsgConnectionOpenConfirm.md)
- [`MsgConnectionOpenInit`](../classes/MsgConnectionOpenInit.md)
- [`MsgConnectionOpenTry`](../classes/MsgConnectionOpenTry.md)
- [`MsgCreateClient`](../classes/MsgCreateClient.md)
- [`MsgCreateValidator`](../classes/MsgCreateValidator.md)
- [`MsgDelegate`](../classes/MsgDelegate.md)
- [`MsgDeposit`](../classes/MsgDeposit.md)
- [`MsgEditValidator`](../classes/MsgEditValidator.md)
- [`MsgExec`](../classes/MsgExec.md)
- [`MsgExecuteContract`](../classes/MsgExecuteContract.md)
- [`MsgFundCommunityPool`](../classes/MsgFundCommunityPool.md)
- [`MsgGrant`](../classes/MsgGrant.md)
- [`MsgGrantAllowance`](../classes/MsgGrantAllowance.md)
- [`MsgInstantiateContract`](../classes/MsgInstantiateContract.md)
- [`MsgMultiSend`](../classes/MsgMultiSend.md)
- [`MsgRecvPacket`](../classes/MsgRecvPacket.md)
- [`MsgRevoke`](../classes/MsgRevoke.md)
- [`MsgRevokeAllowance`](../classes/MsgRevokeAllowance.md)
- [`MsgSend`](../classes/MsgSend.md)
- [`MsgSetWithdrawAddress`](../classes/MsgSetWithdrawAddress.md)
- [`MsgStoreCode`](../classes/MsgStoreCode.md)
- [`MsgSubmitEvidence`](../classes/MsgSubmitEvidence.md)
- [`MsgSubmitMisbehaviour`](../classes/MsgSubmitMisbehaviour.md)
- [`MsgSubmitProposal`](../classes/MsgSubmitProposal.md)
- [`MsgTimeout`](../classes/MsgTimeout.md)
- [`MsgTimeoutOnClose`](../classes/MsgTimeoutOnClose.md)
- [`MsgTransfer`](../classes/MsgTransfer.md)
- [`MsgUndelegate`](../classes/MsgUndelegate.md)
- [`MsgUnjail`](../classes/MsgUnjail.md)
- [`MsgUpdateClient`](../classes/MsgUpdateClient.md)
- [`MsgUpgradeClient`](../classes/MsgUpgradeClient.md)
- [`MsgVerifyInvariant`](../classes/MsgVerifyInvariant.md)
- [`MsgVote`](../classes/MsgVote.md)
- [`MsgVoteWeighted`](../classes/MsgVoteWeighted.md)
- [`MsgWithdrawDelegationReward`](../classes/MsgWithdrawDelegationReward.md)
- [`MsgWithdrawValidatorCommission`](../classes/MsgWithdrawValidatorCommission.md)

## Table of contents

### Methods

- [toAmino](Msg.md#toamino)
- [toProto](Msg.md#toproto)

## Methods

### toAmino

▸ **toAmino**(`utils`): `Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `utils` | [`EncryptionUtils`](EncryptionUtils.md) |

#### Returns

`Promise`<[`AminoMsg`](../modules.md#aminomsg)\>

#### Defined in

[tx/types.ts:16](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/types.ts#L16)

___

### toProto

▸ **toProto**(`utils`): `Promise`<[`ProtoMsg`](ProtoMsg.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `utils` | [`EncryptionUtils`](EncryptionUtils.md) |

#### Returns

`Promise`<[`ProtoMsg`](ProtoMsg.md)\>

#### Defined in

[tx/types.ts:15](https://github.com/scrtlabs/secret.js/blob/839fe3d/src/tx/types.ts#L15)
