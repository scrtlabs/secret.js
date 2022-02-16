import { CosmWasmClient } from "secretjs";
import { Permit } from "../permit";

interface _TokenList {
    tokens: string[];
}

export interface Snip721GetTokensResponse {
    token_list: _TokenList;
}

export const Snip721GetTokens = async (
    secretjs: CosmWasmClient,
    token: string,
    address: string,
    auth: { key?: string; permit?: Permit },
): Promise<Snip721GetTokensResponse> => {
    const { key, permit } = auth;
    let balanceResponse;

    if (permit) {
        balanceResponse = await secretjs.queryContractSmart(token, {
            with_permit: {
                permit,
                // viewer: "address_of_the_querier_if_different_from_owner",
                query: {
                    tokens: {
                        owner: address,
                    },
                },
                // limit: 10
            },
        });
    } else {
        balanceResponse = await secretjs.queryContractSmart(token, {
            tokens: {
                owner: address,
                // viewer: "address_of_the_querier_if_different_from_owner",
                viewing_key: key,
                // limit: 10
            },
        });
    }

    return balanceResponse;
};
