import { MsgParams } from ".";
import { AminoMsg, Coin, Msg, ProtoMsg } from "./types";

export interface MsgTransferParams extends MsgParams {
  /** the port on which the packet will be sent */
  sourcePort: string;
  /** the channel by which the packet will be sent */
  sourceChannel: string;
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
  timeoutHeight?: Height;
  /**
   * Timeout timestamp (in seconds) since Unix epoch.
   * The timeout is disabled when undefined or set to 0.
   */
  timeoutTimestampSec?: string;
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
  revisionNumber: string;
  /** the height within the given revision */
  revisionHeight: string;
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
      sourcePort: this.params.sourcePort,
      sourceChannel: this.params.sourceChannel,
      token: this.params.token,
      sender: this.params.sender,
      receiver: this.params.receiver,
      timeoutHeight: this.params.timeoutHeight,
      timeoutTimestamp: this.params.timeoutTimestampSec
        ? `${this.params.timeoutTimestampSec}000000000` // sec -> ns
        : "0",
    };

    return {
      typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
      value: msgContent,
      encode: async () =>
        (
          await import("../protobuf_stuff/ibc/applications/transfer/v1/tx")
        ).MsgTransfer.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgTransfer",
      value: {
        source_port: this.params.sourcePort,
        source_channel: this.params.sourceChannel,
        token: this.params.token,
        sender: this.params.sender,
        receiver: this.params.receiver,
        timeout_height: this.params.timeoutHeight
          ? {
              revision_number: this.params.timeoutHeight.revisionNumber,
              revision_height: this.params.timeoutHeight.revisionHeight,
            }
          : {},
        timeout_timestamp: this.params.timeoutTimestampSec
          ? `${this.params.timeoutTimestampSec}000000000` // sec -> ns
          : "0",
      },
    };
  }
}
