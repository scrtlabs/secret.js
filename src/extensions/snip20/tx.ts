import { MsgExecuteContract } from "../../tx";
import {
  Snip20DecreaseAllowanceOptions,
  Snip20IncreaseAllowanceOptions,
  Snip20SendOptions,
  Snip20SetViewingKeyOptions,
  Snip20TransferOptions
} from "./types";

export class MsgSnip20Send extends MsgExecuteContract<Snip20SendOptions> {}

export class MsgSnip20Transfer extends MsgExecuteContract<Snip20TransferOptions> {}

export class MsgSnip20IncreaseAllowance extends MsgExecuteContract<Snip20IncreaseAllowanceOptions> {}

export class MsgSnip20DecreaseAllowance extends MsgExecuteContract<Snip20DecreaseAllowanceOptions> {}

export class MsgSnip20SetViewingKey extends MsgExecuteContract<Snip20SetViewingKeyOptions> {}
