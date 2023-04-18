use cosmwasm_std::Coin;
use secret_toolkit::storage::Item;

pub const LAST_RECEIVED: Item<String> = Item::new(b"last_received");
