/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CosmosBaseV1beta1Coin from "../../../../cosmos/base/v1beta1/coin.pb"
import * as IbcCoreChannelV1Channel from "../../../core/channel/v1/channel.pb"
export type Fee = {
  recv_fee?: CosmosBaseV1beta1Coin.Coin[]
  ack_fee?: CosmosBaseV1beta1Coin.Coin[]
  timeout_fee?: CosmosBaseV1beta1Coin.Coin[]
}

export type PacketFee = {
  fee?: Fee
  refund_address?: string
  relayers?: string[]
}

export type PacketFees = {
  packet_fees?: PacketFee[]
}

export type IdentifiedPacketFees = {
  packet_id?: IbcCoreChannelV1Channel.PacketId
  packet_fees?: PacketFee[]
}