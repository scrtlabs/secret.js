import {
  MsgAcknowledgement as MsgAcknowledgementProto,
  MsgChannelCloseConfirm as MsgChannelCloseConfirmProto,
  MsgChannelCloseInit as MsgChannelCloseInitProto,
  MsgChannelOpenAck as MsgChannelOpenAckProto,
  MsgChannelOpenConfirm as MsgChannelOpenConfirmProto,
  MsgChannelOpenInit as MsgChannelOpenInitProto,
  MsgChannelOpenTry as MsgChannelOpenTryProto,
  MsgRecvPacket as MsgRecvPacketProto,
  MsgTimeout as MsgTimeoutProto,
  MsgTimeoutOnClose as MsgTimeoutOnCloseProto,
} from "../protobuf_stuff/ibc/core/channel/v1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export class MsgRecvPacket implements Msg {
  constructor(msg: MsgRecvPacketProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgTimeout implements Msg {
  constructor(msg: MsgTimeoutProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgTimeoutOnClose implements Msg {
  constructor(msg: MsgTimeoutOnCloseProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgChannelOpenInit implements Msg {
  constructor(msg: MsgChannelOpenInitProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgAcknowledgement implements Msg {
  constructor(msg: MsgAcknowledgementProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgChannelOpenTry implements Msg {
  constructor(msg: MsgChannelOpenTryProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgChannelOpenAck implements Msg {
  constructor(msg: MsgChannelOpenAckProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgChannelOpenConfirm implements Msg {
  constructor(msg: MsgChannelOpenConfirmProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgChannelCloseInit implements Msg {
  constructor(msg: MsgChannelCloseInitProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}

export class MsgChannelCloseConfirm implements Msg {
  constructor(msg: MsgChannelCloseConfirmProto) {}
  async toProto(): Promise<ProtoMsg> {
    throw new Error("Method not implemented.");
  }
  async toAmino(): Promise<AminoMsg> {
    throw new Error("Method not implemented.");
  }
}
