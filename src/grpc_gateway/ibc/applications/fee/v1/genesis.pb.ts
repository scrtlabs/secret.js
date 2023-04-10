/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as IbcCoreChannelV1Channel from "../../../core/channel/v1/channel.pb"
import * as IbcApplicationsFeeV1Fee from "./fee.pb"
export type GenesisState = {
  identified_fees?: IbcApplicationsFeeV1Fee.IdentifiedPacketFees[]
  fee_enabled_channels?: FeeEnabledChannel[]
  registered_payees?: RegisteredPayee[]
  registered_counterparty_payees?: RegisteredCounterpartyPayee[]
  forward_relayers?: ForwardRelayerAddress[]
}

export type FeeEnabledChannel = {
  port_id?: string
  channel_id?: string
}

export type RegisteredPayee = {
  channel_id?: string
  relayer?: string
  payee?: string
}

export type RegisteredCounterpartyPayee = {
  channel_id?: string
  relayer?: string
  counterparty_payee?: string
}

export type ForwardRelayerAddress = {
  address?: string
  packet_id?: IbcCoreChannelV1Channel.PacketId
}