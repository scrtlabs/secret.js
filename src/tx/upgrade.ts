import { AminoMsg, Msg, ProtoMsg } from "./types";
import {
  MsgSoftwareUpgrade as MsgSoftwareUpgradeParams,
  MsgCancelUpgrade as MsgCancelUpgradeParams,
} from "../protobuf/cosmos/upgrade/v1beta1/tx";

export {
  MsgSoftwareUpgrade as MsgSoftwareUpgradeParams,
  MsgCancelUpgrade as MsgCancelUpgradeParams,
} from "../protobuf/cosmos/upgrade/v1beta1/tx";

export class MsgSoftwareUpgrade implements Msg {
  constructor(public params: MsgSoftwareUpgradeParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade`,
      value: this.params,
      encode: () => MsgSoftwareUpgradeParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("Not implemented. Please use WalletProto");
  }
}

export class MsgCancelUpgrade implements Msg {
  constructor(public params: MsgCancelUpgradeParams) {}

  async toProto(): Promise<ProtoMsg> {
    return {
      type_url: `/cosmos.upgrade.v1beta1.MsgCancelUpgrade`,
      value: this.params,
      encode: () => MsgCancelUpgradeParams.encode(this.params).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("Not implemented. Please use WalletProto");
  }
}
