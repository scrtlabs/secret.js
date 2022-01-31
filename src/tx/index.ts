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
  toProto(): ProtoMsg;
  toAmino(): AminoMsg;
}
