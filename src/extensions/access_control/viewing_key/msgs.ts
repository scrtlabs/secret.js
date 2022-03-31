import { MsgExecuteContract } from "../../../tx";

export interface SetViewingKeyOptions {
  set_viewing_key: {
    key: string;
    padding?: string;
  };
}

export interface CreateViewingKeyOptions {
  create_viewing_key: {
    entropy: string;
    padding?: string;
  };
}

export class MsgSetViewingKey extends MsgExecuteContract<SetViewingKeyOptions> {}

export class MsgCreateViewingKey extends MsgExecuteContract<CreateViewingKeyOptions> {}
