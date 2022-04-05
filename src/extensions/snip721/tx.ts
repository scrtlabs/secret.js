import { MsgExecuteContract } from "../../tx";
import {
  Snip721AddMinterOptions,
  Snip721MintOptions,
  Snip721SendOptions,
} from "./types";

export class MsgSnip721Send extends MsgExecuteContract<Snip721SendOptions> {}
export class MsgSnip721AddMinter extends MsgExecuteContract<Snip721AddMinterOptions> {}
export class MsgSnip721Mint extends MsgExecuteContract<Snip721MintOptions> {}
