import { AminoMsg, Coin, Msg, MsgParams, ProtoMsg } from ".";
import { EncryptionUtils } from "..";
import {
  GenericAuthorization as GenericAuthorizationProto,
  Grant,
} from "../protobuf_stuff/cosmos/authz/v1beta1/authz";
import {
  MsgExec as MsgExecProto,
  MsgGrant as MsgGrantProto,
  MsgRevoke as MsgRevokeProto,
} from "../protobuf_stuff/cosmos/authz/v1beta1/tx";
import { SendAuthorization as SendAuthorizationProto } from "../protobuf_stuff/cosmos/bank/v1beta1/authz";
import { StakeAuthorization as StakeAuthorizationProto } from "../protobuf_stuff/cosmos/staking/v1beta1/authz";

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
  /** defines an authorization type for MsgDelegate */
  Delegate = 1,
  /** defines an authorization type for MsgUndelegate */
  Undelegate = 2,
  /** defines an authorization type for MsgBeginRedelegate */
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
    let grant: Grant;
    const expiration = {
      seconds: String(Math.floor(this.params.expiration)),
      nanos: 0,
    };

    if (isSendAuthorization(this.params.authorization)) {
      grant = {
        authorization: {
          typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
          value: SendAuthorizationProto.encode(
            this.params.authorization,
          ).finish(),
        },
        expiration,
      };
    } else if (isStakeAuthorization(this.params.authorization)) {
      grant = {
        authorization: {
          typeUrl: "/cosmos.staking.v1beta1.StakeAuthorization",
          value: StakeAuthorizationProto.encode({
            maxTokens: this.params.authorization.maxTokens,

            allowList: { address: this.params.authorization.allowList },
            denyList: { address: this.params.authorization.denyList },
            authorizationType: Number(
              this.params.authorization.authorizationType,
            ),
          }).finish(),
        },
        expiration,
      };
    } else if (isGenericAuthorization(this.params.authorization)) {
      grant = {
        authorization: {
          typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
          value: GenericAuthorizationProto.encode({
            msg: String(this.params.authorization.msg),
          }).finish(),
        },
        expiration,
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
      encode: async () => MsgGrantProto.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    let grant: {
      type: string;
      value: {
        granter: string;
        grantee: string;
        grant: {
          authorization: { type: string; value: object };
          expiration: string;
        };
      };
    } = {
      type: "cosmos-sdk/MsgGrant",
      value: {
        granter: this.params.granter,
        grantee: this.params.grantee,
        grant: {
          //@ts-ignore
          authorization: {},
          expiration: new Date(this.params.expiration * 1000).toISOString(),
        },
      },
    };
    if (isSendAuthorization(this.params.authorization)) {
      grant.value.grant.authorization = {
        type: "cosmos-sdk/SendAuthorization",
        value: {
          spend_limit: this.params.authorization.spendLimit,
        },
      };
    } else if (isStakeAuthorization(this.params.authorization)) {
      let Validators: { type: string; value: object };
      if (this.params.authorization.allowList?.length > 0) {
        Validators = {
          type: "cosmos-sdk/StakeAuthorization/AllowList",
          value: {
            allow_list: {
              address: this.params.authorization.allowList,
            },
          },
        };
      } else if (this.params.authorization.denyList?.length > 0) {
        Validators = {
          type: "cosmos-sdk/StakeAuthorization/DenyList",
          value: {
            deny_list: {
              address: this.params.authorization.denyList,
            },
          },
        };
      } else {
        throw new Error("Must pass in allowList or denyList.");
      }

      grant.value.grant.authorization = {
        type: "cosmos-sdk/StakeAuthorization",
        value: {
          max_tokens: this.params.authorization.maxTokens,
          authorization_type: this.params.authorization.authorizationType,
          Validators,
        },
      };
    } else if (isGenericAuthorization(this.params.authorization)) {
      grant.value.grant.authorization = {
        type: "cosmos-sdk/GenericAuthorization",
        value: {
          msg: this.params.authorization.msg,
        },
      };
    } else {
      throw new Error("Unknown authorization type.");
    }

    return grant;
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

  async toProto(encryptionUtils: EncryptionUtils): Promise<ProtoMsg> {
    const msgContent = {
      grantee: this.params.grantee,
      msgs: await Promise.all(
        this.params.msgs.map((m) => m.toProto(encryptionUtils)),
      ),
    };

    return {
      typeUrl: "/cosmos.authz.v1beta1.MsgExec",
      value: msgContent,
      encode: async () => MsgExecProto.encode(msgContent).finish(),
    };
  }

  async toAmino(encryptionUtils: EncryptionUtils): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgExec",
      value: {
        grantee: this.params.grantee,
        msgs: (
          await Promise.all(
            this.params.msgs.map((m) => m.toAmino(encryptionUtils)),
          )
        ).map((m) => m.value), // in amino it only uses the values \o/
      },
    };
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
      encode: async () => MsgRevokeProto.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgRevoke",
      value: {
        granter: this.params.granter,
        grantee: this.params.grantee,
        msg_type_url: String(this.params.msg),
      },
    };
  }
}
