use cosmwasm_std::{Coin, Uint64};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecMsg {
    Nop {},
    WrapDeposit {
        snip20_address: String,
        snip20_code_hash: String,
        recipient_address: String,
    },
    #[serde(rename = "ibc_transfer")]
    IBCTransfer {
        channel_id: String,
        to_address: String,
        amount: Coin,
        timeout_sec_from_now: Uint64,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum MigrateMsg {
    Nop {},
    StdError {},
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum IBCLifecycleComplete {
    #[serde(rename = "ibc_ack")]
    IBCAck {
        /// The source channel (secret side) of the IBC packet
        channel: String,
        /// The sequence number that the packet was sent with
        sequence: u64,
        /// String encoded version of the ack as seen by OnAcknowledgementPacket(..)
        ack: String,
        /// Weather an ack is a success of failure according to the transfer spec
        success: bool,
    },
    #[serde(rename = "ibc_timeout")]
    IBCTimeout {
        /// The source channel (secret side) of the IBC packet
        channel: String,
        /// The sequence number that the packet was sent with
        sequence: u64,
    },
}

/// Message type for `sudo` entry_point
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum SudoMsg {
    #[serde(rename = "ibc_lifecycle_complete")]
    IBCLifecycleComplete(IBCLifecycleComplete),
}
