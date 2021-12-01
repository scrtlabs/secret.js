import { MsgSendEncodeObject } from "@cosmjs/stargate";

import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
export { MsgSend };

export { isMsgSendEncodeObject as isMsgSend } from "@cosmjs/stargate";

export function createMsgSend(value: MsgSend): MsgSendEncodeObject {
  return {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value,
  };
}
