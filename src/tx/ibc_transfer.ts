import { MsgParams } from ".";
import { AminoMsg, Coin, Msg, ProtoMsg } from "./types";

export interface MsgTransferParams extends MsgParams {
  /** the port on which the packet will be sent */
  source_port: string;
  /** the channel by which the packet will be sent */
  source_channel: string;
  /** the tokens to be transferred */
  token: Coin;
  /** the sender address */
  sender: string;
  /** the recipient address on the destination chain */
  receiver: string;
  /**
   * Timeout height relative to the current block height.
   * The timeout is disabled when undefined or set to 0.
   */
  timeout_height?: Height;
  /**
   * Timeout timestamp (in seconds) since Unix epoch.
   * The timeout is disabled when undefined or set to 0.
   */
  timeout_timestamp?: string;
  /** optional memo */
  memo?: string;
}

/**
 * Height is a monotonically increasing data type
 * that can be compared against another Height for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionHeight is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionHeight
 * gets reset
 */
export type Height = {
  /** the revision that the client is currently on */
  revision_number: string;
  /** the height within the given revision */
  revision_height: string;
};

/**
 * MsgTransfer defines a msg to transfer fungible tokens (i.e Coins) between
 * ICS20 enabled chains. See ICS Spec here:
 * https://github.com/cosmos/ics/tree/master/spec/ics-020-fungible-token-transfer#data-structures
 */
export class MsgTransfer implements Msg {
  constructor(public params: MsgTransferParams) {}

  async toProto(): Promise<ProtoMsg> {
    const msgContent = {
      source_port: this.params.source_port,
      source_channel: this.params.source_channel,
      token: this.params.token,
      sender: this.params.sender,
      receiver: this.params.receiver,
      timeout_height: this.params.timeout_height,
      timeout_timestamp: this.params.timeout_timestamp
        ? `${this.params.timeout_timestamp}000000000` // sec -> ns
        : "0",
      memo: this.params.memo || "",
    };

    return {
      type_url: "/ibc.applications.transfer.v1.MsgTransfer",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf/ibc/applications/transfer/v1/tx")
        ).MsgTransfer.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgTransfer",
      value: {
        source_port: this.params.source_port,
        source_channel: this.params.source_channel,
        token: this.params.token,
        sender: this.params.sender,
        receiver: this.params.receiver,
        timeout_height: this.params.timeout_height
          ? {
              revision_number: this.params.timeout_height.revision_number,
              revision_height: this.params.timeout_height.revision_height,
            }
          : {},
        timeout_timestamp: this.params.timeout_timestamp
          ? `${this.params.timeout_timestamp}000000000` // sec -> ns
          : "0",
        memo: this.params.memo,
      },
    };
  }
}
