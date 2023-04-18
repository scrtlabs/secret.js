use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};

use crate::msg::{Msg, QueryMsg};
use crate::state::LAST_RECEIVED;

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: Msg,
) -> StdResult<Response> {
    Ok(Response::default())
}

#[entry_point]
pub fn execute(deps: DepsMut, _env: Env, info: MessageInfo, msg: Msg) -> StdResult<Response> {
    match msg {
        Msg::Nop {} => Ok(Response::default()),
        Msg::Receive {} => {
            LAST_RECEIVED.save(deps.storage, &info.funds[0].to_string())?;
            Ok(Response::default().add_attribute("ibc_hooks_received", info.funds[0].to_string()))
        }
    }
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::LastReceived {} => {
            let last_received = LAST_RECEIVED.load(deps.storage)?;
            return Ok(to_binary(&last_received)?);
        }
    }
}
