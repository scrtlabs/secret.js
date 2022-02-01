import { EncryptionUtils } from "..";

export interface ProtoMsg {
  typeUrl: string;
  value: any;
  encode(): Uint8Array;
}

export type AminoMsg = {
  type: string;
  value: any;
};

export interface Msg {
  toProto(utils: EncryptionUtils): Promise<ProtoMsg>;
  toAmino(utils: EncryptionUtils): Promise<AminoMsg>;
}
