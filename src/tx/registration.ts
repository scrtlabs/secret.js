import { toBase64 } from "@cosmjs/encoding";
import { AminoMsg, Msg, ProtoMsg, MsgParams } from "./types";
import { addressToBytes } from "../utils";
import { RaAuthenticate as RaAuthenticateProto } from "../protobuf/secret/registration/v1beta1/msg";

export interface RaAuthenticateParams extends MsgParams {
  sender: string;
  certificate: Uint8Array;
}

/** RaAuthenticate defines a message to register an new node. */
export class RaAuthenticate implements Msg {
  constructor(public params: RaAuthenticateParams) {}

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      sender: addressToBytes(this.params.sender),
      certificate: this.params.certificate,
    };

    return {
      type_url: "/secret.registration.v1beta1.RaAuthenticate",
      value: msgContent,
      encode: () => RaAuthenticateProto.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "reg/authenticate",
      value: {
        sender: this.params.sender,
        ra_cert: toBase64(this.params.certificate),
      },
    };
  }
}
