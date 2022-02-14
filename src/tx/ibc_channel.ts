import { AminoMsg, Msg, ProtoMsg } from "./types";

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
