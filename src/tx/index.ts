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
export * from "./slashing";
export * from "./staking";
export * from "./types";

export type MsgDecoder = {
  decode(input: Uint8Array): any;
};

export async function getMsgDecoderRegistry(): Promise<
  Map<string, MsgDecoder>
> {
  const registry = new Map<string, MsgDecoder>();

  registry.set(
    "/cosmos.authz.v1beta1.MsgGrant",
    (await import("../protobuf_stuff/cosmos/authz/v1beta1/tx")).MsgGrant,
  );
  registry.set(
    "/cosmos.authz.v1beta1.MsgExec",
    (await import("../protobuf_stuff/cosmos/authz/v1beta1/tx")).MsgExec,
  );
  registry.set(
    "/cosmos.authz.v1beta1.MsgRevoke",
    (await import("../protobuf_stuff/cosmos/authz/v1beta1/tx")).MsgRevoke,
  );
  registry.set(
    "/cosmos.bank.v1beta1.MsgSend",
    (await import("../protobuf_stuff/cosmos/bank/v1beta1/tx")).MsgSend,
  );
  registry.set(
    "/cosmos.bank.v1beta1.MsgMultiSend",
    (await import("../protobuf_stuff/cosmos/bank/v1beta1/tx")).MsgMultiSend,
  );
  registry.set(
    "/cosmos.crisis.v1beta1.MsgVerifyInvariant",
    (await import("../protobuf_stuff/cosmos/crisis/v1beta1/tx"))
      .MsgVerifyInvariant,
  );
  registry.set(
    "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
    (await import("../protobuf_stuff/cosmos/distribution/v1beta1/tx"))
      .MsgSetWithdrawAddress,
  );
  registry.set(
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
    (await import("../protobuf_stuff/cosmos/distribution/v1beta1/tx"))
      .MsgWithdrawDelegatorReward,
  );
  registry.set(
    "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
    (await import("../protobuf_stuff/cosmos/distribution/v1beta1/tx"))
      .MsgWithdrawValidatorCommission,
  );
  registry.set(
    "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
    (await import("../protobuf_stuff/cosmos/distribution/v1beta1/tx"))
      .MsgFundCommunityPool,
  );
  registry.set(
    "/cosmos.evidence.v1beta1.MsgSubmitEvidence",
    (await import("../protobuf_stuff/cosmos/evidence/v1beta1/tx"))
      .MsgSubmitEvidence,
  );
  registry.set(
    "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
    (await import("../protobuf_stuff/cosmos/feegrant/v1beta1/tx"))
      .MsgGrantAllowance,
  );
  registry.set(
    "/cosmos.feegrant.v1beta1.MsgRevokeAllowance",
    (await import("../protobuf_stuff/cosmos/feegrant/v1beta1/tx"))
      .MsgRevokeAllowance,
  );
  registry.set(
    "/cosmos.gov.v1beta1.MsgSubmitProposal",
    (await import("../protobuf_stuff/cosmos/gov/v1beta1/tx")).MsgSubmitProposal,
  );
  registry.set(
    "/cosmos.gov.v1beta1.MsgVote",
    (await import("../protobuf_stuff/cosmos/gov/v1beta1/tx")).MsgVote,
  );
  registry.set(
    "/cosmos.gov.v1beta1.MsgVoteWeighted",
    (await import("../protobuf_stuff/cosmos/gov/v1beta1/tx")).MsgVoteWeighted,
  );
  registry.set(
    "/cosmos.gov.v1beta1.MsgDeposit",
    (await import("../protobuf_stuff/cosmos/gov/v1beta1/tx")).MsgDeposit,
  );
  registry.set(
    "/cosmos.slashing.v1beta1.MsgUnjail",
    (await import("../protobuf_stuff/cosmos/slashing/v1beta1/tx")).MsgUnjail,
  );
  registry.set(
    "/cosmos.staking.v1beta1.MsgCreateValidator",
    (await import("../protobuf_stuff/cosmos/staking/v1beta1/tx"))
      .MsgCreateValidator,
  );
  registry.set(
    "/cosmos.staking.v1beta1.MsgEditValidator",
    (await import("../protobuf_stuff/cosmos/staking/v1beta1/tx"))
      .MsgEditValidator,
  );
  registry.set(
    "/cosmos.staking.v1beta1.MsgDelegate",
    (await import("../protobuf_stuff/cosmos/staking/v1beta1/tx")).MsgDelegate,
  );
  registry.set(
    "/cosmos.staking.v1beta1.MsgBeginRedelegate",
    (await import("../protobuf_stuff/cosmos/staking/v1beta1/tx"))
      .MsgBeginRedelegate,
  );
  registry.set(
    "/cosmos.staking.v1beta1.MsgUndelegate",
    (await import("../protobuf_stuff/cosmos/staking/v1beta1/tx")).MsgUndelegate,
  );
  registry.set(
    "/ibc.applications.transfer.v1.MsgTransfer",
    (await import("../protobuf_stuff/ibc/applications/transfer/v1/tx"))
      .MsgTransfer,
  );
  registry.set(
    "/ibc.core.channel.v1.MsgChannelOpenInit",
    (await import("../protobuf_stuff/ibc/core/channel/v1/tx"))
      .MsgChannelOpenInit,
  );
  registry.set(
    "/ibc.core.channel.v1.MsgChannelOpenTry",
    (await import("../protobuf_stuff/ibc/core/channel/v1/tx"))
      .MsgChannelOpenTry,
  );
  registry.set(
    "/ibc.core.channel.v1.MsgChannelOpenAck",
    (await import("../protobuf_stuff/ibc/core/channel/v1/tx"))
      .MsgChannelOpenAck,
  );
  registry.set(
    "/ibc.core.channel.v1.MsgChannelOpenConfirm",
    (await import("../protobuf_stuff/ibc/core/channel/v1/tx"))
      .MsgChannelOpenConfirm,
  );
  registry.set(
    "/ibc.core.channel.v1.MsgChannelCloseInit",
    (await import("../protobuf_stuff/ibc/core/channel/v1/tx"))
      .MsgChannelCloseInit,
  );
  registry.set(
    "/ibc.core.channel.v1.MsgChannelCloseConfirm",
    (await import("../protobuf_stuff/ibc/core/channel/v1/tx"))
      .MsgChannelCloseConfirm,
  );
  registry.set(
    "/ibc.core.channel.v1.MsgRecvPacket",
    (await import("../protobuf_stuff/ibc/core/channel/v1/tx")).MsgRecvPacket,
  );
  registry.set(
    "/ibc.core.channel.v1.MsgTimeout",
    (await import("../protobuf_stuff/ibc/core/channel/v1/tx")).MsgTimeout,
  );
  registry.set(
    "/ibc.core.channel.v1.MsgTimeoutOnClose",
    (await import("../protobuf_stuff/ibc/core/channel/v1/tx"))
      .MsgTimeoutOnClose,
  );
  registry.set(
    "/ibc.core.channel.v1.MsgAcknowledgement",
    (await import("../protobuf_stuff/ibc/core/channel/v1/tx"))
      .MsgAcknowledgement,
  );
  registry.set(
    "/ibc.core.client.v1.MsgCreateClient",
    (await import("../protobuf_stuff/ibc/core/client/v1/tx")).MsgCreateClient,
  );
  registry.set(
    "/ibc.core.client.v1.MsgUpdateClient",
    (await import("../protobuf_stuff/ibc/core/client/v1/tx")).MsgUpdateClient,
  );
  registry.set(
    "/ibc.core.client.v1.MsgUpgradeClient",
    (await import("../protobuf_stuff/ibc/core/client/v1/tx")).MsgUpgradeClient,
  );
  registry.set(
    "/ibc.core.client.v1.MsgSubmitMisbehaviour",
    (await import("../protobuf_stuff/ibc/core/client/v1/tx"))
      .MsgSubmitMisbehaviour,
  );
  registry.set(
    "/ibc.core.connection.v1.MsgConnectionOpenInit",
    (await import("../protobuf_stuff/ibc/core/connection/v1/tx"))
      .MsgConnectionOpenInit,
  );
  registry.set(
    "/ibc.core.connection.v1.MsgConnectionOpenTry",
    (await import("../protobuf_stuff/ibc/core/connection/v1/tx"))
      .MsgConnectionOpenTry,
  );
  registry.set(
    "/ibc.core.connection.v1.MsgConnectionOpenAck",
    (await import("../protobuf_stuff/ibc/core/connection/v1/tx"))
      .MsgConnectionOpenAck,
  );
  registry.set(
    "/ibc.core.connection.v1.MsgConnectionOpenConfirm",
    (await import("../protobuf_stuff/ibc/core/connection/v1/tx"))
      .MsgConnectionOpenConfirm,
  );
  registry.set(
    "/secret.compute.v1beta1.MsgStoreCode",
    (await import("../protobuf_stuff/secret/compute/v1beta1/msg")).MsgStoreCode,
  );
  registry.set(
    "/secret.compute.v1beta1.MsgInstantiateContract",
    (await import("../protobuf_stuff/secret/compute/v1beta1/msg"))
      .MsgInstantiateContract,
  );
  registry.set(
    "/secret.compute.v1beta1.MsgExecuteContract",
    (await import("../protobuf_stuff/secret/compute/v1beta1/msg"))
      .MsgExecuteContract,
  );
  registry.set(
    "/secret.registration.v1beta1.RaAuthenticate",
    (await import("../protobuf_stuff/secret/registration/v1beta1/msg"))
      .RaAuthenticate,
  );

  return registry;
}
