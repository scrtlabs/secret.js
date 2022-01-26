import { MsgSendEncodeObject } from "@cosmjs/stargate";
import { MsgSend } from "../protobuf_stuff/cosmos/bank/v1beta1/tx";

// import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
export { isMsgSendEncodeObject as isMsgSend } from "@cosmjs/stargate";
export { MsgSend };

export function createMsgSend(value: MsgSend): MsgSendEncodeObject {
  return {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value,
  };
}
