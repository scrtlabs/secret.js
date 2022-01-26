import {
  MsgDelegateEncodeObject,
  MsgUndelegateEncodeObject,
} from "@cosmjs/stargate";

import {
  MsgDelegate,
  MsgUndelegate,
} from "cosmjs-types/cosmos/staking/v1beta1/tx";
export { MsgDelegate, MsgUndelegate };

export {
  isMsgDelegateEncodeObject as isMsgDelegate,
  isMsgUndelegateEncodeObject as isMsgUndelegate,
} from "@cosmjs/stargate";

export function createMsgDelegate(value: MsgDelegate): MsgDelegateEncodeObject {
  return {
    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
    value,
  };
}

export function createMsgUndelegate(
  value: MsgUndelegate,
): MsgUndelegateEncodeObject {
  return {
    typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
    value,
  };
}
