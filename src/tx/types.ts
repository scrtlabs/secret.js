import { EncryptionUtils } from "..";
import { AminoMsg } from "@cosmjs/amino";

export { AminoMsg } from "@cosmjs/amino";

export interface ProtoMsg {
  type_url: string;
  // value is used in x/compute
  value: any;
  encode(): Uint8Array;
}

export interface Msg {
  toProto(utils?: EncryptionUtils): Promise<ProtoMsg>;
  toAmino(utils?: EncryptionUtils): Promise<AminoMsg>;
}

export interface MsgParams {}
