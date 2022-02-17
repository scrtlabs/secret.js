import {
  AminoMsg,
  Msg,
  MsgExecParams,
  MsgExecuteContract,
  MsgExecuteContractParams,
  ProtoMsg,
} from "../../tx";
import { EncryptionUtils } from "../../encryption";
import {
  Snip20DecreaseAllowanceOptions,
  Snip20IncreaseAllowanceOptions,
  Snip20SendOptions,
  Snip20TransferOptions,
} from "./types";

export class MsgSnip20Send extends MsgExecuteContract<Snip20SendOptions> {}

export class MsgSnip20Transfer extends MsgExecuteContract<Snip20TransferOptions> {}

export class MsgSnip20IncreaseAllowance extends MsgExecuteContract<Snip20IncreaseAllowanceOptions> {}

export class MsgSnip20DecreaseAllowance extends MsgExecuteContract<Snip20DecreaseAllowanceOptions> {}
// export class MsgSnip20Send extends MsgExecuteContract {
//   constructor(public params: Snip20SendOptions) {
//     super(this.sender);
//   }
//
//   async toProto(utils: EncryptionUtils): Promise<ProtoMsg> {
//     const msgContent = {
//       grantee: this.params.grantee,
//       msgs: await Promise.all(this.params.msgs.map((m) => m.toProto(utils))),
//     };
//
//     return {
//       typeUrl: "/cosmos.authz.v1beta1.MsgExec",
//       value: msgContent,
//       encode: async () =>
//         (
//           await import("../protobuf_stuff/cosmos/authz/v1beta1/tx")
//         ).MsgExec.encode(msgContent).finish(),
//     };
//   }
//
//   async toAmino(): Promise<AminoMsg> {
//     throw new Error("MsgExec not implemented.");
//   }
// }
