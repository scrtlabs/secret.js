use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Msg {
    Nop {},
    WrapDeposit {
        snip20_address: String,
        snip20_code_hash: String,
        recipient_address: String,
    },
}
