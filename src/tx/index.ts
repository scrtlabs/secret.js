import {
  MsgExec,
  MsgGrant,
  MsgRevoke,
} from "../protobuf/cosmos/authz/v1beta1/tx";
import { MsgMultiSend, MsgSend } from "../protobuf/cosmos/bank/v1beta1/tx";
import { MsgVerifyInvariant } from "../protobuf/cosmos/crisis/v1beta1/tx";
import {
  MsgFundCommunityPool,
  MsgSetAutoRestake,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from "../protobuf/cosmos/distribution/v1beta1/tx";
import { MsgSubmitEvidence } from "../protobuf/cosmos/evidence/v1beta1/tx";
import {
  MsgGrantAllowance,
  MsgRevokeAllowance,
} from "../protobuf/cosmos/feegrant/v1beta1/tx";
import {
  MsgDeposit,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
} from "../protobuf/cosmos/gov/v1beta1/tx";
import { MsgUnjail } from "../protobuf/cosmos/slashing/v1beta1/tx";
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from "../protobuf/cosmos/staking/v1beta1/tx";
import { MsgCreateVestingAccount } from "../protobuf/cosmos/vesting/v1beta1/tx";
import { MsgTransfer } from "../protobuf/ibc/applications/transfer/v1/tx";
import {
  MsgPayPacketFee,
  MsgPayPacketFeeAsync,
  MsgRegisterPayee,
  MsgRegisterCounterpartyPayee,
} from "../protobuf/ibc/applications/fee/v1/tx";
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
} from "../protobuf/ibc/core/channel/v1/tx";
import {
  MsgCreateClient,
  MsgSubmitMisbehaviour,
  MsgUpdateClient,
  MsgUpgradeClient,
} from "../protobuf/ibc/core/client/v1/tx";
import {
  MsgConnectionOpenAck,
  MsgConnectionOpenConfirm,
  MsgConnectionOpenInit,
  MsgConnectionOpenTry,
} from "../protobuf/ibc/core/connection/v1/tx";
import {
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgStoreCode,
} from "../protobuf/secret/compute/v1beta1/msg";
import { RaAuthenticate } from "../protobuf/secret/registration/v1beta1/msg";
import {MsgToggleIbcSwitch} from "../protobuf/secret/emergencybutton/v1beta1/tx";

export * from "./authz";
export * from "./bank";
export * from "./compute";
export * from "./crisis";
export * from "./distribution";
export * from "./evidence";
export * from "./feegrant";
export * from "./gov";
export * from "./ibc_channel";
export * from "./ibc_client";
export * from "./ibc_connection";
export * from "./ibc_transfer";
export * from "./ibc_fee";
export * from "./slashing";
export * from "./staking";
export * from "./vesting";
export * from "./types";
export * from "./emergency_button";

export type MsgDecoder = {
  decode(input: Uint8Array): any;
};

export const MsgRegistry = new Map<string, MsgDecoder>([
  ["/cosmos.authz.v1beta1.MsgGrant", MsgGrant],
  ["/cosmos.authz.v1beta1.MsgExec", MsgExec],
  ["/cosmos.authz.v1beta1.MsgRevoke", MsgRevoke],
  ["/cosmos.bank.v1beta1.MsgSend", MsgSend],
  ["/cosmos.bank.v1beta1.MsgMultiSend", MsgMultiSend],
  ["/cosmos.crisis.v1beta1.MsgVerifyInvariant", MsgVerifyInvariant],
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
  ["/cosmos.evidence.v1beta1.MsgSubmitEvidence", MsgSubmitEvidence],
  ["/cosmos.feegrant.v1beta1.MsgGrantAllowance", MsgGrantAllowance],
  ["/cosmos.feegrant.v1beta1.MsgRevokeAllowance", MsgRevokeAllowance],
  ["/cosmos.gov.v1beta1.MsgSubmitProposal", MsgSubmitProposal],
  ["/cosmos.gov.v1beta1.MsgVote", MsgVote],
  ["/cosmos.gov.v1beta1.MsgVoteWeighted", MsgVoteWeighted],
  ["/cosmos.gov.v1beta1.MsgDeposit", MsgDeposit],
  ["/cosmos.slashing.v1beta1.MsgUnjail", MsgUnjail],
  ["/cosmos.staking.v1beta1.MsgCreateValidator", MsgCreateValidator],
  ["/cosmos.staking.v1beta1.MsgEditValidator", MsgEditValidator],
  ["/cosmos.staking.v1beta1.MsgDelegate", MsgDelegate],
  ["/cosmos.staking.v1beta1.MsgBeginRedelegate", MsgBeginRedelegate],
  ["/cosmos.staking.v1beta1.MsgUndelegate", MsgUndelegate],
  ["/ibc.applications.transfer.v1.MsgTransfer", MsgTransfer],
  ["/ibc.applications.fee.v1.MsgPayPacketFee", MsgPayPacketFee],
  ["/ibc.applications.fee.v1.MsgPayPacketFeeAsync", MsgPayPacketFeeAsync],
  ["/ibc.applications.fee.v1.MsgRegisterPayee", MsgRegisterPayee],
  [
    "/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee",
    MsgRegisterCounterpartyPayee,
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
  ["/ibc.core.client.v1.MsgCreateClient", MsgCreateClient],
  ["/ibc.core.client.v1.MsgUpdateClient", MsgUpdateClient],
  ["/ibc.core.client.v1.MsgUpgradeClient", MsgUpgradeClient],
  ["/ibc.core.client.v1.MsgSubmitMisbehaviour", MsgSubmitMisbehaviour],
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
  ["/secret.registration.v1beta1.RaAuthenticate", RaAuthenticate],
  ["/cosmos.vesting.v1beta1.MsgCreateVestingAccount", MsgCreateVestingAccount],
  ["/secret.emergencybutton.v1beta1.MsgToggleIbcSwitch", MsgToggleIbcSwitch],
]);
