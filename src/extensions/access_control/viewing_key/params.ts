import { MsgExecuteContractParams } from "../../../tx";
import { CreateViewingKeyOptions, SetViewingKeyOptions } from "./msgs";

export type SetViewingKeyContractParams =
  MsgExecuteContractParams<SetViewingKeyOptions>;

export type CreateViewingKeyContractParams =
  MsgExecuteContractParams<CreateViewingKeyOptions>;
