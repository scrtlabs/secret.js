import { MsgWithdrawDelegatorRewardEncodeObject } from "@cosmjs/stargate";

import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";
export { MsgWithdrawDelegatorReward };

export { isMsgWithdrawDelegatorRewardEncodeObject as isMsgWithdrawDelegatorReward } from "@cosmjs/stargate";

export function createMsgWithdrawDelegatorReward(
  value: MsgWithdrawDelegatorReward
): MsgWithdrawDelegatorRewardEncodeObject {
  return {
    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
    value,
  };
}
