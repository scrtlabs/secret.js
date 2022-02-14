import { AminoMsg, Msg, ProtoMsg } from ".";

export enum MsgGrantAuthorization {
  MsgAcknowledgement = "/ibc.core.channel.v1.MsgAcknowledgement",
  MsgBeginRedelegate = "/cosmos.staking.v1beta1.MsgBeginRedelegate",
  MsgChannelCloseConfirm = "/ibc.core.channel.v1.MsgChannelCloseConfirm",
  MsgChannelCloseInit = "/ibc.core.channel.v1.MsgChannelCloseInit",
  MsgChannelOpenAck = "/ibc.core.channel.v1.MsgChannelOpenAck",
  MsgChannelOpenConfirm = "/ibc.core.channel.v1.MsgChannelOpenConfirm",
  MsgChannelOpenInit = "/ibc.core.channel.v1.MsgChannelOpenInit",
  MsgChannelOpenTry = "/ibc.core.channel.v1.MsgChannelOpenTry",
  MsgConnectionOpenAck = "/ibc.core.connection.v1.MsgConnectionOpenAck",
  MsgConnectionOpenConfirm = "/ibc.core.connection.v1.MsgConnectionOpenConfirm",
  MsgConnectionOpenInit = "/ibc.core.connection.v1.MsgConnectionOpenInit",
  MsgConnectionOpenTry = "/ibc.core.connection.v1.MsgConnectionOpenTry",
  MsgCreateClient = "/ibc.core.client.v1.MsgCreateClient",
  MsgCreateValidator = "/cosmos.staking.v1beta1.MsgCreateValidator",
  MsgDelegate = "/cosmos.staking.v1beta1.MsgDelegate",
  MsgDeposit = "/cosmos.gov.v1beta1.MsgDeposit",
  MsgEditValidator = "/cosmos.staking.v1beta1.MsgEditValidator",
  MsgExec = "/cosmos.authz.v1beta1.MsgExec",
  MsgExecuteContract = "/secret.compute.v1beta1.MsgExecuteContract",
  MsgFundCommunityPool = "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
  MsgGrant = "/cosmos.authz.v1beta1.MsgGrant",
  MsgGrantAllowance = "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
  MsgInstantiateContract = "/secret.compute.v1beta1.MsgInstantiateContract",
  MsgMultiSend = "/cosmos.bank.v1beta1.MsgMultiSend",
  MsgRecvPacket = "/ibc.core.channel.v1.MsgRecvPacket",
  MsgRevoke = "/cosmos.authz.v1beta1.MsgRevoke",
  MsgRevokeAllowance = "/cosmos.feegrant.v1beta1.MsgRevokeAllowance",
  MsgSend = "/cosmos.bank.v1beta1.MsgSend",
  MsgSetWithdrawAddress = "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
  MsgStoreCode = "/secret.compute.v1beta1.MsgStoreCode",
  MsgSubmitEvidence = "/cosmos.evidence.v1beta1.MsgSubmitEvidence",
  MsgSubmitMisbehaviour = "/ibc.core.client.v1.MsgSubmitMisbehaviour",
  MsgSubmitProposal = "/cosmos.gov.v1beta1.MsgSubmitProposal",
  MsgTimeout = "/ibc.core.channel.v1.MsgTimeout",
  MsgTimeoutOnClose = "/ibc.core.channel.v1.MsgTimeoutOnClose",
  MsgTransfer = "/ibc.applications.transfer.v1.MsgTransfer",
  MsgUndelegate = "/cosmos.staking.v1beta1.MsgUndelegate",
  MsgUnjail = "/cosmos.slashing.v1beta1.MsgUnjail",
  MsgUpdateClient = "/ibc.core.client.v1.MsgUpdateClient",
  MsgUpgradeClient = "/ibc.core.client.v1.MsgUpgradeClient",
  MsgVerifyInvariant = "/cosmos.crisis.v1beta1.MsgVerifyInvariant",
  MsgVote = "/cosmos.gov.v1beta1.MsgVote",
  MsgVoteWeighted = "/cosmos.gov.v1beta1.MsgVoteWeighted",
  MsgWithdrawDelegatorReward = "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
  MsgWithdrawValidatorCommission = "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
}

export type MsgGrantParams = {
  granter: string;
  grantee: string;
  /** Msg, identified by it's type URL, to grant unrestricted permissions to execute */
  msg: MsgGrantAuthorization;
  /** Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. */
  expiration: number;
};

export class MsgGrant implements Msg {
  public params: MsgGrantParams;

  constructor(params: MsgGrantParams) {
    this.params = params;
  }

  async toProto(): Promise<ProtoMsg> {
    const { GenericAuthorization } = await import(
      "../protobuf_stuff/cosmos/authz/v1beta1/authz"
    );

    const grant: import("../protobuf_stuff/cosmos/authz/v1beta1/authz").Grant =
      {
        authorization: {
          typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
          value: GenericAuthorization.encode({ msg: this.params.msg }).finish(),
        },
        expiration: { seconds: String(this.params.expiration), nanos: 0 },
      };

    const msgContent = {
      granter: this.params.granter,
      grantee: this.params.grantee,
      grant: grant,
    };

    return {
      typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/authz/v1beta1/tx")
        ).MsgGrant.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgGrant not implemented.");
  }
}

export type MsgExecParams = {};
export class MsgExec implements Msg {
  constructor(
    msg: import("../protobuf_stuff/cosmos/authz/v1beta1/tx").MsgExec,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgExec not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgExec not implemented.");
  }
}

export type MsgRevokeParams = {};
export class MsgRevoke implements Msg {
  constructor(
    msg: import("../protobuf_stuff/cosmos/authz/v1beta1/tx").MsgRevoke,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgRevoke not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgRevoke not implemented.");
  }
}
