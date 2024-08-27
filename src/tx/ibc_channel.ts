import { AminoMsg, Msg, ProtoMsg } from "./types";
import {
  MsgChannelOpenInit as MsgChannelOpenInitParams,
  MsgChannelOpenTry as MsgChannelOpenTryParams,
  MsgChannelOpenAck as MsgChannelOpenAckParams,
  MsgChannelOpenConfirm as MsgChannelOpenConfirmParams,
  MsgChannelCloseInit as MsgChannelCloseInitParams,
  MsgChannelCloseConfirm as MsgChannelCloseConfirmParams,
  MsgRecvPacket as MsgRecvPacketParams,
  MsgTimeout as MsgTimeoutParams,
  MsgTimeoutOnClose as MsgTimeoutOnCloseParams,
  MsgAcknowledgement as MsgAcknowledgementParams,
  MsgChannelUpgradeInit as MsgChannelUpgradeInitParams,
  MsgChannelUpgradeTry as MsgChannelUpgradeTryParams,
  MsgChannelUpgradeAck as MsgChannelUpgradeAckParams,
  MsgChannelUpgradeOpen as MsgChannelUpgradeOpenParams,
  MsgChannelUpgradeTimeout as MsgChannelUpgradeTimeoutParams,
  MsgChannelUpgradeCancel as MsgChannelUpgradeCancelParams,
  MsgPruneAcknowledgements as MsgPruneAcknowledgementsParams,
} from "../protobuf/ibc/core/channel/v1/tx";

export {
  MsgChannelOpenInit as MsgChannelOpenInitParams,
  MsgChannelOpenTry as MsgChannelOpenTryParams,
  MsgChannelOpenAck as MsgChannelOpenAckParams,
  MsgChannelOpenConfirm as MsgChannelOpenConfirmParams,
  MsgChannelCloseInit as MsgChannelCloseInitParams,
  MsgChannelCloseConfirm as MsgChannelCloseConfirmParams,
  MsgRecvPacket as MsgRecvPacketParams,
  MsgTimeout as MsgTimeoutParams,
  MsgTimeoutOnClose as MsgTimeoutOnCloseParams,
  MsgAcknowledgement as MsgAcknowledgementParams,
  MsgChannelUpgradeInit as MsgChannelUpgradeInitParams,
  MsgChannelUpgradeTry as MsgChannelUpgradeTryParams,
  MsgChannelUpgradeAck as MsgChannelUpgradeAckParams,
  MsgChannelUpgradeOpen as MsgChannelUpgradeOpenParams,
  MsgChannelUpgradeTimeout as MsgChannelUpgradeTimeoutParams,
  MsgChannelUpgradeCancel as MsgChannelUpgradeCancelParams,
  MsgPruneAcknowledgements as MsgPruneAcknowledgementsParams,
} from "../protobuf/ibc/core/channel/v1/tx";

/** MsgRecvPacket receives incoming IBC packet */
export class MsgRecvPacket implements Msg {
  constructor(private msg: MsgRecvPacketParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgRecvPacket",
      value: this.msg,
      encode: () => MsgRecvPacketParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgRecvPacket doesn't support Amino encoding.");
  }
}

/** MsgTimeout receives timed-out packet */
export class MsgTimeout implements Msg {
  constructor(private msg: MsgTimeoutParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgTimeout",
      value: this.msg,
      encode: () => MsgTimeoutParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgTimeout doesn't support Amino encoding.");
  }
}

/** MsgTimeoutOnClose timed-out packet upon counterparty channel closure. */
export class MsgTimeoutOnClose implements Msg {
  constructor(private msg: MsgTimeoutOnCloseParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgTimeoutOnClose",
      value: this.msg,
      encode: () => MsgTimeoutOnCloseParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgTimeoutOnClose doesn't support Amino encoding.");
  }
}

/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It
 * is called by a relayer on Chain A.
 */
export class MsgChannelOpenInit implements Msg {
  constructor(private msg: MsgChannelOpenInitParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelOpenInit",
      value: this.msg,
      encode: () => MsgChannelOpenInitParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelOpenInit doesn't support Amino encoding.");
  }
}

/** MsgAcknowledgement receives incoming IBC acknowledgement */
export class MsgAcknowledgement implements Msg {
  constructor(private msg: MsgAcknowledgementParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgAcknowledgement",
      value: this.msg,
      encode: () => MsgAcknowledgementParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgAcknowledgement doesn't support Amino encoding.");
  }
}

/**
 * MsgChannelOpenInit defines a msg sent by a Relayer to try to open a channel
 * on Chain B.
 */
export class MsgChannelOpenTry implements Msg {
  constructor(private msg: MsgChannelOpenTryParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelOpenTry",
      value: this.msg,
      encode: () => MsgChannelOpenTryParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelOpenTry doesn't support Amino encoding.");
  }
}

/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge
 * the change of channel state to TRYOPEN on Chain B.
 */
export class MsgChannelOpenAck implements Msg {
  constructor(private msg: MsgChannelOpenAckParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelOpenAck",
      value: this.msg,
      encode: () => MsgChannelOpenAckParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelOpenAck doesn't support Amino encoding.");
  }
}

/**
 * MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of channel state to OPEN on Chain A.
 */
export class MsgChannelOpenConfirm implements Msg {
  constructor(private msg: MsgChannelOpenConfirmParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelOpenConfirm",
      value: this.msg,
      encode: () => MsgChannelOpenConfirmParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelOpenConfirm doesn't support Amino encoding.");
  }
}

/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A
 * to close a channel with Chain B.
 */
export class MsgChannelCloseInit implements Msg {
  constructor(private msg: MsgChannelCloseInitParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelCloseInit",
      value: this.msg,
      encode: () => MsgChannelCloseInitParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelCloseInit doesn't support Amino encoding.");
  }
}

/** MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to CLOSED on Chain A. */
export class MsgChannelCloseConfirm implements Msg {
  constructor(private msg: MsgChannelCloseConfirmParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelCloseConfirm",
      value: this.msg,
      encode: () => MsgChannelCloseConfirmParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelCloseConfirm doesn't support Amino encoding.");
  }
}

export class MsgChannelUpgradeInit implements Msg {
  constructor(private msg: MsgChannelUpgradeInitParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelUpgradeInit",
      value: this.msg,
      encode: () => MsgChannelUpgradeInitParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelUpgradeInit doesn't support Amino encoding.");
  }
}
export class MsgChannelUpgradeTry implements Msg {
  constructor(private msg: MsgChannelUpgradeTryParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelUpgradeTry",
      value: this.msg,
      encode: () => MsgChannelUpgradeTryParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelUpgradeTry doesn't support Amino encoding.");
  }
}
export class MsgChannelUpgradeAck implements Msg {
  constructor(private msg: MsgChannelUpgradeAckParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelUpgradeAck",
      value: this.msg,
      encode: () => MsgChannelUpgradeAckParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelUpgradeAck doesn't support Amino encoding.");
  }
}
export class MsgChannelUpgradeOpen implements Msg {
  constructor(private msg: MsgChannelUpgradeOpenParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelUpgradeOpen",
      value: this.msg,
      encode: () => MsgChannelUpgradeOpenParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelUpgradeOpen doesn't support Amino encoding.");
  }
}
export class MsgChannelUpgradeTimeout implements Msg {
  constructor(private msg: MsgChannelUpgradeTimeoutParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelUpgradeTimeout",
      value: this.msg,
      encode: () => MsgChannelUpgradeTimeoutParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelUpgradeTimeout doesn't support Amino encoding.");
  }
}
export class MsgChannelUpgradeCancel implements Msg {
  constructor(private msg: MsgChannelUpgradeCancelParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelUpgradeCancel",
      value: this.msg,
      encode: () => MsgChannelUpgradeCancelParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelUpgradeCancel doesn't support Amino encoding.");
  }
}
export class MsgPruneAcknowledgements implements Msg {
  constructor(private msg: MsgPruneAcknowledgementsParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgPruneAcknowledgements",
      value: this.msg,
      encode: () => MsgPruneAcknowledgementsParams.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgPruneAcknowledgements doesn't support Amino encoding.");
  }
}
