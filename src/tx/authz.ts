import { AminoMsg, Coin, Msg, MsgParams, ProtoMsg } from ".";
import { EncryptionUtils } from "..";

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

/**
 * GenericAuthorization gives the grantee unrestricted permissions to execute
 * the provided Msg on behalf of the granter's account.
 * The provided Msg must implement the Authorization interface: https://github.com/cosmos/cosmos-sdk/blob/c44309bc694ea8b6069ae147743f0b25dc8b52c0/x/authz/authorizations.go#L9-L25
 */
export type GenericAuthorization = {
  msg: MsgGrantAuthorization;
};

function isGenericAuthorization(object: any): object is GenericAuthorization {
  return "msg" in object;
}

/**
 * SendAuthorization allows the grantee to spend up to spend_limit coins from the granter's account.
 */
export interface SendAuthorization {
  spendLimit: Coin[];
}

function isSendAuthorization(object: any): object is SendAuthorization {
  return "spendLimit" in object;
}

/** StakeAuthorization defines authorization for delegate/undelegate/redelegate. */
export type StakeAuthorization = {
  /**
   * max_tokens specifies the maximum amount of tokens can be delegate to a validator.
   * If it is empty, there is no spend limit and any amount of coins can be delegated.
   */
  maxTokens: Coin;
  /** allow_list specifies list of validator addresses to whom grantee can delegate tokens on behalf of granter's account. */
  allowList: string[];
  /** deny_list specifies list of validator addresses to whom grantee can not delegate tokens. */
  denyList: string[];
  /** authorization_type defines one of AuthorizationType. */
  authorizationType: StakeAuthorizationType;
};

function isStakeAuthorization(object: any): object is StakeAuthorization {
  return (
    "maxTokens" in object &&
    "allowList" in object &&
    "denyList" in object &&
    "authorizationType" in object
  );
}

/** AuthorizationType defines the type of staking module authorization type */
export enum StakeAuthorizationType {
  /** defines an authorization type for Msg/Delegate */
  Delegate = 1,
  /** defines an authorization type for Msg/Undelegate */
  Undelegate = 2,
  /** defines an authorization type for Msg/BeginRedelegate */
  Redelegate = 3,
}

export interface MsgGrantParams extends MsgParams {
  granter: string;
  grantee: string;
  authorization: GenericAuthorization | SendAuthorization | StakeAuthorization;
  /** Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. */
  expiration: number;
}

/**
 * MsgGrant is a request type for Grant method. It declares authorization to the grantee
 * on behalf of the granter with the provided expiration time.
 */
export class MsgGrant implements Msg {
  constructor(public params: MsgGrantParams) {}

  async toProto(): Promise<ProtoMsg> {
    let grant: import("../protobuf_stuff/cosmos/authz/v1beta1/authz").Grant;
    if (isSendAuthorization(this.params.authorization)) {
      const { SendAuthorization } = await import(
        "../protobuf_stuff/cosmos/bank/v1beta1/authz"
      );

      grant = {
        authorization: {
          typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
          value: SendAuthorization.encode(this.params.authorization).finish(),
        },
        expiration: { seconds: String(this.params.expiration), nanos: 0 },
      };
    } else if (isStakeAuthorization(this.params.authorization)) {
      const { StakeAuthorization } = await import(
        "../protobuf_stuff/cosmos/staking/v1beta1/authz"
      );

      grant = {
        authorization: {
          typeUrl: "/cosmos.staking.v1beta1.StakeAuthorization",
          value: StakeAuthorization.encode({
            maxTokens: this.params.authorization.maxTokens,

            allowList: { address: this.params.authorization.allowList },
            denyList: { address: this.params.authorization.denyList },
            authorizationType: Number(
              this.params.authorization.authorizationType,
            ),
          }).finish(),
        },
        expiration: { seconds: String(this.params.expiration), nanos: 0 },
      };
    } else if (isGenericAuthorization(this.params.authorization)) {
      const { GenericAuthorization } = await import(
        "../protobuf_stuff/cosmos/authz/v1beta1/authz"
      );

      grant = {
        authorization: {
          typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
          value: GenericAuthorization.encode({
            msg: String(this.params.authorization.msg),
          }).finish(),
        },
        expiration: { seconds: String(this.params.expiration), nanos: 0 },
      };
    } else {
      throw new Error("Unknown authorization type.");
    }

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

export interface MsgExecParams extends MsgParams {
  grantee: string;
  /**
   * Authorization Msg requests to execute. Each msg must implement Authorization interface
   * The x/authz will try to find a grant matching (msg.signers[0], grantee, MsgTypeURL(msg))
   * triple and validate it.
   */
  msgs: Msg[];
}

/**
 * MsgExec attempts to execute the provided messages using
 * authorizations granted to the grantee. Each message should have only
 * one signer corresponding to the granter of the authorization.
 */
export class MsgExec implements Msg {
  constructor(public params: MsgExecParams) {}

  async toProto(utils: EncryptionUtils): Promise<ProtoMsg> {
    const msgContent = {
      grantee: this.params.grantee,
      msgs: await Promise.all(this.params.msgs.map((m) => m.toProto(utils))),
    };

    return {
      typeUrl: "/cosmos.authz.v1beta1.MsgExec",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/authz/v1beta1/tx")
        ).MsgExec.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgExec not implemented.");
  }
}

export interface MsgRevokeParams extends MsgParams {
  granter: string;
  grantee: string;
  /** revokes any authorization with the provided sdk.Msg type on the
   * granter's account with that has been granted to the grantee. */
  msg: MsgGrantAuthorization;
}

/**
 * MsgRevoke revokes any authorization with the provided sdk.Msg type on the
 * granter's account with that has been granted to the grantee.
 */
export class MsgRevoke implements Msg {
  constructor(public params: MsgRevokeParams) {}

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      granter: this.params.granter,
      grantee: this.params.grantee,
      msgTypeUrl: String(this.params.msg),
    };

    return {
      typeUrl: "/cosmos.authz.v1beta1.MsgRevoke",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/cosmos/authz/v1beta1/tx")
        ).MsgRevoke.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgRevoke not implemented.");
  }
}
