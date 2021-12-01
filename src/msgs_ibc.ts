import { MsgTransferEncodeObject } from "@cosmjs/stargate";

import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
export { MsgTransfer };

export { isMsgTransferEncodeObject as isMsgTransfer } from "@cosmjs/stargate";

export function createMsgTransfer(value: MsgTransfer): MsgTransferEncodeObject {
  return {
    typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
    value,
  };
}
