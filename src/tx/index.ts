import {
  MsgSoftwareUpgrade,
  MsgCancelUpgrade,
} from "../protobuf/cosmos/upgrade/v1beta1/tx";
import {
  MsgExec,
  MsgGrant,
  MsgRevoke,
} from "../protobuf/cosmos/authz/v1beta1/tx";
import {
  MsgRegisterInterchainAccount,
  MsgSendTx,
} from "../protobuf/ibc/applications/interchain_accounts/controller/v1/tx";
import {
  MsgMultiSend,
  MsgSend,
  MsgSetSendEnabled,
} from "../protobuf/cosmos/bank/v1beta1/tx";
import {
  MsgFundCommunityPool,
  MsgSetAutoRestake,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
  MsgCommunityPoolSpend,
  MsgDepositValidatorRewardsPool,
} from "../protobuf/cosmos/distribution/v1beta1/tx";
import { MsgSubmitEvidence } from "../protobuf/cosmos/evidence/v1beta1/tx";
import {
  MsgGrantAllowance,
  MsgRevokeAllowance,
  MsgPruneAllowances,
} from "../protobuf/cosmos/feegrant/v1beta1/tx";
import {
  MsgDeposit,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
  MsgCancelProposal,
  MsgExecLegacyContent,
} from "../protobuf/cosmos/gov/v1/tx";
import { MsgUnjail } from "../protobuf/cosmos/slashing/v1beta1/tx";
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
  MsgCancelUnbondingDelegation,
} from "../protobuf/cosmos/staking/v1beta1/tx";
import {
  MsgCreateVestingAccount,
  MsgCreatePermanentLockedAccount,
  MsgCreatePeriodicVestingAccount,
} from "../protobuf/cosmos/vesting/v1beta1/tx";
import {
  MsgPayPacketFee,
  MsgPayPacketFeeAsync,
  MsgRegisterCounterpartyPayee,
  MsgRegisterPayee,
} from "../protobuf/ibc/applications/fee/v1/tx";
import { MsgTransfer } from "../protobuf/ibc/applications/transfer/v1/tx";
import {
  MsgAcknowledgement,
  MsgChannelCloseConfirm,
  MsgChannelCloseInit,
  MsgChannelOpenAck,
  MsgChannelOpenConfirm,
  MsgChannelOpenInit,
  MsgChannelOpenTry,
  MsgRecvPacket,
  MsgTimeout,
  MsgTimeoutOnClose,
  MsgChannelUpgradeInit,
  MsgChannelUpgradeTry,
  MsgChannelUpgradeAck,
  MsgChannelUpgradeOpen,
  MsgChannelUpgradeTimeout,
  MsgChannelUpgradeCancel,
  MsgPruneAcknowledgements,
} from "../protobuf/ibc/core/channel/v1/tx";
import {
  MsgCreateClient,
  MsgSubmitMisbehaviour,
  MsgUpdateClient,
  MsgUpgradeClient,
  MsgRecoverClient,
  MsgIBCSoftwareUpgrade,
} from "../protobuf/ibc/core/client/v1/tx";
import {
  MsgConnectionOpenAck,
  MsgConnectionOpenConfirm,
  MsgConnectionOpenInit,
  MsgConnectionOpenTry,
} from "../protobuf/ibc/core/connection/v1/tx";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "../protobuf/secret/compute/v1beta1/msg";
import { MsgToggleIbcSwitch } from "../protobuf/secret/emergencybutton/v1beta1/tx";
import { RaAuthenticate } from "../protobuf/secret/registration/v1beta1/msg";

export * from "./authz";
export * from "./bank";
export * from "./compute";
export * from "./distribution";
export * from "./emergency_button";
export * from "./evidence";
export * from "./feegrant";
export * from "./gov";
export * from "./ibc_channel";
export * from "./ibc_client";
export * from "./ibc_connection";
export * from "./ibc_fee";
export * from "./ibc_transfer";
export * from "./ibc_interchain_accounts";
export * from "./slashing";
export * from "./staking";
export * from "./types";
export * from "./upgrade";
export * from "./vesting";

export type MsgDecoder = {
  decode(input: Uint8Array): any;
};

export const MsgRegistry = new Map<string, MsgDecoder>([
  ["/cosmos.authz.v1beta1.MsgGrant", MsgGrant],
  ["/cosmos.authz.v1beta1.MsgExec", MsgExec],
  ["/cosmos.authz.v1beta1.MsgRevoke", MsgRevoke],
  ["/cosmos.bank.v1beta1.MsgSend", MsgSend],
  ["/cosmos.bank.v1beta1.MsgMultiSend", MsgMultiSend],
  ["/cosmos.bank.v1beta1.MsgSetSendEnabled", MsgSetSendEnabled],
  ["/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", MsgSetWithdrawAddress],
  [
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
    MsgWithdrawDelegatorReward,
  ],
  [
    "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
    MsgWithdrawValidatorCommission,
  ],
  ["/cosmos.distribution.v1beta1.MsgFundCommunityPool", MsgFundCommunityPool],
  ["/cosmos.distribution.v1beta1.MsgSetAutoRestake", MsgSetAutoRestake],
  ["/cosmos.distribution.v1beta1.MsgCommunityPoolSpend", MsgCommunityPoolSpend],
  [
    "/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool",
    MsgDepositValidatorRewardsPool,
  ],
  ["/cosmos.evidence.v1beta1.MsgSubmitEvidence", MsgSubmitEvidence],
  ["/cosmos.feegrant.v1beta1.MsgGrantAllowance", MsgGrantAllowance],
  ["/cosmos.feegrant.v1beta1.MsgRevokeAllowance", MsgRevokeAllowance],
  ["/cosmos.feegrant.v1beta1.MsgPruneAllowances", MsgPruneAllowances],
  ["/cosmos.gov.v1.MsgSubmitProposal", MsgSubmitProposal],
  ["/cosmos.gov.v1.MsgVote", MsgVote],
  ["/cosmos.gov.v1.MsgVoteWeighted", MsgVoteWeighted],
  ["/cosmos.gov.v1.MsgDeposit", MsgDeposit],
  ["/cosmos.gov.v1.MsgCancelProposal", MsgCancelProposal],
  ["/cosmos.gov.v1.MsgExecLegacyContent", MsgExecLegacyContent],
  ["/cosmos.slashing.v1beta1.MsgUnjail", MsgUnjail],
  ["/cosmos.staking.v1beta1.MsgCreateValidator", MsgCreateValidator],
  ["/cosmos.staking.v1beta1.MsgEditValidator", MsgEditValidator],
  ["/cosmos.staking.v1beta1.MsgDelegate", MsgDelegate],
  ["/cosmos.staking.v1beta1.MsgBeginRedelegate", MsgBeginRedelegate],
  ["/cosmos.staking.v1beta1.MsgUndelegate", MsgUndelegate],
  [
    "/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation",
    MsgCancelUnbondingDelegation,
  ],
  ["/ibc.applications.transfer.v1.MsgTransfer", MsgTransfer],
  ["/ibc.applications.fee.v1.MsgPayPacketFee", MsgPayPacketFee],
  ["/ibc.applications.fee.v1.MsgPayPacketFeeAsync", MsgPayPacketFeeAsync],
  ["/ibc.applications.fee.v1.MsgRegisterPayee", MsgRegisterPayee],
  [
    "/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee",
    MsgRegisterCounterpartyPayee,
  ],
  ["/ibc.applications.interchain_accounts.controller.v1.MsgSendTx", MsgSendTx],
  [
    "/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount",
    MsgRegisterInterchainAccount,
  ],
  ["/ibc.core.channel.v1.MsgChannelOpenInit", MsgChannelOpenInit],
  ["/ibc.core.channel.v1.MsgChannelOpenTry", MsgChannelOpenTry],
  ["/ibc.core.channel.v1.MsgChannelOpenAck", MsgChannelOpenAck],
  ["/ibc.core.channel.v1.MsgChannelOpenConfirm", MsgChannelOpenConfirm],
  ["/ibc.core.channel.v1.MsgChannelCloseInit", MsgChannelCloseInit],
  ["/ibc.core.channel.v1.MsgChannelCloseConfirm", MsgChannelCloseConfirm],
  ["/ibc.core.channel.v1.MsgRecvPacket", MsgRecvPacket],
  ["/ibc.core.channel.v1.MsgTimeout", MsgTimeout],
  ["/ibc.core.channel.v1.MsgTimeoutOnClose", MsgTimeoutOnClose],
  ["/ibc.core.channel.v1.MsgAcknowledgement", MsgAcknowledgement],
  ["/ibc.core.channel.v1.MsgChannelUpgradeInit", MsgChannelUpgradeInit],
  ["/ibc.core.channel.v1.MsgChannelUpgradeTry", MsgChannelUpgradeTry],
  ["/ibc.core.channel.v1.MsgChannelUpgradeAck", MsgChannelUpgradeAck],
  ["/ibc.core.channel.v1.MsgChannelUpgradeOpen", MsgChannelUpgradeOpen],
  ["/ibc.core.channel.v1.MsgChannelUpgradeTimeout", MsgChannelUpgradeTimeout],
  ["/ibc.core.channel.v1.MsgPruneAcknowledgements", MsgPruneAcknowledgements],
  ["/ibc.core.client.v1.MsgCreateClient", MsgCreateClient],
  ["/ibc.core.client.v1.MsgUpdateClient", MsgUpdateClient],
  ["/ibc.core.client.v1.MsgUpgradeClient", MsgUpgradeClient],
  ["/ibc.core.client.v1.MsgSubmitMisbehaviour", MsgSubmitMisbehaviour],
  ["/ibc.core.client.v1.MsgRecoverClient", MsgRecoverClient],
  ["/ibc.core.client.v1.MsgIBCSoftwareUpgrade", MsgIBCSoftwareUpgrade],
  ["/ibc.core.connection.v1.MsgConnectionOpenInit", MsgConnectionOpenInit],
  ["/ibc.core.connection.v1.MsgConnectionOpenTry", MsgConnectionOpenTry],
  ["/ibc.core.connection.v1.MsgConnectionOpenAck", MsgConnectionOpenAck],
  [
    "/ibc.core.connection.v1.MsgConnectionOpenConfirm",
    MsgConnectionOpenConfirm,
  ],
  ["/secret.compute.v1beta1.MsgStoreCode", MsgStoreCode],
  ["/secret.compute.v1beta1.MsgInstantiateContract", MsgInstantiateContract],
  ["/secret.compute.v1beta1.MsgExecuteContract", MsgExecuteContract],
  ["/secret.compute.v1beta1.MsgMigrateContract", MsgMigrateContract],
  ["/secret.compute.v1beta1.MsgUpdateAdmin", MsgUpdateAdmin],
  ["/secret.compute.v1beta1.MsgClearAdmin", MsgClearAdmin],
  ["/secret.registration.v1beta1.RaAuthenticate", RaAuthenticate],
  ["/cosmos.vesting.v1beta1.MsgCreateVestingAccount", MsgCreateVestingAccount],
  [
    "/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount",
    MsgCreatePermanentLockedAccount,
  ],
  [
    "/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount",
    MsgCreatePeriodicVestingAccount,
  ],
  ["/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade", MsgSoftwareUpgrade],
  ["/cosmos.upgrade.v1beta1.MsgCancelUpgrade", MsgCancelUpgrade],
  ["/secret.emergencybutton.v1beta1.MsgToggleIbcSwitch", MsgToggleIbcSwitch],
]);
