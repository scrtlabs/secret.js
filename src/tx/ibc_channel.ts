import { AminoMsg, Msg, ProtoMsg } from "./types";

/** MsgRecvPacket receives incoming IBC packet */
export class MsgRecvPacket implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/channel/v1/tx").MsgRecvPacket,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgRecvPacket not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgRecvPacket not implemented.");
  }
}

/** MsgTimeout receives timed-out packet */
export class MsgTimeout implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/channel/v1/tx").MsgTimeout,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgTimeout not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgTimeout not implemented.");
  }
}

/** MsgTimeoutOnClose timed-out packet upon counterparty channel closure. */
export class MsgTimeoutOnClose implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/channel/v1/tx").MsgTimeoutOnClose,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method MsgTimeoutOnClose implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgTimeoutOnClose not implemented.");
  }
}

/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It
 * is called by a relayer on Chain A.
 */
export class MsgChannelOpenInit implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/channel/v1/tx").MsgChannelOpenInit,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method MsgChannelOpenInit implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelOpenInit not implemented.");
  }
}

/** MsgAcknowledgement receives incoming IBC acknowledgement */
export class MsgAcknowledgement implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/channel/v1/tx").MsgAcknowledgement,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method MsgAcknowledgement implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgAcknowledgement not implemented.");
  }
}

/**
 * MsgChannelOpenInit defines a msg sent by a Relayer to try to open a channel
 * on Chain B.
 */
export class MsgChannelOpenTry implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/channel/v1/tx").MsgChannelOpenTry,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method MsgChannelOpenTry implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelOpenTry not implemented.");
  }
}

/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge
 * the change of channel state to TRYOPEN on Chain B.
 */
export class MsgChannelOpenAck implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/channel/v1/tx").MsgChannelOpenAck,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method MsgChannelOpenAck implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelOpenAck not implemented.");
  }
}

/**
 * MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of channel state to OPEN on Chain A.
 */
export class MsgChannelOpenConfirm implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/channel/v1/tx").MsgChannelOpenConfirm,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not MsgChannelOpenConfirm.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelOpenConfirm not implemented.");
  }
}

/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A
 * to close a channel with Chain B.
 */
export class MsgChannelCloseInit implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/channel/v1/tx").MsgChannelCloseInit,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method MsgChannelCloseInit implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelCloseInit not implemented.");
  }
}

/** MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to CLOSED on Chain A. */
export class MsgChannelCloseConfirm implements Msg {
  constructor(
    msg: import("../protobuf_stuff/ibc/core/channel/v1/tx").MsgChannelCloseConfirm,
  ) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not MsgChannelCloseConfirm.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgChannelCloseConfirm not implemented.");
  }
}
