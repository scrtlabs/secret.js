import { AminoMsg, Msg, ProtoMsg } from "./types";

/** MsgRecvPacket receives incoming IBC packet */
export class MsgRecvPacket implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/channel/v1/tx").MsgRecvPacket,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgRecvPacket",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/channel/v1/tx")
        ).MsgRecvPacket.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgRecvPacket doesn't support Amino encoding.");
  }
}

/** MsgTimeout receives timed-out packet */
export class MsgTimeout implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/channel/v1/tx").MsgTimeout,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgTimeout",
      value: this.msg,
      encode: async () =>
        (await import("../protobuf/ibc/core/channel/v1/tx")).MsgTimeout.encode(
          this.msg,
        ).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgTimeout doesn't support Amino encoding.");
  }
}

/** MsgTimeoutOnClose timed-out packet upon counterparty channel closure. */
export class MsgTimeoutOnClose implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/channel/v1/tx").MsgTimeoutOnClose,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgTimeoutOnClose",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/channel/v1/tx")
        ).MsgTimeoutOnClose.encode(this.msg).finish(),
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
  constructor(
    private msg: import("../protobuf/ibc/core/channel/v1/tx").MsgChannelOpenInit,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelOpenInit",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/channel/v1/tx")
        ).MsgChannelOpenInit.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelOpenInit doesn't support Amino encoding.");
  }
}

/** MsgAcknowledgement receives incoming IBC acknowledgement */
export class MsgAcknowledgement implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/channel/v1/tx").MsgAcknowledgement,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgAcknowledgement",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/channel/v1/tx")
        ).MsgAcknowledgement.encode(this.msg).finish(),
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
  constructor(
    private msg: import("../protobuf/ibc/core/channel/v1/tx").MsgChannelOpenTry,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelOpenTry",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/channel/v1/tx")
        ).MsgChannelOpenTry.encode(this.msg).finish(),
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
  constructor(
    private msg: import("../protobuf/ibc/core/channel/v1/tx").MsgChannelOpenAck,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelOpenAck",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/channel/v1/tx")
        ).MsgChannelOpenAck.encode(this.msg).finish(),
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
  constructor(
    private msg: import("../protobuf/ibc/core/channel/v1/tx").MsgChannelOpenConfirm,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelOpenConfirm",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/channel/v1/tx")
        ).MsgChannelOpenConfirm.encode(this.msg).finish(),
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
  constructor(
    private msg: import("../protobuf/ibc/core/channel/v1/tx").MsgChannelCloseInit,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelCloseInit",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/channel/v1/tx")
        ).MsgChannelCloseInit.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelCloseInit doesn't support Amino encoding.");
  }
}

/** MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to CLOSED on Chain A. */
export class MsgChannelCloseConfirm implements Msg {
  constructor(
    private msg: import("../protobuf/ibc/core/channel/v1/tx").MsgChannelCloseConfirm,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: "/ibc.core.channel.v1.MsgChannelCloseConfirm",
      value: this.msg,
      encode: async () =>
        (
          await import("../protobuf/ibc/core/channel/v1/tx")
        ).MsgChannelCloseConfirm.encode(this.msg).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelCloseConfirm doesn't support Amino encoding.");
  }
}
